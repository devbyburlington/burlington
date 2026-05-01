-- Assessment leads captured from the free EB-1A self-assessment on the marketing site

create table public.assessment_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  country text,
  linkedin_url text,
  marketing_consent boolean default false,
  field_id text,
  tier text,
  criteria_met integer,
  criteria_total integer,
  score_pct numeric,
  created_at timestamptz default now()
);

alter table public.assessment_leads enable row level security;

create policy "No client access to assessment_leads"
  on public.assessment_leads for all
  to authenticated
  using (false);

create policy "Allow anonymous inserts to assessment_leads"
  on public.assessment_leads for insert
  to anon
  with check (true);

create index idx_assessment_leads_email on public.assessment_leads(email);
create index idx_assessment_leads_created on public.assessment_leads(created_at desc);
