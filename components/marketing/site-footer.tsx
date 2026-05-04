import Link from "next/link";

import { FooterLegalNav } from "@/components/marketing/footer-legal-nav";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="border-border mt-28 border-t">
      <div className="text-muted-foreground mx-auto grid max-w-5xl gap-12 px-4 py-14 text-sm">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
          <div className="space-y-4">
            <p className="text-foreground text-base font-medium tracking-tight">
              GlanceGuard
            </p>
            <p className="max-w-md leading-relaxed">
              On-device shoulder-surfing awareness for Apple Silicon Macs —
              webcam → face pipeline → discreet warning when someone else lingers in
              frame.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-4">
              <p className="text-foreground text-xs tracking-wide uppercase">
                Policies
              </p>
              <ul className="space-y-2">
                <li>
                  <Link className="hover:text-foreground" href="/privacy">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-foreground" href="/refund">
                    Refunds
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-foreground" href="/terms">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-foreground text-xs tracking-wide uppercase">
                Product
              </p>
              <ul className="space-y-2">
                <li>
                  <Link className="hover:text-foreground" href="/download">
                    Download DMG
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-foreground" href="/support">
                    Support &amp; OSS
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-wrap items-start gap-x-12 gap-y-6">
            <div className="space-y-2">
              <p className="text-foreground text-xs tracking-wide uppercase">
                Policy menu · shadcn navigation
              </p>
              <FooterLegalNav />
            </div>
            <div className="max-w-xl space-y-2">
              <p className="text-xs leading-relaxed">
                Paid DMG stays separate from OSS source (Apache where published).
                Telemetry defaults off unless you toggle it inside the shipped app.
              </p>
            </div>
          </div>
          <p className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} GlanceGuard
          </p>
        </div>
      </div>
    </footer>
  );
}
