import Link from "next/link";

import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";

export function Header() {
  return (
    <header className="sticky top-0 z-10 h-12 sm:h-14 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-full w-full max-w-3xl items-center justify-between px-4">
        <Link
          href="/"
          className="font-sans text-lg sm:text-xl font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
        >
          {siteConfig.name}
        </Link>
        <ThemeSwitch />
      </div>
    </header>
  );
}