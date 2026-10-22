import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  eyebrow,
  title,
  subtitle,
  align = "left",
  bg = "default",
  introWidth = "default",
}: {
  children?: React.ReactNode;
  className?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  align?: "left" | "center";
  bg?: "default" | "surface" | "muted";
  introWidth?: "default" | "wide" | "full";
}) {
  return (
    <section
      className={cn(
        "cv-auto px-6 py-[40px] md:py-[52px] lg:px-8 lg:py-[64px]",
        bg === "surface" && "bg-surface",
        bg === "muted" && "bg-surface-muted",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title || subtitle) && (
          <div
            className={cn(
              "mb-8 md:mb-10",
              introWidth === "default" && "max-w-3xl",
              introWidth === "wide" && "max-w-5xl",
              introWidth === "full" && "max-w-none",
              align === "center" && "mx-auto text-center",
            )}
          >
            {eyebrow && (
              <div className={cn("t-eyebrow mb-3", align === "center" && "mx-auto w-fit")}>
                {eyebrow}
              </div>
            )}
            {title && <h2 className="t-section-title">{title}</h2>}
            {subtitle && <p className="t-lead mt-4">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

