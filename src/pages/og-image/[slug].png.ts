import type { APIContext, GetStaticPathsResult } from "astro";
import { getCollection, getEntryBySlug } from "astro:content";
import satori, { SatoriOptions } from "satori";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";
import siteConfig from "@/site-config";
import { getFormattedDate } from "@/utils";

const monoFontReg = await fetch(
  "https://api.fontsource.org/v1/fonts/roboto-mono/latin-400-normal.ttf"
);

const monoFontBold = await fetch(
  "https://api.fontsource.org/v1/fonts/roboto-mono/latin-700-normal.ttf"
);

const ogOptions: SatoriOptions = {
  width: 1200,
  height: 630,
  // debug: true,
  embedFont: true,
  fonts: [
    {
      name: "Roboto Mono",
      data: await monoFontReg.arrayBuffer(),
      weight: 400,
      style: "normal",
    },
    {
      name: "Roboto Mono",
      data: await monoFontBold.arrayBuffer(),
      weight: 700,
      style: "normal",
    },
  ],
};

const markup = (title: string, pubDate: string) => html`<div
	tw="flex flex-col w-full h-full bg-[#2e3440] text-[#edeff3]"
>
	<div tw="flex flex-col flex-1 w-full p-10 justify-center">
		<p tw="text-2xl mb-6">${pubDate}</p>
		<h1 tw="text-6xl font-bold leading-snug text-white">${title}</h1>
	</div>
	<div tw="flex items-center justify-between w-full p-10 border-t border-[#a3be8c] text-xl">
		<div tw="flex items-center">
			<svg height="60" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
<path d="M20.1465 448.094H479L350.926 226.37L311.281 258.273L275.108 232.751L249.573 258.273L215.528 232.751L193.185 258.273L151.291 221.053L20.1465 448.094Z" fill="#88C0D0"/>
<path d="M249.573 50.9053L151.291 221.053L193.185 258.273L215.528 232.751L249.573 258.273L275.108 232.751L311.281 258.273L350.926 226.37L249.573 50.9053Z" fill="#EDEFF3"/>
<path d="M151.291 221.053L20.1465 448.094H479L350.926 226.37M151.291 221.053L249.573 50.9053L350.926 226.37M151.291 221.053L193.185 258.273L215.528 232.751L249.573 258.273L275.108 232.751L311.281 258.273L350.926 226.37" stroke="black" stroke-width="7"/>
<line x1="265.341" y1="167.541" x2="294.587" y2="218.169" stroke="black" stroke-width="5"/>
			</svg>
			<p tw="ml-3 font-semibold text-3xl">${siteConfig.title}</p>
		</div>
	</div>
</div>`;

export async function get({ params: { slug } }: APIContext) {
  const post = await getEntryBySlug("post", slug!);
  const title = post?.data.title ?? siteConfig.title;
  const postDate = getFormattedDate(post?.data.publishDate ?? Date.now(), {
    weekday: "long",
  });
  const svg = await satori(markup(title, postDate), ogOptions);
  const png = new Resvg(svg).render().asPng();
  return {
    body: png,
    encoding: "binary",
  };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const posts = await getCollection("post");
  return posts.filter(({ data }) => !data.ogImage).map(({ slug }) => ({ params: { slug } }));
}
