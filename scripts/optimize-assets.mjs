// Creates web-optimised copies of the original media in /public/images/web.
// Originals supplied by the client are never modified or moved.
// Run with: npm run assets
import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("public/images");
const out = path.join(root, "web");

/** [source (relative to public/images), output name, width, options] */
const jobs = [
  ["factory/factory.png", "factory-aerial-dusk", 2560],
  ["factory/factory.png", "factory-aerial-dusk-md", 1280],
  ["factory/Ultra-realistic_8K_cinematic_aerial_view_of_a_mass-1774275407042.png", "factory-aerial-alt", 2560],
  ["factory/Ultra-realistic_8K_cinematic_aerial_view_of_a_mass-1774269861466.png", "factory-aerial-wide", 2560],
  ["factory/Ultra-realistic_cinematic_aerial_202603231806.png", "factory-portrait", 1080],
  ["factory/Ultra-realistic_8K_cinematic_202603231810.png", "factory-portrait-close", 1080],
  ["factory/Remove_established_date_and_place_kurnool_2k_delpmaspu.png", "brand-poster-sunset", 1080],
  ["products/Panyam Prestige.png", "bag-prestige", 900, { alpha: true }],
  ["products/Panyam super.png", "bag-super", 900, { alpha: true }],
  ["products/Panyam Power.png", "bag-power", 900, { alpha: true }],
  ["products/panyam 53-S Grade.png", "bag-53s", 900, { alpha: true }],
  ["logos/Panyam logo.png", "panyam-logo", 512, { alpha: true }],
  ["logos/accord transparent white logo.png", "accord-logo-white", 640, { alpha: true }],
  ["logos/accord logo white.jpg", "accord-logo", 640],
];

await mkdir(out, { recursive: true });
for (const [src, name, width, opts = {}] of jobs) {
  const input = path.join(root, src);
  const target = path.join(out, `${name}.webp`);
  const img = sharp(input, { limitInputPixels: false }).resize({ width, withoutEnlargement: true });
  if (opts.alpha) {
    await img.trim({ threshold: 1 }).webp({ quality: 86, alphaQuality: 90, effort: 5 }).toFile(target);
  } else {
    await img.webp({ quality: 80, effort: 5 }).toFile(target);
  }
  const { size } = await stat(target);
  const meta = await sharp(target).metadata();
  console.log(`${name}.webp  ${meta.width}x${meta.height}  ${(size / 1024).toFixed(0)} KB`);
}
