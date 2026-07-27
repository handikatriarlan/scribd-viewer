"use client";

export interface UrlFormProps {
  value: string;
  error: string | null;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
}

export function UrlForm({ value, error, onChange, onSubmit }: UrlFormProps) {
  return (
    <form
      className="mx-auto mt-8 w-full max-w-xl rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(value);
      }}
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="scribd-url">
          Scribd document link or ID
        </label>
        <input
          aria-describedby={error ? "scribd-url-error" : undefined}
          aria-invalid={error ? true : undefined}
          autoComplete="off"
          className={`h-11 w-full flex-1 rounded-lg border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
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
        <button
          className="h-11 rounded-lg bg-accent px-5 text-sm font-medium text-accent-foreground transition hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          type="submit"
        >
          View document
        </button>
      </div>
      {error ? (
        <p
          className="mt-2 text-sm text-red-600 dark:text-red-400"
          id="scribd-url-error"
          role="alert"
        >
          {error}
        </p>
      ) : (
        <p className="mt-2 text-xs text-muted-foreground">
          Works with scribd.com/document, /doc, /presentation, /book, and /embeds
          links.
        </p>
      )}
    </form>
  );
}
