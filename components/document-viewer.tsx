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
  PopoutIcon,
  PrinterIcon,
  UserIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "@/components/icons";

const toolbarButton =
  "flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-border px-2.5 sm:px-3 text-xs sm:text-sm text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

const noopSubscribe = () => () => {};

function subscribeFullscreen(onChange: () => void) {
  document.addEventListener("fullscreenchange", onChange);

  return () => document.removeEventListener("fullscreenchange", onChange);
}

const ZOOM_STEPS = [75, 90, 100, 115, 130, 150];

export interface DocumentViewerProps {
  doc: ScribdDocument;
  onClose: () => void;
}

export function DocumentViewer({ doc, onClose }: DocumentViewerProps) {
  preconnect("https://www.scribd.com");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [zoom, setZoom] = useState(100);

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
      // Fullscreen may be blocked; nothing to recover.
    }
  };

  const copyEmbedLink = async () => {
    try {
      await navigator.clipboard.writeText(doc.embedUrl);
      setCopied(true);
    } catch {
      // Clipboard may be unavailable; the URL is still reachable via
      // "Open on Scribd".
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePopout = () => {
    window.open(doc.embedUrl, "_blank", "noopener,noreferrer");
  };

  const handleZoomIn = () => {
    setZoom((prev) => {
      const nextIndex = ZOOM_STEPS.findIndex((z) => z > prev);
      return nextIndex !== -1 ? ZOOM_STEPS[nextIndex] : prev;
    });
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const prevSteps = ZOOM_STEPS.filter((z) => z < prev);
      return prevSteps.length > 0 ? prevSteps[prevSteps.length - 1] : prev;
    });
  };

  const handleResetZoom = () => {
    setZoom(100);
  };

  // Keyboard shortcuts: Esc (close), F (fullscreen), P (print), +, -, 0 (zoom)
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
      } else if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "P")) {
        // Let native print trigger handlePrint
      } else if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        handlePrint();
      } else if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === "-") {
        e.preventDefault();
        handleZoomOut();
      } else if (e.key === "0") {
        e.preventDefault();
        handleResetZoom();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <section id="scribd-viewer-container" className="mx-auto mt-8 w-full max-w-4xl">
      {/* Metadata Header Card */}
      {(doc.title || doc.authorName) && (
        <div className="print-hidden mb-4 flex flex-col gap-1.5 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-base font-semibold text-foreground sm:text-lg">
              {doc.title || `Scribd Document ${doc.id}`}
            </h2>
            {doc.authorName && (
              <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
                <UserIcon className="size-3.5 shrink-0" />
                <span>By</span>
                {doc.originalUrl ? (
                  <a
                    className="font-medium text-foreground underline decoration-border underline-offset-2 transition-colors hover:text-foreground/80"
                    href={doc.originalUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {doc.authorName}
                  </a>
                ) : (
                  <span className="font-medium text-foreground">{doc.authorName}</span>
                )}
              </div>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2 pt-2 sm:pt-0">
            <span className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-xs font-mono text-muted-foreground">
              ID: {doc.id}
            </span>
          </div>
        </div>
      )}

      {/* Toolbar Controls */}
      <div className="print-hidden mb-3 flex flex-wrap items-center gap-2">
        {fullscreenSupported && (
          <button
            className={toolbarButton}
            title="Toggle Fullscreen (Key: F)"
            type="button"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
            <span className="hidden sm:inline">
              {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            </span>
          </button>
        )}

        {/* Zoom Controls */}
        <div className="flex items-center rounded-lg border border-border bg-card">
          <button
            aria-label="Zoom Out"
            className="flex h-9 w-8 items-center justify-center text-foreground hover:bg-foreground/5 disabled:opacity-40"
            disabled={zoom <= ZOOM_STEPS[0]}
            title="Zoom Out (Key: -)"
            type="button"
            onClick={handleZoomOut}
          >
            <ZoomOutIcon />
          </button>
          <button
            aria-label="Reset Zoom"
            className="h-9 px-2 text-xs font-mono font-medium text-muted-foreground hover:bg-foreground/5"
            title="Reset Zoom (Key: 0)"
            type="button"
            onClick={handleResetZoom}
          >
            {zoom}%
          </button>
          <button
            aria-label="Zoom In"
            className="flex h-9 w-8 items-center justify-center text-foreground hover:bg-foreground/5 disabled:opacity-40"
            disabled={zoom >= ZOOM_STEPS[ZOOM_STEPS.length - 1]}
            title="Zoom In (Key: +)"
            type="button"
            onClick={handleZoomIn}
          >
            <ZoomInIcon />
          </button>
        </div>

        {/* Print / Export PDF */}
        <button
          className={toolbarButton}
          title="Save as PDF / Print (Key: P)"
          type="button"
          onClick={handlePrint}
        >
          <PrinterIcon />
          <span>Export PDF</span>
        </button>

        {/* Popout Reader */}
        <button
          className={toolbarButton}
          title="Open in new window"
          type="button"
          onClick={handlePopout}
        >
          <PopoutIcon />
          <span className="hidden sm:inline">Popout</span>
        </button>

        {/* Copy Embed Link */}
        <button className={toolbarButton} type="button" onClick={copyEmbedLink}>
          {copied ? <CheckIcon className="text-foreground" /> : <CopyIcon />}
          <span>{copied ? "Copied" : "Copy link"}</span>
        </button>

        {/* Open on Scribd */}
        <a
          className={toolbarButton}
          href={doc.originalUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <ExternalLinkIcon />
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
          <CloseIcon />
          <span>Close</span>
        </button>
      </div>

      {/* Embed Container */}
      <div
        id="scribd-embed-wrapper"
        ref={wrapperRef}
        className={`relative overflow-hidden bg-card ${
          isFullscreen ? "h-full" : "rounded-xl border border-border"
        }`}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-card">
            <div
              aria-label="Loading document"
              className="size-8 animate-spin rounded-full border-2 border-border border-t-foreground"
              role="status"
            />
          </div>
        )}
        <div
          className="w-full transition-transform duration-150 origin-top"
          style={{
            transform: zoom !== 100 ? `scale(${zoom / 100})` : undefined,
            width: zoom !== 100 ? `${100 / (zoom / 100)}%` : "100%",
          }}
        >
          <iframe
            allowFullScreen
            className={`w-full ${
              isFullscreen ? "h-full" : "h-[70dvh] min-h-[420px] sm:h-[78dvh]"
            }`}
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            src={doc.embedUrl}
            title={`Scribd document ${doc.id}`}
            onLoad={() => setLoading(false)}
          />
        </div>
      </div>
    </section>
  );
}

