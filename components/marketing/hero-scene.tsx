const observerMarks = [
  { label: "now", state: "quiet" },
  { label: "·", state: "tracking" },
  { label: "heads-up", state: "alert" },
] as const;

export function HeroScene() {
  return (
    <figure className="hero-scene" aria-label="GlanceGuard product scene">
      <div className="hero-scene__bar">
        <div className="hero-scene__traffic" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <span className="hero-scene__title">GlanceGuard</span>
        <span className="hero-scene__status">Watching quietly</span>
      </div>

      <div className="hero-scene__body">
        <div className="hero-scene__camera" aria-hidden>
          <div className="hero-scene__frame">
            <span className="hero-scene__face hero-scene__face--owner" />
            <span className="hero-scene__face hero-scene__face--observer" />
            <span className="hero-scene__gridline hero-scene__gridline--x" />
            <span className="hero-scene__gridline hero-scene__gridline--y" />
          </div>
          <div className="hero-scene__caption">
            <span>Your view</span>
            <span>Stays on your Mac</span>
          </div>
        </div>

        <div className="hero-scene__panel">
          <div className="hero-scene__metric">
            <span>It’s you</span>
            <strong>recognised</strong>
          </div>
          <div className="hero-scene__metric">
            <span>Someone else</span>
            <strong>still there</strong>
          </div>
          <div className="hero-scene__timeline">
            {observerMarks.map((mark) => (
              <div className="hero-scene__mark" data-state={mark.state} key={mark.label}>
                <span />
                <small>{mark.label}</small>
              </div>
            ))}
          </div>
          <div className="hero-scene__alert" role="presentation">
            <span className="hero-scene__alert-dot" />
            Someone is still behind you.
          </div>
        </div>
      </div>

      <figcaption className="hero-scene__footnote">
        Your camera stays on your Mac. We only ever see your purchase.
      </figcaption>
    </figure>
  );
}
