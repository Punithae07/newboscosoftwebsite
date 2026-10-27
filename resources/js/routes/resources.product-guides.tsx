import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTABanner } from "@/components/site/CTABanner";
import { FeatureCard } from "@/components/site/FeatureCard";
import { navProducts } from "@/lib/site-data";

export const Route = createFileRoute("/resources/product-guides")({
  head: () => ({
    meta: [
      { title: "Product Guides | Bosco Soft Technologies" },
      { name: "description", content: "Detailed product guides for each Boscosoft platform." },
      { property: "og:title", content: "Product Guides | Boscosoft" },
    ],
    links: [{ rel: "canonical", href: "/resources/product-guides" }],
  }),
  component: () => (
    <>
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-10 pb-14">
          <div>
            <Breadcrumbs
              items={[{ label: "Resources", to: "/resources" }, { label: "Product Guides" }]}
              variant="light"
            />
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">Product Guides</h1>
        </div>
      </section>
      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navProducts.map((p) => (
            <FeatureCard
              key={p.slug}
              to={`/products/${p.slug}`}
              category={p.category}
              title={`${p.name} Guide`}
              description={p.tagline}
              cta="View guide"
            />
          ))}
        </div>
      </Section>
      <CTABanner />
    </>
  ),
});
