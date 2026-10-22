import { Link } from "@tanstack/react-router";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function FeatureCard({
  to,
  title,
  description,
  category,
  cta = "Learn more",
  icon: Icon,
  imageSrc,
  backgroundImageSrc,
  accent = false,
  className,
  immersive = false,
}: {
  to: string;
  title: string;
  description: string;
  category?: string;
  cta?: string;
  icon?: LucideIcon;
  imageSrc?: string;
  backgroundImageSrc?: string;
  accent?: boolean;
  className?: string;
  immersive?: boolean;
}) {
  if (immersive) {
    return (
      <Link
        to={to}
        className={cn(
          "group relative block min-h-[23rem] overflow-hidden rounded-[1.75rem] border border-border/60 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9b09] focus-visible:ring-offset-2",
          className,
        )}
      >
        <div className="absolute inset-0">
          {backgroundImageSrc ? (
            <img
              src={backgroundImageSrc}
              alt={title}
              loading="lazy"
              decoding="async"
              width={1024}
              height={768}
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-[#06152f] via-[#0a2348]/84 to-[#0b2850]/40 transition-opacity duration-300 group-hover:from-[#051127] group-hover:via-[#081d3f]/92 group-hover:to-[#0a2348]/58" />
        </div>

        <div className="relative flex h-full min-h-[23rem] flex-col justify-end p-6 md:p-7">
          <div className="mt-auto">
            {category && (
              <div className="mb-3">
                <span className="inline-flex items-center rounded-full border border-white/18 bg-[#ffffff24] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-[0_8px_20px_-12px_rgba(0,0,0,0.7)] backdrop-blur-md">
                  {category}
                </span>
              </div>
            )}
            <h3 className="max-w-[18rem] text-[1.65rem] font-bold leading-tight text-white">
              {title}
            </h3>
            <div className="mt-5 overflow-hidden opacity-100 transition-all duration-300 md:max-h-0 md:translate-y-3 md:opacity-0 md:group-hover:max-h-48 md:group-hover:translate-y-0 md:group-hover:opacity-100">
              <p className="max-w-[22rem] text-[1rem] leading-7 text-white/96 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
                {description}
              </p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white px-4 py-2 text-sm font-semibold text-[#0b376d] shadow-[0_14px_28px_-16px_rgba(10,35,72,0.75)] transition-all group-hover:translate-x-1">
                {cta} <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={to}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-gradient-card p-6 md:p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-elegant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-fluent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="mb-5 flex items-center gap-4">
        {imageSrc ? (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-white p-2 shadow-sm">
            <img
              src={imageSrc}
              alt={title}
              loading="lazy"
              decoding="async"
              width={160}
              height={80}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ) : Icon ? (
          <div
            className={cn(
              "grid h-14 w-14 shrink-0 place-items-center rounded-2xl",
              accent
                ? "bg-gradient-fluent text-white shadow-glow p-2"
                : "bg-accent/10 text-accent p-2",
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
        ) : null}

        <div className="flex flex-col">
          {category && (
            <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 t-eyebrow">
              {category}
            </span>
          )}
        </div>
      </div>

      <h3 className="t-card-title">{title}</h3>
      <p className="t-card-desc mt-3 flex-1">{description}</p>
      <div className="t-button mt-6 inline-flex items-center gap-1 text-accent transition-all group-hover:gap-2">
        {cta} <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}
