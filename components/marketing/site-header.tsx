import Link from "next/link";

import { BuyCheckoutButton } from "@/components/marketing/buy-checkout-button";

const navLinks = [
  { href: "/download", label: "Download" },
  { href: "/privacy", label: "Privacy" },
  { href: "/refund", label: "Refunds" },
  { href: "/support", label: "Support" },
  { href: "/terms", label: "Terms" },
] as const;

export function SiteHeader() {
  return (
    <header className="border-border bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-x-8 gap-y-4 px-4 py-4">
        <Link
          href="/"
          className="tracking-tighter text-xl font-semibold tracking-tight text-foreground"
        >
          GlanceGuard
        </Link>

        <nav
          aria-label="Site navigation"
          className="hidden flex-wrap items-center gap-x-8 gap-y-3 md:flex"
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto w-[min(100%,272px)] min-w-[200px]">
          <BuyCheckoutButton className="w-full shadow-sm" />
        </div>
      </div>
    </header>
  );
}
