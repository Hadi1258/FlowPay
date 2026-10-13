import { redirect } from "next/navigation";
import { completeOnboarding } from "@/app/onboarding/actions";
import { getPrimaryMembership, requireUser } from "@/lib/app-data";

export const dynamic = "force-dynamic";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { supabase, user } = await requireUser();
  const membership = await getPrimaryMembership(supabase, user.id);
  const params = await searchParams;

  if (membership) {
    redirect("/app");
  }

  const defaultName =
    typeof user.user_metadata.display_name === "string"
      ? user.user_metadata.display_name
      : "";

  return (
    <section className="mx-auto grid w-full max-w-5xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-dark)]">
          Workspace setup
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-[-0.04em] text-[var(--ink)]">
          Create the company workspace your team will use.
        </h1>
        <p className="mt-5 text-base leading-7 text-[var(--muted)]">
          This creates your profile, company account, and owner membership. More
          team management can be added after the core workflow is in place.
        </p>
      </div>
      <form
        action={completeOnboarding}
        className="rounded-[2rem] border border-[var(--line)] bg-[var(--paper)] p-6 shadow-[var(--shadow-card)]"
      >
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[var(--ink)]">Your name</span>
          <input
            className="form-field"
            defaultValue={defaultName}
            name="displayName"
            required
          />
        </label>
        <label className="mt-4 grid gap-2">
          <span className="text-sm font-semibold text-[var(--ink)]">Company name</span>
          <input className="form-field" name="organizationName" required />
        </label>
        {params.error ? (
          <p className="mt-4 text-sm font-medium text-red-700">{params.error}</p>
        ) : null}
        <button
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-dark)]"
          type="submit"
        >
          Create workspace
        </button>
      </form>
    </section>
  );
}
