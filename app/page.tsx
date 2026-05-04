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
    q: "Does GlanceGuard upload my face to your servers?",
    a: "No. Frames, crops, embeddings, and owner profiles stay on the Mac. The server sees commerce data, license keys, a hashed machine fingerprint, and refresh calls.",
  },
  {
    q: "Why not just turn the camera off?",
    a: "Sometimes the camera is legitimately on: calls, interviews, client work, travel. GlanceGuard is for that exposed state, when awareness matters but paranoia does not help.",
  },
  {
    q: "Is there a free trial?",
    a: "No. The product is a $20 lifetime license for one Mac. The 30-day refund policy is the safety net.",
  },
  {
    q: "What triggers the warning?",
    a: "A non-owner face must stay in the frame long enough to pass the sustain gate. Passing motion is treated differently from someone hovering behind you.",
  },
] as const;

export default function HomePage() {
  return (
    <MarketingShell>
      <section className="home-hero">
        <div className="home-hero__inner">
          <div className="home-hero__copy">
            <p className="section-kicker">macOS shoulder-surfing awareness</p>
            <h1>Your screen has an audience before you do.</h1>
            <p className="home-hero__lede">
              GlanceGuard watches the webcam for a second face that lingers in
              frame, then warns you before your work becomes public. Detection
              runs on the Mac. Face data does not go to our servers.
            </p>
            <div className="home-hero__actions">
              <BuyCheckoutButton className="home-hero__button" />
              <p>
                $20 lifetime, one Mac. No trial.{" "}
                <Link href="/refund">30-day refund</Link>.
              </p>
            </div>
            <dl className="home-hero__facts">
              <div>
                <dt>On-device</dt>
                <dd>webcam inference</dd>
              </div>
              <div>
                <dt>No upload</dt>
                <dd>frames or embeddings</dd>
              </div>
              <div>
                <dt>Menu bar</dt>
                <dd>quiet alert state</dd>
              </div>
            </dl>
          </div>

          <HeroScene />
        </div>
      </section>

      <section className="threat-model">
        <div className="threat-model__text">
          <span className="section-kicker">Actual threat model</span>
          <h2>The person behind you is not a hacker. That is the problem.</h2>
          <p>
            Open offices, cafes, airport gates, client sites: the leak is often
            ordinary proximity. A laptop is bright, angled up, and full of
            unfinished work.
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
          <span className="section-kicker">Questions</span>
          <h2>Plain answers before checkout.</h2>
          <p>
            If this does not answer it, use <Link href="/support">support</Link>.
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
