// Detailed side-view illustration of a Panyam Cement delivery truck.
// Built in vector so it stays crisp at any size and can be animated:
//  - elements with [data-wheel] rotate around their own centre
//  - [data-smoke] puffs animate from the exhaust
//  - [data-headlight] glow can be faded
import type { SVGProps } from "react";
import { FORT_PATH, FLAG_PATH, SPIRAL_PATH } from "@/components/ui/PanyamMark";

function Wheel({ cx, cy, id }: { cx: number; cy: number; id: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={33} fill="#151716" />
      <g data-wheel>
        <circle cx={cx} cy={cy} r={33} fill={`url(#tyre-${id})`} />
        {/* tread blocks */}
        {Array.from({ length: 18 }).map((_, i) => {
          const deg = i * 20;
          return <rect key={i} x={cx - 2.5} y={cy - 34} width={5} height={8} rx={1} fill="#0b0c0c" transform={`rotate(${deg} ${cx} ${cy})`} />;
        })}
        <circle cx={cx} cy={cy} r={19} fill="url(#rim)" stroke="#6b716d" strokeWidth={1.5} />
        <circle cx={cx} cy={cy} r={12} fill="#9aa19c" stroke="#5c625e" />
        {Array.from({ length: 8 }).map((_, i) => (
          <circle key={i} cx={cx} cy={cy - 15} r={1.8} fill="#3c413e" transform={`rotate(${i * 45} ${cx} ${cy})`} />
        ))}
        <rect x={cx - 1.5} y={cy - 18} width={3} height={6} fill="#5c625e" />
        <circle cx={cx} cy={cy} r={4.5} fill="#2b2f2d" />
      </g>
    </g>
  );
}

