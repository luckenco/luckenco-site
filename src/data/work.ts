export type WorkCardItem = {
  id: string;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
  inactive?: boolean;
  image?: string;
  imageAlt?: string;
};

const currentlyInvolved: WorkCardItem[] = [
  {
    id: "vienna-ai-company",
    title: "The Vienna AI Company",
    description:
      "On LISA, cut average end-to-end call-system latency by 70% and built agentic voice flows across LiveKit, Gemini, and ElevenLabs.",
    image: "/placeholder.jpg",
    imageAlt: "Placeholder icon for The Vienna AI Company card",
    href: "https://lisa.aicompany.at/",
    linkLabel: "Visit LISA →",
  },
  {
    id: "vertex",
    title: "VERTEX",
    description:
      "Building automation workflows for retail engineering teams working across physical and digital product operations.",
    image: "/placeholder.jpg",
    imageAlt: "Placeholder icon for VERTEX card",
    href: "https://www.vertex.de/en/",
    linkLabel: "Visit Vertex →",
  },
  {
    id: "shapeid",
    title: "shapeID",
    description:
      "Building 3D body-scanning systems that turn mobile captures into measurement and fit workflows for apparel teams.",
    image: "/placeholder.jpg",
    imageAlt: "Placeholder icon for shapeID card",
    href: "https://shapeid.io/?ref=luckenco",
    linkLabel: "Visit shapeID →",
  },
  {
    id: "rsai",
    title: "rsai.dev",
    description:
      "Minimal Rust framework for building LLM systems with stronger compile-time guarantees.",
    image: "/placeholder.jpg",
    imageAlt: "Placeholder icon for rsai.dev card",
    href: "https://rsai.dev?ref=luckenco",
    linkLabel: "View code →",
  },
];

const pastProjects: WorkCardItem[] = [
  {
    id: "enterprise-infrastructure-migration",
    title: "Enterprise Infrastructure Migration",
    description:
      "Led infrastructure migration and environment setup across Azure, AKS, and PostgreSQL for a multi-service platform.",
  },
  {
    id: "invoice-automation",
    title: "Invoice Automation",
    description:
      "Delivered 120% year-one ROI, eliminated 525 hours of manual work, and reduced data-entry errors by 78% with an async invoice-processing pipeline built in Rust and Azure AI.",
  },
  {
    id: "sales-to-crm-ai-agent",
    title: "Sales-to-CRM AI Agent",
    description:
      "Cut lead entry time by more than 80%, bringing each interaction under 1 minute by turning unstructured field notes into structured CRM entities.",
    href: "https://steig.co?ref=luckenco",
    linkLabel: "Visit steig →",
  },
  {
    id: "real-estate-dedup",
    title: "Real Estate Deduplication Pipeline",
    description:
      "Built a deduplication pipeline for nationwide Swiss property data, reducing record overlap by nearly 90% and processing time by over 65%.",
  },
  {
    id: "steriscan",
    title: "SteriScan",
    description:
      "Reduced the risk of 2-week regulatory shutdowns with tamper-proof sterilization tracking and NFC-enforced QM-compliant workflows.",
  },
  {
    id: "motorcycle-configurator",
    title: "3D Motorcycle Configurator",
    description:
      "Enabled real-time, in-browser customization of 50+ vehicle parts with sub-2-second rendering latency using hardware-accelerated WebGL.",
  },
  {
    id: "lenge",
    title: "lenge",
    description:
      "AI habit coaching that matched users with accountability partners for 14-day challenges tailored to their goals and energy levels.",
    image: "/img/lenge.png",
    imageAlt: "lenge logo",
    href: "https://lenge.club?ref=luckenco",
    linkLabel: "Visit lenge →",
    inactive: true,
  },
];

export const partners: WorkCardItem[] = [
  {
    id: "partner-adler-studio",
    title: "adler.studio",
    description:
      "Vienna-based product studio shipping web, native, and 3D products.",
    image: "/img/adler.png",
    imageAlt: "adler.studio logo",
    href: "https://www.adler.studio/?ref=luckenbach",
    linkLabel: "Visit adler.studio →",
  },
  {
    id: "partner-steig",
    title: "steig",
    description:
      "AI transformation, tool adoption, and EU AI Act preparation for leadership teams.",
    image: "/img/steig.jpg",
    imageAlt: "steig logo",
    href: "https://steig.co?ref=luckenco",
    linkLabel: "Visit steig →",
  },
];

export const projects: WorkCardItem[] = [...currentlyInvolved, ...pastProjects];
