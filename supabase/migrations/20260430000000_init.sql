-- ============================================================
-- Burlington Consult — Initial Schema
-- Sprint 0: profiles, addresses, pending_jobs, processed_webhooks
-- ============================================================

-- Reusable trigger function for updated_at columns
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;


-- ============================================================
-- ADDRESSES (must exist before profiles references it)
-- ============================================================

create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid,  -- FK added after profiles table exists
  address_line_1 text not null,
  address_line_2 text,
  city text not null,
  administrative_area text,
  postal_code text,
  country_iso text not null,
  created_at timestamptz default now()
);

alter table public.addresses enable row level security;


-- ============================================================
-- PROFILES (extends auth.users)
-- ============================================================

create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  given_name text,
  family_name text,
  preferred_name text,
  email text not null,
  phone_e164 text,
  country_citizenship_iso text,
  country_residence_iso text,
  timezone text,
  preferred_currency text default 'usd',
  address_id uuid references public.addresses,
  linkedin_url text,
  employer text,
  job_title text,
  field_industry text,
  highest_education text,
  immigration_goal text,
  interested_product text,
  how_heard text,
  referral_source text,
  ambition_statement text,
  status text default 'pending',
  assigned_adviser uuid references public.profiles,
  role text default 'client',
  is_founder boolean default false,
  marketing_consent boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Now add the FK from addresses back to profiles
alter table public.addresses
  add constraint addresses_profile_id_fkey
  foreign key (profile_id) references public.profiles on delete cascade;

alter table public.profiles enable row level security;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();


-- ============================================================
-- AUTH TRIGGER: auto-create profile on signup
-- ============================================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ============================================================
-- PENDING_JOBS (worker queue)
-- ============================================================

create table public.pending_jobs (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  payload jsonb not null default '{}',
  status text default 'pending',
  run_after timestamptz default now(),
  started_at timestamptz,
  completed_at timestamptz,
  failed_at timestamptz,
  error_message text,
  attempts integer default 0,
  max_attempts integer default 3,
  created_at timestamptz default now()
);

alter table public.pending_jobs enable row level security;


-- ============================================================
-- PROCESSED_WEBHOOKS (idempotency)
-- ============================================================

create table public.processed_webhooks (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  event_id text not null,
  event_type text not null,
  processed_at timestamptz default now(),
  result text not null,
  error_message text,
  unique (provider, event_id)
);

alter table public.processed_webhooks enable row level security;


-- ============================================================
-- RLS POLICIES
-- ============================================================

-- Profiles: clients read/update own row
create policy "Users can view own profile"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- Profiles: super admins have full access
create policy "Super admins have full access to profiles"
  on public.profiles for all
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'super_admin'
    )
  );

-- Profiles: admins can read all profiles
create policy "Admins can read all profiles"
  on public.profiles for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'super_admin')
    )
  );

-- Addresses: users manage own addresses
create policy "Users can view own addresses"
  on public.addresses for select
  to authenticated
  using (profile_id = auth.uid());

create policy "Users can insert own addresses"
  on public.addresses for insert
  to authenticated
  with check (profile_id = auth.uid());

create policy "Users can update own addresses"
  on public.addresses for update
  to authenticated
  using (profile_id = auth.uid())
  with check (profile_id = auth.uid());

-- Addresses: super admins have full access
create policy "Super admins have full access to addresses"
  on public.addresses for all
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'super_admin'
    )
  );

-- Pending jobs: server-only (no client access)
-- Workers use service_role key, so no authenticated policies needed
create policy "No client access to pending_jobs"
  on public.pending_jobs for all
  to authenticated
  using (false);

-- Processed webhooks: server-only
create policy "No client access to processed_webhooks"
  on public.processed_webhooks for all
  to authenticated
  using (false);


-- ============================================================
-- INDEXES
-- ============================================================

create index idx_profiles_email on public.profiles(email);
create index idx_profiles_status on public.profiles(status);
create index idx_profiles_role on public.profiles(role);
create index idx_profiles_assigned_adviser on public.profiles(assigned_adviser);
create index idx_addresses_profile_id on public.addresses(profile_id);
create index idx_pending_jobs_status_run_after on public.pending_jobs(status, run_after) where status = 'pending';
create index idx_processed_webhooks_lookup on public.processed_webhooks(provider, event_id);
