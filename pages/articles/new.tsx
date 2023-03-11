import { useSearchParams } from "next/navigation";
import { FC } from "react";

const NewArticle: FC = () => {
  const searchParams = useSearchParams();

  return (
    <div>
      <ul>
        <li>title: {searchParams.get("title") ?? "null"}</li>
        <li>text: {searchParams.get("text") ?? "null"}</li>
        <li>url: {searchParams.get("url") ?? "null"}</li>
      </ul>
    </div>
  );
};

export default NewArticle;
