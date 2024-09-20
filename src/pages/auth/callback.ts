import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import type { APIRoute } from "astro";
import { getRuntime } from "@astrojs/cloudflare/runtime";

export const GET: APIRoute = async ({ request, redirect }) => {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get("code");
	const next = requestUrl.searchParams.get("next") || "/";
	const { env } = getRuntime(request);

	if (code) {
		const supabase = createServerClient(
			env.PUBLIC_SUPABASE_URL,
			env.PUBLIC_SUPABASE_ANON_KEY,
			{
				cookies: {
					getAll() {
						return parseCookieHeader(Astro.request.headers.get("Cookie") ?? "");
					},
					setAll(cookiesToSet) {
						cookiesToSet.forEach(({ name, value, options }) =>
							Astro.cookies.set(name, value, options),
						);
					},
				},
			},
		);

		const { error } = await supabase.auth.exchangeCodeForSession(code);

		if (!error) {
			return redirect(next);
		}
	}

	// return the user to an error page with instructions
	return redirect("/auth/auth-code-error");
};
