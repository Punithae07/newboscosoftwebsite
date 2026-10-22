import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { ContactForm } from "@/components/admin/ContactForm";
import { RequireAdminAuth } from "@/components/admin/RequireAdminAuth";
import { Button } from "@/components/ui/button";
import { getContactById, updateContact, type AdminContactFormValues } from "@/lib/contacts";

export const Route = createFileRoute("/admin/contacts/edit/$id")({
  head: () => ({
    meta: [{ title: "Edit Contact | Bosco Soft Technologies" }],
  }),
  component: EditContactPage,
});

function EditContactPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-contact", id],
    queryFn: () => getContactById(id),
  });

  const updateMutation = useMutation({
    mutationFn: (values: AdminContactFormValues) => updateContact(id, values),
    onSuccess: async (record) => {
      toast.success("Contact updated successfully.");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["admin-contacts"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-contact", id] }),
      ]);
      navigate({ to: "/admin/contacts/view/$id", params: { id: record.id } });
    },
    onError: (mutationError) => {
      toast.error(
        mutationError instanceof Error ? mutationError.message : "Unable to update contact.",
      );
    },
  });

  const handleSubmit = async (values: AdminContactFormValues) => {
    await updateMutation.mutateAsync(values);
  };

  return (
    <RequireAdminAuth>
      <AdminShell
        title="Edit Contact"
        description="Update the enquiry record, refine details, and move the status forward as the conversation progresses."
        actions={
          <Button variant="outline" onClick={() => navigate({ to: "/admin/contacts/view/$id", params: { id } })}>
            Back to Details
          </Button>
        }
      >
        {error ? (
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive">
            {error instanceof Error ? error.message : "Unable to load contact for editing."}
          </div>
        ) : isLoading || !data ? (
          <div className="rounded-[2rem] border border-slate-200 bg-white px-6 py-10 text-base text-slate-500 shadow-sm">
            Loading contact details...
          </div>
        ) : (
          <ContactForm
            defaultValues={{
              name: data.name,
              email: data.email,
              phone: data.phone ?? "",
              company: data.company ?? "",
              product_interest: data.product_interest ?? "",
              message: data.message,
              source_page: data.source_page ?? "",
              status: data.status,
            }}
            submitLabel="Save Changes"
            busyLabel="Saving..."
            onSubmit={handleSubmit}
          />
        )}
      </AdminShell>
    </RequireAdminAuth>
  );
}
