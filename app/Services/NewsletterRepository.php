<?php

namespace App\Services;

use App\Models\Newsletter;
use Illuminate\Support\Carbon;

class NewsletterRepository
{
    public function paginate(int $page, int $pageSize, ?string $search, string $sortDirection = 'desc'): array
    {
        $direction = $sortDirection === 'asc' ? 'asc' : 'desc';
        $query = Newsletter::query()->orderBy('created_at', $direction);

        if ($search) {
            $query->where('email', 'like', '%'.$search.'%');
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
        $query = Newsletter::query();

        if ($search) {
            $query->where('email', 'like', '%'.$search.'%');
        }

        return $query->count();
    }

    public function find(string $id): ?Newsletter
    {
        return Newsletter::query()->find($id);
    }

    public function create(string $email, string $ipAddress, ?string $userAgent = null): Newsletter
    {
        return Newsletter::query()->create([
            'email' => $email,
            'is_subscribed' => true,
            'verify_status' => false,
            'subscribed_on' => Carbon::now()->toDateTimeString(),
        ]);
    }

    public function hasSubscription(string $email): bool
    {
        return Newsletter::query()
            ->whereRaw('LOWER(email) = ?', [strtolower($email)])
            ->exists();
    }

    public function delete(string $id): bool
    {
        $newsletter = Newsletter::query()->find($id);

        if (! $newsletter) {
            return false;
        }

        return (bool) $newsletter->delete();
    }
}
