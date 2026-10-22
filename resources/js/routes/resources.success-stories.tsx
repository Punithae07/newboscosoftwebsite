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
      { title: "Software Engineering & SaaS Customer Success Stories | Boscosoft" },
      {
        name: "description",
        content:
          "Explore Boscosoft software engineering, modernization, ERP, and SaaS implementation stories with verified customer outcomes.",
      },
      { name: "keywords", content: "software engineering case studies, SaaS modernization, ERP implementation, Boscosoft success stories" },
      { property: "og:title", content: "Software Engineering & SaaS Customer Success Stories | Boscosoft" },
      {
        property: "og:description",
        content:
          "Explore Boscosoft software engineering, modernization, ERP, and SaaS implementation stories with verified customer outcomes.",
      },
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


