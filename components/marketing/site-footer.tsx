import Link from "next/link";

import { FooterLegalNav } from "@/components/marketing/footer-legal-nav";
import { glanceguardRepoHomepage } from "@/lib/site-links";

export function SiteFooter() {
  const repoUrl = glanceguardRepoHomepage().toString();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__lead">
          <p className="site-footer__brand">GlanceGuard</p>
          <p>
            A small, quiet Mac app that lets you know when someone is reading
            over your shoulder.
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
          <p className="site-footer__meta">
            &copy; {new Date().getFullYear()} GlanceGuard
            {" · "}
            <a
              className="site-footer__source"
              href={repoUrl}
              rel="noreferrer"
              target="_blank"
            >
              source
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
