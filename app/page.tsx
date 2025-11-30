"use client";

import React, { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { toast } from "sonner";

export default function ScribdViewer() {
  const [embedUrl, setEmbedUrl] = useState("");
  const [url, setUrl] = useState("");

  const convertToEmbedUrl = (inputUrl: string) => {
    const regex = /scribd\.com\/document\/(\d+)/;
    const match = inputUrl.match(regex);

    if (match && match[1]) {
      const documentId = match[1];

      return `https://www.scribd.com/embeds/${documentId}/content`;
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const embedLink = convertToEmbedUrl(url);

    if (embedLink) {
      setEmbedUrl(embedLink);
      toast.success("Link generated successfully!");
    } else {
      toast.error("Invalid Scribd URL");
    }
    setUrl("");
  };

  const handleReset = () => {
    setUrl("");
    setEmbedUrl("");
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 mt-5">
      <div className="inline-block max-w-xl text-center justify-center w-full">
        <h1 className="text-4xl font-bold">Scribd Viewer</h1>
        <h2 className="text-xl text-gray-500 mt-2 mb-2">
          Open Scribd documents easily
        </h2>
      </div>

      {/* Jika embed URL sudah ada, tampilkan iframe */}
      {embedUrl !== "" && (
        <div className="flex flex-col gap-3 w-full max-w-xl mt-4">
          <iframe
            height="600px"
            src={embedUrl}
            title="Scribd Document"
            width="100%"
          />
          <Button
            color="primary"
            onClick={() => {
              if (embedUrl) {
                window.open(embedUrl, "_blank");
              } else {
                toast.error("URL is not available!");
              }
            }}
          >
            Open in a New Tab
          </Button>
        </div>
      )}

      {/* Form input URL untuk mengubah menjadi embed URL */}
      <form
        className="flex flex-col gap-5 w-full max-w-xl"
        onSubmit={handleSubmit}
      >
        <Input
          className="w-full"
          label="Scribd URL"
          name="url"
          placeholder="Enter your Scribd document URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            className="flex-1 h-10 min-h-[40px]"
            color="primary"
            type="submit"
          >
            Generate
          </Button>
          <Button
            className="flex-1 h-10 min-h-[40px]"
            color="default"
            type="button"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
