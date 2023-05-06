"use client";

import { getAuthRedirectUrl } from "@/lib/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { FC } from "react";
import { useSupabase } from "../supabase-provider";

const LoginPagePresentation: FC = () => {
  const { supabase } = useSupabase();

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      redirectTo={getAuthRedirectUrl()}
    />
  );
};

export default LoginPagePresentation;
