import { defineConfig, passthroughImageService } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import clerk from "@clerk/astro";
import { dark } from "@clerk/themes";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://stevedylan.dev",
  outDir: "dist",
  image: {
    service: passthroughImageService(),
  },
  markdown: {
    shikiConfig: {
      theme: "vesper",
      wrap: false,
    },
  },
  prefetch: true,
  integrations: [
    clerk({
      appearance: {
        baseTheme: dark,
        layout: {
          animations: false,
        },
      },
    }),
    mdx({}),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    sitemap(),
    react(),
  ],
  vite: {
    ssr: {
      external: ["node:async_hooks"],
    },
    define: {
      "process.env": process.env,
    },
  },
  output: "static",
});
