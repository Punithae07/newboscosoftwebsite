import { Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SubpageLoadingFallback } from '@/components/site/SubpageLoadingFallback';
import { lazyWithRetry } from "@/lib/lazy-with-retry";

const BlogListingPage = lazyWithRetry("BlogListingPage", () =>
  import("@/components/site/blog/BlogListingPage").then((module) => ({
    default: module.BlogListingPage,
  })),
);

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Technology Blog | Bosco Soft Technologies" },
      {
        name: "description",
        content:
          "Explore the Technology Blog from Bosco Soft Technologies for insights on AI, ERP, cloud, SaaS, data analytics, and digital transformation.",
      },
      { property: "og:title", content: "Blog | Bosco Soft Technologies" },
      {
        property: "og:description",
        content:
          "Explore Boscosoft blog articles built from product notes and industry content across education, healthcare, finance, and faith-based administration.",
      },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogRouteComponent,
});

function BlogRouteComponent() {
  return (
    <Suspense fallback={<SubpageLoadingFallback />}>
      <BlogListingPage />
    </Suspense>
  );
}


