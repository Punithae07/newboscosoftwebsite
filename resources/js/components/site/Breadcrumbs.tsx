import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs({ 
  items, 
  variant = "default" 
}: { 
  items: { label: string; to?: string }[];
  variant?: "default" | "light";
}) {
  const textClasses = variant === "light" ? "text-white/70" : "text-muted-foreground";
  const linkClasses = variant === "light" ? "hover:text-white" : "hover:text-foreground";
  const labelClasses = variant === "light" ? "text-white" : "text-foreground";
  
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${textClasses}`}>
      <ol className="flex items-center flex-wrap gap-1.5">
        <li>
          <Link to="/" className={`inline-flex items-center ${linkClasses}`}>
            <Home className="h-3.5 w-3.5" />
          </Link>
        </li>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            {it.to ? (
              <Link to={it.to} className={linkClasses}>
                {it.label}
              </Link>
            ) : (
              <span className={labelClasses}>{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
