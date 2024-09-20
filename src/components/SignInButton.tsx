import { supabase } from "src/lib/supabase";

export function SignInButton() {
	async function signInWithGithub() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "github",
		});
		if (error) {
			alert(error);
		}
		console.log(data);
	}

	return (
		<button type="button" onClick={signInWithGithub}>
			Sign In
		</button>
	);
}
