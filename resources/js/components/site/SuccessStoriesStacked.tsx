import Autoplay from "embla-carousel-autoplay";
import { Quote, Calculator } from "lucide-react";
import { useRef } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

interface Testimonial {
  q: string;
  n: string;
  o: string;
}

interface SuccessStoriesStackedProps {
  testimonials: Testimonial[];
  sideImage?: string;
  sideVideoEmbedUrl?: string;
  imageAlt?: string;
  imageBadgeLabel?: string;
  imageClassName?: string;
  highlights?: string[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="ss-card">
      <div className="ss-card-inner">
        <div className="ss-card-accent-bar" />
        <div className="ss-card-body">
          <Quote className="ss-quote-icon" strokeWidth={1.75} />
          <p className="ss-quote-text">&ldquo;{testimonial.q}&rdquo;</p>
          <div className="ss-author">
            <div className="ss-author-name">{testimonial.n}</div>
            <div className="ss-author-org">{testimonial.o}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SuccessStoriesStacked({
  testimonials,
  sideImage,
  sideVideoEmbedUrl,
  imageAlt = "Success story",
  imageBadgeLabel,
  imageClassName,
  highlights = [],
  eyebrow,
  title,
  subtitle,
}: SuccessStoriesStackedProps) {
  const autoplay = useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  const cards =
    testimonials.length > 0
      ? testimonials
      : [
          {
            q: "The Best ERP, that helped us to bring our accounts in branches under control.",
            n: "Fr. Edwin Vasanth",
            o: "Economer, Salesians of Don Bosco, Chennai Province",
          },
        ];

  const hasSideMedia = Boolean(sideVideoEmbedUrl || sideImage);

  return (
    <div className={`ss-grid ${hasSideMedia ? "ss-grid--with-image" : "ss-grid--no-image"}`}>
      <div className="ss-cards-col">
        {(eyebrow || title || subtitle) && (
          <div className="max-w-3xl">
            {eyebrow ? <div className="mb-3 t-eyebrow">{eyebrow}</div> : null}
            {title ? <h2 className="t-section-title">{title}</h2> : null}
            {subtitle ? <p className="mt-4 t-lead">{subtitle}</p> : null}
          </div>
        )}

        {highlights.length > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {highlights.slice(0, 3).map((highlight) => (
              <div
                key={highlight}
                className="min-w-0 rounded-2xl border border-accent/15 bg-linear-to-br from-accent/10 to-white px-4 py-3 text-sm font-semibold leading-6 text-accent shadow-[0_12px_28px_-24px_rgba(0,174,232,0.75)]"
              >
                <span className="block max-w-full text-balance">{highlight}</span>
              </div>
            ))}
          </div>
        )}

        <div className="min-w-0">
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[autoplay.current]}
            className="w-full"
          >
            <CarouselContent className="-ml-0">
              {cards.map((t, i) => (
                <CarouselItem key={i} className="pl-0">
                  <TestimonialCard testimonial={t} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      {hasSideMedia && (
        <div
          className="ss-image-col"
          style={
            sideVideoEmbedUrl
              ? { display: "flex", alignItems: "center", justifyContent: "center" }
              : undefined
          }
        >
          {sideVideoEmbedUrl ? (
            <div
              className="relative overflow-hidden rounded-2xl shadow-xl bg-black"
              style={{
                width: "560px",
                maxWidth: "100%",
                aspectRatio: "16 / 9",
                height: "auto",
                margin: "auto",
              }}
            >
              <iframe
                width="560"
                height="315"
                src={sideVideoEmbedUrl}
                title={imageAlt || "YouTube video player"}
                style={{
                  width: "100%",
                  height: "100%",
                  border: 0,
                  display: "block",
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          ) : sideImage ? (
            <div className="ss-image-wrap">
              <img
                src={sideImage}
                alt={imageAlt}
                className={`ss-image ${imageClassName ?? ""}`.trim()}
                loading="lazy"
              />
              {imageBadgeLabel ? (
                <div className="ss-image-badge">
                  <Calculator className="h-4 w-4" strokeWidth={2} />
                  <span>{imageBadgeLabel}</span>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
