export function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <article className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 shadow-sm">
      <p className="text-sm font-medium text-[var(--muted)]">{label}</p>
      <strong className="mt-3 block text-3xl font-semibold tracking-[-0.04em] text-[var(--ink)]">
        {value}
      </strong>
      <p className="mt-2 text-sm text-[var(--muted)]">{detail}</p>
    </article>
  );
}
