import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { CTABanner } from "@/components/site/CTABanner";

export const Route = createFileRoute("/terms-of-use")({
  head: () => ({
    meta: [
      { title: "Terms of Use | Bosco Soft Technologies " },
      { name: "description", content: "Read the Terms of Use for Bosco Soft Technologies to understand the conditions governing the use of our website and services." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-glow opacity-80 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.24em] text-accent">Legal</p>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Terms of Use
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
              These terms govern your access and use of Bosco Soft Technologies websites, products, and services.
            </p>
          </div>
        </div>
      </section>

      <Section eyebrow="Terms" title="Customer usage and service terms">
        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p>
            By using our platforms and services, you agree to comply with our terms for service delivery, intellectual property, content usage, and account management.
          </p>
          <p>
            We aim for clear, professional engagement with our customers. Our terms describe rights, responsibilities, and the scope of support for digital transformation projects.
          </p>
          <p>
            Please reach out to our team if you need help understanding how these terms apply to your organization.
          </p>
        </div>
      </Section>

      <CTABanner
        title="Need help with terms or compliance?"
        description="Speak with Boscosoft for guidance on contracts, implementation governance, and enterprise procurement." 
        primary={{ label: "Contact Support", to: "/contact" }}
        secondary={{ label: "Read Resources", to: "/resources" }}
      />
    </>
  );
}
