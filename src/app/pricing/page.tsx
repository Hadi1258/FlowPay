import { ButtonLink } from "@/components/button-link";
import { PricingCards } from "@/components/mockups/product-mockups";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple public plans for the first product story."
        description="Use Starter, Growth, and Scale to make the website feel complete while the trial form collects the details needed for real production pricing."
      >
        <ButtonLink href="/start">Start free trial</ButtonLink>
      </PageHero>
      <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <PricingCards />
      </section>
      <section className="mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">
        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--paper)] p-8 shadow-sm">
          <SectionHeading
            center
            eyebrow="Included"
            title="Every plan keeps the same calm workflow foundation."
          >
            Public pricing is intentionally simple here. The site can later
            connect the trial API to a database, billing provider, and sales
            workflow without changing the front-end conversion path.
          </SectionHeading>
        </div>
      </section>
    </>
  );
}
