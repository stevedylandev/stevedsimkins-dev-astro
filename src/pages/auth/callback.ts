import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, redirect }) => {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get("code");
	const next = requestUrl.searchParams.get("next") || "/";

	if (code) {
		const supabase = createServerClient(
			"https://rbhamoqatlwbdxlydlcw.supabase.com",
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJiaGFtb3FhdGx3YmR4bHlkbGN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3MzkwNDEsImV4cCI6MjA0MjMxNTA0MX0.prA8jmaA5d-mK-LVyBWCvsWb6g2kV6yHQFoLYxRNgW8",
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
