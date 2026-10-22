import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "./contact";

export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: "Contact Us | Bosco Soft Technologies " },
      {
        name: "description",
        content:
          "Contact Bosco Soft Technologies for product demos, AI transformation, ERP implementation, SaaS development, cloud services, and support.",
      },
      { property: "og:title", content: "Contact Boscosoft" },
      {
        property: "og:description",
        content: "Let's talk about your digital transformation goals.",
      },
    ],
    links: [{ rel: "canonical", href: "/contact-us" }],
  }),
  component: ContactPage,
});
