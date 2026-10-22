import { Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SubpageLoadingFallback } from '@/components/site/SubpageLoadingFallback';
import { lazyWithRetry } from "@/lib/lazy-with-retry";

const SuccessStoriesListingPage = lazyWithRetry("SuccessStoriesListingPage", () =>
  import("@/components/site/resources/SuccessStoriesListingPage").then((module) => ({
    default: module.SuccessStoriesListingPage,
  })),
);

export const Route = createFileRoute("/resources/success-stories")({
  head: () => ({
    meta: [
      { title: "Success Stories | Bosco Soft Technologies" },
      {
        name: "description",
        content:
          "Customer success stories from Boscosoft implementations across finance, healthcare, and operational transformation.",
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


