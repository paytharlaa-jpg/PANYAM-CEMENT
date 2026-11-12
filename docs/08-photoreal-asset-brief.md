# 08 — Photoreal Asset Brief (to replace the vector illustrations)

Hand-coded vector art cannot look like real 3D. Khyber Cement's scenes are photoreal pre-rendered images. To match that, generate the images below (Midjourney, ChatGPT/DALL·E, Grok Imagine, Adobe Firefly, or a 3D artist) and drop them in the folders shown. The animations stay the same; only the artwork is swapped.

**General rules for every image**
- Photoreal, natural daylight, high detail, **no text, no logos** (AI garbles them). Panyam branding (logo, "PANYAM CEMENT", tagline) is added by code on top, so it stays pixel-perfect.
- Generate on a **plain pure-white (#FFFFFF) background** wherever "cut-out" is noted. Background removal is done on our side.
- Highest resolution available. Upscale to at least 4K if the tool allows.

## 1. Delivery truck (Truck journey scene) — **most important**

| | |
|---|---|
| File | `public/images/3d/truck-side.png` |
| Shot | Exact **side profile**, facing right, camera at wheel height, orthographic feel (no perspective). Full truck in frame with margin. |
| Prompt | *"Photorealistic side profile of an Indian 12-wheeler cement delivery truck, facing right, Tata Signa style cab painted emerald green (#00A85A), long flat-sided cargo body painted bright lemon yellow (#FFF315) with a green lower band, plain panels with no text or logos, chrome fuel tank, black tyres with silver rims, clean studio shot on pure white background, soft ground shadow, ultra detailed, 8k product render"* |
| Also generate | `truck-wheel.png`: *"single truck wheel with black tyre and silver steel rim, perfectly front-on, centred, pure white background, photorealistic"*. Used for the rotating wheels. |

## 2. Landscape layers (Truck journey parallax)

All ultra-wide **21:9 or wider**, same light (golden afternoon), same horizon height (about 60% from top).

| File | Prompt |
|---|---|
| `public/images/3d/layer-hills.png` | *"Ultra-wide panoramic photo of rolling green Nallamala hills in Andhra Pradesh, hazy distance, golden afternoon light, cut-out on pure white sky"* |
| `public/images/3d/layer-plant.png` | *"Photorealistic cement plant with tall preheater tower, silos and conveyor, seen from a distant road, golden hour, cut-out on pure white background, no text"* |
| `public/images/3d/layer-dam.png` | *"Photorealistic large concrete gravity dam with open spillway gates releasing white water, Srisailam style, side view from downstream, cut-out on pure white sky"* |
| `public/images/3d/layer-railway.png` | *"Photorealistic Indian railway viaduct with concrete sleepers and a passing blue passenger train, side view, cut-out on pure white sky"* |
| `public/images/3d/layer-city.png` | *"Photorealistic Indian city skyline under construction with tower cranes, side view, dusk lights in windows, cut-out on pure white sky"* |
| `public/images/3d/road.jpg` | *"Seamless tileable side-view strip of an Indian two-lane asphalt highway with white lane markings and grass verge, photorealistic, 8:1 aspect"* |

## 3. Packing plant (High-quality production scene)

| File | Prompt |
|---|---|
| `public/images/3d/packer.png` | *"Photorealistic industrial cement bag packing machine, front view: stainless steel hopper on top, rotary filling spout at the bottom, green painted steel frame with four legs, clean factory, pure white background, no text, 8k render"* |
| `public/images/3d/packing-hall.jpg` | *"Photorealistic interior of a clean modern cement packing plant, steel structures, silos and ducts, soft daylight, shallow depth of field, wide 21:9, no people, no text"* (blurred background) |
| `public/images/3d/conveyor.png` | *"Photorealistic side view of a straight industrial rubber conveyor belt on steel rollers and legs, tileable, pure white background"* |

The bags already use the real product photos.

## 4. Dam scene (Built into the landmarks)

| File | Use |
|---|---|
| `public/images/3d/dam-hero.jpg` | Real photo of Srisailam / Nagarjuna Sagar **with a usage licence**, or an AI image like layer-dam above. The line-drawing → painted reveal will use it. |

## 5. Real photography (best of all)

Real drone and ground photos of the actual plant, packing plant, trucks and laboratory beat any AI image for a listed company. See `04-asset-requirements-and-mapping.md`, Priority 1.

## What happens once the files arrive

1. Background removal and optimisation (WebP/AVIF), wheel cut-outs, and colour matching across layers.
2. The `PanyamTruck`, `Landscape`, `PackerMachine` and dam illustrations are replaced by the images. The branding overlay (logo, name, tagline on the truck body) is composited in code so it stays sharp.
3. All existing scroll choreography (parallax, wheel rotation, bag filling, painted reveal) carries over unchanged.
