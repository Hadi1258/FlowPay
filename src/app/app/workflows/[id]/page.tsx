import Link from "next/link";
import { notFound } from "next/navigation";
import { updateWorkflowStatus } from "@/app/app/actions";
import { requireMembership } from "@/lib/app-data";
import { formatMoney, workflowStatusLabels, workflowStatuses } from "@/lib/workflows";

export default async function WorkflowDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const { supabase, membership, organization } = await requireMembership();
  const [{ data: workflow, error }, { data: events, error: eventsError }] =
    await Promise.all([
      supabase
        .from("workflows")
        .select("*")
        .eq("id", id)
        .eq("organization_id", organization.id)
        .maybeSingle(),
      supabase
        .from("workflow_events")
        .select("id, event_type, body, created_at")
        .eq("workflow_id", id)
        .eq("organization_id", organization.id)
        .order("created_at", { ascending: false }),
    ]);

  if (error || eventsError) {
    throw new Error(error?.message ?? eventsError?.message);
  }

  if (!workflow) {
    notFound();
  }

  const canUpdate = membership.role === "owner" || membership.role === "admin";

  return (
    <div>
      <Link className="text-sm font-semibold text-[var(--accent-dark)]" href="/app/workflows">
        Back to workflows
      </Link>
      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <section className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-dark)]">
                Workflow
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink)]">
                {workflow.customer_name}
              </h1>
            </div>
            <span className="w-fit rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-dark)]">
              {workflowStatusLabels[workflow.status]}
            </span>
          </div>
          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-[var(--line)] bg-white/70 p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                Amount
              </dt>
              <dd className="mt-2 text-xl font-semibold text-[var(--ink)]">
                {formatMoney(workflow.amount_cents, workflow.currency)}
              </dd>
            </div>
            <div className="rounded-xl border border-[var(--line)] bg-white/70 p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                Created
              </dt>
              <dd className="mt-2 text-sm font-semibold text-[var(--ink)]">
                {new Date(workflow.created_at).toLocaleDateString()}
              </dd>
            </div>
            <div className="rounded-xl border border-[var(--line)] bg-white/70 p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                Updated
              </dt>
              <dd className="mt-2 text-sm font-semibold text-[var(--ink)]">
                {new Date(workflow.updated_at).toLocaleDateString()}
              </dd>
            </div>
          </dl>
          <p className="mt-6 whitespace-pre-wrap text-sm leading-6 text-[var(--muted)]">
            {workflow.description || "No description yet."}
          </p>
        </section>

        <aside className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 shadow-sm">
          <h2 className="text-xl font-semibold tracking-[-0.03em] text-[var(--ink)]">
            Status
          </h2>
          {canUpdate ? (
            <form action={updateWorkflowStatus} className="mt-5 grid gap-4">
              <input name="workflowId" type="hidden" value={workflow.id} />
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[var(--ink)]">Move to</span>
                <select className="form-field" defaultValue={workflow.status} name="status">
                  {workflowStatuses.map((status) => (
                    <option key={status} value={status}>
                      {workflowStatusLabels[status]}
                    </option>
                  ))}
                </select>
              </label>
              {query.error ? (
                <p className="text-sm font-medium text-red-700">{query.error}</p>
              ) : null}
              <button
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-dark)]"
                type="submit"
              >
                Update status
              </button>
            </form>
          ) : (
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
              Members can view workflow state. Owners and admins can update it.
            </p>
          )}
        </aside>
      </div>

      <section className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 shadow-sm">
        <h2 className="text-xl font-semibold tracking-[-0.03em] text-[var(--ink)]">
          Timeline
        </h2>
        <div className="mt-5 grid gap-3">
          {(events ?? []).length > 0 ? (
            events?.map((event) => (
              <article className="rounded-xl border border-[var(--line)] bg-white/70 p-4" key={event.id}>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <strong className="text-sm text-[var(--ink)]">{event.event_type}</strong>
                  <span className="text-xs font-medium text-[var(--muted)]">
                    {new Date(event.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[var(--muted)]">{event.body}</p>
              </article>
            ))
          ) : (
            <p className="rounded-xl border border-dashed border-[var(--line-strong)] p-5 text-sm text-[var(--muted)]">
              No timeline events yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
