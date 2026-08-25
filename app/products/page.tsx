import type { Metadata } from "next";

import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/cards/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { products } from "@/content/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Software WoowSignal is building for the real world — subscription commerce, delivery operations, conversational commerce, CRM, and ERP.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        label="Products"
        title="Software we're building for the real world."
        intro="We are a technology company with products of our own. Each one started with a problem we watched a business actually have."
      />

      <Section bordered={false} className="pt-0">
        <Reveal
          as="ul"
          stagger={0.08}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((product) => (
            <li key={product.slug} className="flex">
              <ProductCard product={product} className="w-full" />
            </li>
          ))}
        </Reveal>
      </Section>

      <Section
        label="Custom builds"
        title="Need something that isn't on this list?"
        intro="Most of our work is custom. If none of these fit, the same team builds the system you actually need."
        action={
          <ButtonLink href="/contact" withArrow>
            Start a Project
          </ButtonLink>
        }
      />
    </>
  );
}
