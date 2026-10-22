import { createFileRoute } from "@tanstack/react-router";
import { WhitePapersListingPage } from "@/components/site/resources/WhitePapersListingPage";

export const Route = createFileRoute("/resources/white-papers")({
  head: () => ({
    meta: [
      { title: "White Papers | Bosco Soft Technologies" },
      {
        name: "description",
        content:
          "Downloadable Boscosoft white papers covering AI adoption, school management ethics, and hospital digitization.",
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
