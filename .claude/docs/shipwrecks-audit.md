# Shipwrecks Audit — How Our Build Plan Stacks Up

Audit of Burlington webapp docs (`CLAUDE.md` + `burlington-webapp-build-plan.md`) against the 37 Shipwrecks mistakes.

**Legend:**
- ✅ Fully covered
- 🟡 Partially covered — gap or weakness
- ❌ Not covered — must add

---

## 🔒 SECURITY (11 mistakes)

### 01. Auth tokens in localStorage — ✅
Supabase Auth handles sessions via httpOnly cookies by default. The `middleware.ts` pattern in CLAUDE.md uses `createMiddlewareClient` which uses cookies, not localStorage. Already secure.

### 02. No input sanitisation — ✅
Covered comprehensively. TL;DR rule #2 ("Zod validates every input"). Forms section mandates React Hook Form + Zod. Server Actions re-parse with Zod. Never Do section explicitly bans trusting client data. Supabase uses parameterised queries by default (no raw SQL from client code is in the Never Do list).

### 03. Hardcoded API keys in frontend — ✅
Environment Variables section explicitly flags `NEXT_PUBLIC_` prefix rule. Never Do bans hardcoded secrets. Webhooks section bans service role key in client code. CI/lint rules mentioned. Config system stores secrets as `is_sensitive`.

### 04. Stripe webhook signature verification — ✅
Webhook Idempotency section shows full verification pattern. Sprint 3 and 4 explicitly require signature verification. Dedicated handler pattern documented.

### 05. Sessions never expire — ✅
Sprint 12 covers session timeouts: portal 24h, admin 8h. "Sign out all devices" option. Sessions invalidate on password change implied via Supabase Auth.

### 06. Password reset links never expire — 🟡
**Gap:** CLAUDE.md doesn't explicitly specify reset token TTL. Supabase Auth defaults to 1 hour which is fine, but we haven't locked it down. **Fix needed:** explicit rule in Auth section — "password reset tokens expire in 60 minutes, invalidate on use, invalidate all on password change."

### 07. No CORS policy — 🟡
**Gap:** Not explicitly addressed. Next.js API routes default to same-origin but the chatbot proxy and webhooks need explicit CORS. **Fix needed:** add CORS rule to API Routes section — allowed origins whitelisted per route.

### 08. Admin routes with no role checks — ✅
Authentication section has `requireAdmin()` and `requireSuperAdmin()` patterns. Authorization Model in Admin Configuration System explicitly separates roles. RLS enforces at DB level AND application level (defence in depth). TL;DR rule #6 ("Never bypass auth"). This is strongly covered.

### 09. No CSRF protection — ✅
Next.js Server Actions have built-in CSRF protection. Security Checklist explicitly mentions "CSRF protection (Next.js Server Actions handle this automatically — don't bypass)." Covered.

### 10. Secrets committed to git history — 🟡
**Gap:** Environment Variables section says "Never commit `.env.local`" but we don't mandate git-secrets or gitleaks pre-commit hooks. **Fix needed:** add to pre-commit hooks in Git & Workflow section.

### 11. No Content Security Policy headers — ❌
**NOT COVERED.** We don't mention CSP, X-Frame-Options, X-Content-Type-Options anywhere. For a premium firm handling sensitive client data, this is a real gap. **Fix needed:** new subsection under Security or in Sprint 0 — CSP headers configured in `next.config.ts`, reporting mode first.

---

## ⚡ INFRASTRUCTURE (10 mistakes)

### 12. No rate limiting — 🟡
**Gap:** Mentioned once in Security Checklist ("Rate limiting on public endpoints") but not implemented. **Fix needed:** explicit section — Upstash Ratelimit or Vercel Edge rate limiting on auth endpoints, application form, chat proxy, and any public API routes.

### 13. No database connection pooling — ✅
Supabase handles connection pooling (PgBouncer built-in). Using Supabase's serverless-friendly client. Covered by default stack choice.

### 14. Images on your server / no CDN — ✅
Vercel handles image optimisation + CDN. `next/image` required by Performance Checklist. Supabase Storage for user uploads served via CDN. Covered.

### 15. Emails sent synchronously — ✅
This is exactly why Railway worker exists. Build Plan Sprint 0 and ongoing sprints queue emails through `pending_jobs`. Worker processes async. Explicitly called out as "short-lived Vercel functions can't block on email."

### 16. No health check endpoint — 🟡
**Gap:** Worker has `/health` but we don't mandate one on portal/admin Next.js apps. **Fix needed:** every app exposes `/api/health` returning 200 if DB connectivity works, 503 otherwise.

### 17. No logging in production — ✅
Logging & Observability section is comprehensive. Four log levels. Sentry integration required. Structured logging with IDs (not PII). Worker logs documented.

