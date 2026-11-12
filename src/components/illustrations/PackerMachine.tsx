// Rotary cement packer, drawn with industrial shading (brushed steel, AO, highlights).
// viewBox 400 × 760. Centre filling spout tip at (200, 452); frame feet at y = 760
// (aligned to the conveyor top). Bags hang on the spout while filling.
import { FORT_PATH, FLAG_PATH, SPIRAL_PATH } from "@/components/ui/PanyamMark";

const Bolt = ({ x, y }: { x: number; y: number }) => (
  <g>
    <circle cx={x} cy={y} r="2.6" fill="#4b524e" />
    <circle cx={x - 0.6} cy={y - 0.6} r="1.2" fill="#c9cfcb" />
  </g>
);

export function PackerMachine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 760" className={className} aria-hidden overflow="visible">
      <defs>
        {/* brushed steel cylinder */}
        <linearGradient id="pk-cyl" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5d6561" />
          <stop offset="0.12" stopColor="#9aa29d" />
          <stop offset="0.32" stopColor="#e9edeb" />
          <stop offset="0.42" stopColor="#c3cac6" />
          <stop offset="0.7" stopColor="#8e9691" />
          <stop offset="0.9" stopColor="#6a726e" />
          <stop offset="1" stopColor="#4b524e" />
        </linearGradient>
        <linearGradient id="pk-cone" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#59615d" />
          <stop offset="0.35" stopColor="#d6dbd8" />
          <stop offset="0.55" stopColor="#a9b0ac" />
          <stop offset="1" stopColor="#4f5753" />
        </linearGradient>
        <linearGradient id="pk-coneShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id="pk-frame" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#063d24" />
          <stop offset="0.3" stopColor="#14915a" />
          <stop offset="0.55" stopColor="#0a6b3e" />
          <stop offset="1" stopColor="#053321" />
        </linearGradient>
        <linearGradient id="pk-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1aa766" />
          <stop offset="0.5" stopColor="#0a6b3e" />
          <stop offset="1" stopColor="#053321" />
        </linearGradient>
        <linearGradient id="pk-panel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eef1ef" />
          <stop offset="1" stopColor="#b9c0bc" />
        </linearGradient>
        <linearGradient id="pk-spout" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3f4643" />
          <stop offset="0.4" stopColor="#a7aeaa" />
          <stop offset="1" stopColor="#3a413e" />
        </linearGradient>
        <pattern id="pk-hazard" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="8" height="16" fill="#f2c400" />
          <rect x="8" width="8" height="16" fill="#1d201f" />
        </pattern>
        <radialGradient id="pk-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#7dffb5" />
          <stop offset="1" stopColor="#00a85a" stopOpacity="0" />
        </radialGradient>
        <filter id="pk-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* ambient occlusion shadow on the back wall */}
      <ellipse cx="200" cy="420" rx="190" ry="300" fill="#000" opacity="0.06" filter="url(#pk-soft)" />

      {/* feed pipe from the cement silo */}
      <rect x="181" y="-300" width="38" height="330" fill="url(#pk-cyl)" />
      {[-240, -150, -60].map((y) => (
        <g key={y}>
          <rect x="174" y={y} width="52" height="10" rx="2" fill="url(#pk-cyl)" />
          <rect x="174" y={y + 10} width="52" height="2" fill="#000" opacity="0.25" />
        </g>
      ))}
      {/* dust extraction duct */}
      <path d="M300 -300 V40 Q300 70 272 72 H252" fill="none" stroke="url(#pk-cyl)" strokeWidth="22" />
      <path d="M300 -300 V40" stroke="#fff" strokeOpacity="0.35" strokeWidth="3" transform="translate(-5 0)" />

      {/* --- steel frame: back legs --- */}
      <rect x="22" y="200" width="20" height="560" fill="url(#pk-frame)" />
      <rect x="358" y="200" width="20" height="560" fill="url(#pk-frame)" />

      {/* buffer bin: cylinder + cone */}
      <rect x="92" y="30" width="216" height="104" fill="url(#pk-cyl)" />
      <ellipse cx="200" cy="30" rx="108" ry="10" fill="#d9dedb" stroke="#7a827e" />
      {[58, 96].map((y) => (
        <g key={y}>
          <rect x="90" y={y} width="220" height="6" fill="url(#pk-cyl)" />
          <rect x="90" y={y + 6} width="220" height="1.5" fill="#000" opacity="0.3" />
        </g>
      ))}
      {/* level indicator window */}
      <rect x="112" y="42" width="10" height="84" rx="3" fill="#2a2f2d" />
      <rect x="114" y="84" width="6" height="40" rx="2" fill="#a9aeab" />
      {/* bin brand plate */}
      <rect x="160" y="64" width="80" height="58" rx="5" fill="#0a5c36" stroke="#063d24" strokeWidth="2" />
      <circle cx="200" cy="93" r="22" fill="#00a85a" stroke="#fff" strokeWidth="2.5" />
      <g transform="translate(183.5 80) scale(0.042)">
        <g transform="translate(-570 -260)">
          <path d={FORT_PATH} fill="#fff315" />
          <path d={FLAG_PATH} fill="#fff315" />
          <path d={SPIRAL_PATH} stroke="#00a85a" strokeWidth="104" fill="none" />
        </g>
      </g>
      {/* cone */}
      <path d="M92 134 H308 L238 236 H162 Z" fill="url(#pk-cone)" />
      <path d="M92 134 H308 L238 236 H162 Z" fill="url(#pk-coneShade)" />
      <path d="M92 134 H308" stroke="#e9edeb" strokeWidth="2" />
      {Array.from({ length: 11 }).map((_, i) => <Bolt key={i} x={100 + i * 20} y={140} />)}

      {/* main beam with hazard edge */}
      <rect x="14" y="196" width="372" height="18" fill="url(#pk-beam)" />
      <rect x="14" y="214" width="372" height="5" fill="url(#pk-hazard)" />

      {/* rotary packer drum */}
      <rect x="150" y="236" width="100" height="18" fill="#565e5a" />
      <rect x="70" y="254" width="260" height="104" rx="10" fill="url(#pk-cyl)" />
      <rect x="70" y="254" width="260" height="10" rx="5" fill="#fff" opacity="0.25" />
      <rect x="70" y="344" width="260" height="14" rx="6" fill="#000" opacity="0.22" />
      {[110, 160, 240, 290].map((x) => <rect key={x} x={x} y="258" width="2" height="96" fill="#000" opacity="0.18" />)}
      {/* yellow band with name */}
      <rect x="70" y="288" width="260" height="22" fill="#fff315" />
      <rect x="70" y="308" width="260" height="2" fill="#000" opacity="0.2" />
      <text x="200" y="304" textAnchor="middle" fontSize="13" fontWeight="900" letterSpacing="4" fill="#06261a" fontFamily="var(--font-archivo), Arial, sans-serif">PANYAM PACKER</text>

      {/* side spouts (foreshortened, rotating carousel) */}
      {[
        { x: 104, s: 0.62 },
        { x: 296, s: 0.62 },
      ].map(({ x, s }) => (
        <g key={x} transform={`translate(${x} 358) scale(${s} 0.82)`}>
          <rect x="-26" y="0" width="52" height="40" rx="4" fill="url(#pk-panel)" stroke="#7a827e" />
          <rect x="-8" y="40" width="16" height="44" fill="url(#pk-spout)" />
          <rect x="-12" y="80" width="24" height="8" rx="2" fill="#2a2f2d" />
        </g>
      ))}

      {/* centre weighing unit + spout */}
      <rect x="166" y="358" width="68" height="50" rx="5" fill="url(#pk-panel)" stroke="#7a827e" />
      <rect x="176" y="366" width="48" height="16" rx="2" fill="#0d1a14" />
      <text data-weight x="200" y="378" textAnchor="middle" fontSize="10" fontWeight="700" fill="#7dffb5" fontFamily="ui-monospace, monospace">50.0 kg</text>
      <circle cx="182" cy="396" r="3.5" fill="#00a85a" />
      <circle cx="182" cy="396" r="8" fill="url(#pk-glow)" opacity="0.8" />
      <circle cx="218" cy="396" r="3.5" fill="#e8771e" />
      <rect x="191" y="408" width="18" height="38" fill="url(#pk-spout)" />
      <rect x="184" y="442" width="32" height="10" rx="3" fill="#2a2f2d" />
      <rect x="186" y="443" width="10" height="3" rx="1" fill="#fff" opacity="0.25" />

      {/* control cabinet */}
      <g transform="translate(318 380)">
        <rect x="0" y="0" width="56" height="96" rx="4" fill="url(#pk-panel)" stroke="#7a827e" />
        <rect x="8" y="10" width="40" height="24" rx="2" fill="#0d1a14" />
        <path d="M12 28 l6 -8 l6 4 l8 -10 l8 6" stroke="#7dffb5" strokeWidth="1.5" fill="none" />
        <circle cx="16" cy="48" r="5" fill="#d6261e" stroke="#7a1410" />
        <circle cx="32" cy="48" r="5" fill="#00a85a" stroke="#063d24" />
        <rect x="10" y="62" width="36" height="4" rx="2" fill="#8d9590" />
        <rect x="10" y="72" width="36" height="4" rx="2" fill="#8d9590" />
        <rect x="-10" y="96" width="8" height="186" fill="url(#pk-frame)" />
      </g>

      {/* --- front legs + bracing (drawn last = in front) --- */}
      <path d="M42 240 L150 420 M358 240 L250 420" stroke="url(#pk-beam)" strokeWidth="9" />
      <rect x="14" y="200" width="22" height="560" fill="url(#pk-frame)" />
      <rect x="364" y="200" width="22" height="560" fill="url(#pk-frame)" />
      <rect x="18" y="200" width="4" height="560" fill="#fff" opacity="0.15" />
      <rect x="368" y="200" width="4" height="560" fill="#fff" opacity="0.15" />
      {[260, 420, 600].map((y) => (
        <g key={y}>
          <Bolt x={25} y={y} />
          <Bolt x={375} y={y} />
        </g>
      ))}
      <rect x="6" y="750" width="38" height="10" rx="2" fill="#1d201f" />
      <rect x="356" y="750" width="38" height="10" rx="2" fill="#1d201f" />

      {/* dust cloud at the valve while filling */}
      <g data-dust opacity="0">
        <ellipse className="pc-puff" cx="200" cy="458" rx="26" ry="9" fill="#d9dcda" />
        {Array.from({ length: 8 }).map((_, i) => (
          <circle key={i} className="pc-fall" cx={180 + ((i * 11) % 40)} cy="452" r={1.4 + (i % 3) * 0.6} fill="#b8bdba" style={{ animationDelay: `${(i * 0.11).toFixed(2)}s` }} />
        ))}
      </g>
    </svg>
  );
}

/** Pencil-sketch outline of an (empty) cement bag — viewBox 90 × 115 */
export function SketchBag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 115" className={className} aria-hidden>
      <g fill="none" stroke="#1c3028" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12 Q2 5 10 6 Q45 1 80 6 Q88 5 85 12 Q90 57 85 104 Q88 111 80 110 Q45 114 10 110 Q2 111 5 104 Q0 57 5 12 Z" fill="#f6f4ee" strokeWidth="1.3" />
        <path d="M6 16 Q45 10 84 16 M6 100 Q45 106 84 100" strokeWidth="0.6" opacity="0.6" />
        <circle cx="45" cy="54" r="19" strokeWidth="1" />
        <path d="M36 62 L38 48 L41 49 V45 L44 44 V40 L46 40 V44 L49 45 V49 L52 48 L54 62 Z" strokeWidth="0.9" />
        <path d="M27 82 H63 M31 88 H59 M36 93 H54" strokeWidth="0.7" opacity="0.7" />
      </g>
    </svg>
  );
}
