import { Container } from "@/components/ui/Container";
import { PixelRevealText } from "@/components/ui/PixelRevealText";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Shared masthead for every route below the homepage. The dot field returns as
 * a flat texture here rather than a second WebGL scene — the signal motif
 * recurs, but only the homepage pays for a renderer.
 */
export function PageHero({
  label,
  title,
  intro,
  meta,
  children,
}: {
  label: string;
  title: string;
  intro?: string;
  /** Small tracked items shown under the intro, e.g. status or category. */
  meta?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div
        aria-hidden="true"
        className="dot-field dot-field-fade pointer-events-none absolute inset-0 opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-[62%] size-[34rem] -translate-y-1/3 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--accent-soft) 0%, transparent 65%)",
        }}
      />

      <Container className="relative">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel>{label}</SectionLabel>
          </Reveal>

          <PixelRevealText
            as="h1"
            trigger="load"
            delay={0.15}
            text={title}
            className="mt-6 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl"
          />

          {intro ? (
            <Reveal delay={0.35}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
                {intro}
              </p>
            </Reveal>
          ) : null}

          {meta ? (
            <Reveal delay={0.45} className="mt-8 flex flex-wrap gap-3">
              {meta}
            </Reveal>
          ) : null}

          {children ? (
            <Reveal delay={0.5} className="mt-9 flex flex-wrap gap-3">
              {children}
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
