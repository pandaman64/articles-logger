import type { Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  applicationName: "読んだページ記録くん",
  title: "読んだページ記録くん",
  description: "読んだ（あとで読む）ページを記録してくれるよ",
  manifest: "/manifest.json",
  themeColor: "#FFFFFF",
  formatDetection: {
    telephone: false,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },

  icons: {
    shortcut: "/favicon.ico",
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "読んだページ記録くん",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
