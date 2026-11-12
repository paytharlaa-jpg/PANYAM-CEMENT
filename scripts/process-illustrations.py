"""Prepare the supplied illustrator assets for the website (originals are not modified).

Outputs (public/images/web/):
  pump-color.svg / pump-line.svg   concrete boom-pump truck in Panyam colours + pencil line version
  mixer-color.webp / mixer-line.webp   mixer truck cut out, recoloured (green cab, yellow drum) + line version
  mixer-sketch-lineart.webp         supplied line-art mixer (side view only), cropped
  construction-site.webp            factories strip cropped from the construction background

Run:  python scripts/process-illustrations.py
"""
import re
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public/images/illustrator"
OUT = ROOT / "public/images/web"
OUT.mkdir(parents=True, exist_ok=True)

# ---------- 1. Boom-pump truck SVG ----------
svg = (SRC / "200degrees-truck-2194924.svg").read_text(encoding="utf-8")
# drop the white card and the teal bars
svg = re.sub(r'<rect[^>]*width="1034\.4"[^>]*/>', "", svg)
# tighten the viewBox around the truck
svg = re.sub(r'width="[^"]+mm" height="[^"]+mm"', "", svg, count=1)
svg = svg.replace('viewBox="0 0 1034.4 635.92"', 'viewBox="20 85 1000 450"')
# Panyam palette: orange accents → greens, yellows kept (brand yellow)
recolour = {
    "#f57f17": "#0a5c36",
    "#f9a825": "#00a85a",
    "#ffc107": "#13924f",
    "#fbc02d": "#f2e400",
    "#fdd835": "#fff315",
    "#ffeb3b": "#fff74a",
    "#fff59d": "#e8efe9",
}
color_svg = svg
for a, b in recolour.items():
    color_svg = re.sub(re.escape(a), b, color_svg, flags=re.I)
(OUT / "pump-color.svg").write_text(color_svg, encoding="utf-8")

# pencil version: a stylesheet overrides every fill/stroke (CSS beats presentation attributes)
line_svg = re.sub(r"(<svg[^>]*>)", r"<style>*{fill:#f6f4ee!important;stroke:#1c3028!important;stroke-width:1.4px!important;stroke-linejoin:round}</style>", svg, count=1)
(OUT / "pump-line.svg").write_text(line_svg, encoding="utf-8")

# ---------- 2. Mixer truck PNG ----------
im = Image.open(SRC / "alles-concrete-mixer-1419471_1920.png")  # transparent line art (front + side)
# side view only (right ~62%)
w, h = im.size
side = im.crop((int(w * 0.35), 0, w, h))
bbox = side.getbbox()
side = side.crop(bbox)
side.save(OUT / "mixer-sketch-lineart.webp", quality=90)

mix = Image.open(SRC / "200degrees-truck-2194948_1920.png").convert("RGB")
a = np.asarray(mix).astype(np.int16)
r, g, b = a[..., 0], a[..., 1], a[..., 2]
H, W = r.shape
# background: near-white, plus the teal bars (top/bottom rows)
white = (r > 235) & (g > 235) & (b > 235)
alpha = np.where(white, 0, 255).astype(np.uint8)
alpha[: int(H * 0.075)] = 0
alpha[int(H * 0.925):] = 0
# ground strip (pale teal line under wheels) → transparent
pale = (r > 170) & (g > 210) & (b > 205) & (np.arange(H)[:, None] > H * 0.82)
alpha[pale] = 0

teal = (g > r + 40) & (b > r + 30)
light = teal & (r > 90)
dark = teal & ~light
drum_zone = np.zeros_like(teal)
drum_zone[:, : int(W * 0.66)] = True
drum_zone[int(H * 0.62):, :] = False  # chassis stays green
out = a.copy()
# drum: yellow (light) / golden (dark)
out[light & drum_zone] = [255, 236, 30]
out[dark & drum_zone] = [232, 196, 0]
# everything else teal → Panyam greens
out[light & ~drum_zone] = [52, 196, 120]
out[dark & ~drum_zone] = [0, 140, 76]
rgba = np.dstack([np.clip(out, 0, 255).astype(np.uint8), alpha])
color = Image.fromarray(rgba, "RGBA")
color = color.crop(color.getbbox())
color.save(OUT / "mixer-color.webp", quality=92)

# matching pencil version of the same truck (aligned 1:1 for the paint reveal)
flat = Image.new("RGBA", color.size, (255, 255, 255, 255)); flat.alpha_composite(color)
gray = ImageOps.grayscale(flat.convert("RGB"))
edges = gray.filter(ImageFilter.FIND_EDGES).point(lambda v: 255 if v > 28 else 0).filter(ImageFilter.MaxFilter(3))
inside = color.getchannel("A").point(lambda v: 255 if v > 200 else 0).filter(ImageFilter.MinFilter(5))
edges = Image.fromarray(np.minimum(np.asarray(edges), np.maximum(np.asarray(inside), np.asarray(gray.point(lambda v: 255 if v < 250 else 0).filter(ImageFilter.MinFilter(3))) * 0)))
solid = color.getchannel("A").point(lambda v: 255 if v > 200 else 0).filter(ImageFilter.MedianFilter(5))
outline = solid.filter(ImageFilter.FIND_EDGES).filter(ImageFilter.MaxFilter(3))
edges = Image.fromarray(np.maximum(np.asarray(edges), np.asarray(outline)))
ink = Image.new("RGBA", color.size, (28, 48, 40, 0))
ink.putalpha(edges)
paper = Image.new("RGBA", color.size, (246, 244, 238, 0))
paper.putalpha(solid.point(lambda v: 235 if v else 0))
paper.alpha_composite(ink)
paper.save(OUT / "mixer-line.webp", quality=92)
print("mixer", color.size)

# ---------- 3. Construction background ----------
bg = Image.open(SRC / "construction-background-design/OQPEFO0.jpg").convert("RGB")
crop = bg.crop((1110, 560, 2000, 1450))
crop.save(OUT / "construction-site.webp", quality=85)
print("done")

# ---------- 4. Pump truck raster + aligned pencil version ----------
# (render pump-color.svg to PNG first: done by scripts/render-pump.mjs via sharp)
pump_png = OUT / "pump-color.png"
if pump_png.exists():
    pc = Image.open(pump_png).convert("RGBA")
    pc = pc.crop(pc.getbbox())
    pc.save(OUT / "pump-color.webp", quality=92)
    g2 = ImageOps.grayscale(pc.convert("RGB"))
    e2 = g2.filter(ImageFilter.FIND_EDGES).point(lambda v: 255 if v > 18 else 0).filter(ImageFilter.MaxFilter(3))
    ink2 = Image.new("RGBA", pc.size, (28, 48, 40, 0)); ink2.putalpha(e2)
    pap2 = Image.new("RGBA", pc.size, (246, 244, 238, 0))
    pap2.putalpha(pc.getchannel("A").point(lambda v: 235 if v > 8 else 0))
    pap2.alpha_composite(ink2)
    pap2.save(OUT / "pump-line.webp", quality=92)
    pump_png.unlink()
    print("pump", pc.size)
