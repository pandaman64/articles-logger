"use client";

import { Article } from "@/lib/supabase";
import { Stack } from "@mui/joy";
import { Noto_Sans_JP } from "next/font/google";
import Header from "./Header";
import ArticleCard from "./ArticleCard";

const noto = Noto_Sans_JP({ subsets: ["latin"], weight: ["400"] });

export default function IndexPagePresentation({
  articles,
}: {
  articles: Article[] | null;
}) {
  return (
    <main className={noto.className}>
      <Stack minHeight="100vh">
        <Header />
        <Stack gap={1} padding={2}>
          {articles?.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </Stack>
      </Stack>
    </main>
  );
}
