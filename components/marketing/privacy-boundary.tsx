const localItems = [
  "Your camera",
  "Your face",
  "What it sees",
  "Whether to nudge you",
] as const;

const serverItems = [
  "Your purchase",
  "Your license",
  "Your email for the receipt",
] as const;

export function PrivacyBoundary() {
  return (
    <section className="privacy-boundary" id="privacy-story">
      <div className="section-kicker">What stays where</div>
      <div className="privacy-boundary__header">
        <h2>Your camera stays on your Mac. We just handle the receipt.</h2>
        <p>
          GlanceGuard is a small Mac app — the camera work happens there. Our
          side is just the part that handles your purchase, sends you your
          license, and lets you ask for a refund if you want one.
        </p>
      </div>

      <div className="privacy-boundary__map" aria-label="What stays on your Mac versus what we see">
        <div className="privacy-boundary__side">
          <p className="privacy-boundary__label">On your Mac</p>
          <ul>
            {localItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="privacy-boundary__wall" aria-hidden>
          <span>nothing about your face crosses over</span>
        </div>

        <div className="privacy-boundary__side privacy-boundary__side--server">
          <p className="privacy-boundary__label">On our side</p>
          <ul>
            {serverItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
