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
    <section className="mx-auto mt-8 sm:mt-10 w-full max-w-2xl">
      <div className="mb-2.5 flex items-center justify-between">
        <h2 className="text-xs sm:text-sm font-medium text-muted-foreground">Recent documents</h2>
        <button
          className="cursor-pointer rounded-lg px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
              className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border bg-card px-3.5 py-2.5 text-left transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                entry.id === activeId ? "border-accent ring-1 ring-accent/30" : "border-border"
              }`}
              type="button"
              onClick={() => onSelect(entry.id)}
            >
              <span className="flex items-center gap-2 text-xs sm:text-sm min-w-0">
                <FileIcon className="shrink-0 text-muted-foreground" />
                <span className="tabular-nums text-foreground truncate font-medium">{entry.id}</span>
              </span>
              <span className="flex shrink-0 items-center gap-1.5 text-[11px] sm:text-xs text-muted-foreground">
                <ClockIcon width="12" height="12" />
                {formatRelativeTime(entry.viewedAt)}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
