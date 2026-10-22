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
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium">
              Customer implementation case studies
            </div>
            <h1 className="page-hero-title mt-5">
              Success stories from real Boscosoft implementations
            </h1>
            <p className="page-hero-copy mt-5 max-w-3xl">
              Browse written case studies that highlight implementation outcomes, operational
              improvements, and customer impact across Boscosoft solutions.
            </p>
          </div>
        </div>
      </section>

      <Section
        title="Success stories"
        subtitle="Detailed implementation narratives with outcomes, highlights, and structured content."
        introWidth="wide"
      >
        <StoryGrid stories={articleStories} ctaLabel="Read Story" />
      </Section>

      <CTABanner />
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


