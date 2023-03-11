import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const requestSchema = z.object({
  title: z.string().nullish(),
  text: z.string().nullish(),
  url: z.string().nullish(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const parseResult = requestSchema.safeParse(req.body);
    if (parseResult.success) {
      const data = parseResult.data;

      const createResult = await prisma.article.create({
        data: {
          title: data.title ?? null,
          text: data.text ?? null,
          url: data.url ?? null,
        },
      });
      console.log(createResult);

      res.status(200).json({ status: "ok" });
    } else {
      console.log(parseResult.error);
      res.status(400).json({ status: "failed" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end();
  }
}
