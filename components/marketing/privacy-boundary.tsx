const onDevice = [
  "What your webcam shows",
  "Who counts as you vs someone new",
  "When to cue you quietly",
] as const;

const onOurSystems = [
  "Checkout through Stripe",
  "License mailed to your inbox",
  "Refund if it is not for you",
] as const;

export function PrivacyBoundary() {
  return (
    <section className="privacy-boundary" id="privacy-story">
      <p className="privacy-boundary__eyebrow">Privacy, in plain terms</p>
      <div className="privacy-boundary__header">
        <h2>Commerce is online. Your camera work is not.</h2>
        <p>
          Everything that looks through the lens finishes on your Mac. The
          only reason our servers wake up is the sale itself—proof of purchase,
          your license token, receipt email, refunds if you ask.
        </p>
      </div>

      <div
        className="privacy-boundary__split"
        aria-label="Split between your Mac and our systems"
      >
        <div className="privacy-boundary__pane">
          <h3 className="privacy-boundary__pane-title">On this Mac only</h3>
          <ul className="privacy-boundary__stack">
            {onDevice.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        <div className="privacy-boundary__mid">
          <p>
            Nothing we host can replay your webcam. If it is pixels from your
            face, we never touched them.
          </p>
        </div>

        <div className="privacy-boundary__pane">
          <h3 className="privacy-boundary__pane-title">When you buy</h3>
          <ul className="privacy-boundary__stack">
            {onOurSystems.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
