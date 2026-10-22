import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { RequireAdminAuth } from "@/components/admin/RequireAdminAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBrochureById } from "@/lib/contacts";

export const Route = createFileRoute("/admin/brochures/view/$id")({
  head: () => ({
    meta: [{ title: "View Whitepaper Request | Bosco Soft Technologies" }],
  }),
  component: ViewBrochurePage,
});

function ViewBrochurePage() {
  const { id } = Route.useParams();
  const numericId = Number(id);
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-brochure", numericId],
    queryFn: () => getBrochureById(numericId),
  });

  return (
    <RequireAdminAuth>
      <AdminShell
        title="Whitepaper Request"
        description="Review the full request details for this whitepaper or brochure download."
        actions={
          <Button asChild variant="outline">
            <Link to="/admin/brochures">
              <ArrowLeft className="h-4 w-4" />
              Back to Whitepapers
            </Link>
          </Button>
        }
      >
        <Card className="rounded-[2rem] border-slate-200 shadow-sm">
          <CardHeader>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              Request Record
            </p>
            <CardTitle className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              {isLoading ? "Loading request..." : data?.name ?? "Whitepaper request details"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive">
                {error instanceof Error ? error.message : "Unable to load whitepaper request."}
              </div>
            ) : isLoading || !data ? (
              <div className="py-12 text-base text-slate-500">Loading whitepaper request details...</div>
            ) : (
              <dl className="grid gap-6 md:grid-cols-2">
                <DetailItem label="Name" value={data.name} />
                <DetailItem label="Requested Paper" value={data.pdf_name || "-"} />
                <DetailItem label="Organization" value={data.organization_name} />
                <DetailItem label="Phone" value={data.contact_number || "-"} />
                <DetailItem label="Email" value={data.organization_email} />
                <DetailItem
                  label="Created Date"
                  value={format(new Date(data.created_at), "dd MMM yyyy, p")}
                />
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
