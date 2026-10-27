import {
  ArrowRight,
  Bot,
  Briefcase,
  CheckCircle2,
  Church,
  FileCheck2,
  GraduationCap,
  Heart,
  Landmark,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { FeatureCarousel } from "@/components/site/FeatureCarousel";
import { ClientLogosScroll } from "@/components/site/ClientLogosScroll";
import { SuccessStoriesStacked } from "@/components/site/SuccessStoriesStacked";
import { products as productsData, type ProductSlug } from "@/lib/site-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Product = (typeof productsData)[ProductSlug];

const iconMap = {
  smartschoolnxt: GraduationCap,
  higrade: GraduationCap,
  "acme-erp": Landmark,
  microfund: Briefcase,
  medsysb: Heart,
  "cristo-suite": Church,
  eaudithub: FileCheck2,
} as const;

const productWebsiteMap: Record<ProductSlug, string> = {
  smartschoolnxt: "https://smartschoolonline.com/",
  higrade: "https://higrade.live/",
  "acme-erp": "https://www.acmeerp.org/",
  microfund: "https://microfund.in/",
  medsysb: "https://medsysb.com/",
  "cristo-suite": "https://cristoerp.com/",
  eaudithub: "https://eaudithub.com/",
};

export function ProductPage({ product }: { product: Product }) {
  const Icon = iconMap[product.slug];
  const productWebsite = productWebsiteMap[product.slug];
  const heroHeadline = product.headline;
  const featureItems =
    product.featureItems?.map((item, i) => ({
      title: item.title,
      description: item.description,
      number: i + 1,
    })) ??
    product.modules.map((m, i) => ({
      title: m,
      description:
        "Structured workflows that help teams reduce manual effort and improve operational clarity.",
      number: i + 1,
    }));
  const productFaqs =
    product.faqs && product.faqs.length > 0
      ? product.faqs
      : product.slug === "eaudithub"
      ? [
          {
            q: "Is it cloud-friendly, mobile-friendly, and user-friendly?",
            a: "Yes. eAUDITHub is built for modern audit teams that need secure cloud access, smooth mobile audit workflows, and a user-friendly experience for faster adoption across teams.",
          },
          {
            q: "How easily can I tailor it to fit my business?",
            a: "It can be tailored around your audit workflows, checklist structures, compliance needs, reporting requirements, and approval processes so the platform fits the way your team already works.",
          },
          {
            q: "Will it help us achieve a paperless audit?",
            a: "Yes! eAUDITHub simplifies the entire auditing process, from planning to corrective action. It captures data electronically, standardizes procedures, and provides real-time insights. Say goodbye to paper-based audits and hello to efficiency.",
          },
          {
            q: "Will it help us with analytics?",
            a: "When administration management is needed, eAUDITHub is a solution with security, audit, and compliance features. There is data aggregation and work activity.",
          },
        ]
      : product.slug === "microfund"
        ? [
            {
              q: "What is MicroFUND?",
              a: "MicroFUND is a platform that enables self-reliant, community-owned financial institutions to offer essential financial services, including microloans, to individuals and small businesses. It aims to bridge the gap between ambition and opportunity by providing accessible, efficient, and transparent funding options.",
            },
            {
              q: "Who can benefit from MicroFUND?",
              a: "MicroFUND is designed for self-reliant community finance institutions, cooperatives, NGOs, lenders, entrepreneurs, and small businesses that need reliable microloan and financial-service workflows.",
            },
            {
              q: "What services does MicroFUND offer?",
              a: "It supports core microfinance operations such as loan origination, borrower management, disbursement, repayments, collections, savings, compliance reporting, and impact visibility through one connected platform.",
            },
            {
              q: "How does MicroFUND integrate technology into its services?",
              a: "MicroFUND uses connected digital workflows, field mobility, reporting, and analytics to make financial operations more efficient, transparent, and easier to manage. It is mobile-friendly and user-friendly, helping teams work efficiently without unnecessary complexity.",
            },
          ]
        : [
            {
              q: `Who is ${product.name} for?`,
              a: `${product.name} is designed for ${product.idealUsers.join(", ").toLowerCase()}.`,
            },
            {
              q: `What operations does ${product.name} support?`,
              a: `It supports ${product.modules.slice(0, 8).join(", ").toLowerCase()}, and related reporting workflows.`,
            },
            {
              q: `Is ${product.name} AI-ready?`,
              a: "Yes. It creates a structured digital foundation that can support automation, AI-ready reporting, and future intelligence-led use cases.",
            },
            {
              q: "Do you offer implementation support?",
              a: "Yes. Implementation support, training, customization, and long-term technical support are part of the Boscosoft partnership model.",
            },
          ];

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 pointer-events-none bg-gradient-glow opacity-70" />
        <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-10 md:pb-20 md:pt-14 lg:px-8">
          <div>
            <Breadcrumbs
              items={[{ label: "Platforms", to: "/products" }, { label: product.name }]}
              variant="light"
            />
          </div>
          <div className="mt-8 grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="animate-fade-up lg:col-span-7">
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-sm font-medium backdrop-blur">
                {product.eyebrow || product.category}
              </div>
              <h1 className="page-hero-title mt-5">{heroHeadline}</h1>
              <p className="page-hero-copy mt-5 max-w-2xl text-primary-foreground/90">
                {product.subheadline}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary shadow-glow hover:bg-white/90"
                >
                  <Link to="/contact-us" preload="intent">
                    {product.heroCtas?.primary?.label || "Request a Demo"} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                >
                  <a href={product.heroCtas?.secondary?.href || productWebsite} target="_blank" rel="noreferrer" className="text-white">
                    {product.heroCtas?.secondary?.label || "Explore Features"}
                  </a>
                </Button>
              </div>
            </div>
            <div className="animate-fade-up lg:col-span-5">
              <div className="relative animate-float-slow rounded-2xl border border-white/20 bg-white/10 p-3 shadow-glow backdrop-blur">
                <div className="absolute -left-4 -top-4 grid h-16 w-16 place-items-center rounded-2xl bg-white text-primary shadow-card">
                  <Icon className="h-8 w-8 text-accent" />
                </div>
                <img
                  src={product.heroImage}
                  alt={`${product.name} platform preview`}
                  decoding="async"
                  className="aspect-4/3 w-full rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {product.productItems?.length ? (
        <Section eyebrow="Suite Lineup" title={product.productSuiteTitle || `${product.name} Product Lineup`} subtitle={product.productSuiteIntro}>
          <div className="grid gap-5 md:grid-cols-2">
            {product.productItems.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-background p-6 shadow-card transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="t-card-title">{item.title}</div>
                    {item.logo ? (
                      <div className="flex h-14 w-full items-center justify-start rounded-xl border border-border/70 bg-white px-4 shadow-sm sm:w-40 sm:justify-center">
                        <img
                          src={item.logo}
                          alt={`${item.title} logo`}
                          loading="lazy"
                          decoding="async"
                          className="max-h-10 w-auto object-contain"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
                <p className="t-card-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      <Section
        eyebrow="Features"
        title={product.featuresTitle || `Comprehensive ${product.name} Capabilities`}
        subtitle={product.featuresIntro ?? product.description}
      >
        <FeatureCarousel items={featureItems} />
        <div className="mt-8 flex items-center justify-between">
          <Button asChild size="sm" className="bg-gradient-cta text-primary-foreground">
            <a href={productWebsite} target="_blank" rel="noreferrer" className="text-primary-foreground">
              {product.featuresCta || "See All Modules"} <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-6 rounded-full bg-accent" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent/40" />
          </div>
        </div>
      </Section>

      <Section
        bg="surface"
        eyebrow="Advantages"
        title={product.advantagesTitle || `Why ${product.name} is the Better Choice`}
        subtitle={
          product.advantagesIntro ??
          "Purpose-built for organizations that need clarity, accountability, connected workflows, and long-term digital readiness."
        }
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {(product.advantageItems ??
            product.benefits.concat(product.modules.slice(3, 7)).slice(0, 9).map((b) => ({
              title: b,
              description: "Supports faster work, cleaner records, and better management visibility.",
            }))).map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-background p-6 shadow-card transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-4 flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="t-card-title">{item.title}</div>
                </div>
                {item.description ? <p className="mt-3 t-card-desc">{item.description}</p> : null}
              </div>
            ))}
        </div>
      </Section>

      <Section>
        <SuccessStoriesStacked
          eyebrow="Success Stories"
          title={
            product.caseStudiesTitle ||
            (product.slug === "higrade"
              ? "Trusted by Higher Education Institutions"
              : `Trusted by ${product.category} Teams`)
          }
          subtitle={
            product.caseStudiesCopy ||
            `Discover why organizations choose ${product.name} to modernize operations with structured workflows and better visibility.`
          }
          testimonials={product.testimonials}
          sideImage={product.successStoriesImage}
          imageAlt={`${product.name} success story`}
          imageBadgeLabel="Customer Impact"
          imageClassName={
            product.slug === "medsysb" ? "bg-white object-contain object-center p-4" : undefined
          }
          highlights={product.benefits.slice(0, 3)}
        />
      </Section>

      {product.clients.length ? (
        <Section bg="surface" eyebrow="Our Clients" title="Trusted by Leading Organizations">
          <ClientLogosScroll clients={product.clients} />
        </Section>
      ) : null}

      <section className="cv-auto bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-[60px] md:py-[80px] lg:grid-cols-2 lg:px-8 lg:py-[100px]">
          <div>
            <div className="mb-3 t-eyebrow text-accent">FAQ</div>
            <h2 className="t-section-title text-white">Common questions about {product.name}</h2>
            <p className="mt-4 text-base leading-8 text-white">
              Find answers to common questions about {product.name} implementation, workflows, support, and platform capabilities.
            </p>
          </div>
          <Accordion type="single" collapsible>
            {productFaqs.map((f, i) => (
              <AccordionItem key={i} value={`q-${i}`} className="border-white/15">
                <AccordionTrigger className="text-left text-base font-semibold leading-7 text-primary-foreground">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-7 text-primary-foreground/88">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="cv-auto bg-[#f7ead8]">
        <div className="mx-auto max-w-3xl px-6 py-12 text-center md:py-14 lg:px-8">
          <h2 className="t-section-title text-[#f1662d]">
            Ready to transform your operations with {product.name}?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[1.05rem] leading-7 text-slate-700">
            Experience how Boscosoft combines platform capability, domain workflows, and long-term
            support to help your organization modernize with confidence.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Button asChild className="bg-gradient-cta text-primary-foreground shadow-md hover:opacity-95">
              <Link to="/contact-us" preload="intent">
                {product.caseStudiesCta || "Request a Demo"} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-slate-300 bg-white text-slate-950 shadow-sm hover:bg-slate-50 hover:text-slate-950">
              <a href={productWebsite} target="_blank" rel="noreferrer" className="text-slate-950">
                {product.featuresCta || "Discover the Solution"}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}


