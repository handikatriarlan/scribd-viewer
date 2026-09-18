import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="py-6 sm:py-10 text-center text-[11px] sm:text-sm text-muted-foreground px-4">
      Created with ♡ by{" "}
      <a
        className="font-medium text-foreground underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-1 sm:focus-visible:ring-2 focus-visible:ring-foreground rounded-xs"
        href={siteConfig.author.url}
        rel="noopener noreferrer"
        target="_blank"
      >
        handikatriarlan
      </a>
    </footer>
  );
}
