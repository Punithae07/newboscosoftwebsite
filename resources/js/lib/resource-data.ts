export type SuccessStoryFormat = "article" | "video" | "pdf";

export type SuccessStoryMetric = {
  label: string;
  before?: string;
  after?: string;
  impact?: string;
};

export type SuccessStory = {
  slug: string;
  title: string;
  description: string;
  format: SuccessStoryFormat;
  category?: string;
  location?: string;
  organization?: string;
  technologyPartner?: string;
  heroImage?: string;
  relatedImage?: string;
  previewAssetPath?: string;
  previewAssetLabel?: string;
  downloadAssetPath?: string;
  downloadAssetLabel?: string;
  highlights?: string[];
  metrics?: SuccessStoryMetric[];
  content: string;
};

export type WhitePaper = {
  slug: string;
  title: string;
  description: string;
  pdfPath?: string;
  previewPath?: string;
  coverImage?: string;
  status?: "published" | "coming_soon";
};

export const successStories: SuccessStory[] = [
  {
    slug: "optionc-education-software-modernization",
    title: "OptionC education software modernization",
    description:
      "A long-running education software product was rewritten with a contemporary technology approach. The supplied testimonial from OptionC’s founder praises the usability and performance of the new solution; obtain permission and document stack, scope, and measurable results before publishing a full case study.",
    format: "article",
    category: "SaaS Modernization",
    location: "United States",
    organization: "OptionC",
    technologyPartner: "Boscosoft",
    heroImage: "/images/smartschool/smartschool-schoolimg.avif",
    relatedImage: "/images/smartschool/smartschool-schoolimg.avif",
    highlights: [
      "Modernized architecture with contemporary technology standards",
      "Substantial elevation in platform usability and day-to-day performance",
      "Seamless operational continuity for educational institutions",
    ],
    content: `## Executive Summary

OptionC, a long-running education software platform serving schools, underwent comprehensive modernization to meet contemporary cloud standards, speed expectations, and device responsiveness.

## The Challenge

The long-running education software product required a refreshed technological foundation to scale across expanding student bodies and evolving security baselines without interrupting daily academic workflows.

## The Modernization Approach

Boscosoft engineered a contemporary technology rewrite, transitioning core legacy modules to modern, modular, cloud-native architecture. The project emphasized responsive design, database optimization, and high-throughput background processing.

## Feedback from Leadership

> "The usability, responsiveness, and performance of the rewritten solution have significantly elevated how our client schools manage their day-to-day operations."
>
> **Founder, OptionC**

## Project Status

Obtain permission and document stack, scope, and measurable results before publishing a full case study.
`,
  },
  {
    slug: "enterprise-software-co-development",
    title: "Enterprise software co-development",
    description:
      "The supplied Management Concept Group testimonial highlights adaptation to client technology expectations. Publish a named case only with permission and supporting project details.",
    format: "article",
    category: "Co-Development",
    location: "International",
    organization: "Management Concept Group",
    technologyPartner: "Boscosoft",
    heroImage: "/images/case-study-corporate.avif",
    relatedImage: "/images/case-study-corporate.avif",
    highlights: [
      "Dedicated offshore co-development team integrated with client architects",
      "Rapid alignment to client-mandated technology standards and workflows",
      "Predictable sprint velocity and continuous delivery discipline",
    ],
    content: `## Executive Summary

Enterprise product engineering demands flexible co-development models that integrate seamlessly into client sprint cadences, architectural standards, and governance policies.

## The Co-Development Model

Boscosoft aligned a dedicated engineering team with the client's internal architects and product leads. The team adapted directly to client-specified frameworks, code review rigor, and automated CI/CD pipelines.

## Client Testimonial

> "The team demonstrated commendable agility and technical expertise in adapting to our internal technology stack and architectural guidelines."
>
> **Management Concept Group**

## Project Status

Publish a named case only with permission and supporting project details.
`,
  },
  {
    slug: "connecting-care-operations-through-medsysb",
    title: "Connecting care operations through MedSysB",
    description:
      "Connecting care operations through MedSysB. Version 1 references Euphrasia Chikitsalaya; its “90% faster operations” claim needs an approved baseline, measurement method, and customer sign-off. Until then use Connecting care operations through MedSysB.",
    format: "article",
    category: "Healthcare Implementation",
    location: "Uttar Pradesh, India",
    organization: "Euphrasia Chikitsalaya",
    technologyPartner: "MedSysB",
    heroImage: "/images/medsysb/doctor.avif",
    relatedImage: "/images/medsysb/case-study-hospital.avif",
    highlights: [
      "Digitized patient registration and outpatient/inpatient workflows",
      "Synchronized pharmacy and laboratory diagnostic coordination",
      "Centralized billing, accounts, and hospital operational reporting",
    ],
    content: `## Executive Summary

Euphrasia Chikitsalaya is a mission-driven healthcare institution delivering vital medical services to underserved rural communities in Uttar Pradesh. To resolve the bottlenecks of manual, paper-dependent workflows, the hospital implemented **MedSysB**, centralizing its clinical and operational administration.

## The Operational Context

Prior to digital adoption, manual paperwork and siloed records created administrative friction:
* Paper-based medical records and manual registration wait times
* Delays in pharmacy coordination and diagnostic reporting
* Dispersed patient billing and accounting reconciliation

## The Solution: Connected Healthcare Operations

The hospital deployed MedSysB's integrated hospital management system:
* **Front-Desk & Wards:** Coordinated Patient Registration, Outpatient, and Inpatient management.
* **Clinical & Ancillary:** Integrated Pharmacy and Laboratory management workflows.
* **Back Office:** Automated billing, accounting, and institutional reporting.

## What Leadership Says

> "The system has been delivered successfully and meets our operational requirements. We appreciate the support, guidance, and dedication of the implementation team."
>
> **Hospital Administration, Euphrasia Chikitsalaya**
`,
  },
];

