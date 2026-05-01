-- ============================================================
-- NDA SIGNATURE FIELDS on profiles
-- ============================================================
-- Sprint 0: Store NDA signature metadata directly on the profile.
-- Full nda_signatures table + PDF generation comes in a later sprint.

alter table public.profiles
  add column nda_signed_at timestamptz,
  add column nda_signature_name text,
  add column nda_signature_ip text,
  add column nda_signature_ua text;