### 18. No env var validation at startup — ✅
Environment Variables section shows Zod schema pattern for validating at boot. `env.ts` file mandated. Fails fast with clear errors.

### 19. No graceful shutdown — 🟡
**Gap:** Worker section mentions SIGTERM briefly. Next.js apps on Vercel get this automatically. **Fix needed:** explicit SIGTERM handler in worker with shutdown timeout and in-flight job completion. Mostly covered but worth making explicit.

### 20. No retry logic with backoff — ❌
**NOT COVERED.** External API calls (Stripe, Paystack, NOWPayments, Resend, chatbot service) will fail sometimes. We have no written policy on retry behaviour. **Fix needed:** new section — External API Resilience. Exponential backoff with jitter for idempotent ops. Circuit breaker pattern for persistent failures. Max retry limits.

### 21. No request timeout on outbound calls — ❌
**NOT COVERED.** Related to #20. A hung Paystack API call shouldn't take down our worker. **Fix needed:** explicit timeout rules for every external call. Connect + read timeouts. Default 10s for most, 30s for payment confirms.

---

## 💾 DATA (6 mistakes)

### 22. No database indexing — ✅
Database Conventions section has explicit indexing rules. Every foreign key indexed. Every `WHERE`/`ORDER BY` column indexed. Example migrations show this pattern.

### 23. No pagination — 🟡
**Gap:** Performance Checklist mentions pagination briefly. Not a rule in database conventions. **Fix needed:** add to Database Conventions — every list endpoint paginates. Cursor-based for large tables (payments, audit_log). Default page size 20–50.

### 24. No backup strategy — ✅
Supabase Pro includes automated daily backups + point-in-time recovery up to 7 days. Sprint 12 security hardening mentions backup verification. Covered by stack choice but should be more explicit.

### 25. No soft deletes — 🟡
**Gap:** Never Do section says "never DROP tables in production, use soft deletes." But we haven't mandated `deleted_at` columns on key tables. **Fix needed:** add to Database Conventions — `deleted_at timestamptz` on tables where data recovery matters (profiles, clients, documents, engagements). NOT on append-only logs (audit_log, config_history).

### 26. No created_at / updated_at — ✅
Database Conventions explicitly mandates `created_at` and `updated_at` on every table. Triggers auto-update `updated_at`. Well covered.

### 27. Migrations with no rollback plan — 🟡
**Gap:** Migration rules say "never DROP" but we don't have explicit rollback / down migration patterns. **Fix needed:** add to Database Conventions — expand/contract pattern mandatory (add column in one migration, deploy code that uses it, remove old column in later migration). Never drop in the same deploy as code changes.

---

## ⚙️ CODE QUALITY (7 mistakes)

### 28. No error boundaries — 🟡
**Gap:** We mention `error.tsx` in folder structure but don't mandate error boundaries per major UI section. **Fix needed:** add to Architecture Principles — every route segment has `error.tsx`. Every major interactive component wrapped in an error boundary with graceful fallback.

### 29. No TypeScript on AI-generated code — ✅
This is our strongest area. TL;DR rule #1 after RLS. Code Style has full TypeScript section. Strict mode with inference. No `any`. Zod validates external data. Types generated from Supabase. For Claude Code section explicitly mandates strict types.

### 30. Trusting client-side validation only — ✅
Forms section mandates same Zod schema client + server. Server Actions re-parse. Never Do explicitly bans trusting form data without server validation. Well covered.

### 31. No CI/CD pipeline — 🟡
**Gap:** Git & Workflow mentions "must pass lint, typecheck, tests, build" but we don't mandate GitHub Actions setup. **Fix needed:** add explicit CI/CD section — GitHub Actions config for typecheck, lint, test, build on every PR. Vercel preview deploys automatic. Main branch protected.

### 32. No tests on critical paths — 🟡
**Gap:** Testing Strategy section exists but doesn't name the critical paths. **Fix needed:** explicit list of must-test paths — application submission, NDA signing, booking + payment, safelock deposit, engagement letter signing, role permission checks.

### 33. Console.log as debugging strategy — ✅
Logging section explicitly bans `console.log` in commits. Pre-commit hook catches it. Four-level logging with Sentry integration required.

### 34. No dependency pinning — ✅
Dependency Hygiene section explicitly mandates committing lockfiles. Caret ranges with lockfile. Dependabot/Renovate flagged. Covered.

---

## 🎨 UX (3 mistakes)

### 35. No loading states — ✅
TL;DR rule #9 ("Loading, empty, error states on every data fetch"). Dedicated section in Code Style. Skeleton/EmptyState/ErrorState components mandated in shared UI. Very strong.

