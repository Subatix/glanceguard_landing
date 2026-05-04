export function HeroScene() {
  return (
    <figure className="hero-scene" aria-label="GlanceGuard product preview">
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
        <div className="hero-scene__viewport">
          <div className="hero-scene__frame" aria-hidden>
            <span className="hero-scene__presence hero-scene__presence--you" />
            <span className="hero-scene__presence hero-scene__presence--guest" />
          </div>
          <p className="hero-scene__frame-label">
            Camera preview — everything here stays on your Mac.
          </p>
        </div>

        <aside className="hero-scene__sidebar">
          <div className="hero-scene__card">
            <p className="hero-scene__card-title">Today</p>
            <dl className="hero-scene__status-list">
              <div className="hero-scene__status-row">
                <dt>You</dt>
                <dd>
                  <span className="hero-scene__pill">In frame</span>
                </dd>
              </div>
              <div className="hero-scene__status-row">
                <dt>Behind you</dt>
                <dd>
                  <span className="hero-scene__pill hero-scene__pill--accent">
                    Staying put
                  </span>
                </dd>
              </div>
            </dl>
            <div className="hero-scene__toast" role="presentation">
              <span className="hero-scene__toast-dot" />
              <span>Soft notice — someone is still behind you.</span>
            </div>
          </div>
        </aside>
      </div>

      <figcaption className="hero-scene__footnote">
        Your camera never leaves your Mac. We only see your purchase when you buy.
      </figcaption>
    </figure>
  );
}
