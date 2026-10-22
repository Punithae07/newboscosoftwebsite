import { Suspense } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SubpageLoadingFallback } from '@/components/site/SubpageLoadingFallback';
import { lazyWithRetry } from "@/lib/lazy-with-retry";
import { Button } from "@/components/ui/button";

const BlogArticlePage = lazyWithRetry("BlogArticlePage", () =>
  import("@/pages/BlogArticlePage").then((module) => ({
    default: module.BlogArticlePage,
  })),
);

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const { getBlogArticleBySlug } = await import("@/lib/blog-data");
    const article = getBlogArticleBySlug(params.slug);
    if (!article) {
      throw notFound();
    }
    return article;
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
          links: [{ rel: "canonical", href: `/blog/${loaderData.slug}` }],
        }
      : {},
  component: BlogArticleRouteComponent,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Article not found</h1>
      <p className="mt-3 text-muted-foreground">
        The article you requested is missing or the slug is incorrect.
      </p>
      <Button asChild className="mt-6">
        <Link to="/blog">Back to Blog</Link>
      </Button>
    </div>
  ),
});

function BlogArticleRouteComponent() {
  const article = Route.useLoaderData();

  return (
    <Suspense fallback={<SubpageLoadingFallback />}>
      <BlogArticlePage article={article} />
    </Suspense>
  );
}



