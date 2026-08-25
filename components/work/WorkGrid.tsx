"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { work, workCategories, type WorkCategory } from "@/content/work";
import { WorkCard } from "@/components/cards/WorkCard";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/use-motion-preference";

export function WorkGrid() {
  const [active, setActive] = useState<WorkCategory>("All");
  const reduced = useReducedMotion();

  const visible = useMemo(
    () => (active === "All" ? work : work.filter((w) => w.category === active)),
    [active],
  );

  // A filter that leads to an empty grid is a dead end; disable those instead.
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of work) {
      map.set(item.category, (map.get(item.category) ?? 0) + 1);
    }
    map.set("All", work.length);
    return map;
  }, []);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter work by category"
        className="flex flex-wrap gap-2 border-b border-border pb-6"
      >
        {workCategories.map((category) => {
          const count = counts.get(category) ?? 0;
          const selected = active === category;

          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={selected}
              disabled={count === 0}
              onClick={() => setActive(category)}
              className={cn(
                "inline-flex items-center gap-2 border px-3.5 py-2 font-mono text-2xs tracking-[0.14em] uppercase transition-colors duration-200",
                selected
                  ? "border-accent-line bg-accent-soft text-accent"
                  : "border-border text-fg-muted hover:border-fg-muted hover:text-fg",
                count === 0 && "cursor-not-allowed opacity-40 hover:border-border hover:text-fg-muted",
              )}
            >
              {category}
              <span className="text-fg-muted">{count}</span>
            </button>
          );
        })}
      </div>

      <motion.div
        layout={!reduced}
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item) => (
            <motion.div
              key={item.slug}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex"
            >
              <WorkCard item={item} className="w-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
