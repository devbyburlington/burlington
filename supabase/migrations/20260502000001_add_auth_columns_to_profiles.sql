-- Add auth tracking columns to profiles
-- Used by ApplyForm to distinguish Google OAuth from email/password signups

alter table public.profiles add column if not exists auth_provider text default 'email';
alter table public.profiles add column if not exists has_set_password boolean default true;
alter table public.profiles add column if not exists client_ref text;
