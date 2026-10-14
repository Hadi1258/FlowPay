import { PageHero } from "@/components/page-hero";
import { resetPassword, signIn, signUp, updatePassword } from "@/app/auth/actions";

export default async function StartPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string; mode?: string }>;
}) {
  const params = await searchParams;
  const mode = params.mode === "signin" || params.mode === "reset" || params.mode === "update"
    ? params.mode
    : "signup";

  return (
    <>
      <PageHero
        eyebrow="Start FlowPay"
        title="Create your payment workflow workspace."
        description="Sign up to create a company account, invite your team later, and start tracking payment workflows with clear states and an audit trail."
      />
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-dark)]">
            Account access
          </p>
          <h2 className="text-balance mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] text-[var(--ink)]">
            Authentication is now the front door.
          </h2>
          <p className="mt-5 text-base leading-7 text-[var(--muted)]">
            New users create a secure account first, then set up a company
            workspace. Returning users can sign in and go straight to the app.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-[var(--muted)]">
            <p>One workspace is created for each new company.</p>
            <p>Owner, admin, and member roles are enforced by database policies.</p>
            <p>Workflow data stays scoped to the team account.</p>
          </div>
        </div>
        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--paper)] p-6 shadow-[var(--shadow-card)]">
          <div className="grid grid-cols-3 gap-2 rounded-full bg-[var(--paper-muted)] p-1 text-sm font-semibold">
            <a
              className={`rounded-full px-3 py-2 text-center ${mode === "signup" ? "bg-white text-[var(--ink)] shadow-sm" : "text-[var(--muted)]"}`}
              href="/start?mode=signup"
            >
              Sign up
            </a>
            <a
              className={`rounded-full px-3 py-2 text-center ${mode === "signin" ? "bg-white text-[var(--ink)] shadow-sm" : "text-[var(--muted)]"}`}
              href="/start?mode=signin"
            >
              Sign in
            </a>
            <a
              className={`rounded-full px-3 py-2 text-center ${mode === "reset" ? "bg-white text-[var(--ink)] shadow-sm" : "text-[var(--muted)]"}`}
              href="/start?mode=reset"
            >
              Reset
            </a>
          </div>

          {mode === "signup" ? <AuthForm action={signUp} submitLabel="Create account" withName /> : null}
          {mode === "signin" ? <AuthForm action={signIn} submitLabel="Sign in" /> : null}
          {mode === "reset" ? <ResetForm /> : null}
          {mode === "update" ? <UpdatePasswordForm /> : null}

          {params.error ? (
            <p className="mt-4 text-sm font-medium text-red-700">{params.error}</p>
          ) : null}
          {params.message ? (
            <p className="mt-4 text-sm font-medium text-[var(--accent-dark)]">
              {params.message}
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
}

function AuthForm({
  action,
  submitLabel,
  withName = false,
}: {
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
  withName?: boolean;
}) {
  return (
    <form action={action} className="mt-6 grid gap-4">
      {withName ? (
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[var(--ink)]">Name</span>
          <input className="form-field" name="name" required />
        </label>
      ) : null}
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-[var(--ink)]">Email</span>
        <input className="form-field" name="email" required type="email" />
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-[var(--ink)]">Password</span>
        <input className="form-field" minLength={8} name="password" required type="password" />
      </label>
      <button
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-dark)]"
        type="submit"
      >
        {submitLabel}
      </button>
    </form>
  );
}

function ResetForm() {
  return (
    <form action={resetPassword} className="mt-6 grid gap-4">
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-[var(--ink)]">Email</span>
        <input className="form-field" name="email" required type="email" />
      </label>
      <button
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-dark)]"
        type="submit"
      >
        Send reset link
      </button>
    </form>
  );
}

function UpdatePasswordForm() {
  return (
    <form action={updatePassword} className="mt-6 grid gap-4">
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-[var(--ink)]">New password</span>
        <input className="form-field" minLength={8} name="password" required type="password" />
      </label>
      <button
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-dark)]"
        type="submit"
      >
        Update password
      </button>
    </form>
  );
}
