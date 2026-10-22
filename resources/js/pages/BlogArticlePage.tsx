import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { BlogMarkdownContent } from "@/components/site/blog/BlogMarkdownContent";
import { Button } from "@/components/ui/button";
import { blogArticles, type BlogArticle } from "@/lib/blog-data";

export function BlogArticlePage({ article }: { article: BlogArticle }) {
  const relatedArticles = blogArticles
    .filter((item) => item.slug !== article.slug && item.category === article.category)
    .slice(0, 2);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-glow opacity-70" />
        <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-10 md:pb-16 md:pt-12 lg:px-8">
          <Breadcrumbs items={[{ label: "Blog", to: "/blog" }, { label: article.title }]} variant="light" />
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium">
                {article.category ?? "Blog article"}
              </div>
              <h1 className="mt-5 max-w-4xl text-3xl font-bold leading-[1.08] tracking-tight md:text-5xl">
                {article.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-primary-foreground/80">
                {article.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary shadow-glow hover:bg-white/90"
                >
                  <Link to="/blog">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                  </Link>
                </Button>
              </div>
            </div>

            <div className="animate-fade-up">
              <div className="overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/10 p-3 shadow-glow backdrop-blur">
                <img
                  src={article.heroImage}
                  alt={`${article.title} | IT Company | IT Solutions Company | Global IT Solutions`}
                  decoding="async"
                  className="aspect-[16/10] w-full rounded-[1.25rem] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cv-auto px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="rounded-[1.75rem] border border-border/70 bg-background p-6 shadow-card md:p-8 lg:p-10">
            <BlogMarkdownContent content={stripLeadingTitle(article.content, article.title)} />
          </article>

          <aside className="space-y-6">
            <div className="overflow-hidden rounded-[1.75rem] border border-border/70 bg-gradient-card p-4 shadow-card">
              <img
                src={article.relatedImage}
                alt={`${article.title} related visual | IT Company | IT Solutions Company`}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-[1.25rem] object-cover"
              />
              <div className="mt-4">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Related image
                </div>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Supporting visual sourced from the dedicated blog image folder for this article.
                </p>
              </div>
            </div>

            {relatedArticles.length > 0 && (
              <div className="rounded-[1.75rem] border border-border/70 bg-gradient-card p-6 shadow-card">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  More in {article.category}
                </div>
                <div className="mt-4 space-y-4">
                  {relatedArticles.map((relatedArticle) => (
                    <Link
                      key={relatedArticle.slug}
                      to="/blog/$slug"
                      params={{ slug: relatedArticle.slug }}
                      className="group block rounded-2xl border border-border/70 bg-background p-4 transition-all duration-200 hover:-translate-y-1 hover:border-accent/30"
                    >
                      <div className="font-semibold leading-snug text-foreground group-hover:text-accent">
                        {relatedArticle.title}
                      </div>
                      <div className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-accent">
                        Read article
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}

function stripLeadingTitle(content: string, title: string) {
  const lines = content.split("\n");
  const normalizedTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

  while (lines.length > 0 && lines[0].trim() === "") {
    lines.shift();
  }

  if (lines.length === 0) return content;

  const firstLine = lines[0]
    .replace(/^[#*\s-]+|[#*\s-]+$/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

  if (
    firstLine &&
    (firstLine === normalizedTitle ||
      firstLine.includes(normalizedTitle) ||
      normalizedTitle.includes(firstLine))
  ) {
    lines.shift();
    while (lines.length > 0 && lines[0].trim() === "") {
      lines.shift();
    }
  }

  return lines.join("\n");
}





