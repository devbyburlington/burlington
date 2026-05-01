-- Enforce one phone number per account
create unique index idx_profiles_phone_unique
  on public.profiles (phone_e164)
  where phone_e164 is not null;
