import { ButtonLink } from "@/components/button-link";
import { PageHero } from "@/components/page-hero";
import { RailAccent } from "@/components/rail-accent";
import { SectionHeading } from "@/components/section-heading";
import { aboutValues } from "@/lib/site-data";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="FlowPay is designed around financial clarity."
        description="This demo positions FlowPay as a focused fintech workflow product: modern, direct, restrained, and clear enough for real business users."
      >
        <ButtonLink href="/start">Start free trial</ButtonLink>
      </PageHero>
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10">
        <div>
          <SectionHeading
            eyebrow="Design"
            title="Modern does not need to be loud."
          >
            The new visual system removes the neon palette, wide serif display
            type, and overactive glow in favor of hierarchy, contrast, and
            quieter interaction.
          </SectionHeading>
          <RailAccent className="mt-8" />
        </div>
        <div className="grid gap-4">
          {aboutValues.map((value) => (
            <article
              className="rounded-3xl border border-[var(--line)] bg-[var(--paper)] p-6 shadow-sm"
              key={value.title}
            >
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--ink)]">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
