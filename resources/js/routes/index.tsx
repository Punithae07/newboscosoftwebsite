import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/pages/HomePage";
import { publicAsset } from "@/lib/public-asset";
import { absoluteUrl } from "@/lib/seo";

const heroVideoUrl = publicAsset("/images/herosection/herosectionvc01-compress01.mp4");
const heroPosterUrl = publicAsset("/images/herosection01.webp");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bosco Soft Technologies | IT Company | IT Consulting & Services" },
      {
        name: "description",
        content:
          "Bosco Soft Technologies is an IT company offering IT consulting & services, AI solutions, ERP & CRM, cloud, SaaS, and digital transformation.",
      },
      {
        property: "og:title",
        content: "Bosco Soft Technologies | Digital Transformation Partner for Connected Scalable Organizations",
      },
      {
        property: "og:description",
        content:
          "AI-enabled SaaS platforms, ERP/CRM implementation, integrations, analytics, cloud infrastructure, and long-term transformation support.",
      },
      { property: "og:url", content: absoluteUrl("/") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Bosco Soft Technologies Pvt. Ltd.",
          url: absoluteUrl("/"),
          description: "Digital Transformation Partner.",
        }),
      },
    ],
  }),
  component: HomeRouteComponent,
});

function HomeRouteComponent() {
  return <HomePage heroVideoUrl={heroVideoUrl} heroPosterUrl={heroPosterUrl} />;
}
