import { Suspense } from "react";

import { ViewerApp } from "@/components/viewer-app";

function ViewerFallback() {
  return (
    <div className="pt-10 text-center sm:pt-16" role="status">
      <div className="mx-auto h-9 w-64 max-w-full animate-pulse rounded-lg bg-foreground/10 sm:h-10" />
      <div className="mx-auto mt-3 h-6 w-80 max-w-full animate-pulse rounded-lg bg-foreground/10" />
      <div className="mx-auto mt-8 h-24 w-full max-w-xl animate-pulse rounded-2xl bg-foreground/10" />
      <span className="sr-only">Loading</span>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<ViewerFallback />}>
      <ViewerApp />
    </Suspense>
  );
}
