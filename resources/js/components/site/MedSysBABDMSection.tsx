import { useState } from "react";
import {
  ArrowRight,
  Database,
  ExternalLink,
  Link2,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const abdmPoints = [
  {
    icon: Users,
    title: "ABHA",
    subtitle: "Digital Health Identity",
  },
  {
    icon: Link2,
    title: "Interoperable",
    subtitle: "Healthcare",
  },
  {
    icon: ShieldCheck,
    title: "Patient-Centric",
    subtitle: "Consent Based Sharing",
  },
  {
    icon: Database,
    title: "Secure & Standardised",
    subtitle: "Integrations",
  },
] as const;

export function MedSysBABDMSection() {
  const [open, setOpen] = useState(false);
  const certificateImage = "/images/product/IBDM-certificate.avif";

  return (
    <section className="relative overflow-hidden border-y border-blue-100/70 bg-linear-to-b from-[#f2f7fd] via-[#f7faff] to-[#f0f6fd] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Content */}
          <div className="lg:col-span-7">
            {/* Pill Badge */}
            <div className="inline-flex items-center rounded-full border border-blue-200/90 bg-blue-50/90 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700 shadow-xs">
              ABDM Integration
            </div>

            {/* Title */}
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.65rem] lg:leading-[1.18]">
              MedSysB Supports India’s Digital Healthcare Ecosystem
            </h2>

            {/* Paragraph */}
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-[17px]">
              MedSysB is ABDM integrated, enabling secure and standardised exchange of health information in alignment with India’s digital health mission. This reflects our commitment to interoperable, patient-centric and future-ready healthcare.
            </p>

            {/* 2x2 Feature Grid */}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {abdmPoints.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100/80 text-blue-600 shadow-xs ring-4 ring-blue-50">
                      <Icon className="h-5 w-5" strokeWidth={2.2} />
                    </div>
                    <div>
                      <div className="text-base font-bold leading-tight text-slate-900">
                        {item.title}
                      </div>
                      <div className="mt-0.5 text-xs font-medium text-slate-500 sm:text-[13px]">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button with Certificate Modal */}
            <div className="mt-9">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0066cc] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#0052a3] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                  >
                    View ABDM Certificate <ArrowRight className="h-4 w-4" />
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-4xl p-4 sm:p-6 bg-white border border-slate-200/90 shadow-2xl rounded-2xl sm:rounded-3xl">
                  <DialogHeader className="mb-3 text-left">
                    <DialogTitle className="text-xl font-bold text-slate-900">
                      ABDM Certificate of Recognition
                    </DialogTitle>
                    <p className="text-xs text-slate-500 sm:text-sm">
                      National Health Authority &amp; Ayushman Bharat Digital Mission (ABDM) Integration Certification for MedSysB
                    </p>
                  </DialogHeader>

                  <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50 p-2 sm:p-3">
                    <img
                      src={certificateImage}
                      alt="MedSysB ABDM Integration Certificate of Recognition - National Health Authority"
                      className="w-full h-auto rounded-lg object-contain"
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-xs text-slate-500">
                      Issued by National Health Authority, Government of India
                    </span>
                    <a
                      href={certificateImage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
                    >
                      Open full resolution <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Right Column: Framed Certificate Preview with Dot Accents */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Dot Matrix Decoration - Top Right */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 -top-5 -z-10 h-36 w-36 text-blue-300/80 sm:-right-6 sm:-top-7 sm:h-44 sm:w-44"
              >
                <svg width="100%" height="100%" fill="currentColor">
                  <pattern
                    id="medsysb-dots-top"
                    x="0"
                    y="0"
                    width="18"
                    height="18"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="3" cy="3" r="2.2" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#medsysb-dots-top)" />
                </svg>
              </div>

              {/* Dot Matrix Decoration - Bottom Left */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-5 -left-4 -z-10 h-28 w-28 text-blue-300/80 sm:-bottom-7 sm:-left-6 sm:h-36 sm:w-36"
              >
                <svg width="100%" height="100%" fill="currentColor">
                  <pattern
                    id="medsysb-dots-bottom"
                    x="0"
                    y="0"
                    width="18"
                    height="18"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="3" cy="3" r="2.2" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#medsysb-dots-bottom)" />
                </svg>
              </div>

              {/* Certificate Card Frame */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="group relative block w-full overflow-hidden rounded-2xl bg-white p-2.5 text-left shadow-[0_20px_50px_-15px_rgba(15,23,42,0.12),0_4px_16px_-4px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:rounded-3xl sm:p-3.5 focus:outline-none focus:ring-4 focus:ring-blue-500/25 cursor-pointer"
                title="Click to view full ABDM certificate"
              >
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200/80 bg-slate-50">
                  <img
                    src={certificateImage}
                    alt="MedSysB ABDM Integration Certificate of Recognition - National Health Authority"
                    width={800}
                    height={560}
                    className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Subtle hover overlay hint */}
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/0 opacity-0 transition-all duration-200 group-hover:bg-slate-900/10 group-hover:opacity-100">
                    <span className="rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-slate-900 shadow-md">
                      Click to expand
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
