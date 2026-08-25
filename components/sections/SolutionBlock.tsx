import type { Solution } from "@/content/solutions";
import { Reveal } from "@/components/ui/Reveal";

export function SolutionBlock({ solution }: { solution: Solution }) {
  return (
    <section
      id={solution.slug}
      className="scroll-mt-28 border-t border-border py-14 first:border-t-0 lg:py-18"
    >
      <Reveal className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <p className="font-mono text-2xs tracking-[0.18em] text-accent">
            {solution.index}
          </p>
          <h2 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-fg sm:text-2xl">
            {solution.title}
          </h2>
        </div>

        <div>
          <p className="text-base leading-relaxed text-fg-muted sm:text-lg">
            {solution.description}
          </p>
          <ul className="mt-8 grid gap-px border-t border-border">
            {solution.capabilities.map((capability) => (
              <li
                key={capability}
                className="flex items-start gap-3 border-b border-border py-3.5 text-sm text-fg"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.55em] size-[5px] shrink-0 rounded-full bg-accent"
                />
                {capability}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
