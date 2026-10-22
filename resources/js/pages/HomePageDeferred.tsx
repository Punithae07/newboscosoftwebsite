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

const homeProductOverrides: Record<
  string,
  {
    name?: string;
    tag?: string;
    content: string;
    cta: string;
    points?: string[];
  }
> = {
  "acme-erp": {
    name: "Acme.erp",
    tag: "Financial Management ERP",
    content:
      "Put financial stewardship in focus. Manage funds, branches, reporting, assets, and financial controls with greater clarity.",
    cta: "Explore Acme.erp",
  },
  microfund: {
    name: "MicroFUND",
    tag: "Microfinance ERP",
    content:
      "Bring clarity to every lending cycle. Support borrower onboarding, repayments, field collections, and portfolio visibility.",
    cta: "Explore MicroFUND",
  },
  medsysb: {
    name: "MedSysB",
    tag: "Hospital Software",
    content:
      "Connect care with operations. Coordinate patient journeys, diagnostics, pharmacy, billing, and hospital administration.",
    cta: "Explore MedSysB",
  },
  smartschoolnxt: {
    name: "SmartSchoolNxt",
    tag: "School ERP",
    content:
      "Keep your school connected. Bring admissions, academics, attendance, fees, exams, and parent communication into coordinated workflows.",
    cta: "Explore SmartSchoolNxt",
  },
  higrade: {
    name: "HiGrade",
    tag: "Higher Education ERP",
    content:
      "Make campus operations work as one. Connect the student lifecycle, academic administration, exams, and institutional reporting.",
    cta: "Explore HiGrade",
  },
  eaudithub: {
    name: "eAuditHub",
    tag: "Audit Platform",
    content:
      "Move from findings to action. Plan audits, capture evidence, assign corrective actions, and track compliance activity.",
    cta: "Explore eAuditHub",
  },
  "cristo-suite": {
    name: "CristO Suite",
    tag: "FaithTech ERP",
    content:
      "Connect communities and institutions. Manage parish, diocesan, religious institute, and community processes with systems designed for faith organizations.",
    cta: "Explore CristO Suite",
  },
};

const homeServiceOverrides: Record<
  string,
  {
    title?: string;
    description: string;
    cta: string;
  }
> = {
  "ai-transformation": {
    title: "AI Transformation & Automation",
    description:
      "Give teams trusted access to knowledge, streamline manual work, and apply AI with human oversight.",
    cta: "Discuss an AI Use Case",
  },
  "integration-ecosystems": {
    title: "Integration & Digital Ecosystems",
    description:
      "Make business systems exchange accurate data and support coordinated workflows.",
    cta: "Connect Your Systems",
  },
  "saas-engineering": {
    title: "SaaS Engineering & Modernization",
    description:
      "Build cloud-native products and modernize applications without losing the value of what already works.",
    cta: "Modernize Your Platform",
  },
  "erp-crm-implementation": {
    title: "ERP & CRM Implementation",
    description:
      "Adapt enterprise systems to real business processes, adoption needs, and reporting requirements.",
    cta: "Talk ERP & CRM",
  },
  "data-analytics-ai": {
    title: "Data, Analytics & AI",
    description:
      "Make fragmented data usable through pipelines, lakehouses, dashboards, and governed insights.",
    cta: "Plan Your Data Platform",
  },
  "cloud-infrastructure": {
    title: "Cloud Infrastructure & Support",
    description:
      "Design, deploy, operate, and improve infrastructure for dependable digital services.",
    cta: "Review Your Cloud Architecture",
  },
};

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
          <div className="mb-3 t-eyebrow">Make technology work together</div>
          <h2 className="mx-auto mb-4 max-w-2xl t-section-title">
            Turn complex systems into a competitive advantage
          </h2>
          <p className="mx-auto max-w-4xl t-body">
            Legacy applications, disconnected data, manual processes, and growing product demands can slow even strong organizations. We help you simplify that complexity through deliberate architecture, interoperable platforms, applied AI, and reliable engineering execution.
          </p>
        </div>
        <div className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-gradient-card p-8 shadow-card">
            <div className="mb-3 t-eyebrow">Who we are</div>
            <h2 className="t-section-title">An engineering partner invested in the long run.</h2>
            <p className="mt-4 t-body">
              We collaborate with your team to develop, modernize, integrate, and support software that performs today and is ready for tomorrow.
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
              <h2 className="t-section-title">From product vision to operating reality.</h2>
              <p className="mt-4 t-body">
                Enterprise applications; multi-tenant SaaS; AI assistants and document intelligence; data platforms and dashboards; ERP/CRM extensions; cloud deployment and support.
              </p>
              {/* <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
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
              </ul> */}
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
          eyebrow="Domain-ready Products"
          title="Proven industry platforms. Built for the way you work."
          subtitle="Our product portfolio brings together critical records, everyday processes, and management visibility for specialized industries. Start with an established platform, then configure and integrate around your operating model."
          align="center"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {navProducts.map((product) => {
              const override = homeProductOverrides[product.slug];
              return (
                <PremiumProductCard
                  key={product.slug}
                  to={`/products/${product.slug}`}
                  name={override?.name || product.name}
                  category={override?.tag || product.category}
                  tagline={override?.content || product.tagline}
                  logoSrc={productLogoMap[product.slug]}
                  illustrationSrc={products[product.slug].heroImage}
                  seoAlt={productSeoAltMap[product.slug as keyof typeof productSeoAltMap]}
                  features={override?.points || products[product.slug].benefits.slice(0, 3)}
                  cta={override?.cta || "Explore Product"}
                />
              );
            })}
          </div>
        </Section>
      </ViewportSection>

      <Section
        className="cv-auto"
        bg="surface"
        eyebrow="Engineering services"
        title="The technical expertise to move your business forward"
        subtitle="Whether you need an experienced extension of your engineering team or a complete platform transformation, we focus on usable systems, sustainable architecture, and business-ready outcomes."
        align="center"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {navServices.map((service) => {
            const override = homeServiceOverrides[service.slug];
            return (
              <FeatureCard
                key={service.slug}
                to={`/services/${service.slug}`}
                category={service.group}
                title={override?.title || service.name}
                description={override?.description || service.tagline}
                cta={override?.cta || service.cta}
                backgroundImageSrc={service.heroImage}
                immersive
              />
            );
          })}
        </div>
      </Section>

      <Section
        className="cv-auto"
        eyebrow="Built for your stack"
        title="Practical expertise across enterprise technology
