import Link from "next/link";
import type { Metadata } from "next";

import { BuyCheckoutButton } from "@/components/marketing/buy-checkout-button";
import { ContextSpotVisual } from "@/components/marketing/context-spot-visual";
import { HeroScene } from "@/components/marketing/hero-scene";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { MechanismTrace } from "@/components/marketing/mechanism-trace";
import { PricingPanel } from "@/components/marketing/pricing-panel";
import { PrivacyBoundary } from "@/components/marketing/privacy-boundary";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const faq = [
  {
    q: "Does GlanceGuard send my face anywhere?",
    a: "No. Your camera and anything it sees stay on your Mac. The only things our servers ever see are your purchase and your license — never your face.",
  },
  {
    q: "Why not just turn the camera off?",
    a: "Sometimes the camera is on for a reason — a call, an interview, a meeting. GlanceGuard is for those moments, when you’d still like a small heads-up if someone is reading along.",
  },
  {
    q: "Is there a free trial?",
    a: "There isn’t. It’s $20 once for one Mac, yours forever. If it isn’t for you, you have 30 days to ask for your money back, no questions asked.",
  },
  {
    q: "What does it actually do when someone is there?",
    a: "It waits a moment to make sure they’re actually there, then gives you a small, calm notice. It doesn’t scream, lock the screen, or take pictures.",
  },
] as const;

export default function HomePage() {
  return (
    <MarketingShell>
      <section className="home-hero">
        <div className="home-hero__inner">
          <div className="home-hero__copy">
            <p className="home-hero__kicker">Mac app · desks, cafes, aisle seats</p>
            <h1>Get notified when someone&apos;s looking at your screen.</h1>
            <p className="home-hero__lede">
              GlanceGuard uses your Mac&apos;s camera to spot when someone
              settles behind you—not a random passer-by. Runs only on this Mac
              (no cloud video); a subtle menu bar cue instead of shouting.
            </p>
            <div className="home-hero__actions">
              <BuyCheckoutButton className="home-hero__button" />
              <p>
                $20 · one Mac · <Link href="/refund">30-day refund</Link>
              </p>
            </div>
            <p className="home-hero__microfacts">
              Catch shoulder-surfers early · Runs only here · Quick menu-bar
              cue
            </p>
          </div>

          <HeroScene />
        </div>
      </section>

      <section className="context-spot" aria-labelledby="context-spot-heading">
        <div className="context-spot__copy">
          <p className="context-spot__eyebrow">Where it actually happens</p>
          <h2 id="context-spot-heading">
            The easy read is over your shoulder, not through the network.
          </h2>
          <p>
            Open rows, shared tables, aisle seats — the lid angles toward the
            room while your eyes stay forward. Someone a step back picks up more
            than you notice. GlanceGuard nudges you when attention hangs there —
            not for every passer-by.
          </p>
        </div>
        <ContextSpotVisual />
      </section>

      <MechanismTrace />
      <PrivacyBoundary />
      <PricingPanel />

      <section className="faq-section" id="faq">
        <div className="faq-section__header">
          <span className="section-kicker">Common questions</span>
          <h2>A few things people ask first.</h2>
          <p>
            Still wondering something?{" "}
            <Link href="/support">Get in touch</Link>.
          </p>
        </div>
        <Accordion type="single" collapsible className="faq-section__accordion">
          {faq.map((item, index) => (
            <AccordionItem
              className="faq-section__item"
              key={item.q}
              value={`item-${index}`}
            >
              <AccordionTrigger className="faq-section__trigger">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="faq-section__content">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </MarketingShell>
  );
}
