import { Article, supabase } from "@/lib/supabase";
import {
  Box,
  Button,
  Card,
  Container,
  Option,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from "@mui/joy";
import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import useSWR from "swr";

function parseAlreadyRead(value: string): boolean | null {
  switch (value) {
    case "read":
      return true;

    case "not-read":
      return false;

    default:
      return null;
  }
}

const ArticleCard: FC<{
  defaultArticle: Article;
  onSubmit: (newArticle: Article) => Promise<void>;
}> = ({ defaultArticle, onSubmit }) => {
  const [article, setArticle] = useState(defaultArticle);

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        onSubmit(article);
      }}
    >
      <Card
        sx={{
          width: "100%",
          minHeight: "100vh",
          gap: 2,
        }}
      >
        <Typography level="h1" fontSize="xl">
          {article.title}
        </Typography>
        <Typography level="body1">{article.content}</Typography>
        <RadioGroup
          name="radio-buttons-read"
          orientation="horizontal"
          value={
            article.already_read !== null
              ? article.already_read
                ? "read"
                : "not-read"
              : null
          }
          onChange={(ev) => {
            const value = ev.currentTarget.value;
            const newAlreadyRead = parseAlreadyRead(value);
            setArticle({ ...article, already_read: newAlreadyRead });
          }}
        >
          <Radio value="read" label="読んだ" />
          <Radio value="not-read" label="読んでない" />
        </RadioGroup>
        <Select
          name="select-rating"
          value={article.rating?.toString()}
          onChange={(_ev, value: string | null) => {
            const newRating = value ? parseInt(value, 10) : null;
            setArticle({ ...article, rating: newRating });
          }}
        >
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
          <Option value="5">5</Option>
        </Select>
        <Stack direction="row" marginTop="auto" alignItems="end">
          <Box marginRight="auto">
            <Link href="/">トップに戻る</Link>
          </Box>
          <Box marginLeft="auto">
            <Button size="lg" type="submit">
              更新
            </Button>
          </Box>
        </Stack>
      </Card>
    </form>
  );
};

export const ArticlePage: FC = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const user = useUser();
  const { data, mutate } = useSWR(user && `/articles/${id}`, async () => {
    return await supabase
      .from("articles")
      .select()
      .eq("id", new Number(id))
      .single();
  });
  const { data: article, error } = data || {};

  return (
    <Container maxWidth="md">
      {article ? (
        <ArticleCard
          defaultArticle={article}
          onSubmit={async (newArticle) => {
            const updateResult = await supabase
              .from("articles")
              .update(newArticle)
              .eq("id", newArticle.id)
              .select()
              .single();

            if (updateResult.data) {
              mutate(updateResult);
            } else {
              console.error(updateResult.error);
            }
          }}
        />
      ) : (
        <div>
          {error?.toString() ?? "empty error"}
          <Link href="/">トップに戻る</Link>
        </div>
      )}
    </Container>
  );
};

export default ArticlePage;
