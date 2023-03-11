import { supabase } from "@/lib/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { FC } from "react";

const LoginPage: FC = () => {
  return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
};

export default LoginPage;
