import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { FileText, LayoutDashboard, LogOut, Mail, Menu, Newspaper, Shield, Users } from "lucide-react";
import { toast } from "sonner";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type AdminShellProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

const navItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Contacts", to: "/admin/contacts", icon: Mail },
  { label: "Newsletters", to: "/admin/newsletters", icon: Newspaper },
  { label: "Whitepapers", to: "/admin/brochures", icon: FileText },
] as const;

export function AdminShell({ title, description, actions, children }: AdminShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const { session, signOut } = useAdminAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully.");
      window.location.href = "/admin/login";
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to log out.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white md:block">
        <SidebarContent pathname={pathname} onNavigate={() => undefined} />
      </aside>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 border-r border-slate-200 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Admin navigation</SheetTitle>
          </SheetHeader>
          <SidebarContent pathname={pathname} onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="md:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open admin menu</span>
              </Button>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                  Boscosoft Admin
                </p>
                <h1 className="text-2xl font-bold tracking-tight text-slate-950">{title}</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-slate-900">{session?.name || session?.email}</p>
                <p className="text-sm text-slate-500">{session?.email}</p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {description || actions ? (
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                {description ? <p className="text-base leading-7 text-slate-600">{description}</p> : null}
              </div>
              {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
            </div>
          ) : null}

          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarContent({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-slate-200 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-white shadow-sm">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-950">Boscosoft</p>
            <p className="text-sm text-slate-500">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">
        {navItems.map(({ label, to, icon: Icon }) => {
          const active = pathname === to || pathname.startsWith(`${to}/`);

          return (
            <Link
              key={to}
              to={to}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-semibold transition-colors",
                active
                  ? "bg-primary text-white shadow-sm"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-950",
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
