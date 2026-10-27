import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useRouterState } from "@tanstack/react-router";
import {
  Code,
  Layers,
  Users2,
  Handshake,
  Mail,
  Phone,
  MapPin,
  Clock3,
  Globe2,
  Building2,
  Sparkles,
} from "lucide-react";
import { Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ContactConsultationForm } from "@/components/site/ContactConsultationForm";
import { Button } from "@/components/ui/button";
import { companyContact } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Boscosoft | Enterprise Engineering & SaaS Demos" },
      {
        name: "description",
        content:
          "Talk with Boscosoft about software modernization, AI, dedicated engineering teams, enterprise integrations, or industry SaaS platforms.",
      },
      { name: "keywords", content: "contact Boscosoft, enterprise software consultation, SaaS demos, dedicated engineering teams, software modernization" },
      { property: "og:title", content: "Contact Boscosoft | Enterprise Engineering & SaaS Demos" },
      {
        property: "og:description",
        content:
          "Talk with Boscosoft about software modernization, AI, dedicated engineering teams, enterprise integrations, or industry SaaS platforms.",
      },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const contactPaths = [
  {
    title: "Engineering projects",
    description: "Talk through your business challenge, technology environment, timeline, and desired outcomes.",
    cta: "Discuss a Project",
    icon: Code,
  },
  {
    title: "SaaS platforms",
    description: "Tell us your organization type, sites, main requirements, and preferred demo time.",
    cta: "Request a Demo",
    icon: Layers,
  },
  {
    title: "Co-development",
    description: "Share your stack, team needs, expected working model, and product stage.",
    cta: "Explore Dedicated Teams",
    icon: Users2,
  },
  {
    title: "Strategic partnership",
    description: "Tell us the market, clients, solution focus, and partnership model you have in mind.",
    cta: "Propose a Partnership",
    icon: Handshake,
  },
];

const consultationSignals = [
  { label: "Business hours", value: "Monday to Friday, 9:00 AM to 6:00 PM IST" },
  { label: "Response expectation", value: "Our team will review your inquiry and respond through the contact information provided" },
  {
    label: "Best for",
    value: "Product demos, software modernization, AI workflow implementation, and dedicated co-development",
  },
];

