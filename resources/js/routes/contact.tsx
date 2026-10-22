import { createFileRoute } from "@tanstack/react-router";
import { useRouterState } from "@tanstack/react-router";
import {
  CheckCircle2,
  Clock3,
  Mail,
  Phone,
} from "lucide-react";
import { Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ContactConsultationForm } from "@/components/site/ContactConsultationForm";

import { companyContact } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Bosco Soft Technologies" },
      {
        name: "description",
        content:
          "Talk to Boscosoft about a product demo, AI transformation, ERP/CRM implementation, SaaS modernization, integration, cloud, or support.",
      },
      { property: "og:title", content: "Contact Boscosoft" },
      {
        property: "og:description",
        content: "Let's talk about your digital transformation goals.",
      },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const engagementPoints = [
  "Free consultation with the right domain specialist",
  "Product demo or solution-fit guidance based on your goals",
  "Response from our team within 24 hours on business days",
];

const consultationSignals = [
  { label: "Business hours", value: "Monday to Friday, 9:00 AM to 6:00 PM IST" },
  { label: "Response window", value: "Within 24 business hours for most inquiries" },
  {
    label: "Best for",
    value: "Product demos, ERP/CRM projects, AI modernization, and cloud planning",
  },
];

export function ContactPage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d104792.83434429424!2d78.5268132125547!3d12.556713640930164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bac5479d7985c59%3A0x87189b52ee2bb632!2sBosco%20Soft%20Technologies%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1781515587038!5m2!1sen!2sin";

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <Breadcrumbs items={[{ label: "Contact" }]} variant="light" />
          <h1 className="page-hero-title">
            Let&apos;s talk about your digital transformation goals
          </h1>
          <p className="page-hero-copy content-measure-wide">
            Whether you are planning an AI initiative, requesting a product demo, modernizing ERP,
            or connecting systems across teams, we can help you map the next step clearly.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid items-start gap-8 lg:grid-cols-5">
          <aside className="order-2 space-y-6 lg:order-1 lg:col-span-2 animate-slide-right">
            <div className="rounded-[2rem] border border-border bg-gradient-card p-7 shadow-card">
              <div className="t-eyebrow">Talk to Us</div>
              <h2 className="mt-3 t-section-title">Plan your next move with confidence</h2>
              <div className="mt-6 space-y-4">
                {engagementPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                    <p className="t-body-sm text-foreground">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <InfoCard icon={Clock3} title="Response Time">
                Most inquiries receive a response within 24 hours on business days.
              </InfoCard>
              <InfoCard icon={Mail} title="Email">
                <a href={`mailto:${companyContact?.email || "info@boscosofttech.com"}`} className="hover:text-foreground">
                  {companyContact?.email || "info@boscosofttech.com"}
                </a>
                <br />
                <a
                  href={`mailto:${companyContact?.middleEastEmail || "info@boscosoft.ae"}`}
                  className="hover:text-foreground"
                >
                  {companyContact?.middleEastEmail || "info@boscosoft.ae"}
                </a>
              </InfoCard>
              <InfoCard icon={Phone} title="Phone">
                <a href={`tel:${companyContact?.phone?.replace(/\s+/g, "") || "+919626800800"}`} className="hover:text-foreground">
                  {companyContact?.phone || "+91 9626 800 800"}
                </a>
                <br />
                <a href={`tel:${companyContact?.middleEastPhone?.replace(/\s+/g, "") || "+971588601821"}`} className="hover:text-foreground">
                  {companyContact?.middleEastPhone || "+971 058 860 1821"}
                </a>
              </InfoCard>
            </div>

            <div className="rounded-[2rem] border border-border bg-background p-7 shadow-card">
              <div className="t-eyebrow">What to expect</div>
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

          <div className="order-1 relative z-10 lg:order-2 lg:col-span-3 animate-slide-left">
            <ContactConsultationForm sourcePage={pathname || "/contact-us"} />

            <div className="mt-6 overflow-hidden rounded-[2rem] border border-border bg-background shadow-card lg:mt-8">
              <iframe
                title="Bosco Soft Technologies location map"
                src={mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[340px] w-full border-0 md:h-[380px] lg:h-[420px]"
              />
            </div>
          </div>
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

