import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { CTABanner } from "@/components/site/CTABanner";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security | Bosco Soft Technologies " },
      { name: "description", content: "Learn how Bosco Soft Technologies protects customer data through secure infrastructure, privacy controls, and cybersecurity best practices." },
    ],
  }),
  component: SecurityPage,
});

function SecurityPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-glow opacity-80 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.24em] text-accent">Legal</p>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Security Practices
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
              Learn about the security and cloud controls Boscosoft applies to protect customer platforms and data.
            </p>
          </div>
        </div>
      </section>

      <Section eyebrow="Security" title="Enterprise-grade controls and monitoring">
        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p>
            Bosco Soft Technologies follows secure development, cloud deployment, and monitoring practices to protect applications, customer data, and operational workflows.
          </p>
          <p>
            Our security approach includes secure architecture, role-based access, encryption, backups, and ongoing support for compliance requirements.
          </p>
          <p>
            Contact us to discuss how we can secure your next digital transformation program.
          </p>
        </div>
      </Section>

      <CTABanner
        title="Discuss your security and governance needs"
        description="Let our team help you design secure, compliant, and resilient enterprise applications and cloud platforms." 
        primary={{ label: "Talk Security", to: "/contact" }}
        secondary={{ label: "View Resources", to: "/resources" }}
      />
    </>
  );
}
