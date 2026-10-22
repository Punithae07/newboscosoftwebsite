import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Cloud,
  Layers,
  Network,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Bot } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { services, type ServiceSlug, techStack } from "@/lib/site-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Service = (typeof services)[ServiceSlug];

const iconMap: Record<ServiceSlug, LucideIcon> = {
  "ai-transformation": Bot,
  "integration-ecosystems": Network,
  "saas-engineering": Layers,
  "erp-crm-implementation": Workflow,
  "data-analytics-ai": BarChart3,
  "cloud-infrastructure": Cloud,
};

export function ServicePage({ service }: { service: Service }) {
  const Icon = iconMap[service.slug];

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-glow opacity-70" />
        <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-10 md:pb-20 md:pt-14 lg:px-8">
          <div>
            <Breadcrumbs
              items={[{ label: "Services", to: "/services" }, { label: service.name }]}
              variant="light"
            />
          </div>
          <div className="mt-8 grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="animate-fade-up lg:col-span-7">
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-sm font-medium backdrop-blur">
                {service.eyebrow || service.group}
              </div>
              <h1 className="page-hero-title mt-5">{service.headline}</h1>
              <p className="page-hero-copy mt-5 max-w-2xl text-primary-foreground/90">
                {service.body || service.tagline}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary shadow-glow hover:bg-white/90"
                >
                  <Link to={service.heroCtas?.primary?.href || "/contact-us"} preload="intent">
                    {service.heroCtas?.primary?.label || service.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                >
                  <Link to={service.heroCtas?.secondary?.href || "/services"} className="text-white">
                    {service.heroCtas?.secondary?.label || "All Services"}
                  </Link>
                </Button>
              </div>
            </div>
            <div className="animate-fade-up lg:col-span-5">
              <div className="relative animate-float-slow rounded-2xl border border-white/20 bg-white/10 p-3 shadow-glow backdrop-blur">
                <div className="absolute -left-4 -top-4 grid h-16 w-16 place-items-center rounded-2xl bg-white text-primary shadow-card">
                  <Icon className="h-8 w-8 text-accent" />
                </div>
                <img
                  src={service.heroImage}
                  alt={`${service.name} service preview`}
                  decoding="async"
                  className="aspect-[4/3] w-full rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section bg="surface">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-3 t-eyebrow">Business Problem</div>
            <h2 className="t-section-title">{service.businessProblemTitle || "The challenge we help you solve"}</h2>
            <p className="mt-5 t-body">{service.businessProblem}</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {service.outcomes.slice(0, 4).map((outcome) => (
                <div
                  key={outcome}
                  className="rounded-lg border border-border bg-background p-4 shadow-card"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <div className="text-[0.95rem] font-semibold leading-6 text-foreground">
                      {outcome}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-float-slow overflow-hidden rounded-xl shadow-elegant">
            <img
              src={service.heroImage}
              alt={`${service.name} business problem`}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="text-sm font-semibold">{service.eyebrow || service.group}</div>
              <div className="mt-1 text-2xl font-bold">{service.name}</div>
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="What We Deliver" title={service.deliverablesTitle || "Capabilities included in this engagement"}>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {(service.deliverableItems || service.deliverables.map((d) => ({ title: d }))).map((item) => (
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
              <p className="mt-3 t-card-desc">
                {item.description || "Designed to connect strategy, implementation, adoption, and long-term value."}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {service.process && (
        <Section
          bg="surface"
          eyebrow="Process"
          title={service.processTitle || "A proven delivery process"}
          subtitle={service.processIntro}
        >
          <div className="relative grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {service.process.map((step, i) => (
              <div
                key={step}
                className="rounded-xl border border-border bg-background p-5 shadow-card transition-all duration-300 hover:-translate-y-1"
              >
                <div className="t-eyebrow">Step {String(i + 1).padStart(2, "0")}</div>
                <div className="mt-2 t-card-title">{step}</div>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section
        eyebrow="Technology Ecosystem"
        title={service.techTitle || "Built on the platforms enterprises trust"}
        subtitle={service.techBody}
      >
        <div className="overflow-hidden">
          <div className="client-logos-marquee flex w-max gap-3 pr-3">
            {[...techStack, ...techStack].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="inline-flex whitespace-nowrap rounded-full border border-[#8fb4e5] bg-background px-4 py-2 text-sm font-medium text-slate-900 shadow-[0_12px_26px_-18px_rgba(86,191,255,0.55)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <Section
        bg="surface"
        eyebrow="Business Outcomes"
        title={service.outcomesTitle || "The results we focus on"}
        subtitle={service.outcomesBody}
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {service.outcomes.map((outcome) => (
            <div
              key={outcome}
              className="rounded-2xl border border-border bg-background p-6 shadow-card transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="text-[0.98rem] font-semibold leading-6 text-foreground">
                  {outcome}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <section className="cv-auto bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-[60px] md:py-[80px] lg:grid-cols-2 lg:px-8 lg:py-[84px]">
          <div>
            <div className="mb-3 t-eyebrow text-accent">FAQ</div>
            <h2 className="t-section-title text-white">Common questions about {service.name}</h2>
            <p className="mt-4 text-base leading-8 text-white">
              Practical answers about engagement models, delivery approach, integration, and
              long-term support.
            </p>
          </div>
          <Accordion type="single" collapsible>
            {(service.faqs || [
              {
                q: "How do engagements typically start?",
                a: "We begin with a discovery call to understand goals, current systems, and constraints. Then we propose a phased plan.",
              },
              {
                q: "Do you work on fixed-scope or T&M?",
                a: "Both. We adapt commercial models to the nature of the work: fixed for clear scope, T&M for evolving programs.",
              },
              {
                q: "Can you work with our existing vendors?",
                a: "Yes. We frequently integrate with and complement other partners.",
              },
              {
                q: "Do you offer post-implementation support?",
                a: "Yes. Long-term support is core to our partnership model.",
              },
            ]).map((f, i) => (
              <AccordionItem key={i} value={`q-${i}`} className="border-white/15">
                <AccordionTrigger className="text-left text-base font-semibold leading-7 text-primary-foreground">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-7 text-primary-foreground/92">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="cv-auto bg-[#f7ead8]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-[60px] md:py-[80px] lg:grid-cols-2 lg:px-8 lg:py-[84px]">
          <img
            src={service.heroImage}
            alt={`${service.name} consultation preview`}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full rounded-xl object-cover shadow-elegant"
          />
          <div>
            <h2 className="t-section-title text-[#f1662d]">
              {service.ctaTitle || `Ready to plan your ${service.name.toLowerCase()} roadmap?`}
            </h2>
            <p className="mt-4 t-body">
              {service.ctaBody ||
                "Work with Boscosoft to connect strategy, platforms, data, AI, infrastructure, and adoption into a practical transformation program."}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="bg-gradient-cta text-primary-foreground">
                <Link to="/contact-us" preload="intent">
                  {service.ctaButton || service.cta} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="text-slate-950 hover:text-slate-950">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


