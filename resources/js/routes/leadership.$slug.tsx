import { Suspense } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SubpageLoadingFallback } from '@/components/site/SubpageLoadingFallback';
import { lazyWithRetry } from "@/lib/lazy-with-retry";
import { Button } from "@/components/ui/button";

const LeadershipProfilePage = lazyWithRetry("LeadershipProfilePage", () =>
  import("@/pages/LeadershipProfilePage").then((module) => ({
    default: module.LeadershipProfilePage,
  })),
);

export const Route = createFileRoute("/leadership/$slug")({
  loader: async ({ params }) => {
    const { leadershipProfiles } = await import("@/lib/leadership-data");
    const profile = leadershipProfiles.find((item) => item.slug === params.slug);
    if (!profile) throw notFound();
    return profile;
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.name} | Bosco Soft Technologies` },
            {
              name: "description",
              content: `Learn more about ${loaderData.name}, ${loaderData.role} at Boscosoft.`,
            },
            { property: "og:title", content: `${loaderData.name} - Boscosoft` },
          ],
        }
      : {},
  component: LeadershipProfileRouteComponent,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Profile not found</h1>
      <p className="mt-4 text-muted-foreground">The leadership profile you are looking for does not exist.</p>
      <Button asChild className="mt-6 bg-gradient-cta text-primary-foreground">
        <Link to="/leadership">Back to leadership</Link>
      </Button>
    </div>
  ),
});

function LeadershipProfileRouteComponent() {
  const profile = Route.useLoaderData();

  return (
    <Suspense fallback={<SubpageLoadingFallback />}>
      <LeadershipProfilePage profile={profile} />
    </Suspense>
  );
}



