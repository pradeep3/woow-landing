"use client";

import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/cn";

/**
 * Dot-signal styled switch: the mark slides between two states, matching the
 * brand's dot motif rather than using a sun/moon icon pair.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center border border-border bg-transparent px-[3px] transition-colors duration-200 ease-signal hover:border-fg-muted",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-[14px] rounded-full transition-all duration-300 ease-signal",
          isDark
            ? "translate-x-[22px] bg-accent"
            : "translate-x-0 bg-fg-muted",
        )}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-between px-[7px]"
      >
        <span
          className={cn(
            "size-[3px] rounded-full bg-fg-muted transition-opacity duration-200",
            isDark ? "opacity-40" : "opacity-0",
          )}
        />
        <span
          className={cn(
            "size-[3px] rounded-full bg-fg-muted transition-opacity duration-200",
            isDark ? "opacity-0" : "opacity-40",
          )}
        />
      </span>
    </button>
  );
}
