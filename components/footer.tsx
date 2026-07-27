import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="py-10 text-center text-sm text-muted-foreground">
      Created with ♡ by{" "}
      <a
        className="font-medium text-foreground underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        href={siteConfig.author.url}
        rel="noopener noreferrer"
        target="_blank"
      >
        handikatriarlan
      </a>
    </footer>
  );
}
