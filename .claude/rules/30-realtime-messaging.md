---
paths:
  - 'apps/**/messages/**'
  - 'apps/**/chat/**'
  - 'apps/**/components/**Message**'
---

# Realtime Messaging Rules

- **Supabase Realtime for database subscriptions.** New messages, status changes, and conversation updates arrive via Realtime postgres_changes channels.
- **Broadcast channels for typing indicators.** Typing events are ephemeral — use Supabase broadcast, not database writes.
- **Presence channels for who's viewing.** Track which users are currently viewing a conversation via Supabase presence.
- **Typing broadcasts throttled to 1.5s minimum.** Do not broadcast on every keystroke. Debounce or throttle to at most one event per 1.5 seconds.
- **Read receipts via IntersectionObserver.** Mark messages as read when they scroll into view, not on page load.
- **Always clean up subscriptions on unmount.** Every `useEffect` that creates a Realtime subscription must return a cleanup function that unsubscribes. No leaked channels.
- **Polling fallback for stale WebSocket connections.** If Realtime disconnects, fall back to polling at 5-second intervals. Resume Realtime when connection recovers. Only poll when disconnected — never poll alongside an active WebSocket.

Reference: Realtime Messaging & Presence section of `CLAUDE.md` at repo root for full rules.
