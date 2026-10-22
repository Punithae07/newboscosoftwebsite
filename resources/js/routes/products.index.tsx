import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  GraduationCap,
  Heart,
  Landmark,
  Briefcase,
  Church,
  FileCheck2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { FeatureCard } from "@/components/site/FeatureCard";
import { CTABanner } from "@/components/site/CTABanner";
import { navProducts } from "@/lib/site-data";

const iconMap = {
  smartschoolnxt: GraduationCap,
  higrade: GraduationCap,
  "acme-erp": Landmark,
  microfund: Briefcase,
  medsysb: Heart,
  "cristo-suite": Church,
  eaudithub: FileCheck2,
} as const;

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Business Software Solutions | Bosco Soft Technologies Pvt Ltd" },
      {
        name: "description",
        content:
          "Discover business software solutions from Bosco Soft Technologies for schools, hospitals, colleges, finance, churches, accounting, and audits.",
      },
      { property: "og:title", content: "AI-Enabled SaaS Platforms — Boscosoft" },
      {
        property: "og:description",
        content: "Domain-specific platforms for enterprises and institutions.",
      },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsOverview,
});

function ProductsOverview() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <Breadcrumbs items={[{ label: "Platforms" }]} variant="light" />
          <h1 className="page-hero-title">
            AI-Enabled SaaS Platforms for{" "}
            <span className="text-gradient-fluent">Domain-Specific Transformation</span>
          </h1>
          <p className="page-hero-copy content-measure-wide">
            Boscosoft platforms are built for the operational realities of institutions and
            enterprises that need clarity, automation, stakeholder engagement, compliance
            visibility, and scalable digital growth.
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-glow"
            >
              <Link to="/contact-us" preload="intent">
                Find the Right Platform for Your Organization{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navProducts.map((p) => (
            <FeatureCard
              key={p.slug}
              to={`/products/${p.slug}`}
              icon={iconMap[p.slug]}
              category={p.category}
              title={p.name}
              description={p.tagline}
              cta={`Explore ${p.name}`}
            />
          ))}
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
