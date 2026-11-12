// Starter articles shown until the Sanity CMS is connected.
// These are general construction guides — company facts used here are verified.

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  category: string;
  cover: string;
  readMinutes: number;
  body: { type: "p" | "h2" | "ul"; text?: string; items?: string[] }[];
}

export const posts: Post[] = [
  {
    slug: "opc-53-vs-ppc-which-cement-to-choose",
    title: "OPC 53 or PPC? Choosing the right cement for each stage of your build",
    excerpt: "Both are strong, BIS-certified cements — but they behave differently. Here is a simple guide to using each where it performs best.",
    date: "2026-11-10",
    category: "Building Guide",
    cover: "/images/web/factory-aerial-alt.webp",
    readMinutes: 4,
    body: [
      { type: "p", text: "Ordinary Portland Cement (OPC) and Portland Pozzolana Cement (PPC) are the two cements most home builders and contractors choose between. Both are manufactured to Bureau of Indian Standards (BIS) specifications, but their chemistry gives each a different strength profile." },
      { type: "h2", text: "OPC 53 — strength early" },
      { type: "p", text: "OPC 53 grade gains strength rapidly. That makes it the natural choice for reinforced concrete work such as columns, beams and slabs, where early de-shuttering keeps a project on schedule. Panyam Prestige, our OPC 53, achieves 41 MPa at 3 days and 65 MPa at 28 days in our published tests, against the IS 269:2015 requirements of 27 and 53 MPa." },
      { type: "h2", text: "PPC — durability over time" },
      { type: "p", text: "PPC blends fly ash with cement clinker. The pozzolanic reaction continues long after placement, producing a denser concrete with lower heat of hydration. That is valuable in foundations, mass concrete, plastering and masonry, and in structures exposed to water." },
      { type: "h2", text: "A simple rule of thumb" },
      { type: "ul", items: ["RCC frame, slabs and precast work: OPC 53 (Panyam Prestige)", "General construction and masonry: OPC 43 (Panyam Super)", "Foundations, plastering, mass concrete: PPC (Panyam Power)"] },
      { type: "p", text: "Every project is different — always follow your structural engineer’s specification. Our marketing team is happy to help you pick the right product." },
    ],
  },
  {
    slug: "curing-concrete-why-it-matters",
    title: "Curing concrete: the step that decides how strong your home really is",
    excerpt: "The right cement gives concrete its potential. Proper curing is what lets it reach that potential.",
    date: "2026-11-03",
    category: "Building Guide",
    cover: "/images/web/factory-aerial-wide.webp",
    readMinutes: 3,
    body: [
      { type: "p", text: "Cement gains strength through hydration — a chemical reaction that needs water. If fresh concrete dries out too quickly, hydration stops early and the concrete never reaches its designed strength." },
      { type: "h2", text: "How long should you cure?" },
      { type: "p", text: "As general guidance, concrete made with OPC should be kept moist for at least 7 days, and concrete with blended cements such as PPC for at least 10 days, with longer curing in hot, dry or windy weather. Follow the duration specified by your engineer." },
      { type: "h2", text: "Good curing practice" },
      { type: "ul", items: ["Start curing as soon as the surface has hardened enough not to be damaged", "Keep surfaces continuously wet — ponding for slabs, wet hessian for columns and walls", "Protect fresh concrete from direct sun and strong wind", "Never let the surface dry out between wetting cycles"] },
      { type: "p", text: "A few extra days of careful curing costs very little — and pays back for the life of the structure." },
    ],
  },
  {
    slug: "how-many-bags-of-cement-do-i-need",
    title: "How many bags of cement do I need? A quick estimating guide",
    excerpt: "Estimate cement for slabs, plaster and brickwork in minutes — then confirm with our free online calculator.",
    date: "2026-10-27",
    category: "Tools",
    cover: "/images/web/factory-aerial-dusk-md.webp",
    readMinutes: 3,
    body: [
      { type: "p", text: "Ordering too little cement stalls work; ordering too much ties up money and risks bags going stale. A quick estimate helps you plan purchases and deliveries." },
      { type: "h2", text: "The basic method" },
      { type: "ul", items: ["Work out the wet volume of concrete or mortar (length × width × thickness)", "Multiply by about 1.54 to get the dry volume of materials", "Divide by the sum of the mix ratio parts and multiply by the cement part", "Divide the cement volume by 0.0347 m³ — the volume of one 50 kg bag"] },
      { type: "p", text: "For example, a 1:2:4 concrete mix needs roughly 6.3 bags of cement per cubic metre. Our online calculator does this for you for concrete, plaster and brickwork." },
      { type: "p", text: "Estimates are approximate — wastage, site conditions and engineer specifications all affect final quantities." },
    ],
  },
];
