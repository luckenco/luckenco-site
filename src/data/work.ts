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

export const currentlyInvolved: WorkCardItem[] = [
  {
    id: "vienna-ai-company",
    title: "The Vienna AI Company",
    description:
      "On LISA, I cut average end-to-end call-system response latency by 70% and built agentic voice capabilities across LiveKit, Gemini, and ElevenLabs.",
    image: "/placeholder.jpg",
    imageAlt: "Placeholder icon for The Vienna AI Company card",
    href: "https://lisa.aicompany.at/",
    linkLabel: "Visit LISA →",
  },
  {
    id: "vertex",
    title: "VERTEX",
    description:
      "Building automation workflows for Vertex, a retail engineering company operating across physical and digital product experiences.",
    image: "/placeholder.jpg",
    imageAlt: "Placeholder icon for VERTEX card",
    href: "https://www.vertex.de/en/",
    linkLabel: "Visit Vertex →",
  },
  {
    id: "shapeid",
    title: "shapeID",
    description:
      "Building 3D body-scanning systems that turn mobile capture and scan data into measurement and fit workflows for apparel.",
    image: "/placeholder.jpg",
    imageAlt: "Placeholder icon for shapeID card",
    href: "https://shapeid.io/?ref=luckenco",
    linkLabel: "Visit shapeID →",
  },
  {
    id: "rsai",
    title: "rsai.dev",
    description:
      "Predictable development for unpredictable models. Let the compiler handle the chaos. Minimal Rust framework to interact with LLMs.",
    image: "/placeholder.jpg",
    imageAlt: "Placeholder icon for rsai.dev card",
    href: "https://rsai.dev?ref=luckenco",
    linkLabel: "View code →",
  },
];

export const pastProjects: WorkCardItem[] = [
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
      "Reduced the risk of 2-week regulatory shutdowns with a tamper-proof sterilization tracking system that enforced QM-compliant clinical workflows through NFC authentication.",
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
      "Lenge uses AI to recommend personalized habits based on your goals and energy levels. We then match you with an accountability partner who shares similar ambitions. Together, you embark on a 14-day challenge, supporting and motivating each other along the way.",
    href: "https://lenge.club?ref=luckenco",
    linkLabel: "Visit lenge →",
    inactive: true,
  },
];
