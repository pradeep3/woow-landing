"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/use-motion-preference";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  /** "load" fires immediately; "scroll" waits for the element to enter view. */
  trigger?: "load" | "scroll";
  delay?: number;
};

/**
 * The signature reveal: each glyph starts hidden behind a solid block, and the
 * blocks retract in a shuffled order so the line resolves out of a pixel mass
 * rather than fading in as a whole.
 *
 * The resolved state is what renders on the server, so the text is readable
 * with JavaScript disabled and never disappears if the animation never runs.
 */
export function PixelRevealText({
  text,
  className,
  as: Tag = "h2",
  trigger = "scroll",
  delay = 0,
}: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;

    const context = gsap.context(() => {
      const glyphs = gsap.utils.toArray<HTMLElement>(".pixel-glyph", root);
      const blocks = gsap.utils.toArray<HTMLElement>(".pixel-block", root);
      if (!glyphs.length) return;

      // One shuffled delay per character, shared by that character's glyph and
      // its block so the pair always moves together.
      const offsets = glyphs.map((_, index) => index);
      for (let i = offsets.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [offsets[i], offsets[j]] = [offsets[j], offsets[i]];
      }
      const step = Math.min(0.026, 1.1 / glyphs.length);

      gsap.set(glyphs, { opacity: 0 });
      gsap.set(blocks, { scaleX: 1, opacity: 1 });

      const timeline = gsap.timeline({
        delay,
        scrollTrigger:
          trigger === "scroll"
            ? { trigger: root, start: "top 85%", once: true }
            : undefined,
      });

      glyphs.forEach((glyph, index) => {
        const at = offsets[index] * step;
        timeline.to(glyph, { opacity: 1, duration: 0.28 }, at);
        timeline.to(
          blocks[index],
          {
            scaleX: 0,
            duration: 0.42,
            ease: "power3.inOut",
            transformOrigin: "right center",
          },
          at + 0.05,
        );
      });
    }, root);

    return () => context.revert();
  }, [text, trigger, delay, reduced]);

  const words = text.split(" ");

  return (
    <Tag
      ref={rootRef as React.Ref<never>}
      className={cn("[text-wrap:balance]", className)}
    >
      {/* The plain string stays in the accessibility tree; the split glyphs
          below are decoration as far as assistive technology is concerned. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => (
          <span key={`${word}-${wordIndex}`} className="inline-block">
            {word.split("").map((char, charIndex) => (
              <span key={charIndex} className="pixel-char">
                <span className="pixel-glyph inline-block">{char}</span>
                <span className="pixel-block" style={{ transform: "scaleX(0)" }} />
              </span>
            ))}
            {wordIndex < words.length - 1 ? (
              <span className="pixel-char">
                <span className="pixel-glyph inline-block">&nbsp;</span>
              </span>
            ) : null}
          </span>
        ))}
      </span>
    </Tag>
  );
}
