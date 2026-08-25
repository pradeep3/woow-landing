import { cn } from "@/lib/cn";

const COLUMNS = 26;
const ROWS = 14;

/** Deterministic hash so a given slug always produces the same field. */
function hash(seed: string, salt: number): number {
  let value = 2166136261 ^ salt;
  for (let i = 0; i < seed.length; i += 1) {
    value ^= seed.charCodeAt(i);
    value = Math.imul(value, 16777619);
  }
  return ((value >>> 0) % 10000) / 10000;
}

/**
 * Project thumbnails as generated dot fields rather than stock imagery. Each
 * one is derived from the project slug, so it is stable across renders, weighs
 * nothing, and keeps the dot-signal motif on the cards. Replace with real
 * photography per project by adding an `image` field to content/work.ts.
 */
export function SignalThumb({
  seed,
  muted = false,
  className,
}: {
  seed: string;
  /** Placeholder projects render without the accent focal cluster. */
  muted?: boolean;
  className?: string;
}) {
  // Focal point of the thumbnail's own signal source.
  const focalX = 0.3 + hash(seed, 1) * 0.45;
  const focalY = 0.28 + hash(seed, 2) * 0.44;
  const drift = hash(seed, 3) * 2 - 1;

  const dots: React.ReactElement[] = [];

  for (let column = 0; column < COLUMNS; column += 1) {
    for (let row = 0; row < ROWS; row += 1) {
      const x = (column + 0.5) / COLUMNS;
      const y = (row + 0.5) / ROWS;

      // Wave displacement, so the rows read as a rolling field not a grid.
      const wave = Math.sin(x * 6.2 + drift * 3.1) * 0.045;
      const cy = y + wave;

      const distance = Math.hypot(x - focalX, (cy - focalY) * 1.5);
      const strength = Math.max(0, 1 - distance / 0.52);
      const radius = 0.9 + strength * 2.2;
      const lit = !muted && strength > 0.52;

      dots.push(
        <circle
          key={`${column}-${row}`}
          cx={x * 100}
          cy={cy * 56}
          r={radius}
          fill={lit ? "var(--accent)" : "var(--dot-quiet)"}
          opacity={lit ? 0.55 + strength * 0.45 : 0.3 + strength * 0.45}
        />,
      );
    }
  }

  return (
    <svg
      viewBox="0 0 100 56"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    >
      {dots}
    </svg>
  );
}
