"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

async function getAuthCallbackUrl(next: string) {
  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL;

  if (!origin) {
    throw new Error("Unable to determine the site URL for authentication emails.");
  }

  const callback = new URL("/auth/callback", origin);
  callback.searchParams.set("next", next);
  return callback.toString();
}

export async function signIn(formData: FormData) {
  const email = getString(formData, "email").toLowerCase();
  const password = getString(formData, "password");
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(`/start?mode=signin&error=${encodeURIComponent(error.message)}`);
  }

  redirect("/app");
}

export async function signUp(formData: FormData) {
  const name = getString(formData, "name");
  const email = getString(formData, "email").toLowerCase();
  const password = getString(formData, "password");
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: await getAuthCallbackUrl("/onboarding"),
      data: {
        display_name: name,
      },
    },
  });

  if (error) {
    redirect(`/start?mode=signup&error=${encodeURIComponent(error.message)}`);
  }

  if (!data.session) {
    redirect("/start?mode=signin&message=Check your email to confirm your account.");
  }

  redirect("/onboarding");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function resetPassword(formData: FormData) {
  const email = getString(formData, "email").toLowerCase();
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: await getAuthCallbackUrl("/start?mode=update"),
  });

  if (error) {
    redirect(`/start?mode=reset&error=${encodeURIComponent(error.message)}`);
  }

  redirect("/start?mode=signin&message=Check your email for the reset link.");
}

export async function updatePassword(formData: FormData) {
  const password = getString(formData, "password");
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    redirect(`/start?mode=update&error=${encodeURIComponent(error.message)}`);
  }

  redirect("/app");
}
