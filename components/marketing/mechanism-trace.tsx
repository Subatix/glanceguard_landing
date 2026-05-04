const steps = [
  {
    code: "01",
    title: "Show it your face once",
    body: "Sit in front of the camera for a moment so GlanceGuard knows it’s you. That’s the whole setup.",
    detail: "Owner profile is stored on your Mac — never uploaded.",
  },
  {
    code: "02",
    title: "It quietly keeps watch",
    body: "While you work, GlanceGuard glances at the webcam now and then to see if it’s just you, or someone else as well.",
    detail: "Faces are recognised on your Mac. No video leaves the device.",
  },
  {
    code: "03",
    title: "A small heads-up if someone’s there",
    body: "If another person is genuinely staying behind you, you get a calm notice. Someone walking past does not count.",
    detail: "A short on-screen alert plus a menu bar state — no sounds, no lock screen.",
  },
] as const;

export function MechanismTrace() {
  return (
    <section className="trace-section" id="how">
      <div className="section-kicker">How it works</div>
      <div className="trace-section__grid">
        <div className="trace-section__intro">
          <h2>It works the way you’d expect — and stays on your Mac.</h2>
          <p>
            Three quiet steps: meet, watch, mention. Nothing dramatic, nothing
            uploaded. The technical bits are below, in case you’re curious.
          </p>
        </div>
        <ol className="mechanism-trace" aria-label="How GlanceGuard works">
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
