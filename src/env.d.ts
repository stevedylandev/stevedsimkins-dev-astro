/// <reference path="../.astro/types.d.ts" />
// <reference path="../.astro/types.d.ts" />
/// <reference types="@astrojs/image/client" />

type Runtime = import("@astrojs/cloudflare").Runtime<ENV>;
declare namespace App {
	interface Locals extends Runtime {}
}
