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
          <p className="hero-scene__frame-label">Camera preview — only on this Mac.</p>
        </div>

        <aside className="hero-scene__sidebar">
          <div className="hero-scene__inspector" role="group" aria-label="What the app sees">
            <div className="hero-scene__inspector-row">
              <span className="hero-scene__inspector-key">You</span>
              <span className="hero-scene__inspector-val">Recognized</span>
            </div>
            <div className="hero-scene__inspector-row">
              <span className="hero-scene__inspector-key">Behind you</span>
              <span className="hero-scene__inspector-val hero-scene__inspector-val--watch">
                Still in frame
              </span>
            </div>
            <p className="hero-scene__inspector-note">
              Shown as a small menu bar flag — not a shouty pop-over.
            </p>
          </div>
        </aside>
      </div>

      <figcaption className="hero-scene__footnote">
        Nothing from this window is uploaded. Purchase is off to the side, on purpose.
      </figcaption>
    </figure>
  );
}
