import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="flow-shell relative overflow-hidden border-b border-[var(--line)]">
      <div className="soft-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-dark)]">
            {eyebrow}
          </p>
          <h1 className="text-balance mt-5 text-[2.7rem] font-semibold leading-[1.02] tracking-[-0.04em] text-[var(--ink)] sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            {description}
          </p>
        </div>
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
