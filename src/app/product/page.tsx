import { ButtonLink } from "@/components/button-link";
import { ProductWorkspaceMockup } from "@/components/mockups/product-mockups";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { productFeatures } from "@/lib/site-data";

export default function ProductPage() {
  return (
    <>
      <PageHero
        eyebrow="Product"
        title="One workspace for payment requests, quotes, and confirmations."
        description="FlowPay replaces fragmented payment handoffs with a shared operating layer that keeps context attached from first request to final receipt."
      >
        <ButtonLink href="/start">Start free trial</ButtonLink>
      </PageHero>
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <div>
          <SectionHeading
            eyebrow="Workspace"
            title="Readable state for every payment handoff."
          >
            The product page focuses on what teams need to understand: source,
            owner, value, approval state, payment method, verification status,
            and the next action.
          </SectionHeading>
          <div className="mt-8 grid gap-3">
            {productFeatures.map((feature) => (
              <div
                className="flex gap-3 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4"
                key={feature}
              >
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                <span className="text-sm font-medium leading-6 text-[var(--ink-soft)]">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
        <ProductWorkspaceMockup />
      </section>
    </>
  );
}
