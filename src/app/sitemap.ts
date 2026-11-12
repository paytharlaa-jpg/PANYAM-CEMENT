import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { products } from "@/data/products";
import { getPosts } from "@/lib/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const pages = ["", "/about", "/products", "/manufacturing", "/network", "/gallery", "/blog", "/faq", "/calculator", "/investors", "/careers", "/contact", "/privacy"];
  const posts = await getPosts();
  return [
    ...pages.map((p) => ({ url: `${siteUrl}${p}`, lastModified: now, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...products.map((p) => ({ url: `${siteUrl}/products/${p.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...posts.map((p) => ({ url: `${siteUrl}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
