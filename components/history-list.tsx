"use client";

import type { HistoryEntry } from "@/lib/history";

import { ClockIcon, FileIcon } from "@/components/icons";

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 1000 * 60 * 60 * 24 * 365],
  ["month", 1000 * 60 * 60 * 24 * 30],
  ["day", 1000 * 60 * 60 * 24],
  ["hour", 1000 * 60 * 60],
  ["minute", 1000 * 60],
];

function formatRelativeTime(timestamp: number): string {
  const elapsed = timestamp - Date.now();
  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  for (const [unit, ms] of UNITS) {
    if (Math.abs(elapsed) >= ms) {
      return formatter.format(Math.round(elapsed / ms), unit);
    }
  }

  return "just now";
}

export interface HistoryListProps {
  entries: HistoryEntry[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onClear: () => void;
}

export function HistoryList({
  entries,
  activeId,
  onSelect,
  onClear,
}: HistoryListProps) {
  if (entries.length === 0) return null;

  return (
    <section className="mx-auto mt-6 sm:mt-10 w-full max-w-2xl px-3 sm:px-6">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-[11px] sm:text-sm font-medium text-muted-foreground">
          Recent documents
        </h2>
        <button
          className="cursor-pointer rounded-md px-1.5 py-0.5 text-[10px] sm:text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          type="button"
          onClick={onClear}
        >
          Clear all
        </button>
      </div>
      <ul className="flex flex-col gap-2">
        {entries.map((entry) => (
          <li key={entry.id}>
            <button
              className={`flex w-full cursor-pointer items-center justify-between gap-2.5 sm:gap-3.5 rounded-lg sm:rounded-xl border bg-card p-2 sm:p-3 text-left transition-all hover:border-foreground/40 hover:shadow-xs focus-visible:outline-none focus-visible:ring-1 sm:focus-visible:ring-2 focus-visible:ring-foreground ${
                entry.id === activeId
                  ? "border-foreground ring-1 ring-foreground/20 bg-muted/20"
                  : "border-border"
              }`}
              type="button"
              onClick={() => onSelect(entry.id)}
            >
              <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                {entry.thumbnailUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    alt={entry.title ?? "Document"}
                    className="size-9 sm:size-11 shrink-0 rounded-md sm:rounded-lg border border-border bg-muted/30 object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    src={entry.thumbnailUrl}
                  />
                ) : (
                  <div className="flex size-9 sm:size-11 shrink-0 items-center justify-center rounded-md sm:rounded-lg border border-border bg-muted/40 text-muted-foreground">
                    <FileIcon className="size-4 sm:size-5" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs sm:text-sm font-medium text-foreground">
                    {entry.title || "Scribd Document"}
                  </p>
                  {entry.author && (
                    <p className="mt-0.5 truncate text-[10px] sm:text-xs text-muted-foreground">
                      By {entry.author}
                    </p>
                  )}
                </div>
              </div>

              <span className="flex shrink-0 items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
                <ClockIcon className="size-3 sm:size-3.5" />
                <span>{formatRelativeTime(entry.viewedAt)}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
