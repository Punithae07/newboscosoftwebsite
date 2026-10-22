import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTABanner } from "@/components/site/CTABanner";
import { Bot, Layers, Network, ShieldCheck, Cloud, HandHeart } from "lucide-react";

export const Route = createFileRoute("/mission-vision")({
  head: () => ({
    meta: [
      { title: "Mission & Vision | Bosco Soft Technologies" },
      {
        name: "description",
        content:
          "Our mission, vision, and purpose - to help organizations modernize responsibly and scale with AI-enabled platforms and services.",
      },
      { property: "og:title", content: "Mission & Vision - Boscosoft" },
    ],
    links: [{ rel: "canonical", href: "/mission-vision" }],
  }),
  component: () => (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <Breadcrumbs items={[{ label: "Mission & Vision" }]} variant="light" />
          <h1 className="page-hero-title">
            Our <span className="text-gradient-fluent">Mission & Vision</span>
          </h1>
          <p className="page-hero-copy content-measure-wide">
            The principles behind how we modernize systems, guide AI adoption, and build long-term
            value for institutions and enterprises.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              t: "Our Vision",
              d: "Innovate and lead.",
              extra:
                "Innovating emerging technologies. Leading digital ecosystems. Transforming institutional operations.",
            },
            {
              t: "Our Mission",
              d: "We strive to achieve optimal results in the interest of stakeholders, employing cutting-edge technologies, involving committed associates, driven by innovation and leadership.",
            },
            {
              t: "Our Core Values",
              d: "Integrity, Commitment, Customer Delight, Technology Innovation & Leadership, Stakeholder Participation, Quality Focus, Youth Empowerment.",
            },
          ].map((b) => (
            <div
              key={b.t}
              className="rounded-2xl border border-border bg-gradient-card p-8 shadow-card"
            >
              <div className="t-eyebrow mb-2">{b.t}</div>
              <p className="t-body-lg text-foreground">{b.d}</p>
              {b.extra ? <p className="mt-3 t-body text-muted-foreground">{b.extra}</p> : null}
            </div>
          ))}
        </div>
      </Section>

      <Section bg="surface" eyebrow="Strategic Pillars" title="What guides our delivery">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            { i: Bot, t: "AI-Driven Transformation" },
            { i: Layers, t: "Platform-Led SaaS Ecosystem" },
            { i: Network, t: "Connected Digital Ecosystems" },
            { i: ShieldCheck, t: "Responsible AI Adoption" },
            { i: Cloud, t: "Cloud-First Modernization" },
            { i: HandHeart, t: "Long-Term Client Success" },
          ].map((p) => (
            <div
              key={p.t}
              className="rounded-2xl border border-border bg-background p-6 shadow-card"
            >
              <p.i className="mb-3 h-6 w-6 text-accent" />
              <div className="font-semibold text-foreground">{p.t}</div>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner />
    </>
  ),
});
