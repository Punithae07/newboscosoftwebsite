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
              Insights, product thinking, and implementation stories
            </div>
            <h1 className="page-hero-title mt-5 max-w-4xl">
              Blog articles built from the latest Boscosoft product and industry notes
            </h1>
            <p className="page-hero-copy mt-5 max-w-2xl">
              Browse practical articles on ERP, education, healthcare, finance, and digital
              operations, all connected to the source markdown files provided in the project.
            </p>
          </div>
        </div>
      </section>

      <Section
        eyebrow="All articles"
        title="Browse the full blog library"
        subtitle="Each card links to a dedicated detail page with the full article content and supporting imagery."
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

      <CTABanner />
    </>
  );
}

