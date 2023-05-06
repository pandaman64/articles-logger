import { Database } from "@/lib/database";
import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import IndexPagePresentation from "./IndexPagePresentation";

export const revalidate = 0;

export default async function Page() {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });

  const { data } = await supabase.from("articles").select();

  return <IndexPagePresentation articles={data} />;
}
