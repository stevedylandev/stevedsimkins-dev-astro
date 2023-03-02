import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import nordTheme from "./nord.json";

// https://astro.build/config
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://stevedsimkins.dev",
  markdown: {
    shikiConfig: {
      theme: nordTheme,
      wrap: true
    }
  },
  integrations: [mdx({}), tailwind({
    config: {
      applyBaseStyles: false
    }
  }), image({
    serviceEntryPoint: "@astrojs/image/sharp"
  }), sitemap(), prefetch(), partytown({
      config: {
        forward: ["dataLayer.push"]
      }
    })],
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"]
    }
  }
});
