export type ProductStatus = "LIVE" | "IN DEVELOPMENT" | "BETA" | "COMING SOON";

export type Product = {
  slug: string;
  name: string;
  oneLiner: string;
  status: ProductStatus;
  /** Short category line used on cards and the detail hero. */
  category: string;
  /** The problem the product exists to solve. */
  problem: string;
  /** How the product answers that problem. */
  approach: string;
  features: { title: string; body: string }[];
  /** Public URL, only where the product is actually reachable. */
  liveUrl?: string;
};

export const products: Product[] = [
  {
    slug: "teaboy",
    name: "TeaBoy",
    oneLiner: "Tea & beverage subscription and ordering platform",
    status: "LIVE",
    category: "Subscription commerce",
    problem:
      "Beverage brands and neighbourhood suppliers run on recurring orders, but the tools they have are built for one-off checkouts. Repeat customers get treated as new ones every single time, and the operator ends up managing the actual schedule in a notebook or a spreadsheet.",
    approach:
      "TeaBoy treats the subscription as the primary object rather than an add-on to a cart. Customers set a cadence, pause it, skip a delivery, or change a blend without contacting anyone, and the operator sees one clear run sheet for the day.",
    features: [
      {
        title: "Recurring order engine",
        body: "Daily, alternate-day, weekly, and custom cadences, with skip, pause, and resume handled by the customer.",
      },
      {
        title: "Catalogue and variants",
        body: "Blends, pack sizes, and pricing tiers managed in one place and reflected instantly across every active plan.",
      },
      {
        title: "Delivery run sheets",
        body: "Each day's orders roll up into a sequenced list for the person actually making the deliveries.",
      },
      {
        title: "Payments and billing",
        body: "Recurring collection with retry handling, so a failed charge does not silently drop a customer.",
      },
      {
        title: "Customer self-service",
        body: "Order history, upcoming deliveries, and plan changes without a support conversation.",
      },
    ],
  },
  {
    slug: "milkman",
    name: "MilkMan",
    oneLiner: "Milk subscription and delivery management platform",
    status: "IN DEVELOPMENT",
    category: "Delivery operations",
    problem:
      "Daily milk delivery is one of the oldest subscription businesses there is, and it is still mostly run on memory and paper. Route changes, holiday pauses, and month-end billing all become manual reconciliation work.",
    approach:
      "MilkMan models the route, not just the order. Households sit on a route, routes belong to a delivery partner, and the day's plan is generated from live subscription state rather than reconstructed by hand each morning.",
    features: [
      {
        title: "Route and territory management",
        body: "Group households into routes, assign delivery partners, and re-sequence a stop without rebuilding the round.",
      },
      {
        title: "Daily delivery sheets",
        body: "Generated automatically from active subscriptions, including pauses and one-off quantity changes.",
      },
      {
        title: "Prepaid wallet and monthly billing",
        body: "Balance-based accounts with a statement that matches what was actually delivered.",
      },
      {
        title: "Vacation pause",
        body: "Customers pause for a date range from their phone; the route sheet updates without an operator touching it.",
      },
    ],
  },
  {
    slug: "woowchat",
    name: "WoowChat",
    oneLiner: "Communication meets commerce platform",
    status: "BETA",
    category: "Conversational commerce",
    problem:
      "A large share of real buying decisions happen in a chat thread — a product question, a size check, a follow-up on a delivery. That conversation almost always sits in a different system from the order, so context is lost at exactly the moment it matters.",
    approach:
      "WoowChat puts the conversation and the commerce record in the same surface. The person answering a message can see the customer's orders, send a payable link, and close the loop without switching tools.",
    features: [
      {
        title: "Unified inbox",
        body: "Customer conversations from messaging channels in one queue, assigned and tracked like real work.",
      },
      {
        title: "Order context inline",
        body: "Past orders, delivery status, and account history sit beside the thread instead of in another tab.",
      },
      {
        title: "Sell inside the thread",
        body: "Share a product, generate a payment link, and confirm an order without leaving the conversation.",
      },
      {
        title: "Automated replies and routing",
        body: "Common questions answered instantly; anything genuinely new is escalated to a person.",
      },
    ],
  },
  {
    slug: "crm",
    name: "Business CRM",
    oneLiner: "Customer management built for modern businesses",
    status: "COMING SOON",
    category: "Business software",
    problem:
      "Most CRMs are built for large sales organisations and then sold to businesses that do not look anything like one. Teams end up paying for pipeline theatre they never use while the fields they actually need are missing.",
    approach:
      "A CRM shaped around how a growing business really tracks a customer: the relationship, the commitments made, and what has to happen next — without a forty-field opportunity form.",
    features: [
      {
        title: "Contacts and companies",
        body: "One record per relationship, with the history attached rather than scattered across inboxes.",
      },
      {
        title: "Pipeline that fits the business",
        body: "Stages you define, not a template borrowed from enterprise software.",
      },
      {
        title: "Tasks and follow-ups",
        body: "The next action is a first-class field, so nothing depends on somebody remembering.",
      },
      {
        title: "Commerce-aware",
        body: "Designed to read from the order systems we already build, so a customer record includes what they bought.",
      },
    ],
  },
  {
    slug: "erp",
    name: "Business ERP",
    oneLiner: "Operations, inventory, and commerce in one system",
    status: "COMING SOON",
    category: "Business software",
    problem:
      "Once a business runs a storefront, a warehouse, and a purchase cycle, the numbers start disagreeing with each other. Stock says one thing, the store says another, and someone spends the first hour of every day reconciling them.",
    approach:
      "One operational record for inventory, purchasing, and fulfilment, connected directly to the commerce channels rather than synced overnight and hoped for.",
    features: [
      {
        title: "Inventory across locations",
        body: "Real stock positions per location, with movements recorded rather than inferred.",
      },
      {
        title: "Purchasing and suppliers",
        body: "Purchase orders, receiving, and supplier records tied to the same stock ledger.",
      },
      {
        title: "Order fulfilment",
        body: "Commerce orders flow into picking and dispatch without a manual re-entry step.",
      },
      {
        title: "Operational reporting",
        body: "Margin, movement, and stock-cover reporting built from the live ledger.",
      },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
