"use client";

import { preconnect } from "react-dom";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import type { ScribdDocument } from "@/lib/scribd";

import {
  CheckIcon,
  CloseIcon,
  CopyIcon,
  DownloadIcon,
  ExternalLinkIcon,
  MaximizeIcon,
  MinimizeIcon,
  PrinterIcon,
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
  const [showDownloadModal, setShowDownloadModal] = useState(false);

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

  const handlePrint = () => {
    window.print();
  };

  const openDocDownloader = async () => {
    try {
      await navigator.clipboard.writeText(doc.originalUrl);
    } catch {
      // Ignore
    }
    window.open("https://docdownloader.com/", "_blank", "noopener,noreferrer");
  };

  const openScribdDownload = () => {
    window.open(
      `https://www.scribd.com/document_downloads/${doc.id}?extension=pdf`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  // Keyboard shortcuts: Esc (close), F (fullscreen), D (download modal)
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
        if (showDownloadModal) {
          setShowDownloadModal(false);
        } else {
          onClose();
        }
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === "d" || e.key === "D") {
        e.preventDefault();
        setShowDownloadModal((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, showDownloadModal]);

  return (
    <section
      id="scribd-viewer-container"
      className="mx-auto mt-4 sm:mt-8 w-full max-w-4xl px-3 sm:px-6"
    >
      {/* Metadata Header Card (No ID Badge, No Author Link Redirect) */}
      {(doc.title || doc.authorName) && (
        <div className="print-hidden mb-2.5 sm:mb-4 rounded-lg sm:rounded-xl border border-border bg-card p-2.5 sm:p-4">
          <h2 className="text-xs sm:text-base font-semibold leading-snug text-foreground line-clamp-2">
            {doc.title || "Dokumen Scribd"}
          </h2>
          {doc.authorName && (
            <div className="mt-1 flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground">
              <UserIcon className="size-3 sm:size-3.5 shrink-0" />
              <span>
                Oleh <span className="font-medium text-foreground">{doc.authorName}</span>
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
            title="Layar Penuh (Tombol: F)"
            type="button"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <MinimizeIcon className="size-3.5 sm:size-4" />
            ) : (
              <MaximizeIcon className="size-3.5 sm:size-4" />
            )}
            <span className="hidden sm:inline">
              {isFullscreen ? "Keluar" : "Fullscreen"}
            </span>
          </button>
        )}

        {/* Tombol Unduh Dokumen */}
        <button
          className={`${toolbarButton} bg-foreground text-background hover:bg-foreground/90 border-transparent`}
          title="Unduh Dokumen (Tombol: D)"
          type="button"
          onClick={() => setShowDownloadModal(true)}
        >
          <DownloadIcon className="size-3.5 sm:size-4" />
          <span className="font-medium">Unduh</span>
        </button>

        {/* Salin Tautan */}
        <button className={toolbarButton} type="button" onClick={copyEmbedLink}>
          {copied ? (
            <CheckIcon className="size-3.5 sm:size-4 text-foreground" />
          ) : (
            <CopyIcon className="size-3.5 sm:size-4" />
          )}
          <span>{copied ? "Tersalin" : "Salin"}</span>
        </button>

        {/* Buka di Scribd */}
        <a
          className={toolbarButton}
          href={doc.originalUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <ExternalLinkIcon className="size-3.5 sm:size-4" />
          <span className="hidden sm:inline">Buka di Scribd</span>
        </a>

        {/* Tombol Tutup */}
        <button
          aria-label="Tutup dokumen"
          className={`${toolbarButton} ml-auto`}
          title="Tutup (Tombol: Esc)"
          type="button"
          onClick={onClose}
        >
          <CloseIcon className="size-3.5 sm:size-4" />
          <span className="hidden sm:inline">Tutup</span>
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
              aria-label="Memuat dokumen..."
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

      {/* Modal / Dialog Unduh Dokumen (Mobile-First, Sangat Ringkas & Nyaman) */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-xs animate-in">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <DownloadIcon className="size-4 text-foreground" />
                <h3 className="text-xs sm:text-sm font-semibold text-foreground">
                  Unduh Dokumen
                </h3>
              </div>
              <button
                aria-label="Tutup modal"
                className="cursor-pointer rounded-md p-1 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                type="button"
                onClick={() => setShowDownloadModal(false)}
              >
                <CloseIcon className="size-4" />
              </button>
            </div>

            <p className="mt-2.5 text-[11px] sm:text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {doc.title || "Dokumen Scribd"}
            </p>

            <div className="mt-3.5 flex flex-col gap-2">
              <button
                className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-border bg-foreground/5 p-2.5 text-left transition-colors hover:bg-foreground/10"
                type="button"
                onClick={openDocDownloader}
              >
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-foreground">
                    Unduh File PDF Lengkap
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Generator unduhan otomatis dokumen penuh
                  </span>
                </div>
                <ExternalLinkIcon className="size-3.5 text-muted-foreground" />
              </button>

              <button
                className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-border bg-card p-2.5 text-left transition-colors hover:bg-foreground/5"
                type="button"
                onClick={openScribdDownload}
              >
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-foreground">
                    Unduh Resmi dari Scribd
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Jika dokumen gratis atau memiliki akun
                  </span>
                </div>
                <ExternalLinkIcon className="size-3.5 text-muted-foreground" />
              </button>

              <button
                className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-border bg-card p-2.5 text-left transition-colors hover:bg-foreground/5"
                type="button"
                onClick={() => {
                  setShowDownloadModal(false);
                  handlePrint();
                }}
              >
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-foreground">
                    Simpan Cepat (Browser PDF)
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Simpan langsung melalui menu print browser
                  </span>
                </div>
                <PrinterIcon className="size-3.5 text-muted-foreground" />
              </button>
            </div>

            <button
              className="mt-3 w-full cursor-pointer rounded-lg py-2 text-center text-[11px] font-medium text-muted-foreground hover:text-foreground"
              type="button"
              onClick={() => setShowDownloadModal(false)}
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </section>
  );
}


