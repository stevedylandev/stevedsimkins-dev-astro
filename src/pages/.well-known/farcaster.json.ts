import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
	const config = {
		frame: {
			version: "0.0.1",
			name: "stevedylan.dev",
			iconUrl: "https://stevedylan.dev/512x512.png",
			splashImageUrl: "https://stevedylan.dev/512x512.png",
			splashBackgroundColor: "#000000",
			homeUrl: "https://stevedylan.dev",
		},
	};

	return Response.json(config);
};
