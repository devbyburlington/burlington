-- Human-readable client reference ID (e.g. BRL-000001)
-- Used in UI, emails, and support — UUID stays as the internal PK
-- The trigger auto-generates this on new user creation

create sequence public.client_ref_seq start with 1;

alter table public.profiles
  add column client_ref text unique;

-- Backfill existing rows
update public.profiles
  set client_ref = 'BRL-' || lpad(nextval('public.client_ref_seq')::text, 6, '0')
  where client_ref is null;

alter table public.profiles
  alter column client_ref set not null;

-- Update the trigger to auto-assign client_ref on new user creation
-- This replaces the version from 20260430000004 and adds client_ref
create or replace function public.handle_new_user()
returns trigger as $$
declare
  _provider text;
  _ref text;
begin
  _provider := coalesce(new.raw_app_meta_data ->> 'provider', 'email');
  _ref := 'BRL-' || lpad(nextval('public.client_ref_seq')::text, 6, '0');

  insert into public.profiles (id, full_name, email, auth_provider, has_set_password, client_ref)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email,
    _provider,
    _provider = 'email',
    _ref
  );
  return new;
end;
$$ language plpgsql security definer;
