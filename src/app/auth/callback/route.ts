import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const requestedNext = requestUrl.searchParams.get("next") ?? "/app";
  const redirectUrl = new URL(requestedNext, request.url);
  const next = requestedNext.startsWith("/") && redirectUrl.origin === requestUrl.origin
    ? redirectUrl
    : new URL("/app", request.url);

  if (!code) {
    return NextResponse.redirect(new URL("/start?mode=signin&error=Invalid+auth+link", request.url));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL(`/start?mode=signin&error=${encodeURIComponent(error.message)}`, request.url),
    );
  }

  return NextResponse.redirect(next);
}
