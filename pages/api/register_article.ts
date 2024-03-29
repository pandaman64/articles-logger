import { Database } from "@/lib/database";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export const runtime = "edge";

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

      const supabase = createServerSupabaseClient<Database>({ req, res });
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user !== null) {
        const { data: response, error } = await supabase
          .from("articles")
          .upsert(
            {
              user_id: user.id,
              title: data.title ?? "",
              content: data.text ?? "",
              url: data.url ?? "",
            },
            {
              // Upsert on the articles' UNIQUE constraint. Force update to return a row and refresh updated_at.
              onConflict: "user_id,title,content,url",
              ignoreDuplicates: false,
            }
          )
          .select("id")
          .single();

        if (response) {
          // We need to redirect with 302 because Android doesn't like 308 :(
          res.redirect(302, `/articles/${response.id}`);
        } else {
          console.warn(error);
          res.redirect(302, `/`);
        }
      } else {
        // Unauthenticated. Redirect to login.
        // TODO: continue?
        res.redirect(302, "/login");
      }
    } else {
      console.log(parseResult.error);
      res.status(400).json({ status: "failed" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end();
  }
}
