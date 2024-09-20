import { supabase } from "src/lib/supabase";

export function SignInButton() {
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
