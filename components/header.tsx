import Link from "next/link";

import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";

export function Header() {
  return (
    <header className="sticky top-0 z-10 h-11 sm:h-14 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-full w-full max-w-4xl items-center justify-between px-3.5 sm:px-6">
        <Link
          href="/"
          className="font-sans text-sm sm:text-lg font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-1 sm:focus-visible:ring-2 focus-visible:ring-foreground rounded-md text-foreground"
        >
          {siteConfig.name}
        </Link>
        <ThemeSwitch />
      </div>
    </header>
  );
}