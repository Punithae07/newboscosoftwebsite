import { Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SubpageLoadingFallback } from '@/components/site/SubpageLoadingFallback';
import { lazyWithRetry } from "@/lib/lazy-with-retry";

const SuccessStoriesListingPage = lazyWithRetry("SuccessStoriesListingPage", () =>
  import("@/components/site/resources/SuccessStoriesListingPage").then((module) => ({
    default: module.SuccessStoriesListingPage,
  })),
);

export const Route = createFileRoute("/success-stories/")({
  head: () => ({
    meta: [
      { title: "Customer Success Stories | Bosco Soft Technologies" },
      {
        name: "description",
        content:
          "Explore customer success stories from Bosco Soft Technologies Pvt Ltd, showcasing AI, ERP, SaaS, cloud, and digital transformation solutions.",
      },
      { property: "og:title", content: "Success Stories | Bosco Soft Technologies" },
    ],
    links: [{ rel: "canonical", href: "/success-stories" }],
  }),
  component: SuccessStoriesRouteComponent,
});

function SuccessStoriesRouteComponent() {
  return (
    <Suspense fallback={<SubpageLoadingFallback />}>
      <SuccessStoriesListingPage />
    </Suspense>
  );
}


