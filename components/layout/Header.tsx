"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { nav, type NavItem } from "@/content/site";
import { LogoLink } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { MobileNav } from "@/components/layout/MobileNav";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Any navigation dismisses both the mega-menu and the mobile overlay. This
  // is the "adjust state when a prop changes" pattern rather than an effect,
  // so the menus are already closed in the render that shows the new route.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  // A short grace period so the pointer can cross the gap between the trigger
  // and the panel without the menu snapping shut.
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  const isActive = (item: NavItem) =>
    pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b",
          scrolled || openMenu
            ? "border-border bg-[var(--overlay)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
        onMouseLeave={scheduleClose}
      >
        <div className="mx-auto flex h-16 w-full max-w-[90rem] items-center justify-between gap-6 px-5 sm:px-8 lg:h-[72px] lg:px-12">
          <LogoLink height={26} priority className="shrink-0" />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const active = isActive(item);
                const hasMenu = Boolean(item.children);
                const expanded = openMenu === item.label;

                return (
                  <li
                    key={item.href}
                    onMouseEnter={() => {
                      cancelClose();
                      setOpenMenu(hasMenu ? item.label : null);
                    }}
                  >
                    <Link
                      href={item.href}
                      aria-expanded={hasMenu ? expanded : undefined}
                      aria-haspopup={hasMenu ? "true" : undefined}
                      onFocus={() => setOpenMenu(hasMenu ? item.label : null)}
                      className={cn(
                        "relative flex items-center gap-1.5 px-3 py-2 text-sm transition-colors duration-200",
                        active || expanded
                          ? "text-fg"
                          : "text-fg-muted hover:text-fg",
                      )}
                    >
                      {active ? (
                        <span
                          aria-hidden="true"
                          className="size-[4px] rounded-full bg-accent"
                        />
                      ) : null}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle className="hidden sm:inline-flex" />
            <ButtonLink
              href="/contact"
              size="default"
              withArrow
              className="hidden sm:inline-flex"
            >
              Let&rsquo;s Build
            </ButtonLink>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className="flex size-10 items-center justify-center border border-border text-fg transition-colors hover:border-fg lg:hidden"
            >
              <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
                <path
                  d="M1 4h14M1 11h14"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  fill="none"
                />
              </svg>
            </button>
          </div>
        </div>

        <MegaMenu
          openLabel={openMenu}
          onEnter={cancelClose}
          onLeave={scheduleClose}
        />
      </header>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
      />
    </>
  );
}

function MegaMenu({
  openLabel,
  onEnter,
  onLeave,
}: {
  openLabel: string | null;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const item = nav.find((entry) => entry.label === openLabel && entry.children);

  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          className="absolute inset-x-0 top-full hidden border-b border-border bg-[var(--overlay)] backdrop-blur-xl lg:block"
        >
          <div className="mx-auto grid w-full max-w-[90rem] gap-10 px-12 py-10 lg:grid-cols-[18rem_1fr]">
            <div className="flex flex-col justify-between border-r border-border pr-10">
              <div>
                <p className="font-mono text-2xs tracking-[0.18em] text-accent uppercase">
                  {item.label}
                </p>
                <p className="mt-3 text-lg leading-snug text-fg [text-wrap:balance]">
                  {item.menuIntro}
                </p>
              </div>
              <Link
                href={item.href}
                className="group mt-6 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
              >
                View all {item.label.toLowerCase()}
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
              {item.children?.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    className="group flex items-start gap-3 border border-transparent px-4 py-3 transition-colors hover:border-border hover:bg-surface"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 size-[5px] shrink-0 rounded-full bg-dot-quiet transition-colors group-hover:bg-accent"
                    />
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-fg">
                          {child.label}
                        </span>
                        {child.tag ? (
                          <span className="font-mono text-2xs tracking-[0.14em] text-accent uppercase">
                            {child.tag}
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-fg-muted">
                        {child.description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
