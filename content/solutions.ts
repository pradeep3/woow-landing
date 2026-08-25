export type Solution = {
  slug: string;
  index: string;
  title: string;
  /** The problem framing — what a visitor came here with. */
  description: string;
  capabilities: string[];
};

/**
 * Solutions render as sections on a single /solutions page for v1. Each entry
 * is already a complete, self-contained record, so splitting these into
 * /solutions/[slug] pages later is a routing change, not a content rewrite.
 */
export const solutions: Solution[] = [
  {
    slug: "digital-product",
    index: "01",
    title: "Build a Digital Product",
    description:
      "You have a product idea and need a team that can take it from a rough shape to something real people use — and keep it running once they do.",
    capabilities: [
      "Mobile applications for iOS and Android",
      "SaaS platforms with multi-tenant architecture",
      "Web applications and customer portals",
      "Product discovery, scoping, and technical architecture",
      "Ongoing iteration after launch",
    ],
  },
  {
    slug: "business-software",
    index: "02",
    title: "Build Business Software",
    description:
      "Your operation has outgrown spreadsheets and off-the-shelf tools. You need software shaped around how your business actually works.",
    capabilities: [
      "CRM and customer management systems",
      "ERP, inventory, and warehouse systems",
      "Operations dashboards and internal tools",
      "Role-based access and multi-branch structures",
      "Migration from spreadsheets and legacy systems",
    ],
  },
  {
    slug: "ecommerce",
    index: "03",
    title: "Build an E-Commerce Business",
    description:
      "Commerce is one of the systems we build. We have shipped D2C storefronts that carry real revenue, and we treat the store as infrastructure rather than a theme install.",
    capabilities: [
      "Shopify builds, custom themes, and private apps",
      "Headless commerce with a custom storefront",
      "Custom commerce platforms where Shopify is the wrong fit",
      "Marketplace and multi-vendor systems",
      "Checkout, subscription, and post-purchase flows",
    ],
  },
  {
    slug: "connect",
    index: "04",
    title: "Connect Your Business",
    description:
      "The tools are already in place; they just do not talk to each other. Every handoff between them is currently a person copying data.",
    capabilities: [
      "Payment gateway integration and reconciliation",
      "Shipping, logistics, and courier integrations",
      "WhatsApp and messaging channel integration",
      "Third-party API integration and custom API design",
      "Data sync between commerce, finance, and operations",
    ],
  },
  {
    slug: "automate",
    index: "05",
    title: "Automate Your Operations",
    description:
      "The work is repetitive and rule-based, and it is consuming hours that should be going somewhere else.",
    capabilities: [
      "Workflow automation across systems",
      "Transactional and operational notifications",
      "Scheduled jobs, data sync, and reconciliation",
      "Reporting pipelines and automated exports",
      "Alerting when something needs a human",
    ],
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
