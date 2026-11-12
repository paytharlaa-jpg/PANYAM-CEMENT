// Sanity Studio schema definitions for the Panyam Cement website.
// Copy into your Studio project and add to `schema.types` in sanity.config.ts.
// (Plain objects — no imports needed; works with `defineType` too.)

export const post = {
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (r: { required: () => unknown }) => r.required() },
    { name: "slug", title: "URL slug", type: "slug", options: { source: "title", maxLength: 80 } },
    { name: "excerpt", title: "Short summary", type: "text", rows: 3 },
    { name: "publishedAt", title: "Publish date", type: "date" },
    { name: "category", title: "Category", type: "string", options: { list: ["News", "Building Guide", "Tools", "Events"] } },
    { name: "cover", title: "Cover image", type: "image", options: { hotspot: true } },
    { name: "body", title: "Article", type: "array", of: [{ type: "block", styles: [{ title: "Normal", value: "normal" }, { title: "Heading", value: "h2" }] }] },
  ],
  orderings: [{ title: "Newest", name: "dateDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
};

export const galleryItem = {
  name: "galleryItem",
  title: "Gallery item",
  type: "document",
  fields: [
    { name: "title", title: "Description (used as alt text)", type: "string", validation: (r: { required: () => unknown }) => r.required() },
    { name: "category", title: "Category", type: "string", options: { list: ["Plant", "Products", "Brand"] } },
    { name: "image", title: "Image (or video poster)", type: "image" },
    { name: "video", title: "Video (MP4, optional)", type: "file", options: { accept: "video/mp4" } },
    { name: "order", title: "Sort order", type: "number" },
  ],
};

export const schemaTypes = [post, galleryItem];