### 36. No error handling on network failures — 🟡
**Gap:** We cover loading/empty/error states generally but don't explicitly handle offline/network drop for forms. Long application form could lose data. **Fix needed:** add to Forms section — autosave drafts to localStorage for multi-step forms (application, NDA, onboarding). Detect offline state.

### 37. No mobile responsiveness — ✅
TL;DR includes mobile-first. Code Style has mobile-first section. 44×44px tap targets. Test at 375px, 768px, 1280px. Responsive is first-class in our plan.

---

## Score Summary

| Category | Covered | Partial | Missing | Total |
|---|---|---|---|---|
| Security | 7 | 3 | 1 | 11 |
| Infrastructure | 5 | 3 | 2 | 10 |
| Data | 3 | 3 | 0 | 6 |
| Code | 4 | 3 | 0 | 7 |
| UX | 2 | 1 | 0 | 3 |
| **Total** | **21** | **13** | **3** | **37** |

**~57% fully covered, ~35% partial, ~8% missing entirely.**

Not bad for a pre-Sprint-0 document, but the gaps matter.

---

## Action Plan — Additions Needed

Priority-ordered by risk to Burlington:

### Critical (add immediately)

1. **#11 CSP headers** — missing entirely. Add to Sprint 0 or early Sprint 1. Configure in `next.config.ts`. Start report-only, tighten as violations are identified.

2. **#20 Retry logic with backoff** — missing entirely. New section in CLAUDE.md: "External API Resilience." Applies to Stripe, Paystack, NOWPayments, Resend, chatbot service.

3. **#21 Request timeouts** — missing entirely. Companion to #20. Every `fetch()` and SDK call has explicit timeout. Default 10s, payment confirms up to 30s.

### High (add before Sprint 0)

4. **#12 Rate limiting** — implementation plan needed. Upstash Ratelimit or Vercel Edge. Applied to: login, signup, application form, chat proxy, all public API routes.

5. **#07 CORS policy** — explicit allowed origins for webhooks and chatbot proxy. Default same-origin for everything else.

6. **#16 Health check endpoints** — mandate `/api/health` on portal and admin apps, not just worker. Returns DB connectivity status.

7. **#28 Error boundaries** — mandate `error.tsx` per route segment + boundaries around major interactive components.

### Medium (add during relevant sprint)

8. **#06 Password reset TTL** — lock down to 60 minutes, single-use, invalidate on password change. Add to Auth section.

9. **#10 Git pre-commit hooks** — add gitleaks/git-secrets to Husky config.

10. **#23 Pagination** — explicit rule in Database Conventions. Default 20, cursor-based for large tables.

11. **#25 Soft deletes** — mandate `deleted_at` columns on user-facing tables.

12. **#27 Expand/contract migrations** — add to Database Conventions as mandatory pattern.

13. **#31 CI/CD pipeline** — explicit GitHub Actions spec.

14. **#32 Critical path tests** — named list of must-test flows.

15. **#36 Form draft persistence** — autosave long forms to localStorage.

### Minor

16. **#19 Graceful shutdown** — make SIGTERM handler in worker more explicit.

17. **#24 Backup verification** — add restore testing to Sprint 12.

---

## What We Do Better Than the Checklist Demands

Worth noting — our plan covers things the 37 mistakes list doesn't touch, which strengthens our position further:

- **Row-Level Security** on every table — stronger than basic "admin routes with role checks"
- **Webhook idempotency** with dedup table — stronger than basic "verify signatures"
- **State machines** for status fields — prevents a class of bugs the checklist doesn't mention
- **Booking race conditions** handled at DB level — not in the checklist
- **Configuration system with approval gates** — prevents admin-error class of bugs
- **International-by-default** — entire class of bugs around hardcoded country/currency/date assumptions prevented
- **Contact channel policy** — architectural discipline, not just a technical rule
- **Audit log append-only** — compliance and forensics baseline
- **Money as integer cents everywhere** — prevents floating-point disaster
- **Premium client experience SLAs** — operational discipline as a feature

---

## The Real Grade

The Shipwrecks list is a good sanity check for the "vibe-coded MVP" audience. It's less useful as a ceiling for a premium platform handling $20K transactions.

Our plan already exceeds the list's bar in Security, Code, and UX. The gaps are concentrated in Infrastructure resilience (retries, timeouts, rate limits, CSP headers) and a few Data/Code discipline items (pagination, soft deletes, expand-contract migrations).

None of the gaps are structural — they're all addable without architectural changes. We can knock them out in one pass and the docs will be defensively complete.

**Recommendation:** Add the three Critical items now (CSP, retries, timeouts), queue the High items for Sprint 0 inclusion, and fold the Medium items into the relevant sprint specs. None require rework.
