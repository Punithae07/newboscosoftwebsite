<?php

namespace App\Http\Controllers;

use App\Http\Requests\Admin\AdminContactRequest;
use App\Services\BrochureRequestRepository;
use App\Services\ContactRepository;
use App\Services\NewsletterRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class AdminContactController
{
    public function __construct(
        private readonly ContactRepository $contacts,
        private readonly NewsletterRepository $newsletters,
        private readonly BrochureRequestRepository $brochures,
    ) {}

    public function dashboard(): JsonResponse
    {
        return response()->json(array_merge(
            $this->contacts->dashboardStats(),
            [
                'totalNewsletters' => $this->newsletters->count(),
                'totalBrochures' => $this->brochures->count(),
            ],
        ));
    }

    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'page' => ['nullable', 'integer', 'min:1'],
            'pageSize' => ['nullable', 'integer', 'min:1', 'max:100'],
            'search' => ['nullable', 'string', 'max:120'],
            'status' => ['nullable', 'string', 'max:40'],
            'sortBy' => ['nullable', 'string', Rule::in(['created_at', 'name', 'email', 'status'])],
            'sortDirection' => ['nullable', 'string', Rule::in(['asc', 'desc'])],
        ]);

        return response()->json(
            $this->contacts->paginate(
                (int) ($validated['page'] ?? 1),
                (int) ($validated['pageSize'] ?? 10),
                isset($validated['search']) ? Str::squish($validated['search']) : null,
                $validated['status'] ?? 'All',
                $validated['sortBy'] ?? 'created_at',
                $validated['sortDirection'] ?? 'desc',
            )
        );
    }

    public function store(AdminContactRequest $request): JsonResponse
    {
        $record = $this->contacts->createAdmin(
            $request->validated(),
            (string) $request->session()->get('admin_email')
        );

        return response()->json($record, 201);
    }

    public function show(string $id): JsonResponse
    {
        $record = $this->contacts->find($id);

        if (! $record) {
            return response()->json([
                'message' => 'Contact not found.',
            ], 404);
        }

        return response()->json($record);
    }

    public function update(AdminContactRequest $request, string $id): JsonResponse
    {
        $record = $this->contacts->update(
            $id,
            $request->validated(),
            (string) $request->session()->get('admin_email')
        );

        if (! $record) {
            return response()->json([
                'message' => 'Contact not found.',
            ], 404);
        }

        return response()->json($record);
    }

    public function destroy(string $id): JsonResponse
    {
        if (! $this->contacts->delete($id)) {
            return response()->json([
                'message' => 'Contact not found.',
            ], 404);
        }

        return response()->json([
            'message' => 'Contact deleted successfully.',
        ]);
    }

    public function newsletters(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'page' => ['nullable', 'integer', 'min:1'],
            'pageSize' => ['nullable', 'integer', 'min:1', 'max:100'],
            'search' => ['nullable', 'string', 'max:120'],
            'sortDirection' => ['nullable', 'string', Rule::in(['asc', 'desc'])],
        ]);

        return response()->json(
            $this->newsletters->paginate(
                (int) ($validated['page'] ?? 1),
                (int) ($validated['pageSize'] ?? 10),
                isset($validated['search']) ? Str::squish($validated['search']) : null,
                $validated['sortDirection'] ?? 'desc',
            )
        );
    }

    public function showNewsletter(string $id): JsonResponse
    {
        $record = $this->newsletters->find($id);

        if (! $record) {
            return response()->json([
                'message' => 'Newsletter subscription not found.',
            ], 404);
        }

        return response()->json($record);
    }

    public function destroyNewsletter(string $id): JsonResponse
    {
        if (! $this->newsletters->delete($id)) {
            return response()->json([
                'message' => 'Newsletter subscription not found.',
            ], 404);
        }

        return response()->json([
            'message' => 'Newsletter subscription deleted successfully.',
        ]);
    }

    public function brochures(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'page' => ['nullable', 'integer', 'min:1'],
            'pageSize' => ['nullable', 'integer', 'min:1', 'max:100'],
            'search' => ['nullable', 'string', 'max:120'],
            'sortDirection' => ['nullable', 'string', Rule::in(['asc', 'desc'])],
        ]);

        return response()->json(
            $this->brochures->paginate(
                (int) ($validated['page'] ?? 1),
                (int) ($validated['pageSize'] ?? 10),
                isset($validated['search']) ? Str::squish($validated['search']) : null,
                $validated['sortDirection'] ?? 'desc',
            )
        );
    }

    public function showBrochure(string $id): JsonResponse
    {
        $record = $this->brochures->find($id);

        if (! $record) {
            return response()->json([
                'message' => 'Brochure request not found.',
            ], 404);
        }

        return response()->json([
            'id' => $record->id,
            'name' => $record->name,
            'pdf_name' => $record->pdf_name,
            'organization_name' => $record->organization_name,
            'organization_email' => $record->organization_email,
            'contact_number' => $record->contact_number,
            'created_at' => $record->created_at,
            'updated_at' => $record->updated_at,
        ]);
    }

    public function destroyBrochure(string $id): JsonResponse
    {
        if (! $this->brochures->delete($id)) {
            return response()->json([
                'message' => 'Brochure request not found.',
            ], 404);
        }

        return response()->json([
            'message' => 'Brochure request deleted successfully.',
        ]);
    }
}
