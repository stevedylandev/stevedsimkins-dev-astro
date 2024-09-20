/// <reference path="../.astro/types.d.ts" />
// <reference path="../.astro/types.d.ts" />
/// <reference types="@astrojs/image/client" />

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
	interface Locals extends Runtime {
		cfVar: string;
	}
}
