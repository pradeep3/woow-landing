"use client";

import { useCallback, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "woowsignal-theme";

/**
 * Runs before first paint, inlined into <head>. Sets data-theme on <html> so
 * the correct palette and logo variant are present in the very first frame —
 * without this the page paints light, then snaps to dark on hydration.
 */
export const themeInitScript = `(function(){try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");var t=s==="dark"||s==="light"?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","light");}})();`;

/**
 * The data-theme attribute on <html> is the single source of truth — it is
 * what the CSS, the logo swap, and the WebGL palette all read. Rather than
 * duplicating it into React state, components subscribe to the attribute
 * itself, so every consumer stays in sync with what is actually painted.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

/** Light is the documented default, so SSR and hydration agree on it. */
function getServerSnapshot(): Theme {
  return "light";
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private browsing or blocked storage: the theme still applies for this
      // session, it just will not be remembered.
    }
  }, []);

  return { theme, toggleTheme };
}
