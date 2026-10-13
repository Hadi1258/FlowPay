create extension if not exists pgcrypto;

create schema if not exists app_private;

create type public.organization_role as enum ('owner', 'admin', 'member');
create type public.member_status as enum ('active', 'invited', 'disabled');
create type public.workflow_status as enum (
  'request',
  'quote',
  'payment',
  'verification',
  'confirmed',
  'cancelled'
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  email text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.organization_role not null default 'member',
  status public.member_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, user_id)
);

create table public.workflows (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  customer_name text not null,
  amount_cents integer not null check (amount_cents > 0),
  currency char(3) not null default 'USD',
  description text not null default '',
  status public.workflow_status not null default 'request',
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workflow_events (
  id uuid primary key default gen_random_uuid(),
  workflow_id uuid not null references public.workflows(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  actor_id uuid not null references auth.users(id),
  event_type text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create table public.trial_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  work_email text not null,
  company text not null,
  role text not null,
  company_size text not null,
  workflow_volume text not null,
  message text not null default '',
  source text not null default 'website',
  created_at timestamptz not null default now()
);

create index organization_members_user_id_idx on public.organization_members(user_id);
create index organization_members_organization_id_idx on public.organization_members(organization_id);
create index workflows_organization_id_idx on public.workflows(organization_id);
create index workflows_status_idx on public.workflows(status);
create index workflow_events_workflow_id_idx on public.workflow_events(workflow_id);
create index workflow_events_organization_id_idx on public.workflow_events(organization_id);

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.workflows enable row level security;
alter table public.workflow_events enable row level security;
alter table public.trial_leads enable row level security;

create or replace function app_private.is_org_member(
  org_id uuid,
  allowed_roles public.organization_role[] default null
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.organization_members member
    where member.organization_id = org_id
      and member.user_id = (select auth.uid())
      and member.status = 'active'
      and (allowed_roles is null or member.role = any(allowed_roles))
  );
$$;

revoke all on function app_private.is_org_member(uuid, public.organization_role[]) from public;
grant execute on function app_private.is_org_member(uuid, public.organization_role[]) to authenticated;

create policy "Users can read own profile"
on public.profiles for select
to authenticated
using ((select auth.uid()) = id);

create policy "Users can insert own profile"
on public.profiles for insert
to authenticated
with check ((select auth.uid()) = id);

create policy "Users can update own profile"
on public.profiles for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy "Members can read organizations"
on public.organizations for select
to authenticated
using (app_private.is_org_member(id));

create policy "Owners and admins can update organizations"
on public.organizations for update
to authenticated
using (app_private.is_org_member(id, array['owner', 'admin']::public.organization_role[]))
with check (app_private.is_org_member(id, array['owner', 'admin']::public.organization_role[]));

create policy "Members can read organization memberships"
on public.organization_members for select
to authenticated
using (
  user_id = (select auth.uid())
  or app_private.is_org_member(organization_id)
);

create policy "Owners and admins can manage memberships"
on public.organization_members for update
to authenticated
using (app_private.is_org_member(organization_id, array['owner', 'admin']::public.organization_role[]))
with check (app_private.is_org_member(organization_id, array['owner', 'admin']::public.organization_role[]));

create policy "Members can read workflows"
on public.workflows for select
to authenticated
using (app_private.is_org_member(organization_id));

create policy "Owners and admins can create workflows"
on public.workflows for insert
to authenticated
with check (
  created_by = (select auth.uid())
  and app_private.is_org_member(organization_id, array['owner', 'admin']::public.organization_role[])
);

create policy "Owners and admins can update workflows"
on public.workflows for update
to authenticated
using (app_private.is_org_member(organization_id, array['owner', 'admin']::public.organization_role[]))
with check (app_private.is_org_member(organization_id, array['owner', 'admin']::public.organization_role[]));

create policy "Members can read workflow events"
on public.workflow_events for select
to authenticated
using (app_private.is_org_member(organization_id));

create policy "Owners and admins can create workflow events"
on public.workflow_events for insert
to authenticated
with check (
  actor_id = (select auth.uid())
  and app_private.is_org_member(organization_id, array['owner', 'admin']::public.organization_role[])
);

-- Public lead collection is performed by server-only service-role code.
-- Authenticated users do not receive direct table access by default.
