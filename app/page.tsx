import { Suspense } from "react";

import { ViewerApp } from "@/components/viewer-app";
import { siteConfig } from "@/config/site";

const faqs = [
  {
    question: "How do I view a Scribd document for free?",
    answer:
      "Copy the link of any Scribd document, paste it into the input field above, and press View document. The full document opens right on this page — no Scribd account or premium subscription needed.",
  },
  {
    question: "Which Scribd links are supported?",
    answer:
      "Scribd Viewer works with every Scribd URL format: scribd.com/document, /doc, /presentation, /book, and /embeds links, including localized subdomains like id.scribd.com or fr.scribd.com. You can even paste just the numeric document ID.",
  },
  {
    question: "Do I need a Scribd account?",
    answer:
      "No. Scribd Viewer loads documents through Scribd's public embed reader, so you can read documents without signing up, logging in, or starting a trial.",
  },
  {
    question: "Is my reading history private?",
    answer:
      "Yes. Your recent documents are stored only in your own browser (localStorage) and never leave your device. Clear them anytime with one click.",
  },
];

const steps = [
  {
    title: "Copy a Scribd link",
    description: "Grab the URL of any document, presentation, or book on Scribd.",
  },
  {
    title: "Paste it here",
    description: "Drop the link (or just the document ID) into the input field.",
  },
  {
    title: "Read instantly",
    description: "The full document loads on the page — free, fast, fullscreen.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      inLanguage: "en",
      publisher: { "@id": `${siteConfig.url}/#author` },
    },
    {
      "@type": "WebApplication",
      "@id": `${siteConfig.url}/#app`,
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: { "@id": `${siteConfig.url}/#author` },
    },
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#author`,
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
    {
      "@type": "FAQPage",
      "@id": `${siteConfig.url}/#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

function ViewerFallback() {
  return (
    <div className="mx-auto mt-8 w-full max-w-xl" role="status">
      <div className="h-24 w-full animate-pulse rounded-2xl bg-foreground/10" />
      <span className="sr-only">Loading</span>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <section className="pt-4 px-3.5 text-center sm:pt-14 sm:px-6">
        <h1 className="mt-2 text-xl font-extrabold tracking-tight sm:text-4xl text-foreground text-balance">
          Read Scribd documents freely
        </h1>
        <p className="mx-auto mt-2 max-w-md text-xs text-muted-foreground sm:text-base leading-relaxed">
          Paste a Scribd link and read the full document — no account, no
          paywall prompts.
        </p>
      </section>
      <Suspense fallback={<ViewerFallback />}>
        <ViewerApp />
      </Suspense>
      <section aria-labelledby="how-it-works" className="mx-auto mt-10 sm:mt-16 w-full max-w-2xl px-3.5 sm:px-6">
        <h2
          className="text-center text-sm sm:text-lg font-semibold tracking-tight text-foreground"
          id="how-it-works"
        >
          How it works
        </h2>
        <ol className="mt-3.5 sm:mt-6 grid gap-2.5 sm:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="rounded-xl sm:rounded-2xl border border-border bg-card p-3 sm:p-3.5 text-center shadow-2xs"
            >
              <span className="mx-auto flex size-6 sm:size-7 items-center justify-center rounded-full bg-foreground text-[11px] sm:text-xs font-bold text-background">
                {index + 1}
              </span>
              <h3 className="mt-2 text-xs sm:text-sm font-semibold text-foreground">{step.title}</h3>
              <p className="mt-1 text-[11px] sm:text-xs leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>
      <section aria-labelledby="faq" className="mx-auto mt-10 sm:mt-16 w-full max-w-2xl px-3.5 sm:px-6">
        <h2 className="text-center text-sm sm:text-lg font-semibold tracking-tight text-foreground" id="faq">
          Frequently asked questions
        </h2>
        <div className="mt-3.5 sm:mt-6 flex flex-col gap-2 sm:gap-2.5">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl sm:rounded-2xl border border-border bg-card px-3 sm:px-3.5 py-2.5 sm:py-3 transition-colors open:border-foreground/40 shadow-2xs"
            >
              <summary className="cursor-pointer list-none text-xs sm:text-sm font-medium text-foreground marker:hidden [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-2.5 sm:gap-3">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="text-muted-foreground transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-2 text-[11px] sm:text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
