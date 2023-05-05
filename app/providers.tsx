"use client";

import { CssBaseline, CssVarsProvider } from "@mui/joy";
import SupabaseProvider from "./supabase-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SupabaseProvider>
      <CssVarsProvider>
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </SupabaseProvider>
  );
}