export function PanyamTruck({ title = "Panyam Cement delivery truck", ...props }: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg viewBox="0 0 660 270" role="img" aria-label={title} {...props}>
      <defs>
        <linearGradient id="cargo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff86a" />
          <stop offset="0.12" stopColor="#fff315" />
          <stop offset="0.8" stopColor="#f1e20a" />
          <stop offset="1" stopColor="#d4c400" />
        </linearGradient>
        <linearGradient id="cargoBand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#12c16d" />
          <stop offset="1" stopColor="#007a41" />
        </linearGradient>
        <linearGradient id="cab" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2ad183" />
          <stop offset="0.35" stopColor="#00a85a" />
          <stop offset="1" stopColor="#006a39" />
        </linearGradient>
        <linearGradient id="cabSide" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.18" />
          <stop offset="0.25" stopColor="#000" stopOpacity="0" />
          <stop offset="0.85" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="1" stopColor="#000" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7fb8c9" />
          <stop offset="0.45" stopColor="#24434d" />
          <stop offset="0.55" stopColor="#1a3038" />
          <stop offset="1" stopColor="#0d1a1f" />
        </linearGradient>
        <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4f6f5" />
          <stop offset="0.45" stopColor="#a7aeaa" />
          <stop offset="0.55" stopColor="#6d746f" />
          <stop offset="1" stopColor="#c9cfcb" />
        </linearGradient>
        <radialGradient id="rim" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#f2f4f3" />
          <stop offset="0.6" stopColor="#b6bcb8" />
          <stop offset="1" stopColor="#7d847f" />
        </radialGradient>
        {["f", "r1", "r2"].map((id) => (
          <radialGradient key={id} id={`tyre-${id}`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0.55" stopColor="#2a2d2c" />
            <stop offset="0.9" stopColor="#1b1d1c" />
            <stop offset="1" stopColor="#0c0d0d" />
          </radialGradient>
        ))}
        <radialGradient id="beam" cx="0" cy="0.5" r="1">
          <stop offset="0" stopColor="#fff7c2" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff7c2" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="shadow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity="0.45" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <clipPath id="cargoClip">
          <rect x="22" y="58" width="436" height="138" rx="6" />
        </clipPath>
      </defs>

      {/* ground shadow */}
      <ellipse cx="330" cy="246" rx="320" ry="14" fill="url(#shadow)" />

      {/* headlight beam */}
      <path data-headlight d="M640 178 L660 150 L660 215 Z" fill="url(#beam)" opacity="0" />

      {/* exhaust smoke */}
      <g aria-hidden>
        {[0, 1, 2].map((i) => (
          <circle key={i} data-smoke cx="470" cy="56" r="9" fill="#cfd3d0" opacity="0" />
        ))}
      </g>

      {/* chassis */}
      <rect x="18" y="196" width="600" height="12" rx="3" fill="#202322" />
      <rect x="18" y="196" width="600" height="3" fill="#3a3f3c" />

      {/* ---------- cargo body ---------- */}
      <g clipPath="url(#cargoClip)">
        <rect x="22" y="58" width="436" height="138" fill="url(#cargo)" />
        {/* panel ribs */}
        {Array.from({ length: 11 }).map((_, i) => (
          <g key={i}>
            <rect x={22 + i * 40} y="58" width="2" height="138" fill="#000" opacity="0.08" />
            <rect x={24 + i * 40} y="58" width="1.2" height="138" fill="#fff" opacity="0.35" />
          </g>
        ))}
        {/* lower green band */}
        <rect x="22" y="160" width="436" height="36" fill="url(#cargoBand)" />
        <rect x="22" y="160" width="436" height="2" fill="#fff" opacity="0.4" />
        {/* top highlight + bottom occlusion */}
        <rect x="22" y="58" width="436" height="6" fill="#fff" opacity="0.45" />
        <rect x="22" y="150" width="436" height="10" fill="#000" opacity="0.06" />
      </g>
      <rect x="22" y="58" width="436" height="138" rx="6" fill="none" stroke="#a89b00" strokeWidth="2" />

      {/* brand mark on cargo */}
      <g transform="translate(48 70)">
        <circle cx="42" cy="42" r="42" fill="#00a85a" stroke="#fff" strokeWidth="3" />
        <g transform="translate(9 12) scale(0.085)">
          <g transform="translate(-570 -260)">
            <path d={FORT_PATH} fill="#fff315" />
            <path d={FLAG_PATH} fill="#fff315" />
            <path d={SPIRAL_PATH} stroke="#00a85a" strokeWidth="104" fill="none" />
          </g>
        </g>
      </g>
      <text x="152" y="80" fontFamily="var(--font-manrope), Arial, sans-serif" fontWeight="800" fontSize="11" fill="#0a5c36" letterSpacing="2.2">
        LASTING STRENGTH FOR GENERATIONS
      </text>
      <text x="150" y="124" fontFamily="var(--font-archivo), Arial Black, sans-serif" fontWeight="900" fontSize="46" fill="#06261a" style={{ fontStretch: "118%" }} letterSpacing="1">
        PANYAM
      </text>
      <text x="152" y="153" fontFamily="var(--font-archivo), Arial Black, sans-serif" fontWeight="800" fontSize="24" fill="#00a85a" letterSpacing="8">
        CEMENT
      </text>
      <text x="342" y="153" fontFamily="var(--font-instrument), Georgia, serif" fontStyle="italic" fontSize="17" fill="#06261a">
        since 1955
      </text>
      <text x="292" y="183" fontFamily="var(--font-manrope), Arial, sans-serif" fontWeight="800" fontSize="11" fill="#fff" letterSpacing="1.5">
        panyamcements.in
      </text>
      {/* rear lights + reflectors */}
      <rect x="16" y="168" width="7" height="18" rx="2" fill="#d6261e" />
      <rect x="16" y="150" width="7" height="12" rx="2" fill="#f2a01a" />

      {/* ---------- cab ---------- */}
      <path d="M470 196 V96 Q470 70 496 66 L560 60 Q590 58 604 84 L630 140 Q638 156 638 172 V196 Z" fill="url(#cab)" />
      <path d="M470 196 V96 Q470 70 496 66 L560 60 Q590 58 604 84 L630 140 Q638 156 638 172 V196 Z" fill="url(#cabSide)" />
      {/* roof spoiler */}
      <path d="M476 66 Q490 40 540 38 L578 40 Q596 44 600 62 L560 60 L496 66 Z" fill="#008a49" />
      <path d="M480 62 Q494 44 540 42 L576 44" stroke="#fff" strokeOpacity="0.45" strokeWidth="2" fill="none" />
      {/* windscreen */}
      <path d="M574 72 Q590 70 600 90 L622 138 L588 138 Q580 104 574 72 Z" fill="url(#glass)" />
      <path d="M582 78 L596 104 L590 104 Z" fill="#fff" opacity="0.35" />
      {/* door window */}
      <path d="M500 80 Q500 74 508 73 L560 70 Q568 70 570 78 L578 132 L500 132 Z" fill="url(#glass)" />
      <path d="M512 78 L540 76 L516 122 L508 122 Z" fill="#fff" opacity="0.18" />
      {/* door seams + handle */}
      <path d="M496 70 V194 M582 134 V194" stroke="#00552d" strokeWidth="2" />
      <rect x="560" y="148" width="16" height="4" rx="2" fill="url(#chrome)" />
      {/* cab badge */}
      <circle cx="532" cy="160" r="15" fill="#fff315" />
      <g transform="translate(519.5 148.5) scale(0.032)">
        <g transform="translate(-570 -260)">
          <path d={FORT_PATH} fill="#00a85a" />
          <path d={FLAG_PATH} fill="#00a85a" />
          <path d={SPIRAL_PATH} stroke="#fff315" strokeWidth="104" fill="none" />
        </g>
      </g>
      {/* mirror */}
      <rect x="598" y="72" width="4" height="40" fill="#1f2321" />
      <rect x="600" y="76" width="9" height="30" rx="3" fill="#1f2321" />
      {/* grille + bumper */}
      <rect x="628" y="150" width="12" height="34" rx="3" fill="#1d201f" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="630" y={154 + i * 7} width="9" height="3" fill="#4b514d" />
      ))}
      <rect x="600" y="186" width="46" height="16" rx="4" fill="url(#chrome)" />
      {/* headlight */}
      <rect x="632" y="168" width="10" height="12" rx="3" fill="#fffbe0" />
      <circle cx="637" cy="174" r="12" fill="#fff7c2" opacity="0.35" />
      {/* steps + tank */}
      <rect x="500" y="200" width="36" height="6" rx="2" fill="#2b2f2d" />
      <rect x="352" y="198" width="96" height="22" rx="10" fill="url(#chrome)" />
      <rect x="360" y="206" width="80" height="2" fill="#fff" opacity="0.6" />
      {/* exhaust stack */}
      <rect x="464" y="60" width="9" height="130" rx="3" fill="url(#chrome)" />

      {/* mudguards */}
      <path d="M498 214 Q500 170 545 168 Q590 170 592 214" fill="none" stroke="#1d201f" strokeWidth="9" />
      <path d="M104 214 Q106 168 150 166 Q190 166 192 196 Q194 166 230 166 Q274 168 276 214" fill="none" stroke="#1d201f" strokeWidth="8" />

      {/* wheels */}
      <Wheel cx={150} cy={214} id="r1" />
      <Wheel cx={232} cy={214} id="r2" />
      <Wheel cx={545} cy={214} id="f" />
    </svg>
  );
}
