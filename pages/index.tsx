import { supabase } from "@/lib/supabase";
import { Noto_Sans_JP } from "next/font/google";
import Head from "next/head";
import useSWR from "swr";

const noto = Noto_Sans_JP({ subsets: ["latin"], weight: ["400"] });
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data } = useSWR("/api/list_articles", async () => {
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
        こんにちは、世界！
        {error && <div>{error.toString()}</div>}
        <ol>
          {articles?.map((article) => (
            <li
              key={article.id}
            >{`・id=${article.id}&title=${article.title}&content=${article.content}&url=${article.url}`}</li>
          ))}
        </ol>
      </main>
    </>
  );
}
