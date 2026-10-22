import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Eye, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { RequireAdminAuth } from "@/components/admin/RequireAdminAuth";
import { StatusBadge } from "@/components/admin/StatusBadge";
import {
  contactSortOptions,
  contactStatuses,
  deleteContact,
  listContacts,
  type ContactRecord,
  type ContactSortValue,
  type ContactStatus,
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

export const Route = createFileRoute("/admin/contacts")({
  head: () => ({
    meta: [{ title: "Manage Contacts | Bosco Soft Technologies" }],
  }),
  component: AdminContactsPage,
});

function AdminContactsPage() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  if (pathname !== "/admin/contacts") {
    return <Outlet />;
  }

  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ContactStatus | "All">("All");
  const [sort, setSort] = useState<ContactSortValue>("created_at_desc");
  const [pageSize, setPageSize] = useState<(typeof pageSizeOptions)[number]>(10);
  const [page, setPage] = useState(1);
  const [selectedContact, setSelectedContact] = useState<ContactRecord | null>(null);
  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    setPage(1);
  }, [deferredSearch, status, sort, pageSize]);

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["admin-contacts", page, pageSize, deferredSearch, status, sort],
    queryFn: () =>
      listContacts({
        page,
        pageSize,
        search: deferredSearch,
        status,
        sort,
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteContact,
    onSuccess: async () => {
      toast.success("Contact deleted successfully.");
      setSelectedContact(null);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["admin-contacts"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] }),
      ]);
    },
    onError: (mutationError) => {
      toast.error(
        mutationError instanceof Error ? mutationError.message : "Unable to delete contact.",
      );
    },
  });

  const resultsSummary = useMemo(() => {
    if (isLoading && !data) {
      return "Loading contacts...";
    }

    return `${data?.count ?? 0} contact${data?.count === 1 ? "" : "s"} found`;
  }, [data, isLoading]);

  return (
    <RequireAdminAuth>
      <AdminShell
        title="Contacts"
        description="Review website enquiries in a cleaner workspace with quick search, filter, sort, and delete actions."
      >
        <Card className="rounded-[2rem] border-slate-200 shadow-sm">
          <CardHeader className="gap-6 pb-4">
            <div className="flex flex-col gap-6">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  Directory
                </p>
                <CardTitle className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-[2.6rem]">
                  Contact enquiries
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

              <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,1.4fr)_220px_220px_160px]">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search by name, email, phone, company, or interest"
                    className="h-12 rounded-2xl border-slate-200 pl-11"
                  />
                </div>

                <Select value={status} onValueChange={(value) => setStatus(value as ContactStatus | "All")}>
                  <SelectTrigger className="h-12 rounded-2xl border-slate-200">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All statuses</SelectItem>
                    {contactStatuses.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sort} onValueChange={(value) => setSort(value as ContactSortValue)}>
                  <SelectTrigger className="h-12 rounded-2xl border-slate-200">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {contactSortOptions.map((option) => (
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
                {error instanceof Error ? error.message : "Unable to load contacts."}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto rounded-[1.5rem] border border-slate-100">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50/80">
                        <TableHead className="whitespace-nowrap">Name</TableHead>
                        <TableHead className="whitespace-nowrap">Email</TableHead>
                        <TableHead className="whitespace-nowrap">Phone</TableHead>
                        <TableHead className="whitespace-nowrap">Product Interest</TableHead>
                        <TableHead className="whitespace-nowrap">Status</TableHead>
                        <TableHead className="whitespace-nowrap">Created Date</TableHead>
                        <TableHead className="whitespace-nowrap text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={7} className="py-16 text-center text-base text-slate-500">
                            Loading contacts...
                          </TableCell>
                        </TableRow>
                      ) : data?.records.length ? (
                        data.records.map((contact) => (
                          <TableRow key={contact.id}>
                            <TableCell className="font-semibold text-slate-950">{contact.name}</TableCell>
                            <TableCell>{contact.email}</TableCell>
                            <TableCell>{contact.phone || "-"}</TableCell>
                            <TableCell>{contact.product_interest || "-"}</TableCell>
                            <TableCell>
                              <StatusBadge status={contact.status} />
                            </TableCell>
                            <TableCell>{format(new Date(contact.created_at), "dd MMM yyyy")}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button asChild variant="outline" size="sm" className="border-slate-200 text-slate-900 hover:bg-slate-900 hover:text-white">
                                  <Link to="/admin/contacts/view/$id" params={{ id: contact.id }}>
                                    <Eye className="h-4 w-4" />
                                    View
                                  </Link>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => setSelectedContact(contact)}
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
                          <TableCell colSpan={7} className="py-16 text-center text-base text-slate-500">
                            No contacts match your current search and filter.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                {data ? (
                  <div className="mt-6 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-600">
                      Showing page {data.page} of {data.totalPages} with {data.pageSize} contacts per page.
                    </p>

                    {data.totalPages > 1 ? (
                      <Pagination className="justify-end">
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              href="#contacts-pagination"
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
                              href="#contacts-pagination"
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
                  </div>
                ) : null}
              </>
            )}
          </CardContent>
        </Card>

        <AlertDialog open={Boolean(selectedContact)} onOpenChange={(open) => !open && setSelectedContact(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this contact?</AlertDialogTitle>
              <AlertDialogDescription>
                {selectedContact
                  ? `This will permanently remove ${selectedContact.name}'s enquiry from the admin panel.`
                  : "This contact will be permanently removed."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                disabled={deleteMutation.isPending || !selectedContact}
                onClick={(event) => {
                  event.preventDefault();
                  if (!selectedContact) {
                    return;
                  }

                  void deleteMutation.mutateAsync(selectedContact.id);
                }}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete contact"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AdminShell>
    </RequireAdminAuth>
  );
}

