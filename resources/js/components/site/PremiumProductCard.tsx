import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

function getCardCategoryLabel(category: string) {
  switch (category) {
    case "Audit & Compliance Platform":
      return "Audit Platform";
    case "Hospital Management Software":
      return "Hospital Software";
    default:
      return category;
  }
}

export function PremiumProductCard({
  to,
  name,
  category,
  tagline,
  logoSrc,
  illustrationSrc,
  seoAlt,
  features,
  cta = "Explore",
  className,
}: {
  to: string;
  name: string;
  category: string;
  tagline: string;
  logoSrc: string;
  illustrationSrc: string;
  seoAlt: string;
  features: string[];
  cta?: string;
  className?: string;
}) {
  const categoryLabel = getCardCategoryLabel(category);

  return (
    <Link
      to={to}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.9rem] border border-border/60 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-elegant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      <div className="relative h-44 overflow-hidden bg-white sm:h-48">
        <img
          src={illustrationSrc}
          alt={seoAlt}
          loading="lazy"
          decoding="async"
          fetchPriority="auto"
          width={1600}
          height={900}
          sizes="(min-width: 1280px) 420px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className=""
        />

        <div className="absolute left-4 top-4 max-w-[calc(100%-2rem)]">
          <span className="inline-flex max-w-full items-center rounded-full border border-[#9fc7ff]/45 bg-[#0b2e68] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-white shadow-[0_10px_24px_-16px_rgba(3,17,51,0.9)]">
            <span className="truncate">{categoryLabel}</span>
          </span>
        </div>

        <div className="absolute bottom-4 left-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white bg-white p-2 shadow-lg ring-1 ring-slate-200/80 transition-transform duration-300 group-hover:scale-105">
          <img
            src={logoSrc}
            alt={`${name} logo`}
            loading="lazy"
            decoding="async"
            width={160}
            height={80}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="t-card-title">{name}</h3>
        <p className="t-card-desc mt-3 line-clamp-2 text-foreground/88">{tagline}</p>

        <ul className="mt-6 space-y-3">
          {features.slice(0, 3).map((f) => (
            <li key={f} className="t-list flex items-start gap-2.5 text-foreground/85">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </span>
              <span className="leading-snug">{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 border-t border-border/60 pt-4">
          <span className="t-button inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-4 py-2 text-accent transition-all group-hover:gap-3 group-hover:bg-accent/14">
            {cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent transition-all duration-300 group-hover:ring-accent/30" />
    </Link>
  );
}


