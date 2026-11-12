// Product information from panyamcements.in/products.html and the company brochure.
// Technical values are reproduced exactly from the brochure's "Technical Specifications".
// Panyam Super and Panyam 53-S have no published test values — do not invent them.

export interface SpecRow {
  parameter: string;
  unit: string;
  standard: string;
  panyam: string;
  benefit?: string;
}

export interface Product {
  slug: string;
  name: string;
  type: string;
  shortType: string;
  standard: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  accent: string;
  summary: string;
  description: string[];
  idealFor: string[];
  specs?: SpecRow[];
}

export const products: Product[] = [
  {
    slug: "panyam-prestige",
    name: "Panyam Prestige",
    type: "Ordinary Portland Cement — 53 Grade",
    shortType: "OPC 53",
    standard: "IS 269:2015",
    image: "/images/web/bag-prestige.webp",
    imageWidth: 900,
    imageHeight: 1153,
    accent: "#00a85a",
    summary: "Prime brand cement with remarkably high C₃S (tri-calcium silicate) for long-lasting durability.",
    description: [
      "Panyam Prestige is our prime brand OPC 53 grade cement with remarkably high C₃S (tri-calcium silicate), providing long-lasting durability to concrete structures.",
      "Its high early and 28-day strengths allow speedy construction, early removal of formwork and economical concrete mix designs.",
    ],
    idealFor: ["RCC structures", "High-rise buildings", "Bridges and flyovers", "Precast elements"],
    specs: [
      { parameter: "Fineness", unit: "m²/kg", standard: "225 (min)", panyam: "316", benefit: "Cohesive concrete mix" },
      { parameter: "Initial setting time", unit: "minutes", standard: "More than 30", panyam: "120", benefit: "Comfortable working time" },
      { parameter: "Final setting time", unit: "minutes", standard: "Less than 600", panyam: "200", benefit: "Setting starts early after placement" },
      { parameter: "Compressive strength — 3 days", unit: "MPa", standard: "27", panyam: "41", benefit: "Speedy construction, early de-shuttering" },
      { parameter: "Compressive strength — 7 days", unit: "MPa", standard: "37", panyam: "52" },
      { parameter: "Compressive strength — 28 days", unit: "MPa", standard: "53", panyam: "65", benefit: "Economical concrete mix designs" },
    ],
  },
  {
    slug: "panyam-super",
    name: "Panyam Super",
    type: "Ordinary Portland Cement — 43 Grade",
    shortType: "OPC 43",
    standard: "IS 269:2015",
    image: "/images/web/bag-super.webp",
    imageWidth: 900,
    imageHeight: 1181,
    accent: "#0a5c36",
    summary: "The popular brand cement with low heat of hydration and long life of concrete structures.",
    description: [
      "Super Panyam is our popular OPC 43 grade cement with low heat of hydration and long life of concrete structures.",
      "A dependable all-round cement for general construction, plastering and masonry.",
    ],
    idealFor: ["General construction", "Plastering", "Masonry", "Flooring"],
  },
  {
    slug: "panyam-power",
    name: "Panyam Power",
    type: "Portland Pozzolana Cement (Fly-ash based)",
    shortType: "PPC",
    standard: "IS 1489 (Part 1):2015",
    image: "/images/web/bag-power.webp",
    imageWidth: 900,
    imageHeight: 1177,
    accent: "#e8771e",
    summary: "Fly-ash based PPC with low heat of hydration — strong and durable structures.",
    description: [
      "Panyam Power is a fly-ash based Portland Pozzolana Cement with low heat of hydration and long life of concrete structures.",
      "Its higher strengths ensure strong and durable structures, while the fine particle size produces a cohesive concrete mix.",
    ],
    idealFor: ["Foundations and footings", "Mass concrete", "Plastering and masonry", "Water-retaining structures"],
    specs: [
      // NOTE: brochure prints 225 as the IS value for PPC; IS 1489-1:2015 specifies 300 min. Client to confirm.
      { parameter: "Fineness", unit: "m²/kg", standard: "225 (min)", panyam: "360", benefit: "Cohesive concrete mix" },
      { parameter: "Initial setting time", unit: "minutes", standard: "More than 30", panyam: "130", benefit: "Comfortable working time" },
      { parameter: "Final setting time", unit: "minutes", standard: "Less than 600", panyam: "220", benefit: "Setting starts early after placement" },
      { parameter: "Compressive strength — 3 days", unit: "MPa", standard: "16", panyam: "25", benefit: "Higher strengths ensure strong and durable structures" },
      { parameter: "Compressive strength — 7 days", unit: "MPa", standard: "22", panyam: "35" },
      { parameter: "Compressive strength — 28 days", unit: "MPa", standard: "33", panyam: "53" },
    ],
  },
  {
    slug: "panyam-53s",
    name: "Panyam 53-S",
    type: "Railway Sleeper Grade Cement — OPC 53-S",
    shortType: "53-S",
    standard: "IS 269:2015 (53-S)",
    image: "/images/web/bag-53s.webp",
    imageWidth: 900,
    imageHeight: 1185,
    accent: "#06261a",
    summary: "Sleeper grade cement — Panyam was the first company to supply it to the Indian Railways.",
    description: [
      "Panyam Cement was the first company to supply Railway Sleeper Grade Cement, 53-S (earlier known as IRST-40), where consistent high quality is of paramount importance.",
      "Panyam Cement has been used successfully to manufacture concrete sleepers under the strict supervision of the Railways.",
    ],
    idealFor: ["Pre-stressed concrete railway sleepers", "Precast pre-stressed elements"],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
