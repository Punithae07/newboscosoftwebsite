import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  ExternalLink,
} from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { BlogMarkdownContent } from "@/components/site/blog/BlogMarkdownContent";
import { Button } from "@/components/ui/button";
import {
  successStories,
  type SuccessStory,
  type SuccessStoryMetric,
} from "@/lib/resource-data";

export function getMatchingCategoryTab(category?: string): string {
  if (!category) return "All";
  const cat = category.trim().toLowerCase();
  if (cat.includes("ai") || cat.includes("data")) return "Ai & Data";
  if (cat === "finance") return "Finance";
  if (cat.includes("microfinance")) return "MicroFinance";
  if (cat.includes("higher education")) return "Higher Education";
  if (cat.includes("education")) return "Education";
  if (cat.includes("health")) return "Healthcare";
  if (cat.includes("quality")) return "Quality";
  return "All";
}

export function SuccessStoryPage({ story }: { story: SuccessStory }) {
  const relatedStories = successStories.filter((item) => item.slug !== story.slug).slice(0, 3);
  const returnCategory = getMatchingCategoryTab(story.category);
  const backSearch = returnCategory !== "All" ? { category: returnCategory } : undefined;

  useEffect(() => {
    if (typeof window !== "undefined" && returnCategory !== "All") {
      sessionStorage.setItem("success_stories_active_category", returnCategory);
    }
  }, [returnCategory]);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-glow opacity-70" />
        <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-10 md:pb-16 md:pt-12 lg:px-8">
          <Breadcrumbs
            items={[
              {
                label: "Success Stories",
                to: "/success-stories",
                search: backSearch,
              },
              { label: story.title },
            ]}
            variant="light"
          />
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium">
                {story.category ?? "Success story"}
              </div>
              <h1 className="mt-5 max-w-4xl text-3xl font-bold leading-[1.08] tracking-tight md:text-5xl">
                {story.title}
              </h1>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-white text-primary shadow-glow hover:bg-white/90">
                  <Link to="/success-stories" search={backSearch}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Success Stories
                  </Link>
                </Button>
                {story.downloadAssetPath && (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                  >
                    <a
                      href={story.downloadAssetPath}
                      target="_blank"
                      rel="noreferrer"
                      download={story.format === "pdf" ? true : undefined}
                    >
                      {story.format === "pdf" ? (
                        <Download className="mr-2 h-4 w-4" />
                      ) : (
                        <ExternalLink className="mr-2 h-4 w-4" />
                      )}
                      {story.downloadAssetLabel ?? "Open asset"}
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {story.heroImage && (
              <div className="animate-fade-up">
                <div className="overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/10 p-3 shadow-glow backdrop-blur">
                  <img
                    src={story.heroImage}
                    alt={story.title}
                    className="aspect-[16/10] w-full rounded-[1.25rem] object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {story.format === "article" && (
        <ArticleStoryLayout story={story} relatedStories={relatedStories} />
      )}
      {story.format === "video" && <VideoStoryLayout story={story} relatedStories={relatedStories} />}
      {story.format === "pdf" && <PdfStoryLayout story={story} relatedStories={relatedStories} />}
    </>
  );
}

function ArticleStoryLayout({
  story,
  relatedStories,
}: {
  story: SuccessStory;
  relatedStories: SuccessStory[];
}) {
  const metricsColsClass =
    story.metrics && story.metrics.length === 1
      ? "grid-cols-1 max-w-xl"
      : story.metrics && story.metrics.length === 2
        ? "grid-cols-1 md:grid-cols-2"
        : story.metrics && story.metrics.length === 3
          ? "grid-cols-1 md:grid-cols-3"
          : "grid-cols-1 md:grid-cols-2 xl:grid-cols-4";

  return (
    <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        {story.highlights && story.highlights.length > 0 && (
          <div className="rounded-[1.75rem] border border-border/70 bg-gradient-card p-6 shadow-card md:p-8">
            <div className="text-base font-bold uppercase tracking-[0.22em] text-accent">
              Key Highlights
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {story.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-2xl border border-border/70 bg-background p-6 text-lg font-medium leading-relaxed text-foreground/90 md:text-[1.15rem] md:leading-[1.75]"
                >
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        )}

        {story.metrics && story.metrics.length > 0 && (
          <div className="rounded-[1.75rem] border border-border/70 bg-gradient-card p-6 shadow-card md:p-8">
            <div className="text-base font-bold uppercase tracking-[0.22em] text-accent">
              Measurable Impact
            </div>
            <div className={`mt-5 grid gap-4 ${metricsColsClass}`}>
              {story.metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-border/70 bg-background p-6">
                  <div className="text-lg font-bold text-foreground md:text-xl">{metric.label}</div>
                  <div className="mt-4 space-y-2.5 text-base leading-relaxed text-muted-foreground md:text-[17px] md:leading-[1.7]">
                    {metric.before && (
                      <div>
                        <span className="font-semibold text-foreground/80">Before:</span> {metric.before}
                      </div>
                    )}
                    {metric.after && (
                      <div>
                        <span className="font-semibold text-foreground/80">After:</span> {metric.after}
                      </div>
                    )}
                    {metric.impact && (
                      <div className="pt-1 text-base font-bold text-accent md:text-lg">
                        {metric.impact}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <article className="rounded-[1.75rem] border border-border/70 bg-background p-6 shadow-card sm:p-8 md:p-10 lg:p-11">
            <BlogMarkdownContent content={stripLeadingTitle(story.content, story.title)} size="lg" />
          </article>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <SuccessStoryCtaCard story={story} />
            <MoreStoriesPanel relatedStories={relatedStories} />
          </aside>
        </div>
      </div>
    </section>
  );
}

function VideoStoryLayout({
  story,
  relatedStories,
}: {
  story: SuccessStory;
  relatedStories: SuccessStory[];
}) {
  return (
    <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <article className="rounded-[1.75rem] border border-border/70 bg-background p-6 shadow-card md:p-8 lg:p-10">
          {story.previewAssetPath && (
            <div className="overflow-hidden rounded-[1.5rem] border border-border/70 bg-surface">
              <video
                controls
                preload="metadata"
                className="aspect-video w-full bg-black"
                src={story.previewAssetPath}
              />
            </div>
          )}
          <div className="mt-8">
            <BlogMarkdownContent content={stripLeadingTitle(story.content, story.title)} size="lg" />
          </div>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <SuccessStoryCtaCard story={story} />

          <div className="rounded-[1.75rem] border border-border/70 bg-gradient-card p-6 shadow-card">
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
              Video preview
            </div>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Watch the success story directly on the page or open the video separately for a larger view.
            </p>
            {story.downloadAssetPath && (
              <Button asChild className="mt-5 w-full bg-gradient-cta text-primary-foreground hover:opacity-95">
                <a href={story.downloadAssetPath} target="_blank" rel="noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {story.downloadAssetLabel ?? "Open video"}
                </a>
              </Button>
            )}
          </div>

          <MoreStoriesPanel relatedStories={relatedStories} />
        </aside>
      </div>
    </section>
  );
}

function PdfStoryLayout({
  story,
  relatedStories,
}: {
  story: SuccessStory;
  relatedStories: SuccessStory[];
}) {
  return (
    <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <article className="rounded-[1.75rem] border border-border/70 bg-background p-6 shadow-card md:p-8 lg:p-10">
          <div className="overflow-hidden rounded-[1.5rem] border border-border/70 bg-surface">
            {story.previewAssetPath ? (
              <iframe
                title={story.title}
                src={story.previewAssetPath}
                className="h-[70vh] w-full bg-white"
              />
            ) : (
              <div className="grid aspect-video place-items-center text-sm text-muted-foreground">
                PDF preview unavailable
              </div>
            )}
          </div>
          <div className="mt-8">
            <BlogMarkdownContent content={stripLeadingTitle(story.content, story.title)} size="lg" />
          </div>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <SuccessStoryCtaCard story={story} />

          <div className="rounded-[1.75rem] border border-border/70 bg-gradient-card p-6 shadow-card">
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
              PDF actions
            </div>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Preview the PDF on this page, open it in a separate tab, or download the file directly.
            </p>
            {story.downloadAssetPath && (
              <Button asChild className="mt-5 w-full bg-gradient-cta text-primary-foreground hover:opacity-95">
                <a href={story.downloadAssetPath} target="_blank" rel="noreferrer" download>
                  <Download className="mr-2 h-4 w-4" />
                  {story.downloadAssetLabel ?? "Download PDF"}
                </a>
              </Button>
            )}
          </div>

          <MoreStoriesPanel relatedStories={relatedStories} />
        </aside>
      </div>
    </section>
  );
}

function getCategoryCtaContent(category?: string) {
  const cat = (category || "").trim().toLowerCase();

  if (cat.includes("ai") || cat.includes("data")) {
    return {
      ribbon: "FREE DEMO",
      prefix: "Accelerate With",
      highlight: "AI & Automation",
      description: "Deploy intelligent workflows, unified data pipelines & enterprise automation.",
      buttonText: "Book Demo",
      buttonLink: "/contact-us",
      buttonHash: "contact-form",
      tags: ["Intelligence", "Automation", "Innovation", "Analytics", "Optimization"],
      features: ["Technical POC", "24/7 Support", "Zero Obligation", "Enterprise SLA"],
    };
  }

  if (cat.includes("health")) {
    return {
      ribbon: "FREE DEMO",
      prefix: "Transform Your",
      highlight: "Hospital",
      description: "Automate Billing, EMR, Pharmacy & Patient Management.",
      buttonText: "Book Demo",
      buttonLink: "/contact-us",
      buttonHash: "contact-form",
      tags: ["Healthcare", "Diagnostics", "Pharmacy", "Patientcare", "Efficiency"],
      features: ["Fixed Price", "24/7 Support", "Zero Obligation", "Fast Setup"],
    };
  }

  if (cat === "higher education") {
    return {
      ribbon: "FREE DEMO",
      prefix: "Transform Your",
      highlight: "College & University",
      description: "Streamline university admissions, accreditation tracking & multi-campus workflows.",
      buttonText: "Book Demo",
      buttonLink: "/contact-us",
      buttonHash: "contact-form",
      tags: ["Academics", "Admissions", "Examinations", "Automation", "Excellence"],
      features: ["Live Demo", "24/7 Support", "Zero Obligation", "Fast Setup"],
    };
  }

  if (cat.includes("education")) {
    return {
      ribbon: "FREE DEMO",
      prefix: "Transform Your",
      highlight: "Institution",
      description: "Consolidate campus records, admissions, fee management & academic workflows.",
      buttonText: "Book Demo",
      buttonLink: "/contact-us",
      buttonHash: "contact-form",
      tags: ["Learning", "Admissions", "Attendance", "Academics", "Engagement"],
      features: ["Live Demo", "24/7 Support", "Zero Obligation", "Fast Setup"],
    };
  }

  if (cat === "microfinance") {
    return {
      ribbon: "FREE DEMO",
      prefix: "Transform Your",
      highlight: "Microfinance",
      description: "Accelerate loan disbursements, automate recovery tracking & branch audits.",
      buttonText: "Book Demo",
      buttonLink: "/contact-us",
      buttonHash: "contact-form",
      tags: ["Lending", "Repayments", "Collections", "Analytics", "Inclusion"],
      features: ["Live Demo", "24/7 Support", "Zero Obligation", "Fast Setup"],
    };
  }

  if (cat.includes("finance")) {
    return {
      ribbon: "FREE DEMO",
      prefix: "Transform Your",
      highlight: "Financial Ops",
      description: "Connect branch accounts, automate reporting & achieve audit-ready compliance.",
      buttonText: "Book Demo",
      buttonLink: "/contact-us",
      buttonHash: "contact-form",
      tags: ["Accounting", "Compliance", "Payroll", "Budgeting", "Transparency"],
      features: ["Live Demo", "24/7 Support", "Zero Obligation", "Fast Setup"],
    };
  }

  if (cat.includes("quality")) {
    return {
      ribbon: "FREE DEMO",
      prefix: "Transform Your",
      highlight: "Audit & Quality",
      description: "Automate audit reporting, compliance workflows & enterprise cycle time reduction.",
      buttonText: "Book Demo",
      buttonLink: "/contact-us",
      buttonHash: "contact-form",
      tags: ["Auditing", "Compliance", "Risk", "Reporting", "Quality"],
      features: ["Live Demo", "24/7 Support", "Zero Obligation", "Fast Setup"],
    };
  }

  return {
    ribbon: "FREE DEMO",
    prefix: "Transform Your",
    highlight: "Operations",
    description: "Automate workflows, unify systems & achieve measurable outcomes with our custom solutions.",
    buttonText: "Book Demo",
    buttonLink: "/contact-us",
    buttonHash: "contact-form",
    tags: ["Innovation", "Cloud", "Architecture", "Transformation", "Scalability"],
    features: ["Tailored Demo", "24/7 Support", "Zero Obligation", "Fast Delivery"],
  };
}

function SuccessStoryCtaCard({ story }: { story: SuccessStory }) {
  const cta = getCategoryCtaContent(story.category);

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-blue-400/25 bg-gradient-to-br from-[#061d47] via-[#092d6e] to-[#0c449b] p-6 text-white shadow-xl shadow-blue-950/25">
      {/* Background glow effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-12 -top-12 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -right-10 h-36 w-36 rounded-full bg-blue-500/25 blur-3xl"
      />

      {/* Diagonal Free Demo Ribbon (Sample Image 3) */}
      <div className="pointer-events-none absolute -right-12 top-6 w-44 rotate-45 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500 py-1 text-center text-[10px] font-black uppercase tracking-widest text-white shadow-md">
        {cta.ribbon}
      </div>

      {/* Header & Title */}
      <div className="relative pr-10">
        <h3 className="text-2xl font-black leading-tight tracking-tight text-white">
          {cta.prefix}{" "}
          <span className="block text-[#38ef7d] drop-shadow-sm">{cta.highlight}</span>
        </h3>
        <p className="mt-3 text-[16px] leading-relaxed text-blue-100/95 font-normal">
          {cta.description}
        </p>
      </div>

      {/* Primary Action Button (Sample Image 3 & 2) */}
      <div className="relative mt-5">
        <Button
          asChild
          size="lg"
          className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-[15px] shadow-lg shadow-cyan-500/30 hover:from-cyan-300 hover:to-blue-400 hover:text-black transition-all duration-200"
        >
          <Link to={cta.buttonLink} hash={cta.buttonHash}>
            {cta.buttonText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Moving Marquee Tags */}
      <div className="relative mt-3.5 overflow-hidden">
        {/* @ts-expect-error HTML marquee element */}
        <marquee
          behavior="scroll"
          direction="left"
          scrollamount={4}
          className="block whitespace-nowrap text-xs font-bold uppercase tracking-wider text-cyan-300"
        >
          {cta.tags.map((tag, idx) => (
            <span key={idx} className="mx-2 inline-flex items-center gap-2">
              <span>{tag}</span>
              <span className="text-cyan-400/80">◆</span>
            </span>
          ))}
        </marquee>
      </div>

      {/* Feature Bullets (Sample Image 2) */}
      <div className="relative mt-4 grid grid-cols-2 gap-x-3 gap-y-2.5 text-[13.5px] font-medium text-blue-100">
        {cta.features.map((feature) => (
          <div key={feature} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shrink-0" />
            <span className="truncate">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}



function MoreStoriesPanel({
  relatedStories,
}: {
  relatedStories: SuccessStory[];
}) {
  if (relatedStories.length === 0) return null;

  return (
    <div className="rounded-[1.75rem] border border-border/70 bg-gradient-card p-6 shadow-card">
      <div className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
        More stories
      </div>
      <div className="mt-4 space-y-4">
        {relatedStories.map((relatedStory) => (
          <Link
            key={relatedStory.slug}
            to="/success-stories/$slug"
            params={{ slug: relatedStory.slug }}
            className="group block rounded-2xl border border-border/70 bg-background p-4 transition-all duration-200 hover:-translate-y-1 hover:border-accent/30"
          >
            <div className="text-base font-semibold leading-snug text-foreground group-hover:text-accent">
              {relatedStory.title}
            </div>
            <div className="mt-2 inline-flex items-center gap-2 text-[15px] font-medium text-accent">
              {relatedStory.format === "video"
                ? "Watch preview"
                : relatedStory.format === "pdf"
                  ? "View preview"
                  : "Read story"}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
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