"
        subtitle="Work with teams familiar with fullstack development including Microsoft Dynamics 365, Power Platform, Azure, AWS, Google Cloud, Databricks, .NET Core, Frappe/ERPNext, Zoho, API architectures, and modern AI development patterns. Specific platform competencies and official partner designations should be verified before publication."
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
        eyebrow="Why choose us"
        title="Strong engineering. Thoughtful collaboration. Lasting value."
        align="center"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              t: "Product and services under one roof",
              d: "Experience developing our own platforms informs the way we engineer yours.",
            },
            {
              t: "Complex-domain understanding",
              d: "Delivery exposure across education, healthcare, finance, community organizations, and enterprise operations.",
            },
            {
              t: "Modernize without unnecessary disruption",
              d: "Incremental architecture and migration planning around business continuity.",
            },
            {
              t: "Integration-first thinking",
              d: "Connect applications, data, workflows, and users instead of creating another isolated system.",
            },
            {
              t: "Dedicated delivery relationships",
              d: "Align the right specialists with your technology environment and evolving road map.",
            },
            {
              t: "An uncommon talent model",
              d: "Our academy-to-industry pathway invests in technical growth and opportunity for rural youth.",
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
        eyebrow="Customer perspective"
        title="The work speaks through our customers"
        subtitle="Explore examples of long-standing product delivery, technology modernization, and enterprise implementation. Feature the OptionC modernization testimonial and other attributed references only once approval for current public use is confirmed."
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

      <Section className="cv-auto" eyebrow="Our perspective" title="Technology is valuable when it makes work better" align="center">
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
                  src="/images/leaders/thaddeus-singarayan.png"
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
        eyebrow="Insights & proof"
        title="Ideas you can put to work"
        align="center"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              t: "Success Stories",
              d: "See the challenges, design decisions, and outcomes behind real implementations.",
              to: "/resources/success-stories",
              cta: "Read Stories",
            },
            {
              t: "White Papers",
              d: "Explore practical approaches to AI, legacy modernization, enterprise data, and SaaS delivery.",
              to: "/resources/white-papers",
              cta: "Explore Papers",
            },
            {
              t: "Blogs",
              d: "Get clear perspectives on software products, integration, and changing technology demands.",
              to: "/resources/blogs",
              cta: "Read Insights",
            },
          ].map((resource) => (
            <FeatureCard
              key={resource.t}
              to={resource.to}
              title={resource.t}
              description={resource.d}
              cta={resource.cta}
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
