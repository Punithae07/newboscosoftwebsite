import { useEffect, useMemo, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTABanner } from "@/components/site/CTABanner";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { whitePapers } from "@/lib/resource-data";

function openDownload(targetPath: string) {
  if (typeof window === "undefined" || !targetPath) {
    return;
  }

  const encodedPath = encodeURI(targetPath);
  const rawFileName = targetPath.split("/").pop() || "whitepaper.pdf";
  const fileName = decodeURIComponent(rawFileName).trim();

  const link = document.createElement("a");
  link.href = encodedPath;
  link.setAttribute("download", fileName);
  link.target = "_blank";
  link.rel = "noreferrer noopener";
  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    if (document.body.contains(link)) {
      document.body.removeChild(link);
    }
  }, 200);
}

export function WhitePapersListingPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [requestedPaper, setRequestedPaper] = useState<(typeof whitePapers)[number] | null>(null);
  const [formHeight, setFormHeight] = useState(540);
  const [iframeLoading, setIframeLoading] = useState(false);

  const iframeSrc = useMemo(() => {
    if (!requestedPaper) {
      return "";
    }

    const params = new URLSearchParams({
      slug: requestedPaper.slug,
      title: requestedPaper.title,
      pdf: requestedPaper.pdfPath,
    });

    return `/whitepaper-form?${params.toString()}`;
  }, [requestedPaper]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        return;
      }

      if (
        typeof event.data === "object" &&
        event.data !== null &&
        event.data.type === "bosco-whitepaper-form-height" &&
        typeof event.data.height === "number"
      ) {
        setFormHeight(Math.ceil(event.data.height) + 2);
        setIframeLoading(false);
      }

      if (
        typeof event.data === "object" &&
        event.data !== null &&
        event.data.type === "bosco-whitepaper-download" &&
        typeof event.data.downloadPath === "string"
      ) {
        toast.success("Request received. Your white paper download is starting.");
        openDownload(event.data.downloadPath);
        handleDialogChange(false);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const openRequestForm = (slug: string) => {
    const paper = whitePapers.find((item) => item.slug === slug) ?? null;
    if (!paper) return;

    setRequestedPaper(paper);
    setFormHeight(540);
    setIframeLoading(true);
    setDialogOpen(true);
  };

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setRequestedPaper(null);
    }
  };

  const publishedPapers = whitePapers.filter((p) => p.status !== "coming_soon");

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <Breadcrumbs items={[{ label: "White Papers" }]} variant="light" />
          <div className="mt-8 max-w-4xl animate-fade-up">
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/92">
              White Papers
            </div>
            <h1 className="page-hero-title mt-5">
              Research and practical guides for technology leaders
            </h1>
            <p className="page-hero-copy mt-5 max-w-3xl">
              Go deeper on the architectural and operational choices shaping modern business technology.
            </p>
          </div>
        </div>
      </section>

      {publishedPapers.length > 0 && (
        <Section
          eyebrow="Published Downloads"
          title="Available white papers & publications"
          subtitle="Click download, fill the popup form, and the PDF will start immediately after submission."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            {publishedPapers.map((paper) => (
              <article
                key={paper.slug}
                className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-gradient-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-elegant"
              >
                {paper.coverImage && (
                  <div className="relative overflow-hidden">
                    <img
                      src={paper.coverImage}
                      alt={paper.title}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="mt-3 t-card-title-lg">{paper.title}</h2>
                  <p className="mt-4 t-card-desc flex-1">{paper.description}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button
                      className="flex items-center gap-2 bg-gradient-cta text-primary-foreground hover:opacity-95"
                      onClick={() => openRequestForm(paper.slug)}
                    >
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>
      )}

      <CTABanner />

      <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto rounded-[1.75rem] border-border/70 p-0">
          <div className="bg-gradient-card p-6 sm:p-8">
            <div className="relative">
              {iframeLoading ? (
                <div className="absolute inset-0 z-10 flex min-h-[360px] items-center justify-center rounded-[1.5rem] border border-border/70 bg-white/80 backdrop-blur-sm">
                  <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading form...
                  </div>
                </div>
              ) : null}
              {requestedPaper ? (
                <iframe
                  key={iframeSrc}
                  src={iframeSrc}
                  title={`White paper request form for ${requestedPaper.title}`}
                  scrolling="no"
                  loading="lazy"
                  onLoad={() => setIframeLoading(false)}
                  style={{ height: `${formHeight}px` }}
                  className="block w-full rounded-[1.5rem] border-0 bg-transparent"
                />
              ) : null}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}


