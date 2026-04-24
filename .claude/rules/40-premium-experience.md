# Premium Client Experience Rules

**Scope:** All UX work across portal, admin, and marketing site.

Burlington is a premium consulting firm handling high-stakes immigration cases. Every interaction reflects that.

- **British English spelling.** Honour, colour, organisation, specialise. Consistent across all UI text, emails, and documentation.
- **Sober, warm, direct tone.** Professional but not cold. Confident but not arrogant. Clear but not terse.
- **No exclamation marks** in product text. Confidence doesn't need emphasis.
- **No emoji in product text.** Not in UI labels, not in emails, not in error messages, not in notifications. Code comments and internal tooling are the only exceptions.
- **Response time SLAs tracked and visible.** Clients should always know when to expect a response. Display SLA status in the portal.
- **Loading, empty, and error states on every data fetch.** No screen ever blanks out or hangs. The user always knows what's happening. Use skeleton loaders, not spinners, for content areas.
- **Accessibility is not optional.** Semantic HTML, ARIA labels where needed, keyboard navigation, sufficient colour contrast. WCAG 2.1 AA minimum.
- **44×44px minimum tap targets** on mobile. No tiny links or buttons.

Reference: Premium Client Experience Standards section of `CLAUDE.md` at repo root for full rules.
