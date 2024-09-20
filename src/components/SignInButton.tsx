import { createClient } from "@supabase/supabase-js";

export function SignInButton({ supabaseUrl, supabaseAnonKey }) {
	const supabase = createClient(supabaseUrl, supabaseAnonKey);

	async function signInWithGithub() {
		await supabase.auth.signInWithOAuth({
			provider: "github",
			options: {
				redirectTo: "https://stevedylan.dev/auth/callback",
			},
		});
	}

	return (
		<button type="button" onClick={signInWithGithub}>
			Sign In
		</button>
	);
}
