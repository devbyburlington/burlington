---
paths:
  - 'apps/admin/**'
  - 'apps/**/settings/**'
  - 'packages/shared/config/**'
---

# Admin Configuration System Rules

- **Nothing hardcoded that Chris might want to change.** Prices, team members, pricing tiers, feature flags, country lists, currency activations, copy snippets, stats — all admin-editable through config tables. If Chris might plausibly want to change it without a developer, it's config, not code.
- **Chris (`is_founder=true`) bypasses approval gates.** His changes take effect immediately unless he opts into the preview flow.
- **Other super admins need Chris's approval for high-risk changes:**
  - Price drops greater than 20%
  - Currency activation/deactivation
  - Payment provider toggles
  - Team member deactivation
- **Draft → Preview → Publish for content changes.** Admins can preview changes before they go live. Published changes are logged in `config_history`.
- **Scheduled changes supported** via `scheduled_changes` table. Admins can set a future effective date for config changes.
- **All config changes are audited.** Every change writes to `config_history` with who changed what, when, and the before/after values.
- **Sensitive config values** (API keys, secrets) are marked `is_sensitive` and never exposed to the client.

Reference: Admin Configuration System section of `CLAUDE.md` at repo root for full rules.
