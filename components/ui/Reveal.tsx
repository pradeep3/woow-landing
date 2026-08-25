"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/use-motion-preference";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: React.ReactNode;
  className?: string;
  /**
   * When set, direct children are revealed one after another instead of the
   * wrapper moving as a single block. Value is the gap in seconds.
   */
  stagger?: number;
  delay?: number;
  /** Distance travelled on the way in, in pixels. */
  distance?: number;
  as?: "div" | "section" | "ul" | "ol";
};

/**
 * Scroll-triggered entrance used across every section. Elements are visible in
 * the server-rendered markup and only hidden once GSAP takes over, so nothing
 * is invisible when JavaScript or motion is unavailable.
 */
export function Reveal({
  children,
  className,
  stagger,
  delay = 0,
  distance = 22,
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reduced) return;

    const context = gsap.context(() => {
      const targets =
        stagger !== undefined
          ? (Array.from(element.children) as HTMLElement[])
          : [element];
      if (!targets.length) return;

      gsap.set(targets, { opacity: 0, y: distance });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.72,
        ease: "power3.out",
        delay,
        stagger: stagger ?? 0,
        scrollTrigger: { trigger: element, start: "top 88%", once: true },
      });
    }, element);

    return () => context.revert();
  }, [stagger, delay, distance, reduced]);

  return (
    <Tag ref={ref as React.Ref<never>} className={cn(className)}>
      {children}
    </Tag>
  );
}
