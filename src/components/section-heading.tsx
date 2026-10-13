import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  children,
  center = false,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={cn(center && "mx-auto max-w-3xl text-center")}>
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-dark)]">
        {eyebrow}
      </p>
      <h2 className="text-balance mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] text-[var(--ink)] sm:text-5xl">
        {title}
      </h2>
      {children ? (
        <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)]">
          {children}
        </p>
      ) : null}
    </div>
  );
}
