import Link from "next/link";

import type { Product } from "@/content/products";
import { StatusTag } from "@/components/ui/StatusTag";
import { SignalThumb } from "@/components/ui/SignalThumb";
import { cn } from "@/lib/cn";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        "group theme-fade flex flex-col border border-border bg-surface transition-colors duration-200 ease-signal hover:border-fg-muted",
        className,
      )}
    >
      <div className="relative h-32 overflow-hidden border-b border-border bg-bg">
        <SignalThumb
          seed={product.slug}
          muted={product.status === "COMING SOON"}
          className="opacity-80 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <StatusTag status={product.status} className="self-start" />

        <h3 className="mt-5 text-lg font-semibold tracking-tight text-fg">
          {product.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          {product.oneLiner}
        </p>

        <span className="mt-6 inline-flex items-center gap-2 pt-4 text-sm text-fg transition-colors group-hover:text-accent">
          View product
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
