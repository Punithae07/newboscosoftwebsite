import { createFileRoute } from "@tanstack/react-router";
import { WhitePapersListingPage } from "@/components/site/resources/WhitePapersListingPage";

export const Route = createFileRoute("/resources/white-papers")({
  head: () => ({
    meta: [
      { title: "Enterprise AI, SaaS & Modernization White Papers | Boscosoft" },
      {
        name: "description",
        content:
          "Explore practical Boscosoft guides to AI adoption, cloud software modernization, enterprise data architecture, and connected systems.",
      },
      { name: "keywords", content: "enterprise AI white papers, SaaS modernization, data architecture, cloud software guides" },
      { property: "og:title", content: "Enterprise AI, SaaS & Modernization White Papers | Boscosoft" },
      {
        property: "og:description",
        content:
          "Explore practical Boscosoft guides to AI adoption, cloud software modernization, enterprise data architecture, and connected systems.",
      },
    ],
    links: [{ rel: "canonical", href: "/whitepapers" }],
  }),
  component: WhitePapersRouteComponent,
});

function WhitePapersRouteComponent() {
  return <WhitePapersListingPage />;
}
