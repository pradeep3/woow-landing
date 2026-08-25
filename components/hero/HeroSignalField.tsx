"use client";

import { Component, useMemo, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";

import { HeroPoster } from "@/components/hero/HeroPoster";
import type { FieldPalette } from "@/components/hero/SignalFieldScene";
import { useTheme } from "@/lib/theme";
import {
  useDeviceTier,
  useIsClient,
  useMediaQuery,
  useReducedMotion,
} from "@/lib/use-motion-preference";

/**
 * The whole Three.js stack — fiber, drei, postprocessing — is pulled out of the
 * initial bundle and only requested once the page is interactive. `ssr: false`
 * is legal here because this module is itself a Client Component.
 */
const SignalFieldScene = dynamic(
  () => import("@/components/hero/SignalFieldScene"),
  { ssr: false, loading: () => null },
);

/** Falls back to the poster if WebGL throws at any point after mounting. */
class SceneBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function readPalette(theme: "light" | "dark"): FieldPalette {
  const styles = getComputedStyle(document.documentElement);
  const read = (token: string, fallback: string) =>
    styles.getPropertyValue(token).trim() || fallback;

  return {
    theme,
    bg: read("--bg", theme === "dark" ? "#1d1d1f" : "#fafaf8"),
    base: read("--field-base", theme === "dark" ? "#8f9db8" : "#111111"),
    accent: read("--accent", "#d9b84c"),
  };
}

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

export function HeroSignalField() {
  const { theme } = useTheme();
  const tier = useDeviceTier();
  const reducedMotion = useReducedMotion();
  const isClient = useIsClient();
  const showLabels = useMediaQuery("(min-width: 768px)");
  const [failed, setFailed] = useState(false);

  // Colours come straight off the CSS custom properties, so the scene and the
  // rest of the page can never drift apart, and re-reads whenever the theme
  // attribute flips.
  const palette = useMemo(() => {
    if (!isClient || !supportsWebGL()) return null;
    return readPalette(theme);
  }, [isClient, theme]);

  const live = palette !== null && !failed;

  return (
    // Not aria-hidden: the floating labels rendered inside the scene are real
    // navigation links, and hiding focusable content from assistive technology
    // is worse than exposing four extra links.
    <div className="absolute inset-0">
      {/* The poster stays mounted underneath for the whole session. It is the
          loading state and the no-WebGL fallback, and because the canvas paints
          an opaque background over it there is never a blank or torn frame. */}
      <HeroPoster />

      {live ? (
        <div className="absolute inset-0">
          <SceneBoundary onError={() => setFailed(true)}>
            <SignalFieldScene
              palette={palette}
              tier={tier}
              reducedMotion={reducedMotion}
              showLabels={showLabels}
            />
          </SceneBoundary>
        </div>
      ) : null}
    </div>
  );
}
