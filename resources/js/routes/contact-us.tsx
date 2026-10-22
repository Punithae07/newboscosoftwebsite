import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "./contact";

export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: "Contact Boscosoft | Enterprise Engineering & SaaS Demos" },
      {
        name: "description",
        content:
          "Talk with Boscosoft about software modernization, AI, dedicated engineering teams, enterprise integrations, or industry SaaS platforms.",
      },
      { name: "keywords", content: "contact Boscosoft, enterprise software consultation, SaaS demos, dedicated engineering teams, software modernization" },
      { property: "og:title", content: "Contact Boscosoft | Enterprise Engineering & SaaS Demos" },
      {
        property: "og:description",
        content:
          "Talk with Boscosoft about software modernization, AI, dedicated engineering teams, enterprise integrations, or industry SaaS platforms.",
      },
    ],
    links: [{ rel: "canonical", href: "/contact-us" }],
  }),
  component: ContactPage,
});
