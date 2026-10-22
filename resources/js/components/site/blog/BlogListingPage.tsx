import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTABanner } from "@/components/site/CTABanner";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { blogArticles } from "@/lib/blog-data";

export function BlogListingPage() {
  return (
    <>
      <section className="page-hero">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="page-hero-inner">
          <Breadcrumbs items={[{ label: "Blog" }]} variant="light" />
          <div className="mt-8 max-w-4xl animate-fade-up">
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/92">
              Ideas and Insights
            </div>
            <h1 className="page-hero-title mt-5 max-w-4xl">
              Practical thinking for a changing technology landscape
            </h1>
            <p className="page-hero-copy mt-5 max-w-3xl">
              Explore clear, actionable perspectives on engineering, connected platforms, domain software, and responsible AI adoption.
            </p>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Article Library"
        title="Explore clear perspectives on modern software"
        subtitle="Practical articles on SaaS engineering, ERP, cloud, AI, data platforms, and domain software."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {blogArticles.map((article) => (
            <article
              key={article.slug}
              className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-gradient-card shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-accent/30 hover:shadow-elegant"
            >
              <div className="relative overflow-hidden">
                <img
                  src={article.heroImage}
                  alt={`${article.title} | IT Company | IT Solutions Company | Global IT Solutions`}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {article.category && <span>{article.category}</span>}
                  {article.category && article.date && (
                    <span className="h-1 w-1 rounded-full bg-accent/50" />
                  )}
                  {article.date && <span>{article.date}</span>}
                </div>

                <h2 className="mt-4 t-card-title-lg">{article.title}</h2>
                <p className="mt-4 t-card-desc flex-1">{article.description}</p>

                <Button
                  asChild
                  className="mt-6 w-full bg-gradient-cta text-primary-foreground hover:opacity-95 sm:w-auto"
                >
                  <Link to="/blog/$slug" params={{ slug: article.slug }}>
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <section className="relative overflow-hidden border-t border-border/80 bg-gradient-cta py-20 text-primary-foreground sm:py-24">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Move from reading to action.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-primary-foreground/85 sm:text-lg">
            Connect with our engineering specialists or discover how our industry SaaS platforms support your workflows.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-elegant font-semibold px-7"
            >
              <Link to="/contact-us">Talk to an Expert</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-white/10 text-white hover:bg-white/20 font-semibold px-7"
            >
              <Link to="/products">Explore Our Solutions</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

