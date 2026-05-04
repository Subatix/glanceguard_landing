import Link from "next/link";

import { BuyCheckoutButton } from "@/components/marketing/buy-checkout-button";
import { Button } from "@/components/ui/button";

export function PricingPanel() {
  return (
    <section className="pricing-panel" id="pricing">
      <div className="pricing-panel__copy">
        <span className="section-kicker">Get GlanceGuard</span>
        <h2>$20. Yours forever. No subscription.</h2>
        <p>
          One quiet little Mac app that pays for itself the first time you’re
          glad it’s there. Try it for a month — if it isn’t for you, you get
          your money back.
        </p>
      </div>

      <div className="pricing-panel__box">
        <div className="pricing-panel__price">
          <span>$20</span>
          <small>once · one Mac</small>
        </div>
        <BuyCheckoutButton className="pricing-panel__button" />
        <div className="pricing-panel__links">
          <Link href="/refund">30-day refund</Link>
          <Link href="/download">How to install</Link>
        </div>
        <Button variant="outline" size="lg" asChild className="pricing-panel__secondary">
          <Link href="/privacy">How your privacy is handled</Link>
        </Button>
      </div>
    </section>
  );
}
