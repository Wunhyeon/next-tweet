import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code1 = requestUrl.searchParams.get("error_description");
  const code = requestUrl.searchParams.get("code");
  console.log("code1 : ", code1);

  console.log("auth/callback - route : ", code);

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
    console.log("auth/callback - route - if : ", code);
  }

  return NextResponse.redirect(requestUrl.origin);
}
