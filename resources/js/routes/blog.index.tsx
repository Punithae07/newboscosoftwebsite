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
      { title: "Enterprise Software, AI & SaaS Insights | Boscosoft" },
      {
        name: "description",
        content:
          "Practical perspectives on SaaS engineering, ERP, cloud, AI, data platforms, and domain software from the Boscosoft team.",
      },
      { name: "keywords", content: "enterprise software insights, SaaS engineering, ERP, cloud, AI, data platforms, Boscosoft blog" },
      { property: "og:title", content: "Enterprise Software, AI & SaaS Insights | Boscosoft" },
      {
        property: "og:description",
        content:
          "Practical perspectives on SaaS engineering, ERP, cloud, AI, data platforms, and domain software from the Boscosoft team.",
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


