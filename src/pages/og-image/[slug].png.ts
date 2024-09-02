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

const markup = (title: string, pubDate: string, description: string) => html`<div
	tw="flex flex-col w-full h-full bg-[#000000] text-[#ffffff]"
>
	<div tw="flex flex-col flex-1 w-full p-10 justify-center">
		<p tw="text-2xl mb-6">${pubDate}</p>
		<h1 tw="text-6xl font-bold leading-snug text-white">${title}</h1>
		<h2 tw="text-2xl font-bold leading-snug text-white">${description}</h2>
	</div>
	<div tw="flex items-center justify-between w-full p-10 border-t border-[#ffffff] text-xl">
		<div tw="flex items-center">
			<svg height="60" viewBox="0 0 467 433" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M146.75 29L233.917 203.333L342.875 94.375L451.833 421.25H16L146.75 29Z"
					stroke="#ffffff"
					stroke-width="21.7917"
				/>
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
  const description = post?.data.description ?? siteConfig.title;
  const svg = await satori(markup(title, postDate, description), ogOptions);
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
