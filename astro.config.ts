import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	site: "https://stevedylan.dev",
	outDir: "dist",
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
	],
	vite: {
		define: {
			"process.env.NODE_ENV": `'${process.env.NODE_ENV}'`,
		},
	},
	output: "hybrid",
	adapter: cloudflare({
		imageService: "cloudflare",
	}),
});
