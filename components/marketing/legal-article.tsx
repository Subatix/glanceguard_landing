import type { ReactNode } from "react";

import { MarketingShell } from "@/components/marketing/marketing-shell";

export function LegalArticle(props: { title: string; children: ReactNode }) {
  return (
    <MarketingShell>
      <div className="mx-auto flex w-full max-w-prose flex-col gap-10 px-4 py-16 text-base leading-relaxed">
        <header className="space-y-2">
          <h1 className="gf-display tracking-tighter text-3xl font-semibold text-pretty md:text-[2.125rem]">
            {props.title}
          </h1>
          <div className="bg-border h-px w-full" aria-hidden />
        </header>
        <div className="text-muted-foreground space-y-4 [&_a]:underline [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6">
          {props.children}
        </div>
      </div>
    </MarketingShell>
  );
}
