import { techStack } from "@/content/technology";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/**
 * `full` is the /technology page treatment, with the reasoning behind each
 * layer. `strip` is the condensed homepage version — names only.
 */
export function TechStackGrid({
  variant = "full",
  className,
}: {
  variant?: "full" | "strip";
  className?: string;
}) {
  if (variant === "strip") {
    return (
      <Reveal
        as="ul"
        stagger={0.06}
        className={cn("grid gap-px border-t border-border sm:grid-cols-2 lg:grid-cols-5", className)}
      >
        {techStack.map((group) => (
          <li
            key={group.group}
            className="theme-fade border-b border-border bg-surface p-6 lg:border-r lg:last:border-r-0"
          >
            <h3 className="font-mono text-2xs tracking-[0.18em] text-accent uppercase">
              {group.group}
            </h3>
            <ul className="mt-4 space-y-2">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center gap-2.5 text-sm text-fg"
                >
                  <span
                    aria-hidden="true"
                    className="size-[4px] shrink-0 rounded-full bg-dot-quiet"
                  />
                  {item.name}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </Reveal>
    );
  }

  return (
    <div className={cn("border-t border-border", className)}>
      {techStack.map((group) => (
        <Reveal
          key={group.group}
          className="grid gap-6 border-b border-border py-10 lg:grid-cols-[16rem_1fr] lg:gap-16"
        >
          <div>
            <h3 className="font-mono text-2xs tracking-[0.18em] text-accent uppercase">
              {group.group}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">
              {group.rationale}
            </p>
          </div>

          <ul className="grid gap-px self-start sm:grid-cols-2 xl:grid-cols-3">
            {group.items.map((item) => (
              <li
                key={item.name}
                className="theme-fade border border-border bg-surface p-5"
              >
                <p className="text-base font-medium tracking-tight text-fg">
                  {item.name}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-fg-muted">
                  {item.note}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}
