import type { Metadata } from "next";
import type { ReactNode } from "react";

import { getMarketingCanonicalOrigin } from "@/lib/site-metadata";

import "./globals.css";

const titleMeta = {
  default: "GlanceGuard - know when someone's looking at your screen",
  template: "%s - GlanceGuard",
} satisfies Metadata["title"];

const description =
  "$20 lifetime, one Mac. GlanceGuard uses your webcam, on-device only, to detect when another person's face lingers beside yours and warns you before your screen leaks.";

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
