import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * One part of the five-part case-study template: Challenge, Approach,
 * Technology, Solution, Outcome. Every case study is built from these, so the
 * structure stays identical across projects.
 */
export function CaseStudySection({
  label,
  index,
  children,
}: {
  label: string;
  index: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="grid gap-6 border-t border-border py-12 lg:grid-cols-[16rem_1fr] lg:gap-16 lg:py-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <SectionLabel withDot={false}>
          <span className="text-fg-muted">{index}</span>
          {label}
        </SectionLabel>
      </div>
      <div className="max-w-2xl">{children}</div>
    </Reveal>
  );
}

export function CaseStudyProse({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base leading-[1.8] text-fg-muted sm:text-lg">
      {children}
    </p>
  );
}

export function CaseStudyList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-px">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 border-b border-border py-4 text-base leading-relaxed text-fg first:border-t first:border-border"
        >
          <span
            aria-hidden="true"
            className="mt-[0.6em] size-[5px] shrink-0 rounded-full bg-accent"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}
