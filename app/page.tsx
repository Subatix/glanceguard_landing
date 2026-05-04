import Link from "next/link";
import type { Metadata } from "next";

import { BuyCheckoutButton } from "@/components/marketing/buy-checkout-button";
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
            <p className="section-kicker">For your Mac · made for working in public</p>
            <h1>Notice when someone is reading over your shoulder.</h1>
            <p className="home-hero__lede">
              GlanceGuard quietly keeps an eye on your webcam and gives you a
              small nudge if someone is staying behind you. It only ever runs
              on your Mac — your camera never leaves it.
            </p>
            <div className="home-hero__actions">
              <BuyCheckoutButton className="home-hero__button" />
              <p>
                $20 once, yours forever, on one Mac.{" "}
                <Link href="/refund">30-day refund</Link>.
              </p>
            </div>
            <dl className="home-hero__facts">
              <div>
                <dt>Stays on your Mac</dt>
                <dd>your camera, not the cloud</dd>
              </div>
              <div>
                <dt>Quiet on purpose</dt>
                <dd>a small heads-up, never an alarm</dd>
              </div>
              <div>
                <dt>Out of the way</dt>
                <dd>lives in the menu bar</dd>
              </div>
            </dl>
          </div>

          <HeroScene />
        </div>
      </section>

      <section className="threat-model">
        <div className="threat-model__text">
          <span className="section-kicker">When this matters</span>
          <h2>Most leaks aren’t hacks. They’re people.</h2>
          <p>
            A coffee shop. The seat next to you on a plane. A coworking
            stretch. Your screen is bright and angled up, and someone is
            quietly reading along. GlanceGuard lets you keep working without
            having to glance back every few minutes.
          </p>
        </div>
        <div className="threat-strip" aria-hidden>
          <span className="threat-strip__label threat-strip__label--you">you</span>
          <span className="threat-strip__screen" />
          <span className="threat-strip__field" />
          <span className="threat-strip__label threat-strip__label--observer">
            observer
          </span>
          <span className="threat-strip__person threat-strip__person--you" />
          <span className="threat-strip__person threat-strip__person--observer" />
        </div>
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
