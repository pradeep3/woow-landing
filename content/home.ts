export const hero = {
  headline: "Technology for businesses that want to move faster.",
  subhead:
    "We design and build software, digital products, and commerce platforms for businesses ready to grow.",
  primaryCta: { label: "Explore Our Work", href: "/work" },
  secondaryCta: { label: "Build With Us", href: "/contact" },
  /** Anchored into the 3D signal field; each links to its destination. */
  labels: [
    { text: "PRODUCTS", href: "/products" },
    { text: "PLATFORMS", href: "/solutions#digital-product" },
    { text: "SOFTWARE", href: "/solutions#business-software" },
    { text: "COMMERCE", href: "/solutions#ecommerce" },
  ],
} as const;

export const whatWeBuild = [
  {
    title: "Products",
    body: "Software we own and operate ourselves, built for real markets rather than as demos.",
    href: "/products",
    linkLabel: "See our products",
  },
  {
    title: "Business Software",
    body: "CRM, ERP, inventory, and operations systems shaped around how a business actually runs.",
    href: "/solutions#business-software",
    linkLabel: "Business software",
  },
  {
    title: "E-Commerce",
    body: "Storefronts, headless commerce, and the payment and logistics systems underneath them.",
    href: "/solutions#ecommerce",
    linkLabel: "Commerce systems",
  },
] as const;

export type ProcessStep = {
  index: string;
  title: string;
  body: string;
};

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Discover",
    body: "We work out what the business actually needs before anyone writes a line of code.",
  },
  {
    index: "02",
    title: "Design",
    body: "Interface, data model, and architecture decided together, not one after the other.",
  },
  {
    index: "03",
    title: "Build",
    body: "Shipped in working increments you can use, rather than a single reveal at the end.",
  },
  {
    index: "04",
    title: "Integrate",
    body: "Payments, logistics, messaging, and internal systems wired in and tested against reality.",
  },
  {
    index: "05",
    title: "Launch",
    body: "Deployed with monitoring, analytics, and a rollback path in place from day one.",
  },
  {
    index: "06",
    title: "Scale",
    body: "We stay on after launch — performance, iteration, and the next thing the business needs.",
  },
];

export const pillars = [
  {
    title: "Product thinking",
    body: "We build and operate our own products, so we make the decisions of an owner rather than a vendor closing a ticket.",
  },
  {
    title: "Engineering",
    body: "Systems designed to be maintained. The architecture is chosen for the load and the team that has to live with it.",
  },
  {
    title: "Business understanding",
    body: "We start from margin, operations, and customers — software that ignores those is just expensive furniture.",
  },
  {
    title: "Long-term partnership",
    body: "Most of our work is with businesses we have already shipped for. We stay past launch.",
  },
] as const;
