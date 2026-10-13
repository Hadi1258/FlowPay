"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { WorkflowStatus } from "@/lib/database.types";
import { requireMembership } from "@/lib/app-data";
import { parseAmountToCents, workflowStatuses } from "@/lib/workflows";

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getStatus(formData: FormData): WorkflowStatus | null {
  const status = getString(formData, "status");
  return workflowStatuses.includes(status as WorkflowStatus)
    ? (status as WorkflowStatus)
    : null;
}

function canWrite(role: string) {
  return role === "owner" || role === "admin";
}

export async function createWorkflow(formData: FormData) {
  const { supabase, user, membership, organization } = await requireMembership();

  if (!canWrite(membership.role)) {
    redirect("/app/workflows?error=Only owners and admins can create workflows.");
  }

  const customerName = getString(formData, "customerName");
  const amountCents = parseAmountToCents(formData.get("amount"));
  const currency = getString(formData, "currency").toUpperCase() || "USD";
  const description = getString(formData, "description");
  const status = getStatus(formData) ?? "request";

  if (customerName.length < 2 || !amountCents || currency.length !== 3) {
    redirect("/app/workflows?error=Add a customer, amount, and 3-letter currency.");
  }

  const { data: workflow, error } = await supabase
    .from("workflows")
    .insert({
      organization_id: organization.id,
      customer_name: customerName,
      amount_cents: amountCents,
      currency,
      description,
      status,
      created_by: user.id,
    })
    .select("id")
    .single();

  if (error) {
    redirect(`/app/workflows?error=${encodeURIComponent(error.message)}`);
  }

  await supabase.from("workflow_events").insert({
    workflow_id: workflow.id,
    organization_id: organization.id,
    actor_id: user.id,
    event_type: "workflow.created",
    body: `Created workflow for ${customerName}.`,
  });

  revalidatePath("/app");
  revalidatePath("/app/workflows");
  redirect(`/app/workflows/${workflow.id}`);
}

export async function updateWorkflowStatus(formData: FormData) {
  const { supabase, user, membership, organization } = await requireMembership();
  const workflowId = getString(formData, "workflowId");
  const status = getStatus(formData);

  if (!canWrite(membership.role)) {
    redirect(`/app/workflows/${workflowId}?error=Only owners and admins can update workflows.`);
  }

  if (!workflowId || !status) {
    redirect("/app/workflows");
  }

  const { data: workflow, error } = await supabase
    .from("workflows")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", workflowId)
    .eq("organization_id", organization.id)
    .select("id, customer_name")
    .single();

  if (error) {
    redirect(`/app/workflows/${workflowId}?error=${encodeURIComponent(error.message)}`);
  }

  await supabase.from("workflow_events").insert({
    workflow_id: workflow.id,
    organization_id: organization.id,
    actor_id: user.id,
    event_type: "workflow.status_changed",
    body: `Moved ${workflow.customer_name} to ${status}.`,
  });

  revalidatePath("/app");
  revalidatePath("/app/workflows");
  revalidatePath(`/app/workflows/${workflow.id}`);
}

export async function updateSettings(formData: FormData) {
  const { supabase, membership, organization, user } = await requireMembership();
  const displayName = getString(formData, "displayName");
  const organizationName = getString(formData, "organizationName");

  if (!canWrite(membership.role)) {
    redirect("/app/settings?error=Only owners and admins can update settings.");
  }

  if (displayName.length < 2 || organizationName.length < 2) {
    redirect("/app/settings?error=Add a valid name and company name.");
  }

  const [{ error: profileError }, { error: organizationError }] = await Promise.all([
    supabase
      .from("profiles")
      .update({
        display_name: displayName,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id),
    supabase
      .from("organizations")
      .update({
        name: organizationName,
        updated_at: new Date().toISOString(),
      })
      .eq("id", organization.id),
  ]);

  const error = profileError ?? organizationError;

  if (error) {
    redirect(`/app/settings?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/app");
  revalidatePath("/app/settings");
  redirect("/app/settings?message=Settings updated.");
}
