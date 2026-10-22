import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTABanner } from "@/components/site/CTABanner";
import { ShieldCheck, Award, Users, BookOpen, Heart, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/mission-vision")({
  head: () => ({
    meta: [
      { title: "Mission & Vision | Bosco Soft Technologies" },
      {
        name: "description",
        content:
          "Why we work the way we do: A world where excellent engineering creates enduring value for customers and meaningful opportunity for talented people, wherever they begin.",
      },
      { property: "og:title", content: "Mission & Vision - Boscosoft" },
    ],
    links: [{ rel: "canonical", href: "/mission-vision" }],
  }),
  component: () => (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <Breadcrumbs items={[{ label: "About", to: "/about" }, { label: "Mission & Vision" }]} variant="light" />
          <h1 className="page-hero-title">
            Why we work the <span className="text-gradient-fluent">way we do</span>
          </h1>
          <p className="page-hero-copy content-measure-wide">
            The principles behind how we solve complex technology problems, engineer durable platforms, and create meaningful opportunities.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-gradient-card p-8 shadow-card">
            <div className="t-eyebrow mb-2 text-accent">Our Vision</div>
            <p className="t-card-title-lg text-foreground">
              A world where excellent engineering creates enduring value for customers and meaningful opportunity for talented people, wherever they begin.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-gradient-card p-8 shadow-card">
            <div className="t-eyebrow mb-2 text-accent">Our Mission</div>
            <p className="t-body text-foreground/90 leading-relaxed">
              Help organizations solve complex technology problems through capable teams, dependable systems, and lasting partnerships while developing pathways into professional technology careers for underserved young people.
            </p>
          </div>
        </div>
      </Section>

      <Section bg="surface" eyebrow="Our Values" title="Principles that guide our engineering and partnerships">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              i: ShieldCheck,
              t: "Integrity",
              d: "Make clear commitments and communicate transparently.",
            },
            {
              i: Award,
              t: "Engineering quality",
              d: "Build for maintainability, reliability, and responsible operation.",
            },
            {
              i: Users,
              t: "Customer partnership",
              d: "Understand the context before prescribing a solution.",
            },
            {
              i: BookOpen,
              t: "Continuous learning",
              d: "Keep teams adaptable to changing technologies.",
            },
            {
              i: Heart,
              t: "Inclusive opportunity",
              d: "Recognize potential and invest in development.",
            },
            {
              i: CheckCircle2,
              t: "Stewardship",
              d: "Respect customer resources, data, and long-term outcomes.",
            },
          ].map((p) => (
            <div
              key={p.t}
              className="rounded-2xl border border-border bg-background p-6 shadow-card transition-all duration-300 hover:-translate-y-1"
            >
              <p.i className="mb-3 h-6 w-6 text-accent" />
              <div className="font-semibold text-foreground">{p.t}</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        title="See what we could build together."
        primary={{ label: "Talk to Our Experts", to: "/contact-us" }}
        secondary={{ label: "Explore SaaS Platforms", to: "/products" }}
      />
    </>
  ),
});
