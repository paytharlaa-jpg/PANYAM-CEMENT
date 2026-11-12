// Layered landscape illustrations for the truck journey.
// Each layer is wider than the viewport and slides at its own speed (parallax).
// Landmarks (plant, dam, railway, city) live on the mid layer.

const tree = (x: number, y: number, s = 1, tone = "#2f6b3f") => (
  <g key={`${x}-${y}`} transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-3" y="-6" width="6" height="34" fill="#4a3a2a" />
    <ellipse cx="0" cy="-22" rx="26" ry="22" fill={tone} />
    <ellipse cx="-12" cy="-12" rx="16" ry="13" fill={tone} />
    <ellipse cx="13" cy="-14" rx="17" ry="14" fill={tone} />
    <ellipse cx="-6" cy="-30" rx="12" ry="9" fill="#fff" opacity="0.08" />
  </g>
);

export function FarHills(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 3000 400" preserveAspectRatio="none" aria-hidden {...props}>
      <defs>
        <linearGradient id="hillFar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--hill-far, #7f9c8f)" }} />
          <stop offset="1" style={{ stopColor: "var(--hill-far-2, #a9bdb1)" }} />
        </linearGradient>
        <linearGradient id="hillNear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--hill-mid, #5d7f68)" }} />
          <stop offset="1" style={{ stopColor: "var(--hill-mid-2, #86a189)" }} />
        </linearGradient>
      </defs>
      <path d="M0 220 C150 150 260 170 380 120 C520 60 640 140 760 110 C900 70 1000 150 1150 130 C1300 110 1380 40 1520 70 C1660 100 1760 160 1900 120 C2060 80 2140 140 2280 110 C2420 80 2520 40 2660 90 C2800 140 2900 120 3000 140 L3000 400 L0 400 Z" fill="url(#hillFar)" />
      <path d="M0 290 C120 250 240 270 360 230 C500 190 600 250 740 230 C880 210 960 170 1100 200 C1240 230 1340 260 1480 220 C1620 180 1720 210 1860 240 C2000 270 2120 210 2260 200 C2400 190 2500 250 2640 240 C2780 230 2880 200 3000 220 L3000 400 L0 400 Z" fill="url(#hillNear)" />
    </svg>
  );
}

function Plant() {
  return (
    <g>
      <defs>
        <linearGradient id="concrete" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b9bcb4" />
          <stop offset="0.5" stopColor="#e4e3dc" />
          <stop offset="1" stopColor="#9fa39b" />
        </linearGradient>
        <linearGradient id="steel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8a8f8a" />
          <stop offset="0.5" stopColor="#c8ccc6" />
          <stop offset="1" stopColor="#70756f" />
        </linearGradient>
      </defs>
      {/* preheater tower */}
      <rect x="300" y="40" width="90" height="330" fill="url(#steel)" />
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={i}>
          <rect x="296" y={50 + i * 40} width="98" height="5" fill="#5f645f" />
          <rect x="304" y={60 + i * 40} width="82" height="26" fill="#000" opacity="0.08" />
        </g>
      ))}
      <rect x="318" y="10" width="14" height="40" fill="#6f746e" />
      <rect x="350" y="0" width="22" height="52" fill="#7c817b" />
      {/* cyclones */}
      <path d="M306 120 h34 l-10 40 h-14 Z M352 200 h32 l-10 38 h-12 Z" fill="#d7d9d2" opacity="0.8" />
      {/* silos */}
      {[480, 540, 600].map((x, i) => (
        <g key={x}>
          <rect x={x} y={150 + i * 10} width="52" height={220 - i * 10} fill="url(#concrete)" />
          <ellipse cx={x + 26} cy={150 + i * 10} rx="26" ry="7" fill="#d9d9d2" />
        </g>
      ))}
      {/* stack */}
      <rect x="230" y="90" width="16" height="280" fill="url(#concrete)" />
      <rect x="230" y="96" width="16" height="6" fill="#c0392b" opacity="0.7" />
      <rect x="230" y="110" width="16" height="6" fill="#fff" opacity="0.7" />
      {/* kiln + sheds */}
      <path d="M420 330 L700 300 L705 312 L425 342 Z" fill="#7a7f79" />
      <path d="M0 300 L40 260 L260 250 L270 300 Z" fill="#a7aaa2" />
      <rect x="0" y="300" width="270" height="70" fill="#c9cbc3" />
      {Array.from({ length: 13 }).map((_, i) => (
        <rect key={i} x={6 + i * 20} y="306" width="2" height="60" fill="#000" opacity="0.08" />
      ))}
      <rect x="660" y="260" width="180" height="110" fill="#d6d7cf" />
      <path d="M650 262 L750 230 L850 262 Z" fill="#00a85a" />
      <rect x="690" y="290" width="40" height="80" fill="#3b403c" opacity="0.5" />
      {/* signage */}
      <rect x="664" y="272" width="172" height="16" fill="#fff315" />
      <text x="750" y="285" textAnchor="middle" fontSize="12" fontWeight="800" fill="#06261a" fontFamily="var(--font-archivo), Arial, sans-serif" letterSpacing="2">PANYAM CEMENT WORKS</text>
      {/* steam */}
      <g opacity="0.55">
        <ellipse cx="362" cy="-10" rx="30" ry="16" fill="#fff" />
        <ellipse cx="392" cy="-34" rx="40" ry="20" fill="#fff" opacity="0.7" />
        <ellipse cx="238" cy="70" rx="18" ry="10" fill="#fff" opacity="0.7" />
      </g>
    </g>
  );
}

