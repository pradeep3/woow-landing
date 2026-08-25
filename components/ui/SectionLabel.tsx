import { cn } from "@/lib/cn";

/**
 * The recurring micro-pattern: a small uppercase tracked label in the accent
 * colour, preceded by the dot-signal mark. Used to head every section.
 */
export function SectionLabel({
  children,
  className,
  withDot = true,
}: {
  children: React.ReactNode;
  className?: string;
  withDot?: boolean;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 font-mono text-2xs tracking-[0.18em] text-accent uppercase",
        className,
      )}
    >
      {withDot ? (
        <span
          aria-hidden="true"
          className="size-[5px] shrink-0 rounded-full bg-accent"
        />
      ) : null}
      {children}
    </p>
  );
}
