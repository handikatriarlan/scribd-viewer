"use client";

import { Formik } from "formik";
import React from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ScribdViewer() {
  const [embedUrl, setEmbedUrl] = useState("");

  const convertToEmbedUrl = (url: string) => {
    const regex = /scribd\.com\/document\/(\d+)/;
    const match = url.match(regex);

    if (match && match[1]) {
      const documentId = match[1];

      return `https://www.scribd.com/embeds/${documentId}/content`;
    }

    return null;
  };

  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <div className="inline-block max-w-xl text-center justify-center w-full">
        <h1 className="text-4xl font-bold">Scribd Viewer</h1>
        <h2 className="text-xl text-gray-500">Embed Scribd documents easily</h2>
      </div>

      {/* Jika embed URL sudah ada, tampilkan iframe */}
      {embedUrl !== "" && (
        <div className="flex flex-col gap-2 w-full max-w-xl mt-4">
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
                toast.error("Embed URL is not available!");
              }
            }}
          >
            Open in a New Tab
          </Button>

          <Button
            color="secondary"
            onClick={() => {
              navigator.clipboard.writeText(embedUrl);
              toast.success("Embed URL copied to clipboard!");
            }}
          >
            Copy Embed URL
          </Button>
        </div>
      )}

      {/* Form input URL untuk mengubah menjadi embed URL */}
      <Formik
        initialValues={{ url: "" }}
        onSubmit={(values, { resetForm }) => {
          const embedLink = convertToEmbedUrl(values.url);

          if (embedLink) {
            setEmbedUrl(embedLink);
            toast.success("Embed link generated successfully!");
          } else {
            toast.error("Invalid Scribd URL");
          }
          resetForm();
        }}
      >
        {({ values, handleSubmit, handleChange, resetForm }) => (
          <form
            className="flex flex-col gap-2 w-full max-w-xl"
            onSubmit={handleSubmit}
          >
            <Input
              className="w-full"
              label="Scribd URL"
              name="url"
              placeholder="Enter your Scribd document URL"
              value={values.url}
              onChange={handleChange}
            />
            <div className="flex flex-col sm:flex-row gap-2">
              <Button color="primary" type="submit">
                Generate Embed URL
              </Button>
              <Button
                color="default"
                type="button"
                onClick={() => {
                  resetForm();
                  setEmbedUrl("");
                }}
              >
                Reset
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
