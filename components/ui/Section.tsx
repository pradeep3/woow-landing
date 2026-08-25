import { Container } from "@/components/ui/Container";
import { PixelRevealText } from "@/components/ui/PixelRevealText";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/cn";

export function Section({
  id,
  label,
  title,
  intro,
  action,
  children,
  className,
  bordered = true,
  size = "default",
}: {
  id?: string;
  label?: string;
  title?: string;
  intro?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  bordered?: boolean;
  size?: "default" | "narrow" | "wide";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 lg:py-28",
        bordered && "border-t border-border",
        // Anchored sections must clear the fixed header when jumped to.
        id && "scroll-mt-24",
        className,
      )}
    >
      <Container size={size}>
        {label || title || intro ? (
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              {label ? (
                <Reveal>
                  <SectionLabel>{label}</SectionLabel>
                </Reveal>
              ) : null}
              {title ? (
                <PixelRevealText
                  as="h2"
                  text={title}
                  className="mt-5 text-xl font-semibold tracking-[-0.025em] sm:text-2xl"
                />
              ) : null}
              {intro ? (
                <Reveal delay={0.08}>
                  <p className="mt-5 text-base leading-relaxed text-fg-muted sm:text-lg">
                    {intro}
                  </p>
                </Reveal>
              ) : null}
            </div>
            {action ? (
              <Reveal delay={0.12} className="shrink-0">
                {action}
              </Reveal>
            ) : null}
          </div>
        ) : null}

        {children ? (
          <div className={cn(label || title || intro ? "mt-14" : undefined)}>
            {children}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
