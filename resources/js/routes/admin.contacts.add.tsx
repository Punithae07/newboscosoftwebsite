import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { ContactForm } from "@/components/admin/ContactForm";
import { RequireAdminAuth } from "@/components/admin/RequireAdminAuth";
import { Button } from "@/components/ui/button";
import { createContact, type AdminContactFormValues } from "@/lib/contacts";

export const Route = createFileRoute("/admin/contacts/add")({
  head: () => ({
    meta: [{ title: "Add Contact | Bosco Soft Technologies" }],
  }),
  component: AddContactPage,
});

function AddContactPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createContact,
    onSuccess: async (record) => {
      toast.success("Contact created successfully.");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["admin-contacts"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] }),
      ]);
      navigate({ to: "/admin/contacts/view/$id", params: { id: record.id } });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Unable to create contact.");
    },
  });

  const handleSubmit = async (values: AdminContactFormValues) => {
    await createMutation.mutateAsync(values);
  };

  return (
    <RequireAdminAuth>
      <AdminShell
        title="Add Contact"
        description="Manually create a new enquiry record for phone calls, walk-ins, referrals, or imports."
        actions={
          <Button variant="outline" onClick={() => navigate({ to: "/admin/contacts" })}>
            Back to Contacts
          </Button>
        }
      >
        <ContactForm submitLabel="Create Contact" busyLabel="Creating..." onSubmit={handleSubmit} />
      </AdminShell>
    </RequireAdminAuth>
  );
}
