import Link from "next/link";

import { footerColumns, site } from "@/content/site";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-border">
      <div
        aria-hidden="true"
        className="dot-field pointer-events-none absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,#000,transparent_60%)]"
      />

      <div className="relative mx-auto w-full max-w-[76rem] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo height={30} />
            <p className="mt-5 text-sm leading-relaxed text-fg-muted">
              {site.tagline}
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="font-mono text-2xs tracking-[0.18em] text-fg-muted uppercase">
                {column.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="font-mono text-2xs tracking-[0.18em] text-fg-muted uppercase">
              Connect
            </h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 text-sm text-fg transition-colors hover:text-accent"
                >
                  Start a project
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-6 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-2xs tracking-[0.12em] text-fg-muted uppercase">
            © {year} {site.name}
          </p>
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xs tracking-[0.12em] text-fg-muted uppercase">
              Theme
            </span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
