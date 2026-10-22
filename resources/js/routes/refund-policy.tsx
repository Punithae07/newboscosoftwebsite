import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { CTABanner } from "@/components/site/CTABanner";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy | Bosco Soft Technologies " },
      { name: "description", content: "Review the Refund Policy of Bosco Soft Technologies for information about refunds, cancellations, eligibility, and service terms." },
    ],
  }),
  component: RefundPolicyPage,
});

function RefundPolicyPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-glow opacity-80 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.24em] text-accent">Legal</p>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Refund Policy
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
              Our refund policy explains eligibility, timelines, and how Boscosoft handles cancellations for products, services, and support contracts.
            </p>
          </div>
        </div>
      </section>

      <Section eyebrow="Refund" title="Refund guidelines for services and subscriptions">
        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p>
            Refunds are considered case-by-case and depend on the service agreement, project milestones, and delivery status. For digital products, access charges, and ongoing subscription services, we evaluate requests in line with our contractual commitments.
          </p>
          <p>
            In general, refund requests should be submitted in writing to our support team within 30 days of purchase. We deliver transparent guidance on eligibility, prorated returns, and any applicable service fees.
          </p>
          <p>
            Please contact us at binfo@boscosofttech.com with your order details so we can review your request and assist promptly.
          </p>
        </div>
      </Section>

      <CTABanner
        title="Questions about refunds or service terms?"
        description="Reach out to Boscosoft to understand your options and next steps for implementation, licensing, or contract changes."
        primary={{ label: "Contact Support", to: "/contact" }}
        secondary={{ label: "Review Terms", to: "/terms-of-use" }}
      />
    </>
  );
}
