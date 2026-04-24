---
description: Load context for a specific sprint or phase
argument-hint: sprint/phase identifier (e.g., 0, 3, -1, -1a)
---

Read `.claude/docs/build-plan.md` and find the section matching "$ARGUMENTS". The identifier may be:

- A plain integer (e.g., `3`) — look for "Sprint 3"
- Zero (`0`) — look for "Sprint 0"
- A negative number (e.g., `-1`) — look for "Phase -1" (pre-sprint work)
- An alphanumeric identifier (e.g., `-1a`, `-1b`, `-2`) — look for the matching phase, workstream, or sub-section within Phase -1

Search for headings containing "Sprint $ARGUMENTS", "Phase $ARGUMENTS", or "Workstream" references that match. Extract everything under that heading until the next heading of the same level.

Summarise the goal, tasks, tables touched, and dependencies. Confirm you've also re-read CLAUDE.md. State the current sprint/phase you're working on clearly.
