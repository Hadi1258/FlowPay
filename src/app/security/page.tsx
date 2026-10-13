import { ButtonLink } from "@/components/button-link";
import { SecurityStackMockup } from "@/components/mockups/product-mockups";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { securityFeatures } from "@/lib/site-data";

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Security"
        title="Verification, approvals, and payment state stay visible."
        description="FlowPay does not turn sensitive financial work into vague colored badges. It separates the checks that matter and keeps the operational timeline readable."
      >
        <ButtonLink href="/start">Start free trial</ButtonLink>
      </PageHero>
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div>
          <SectionHeading
            eyebrow="Controls"
            title="Calm surfaces for high-stakes handoffs."
          >
            Security is presented as clear state and accountability, not as
            decorative lock icons or distracting neon.
          </SectionHeading>
          <div className="mt-8 grid gap-4">
            {securityFeatures.map((feature) => (
              <article
                className="rounded-3xl border border-[var(--line)] bg-[var(--paper)] p-5 shadow-sm"
                key={feature.title}
              >
                <h3 className="text-lg font-semibold tracking-[-0.03em] text-[var(--ink)]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
        <SecurityStackMockup />
      </section>
    </>
  );
}
