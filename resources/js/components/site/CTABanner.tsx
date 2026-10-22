import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTABanner({
  title = "Ready to build a more connected and intelligent organization?",
  description = "Whether you are exploring AI, modernizing ERP, building SaaS platforms, integrating systems, or improving visibility, Boscosoft can help you plan the next step.",
  primary = { label: "Talk to Our Experts", to: "/contact-us" },
  secondary = { label: "Request Demo", to: "/contact-us" },
}: {
  title?: string;
  description?: string;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
}) {
  const primaryTo = primary.to === "/contact" ? "/contact-us" : primary.to;
  const secondaryTo = secondary.to === "/contact" ? "/contact-us" : secondary.to;

  return (
    <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-hero px-7 py-10 text-primary-foreground shadow-elegant md:px-10 md:py-12">
        <div className="pointer-events-none absolute inset-0 bg-gradient-glow opacity-70" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-fluent opacity-30 blur-3xl" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,1.3fr)_auto]">
          <div className="max-w-3xl">
            <div className="t-eyebrow text-accent">Next step</div>
            <h2 className="mt-3 t-section-title max-w-3xl">{title}</h2>
            <p className="mt-4 max-w-2xl text-[18px] leading-8 text-white">{description}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-glow"
            >
              <Link to={primaryTo} preload="intent">
                <>
                  {primary.label} <ArrowRight className="ml-2 h-4 w-4" />
                </>
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <Link to={secondaryTo} preload="intent">
                {secondary.label}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
