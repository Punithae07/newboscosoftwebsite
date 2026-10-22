import { Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SubpageLoadingFallback } from '@/components/site/SubpageLoadingFallback';
import { lazyWithRetry } from "@/lib/lazy-with-retry";

const BlogListingPage = lazyWithRetry("BlogListingPage", () =>
  import("@/components/site/blog/BlogListingPage").then((module) => ({
    default: module.BlogListingPage,
  })),
);

export const Route = createFileRoute("/resources/blogs")({
  head: () => ({
    meta: [
      { title: "Blog | Bosco Soft Technologies" },
      {
        name: "description",
        content:
          "Bosco Soft Technologies blog articles on ERP, AI in education, healthcare systems, finance operations, and digital transformation.",
      },
      { property: "og:title", content: "Blog | Bosco Soft Technologies" },
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


