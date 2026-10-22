import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { RequireAdminAuth } from "@/components/admin/RequireAdminAuth";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getDashboardStats } from "@/lib/contacts";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [{ title: "Admin Dashboard | Bosco Soft Technologies" }],
  }),
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: getDashboardStats,
  });

  const metrics = [
    { label: "Total Contacts", value: data?.totalContacts ?? 0 },
    { label: "New Contacts", value: data?.newContacts ?? 0 },
    { label: "Newsletter Signups", value: data?.totalNewsletters ?? 0 },
    { label: "Whitepaper Requests", value: data?.totalBrochures ?? 0 },
  ];

  return (
    <RequireAdminAuth>
      <AdminShell title="Dashboard">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.label} className="rounded-[1.75rem] border-slate-200 shadow-sm">
              <CardHeader className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  {metric.label}
                </p>
                <CardTitle className="text-4xl font-extrabold tracking-tight text-slate-950">
                  {isLoading ? "..." : metric.value}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card className="mt-8 rounded-[2rem] border-slate-200 shadow-sm">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                Latest Enquiries
              </p>
              <CardTitle className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                Recent contact submissions
              </CardTitle>
            </div>
            <Button asChild variant="outline">
              <Link to="/admin/contacts">
                View all contacts
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive">
                {error instanceof Error ? error.message : "Unable to load dashboard data."}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="py-12 text-center text-base text-slate-500">
                          Loading recent submissions...
                        </TableCell>
                      </TableRow>
                    ) : data?.latestContacts.length ? (
                      data.latestContacts.map((contact) => (
                        <TableRow key={contact.id}>
                          <TableCell className="font-semibold text-slate-950">{contact.name}</TableCell>
                          <TableCell>{contact.email}</TableCell>
                          <TableCell>
                            <StatusBadge status={contact.status} />
                          </TableCell>
                          <TableCell>{format(new Date(contact.created_at), "dd MMM yyyy, p")}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="border-slate-200 text-slate-900 hover:bg-slate-900 hover:text-white"
                            >
                              <Link to="/admin/contacts/view/$id" params={{ id: contact.id }}>
                                Open
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="py-12 text-center text-base text-slate-500">
                          No contacts yet. Public form submissions and manual admin entries will appear here.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </AdminShell>
    </RequireAdminAuth>
  );
}
