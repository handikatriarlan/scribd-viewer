import { NextRequest, NextResponse } from "next/server";

import { isValidScribdId } from "@/lib/scribd";

export const runtime = "edge";

function parseXmlMetadata(xml: string, id: string) {
  const titleMatch = xml.match(/<title>(.*?)<\/title>/);
  const authorMatch = xml.match(/<author-name>(.*?)<\/author-name>/);
  const authorUrlMatch = xml.match(/<author-url>(.*?)<\/author-url>/);
  const thumbMatch = xml.match(/<thumbnail-url>(.*?)<\/thumbnail-url>/);

  return {
    id,
    title: titleMatch ? titleMatch[1] : "Scribd Document",
    authorName: authorMatch ? authorMatch[1] : null,
    authorUrl: authorUrlMatch ? authorUrlMatch[1] : null,
    thumbnailUrl: thumbMatch ? thumbMatch[1] : null,
  };
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!isValidScribdId(id)) {
    return NextResponse.json(
      { error: "Invalid Scribd Document ID" },
      { status: 400 }
    );
  }

  const defaultHeaders = {
    Accept: "application/json, text/xml;q=0.9, */*;q=0.8",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
  };

  try {
    // 1. Coba format JSON
    const oembedUrl = `https://www.scribd.com/services/oembed?url=https://www.scribd.com/document/${id}&format=json`;
    const res = await fetch(oembedUrl, {
      headers: defaultHeaders,
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type") ?? "";

    if (res.ok && contentType.includes("json")) {
      const data = (await res.json()) as {
        title?: string;
        author_name?: string;
        author_url?: string;
        thumbnail_url?: string;
      };

      return NextResponse.json(
        {
          id,
          title: data.title ?? "Scribd Document",
          authorName: data.author_name ?? null,
          authorUrl: data.author_url ?? null,
          thumbnailUrl: data.thumbnail_url ?? null,
        },
        {
          headers: {
            "Cache-Control":
              "public, s-maxage=86400, stale-while-revalidate=43200",
          },
        }
      );
    }

    // 2. Fallback: Coba format XML jika JSON ditolak atau bukan JSON
    const xmlUrl = `https://www.scribd.com/services/oembed?url=https://www.scribd.com/document/${id}&format=xml`;
    const xmlRes = await fetch(xmlUrl, {
      headers: defaultHeaders,
      cache: "no-store",
    });

    if (xmlRes.ok) {
      const xmlText = await xmlRes.text();
      if (xmlText.includes("<oembed>")) {
        return NextResponse.json(parseXmlMetadata(xmlText, id), {
          headers: {
            "Cache-Control":
              "public, s-maxage=86400, stale-while-revalidate=43200",
          },
        });
      }
    }
  } catch {
    // Abaikan error upstream network
  }

  // 3. Graceful Fallback: Selalu kembalikan HTTP 200 agar console browser tidak merah (502 Bad Gateway)
  return NextResponse.json(
    {
      id,
      title: "Scribd Document",
      authorName: null,
      authorUrl: null,
      thumbnailUrl: null,
      isFallback: true,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60",
      },
    }
  );
}
