import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { companyContact } from "@/lib/site-data";
import { type LeadershipProfile } from "@/lib/leadership-data";

export function LeadershipProfilePage({ profile }: { profile: LeadershipProfile }) {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-glow opacity-70" />
        <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-10 md:pb-14 md:pt-12 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Leadership", to: "/leadership" },
              { label: profile.name },
            ]}
            variant="light"
          />
          <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="max-w-4xl">
              <h1 className="max-w-3xl text-3xl font-bold leading-[1.1] tracking-tight md:text-4xl lg:text-5xl">
                {profile.name}
              </h1>
              <p className="mt-4 text-xl text-primary-foreground/85">{profile.role}</p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
                {profile.bio}
              </p>
              <div className="mt-7">
                <Button asChild className="bg-white text-primary hover:bg-white/90">
                  <Link to="/leadership" preload="intent">
                    Back to leadership page <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="w-full max-w-xs justify-self-center lg:max-w-sm lg:justify-self-end">
              <div
                className="overflow-hidden rounded-2xl border border-white/20 shadow-card"
                style={{ backgroundColor: "#dcebf7" }}
              >
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="h-[360px] w-full object-cover object-top"
                  style={{
                    mixBlendMode: "multiply",
                    filter: "grayscale(100%) contrast(1.03)",
                    WebkitFilter: "grayscale(100%) contrast(1.03)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Leadership" title="Profile overview">
        <div className="ml-auto max-w-4xl space-y-4 lg:max-w-[72rem]">
          <div className="rounded-2xl border border-border bg-gradient-card p-6 shadow-card md:p-7">
            <div className="t-card-title">About this role</div>
            <p className="mt-3 t-body">{profile.bio}</p>
            <div className="mt-5 border-t border-border pt-5">
              <div className="t-card-title">Focus areas</div>
              <p className="mt-2 t-body">{profile.focus}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6 shadow-card md:p-7">
            <div className="t-card-title">Highlights</div>
            <div className="mt-4 space-y-3.5">
              {profile.highlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-2 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                  <span className="t-body">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6 shadow-card md:p-7">
            <div className="t-card-title">What this means for clients</div>
            <p className="mt-3 t-body">
              Leadership with a strong blend of mission focus, technology strategy, and practical delivery creates a trusted partner for organizations navigating digital transformation.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6 shadow-card md:p-7">
            <div className="t-card-title">Contact</div>
            <div className="mt-3 space-y-2">
              <a href={`mailto:${companyContact.email}`} className="t-body block hover:text-foreground">
                {companyContact.email}
              </a>
              <div className="t-body">{companyContact.phone}</div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}


