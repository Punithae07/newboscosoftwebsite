import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
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

const inquiryTypes = [
  "Engineering Projects",
  "SaaS Platforms",
  "Co-Development",
  "Strategic Partnership",
  "General Inquiry",
];

const interests = [
  "AI Transformation & Automation",
  "Integration & Digital Ecosystems",
  "SaaS Engineering & Modernization",
  "ERP & CRM Implementation",
  "Data Analytics & AI",
  "Cloud Infrastructure & Support",
  "SmartSchoolNxt (School ERP)",
  "HiGrade (Higher Ed ERP)",
  "Acme.erp (Financial Management)",
  "Parokia (Parish Management)",
  "MedSysB (Hospital Management)",
  "Dedicated Engineering Teams",
  "Other",
];

const timelines = [
  "Immediate (< 1 month)",
  "1-3 months",
  "3-6 months",
  "Exploring options",
];

type FormNotice =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;

export function ContactConsultationForm({ sourcePage }: { sourcePage: string }) {
  const [values, setValues] = useState(initialValues);
  const [inquiryType, setInquiryType] = useState("");
  const [timeline, setTimeline] = useState("");
  const [consent, setConsent] = useState(false);
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

    if (!consent) {
      setNotice({
        type: "error",
        message: "Please agree to the privacy policy to submit your inquiry.",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const messageParts = [];
      if (inquiryType) messageParts.push(`Inquiry Type: ${inquiryType}`);
      if (timeline) messageParts.push(`Timeline: ${timeline}`);
      messageParts.push(values.message);

      const finalMessage = messageParts.join("\n\n");

      await submitPublicContact(
        {
          ...values,
          industry: inquiryType || values.industry || "General Inquiry",
          message: finalMessage,
        },
        sourcePage,
      );

      setNotice({
        type: "success",
        message:
          "Thank you for reaching out. Your inquiry has been received. Our team will review it and respond through the contact information you provided.",
      });
      setValues(initialValues);
      setInquiryType("");
      setTimeline("");
      setConsent(false);
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
        <div className="t-eyebrow">Start a Conversation</div>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Tell us about your project
        </h2>
      </div>

      {notice ? (
        <div
          className={`mt-6 rounded-2xl border px-4 py-3 text-sm font-semibold ${notice.type === "success"
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

        <Field label="Full Name" required htmlFor="contact-name">
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

        <Field label="Business Email" required htmlFor="contact-email">
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@organization.com"
            value={values.email}
            onChange={(event) => updateValue("email", event.target.value)}
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

        <Field label="Country / Region" htmlFor="contact-country">
          <input
            id="contact-country"
            name="country"
            type="text"
            autoComplete="country-name"
            placeholder="e.g. India, UAE, United States"
            value={values.country}
            onChange={(event) => updateValue("country", event.target.value)}
            className="h-14 w-full rounded-[1.1rem] border border-border bg-white px-4 text-base font-medium text-foreground shadow-[0_2px_6px_rgba(8,35,58,0.08)] outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
          />
        </Field>

        <Field label="Inquiry Type" htmlFor="contact-inquiry-type">
          <select
            id="contact-inquiry-type"
            name="inquiry_type"
            value={inquiryType}
            onChange={(event) => setInquiryType(event.target.value)}
            className="h-14 w-full rounded-[1.1rem] border border-border bg-white px-4 text-base font-medium text-foreground shadow-[0_2px_6px_rgba(8,35,58,0.08)] outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
          >
            <option value="">Select inquiry type</option>
            {inquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Product or Service of Interest" htmlFor="contact-interest">
          <select
            id="contact-interest"
            name="product_interest"
            value={values.product_interest}
            onChange={(event) => updateValue("product_interest", event.target.value)}
            className="h-14 w-full rounded-[1.1rem] border border-border bg-white px-4 text-base font-medium text-foreground shadow-[0_2px_6px_rgba(8,35,58,0.08)] outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
          >
            <option value="">Select service or product</option>
            {interests.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Optional Timeline" htmlFor="contact-timeline">
          <select
            id="contact-timeline"
            name="timeline"
            value={timeline}
            onChange={(event) => setTimeline(event.target.value)}
            className="h-14 w-full rounded-[1.1rem] border border-border bg-white px-4 text-base font-medium text-foreground shadow-[0_2px_6px_rgba(8,35,58,0.08)] outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
          >
            <option value="">Select expected timeline (optional)</option>
            {timelines.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Phone" htmlFor="contact-phone">
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="numeric"
            value={values.phone}
            onChange={(event) =>
              updateValue("phone", event.target.value.replace(/[^\d+\-\s()]/g, "").slice(0, 20))
            }
            className="h-14 w-full rounded-[1.1rem] border border-border bg-white px-4 text-base font-medium text-foreground shadow-[0_2px_6px_rgba(8,35,58,0.08)] outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
          />
        </Field>

        <Field label="Project Brief" required htmlFor="contact-message" className="sm:col-span-2">
          <textarea
            id="contact-message"
            name="message"
            placeholder="Tell us what you need to build, improve, or connect, including current systems, technical requirements, or business goals."
            value={values.message}
            onChange={(event) => updateValue("message", event.target.value)}
            required
            className="min-h-[144px] w-full rounded-[1.1rem] border border-border bg-white px-4 py-4 text-base font-medium text-foreground shadow-[0_2px_6px_rgba(8,35,58,0.08)] outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15"
          />
        </Field>

        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
              className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-accent"
            />
            <span className="text-sm text-muted-foreground leading-relaxed">
              I agree to the processing of my details and have read the{" "}
              <Link to="/privacy-policy" className="text-foreground underline hover:text-accent font-medium">
                Privacy Policy
              </Link>
              . <span className="text-rose-500">*</span>
            </span>
          </label>
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-14 items-center justify-center rounded-[1.1rem] bg-primary px-7 text-base font-semibold text-primary-foreground shadow-elegant transition hover:translate-y-[-1px] hover:shadow-[0_18px_40px_rgba(7,83,140,0.25)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/20 disabled:cursor-progress disabled:opacity-75"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
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



