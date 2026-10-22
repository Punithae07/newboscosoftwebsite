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
  pdfPath: string;
  previewPath?: string;
  coverImage?: string;
};

export const successStories: SuccessStory[] = [
  {
    slug: "euphrasia-chikitsalaya-medsysb-rural-healthcare",
    title: "Transforming Rural Healthcare: How Euphrasia Chikitsalaya Achieved 90% Faster Operations with MedSysB",
    description:
      "Success Story | Location: Uttar Pradesh, India | Technology Partner: MedSysB",
    format: "article",
    category: "MedSysB",
    location: "Uttar Pradesh, India",
    organization: "Euphrasia Chikitsalaya",
    technologyPartner: "MedSysB",
    heroImage: "/images/medsysb/doctor.avif",
    relatedImage: "/images/medsysb/case-study-hospital.avif",
    highlights: [
      "Patient registration dropped from 10-15 minutes to 3-5 minutes through digitized workflows",
      "Record retrieval became instant, driving a 90% improvement in operational speed",
      "Billing, reporting, and cross-department coordination became centralized and more accurate",
    ],
    metrics: [
      { label: "Patient Registration", before: "10-15 min", after: "3-5 min", impact: "65% Faster" },
      { label: "Billing Processing", before: "8-10 min", after: "2-3 min", impact: "70% Faster" },
      { label: "Record Retrieval", before: "15 min", after: "Instant", impact: "90% Faster" },
      { label: "Billing Errors", before: "Frequent", after: "Minimal", impact: "80% Reduction" },
      { label: "Report Preparation", before: "Manual", after: "Automated", impact: "100% Automated" },
    ],
    content: `## Executive Summary

Euphrasia Chikitsalaya is a mission-driven healthcare institution delivering vital medical services to underserved rural communities in Uttar Pradesh. As patient volumes surged, the hospital hit an operational wall: manual paperwork, sluggish billing, and fragmented communication between departments began straining administrative efficiency and patient care.

To overcome these challenges, the hospital implemented **MedSysB**, fully centralizing its workflows and setting a new benchmark for rural healthcare delivery.

## The Challenge: The Bottlenecks of Manual Healthcare

Before adopting the digital system, Euphrasia Chikitsalaya relied heavily on traditional, paper-dependent processes. This created a compounding ripple effect of operational hurdles:

* **Slowing Down Care:** Manual patient registration and paper-based medical records caused unnecessary wait times.
* **Financial Frictions:** Delays in billing and report generation impacted daily efficiency.
* **Data Vulnerability:** Tracking patient history across departments was difficult, creating a constant risk of data loss and record misplacement.

## The Solution: A Fully Integrated Digital Ecosystem

The hospital deployed MedSysB's comprehensive, fully integrated hospital management system, activating synchronized modules across all critical touchpoints:

* **Front-Desk & Wards:** Streamlined Patient Registration, Outpatient Management, and Inpatient Registration.
* **Clinical & Ancillary:** Fully integrated Pharmacy Management and Laboratory Management.
* **Back Office:** Automated Billing & Accounts alongside advanced Reports and Analytics.

## Our Onboarding Promise

Change can be daunting. The MedSysB implementation team managed a structured, 5-step transition from requirement analysis and system configuration to hands-on staff training and continuous go-live support. This ensured smooth adoption with minimal disruption to ongoing hospital services.

1. **Requirement Analysis** to map workflows and operational goals.
2. **System Configuration** tailored to hospital processes.
3. **Hands-On Staff Training** to build confidence and adoption.
4. **Go-Live Support** for a smooth transition from manual to digital operations.
5. **Continuous Support** for technical assistance and workflow improvements.

## Impact by the Numbers

The shift from manual data to digital workflows yielded immediate, measurable performance spikes across the board.

## Key Benefits Achieved

### 1. Administrative & Clinical Excellence

* **Instant Record Access:** Staff gain quick access to patient history, leading to sharper treatment documentation and better follow-up management.
* **Centralized Coordination:** Inter-departmental friction is eliminated via a centralized hospital data management network that speeds up patient processing.

### 2. Financial Precision

* **Leakage Prevention:** Accurate billing and accounting guarantee precision in revenue monitoring.
* **Live Insights:** Hospital leadership now monitors financial health with real-time financial reporting tools.

## What Leadership Says

> "The system has been delivered successfully and meets our operational requirements. We appreciate the support, guidance, and dedication of the implementation team."

**Hospital Administration, Euphrasia Chikitsalaya**

## Conclusion: Ready for the Future

By deploying MedSysB, Euphrasia Chikitsalaya has successfully digitized its ecosystem, ensuring higher operational transparency, maximum administrative efficiency, and enhanced patient service delivery. The hospital is now well equipped to serve the healthcare needs of rural communities with modern, data-driven management.
`,
  },
];

export const whitePapers: WhitePaper[] = [
  {
    slug: "embedding-ethics-in-ai-driven-school-management-systems",
    title: "Embedding Ethics in AI-Driven School Management Systems",
    description:
      "A white paper on responsible AI adoption, governance, and practical safeguards for school management platforms.",
    pdfPath: "/images/whitepaper/Embedding-Ethics-in-AI-Driven-School-Management-Systems.pdf",
    previewPath: "/images/whitepaper/Embedding-Ethics-in-AI-Driven-School-Management-Systems.pdf",
    coverImage: "/images/smartschool/smartschool-schoolimg.avif",
  },
  {
    slug: "medsysb-white-paper",
    title: "MedSysB White Paper",
    description:
      "An overview of hospital digitization, workflow automation, and data-driven operations using the MedSysB ecosystem.",
    pdfPath: "/images/whitepaper/MSB-White-paper.pdf",
    previewPath: "/images/whitepaper/MSB-White-paper.pdf",
    coverImage: "/images/medsysb/doctor.avif",
  },
];

export function getSuccessStoryBySlug(slug: string) {
  return successStories.find((story) => story.slug === slug);
}
