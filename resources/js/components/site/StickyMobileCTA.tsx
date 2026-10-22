import { Link } from "@tanstack/react-router";

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-white/96 px-4 py-3 shadow-[0_-14px_40px_-28px_rgba(12,24,48,0.45)] backdrop-blur md:hidden">
      <Link
        to="/contact-us"
        preload="intent"
        className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-cta px-4 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition-transform duration-200 active:scale-[0.99]"
      >
        Schedule Consultation
      </Link>
    </div>
  );
}
