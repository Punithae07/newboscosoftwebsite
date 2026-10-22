import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Eye, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { RequireAdminAuth } from "@/components/admin/RequireAdminAuth";
import {
  createdDateSortOptions,
  deleteBrochure,
  listBrochures,
  type BrochureRecord,
  type CreatedDateSortValue,
} from "@/lib/contacts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const pageSizeOptions = [10, 25, 50, 100] as const;

export const Route = createFileRoute("/admin/brochures")({
  head: () => ({
    meta: [{ title: "Whitepaper Requests | Bosco Soft Technologies" }],
  }),
  component: AdminBrochuresPage,
});

function AdminBrochuresPage() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  if (pathname !== "/admin/brochures") {
    return <Outlet />;
  }

  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<CreatedDateSortValue>("created_at_desc");
  const [pageSize, setPageSize] = useState<(typeof pageSizeOptions)[number]>(10);
  const [page, setPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState<BrochureRecord | null>(null);
  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    setPage(1);
  }, [deferredSearch, sort, pageSize]);

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["admin-brochures", page, pageSize, deferredSearch, sort],
    queryFn: () =>
      listBrochures({
        page,
        pageSize,
        search: deferredSearch,
        sort,
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBrochure,
    onSuccess: async () => {
      toast.success("Whitepaper request deleted successfully.");
      setSelectedRecord(null);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["admin-brochures"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] }),
      ]);
    },
    onError: (mutationError) => {
      toast.error(
        mutationError instanceof Error ? mutationError.message : "Unable to delete whitepaper request.",
      );
    },
  });

  const resultsSummary = useMemo(() => {
    if (isLoading && !data) {
      return "Loading whitepaper requests...";
    }

    return `${data?.count ?? 0} request${data?.count === 1 ? "" : "s"} found`;
  }, [data, isLoading]);

  return (
    <RequireAdminAuth>
      <AdminShell
        title="Whitepapers"
        description="Track brochure and whitepaper download requests collected from the website and review who requested each resource."
      >
        <Card className="rounded-[2rem] border-slate-200 shadow-sm">
          <CardHeader className="gap-6 pb-4">
            <div className="flex flex-col gap-6">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  Resource Requests
                </p>
                <CardTitle className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-[2.6rem]">
                  Whitepaper downloads
                </CardTitle>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                  <span>{resultsSummary}</span>
                  {isFetching && !isLoading ? (
                    <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-500">
                      Refreshing...
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,1.4fr)_220px_160px]">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search by name, email, company, phone, or whitepaper"
                    className="h-12 rounded-2xl border-slate-200 pl-11"
                  />
                </div>

                <Select value={sort} onValueChange={(value) => setSort(value as CreatedDateSortValue)}>
                  <SelectTrigger className="h-12 rounded-2xl border-slate-200">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {createdDateSortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={String(pageSize)}
                  onValueChange={(value) => setPageSize(Number(value) as (typeof pageSizeOptions)[number])}
                >
                  <SelectTrigger className="h-12 rounded-2xl border-slate-200">
                    <SelectValue placeholder="Page size" />
                  </SelectTrigger>
                  <SelectContent>
                    {pageSizeOptions.map((option) => (
                      <SelectItem key={option} value={String(option)}>
                        {option} / page
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {error ? (
              <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-4 text-sm font-medium text-destructive">
                {error instanceof Error ? error.message : "Unable to load whitepaper requests."}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto rounded-[1.5rem] border border-slate-100">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50/80">
                        <TableHead className="whitespace-nowrap">Name</TableHead>
                        <TableHead className="min-w-[240px]">Requested Paper</TableHead>
                        <TableHead className="whitespace-nowrap">Organization</TableHead>
                        <TableHead className="whitespace-nowrap">Phone</TableHead>
                        <TableHead className="whitespace-nowrap">Email</TableHead>
                        <TableHead className="whitespace-nowrap">Created Date</TableHead>
                        <TableHead className="whitespace-nowrap text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={7} className="py-12 text-center text-base text-slate-500">
                            Loading whitepaper requests...
                          </TableCell>
                        </TableRow>
                      ) : data?.records.length ? (
                        data.records.map((record) => (
                          <TableRow key={record.id}>
                            <TableCell className="font-semibold text-slate-950">{record.name}</TableCell>
                            <TableCell className="text-slate-700">{record.pdf_name || "-"}</TableCell>
                            <TableCell>{record.organization_name || "-"}</TableCell>
                            <TableCell>{record.contact_number || "-"}</TableCell>
                            <TableCell>{record.organization_email}</TableCell>
                            <TableCell>{format(new Date(record.created_at), "dd MMM yyyy, p")}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2 whitespace-nowrap">
                                <Button asChild variant="outline" size="sm" className="border-slate-200 text-slate-900 hover:bg-slate-900 hover:text-white">
                                  <Link to="/admin/brochures/view/$id" params={{ id: String(record.id) }}>
                                    <Eye className="h-4 w-4" />
                                    View
                                  </Link>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => setSelectedRecord(record)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  Delete
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="py-12 text-center text-base text-slate-500">
                            No whitepaper requests match your current search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                {data && data.totalPages > 1 ? (
                  <Pagination className="mt-8 justify-end">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#brochure-pagination"
                          onClick={(event) => {
                            event.preventDefault();
                            setPage((current) => Math.max(1, current - 1));
                          }}
                          className={page === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      <PaginationItem>
                        <span className="px-3 text-sm font-medium text-slate-600">
                          Page {data.page} of {data.totalPages}
                        </span>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext
                          href="#brochure-pagination"
                          onClick={(event) => {
                            event.preventDefault();
                            setPage((current) => Math.min(data.totalPages, current + 1));
                          }}
                          className={page >= data.totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                ) : null}
              </>
            )}
          </CardContent>
        </Card>

        <AlertDialog open={Boolean(selectedRecord)} onOpenChange={(open) => !open && setSelectedRecord(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this whitepaper request?</AlertDialogTitle>
              <AlertDialogDescription>
                {selectedRecord
                  ? `This will permanently remove ${selectedRecord.organization_email}'s whitepaper request from the admin list.`
                  : "This request will be permanently removed."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                disabled={deleteMutation.isPending || !selectedRecord}
                onClick={(event) => {
                  event.preventDefault();
                  if (!selectedRecord) {
                    return;
                  }

                  void deleteMutation.mutateAsync(selectedRecord.id);
                }}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete request"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AdminShell>
    </RequireAdminAuth>
  );
}

