import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
	"https://rbhamoqatlwbdxlydlcw.supabase.com",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJiaGFtb3FhdGx3YmR4bHlkbGN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3MzkwNDEsImV4cCI6MjA0MjMxNTA0MX0.prA8jmaA5d-mK-LVyBWCvsWb6g2kV6yHQFoLYxRNgW8",
);
