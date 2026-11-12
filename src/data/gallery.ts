export interface GalleryItem {
  id: string;
  kind: "image" | "video";
  src: string;
  poster?: string;
  width: number;
  height: number;
  alt: string;
  category: "Plant" | "Products" | "Brand";
}

// Media supplied by the client. Several plant images are artist's visualisations —
// replace with photography of the plant when available.
export const gallery: GalleryItem[] = [
  { id: "plant-dusk", kind: "image", src: "/images/web/factory-aerial-dusk.webp", width: 2560, height: 1227, alt: "Aerial view of the Panyam Cement plant at dusk with the illuminated preheater tower", category: "Plant" },
  { id: "plant-title", kind: "video", src: "/videos/web/factory-title.mp4", poster: "/videos/web/factory-title-poster.jpg", width: 1080, height: 1350, alt: "Panyam Cement plant at sunset with animated title", category: "Brand" },
  { id: "plant-alt", kind: "image", src: "/images/web/factory-aerial-alt.webp", width: 2560, height: 1227, alt: "Panyam Cement plant and packing house lit at golden hour", category: "Plant" },
  { id: "plant-portrait", kind: "image", src: "/images/web/factory-portrait.webp", width: 1080, height: 1935, alt: "Preheater tower and silos of the Panyam Cement plant seen from above", category: "Plant" },
  { id: "plant-wide", kind: "image", src: "/images/web/factory-aerial-wide.webp", width: 2560, height: 1227, alt: "Wide aerial view of the cement works and surrounding Rayalaseema landscape", category: "Plant" },
  { id: "plant-close", kind: "image", src: "/images/web/factory-portrait-close.webp", width: 1080, height: 1935, alt: "Trucks loading at the Panyam Cement plant in the evening", category: "Plant" },
  { id: "brand-sunset", kind: "image", src: "/images/web/brand-poster-sunset.webp", width: 1080, height: 1935, alt: "Panyam Cement brand poster over a sunset river landscape", category: "Brand" },
  { id: "bag-prestige", kind: "image", src: "/images/web/bag-prestige.webp", width: 900, height: 1153, alt: "Panyam Prestige OPC 53 grade cement bag", category: "Products" },
  { id: "bag-super", kind: "image", src: "/images/web/bag-super.webp", width: 900, height: 1181, alt: "Panyam Super OPC 43 grade cement bag", category: "Products" },
  { id: "bag-power", kind: "image", src: "/images/web/bag-power.webp", width: 900, height: 1177, alt: "Panyam Power PPC cement bag", category: "Products" },
  { id: "bag-53s", kind: "image", src: "/images/web/bag-53s.webp", width: 900, height: 1185, alt: "Panyam 53-S sleeper grade cement bag", category: "Products" },
];
