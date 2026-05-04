const localItems = [
  "Webcam frames",
  "Owner embedding",
  "Face matching",
  "Alert decisions",
] as const;

const serverItems = [
  "Stripe receipt",
  "License key",
  "Machine hash",
  "7-day JWT refresh",
] as const;

export function PrivacyBoundary() {
  return (
    <section className="privacy-boundary" id="privacy-story">
      <div className="section-kicker">Privacy boundary</div>
      <div className="privacy-boundary__header">
        <h2>The camera work stays on the laptop.</h2>
        <p>
          The backend exists for payment, license delivery, refund revocation,
          and future desktop validation. It is not a face-recognition server.
        </p>
      </div>

      <div className="privacy-boundary__map" aria-label="Local versus server data">
        <div className="privacy-boundary__side">
          <p className="privacy-boundary__label">Mac</p>
          <ul>
            {localItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="privacy-boundary__wall" aria-hidden>
          <span>no face data crosses</span>
        </div>

        <div className="privacy-boundary__side privacy-boundary__side--server">
          <p className="privacy-boundary__label">glanceguard.app</p>
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
