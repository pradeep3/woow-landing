"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { processSteps } from "@/content/home";
import { useReducedMotion } from "@/lib/use-motion-preference";

gsap.registerPlugin(ScrollTrigger);

/**
 * Six steps, revealed one at a time as the section moves through the viewport.
 * The connector draws with scrub so the line and the steps stay in step with
 * each other rather than running on independent timers.
 */
export function ProcessTimeline() {
  const rootRef = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const context = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]", root);
      const connectors = gsap.utils.toArray<HTMLElement>("[data-connector]", root);

      gsap.set(steps, { opacity: 0, y: 26 });
      gsap.set(connectors, { scaleX: 0, scaleY: 0 });

      gsap.to(steps, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
      });

      gsap.to(connectors, {
        scaleX: 1,
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
          end: "bottom 70%",
          scrub: 0.6,
        },
      });
    }, root);

    return () => context.revert();
  }, [reduced]);

  return (
    <ol
      ref={rootRef}
      className="relative grid gap-px border-t border-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
    >
      {processSteps.map((step, index) => (
        <li
          key={step.index}
          data-step
          className="theme-fade group relative border-b border-border bg-surface p-6 xl:border-r xl:last:border-r-0"
        >
          {/* Connector: horizontal between columns on wide screens. */}
          <span
            aria-hidden="true"
            data-connector
            className="absolute top-0 left-0 hidden h-px w-full origin-left bg-accent xl:block"
            style={{ transitionDelay: `${index * 60}ms` }}
          />
          <span
            aria-hidden="true"
            data-connector
            className="absolute top-0 left-0 h-full w-px origin-top bg-accent xl:hidden"
          />

          <div className="flex items-baseline gap-3">
            <span className="font-mono text-2xs tracking-[0.16em] text-accent">
              {step.index}
            </span>
            <h3 className="text-base font-semibold tracking-tight text-fg">
              {step.title}
            </h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
