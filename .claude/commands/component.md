---
description: Scaffold a shared UI component in packages/ui
argument-hint: component name in PascalCase (e.g., AvailabilityCalendar)
---

Create `packages/ui/src/$ARGUMENTS/` with: `$ARGUMENTS.tsx` (the component), `$ARGUMENTS.test.tsx` (tests), `index.ts` (barrel export). Follow frontend-design skill conventions. Use design tokens from packages/design-tokens, never hardcode colours or spacing. Include proper TypeScript types for props as an interface. Include loading/empty/error states if the component fetches data.
