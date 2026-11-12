"use client";
import { useMemo, useState } from "react";
import { FileText, Search } from "lucide-react";
import type { InvestorCategory, InvestorDoc } from "@/data/investor-docs";

export const categoryLabels: Record<InvestorCategory, string> = {
  "annual-reports": "Annual Reports",
  results: "Financial Results",
  shareholding: "Shareholding Pattern",
  governance: "Corporate Governance & Compliance",
  meetings: "Board, AGM & EGM",
  publications: "Newspaper Publications",
  policies: "Policies & Codes",
  "investor-services": "Investor Services",
  cirp: "CIRP Documents",
};

const origin = process.env.NEXT_PUBLIC_DOCS_ORIGIN ?? "";
const href = (path: string) => origin + encodeURI(path);

export function InvestorDocs({ docs }: { docs: InvestorDoc[] }) {
  const [cat, setCat] = useState<InvestorCategory>("annual-reports");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => docs.reduce<Record<string, number>>((m, d) => ((m[d.category] = (m[d.category] ?? 0) + 1), m), {}), [docs]);
  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return docs.filter((d) => (q ? d.title.toLowerCase().includes(q) : d.category === cat));
  }, [docs, cat, query]);

  return (
    <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
      <div className="min-w-0">
        <label htmlFor="doc-search" className="sr-only">Search all documents</label>
        <div className="relative mb-4">
          <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
          <input id="doc-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search all documents" className="field pl-11" />
        </div>
        <div role="tablist" aria-orientation="vertical" aria-label="Document categories" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
          {(Object.keys(categoryLabels) as InvestorCategory[]).filter((c) => counts[c]).map((c) => (
            <button
              key={c}
              id={`tab-${c}`}
              role="tab"
              aria-selected={!query && cat === c}
              aria-controls="doc-panel"
              onClick={() => { setCat(c); setQuery(""); }}
              className={`flex min-h-11 shrink-0 items-center justify-between gap-3 rounded-xl px-4 text-left text-sm font-bold transition-colors ${!query && cat === c ? "bg-brand-night text-white" : "bg-white hover:bg-brand-mint"}`}
            >
              {categoryLabels[c]} <span className="text-xs opacity-60">{counts[c]}</span>
            </button>
          ))}
        </div>
      </div>
      <div id="doc-panel" className="min-w-0" role="tabpanel" aria-labelledby={query ? undefined : `tab-${cat}`} aria-label={query ? `Search results for ${query}` : undefined}>
        <p className="mb-4 text-sm text-slate" aria-live="polite">{list.length} document{list.length === 1 ? "" : "s"}{query ? ` matching “${query}”` : ""}</p>
        <ul className="divide-y divide-stone overflow-hidden rounded-3xl bg-white">
          {list.map((d) => (
            <li key={d.path}>
              <a href={href(d.path)} target="_blank" rel="noopener" className="group flex min-h-14 items-center gap-4 px-5 py-3 transition-colors hover:bg-brand-mint/60">
                <FileText aria-hidden className="h-5 w-5 shrink-0 text-brand" />
                <span className="flex-1 font-semibold">{d.title}</span>
                <span className="text-xs font-bold uppercase text-slate group-hover:text-brand-deep">PDF<span className="sr-only"> (opens in new tab)</span></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
