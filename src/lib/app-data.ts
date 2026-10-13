import { redirect } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";
import { createClient } from "@/lib/supabase/server";

export type AppMembership = {
  id: string;
  organization_id: string;
  role: "owner" | "admin" | "member";
  organizations: {
    id: string;
    name: string;
    slug: string;
  } | null;
};

export async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/start?mode=signin");
  }

  return { supabase, user };
}

export async function getPrimaryMembership(
  supabase: SupabaseClient<Database>,
  userId: string,
) {
  const { data, error } = await supabase
    .from("organization_members")
    .select("id, organization_id, role, organizations(id, name, slug)")
    .eq("user_id", userId)
    .eq("status", "active")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as AppMembership | null;
}

export async function requireMembership() {
  const { supabase, user } = await requireUser();
  const membership = await getPrimaryMembership(supabase, user.id);

  if (!membership?.organizations) {
    redirect("/onboarding");
  }

  return { supabase, user, membership, organization: membership.organizations };
}
