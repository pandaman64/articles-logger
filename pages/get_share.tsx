import { useSearchParams } from "next/navigation";
import { FC } from "react";

const GetShare: FC = () => {
  const searchParams = useSearchParams();

  return (
    <>
      <ul>
        <li>title: {searchParams.get("title") ?? "null"}</li>
        <li>text: {searchParams.get("text") ?? "null"}</li>
        <li>url: {searchParams.get("url") ?? "null"}</li>
      </ul>
    </>
  );
};

export default GetShare;
