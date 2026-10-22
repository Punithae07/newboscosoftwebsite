import { Suspense } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SubpageLoadingFallback } from '@/components/site/SubpageLoadingFallback';
import { lazyWithRetry } from "@/lib/lazy-with-retry";
import { Button } from "@/components/ui/button";
import { type IndustrySlug } from "@/lib/site-data";

const IndustryPage = lazyWithRetry("IndustryPage", () =>
  import("@/pages/IndustryPage").then((module) => ({
    default: module.IndustryPage,
  })),
);

export const Route = createFileRoute("/industries/$slug")({
  loader: async ({ params }) => {
    const { industries } = await import("@/lib/site-data");
    const industry = industries[params.slug as IndustrySlug];
    if (!industry) throw notFound();
    return industry;
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.name} Products | Bosco Soft Technologies` },
            { name: "description", content: loaderData.tagline },
            { property: "og:title", content: `${loaderData.name} - Boscosoft` },
            { property: "og:description", content: loaderData.tagline },
          ],
        }
      : {},
  component: IndustryRouteComponent,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Industry not found</h1>
      <Button asChild className="mt-6">
        <Link to="/industries">Browse all industries</Link>
      </Button>
    </div>
  ),
});

function IndustryRouteComponent() {
  const industry = Route.useLoaderData();

  return (
    <Suspense fallback={<SubpageLoadingFallback />}>
      <IndustryPage industry={industry} />
    </Suspense>
  );
}



