import Link from "next/link";

import { BuyCheckoutButton } from "@/components/marketing/buy-checkout-button";
import { Button } from "@/components/ui/button";

export function PricingPanel() {
  return (
    <section className="pricing-panel" id="pricing">
      <div className="pricing-panel__copy">
        <span className="section-kicker">Purchase</span>
        <h2>$20. One Mac. No subscription.</h2>
        <p>
          A lifetime license for people who work around other people. No free
          trial; the 30-day refund is the trust signal.
        </p>
      </div>

      <div className="pricing-panel__box">
        <div className="pricing-panel__price">
          <span>$20</span>
          <small>USD lifetime</small>
        </div>
        <BuyCheckoutButton className="pricing-panel__button" />
        <div className="pricing-panel__links">
          <Link href="/refund">30-day refund policy</Link>
          <Link href="/download">Download notes</Link>
        </div>
        <Button variant="outline" size="lg" asChild className="pricing-panel__secondary">
          <Link href="/privacy">Read the privacy boundary</Link>
        </Button>
      </div>
    </section>
  );
}
