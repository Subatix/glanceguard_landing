import type { ReactNode } from "react";

import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipToMain />
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

export function SkipToMain() {
  return (
    <a
      href="#main-content"
      className="focus:bg-background sr-only ring-ring focus:not-sr-only focus:absolute focus:z-[100] focus:m-4 focus:inline-block focus:rounded-md focus:px-4 focus:py-3 focus:text-sm focus:ring-4"
    >
      Skip to content
    </a>
  );
}
