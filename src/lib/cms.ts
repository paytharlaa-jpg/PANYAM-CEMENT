// Content layer. Reads from Sanity when NEXT_PUBLIC_SANITY_PROJECT_ID is set,
// otherwise falls back to the local starter content in src/data.
// Uses Sanity's HTTP query API directly — no extra client dependency.
import { posts as localPosts, type Post } from "@/data/posts";
import { gallery as localGallery, type GalleryItem } from "@/data/gallery";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2025-10-01";

export const cmsEnabled = Boolean(projectId);

async function sanityQuery<T>(query: string, params: Record<string, string> = {}): Promise<T | null> {
  if (!projectId) return null;
  const url = new URL(`https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}`);
  url.searchParams.set("query", query);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(`$${k}`, JSON.stringify(v));
  try {
    const res = await fetch(url, { next: { revalidate: 300, tags: ["sanity"] } });
    if (!res.ok) return null;
    const json = (await res.json()) as { result: T };
    return json.result;
  } catch {
    return null;
  }
}

interface SanityBlock { _type: string; style?: string; listItem?: string; children?: { text: string }[] }
interface SanityPost {
  slug: string; title: string; excerpt: string; date: string; category?: string;
  cover?: string; body?: SanityBlock[];
}

function blocksToBody(blocks: SanityBlock[] = []): Post["body"] {
  const body: Post["body"] = [];
  for (const b of blocks) {
    const text = (b.children ?? []).map((c) => c.text).join("");
    if (b.listItem) {
      const last = body[body.length - 1];
      if (last?.type === "ul") last.items!.push(text);
      else body.push({ type: "ul", items: [text] });
    } else if (b.style === "h2" || b.style === "h3") body.push({ type: "h2", text });
    else body.push({ type: "p", text });
  }
  return body;
}

function toPost(p: SanityPost): Post {
  const body = blocksToBody(p.body);
  const words = body.reduce((n, b) => n + (b.text ?? b.items?.join(" ") ?? "").split(/\s+/).length, 0);
  return {
    slug: p.slug, title: p.title, excerpt: p.excerpt, date: p.date, category: p.category ?? "News",
    cover: p.cover ?? "/images/web/factory-aerial-dusk-md.webp", readMinutes: Math.max(1, Math.round(words / 220)), body,
  };
}

const POST_FIELDS = `"slug": slug.current, title, excerpt, "date": publishedAt, category, "cover": cover.asset->url, body`;

export async function getPosts(): Promise<Post[]> {
  const data = await sanityQuery<SanityPost[]>(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc){${POST_FIELDS}}`);
  if (data && data.length) return data.map(toPost);
  return [...localPosts].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const data = await sanityQuery<SanityPost | null>(`*[_type == "post" && slug.current == $slug][0]{${POST_FIELDS}}`, { slug });
  if (data) return toPost(data);
  return localPosts.find((p) => p.slug === slug);
}

interface SanityGalleryItem {
  _id: string; title: string; category?: GalleryItem["category"];
  image?: { url: string; width: number; height: number };
  videoUrl?: string;
}

export async function getGallery(): Promise<GalleryItem[]> {
  const data = await sanityQuery<SanityGalleryItem[]>(
    `*[_type == "galleryItem"] | order(order asc){_id, title, category, "image": image.asset->{url, "width": metadata.dimensions.width, "height": metadata.dimensions.height}, "videoUrl": video.asset->url}`,
  );
  if (data && data.length) {
    return data
      .filter((d) => d.image || d.videoUrl)
      .map((d) => ({
        id: d._id,
        kind: d.videoUrl ? "video" : "image",
        src: d.videoUrl ?? d.image!.url,
        poster: d.videoUrl ? d.image?.url : undefined,
        width: d.image?.width ?? 1600,
        height: d.image?.height ?? 900,
        alt: d.title,
        category: d.category ?? "Plant",
      }));
  }
  return localGallery;
}
