import ArticleCard from "@/components/ArticleCard";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";
import { Box, Stack } from "@mui/joy";
import { useUser } from "@supabase/auth-helpers-react";
import { Noto_Sans_JP } from "next/font/google";
import Head from "next/head";
import useSWR from "swr";

const noto = Noto_Sans_JP({ subsets: ["latin"], weight: ["400"] });

export default function Home() {
  const user = useUser();
  const { data } = useSWR(user && "/articles", async () => {
    return await supabase.from("articles").select();
  });
  const { data: articles, error } = data || {};

  return (
    <>
      <Head>
        <title>読んだページ記録くん</title>
        <meta
          name="description"
          content="読んだ（あとで読む）ページを記録してくれるよ"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={noto.className}>
        <Stack minHeight="100vh">
          <Header />
          {error && <div>{error.toString()}</div>}
          <Stack gap={1} padding={2}>
            {articles?.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </Stack>
        </Stack>
      </main>
    </>
  );
}
