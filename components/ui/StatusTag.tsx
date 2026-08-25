import type { ProductStatus } from "@/content/products";
import { cn } from "@/lib/cn";

/**
 * LIVE carries the animated signal ping — it is the only status that means
 * "there is something running right now". The rest read as quiet state.
 */
export function StatusTag({
  status,
  className,
}: {
  status: ProductStatus;
  className?: string;
}) {
  const isLive = status === "LIVE";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border px-2.5 py-1 font-mono text-2xs tracking-[0.14em] uppercase",
        isLive
          ? "border-accent-line text-accent"
          : "border-border text-fg-muted",
        className,
      )}
    >
      {isLive ? (
        <span aria-hidden="true" className="ping-dot" />
      ) : (
        <span
          aria-hidden="true"
          className="size-[5px] rounded-full bg-current opacity-50"
        />
      )}
      {status}
    </span>
  );
}
