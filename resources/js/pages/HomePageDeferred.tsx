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
    tag: "Finance",
    content:
      "Put financial stewardship in focus. Manage funds, branches, reporting, assets, and financial controls with greater clarity.",
    cta: "Explore Acme.erp",
  },
  microfund: {
    name: "MicroFUND",
    tag: "Microfinance",
    content:
      "Bring clarity to every lending cycle. Support borrower onboarding, repayments, field collections, and portfolio visibility.",
    cta: "Explore MicroFUND",
  },
  medsysb: {
    name: "MedSysB",
    tag: "Healthcare",
    content:
      "Connect care with operations. Coordinate patient journeys, diagnostics, pharmacy, billing, and hospital administration.",
    cta: "Explore MedSysB",
  },
  smartschoolnxt: {
    name: "SmartSchoolNxt",
    tag: "Education",
    content:
      "Keep your school connected. Bring admissions, academics, attendance, fees, exams, and parent communication into coordinated workflows.",
    cta: "Explore SmartSchoolNxt",
  },
  higrade: {
    name: "HiGrade",
    tag: "Higher Education",
    content:
      "Make campus operations work as one. Connect the student lifecycle, academic administration, exams, and institutional reporting.",
    cta: "Explore HiGrade",
  },
  eaudithub: {
    name: "eAuditHub",
    tag: "Quality",
    content:
      "Move from findings to action. Plan audits, capture evidence, assign corrective actions, and track compliance activity.",
    cta: "Explore eAuditHub",
  },
  "cristo-suite": {
    name: "CristO Suite",
    tag: "FaithTech",
    content:
      "Connect communities and simplify parish, diocesan, and religious institute management with seamless administration.",
    cta: "Explore CristO Suite",
  },
};

const homeServiceOverrides: Record<
  string,
  {
    title?: string;
    description: string;
    cta: string;
    image?: string;
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
    image: "/images/ecosystem.avif",
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
    title: "Data Analytics & AI",
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
    metric: "Financial Transparency",
    sector: "Finance & ERP",
    q: "ACME.ERP has brought great hope for transparency and sustainability in our province.",
    n: "Br. Nyondo Joseph, SDB ZMB Economer,",
    o: "Zambia Province",
  },
  {
    metric: "Accounting & Financial ERP",
    sector: "Finance & ERP",
    q: "The Salesians of Don Bosco AOS Province have found ACME.ERP to be an excellent accounting and financial management solution. Its user-friendly design, comprehensive accounting features, and reliable reporting tools have greatly enhanced our financial administration. The software has improved efficiency, strengthened accountability, and provided timely financial information for informed decision-making. We are pleased with its performance and recommend ACME.ERP as a dependable ERP solution for organisations seeking for other provinces financial management.",
    n: "Mr. Isaac Oppong, SDB AOS Head of Finance and Administration,",
    o: "Ghana Province",
  },
  {
    metric: "Reliable Website Support",
    sector: "Web Development",
    q: "Boscosoft’s web team provides reliable maintenance and ongoing support for our websites at Options United. We appreciate their prompt responses and dedication to keeping our websites updated and running smoothly.",
    n: "Thomas Rudkins, Options United,",
    o: "USA",
  },
  {
    metric: "Reliable Backend Support",
    sector: "E-commerce",
    q: "Bosco team provides reliable backend support for our Amazon operations at OZeri, and appreciate their responsiveness and commitment to delivering quality work.",
    n: "William Huckestein , President,",
    o: "Ozeri, USA",
  },
  {
    metric: "Agile Product Development",
    sector: "Software Development",
    q: "Working with this team has been an absolute pleasure. Their efficiency, clear communication, and unwavering commitment consistently exceed expectations. The AGILE follow‑up process ensures our product development stays on track and responsive. I feel completely comfortable collaborating with the dedicated team assigned to us. We look forward to continuing this long‑term partnership for our product’s growth and success",
    n: "Sam Kurien, Founder & CEO of CeeS3 Technologies,",
    o: "USA",
  },
  {
    metric: "Long-Term IT Partnership",
    sector: "IT Services",
    q: "We have been working with this team since September 2015, and their consistency has been remarkable. Their availability during US business hours makes collaboration seamless. Our dedicated resource, Christy Chandran, has shown outstanding commitment and efficiency. The development and support provided on our internal projects have been truly invaluable",
    n: "Jim Montgomery,",
    o: "A.R.M Solutions",
  },
  {
    metric: "15+ Years of Partnership",
    sector: "AI & Software Development",
    q: "Boscosoft has been my go-to development team for over the past 15 years now. They’ve always gone a step above to ensure my clients are 100% satisfied. I cannot recommend them highly enough for any AI, software, or IT development projects!",
    n: "Adam Limmer, Founder & CEO / Owner",
    o: "Limnet Software Development",
  },
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
    n: "World Trade Center",
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
              <p className="mt-4 t-body !text-white text-white">
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
                backgroundImageSrc={override?.image || service.heroImage}
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
                className="inline-flex whitespace-nowrap rounded-full border border-[#8fb4e5] bg-background px-4 py-2 text-base font-medium text-slate-900 shadow-[0_8px_18px_-10px_rgba(15,23,42,0.22),0_2px_6px_-3px_rgba(15,23,42,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_24px_-12px_rgba(15,23,42,0.24),0_4px_8px_-4px_rgba(15,23,42,0.14)]"
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
        subtitle="Explore examples of long-standing product delivery, technology modernization, and enterprise implementation."
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
                  <div className="mb-4 flex items-center gap-3">
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">
                      {card.metric}
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
      </Section>

      <Section className="cv-auto" eyebrow="Leadership perspective" title="Deliver value today. Build the capacity for tomorrow." align="center">
        <div
          className="relative overflow-hidden rounded-3xl bg-gradient-hero p-6 text-primary-foreground shadow-elegant sm:p-8 lg:p-10"
          style={{
            backgroundImage:
              "linear-gradient(315deg, oklch(0.22 0.09 260) 0%, oklch(0.3 0.12 250) 40%, oklch(0.55 0.18 230) 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-glow opacity-70" />
          <div className="relative grid items-center gap-8 sm:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[260px_minmax(0,1fr)] xl:gap-10">
              <div className="leader-photo-wrap relative mx-auto w-full max-w-[260px] overflow-hidden rounded-2xl sm:mx-0 sm:h-[320px] sm:max-w-none">
                <img
                  src="/images/leaders/thaddeus-singarayan.png"
                  alt="Thaddeus Singarayan SDB | MD & CEO at Bosco Soft Technologies Pvt. Ltd. | Bosco Soft Technologies CEO"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={1000}
                  className="h-72 w-full object-cover object-top transition-transform duration-500 hover:scale-105 sm:h-full"
                />
              </div>
              <div className="min-w-0 py-2 text-white">
                <Quote className="mb-4 h-8 w-8 text-accent" />
                <blockquote className="text-lg font-medium leading-relaxed text-white sm:text-xl">
                  “Every technology investment should strengthen how an organization works today and its ability to adapt tomorrow. At Boscosoft, our commitment is to simplify complex operations, connect essential systems, and apply AI where it can deliver meaningful business value. We place equal importance on developing the people and judgment behind that technology. For our clients, this means a partnership focused on lasting capability: better decisions, dependable operations, and the freedom to grow.”
                </blockquote>
                <div className="mt-6 border-t border-white/20 pt-5 text-base">
                  <div className="font-semibold">Thaddeus Singarayan SDB</div>
                  <div className="text-primary-foreground/90">Managing Director &amp; CEO</div>
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
