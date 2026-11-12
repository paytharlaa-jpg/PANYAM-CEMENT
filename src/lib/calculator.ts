// Standard thumb-rule quantity estimates used in Indian site practice.
// One 50 kg bag of cement ≈ 0.0347 m³ (bulk density 1440 kg/m³).

export const BAG_VOLUME = 0.0347;
export const M_PER_FT = 0.3048;

export type Work = "concrete" | "plaster" | "brickwork";

export const concreteMixes = {
  M10: { label: "M10 (1:3:6) — PCC, levelling", ratio: [1, 3, 6] },
  M15: { label: "M15 (1:2:4) — flooring, light RCC", ratio: [1, 2, 4] },
  M20: { label: "M20 (1:1.5:3) — RCC slabs, beams, columns", ratio: [1, 1.5, 3] },
  M25: { label: "M25 (1:1:2) — heavy RCC", ratio: [1, 1, 2] },
} as const;

export const mortarMixes = {
  "1:3": [1, 3],
  "1:4": [1, 4],
  "1:5": [1, 5],
  "1:6": [1, 6],
} as const;

export interface Estimate {
  bags: number;
  cementKg: number;
  sandM3: number;
  aggregateM3?: number;
  bricks?: number;
  wetVolumeM3: number;
  recommended: "panyam-prestige" | "panyam-power" | "panyam-super";
}

const round = (n: number, d = 2) => Math.round(n * 10 ** d) / 10 ** d;

export function estimateConcrete(lengthM: number, widthM: number, depthM: number, mix: keyof typeof concreteMixes): Estimate {
  const wet = lengthM * widthM * depthM;
  const dry = wet * 1.54;
  const [c, s, a] = concreteMixes[mix].ratio;
  const sum = c + s + a;
  const cementM3 = (dry * c) / sum;
  return {
    wetVolumeM3: round(wet),
    bags: Math.ceil(cementM3 / BAG_VOLUME),
    cementKg: Math.round((cementM3 / BAG_VOLUME) * 50),
    sandM3: round((dry * s) / sum),
    aggregateM3: round((dry * a) / sum),
    recommended: mix === "M20" || mix === "M25" ? "panyam-prestige" : "panyam-power",
  };
}

export function estimatePlaster(areaM2: number, thicknessMm: number, mix: keyof typeof mortarMixes): Estimate {
  const wet = areaM2 * (thicknessMm / 1000);
  const dry = wet * 1.27 * 1.2; // dry volume + 20% for wastage and uneven surfaces
  const [c, s] = mortarMixes[mix];
  const cementM3 = (dry * c) / (c + s);
  return {
    wetVolumeM3: round(wet, 3),
    bags: Math.ceil(cementM3 / BAG_VOLUME),
    cementKg: Math.round((cementM3 / BAG_VOLUME) * 50),
    sandM3: round((dry * s) / (c + s)),
    recommended: "panyam-power",
  };
}

export function estimateBrickwork(lengthM: number, heightM: number, thicknessM: number, mix: keyof typeof mortarMixes): Estimate {
  const wall = lengthM * heightM * thicknessM;
  const bricks = Math.ceil(wall * 500); // 190×90×90 mm modular bricks with 10 mm joints
  const mortarWet = wall * 0.3;
  const dry = mortarWet * 1.27;
  const [c, s] = mortarMixes[mix];
  const cementM3 = (dry * c) / (c + s);
  return {
    wetVolumeM3: round(wall),
    bags: Math.ceil(cementM3 / BAG_VOLUME),
    cementKg: Math.round((cementM3 / BAG_VOLUME) * 50),
    sandM3: round((dry * s) / (c + s)),
    bricks,
    recommended: "panyam-power",
  };
}
