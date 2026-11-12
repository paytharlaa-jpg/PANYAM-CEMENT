// Painterly reveal: the photograph is "painted" onto the canvas by brush strokes.
// Strokes live in an SVG <mask>; a turbulence + displacement filter gives them
// ragged, bristled edges. Animate [data-brush] strokeDashoffset → 0 to paint.

interface Props {
  src: string;
  width: number;
  height: number;
  id: string;
  /** Focal point (in image px) where the painter starts */
  focus: [number, number];
  className?: string;
  /** tag so scenes can animate only the variant that is visible */
  variant?: string;
}

/** Deterministic brush paths: dabs on the subject, then broad alternating sweeps. */
function strokes(w: number, h: number, [fx, fy]: [number, number]) {
  const r = Math.round;
  const brush = r(Math.max(w, h) * 0.12);
  const dabs = [
    `M${r(fx - brush)} ${r(fy - brush * 0.6)} C${r(fx - brush * 0.3)} ${r(fy - brush)} ${r(fx + brush * 0.5)} ${r(fy - brush * 0.4)} ${r(fx + brush)} ${r(fy - brush * 0.8)}`,
    `M${r(fx + brush * 0.9)} ${r(fy + brush * 0.1)} C${r(fx + brush * 0.2)} ${r(fy + brush * 0.6)} ${r(fx - brush * 0.6)} ${r(fy + brush * 0.1)} ${r(fx - brush * 1.2)} ${r(fy + brush * 0.7)}`,
    `M${r(fx - brush * 0.8)} ${r(fy + brush * 1.3)} C${r(fx)} ${r(fy + brush * 0.9)} ${r(fx + brush * 0.6)} ${r(fy + brush * 1.6)} ${r(fx + brush * 1.4)} ${r(fy + brush * 1.1)}`,
  ];
  const rows = Math.ceil(h / (brush * 0.72)) + 1;
  const sweeps: string[] = [];
  for (let i = 0; i < rows; i++) {
    const y = r((i + 0.3) * (h / (rows - 0.4)));
    const wob = r(brush * 0.35 * (i % 2 ? 1 : -1));
    const [x0, x1] = i % 2 ? [w + brush, -brush] : [-brush, w + brush];
    sweeps.push(`M${x0} ${y + wob} C${r(w * 0.3)} ${y - wob} ${r(w * 0.65)} ${y + wob * 1.4} ${x1} ${y - r(wob * 0.5)}`);
  }
  // thin bristle streaks that trail the big strokes for texture
  const bristles = sweeps.filter((_, i) => i % 2 === 0).map((d) => d.replace(/M(-?\d+) (-?\d+)/, (_, x, y) => `M${x} ${Number(y) + r(brush * 0.55)}`));
  return { brush, dabs, sweeps, bristles };
}

export function PaintReveal({ src, width: w, height: h, id, focus, className, variant }: Props) {
  const { brush, dabs, sweeps, bristles } = strokes(w, h, focus);
  return (
    <svg data-variant={variant} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <filter id={`${id}-rough`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.05" numOctaves="3" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={Math.round(brush * 0.55)} xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width={w} height={h}>
          <rect width={w} height={h} fill="#000" />
          <g data-rough filter={`url(#${id}-rough)`} fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round">
            {dabs.map((d, i) => <path key={`d${i}`} data-brush="dab" d={d} strokeWidth={Math.round(brush * 1.1)} />)}
            {sweeps.map((d, i) => <path key={`s${i}`} data-brush="sweep" d={d} strokeWidth={brush} />)}
            {bristles.map((d, i) => <path key={`b${i}`} data-brush="sweep" d={d} strokeWidth={Math.round(brush * 0.12)} strokeOpacity="0.8" />)}
          </g>
          {/* final wash guarantees full coverage once the strokes are done */}
          <rect data-wash width={w} height={h} fill="#fff" />
        </mask>
      </defs>
      <image href={src} width={w} height={h} preserveAspectRatio="xMidYMid slice" mask={`url(#${id}-mask)`} />
    </svg>
  );
}
