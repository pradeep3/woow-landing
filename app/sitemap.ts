import type { MetadataRoute } from "next";

import { site } from "@/content/site";
import { products } from "@/content/products";
import { caseStudies } from "@/content/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/products",
    "/solutions",
    "/work",
    "/technology",
    "/about",
    "/contact",
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified: now,
      priority: route === "" ? 1 : 0.8,
    })),
    ...products.map((product) => ({
      url: `${site.url}/products/${product.slug}`,
      lastModified: now,
      priority: 0.7,
    })),
    ...caseStudies
      .filter((study) => !study.placeholder)
      .map((study) => ({
        url: `${site.url}/case-studies/${study.slug}`,
        lastModified: now,
        priority: 0.7,
      })),
  ];
}
