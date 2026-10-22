import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { CTABanner } from "@/components/site/CTABanner";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Bosco Soft Technologies " },
      { name: "description", content: "Read the Privacy Policy of Bosco Soft Technologies to understand how we collect, use, protect, and manage your personal information." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-glow opacity-80 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.24em] text-accent">Legal</p>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
              We are committed to protecting the privacy of visitors, enterprise customers, and partners. This policy explains how information is collected, used, and safeguarded.
            </p>
          </div>
        </div>
      </section>

      <Section eyebrow="Privacy" title="How we protect your data">
        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p>
            Bosco Soft Technologies collects only the information necessary to provide products, services, and support. We do not share personal data without consent and we safeguard information with industry-standard controls.
          </p>
          <p>
            We use data to respond to inquiries, manage customer relationships, improve products, and provide secure access to our platforms. Our systems are designed for enterprise-grade privacy and compliance.
          </p>
          <p>
            If you have questions about our privacy practices, please contact us at binfo@boscosofttech.com.
          </p>
        </div>
      </Section>

      <CTABanner
        title="Ready to discuss your privacy requirements?"
        description="Talk to our team about secure deployment, enterprise compliance, and trusted data handling for your digital transformation." 
        primary={{ label: "Contact Our Team", to: "/contact" }}
        secondary={{ label: "View Resources", to: "/resources" }}
      />
    </>
  );
}
