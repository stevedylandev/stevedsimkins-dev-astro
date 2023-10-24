import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import gruvboxMaterial from "./gruvbox-material.json";

// https://astro.build/config

// https://astro.build/config
import vercel from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  site: "https://stevedylan.dev",
  markdown: {
    shikiConfig: {
      theme: 'poimandres',
      wrap: true
    }
  },
  integrations: [mdx({}), tailwind({
    config: {
      applyBaseStyles: false
    }
  }), image({
    serviceEntryPoint: "@astrojs/image/sharp"
  }), sitemap(), prefetch()],
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"]
    },
    define: {
      'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
    },
  },
  output: "static",
  adapter: vercel({
    analytics: true
  }),
  experimental: {
    viewTransitions: true,
  },
});
