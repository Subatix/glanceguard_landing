import type { Metadata } from "next";
import type { ReactNode } from "react";

import { getMarketingCanonicalOrigin } from "@/lib/site-metadata";

import "./globals.css";

const titleMeta = {
  default:
    "GlanceGuard - quiet heads-up when someone is behind your screen",
  template: "%s - GlanceGuard",
} satisfies Metadata["title"];

const description =
  "Quiet heads-up from your webcam when someone lingers behind you. Stays on your Mac. $20 once, one Mac, 30-day refund.";

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
