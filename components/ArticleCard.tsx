import { Article } from "@/lib/supabase";
import { Card, Typography } from "@mui/joy";
import Link from "next/link";
import { FC } from "react";

type Props = {
  article: Article;
};

export const ArticleCard: FC<Props> = ({ article }) => {
  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <Typography level="h2" fontSize="sm">
        <Link href={`/articles/${article.id}`}>{article.title}</Link>
      </Typography>
      <Typography level="body1">{article.content}</Typography>
    </Card>
  );
};

export default ArticleCard;
