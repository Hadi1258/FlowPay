import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { navItems } from "@/lib/site-data";
import { createClient } from "@/lib/supabase/server";

export async function SiteHeader() {
  let isAuthenticated = false;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    isAuthenticated = Boolean(user);
  } catch {
    isAuthenticated = false;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(247,244,237,0.84)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex items-center justify-between gap-4">
          <Link
            aria-label="FlowPay home"
            className="group flex items-center gap-3"
            href="/"
          >
            <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-[var(--ink)] text-white shadow-sm">
              <span className="absolute h-16 w-16 rounded-full border border-white/18" />
              <span className="relative h-2 w-5 rounded-full bg-[var(--accent-soft)]" />
            </span>
            <span className="text-xl font-semibold tracking-[-0.04em] text-[var(--ink)]">
              FlowPay
            </span>
          </Link>
          <ButtonLink className="max-[480px]:hidden lg:hidden" href={isAuthenticated ? "/app" : "/start"}>
            {isAuthenticated ? "Open app" : "Start free trial"}
          </ButtonLink>
        </div>
        <nav
          aria-label="Primary navigation"
          className="flex gap-1 overflow-x-auto text-sm font-medium text-[var(--ink-soft)] lg:items-center lg:overflow-visible"
        >
          {navItems.map((item) => (
            <Link
              className="whitespace-nowrap rounded-full px-2 py-2 transition-colors hover:bg-white/70 hover:text-[var(--ink)] min-[480px]:px-3"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink href="/pricing" variant="ghost">
            View pricing
          </ButtonLink>
          <ButtonLink href={isAuthenticated ? "/app" : "/start"}>
            {isAuthenticated ? "Open app" : "Start free trial"}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
