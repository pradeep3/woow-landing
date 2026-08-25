"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Media queries are external state, so they are read through
 * useSyncExternalStore rather than mirrored into React state from an effect.
 * The server snapshot is always `false`, so server and first client render
 * agree and every animation entry point starts from the resolved end state.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export type DeviceTier = "high" | "low";

/** Core count never changes, so this store has nothing to subscribe to. */
const noopSubscribe = () => () => {};

/**
 * Coarse capability check for the WebGL hero. Low tier drops the instance
 * count, disables pointer parallax, and caps the device pixel ratio.
 */
export function useDeviceTier(): DeviceTier {
  const narrow = useMediaQuery("(max-width: 900px)");
  const coarse = useMediaQuery("(pointer: coarse)");
  const fewCores = useSyncExternalStore(
    noopSubscribe,
    () => {
      const cores = navigator.hardwareConcurrency;
      return typeof cores === "number" && cores > 0 && cores <= 4;
    },
    () => false,
  );

  return narrow || coarse || fewCores ? "low" : "high";
}

/** False during SSR and the first client render, true from then on. */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
