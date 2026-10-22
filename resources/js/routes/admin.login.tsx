import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { KeyRound, Loader2, LockKeyhole, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest } from "@/lib/api";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{ title: "Admin Login | Bosco Soft Technologies" }],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const { session, loading, signIn, error } = useAdminAuth();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [passwordForm, setPasswordForm] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && session) {
      navigate({ to: "/admin/dashboard", replace: true });
    }
  }, [loading, session, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitting(true);
    setLoginError(null);

    try {
      await signIn(formValues.email.trim(), formValues.password);
      toast.success("Admin login successful.");
      navigate({ to: "/admin/dashboard", replace: true });
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : "Unable to sign in right now.";
      setLoginError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      const message = "New password and confirm password must match.";
      setPasswordError(message);
      toast.error(message);
      return;
    }

    setChangingPassword(true);
    setPasswordError(null);

    try {
      const response = await apiRequest<{ message: string }>("/admin/change-password", {
        method: "POST",
        body: {
          email: passwordForm.email.trim(),
          current_password: passwordForm.currentPassword,
          new_password: passwordForm.newPassword,
          new_password_confirmation: passwordForm.confirmPassword,
        },
      });

      toast.success(response.message);
      setFormValues({ email: passwordForm.email.trim(), password: "" });
      setPasswordForm((current) => ({
        ...current,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setShowChangePassword(false);
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : "Unable to change password right now.";
      setPasswordError(message);
      toast.error(message);
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(27,176,245,0.12),_transparent_32%),linear-gradient(180deg,_#f8fbff_0%,_#eef4fb_100%)] px-4 py-12">
      <Card className="w-full max-w-xl rounded-[2rem] border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
        <CardHeader className="space-y-4 px-6 pt-8 sm:px-10 sm:pt-10">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 text-sm font-semibold text-accent">
            <ShieldCheck className="h-4 w-4" />
            Secure Admin
          </div>
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight text-slate-950">
              Admin access
            </CardTitle>
            <CardDescription className="mt-3 text-base leading-7 text-slate-600">
              Sign in to the admin panel. If needed, you can change your password from this page.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-8 sm:px-10 sm:pb-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-base font-semibold text-slate-900">Email</Label>
              <Input
                type="email"
                value={formValues.email}
                onChange={(event) =>
                  setFormValues((current) => ({ ...current, email: event.target.value }))
                }
                placeholder="admin@boscosofttech.com"
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-base font-semibold text-slate-900">Password</Label>
              <Input
                type="password"
                value={formValues.password}
                onChange={(event) =>
                  setFormValues((current) => ({ ...current, password: event.target.value }))
                }
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>

            {loginError || error ? (
              <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive">
                {loginError || error}
              </div>
            ) : null}

            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LockKeyhole className="h-4 w-4" />
                  Login
                </>
              )}
            </Button>
          </form>

          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={() => {
                setPasswordError(null);
                setShowChangePassword((current) => !current);
                setPasswordForm((current) => ({
                  ...current,
                  email: current.email || formValues.email,
                }));
              }}
              className="text-sm font-semibold text-accent transition hover:text-accent/80"
            >
              {showChangePassword ? "Hide change password" : "Change password"}
            </button>
          </div>

          {showChangePassword ? (
            <form onSubmit={handleChangePassword} className="mt-6 space-y-5 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <div className="space-y-2">
                <Label className="text-base font-semibold text-slate-900">Email</Label>
                <Input
                  type="email"
                  value={passwordForm.email}
                  onChange={(event) =>
                    setPasswordForm((current) => ({ ...current, email: event.target.value }))
                  }
                  placeholder="admin@boscosofttech.com"
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-base font-semibold text-slate-900">Current Password</Label>
                <Input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(event) =>
                    setPasswordForm((current) => ({ ...current, currentPassword: event.target.value }))
                  }
                  placeholder="Enter current password"
                  autoComplete="current-password"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-base font-semibold text-slate-900">New Password</Label>
                <Input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(event) =>
                    setPasswordForm((current) => ({ ...current, newPassword: event.target.value }))
                  }
                  placeholder="Enter new password"
                  autoComplete="new-password"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-base font-semibold text-slate-900">Confirm New Password</Label>
                <Input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(event) =>
                    setPasswordForm((current) => ({ ...current, confirmPassword: event.target.value }))
                  }
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                />
              </div>

              {passwordError ? (
                <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive">
                  {passwordError}
                </div>
              ) : null}

              <Button type="submit" size="lg" className="w-full" disabled={changingPassword}>
                {changingPassword ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating password...
                  </>
                ) : (
                  <>
                    <KeyRound className="h-4 w-4" />
                    Change Password
                  </>
                )}
              </Button>
            </form>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
