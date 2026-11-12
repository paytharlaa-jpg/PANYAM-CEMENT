// Plain JS (not .ts) so it loads even when the host cannot run the native SWC compiler.
/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [480, 640, 828, 1080, 1280, 1600, 1920, 2560],
    qualities: [60, 75, 85],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async headers() {
    return [
      {
        source: "/:all*(webp|avif|jpg|png|svg|mp4|webm|woff2)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async redirects() {
    // Keep the old site's URLs working after the domain switches over.
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about-us.html", destination: "/about", permanent: true },
      { source: "/directors.html", destination: "/investors#board", permanent: true },
      { source: "/strengths.html", destination: "/manufacturing", permanent: true },
      { source: "/products.html", destination: "/products", permanent: true },
      { source: "/gallery1.html", destination: "/gallery", permanent: true },
      { source: "/investors.html", destination: "/investors", permanent: true },
      { source: "/codeofconduct.html", destination: "/investors#policies", permanent: true },
      { source: "/corporate.html", destination: "/investors", permanent: true },
      { source: "/careers.html", destination: "/careers", permanent: true },
      { source: "/cirp.html", destination: "/investors#cirp", permanent: true },
      { source: "/marketing.html", destination: "/contact", permanent: true },
      { source: "/Privacy%20Policy%20code.html", destination: "/privacy", permanent: true },
    ];
  },
};

export default nextConfig;
