"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { nav, site } from "@/content/site";
import { LogoLink } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/cn";

export function MobileNav({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  // Lock the page behind the overlay and restore the scrollbar gutter so the
  // layout underneath does not shift when it opens.
  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const gutter = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (gutter > 0) body.style.paddingRight = `${gutter}px`;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-nav"
          key="mobile-nav"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-bg lg:hidden"
        >
          <div
            aria-hidden="true"
            className="dot-field dot-field-fade pointer-events-none absolute inset-0 opacity-50"
          />

          <div className="relative flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <LogoLink height={24} />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex size-10 items-center justify-center border border-border text-fg transition-colors hover:border-fg"
              >
                <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
                  <path
                    d="M2 2 L14 14 M14 2 L2 14"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    fill="none"
                  />
                </svg>
              </button>
            </div>

            <nav
              aria-label="Mobile"
              className="flex-1 overflow-y-auto px-5 py-8"
            >
              <ul className="space-y-1">
                {nav.map((item, index) => {
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.05 + index * 0.05,
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="border-b border-border py-1"
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center justify-between py-3 text-xl font-medium tracking-tight transition-colors",
                          active ? "text-accent" : "text-fg hover:text-accent",
                        )}
                      >
                        {item.label}
                        <span aria-hidden="true" className="text-fg-muted">
                          →
                        </span>
                      </Link>

                      {item.children ? (
                        <ul className="mb-3 space-y-2 pl-0">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={onClose}
                                className="flex items-center gap-2.5 py-1 text-sm text-fg-muted transition-colors hover:text-fg"
                              >
                                <span
                                  aria-hidden="true"
                                  className="size-[4px] shrink-0 rounded-full bg-dot-quiet"
                                />
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center justify-between gap-4 border-t border-border px-5 py-5">
              <div className="flex flex-col gap-1">
                <a
                  href={`mailto:${site.email}`}
                  className="font-mono text-xs text-fg-muted transition-colors hover:text-fg"
                >
                  {site.email}
                </a>
                <ThemeToggle />
              </div>
              <ButtonLink href="/contact" onClick={onClose} withArrow>
                Let&rsquo;s Build
              </ButtonLink>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
