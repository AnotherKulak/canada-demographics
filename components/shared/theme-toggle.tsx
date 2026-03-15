"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border/80 bg-card/80 px-4 py-2 text-sm font-semibold text-card-foreground shadow-sm backdrop-blur transition hover:border-primary/40 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted && isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <span aria-hidden="true" className="text-base leading-none">
        {mounted && isDark ? "☀" : "☾"}
      </span>
      <span>{mounted && isDark ? "Light mode" : "Dark mode"}</span>
    </button>
  );
}
