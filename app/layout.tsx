import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "読んだページ記録くん",
  description: "読んだページを記録するよ",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
