import Head from "next/head";
import { Noto_Sans_JP } from "next/font/google";
import { useEffect, useState } from "react";
import { Article } from "./get_share";

const noto = Noto_Sans_JP({ subsets: ["latin"], weight: ["400"] });

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    const data = sessionStorage.getItem("articles-logger-articles");
    if (data !== null) {
      const articles: Article[] = JSON.parse(data);
      setArticles(articles);
    }
  }, [setArticles]);

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
        <ol>
          {articles.map((article, index) => (
            <li key={index}>
              記事↓
              <ul>
                <li>title: {article.title ?? "null"}</li>
                <li>text: {article.text ?? "null"}</li>
                <li>url: {article.url ?? "null"}</li>
              </ul>
            </li>
          ))}
        </ol>
      </main>
    </>
  );
}
