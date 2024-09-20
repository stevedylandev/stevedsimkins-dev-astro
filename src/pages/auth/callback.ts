import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import type { APIRoute } from "astro";
export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get("code");
	const next = requestUrl.searchParams.get("next") || "/";

	if (code) {
		const supabase = createServerClient(
			import.meta.env.PUBLIC_SUPABASE_URL,
			import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
			{
				cookies: {
					getAll() {
						return parseCookieHeader(request.headers.get("Cookie") ?? "");
					},
					setAll(cookiesToSet) {
						cookiesToSet.forEach(({ name, value, options }) =>
							cookies.set(name, value, options),
						);
					},
				},
			},
		);

		const { error } = await supabase.auth.exchangeCodeForSession(code);

		if (!error) {
			return redirect("/log");
		}
	}

	// return the user to an error page with instructions
	return redirect("/auth/auth-code-error");
};
