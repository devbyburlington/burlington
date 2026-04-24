---
paths:
  - 'supabase/migrations/**'
  - 'apps/**/lib/db/**'
  - 'packages/shared/supabase/**'
---

# Database Schema Rules

- **RLS on every table.** Row-Level Security is enabled in the same migration that creates the table. Every new table migration includes RLS policies inline. No exceptions.
- **Expand-then-contract for schema changes.** Add the new column/table in one migration, deploy code that uses it, remove the old column in a later migration. Never drop and replace in the same deploy.
- **Integer cents for money columns.** All monetary amounts stored as `bigint` cents/kobo. See `10-money-and-currency.md`.
- **`timestamptz` for all timestamps.** Never `timestamp without time zone`. Store in UTC, display in user's timezone.
- **Soft delete with `deleted_at`.** User-facing tables (profiles, clients, documents, engagements) use `deleted_at timestamptz` instead of hard deletes. Append-only tables (audit_log, config_history) do not need soft delete.
- **Indexes on every foreign key.** If a column references another table, it gets an index in the same migration.
- **Cursor-based pagination** for high-churn tables (payments, audit_log, messages). Offset pagination acceptable for low-volume admin lists.
- **Regenerate types** with `pnpm db:types` after any migration. Never hand-edit generated type files.
- **`created_at` and `updated_at`** on every table. `updated_at` auto-set via trigger.
- **UUID primary keys.** `id uuid primary key default gen_random_uuid()`.

Reference: Database Conventions section of `CLAUDE.md` at repo root for full rules.
