<?php

namespace App\Services;

use App\Models\ContactSubmission;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class ContactRepository
{
    private const STATUSES = ['New', 'Contacted', 'In Progress', 'Converted', 'Closed'];

    public function paginate(
        int $page,
        int $pageSize,
        ?string $search,
        string $status,
        string $sortBy = 'created_at',
        string $sortDirection = 'desc',
    ): array {
        $sortableColumns = [
            'created_at' => 'created_at',
            'name' => 'name',
            'email' => 'email',
            'status' => 'status',
        ];

        $sortColumn = $sortableColumns[$sortBy] ?? 'created_at';
        $direction = $sortDirection === 'asc' ? 'asc' : 'desc';

        $query = ContactSubmission::query()->orderBy($sortColumn, $direction);

        if ($sortColumn !== 'created_at') {
            $query->orderBy('created_at', 'desc');
        }

        if ($status !== 'All') {
            $query->where('status', $status);
        }

        if ($search) {
            $query->where(function ($builder) use ($search): void {
                $builder
                    ->where('name', 'like', '%'.$search.'%')
                    ->orWhere('email', 'like', '%'.$search.'%')
                    ->orWhere('phone', 'like', '%'.$search.'%')
                    ->orWhere('company', 'like', '%'.$search.'%')
                    ->orWhere('product_interest', 'like', '%'.$search.'%')
                    ->orWhere('source_page', 'like', '%'.$search.'%');
            });
        }

        $paginator = $query->paginate(
            perPage: max(1, min($pageSize, 100)),
            page: max(1, $page),
        );

        return [
            'records' => $paginator->items(),
            'count' => $paginator->total(),
            'page' => $paginator->currentPage(),
            'pageSize' => $paginator->perPage(),
            'totalPages' => max(1, $paginator->lastPage()),
        ];
    }

    public function dashboardStats(): array
    {
        $latestContacts = ContactSubmission::query()
            ->latest('created_at')
            ->limit(5)
            ->get()
            ->map(fn (ContactSubmission $record) => $this->normalizeRecord($record->toArray()))
            ->all();

        return [
            'totalContacts' => ContactSubmission::query()->count(),
            'newContacts' => ContactSubmission::query()->where('status', 'New')->count(),
            'contactedContacts' => ContactSubmission::query()->where('status', 'Contacted')->count(),
            'convertedContacts' => ContactSubmission::query()->where('status', 'Converted')->count(),
            'latestContacts' => $latestContacts,
        ];
    }

    public function all(): array
    {
        return ContactSubmission::query()
            ->latest('created_at')
            ->get()
            ->map(fn (ContactSubmission $record) => $this->normalizeRecord($record->toArray()))
            ->all();
    }

    public function find(string $id): ?array
    {
        $record = ContactSubmission::query()->find($id);

        return $record ? $this->normalizeRecord($record->toArray()) : null;
    }

    public function createPublic(array $data, string $ipAddress, ?string $userAgent = null): array
    {
        $normalized = $this->normalizeMutableFields($data);

        $record = ContactSubmission::query()->create([
            'name' => $normalized['name'],
            'email' => $normalized['email'],
            'phone' => $normalized['phone'],
            'company' => $normalized['company'],
            'country' => $normalized['country'],
            'industry' => $normalized['industry'],
            'product_interest' => $normalized['product_interest'],
            'message' => $normalized['message'],
            'source_page' => $normalized['source_page'],
            'status' => 'New',
            'ip_hash' => $this->hashValue($ipAddress),
            'user_agent_hash' => $this->hashValue($userAgent),
            'submission_fingerprint' => $this->fingerprint(
                $normalized['email'],
                $normalized['message'],
                $normalized['source_page']
            ),
        ]);

        return $this->normalizeRecord($record->toArray());
    }

    public function createAdmin(array $data, string $adminEmail): array
    {
        $normalized = $this->normalizeMutableFields($data);

        $record = ContactSubmission::query()->create([
            'name' => $normalized['name'],
            'email' => $normalized['email'],
            'phone' => $normalized['phone'],
            'company' => $normalized['company'],
            'country' => $normalized['country'],
            'industry' => $normalized['industry'],
            'product_interest' => $normalized['product_interest'],
            'message' => $normalized['message'],
            'source_page' => $normalized['source_page'],
            'status' => $normalized['status'] ?? 'New',
            'managed_by' => $adminEmail,
            'submission_fingerprint' => $this->fingerprint(
                $normalized['email'],
                $normalized['message'],
                $normalized['source_page']
            ),
        ]);

        return $this->normalizeRecord($record->toArray());
    }

    public function update(string $id, array $data, string $adminEmail): ?array
    {
        $record = ContactSubmission::query()->find($id);

        if (! $record) {
            return null;
        }

        $normalized = $this->normalizeMutableFields($data);

        $record->fill([
            'name' => $normalized['name'],
            'email' => $normalized['email'],
            'phone' => $normalized['phone'],
            'company' => $normalized['company'],
            'country' => $normalized['country'],
            'industry' => $normalized['industry'],
            'product_interest' => $normalized['product_interest'],
            'message' => $normalized['message'],
            'source_page' => $normalized['source_page'],
            'status' => $normalized['status'] ?? ($record->status ?? 'New'),
            'managed_by' => $adminEmail,
            'submission_fingerprint' => $this->fingerprint(
                $normalized['email'],
                $normalized['message'],
                $normalized['source_page']
            ),
        ]);
        $record->save();

        return $this->normalizeRecord($record->toArray());
    }

    public function delete(string $id): bool
    {
        $record = ContactSubmission::query()->find($id);

        if (! $record) {
            return false;
        }

        return (bool) $record->delete();
    }

    public function hasRecentDuplicate(string $email, string $message, ?string $sourcePage, int $windowMinutes = 10): bool
    {
        $cutoff = Carbon::now()->subMinutes($windowMinutes);
        $fingerprint = $this->fingerprint($email, $message, $sourcePage);

        return ContactSubmission::query()
            ->where('submission_fingerprint', $fingerprint)
            ->where('created_at', '>=', $cutoff)
            ->exists();
    }

    private function normalizeMutableFields(array $data): array
    {
        return [
            'name' => Str::squish((string) ($data['name'] ?? '')),
            'email' => Str::lower(trim((string) ($data['email'] ?? ''))),
            'phone' => $this->nullableString($data['phone'] ?? null),
            'company' => $this->nullableString($data['company'] ?? null),
            'country' => $this->nullableString($data['country'] ?? null),
            'industry' => $this->nullableString($data['industry'] ?? null),
            'product_interest' => $this->nullableString($data['product_interest'] ?? null),
            'message' => trim((string) ($data['message'] ?? '')),
            'source_page' => $this->nullableString($data['source_page'] ?? null),
            'status' => in_array($data['status'] ?? null, self::STATUSES, true) ? $data['status'] : 'New',
        ];
    }

    private function normalizeRecord(array $record): array
    {
        $normalized = $record;
        $normalized['phone'] = $record['phone'] ?? null;
        $normalized['company'] = $record['company'] ?? null;
        $normalized['country'] = $record['country'] ?? null;
        $normalized['industry'] = $record['industry'] ?? null;
        $normalized['product_interest'] = $record['product_interest'] ?? null;
        $normalized['source_page'] = $record['source_page'] ?? null;
        $normalized['status'] = in_array($record['status'] ?? null, self::STATUSES, true) ? $record['status'] : 'New';
        $normalized['updated_at'] = $record['updated_at'] ?? ($record['created_at'] ?? Carbon::now()->toIso8601String());

        return $normalized;
    }

    private function nullableString(mixed $value): ?string
    {
        $trimmed = is_string($value) ? Str::squish($value) : null;

        return $trimmed !== null && $trimmed !== '' ? $trimmed : null;
    }

    private function hashValue(?string $value): ?string
    {
        $normalized = trim((string) $value);

        return $normalized === '' ? null : hash('sha256', $normalized);
    }

    private function fingerprint(string $email, string $message, ?string $sourcePage): string
    {
        return hash(
            'sha256',
            Str::lower(trim($email)).'|'.trim($message).'|'.Str::lower(trim((string) $sourcePage))
        );
    }
}
