import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, FileText, Newspaper, Lightbulb } from "lucide-react";
import { Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { FeatureCard } from "@/components/site/FeatureCard";
import { CTABanner } from "@/components/site/CTABanner";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: "AI Adoption Resources | Bosco Soft Technologies" },
      {
        name: "description",
        content:
          "Practical guides, research, blogs, and success stories for AI adoption, ERP modernization, and SaaS transformation.",
      },
      { property: "og:title", content: "AI Adoption Resources - Boscosoft" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <Breadcrumbs items={[{ label: "AI Adoption Resources" }]} variant="light" />
          <h1 className="page-hero-title">
            AI Adoption Resources for strategic digital transformation
          </h1>
          <p className="page-hero-copy content-measure-wide">
            Curated research, stories, product guides, and expert blogs to help institutions adopt
            AI, modernize ERP, and launch SaaS-enabled operations.
          </p>
        </div>
      </section>

      <Section eyebrow="Insights" title="Featured resources">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr_1fr]">
          {[
            {
              i: BookOpen,
              t: "AI Adoption Playbook",
              d: "A practical framework for building AI-enabled processes in education, healthcare, and financial services.",
              to: "/whitepapers",
            },
            {
              i: Newspaper,
              t: "Transformation success stories",
              d: "Customer stories that show measurable outcomes from ERP modernization and digital workflows.",
              to: "/success-stories",
            },
            {
              i: Lightbulb,
              t: "Leadership insights",
              d: "Guidance on people, governance, and implementation best practices for enterprise AI projects.",
              to: "/blog",
            },
          ].map((card, index) => (
            <FeatureCard
              key={card.t}
              to={card.to}
              icon={card.i}
              title={card.t}
              description={card.d}
              cta={index === 0 ? "Download guide" : "Explore"}
              className={index === 0 ? "lg:min-h-[22rem]" : undefined}
            />
          ))}
        </div>
      </Section>

      <Section bg="surface" eyebrow="Resource categories" title="Explore content by topic">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              i: Newspaper,
              t: "Success Stories",
              d: "Read how customers improved outcomes with Boscosoft solutions.",
              to: "/success-stories",
            },
            {
              i: BookOpen,
              t: "Blogs",
              d: "Actionable articles on AI, ERP, SaaS, integration, and cloud.",
              to: "/blog",
            },
            {
              i: FileText,
              t: "White Papers",
              d: "In-depth research and enterprise adoption guides.",
              to: "/whitepapers",
            },
          ].map((resource) => (
            <FeatureCard
              key={resource.t}
              to={resource.to}
              icon={resource.i}
              title={resource.t}
              description={resource.d}
              cta="Explore"
            />
          ))}
        </div>
      </Section>

      <Section bg="surface" eyebrow="Lead Magnets" title="Free downloadable resources">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            "AI Adoption Checklist for Institutions",
            "ERP Modernization Readiness Guide",
            "SaaS Evaluation Checklist",
            "Hospital Digital Transformation Playbook",
            "Compliance and Audit Digitization Guide",
            "Microfinance ERP Selection Guide",
          ].map((title) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-background p-6 shadow-card"
            >
              <div className="t-card-title">{title}</div>
              <p className="mt-2 t-card-desc">
                Request this asset to get a practical planning aid from the Boscosoft team.
              </p>
              <Button asChild variant="link" className="mt-2 h-auto p-0 text-accent">
                <Link to="/contact-us" preload="intent">
                  Request access <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
