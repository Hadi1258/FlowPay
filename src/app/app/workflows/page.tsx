import Link from "next/link";
import { createWorkflow } from "@/app/app/actions";
import { requireMembership } from "@/lib/app-data";
import { formatMoney, workflowStatusLabels, workflowStatuses } from "@/lib/workflows";

export default async function WorkflowsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { supabase, membership, organization } = await requireMembership();
  const params = await searchParams;
  const { data: workflows, error } = await supabase
    .from("workflows")
    .select("id, customer_name, amount_cents, currency, status, updated_at")
    .eq("organization_id", organization.id)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const canCreate = membership.role === "owner" || membership.role === "admin";

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_24rem]">
      <section>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-dark)]">
            Workflows
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink)]">
            Payment workflow records
          </h1>
        </div>
        <div className="mt-6 grid gap-3">
          {(workflows ?? []).length > 0 ? (
            workflows?.map((workflow) => (
              <Link
                className="grid gap-3 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 shadow-sm transition-colors hover:bg-white sm:grid-cols-[1fr_auto_auto] sm:items-center"
                href={`/app/workflows/${workflow.id}`}
                key={workflow.id}
              >
                <div>
                  <strong className="block text-base text-[var(--ink)]">
                    {workflow.customer_name}
                  </strong>
                  <span className="mt-1 block text-sm text-[var(--muted)]">
                    Updated {new Date(workflow.updated_at).toLocaleDateString()}
                  </span>
                </div>
                <span className="text-sm font-semibold text-[var(--ink)]">
                  {formatMoney(workflow.amount_cents, workflow.currency)}
                </span>
                <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-dark)]">
                  {workflowStatusLabels[workflow.status]}
                </span>
              </Link>
            ))
          ) : (
            <p className="rounded-2xl border border-dashed border-[var(--line-strong)] bg-[var(--paper)] p-6 text-sm text-[var(--muted)]">
              No workflows yet. Use the form to create the first record.
            </p>
          )}
        </div>
      </section>

      <aside className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 shadow-sm">
        <h2 className="text-xl font-semibold tracking-[-0.03em] text-[var(--ink)]">
          Create workflow
        </h2>
        {canCreate ? (
          <form action={createWorkflow} className="mt-5 grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[var(--ink)]">Customer</span>
              <input className="form-field" name="customerName" required />
            </label>
            <div className="grid grid-cols-[1fr_5rem] gap-3">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[var(--ink)]">Amount</span>
                <input className="form-field" min="1" name="amount" required step="0.01" type="number" />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[var(--ink)]">Currency</span>
                <input className="form-field uppercase" defaultValue="USD" maxLength={3} minLength={3} name="currency" required />
              </label>
            </div>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[var(--ink)]">Initial state</span>
              <select className="form-field" defaultValue="request" name="status">
                {workflowStatuses.map((status) => (
                  <option key={status} value={status}>
                    {workflowStatusLabels[status]}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[var(--ink)]">Description</span>
              <textarea className="form-field min-h-28 resize-y py-3" name="description" />
            </label>
            {params.error ? (
              <p className="text-sm font-medium text-red-700">{params.error}</p>
            ) : null}
            <button
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-dark)]"
              type="submit"
            >
              Create workflow
            </button>
          </form>
        ) : (
          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
            Members can view workflows. Owners and admins can create and update
            them.
          </p>
        )}
      </aside>
    </div>
  );
}
