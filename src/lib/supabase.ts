import { createClient } from "@supabase/supabase-js";
const { env } = Astro.locals.runtime;

export const supabase = createClient(
	env.PUBLIC_SUPABASE_URL,
	env.PUBLIC_SUPABASE_ANON_KEY,
);
