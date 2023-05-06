import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import LoginPagePresentation from "./LoginPagePresentation";
import { Database } from "@/lib/database";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

// do not cache this page
export const revalidate = 0;

export default async function Page() {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session !== null) {
    redirect("/");
  }

  return <LoginPagePresentation />;
}
