import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";
import { site } from "@/content/site";

/** Intrinsic dimensions of both logo files. */
const RATIO = 387 / 102;

/**
 * Renders both supplied wordmarks and lets CSS pick the right one from the
 * data-theme attribute on <html>. Because that attribute is set by the inline
 * script before first paint, the correct variant is the only one ever painted.
 */
export function Logo({
  height = 28,
  className,
  priority = false,
}: {
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  const width = Math.round(height * RATIO);
  const shared = "h-auto w-auto";

  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/woowsignal-logo-light.svg"
        alt={`${site.name} logo`}
        width={width}
        height={height}
        priority={priority}
        unoptimized
        className={cn("logo-light", shared)}
        style={{ height, width: "auto" }}
      />
      <Image
        src="/woowsignal-logo-dark.svg"
        alt=""
        aria-hidden="true"
        width={width}
        height={height}
        priority={priority}
        unoptimized
        className={cn("logo-dark", shared)}
        style={{ height, width: "auto" }}
      />
    </span>
  );
}

export function LogoLink({
  height = 28,
  className,
  priority = false,
}: {
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn("inline-flex items-center", className)}
    >
      <Logo height={height} priority={priority} />
    </Link>
  );
}
