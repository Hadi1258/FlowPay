import Link from "next/link";
import { StatCard } from "@/components/app/stat-card";
import { requireMembership } from "@/lib/app-data";
import { formatMoney, workflowStatusLabels } from "@/lib/workflows";

export default async function AppDashboardPage() {
  const { supabase, organization } = await requireMembership();
  const { data: workflows, error } = await supabase
    .from("workflows")
    .select("id, customer_name, amount_cents, currency, status, updated_at")
    .eq("organization_id", organization.id)
    .order("updated_at", { ascending: false })
    .limit(6);

  if (error) {
    throw new Error(error.message);
  }

  const allWorkflows = workflows ?? [];
  const activeCount = allWorkflows.filter(
    (workflow) => !["confirmed", "cancelled"].includes(workflow.status),
  ).length;
  const verificationCount = allWorkflows.filter(
    (workflow) => workflow.status === "verification",
  ).length;
  const confirmedCount = allWorkflows.filter(
    (workflow) => workflow.status === "confirmed",
  ).length;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-dark)]">
            Dashboard
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink)]">
            {organization.name}
          </h1>
        </div>
        <Link
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--accent)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-dark)]"
          href="/app/workflows"
        >
          New workflow
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard detail="Not yet confirmed or cancelled" label="Active workflows" value={`${activeCount}`} />
        <StatCard detail="Waiting on checks or approval" label="Pending verification" value={`${verificationCount}`} />
        <StatCard detail="Closed successfully" label="Confirmed" value={`${confirmedCount}`} />
      </div>

      <section className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-[-0.03em] text-[var(--ink)]">
            Recent workflows
          </h2>
          <Link className="text-sm font-semibold text-[var(--accent-dark)]" href="/app/workflows">
            View all
          </Link>
        </div>
        <div className="mt-5 grid gap-3">
          {allWorkflows.length > 0 ? (
            allWorkflows.map((workflow) => (
              <Link
                className="grid gap-3 rounded-xl border border-[var(--line)] bg-white/70 p-4 transition-colors hover:bg-white sm:grid-cols-[1fr_auto_auto] sm:items-center"
                href={`/app/workflows/${workflow.id}`}
                key={workflow.id}
              >
                <strong className="text-sm text-[var(--ink)]">{workflow.customer_name}</strong>
                <span className="text-sm text-[var(--muted)]">
                  {formatMoney(workflow.amount_cents, workflow.currency)}
                </span>
                <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-dark)]">
                  {workflowStatusLabels[workflow.status]}
                </span>
              </Link>
            ))
          ) : (
            <p className="rounded-xl border border-dashed border-[var(--line-strong)] p-5 text-sm text-[var(--muted)]">
              No workflows yet. Create the first payment workflow to test the
              SaaS loop.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
