import type { Metadata } from "next";
import { company } from "@/data/company";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.panyamcements.in").replace(/\/$/, "");

export function pageMetadata({
  title,
  description,
  path,
  image = "/images/web/factory-aerial-dusk-md.webp",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${company.shortName}`,
      description,
      url: path,
      siteName: company.shortName,
      images: [{ url: image }],
      locale: "en_IN",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: `${title} | ${company.shortName}`, description, images: [image] },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.legalName,
  alternateName: company.shortName,
  url: siteUrl,
  logo: `${siteUrl}/images/web/panyam-logo.webp`,
  foundingDate: "1955-06-23",
  slogan: company.tagline,
  parentOrganization: { "@type": "Organization", name: company.parentGroup },
  address: {
    "@type": "PostalAddress",
    streetAddress: "H.No. 1-65, 1st Floor, Plot No. 539, Road No. 11, Kakateeya Hills, Madhapur",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500081",
    addressCountry: "IN",
  },
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+91-40-49544944", contactType: "sales", email: company.salesEmail, areaServed: "IN" },
  ],
  areaServed: company.presence,
};
