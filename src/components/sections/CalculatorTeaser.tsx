import { CementCalculator } from "@/components/calculator/CementCalculator";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { LineMixer } from "@/components/sections/LineMixer";

export function CalculatorTeaser() {
  return (
    <section aria-labelledby="calc-title" className="bg-brand-mint py-24 lg:py-32">
      <div className="container-x">
        <div className="mb-12 grid items-end gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4 text-brand-deep">Plan your build</p>
            <RevealText as="h2" text="How many bags do you need?" italic={["need?"]} className="display-lg" />
            <p className="mt-5 text-lg text-slate">A quick estimate for concrete, plastering or brickwork — then request a quote in one tap.</p>
          </div>
          <LineMixer className="w-full max-w-xl justify-self-end" />
        </div>
        <Reveal>
          <CementCalculator compact />
        </Reveal>
      </div>
    </section>
  );
}
