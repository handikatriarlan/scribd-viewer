"use client";

import { preconnect } from "react-dom";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import type { ScribdDocument } from "@/lib/scribd";

import {
  CheckIcon,
  CloseIcon,
  CopyIcon,
  ExternalLinkIcon,
  MaximizeIcon,
  MinimizeIcon,
  UserIcon,
} from "@/components/icons";

const toolbarButton =
  "flex h-7.5 sm:h-9 cursor-pointer items-center gap-1 sm:gap-1.5 rounded-md sm:rounded-lg border border-border px-2 sm:px-3 text-[11px] sm:text-sm text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-1 sm:focus-visible:ring-2 focus-visible:ring-accent shrink-0";

const noopSubscribe = () => () => {};

function subscribeFullscreen(onChange: () => void) {
  document.addEventListener("fullscreenchange", onChange);

  return () => document.removeEventListener("fullscreenchange", onChange);
}

export interface DocumentViewerProps {
  doc: ScribdDocument;
  onClose: () => void;
}

export function DocumentViewer({ doc, onClose }: DocumentViewerProps) {
  preconnect("https://www.scribd.com");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const fullscreenSupported = useSyncExternalStore(
    noopSubscribe,
    () => document.fullscreenEnabled ?? false,
    () => false,
  );
  const isFullscreen = useSyncExternalStore(
    subscribeFullscreen,
    () =>
      document.fullscreenElement !== null &&
      document.fullscreenElement === wrapperRef.current,
    () => false,
  );

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => setCopied(false), 2000);

    return () => clearTimeout(timer);
  }, [copied]);

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await wrapperRef.current?.requestFullscreen();
      }
    } catch {
      // Fullscreen may be blocked
    }
  };

  const copyEmbedLink = async () => {
    try {
      await navigator.clipboard.writeText(doc.embedUrl);
      setCopied(true);
    } catch {
      // Clipboard unavailable fallback
    }
  };

  // Keyboard shortcuts: Esc (close), F (fullscreen)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <section
      id="scribd-viewer-container"
      className="mx-auto mt-4 sm:mt-8 w-full max-w-4xl px-3 sm:px-6"
    >
      {/* Metadata Header Card (No ID Badge, No Author Link Redirect) */}
      {(doc.title || doc.authorName) && (
        <div className="print-hidden mb-2.5 sm:mb-4 rounded-lg sm:rounded-xl border border-border bg-card p-2.5 sm:p-4">
          <h2 className="text-xs sm:text-base font-semibold leading-snug text-foreground line-clamp-2">
            {doc.title || "Scribd Document"}
          </h2>
          {doc.authorName && (
            <div className="mt-1 flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground">
              <UserIcon className="size-3 sm:size-3.5 shrink-0" />
              <span>
                By <span className="font-medium text-foreground">{doc.authorName}</span>
              </span>
            </div>
          )}
        </div>
      )}

      {/* Toolbar Controls (Mobile Compact & Accessible) */}
      <div className="print-hidden mb-2.5 sm:mb-3 flex flex-wrap items-center gap-1.5 sm:gap-2">
        {fullscreenSupported && (
          <button
            className={toolbarButton}
            title="Toggle Fullscreen (Key: F)"
            type="button"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <MinimizeIcon className="size-3.5 sm:size-4" />
            ) : (
              <MaximizeIcon className="size-3.5 sm:size-4" />
            )}
            <span className="hidden sm:inline">
              {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            </span>
          </button>
        )}

        {/* Copy Link */}
        <button className={toolbarButton} type="button" onClick={copyEmbedLink}>
          {copied ? (
            <CheckIcon className="size-3.5 sm:size-4 text-foreground" />
          ) : (
            <CopyIcon className="size-3.5 sm:size-4" />
          )}
          <span>{copied ? "Copied" : "Copy link"}</span>
        </button>

        {/* Open on Scribd */}
        <a
          className={toolbarButton}
          href={doc.originalUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <ExternalLinkIcon className="size-3.5 sm:size-4" />
          <span className="hidden sm:inline">Open on Scribd</span>
        </a>

        {/* Close Button */}
        <button
          aria-label="Close viewer"
          className={`${toolbarButton} ml-auto`}
          title="Close (Key: Esc)"
          type="button"
          onClick={onClose}
        >
          <CloseIcon className="size-3.5 sm:size-4" />
          <span className="hidden sm:inline">Close</span>
        </button>
      </div>

      {/* Embed Container (Responsive with Safe Mobile Bounds) */}
      <div
        id="scribd-embed-wrapper"
        ref={wrapperRef}
        className={`relative overflow-hidden bg-card ${
          isFullscreen ? "h-full" : "rounded-lg sm:rounded-xl border border-border"
        }`}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-card">
            <div
              aria-label="Loading document..."
              className="size-7 sm:size-8 animate-spin rounded-full border-2 border-border border-t-foreground"
              role="status"
            />
          </div>
        )}
        <iframe
          allowFullScreen
          className={`w-full ${
            isFullscreen ? "h-full" : "h-[65dvh] min-h-[380px] sm:h-[78dvh]"
          }`}
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          src={doc.embedUrl}
          title={doc.title || `Scribd document ${doc.id}`}
          onLoad={() => setLoading(false)}
        />
      </div>
    </section>
  );
}


