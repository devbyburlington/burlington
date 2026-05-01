-- Track auth provider and whether user has set a password
-- Google OAuth users start with has_set_password = false
-- They can set one later via profile settings

alter table public.profiles
  add column auth_provider text not null default 'email',
  add column has_set_password boolean not null default true;

-- Update the trigger to detect OAuth signups and set fields accordingly
create or replace function public.handle_new_user()
returns trigger as $$
declare
  _provider text;
begin
  _provider := coalesce(new.raw_app_meta_data ->> 'provider', 'email');

  insert into public.profiles (id, full_name, email, auth_provider, has_set_password)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email,
    _provider,
    _provider = 'email'
  );
  return new;
end;
$$ language plpgsql security definer;
