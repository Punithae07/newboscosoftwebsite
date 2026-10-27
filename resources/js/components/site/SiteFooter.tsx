import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Globe, Mail, Phone, MapPin, ExternalLink, Award } from "lucide-react";
import { submitNewsletterSubscription } from "@/lib/contacts";
import { warmSecureFormChallenge } from "@/lib/public-form-security";
import { navProducts, navServices } from "@/lib/site-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const officeLocations = [
  {
    title: "Registered Office",
    company: "Bosco Soft Technologies Pvt. Ltd.",
    address: [
      "No. 231/77, S.H.C. Complex,",
      "Vaniyambadi Road,",
      "Tirupattur District,",
      "Tamil Nadu, India - 635601",
    ],
    phone: "+91 9626 800 800",
    email: "binfo@boscosofttech.com",
  },
  {
    title: "Corporate Office",
    company: "Bosco Soft Technologies Pvt. Ltd.",
    address: [
      "26/17, Ranganathan Avenue,",
      "Kellys, Kilpauk, Chennai,",
      "Tamil Nadu, India - 600 010",
    ],
    phone: "+91 97877 21154",
    email: "chennaioffice@boscosofttech.com",
  },
  {
    title: "Resource Office",
    company: "Bosco Soft Technologies Pvt. Ltd.",
    address: [
      "Guzou Nagar, Don Bosco Centre,",
      "Yelagiri Hills,",
      "Tirupattur District,",
      "Tamil Nadu, India - 635853",
    ],
    phone: "+91 9626 800 800",
    email: "binfo@boscosofttech.com",
  },
  {
    title: "UAE Office",
    company: "Bosco Soft Technologies FZE",
    address: [
      "BC4, Business Park,",
      "RAK Free Trade Zone,",
      "Ras Al Khaimah, UAE",
    ],
    phone: "+971 058 860 1821",
    email: "info@boscosoft.ae",
    website: "www.boscosoft.ae",
  },
] as const;

const branchLocations = ["Mumbai", "Hyderabad", "Bengaluru", "Guwahati", "Kochi", "Salem"] as const;

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2Fboscosofttech",
    key: "facebook",
  },
  {
    label: "X",
    href: "https://x.com/boscosoft?lang=en",
    key: "x",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCBs91zb6NGNEyE5kPBd--Jg",
    key: "youtube",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/boscosoft/",
    key: "instagram",
  },
  {
    label: "LinkedIn",
    href: "https://in.linkedin.com/company/boscosoft-technologies",
    key: "linkedin",
  },
  {
    label: "WhatsApp",
    href: "https://www.whatsapp.com/channel/0029VaHV6Yp9hXEy2vPGHS0M",
    key: "whatsapp",
  },
] as const;

type FooterNotice = {
  type: "success" | "error";
  message: string;
};