function Dam() {
  return (
    <g>
      <defs>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5d9fb5" />
          <stop offset="1" stopColor="#2f6f86" />
        </linearGradient>
        <linearGradient id="spill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#bfe3ef" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="damFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9d6cb" />
          <stop offset="1" stopColor="#9c9a90" />
        </linearGradient>
      </defs>
      {/* reservoir */}
      <path d="M-40 190 Q500 170 1040 190 L1040 214 L-40 214 Z" fill="url(#water)" />
      {/* dam wall */}
      <path d="M0 200 L1000 200 L1000 214 L1030 370 L-30 370 L0 214 Z" fill="url(#damFace)" />
      <rect x="-10" y="192" width="1020" height="12" fill="#efede6" />
      {/* gates + spillway */}
      {Array.from({ length: 12 }).map((_, i) => {
        const x = 70 + i * 74;
        return (
          <g key={i}>
            <rect x={x} y="168" width="10" height="36" fill="#bdb9ad" />
            <path d={`M${x + 14} 214 h46 l8 156 h-62 Z`} fill="url(#spill)" opacity="0.9" />
            <path d={`M${x + 20} 230 v120 M${x + 34} 226 v130 M${x + 48} 232 v120`} stroke="#fff" strokeOpacity="0.8" strokeWidth="2" />
          </g>
        );
      })}
      {/* spray */}
      <ellipse cx="500" cy="372" rx="560" ry="26" fill="#fff" opacity="0.65" />
    </g>
  );
}

