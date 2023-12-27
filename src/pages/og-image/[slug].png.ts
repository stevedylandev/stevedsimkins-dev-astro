import type { APIContext, GetStaticPathsResult } from "astro";
import { getCollection, getEntryBySlug } from "astro:content";
import satori, { SatoriOptions } from "satori";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";
import siteConfig from "@/site-config";
import { getFormattedDate } from "@/utils";
import fs from "fs";
import commitMono400 from "/CommitMono-400-Regular.otf"
import commitMono700 from "/CommitMono-700-Regular.otf"

const monoFontReg = await fs.readFileSync(commitMono400)

const monoFontBold = await fs.readFileSync(commitMono700)

const ogOptions: SatoriOptions = {
  width: 1200,
  height: 630,
  // debug: true,
  embedFont: true,
  fonts: [
    {
      name: "Roboto Mono",
      data: await monoFontReg,
      weight: 400,
      style: "normal",
    },
    {
      name: "Roboto Mono",
      data: await monoFontBold,
      weight: 700,
      style: "normal",
    },
  ],
};

const markup = (title: string, pubDate: string, description: string) => html`<div
	tw="flex flex-col w-full h-full bg-[#191724] text-[#e0def4]"
>
	<div tw="flex flex-col flex-1 w-full p-10 justify-center">
		<p tw="text-2xl mb-6">${pubDate}</p>
		<h1 tw="text-6xl font-bold leading-snug text-white">${title}</h1>
		<h2 tw="text-2xl font-bold leading-snug text-white">${description}</h2>
	</div>
	<div tw="flex items-center justify-between w-full p-10 border-t border-[#7c6f64] text-xl">
		<div tw="flex items-center">

<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5" height="60">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
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
