import Link from "next/link";

import { BuyCheckoutButton } from "@/components/marketing/buy-checkout-button";

const navLinks = [
  { href: "/#how", label: "Mechanism" },
  { href: "/#privacy-story", label: "Privacy" },
  { href: "/download", label: "Download" },
  { href: "/support", label: "Support" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link
          href="/"
          className="site-header__brand"
          aria-label="GlanceGuard home"
        >
          GlanceGuard
        </Link>

        <nav
          aria-label="Site navigation"
          className="site-header__nav"
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="site-header__link"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__buy">
          <BuyCheckoutButton size="sm" className="site-header__button" />
        </div>
      </div>
    </header>
  );
}
