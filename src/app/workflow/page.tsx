import { ButtonLink } from "@/components/button-link";
import { FlowAnimation } from "@/components/flow/flow-animation";
import { PaymentTimelineMockup } from "@/components/mockups/product-mockups";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";

export default function WorkflowPage() {
  return (
    <>
      <PageHero
        eyebrow="Workflow"
        title="A toned-down flow that explains progress instead of performing it."
        description="The original rail animation has been rebuilt as a responsive React component with slower state changes, less glow, and controls that make each step clear."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/start">Start free trial</ButtonLink>
          <ButtonLink href="/product" variant="secondary">
            View product
          </ButtonLink>
        </div>
      </PageHero>
      <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <FlowAnimation />
      </section>
      <section className="border-y border-[var(--line)] bg-[var(--paper)]">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <SectionHeading
            eyebrow="Structure"
            title="The same visual language works when the page is still."
          >
            Smaller workflow accents reuse the same rail, dot, and status-card
            language without forcing every section to move.
          </SectionHeading>
          <PaymentTimelineMockup />
        </div>
      </section>
    </>
  );
}
