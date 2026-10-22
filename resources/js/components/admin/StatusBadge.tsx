import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ContactStatus } from "@/lib/contacts";

const badgeMap: Record<ContactStatus, string> = {
  New: "border-sky-200 bg-sky-50 text-sky-700",
  Contacted: "border-amber-200 bg-amber-50 text-amber-700",
  "In Progress": "border-indigo-200 bg-indigo-50 text-indigo-700",
  Converted: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Closed: "border-slate-200 bg-slate-100 text-slate-700",
};

export function StatusBadge({ status, className }: { status: ContactStatus; className?: string }) {
  return (
    <Badge variant="outline" className={cn("font-semibold", badgeMap[status], className)}>
      {status}
    </Badge>
  );
}
