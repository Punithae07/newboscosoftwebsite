import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTABanner } from "@/components/site/CTABanner";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Sparkles, Layers, BookOpen, Users } from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Technology Careers & Engineering Opportunities | Boscosoft" },
      {
        name: "description",
        content:
          "Explore engineering, product, cloud, AI, and enterprise technology opportunities at Boscosoft, a company combining technical growth and social purpose.",
      },
      {
        name: "keywords",
        content: "Boscosoft careers",
      },
      { property: "og:title", content: "Technology Careers & Engineering Opportunities | Boscosoft" },
      {
        property: "og:description",
        content:
          "Explore engineering, product, cloud, AI, and enterprise technology opportunities at Boscosoft, a company combining technical growth and social purpose.",
      },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: CareersPage,
});

function CareersPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <Breadcrumbs items={[{ label: "About", to: "/about" }, { label: "Careers" }]} variant="light" />
          <h1 className="page-hero-title">Build technology. Build your future.</h1>
          <p className="page-hero-copy content-measure-wide">
            Work on software that supports real organizations while developing expertise in enterprise systems, SaaS platforms, data, cloud, and emerging AI applications. At Boscosoft, professional growth and meaningful work go together.
          </p>
        </div>
      </section>

      <Section eyebrow="Why Boscosoft" title="Make an impact through the work you do">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              i: Sparkles,
              t: "Purpose in practice",
              d: "Contribute to products and systems used by institutions and businesses.",
            },
            {
              i: Layers,
              t: "Technical breadth",
              d: "Learn across engineering stacks and industry domains.",
            },
            {
              i: BookOpen,
              t: "Guided growth",
              d: "Develop through training, mentoring, and project experience.",
            },
            {
              i: Users,
              t: "Ownership and teamwork",
              d: "Build confidence through shared delivery responsibility.",
            },
          ].map((b) => (
            <div
              key={b.t}
              className="rounded-2xl border border-border bg-gradient-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1"
            >
              <b.i className="mb-3 h-6 w-6 text-accent" />
              <div className="t-card-title text-foreground">{b.t}</div>
              <div className="mt-2 t-card-desc text-muted-foreground">{b.d}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="surface" eyebrow="Current Openings" title="Find your next opportunity">
        <div className="rounded-2xl border border-border bg-background p-10 text-center shadow-card max-w-3xl mx-auto">
          <Briefcase className="mx-auto mb-4 h-10 w-10 text-accent" />
          <p className="mx-auto text-base text-foreground/90 leading-relaxed">
            Current positions appear here when approved by the recruitment team. If there are no openings, invite candidates to check back rather than implying roles are available.
          </p>
          <div className="mt-6 flex justify-center">
            <Button asChild className="bg-gradient-cta text-primary-foreground">
              <Link to="/contact-us" preload="intent">
                Contact Careers Team <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      <CTABanner
        title="Your next engineering chapter could begin here."
        primary={{ label: "View Open Roles", to: "/contact-us" }}
        secondary={{ label: "Learn About Our Talent Model", to: "/social-impact" }}
      />
    </>
  );
}
