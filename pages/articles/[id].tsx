import { supabase } from "@/lib/supabase";
import {
  Box,
  Card,
  Option,
  Radio,
  RadioGroup,
  Select,
  Typography
} from "@mui/joy";
import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import useSWR from "swr";

export const ArticlePage: FC = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const user = useUser();
  const { data } = useSWR(user && `/articles/${id}`, async () => {
    return await supabase
      .from("articles")
      .select()
      .eq("id", new Number(id))
      .single();
  });
  const { data: article, error } = data || {};

  console.log(article);
  return article ? (
    <Card
      sx={{
        width: "100vw",
        minHeight: "100vh",
        gap: 2,
      }}
    >
      <Typography level="h1" fontSize="xl">
        {article.title}
      </Typography>
      <Typography level="body1">{article.content}</Typography>
      <RadioGroup name="radio-buttons-read" orientation="horizontal">
        <Radio value="read" label="読んだ" />
        <Radio value="not-read" label="読んでない" />
      </RadioGroup>
      <Select>
        <Option>1</Option>
        <Option>2</Option>
        <Option>3</Option>
        <Option>4</Option>
        <Option>5</Option>
      </Select>
      <Box marginTop="auto" marginLeft="auto">
        <Link href="/">トップに戻る</Link>
      </Box>
    </Card>
  ) : (
    <div>
      {error?.toString() ?? "empty error"}
      <Link href="/">トップに戻る</Link>
    </div>
  );
};

export default ArticlePage;
