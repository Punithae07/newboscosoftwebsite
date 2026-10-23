import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTABanner } from "@/components/site/CTABanner";
import { Layers, Users, BookOpen, Heart } from "lucide-react";

export const Route = createFileRoute("/leadership")({
  head: () => ({
    meta: [
      { title: "Boscosoft Leadership & Engineering Culture" },
      {
        name: "description",
        content:
          "Meet the leaders guiding Boscosoft’s engineering, products, customer delivery, and talent development mission.",
      },
      {
        name: "keywords",
        content: "Boscosoft leadership",
      },
      { property: "og:title", content: "Boscosoft Leadership & Engineering Culture" },
      {
        property: "og:description",
        content:
          "Meet the leaders guiding Boscosoft’s engineering, products, customer delivery, and talent development mission.",
      },
    ],
    links: [{ rel: "canonical", href: "/leadership" }],
  }),
  component: LeadershipPage,
});

function LeadershipPage() {
  const location = useLocation();
  const normalizedPath = location.pathname.replace(/\/$/, "") || "/";

  if (normalizedPath !== "/leadership") {
    return <Outlet />;
  }

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <Breadcrumbs items={[{ label: "About", to: "/about" }, { label: "Leadership" }]} variant="light" />
          <h1 className="page-hero-title">
            Experienced leadership. Shared responsibility for results.
          </h1>
          <p className="page-hero-copy content-measure-wide">
            Our leadership brings together domain experience, engineering discipline, customer partnerships, and a conviction that opportunity should not be limited by geography.
          </p>
        </div>
      </section>

      <Section
        bg="surface"
        eyebrow="Leadership"
        title="People behind the work"
        subtitle="Display approved leadership profiles, titles, photographs, and brief expertise statements. Current names, roles, and biographies must be confirmed with HR or the corporate office before publication."
      >
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              slug: "fr-don-bosco",
              name: "Don Bosco Lourdusamy SDB",
              role: "President",
              image: "/images/leaders/don-bosco-lourdusamy.png",
              linkedin: "https://in.linkedin.com/company/boscosoft-technologies",
            },
            {
              slug: "fr-thaddeus-singarayan",
              name: "Thaddeus Singarayan SDB",
              role: "CEO & Managing Director",
              image: "/images/leaders/thaddeus-singarayan.png",
              linkedin: "https://in.linkedin.com/company/boscosoft-technologies",
            },
            {
              slug: "fr-bosco-augustine",
              name: "Bosco Augustine SDB",
              role: "Chief Finance Officer",
              image: "/images/leaders/bosco-augustine.png",
              linkedin: "https://in.linkedin.com/company/boscosoft-technologies",
            },
            {
              slug: "mr-m-lingesh",
              name: "M Lingesh",
              role: "Chief Operations Officer",
              image: "/images/leaders/lingesh.png",
              linkedin: "https://in.linkedin.com/company/boscosoft-technologies",
            },
            {
              slug: "mr-felix-rajan",
              name: "Felix Rajan Meri Cruze",
              role: "Chief Technology Officer",
              image: "/images/leaders/felix-rajan.png",
              linkedin: "https://in.linkedin.com/company/boscosoft-technologies",
            },
          ].map((person) => (
            <article
              key={person.slug}
              className="leader-card group relative flex flex-col overflow-hidden rounded-xl border border-[#dce8f3] bg-white shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              style={{
                borderRadius: "14px",
                overflow: "hidden",
                border: "1px solid #dce8f3",
                backgroundColor: "#ffffff",
                boxShadow: "0 6px 20px -8px rgba(15,23,42,0.12)",
              }}
            >
              <div
                className="leader-photo-wrap relative w-full overflow-hidden flex items-end justify-center"
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1 / 0.84",
                  backgroundColor: "#dcebf7",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <img
                  src={person.image}
                  alt={person.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    mixBlendMode: "multiply",
                    filter: "grayscale(100%) contrast(1.04)",
                    WebkitFilter: "grayscale(100%) contrast(1.04)",
                  }}
                />

                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`${person.name} LinkedIn Profile`}
                  className="leader-linkedin-btn absolute right-3.5 top-3.5 z-10 flex h-8 w-8 items-center justify-center rounded-[5px] text-white shadow-sm transition-all duration-200 hover:scale-110 active:scale-95"
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "14px",
                    zIndex: 10,
                    display: "flex",
                    height: "34px",
                    width: "34px",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "7px",
                    backgroundColor: "#8bb9da",
                    color: "#ffffff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                  }}
                >
                  <svg className="h-4 w-4 fill-current" style={{ width: "16px", height: "16px", fill: "#ffffff" }} viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
                  </svg>
                </a>
              </div>

              <div
                className="leader-info-bar flex flex-1 flex-col justify-center px-4 py-5 text-center"
                style={{
                  backgroundColor: "#07152b",
                  padding: "14px 14px 16px",
                  textAlign: "center",
                  display: "flex",
                  flex: "1 1 auto",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Link
                  to="/leadership/$slug"
                  params={{ slug: person.slug }}
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                >
                  <h3
                    className="leader-name text-sm font-bold uppercase tracking-wider text-white transition-colors group-hover:text-sky-300 sm:text-[0.95rem]"
                    style={{
                      color: "#ffffff",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {person.name}
                  </h3>
                </Link>
                <div
                  className="leader-role mt-1.5 text-xs font-medium text-slate-300 sm:text-[0.82rem]"
                  style={{
                    color: "#cbd5e1",
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    marginTop: "6px",
                  }}
                >
                  {person.role}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Culture" title="How we work with customers and each other">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Layers,
              t: "Product-minded engineering",
              d: "Think beyond features to reliability and life-cycle cost.",
            },
            {
              icon: Users,
              t: "Collaborative delivery",
              d: "Work transparently with client stakeholders and internal teams.",
            },
            {
              icon: BookOpen,
              t: "Continuous learning",
              d: "Prepare people for demanding and changing technical work.",
            },
            {
              icon: Heart,
              t: "Long-term relationships",
              d: "Stay engaged beyond initial deployment.",
            },
          ].map((item) => (
            <div
              key={item.t}
              className="rounded-2xl border border-border bg-gradient-card p-7 shadow-card transition-all duration-300 hover:-translate-y-1"
            >
              <item.icon className="mb-4 h-6 w-6 text-accent" />
              <div className="text-base font-semibold leading-6 text-foreground">{item.t}</div>
              <div className="mt-2 text-sm leading-6 text-muted-foreground">{item.d}</div>
            </div>
          ))}
        </div>
      </Section>

      <CTABanner
        title="Meet the team behind your next project."
        primary={{ label: "Talk to Our Experts", to: "/contact-us" }}
        secondary={{ label: "Explore Careers", to: "/careers" }}
      />
    </>
  );
}
