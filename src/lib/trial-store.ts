import type { TrialPayload } from "@/lib/trial";
import { createAdminClient } from "@/lib/supabase/admin";

export type StoredTrialLead = TrialPayload & {
  id: string;
  createdAt: string;
  source: "website";
};

export async function saveTrialLead(payload: TrialPayload): Promise<StoredTrialLead> {
  const lead: StoredTrialLead = {
    ...payload,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    source: "website",
  };

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const supabase = createAdminClient();
    const { error } = await supabase.from("trial_leads").insert({
      id: lead.id,
      name: lead.name,
      work_email: lead.workEmail,
      company: lead.company,
      role: lead.role,
      company_size: lead.companySize,
      workflow_volume: lead.workflowVolume,
      message: lead.message,
      source: lead.source,
      created_at: lead.createdAt,
    });

    if (error) {
      throw new Error(error.message);
    }
  } else {
    console.info("Trial lead validated", {
      id: lead.id,
      company: lead.company,
      workflowVolume: lead.workflowVolume,
    });
  }

  return lead;
}
