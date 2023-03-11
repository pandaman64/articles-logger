import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const prisma = new PrismaClient();

const requestSchema = z.object({
  title: z.string().nullable(),
  text: z.string().nullable(),
  url: z.string().nullable(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log(req.body);
    const parseResult = requestSchema.safeParse(req.body);
    if (parseResult.success) {
      const data = parseResult.data;

      const createResult = await prisma.article.create({
        data,
      });
      console.log(createResult);

      res.status(200).json({ status: "ok" });
    } else {
      res.status(400).json({ status: "failed" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end();
  }
}
