import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  X,
  ChevronDown,
  ArrowRight,
  Brain,
  Database,
  Workflow,
  Network,
  Rocket,
  Server,
  Sparkles,
  Info,
  Target,
  Users,
  UserPlus,
  Briefcase,
  BookOpen,
  FileText,
  Bookmark,
  Globe,
  User,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { navProducts, navServices } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type MegaKey = "products" | "services" | "industries" | "resources" | "company" | null;
const resourcesItems = [
  {
    label: "Success Stories",
    to: "/resources/success-stories",
    desc: "Verified customer outcomes & modernization stories",
  },
  { label: "Blog", to: "/resources/blogs", desc: "Enterprise software, AI & SaaS insights" },
  {
    label: "White Papers",
    to: "/resources/white-papers",
    desc: "Research and practical guides for tech leaders",
  },
];

const aboutItems = [
  { label: "About Us", to: "/about", desc: "Who we are and our global heritage", icon: User },
  { label: "Social Impact", to: "/social-impact", desc: "Rural engineering talent & inclusive growth", icon: Heart },
  { label: "Leadership", to: "/leadership", desc: "Meet the experts steering our vision" },
  { label: "Careers", to: "/careers", desc: "Join our global engineering team" },
];

export function SiteHeader() {
  const [open, setOpen] = useState<MegaKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const previousPathname = useRef(pathname);
  const resourcesActive =
    pathname.startsWith("/resources") ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/whitepapers") ||
    pathname.startsWith("/success-stories");

  useEffect(() => {
    let frame = 0;

    const updateScrolled = () => {
      const nextScrolled = window.scrollY > 8;
      setScrolled((current) => (current === nextScrolled ? current : nextScrolled));
      frame = 0;
    };

    const onScroll = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(updateScrolled);
    };

    updateScrolled();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      setOpen(null);
      setMobileOpen(false);
    }
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 w-full border-b border-border/70 bg-white/95 supports-[backdrop-filter]:bg-white/88 backdrop-blur-xl transition-all",
          scrolled
            ? "shadow-[0_18px_50px_-28px_rgba(16,30,54,0.45)]"
            : "shadow-[0_8px_30px_-24px_rgba(16,30,54,0.18)]",
        )}
        onMouseLeave={() => setOpen(null)}
      >
        <div className="mx-auto flex h-[60px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" preload="intent" className="group flex items-center gap-2">
            <img
              src="/images/bosco-logo.png"
              alt="Bosco Soft Technologies Pvt. Ltd. | IT Company | IT Solutions Company | Global IT Solutions | Bosco Soft Logo"
              width={162}
              height={40}
              fetchPriority="high"
              decoding="async"
              className="h-10 w-auto"
            />
          </Link>

          <nav className="hidden xl:flex items-center gap-2 h-full">
            <Link
              to="/"
              onMouseEnter={() => setOpen(null)}
              className={cn(
                "flex h-10 items-center rounded-[0.85rem] border px-4 text-[0.95rem] font-medium transition-all duration-200",
                pathname === "/"
                  ? "border-accent bg-accent text-white shadow-[0_14px_30px_-18px_rgba(15,94,168,0.55)]"
                  : "border-transparent text-foreground/90 hover:border-accent/18 hover:bg-accent/8 hover:text-accent",
              )}
              style={{ lineHeight: "1.2" }}
            >
              Home
            </Link>
            <NavTrigger
              label="Services"
              active={open === "services"}
              current={pathname.startsWith("/services")}
              onEnter={() => setOpen("services")}
              onClick={() => setOpen((current) => (current === "services" ? null : "services"))}
              className="flex h-10 items-center rounded-[0.85rem] border px-4 text-[0.95rem] font-medium transition-all duration-200"
            />
            <NavTrigger
              label="Products"
              active={open === "products"}
              current={pathname.startsWith("/products")}
              onEnter={() => setOpen("products")}
              onClick={() => setOpen((current) => (current === "products" ? null : "products"))}
              className="flex h-10 items-center rounded-[0.85rem] border px-4 text-[0.95rem] font-medium transition-all duration-200"
            />
            {/* Industries nav removed per redesign */}

            <NavTrigger
              label="Resources"
              active={open === "resources"}
              current={resourcesActive}
              onEnter={() => setOpen("resources")}
              onClick={() => setOpen((current) => (current === "resources" ? null : "resources"))}
              className="flex h-10 items-center rounded-[0.85rem] border px-4 text-[0.95rem] font-medium transition-all duration-200"
            />
            <NavTrigger
              label="About Us"
              active={open === "company"}
              current={
                pathname.startsWith("/about") ||
                pathname.startsWith("/social-impact") ||
                pathname.startsWith("/leadership") ||
                pathname.startsWith("/careers")
              }
              onEnter={() => setOpen("company")}
              onClick={() => setOpen((current) => (current === "company" ? null : "company"))}
              className="flex h-10 items-center rounded-[0.85rem] border px-4 text-[0.95rem] font-medium transition-all duration-200"
            />
          </nav>

          <div className="hidden xl:flex items-center gap-2">
            <Button
              asChild
              size="sm"
              className="bg-gradient-cta text-primary-foreground text-base hover:opacity-95 shadow-elegant"
            >
              <Link to="/contact-us" preload="intent" onClick={() => setOpen(null)}>
                Schedule Consultation
              </Link>
            </Button>
          </div>

          <div className="hidden md:flex xl:hidden items-center gap-3">
            <Button
              asChild
              size="sm"
              className="bg-gradient-cta text-primary-foreground hover:opacity-95 shadow-elegant"
            >
              <Link to="/contact-us" preload="intent" onClick={() => setOpen(null)}>
                Schedule Consultation
              </Link>
            </Button>
          </div>

          <button
            type="button"
            className="xl:hidden -mr-2 inline-flex h-14 w-14 items-center justify-center rounded-[1.6rem] bg-transparent transition-all duration-200 hover:-translate-y-0.5"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-controls="site-mobile-menu"
            aria-expanded={mobileOpen}
          >
            <span className="grid grid-cols-2 gap-1">
              {[0, 1, 2, 3].map((cell) => (
                <span
                  key={cell}
                  className="h-3.5 w-3.5 rounded-[0.18rem] border-2 border-sky-400 bg-transparent"
                />
              ))}
            </span>
          </button>
        </div>

        {/* Mega menus */}
        {open === "products" && (
          <MegaPanel>
            <div className="grid grid-cols-12 rounded-xl overflow-hidden border border-border/80 bg-background shadow-elegant max-h-[80vh] overflow-y-auto overflow-x-hidden">
              {/* Left Panel */}
              <div className="col-span-12 md:col-span-3 bg-gradient-cta p-4 text-primary-foreground flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">Our Products</h3>
                  <p className="mt-3 text-sm text-primary-foreground/80 leading-relaxed">
                    Enterprise-grade software designed for schools, universities, hospitals, NGOs,
                    and faith-based organizations.
                  </p>
                </div>
                <div className="mt-8">
                  <Button
                    asChild
                    variant="secondary"
                    className="w-full bg-white text-primary hover:bg-white/95"
                  >
                    <Link to="/contact-us" preload="intent" onClick={() => setOpen(null)}>
                      Request Demo
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Center Grid of Products */}
              <div className="col-span-12 md:col-span-6 p-4 bg-background min-w-0">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
                  Enterprise Products
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 min-w-0">
                  <MegaProductItem
                    to="/products/acme-erp"
                    title="Acme.erp"
                    desc="Financial management ERP"
                    seoAlt="Acme.erp | Accounting Software | Best Accounting Software | Accounting ERP"
                    imageSrc="/images/product/acemeerp.webp"
                    onClick={() => setOpen(null)}
                  />
                  <MegaProductItem
                    to="/products/microfund"
                    title="MicroFund"
                    desc="Microfinance ERP"
                    seoAlt="MicroFund | Finance Management System | Finance Software | Microfinance Software | Finance ERP"
                    imageSrc="/images/product/MicroFund.webp"
                    onClick={() => setOpen(null)}
                  />
                  <MegaProductItem
                    to="/products/medsysb"
                    title="MedSysB"
                    desc="Hospital management ERP"
                    seoAlt="MedSysB | Hospital Management System | HMS | Hospital Management Software | Hospital Information System"
                    imageSrc="/images/product/Medsys.webp"
                    onClick={() => setOpen(null)}
                  />
                  <MegaProductItem
                    to="/products/smartschoolnxt"
                    title="SmartSchoolNxt"
                    desc="AI-ready school ERP"
                    seoAlt="SmartSchoolNxT | School Management System | Student Information System | School Management Software | AI-Ready School ERP"
                    imageSrc="/images/product/SSP.webp"
                    onClick={() => setOpen(null)}
                  />
                  <MegaProductItem
                    to="/products/higrade"
                    title="HiGrade"
                    desc="Higher education ERP"
                    seoAlt="HiGrade | ERP for Colleges | Campus Management System | College Management System"
                    imageSrc="/images/product/higrade.webp"
                    imageClassName="max-h-10 scale-110"
                    onClick={() => setOpen(null)}
                  />
                  <MegaProductItem
                    to="/products/eaudithub"
                    title="eAuditHub"
                    desc="Audit & compliance intelligence"
                    seoAlt="eAuditHub | Audit Management System | Audit Management Software | Compliance Software | Audit Software"
                    imageSrc="/images/product/authub.webp"
                    onClick={() => setOpen(null)}
                  />
                  <MegaProductItem
                    to="/products/cristo-suite"
                    title="CristO Suite"
                    desc="Faith-based digital platform"
                    seoAlt="CristO Suite | Church Management Software | Church Management System | CHMS"
                    imageSrc="/images/product/Cristo.webp"
                    onClick={() => setOpen(null)}
                  />
                </div>
              </div>

              {/* Right Promo Panel */}
              <div className="col-span-12 md:col-span-3 p-3 bg-surface border-l border-border flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-lg border border-border bg-background shadow-sm aspect-4/3 flex items-center justify-center relative group">
                    <img
                      src="/images/slider01.avif"
                      alt="SmartSchoolNxT | School Management System | Student Information System | School Management Software | AI-Ready School ERP"
                      loading="lazy"
                      decoding="async"
                      width={1024}
                      height={768}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground flex items-center gap-1.5 text-sm">
                      <span className="inline-flex h-2 w-2 rounded-full bg-success animate-pulse" />
                      SmartSchoolNxt
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      AI-ready school ERP for admissions, academics, attendance, communication,
                      and connected campus operations.
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    asChild
                    size="sm"
                    className="w-full bg-accent text-white hover:bg-accent/95 hover:text-white shadow-[0_12px_28px_-16px_rgba(8,58,122,0.55)]"
                  >
                    <Link to="/products/$slug" params={{ slug: "smartschoolnxt" }} onClick={() => setOpen(null)}>
                      Explore Now
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </MegaPanel>
        )}
        {open === "services" && (
          <MegaPanel>
            <div className="grid grid-cols-12 rounded-xl overflow-hidden border border-border/80 bg-background shadow-elegant">
              <div className="col-span-12 md:col-span-3 bg-gradient-cta p-4 text-primary-foreground flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">Our Services</h3>
                  <p className="mt-3 text-sm text-primary-foreground/80 leading-relaxed">
                    Scale and automate your business operations with our expert-led engineering,
                    cloud, database, and AI consulting.
                  </p>
                </div>
                <div className="mt-8">
                  <Button
                    asChild
                    variant="secondary"
                    className="w-full bg-white text-primary hover:bg-white/95"
                  >
                    <Link to="/contact-us" preload="intent" onClick={() => setOpen(null)}>
                      Discuss Your Needs
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 p-4 bg-background">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
                  Professional Services
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-3">
                  <MegaProductItem
                    to="/services/ai-transformation"
                    title="AI Transformation & Automation"
                    desc="AI roadmaps, assistants, RAG, automation"
                    onClick={() => setOpen(null)}
                  />
                  <MegaProductItem
                    to="/services/data-analytics-ai"
                    title="Data, Analytics & AI"
                    desc="Lakehouses, dashboards, decision intelligence"
                    onClick={() => setOpen(null)}
                  />
                  <MegaProductItem
                    to="/services/erp-crm-implementation"
                    title="ERP & CRM"
                    desc="Dynamics 365, ERPNext"
                    onClick={() => setOpen(null)}
                  />
                  <MegaProductItem
                    to="/services/integration-ecosystems"
                    title="Integration & Digital Ecosystems"
                    desc="APIs, payments, connected workflows"
                    onClick={() => setOpen(null)}
                  />
                  <MegaProductItem
                    to="/services/saas-engineering"
                    title="SaaS Engineering & Modernization"
                    desc="Cloud-native, multi-tenant SaaS modernization"
                    onClick={() => setOpen(null)}
                  />
                  <MegaProductItem
                    to="/services/cloud-infrastructure"
                    title="Cloud Infrastructure & Support"
                    desc="Deployment, security, monitoring, support"
                    onClick={() => setOpen(null)}
                  />
                </div>
              </div>

              <MegaPromo
                tag="Featured"
                title="AI Transformation & Automation"
                desc="AI roadmaps, assistants, RAG, and workflow automation built for practical business outcomes."
                ctaLabel="Explore Now"
                ctaTo="/services/ai-transformation"
                imageSrc="/images/digital-transformation.avif"
                imageAlt="Enterprise ERP digital transformation | ERP Integration | IT Solutions Company | Global IT Solutions"
                onClose={() => setOpen(null)}
              />
            </div>
          </MegaPanel>
        )}
        {open === "resources" && (
          <MegaPanel>
            <div className="grid grid-cols-12 rounded-xl overflow-hidden border border-border/80 bg-background shadow-elegant">
              <div className="col-span-12 md:col-span-3 bg-gradient-cta p-4 text-primary-foreground flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">Ideas & Insights</h3>
                  <p className="mt-3 text-sm text-primary-foreground/80 leading-relaxed">
                    Practical perspectives on software engineering, cloud modernization, enterprise SaaS, and applied AI.
                  </p>
                </div>
                <div className="mt-8">
                  <Button
                    asChild
                    variant="secondary"
                    className="w-full bg-white text-primary hover:bg-white/95"
                  >
                    <Link to="/resources/blogs" onClick={() => setOpen(null)}>
                      Explore Insights
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 p-4 bg-background">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
                  Knowledge & Case Studies
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-3">
                  {resourcesItems.map((r, idx) => {
                    const icons = [Briefcase, BookOpen, FileText, Bookmark, Sparkles, Globe];
                    return (
                      <MegaProductItem
                        key={r.label}
                        to={r.to}
                        title={r.label}
                        desc={r.desc}
                        icon={icons[idx % icons.length]}
                        onClick={() => setOpen(null)}
                      />
                    );
                  })}
                </div>
              </div>

              <MegaPromo
                tag="Research"
                title="Technology Guides"
                desc="Go deeper on the architectural and operational choices shaping modern business software."
                ctaLabel="Explore White Papers"
                ctaTo="/resources/white-papers"
                imageSrc="/images/slider-03.avif"
                imageAlt="Resources and white paper preview"
                onClose={() => setOpen(null)}
              />
            </div>
          </MegaPanel>
        )}
        {open === "company" && (
          <MegaPanel>
            <div className="grid grid-cols-12 rounded-xl overflow-hidden border border-border/80 bg-background shadow-elegant">
              <div className="col-span-12 md:col-span-3 bg-gradient-cta p-6 text-primary-foreground flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">About Us</h3>
                  <p className="mt-3 text-sm text-primary-foreground/80 leading-relaxed">
                    A global partner for enterprise software engineering, modernization, and cloud
                    scale operations.
                  </p>
                </div>
                <div className="mt-8">
                  <Button
                    asChild
                    variant="secondary"
                    className="w-full bg-white text-primary hover:bg-white/95"
                  >
                    <Link to="/about" onClick={() => setOpen(null)}>
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="col-span-12 md:col-span-6 p-4 bg-background min-w-0">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
                  Bosco Soft Technologies Pvt. Ltd.
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-3">
                  {aboutItems.map((c, idx) => {
                    const icons = [Info, Target, Users, UserPlus];
                    return (
                      <MegaProductItem
                        key={c.label}
                        to={c.to}
                        title={c.label}
                        desc={c.desc}
                        icon={c.icon ? c.icon : icons[idx % icons.length]}
                        onClick={() => setOpen(null)}
                      />
                    );
                  })}
                </div>
              </div>

              <MegaPromo
                tag="Contact Us"
                title="Contact Us"
                desc="Get in touch with Boscosoft to discuss your software, AI, and digital transformation needs."
                ctaLabel="Reach Out Today"
                ctaTo="/contact-us"
                external
                imageSrc="/images/case-study-corporate.avif"
                imageAlt="Enterprise application integration | System Integration Services | Digital Integration Solutions | ERP Integration"
                onClose={() => setOpen(null)}
              />
            </div>
          </MegaPanel>
        )}
      </header>

      {/* Mobile drawer rendered outside header containing block to avoid backdrop-blur positioning context bug */}
      {mobileOpen && (
        <div id="site-mobile-menu" className="fixed inset-0 z-[100] xl:hidden">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-background text-foreground shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border bg-white/90 p-4 backdrop-blur-sm">
              <div><div className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-accent/75">Navigation</div><span className="mt-1 block text-base font-bold text-foreground">Menu</span></div>
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu" className="rounded-full border border-border bg-white p-2 text-foreground shadow-sm transition-colors hover:text-accent">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3 p-4">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center justify-between rounded-2xl border px-4 py-3.5 text-base font-semibold transition-all",
                  pathname === "/"
                    ? "border-accent/30 bg-accent/8 text-accent shadow-[0_12px_24px_-20px_rgba(15,94,168,0.45)]"
                    : "border-border/70 bg-white text-foreground hover:border-accent/20 hover:text-accent",
                )}
              >
                <span>Home</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <MobileGroup
                label="Services"
                items={navServices.map((s) => ({ label: s.name, to: `/services/${s.slug}` }))}
                onItemClick={() => setMobileOpen(false)}
              />
              <MobileGroup
                label="Products"
                items={navProducts.map((p) => ({ label: p.name, to: `/products/${p.slug}` }))}
                onItemClick={() => setMobileOpen(false)}
              />

              <MobileGroup
                label="Resources"
                items={resourcesItems}
                onItemClick={() => setMobileOpen(false)}
              />
              <MobileGroup
                label="About Us"
                items={aboutItems}
                onItemClick={() => setMobileOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function NavTrigger({
  label,
  active,
  current = false,
  onEnter,
  onClick,
  className,
}: {
  label: string;
  active: boolean;
  current?: boolean;
  onEnter: () => void;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onMouseEnter={onEnter}
      onClick={onClick}
      aria-expanded={active}
      aria-haspopup="menu"
      className={cn(
        "inline-flex h-10 items-center gap-1 px-4 text-[0.95rem] font-medium transition-all duration-200",
        current || active
          ? "border-accent bg-accent text-white hover:text-white shadow-[0_14px_30px_-18px_rgba(15,94,168,0.55)]"
          : "border-transparent text-foreground/90 hover:border-accent/18 hover:bg-accent/8 hover:text-accent",
        className,
      )}
    >
      {label}
      <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", active && "rotate-180")} />
    </button>
  );
}

function MegaPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute left-0 right-0 top-full bg-background/95 backdrop-blur-xl border-b border-border shadow-elegant animate-fade-up overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">{children}</div>
    </div>
  );
}

function MegaGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        {title}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function MegaLink({ to, title, desc }: { to: string; title: string; desc?: string }) {
  return (
    <Link to={to} className="block rounded-lg p-2.5 hover:bg-surface transition-colors group">
      <div className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
        {title}
      </div>
      {desc && <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{desc}</div>}
    </Link>
  );
}

function MegaCTA({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="self-end inline-flex items-center gap-1 text-sm font-semibold text-accent hover:gap-2 transition-all"
    >
      {label} <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

function MobileGroup({
  label,
  items,
  onItemClick,
}: {
  label: string;
  items: { label: string; to: string; external?: boolean; desc?: string }[];
  onItemClick?: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-[1.35rem] border border-border/70 bg-white shadow-[0_16px_30px_-26px_rgba(15,23,42,0.28)]">
      <button
        type="button"
        className={cn(
          "flex w-full items-center justify-between px-4 py-4 text-left transition-colors",
          open ? "bg-accent/6" : "bg-white",
        )}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div>
          <div className="text-base font-semibold text-foreground">{label}</div>
          <div className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Explore {label}
          </div>
        </div>
        <span
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-foreground transition-all",
            open && "border-accent/30 bg-accent/8 text-accent",
          )}
        >
          <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
        </span>
      </button>
      {open && (
        <div className="border-t border-border/70 bg-surface/55 px-3 pb-3 pt-2">
          <div className="space-y-2">
            {items.map((i) =>
              i.external ? (
                <a
                  key={i.to + i.label}
                  href={i.to}
                  className="flex items-center gap-3 rounded-xl border border-white/80 bg-white px-3 py-3 shadow-[0_12px_24px_-22px_rgba(15,23,42,0.35)] transition-all hover:-translate-y-0.5 hover:border-accent/20 hover:shadow-[0_18px_30px_-24px_rgba(15,94,168,0.28)]"
                  onClick={onItemClick}
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-foreground">{i.label}</div>
                    {i.desc ? (
                      <div className="mt-1 text-xs leading-5 text-muted-foreground">{i.desc}</div>
                    ) : (
                      <div className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        Open page
                      </div>
                    )}
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-accent" />
                </a>
              ) : (
                <Link
                  key={i.to + i.label}
                  to={i.to}
                  className="flex items-center gap-3 rounded-xl border border-white/80 bg-white px-3 py-3 shadow-[0_12px_24px_-22px_rgba(15,23,42,0.35)] transition-all hover:-translate-y-0.5 hover:border-accent/20 hover:shadow-[0_18px_30px_-24px_rgba(15,94,168,0.28)]"
                  onClick={onItemClick}
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-foreground">{i.label}</div>
                    {i.desc ? (
                      <div className="mt-1 text-xs leading-5 text-muted-foreground">{i.desc}</div>
                    ) : (
                      <div className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        Open page
                      </div>
                    )}
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-accent" />
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function MegaProductItem({
  to,
  title,
  desc,
  seoAlt,
  icon: Icon,
  imageSrc,
  imageClassName,
  external = false,
  onClick,
}: {
  to: string;
  title: string;
  desc: string;
  seoAlt?: string;
  icon?: React.ElementType;
  imageSrc?: string;
  imageClassName?: string;
  external?: boolean;
  onClick: () => void;
}) {
  const className =
    "group relative flex w-full min-w-0 items-center gap-3.5 rounded-2xl border border-border/60 bg-white p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0f5ea8] hover:shadow-[0_10px_22px_-14px_rgba(15,94,168,0.24)]";

  const content = (
    <>
      {imageSrc || Icon ? (
        <div
          className={cn(
            "relative shrink-0 overflow-hidden ring-1 ring-inset ring-border/60 backdrop-blur-md transition-all duration-300 group-hover:ring-[#0f5ea8]/45 group-hover:shadow-[0_8px_24px_-8px_rgba(15,94,168,0.35)]",
            imageSrc
              ? "flex h-12 w-[3.6rem] items-center justify-center rounded-xl bg-white p-1.5"
              : "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 group-hover:from-primary/12 group-hover:via-accent/12 group-hover:to-primary/8",
          )}
        >
          <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/40 to-transparent opacity-60" />
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={seoAlt}
              loading="lazy"
              decoding="async"
              width={160}
              height={80}
              className={cn("relative max-h-8 w-auto max-w-full object-contain", imageClassName)}
            />
          ) : Icon ? (
            <Icon className="relative h-5 w-5 text-accent transition-colors group-hover:text-[#0f5ea8]" strokeWidth={1.75} />
          ) : null}
        </div>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <div className="text-sm font-semibold text-foreground transition-colors duration-200 group-hover:text-[#0f5ea8]">
          {title}
        </div>
        <div className="text-xs text-muted-foreground mt-0.5 leading-snug line-clamp-2">{desc}</div>
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/55 opacity-0 -translate-x-1 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-[#0f5ea8]" />
    </>
  );

  if (external) {
    return (
      <a href={to} onClick={onClick} className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link to={to} onClick={onClick} className={className}>
      {content}
    </Link>
  );
}

function MegaPromo({
  tag,
  title,
  desc,
  ctaLabel,
  ctaTo,
  imageSrc,
  imageAlt,
  external = false,
  onClose,
}: {
  tag: string;
  title: string;
  desc: string;
  ctaLabel: string;
  ctaTo: string;
  imageSrc: string;
  imageAlt: string;
  external?: boolean;
  onClose: () => void;
}) {
  return (
    <div className="col-span-12 md:col-span-3 relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-accent/70 p-5 flex flex-col justify-between text-white">
      {/* decorative orbs */}
      <div className="pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full bg-white/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-12 h-44 w-44 rounded-full bg-accent/40 blur-3xl" />
      <div className="relative">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          {tag}
        </span>
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/25 bg-white/10 shadow-xl backdrop-blur-xl">
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="lazy"
            decoding="async"
            width={960}
            height={540}
            className="h-40 w-full object-cover"
          />
        </div>
        <h4 className="mt-4 text-base font-bold leading-tight !text-white">{title}</h4>
        <p className="mt-1.5 text-sm leading-relaxed !text-white">{desc}</p>
      </div>
      <Button
        asChild
        size="sm"
        className="relative mt-5 w-full bg-white text-primary hover:bg-white/95 shadow-lg"
      >
        {external ? (
          <a href={ctaTo} onClick={onClose}>
            {ctaLabel} <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </a>
        ) : (
          <Link to={ctaTo} onClick={onClose}>
            {ctaLabel} <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Link>
        )}
      </Button>
    </div>
  );
}




