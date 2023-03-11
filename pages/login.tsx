import { supabase } from "@/lib/supabase";
import { useSession } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

const LoginPage: FC = () => {
  const router = useRouter();
  const session = useSession();
  const isLoggedIn = session !== null;

  useEffect(() => {
    if (isLoggedIn) {
      console.log("hacky redirect!");
      router.replace("/");
    }
  }, [router, isLoggedIn]);

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      redirectTo="/"
    />
  );
};

export default LoginPage;
