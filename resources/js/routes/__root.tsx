import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { createPortal } from "react-dom";

import appCss from "../styles.css?url";
import { AdminAuthProvider } from "@/components/admin/AdminAuthProvider";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { StickyMobileCTA } from "@/components/site/StickyMobileCTA";
import { Toaster } from "@/components/ui/sonner";
import { publicAsset } from "@/lib/public-asset";
import { absoluteUrl } from "@/lib/seo";

const heroImageUrl = publicAsset("/images/herosection01.webp");
const faviconUrl = publicAsset("/images/fav-icon.png");
const siteLogoUrl = publicAsset("/images/bosco-logo.png");

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: ({ matches }) => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Bosco Soft Technologies | Digital Transformation Partner" },
      {
        name: "description",
        content:
          "Bosco Soft Technologies helps enterprises and institutions modernize operations through AI-enabled SaaS platforms, ERP/CRM implementation, integrations, analytics, cloud infrastructure, and digital transformation services.",
      },
      { name: "author", content: "Bosco Soft Technologies" },
      { property: "og:site_name", content: "Bosco Soft Technologies" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        property: "og:title",
        content: "Bosco Soft Technologies | Digital Transformation Partner",
      },
      {
        name: "twitter:title",
        content: "Bosco Soft Technologies | Digital Transformation Partner",
      },
      {
        property: "og:description",
        content:
          "Bosco Soft Technologies helps enterprises and institutions modernize operations through AI-enabled SaaS platforms, ERP/CRM implementation, integrations, analytics, cloud infrastructure, and digital transformation services.",
      },
      {
        name: "twitter:description",
        content:
          "Bosco Soft Technologies helps enterprises and institutions modernize operations through AI-enabled SaaS platforms, ERP/CRM implementation, integrations, analytics, cloud infrastructure, and digital transformation services.",
      },
      { property: "og:url", content: absoluteUrl("/") },
      { property: "og:image", content: absoluteUrl(heroImageUrl) },
      { name: "twitter:image", content: absoluteUrl(heroImageUrl) },
    ],
    links: [
      { rel: "icon", href: faviconUrl, type: "image/png" },
      { rel: "canonical", href: absoluteUrl(matches[matches.length - 1]?.pathname || "/") },
      { rel: "stylesheet", href: appCss },
      { rel: "preload", href: siteLogoUrl, as: "image", fetchPriority: "high" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isAdminRoute = pathname.startsWith("/admin");
  const isContactRoute = pathname.startsWith("/contact");

  useEffect(() => {
    const selectors = [
      'meta[property="og:url"]',
      'meta[property="og:image"]',
      'meta[name="twitter:image"]',
    ] as const;

    for (const selector of selectors) {
      const tag = document.querySelector<HTMLMetaElement>(selector);
      const rawContent = tag?.getAttribute("content");

      if (tag && rawContent) {
        tag.setAttribute("content", absoluteUrl(rawContent));
      }
    }
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <DocumentHeadPortal />
      <DocumentBodyPortal />
      <AdminAuthProvider enabled={isAdminRoute}>
        <div className="flex min-h-screen flex-col bg-background">
          {isAdminRoute ? null : <SiteHeader />}
          {isAdminRoute ? null : <div aria-hidden="true" className="h-[60px] shrink-0" />}
          <main id="main-content" className="flex-1">
            <Outlet />
          </main>
          {isAdminRoute ? null : <SiteFooter />}
          {isAdminRoute || isContactRoute ? null : <StickyMobileCTA />}
        </div>
        <Toaster richColors position="top-right" />
      </AdminAuthProvider>
    </QueryClientProvider>
  );
}

function DocumentHeadPortal() {
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(<HeadContent />, document.head);
}

function DocumentBodyPortal() {
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(<Scripts />, document.body);
}