export function ContactPage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const hash = useRouterState({ select: (state) => state.location.hash });
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d104792.83434429424!2d78.5268132125547!3d12.556713640930164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bac5479d7985c59%3A0x87189b52ee2bb632!2sBosco%20Soft%20Technologies%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1781515587038!5m2!1sen!2sin";

  const scrollToForm = () => {
    const el = document.getElementById("contact-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const shouldScroll =
      hash === "contact-form" ||
      (typeof window !== "undefined" && window.location.hash === "#contact-form");

    if (shouldScroll) {
      const timer = setTimeout(() => {
        scrollToForm();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [hash, pathname]);

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <Breadcrumbs items={[{ label: "Contact" }]} variant="light" />
          <div className="mt-8 max-w-4xl animate-fade-up">
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/92">
              Start a Practical Conversation
            </div>
            <h1 className="page-hero-title mt-5">
              Tell us what you need to build, improve, or connect
            </h1>
            <p className="page-hero-copy mt-5 max-w-3xl">
              Whether your next step is modernizing an established platform, exploring AI, extending
              your engineering team, or evaluating a SaaS product, start with a practical conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Paths */}
      <Section
        eyebrow="Engagement Paths"
        title="Choose how you'd like to collaborate"
        subtitle="Select the conversation path that matches your operational requirements."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactPaths.map((path) => {
            const Icon = path.icon;
            return (
              <div
                key={path.title}
                className="group flex flex-col justify-between rounded-[1.75rem] border border-border/80 bg-gradient-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-elegant"
              >
                <div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-foreground">{path.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {path.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/60">
                  <Button
                    type="button"
                    onClick={scrollToForm}
                    variant="outline"
                    className="w-full border-accent/30 bg-accent/5 text-accent hover:bg-accent hover:text-white transition-all text-xs font-semibold py-2"
                  >
                    {path.cta}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Main Form and Consultation Details */}
      <Section>
        <div className="grid items-start gap-8 lg:grid-cols-5">
          <aside className="order-2 space-y-6 lg:order-1 lg:col-span-2 animate-slide-right">
            <div className="rounded-[2rem] border border-border bg-gradient-card p-7 shadow-card">
              <div className="t-eyebrow">Direct Contact</div>
              <h2 className="mt-3 t-section-title">Get in touch directly</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Connect with our team across our India delivery centers and UAE coordination office.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <InfoCard icon={Mail} title="Email Inquiries">
                <a href={`mailto:${companyContact?.email || "info@boscosofttech.com"}`} className="hover:text-accent font-medium">
                  {companyContact?.email || "info@boscosofttech.com"}
                </a>
                <br />
                <a
                  href={`mailto:${companyContact?.middleEastEmail || "info@boscosoft.ae"}`}
                  className="hover:text-accent font-medium text-xs text-muted-foreground mt-1 inline-block"
                >
                  UAE: {companyContact?.middleEastEmail || "info@boscosoft.ae"}
                </a>
              </InfoCard>

              <InfoCard icon={Phone} title="Direct Calling">
                <a href={`tel:${companyContact?.phone?.replace(/\s+/g, "") || "+919626800800"}`} className="hover:text-accent font-medium">
                  {companyContact?.phone || "+91 9626 800 800"}
                </a>
                <br />
                <a
                  href={`tel:${companyContact?.middleEastPhone?.replace(/\s+/g, "") || "+971588601821"}`}
                  className="hover:text-accent font-medium text-xs text-muted-foreground mt-1 inline-block"
                >
                  UAE: {companyContact?.middleEastPhone || "+971 058 860 1821"}
                </a>
              </InfoCard>

              <InfoCard icon={Clock3} title="Business Hours & Response">
                <p className="text-foreground font-medium">Monday to Friday, 9:00 AM to 6:00 PM IST</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Our team reviews all inquiries promptly and follows up through the contact details you share.
                </p>
              </InfoCard>
            </div>

            <div className="rounded-[2rem] border border-border bg-background p-7 shadow-card">
              <div className="t-eyebrow">Consultation Scope</div>
              <div className="mt-5 space-y-4">
                {consultationSignals.map((item) => (
                  <div
                    key={item.label}
                    className="border-b border-border/70 pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="text-sm font-semibold text-foreground">{item.label}</div>
                    <p className="mt-1 t-body-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div id="contact-form" className="order-1 relative z-10 lg:order-2 lg:col-span-3 animate-slide-left scroll-mt-28">
            <ContactConsultationForm sourcePage={pathname || "/contact-us"} />
          </div>
        </div>
      </Section>

      {/* Locations Section */}
      <Section
        eyebrow="Global Presence"
        title="An international outlook, rooted in India"
        subtitle="Our engineering and talent development roots are in Yelagiri Hills, with corporate and delivery operations in India and a documented UAE presence. For US inquiries, describe service coverage and offshore co-development capabilities without implying an established US legal entity or office unless separately verified."
        introWidth="wide"
      >
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-border/80 bg-gradient-card p-6 shadow-card">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-foreground">Talent & Delivery Roots</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              <strong>Yelagiri Hills, Tamil Nadu, India</strong><br />
              Technology Innovation Campus & Engineering Talent Academy.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-border/80 bg-gradient-card p-6 shadow-card">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <Building2 className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-foreground">Middle East Operations</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              <strong>Dubai, United Arab Emirates</strong><br />
              Documented UAE regional presence coordinating Gulf client relationships and implementations.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-border/80 bg-gradient-card p-6 shadow-card">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <Globe2 className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-foreground">International Service Coverage</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              <strong>US & Global Offshore Delivery</strong><br />
              Full service coverage and offshore co-development capabilities aligned to international client timezones and sprint standards.
            </p>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-border bg-background shadow-card">
          <iframe
            title="Bosco Soft Technologies location map"
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[340px] w-full border-0 md:h-[380px] lg:h-[420px]"
          />
        </div>
      </Section>
    </>
  );
}

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.5rem] border border-border bg-background p-6 shadow-card">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-accent" />
        <h3 className="t-card-title">{title}</h3>
      </div>
      <div className="content-measure mt-3 t-body-sm">{children}</div>
    </div>
  );
}
