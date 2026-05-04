import type { ReactNode } from "react";

export const metadata = {
  title: "GlanceGuard",
  description: "GlanceGuard — observer detection for your Mac",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
