// Copies every investor PDF from the current panyamcements.in site into /public,
// keeping the exact same paths so existing links (BSE filings, emails, search results)
// keep working after the domain switches to the new site.
// Run once before launch:  npm run investor-docs
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { readFileSync } from "node:fs";

const src = readFileSync("src/data/investor-docs.ts", "utf8");
const json = src.slice(src.indexOf("= [") + 2, src.lastIndexOf("]") + 1);
const docs = JSON.parse(json);
const ORIGIN = process.env.OLD_SITE || "https://www.panyamcements.in";
const headers = { "User-Agent": "Mozilla/5.0 (compatible; site-migration)", Accept: "application/pdf,*/*" };

let ok = 0, skipped = 0;
const failed = [];
for (const d of docs) {
  const target = path.join("public", ...d.path.split("/").filter(Boolean));
  try { await access(target); skipped++; continue; } catch {}
  try {
    const res = await fetch(ORIGIN + encodeURI(d.path), { headers });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, Buffer.from(await res.arrayBuffer()));
    ok++;
    process.stdout.write(".");
  } catch (e) {
    failed.push(`${d.path} — ${e.message}`);
  }
}
console.log(`\nDownloaded ${ok}, already present ${skipped}, failed ${failed.length}`);
if (failed.length) console.log(failed.join("\n"));
