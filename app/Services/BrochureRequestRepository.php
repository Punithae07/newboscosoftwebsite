<?php

namespace App\Services;

use App\Models\BrochureRequest;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class BrochureRequestRepository
{
    public function paginate(int $page, int $pageSize, ?string $search, string $sortDirection = 'desc'): array
    {
        $direction = $sortDirection === 'asc' ? 'asc' : 'desc';
        $query = BrochureRequest::query()->orderBy('created_at', $direction);

        if ($search) {
            $query->where(function ($builder) use ($search): void {
                $builder
                    ->where('name', 'like', '%'.$search.'%')
                    ->orWhere('organization_name', 'like', '%'.$search.'%')
                    ->orWhere('organization_email', 'like', '%'.$search.'%')
                    ->orWhere('contact_number', 'like', '%'.$search.'%')
                    ->orWhere('pdf_name', 'like', '%'.$search.'%');
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

    public function count(?string $search = null): int
    {
        $query = BrochureRequest::query();

        if ($search) {
            $query->where(function ($builder) use ($search): void {
                $builder
                    ->where('name', 'like', '%'.$search.'%')
                    ->orWhere('organization_name', 'like', '%'.$search.'%')
                    ->orWhere('organization_email', 'like', '%'.$search.'%')
                    ->orWhere('contact_number', 'like', '%'.$search.'%')
                    ->orWhere('pdf_name', 'like', '%'.$search.'%');
            });
        }

        return $query->count();
    }

    public function find(string $id): ?BrochureRequest
    {
        return BrochureRequest::query()->find($id);
    }

    public function create(array $data, string $ipAddress, ?string $userAgent = null): BrochureRequest
    {
        $pdfName = $this->normalizePdfName($data['product_interest'] ?? null);

        return BrochureRequest::query()->create([
            'name' => $data['name'],
            'pdf_name' => $pdfName,
            'organization_name' => $data['company'],
            'organization_email' => $data['email'],
            'contact_number' => $data['phone'],
        ]);
    }

    public function hasRecentDuplicate(string $email, ?string $pdfName, int $windowMinutes = 10): bool
    {
        $cutoff = Carbon::now()->subMinutes($windowMinutes);
        $normalizedEmail = Str::lower(trim($email));
        $normalizedPdf = $this->normalizePdfName($pdfName);

        $query = BrochureRequest::query()
            ->whereRaw('LOWER(organization_email) = ?', [$normalizedEmail])
            ->where('created_at', '>=', $cutoff);

        if ($normalizedPdf !== null) {
            $query->where('pdf_name', $normalizedPdf);
        } else {
            $query->whereNull('pdf_name');
        }

        return $query->exists();
    }

    public function delete(string $id): bool
    {
        $record = BrochureRequest::query()->find($id);

        if (! $record) {
            return false;
        }

        return (bool) $record->delete();
    }

    private function normalizePdfName(?string $value): ?string
    {
        if ($value === null) {
            return null;
        }

        $normalized = Str::squish($value);

        return $normalized === '' ? null : mb_substr($normalized, 0, 160);
    }
}
