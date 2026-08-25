import Link from "next/link";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "default" | "large";

const base =
  "group inline-flex items-center justify-center gap-2.5 border font-medium transition-colors duration-200 ease-signal disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "border-fg bg-fg text-bg hover:border-accent hover:bg-accent hover:text-[#111111]",
  secondary:
    "border-border bg-transparent text-fg hover:border-fg hover:bg-[var(--shade)]",
  ghost:
    "border-transparent bg-transparent text-fg-muted hover:text-fg",
};

const sizes: Record<Size, string> = {
  default: "px-5 py-3 text-sm",
  large: "px-6 py-3.5 text-base",
};

function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="transition-transform duration-200 ease-signal group-hover:translate-x-1"
    >
      →
    </span>
  );
}

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Appends the arrow glyph that shifts on hover. */
  withArrow?: boolean;
};

export function Button({
  children,
  variant = "primary",
  size = "default",
  className,
  withArrow = false,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
      {withArrow ? <Arrow /> : null}
    </button>
  );
}

export function ButtonLink({
  children,
  href,
  variant = "primary",
  size = "default",
  className,
  withArrow = false,
  ...rest
}: CommonProps & { href: string } & Omit<
    React.ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >) {
  const external = href.startsWith("http");

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={cn(base, variants[variant], sizes[size], className)}
      >
        {children}
        {withArrow ? <Arrow /> : null}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
      {withArrow ? <Arrow /> : null}
    </Link>
  );
}
