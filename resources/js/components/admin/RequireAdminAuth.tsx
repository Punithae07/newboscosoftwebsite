import { useEffect } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";

export function RequireAdminAuth({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !session) {
      navigate({
        to: "/admin/login",
        replace: true,
      });
    }
  }, [loading, session, navigate, location.pathname]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 text-center shadow-sm">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-accent/25 border-t-accent" />
          <p className="mt-4 text-base font-medium text-slate-700">Checking admin access...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}
