"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

import {
  addToHistory,
  clearHistory,
  getHistoryServerSnapshot,
  getHistorySnapshot,
  subscribeHistory,
  updateHistoryMetadata,
} from "@/lib/history";
import {
  fetchScribdMetadata,
  isValidScribdId,
  parseScribdInput,
  toScribdDocument,
  type ScribdMetadata,
} from "@/lib/scribd";

import { DocumentViewer } from "@/components/document-viewer";
import { HistoryList } from "@/components/history-list";
import { UrlForm } from "@/components/url-form";

export function ViewerApp() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawParam = searchParams.get("d");
  const docId = rawParam && isValidScribdId(rawParam) ? rawParam : null;

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [remoteMetadata, setRemoteMetadata] = useState<ScribdMetadata | null>(null);

  const history = useSyncExternalStore(
    subscribeHistory,
    getHistorySnapshot,
    getHistoryServerSnapshot,
  );

  const activeEntry = docId ? history.find((item) => item.id === docId) : null;

  useEffect(() => {
    if (!docId) return;

    addToHistory({
      id: docId,
      sourceUrl: `https://www.scribd.com/document/${docId}`,
    });

    let active = true;
    fetchScribdMetadata(docId).then((meta) => {
      if (!active || !meta) return;
      setRemoteMetadata(meta);
      updateHistoryMetadata(docId, {
        title: meta.title,
        author: meta.authorName ?? undefined,
        thumbnailUrl: meta.thumbnailUrl,
      });
    });

    return () => {
      active = false;
    };
  }, [docId]);

  const doc = docId
    ? {
        ...toScribdDocument(docId),
        title:
          remoteMetadata?.id === docId
            ? remoteMetadata.title
            : activeEntry?.title,
        authorName:
          remoteMetadata?.id === docId
            ? remoteMetadata.authorName
            : activeEntry?.author,
        thumbnailUrl:
          remoteMetadata?.id === docId
            ? remoteMetadata.thumbnailUrl
            : activeEntry?.thumbnailUrl,
      }
    : null;

  const openDocument = (id: string) => {
    router.replace(`/?d=${id}`, { scroll: false });
  };

  const handleSubmit = (value: string) => {
    const parsed = parseScribdInput(value);

    if (!parsed) {
      setError("That doesn't look like a Scribd document link or ID.");

      return;
    }

    setError(null);
    openDocument(parsed.id);
  };

  return (
    <>
      <UrlForm
        error={error}
        value={inputValue}
        onChange={(value) => {
          setInputValue(value);
          if (error) setError(null);
        }}
        onSubmit={handleSubmit}
      />
      {doc && (
        <DocumentViewer
          key={doc.id}
          doc={doc}
          onClose={() => router.replace("/", { scroll: false })}
        />
      )}
      <HistoryList
        activeId={docId}
        entries={history}
        onClear={clearHistory}
        onSelect={openDocument}
      />
    </>
  );
}
