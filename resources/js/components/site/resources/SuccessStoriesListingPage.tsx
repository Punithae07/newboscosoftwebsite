import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTABanner } from "@/components/site/CTABanner";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { successStories, type SuccessStory } from "@/lib/resource-data";

const articleStories = successStories.filter((story) => story.format === "article");

export function SuccessStoriesListingPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <Breadcrumbs items={[{ label: "Success Stories" }]} variant="light" />
          <div className="mt-8 max-w-4xl animate-fade-up">
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/92">
              Customer Stories
            </div>
            <h1 className="page-hero-title mt-5">
              Real challenges. Thoughtful solutions. Meaningful progress.
            </h1>
            <p className="page-hero-copy mt-5 max-w-3xl">
              Every technology project starts with a problem worth solving. Explore how customers
              have approached modernization, operational integration, and software implementation
              with Boscosoft.
            </p>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Case Studies"
        title="Explore the work behind the results"
        subtitle="Explore how customers have approached modernization, operational integration, and software implementation with Boscosoft."
        introWidth="wide"
      >
        <StoryGrid stories={articleStories} ctaLabel="Read Story" />
      </Section>

      <section className="relative overflow-hidden border-t border-border/80 bg-gradient-cta py-20 text-primary-foreground sm:py-24">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Let’s talk about your next outcome.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-primary-foreground/85 sm:text-lg">
            Connect with our team to discuss software modernization, custom development, or domain-specific SaaS platforms.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-elegant font-semibold px-7"
            >
              <Link to="/contact-us">Discuss Your Project</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-white/10 text-white hover:bg-white/20 font-semibold px-7"
            >
              <Link to="/products">Explore Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function StoryGrid({
  stories,
  ctaLabel,
}: {
  stories: SuccessStory[];
  ctaLabel: string;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {stories.map((story) => (
        <article
          key={story.slug}
          className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-gradient-card shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-accent/30 hover:shadow-elegant"
        >
          {story.heroImage && (
            <div className="relative overflow-hidden">
              <img
                src={story.heroImage}
                alt={story.title}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/45 via-transparent to-transparent" />
            </div>
          )}
          <div className="flex flex-1 flex-col p-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {story.category && <span>{story.category}</span>}
              {story.location && (
                <span className="text-muted-foreground normal-case tracking-normal">
                  {story.location}
                </span>
              )}
            </div>
            <h2 className="mt-4 t-card-title-lg">{story.title}</h2>
            <p className="mt-4 t-card-desc flex-1">{story.description}</p>
            <Button
              asChild
              className="mt-6 w-full bg-gradient-cta text-primary-foreground hover:opacity-95 sm:w-auto"
            >
              <Link to="/success-stories/$slug" params={{ slug: story.slug }}>
                {ctaLabel} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}


