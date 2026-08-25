export type TechGroup = {
  group: string;
  /** Why this layer is chosen the way it is — keeps the page from being a logo wall. */
  rationale: string;
  items: { name: string; note: string }[];
};

export const techFraming =
  "We choose technology based on the product, scale, and business requirements — not trends.";

export const techStack: TechGroup[] = [
  {
    group: "Frontend",
    rationale:
      "Interfaces that stay fast on the devices and networks the customer actually has, not the ones in the office.",
    items: [
      { name: "Next.js", note: "Server-rendered web apps and marketing surfaces" },
      { name: "React", note: "Application UI and design systems" },
      { name: "Flutter", note: "Cross-platform mobile from one codebase" },
    ],
  },
  {
    group: "Backend",
    rationale:
      "Chosen per workload — a subscription engine, a chat platform, and a storefront API do not want the same runtime.",
    items: [
      { name: "Node.js", note: "Service APIs and real-time workloads" },
      { name: "Laravel", note: "Business systems with heavy domain logic" },
      { name: "Express", note: "Lightweight services and integration layers" },
      { name: "Phoenix", note: "High-concurrency and messaging workloads" },
    ],
  },
  {
    group: "Cloud",
    rationale:
      "Infrastructure that a small team can actually operate, with deployment that is boring on purpose.",
    items: [
      { name: "AWS", note: "Core compute, storage, and managed services" },
      { name: "Cloudflare", note: "Edge delivery, DNS, and protection" },
      { name: "Docker", note: "Reproducible builds across environments" },
    ],
  },
  {
    group: "Data",
    rationale:
      "Relational by default. We reach for anything else only when the shape of the data genuinely calls for it.",
    items: [
      { name: "PostgreSQL", note: "Transactional systems of record" },
      { name: "MongoDB", note: "Document-shaped and event-heavy data" },
      { name: "Supabase", note: "Fast path to auth, storage, and Postgres" },
    ],
  },
  {
    group: "Commerce",
    rationale:
      "Commerce is one of the systems we build, and this is the layer that carries real money.",
    items: [
      { name: "Shopify", note: "Storefronts, custom themes, private apps" },
      { name: "Razorpay", note: "Payments, UPI, and recurring billing" },
      { name: "Shiprocket", note: "Shipping, tracking, and fulfilment" },
    ],
  },
];
