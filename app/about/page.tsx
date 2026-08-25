import type { Metadata } from "next";

import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { pillars } from "@/content/home";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "WoowSignal is a founder-led technology company building its own products alongside custom software, business platforms, and commerce systems for clients.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        title="A technology company that ships its own products."
        intro={site.tagline}
      />

      <Section label="The story" title="From client work to products." size="narrow">
        <Reveal className="space-y-6 text-base leading-[1.8] text-fg-muted sm:text-lg">
          <p>
            WoowSignal started the way most technology companies quietly do —
            building software for other people&rsquo;s businesses. Commerce work
            came first, and it taught us the part that most agencies never see:
            what happens to a system after launch, when real orders and real
            money are moving through it.
          </p>
          <p>
            That work is still with us, but it is no longer the whole of what we
            are. We build products of our own now, in markets we already
            understand — subscription commerce, delivery operations,
            conversational commerce, and the business systems underneath them.
            Owning and operating software changes the decisions you make when
            you build it for someone else.
          </p>
          <p className="text-fg">
            Today we describe ourselves plainly: a technology company that builds
            products, software, and commerce systems. E-commerce is one of the
            systems we build, not the ceiling on what we do.
          </p>
        </Reveal>
      </Section>

      {/* Editable placeholder: replace with the real founder bio and photo. */}
      <Section label="Founder" title="Founder-led, engineering-first.">
        <Reveal className="grid gap-8 border border-border bg-surface p-8 lg:grid-cols-[1fr_1.6fr] lg:gap-14 lg:p-12">
          <div>
            <div
              aria-hidden="true"
              className="dot-field aspect-square w-full max-w-56 border border-border"
            />
            <p className="mt-4 font-mono text-2xs tracking-[0.16em] text-fg-muted uppercase">
              [TBD — founder photo]
            </p>
          </div>

          <div className="space-y-5 text-base leading-[1.8] text-fg-muted">
            <p className="font-mono text-2xs tracking-[0.18em] text-accent uppercase">
              Editable placeholder
            </p>
            <p>
              WoowSignal is led by its founder, who has spent roughly a decade in
              software engineering across commerce, platforms, and business
              systems. The company grew out of that hands-on work rather than
              from a sales function, which is why engineering decisions are still
              made by people who will have to live with them.
            </p>
            <p className="text-fg">
              [TBD — replace this block with the founder&rsquo;s real bio: name,
              background, the specific journey from agency work to building
              products, and anything publicly verifiable. Nothing here should be
              invented.]
            </p>
          </div>
        </Reveal>
      </Section>

      <Section label="Values" title="How we work.">
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

      <Section
        label="Work with us"
        title="Let's build something."
        action={
          <ButtonLink href="/contact" size="large" withArrow>
            Start a Project
          </ButtonLink>
        }
      />
    </>
  );
}
