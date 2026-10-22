import { useState, useRef, useEffect } from "react";
import { useDragScroll } from "@/hooks/useDragScroll";

interface FeatureCarouselProps {
  items: {
    title: string;
    description: string;
    number: number;
  }[];
}

function FeatureCard({
  item,
}: {
  item: FeatureCarouselProps["items"][number];
}) {
  return (
    <div className="shrink-0 w-[82vw] rounded-xl border border-accent/60 bg-background p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant sm:w-[17rem] md:w-[19rem] md:p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-accent/70 text-sm font-semibold text-accent">
          {String(item.number).padStart(2, "0")}
        </div>
        <div className="font-semibold text-lg">{item.title}</div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
    </div>
  );
}

export function FeatureCarousel({ items }: FeatureCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const reducedMotionRef = useRef(false);
  const { isDragging, dragProps } = useDragScroll();

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const element = scrollContainerRef.current;
    if (!element || isPaused || isDragging || reducedMotionRef.current) return;

    const scroll = () => {
      if (!scrollContainerRef.current || document.hidden) {
        animationRef.current = requestAnimationFrame(scroll);
        return;
      }

      const el = scrollContainerRef.current;
      el.scrollLeft += 1.5;

      if (el.scrollLeft >= el.scrollWidth / 2 - 5) {
        el.scrollLeft = 0;
      }

      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationRef.current);
  }, [isPaused, isDragging, items.length]);

  return (
    <div
      ref={scrollContainerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      tabIndex={0}
      {...dragProps}
      className={`flex gap-4 md:gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-2 -mx-1 px-1 select-none ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{ WebkitOverflowScrolling: "touch" }}
      aria-label="Product features carousel"
      aria-description="Auto-scrolling feature cards. Drag horizontally to browse."
    >
      {items.map((item) => (
        <FeatureCard key={`original-${item.number}`} item={item} />
      ))}
      {items.map((item) => (
        <FeatureCard key={`duplicate-${item.number}`} item={item} />
      ))}
    </div>
  );
}
