"use server";

import { redirect } from "next/navigation";
import { getPrimaryMembership, requireUser } from "@/lib/app-data";
import { createAdminClient } from "@/lib/supabase/admin";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 48);
}

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function completeOnboarding(formData: FormData) {
  const { supabase, user } = await requireUser();
  const existingMembership = await getPrimaryMembership(supabase, user.id);

  if (existingMembership) {
    redirect("/app");
  }

  const displayName = getString(formData, "displayName");
  const organizationName = getString(formData, "organizationName");

  if (displayName.length < 2 || organizationName.length < 2) {
    redirect("/onboarding?error=Add your name and company name.");
  }

  const email = user.email ?? "";
  const admin = createAdminClient();
  const { error: profileError } = await admin.from("profiles").upsert({
    id: user.id,
    display_name: displayName,
    email,
    updated_at: new Date().toISOString(),
  });

  if (profileError) {
    redirect(`/onboarding?error=${encodeURIComponent(profileError.message)}`);
  }

  const slugBase = slugify(organizationName) || "workspace";
  const slug = `${slugBase}-${user.id.slice(0, 8)}`;
  const { data: organization, error: organizationError } = await admin
    .from("organizations")
    .insert({
      name: organizationName,
      slug,
    })
    .select("id")
    .single();

  if (organizationError) {
    redirect(`/onboarding?error=${encodeURIComponent(organizationError.message)}`);
  }

  const { error: memberError } = await admin
    .from("organization_members")
    .insert({
      organization_id: organization.id,
      user_id: user.id,
      role: "owner",
      status: "active",
    });

  if (memberError) {
    redirect(`/onboarding?error=${encodeURIComponent(memberError.message)}`);
  }

  redirect("/app");
}
