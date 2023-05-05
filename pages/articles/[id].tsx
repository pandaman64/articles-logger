import { Article, supabase } from "@/lib/supabase";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Modal,
  ModalDialog,
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

export const ArticleCard: FC<{
  defaultArticle: Article;
  isSubmitting: boolean;
  onSubmit: (newArticle: Article) => Promise<void>;
  deleteArticle: () => Promise<void>;
}> = ({ defaultArticle, isSubmitting, onSubmit, deleteArticle }) => {
  const [article, setArticle] = useState(defaultArticle);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <>
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
            <Stack marginLeft="auto" direction="row" gap={4}>
              <Button
                size="md"
                variant="outlined"
                color="danger"
                onClick={() => setDeleteModalOpen(true)}
              >
                削除
              </Button>
              <Button loading={isSubmitting} size="lg" type="submit">
                更新
              </Button>
            </Stack>
          </Stack>
        </Card>
      </form>
      <Modal open={isDeleteModalOpen}>
        <ModalDialog
          size="lg"
          variant="outlined"
          role="alertdialog"
          aria-labelledby="alert-dialog-modal-title"
          aria-describedby="alert-dialog-modal-description"
        >
          <Typography id="alert-dialog-modal-title" component="h2">
            確認
          </Typography>
          <Divider />
          <Typography
            id="alert-dialog-modal-description"
            textColor="text.tertiary"
          >
            本当に削除しますか？
          </Typography>
          <Box
            sx={{ display: "flex", gap: 1, justifyContent: "flex-end", pt: 2 }}
          >
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setDeleteModalOpen(false)}
            >
              やめる
            </Button>
            <Button
              loading={isSubmitting}
              variant="solid"
              color="danger"
              onClick={() => {
                setDeleteModalOpen(false);
                deleteArticle();
              }}
            >
              削除
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
};

export const ArticlePage: FC = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const user = useUser();
  const { data, mutate, isLoading } = useSWR(
    user && `/articles/${id}`,
    async () => {
      return await supabase
        .from("articles")
        .select()
        .eq("id", new Number(id))
        .single();
    }
  );
  const { data: article, error } = data || {};

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Container maxWidth="md">
      {isLoading ? (
        <div>読み込み中</div>
      ) : article ? (
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
            if (updateResult.data) {
              mutate(updateResult);
            } else {
              console.error(updateResult.error);
            }
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
