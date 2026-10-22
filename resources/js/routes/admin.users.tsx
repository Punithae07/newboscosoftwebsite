import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Search } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { RequireAdminAuth } from "@/components/admin/RequireAdminAuth";
import {
  createdDateSortOptions,
  listAdminUsers,
  type AdminUserRecord,
  type CreatedDateSortValue,
} from "@/lib/contacts";
import { Badge } from "@/components/ui/badge";
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

const pageSizeOptions = [10, 25, 50, 100] as const;

export const Route = createFileRoute("/admin/users")({
  head: () => ({
    meta: [{ title: "Admin Users | Bosco Soft Technologies" }],
  }),
  component: AdminUsersPage,
});

function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<CreatedDateSortValue>("created_at_desc");
  const [pageSize, setPageSize] = useState<(typeof pageSizeOptions)[number]>(10);
  const [page, setPage] = useState(1);
  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    setPage(1);
  }, [deferredSearch, sort, pageSize]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-users", page, pageSize, deferredSearch, sort],
    queryFn: () =>
      listAdminUsers({
        page,
        pageSize,
        search: deferredSearch,
        sort,
      }),
  });

  const resultsSummary = useMemo(() => {
    if (!data) {
      return "Loading admin users...";
    }

    return `${data.count} user${data.count === 1 ? "" : "s"} found`;
  }, [data]);

  return (
    <RequireAdminAuth>
      <AdminShell
        title="Users"
        description="View the admin accounts available in the database for panel access. Multiple admin users are supported here."
      >
        <Card className="rounded-[2rem] border-slate-200 shadow-sm">
          <CardHeader className="gap-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  Access
                </p>
                <CardTitle className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                  Admin users
                </CardTitle>
                <p className="mt-3 text-base leading-7 text-slate-600">{resultsSummary}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_220px_150px] lg:w-[760px]">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search by name or email"
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
                {error instanceof Error ? error.message : "Unable to load admin users."}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead>Created Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={5} className="py-12 text-center text-base text-slate-500">
                            Loading admin users...
                          </TableCell>
                        </TableRow>
                      ) : data?.records.length ? (
                        data.records.map((record) => <AdminUserRow key={record.id} record={record} />)
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="py-12 text-center text-base text-slate-500">
                            No admin users match your current search.
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
                          href="#users-pagination"
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
                          href="#users-pagination"
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
      </AdminShell>
    </RequireAdminAuth>
  );
}

function AdminUserRow({ record }: { record: AdminUserRecord }) {
  return (
    <TableRow>
      <TableCell className="font-semibold text-slate-950">{record.name}</TableCell>
      <TableCell>{record.email}</TableCell>
      <TableCell>
        <Badge variant={record.is_active ? "default" : "secondary"}>
          {record.is_active ? "Active" : "Inactive"}
        </Badge>
      </TableCell>
      <TableCell>{record.last_login_at ? format(new Date(record.last_login_at), "dd MMM yyyy, p") : "Never"}</TableCell>
      <TableCell>{format(new Date(record.created_at), "dd MMM yyyy, p")}</TableCell>
    </TableRow>
  );
}
