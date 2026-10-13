import { ButtonLink } from "@/components/button-link";

export default function NotFound() {
  return (
    <section className="mx-auto w-full max-w-3xl px-5 py-24 text-center sm:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-dark)]">
        Not found
      </p>
      <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] text-[var(--ink)]">
        This page is not part of the workflow.
      </h1>
      <p className="mt-5 text-base leading-7 text-[var(--muted)]">
        Return to the FlowPay home page or start the trial flow.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/" variant="secondary">
          Go home
        </ButtonLink>
        <ButtonLink href="/start">Start free trial</ButtonLink>
      </div>
    </section>
  );
}
