import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from "react-toastify";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import ReactQueryClientProvider from "@/providers/ReactQueryClientProvider";
import PageLayout from "@/components/organisms/PageLayout";

import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
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
  authors: [
    {
      name: "Arlan Tri Handika",
      url: "https://handikatriarlan.dev",
    },
  ],
  creator: "Arlan Tri Handika",
  publisher: "Arlan Tri Handika",
  metadataBase: new URL("https://scribd.handikatriarlan.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://scribd.handikatriarlan.dev",
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "https://ucarecdn.com/bdf85075-59d7-42f9-986b-7960303860c6/scribdviewer.png",
        width: 1200,
        height: 630,
        alt: "Scribd Viewer - View Scribd Locked Documents for Free",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      "https://ucarecdn.com/bdf85075-59d7-42f9-986b-7960303860c6/scribdviewer.png",
    ],
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
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <ReactQueryClientProvider>
            <PageLayout>{children}</PageLayout>
          </ReactQueryClientProvider>
        </Providers>
        <ToastContainer />
        <Analytics />
      </body>
    </html>
  );
}
