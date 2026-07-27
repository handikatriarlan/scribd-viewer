export interface HistoryEntry {
  id: string;
  sourceUrl: string;
  viewedAt: number;
}

const KEY = "scribd-viewer:history";
const MAX_ENTRIES = 8;
const EMPTY: HistoryEntry[] = [];

function isHistoryEntry(value: unknown): value is HistoryEntry {
  if (typeof value !== "object" || value === null) return false;
  const entry = value as Record<string, unknown>;

  return (
    typeof entry.id === "string" &&
    typeof entry.sourceUrl === "string" &&
    typeof entry.viewedAt === "number"
  );
}

function readHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return EMPTY;

  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(KEY) ?? "[]");

    return Array.isArray(parsed) ? parsed.filter(isHistoryEntry) : EMPTY;
  } catch {
    return EMPTY;
  }
}

// Snapshot cache + listeners so components can consume the history via
// useSyncExternalStore (localStorage is the source of truth).
let snapshot: HistoryEntry[] | null = null;
const listeners = new Set<() => void>();

function emit(): void {
  snapshot = null;
  for (const listener of listeners) listener();
}

export function subscribeHistory(listener: () => void): () => void {
  listeners.add(listener);

  return () => listeners.delete(listener);
}

export function getHistorySnapshot(): HistoryEntry[] {
  snapshot ??= readHistory();

  return snapshot;
}

export function getHistoryServerSnapshot(): HistoryEntry[] {
  return EMPTY;
}

export function addToHistory(entry: Omit<HistoryEntry, "viewedAt">): void {
  if (typeof window === "undefined") return;

  const next = [
    { ...entry, viewedAt: Date.now() },
    ...readHistory().filter((item) => item.id !== entry.id),
  ].slice(0, MAX_ENTRIES);

  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage may be full or blocked; skip persisting.
  }

  emit();
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // Ignore blocked storage.
  }

  emit();
}
