import { Suspense } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SubpageLoadingFallback } from '@/components/site/SubpageLoadingFallback';
import { lazyWithRetry } from "@/lib/lazy-with-retry";
import { Button } from "@/components/ui/button";
import { type ServiceSlug } from "@/lib/site-data";

const ServicePage = lazyWithRetry("ServicePage", () =>
  import("@/pages/ServicePage").then((module) => ({
    default: module.ServicePage,
  })),
);

export const Route = createFileRoute("/services/$slug")({
  loader: async ({ params }) => {
    const { services } = await import("@/lib/site-data");
    const service = services[params.slug as ServiceSlug];
    if (!service) throw notFound();
    return service;
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            {
              title:
                loaderData.seoTitle ??
                `${loaderData.name} | Bosco Soft Technologies`,
            },
            {
              name: "description",
              content:
                loaderData.seoDescription ??
                loaderData.tagline,
            },
            ...(loaderData.seoKeywords
              ? [
                  {
                    name: "keywords",
                    content: loaderData.seoKeywords,
                  },
                ]
              : []),
            {
              property: "og:title",
              content:
                loaderData.seoTitle ??
                `${loaderData.name} | Bosco Soft Technologies`,
            },
            {
              property: "og:description",
              content:
                loaderData.seoDescription ??
                loaderData.tagline,
            },
          ],
        }
      : {},
  component: ServiceRouteComponent,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Service not found</h1>
      <Button asChild className="mt-6">
        <Link to="/services">Browse all services</Link>
      </Button>
    </div>
  ),
});

function ServiceRouteComponent() {
  const service = Route.useLoaderData();

  return (
    <Suspense fallback={<SubpageLoadingFallback />}>
      <ServicePage service={service} />
    </Suspense>
  );
}