export const whitePapers: WhitePaper[] = [
  {
    slug: "incremental-legacy-modernization",
    title: "Incremental Legacy Modernization",
    description:
      "A practical architectural guide for modernizing mission-critical legacy applications through modular decomposition and continuous business continuity.",
    status: "coming_soon",
    coverImage: "/images/case-study-corporate.avif",
  },
  {
    slug: "evaluating-enterprise-rag",
    title: "Evaluating Enterprise RAG",
    description:
      "Architectural criteria, retrieval evaluation, data privacy boundaries, and operational guardrails for enterprise-grade Retrieval-Augmented Generation.",
    status: "coming_soon",
    coverImage: "/images/digital-transformation.avif",
  },
  {
    slug: "planning-databricks-migrations",
    title: "Planning Databricks Migrations",
    description:
      "Strategic frameworks and migration patterns for shifting legacy analytical pipelines and fragmented data warehouses to Databricks Lakehouse.",
    status: "coming_soon",
    coverImage: "/images/cloud-infrastructure.avif",
  },
  {
    slug: "building-sustainable-offshore-engineering-partnership",
    title: "Building a Sustainable Offshore Engineering Partnership",
    description:
      "A technology leader's handbook on agile governance, code quality standards, talent continuity, and cultural alignment in offshore co-development.",
    status: "coming_soon",
    coverImage: "/images/slider-03.avif",
  },
  {
    slug: "embedding-ethics-in-ai-driven-school-management-systems",
    title: "Embedding Ethics in AI-Driven School Management Systems",
    description:
      "A white paper on responsible AI adoption, governance, and practical safeguards for school management platforms.",
    pdfPath: "/images/whitepaper/Embedding-Ethics-in-AI-Driven-School-Management-Systems.pdf",
    previewPath: "/images/whitepaper/Embedding-Ethics-in-AI-Driven-School-Management-Systems.pdf",
    coverImage: "/images/smartschool/smartschool-schoolimg.avif",
    status: "published",
  },
  {
    slug: "medsysb-white-paper",
    title: "MedSysB White Paper",
    description:
      "An overview of hospital digitization, workflow automation, and data-driven operations using the MedSysB ecosystem.",
    pdfPath: "/images/whitepaper/MSB-White-paper.pdf",
    previewPath: "/images/whitepaper/MSB-White-paper.pdf",
    coverImage: "/images/medsysb/doctor.avif",
    status: "published",
  },
];

export function getSuccessStoryBySlug(slug: string) {
  if (slug === "euphrasia-chikitsalaya-medsysb-rural-healthcare") {
    return successStories.find((story) => story.slug === "connecting-care-operations-through-medsysb");
  }
  return successStories.find((story) => story.slug === slug);
}

