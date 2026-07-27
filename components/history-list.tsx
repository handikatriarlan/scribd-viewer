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
    <section className="mx-auto mt-10 w-full max-w-xl">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-medium text-muted">Recent documents</h2>
        <button
          className="rounded-lg px-2 py-1 text-xs text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
              className={`flex w-full items-center justify-between gap-3 rounded-lg border bg-card px-3 py-2.5 text-left transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                entry.id === activeId ? "border-accent" : "border-border"
              }`}
              type="button"
              onClick={() => onSelect(entry.id)}
            >
              <span className="flex items-center gap-2 text-sm">
                <FileIcon className="shrink-0 text-muted" />
                <span className="tabular-nums text-foreground">{entry.id}</span>
              </span>
              <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted">
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
