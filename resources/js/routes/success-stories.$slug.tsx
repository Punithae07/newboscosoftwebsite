import { Suspense } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { SubpageLoadingFallback } from '@/components/site/SubpageLoadingFallback';
import { lazyWithRetry } from "@/lib/lazy-with-retry";

const SuccessStoryPage = lazyWithRetry("SuccessStoryPage", () =>
  import("@/pages/SuccessStoryPage").then((module) => ({
    default: module.SuccessStoryPage,
  })),
);

export const Route = createFileRoute("/success-stories/$slug")({
  loader: async ({ params }) => {
    const { getSuccessStoryBySlug } = await import("@/lib/resource-data");
    const story = getSuccessStoryBySlug(params.slug);
    if (!story) throw notFound();
    return story;
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.title} | Bosco Soft Technologies` },
            { name: "description", content: loaderData.description },
            { property: "og:title", content: `${loaderData.title} | Bosco Soft Technologies` },
            { property: "og:description", content: loaderData.description },
          ],
          links: [{ rel: "canonical", href: `/success-stories/${loaderData.slug}` }],
        }
      : {},
  component: SuccessStoryRouteComponent,
});

function SuccessStoryRouteComponent() {
  const story = Route.useLoaderData();

  return (
    <Suspense fallback={<SubpageLoadingFallback />}>
      <SuccessStoryPage story={story} />
    </Suspense>
  );
}



