import type { Metadata } from "next";
import type { ReactNode } from "react";

import { getMarketingCanonicalOrigin } from "@/lib/site-metadata";

import "./globals.css";

const titleMeta = {
  default: "GlanceGuard - notice when someone is reading over your shoulder",
  template: "%s - GlanceGuard",
} satisfies Metadata["title"];

const description =
  "A small Mac app that gives you a quiet heads-up when someone is reading over your shoulder. $20, one Mac, yours forever. Your camera stays on your Mac.";

export const metadata: Metadata = {
  metadataBase: getMarketingCanonicalOrigin(),
  title: titleMeta,
  description,
  applicationName: "GlanceGuard",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "GlanceGuard",
    title: titleMeta.default ?? "GlanceGuard",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: titleMeta.default ?? "GlanceGuard",
    description,
    creator: "@Subatix",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
