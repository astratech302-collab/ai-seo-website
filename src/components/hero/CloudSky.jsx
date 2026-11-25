/** Our own painted sky: gradient backdrop + soft drifting SVG clouds. Decorative. */

// Each cloud is a cluster of circles [cx, cy, r], roughened by turbulence.
const PUFFS = {
  tall: [[360, 215, 62], [575, 245, 58], [255, 285, 56], [690, 420, 55], [130, 420, 50], [300, 330, 110], [420, 260, 135], [540, 320, 115], [200, 390, 85], [650, 390, 90], [420, 390, 150], [480, 170, 80]],
  wide: [[190, 330, 70], [300, 300, 95], [430, 330, 80], [540, 355, 55], [110, 360, 48], [320, 365, 90]],
};

const CLOUDS = [
  { shape: "tall", className: "sky-c1", seed: 3 },
  { shape: "wide", className: "sky-c2", seed: 11 },
  { shape: "wide", className: "sky-c3", seed: 7 },
  { shape: "tall", className: "sky-c4", seed: 19 },
];

export default function CloudSky() {
  return (
    <div className="sky" aria-hidden>
      {CLOUDS.map((c) => (
        <svg key={c.className} className={`sky-cloud ${c.className}`} viewBox="0 0 800 560" fill="var(--cloud)">
          <filter id={c.className} x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.016" numOctaves="4" seed={c.seed} />
            <feDisplacementMap in="SourceGraphic" scale="85" xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <g filter={`url(#${c.className})`}>
            {PUFFS[c.shape].map(([cx, cy, r]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
            ))}
          </g>
        </svg>
      ))}
      <style>{`
        .sky { position: absolute; inset: 0; overflow: hidden; background: linear-gradient(180deg, var(--sky-top) 0%, var(--sky-mid) 55%, var(--sky-low) 100%); }
        .sky-cloud { position: absolute; will-change: transform; animation: skyDrift 26s ease-in-out infinite alternate; }
        .sky-c1 { width: 62%; right: -12%; top: 6%; opacity: .85; }
        .sky-c2 { width: 36%; left: -6%; top: -2%; opacity: .6; animation-duration: 34s; animation-direction: alternate-reverse; }
        .sky-c3 { width: 54%; left: -18%; bottom: -8%; opacity: .75; animation-duration: 30s; }
        .sky-c4 { width: 52%; left: 30%; bottom: -26%; opacity: .7; animation-duration: 38s; animation-direction: alternate-reverse; }
        @keyframes skyDrift { from { transform: translate3d(-2.5%, 0, 0); } to { transform: translate3d(3.5%, -1.2%, 0); } }
        @media (max-width: 760px) { .sky-c1 { width: 110%; right: -45%; } .sky-c2 { width: 70%; } .sky-c3, .sky-c4 { width: 100%; } }
        @media (prefers-reduced-motion: reduce) { .sky-cloud { animation: none; } }
      `}</style>
    </div>
  );
}
