import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { RequireAdminAuth } from "@/components/admin/RequireAdminAuth";
import {
  createdDateSortOptions,
  deleteNewsletter,
  listNewsletters,
  type CreatedDateSortValue,
  type NewsletterRecord,
} from "@/lib/contacts";
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
import { Button } from "@/components/ui/button";
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

export const Route = createFileRoute("/admin/newsletters")({
  head: () => ({
    meta: [{ title: "Newsletter Subscriptions | Bosco Soft Technologies" }],
  }),
  component: AdminNewslettersPage,
});

function AdminNewslettersPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<CreatedDateSortValue>("created_at_desc");
  const [pageSize, setPageSize] = useState<(typeof pageSizeOptions)[number]>(10);
  const [page, setPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState<NewsletterRecord | null>(null);
  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    setPage(1);
  }, [deferredSearch, sort, pageSize]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-newsletters", page, pageSize, deferredSearch, sort],
    queryFn: () =>
      listNewsletters({
        page,
        pageSize,
        search: deferredSearch,
        sort,
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNewsletter,
    onSuccess: async () => {
      toast.success("Newsletter subscription deleted successfully.");
      setSelectedRecord(null);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["admin-newsletters"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] }),
      ]);
    },
    onError: (mutationError) => {
      toast.error(
        mutationError instanceof Error
          ? mutationError.message
          : "Unable to delete newsletter subscription.",
      );
    },
  });

  const resultsSummary = useMemo(() => {
    if (!data) {
      return "Loading newsletter subscriptions...";
    }

    return `${data.count} subscription${data.count === 1 ? "" : "s"} found`;
  }, [data]);

  return (
    <RequireAdminAuth>
      <AdminShell
        title="Newsletters"
        description="Review every newsletter subscriber captured from the website footer and keep your mailing list organized."
      >
        <Card className="rounded-[2rem] border-slate-200 shadow-sm">
          <CardHeader className="gap-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  Subscribers
                </p>
                <CardTitle className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                  Newsletter signups
                </CardTitle>
                <p className="mt-3 text-base leading-7 text-slate-600">{resultsSummary}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_220px_150px] lg:w-[760px]">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search by email address"
                    className="pl-11"
                  />
                </div>
                <Select value={sort} onValueChange={(value) => setSort(value as CreatedDateSortValue)}>
                  <SelectTrigger>
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
                <Select value={String(pageSize)} onValueChange={(value) => setPageSize(Number(value) as (typeof pageSizeOptions)[number])}>
                  <SelectTrigger>
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
              <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive">
                {error instanceof Error ? error.message : "Unable to load newsletter subscriptions."}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Subscribed</TableHead>
                        <TableHead>Created Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={4} className="py-12 text-center text-base text-slate-500">
                            Loading newsletter subscriptions...
                          </TableCell>
                        </TableRow>
                      ) : data?.records.length ? (
                        data.records.map((record) => (
                          <TableRow key={record.id}>
                            <TableCell className="font-semibold text-slate-950">{record.email}</TableCell>
                            <TableCell>{record.is_subscribed ? "Yes" : "No"}</TableCell>
                            <TableCell>
                              {format(new Date(record.created_at), "dd MMM yyyy, p")}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
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
                          <TableCell colSpan={4} className="py-12 text-center text-base text-slate-500">
                            No newsletter subscriptions match your current search.
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
                          href="#newsletter-pagination"
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
                          href="#newsletter-pagination"
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
              <AlertDialogTitle>Delete this subscription?</AlertDialogTitle>
              <AlertDialogDescription>
                {selectedRecord
                  ? `This will permanently remove ${selectedRecord.email} from the admin list.`
                  : "This subscription will be permanently removed."}
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
                {deleteMutation.isPending ? "Deleting..." : "Delete subscription"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AdminShell>
    </RequireAdminAuth>
  );
}
