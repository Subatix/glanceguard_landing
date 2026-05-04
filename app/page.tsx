import Link from "next/link";
import type { Metadata } from "next";

import { MarketingShell } from "@/components/marketing/marketing-shell";
import { BuyCheckoutButton } from "@/components/marketing/buy-checkout-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { glanceguardReleasesLatestUrl } from "@/lib/site-links";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const faq = [
  {
    q: "Does GlanceGuard upload my face to your servers?",
    a: "No. Frames never leave your Mac for cloud inference. Your owner profile (face embedding, calibration) is stored locally — Keychain + on-disk app data per the desktop app. The license server only sees your key, a hash of a machine fingerprint, and billing metadata from Stripe.",
  },
  {
    q: "Why not just tape the camera?",
    a: "You can — but when the camera is on for real calls, you still want awareness of who is behind you. GlanceGuard is for the “camera legitimately on, environment hostile” case: open offices, cafés, co-working, airport gates.",
  },
  {
    q: "Is there a free trial?",
    a: "No. It is a $20 lifetime license for one Mac. If it is not right, use the 30-day refund — that is the trust substitute for a trial.",
  },
  {
    q: "What exactly triggers the warning?",
    a: "The pipeline looks for a face that is not yours, tracks it across frames, and fires only after it has been present for a couple of seconds — reducing flicker from people walking past. Copy on-device; tune sensitivity in the app.",
  },
] as const;

