import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Archivo, Manrope, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Preloader } from "@/components/layout/Preloader";
import { organizationJsonLd, siteUrl } from "@/lib/seo";
import { company } from "@/data/company";
import { MotionNotice } from "@/components/ui/MotionToggle";

const MOTION_SCRIPT = `try{var p=localStorage.getItem("pc-motion");if(p==="off"||(p!=="on"&&matchMedia("(prefers-reduced-motion: reduce)").matches))document.documentElement.classList.add("reduce-motion");if(sessionStorage.getItem("pc-intro")==="1")document.documentElement.classList.add("intro-seen")}catch(e){}`;

// Fonts are downloaded at build time and self-hosted as WOFF2 by next/font.
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap", axes: ["wdth"] });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${company.shortName} — ${company.tagline}`, template: `%s | ${company.shortName}` },
  description:
    "Panyam Cements & Mineral Industries Ltd. — trusted since 1955. OPC 53, OPC 43, PPC and 53-S sleeper grade cement from Cement Nagar, Andhra Pradesh, made with Narji limestone.",
  keywords: ["Panyam Cement", "cement Andhra Pradesh", "OPC 53 grade cement", "PPC cement", "53-S sleeper grade cement", "Kurnool cement", "Nandyal cement", "Rayalaseema cement"],
  applicationName: company.shortName,
  openGraph: {
    type: "website",
    siteName: company.shortName,
    locale: "en_IN",
    images: [{ url: "/images/web/factory-aerial-dusk-md.webp", width: 1280, height: 613, alt: "Panyam Cement plant at dusk" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#06261a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${archivo.variable} ${manrope.variable} ${instrument.variable}`} suppressHydrationWarning>
      <body>
        {/* Apply the motion preference before first paint (OS setting, overridable by the visitor). */}
        <Script id="motion-pref" strategy="beforeInteractive">{MOTION_SCRIPT}</Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <SmoothScroll>
          <Preloader />
          <ScrollProgress />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MotionNotice />
        </SmoothScroll>
      </body>
    </html>
  );
}
