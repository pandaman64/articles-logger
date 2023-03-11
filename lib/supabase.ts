import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "./database";

export const supabaseClient = createBrowserSupabaseClient<Database>();
