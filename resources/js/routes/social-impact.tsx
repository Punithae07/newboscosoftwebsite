import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Compass,
  GraduationCap,
  Briefcase,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Heart,
  Users,
} from "lucide-react";
import { Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTABanner } from "@/components/site/CTABanner";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/social-impact")({
  head: () => ({
    meta: [
      { title: "Social Impact & Rural Technology Talent | Boscosoft" },
      {
        name: "description",
        content:
          "Learn how Boscosoft develops rural and underrepresented talent through training, practical engineering work, and career opportunities.",
      },
      {
        name: "keywords",
        content:
          "technology social impact India, rural engineering talent, academy to industry model",
      },
      {
        property: "og:title",
        content: "Social Impact & Rural Technology Talent | Boscosoft",
      },
      {
        property: "og:description",
        content:
          "Learn how Boscosoft develops rural and underrepresented talent through training, practical engineering work, and career opportunities.",
      },
    ],
    links: [{ rel: "canonical", href: "/social-impact" }],
  }),
  component: SocialImpactPage,
});

function SocialImpactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <Breadcrumbs
            items={[{ label: "About", to: "/about" }, { label: "Social Impact" }]}
            variant="light"
          />
          <div className="mt-8 max-w-4xl animate-fade-up">
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/92">
              Our Difference
            </div>
            <h1 className="page-hero-title mt-5">
              Opportunity changes lives. Great engineering changes businesses.
            </h1>
            <p className="page-hero-copy content-measure-wide mt-5">
              At Boscosoft, these two ideas belong together. Our roots are in a rural technology initiative that opened the door to professional careers for young people whose potential had rarely been matched by access.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary shadow-glow hover:bg-white/90"
              >
                <Link to="/contact-us" preload="intent">
                  Discuss a Technology Partnership <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              >
                <Link to="/careers" className="text-white">
                  Explore Careers
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Origin" title="A technology dream that started beyond the city">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,420px)]">
          <div className="content-measure-wide stack-copy">
            <p className="t-body-lg">
              In Yelagiri Hills, BICS InfoTech was founded by Rev. Fr. Francis Guezou, SDB, to give bright, disadvantaged youth a place in the digital economy. He believed that delivering top-tier education to talented rural youth was the ultimate strategy to empower families and build the nation.
            </p>
            <p className="t-body-lg text-muted-foreground">
              Training was connected to work, and work was connected to dignity. This foundation continues to inform the company’s approach to talent and engineering delivery.
            </p>
          </div>
          <div className="rounded-[2rem] border border-border/70 bg-gradient-card p-8 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-foreground">Roots on Yelagiri Hills</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              A distinctive academy-to-industry pathway that bridges potential with enterprise-grade capability, built over more than two decades of dedicated investment.
            </p>
          </div>
        </div>
      </Section>

      <Section
        bg="surface"
        eyebrow="Talent Model"
        title="From promising potential to professional capability"
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Compass,
              title: "Discover talent",
              desc: "Reach young people whose circumstances may have limited opportunity.",
            },
            {
              icon: GraduationCap,
              title: "Develop skills",
              desc: "Combine technology learning, communication, workplace habits, and mentoring.",
            },
            {
              icon: Briefcase,
              title: "Learn through delivery",
              desc: "Connect practical work with real customer needs and professional standards.",
            },
            {
              icon: TrendingUp,
              title: "Build careers",
              desc: "Support continued technical development within the wider industry.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-background p-6 shadow-card transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="t-card-title">{item.title}</h3>
                <item.icon className="h-5 w-5 shrink-0 text-accent" />
              </div>
              <p className="mt-3 t-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Customer Relevance" title="A better opportunity model can also be a better delivery model">
        <div className="max-w-3xl">
          <p className="t-body text-foreground/90 leading-relaxed">
            Long-term investment in people helps build familiarity with products, codebases, customers, and business domains. For clients, that can mean continuity and teams invested in getting better over time. Any claims about superior retention or productivity must be backed by approved internal data.
          </p>
        </div>
      </Section>

      <Section bg="surface" eyebrow="Impact Evidence" title="Measure opportunity with the same care as engineering">
        <div className="max-w-3xl">
          <p className="t-body text-foreground/90 leading-relaxed">
            Share current audited or management-approved annual figures for trainees, placements, first-generation graduates, women in technology roles, and long-term career pathways. Historic figures belong in a dated timeline, not as present-day outcomes.
          </p>
        </div>
      </Section>

      <CTABanner
        title="Partner with engineering that creates opportunity."
        primary={{ label: "Discuss a Technology Partnership", to: "/contact-us" }}
        secondary={{ label: "Explore Careers", to: "/careers" }}
      />
    </>
  );
}
