import Link from "next/link";
import { footerGroups } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_auto_auto] lg:px-10">
        <div>
          <Link className="inline-flex items-center gap-3" href="/">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--ink)]">
              <span className="h-2 w-5 rounded-full bg-[var(--accent-soft)]" />
            </span>
            <span className="text-xl font-semibold tracking-[-0.04em] text-[var(--ink)]">
              FlowPay
            </span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-[var(--muted)]">
            Payment workflow automation for teams that need requests,
            verification, payment links, and confirmation states in one place.
          </p>
        </div>
        {footerGroups.map((group) => (
          <div key={group.title}>
            <h2 className="text-sm font-semibold text-[var(--ink)]">
              {group.title}
            </h2>
            <div className="mt-4 grid gap-2">
              {group.links.map((link) => (
                <Link
                  className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-[var(--line)] px-5 py-5 text-center text-xs text-[var(--muted)]">
        FlowPay demo site. Original animation archived in /archive.
      </div>
    </footer>
  );
}
