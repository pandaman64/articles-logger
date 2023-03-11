import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

export type Article = {
  title: string | null;
  text: string | null;
  url: string | null;
};

const GetShare: FC = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const text = searchParams.get("text");
  const url = searchParams.get("url");

  const [isSet, setIsSet] = useState(false);
  useEffect(() => {
    if (title !== null || text !== null || url !== null) {
      const articles: Article[] = JSON.parse(
        sessionStorage.getItem("articles-logger-articles") ?? "[]"
      );
      articles.push({ title, text, url });
      sessionStorage.setItem(
        "articles-logger-articles",
        JSON.stringify(articles)
      );
      console.log(articles);
      setIsSet(true);
    }
  }, [title, text, url, setIsSet]);

  return (
    <div>
      <ul>
        <li>title: {title ?? "null"}</li>
        <li>text: {text ?? "null"}</li>
        <li>url: {url ?? "null"}</li>
      </ul>
      {isSet && (
        <div>
          登録完了。<Link href="/">トップに戻る</Link>
        </div>
      )}
    </div>
  );
};

export default GetShare;
