import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";

import { Analytics } from "@vercel/analytics/react";
import { Inter, Instrument_Serif } from "next/font/google";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { siteConfig } from "@/config/site";

import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Read Scribd Documents Online Free`,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: "utilities",
  formatDetection: {
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: "default",
  },
  keywords: [
    "Scribd viewer",
    "Scribd document viewer",
    "view Scribd documents",
    "Scribd locked documents",
    "free Scribd viewer",
    "read Scribd documents",
    "Scribd premium documents",
    "unlock Scribd",
    "Scribd document reader",
  ],
  authors: [siteConfig.author],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} — Read Scribd Documents Online Free`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Scribd Viewer - View Scribd Locked Documents for Free",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Read Scribd Documents Online Free`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfa" },
    { media: "(prefers-color-scheme: dark)", color: "#1b1b1f" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${inter.variable} ${instrumentSerif.variable} flex min-h-dvh flex-col font-sans antialiased`}
      >
        <Providers>
          <Header />
          <main className="mx-auto w-full max-w-3xl flex-1 px-3 sm:px-4">
            {children}
          </main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
