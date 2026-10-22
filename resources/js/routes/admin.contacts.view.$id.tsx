import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { RequireAdminAuth } from "@/components/admin/RequireAdminAuth";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContactById } from "@/lib/contacts";

export const Route = createFileRoute("/admin/contacts/view/$id")({
  head: () => ({
    meta: [{ title: "View Contact | Bosco Soft Technologies" }],
  }),
  component: ViewContactPage,
});

function ViewContactPage() {
  const { id } = Route.useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-contact", id],
    queryFn: () => getContactById(id),
  });

  return (
    <RequireAdminAuth>
      <AdminShell
        title="Contact Details"
        description="Review the full enquiry details and source context for this record."
        actions={
          <Button variant="outline" asChild>
            <Link to="/admin/contacts">
              <ArrowLeft className="h-4 w-4" />
              Back to Contacts
            </Link>
          </Button>
        }
      >
        <Card className="rounded-[2rem] border-slate-200 shadow-sm">
          <CardHeader>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              Enquiry Record
            </p>
            <CardTitle className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              {isLoading ? "Loading contact..." : data?.name ?? "Contact details"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive">
                {error instanceof Error ? error.message : "Unable to load contact."}
              </div>
            ) : isLoading || !data ? (
              <div className="py-12 text-base text-slate-500">Loading contact details...</div>
            ) : (
              <dl className="grid gap-6 md:grid-cols-2">
                <DetailItem label="Name" value={data.name} />
                <DetailItem label="Email" value={data.email} />
                <DetailItem label="Phone" value={data.phone || "-"} />
                <DetailItem label="Company" value={data.company || "-"} />
                <DetailItem label="Country" value={data.country || "-"} />
                <DetailItem label="Industry" value={data.industry || "-"} />
                <DetailItem label="Product Interest" value={data.product_interest || "-"} />
                <DetailItem label="Source Page" value={data.source_page || "-"} />
                <div>
                  <dt className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Status
                  </dt>
                  <dd className="mt-2">
                    <StatusBadge status={data.status} className="text-sm" />
                  </dd>
                </div>
                <DetailItem
                  label="Created Date"
                  value={format(new Date(data.created_at), "dd MMM yyyy, p")}
                />
                <div className="md:col-span-2">
                  <dt className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Message
                  </dt>
                  <dd className="mt-2 whitespace-pre-wrap rounded-2xl bg-slate-50 p-5 text-base leading-8 text-slate-700">
                    {data.message}
                  </dd>
                </div>
              </dl>
            )}
          </CardContent>
        </Card>
      </AdminShell>
    </RequireAdminAuth>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</dt>
      <dd className="mt-2 text-base leading-8 text-slate-800">{value}</dd>
    </div>
  );
}
