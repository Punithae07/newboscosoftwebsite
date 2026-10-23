import { createFileRoute } from "@tanstack/react-router";
import {
  Sparkles,
  Heart,
  ShieldCheck,
  Award,
  Users,
  Layers,
  Rocket,
  CheckCircle2,
  BookOpen,
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
      { title: "About Boscosoft | Enterprise Engineering with Social Impact" },
      {
        name: "description",
        content:
          "Discover Boscosoft’s journey from rural Yelagiri to international enterprise software engineering and SaaS, powered by inclusive talent development.",
      },
      {
        name: "keywords",
        content: "Boscosoft technology company, global software engineering, social impact technology",
      },
      { property: "og:title", content: "About Boscosoft | Enterprise Engineering with Social Impact" },
      {
        property: "og:description",
        content:
          "Discover Boscosoft’s journey from rural Yelagiri to international enterprise software engineering and SaaS, powered by inclusive talent development.",
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
          <h1 className="page-hero-title">An engineering company with an uncommon beginning</h1>
          <p className="page-hero-copy content-measure-wide">
            We help organizations build and modernize software, connect data and workflows, and turn technology investments into systems people can depend on. Our roots in rural Yelagiri Hills also shape how we find talent, develop engineers, and create opportunity.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="t-eyebrow mb-3">Corporate Introduction</div>
            <h2 className="t-section-title mb-6">Serious engineering. A wider sense of purpose.</h2>
            <div className="content-measure-wide stack-copy">
              <p className="t-body-lg">
                Bosco Soft Technologies Pvt. Ltd. combines enterprise software development, domain-specific SaaS platforms, ERP/CRM implementation, data engineering, AI solutions, and long-term technology support.
              </p>
              <p className="t-body-lg text-muted-foreground">
                We work with clients navigating the real challenges of modernization: keeping critical systems stable, integrating new capabilities, and supporting users through change.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-gradient-card shadow-card">
            <img
              src="/images/new-buliding1.png"
              alt="Bosco Soft Technologies building exterior"
              className="aspect-[4/3] h-full min-h-[260px] w-full object-cover"
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

      <Section
        bg="surface"
        eyebrow="Journey"
        title="From an idea on the hills to technology for a connected world"
        subtitle="In 1998, BICS InfoTech took shape at Don Bosco Centre, Yelagiri Hills, to make professional technology training accessible to rural and disadvantaged youth. Learning grew into practical software and service delivery through BOSCO-ITS. Bosco Soft Technologies Pvt. Ltd. was established in February 2011 to grow commercial technology services and career opportunities. Today, the same belief—talent deserves opportunity—continues alongside an expanded engineering and software platform business."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              i: Layers,
              t: "Skills into software",
              d: "Practical training and real-world delivery built the engineering foundation.",
            },
            {
              i: Rocket,
              t: "Services into platforms",
              d: "Recurring industry needs shaped domain products in education, healthcare, finance, faith organizations, and audit.",
            },
            {
              i: Sparkles,
              t: "Applications into ecosystems",
              d: "Integrations, cloud, data, and enterprise workflows connected previously isolated functions.",
            },
            {
              i: Heart,
              t: "Technology into intelligent operations",
              d: "New AI and data approaches open opportunities for responsible automation and better decisions.",
            },
          ].map((entry) => (
            <div
              key={entry.t}
              className="rounded-2xl border border-border bg-background p-6 shadow-card transition-all duration-300 hover:-translate-y-1"
            >
              <entry.i className="mb-3 h-6 w-6 text-accent" />
              <h3 className="t-card-title">{entry.t}</h3>
              <p className="mt-2 t-card-desc">{entry.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Milestones" title="Key milestones along our journey">
        <div className="grid gap-5 lg:grid-cols-4">
          {[
            {
              year: "1998",
              title: "BICS InfoTech at Yelagiri",
              copy: "Rural youth technology training and hands-on exposure.",
            },
            {
              year: "2002",
              title: "Early corporate expansion",
              copy: "Bosco InfoTech Pvt. Ltd. was established; historical activities later consolidated.",
            },
            {
              year: "2011",
              title: "Boscosoft incorporated",
              copy: "Bosco Soft Technologies Pvt. Ltd. established to develop business and rural employment.",
            },
            {
              year: "Today",
              title: "International engineering ambition",
              copy: "Enterprise software services, domain platforms, and a continuing academy-to-industry commitment.",
            },
          ].map((milestone) => (
            <div
              key={milestone.title}
              className="rounded-2xl border border-border bg-background p-6 shadow-card transition-all duration-300 hover:-translate-y-1"
            >
              <div className="t-eyebrow">{milestone.year}</div>
              <h3 className="mt-3 t-card-title">{milestone.title}</h3>
              <p className="mt-3 t-card-desc">{milestone.copy}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="surface" eyebrow="Vision & Mission" title="Why we work the way we do">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-gradient-card p-8 shadow-card">
            <div className="mb-3 t-eyebrow text-accent">Vision</div>
            <p className="t-card-title-lg text-foreground">
              A world where excellent engineering creates enduring value for customers and meaningful opportunity for talented people, wherever they begin.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-gradient-card p-8 shadow-card">
            <div className="mb-3 t-eyebrow text-accent">Mission</div>
            <p className="t-body text-foreground/90">
              Help organizations solve complex technology problems through capable teams, dependable systems, and lasting partnerships while developing pathways into professional technology careers for underserved young people.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Values" title="Principles that guide our engineering and partnerships">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              i: ShieldCheck,
              t: "Integrity",
              d: "Make clear commitments and communicate transparently.",
            },
            {
              i: Award,
              t: "Engineering quality",
              d: "Build for maintainability, reliability, and responsible operation.",
            },
            {
              i: Users,
              t: "Customer partnership",
              d: "Understand the context before prescribing a solution.",
            },
            {
              i: BookOpen,
              t: "Continuous learning",
              d: "Keep teams adaptable to changing technologies.",
            },
            {
              i: Heart,
              t: "Inclusive opportunity",
              d: "Recognize potential and invest in development.",
            },
            {
              i: CheckCircle2,
              t: "Stewardship",
              d: "Respect customer resources, data, and long-term outcomes.",
            },
          ].map((value) => (
            <div
              key={value.t}
              className="rounded-2xl border border-border bg-background p-6 shadow-card transition-all duration-300 hover:-translate-y-1"
            >
              <value.i className="mb-3 h-6 w-6 text-accent" />
              <h3 className="t-card-title">{value.t}</h3>
              <p className="mt-2 t-card-desc">{value.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="surface" eyebrow="Why Trust Us" title="Experience that grows through delivery">
        <div className="max-w-3xl">
          <p className="t-body text-foreground/90">
            Our history spans more than two decades of technology roots, multiple domain platforms, and work with organizations in India and beyond. Final publication of installation counts, countries served, branch locations, and named client logos requires confirmation of the reporting period and authorization.
          </p>
        </div>
      </Section>

      <CTABanner
        title="See what we could build together."
        primary={{ label: "Talk to Our Experts", to: "/contact-us" }}
        secondary={{ label: "Explore SaaS Platforms", to: "/products" }}
      />
    </>
  );
}
