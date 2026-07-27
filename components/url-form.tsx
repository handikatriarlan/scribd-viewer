"use client";

import { ArrowRightIcon, CloseIcon, LinkIcon } from "@/components/icons";

export interface UrlFormProps {
  value: string;
  error: string | null;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
}

export function UrlForm({ value, error, onChange, onSubmit }: UrlFormProps) {
  return (
    <form
      className="mx-auto mt-6 sm:mt-8 w-full max-w-2xl rounded-2xl border border-border bg-card p-3.5 shadow-sm sm:p-5 transition-all"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(value);
      }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="sr-only" htmlFor="scribd-url">
          Scribd document link or ID
        </label>
        <div className="relative flex-1 w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
            <LinkIcon className="size-4" />
          </div>
          <input
            aria-describedby={error ? "scribd-url-error" : undefined}
            aria-invalid={error ? true : undefined}
            autoComplete="off"
            className={`h-12 w-full rounded-xl border bg-background pl-10 pr-9 text-base sm:text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground transition-all ${
              error ? "border-red-500 dark:border-red-400" : "border-border"
            }`}
            id="scribd-url"
            name="url"
            placeholder="Paste a Scribd link or document ID"
            spellCheck={false}
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
          {value && (
            <button
              aria-label="Clear input"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground cursor-pointer focus:outline-none"
              type="button"
              onClick={() => onChange("")}
            >
              <CloseIcon className="size-4" />
            </button>
          )}
        </div>
        <button
          className="h-12 w-full sm:w-auto shrink-0 cursor-pointer rounded-xl bg-foreground px-6 text-base sm:text-sm font-medium text-background flex items-center justify-center gap-2 transition hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-card shadow-sm"
          type="submit"
        >
          <span>View document</span>
          <ArrowRightIcon className="size-4" />
        </button>
      </div>
      {error ? (
        <p
          className="mt-2.5 text-sm font-medium text-red-600 dark:text-red-400"
          id="scribd-url-error"
          role="alert"
        >
          {error}
        </p>
      ) : (
        <p className="mt-2.5 text-xs text-muted-foreground">
          Supports scribd.com/document, /doc, /presentation, /book, and /embeds links.
        </p>
      )}
    </form>
  );
}
