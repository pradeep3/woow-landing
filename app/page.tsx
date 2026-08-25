import Link from "next/link";

import { Hero } from "@/components/hero/Hero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ProductCard } from "@/components/cards/ProductCard";
import { WorkCard } from "@/components/cards/WorkCard";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { TechStackGrid } from "@/components/sections/TechStackGrid";
import { PixelRevealText } from "@/components/ui/PixelRevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Container } from "@/components/ui/Container";
import { pillars, whatWeBuild } from "@/content/home";
import { products } from "@/content/products";
import { featuredWork } from "@/content/work";
import { caseStudies } from "@/content/case-studies";
import { techFraming } from "@/content/technology";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* 2. What We Build */}
      <Section
        label="What We Build"
        title="Three kinds of system, one way of working."
        bordered={false}
      >
        <Reveal
          as="ul"
          stagger={0.1}
          className="grid gap-px border-t border-border md:grid-cols-3"
        >
          {whatWeBuild.map((item) => (
            <li
              key={item.title}
              className="theme-fade border-b border-border bg-surface p-8 md:border-r md:last:border-r-0"
            >
              <span
                aria-hidden="true"
                className="grid size-9 grid-cols-3 gap-1"
              >
                {Array.from({ length: 9 }).map((_, dot) => (
                  <span
                    key={dot}
                    className={
                      dot === 4
                        ? "size-1.5 rounded-full bg-accent"
                        : "size-1.5 rounded-full bg-dot-quiet"
                    }
                  />
                ))}
              </span>

              <h3 className="mt-7 text-lg font-semibold tracking-tight text-fg">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                {item.body}
              </p>
              <Link
                href={item.href}
                className="group mt-6 inline-flex items-center gap-2 text-sm text-fg transition-colors hover:text-accent"
              >
                {item.linkLabel}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </Reveal>
      </Section>

      {/* 3. Our Products */}
      <Section
        label="Our Products"
        title="We don't just build software for clients."
        intro="We build products of our own — designed, shipped, and operated by us, in markets we understand."
        action={
          <ButtonLink href="/products" variant="secondary" withArrow>
            Explore Products
          </ButtonLink>
        }
      >
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

      {/* 4. Selected Work */}
      <Section
        label="Selected Work"
        title="Systems we built for other people's businesses."
        action={
          <ButtonLink href="/work" variant="secondary" withArrow>
            View All Work
          </ButtonLink>
        }
      >
        <Reveal as="ul" stagger={0.1} className="grid gap-6 lg:grid-cols-2">
          {featuredWork.map((item) => (
            <li key={item.slug} className="flex">
              <WorkCard item={item} className="w-full" />
            </li>
          ))}
        </Reveal>
      </Section>

      {/* 5. Process */}
      <Section
        label="Process"
        title="From idea to production."
        intro="Six stages, run in the open. You see working software long before launch day."
        size="wide"
      >
        <ProcessTimeline />
      </Section>

      {/* 6. Case Studies preview */}
      <Section
        label="Case Studies"
        title="The problem, and what changed."
        action={
          <ButtonLink href="/work" variant="secondary" withArrow>
            All Case Studies
          </ButtonLink>
        }
      >
        <Reveal as="ul" stagger={0.1} className="grid gap-6 lg:grid-cols-2">
          {caseStudies.map((study) => (
            <li key={study.slug} className="flex">
              <Link
                href={`/case-studies/${study.slug}`}
                className="group theme-fade flex w-full flex-col border border-border bg-surface p-8 transition-colors duration-200 hover:border-fg-muted"
              >
                <p className="font-mono text-2xs tracking-[0.16em] text-accent uppercase">
                  {study.category}
                </p>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-fg">
                  {study.title}
                </h3>

                <dl className="mt-7 grid gap-5 border-t border-border pt-6">
                  <div>
                    <dt className="font-mono text-2xs tracking-[0.16em] text-fg-muted uppercase">
                      Challenge
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-fg-muted">
                      {study.preview.challenge}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-2xs tracking-[0.16em] text-accent uppercase">
                      Outcome
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-fg">
                      {study.preview.outcome}
                    </dd>
                  </div>
                </dl>

                <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm text-fg transition-colors group-hover:text-accent">
                  Read case study
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </Reveal>
      </Section>

      {/* 7. Technology */}
      <Section
        label="Technology"
        title="Built on modern technology."
        intro={techFraming}
        action={
          <ButtonLink href="/technology" variant="secondary" withArrow>
            Our Stack
          </ButtonLink>
        }
        size="wide"
      >
        <TechStackGrid variant="strip" />
      </Section>

      {/* 8. Why WoowSignal */}
      <Section label="Why WoowSignal" title="What you get that you would not from an agency.">
        <Reveal
          as="ul"
          stagger={0.08}
          className="grid gap-px border-t border-border sm:grid-cols-2 lg:grid-cols-4"
        >
          {pillars.map((pillar) => (
            <li
              key={pillar.title}
              className="theme-fade border-b border-border bg-surface p-7 lg:border-r lg:last:border-r-0"
            >
              <span aria-hidden="true" className="ping-dot" />
              <h3 className="mt-6 text-base font-semibold tracking-tight text-fg">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                {pillar.body}
              </p>
            </li>
          ))}
        </Reveal>
      </Section>

      {/* 9. Closing CTA */}
      <section className="relative isolate overflow-hidden border-t border-border py-24 lg:py-32">
        <div
          aria-hidden="true"
          className="dot-field dot-field-fade pointer-events-none absolute inset-0 opacity-60"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 size-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--accent-soft) 0%, transparent 65%)",
          }}
        />

        <Container className="relative text-center">
          <Reveal className="flex justify-center">
            <SectionLabel>Start here</SectionLabel>
          </Reveal>

          <PixelRevealText
            as="h2"
            text="Let's build something."
            className="mt-6 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
          />

          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-base text-fg-muted sm:text-lg">
              Tell us what you are building and what is in the way. We will tell
              you plainly whether we are the right team for it.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-9 flex justify-center">
            <ButtonLink href="/contact" size="large" withArrow>
              Start a Project
            </ButtonLink>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
