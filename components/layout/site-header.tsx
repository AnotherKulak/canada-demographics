import Link from "next/link";

import { ThemeToggle } from "../shared/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/72 backdrop-blur-xl">
      <div className="app-shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-full px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span
              aria-hidden="true"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20"
            >
              CA
            </span>
            <span className="flex flex-col">
              <strong className="font-[family-name:var(--font-display)] text-xl leading-none">Canada Demographics</strong>
              <span className="text-sm text-muted-foreground">Population and residency-status intelligence</span>
            </span>
          </Link>
          <div className="lg:hidden">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <nav aria-label="Primary" className="flex flex-wrap items-center gap-2">
            <Link className="button-secondary !min-h-10 !px-4 !py-2" href="/">
              Overview
            </Link>
            <Link className="button-secondary !min-h-10 !px-4 !py-2" href="/metrics/population-total">
              Metrics
            </Link>
            <Link className="button-secondary !min-h-10 !px-4 !py-2" href="/provinces/ontario">
              Province profiles
            </Link>
            <Link
              className="button-secondary !min-h-10 !px-4 !py-2"
              href="/api/dataset"
              target="_blank"
              rel="noreferrer"
            >
              Dataset API
            </Link>
          </nav>
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
