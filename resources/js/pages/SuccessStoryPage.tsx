import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { BlogMarkdownContent } from "@/components/site/blog/BlogMarkdownContent";
import { Button } from "@/components/ui/button";
import {
  successStories,
  type SuccessStory,
  type SuccessStoryMetric,
} from "@/lib/resource-data";

export function SuccessStoryPage({ story }: { story: SuccessStory }) {
  const relatedStories = successStories.filter((item) => item.slug !== story.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-glow opacity-70" />
        <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-10 md:pb-16 md:pt-12 lg:px-8">
          <Breadcrumbs items={[{ label: "Success Stories", to: "/success-stories" }, { label: story.title }]} variant="light" />
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium">
                {story.category ?? "Success story"}
              </div>
              <h1 className="mt-5 max-w-4xl text-3xl font-bold leading-[1.08] tracking-tight md:text-5xl">
                {story.title}
              </h1>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-primary-foreground/70">
                {story.organization && (
                  <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5">
                    {story.organization}
                  </span>
                )}
                {story.location && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1.5">
                    <MapPin className="h-3.5 w-3.5 text-accent" />
                    {story.location}
                  </span>
                )}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-white text-primary shadow-glow hover:bg-white/90">
                  <Link to="/success-stories">
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
  const hasSidebarContent = relatedStories.length > 0;

  return (
    <section className="cv-auto px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {story.organization && <FactCard label="Organization" value={story.organization} />}
          {story.technologyPartner && <FactCard label="Technology Partner" value={story.technologyPartner} />}
          {story.location && <FactCard label="Location" value={story.location} />}
        </div>

        {story.highlights && story.highlights.length > 0 && (
          <div className="rounded-[1.75rem] border border-border/70 bg-gradient-card p-6 shadow-card md:p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Key Highlights
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {story.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-2xl border border-border/70 bg-background p-5 text-sm leading-7 text-muted-foreground"
                >
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        )}

        {story.metrics && story.metrics.length > 0 && (
          <div className="rounded-[1.75rem] border border-border/70 bg-gradient-card p-6 shadow-card md:p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Measurable Impact
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {story.metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-border/70 bg-background p-5">
                  <div className="text-sm font-semibold text-foreground">{metric.label}</div>
                  <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {metric.before && <div>Before: {metric.before}</div>}
                    {metric.after && <div>After: {metric.after}</div>}
                    {metric.impact && <div className="font-semibold text-accent">{metric.impact}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={hasSidebarContent ? "grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]" : ""}>
          <article className="rounded-[1.75rem] border border-border/70 bg-background p-5 shadow-card sm:p-6 md:p-8 lg:p-9">
            <BlogMarkdownContent content={stripLeadingTitle(story.content, story.title)} />
          </article>

          {hasSidebarContent && (
            <aside className="space-y-6">
              {story.relatedImage && (
                <div className="overflow-hidden rounded-[1.75rem] border border-border/70 bg-gradient-card p-4 shadow-card">
                  <img
                    src={story.relatedImage}
                    alt={`${story.title} related visual`}
                    className="aspect-[4/3] w-full rounded-[1.25rem] object-cover"
                  />
                  <div className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    Related image
                  </div>
                </div>
              )}

              <MoreStoriesPanel relatedStories={relatedStories} />
            </aside>
          )}
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
    <section className="cv-auto px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
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
            <BlogMarkdownContent content={stripLeadingTitle(story.content, story.title)} />
          </div>
        </article>

        <aside className="space-y-6">
          <div className="rounded-[1.75rem] border border-border/70 bg-gradient-card p-6 shadow-card">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Video preview
            </div>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
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
    <section className="cv-auto px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
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
            <BlogMarkdownContent content={stripLeadingTitle(story.content, story.title)} />
          </div>
        </article>

        <aside className="space-y-6">
          <div className="rounded-[1.75rem] border border-border/70 bg-gradient-card p-6 shadow-card">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              PDF actions
            </div>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
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

function FactCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-gradient-card p-5 shadow-card">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{label}</div>
      <div className="mt-3 text-base font-semibold leading-7 text-foreground">{value}</div>
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
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
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
            <div className="font-semibold leading-snug text-foreground group-hover:text-accent">
              {relatedStory.title}
            </div>
            <div className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-accent">
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

