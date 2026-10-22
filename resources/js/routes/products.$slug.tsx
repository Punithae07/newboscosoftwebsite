import { Suspense } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SubpageLoadingFallback } from '@/components/site/SubpageLoadingFallback';
import { lazyWithRetry } from "@/lib/lazy-with-retry";
import { Button } from "@/components/ui/button";
import { type ProductSlug } from "@/lib/site-data";

const ProductPage = lazyWithRetry("ProductPage", () =>
  import("@/pages/ProductPage").then((module) => ({
    default: module.ProductPage,
  })),
);

export const Route = createFileRoute("/products/$slug")({
  loader: async ({ params }) => {
    const { products } = await import("@/lib/site-data");
    const product = products[params.slug as ProductSlug];
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: loaderData.seoTitle },
            {
              name: "description",
              content: loaderData.seoDescription,
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
              content: loaderData.seoTitle,
            },
            {
              property: "og:description",
              content: loaderData.seoDescription,
            },
          ],
        }
      : {},
  component: ProductRouteComponent,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Product not found</h1>
      <p className="mt-3 text-muted-foreground">The platform you're looking for isn't available.</p>
      <Button asChild className="mt-6">
        <Link to="/products">Browse all platforms</Link>
      </Button>
    </div>
  ),
});

function ProductRouteComponent() {
  const product = Route.useLoaderData();

  return (
    <Suspense fallback={<SubpageLoadingFallback />}>
      <ProductPage product={product} />
    </Suspense>
  );
}



