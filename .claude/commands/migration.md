---
description: Create a new Supabase migration with proper conventions
argument-hint: migration name (e.g., add-safelock-table)
---

Create a new migration file at `supabase/migrations/$(date +%Y%m%d%H%M%S)_$ARGUMENTS.sql`. Template must include: table definition with uuid primary key, created_at/updated_at columns, RLS enable statement, all required RLS policies inline, indexes for foreign keys. After creation, remind the user to run `pnpm db:types` to regenerate types.
