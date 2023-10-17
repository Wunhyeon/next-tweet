"use client";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function AuthButtonClient({
  session,
}: {
  session: Session | null;
}) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handledSignIn = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });
      console.log("after login");
    } catch (e) {
      console.log("error : ", e);
    }
  };

  const handledSignOut = async () => {
    console.log("logout");

    await supabase.auth.signOut();
    router.refresh();
  };

  // const [session, setSession] = useState();

  // useEffect(() => {
  //   const getSession = async () => {

  //     setSession(data.session);
  //   };
  //   getSession();
  // }, []);

  return session ? (
    <>
      <button className="text-xs text-gray-400" onClick={handledSignOut}>
        LogOut
      </button>
    </>
  ) : (
    <>
      <button className="text-xs text-gray-400" onClick={handledSignIn}>
        Login
      </button>
    </>
  );
}
