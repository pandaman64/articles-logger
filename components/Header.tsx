import { supabase } from "@/lib/supabase";
import { Box, Sheet } from "@mui/joy";
import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { FC } from "react";

export const Header: FC = () => {
  const user = useUser();
  return (
    <Sheet
      sx={{
        width: "100vw",
        boxShadow: "sm",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box marginLeft="auto" padding={1}>
        {user ? (
          <button
            onClick={async () => {
              await supabase.auth.signOut();
            }}
          >
            ログアウト
          </button>
        ) : (
          <div>
            <Link href="/login">ログインしてね</Link>
          </div>
        )}
      </Box>
    </Sheet>
  );
};

export default Header;
