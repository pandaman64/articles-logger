import "@/styles/globals.css";
import { CssBaseline, CssVarsProvider } from "@mui/joy";
import {
  createBrowserSupabaseClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <CssVarsProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </CssVarsProvider>
    </SessionContextProvider>
  );
}
