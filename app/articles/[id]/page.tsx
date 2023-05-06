import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import ArticlePagePresentation from "./ArticlePagePresentation";
import { Database } from "@/lib/database";

// do not cache this page
export const revalidate = 0;

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });

  const { data: article, error } = await supabase
    .from("articles")
    .select()
    .eq("id", new Number(id))
    .single();

  if (error) {
    console.error(error);
    return <>error: {error.message}</>;
  }

  return <ArticlePagePresentation article={article} />;
}
