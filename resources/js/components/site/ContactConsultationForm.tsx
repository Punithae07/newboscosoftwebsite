import { useEffect, useState } from "react";
import { submitPublicContact, type PublicContactFormValues } from "@/lib/contacts";
import { warmSecureFormChallenge } from "@/lib/public-form-security";

const initialValues: PublicContactFormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  country: "",
  industry: "",
  product_interest: "",
  message: "",
  botcheck: "",
};

const industries = [
  "Education",
  "Healthcare",
  "Finance & Microfinance",
  "NGOs",
  "Enterprises",
  "Audit & Compliance",
  "Faith-Based Organizations",
  "Others",
];

const interests = [
  "Product Demo",
  "AI Transformation",
  "ERP Implementation",
  "SaaS Modernization",
  "Integration",
  "Cloud",
  "Support",
  "Partnership",
];

type FormNotice =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;

export function ContactConsultationForm({ sourcePage }: { sourcePage: string }) {
  const [values, setValues] = useState(initialValues);
  const [notice, setNotice] = useState<FormNotice>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    void warmSecureFormChallenge("contact").catch(() => {
      // Silence preload errors and let submit show the real failure state.
    });
  }, []);

  function updateValue(name: keyof PublicContactFormValues, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);

    try {
      setIsSubmitting(true);

      const response = await submitPublicContact(values, sourcePage);

      setNotice({
        type: "success",
        message: response.message,
      });
      setValues(initialValues);
    } catch (error) {
      setNotice({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not send your message right now. Please try again shortly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="rounded-[2rem] border border-border bg-background p-6 shadow-card sm:p-8">
      <div className="border-b border-border/80 pb-5">
        <div className="t-eyebrow">Request a Consultation</div>
      </div>

      {notice ? (
        <div
          className={`mt-6 rounded-2xl border px-4 py-3 text-sm font-semibold ${
            notice.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-rose-200 bg-rose-50 text-rose-700"
          }`}
          aria-live="polite"
        >
          {notice.message}
        </div>
      ) : null}

      <form className="mt-6 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="botcheck"
          value={values.botcheck}
          onChange={(event) => updateValue("botcheck", event.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <Field label="Name" required htmlFor="contact-name">
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            value={values.name}
            onChange={(event) => updateValue("name", event.target.value)}
            required
            className="h-14 w-full rounded-[1.1rem] border border-border bg-white px-4 text-base font-medium text-foreground shadow-[0_2px_6px_rgba(8,35,58,0.08)] outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
          />
        </Field>

        <Field label="Organization" htmlFor="contact-company">
          <input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Company or institution"
            value={values.company}
            onChange={(event) => updateValue("company", event.target.value)}
            className="h-14 w-full rounded-[1.1rem] border border-border bg-white px-4 text-base font-medium text-foreground shadow-[0_2px_6px_rgba(8,35,58,0.08)] outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
          />
        </Field>

        <Field label="Email" required htmlFor="contact-email">
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@company.com"
            value={values.email}
            onChange={(event) => updateValue("email", event.target.value)}
            required
            className="h-14 w-full rounded-[1.1rem] border border-border bg-white px-4 text-base font-medium text-foreground shadow-[0_2px_6px_rgba(8,35,58,0.08)] outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
          />
        </Field>

        <Field label="Phone" required htmlFor="contact-phone">
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="numeric"
            placeholder="+91 98765 43210"
            value={values.phone}
            onChange={(event) =>
              updateValue("phone", event.target.value.replace(/[^\d+\-\s()]/g, "").slice(0, 20))
            }
            required
            className="h-14 w-full rounded-[1.1rem] border border-border bg-white px-4 text-base font-medium text-foreground shadow-[0_2px_6px_rgba(8,35,58,0.08)] outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
          />
        </Field>

        <Field label="Country" htmlFor="contact-country">
          <input
            id="contact-country"
            name="country"
            type="text"
            autoComplete="country-name"
            placeholder="Country"
            value={values.country}
            onChange={(event) => updateValue("country", event.target.value)}
            className="h-14 w-full rounded-[1.1rem] border border-border bg-white px-4 text-base font-medium text-foreground shadow-[0_2px_6px_rgba(8,35,58,0.08)] outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
          />
        </Field>

        <Field label="Industry" htmlFor="contact-industry">
          <select
            id="contact-industry"
            name="industry"
            value={values.industry}
            onChange={(event) => updateValue("industry", event.target.value)}
            className="h-14 w-full rounded-[1.1rem] border border-border bg-white px-4 text-base font-medium text-foreground shadow-[0_2px_6px_rgba(8,35,58,0.08)] outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
          >
            <option value="">Select industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </Field>

        <Field label="I'm interested in" required htmlFor="contact-interest" className="sm:col-span-2">
          <select
            id="contact-interest"
            name="product_interest"
            value={values.product_interest}
            onChange={(event) => updateValue("product_interest", event.target.value)}
            required
            className="h-14 w-full rounded-[1.1rem] border border-border bg-white px-4 text-base font-medium text-foreground shadow-[0_2px_6px_rgba(8,35,58,0.08)] outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
          >
            <option value="">Select an interest</option>
            {interests.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Message" required htmlFor="contact-message" className="sm:col-span-2">
          <textarea
            id="contact-message"
            name="message"
            placeholder="Tell us a bit about your goals, current systems, or timeline."
            value={values.message}
            onChange={(event) => updateValue("message", event.target.value)}
            required
            className="min-h-[144px] w-full rounded-[1.1rem] border border-border bg-white px-4 py-4 text-base font-medium text-foreground shadow-[0_2px_6px_rgba(8,35,58,0.08)] outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
          />
        </Field>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-14 items-center justify-center rounded-[1.1rem] bg-primary px-7 text-base font-semibold text-primary-foreground shadow-elegant transition hover:translate-y-[-1px] hover:shadow-[0_18px_40px_rgba(7,83,140,0.25)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/20 disabled:cursor-progress disabled:opacity-75"
          >
            {isSubmitting ? "Sending..." : "Send Inquiry"}
          </button>
        </div>
      </form>
    </section>
  );
}

function Field({
  label,
  required = false,
  htmlFor,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className={className}>
      <span className="mb-2 block text-[1.05rem] font-semibold text-foreground">
        {label}
        {required ? <span className="ml-1 text-rose-500">*</span> : null}
      </span>
      {children}
    </label>
  );
}



