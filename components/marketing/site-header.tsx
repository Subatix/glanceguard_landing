import Image from "next/image";
import Link from "next/link";

import { BuyCheckoutButton } from "@/components/marketing/buy-checkout-button";

const navLinks = [
  { href: "/#how", label: "How it works" },
  { href: "/#privacy-story", label: "Privacy" },
  { href: "/download", label: "Download" },
  { href: "/support", label: "Support" },
] as const;

function NavLinks({ variant }: { variant: "desktop" | "drawer" }) {
  const linkClass =
    variant === "desktop"
      ? "site-header__rail-link"
      : "site-header__drawer-link";

  return (
    <>
      {navLinks.map((l) => (
        <Link key={l.href} href={l.href} className={linkClass}>
          {l.label}
        </Link>
      ))}
    </>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link
          href="/"
          className="site-header__brand"
          aria-label="GlanceGuard home"
        >
          <Image
            src="/branding/glanceguard-icon.png"
            alt=""
            width={128}
            height={128}
            className="site-header__brand-icon"
            sizes="26px"
            priority
          />
          GlanceGuard
        </Link>

        <nav
          className="site-header__rail"
          aria-label="Site navigation"
        >
          <div className="site-header__rail-track">
            <NavLinks variant="desktop" />
          </div>
        </nav>

        <div className="site-header__end">
          <details className="site-header__drawer">
            <summary className="site-header__drawer-trigger">
              <span className="site-header__drawer-lines" aria-hidden>
                <span />
                <span />
                <span />
              </span>
              <span className="sr-only">Site menu</span>
            </summary>
            <div className="site-header__drawer-panel">
              <nav aria-label="Sections">
                <NavLinks variant="drawer" />
              </nav>
            </div>
          </details>

          <BuyCheckoutButton size="sm" className="site-header__buy-btn shrink-0" />
        </div>
      </div>
    </header>
  );
}
