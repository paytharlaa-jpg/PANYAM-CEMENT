"use client";
import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { ArrowUpRight, Calculator } from "lucide-react";
import {
  concreteMixes, mortarMixes, estimateConcrete, estimatePlaster, estimateBrickwork, M_PER_FT, type Work,
} from "@/lib/calculator";
import { getProduct } from "@/data/products";

type Unit = "m" | "ft";

const works: { id: Work; label: string; hint: string }[] = [
  { id: "concrete", label: "Concrete", hint: "Slabs, beams, footings" },
  { id: "plaster", label: "Plastering", hint: "Walls and ceilings" },
  { id: "brickwork", label: "Brickwork", hint: "Masonry walls" },
];

function NumberField({ label, value, onChange, suffix, min = 0, step = "any" }: {
  label: string; value: string; onChange: (v: string) => void; suffix: string; min?: number; step?: string;
}) {
  const id = useId();
  const invalid = value !== "" && (Number.isNaN(Number(value)) || Number(value) < min);
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-bold">{label}</label>
      <div className="relative">
        <input
          id={id}
          inputMode="decimal"
          type="number"
          min={min}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={invalid}
          className="field pr-14"
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate">{suffix}</span>
      </div>
    </div>
  );
}

export function CementCalculator({ compact = false }: { compact?: boolean }) {
  const [work, setWork] = useState<Work>("concrete");
  const [unit, setUnit] = useState<Unit>("m");
  const [a, setA] = useState("5");
  const [b, setB] = useState("4");
  const [c, setC] = useState("0.15");
  const [mix, setMix] = useState<keyof typeof concreteMixes>("M20");
  const [mortar, setMortar] = useState<keyof typeof mortarMixes>("1:4");
  const [thickness, setThickness] = useState("12");

  const f = unit === "ft" ? M_PER_FT : 1;
  const len = unit === "m" ? "m" : "ft";

  const result = useMemo(() => {
    const A = Number(a) * f, B = Number(b) * f, C = Number(c) * f;
    if (![A, B].every((n) => n > 0)) return null;
    if (work === "concrete") return C > 0 ? estimateConcrete(A, B, C, mix) : null;
    if (work === "plaster") return Number(thickness) > 0 ? estimatePlaster(A * B, Number(thickness), mortar) : null;
    return C > 0 ? estimateBrickwork(A, B, C, mortar) : null;
  }, [a, b, c, f, work, mix, mortar, thickness]);

  const product = result ? getProduct(result.recommended) : undefined;
  const sandUnit = unit === "m" ? "m³" : "cft";
  const vol = (m3: number) => (unit === "m" ? m3.toFixed(2) : (m3 * 35.3147).toFixed(1));

  const switchWork = (w: Work) => {
    setWork(w);
    if (w === "concrete") { setA("5"); setB("4"); setC(unit === "m" ? "0.15" : "0.5"); }
    if (w === "plaster") { setA("10"); setB("3"); }
    if (w === "brickwork") { setA("10"); setB("3"); setC(unit === "m" ? "0.23" : "0.75"); }
  };

  return (
    <div className={`grid overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_80px_-40px_rgb(6_38_26/0.35)] ${compact ? "lg:grid-cols-[1.2fr_1fr]" : "lg:grid-cols-[1.3fr_1fr]"}`}>
      <form className="p-6 sm:p-10" onSubmit={(e) => e.preventDefault()} aria-label="Cement quantity calculator">
        <fieldset>
          <legend className="mb-3 text-sm font-bold">Type of work</legend>
          <div className="grid grid-cols-3 gap-2" role="radiogroup">
            {works.map((w) => (
              <button
                key={w.id}
                type="button"
                role="radio"
                aria-checked={work === w.id}
                onClick={() => switchWork(w.id)}
                className={`min-h-14 rounded-xl border-2 px-2 py-2 text-left transition-colors ${work === w.id ? "border-brand bg-brand-mint" : "border-stone hover:border-brand/50"}`}
              >
                <span className="block text-sm font-bold sm:text-base">{w.label}</span>
                <span className="hidden text-xs text-slate sm:block">{w.hint}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-6 flex items-center gap-2" role="radiogroup" aria-label="Units">
          {(["m", "ft"] as Unit[]).map((u) => (
            <button key={u} type="button" role="radio" aria-checked={unit === u} onClick={() => setUnit(u)}
              className={`min-h-11 rounded-full px-4 text-sm font-bold ${unit === u ? "bg-charcoal text-white" : "bg-paper text-charcoal"}`}>
              {u === "m" ? "Metres" : "Feet"}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <NumberField label="Length" value={a} onChange={setA} suffix={len} />
          <NumberField label={work === "concrete" ? "Width" : "Height"} value={b} onChange={setB} suffix={len} />
          {work === "plaster" ? (
            <div>
              <label htmlFor="thk" className="mb-2 block text-sm font-bold">Thickness</label>
              <select id="thk" className="field" value={thickness} onChange={(e) => setThickness(e.target.value)}>
                <option value="6">6 mm (ceiling)</option>
                <option value="12">12 mm (internal)</option>
                <option value="15">15 mm</option>
                <option value="20">20 mm (external)</option>
              </select>
            </div>
          ) : (
            <NumberField label={work === "concrete" ? "Thickness / depth" : "Wall thickness"} value={c} onChange={setC} suffix={len} />
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="mix" className="mb-2 block text-sm font-bold">{work === "concrete" ? "Concrete grade (nominal mix)" : "Mortar ratio (cement : sand)"}</label>
          {work === "concrete" ? (
            <select id="mix" className="field" value={mix} onChange={(e) => setMix(e.target.value as keyof typeof concreteMixes)}>
              {Object.entries(concreteMixes).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          ) : (
            <select id="mix" className="field" value={mortar} onChange={(e) => setMortar(e.target.value as keyof typeof mortarMixes)}>
              {Object.keys(mortarMixes).map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          )}
        </div>
        <p className="mt-6 text-xs text-slate">
          Estimates use standard thumb rules (dry-volume factor 1.54 for concrete, 1.27 for mortar; 50 kg bag = 0.0347 m³). Actual quantities vary with site conditions and wastage — confirm with your engineer.
        </p>
      </form>

      <div className="relative flex flex-col justify-between bg-brand-night p-6 text-white sm:p-10" aria-live="polite">
        <div>
          <p className="eyebrow flex items-center gap-2 text-sun"><Calculator aria-hidden className="h-4 w-4" /> Your estimate</p>
          {result ? (
            <>
              <p className="mt-4 font-display text-7xl font-extrabold leading-none tabular-nums sm:text-8xl">{result.bags}</p>
              <p className="mt-2 text-lg text-white/80">bags of cement (50 kg) · {result.cementKg.toLocaleString("en-IN")} kg</p>
              <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-white/15 pt-6 text-sm">
                <div><dt className="text-white/60">Sand</dt><dd className="text-xl font-bold">{vol(result.sandM3)} {sandUnit}</dd></div>
                {result.aggregateM3 !== undefined && <div><dt className="text-white/60">Aggregate</dt><dd className="text-xl font-bold">{vol(result.aggregateM3)} {sandUnit}</dd></div>}
                {result.bricks !== undefined && <div><dt className="text-white/60">Bricks</dt><dd className="text-xl font-bold">{result.bricks.toLocaleString("en-IN")}</dd></div>}
                <div><dt className="text-white/60">{work === "plaster" ? "Mortar volume" : "Volume"}</dt><dd className="text-xl font-bold">{vol(result.wetVolumeM3)} {sandUnit}</dd></div>
              </dl>
            </>
          ) : (
            <p className="mt-4 text-lg text-white/80">Enter dimensions greater than zero to see an estimate.</p>
          )}
        </div>
        {result && product && (
          <div className="mt-10">
            <p className="text-sm text-white/60">Suggested product</p>
            <Link href={`/products/${product.slug}`} className="link-underline font-display text-2xl font-bold">{product.name} · {product.shortType}</Link>
            <Link
              href={`/contact?type=quote&product=${product.slug}&bags=${result.bags}`}
              className="group mt-6 flex min-h-12 items-center justify-between rounded-full bg-sun px-6 font-bold text-charcoal transition-colors hover:bg-white"
            >
              Request a quote for {result.bags} bags
              <ArrowUpRight aria-hidden className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
