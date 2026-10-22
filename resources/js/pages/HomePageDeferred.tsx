import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Quote,
  Star,
} from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/Section";
import { FeatureCard } from "@/components/site/FeatureCard";
import { PremiumProductCard } from "@/components/site/PremiumProductCard";
import { CTABanner } from "@/components/site/CTABanner";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { navProducts, navServices, products, techStack } from "@/lib/site-data";

const productLogoMap = {
  smartschoolnxt: "/images/product/SSP.webp",
  higrade: "/images/product/higrade.webp",
  "acme-erp": "/images/product/acemeerp.webp",
  microfund: "/images/product/MicroFund.webp",
  medsysb: "/images/product/Medsys.webp",
  "cristo-suite": "/images/product/Cristo.webp",
  eaudithub: "/images/product/authub.webp",
} as const;

const productSeoAltMap = {
  "acme-erp":
    "Acme.erp financial management dashboard | Accounting Software | Best Accounting Software | Accounting ERP",

  microfund:
    "MicroFund microfinance platform with finance dashboard | Finance Management System | Finance Software | Microfinance Software | Finance ERP",

  medsysb:
    "MedSysB hospital software dashboard with healthcare professionals | Hospital Management System | HMS | Hospital Management Software | Hospital Information System",

  smartschoolnxt:
    "SmartSchoolNxT school ERP dashboard with students and educators | School Management System | Student Information System | School Management Software",

  higrade:
    "HiGrade higher education ERP dashboard with students and staff | ERP for Colleges | Campus Management System | College Management System",

  eaudithub:
    "eAuditHub audit platform dashboard with audit professionals | Audit Management System | Audit Management Software | Compliance Software | Audit Software",

  "cristo-suite":
    "CristO Suite faith-based digital platform with church staff | Church Management Software | Church Management System | CHMS",
} as const; 

const testimonialCards = [
  {
    metric: "Enhanced usability",
    sector: "Enterprise Systems",
    q: "Upgraded system, enhanced usability and performance.",
    n: "OptionC",
    o: "USA",
  },
  {
    metric: "Reliable support",
    sector: "Trade Operations",
    q: "Professional team with quick and reliable support.",
    n: "World Trade Center",
    o: "Dubai",
  },
  {
    metric: "Improved transparency",
    sector: "Higher Education",
    q: "Improved transparency, efficiency, and accountability across operations.",
    n: "Don Bosco Polytechnic College",
    o: "India",
  },
  {
    metric: "Highly satisfied",
    sector: "Healthcare",
    q: "Highly satisfied with the performance, features, and responsiveness of the team.",
    n: "Vijay Marie Hospital",
    o: "India",
  },
  {
    metric: "Reliable hospital system",
    sector: "Healthcare",
    q: "Reliable hospital system with excellent training and support.",
    n: "St. Luke's Health Centre",
    o: "India",
  },
  {
    metric: "Dependable service",
    sector: "Audit & Compliance",
    q: "Efficient audit platform with consistent and dependable service.",
    n: "World Trade Center (Audit - eAuditHub)",
    o: "Dubai",
  },
  {
    metric: "Scalable solution",
    sector: "Microfinance",
    q: "Scalable microfinance solution supporting efficient customer management.",
    n: "CEA Info Tech",
    o: "India",
  },
  {
    metric: "Accurate reports",
    sector: "Accounting Systems",
    q: "Simple, effective accounting system delivering accurate and meaningful reports.",
    n: "Sisters of Charity",
    o: "India",
  },
  {
    metric: "User-friendly system",
    sector: "School Management",
    q: "User-friendly school management system with strong communication features.",
    n: "Fuscos School",
    o: "India",
  },
];

