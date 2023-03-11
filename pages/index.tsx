import Head from "next/head";
import { Noto_Sans_JP } from "next/font/google";
import useSWR from "swr";
import { Article } from "@prisma/client";

const noto = Noto_Sans_JP({ subsets: ["latin"], weight: ["400"] });
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR<Article[]>(
    "/api/list_articles",
    fetcher
  );

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
          {data?.map((article) => (
            <li
              key={article.id}
            >{`・id=${article.id}&title=${article.title}&text=${article.text}&url=${article.url}`}</li>
          ))}
        </ol>
      </main>
    </>
  );
}
