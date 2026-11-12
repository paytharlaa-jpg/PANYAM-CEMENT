import { PageHero } from "@/components/layout/PageHero";
import { InvestorDocs } from "@/components/sections/InvestorDocs";
import { investorDocs } from "@/data/investor-docs";
import { board, company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Investors",
  description: "Annual reports, financial results, shareholding pattern, corporate governance reports, notices and policies of Panyam Cements & Mineral Industries Ltd.",
  path: "/investors",
});

export default function InvestorsPage() {
  const policies = investorDocs.filter((d) => d.category === "policies");
  return (
    <>
      <PageHero
        eyebrow={`Investors · CIN ${company.cin}`}
        title="Investor information."
        italic={["information."]}
        intro="Panyam Cements & Mineral Industries Limited is dedicated to enhancing shareholder value. Access statutory disclosures, financial results and corporate information below."
        crumbs={[{ label: "Investors" }]}
      />

      <section className="pb-20">
        <div className="container-x">
          <InvestorDocs docs={investorDocs} />
        </div>
      </section>

      <section id="board" className="scroll-mt-24 bg-white py-20">
        <div className="container-x">
          <h2 className="display-md mb-8">Board of Directors</h2>
          <div className="overflow-x-auto rounded-3xl border border-stone" tabIndex={0} role="region" aria-label="Board of Directors">
            <table className="w-full min-w-[520px] text-left">
              <thead className="bg-brand-night text-white">
                <tr><th scope="col" className="px-5 py-4">Director</th><th scope="col" className="px-5 py-4">DIN</th><th scope="col" className="px-5 py-4">Designation</th></tr>
              </thead>
              <tbody className="divide-y divide-stone">
                {board.map((b) => (
                  <tr key={b.din}><th scope="row" className="px-5 py-4 font-semibold">{b.name}</th><td className="px-5 py-4 tabular-nums text-slate">{b.din}</td><td className="px-5 py-4 text-slate">{b.role}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="policies" className="scroll-mt-24 py-20">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="display-md mb-6">Policies &amp; codes</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {policies.map((p) => (
                <li key={p.path}><a href={encodeURI(p.path)} target="_blank" rel="noopener" className="link-underline font-semibold text-brand-deep">{p.title}</a></li>
              ))}
            </ul>
          </div>
          <div className="grid gap-6">
            <div className="rounded-3xl bg-white p-8">
              <h2 className="font-display text-2xl font-bold">Investor grievances</h2>
              <p className="mt-3 text-slate">{company.investorContact.name}, {company.investorContact.role}</p>
              <p className="mt-1"><a href={`mailto:${company.investorContact.email}`} className="font-semibold text-brand-deep underline">{company.investorContact.email}</a> · {company.investorContact.phone}</p>
            </div>
            <div className="rounded-3xl bg-white p-8">
              <h2 className="font-display text-2xl font-bold">Registrar &amp; share transfer agent</h2>
              <p className="mt-3 font-semibold">{company.registrar.name}</p>
              <p className="text-slate">{company.registrar.lines.join(", ")}</p>
              <p className="mt-2 text-slate">{company.registrar.contact} · {company.registrar.phone}</p>
              <p className="mt-1"><a href={`mailto:${company.registrar.email}`} className="font-semibold text-brand-deep underline">{company.registrar.email}</a> · <a href={company.registrar.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-deep underline">xlsoftech.com</a></p>
            </div>
          </div>
        </div>
      </section>

      <section id="cirp" className="scroll-mt-24 bg-brand-mint py-16">
        <div className="container-x max-w-3xl">
          <h2 className="font-display text-2xl font-bold">Corporate Insolvency Resolution Process (CIRP)</h2>
          <p className="mt-3 text-slate">
            The company went through the CIRP under the Insolvency and Bankruptcy Code, 2016. The resolution plan was approved by the Hon’ble NCLT on June 25, 2021. All CIRP documents are listed under “CIRP Documents” above.
          </p>
        </div>
      </section>
    </>
  );
}
