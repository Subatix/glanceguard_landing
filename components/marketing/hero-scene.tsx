const observerMarks = [
  { label: "0s", state: "quiet" },
  { label: "1s", state: "tracking" },
  { label: "2s", state: "alert" },
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
        <span className="hero-scene__status">Monitoring</span>
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
            <span>Webcam frame</span>
            <span>Local inference</span>
          </div>
        </div>

        <div className="hero-scene__panel">
          <div className="hero-scene__metric">
            <span>Owner match</span>
            <strong>0.87</strong>
          </div>
          <div className="hero-scene__metric">
            <span>Observer linger</span>
            <strong>2.4s</strong>
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
            Someone else stayed in frame.
          </div>
        </div>
      </div>

      <figcaption className="hero-scene__footnote">
        Face frames never leave the Mac. The license server only sees commerce
        and activation data.
      </figcaption>
    </figure>
  );
}
