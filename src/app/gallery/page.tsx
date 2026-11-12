import { PageHero } from "@/components/layout/PageHero";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { getGallery } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata = pageMetadata({
  title: "Gallery",
  description: "Photographs and films of the Panyam Cement plant at Cement Nagar, our products and our brand.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const items = await getGallery();
  return (
    <>
      <PageHero eyebrow="Gallery" title="The plant, the products, the brand." italic={["brand."]} crumbs={[{ label: "Gallery" }]} />
      <section className="pb-24 lg:pb-32">
        <div className="container-x">
          <GalleryGrid items={items} />
        </div>
      </section>
    </>
  );
}
