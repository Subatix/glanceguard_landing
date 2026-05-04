const steps = [
  {
    code: "01",
    title: "Enroll the owner",
    body: "The app captures a small set of owner poses, rejects bad frames, and stores the resulting profile locally.",
    detail: "profile: keychain + app data",
  },
  {
    code: "02",
    title: "Watch the frame",
    body: "A lightweight detector tracks faces in the webcam feed and compares each track against the enrolled owner.",
    detail: "frames: on-device only",
  },
  {
    code: "03",
    title: "Warn on linger",
    body: "A non-owner face has to stay in frame before the app interrupts you. Passing movement is not the point.",
    detail: "alert: overlay + menu bar",
  },
] as const;

export function MechanismTrace() {
  return (
    <section className="trace-section" id="how">
      <div className="section-kicker">How it works</div>
      <div className="trace-section__grid">
        <div className="trace-section__intro">
          <h2>Not magic. A small, local computer-vision loop.</h2>
          <p>
            GlanceGuard is intentionally boring under the hood: enroll, compare,
            sustain, alert. The restraint is the feature.
          </p>
        </div>
        <ol className="mechanism-trace" aria-label="GlanceGuard mechanism">
          {steps.map((step) => (
            <li className="mechanism-trace__step" key={step.code}>
              <span className="mechanism-trace__code">{step.code}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <small>{step.detail}</small>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
