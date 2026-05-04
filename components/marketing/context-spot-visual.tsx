/** Side-view schematic: table, laptop angled toward space behind, lingering sight line — not a SaaS funnel diagram. */
export function ContextSpotVisual() {
  return (
    <figure className="context-spot__figure">
      <div className="context-spot__svg-wrap">
        <svg viewBox="0 0 420 228" role="img" aria-hidden>
          <line
            x1="26"
            y1="186"
            x2="394"
            y2="186"
            className="context-spot__svg-table"
            strokeLinecap="round"
          />
          <path
            d="M 118 184 c 0 -28 18 -52 44 -58 l 6 2 c -8 12 -12 28 -12 44 z"
            className="context-spot__svg-seat"
          />
          <circle cx="144" cy="118" r="14" className="context-spot__svg-head" />
          <path
            d="M 184 98 L 276 88 L 292 124 L 198 136 Z"
            className="context-spot__svg-lid"
          />
          <path
            d="M 198 136 L 292 124 L 304 152 L 190 166 Z"
            className="context-spot__svg-screenplane"
          />
          <path
            d="M 190 166 L 304 152 L 312 176 L 182 190 Z"
            className="context-spot__svg-base"
          />
          <path
            d="M 316 96 L 352 78 L 358 108 L 322 124 Z"
            className="context-spot__svg-observer"
          />
          <circle cx="338" cy="84" r="13" className="context-spot__svg-head-obs" />
          <path
            d="M 328 92 Q 272 108 228 118"
            className="context-spot__svg-sight"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <figcaption className="context-spot__legend">
        Side view, not your feed — the hinge points at the room; the eyes that
        stay too long are behind it.
      </figcaption>
      <ul className="context-spot__bullets">
        <li>Bright screen, tight row, you looking forward.</li>
        <li>Someone behind reads the angle you don&apos;t check.</li>
        <li>GlanceGuard is the small cue so you can stay in flow.</li>
      </ul>
    </figure>
  );
}
