import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTABanner } from "@/components/site/CTABanner";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Sparkles, Rocket, BookOpen } from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers | Bosco Soft Technologies" },
      {
        name: "description",
        content:
          "Explore career opportunities at Bosco Soft Technologies and build your future in AI, ERP, cloud, software development, and digital innovation.",
      },
      { property: "og:title", content: "Careers — Boscosoft" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: () => (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <Breadcrumbs items={[{ label: "Careers" }]} variant="light" />
          <h1 className="page-hero-title">
            Build technology that helps organizations{" "}
            <span>move forward</span>
          </h1>
          <p className="page-hero-copy content-measure-wide">
            Join a mission-driven, AI-forward, product-led technology company working across
            platforms, enterprise systems, integrations, cloud, analytics, and digital
            transformation.
          </p>
        </div>
      </section>

      <Section eyebrow="Why Boscosoft" title="A place to do meaningful work">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              i: Sparkles,
              t: "Mission-driven",
              d: "Work that strengthens institutions and communities.",
            },
            {
              i: Rocket,
              t: "Innovation environment",
              d: "Real exposure to AI, SaaS, ERP, cloud, and analytics.",
            },
            { i: BookOpen, t: "Learning & growth", d: "Continuous learning across modern stacks." },
            { i: Briefcase, t: "Real ownership", d: "Outcomes matter more than titles." },
          ].map((b) => (
            <div
              key={b.t}
              className="rounded-2xl border border-border bg-gradient-card p-6 shadow-card"
            >
              <b.i className="mb-3 h-6 w-6 text-accent" />
              <div className="t-card-title text-foreground">{b.t}</div>
              <div className="mt-2 t-card-desc text-muted-foreground">{b.d}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="surface" eyebrow="Open Roles" title="Current openings">
        <div className="rounded-2xl border border-border bg-background p-10 text-center shadow-card">
          <Briefcase className="mx-auto mb-4 h-10 w-10 text-accent" />
          <div className="t-card-title-lg text-foreground">
            There are currently no open positions available.
          </div>
          <p className="mx-auto mt-3 max-w-2xl t-card-desc text-muted-foreground">
            We regularly update our career opportunities. Please check back later or connect with us to learn about future openings.
          </p>
          <Button asChild className="mt-6 bg-gradient-cta text-primary-foreground">
            <Link to="/contact-us" preload="intent">
              Contact HR <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      <CTABanner
        title="Want to join us?"
        primary={{ label: "Explore Opportunities", to: "/contact" }}
        secondary={{ label: "Talk to Our Experts", to: "/contact" }}
      />
    </>
  ),
});


