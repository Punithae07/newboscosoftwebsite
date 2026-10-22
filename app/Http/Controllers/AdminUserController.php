<?php

namespace App\Http\Controllers;

use App\Services\AdminUserRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminUserController
{
    public function __construct(private readonly AdminUserRepository $adminUsers)
    {
    }

    public function index(Request $request): JsonResponse
    {
        $page = max(1, (int) $request->integer('page', 1));
        $pageSize = max(1, min(100, (int) $request->integer('pageSize', 10)));
        $search = trim((string) $request->query('search', ''));
        $sortDirection = strtolower((string) $request->query('sortDirection', 'desc')) === 'asc' ? 'asc' : 'desc';

        return response()->json(
            $this->adminUsers->paginate(
                $page,
                $pageSize,
                $search !== '' ? $search : null,
                $sortDirection,
            )
        );
    }
}
