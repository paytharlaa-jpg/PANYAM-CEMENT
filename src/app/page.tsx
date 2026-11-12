import type { Metadata } from "next";
import { HeroScene } from "@/components/storytelling/HeroScene";
import { SketchToReal } from "@/components/storytelling/SketchToReal";
import { QualityScene } from "@/components/storytelling/QualityScene";
import { PackingLine } from "@/components/storytelling/PackingLine";
import { ProductShowcase } from "@/components/storytelling/ProductShowcase";
import { TruckJourney } from "@/components/storytelling/TruckJourney";
import { MixerScene } from "@/components/storytelling/MixerScene";
import { LegacyScene } from "@/components/storytelling/LegacyScene";
import { FinaleScene } from "@/components/storytelling/FinaleScene";
import { CalculatorTeaser } from "@/components/sections/CalculatorTeaser";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroScene />
      <SketchToReal />
      <QualityScene />
      <PackingLine />
      <ProductShowcase />
      <TruckJourney />
      <MixerScene />
      <LegacyScene />
      <CalculatorTeaser />
      <FinaleScene />
    </>
  );
}
