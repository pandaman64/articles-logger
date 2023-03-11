import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "./database";

export const supabase = createBrowserSupabaseClient<Database>();

export type Article = Database["public"]["Tables"]["articles"]["Row"];