const capitalizeFirst = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export function HomePageDeferred() {
  const autoplay = useRef(
    Autoplay({
      delay: 5000,
    }),
  );

  return (
    <>
      <Section bg="surface" className="cv-auto pb-[72px] md:pb-[88px] lg:pb-[104px]">
        <div className="mx-auto max-w-4xl text-center animate-slide-right">
          <div className="mb-3 t-eyebrow">From friction to flow</div>
          <h2 className="mx-auto mb-4 max-w-2xl t-section-title">
            From fragmented operations to connected digital ecosystems
          </h2>
          <p className="mx-auto max-w-4xl t-body">
            Many organizations face fragmented systems, manual processes, delayed reporting, disconnected data, and limited business visibility. Boscosoft helps overcome these challenges by delivering connected platforms, AI-enabled solutions, system integrations, data analytics, and scalable digital transformation solutions that streamline operations and support long-term growth.           </p>
        </div>
        <div className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-gradient-card p-8 shadow-card">
            <div className="mb-3 t-eyebrow">Who we are</div>
            <h2 className="t-section-title">A platform-led technology partner for the AI era</h2>
            <p className="mt-4 t-body">
              Boscosoft brings together AI-enabled SaaS products, ERP/CRM implementation, AI automation, cloud infrastructure, data analytics, and deep industry expertise to help organizations modernize operations, accelerate digital transformation, and achieve sustainable business growth with confidence. 	
            </p>
            <Button asChild variant="outline" className="mt-6 text-slate-950 hover:text-slate-950">
              <Link to="/about" className="text-slate-950">
                About Boscosoft <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground shadow-elegant">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-fluent opacity-30 blur-3xl" />
            <div className="relative">
              <div className="mb-3 t-eyebrow text-accent">What we build</div>
              <h2 className="t-section-title">What we help you build</h2>
              <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                {[
                  "AI-enabled workflows",
                  "Connected digital ecosystems",
                  "Scalable SaaS platforms",
                  "ERP/CRM implementation",
                  "Data and analytics systems",
                  "Cloud infrastructure",
                  "Domain-specific platforms",
                ].map((item) => (
                  <li key={item} className="flex min-w-0 items-center gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#5fd3ff]/50 bg-[#5fd3ff]/10">
                      <BadgeCheck className="h-3.5 w-3.5 text-[#5fd3ff]" />
                    </span>
                    <span className="text-base leading-7 text-white">{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-7 bg-white text-primary hover:bg-white/90">
                <Link to="/contact-us" preload="intent">
                  Talk to Our Experts <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <ViewportSection minHeightClassName="min-h-[980px] md:min-h-[1120px] lg:min-h-[1040px]">
        <Section
          className="cv-auto bg-white"
          eyebrow="Products"
          title="AI-enabled SaaS products for domain-specific transformation"
          subtitle="From schools and colleges to hospitals, churches, NGOs, microfinance institutions, and audit teams, Boscosoft delivers AI-enabled SaaS products tailored to the unique needs of each sector. Our solutions are designed to streamline operations, improve efficiency, and support digital transformation based on how organizations work in the real world."
          align="center"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {navProducts.map((product) => (
              <PremiumProductCard
                key={product.slug}
                to={`/products/${product.slug}`}
                name={product.name}
                category={product.category}
                tagline={product.tagline}
                logoSrc={productLogoMap[product.slug]}
                illustrationSrc={products[product.slug].heroImage}
                seoAlt={productSeoAltMap[product.slug as keyof typeof productSeoAltMap]}
                features={products[product.slug].benefits.slice(0, 3)}
                cta="Explore Product"
              />
            ))}
          </div>
        </Section>
      </ViewportSection>

      <Section
        className="cv-auto"
        bg="surface"
        eyebrow="Services"
        title="Digital transformation services built around practical outcomes"
        subtitle="Boscosoft helps organizations adopt AI, modernize platforms, connect applications, implement ERP/CRM systems, strengthen data analytics, and manage cloud infrastructure with a practical, implementation-focused approach."
        align="center"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {navServices.map((service) => (
            <FeatureCard
              key={service.slug}
              to={`/services/${service.slug}`}
              category={service.group}
              title={service.name}
              description={service.tagline}
              cta={service.cta}
              backgroundImageSrc={service.heroImage}
              immersive
            />
          ))}
        </div>
      </Section>

      <Section
        className="cv-auto"
        eyebrow="Technology Ecosystem"
        title="Flexible technology ecosystem for modern digital transformation"
        subtitle="Boscosoft works across enterprise platforms, cloud-native technologies, open-source frameworks, ERP ecosystems, AI tools, and analytics platforms."
        align="center"
      >
        <div className="overflow-hidden">
          <div className="client-logos-marquee flex w-max gap-3 pr-3">
            {[...techStack, ...techStack].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="inline-flex whitespace-nowrap rounded-full border border-[#8fb4e5] bg-background px-4 py-2 text-base font-medium text-slate-900 shadow-[0_12px_26px_-18px_rgba(86,191,255,0.55)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <Section
        className="cv-auto"
        bg="surface"
        eyebrow="Why Boscosoft"
        title="Why organizations choose Boscosoft"
        align="center"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              t: "Platform + service capability",
              d: " AI-enabled SaaS products and ERP/CRM implementation services designed to work together.",
            },
            {
              t: "Domain-specific experience",
              d: " Proven expertise across education, healthcare, finance, NGOs, faith, and audit.",
            },
            {
              t: "Practical AI adoption",
              d: " Practical AI transformation, automation, and business visibility improvements.",
            },
            {
              t: "Enterprise integration expertise",
              d: "System integrations, ERP/CRM systems, data, and cloud infrastructure in one connected ecosystem.",
            },
            {
              t: "Long-term support model",
              d: "Implementation, training, and long-term support for sustainable digital transformation.",
            },
            {
              t: "Cloud-ready engineering",
              d: " Scalable cloud infrastructure, secure, and implementation-ready from the start.",
            },
          ].map((item) => (
            <div
              key={item.t}
              className="rounded-2xl border border-border bg-gradient-card p-6 shadow-card"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                <div className="t-card-title">{item.t}</div>
              </div>
              <div className="mt-2 t-card-desc">{item.d}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        bg="surface"
        className="cv-auto bg-[#eef7ff]"
        eyebrow="Client Proof"
        title="Success stories with measurable outcomes"
        align="center"
      >
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[autoplay.current]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonialCards.map((card, index) => (
              <CarouselItem key={index} className="pl-2 md:basis-1/2 md:pl-4">
                <div className="h-full rounded-2xl border border-border bg-background p-7 shadow-card">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">
                      {card.metric}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {capitalizeFirst(card.sector)}
                    </span>
                  </div>
                  <div className="mb-4 flex gap-0.5 text-[#ff9b09]">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="mb-3 h-6 w-6 text-accent/40" />
                  <p className="t-body-sm text-foreground">"{card.q}"</p>
                  <div className="mt-5 border-t border-border pt-5">
                    <div className="text-base font-semibold text-foreground">{card.n}</div>
                    <div className="text-sm text-muted-foreground">{card.o}</div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 text-center">
          <Button asChild variant="outline" size="lg" className="text-slate-950 hover:text-slate-950">
            <Link to="/resources/success-stories">
              View Success Stories <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      <Section className="cv-auto" eyebrow="Leadership" title="From the leadership desk" align="center">
        <div className="grid items-start gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch lg:gap-3">
          <div className="space-y-5 text-muted-foreground lg:flex lg:max-w-none lg:flex-col">
            <p className="t-body">
              At Boscosoft, we believe technology must serve people, organizations, and long-term purpose.
              The AI era is opening new possibilities, but successful transformation is not about adopting every new tool. It is about choosing the right systems, connecting the right data, simplifying the right workflows, and building digital foundations that help organizations grow with confidence.
            </p>
            <p className="t-body">
              Our commitment is to help clients modernize responsibly through practical innovation, reliable platforms, domain understanding, ethical implementation, and continuous support.
            </p>
            <Button
              asChild
              className="mt-2 h-11 w-fit self-start rounded-full bg-gradient-cta px-6 text-sm font-semibold text-primary-foreground"
            >
              <Link to="/leadership">
                Meet Our Leadership <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="relative w-full max-w-[30rem] overflow-hidden rounded-3xl bg-gradient-hero p-6 text-primary-foreground shadow-elegant lg:h-full lg:max-w-[31rem] lg:p-7">
            <div className="absolute inset-0 bg-gradient-glow opacity-70" />
            <div className="relative grid h-full gap-5 sm:grid-cols-[200px_minmax(0,1fr)] sm:items-start lg:grid-cols-[190px_minmax(0,1fr)]">
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-white shadow-card">
                <img
                  src="/images/leaders/Thaddeus Singarayan SDB.png"
                  alt="Dr Thaddeus Singarayan SDB | MD & CEO at Bosco Soft Technologies Pvt. Ltd. | Bosco Soft Technologies CEO"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={1000}
                  className="h-64 w-full object-cover object-top sm:h-full sm:min-h-[300px] lg:min-h-[280px]"
                />
              </div>
              <div className="flex h-full min-w-0 flex-col justify-between">
                <div>
                  <Quote className="mb-4 h-8 w-8 text-accent" />
                  <p className="text-lg font-medium leading-snug text-white sm:text-xl">
                    "Technology should reduce operational friction and strengthen the mission of the organization."
                  </p>
                </div>
                <div className="mt-6 border-t border-white/20 pt-6 text-base">
                  <div className="font-semibold">Fr. Thaddeus Singarayan SDB</div>
                  <div className="text-primary-foreground/84">CEO and MD</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section
        className="cv-auto"
        bg="surface"
        eyebrow="Resources"
        title="Insights for AI, SaaS, ERP, and digital transformation"
        align="center"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              t: "Success Stories",
              d: "How institutions transformed operations with Boscosoft platforms.",
              to: "/resources/success-stories",
            },
            {
              t: "White Papers",
              d: "Deep dives on AI adoption, ERP, and modernization.",
              to: "/resources/white-papers",
            },
            {
              t: "Blogs",
              d: "Practical insights on digital transformation.",
              to: "/resources/blogs",
            },
          ].map((resource) => (
            <FeatureCard
              key={resource.t}
              to={resource.to}
              title={resource.t}
              description={resource.d}
              cta="Read more"
            />
          ))}
        </div>
      </Section>

      <div className="cv-auto">
        <CTABanner />
      </div>
    </>
  );
}

function ViewportSection({
  children,
  minHeightClassName,
}: {
  children: React.ReactNode;
  minHeightClassName: string;
}) {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = containerRef.current;

    if (!element || visible || typeof window === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setVisible(true);
        observer.disconnect();
      },
      {
        rootMargin: "320px 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={containerRef} className={visible ? undefined : minHeightClassName}>
      {visible ? children : null}
    </div>
  );
}
