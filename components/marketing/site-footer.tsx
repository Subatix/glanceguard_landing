import Link from "next/link";

import { FooterLegalNav } from "@/components/marketing/footer-legal-nav";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__lead">
          <p className="site-footer__brand">GlanceGuard</p>
          <p>
            A paid macOS binary for on-device shoulder-surfing awareness.
            Source may be open; your camera feed is not a service endpoint.
          </p>
        </div>

        <div className="site-footer__nav">
          <Link href="/download">Download</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/refund">Refunds</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/support">Support</Link>
        </div>

        <div className="site-footer__bottom">
          <FooterLegalNav />
          <p>&copy; {new Date().getFullYear()} GlanceGuard</p>
        </div>
      </div>
    </footer>
  );
}
