import { PageHero } from "@/components/layout/PageHero";
import { CementCalculator } from "@/components/calculator/CementCalculator";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cement Calculator",
  description: "Estimate how many bags of cement you need for concrete, plastering and brickwork — then request a quote from Panyam Cement.",
  path: "/calculator",
});

export default function CalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Tools"
        title="Cement calculator."
        italic={["calculator."]}
        intro="Estimate cement, sand and aggregate for concrete, plastering and brickwork. Switch between metres and feet."
        crumbs={[{ label: "Products", href: "/products" }, { label: "Calculator" }]}
      />
      <section className="pb-24 lg:pb-32">
        <div className="container-x"><CementCalculator /></div>
      </section>
    </>
  );
}
