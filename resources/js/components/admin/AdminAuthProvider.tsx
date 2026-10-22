import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { apiRequest } from "@/lib/api";

export type AdminSession = {
  id: number | null;
  name: string;
  email: string;
  expires_in_minutes: number;
};

type AdminAuthContextValue = {
  session: AdminSession | null;
  loading: boolean;
  error: string | null;
  refreshSession: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({
  children,
  enabled = true,
}: {
  children: ReactNode;
  enabled?: boolean;
}) {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshSession = useCallback(async () => {
    if (!enabled) {
      setSession(null);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await apiRequest<{ session: AdminSession }>("/admin/session", {
        method: "GET",
      });

      setSession(response.session);
      setError(null);
    } catch (err) {
      setSession(null);
      setError(null);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  const signIn = async (email: string, password: string) => {
    const response = await apiRequest<{ session: AdminSession }>("/admin/login", {
      method: "POST",
      body: { email, password },
    });

    setSession(response.session);
    setError(null);
  };

  const signOut = async () => {
    try {
      await apiRequest<{ message: string }>("/admin/logout", {
        method: "POST",
      });
    } finally {
      setSession(null);
      setError(null);
    }
  };

  const value = useMemo<AdminAuthContextValue>(
    () => ({ session, loading, error, refreshSession, signIn, signOut }),
    [session, loading, error, refreshSession],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAdminAuth must be used inside AdminAuthProvider.");
  }

  return context;
}
