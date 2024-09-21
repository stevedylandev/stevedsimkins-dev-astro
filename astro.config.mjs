import { defineConfig, passthroughImageService } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import clerk from "@clerk/astro";

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
		clerk(),
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
	output: "hybrid",
	adapter: cloudflare(),
});
