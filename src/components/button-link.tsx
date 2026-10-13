import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-[var(--accent)] text-white shadow-[0_14px_34px_rgba(22,131,111,0.22)] hover:bg-[var(--accent-dark)]",
  secondary:
    "border-[var(--line-strong)] bg-white/72 text-[var(--ink)] shadow-sm hover:bg-white",
  ghost:
    "border-transparent bg-transparent text-[var(--ink-soft)] hover:bg-black/[0.04]",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-full border px-5 text-sm font-semibold transition-colors duration-200",
        variants[variant],
        className,
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