export function SiteFooter() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isHomePage = pathname === "/";
  const [email, setEmail] = useState("");
  const [botcheck, setBotcheck] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<FooterNotice | null>(null);
  const [activeCert, setActiveCert] = useState<{
    title: string;
    subtitle: string;
    image: string;
  } | null>(null);

  useEffect(() => {
    void warmSecureFormChallenge("newsletter").catch(() => {
      // Silence preload errors and let submit handle any real failure state.
    });
  }, []);

  async function handleNewsletterSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);

    try {
      setIsSubmitting(true);
      const response = await submitNewsletterSubscription({ email, botcheck });

      setNotice({
        type: "success",
        message: response.message,
      });
      setEmail("");
      setBotcheck("");
    } catch {
      setNotice(null);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <footer className="bg-primary text-primary-foreground">
      {isHomePage ? (
        <div className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-transparent shadow-none">
              <div className="grid gap-8 px-6 py-8 md:px-8 md:py-9 lg:grid-cols-[1.05fr_1.2fr] lg:items-center lg:px-10">
                <div>
                  <div className="text-[0.82rem] font-semibold uppercase tracking-[0.28em] text-white/70">
                    New Updates
                  </div>
                  <h2 className="mt-3 text-[2rem] font-bold leading-tight text-white md:text-[2.35rem]">
                    Join Our Mailing List
                  </h2>
                  <p className="mt-3 max-w-xl text-[1.06rem] leading-8 text-white/92">
                    For receiving our news and updates in your inbox directly.
                  </p>
                </div>

                <div>
                  {notice?.type === "success" ? (
                    <div
                      className="mb-4 rounded-[1.15rem] border border-emerald-200/60 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800"
                      aria-live="polite"
                    >
                      {notice.message}
                    </div>
                  ) : null}

                  <form
                    className="rounded-[1.5rem] border border-white/10 bg-white/8 p-3 backdrop-blur-sm"
                    onSubmit={handleNewsletterSubmit}
                    noValidate
                  >
                    <label htmlFor="footer-newsletter-email" className="sr-only">
                      Your Email Address
                    </label>
                    <input
                      type="text"
                      name="botcheck"
                      value={botcheck}
                      onChange={(event) => setBotcheck(event.target.value)}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <input
                        id="footer-newsletter-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Your Email Address"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        className="h-14 min-w-0 flex-1 rounded-[1.1rem] border border-white/20 bg-white px-5 text-base font-medium text-slate-800 outline-none transition placeholder:text-slate-500 focus:border-white focus:ring-4 focus:ring-white/20"
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex h-14 shrink-0 items-center justify-center rounded-[1.1rem] bg-accent px-7 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/25 disabled:cursor-progress disabled:opacity-75"
                      >
                        {isSubmitting ? "Sending..." : "Submit"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-10 px-5 py-14 md:grid-cols-3 lg:grid-cols-[1.3fr_0.95fr_1.15fr_0.95fr] lg:px-8">
        <div className="col-span-2 md:col-span-3 lg:col-span-1">
          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-white px-4 py-2.5 shadow-sm"
          >
            <img
              src="/images/bosco-logo.png"
              alt="Bosco Soft Technologies Pvt. Ltd. | IT Company | IT Solutions Company | Global IT Solutions | Bosco Soft Logo"
              width={146}
              height={36}
              loading="lazy" decoding="async" className="h-9 w-auto"
            />
          </Link>
          <p className="mt-4 max-w-md text-[1.0625rem] leading-8 text-primary-foreground/86">
            Boscosoft is an enterprise engineering and SaaS solutions company combining software delivery, domain experience, and a distinctive talent development mission.
          </p>
        </div>

        <FooterCol title="Products">
          {navProducts.map((p) => (
            <FooterLink key={p.slug} to={`/products/${p.slug}`}>
              {p.name}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Services">
          {navServices.map((s) => (
            <FooterLink key={s.slug} to={`/services/${s.slug}`}>
              {s.name}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Company">
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/social-impact">Social Impact</FooterLink>
          <FooterLink to="/leadership">Leadership</FooterLink>
          <FooterLink to="/careers">Careers</FooterLink>
          <FooterLink to="/contact-us">Contact Us</FooterLink>
        </FooterCol>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
            {officeLocations.map((office) => (
              <OfficeColumn
                key={office.title}
                title={office.title}
                company={office.company}
                addressLines={office.address}
                phone={office.phone}
                email={office.email}
                website={office.website}
              />
            ))}
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,420px)] lg:items-start">
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="h-5 w-5 shrink-0 text-white/80" />
                    <h3 className="text-[1.2rem] font-semibold tracking-tight text-white">Branches</h3>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[1.0625rem] leading-7 text-primary-foreground/86 md:justify-start">
                    {branchLocations.map((branch) => (
                      <div
                        key={branch}
                        className="whitespace-nowrap rounded-xl border border-white/10 bg-white/6 px-4 py-2 text-white/90"
                      >
                        {branch}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certification Badges Bar */}
                <div>
                  <div className="flex items-center gap-2.5">
                    <Award className="h-5 w-5 shrink-0 text-white/80" />
                    <h3 className="text-[1.2rem] font-semibold tracking-tight text-white">
                      Certifications
                    </h3>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-4 rounded-full border border-white/15 bg-white/8 px-5 py-2.5 shadow-[0_12px_30px_-6px_rgba(0,0,0,0.35)] backdrop-blur-md sm:gap-5 sm:px-6 sm:py-3.5">
                    {/* ISO 9001 Badge */}
                    <button
                      type="button"
                      onClick={() =>
                        setActiveCert({
                          title: "ISO 9001 Certified",
                          subtitle: "Quality Management System Certification",
                          image: "/images/product/ISO-certificate.jpg",
                        })
                      }
                      title="ISO 9001:2015 Certified - Quality Management System (Click to view certificate)"
                      className="group relative flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full border-2 border-white/30 bg-white p-0.5 shadow-md transition-all duration-300 hover:scale-108 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.45)] cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-white/40"
                    >
                      <img
                        src="/images/product/ISO-certificate.jpg"
                        alt="ISO 9001 Certified"
                        width={160}
                        height={160}
                        className="h-full w-full object-contain rounded-full transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </button>

                    {/* ABDM Badge */}
                    <button
                      type="button"
                      onClick={() =>
                        setActiveCert({
                          title: "ABDM Certificate of Recognition",
                          subtitle: "National Health Authority & Ayushman Bharat Digital Mission Integration",
                          image: "/images/product/IBDM-certificate.avif",
                        })
                      }
                      title="ABDM Integrated - Ayushman Bharat Digital Mission, National Health Authority (Click to view certificate)"
                      className="group relative flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full border-2 border-white/30 bg-white p-1 shadow-md transition-all duration-300 hover:scale-108 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.45)] cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-white/40"
                    >
                      <img
                        src="/images/product/IBDM-certificate.avif"
                        alt="ABDM Integration Certified - National Health Authority"
                        width={160}
                        height={160}
                        className="h-full w-full object-contain rounded-full transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
                <div className="text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-white/70">
                  Social Media
                </div>
                <h3 className="mt-2 text-[1.2rem] font-semibold tracking-tight text-white">
                  Follow Boscosoft
                </h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      title={social.label}
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/8 text-white/88 transition-all hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/12 hover:text-white"
                    >
                      <SocialIcon kind={social.key} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 text-sm text-primary-foreground/76 md:flex-row lg:px-8">
          <div>
            Copyright {new Date().getFullYear()} Bosco Soft Technologies Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-5">
            <Link to="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms-of-use" className="hover:text-white">
              Terms of Use
            </Link>
            <Link to="/refund-policy" className="hover:text-white">
              Refund Policy
            </Link>
            <Link to="/security" className="hover:text-white">
              Security
            </Link>
          </div>
        </div>
      </div>

      <Dialog open={activeCert !== null} onOpenChange={(open) => !open && setActiveCert(null)}>
        <DialogContent className="max-w-3xl p-4 sm:p-6 bg-white border border-slate-200/90 shadow-2xl rounded-2xl sm:rounded-3xl">
          <DialogHeader className="mb-2 text-left">
            <DialogTitle className="text-xl font-bold text-slate-900">
              {activeCert?.title}
            </DialogTitle>
            <p className="text-xs text-slate-500 sm:text-sm">
              {activeCert?.subtitle}
            </p>
          </DialogHeader>

          <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50 p-2 sm:p-3 flex items-center justify-center">
            {activeCert ? (
              <img
                src={activeCert.image}
                alt={activeCert.title}
                className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain"
              />
            ) : null}
          </div>

          <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-500">
              Verified Certification: Bosco Soft Technologies Pvt. Ltd.
            </span>
            {activeCert ? (
              <a
                href={activeCert.image}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
              >
                Open full image <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
}

function OfficeColumn({
  title,
  company,
  addressLines,
  phone,
  email,
  website,
}: {
  title: string;
  company: string;
  addressLines: readonly string[];
  phone?: string;
  email?: string;
  website?: string;
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-3">
        <div className="pt-1">
          <MapPin className="h-5 w-5 shrink-0 text-white/80" />
        </div>
        <div>
          <h3 className="text-[1.2rem] font-semibold tracking-tight text-white">{title}</h3>
          <div className="mt-2 space-y-1 text-[0.98rem] leading-7 text-primary-foreground/86">
            <div className="font-semibold text-white">{company}</div>
            {addressLines.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
          {phone ? (
            <a
              href={`tel:${phone}`}
              className="mt-2 flex items-center gap-2 text-[0.98rem] text-primary-foreground/86 hover:text-white"
            >
              <Phone className="h-4 w-4 shrink-0" />
              {phone}
            </a>
          ) : null}
          {email ? (
            <a
              href={`mailto:${email}`}
              className="mt-1 flex items-center gap-2 text-[0.98rem] text-primary-foreground/86 hover:text-white"
            >
              <Mail className="h-4 w-4 shrink-0" />
              {email}
            </a>
          ) : null}
          {website ? (
            <a
              href={`https://${website}`}
              target="_blank"
              rel="noreferrer"
              className="mt-1 flex items-center gap-2 text-[0.98rem] text-primary-foreground/86 hover:text-white"
            >
              <Globe className="h-4 w-4 shrink-0" />
              {website}
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function SocialIcon({ kind }: { kind: (typeof socialLinks)[number]["key"] }) {
  const className = "h-5 w-5";

  switch (kind) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
          <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.2-1.6 1.5-1.6H16V4.8c-.2 0-.9-.1-1.8-.1-1.8 0-3.1 1.1-3.1 3.3V11H9v3h2.3v7h2.2Z" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
          <path d="M18.244 2H21l-6.01 6.868L22 22h-5.49l-4.3-5.625L7.286 22H4.528l6.429-7.35L2 2h5.63l3.887 5.143L18.244 2Zm-.965 18.354h1.523L6.81 3.56H5.176l12.103 16.794Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
          <path d="M21.6 7.2a2.9 2.9 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.9 2.9 0 0 0-2 2A30 30 0 0 0 2 12a30 30 0 0 0 .4 4.8 2.9 2.9 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.9 2.9 0 0 0 2-2A30 30 0 0 0 22 12a30 30 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={className}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
          <path d="M6.9 8.3a1.4 1.4 0 1 1 0-2.9 1.4 1.4 0 0 1 0 2.9ZM5.6 9.8h2.6V18H5.6V9.8Zm4.1 0h2.5V11h.1c.4-.7 1.4-1.5 2.8-1.5 3 0 3.5 1.9 3.5 4.5V18H16v-3.5c0-.8 0-2-1.3-2s-1.5 1-1.5 1.9V18H9.7V9.8Z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
          <path d="M12 3.2a8.7 8.7 0 0 0-7.6 13l-1.2 4.2 4.3-1.1A8.7 8.7 0 1 0 12 3.2Zm0 15.8c-1.4 0-2.7-.4-3.8-1.1l-.3-.2-2.6.7.7-2.5-.2-.3A6.9 6.9 0 1 1 12 19Zm3.8-5.2c-.2-.1-1.1-.5-1.3-.6-.2-.1-.3-.1-.5.1l-.6.8c-.1.1-.2.2-.4.1a5.7 5.7 0 0 1-2.8-2.5c-.1-.2 0-.3.1-.4l.3-.3.2-.4a.5.5 0 0 0 0-.4c0-.1-.5-1.2-.7-1.6-.2-.4-.3-.3-.5-.3h-.4a.8.8 0 0 0-.6.3c-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.1 1.6 2.5 4 3.5.6.3 1 .4 1.3.5.6.2 1.2.1 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1 .1-1.1-.1-.1-.2-.1-.4-.2Z" />
        </svg>
      );
  }
}
function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <div className="mb-4 text-[1.2rem] font-semibold tracking-tight text-white">{title}</div>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  const className =
    "text-[1.0625rem] leading-8 text-primary-foreground/86 transition-colors hover:text-white lg:whitespace-nowrap";

  return (
    <li>
      <Link to={to} className={className} preload="intent">
        {children}
      </Link>
    </li>
  );
}