export default function HomePage() {
  const releasesUrl = glanceguardReleasesLatestUrl();

  return (
    <MarketingShell>
      <div className="relative">
        <section className="mesh-sheen border-border relative overflow-hidden border-b">
          <div className="relative mx-auto flex max-w-5xl flex-col gap-10 px-4 py-20 md:py-28">
            <p className="text-muted-foreground gf-display text-xs font-semibold tracking-[0.18em] uppercase">
              Calm surveillance realism
            </p>
            <div className="max-w-3xl space-y-8">
              <h1 className="gf-display text-foreground text-balance text-4xl leading-[1.05] font-semibold tracking-tight md:text-5xl lg:text-[3.25rem]">
                Know when someone is reading over your shoulder — before your
                screen does the talking.
              </h1>
              <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed md:text-xl">
                GlanceGuard uses the Mac webcam to detect when another person’s
                face stays in frame and quietly warns you.{" "}
                <strong className="text-foreground font-medium">
                  On-device
                </strong>
                . No face data sent to our servers. One honest menu-bar utility
                for people who work in public.
              </p>
            </div>
            <div className="flex max-w-xl flex-col gap-4 sm:flex-row sm:items-center">
              <BuyCheckoutButton className="min-h-10 sm:min-w-[240px]" />
              <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                <Link
                  className="text-foreground underline-offset-4 hover:underline"
                  href="/refund"
                >
                  30-day refund
                </Link>
                <span aria-hidden>/</span>
                <Link
                  className="underline-offset-4 hover:underline"
                  href="/privacy"
                >
                  Privacy
                </Link>
                <span aria-hidden>/</span>
                <Link
                  className="underline-offset-4 hover:underline"
                  href="/support"
                >
                  Support
                </Link>
              </div>
            </div>
            <p className="text-muted-foreground max-w-prose text-sm leading-relaxed">
              <strong className="text-foreground">No subscription.</strong>{" "}
              $20 pays for a perpetual license tied to{" "}
              <strong className="text-foreground font-medium">one Mac</strong>{" "}
              (machine fingerprint on first activation). Stripe Checkout emails
              a Crockford-safe key formatted like{" "}
              <span className="font-mono-key text-foreground tracking-tight">
                GG1-XXXX-XXXX-XXXX
              </span>
              .
            </p>
          </div>
        </section>

        <SectionDivider />

        <section className="mx-auto max-w-5xl px-4 py-20 md:py-28" id="story">
          <div className="grid gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.85fr)] md:gap-16">
            <div className="space-y-6">
              <h2 className="gf-display text-foreground text-3xl font-semibold tracking-tight md:text-4xl">
                You’re on camera all day — minus the etiquette of eye contact.
              </h2>
              <div className="text-muted-foreground space-y-4 text-lg leading-relaxed">
                <p>
                  Laptops tilt toward intimacy: contracts, dashboards, chats,
                  source code inches from the person behind you in line at the
                  coffee shop. Phones down, eyes up — that is the posture of
                  open offices everywhere.
                </p>
                <p>
                  GlanceGuard intervenes earlier than “should I glare?” Body
                  language is unreliable; the webcam is blunt. Someone loitering
                  in-frame for more than two seconds earns a restrained alert —
                  banner, tray hint, configurable cooldown — tuned for low{" "}
                  <em>drama</em>, high situational IQ.
                </p>
              </div>
            </div>
            <Card className="bg-card ring-foreground/12 self-start rounded-2xl shadow-sm backdrop-blur">
              <CardHeader>
                <CardTitle className="gf-display tracking-tight">
                  Precision utility stance
                </CardTitle>
                <CardDescription>
                  If you want drama, hire a noir soundtrack. GlanceGuard is a
                  working tool: quiet typography, restrained surfaces, violet
                  accent aligned with the macOS shell.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-3 text-sm leading-relaxed">
                <p>
                  The macOS UI uses cool neutrals (`oklch` ~250 hue) and a
                  blue-violet accent near hue 253. This site follows that same
                  bias so the marketing story and the binary feel like one
                  product language.
                </p>
                <p>
                  Placeholder rectangles below mark where authentic product
                  captures belong — HUD alert, onboarding camera explainer,
                  enrollment ring. Swap when you ship final screenshots from the{" "}
                  <a href={releasesUrl.toString()} className="text-foreground">
                    desktop repo artifacts
                  </a>
                  .
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <SectionDivider />

        <section className="bg-muted/30 border-border border-y py-20 md:py-28">
          <div className="mx-auto max-w-5xl space-y-12 px-4">
            <div className="max-w-3xl space-y-4">
              <h2 className="gf-display text-foreground text-3xl font-semibold tracking-tight md:text-[2rem]">
                Privacy is the story, not an FAQ footnote.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We are asking for camera access — the skepticism is correct.
                Here is what leaves the laptop: Stripe billing, license API
                calls (key + hashed machine fingerprint per Phase 11), &
                voluntary telemetry if you toggle it inside the app. Not face
                pixels, embeddings, enrollments.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Local enrollment",
                  body: "Your owner profile stays on-disk + Keychain alongside the hardened GlanceGuard app bundle.",
                },
                {
                  title: "Network egress",
                  body: "No cloud CV. Server hits are commerce + JWT refresh only — spelled out plainly in Privacy.",
                },
                {
                  title: "Support posture",
                  body: "Open issues on GitHub, email support alias, brutal honesty inside the readme — no fake chatbot empathy.",
                },
              ].map((item) => (
                <Card
                  key={item.title}
                  className="bg-card/80 ring-foreground/10 border border-transparent shadow-xs"
                >
                  <CardHeader>
                    <CardTitle className="text-base font-semibold">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-sm leading-relaxed">
                    {item.body}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        <section className="mx-auto max-w-5xl space-y-12 px-4 py-20 md:py-28" id="how">
          <div className="max-w-3xl space-y-4">
            <Badge variant="secondary" className="font-mono-key text-xs">
              How it works
            </Badge>
            <h2 className="gf-display text-foreground text-3xl font-semibold tracking-tight md:text-[2rem]">
              Three beats: enroll, monitor, surface.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              No stock icon grid — just the actual flow the macOS app walks.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "License + welcome",
                body: "Paste the key from email, then the wizard narrates every macOS permission before the system sheet appears.",
                toneClass:
                  "from-primary/20 via-transparent to-muted/30 dark:from-primary/25",
              },
              {
                step: "02",
                title: "Multi-pose enrollment",
                body: "Capture a neutral owner profile with quality gates so the ArcFace-style embedding is stable under office lighting.",
                toneClass:
                  "from-accent/20 via-transparent to-muted/40 dark:from-accent/22",
              },
              {
                step: "03",
                title: "HUD + tray truth",
                body: "When a non-owner track sustains, you get a calm overlay + menu-bar status. Pause globally with the tray or shortcut.",
                toneClass:
                  "from-primary/18 via-transparent to-muted/30 dark:from-primary/24",
              },
            ].map((item) => (
              <Card
                key={item.step}
                className="ring-foreground/10 overflow-hidden rounded-2xl border border-transparent shadow-sm"
              >
                <div
                  className={`h-40 border-b border-dashed border-foreground/10 bg-gradient-to-b ${item.toneClass}`}
                  aria-hidden
                />
                <CardHeader>
                  <p className="text-muted-foreground font-mono-key text-xs tracking-widest uppercase">
                    {item.step}
                  </p>
                  <CardTitle className="gf-display text-lg tracking-tight">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm leading-relaxed">
                  {item.body}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <SectionDivider />

        <section className="bg-muted/20 border-border border-y py-20 md:py-28" id="pricing">
          <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl space-y-4">
              <h2 className="gf-display text-foreground text-3xl font-semibold tracking-tight md:text-4xl">
                $20 lifetime · one Mac · no trial (on purpose).
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                You are not renting peace of mind. Pay once, get a key, keep
                the binary as long as Apple lets you run it. If you hate it
                inside 30 days, refund &amp; we revoke server-side per{" "}
                <Link className="text-foreground underline" href="/refund">
                  the refund page
                </Link>
                .
              </p>
            </div>
            <Card className="w-full max-w-md rounded-2xl shadow-md ring-1 ring-foreground/10">
              <CardHeader>
                <CardTitle className="gf-display text-2xl font-semibold">
                  GlanceGuard Provisioning
                </CardTitle>
                <CardDescription>
                  Lifetime license · Stripe Checkout · Resend email delivery
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-foreground text-4xl font-semibold tracking-tight">
                  $20
                  <span className="text-muted-foreground text-base font-normal">
                    {" "}
                    USD
                  </span>
                </p>
                <BuyCheckoutButton className="w-full" />
                <div className="text-muted-foreground flex flex-col gap-2 text-xs">
                  <Link className="hover:text-foreground" href="/download">
                    DMG lives on GitHub Releases (see download page)
                  </Link>
                  <Link className="hover:text-foreground" href="/terms">
                    Terms include acceptable use for the binary
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <SectionDivider />

        <section className="mx-auto max-w-3xl space-y-8 px-4 py-20 md:py-28" id="faq">
          <div className="space-y-3 text-center md:text-left">
            <h2 className="gf-display text-foreground text-3xl font-semibold tracking-tight">
              FAQ — plain answers, no marketing fog.
            </h2>
            <p className="text-muted-foreground text-sm">
              Still stuck?{" "}
              <Link className="text-foreground underline" href="/support">
                Talk to a human
              </Link>
              .
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, index) => (
              <AccordionItem key={item.q} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="border-border bg-background border-t py-20">
          <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h2 className="gf-display text-foreground text-2xl font-semibold tracking-tight">
                Ready when you are.
              </h2>
              <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
                Buy once, get the key in email, paste into GlanceGuard, finish
                enrollment. Takes less time than pretending you did not notice
                your seatmate scrolling your slides.
              </p>
            </div>
            <div className="flex w-full max-w-xs flex-col gap-3 md:w-auto">
              <BuyCheckoutButton />
              <Button variant="outline" size="lg" asChild>
                <Link href="/refund">Read refund guardrails</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MarketingShell>
  );
}

function SectionDivider() {
  return (
    <div className="mx-auto hidden max-w-5xl px-4 md:block" aria-hidden>
      <Separator className="opacity-60" />
    </div>
  );
}
