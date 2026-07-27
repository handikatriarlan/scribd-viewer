# Scribd Viewer

![Scribd Viewer Website Screenshot](https://ucarecdn.com/97714dad-3815-4264-b299-4dc5ca6d7aef/scribdhandikatriarlandev.png)

A free online tool to view Scribd locked documents. Paste a Scribd link (or a bare document ID) and read the full document instantly — no account needed.

## Features

- Supports every Scribd link format: `/document`, `/doc`, `/presentation`, `/book`, `/embeds`, and bare document IDs
- Shareable viewer links — `/?d=<id>` opens the document directly
- Recent documents history (stored locally in your browser)
- Fullscreen reading mode
- Copy the embed link or open the original document on Scribd
- Light/dark theme with system preference support
- Fully responsive, mobile-friendly UI

## Tech Stack

- **Next.js 16** — React framework (App Router, Turbopack)
- **React 19**
- **Tailwind CSS 4** — CSS-first configuration, no component library
- **TypeScript**
- **next-themes** — theme switching
- Hosted on Vercel with Vercel Analytics

## Getting Started

```bash
git clone https://github.com/handikatriarlan/scribd-viewer.git
cd scribd-viewer
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Scripts

| Command             | Description              |
| ------------------- | ------------------------ |
| `npm run dev`       | Start development server |
| `npm run build`     | Production build         |
| `npm run start`     | Serve production build   |
| `npm run lint`      | Run ESLint               |
| `npm run typecheck` | Run TypeScript checks    |

## Usage

1. Paste a Scribd document URL (or its numeric ID) into the input field.
2. Press **View document** — the document loads right below.
3. Use the toolbar to go fullscreen, copy the embed link, or open the original on Scribd.
4. Reopen anything you've viewed before from the **Recent documents** list.
