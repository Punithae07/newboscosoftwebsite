import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import {
  adminContactSchema,
  contactStatuses,
  type AdminContactFormValues,
} from "@/lib/contacts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ContactFormProps = {
  defaultValues?: Partial<AdminContactFormValues>;
  submitLabel: string;
  busyLabel?: string;
  onSubmit: (values: AdminContactFormValues) => Promise<void>;
};

const initialValues: AdminContactFormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  country: "",
  industry: "",
  product_interest: "",
  message: "",
  source_page: "",
  status: "New",
};

export function ContactForm({
  defaultValues,
  submitLabel,
  busyLabel = "Saving...",
  onSubmit,
}: ContactFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AdminContactFormValues>({
    resolver: zodResolver(adminContactSchema),
    defaultValues: {
      ...initialValues,
      ...defaultValues,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" error={errors.name?.message} required>
          <Input {...register("name")} placeholder="Contact name" />
        </Field>
        <Field label="Email" error={errors.email?.message} required>
          <Input {...register("email")} type="email" placeholder="name@company.com" />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <Input {...register("phone")} type="tel" placeholder="+91 98765 43210" />
        </Field>
        <Field label="Company" error={errors.company?.message}>
          <Input {...register("company")} placeholder="Company or institution" />
        </Field>
        <Field label="Country" error={errors.country?.message}>
          <Input {...register("country")} placeholder="Country" />
        </Field>
        <Field label="Industry" error={errors.industry?.message}>
          <Input {...register("industry")} placeholder="Industry" />
        </Field>
        <Field label="Product Interest" error={errors.product_interest?.message}>
          <Input {...register("product_interest")} placeholder="Product or service name" />
        </Field>
        <Field label="Status" error={errors.status?.message}>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {contactStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
      </div>

      <Field label="Source Page" error={errors.source_page?.message}>
        <Input {...register("source_page")} placeholder="/contact" />
      </Field>

      <Field label="Message" error={errors.message?.message} required>
        <Textarea
          {...register("message")}
          rows={7}
          placeholder="Capture the enquiry details, requirements, and context."
        />
      </Field>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {busyLabel}
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2.5">
      <Label className="text-base font-semibold text-slate-900">
        {label}
        {required ? <span className="ml-1 text-destructive">*</span> : null}
      </Label>
      {children}
      {error ? <p className="text-sm font-medium text-destructive">{error}</p> : null}
    </div>
  );
}
