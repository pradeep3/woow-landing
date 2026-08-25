import Link from "next/link";

import type { WorkItem } from "@/content/work";
import { SignalThumb } from "@/components/ui/SignalThumb";
import { cn } from "@/lib/cn";

export function WorkCard({
  item,
  className,
}: {
  item: WorkItem;
  className?: string;
}) {
  const href = item.caseStudy ? `/case-studies/${item.caseStudy}` : undefined;

  const body = (
    <>
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-bg">
        <SignalThumb
          seed={item.slug}
          muted={item.placeholder}
          className={cn(
            "transition-opacity duration-300",
            item.placeholder
              ? "opacity-45"
              : "opacity-80 group-hover:opacity-100",
          )}
        />
        {item.placeholder ? (
          <span className="absolute inset-0 flex items-center justify-center font-mono text-2xs tracking-[0.2em] text-fg-muted uppercase">
            Slot reserved
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-mono text-2xs tracking-[0.16em] text-accent uppercase">
            {item.category}
          </span>
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-2xs tracking-[0.12em] text-fg-muted uppercase"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="mt-4 text-lg font-semibold tracking-tight text-fg">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          {item.description}
        </p>

        {item.tech.length ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {item.tech.map((tech) => (
              <li
                key={tech}
                className="border border-border px-2 py-1 font-mono text-2xs tracking-[0.1em] text-fg-muted uppercase"
              >
                {tech}
              </li>
            ))}
          </ul>
        ) : null}

        <span
          className={cn(
            "mt-auto inline-flex items-center gap-2 pt-6 text-sm",
            href
              ? "text-fg transition-colors group-hover:text-accent"
              : "text-fg-muted",
          )}
        >
          {href ? "View Case Study" : "Case study pending"}
          {href ? (
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          ) : null}
        </span>
      </div>
    </>
  );

  const shell = cn(
    "group theme-fade flex flex-col border border-border bg-surface transition-colors duration-200 ease-signal",
    href ? "hover:border-fg-muted" : "opacity-80",
    className,
  );

  if (!href) {
    return <article className={shell}>{body}</article>;
  }

  return (
    <Link href={href} className={shell}>
      {body}
    </Link>
  );
}
