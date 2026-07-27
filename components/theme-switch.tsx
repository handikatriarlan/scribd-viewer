"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { MoonIcon, SunIcon } from "@/components/icons";

const noopSubscribe = () => () => {};

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  // false during SSR/hydration, true after — the resolved theme is only
  // known on the client.
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return <div aria-hidden="true" className="size-9" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="relative flex size-9 cursor-pointer items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <SunIcon
        className={`absolute motion-safe:transition motion-safe:duration-300 ${
          isDark
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0"
        }`}
      />
      <MoonIcon
        className={`absolute motion-safe:transition motion-safe:duration-300 ${
          isDark
            ? "-rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
      />
    </button>
  );
}
