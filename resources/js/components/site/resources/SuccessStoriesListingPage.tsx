import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Brain,
  Church,
  Coins,
  GraduationCap,
  HeartPulse,
  LayoutGrid,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTABanner } from "@/components/site/CTABanner";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { successStories, type SuccessStory } from "@/lib/resource-data";
import { cn } from "@/lib/utils";

const articleStories = successStories.filter((story) => story.format === "article");

const categories = [
  { name: "All", icon: LayoutGrid },
  { name: "Ai & Data", icon: Brain },
  { name: "Finance", icon: TrendingUp },
  { name: "Healthcare", icon: HeartPulse },
  { name: "Education", icon: GraduationCap },
  { name: "MicroFinance", icon: Coins },
  { name: "Quality", icon: ShieldCheck },
  { name: "FaithTech", icon: Church },
] as const;

export function SuccessStoriesListingPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredStories = useMemo(() => {
    if (activeCategory === "All") {
      return articleStories;
    }

    return articleStories.filter((story) => {
      const storyCat = (story.category || "").toLowerCase();
      const targetCat = activeCategory.toLowerCase();

      if (targetCat === "ai & data") {
        return (
          storyCat.includes("ai") ||
          storyCat.includes("data") ||
          storyCat.includes("co-development")
        );
      }

      return storyCat.includes(targetCat);
    });
  }, [activeCategory]);

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

      {/* Categories Filter Bar */}
      <section className="bg-transparent pt-6 pb-1 sm:pt-8 sm:pb-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 w-full overflow-x-auto scrollbar-none flex-nowrap py-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.name;

              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setActiveCategory(cat.name)}
                  className={cn(
                    "inline-flex flex-1 min-w-fit items-center justify-center gap-2.5 rounded-2xl px-3.5 py-3 text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer sm:px-4 sm:py-3 sm:text-sm lg:px-5 lg:py-3.5 lg:text-[15px]",
                    isActive
                      ? "bg-[#072448] text-white shadow-md shadow-[#072448]/25 hover:bg-[#061e3d]"
                      : "border border-blue-200/80 bg-white text-[#072448] shadow-[inset_0_2px_8px_rgba(7,83,140,0.12),inset_0_0_0_1px_rgba(7,83,140,0.06),0_2px_5px_rgba(7,83,140,0.04)] hover:border-blue-300 hover:bg-[#f8fbff] hover:shadow-[inset_0_2px_12px_rgba(7,83,140,0.2),inset_0_0_0_1px_rgba(7,83,140,0.1)]"
                  )}
                >
                  <Icon className={cn("h-4.5 w-4.5 sm:h-5 sm:w-5", isActive ? "text-white" : "text-[#072448]")} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <Section
        className="!pt-3 sm:!pt-4 md:!pt-5 lg:!pt-5"
        eyebrow="Case Studies"
        title="Explore the work behind the results"
        subtitle="Explore how customers have approached modernization, operational integration, and software implementation with Boscosoft."
        introWidth="wide"
      >
        {filteredStories.length > 0 ? (
          <StoryGrid stories={filteredStories} ctaLabel="Read Story" />
        ) : (
          <div className="rounded-[1.75rem] border border-border/70 bg-gradient-card py-16 text-center shadow-card">
            <p className="text-lg font-medium text-muted-foreground">
              No case studies found for "{activeCategory}".
            </p>
            <Button
              variant="outline"
              className="mt-5 border-[#072448]/25 text-[#072448] hover:bg-[#072448] hover:text-white"
              onClick={() => setActiveCategory("All")}
            >
              View All Stories
            </Button>
          </div>
        )}
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


