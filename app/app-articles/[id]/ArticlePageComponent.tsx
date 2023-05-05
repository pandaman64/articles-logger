"use client";

import { useSupabase } from "@/app/supabase-provider";
import { Article } from "@/lib/supabase";
import { ArticleCard } from "@/pages/articles/[id]";
import { Container } from "@mui/joy";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ArticlePageComponent({
  article,
}: {
  article: Article;
}) {
  const router = useRouter();
  const { supabase } = useSupabase();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Container maxWidth="md">
      <ArticleCard
        defaultArticle={article}
        isSubmitting={isSubmitting}
        onSubmit={async (newArticle) => {
          setIsSubmitting(true);

          const updateResult = await supabase
            .from("articles")
            .update(newArticle)
            .eq("id", newArticle.id)
            .select()
            .single();

          setIsSubmitting(false);
        }}
        deleteArticle={async () => {
          setIsSubmitting(true);

          const deleteResult = await supabase
            .from("articles")
            .delete()
            .eq("id", article.id);

          setIsSubmitting(false);
          if (deleteResult.data) {
            router.push("/");
          } else {
            console.error(deleteResult.error);
          }
        }}
      />
    </Container>
  );
}
