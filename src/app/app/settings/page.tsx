import { updateSettings } from "@/app/app/actions";
import { requireMembership } from "@/lib/app-data";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const { supabase, user, membership, organization } = await requireMembership();
  const params = await searchParams;
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("display_name, email")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  const canUpdate = membership.role === "owner" || membership.role === "admin";

  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-dark)]">
        Settings
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink)]">
        Company account
      </h1>

      <form
        action={updateSettings}
        className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6 shadow-sm"
      >
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-[var(--ink)]">Your name</span>
          <input
            className="form-field"
            defaultValue={profile?.display_name ?? ""}
            disabled={!canUpdate}
            name="displayName"
            required
          />
        </label>
        <label className="mt-4 grid gap-2">
          <span className="text-sm font-semibold text-[var(--ink)]">Company name</span>
          <input
            className="form-field"
            defaultValue={organization.name}
            disabled={!canUpdate}
            name="organizationName"
            required
          />
        </label>
        <div className="mt-4 rounded-xl border border-[var(--line)] bg-white/70 p-4 text-sm text-[var(--muted)]">
          <p>Email: {profile?.email ?? user.email}</p>
          <p className="mt-1">Role: {membership.role}</p>
        </div>
        {params.error ? (
          <p className="mt-4 text-sm font-medium text-red-700">{params.error}</p>
        ) : null}
        {params.message ? (
          <p className="mt-4 text-sm font-medium text-[var(--accent-dark)]">
            {params.message}
          </p>
        ) : null}
        <button
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-dark)] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!canUpdate}
          type="submit"
        >
          Save settings
        </button>
      </form>
    </div>
  );
}
