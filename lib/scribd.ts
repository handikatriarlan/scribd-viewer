export interface ScribdDocument {
  id: string;
  embedUrl: string;
  originalUrl: string;
}

const BARE_ID_RE = /^\d{4,15}$/;
const PATH_RE = /^\/(?:document|doc|presentation|book|embeds)\/(\d+)(?:[/?#]|$)/i;

export function isValidScribdId(value: string): boolean {
  return BARE_ID_RE.test(value);
}

export function extractScribdId(input: string): string | null {
  const raw = input.trim();

  if (raw === "") return null;
  if (BARE_ID_RE.test(raw)) return raw;

  let url: URL;

  try {
    url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    return null;
  }

  const host = url.hostname.toLowerCase();

  if (host !== "scribd.com" && !host.endsWith(".scribd.com")) return null;

  const match = url.pathname.match(PATH_RE);

  return match ? match[1] : null;
}

export function toScribdDocument(id: string): ScribdDocument {
  return {
    id,
    embedUrl: `https://www.scribd.com/embeds/${id}/content`,
    originalUrl: `https://www.scribd.com/document/${id}`,
  };
}

export function parseScribdInput(input: string): ScribdDocument | null {
  const id = extractScribdId(input);

  return id ? toScribdDocument(id) : null;
}
