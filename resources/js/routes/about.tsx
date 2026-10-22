import { createFileRoute } from "@tanstack/react-router";
import {
  Sparkles,
  Heart,
  ShieldCheck,
  Award,
  Users,
  Layers,
  Rocket,
} from "lucide-react";
import { Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTABanner } from "@/components/site/CTABanner";

const partners = [
  { src: "/images/partners/microsoft.avif", alt: "Microsoft Partner | Bosco Soft Technologies | IT Company | Global IT Solutions", width: 400, height: 120 },
  { src: "/images/partners/nttdataservice.avif", alt: "NTT DATA Payment Services | Bosco Soft Technologies Partners | IT Solutions Companys", width: 600, height: 240 },
  { src: "/images/partners/azimpremji.avif", alt: "Azim Premji Foundation | Bosco Soft Technologies Partners | IT Company", width: 600, height: 240 },
  { src: "/images/partners/diggibyte.avif", alt: "Digibyte | Bosco Soft Technologies Partners | IT Solutions Company | Global IT Solutions", width: 600, height: 240 },
] as const;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Bosco Soft Technologies " },
      {
        name: "description",
        content:
          "Learn about Bosco Soft Technologies, an IT consulting & services company delivering AI, ERP, SaaS, cloud, and digital transformation solutions.",
      },
      { property: "og:title", content: "About Bosco Soft Technologies" },
      {
        property: "og:description",
        content: "Technology partner for enterprises and institutions.",
      },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <Breadcrumbs items={[{ label: "About" }]} variant="light" />
          <h1 className="page-hero-title">About Bosco Soft Technologies</h1>
          <p className="page-hero-copy content-measure-wide">
            We help organizations modernize operations, connect systems, adopt AI responsibly, and
            scale through domain-focused platforms and digital transformation services.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,420px)]">
          <div className="content-measure-wide stack-copy">
            <p className="t-body-lg">
              Bosco Soft Technologies Pvt. Ltd., owned, managed, and operated by the Salesians of Don Bosco, is a technology partner focused on helping enterprises and institutions become more connected, efficient, data-driven, and future-ready.
            </p>
            <p className="t-body-lg">
              Our work spans AI-enabled SaaS platforms, enterprise integrations, ERP/CRM implementation, cloud infrastructure, analytics, workflow automation, and long-term digital transformation support.
            </p>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-gradient-card shadow-card">
            <img
              src="/images/new-buliding1.png"
              alt="Bosco Soft Technologies building exterior"
              className="h-full min-h-[260px] w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </Section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="mb-6 flex justify-center text-center">
            <div className="t-eyebrow text-muted-foreground">Partnered with leading enterprises</div>
          </div>
          <div className="grid grid-cols-2 items-center justify-items-center gap-6 md:grid-cols-3 lg:grid-cols-4">
            {partners.map((partner, index) => (
              <div key={partner.alt} className="grid h-14 place-items-center">
                <img
                  src={partner.src}
                  alt={partner.alt}
                  width={partner.width}
                  height={partner.height}
                  className="max-h-12 max-w-full object-contain opacity-80 transition-opacity hover:opacity-100"
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={index < 2 ? "high" : "low"}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Section bg="surface" eyebrow="Our Journey" title="How Boscosoft has evolved">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              i: Layers,
              t: "From Custom Dev to AI Platforms",
              d: "We built deep platform IP across domains.",
            },
            {
              i: Rocket,
              t: "From Projects to SaaS",
              d: "Multi-tenant, scalable, cloud-native delivery.",
            },
            {
              i: Sparkles,
              t: "From Apps to Integrated Systems",
              d: "Connected ecosystems, not isolated tools.",
            },
            {
              i: Heart,
              t: "From Systems to AI-Driven Workflows",
              d: "Responsible AI adoption with clear outcomes.",
            },
          ].map((entry) => (
            <div
              key={entry.t}
              className="rounded-2xl border border-border bg-background p-6 shadow-card"
            >
              <entry.i className="mb-3 h-6 w-6 text-accent" />
              <h3 className="t-card-title">{entry.t}</h3>
              <p className="mt-2 t-card-desc">{entry.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Milestones" title="A story of steady expansion and practical innovation">
        <div className="grid gap-5 lg:grid-cols-4">
          {[
            {
              year: "1999",
              title: "Founded with a product mindset",
              copy: "Started by solving real operational challenges with durable software systems.",
            },
            {
              year: "2010+",
              title: "Scaled into domain platforms",
              copy: "Expanded from project execution into repeatable ERP and SaaS products.",
            },
            {
              year: "2020+",
              title: "Connected ecosystems",
              copy: "Added integration, analytics, cloud, and modernization capability across sectors.",
            },
            {
              year: "Today",
              title: "AI-enabled transformation",
              copy: "Helping organizations adopt AI responsibly on top of strong digital foundations.",
            },
          ].map((milestone) => (
            <div
              key={milestone.title}
              className="rounded-2xl border border-border bg-background p-6 shadow-card"
            >
              <div className="t-eyebrow">{milestone.year}</div>
              <h3 className="mt-3 t-card-title">{milestone.title}</h3>
              <p className="mt-3 t-card-desc">{milestone.copy}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Vision & Mission" title="Why we exist">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-gradient-card p-8 shadow-card">
            <div className="mb-3 t-eyebrow">Vision</div>
            <p className="t-card-title-lg text-foreground">Innovate and Lead.</p>
            <p className="mt-3 t-body text-muted-foreground">
              Innovating emerging technologies. Leading digital ecosystems. Transforming
              institutional operations.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-gradient-card p-8 shadow-card">
            <div className="mb-3 t-eyebrow">Mission</div>
            <p className="content-measure t-body text-muted-foreground">
              We strive to achieve optimal results in the interest of stakeholders, employing
              cutting-edge technologies, involving committed associates, driven by innovation and
              leadership.
            </p>
          </div>
        </div>
      </Section>

      <Section bg="surface" eyebrow="Values" title="What we stand for">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              i: ShieldCheck,
              t: "Integrity",
              d: "Integrity in technology, relationships, and delivery.",
            },
            {
              i: Award,
              t: "Commitment",
              d: "Dedicated to long-term outcomes and dependable execution.",
            },
            {
              i: Heart,
              t: "Customer Delight",
              d: "Focused on meaningful experiences and client trust.",
            },
            {
              i: Sparkles,
              t: "Technology Innovation & Leadership",
              d: "Driving progress through future-ready solutions.",
            },
            {
              i: Users,
              t: "Stakeholder Participation",
              d: "Engaging partners, teams, and communities in the journey.",
            },
            {
              i: Layers,
              t: "Quality Focus",
              d: "Building reliable, scalable, and well-governed systems.",
            },
            {
              i: Rocket,
              t: "Youth Empowerment",
              d: "Nurturing talent, innovation, and future growth.",
            },
          ].map((value) => (
            <div
              key={value.t}
              className="rounded-2xl border border-border bg-background p-6 shadow-card"
            >
              <value.i className="mb-3 h-6 w-6 text-accent" />
              <h3 className="t-card-title">{value.t}</h3>
              <p className="mt-2 t-card-desc">{value.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Why Trust Us" title="Why clients trust Boscosoft">
        <div className="grid gap-5 md:grid-cols-4">
          {[
            { v: "25+", l: "Years of experience" },
            { v: "2,600+", l: "Institutions served" },
            { v: "22+", l: "Countries reached" },
            { v: "India + UAE", l: "Delivery presence" },
          ].map((stat) => (
            <div
              key={stat.l}
              className="rounded-2xl border border-border bg-gradient-card p-6 shadow-card"
            >
              <div className="t-stat-value">{stat.v}</div>
              <div className="mt-2 t-stat-label">{stat.l}</div>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        title="Let's build your digital transformation roadmap"
        primary={{ label: "Talk to Our Experts", to: "/contact" }}
        secondary={{ label: "Explore Our Platforms", to: "/products" }}
      />
    </>
  );
}






