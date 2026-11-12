import type { Product } from "@/data/products";

export function SpecTable({ product }: { product: Product }) {
  if (!product.specs) return null;
  return (
    <div className="overflow-x-auto rounded-3xl border border-stone bg-white" tabIndex={0} role="region" aria-label={`${product.name} technical specifications`}>
      <table className="w-full min-w-[560px] text-left text-sm sm:text-base">
        <caption className="sr-only">{product.name} — test values versus {product.standard} requirements</caption>
        <thead className="bg-brand-night text-white">
          <tr>
            <th scope="col" className="px-5 py-4 font-bold">Parameter</th>
            <th scope="col" className="px-5 py-4 font-bold">Unit</th>
            <th scope="col" className="px-5 py-4 font-bold">As per {product.standard}</th>
            <th scope="col" className="px-5 py-4 font-bold text-sun">{product.name}</th>
            <th scope="col" className="hidden px-5 py-4 font-bold md:table-cell">Benefit</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone">
          {product.specs.map((s) => (
            <tr key={s.parameter} className="transition-colors hover:bg-brand-mint/50">
              <th scope="row" className="px-5 py-4 font-semibold">{s.parameter}</th>
              <td className="px-5 py-4 text-slate">{s.unit}</td>
              <td className="px-5 py-4 text-slate">{s.standard}</td>
              <td className="px-5 py-4 font-display text-xl font-extrabold text-brand-deep">{s.panyam}</td>
              <td className="hidden px-5 py-4 text-slate md:table-cell">{s.benefit ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
