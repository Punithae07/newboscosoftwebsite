import { createFileRoute } from "@tanstack/react-router";
import { WhitePapersListingPage } from "@/components/site/resources/WhitePapersListingPage";

export const Route = createFileRoute("/whitepapers/")({
  head: () => ({
    meta: [
      { title: "White Papers | Bosco Soft Technologies " },
      {
        name: "description",
        content:
          "Explore white papers from Bosco Soft Technologies covering AI, ERP, cloud, SaaS, digital transformation, and enterprise technology insights.",
      },
      { property: "og:title", content: "White Papers | Bosco Soft Technologies" },
    ],
    links: [{ rel: "canonical", href: "/whitepapers" }],
  }),
  component: WhitePapersRouteComponent,
});

function WhitePapersRouteComponent() {
  return <WhitePapersListingPage />;
}
