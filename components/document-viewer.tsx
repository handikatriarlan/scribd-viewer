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
} from "@/components/icons";

const toolbarButton =
  "flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-sm text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

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

  return (
    <section className="mx-auto mt-8 w-full max-w-3xl">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {fullscreenSupported && (
          <button
            className={toolbarButton}
            type="button"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
            {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          </button>
        )}
        <button className={toolbarButton} type="button" onClick={copyEmbedLink}>
          {copied ? <CheckIcon className="text-accent" /> : <CopyIcon />}
          {copied ? "Copied" : "Copy link"}
        </button>
        <a
          className={toolbarButton}
          href={doc.originalUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <ExternalLinkIcon />
          Open on Scribd
        </a>
        <button
          aria-label="Close viewer"
          className={`${toolbarButton} ml-auto`}
          type="button"
          onClick={onClose}
        >
          <CloseIcon />
          Close
        </button>
      </div>
      <div
        ref={wrapperRef}
        className={`relative overflow-hidden bg-card ${
          isFullscreen ? "h-full" : "rounded-xl border border-border"
        }`}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-card">
            <div
              aria-label="Loading document"
              className="size-8 animate-spin rounded-full border-2 border-border border-t-accent"
              role="status"
            />
          </div>
        )}
        <iframe
          allowFullScreen
          className={`w-full ${isFullscreen ? "h-full" : "h-[70dvh] min-h-[420px] sm:h-[78dvh]"}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          src={doc.embedUrl}
          title={`Scribd document ${doc.id}`}
          onLoad={() => setLoading(false)}
        />
      </div>
    </section>
  );
}
