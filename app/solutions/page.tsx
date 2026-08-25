import type { Metadata } from "next";

import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SolutionBlock } from "@/components/sections/SolutionBlock";
import { ButtonLink } from "@/components/ui/Button";
import { solutions } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Digital products, business software, e-commerce, integrations, and automation — organised around the problem you have, not the technology we use.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        label="Solutions"
        title="Start with the problem, not the technology."
        intro="Five ways businesses work with us. Commerce is one of the systems we build — it sits alongside product, software, integration, and automation rather than defining us."
      />

      <Container className="pb-8">
        {/* Jump list: doubles as the index for the sections below and as the
            seam along which these become sub-pages later. */}
        <nav aria-label="Solutions" className="border-y border-border">
          <ul className="grid gap-px sm:grid-cols-2 lg:grid-cols-5">
            {solutions.map((solution) => (
              <li key={solution.slug}>
                <a
                  href={`#${solution.slug}`}
                  className="group flex h-full flex-col gap-2 border-b border-border py-5 pr-4 transition-colors hover:bg-[var(--shade)] sm:border-b-0 lg:px-4 lg:first:pl-0"
                >
                  <span className="font-mono text-2xs tracking-[0.16em] text-accent">
                    {solution.index}
                  </span>
                  <span className="text-sm leading-snug font-medium text-fg transition-colors group-hover:text-accent">
                    {solution.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {solutions.map((solution) => (
          <SolutionBlock key={solution.slug} solution={solution} />
        ))}
      </Container>

      <Section
        label="Next step"
        title="Tell us what you're trying to build."
        intro="A short conversation is usually enough to tell whether this is a fit. If it isn't, we will say so."
        action={
          <ButtonLink href="/contact" size="large" withArrow>
            Start a Project
          </ButtonLink>
        }
      />
    </>
  );
}
