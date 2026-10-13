import { pricingPlans, workflowSteps } from "@/lib/site-data";

export function ProductWorkspaceMockup() {
  return (
    <div className="rounded-[2rem] border border-[var(--line)] bg-[#17201c] p-3 text-white shadow-[var(--shadow-soft)]">
      <div className="rounded-[1.45rem] border border-white/10 bg-white/[0.04]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9bd8c9]">
              Workspace
            </p>
            <h3 className="mt-1 text-lg font-semibold">Acme payment request</h3>
          </div>
          <span className="rounded-full bg-[#d9eee8] px-3 py-1 text-xs font-semibold text-[#0f5d51]">
            Ready
          </span>
        </div>
        <div className="grid gap-4 p-5 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-2xl bg-white p-4 text-[var(--ink)]">
            <div className="grid grid-cols-[1.2fr_0.7fr_0.7fr] gap-3 border-b border-[var(--line)] pb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
              <span>Item</span>
              <span>Status</span>
              <span className="text-right">Amount</span>
            </div>
            {[
              ["Enterprise setup", "Approved", "$4,800"],
              ["Verification", "Complete", "$260"],
              ["Monthly platform", "Pending", "$1,200"],
            ].map(([item, status, amount]) => (
              <div
                className="grid grid-cols-[1.2fr_0.7fr_0.7fr] gap-3 border-b border-[var(--line)] py-4 text-sm last:border-0"
                key={item}
              >
                <span className="font-semibold">{item}</span>
                <span className="text-[var(--muted)]">{status}</span>
                <span className="text-right font-semibold">{amount}</span>
              </div>
            ))}
          </div>
          <div className="grid gap-3">
            {["Legal approved", "Payment link drafted", "Risk review clear"].map(
              (item) => (
                <div
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                  key={item}
                >
                  <span className="mb-3 block h-2 w-10 rounded-full bg-[#9bd8c9]" />
                  <p className="text-sm font-semibold">{item}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PaymentTimelineMockup() {
  return (
    <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--paper)] p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-dark)]">
            Timeline
          </p>
          <h3 className="mt-1 text-xl font-semibold tracking-[-0.03em]">
            Payment path
          </h3>
        </div>
        <span className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-semibold text-[var(--muted)]">
          Live
        </span>
      </div>
      <div className="mt-6 grid gap-4">
        {workflowSteps.map((step, index) => (
          <div className="grid grid-cols-[auto_1fr] gap-4" key={step.key}>
            <div className="flex flex-col items-center">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs font-semibold text-[var(--accent-dark)]">
                {index + 1}
              </span>
              {index < workflowSteps.length - 1 ? (
                <span className="h-full w-px bg-[var(--line)]" />
              ) : null}
            </div>
            <div className="pb-5">
              <h4 className="font-semibold tracking-[-0.02em] text-[var(--ink)]">
                {step.title}
              </h4>
              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SecurityStackMockup() {
  return (
    <div className="grid gap-4 rounded-[2rem] border border-[var(--line)] bg-[var(--paper)] p-5 shadow-[var(--shadow-card)]">
      {[
        ["Identity", "Verified customer profile", "Complete"],
        ["Risk", "Volume and source checks", "Clear"],
        ["Approval", "Finance owner review", "Ready"],
        ["Payment", "Link paid and receipt issued", "Paid"],
      ].map(([label, detail, state]) => (
        <div
          className="grid gap-3 rounded-2xl border border-[var(--line)] bg-white/72 p-4 sm:grid-cols-[0.8fr_1fr_auto] sm:items-center"
          key={label}
        >
          <strong className="text-sm text-[var(--ink)]">{label}</strong>
          <span className="text-sm text-[var(--muted)]">{detail}</span>
          <span className="w-fit rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-dark)]">
            {state}
          </span>
        </div>
      ))}
    </div>
  );
}

export function PricingCards() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {pricingPlans.map((plan) => (
        <article
          className={`rounded-[2rem] border p-6 shadow-sm ${
            plan.featured
              ? "border-[var(--accent)] bg-[#17201c] text-white"
              : "border-[var(--line)] bg-[var(--paper)] text-[var(--ink)]"
          }`}
          key={plan.name}
        >
          <h3 className="text-xl font-semibold tracking-[-0.03em]">
            {plan.name}
          </h3>
          <div className="mt-5 flex items-end gap-2">
            <span className="text-5xl font-semibold tracking-[-0.06em]">
              {plan.price}
            </span>
            <span
              className={
                plan.featured ? "mb-2 text-white/60" : "mb-2 text-[var(--muted)]"
              }
            >
              {plan.cadence}
            </span>
          </div>
          <p
            className={`mt-4 text-sm leading-6 ${
              plan.featured ? "text-white/66" : "text-[var(--muted)]"
            }`}
          >
            {plan.description}
          </p>
          <div className="mt-6 grid gap-3">
            {plan.features.map((feature) => (
              <div className="flex gap-3 text-sm" key={feature}>
                <span
                  className={`mt-1 h-2 w-2 rounded-full ${
                    plan.featured ? "bg-[#9bd8c9]" : "bg-[var(--accent)]"
                  }`}
                />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
