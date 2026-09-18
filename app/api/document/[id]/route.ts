import { NextRequest, NextResponse } from "next/server";

import { isValidScribdId } from "@/lib/scribd";

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

  try {
    const oembedUrl = `https://www.scribd.com/services/oembed?url=https://www.scribd.com/document/${id}&format=json`;
    const res = await fetch(oembedUrl, {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Document not found or inaccessible" },
        { status: res.status }
      );
    }

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("json")) {
      return NextResponse.json(
        { error: "Unexpected response format from Scribd" },
        { status: 502 }
      );
    }

    const data = (await res.json()) as {
      title?: string;
      author_name?: string;
      author_url?: string;
      thumbnail_url?: string;
    };

    return NextResponse.json(
      {
        id,
        title: data.title ?? `Scribd Document ${id}`,
        authorName: data.author_name ?? "Unknown Author",
        authorUrl: data.author_url ?? null,
        thumbnailUrl: data.thumbnail_url ?? null,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch document metadata" },
      { status: 500 }
    );
  }
}
