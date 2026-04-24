---
paths:
  - 'apps/**/payments/**'
  - 'apps/**/api/webhooks/**'
  - 'apps/**/api/checkout/**'
  - 'packages/shared/utils/format-currency.ts'
  - 'supabase/migrations/**payments**'
---

# Money & Currency Rules

- **Integer cents only, never floats.** USD in cents, NGN in kobo. `$25.00` is stored as `2500`. `₦15,000` is stored as `1500000`.
- **Single formatter location.** All display formatting goes through `packages/shared/utils/format-currency.ts`. No inline `toFixed()`, no ad-hoc formatting anywhere else.
- **Refund the exact charged amount** from the payment row. Never recompute the price — prices change, exchange rates change, but the amount charged is immutable.
- **Never convert between currencies in application code.** Exchange rates are display-only context. Each payment is denominated in exactly one currency.
- **The `amount_cents` column is the source of truth.** Any `amount` field displayed to the user is derived from this column via the shared formatter.

Reference: Money & Currency section of `CLAUDE.md` at repo root for full rules.
