import { ButtonLink } from "@/components/button-link";
import { FlowAnimation } from "@/components/flow/flow-animation";
import {
  ProductWorkspaceMockup,
  SecurityStackMockup,
} from "@/components/mockups/product-mockups";
import { RailAccent } from "@/components/rail-accent";
import { SectionHeading } from "@/components/section-heading";
import {
  faqItems,
  homeMetrics,
  integrationRows,
  platformPillars,
  pricingPlans,
} from "@/lib/site-data";

export default function Home() {
  return (
    <>
      <section className="flow-shell relative overflow-hidden border-b border-[var(--line)]">
        <div className="soft-grid pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:px-10 lg:pb-24 lg:pt-16">
          <div className="min-w-0">
            <div className="mb-5 inline-flex rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-sm font-medium text-[var(--accent-dark)] shadow-sm">
              Payment workflow automation
            </div>
            <h1 className="text-balance max-w-4xl text-[2.7rem] font-semibold leading-[1.02] tracking-[-0.04em] text-[var(--ink)] sm:text-6xl lg:text-7xl">
              Turn every request into a verified payment flow.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              FlowPay gives teams one place to capture requests, assemble quotes,
              send payment links, verify customers, and confirm the final state
              without making the workflow feel noisy.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink className="w-full sm:w-auto" href="/start">
                Start free trial
              </ButtonLink>
              <ButtonLink className="w-full sm:w-auto" href="/workflow" variant="secondary">
                See workflow
              </ButtonLink>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {homeMetrics.map((metric) => (
                <div
                  className="rounded-2xl border border-[var(--line)] bg-white/62 p-4 shadow-sm"
                  key={metric.label}
                >
                  <strong className="block text-2xl font-semibold tracking-[-0.03em] text-[var(--ink)]">
                    {metric.value}
                  </strong>
                  <span className="mt-1 block text-sm leading-5 text-[var(--muted)]">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <FlowAnimation />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-20 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-10">
        <SectionHeading
          eyebrow="Product"
          title="A calm command center for money movement."
        >
          Replace scattered email threads, spreadsheets, payment links, and
          manual checks with one shared workspace your whole team can read.
        </SectionHeading>
        <div className="grid gap-4 sm:grid-cols-3">
          {platformPillars.map((pillar) => (
            <article
              className="rounded-3xl border border-[var(--line)] bg-[var(--paper)] p-5 shadow-sm"
              key={pillar.title}
            >
              <span className="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-soft)] text-sm font-semibold text-[var(--accent-dark)]">
                {pillar.index}
              </span>
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--ink)]">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--paper)]">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-10">
          <ProductWorkspaceMockup />
          <div className="flex flex-col justify-center">
            <SectionHeading
              eyebrow="Operations"
              title="Every handoff keeps its context."
            >
              The interface uses a consistent rail, status dots, and concise
              states so teams can see what happened, what is waiting, and what
              needs a decision.
            </SectionHeading>
            <div className="mt-8 grid gap-3">
              {integrationRows.map((row) => (
                <div
                  className="flex items-center justify-between rounded-2xl border border-[var(--line)] bg-white/70 p-4"
                  key={row.name}
                >
                  <div>
                    <strong className="block text-sm font-semibold text-[var(--ink)]">
                      {row.name}
                    </strong>
                    <span className="text-sm text-[var(--muted)]">
                      {row.description}
                    </span>
                  </div>
                  <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-dark)]">
                    Ready
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
        <div>
          <SectionHeading
            eyebrow="Trust"
            title="Verification and payment state stay visible."
          >
            FlowPay makes the sensitive parts of the journey quieter and more
            legible: identity checks, approvals, payment status, and audit
            history stay connected.
          </SectionHeading>
          <div className="mt-8">
            <ButtonLink href="/security" variant="secondary">
              Explore security
            </ButtonLink>
          </div>
        </div>
        <SecurityStackMockup />
      </section>

      <section className="border-y border-[var(--line)] bg-[#19231f] text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9bd8c9]">
              Pricing preview
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
              Start small, then scale the workflow volume.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/68">
              Public plan cards keep the product easy to understand while the
              trial captures the information needed for a production quote.
            </p>
            <div className="mt-8">
              <ButtonLink href="/pricing">View pricing</ButtonLink>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {pricingPlans.map((plan) => (
              <article
                className="rounded-3xl border border-white/12 bg-white/[0.06] p-5"
                key={plan.name}
              >
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.05em]">
                  {plan.price}
                </p>
                <p className="mt-3 text-sm leading-6 text-white/62">
                  {plan.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10">
        <div>
          <SectionHeading eyebrow="FAQ" title="Built for clarity first.">
            The first release is a marketing site with a real validation API
            and database-ready shape. The storage adapter is intentionally
            isolated for the next production step.
          </SectionHeading>
          <RailAccent className="mt-8" />
        </div>
        <div className="grid gap-3">
          {faqItems.map((item) => (
            <article
              className="rounded-3xl border border-[var(--line)] bg-[var(--paper)] p-5 shadow-sm"
              key={item.question}
            >
              <h3 className="text-lg font-semibold tracking-[-0.03em] text-[var(--ink)]">
                {item.question}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-[2rem] bg-[var(--ink)] p-8 text-white shadow-[var(--shadow-soft)] sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9bd8c9]">
                Trial
              </p>
              <h2 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                Give your team one payment workflow they can actually follow.
              </h2>
            </div>
            <ButtonLink href="/start">Start free trial</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
