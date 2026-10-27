import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  GraduationCap,
  Heart,
  Landmark,
  HandHeart,
  Building2,
  Shield,
  Church,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { FeatureCard } from "@/components/site/FeatureCard";
import { CTABanner } from "@/components/site/CTABanner";
import { navIndustries } from "@/lib/site-data";

const iconMap = {
  education: GraduationCap,
  healthcare: Heart,
  "finance-microfinance": Landmark,
  ngos: HandHeart,
  enterprises: Building2,
  "audit-compliance": Shield,
  "faith-based": Church,
} as const;

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "Industries | Bosco Soft Technologies" },
      {
        name: "description",
        content:
          "Boscosoft serves education, healthcare, finance, microfinance, NGOs, enterprises, audit & compliance, and faith-based organizations.",
      },
      { property: "og:title", content: "Industries | Boscosoft" },
      {
        property: "og:description",
        content: "Industry-specific digital transformation solutions.",
      },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesOverview,
});

function IndustriesOverview() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <Breadcrumbs items={[{ label: "Industries" }]} variant="light" />
          <h1 className="page-hero-title">
            Built for the industries where{" "}
            <span className="text-gradient-fluent">operations matter most</span>
          </h1>
          <p className="page-hero-copy content-measure">
            We bring domain depth, platforms, and implementation discipline to the sectors we serve.
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-glow"
            >
              <Link to="/contact-us" preload="intent">
                Find Your Industry Solution <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navIndustries.map((i) => (
            <FeatureCard
              key={i.slug}
              to={`/industries/${i.slug}`}
              icon={iconMap[i.slug]}
              title={i.name}
              description={i.tagline}
              cta="Explore Products"
            />
          ))}
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