function Railway() {
  return (
    <g>
      {/* viaduct */}
      <rect x="0" y="250" width="1200" height="16" fill="#8d8b82" />
      {Array.from({ length: 8 }).map((_, i) => (
        <path key={i} d={`M${i * 150} 266 h150 v104 h-20 q-55 -90 -110 0 h-20 Z`} fill="#a7a59b" />
      ))}
      {/* rails & sleepers */}
      {Array.from({ length: 60 }).map((_, i) => (
        <rect key={i} x={i * 20} y="240" width="12" height="8" fill="#d8d6cc" />
      ))}
      <rect x="0" y="238" width="1200" height="3" fill="#4a4d4b" />
      <rect x="0" y="244" width="1200" height="2" fill="#6a6d6b" />
      {/* train */}
      <g transform="translate(160 186)">
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(${i * 190} 0)`}>
            <rect x="0" y="0" width="180" height="50" rx="6" fill={i === 0 ? "#1f5f9e" : "#2a6db3"} />
            <rect x="0" y="34" width="180" height="6" fill="#fff315" />
            {Array.from({ length: 6 }).map((_, w) => (
              <rect key={w} x={14 + w * 27} y="10" width="18" height="16" rx="2" fill="#cfe3f5" />
            ))}
          </g>
        ))}
      </g>
      {/* sleeper stacks */}
      {[40, 1000].map((x) => (
        <g key={x} transform={`translate(${x} 330)`}>
          {Array.from({ length: 4 }).map((_, r) => (
            <rect key={r} x={r * 4} y={-r * 10} width="150" height="9" fill="#cfccc1" stroke="#9e9b90" />
          ))}
        </g>
      ))}
    </g>
  );
}

function City() {
  const blds = [
    [0, 180, 90], [100, 120, 70], [180, 210, 110], [300, 90, 80], [390, 160, 70],
    [470, 60, 120], [600, 140, 90], [700, 200, 80], [790, 110, 100], [900, 170, 90],
  ];
  return (
    <g>
      {blds.map(([x, y, w], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={370 - y} fill={i % 2 ? "#cfd6d2" : "#e3e6e0"} />
          <rect x={x + w - 10} y={y} width="10" height={370 - y} fill="#000" opacity="0.08" />
          {Array.from({ length: Math.floor((360 - y) / 26) }).map((_, r) =>
            Array.from({ length: Math.floor((w - 12) / 18) }).map((__, c) => (
              <rect key={`${r}-${c}`} data-window x={x + 8 + c * 18} y={y + 10 + r * 26} width="9" height="13" fill="#5b6f7a" opacity="0.6" />
            )),
          )}
        </g>
      ))}
      {/* construction site + crane */}
      <g transform="translate(1040 0)">
        <rect x="0" y="230" width="160" height="140" fill="#d8d3c6" />
        {Array.from({ length: 5 }).map((_, i) => (
          <rect key={i} x="0" y={240 + i * 26} width="160" height="4" fill="#9a9488" />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <rect key={i} x={i * 38} y="200" width="4" height="170" fill="#9a9488" />
        ))}
        <rect x="200" y="40" width="8" height="330" fill="#e8b21a" />
        <rect x="80" y="40" width="240" height="8" fill="#e8b21a" />
        <path d="M120 48 v80" stroke="#333" strokeWidth="2" />
        <rect x="108" y="128" width="24" height="16" fill="#fff315" stroke="#06261a" />
      </g>
    </g>
  );
}

export function MidLayer(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 6400 420" preserveAspectRatio="xMinYMax meet" aria-hidden {...props}>
      <defs>
        <linearGradient id="midGround" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--ground, #8fae6d)" }} />
          <stop offset="1" style={{ stopColor: "var(--ground-2, #6f9152)" }} />
        </linearGradient>
      </defs>
      <rect x="0" y="360" width="6400" height="60" fill="url(#midGround)" />
      <g transform="translate(260 0)"><Plant /></g>
      <g transform="translate(1700 0)"><Dam /></g>
      <g transform="translate(3250 0)"><Railway /></g>
      <g transform="translate(4900 0)"><City /></g>
      {[100, 900, 1050, 1250, 1500, 2850, 3000, 2950, 4600, 4700, 6250, 6350].map((x, i) => tree(x, 350 - (i % 3) * 6, 1 + (i % 2) * 0.3, i % 2 ? "#3c7a4a" : "#2f6b3f"))}
    </svg>
  );
}

export function RoadLayer(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 4000 200" preserveAspectRatio="xMinYMax slice" aria-hidden {...props}>
      <defs>
        <linearGradient id="asphalt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3c403e" />
          <stop offset="1" stopColor="#262928" />
        </linearGradient>
        <linearGradient id="verge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--verge, #5f8a45)" }} />
          <stop offset="1" style={{ stopColor: "var(--verge-2, #46703a)" }} />
        </linearGradient>
      </defs>
      <rect x="0" y="40" width="4000" height="40" fill="url(#verge)" />
      <rect x="0" y="80" width="4000" height="90" fill="url(#asphalt)" />
      <rect x="0" y="82" width="4000" height="3" fill="#e9e6d8" opacity="0.8" />
      <rect x="0" y="164" width="4000" height="3" fill="#e9e6d8" opacity="0.8" />
      {Array.from({ length: 50 }).map((_, i) => (
        <rect key={i} x={i * 80} y="123" width="44" height="4" fill="#f4f0dc" />
      ))}
      <rect x="0" y="170" width="4000" height="30" fill="#7a6a52" />
      {/* roadside posts and kilometre stones */}
      {Array.from({ length: 20 }).map((_, i) => (
        <g key={i} transform={`translate(${i * 200 + 60} 30)`}>
          <rect x="0" y="0" width="6" height="44" fill="#f2efe6" />
          <rect x="0" y="6" width="6" height="8" fill="#d6261e" />
        </g>
      ))}
      {[350, 1350, 2350, 3350].map((x, i) => (
        <g key={x} transform={`translate(${x} 22)`}>
          <path d="M0 52 V14 Q0 0 16 0 Q32 0 32 14 V52 Z" fill="#f4f1e8" stroke="#bdb8aa" />
          <path d="M0 14 Q0 0 16 0 Q32 0 32 14 Z" fill="#fff315" />
          <text x="16" y="34" textAnchor="middle" fontSize="9" fontWeight="800" fill="#06261a" fontFamily="Arial">{["0", "120", "260", "410"][i]}</text>
          <text x="16" y="45" textAnchor="middle" fontSize="6" fontWeight="700" fill="#06261a" fontFamily="Arial">KM</text>
        </g>
      ))}
    </svg>
  );
}

export function ForegroundLayer(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 5000 200" preserveAspectRatio="xMinYMax slice" aria-hidden {...props}>
      {Array.from({ length: 6 }).map((_, i) => (
        <g key={i}>{tree(i * 860 + 420, 230, 2.2, i % 2 ? "#24502f" : "#1e4528")}</g>
      ))}
      {Array.from({ length: 40 }).map((_, i) => (
        <path key={i} d={`M${i * 130} 200 q10 -40 18 0 q8 -50 16 0 q8 -34 14 0 Z`} fill="#1d3f25" />
      ))}
    </svg>
  );
}
