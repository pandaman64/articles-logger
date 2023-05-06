import { Box, Sheet } from "@mui/joy";
import Link from "next/link";
import { FC } from "react";
import { useSupabase } from "./supabase-provider";

export const Header: FC = () => {
  const { supabase, session } = useSupabase();
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
        {session ? (
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
