export const site = {
  name: "WoowSignal",
  domain: "woowsignal.com",
  url: "https://woowsignal.com",
  tagline: "We build software products, business platforms, and commerce technology.",
  shortTagline: "Products, platforms, and commerce technology.",
  description:
    "WoowSignal designs and builds software, digital products, and commerce platforms for businesses ready to grow.",
  email: "hello@woowsignal.com",
} as const;

export type NavChild = {
  label: string;
  href: string;
  description: string;
  /** Small uppercase tag shown beside the item in the mega-menu. */
  tag?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
  /** Copy shown in the left rail of the mega-menu. */
  menuIntro?: string;
};

export const nav: NavItem[] = [
  {
    label: "Products",
    href: "/products",
    menuIntro: "Software we're building for the real world.",
    children: [
      {
        label: "TeaBoy",
        href: "/products/teaboy",
        description: "Tea & beverage subscription and ordering platform",
        tag: "LIVE",
      },
      {
        label: "MilkMan",
        href: "/products/milkman",
        description: "Milk subscription and delivery management",
        tag: "IN DEVELOPMENT",
      },
      {
        label: "WoowChat",
        href: "/products/woowchat",
        description: "Communication meets commerce",
        tag: "BETA",
      },
      {
        label: "Business CRM",
        href: "/products/crm",
        description: "Customer management for modern businesses",
        tag: "COMING SOON",
      },
      {
        label: "Business ERP",
        href: "/products/erp",
        description: "Operations, inventory, and commerce in one system",
        tag: "COMING SOON",
      },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    menuIntro: "We organise around problems, not technologies.",
    children: [
      {
        label: "Build a Digital Product",
        href: "/solutions#digital-product",
        description: "Mobile apps, SaaS, platforms",
      },
      {
        label: "Build Business Software",
        href: "/solutions#business-software",
        description: "CRM, ERP, inventory, operations",
      },
      {
        label: "Build an E-Commerce Business",
        href: "/solutions#ecommerce",
        description: "Shopify, custom commerce, headless",
      },
      {
        label: "Connect Your Business",
        href: "/solutions#connect",
        description: "APIs, payments, shipping, WhatsApp",
      },
      {
        label: "Automate Your Operations",
        href: "/solutions#automate",
        description: "Workflows, notifications, data sync",
      },
    ],
  },
  { label: "Work", href: "/work" },
  { label: "Technology", href: "/technology" },
  { label: "About", href: "/about" },
];

export const footerColumns = [
  {
    title: "Products",
    links: [
      { label: "TeaBoy", href: "/products/teaboy" },
      { label: "MilkMan", href: "/products/milkman" },
      { label: "WoowChat", href: "/products/woowchat" },
      { label: "Business CRM", href: "/products/crm" },
      { label: "Business ERP", href: "/products/erp" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Solutions", href: "/solutions" },
      { label: "Technology", href: "/technology" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;
