import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { StatusTag } from "@/components/ui/StatusTag";
import { ProductCard } from "@/components/cards/ProductCard";
import { getProduct, products } from "@/content/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(
  props: PageProps<"/products/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);

  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: `${product.oneLiner}. ${product.status} — a WoowSignal product.`,
  };
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);

  if (!product) notFound();

  const others = products.filter((item) => item.slug !== product.slug).slice(0, 3);

  return (
    <>
      <PageHero
        label={product.category}
        title={product.name}
        intro={product.oneLiner}
        meta={
          <>
            <StatusTag status={product.status} />
            <span className="inline-flex items-center border border-border px-2.5 py-1 font-mono text-2xs tracking-[0.14em] text-fg-muted uppercase">
              WoowSignal product
            </span>
          </>
        }
      >
        {product.liveUrl ? (
          <ButtonLink href={product.liveUrl} withArrow>
            Visit {product.name}
          </ButtonLink>
        ) : null}
        <ButtonLink
          href="/contact"
          variant={product.liveUrl ? "secondary" : "primary"}
          withArrow
        >
          {product.status === "LIVE" ? "Talk to us" : "Request early access"}
        </ButtonLink>
      </PageHero>

      <Section label="The problem" title="What it solves" size="narrow">
        <Reveal className="space-y-6">
          <p className="text-base leading-[1.8] text-fg-muted sm:text-lg">
            {product.problem}
          </p>
          <p className="text-base leading-[1.8] text-fg sm:text-lg">
            {product.approach}
          </p>
        </Reveal>
      </Section>

      <Section label="Capabilities" title="Key features">
        <Reveal
          as="ul"
          stagger={0.07}
          className="grid gap-px border-t border-border sm:grid-cols-2 lg:grid-cols-3"
        >
          {product.features.map((feature) => (
            <li
              key={feature.title}
              className="theme-fade border-b border-border bg-surface p-7"
            >
              <span
                aria-hidden="true"
                className="size-[5px] rounded-full bg-accent"
              />
              <h3 className="mt-6 text-base font-semibold tracking-tight text-fg">
                {feature.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
                {feature.body}
              </p>
            </li>
          ))}
        </Reveal>
      </Section>

      <Section
        label="More products"
        title="Everything else we're building."
        action={
          <ButtonLink href="/products" variant="secondary" withArrow>
            All Products
          </ButtonLink>
        }
      >
        <Reveal
          as="ul"
          stagger={0.08}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {others.map((item) => (
            <li key={item.slug} className="flex">
              <ProductCard product={item} className="w-full" />
            </li>
          ))}
        </Reveal>
      </Section>
    </>
  );
}
