export type CaseStudy = {
  slug: string;
  title: string;
  /** One-line positioning under the title. */
  subtitle: string;
  category: string;
  /** Short pairing used on preview cards: the problem and the result. */
  preview: { challenge: string; outcome: string };
  challenge: string;
  approach: string;
  technology: { group: string; items: string[] }[];
  solution: string;
  /**
   * Qualitative unless a real number is confirmed. Anything numeric that has
   * not been verified with the client stays marked [TBD].
   */
  outcome: string[];
  placeholder?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "root-lifestyle",
    title: "Root Lifestyle",
    subtitle: "Indian D2C luxury fragrance brand",
    category: "D2C / Shopify / Commerce",
    preview: {
      challenge:
        "A premium fragrance brand whose storefront, payments, and logistics ran as three separate systems held together manually.",
      outcome:
        "One connected commerce operation, with orders moving from checkout to dispatch without a manual re-entry step.",
    },
    challenge:
      "Root Lifestyle sells fragrance in a category where the buying decision is largely emotional and the packaging, photography, and pacing of the store carry most of the weight. The brand had the product and the identity, but the commerce layer underneath it was not built to match: the storefront, the payment flow, and the shipping process each lived in their own system, and someone had to move information between them by hand. Every order was a small piece of admin, which meant the operation got harder in exactly the moments it was doing well.",
    approach:
      "We treated the store as infrastructure, not a theme install. That started with the catalogue model — how variants, collections, and product storytelling should be structured so the merchandising team can change the storefront without an engineer. From there we rebuilt the purchase path around the way a fragrance customer actually shops: discovery, a considered product page with room for the brand's photography, and a checkout that does not break the tone the rest of the site sets. The operational side was designed at the same time rather than bolted on afterwards, so payments, shipping, and post-purchase communication were part of the same build.",
    technology: [
      { group: "Commerce", items: ["Shopify", "Liquid", "Shopify Admin API"] },
      { group: "Payments", items: ["Razorpay", "UPI", "Cards", "Cash on delivery"] },
      { group: "Logistics", items: ["Shiprocket", "Automated tracking notifications"] },
      { group: "Marketing & analytics", items: ["GA4", "Meta Pixel", "Email automation"] },
    ],
    solution:
      "The storefront runs on Shopify with a custom theme built for the brand rather than adapted from a template, giving the team direct control over merchandising without touching code. Payments go through Razorpay, covering UPI, cards, and cash on delivery — the mix Indian D2C buyers actually use — with the order record updated from the gateway rather than reconciled by hand. Shipping is wired to Shiprocket, so a paid order becomes a shipment automatically and the customer receives tracking updates without anyone sending them. Analytics and marketing tooling were instrumented at build time, which means the funnel was measurable from the first day of trading instead of being retrofitted once questions came up.",
    outcome: [
      "Orders now move from checkout to dispatch without manual re-entry, removing the per-order admin that previously scaled with volume.",
      "The merchandising team updates collections, products, and campaigns directly, with no engineering dependency for routine changes.",
      "Payment coverage spans UPI, cards, and cash on delivery, matching how the brand's customers actually pay.",
      "Post-purchase tracking notifications go out automatically, which cut the volume of \"where is my order\" enquiries.",
      "Conversion and revenue impact: [TBD — pending confirmed figures from the client].",
    ],
  },
  {
    slug: "add-project",
    title: "[Add project]",
    subtitle: "Reserved case study slot",
    category: "[TBD]",
    preview: {
      challenge: "Reserved for a confirmed client project.",
      outcome:
        "Add the record to content/case-studies.ts using the Challenge / Approach / Technology / Solution / Outcome template.",
    },
    challenge:
      "This is a deliberately empty slot rather than an invented project. Replace it with a real engagement once the details are confirmed with the client.",
    approach:
      "Follow the same five-part structure used by every case study on this site: Challenge, Approach, Technology, Solution, Outcome.",
    technology: [{ group: "Stack", items: ["[TBD]"] }],
    solution:
      "Describe the architecture and the build in plain language — what was assembled, and why those pieces.",
    outcome: [
      "Use real numbers where the client has confirmed them; keep the rest qualitative rather than estimated.",
    ],
    placeholder: true,
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export const publishedCaseStudies = caseStudies.filter((c) => !c.placeholder);
