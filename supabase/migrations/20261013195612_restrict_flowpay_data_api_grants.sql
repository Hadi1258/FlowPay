-- Remove Supabase's broad default table grants before restoring the app's required access.
revoke all on public.profiles,
  public.organizations,
  public.organization_members,
  public.workflows,
  public.workflow_events,
  public.trial_leads from anon, authenticated;

grant select, insert, update on public.profiles to authenticated;
grant select, update on public.organizations to authenticated;
grant select, update on public.organization_members to authenticated;
grant select, insert, update on public.workflows to authenticated;
grant select, insert on public.workflow_events to authenticated;
