import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Network, Layers, Workflow, BarChart3, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { FeatureCard } from "@/components/site/FeatureCard";
import { CTABanner } from "@/components/site/CTABanner";
import { navServices } from "@/lib/site-data";

const iconMap = {
  "ai-transformation": Bot,
  "integration-ecosystems": Network,
  "saas-engineering": Layers,
  "erp-crm-implementation": Workflow,
  "data-analytics-ai": BarChart3,
  "cloud-infrastructure": Cloud,
} as const;

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "IT Consulting & Services | Bosco Soft Technologies " },
      {
        name: "description",
        content:
          "Explore IT consulting & services from Bosco Soft Technologies, delivering AI, ERP, SaaS, cloud, integration, and analytics solutions.  ",
      },
      { property: "og:title", content: "Digital Transformation Services for the AI Era" },
      {
        property: "og:description",
        content:
          "Practical, implementation-focused services across AI, ERP, integration, SaaS, analytics, and cloud.",
      },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesOverview,
});

function ServicesOverview() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="text-primary-foreground/80">
            <Breadcrumbs items={[{ label: "Services" }]} variant="light" />
          </div>
          <h1 className="page-hero-title">
            Digital Transformation Services for the{" "}
            <span className="text-gradient-fluent">AI Era</span>
          </h1>
          <p className="page-hero-copy">
            From AI roadmaps and SaaS engineering to ERP implementation, integrations, analytics,
            and cloud support, Boscosoft helps organizations modernize with clarity and confidence.
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-glow"
            >
              <Link to="/contact-us" preload="intent">
                Schedule Consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {navServices.map((service) => (
            <FeatureCard
              key={service.slug}
              to={`/services/${service.slug}`}
              icon={iconMap[service.slug]}
              category={service.group}
              title={service.name}
              description={service.tagline}
              cta={service.cta}
              accent
            />
          ))}
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
