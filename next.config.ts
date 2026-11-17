import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site 100 % statique (dossier `out/`), hébergé gratuitement sur Cloudflare Pages.
  // La redirection /modeles → /creations est dans public/_redirects (lue par Cloudflare).
  output: "export",
  cacheComponents: true,
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    // 90 = photos du carrousel (rendu net en grand écran), 75 = vignettes
    qualities: [75, 90],
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
