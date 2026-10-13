import { AppShell } from "@/components/app/app-shell";
import { requireMembership } from "@/lib/app-data";

export const dynamic = "force-dynamic";

export default async function ProtectedAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { membership, organization } = await requireMembership();

  return (
    <AppShell organizationName={organization.name} role={membership.role}>
      {children}
    </AppShell>
  );
}
