import { defineConfig, passthroughImageService } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

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
			theme: "css-variables",
			wrap: true,
		},
	},
	prefetch: true,
	integrations: [
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
		define: {
			"process.env.NODE_ENV": `'${process.env.NODE_ENV}'`,
		},
	},
	output: "hybrid",
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
});
