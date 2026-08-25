export const workCategories = [
  "All",
  "E-commerce",
  "Software",
  "Platforms",
  "Branding",
  "Mobile",
] as const;

export type WorkCategory = (typeof workCategories)[number];

export type WorkItem = {
  slug: string;
  title: string;
  /** Filter category — must be one of workCategories (excluding "All"). */
  category: Exclude<WorkCategory, "All">;
  /** Secondary descriptors shown under the title. */
  tags: string[];
  tech: string[];
  description: string;
  /** Slug in content/case-studies.ts, when a full case study exists. */
  caseStudy?: string;
  featured?: boolean;
  /**
   * Marks an unfilled slot. Placeholder cards render as a clearly-labelled
   * empty state rather than inventing a client project.
   */
  placeholder?: boolean;
};

export const work: WorkItem[] = [
  {
    slug: "root-lifestyle",
    title: "Root Lifestyle",
    category: "E-commerce",
    tags: ["D2C", "Shopify", "Commerce"],
    tech: ["Shopify", "Liquid", "Razorpay", "Shiprocket", "GA4"],
    description:
      "An Indian D2C luxury fragrance brand, built as a commerce system rather than a storefront — catalogue, payments, logistics, and post-purchase running as one connected operation.",
    caseStudy: "root-lifestyle",
    featured: true,
  },
  {
    slug: "add-project-1",
    title: "[Add project]",
    category: "Software",
    tags: ["[TBD]"],
    tech: [],
    description:
      "This slot is reserved for a confirmed client project. Add the record to content/work.ts and its case study to content/case-studies.ts.",
    caseStudy: "add-project",
    featured: true,
    placeholder: true,
  },
  {
    slug: "add-project-2",
    title: "[Add project]",
    category: "Platforms",
    tags: ["[TBD]"],
    tech: [],
    description:
      "This slot is reserved for a confirmed client project. Add the record to content/work.ts and its case study to content/case-studies.ts.",
    placeholder: true,
  },
];

export const featuredWork = work.filter((w) => w.featured);
