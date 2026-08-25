import { HeroSignalField } from "@/components/hero/HeroSignalField";
import { PixelRevealText } from "@/components/ui/PixelRevealText";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Container } from "@/components/ui/Container";
import { hero } from "@/content/home";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[88svh] items-center overflow-hidden pt-24 pb-20 lg:min-h-[92svh] lg:pt-28">
      <HeroSignalField />

      <Container size="wide" className="relative z-10">
        <div className="max-w-2xl">
          <Reveal delay={0.1}>
            <SectionLabel>WoowSignal</SectionLabel>
          </Reveal>

          <PixelRevealText
            as="h1"
            trigger="load"
            delay={0.25}
            text={hero.headline}
            className="mt-6 text-xl font-semibold tracking-[-0.03em] sm:text-2xl lg:text-3xl xl:text-4xl"
          />

          <Reveal delay={0.55}>
            <p className="mt-6 max-w-xl text-base text-fg-muted sm:text-lg">
              {hero.subhead}
            </p>
          </Reveal>

          <Reveal delay={0.7} className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={hero.primaryCta.href} size="large" withArrow>
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={hero.secondaryCta.href}
              variant="secondary"
              size="large"
              withArrow
            >
              {hero.secondaryCta.label}
            </ButtonLink>
          </Reveal>
        </div>
      </Container>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-10 flex justify-center pb-6"
      >
        <span className="font-mono text-2xs tracking-[0.24em] text-fg-muted uppercase">
          Scroll
        </span>
      </div>
    </section>
  );
}
