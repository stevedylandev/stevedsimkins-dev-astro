import { createClient } from "@supabase/supabase-js";
import { getRuntime } from "@astrojs/cloudflare/runtime";

const { env } = getRuntime();

export const supabase = createClient(
	env.PUBLIC_SUPABASE_URL,
	env.PUBLIC_SUPABASE_ANON_KEY,
);
