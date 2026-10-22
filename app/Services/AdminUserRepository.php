<?php

namespace App\Services;

use App\Models\AdminUser;

class AdminUserRepository
{
    public function paginate(int $page, int $pageSize, ?string $search, string $sortDirection = 'desc'): array
    {
        $direction = $sortDirection === 'asc' ? 'asc' : 'desc';
        $query = AdminUser::query()->orderBy('created_at', $direction);

        if ($search) {
            $query->where(function ($builder) use ($search) {
                $builder
                    ->where('name', 'like', '%'.$search.'%')
                    ->orWhere('email', 'like', '%'.$search.'%');
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

    public function findActiveByEmail(string $email): ?AdminUser
    {
        return AdminUser::query()
            ->whereRaw('LOWER(email) = ?', [strtolower($email)])
            ->where('is_active', true)
            ->first();
    }

    public function findActiveById(int $id): ?AdminUser
    {
        return AdminUser::query()
            ->whereKey($id)
            ->where('is_active', true)
            ->first();
    }

    public function count(): int
    {
        return AdminUser::query()->count();
    }
}
