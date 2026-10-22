import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  Building2,
  CheckCircle2,
  Church,
  GraduationCap,
  HandHeart,
  Heart,
  Landmark,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTABanner } from "@/components/site/CTABanner";
import { FeatureCard } from "@/components/site/FeatureCard";
import { industries, navServices, products, type IndustrySlug } from "@/lib/site-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Industry = (typeof industries)[IndustrySlug];

const iconMap: Record<IndustrySlug, LucideIcon> = {
  education: GraduationCap,
  healthcare: Heart,
  "finance-microfinance": Landmark,
  ngos: HandHeart,
  enterprises: Building2,
  "audit-compliance": Shield,
  "faith-based": Church,
};

const industryHeadings: Record<IndustrySlug, string> = {
  education: "Digital Platforms for Modern Education Institutions",
  healthcare: "Connected Healthcare Operations for Better Institutional Control",
  "finance-microfinance": "Digital Platforms for Financial Control and Responsible Lending",
  ngos: "Digital Financial Management for Mission-Driven Organizations",
  enterprises: "Enterprise Digital Transformation for Connected Operations",
  "audit-compliance": "Digital Audit and Compliance Management for Better Governance",
  "faith-based": "Digital Administration for Faith-Based Organizations",
};

export function IndustryPage({ industry }: { industry: Industry }) {
  const Icon = iconMap[industry.slug];

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-glow opacity-70" />
        <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-8 md:pb-12 md:pt-10 lg:px-8">
          <div>
            <Breadcrumbs items={[{ label: "Industries", to: "/industries" }, { label: industry.name }]} variant="light" />
          </div>
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-12">
            <div className="animate-fade-up lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium backdrop-blur">
                <Icon className="h-3.5 w-3.5 text-accent" />
                Industry Solution
              </div>
              <h1 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl">
                <span className="text-gradient-fluent">
                  {industryHeadings[industry.slug] || `Digital transformation for ${industry.name}`}
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-primary-foreground/80">{industry.tagline}</p>
              <div className="mt-7">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary shadow-glow hover:bg-white/90"
                >
                  <Link to="/contact-us" preload="intent">
                    {industry.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="mx-auto grid aspect-square max-w-sm place-items-center rounded-3xl border border-white/20 bg-white/5 backdrop-blur">
                <Icon className="h-24 w-24 text-accent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Buyer Pain Points" title="What slows teams down today">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {industry.pains.map((pain) => (
            <div
              key={pain}
              className="rounded-xl border border-border bg-gradient-card p-5 shadow-card"
            >
              <AlertCircle className="mb-2 h-5 w-5 text-destructive" />
              <div className="text-sm font-medium">{pain}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        bg="surface"
        eyebrow="How Boscosoft Helps"
        title={industry.solutionSummary}
        subtitle="We combine domain-focused platforms with implementation expertise and long-term support to drive measurable transformation."
      >
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Connected workflows",
            "Unified data",
            "Automated processes",
            "Stakeholder portals",
            "Compliance and audit trails",
            "Real-time dashboards",
          ].map((text) => (
            <div
              key={text}
              className="flex items-start gap-3 rounded-xl border border-border bg-background p-4 shadow-card"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
              <span className="text-sm font-medium">{text}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Relevant Platforms" title={`Boscosoft platforms for ${industry.name}`}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industry.products.map((slug) => {
            const product = products[slug];
            return (
              <FeatureCard
                key={slug}
                to={`/products/${slug}`}
                category={product.category}
                title={product.name}
                description={product.tagline}
                cta={`Explore ${product.name}`}
              />
            );
          })}
        </div>
      </Section>

      <Section
        bg="surface"
        eyebrow="Relevant Services"
        title="Services that complement your transformation"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {navServices.slice(0, 3).map((service) => (
            <FeatureCard
              key={service.slug}
              to={`/services/${service.slug}`}
              category={service.group}
              title={service.name}
              description={service.tagline}
              cta={service.cta}
            />
          ))}
        </div>
      </Section>

      <Section eyebrow="FAQ" title="Common questions">
        <Accordion type="single" collapsible className="max-w-3xl">
          {[
            {
              q: "How long does implementation take?",
              a: "It depends on scope. Typical implementations range from 6 to 16 weeks per phase.",
            },
            {
              q: "Can the platform run on our existing cloud?",
              a: "Yes. We support major clouds and on-premise environments.",
            },
            {
              q: "Do you provide training?",
              a: "Yes. Role-based training, documentation, and refresher sessions are included.",
            },
          ].map((f, i) => (
            <AccordionItem key={i} value={`q-${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      <CTABanner
        title={`Let's modernize ${industry.name.toLowerCase()} operations`}
        primary={{ label: industry.cta, to: "/contact" }}
        secondary={{ label: "Talk to Our Experts", to: "/contact" }}
      />
    </>
  );
}
