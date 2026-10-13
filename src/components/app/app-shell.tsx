import Link from "next/link";
import { signOut } from "@/app/auth/actions";

export function AppShell({
  children,
  organizationName,
  role,
}: {
  children: React.ReactNode;
  organizationName: string;
  role: string;
}) {
  return (
    <div className="min-h-screen bg-[#f4f1e9]">
      <aside className="border-b border-[var(--line)] bg-[var(--ink)] text-white lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 lg:border-b-0 lg:border-r lg:border-white/10">
        <div className="flex h-full flex-col px-5 py-5">
          <Link className="flex items-center gap-3" href="/app">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[var(--ink)]">
              <span className="h-2 w-5 rounded-full bg-[var(--accent)]" />
            </span>
            <span className="text-xl font-semibold tracking-[-0.04em]">FlowPay</span>
          </Link>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
            <p className="text-sm font-semibold">{organizationName}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/50">{role}</p>
          </div>
          <nav className="mt-6 grid gap-1 text-sm font-medium text-white/70">
            <AppNavLink href="/app">Dashboard</AppNavLink>
            <AppNavLink href="/app/workflows">Workflows</AppNavLink>
            <AppNavLink href="/app/settings">Settings</AppNavLink>
            <AppNavLink href="/">Public site</AppNavLink>
          </nav>
          <form action={signOut} className="mt-6 lg:mt-auto">
            <button
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/12 bg-white/[0.06] px-4 text-sm font-semibold text-white transition-colors hover:bg-white/[0.1]"
              type="submit"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <div className="lg:pl-72">
        <main className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}

function AppNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      className="rounded-xl px-3 py-2 transition-colors hover:bg-white/[0.08] hover:text-white"
      href={href}
    >
      {children}
    </Link>
  );
}
