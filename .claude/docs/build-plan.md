# Burlington Consult — Web Application Build Plan

**Document type:** Engineering build plan  
**Audience:** Adonai Jonathan (lead engineer), Stanley Ojima (UI/UX designer), Chris Ogbodo (founder)  
**Last updated:** April 2026  
**Status:** Planning complete. Awaiting design delivery and legal clearances before Sprint 1.

## Contributors

| Name | Role | Responsibility |
|---|---|---|
| **Chris Ogbodo** | Founder | Product direction, client strategy, legal and compliance decisions, final approval on pricing and content |
| **Adonai Jonathan** | Lead Engineer | Full-stack engineering, database architecture, infrastructure, deployment, all code contributions |
| **Stanley Ojima** | UI/UX Designer | Design system, component library, page layouts, visual design, UX flows |

All code authored and committed by Adonai Jonathan. All design direction and visual assets authored by Stanley Ojima. Product decisions, brand direction, and legal sign-off by Chris Ogbodo.

---

## Overview

Three client-facing properties, one internal worker, one monorepo.

| Property | URL | Purpose |
|---|---|---|
| Marketing site | burlingtonconsult.com | Next.js app (rewritten from static HTML). Public, SEO-optimised, content-driven. |
| Client portal | app.burlingtonconsult.com | Next.js app. Where clients apply, pay, track cases, message team. |
| Admin panel | admin.burlingtonconsult.com | Next.js app. Where team manages everything; Chris runs operations. |
| Background worker | (Railway, no public URL) | Node.js service for scheduled jobs, long-running tasks, email batches. |

### Positioning

Burlington is a global firm that happens to be based in Lagos and Delaware. Every design and build decision in this plan assumes an international client base — Nigerian professionals, yes, and also Indian researchers, British executives, Canadian clinicians, Brazilian founders, Filipino nurses, Chinese engineers. The infrastructure supports local payment rails (Paystack for Nigeria) alongside international rails (Stripe, NOWPayments) because clients are everywhere.

This means: comprehensive country lists, timezone-aware booking, culturally-flexible name and address handling, currency selection at checkout (not assumed), and content that reads as internationally neutral rather than Nigeria-first or U.S.-first. See the "International by Default" section of the engineering conventions document for the governing principles.

---

## Stack

| Layer | Tool | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR for gated pages, API routes for webhooks/payments, deploys natively on Vercel |
| Database | Supabase (Postgres) | Auth, RLS, storage, realtime, $25/mo Pro |
| Styling | Tailwind CSS | Matches marketing site design language |
| Payments | Stripe SDK | Rest of world (USD, cards) |
| Payments | Paystack SDK | Nigeria (NGN, capped fees) |
| Payments | Flutterwave SDK | Ghana (GHS), Kenya (KES), South Africa (ZAR), wider Africa |
| Payments | NOWPayments SDK | Stablecoins (USDC, USDT) — available everywhere |
| Background jobs | Railway (Node.js worker) | Long-running tasks, cron, queued jobs |
| Email | Resend | Transactional (confirmations, receipts, notifications) |
| AI | Internal chatbot service (proxied) | RAG chatbot — knowledge base + LLM. See chatbot API spec. |
| Hosting | Vercel Pro | Frontend + API routes. Auto-deploy from monorepo. |
| Security | Cloudflare Pro | WAF, DDoS, rate limiting, SSL |
| Monitoring | Sentry (free tier) | Error tracking |

**First-class African payment markets at launch:** Nigeria (Paystack), Ghana, Kenya, South Africa (Flutterwave). All other regions via Stripe; stablecoin option available everywhere via NOWPayments.

**Deferred to post-launch:** React Native mobile app (if demand warrants), additional regional wallets (Razorpay for India, Pix for Brazil, etc.).

---

## Monorepo Structure

```
burlington-app/
├── apps/
│   ├── portal/                 # Client-facing app (app.burlingtonconsult.com)
│   │   ├── app/
│   │   │   ├── (auth)/         # Auth pages (login, signup, forgot-password)
│   │   │   ├── (public)/       # Public pages (apply, status-check)
│   │   │   ├── (onboarding)/   # Post-approval onboarding flow
│   │   │   ├── (dashboard)/    # Authenticated client pages
│   │   │   │   ├── page.tsx            # Dashboard home
│   │   │   │   ├── book/               # Consultation booking
│   │   │   │   ├── safelock/           # Safelock management
│   │   │   │   ├── documents/          # Document uploads
│   │   │   │   ├── messages/           # Team messaging
│   │   │   │   ├── payments/           # Payment history
│   │   │   │   ├── referrals/          # Referral dashboard
│   │   │   │   ├── engagement/         # Engagement letter, case status
│   │   │   │   └── settings/           # Profile, notifications, lawyer access
│   │   │   ├── api/
│   │   │   │   ├── webhooks/
│   │   │   │   │   ├── stripe/route.ts
│   │   │   │   │   └── paystack/route.ts
│   │   │   │   ├── checkout/route.ts
│   │   │   │   ├── chat/route.ts       # Chatbot service proxy
│   │   │   │   └── nda/generate/route.ts
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   ├── lib/
│   │   └── next.config.ts
│   │
│   └── admin/                  # Admin panel (admin.burlingtonconsult.com)
│       ├── app/
│       │   ├── (auth)/
│       │   ├── (dashboard)/
│       │   │   ├── page.tsx            # Revenue dashboard
│       │   │   ├── applications/       # Review queue
│       │   │   ├── clients/            # Client list + detail
│       │   │   ├── bookings/           # Calendar + list
│       │   │   ├── payments/           # All transactions
│       │   │   ├── safelocks/          # Active safelocks
│       │   │   ├── installments/       # Active plans (Phase 2)
│       │   │   ├── team/               # Scheduling + management
│       │   │   ├── chatbot/            # AI conversation inbox
│       │   │   ├── referrals/          # Referral management
│       │   │   └── audit/              # Audit log
│       │   └── layout.tsx
│       ├── components/
│       ├── lib/
│       └── next.config.ts
│
├── packages/
│   └── shared/                 # Shared between portal + admin
│       ├── types/              # TypeScript types (generated from Supabase)
│       ├── utils/              # Helpers, formatters, validators
│       ├── supabase/           # Supabase client, helpers
│       └── constants/          # Pricing tiers, status enums, config
│
├── supabase/
│   ├── migrations/             # SQL migration files (sequential)
│   ├── seed.sql                # Dev seed data
│   └── config.toml
│
├── turbo.json
├── package.json
└── .env.local                  # Supabase URL, anon key, Stripe keys, etc.
```

---

## Database Schema

All tables below. Each sprint section references which tables it touches.

### Core Tables

```sql
-- Extends Supabase auth.users
create table public.profiles (
  id uuid references auth.users primary key,
  full_name text not null,                -- Single field; user controls formatting
  given_name text,                        -- Optional, for legal docs (NDA, engagement letter)
  family_name text,                       -- Optional, for legal docs
  preferred_name text,                    -- What to greet them by in emails
  email text not null,
  phone_e164 text,                        -- E.164 format: +2348032966493
  country_citizenship_iso text,           -- ISO 3166-1 alpha-2: "NG", "US", "GB"
  country_residence_iso text,             -- ISO 3166-1 alpha-2
  timezone text,                          -- IANA timezone: "Africa/Lagos", "America/New_York"
  preferred_currency text default 'usd',  -- 'usd' | 'ngn' | 'gbp' | 'eur' | etc.
  address_id uuid references public.addresses,
  linkedin_url text,
  employer text,
  current_role text,
  field_industry text,
  highest_education text,
  immigration_goal text,
  interested_product text,
  how_heard text,
  referral_source text,
  ambition_statement text,                -- "What would you like the power to do?"
  status text default 'pending',          -- pending | approved | waitlisted | rejected
  assigned_adviser uuid references public.profiles,
  role text default 'client',             -- client | adviser | admin | super_admin
  marketing_consent boolean default false, -- GDPR: opt-in for marketing emails
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- International-friendly address schema (flexible, no US-specific fields)
create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles,
  address_line_1 text not null,
  address_line_2 text,
  city text not null,
  administrative_area text,               -- state / province / county / region / LGA
  postal_code text,                       -- not required in all countries
  country_iso text not null,              -- ISO 3166-1 alpha-2
  created_at timestamptz default now()
);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  applicant_id uuid references public.profiles not null,
  form_data jsonb not null,          -- Full application snapshot
  status text default 'pending',     -- pending | approved | waitlisted | rejected
  review_notes text,
  rejection_reason text,
  correction_steps text,
  decided_by uuid references public.profiles,
  decided_at timestamptz,
  created_at timestamptz default now()
);

create table public.ndas (
  id uuid primary key default gen_random_uuid(),
  applicant_id uuid references public.profiles not null,
  signature_name text not null,      -- Typed full name
  signed_at timestamptz default now(),
  document_url text,                 -- Stored PDF in Supabase storage
  ip_address text,
  user_agent text
);
```

### Consultation & Booking

```sql
create table public.adviser_profiles (
  id uuid references public.profiles primary key,
  tier text not null,                -- founder | director | senior | specialist | assessment
  hourly_rate integer not null,      -- USD cents
  display_name text not null,
  title text,
  bio text,
  avatar_url text,
  is_bookable boolean default true,
  calendar_settings jsonb            -- Available days/times, blocked dates
);

create table public.consultations (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.profiles not null,
  adviser_id uuid references public.profiles not null,
  tier text not null,
  duration_minutes integer default 60,
  scheduled_at timestamptz not null,
  meeting_link text,
  status text default 'pending',     -- pending | confirmed | completed | cancelled | no_show
  notes text,                        -- Post-consultation notes (adviser)
  payment_id uuid references public.payments,
  created_at timestamptz default now()
);
```

### Payments

```sql
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.profiles not null,
  provider text not null,            -- stripe | paystack
  provider_ref text,                 -- Stripe payment_intent ID or Paystack reference
  amount_usd integer not null,       -- USD cents
  amount_local integer,              -- Local currency minor units (kobo for NGN)
  currency text default 'usd',
  type text not null,                -- consultation | retainer | safelock_deposit | installment | assessment
  status text default 'pending',     -- pending | completed | failed | refunded
  metadata jsonb,                    -- Tier, adviser, consultation_id, safelock_id, etc.
  created_at timestamptz default now()
);
```

### Safelock

```sql
create table public.safelocks (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.profiles not null,
  target_product text not null,      -- specialist | senior | director | founder | retainer
  target_amount integer not null,    -- USD cents
  locked_price integer not null,     -- Price locked at enrollment date
  total_deposited integer default 0, -- USD cents accumulated
  min_monthly integer not null,      -- Minimum monthly deposit (USD cents)
  max_months integer not null,
  status text default 'active',      -- active | completed | forfeited | refunded
  last_deposit_at timestamptz,
  activated_at timestamptz,          -- When balance hit target
  forfeiture_notice_sent_at timestamptz,
  created_at timestamptz default now()
);

create table public.safelock_deposits (
  id uuid primary key default gen_random_uuid(),
  safelock_id uuid references public.safelocks not null,
  payment_id uuid references public.payments not null,
  amount integer not null,           -- USD cents
  created_at timestamptz default now()
);
```

### Engagement

```sql
create table public.engagements (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.profiles not null,
  type text not null,                -- retainer | standard
  scope text,
  total_fee integer not null,        -- USD cents
  payment_schedule jsonb,            -- Milestone breakdown
  letter_url text,                   -- Signed PDF
  signed_at timestamptz,
  status text default 'draft',       -- draft | sent | signed | active | completed | terminated
  created_at timestamptz default now()
);

create table public.engagement_milestones (
  id uuid primary key default gen_random_uuid(),
  engagement_id uuid references public.engagements not null,
  label text not null,               -- "First Instalment", "Second Instalment", etc.
  amount integer not null,
  trigger_description text,
  payment_id uuid references public.payments,
  status text default 'pending',     -- pending | invoiced | paid
  due_at timestamptz,
  paid_at timestamptz
);
```

### Documents

```sql
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.profiles not null,
  type text not null,                -- cv | certificate | award | media | publication | letter | other
  filename text not null,
  storage_path text not null,        -- Supabase storage path
  file_size integer,
  mime_type text,
  status text default 'uploaded',    -- uploaded | reviewed | approved | rejected
  reviewed_by uuid references public.profiles,
  review_notes text,
  created_at timestamptz default now()
);
```

### Communication

```sql
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null,     -- Groups messages between client + team
  sender_id uuid references public.profiles,
  sender_type text not null,         -- client | team | ai
  content text not null,
  is_resolved boolean default false,
  resolved_by uuid references public.profiles,
  created_at timestamptz default now()
);

create table public.chat_conversations (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.profiles,
  source text not null,              -- portal | marketing_site
  visitor_email text,                -- For unauthenticated marketing site visitors
  status text default 'open',        -- open | resolved | escalated
  assigned_to uuid references public.profiles,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### Referrals

```sql
create table public.referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid references public.profiles not null,
  referral_code text unique not null,
  referral_link text not null,
  referred_email text,
  referred_id uuid references public.profiles, -- Set when referred person applies
  discount_type text,                -- flat | percentage
  discount_amount integer,           -- USD cents or percentage * 100
  status text default 'pending',     -- pending | applied | converted | expired
  created_at timestamptz default now()
);
```

### Audit

```sql
create table public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles not null,
  action text not null,              -- application.approved, client.reassigned, payment.refunded, etc.
  target_type text,                  -- application | client | payment | safelock | engagement | team
  target_id uuid,
  metadata jsonb,                    -- Before/after values, reason, etc.
  ip_address text,
  created_at timestamptz default now()
);
```

### Lawyer Access

```sql
create table public.lawyer_access (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.profiles not null,
  lawyer_name text not null,
  lawyer_email text not null,
  access_token text unique not null, -- Secure random token for read-only link
  documents_visible text[] default '{}', -- Array of document types visible
  is_active boolean default true,
  created_at timestamptz default now(),
  revoked_at timestamptz
);
```

---

## Sprint Plan

### Pre-Build Checklist

Before Sprint 0 begins, these must be in place:

| Item | Owner | Status |
|---|---|---|
| Marketing site cleanup complete (see Phase -1) | Adonai | Not started |
| Marketing site Tailwind migration complete (see Phase -1) | Adonai | Not started |
| Supabase project created (Pro plan) | Adonai | Not started |
| Vercel Pro — two project slots reserved (portal + admin) | Adonai | Not started |
| Stripe account — API keys, webhook endpoint URL decided | Chris | Not started |
| Paystack account — API keys, webhook endpoint URL decided | Chris | Not started |
| Resend account — domain verified (burlingtonconsult.com) | Adonai | Not started |
| Cloudflare — DNS records for app. and admin. subdomains | Adonai | Not started |
| Figma designs — P0 screens delivered | Designer | Pending |
| Domain config — app.burlingtonconsult.com + admin.burlingtonconsult.com DNS | Adonai | Not started |
| Sentry project created | Adonai | Not started |

**Decisions needed from Chris before build:**

1. Pricing reconciliation — confirm $500 assessment, $250–$1,000/hr consultation tiers, $20K Standard + $50K Money-Back engagement options
2. Firm contact email — lock in `hello@` or `inquiries@burlingtonconsult.com`
3. Meeting platform — Zoom Business or Google Meet?
4. NDA template — final version from legal?
5. Referral terms reconciliation — proposal PDF says 40%/$5K, live site says 10–20%, which is canonical for the app?

---

### Phase -1: Marketing Site Preparation (Weeks -3 to -1)

**Goal:** The marketing site is clean, on-brand, fully aligned with the Contact Channel Policy, and migrated to Tailwind CSS before the webapp build begins. This is pre-Sprint-0 work but is genuinely Sprint 0's foundation — without it, the webapp launches into a confused marketing context.

**Why this phase matters:**

The current marketing site has accumulated decisions that no longer hold (Nkem as co-founder, $75/$150 pricing, 40%/$5K referrals, individual team emails everywhere). The webapp will redirect users from the marketing site into the app at multiple CTAs. If the marketing site is inconsistent when users land, the premium positioning breaks before they ever reach the app.

Additionally, the webapp uses Tailwind. If the marketing site stays on plain CSS + inline styles, we end up with two design systems, two sets of design tokens, and a jarring visual break when users navigate from `burlingtonconsult.com` to `app.burlingtonconsult.com`. Migrating now costs less than migrating later.

**Phase -1 is three parallel workstreams over three weeks.** They can overlap — cleanup (Workstream A) blocks nothing else, Tailwind migration (Workstream B) can run in parallel, and content refresh (Workstream C) uses outputs from both.

---

#### Workstream A: Content Cleanup (Week -3)

**Priority: Complete before any other Phase -1 work.** This is removing things that shouldn't be there.

**A1: Nkem removal (finish what today's commit missed)**

Per the April 24 audit, today's cleanup commit missed three files:

- `signatures.html` — Nkem's full signature block at lines 88–105
- `headshots/index.html` — Nkem card with photo, name, "Co-founder" role
- `advisor-kb.json` — Full entry under `founders.nkem` (the chatbot will still answer questions about Nkem as co-founder)

Also: three image files still in the repo that should be deleted.

- `nkem-opt.jpg` (57KB)
- `team-nkem.jpg` (86KB)  
- `headshots/nkem.jpg` (9KB)

Deliverable: one commit removing all remaining Nkem references and image files. Verify with `grep -rl "nkem\|Nweke" --include="*.html" --include="*.json"` returning zero results.

**A2: Contact Channel Policy enforcement**

Two layers of cleanup:

**Layer 1 — Footer email (39 files):**  
Replace `founder@burlingtonconsult.com` with the firm-level contact (Chris to confirm: `hello@burlingtonconsult.com` or `inquiries@burlingtonconsult.com`) across every page's footer. This is a shared template — one change applied 39 times, ideally via a build-time include if we restructure the site.

**Layer 2 — Individual team emails on profile pages (8 files):**  
Remove `mailto:` links to individual team member emails on every `/team/*.html` profile page:
- `team/adonai.html`
- `team/afiong.html`
- `team/chibuike.html` (Onyia)
- `team/chisom.html`
- `team/efezino.html`
- `team/michael.html`
- `team/paschal.html`
- `team/stanley.html`

Replace with a single firm contact CTA: "To reach our team, start an inquiry at [firm email]." Or better — replace with a link to the chatbot once it's live.

**Exception:** `signatures.html` is an internal tool (for team members to copy email signatures). Keep team emails there, but add `<meta name="robots" content="noindex">` and a password gate if it's publicly accessible.

**A3: Pricing update in the advisor knowledge base**

`advisor-kb.json` still has old pricing ($75 assessment, $150 consultation). The chatbot is currently answering visitor questions with stale prices.

Update to reflect current confirmed pricing:
- Assessment: $500 (1 hour, credited toward engagement)
- Consultations: tiered ($250 Specialist / $350 Senior / $500 Director / $500 Assessment / $1,000 Founder)
- Engagement: $20,000 Standard / $50,000 Money-Back Guarantee

Include the 25% limited-time discount messaging if that's still running on the marketing site.

**A4: Careers form fix**

Current form (`careers.html`) submits to Web3Forms with no error handling, no redirect URL, and Web3Forms-free-tier file upload limits likely causing the bug Rufus reported.

Fix options (Adonai picks):

1. **Minimum fix:** Add `<input type="hidden" name="redirect" value="https://burlingtonconsult.com/careers-thanks">` plus create a `careers-thanks.html` page. Solves the silent-failure UX.

2. **Better fix:** Rewrite as a `fetch()` call with proper error handling (like `book.html` does) — shows inline success/error messages, no page redirect.

3. **Best fix:** Add client-side file size validation before submit (warn if CV > 1MB, since Web3Forms free tier chokes). Or upgrade the Web3Forms plan.

Recommendation: option 2 + option 3 combined. Takes 30 minutes.

**A5: Pricing consistency audit across all pages**

Before the webapp launches, every mention of pricing on the marketing site must match. A client seeing "$85 assessment" on the homepage and "$500 assessment" in the app starts confused.

Grep for all pricing mentions:
- `\$[0-9]+` across all HTML files
- "consultation" / "assessment" / "engagement" adjacent to prices
- Proposal PDF references

Produce a single canonical pricing table, then update every page to match.

---

#### Workstream B: Tailwind Migration (Weeks -3 and -2)

**Goal:** Migrate the marketing site from plain CSS + inline styles to Tailwind CSS. By end of Phase -1, the marketing site shares design tokens with the webapp.

**Why now:**

- The free EB-1A assessment (built in React/Tailwind) goes live on the marketing site in Sprint 0. If the rest of the site is on different CSS, the assessment page visually fights its surroundings.
- When the webapp launches and users navigate between `burlingtonconsult.com` and `app.burlingtonconsult.com`, shared design tokens make the transition feel seamless.
- Maintenance going forward is dramatically easier — one design system, one source of truth.
- Migrating this many pages later is exponentially more work once the site has grown further.

**B1: Set up Tailwind infrastructure (Day 1)**

The current site is static HTML served from Vercel. Two approaches:

**Option 1: Build step with Tailwind CLI** (simpler, recommended)
- Add Tailwind CSS via npm
- Configure `tailwind.config.ts` with Burlington's design tokens (teal `#0D9488` / `#2DD4BF`, ink `#040A0F`, Playfair Display + Inter fonts)
- Build step outputs a single `style.css` that replaces the existing one
- No framework change — still static HTML, just styled differently
- Vercel's build command runs `tailwindcss -i input.css -o dist/style.css` before deploying

**Option 2: Migrate to Astro or Next.js static export** (more work, more benefits)
- Move content into components
- Easier footer/nav template maintenance (one file, not 39)
- Better MDX support for Knowledge Center
- But: significantly more work. Defer to post-launch.

Recommendation: **Option 1** for Phase -1. Visit Option 2 after the webapp is live if maintenance burden warrants it.

**B2: Design token setup**

Create `tailwind.config.ts` matching the design system documented in the engineering conventions. Burlington palette, typography scale, spacing, the works.

```ts
// tailwind.config.ts — Phase -1 scope
export default {
  content: ['./**/*.html'],
  theme: {
    extend: {
      colors: {
        teal: { light: '#2DD4BF', DEFAULT: '#0D9488', dark: '#0F766E' },
        ink: { DEFAULT: '#040A0F', soft: '#0A1420', muted: '#1A2838' },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
}
```

**B3: Page-by-page migration (Weeks -3 to -2)**

Order of migration (by priority):

**Tier 1 — High-traffic core (migrate first):**
- `index.html` (homepage)
- `about.html`
- `team.html`
- `services.html`
- `book.html`
- `assess.html`

**Tier 2 — Secondary pages:**
- `faq.html`
- `cases.html`
- `pathways.html`
- `careers.html`
- `resources.html`
- `niw.html`
- `eb1a.html`
- `dual-petition.html`
- `eb1a-creatives.html`

**Tier 3 — Legal and ancillary:**
- `privacy.html`
- `terms.html`
- `disclaimer.html`
- `booking-confirmed.html`
- `404.html`

**Tier 4 — Team profile pages (8 files):**
- All `/team/*.html` — these share a template, so migrating one cleanly means the others follow fast

**Tier 5 — Knowledge Center articles (7 files):**
- All `/resources/*.html`

**Migration approach per page:**

1. Pull the page into a working branch
2. Inspect the existing styles (mostly in `style.css` + inline)
3. Rewrite using Tailwind utility classes
4. Compare before/after screenshots at 375px, 768px, 1280px
5. Verify no layout regressions
6. Ship to preview deploy
7. Visual QA against live site
8. Merge

For `pathways.html` specifically — this was already flagged in memory as needing a style rework to match the dark mockup. Tailwind migration is the perfect moment to do this.

**B4: Shared template consolidation**

During migration, extract the repeating footer, nav, and hero patterns into reusable HTML includes (via Vercel's build step or a simple preprocessor like `handlebars` or plain JS string templates).

This is the single highest ROI engineering move available on the marketing site. Right now updating the footer means editing 39 files. After consolidation, it's one file.

Suggested structure:
```
marketing-site/
├── src/
│   ├── pages/          # Source HTML with template placeholders
│   │   ├── index.html
│   │   ├── about.html
│   │   └── ...
│   ├── partials/       # Reusable pieces
│   │   ├── nav.html
│   │   ├── footer.html
│   │   ├── cta-book.html
│   │   └── ticker.html
│   ├── styles/
│   │   └── input.css   # Tailwind entry
│   └── scripts/
├── dist/               # Build output (what Vercel serves)
├── tailwind.config.ts
└── package.json
```

Build script (runs before Vercel deploy):
1. Runs Tailwind CSS to compile `input.css` → `dist/style.css`
2. Processes each `src/pages/*.html`, inlining `{{partial:name}}` placeholders
3. Copies assets (images, fonts) to `dist/`
4. Vercel serves `dist/`

---

#### Workstream C: Content Refresh (Week -1)

**Goal:** Update marketing site content to reflect confirmed pricing, international positioning, and the refreshed team structure.

**C1: Services page alignment**

Update `services.html` to match the confirmed pricing and product structure from the webapp build:

- Assessment: $500 (1 hour, credited)
- Consultation tiers: $250 / $350 / $500 / $1,000 by adviser tier
- Engagement Standard: $20,000
- Engagement Money-Back Guarantee: $50,000
- Referral terms: confirmed terms (Chris to lock in 40%/$5K vs 10–20% vs new scheme)

**C2: International positioning**

Currently the site is Nigeria-heavy. Update framing per the International by Default principles:

- Hero copy: "Burlington Consult works with exceptional professionals across Africa and beyond" (not Nigeria-exclusive)
- Cases page (`cases.html`): broaden representative profiles to span multiple African countries + India + UK/US (stay honest — only add what's truthfully representative)
- Remove unnecessary Nigeria-specific framing where it excludes other nationals
- Proposal PDF template (`Burlington_Consult_Standard_Proposal_Template.pdf`): generalise the travel restriction section — the current version reads as Nigeria-only

**C3: CTA updates pointing to the app**

Every CTA that currently goes to a marketing-site form needs updating:

| Current | New |
|---|---|
| `/book` (Stripe Payment Link) | Stays until Sprint 3 ships, then redirects to `app.burlingtonconsult.com/book` |
| `/assess` (Web3Forms + Stripe) | Stays until free assessment ships in Sprint 0, then the free assessment lives here and upgrade goes to `app.burlingtonconsult.com/assess/full` |
| `mailto:founder@` | Replaced with firm email per Workstream A |
| Individual `mailto:adviser@` | Removed per Workstream A |

Most of these stay pointing at the current destinations until the corresponding webapp feature ships. Phase -1's job is to have the content and structure ready for the redirect — not to do the redirect yet.

**C4: Free assessment landing page prep**

The free EB-1A assessment tool goes live on the marketing site in Sprint 0. Phase -1 prepares its home:

- Confirm URL: `burlingtonconsult.com/assess` (keep current slug — semantic)
- Current `/assess` page becomes a brief landing that links into the tool
- Or: the current `/assess` content becomes the upgrade target (`/assess/full`) and `/assess` becomes the tool itself

Structural decision for Chris/Adonai. Either works.

**C5: Knowledge Center readiness**

Seven articles live. Before webapp launch:

- Each article's author attribution uses `team_profiles` patterns (so when we move to config-driven content in Sprint 10, the migration is easy)
- Thumbnails follow the Option C style pattern from memory (bold CSS patterns, oversized single letter, teal glow) for consistency
- Category tags are standardised (not ad-hoc)
- OG image: always the standard dark teal `og-image.png` — no page-specific OG images

---

#### Phase -1 Deliverables

At end of Phase -1 (before Sprint 0 begins):

- [ ] All Nkem references removed from all files (including `signatures.html`, `headshots/index.html`, `advisor-kb.json`)
- [ ] Nkem image files deleted
- [ ] `founder@burlingtonconsult.com` replaced with firm email on all 39 files
- [ ] Individual team emails removed from 8 profile pages
- [ ] Chatbot knowledge base (`advisor-kb.json`) updated with current pricing
- [ ] Careers form bug fixed (error handling, file size validation)
- [ ] All marketing site pricing aligned to confirmed values
- [ ] Tailwind CSS installed and configured with Burlington design tokens
- [ ] All Tier 1 pages migrated to Tailwind (homepage, about, team, services, book, assess)
- [ ] All Tier 2–5 pages migrated to Tailwind
- [ ] Shared partials (nav, footer, CTAs) extracted — one source of truth
- [ ] Footer email change happens once, propagates everywhere
- [ ] International positioning updated (hero, cases, proposal PDF)
- [ ] Services page reflects confirmed pricing and product structure
- [ ] Lighthouse scores maintained or improved on all migrated pages
- [ ] Visual regression testing passed — no layout breakages
- [ ] Marketing site ready to accept the free assessment tool in Sprint 0

**Estimated duration:** 3 weeks with Adonai focused. Can compress to 2 weeks if Tailwind migration gets prioritised and content refresh runs in parallel.

---

### Sprint 0 — Scaffold (Week 1)

**Goal:** Both apps deploy on Vercel. Worker deploys on Railway. Auth works. Database exists. Free assessment tool goes live on marketing site.

**Tasks:**

1. Initialize Turborepo monorepo
   - `apps/portal` — Next.js 14, App Router, Tailwind (app.burlingtonconsult.com)
   - `apps/admin` — Next.js 14, App Router, Tailwind (admin.burlingtonconsult.com)
   - `apps/worker` — Node.js service for scheduled + queued jobs
   - `packages/shared` — TypeScript types, Supabase client, constants, Zod schemas

2. Supabase setup
   - Create project (Pro tier, choose region based on target client base — likely US East or EU West)
   - Run initial migration (profiles table + auth trigger)
   - Configure auth (email/password + magic link)
   - Set up storage buckets: `ndas`, `documents`, `engagement-letters`, `avatars`
   - Write RLS policies for profiles table
   - Create `pending_jobs` table for worker queue

3. Auth flow (both apps)
   - Login page (email + password)
   - Magic link login
   - Password reset
   - Auth middleware (protect dashboard routes)
   - Session management with timezone detection

4. Vercel deployment
   - Connect monorepo
   - Configure portal → app.burlingtonconsult.com
   - Configure admin → admin.burlingtonconsult.com
   - Environment variables per app

5. Railway worker deployment
   - Connect worker to Railway
   - Basic scheduler (node-cron) + queue processor running
   - Health endpoint for Railway probes
   - Sentry error tracking integrated

6. Shared design system
   - Tailwind config with Burlington palette (dark teal system)
   - Playfair Display + Inter fonts self-hosted via next/font
   - Base components: Button, Input, Card, Modal, Badge, Toast
   - Layout components: Sidebar, TopNav, PageHeader
   - State components: Skeleton, EmptyState, ErrorState

7. International foundations (critical — see the engineering conventions: International by Default)
   - Country dropdown sourced from full ISO 3166-1 list (minus sanctions blocklist)
   - `libphonenumber-js` integrated with country-code picker
   - Timezone detection from browser + stored per profile
   - `date-fns` + `date-fns-tz` wired in for all date work
   - `Intl.NumberFormat` for currency display (USD and NGN at launch)

8. Sanctions blocklist (OFAC compliance — must be in place before Sprint 1)
   - Seed `country_blocklist` table with OFAC-restricted countries (Iran, North Korea, Cuba, Syria, specific regions)
   - Country picker components read from this list and exclude blocked entries
   - Application endpoint re-validates server-side (defence in depth)

9. Free EB-1A assessment tool on marketing site
   - Deploy the assessment React component (see `eb1a-assessment.jsx` prototype) to `burlingtonconsult.com/assess`
   - Lightweight, no backend required for the core flow
   - Email capture endpoint that writes leads to Supabase (via a public API route in the portal)
   - CTA at the bottom links to `app.burlingtonconsult.com/assess/full` for the $500 deep assessment
   - Google Analytics events for completion, score distribution, upgrade clicks

**Deliverable:**
- Two deployed Next.js apps on Vercel with working login
- Railway worker running with health checks passing
- Supabase database with profiles, pending_jobs, country_blocklist tables
- Free assessment tool live on the marketing site capturing leads
- All international foundations in place (country, timezone, phone, currency, dates)

**Tables touched:** `profiles`, `pending_jobs`, `country_blocklist`, `assessment_leads` (leads captured from free assessment)

---

### Sprint 1 — Application Form + NDA (Weeks 2–3)

**Goal:** A visitor can apply and sign the NDA. Application appears in admin queue.

**International-first requirements apply throughout this sprint.** See the engineering conventions: "International by Default".

**Portal tasks:**

1. Public application page (`/apply`)
   - Split-screen layout (branding left, form right)
   - Multi-step form: personal info → professional info → immigration goals → referral source
   - Form validation (Zod schema)

   **Form field specifics:**
   - **Full name** (single field, required, 2–100 chars, accepts Unicode)
   - **Preferred name** (optional — how Burlington should greet them in emails)
   - **Email** (required, validated)
   - **Phone** (country code picker + national number, stored as E.164 via `libphonenumber-js`)
   - **Country of citizenship** (full ISO 3166-1 list, no default)
   - **Country of residence** (full ISO 3166-1 list, may differ from citizenship)
   - **Timezone** (auto-detected from browser via `Intl.DateTimeFormat().resolvedOptions().timeZone`, editable)
   - **LinkedIn URL** (optional)
   - **Employer** and **current role** (free text)
   - **Field/industry** (dropdown: Science/Research, Technology/Engineering, Business/Finance, Law/Public Policy, Medicine/Healthcare, Arts/Media/Creative, Other)
   - **Highest education** (dropdown)
   - **Immigration goal** (dropdown: EB-1A, EB-2 NIW, Dual Petition, Exploring, Other)
   - **How heard about Burlington** (dropdown + free text)
   - **Referral source** (optional)
   - **Marketing consent** (checkbox, default unchecked: "Send me Burlington's occasional immigration strategy brief")

   - Submit to Supabase (creates profile + application record)
   - Redirect to NDA signing page

2. NDA signing page (`/nda`)
   - Display auto-generated NDA with applicant details populated
   - Scroll-to-read with signature field at bottom
   - Electronic signature (typed full name, must match full name on application)
   - Store signed NDA as PDF in Supabase storage (private bucket)
   - Record IP address, user agent, and timezone

3. Application status page (`/status`)
   - Holding screen with status indicator
   - Pending → "Under review. 48-hour target." (shown in user's timezone)
   - Approved → Redirect to onboarding
   - Waitlisted → "You're on our waitlist" with context
   - Rejected → Show reason + correction steps + reapply CTA

**Admin tasks:**

1. Application queue page (`/applications`)
   - List view: name, field, country of citizenship (flag + ISO), country of residence, date applied (in admin's timezone), status
   - Filters: pending, approved, waitlisted, rejected
   - Filter by country, field, date range
   - Sort by date

2. Application detail view (`/applications/[id]`)
   - Full application data
   - Both citizenship and residence countries shown clearly
   - Timezone awareness: all timestamps show in admin's timezone with applicant's timezone as a secondary label
   - NDA status (signed / not signed)
   - Decision panel: Approve / Waitlist / Reject
   - Rejection requires reason + correction steps (mandatory fields)
   - Decision triggers email to applicant via Resend (rendered in applicant's timezone for any time-sensitive content)

3. Email templates (Resend)
   - Application received confirmation
   - Application approved
   - Application waitlisted
   - Application rejected (with reason)
   - All emails render times in recipient's timezone; all addresses display per recipient's locale

**Tables touched:** `profiles`, `addresses`, `applications`, `ndas`

**API routes:**
- `POST /api/applications` — submit application
- `POST /api/nda/generate` — generate NDA PDF
- `POST /api/nda/sign` — record signature
- `PATCH /api/applications/[id]/decide` — admin decision

---

### Sprint 2 — Onboarding + Dashboard (Weeks 4–5)

**Goal:** Approved clients go through onboarding and land on a personalized dashboard.

**Portal tasks:**

1. Onboarding flow (sequential screens, one-time only)
   - Screen 1: "What would you like the power to do?" — Full-screen, large serif text, single text input, save to `profiles.ambition_statement`
   - Screen 2: Complete professional profile — Fill any gaps from application (publications, awards, speaking, affiliations)
   - Screen 3: Choose your path — Three cards: "Book a Consultation" / "Start a Safelock" / "Explore the Platform"
   - Screen 4: → Dashboard

2. Client dashboard (`/dashboard`)
   - Personalized greeting with name
   - Quick actions: Book Consultation, Upload Document, Message Team
   - Status cards: Application status, next consultation, safelock progress (if active), unread messages
   - Recent activity feed

3. Profile page (`/settings/profile`)
   - View and edit professional details
   - Change password
   - Notification preferences

**Admin tasks:**

1. Client list page (`/clients`)
   - Table: name, status, assigned adviser, field, last activity
   - Search + filter by status, adviser, field
   - Role-based visibility (admins see own clients, super admins see all)

2. Client detail page (`/clients/[id]`)
   - Full profile view
   - Application history
   - NDA status
   - Ambition statement
   - Assignment dropdown (super admin only)
   - Activity timeline

3. Client assignment
   - Super admin assigns adviser to client
   - Assignment logged in audit log
   - Client notified via email

**Tables touched:** `profiles` (update ambition_statement, assigned_adviser), `audit_log`

---

### Sprint 3 — Consultation Booking + Stripe (Weeks 6–7)

**Goal:** Clients can book consultations, pay via Stripe, and receive confirmation.

**Portal tasks:**

1. Booking page (`/book`)
   - Tier selection cards: Founder ($1,000/hr), Director ($500/hr), Senior ($350/hr), Specialist ($250/hr), Assessment ($500/hr)
   - Each card shows adviser name, photo, title, availability indicator
   - Select tier → see available time slots

2. Adviser availability calendar
   - Read adviser calendar settings from `adviser_profiles`
   - Show available 1-hour slots for next 14 days
   - Block already-booked slots
   - Client selects date + time

3. Checkout flow
   - Booking summary (adviser, tier, date/time, price)
   - Stripe Checkout Session via API route
   - Redirect to Stripe-hosted checkout
   - Success page with booking confirmation
   - Failure page with retry option

4. Booking confirmation
   - Email to client (date, time, adviser, meeting link)
   - Email to adviser (date, time, client name, profile link)
   - Calendar invite attachment (ICS file)

5. My bookings page (`/bookings`)
   - Upcoming consultations
   - Past consultations
   - Cancel / reschedule (24-hour policy)

**Admin tasks:**

1. Bookings page (`/bookings`)
   - Calendar view (week/month)
   - List view with filters (adviser, status, date range)
   - Click booking → detail with client profile link

2. Adviser scheduling (`/team/schedule`)
   - Set available days and time blocks
   - Block specific dates
   - View own upcoming bookings

**API routes:**
- `POST /api/checkout` — Create Stripe Checkout Session
- `POST /api/webhooks/stripe` — Handle payment_intent.succeeded, checkout.session.completed
- `GET /api/availability/[adviserId]` — Return available slots

**Tables touched:** `adviser_profiles`, `consultations`, `payments`

**Integration:** Stripe Checkout (not Payment Links — full control over success/cancel URLs and metadata)

---

### Sprint 4 — African Payments (Paystack + Flutterwave) (Weeks 8–9)

**Goal:** First-class payment experience for African clients. Nigerian clients pay in NGN via Paystack. Ghanaian, Kenyan, and South African clients pay in their local currency via Flutterwave. Every African market has a native payment rail at launch — not a Stripe fallback.

**Why this expanded scope:** Burlington's priority African markets are Nigeria, Ghana, Kenya, and South Africa. Paystack covers Nigeria well but is limited elsewhere. Flutterwave covers the other three markets natively (local cards, bank transfer, mobile money). Launching with both means African clients never see "USD only" at checkout.

**Tasks:**

1. **Paystack checkout flow (Nigeria)**
   - Initialize transaction via Paystack API
   - Redirect to Paystack-hosted payment page (or use inline widget)
   - Handle callback URL
   - Verify transaction server-side via Paystack verify API
   - Webhook handler at `POST /api/webhooks/paystack` with signature verification

2. **Flutterwave checkout flow (Ghana, Kenya, South Africa)**
   - Initialize transaction via Flutterwave API (`v3/payments`)
   - Support local cards, bank transfer, mobile money (M-Pesa for Kenya)
   - Callback URL handling with verification
   - Webhook handler at `POST /api/webhooks/flutterwave` with `verif-hash` signature check
   - Handle `charge.completed` event

3. **GeoIP-based currency detection**
   - Use Vercel's `x-vercel-ip-country` header
   - Country → currency + provider mapping:
     - NG → NGN / Paystack
     - GH → GHS / Flutterwave
     - KE → KES / Flutterwave
     - ZA → ZAR / Flutterwave
     - All others → USD / Stripe
   - Manual override via currency/method selector always available

4. **Live currency conversion**
   - Fetch USD → {NGN, GHS, KES, ZAR} rates from a single provider (e.g., `exchangerate.host`, Open Exchange Rates)
   - Cache rates in `exchange_rates` table, refresh every 6 hours (Railway worker cron)
   - Display both local and USD equivalent on checkout page
   - Lock rate at checkout initiation so the price doesn't shift mid-transaction

5. **Pricing display — one USD reference, local at checkout**
   - Every product has one USD price (the canonical price)
   - At checkout, local currency shown prominently, USD reference shown in smaller text
   - "($500 USD at today's rate)" format
   - This applies to all payment methods — even Stripe shows "$500 USD"

6. **Unified payment records**
   - All payments (Stripe, Paystack, Flutterwave, NOWPayments) write to the same `payments` table
   - Columns: `provider`, `amount_usd`, `amount_local`, `currency`, `exchange_rate`, `provider_fee`
   - Admin payment views filter and aggregate by provider
   - Revenue reports normalize to USD using stored exchange rate (not current rate — preserves historical accuracy)

7. **Per-provider error handling**
   - Each provider has its own failure modes (Paystack's "card declined" vs Flutterwave's "insufficient funds" vs Stripe's "authentication required")
   - Provider-specific error messages translated to friendly UI copy in the shared `paymentErrors.ts` helper
   - Failed payments retry via the Railway worker (3 attempts over 48 hours before marking failed)

**Tables touched:** `payments`, `exchange_rates`

**API routes:**
- `POST /api/checkout` — Abstraction over all four providers; picks provider based on currency
- `POST /api/webhooks/paystack`
- `POST /api/webhooks/flutterwave`
- `POST /api/webhooks/stripe` (already exists from Sprint 3)
- `POST /api/webhooks/nowpayments` (added to cover stablecoin flow)

---

### Sprint 5 — Safelock (Weeks 9–10)

**Goal:** Clients can create a safelock, make deposits, and track progress toward a target.

**Blocked by:** Efezino's escrow / fund holding legal guidance. Do NOT build until cleared.

**Portal tasks:**

1. Safelock creation page (`/safelock/new`)
   - Select target product (cards with price + description)
   - See minimum monthly deposit and max months
   - Price locked at enrollment date — display clearly
   - Confirm → creates safelock record

2. Safelock dashboard (`/safelock`)
   - Progress bar (deposited / target)
   - Deposit history list
   - Next minimum deposit due date
   - "Make a deposit" button → checkout (Stripe or Paystack)
   - Refund policy displayed clearly

3. Deposit flow
   - Minimum deposit enforced ($50–$500 depending on product)
   - Payment via Stripe or Paystack (reuse Sprint 3–4 checkout)
   - On success → update safelock total
   - If total >= target → trigger completion flow

4. Completion flow
   - Auto-notify client: "Your safelock is complete. Ready to begin engagement."
   - Auto-notify admin
   - Transition to engagement letter signing (Sprint 7)

5. Inactivity handling
   - Cron job (Vercel cron or Supabase pg_cron): check safelocks with no deposit in 11 months
   - Send 30-day forfeiture warning email
   - At 12 months inactivity → mark as forfeited
   - Log in audit trail

**Admin tasks:**

1. Safelock management page (`/safelocks`)
   - All active safelocks: client, product, progress, last deposit, months remaining
   - Filters: active, completed, at-risk (no deposit in 60+ days), forfeited
   - Click → detail view with deposit history

2. Refund processing
   - Super admin can initiate refund (full minus 5% or $100, whichever is less)
   - Refund via original payment provider
   - Logged in audit trail

**Tables touched:** `safelocks`, `safelock_deposits`, `payments`, `audit_log`

**API routes:**
- `POST /api/safelock` — Create safelock
- `POST /api/safelock/[id]/deposit` — Process deposit
- `POST /api/cron/safelock-check` — Inactivity checker (Vercel cron)

---

### Sprint 6 — Engagement Letters + Retainer (Weeks 11–12)

**Goal:** Clients can purchase the Founder Retainer or commit to a standard engagement, sign the Letter of Engagement, and milestone payments are tracked.

**Blocked by:** Founder Retainer terms of service (legal review).

**Portal tasks:**

1. Engagement options page
   - Founder Retainer card ($20,000 — Chris as lead, 1 year unlimited)
   - Standard Engagement card ($20,000 — milestone-based)
   - Clear comparison of what each includes
   - "Pay Now" or "Already completed safelock" paths

2. Payment flow for retainer / engagement
   - Full payment via Stripe or Paystack
   - Or: safelock completion auto-triggers
   - Or: first milestone payment ($5,000) to begin

3. Letter of Engagement signing
   - Auto-generated from template with client details, scope, fees, payment schedule
   - Display in-browser with scroll
   - Electronic signature (typed full name)
   - Both parties receive countersigned PDF (stored in Supabase storage)
   - Email copies to client + admin

4. Engagement dashboard (`/engagement`)
   - Current engagement status
   - Milestone tracker (paid / pending / upcoming)
   - Letter of Engagement download
   - Assigned adviser and contact info

**Admin tasks:**

1. Engagement management
   - List of all engagements (status, client, type, total, paid)
   - Detail view with milestone progress
   - Trigger milestone invoices
   - Mark milestones as paid

2. Founder Retainer management
   - Active retainers list
   - Renewal dates
   - Scope tracking

**Tables touched:** `engagements`, `engagement_milestones`, `payments`, `ndas` (reuse signing pattern)

---

### Sprint 7 — Document Management (Weeks 13–14)

**Goal:** Clients upload documents. Admin reviews and manages them. Lawyers get read-only access.

**Portal tasks:**

1. Document upload page (`/documents`)
   - Drag-and-drop upload zone
   - Document type selector (CV, certificate, award, media, publication, letter, other)
   - Upload progress indicator
   - File stored in Supabase Storage (`documents` bucket)
   - File size limit: 10MB per file
   - Accepted formats: PDF, DOC, DOCX, JPG, PNG

2. Document library
   - List view: filename, type, upload date, status (uploaded / reviewed / approved / rejected)
   - Download button
   - Status badge per document

3. Lawyer access (`/settings/lawyer`)
   - "Invite your lawyer" form: name, email
   - Generates secure read-only link with token
   - Select which document types are visible
   - Revoke access button
   - Status: active / revoked

4. Lawyer read-only view (`/lawyer/[token]`)
   - Public page (no auth required)
   - View NDA, Letter of Engagement, selected documents
   - Download individual files
   - No edit capability
   - Token expiry: 30 days (renewable by client)

**Admin tasks:**

1. Document review queue
   - All documents needing review
   - Preview (PDF inline, images inline)
   - Approve / reject with notes
   - Bulk actions

2. Client documents tab (within client detail)
   - All documents for specific client
   - Review status
   - Lawyer access status (who, when, active/revoked)

**Tables touched:** `documents`, `lawyer_access`

---

### Sprint 8 — Messaging + AI Chatbot (Weeks 15–16)

**Goal:** Clients can message the team. AI chatbot answers common questions. Admin manages inbox.

**Portal tasks:**

1. Messages page (`/messages`)
   - Conversation thread with assigned adviser
   - Real-time updates via Supabase Realtime
   - Text input with send button
   - Show team member name and avatar on replies
   - Unread indicator on nav

2. AI chatbot (portal)
   - Floating chat bubble (bottom-right)
   - Pre-loaded with Burlington knowledge base (visa types, pricing, process, eligibility, timelines)
   - chatbot service API via server-side proxy
   - When AI can't answer → "I'll pass this to the team" → creates message in team inbox
   - "Would you like to book a consultation?" upsell when appropriate

3. AI chatbot (marketing site)
   - Embeddable script tag for burlingtonconsult.com
   - Same AI backend
   - Collects visitor email before starting chat
   - "Apply now" CTA when appropriate

**Admin tasks:**

1. Chatbot inbox (`/chatbot`)
   - All AI conversations (portal + marketing site)
   - Filter: unresolved, resolved, escalated
   - Team can reply to unresolved questions
   - AI responses visually distinct from human responses
   - Mark as resolved

2. Client messaging (within client detail)
   - Full conversation history
   - Reply from admin
   - Assign conversation to team member

**Tables touched:** `messages`, `chat_conversations`

**API routes:**
- `POST /api/chat` — Proxy to chatbot service API
- WebSocket: Supabase Realtime subscription for messages table

---

### Sprint 9 — Referral Programme (Week 17)

**Goal:** Every client gets a referral code. Referrals are tracked and discounts auto-applied.

**Portal tasks:**

1. Referral dashboard (`/referrals`)
   - Unique referral code + link
   - Copy-to-clipboard button
   - Share buttons (WhatsApp, email, LinkedIn)
   - Referral status table: who referred, status (pending / applied / converted), discount applied

2. Referral link landing
   - When someone visits with referral code → store in cookie / URL param
   - Pre-fill referral source in application form
   - Link referral record to application on submission

3. Discount application
   - When referred applicant is approved and books/pays:
   - Auto-calculate discount (40% or $5,000, whichever is greater)
   - Apply at checkout
   - Notify referrer of conversion

**Admin tasks:**

1. Referral management (`/referrals`) — Super Admin only
   - All referrals across all clients
   - Conversion rates
   - Total discounts applied
   - Override / adjust discounts manually

**Tables touched:** `referrals`, `payments` (discount metadata)

---

### Sprint 10 — Admin Dashboard + Configuration System (Weeks 18–19)

**Goal:** The admin panel becomes a proper operations console. Super admins can run Burlington without touching code.

This is a **2-week sprint** covering the configuration system infrastructure AND the revenue dashboard. Expanded from the original 1-week scope because admin tooling is a first-class product at Burlington.

**Part A: Configuration Infrastructure (Week 18)**

1. Database foundations
   - `app_config` table with typed key-value settings
   - `config_history` table (append-only audit)
   - `scheduled_changes` table for future-dated changes
   - `config_approvals` table for two-person approval workflow
   - `content_drafts` table for draft/preview/publish on content

2. Authorization layer
   - `is_founder` flag on profiles (Chris only)
   - `requiresApproval()` service mapping change keys to risk levels
   - RLS policies: only super_admins can write to config tables
   - Founders bypass approval except for critical cuts >50%

3. Config Settings UI framework
   - Category-based navigation sidebar (Pricing, Currencies, Team, Content, Emails, Operations, Features, Integrations, Legal)
   - Reusable form components per value type (currency, percentage, boolean toggle, text, list)
   - Diff preview before commit (shows old → new)
   - Approval request flow (if applicable)
   - Per-page audit log view ("What changed here?")

4. Scheduled changes system
   - "Schedule for later" option on every config change
   - Scheduled changes queue view
   - Cancel pending scheduled changes
   - Conflict warnings (two scheduled changes to the same key)
   - Railway worker cron job to fire scheduled changes at target time

5. Draft → Preview → Publish for content
   - Autosave drafts every 30s
   - Preview renders draft in live context (not a separate viewer)
   - Publish applies draft, versions previous value
   - Revert any change from history

6. First config surfaces built on the framework:
   - **Pricing** — assessment, consultation tiers, engagement products, safelock parameters
   - **Currency activation** — NGN and USD on by default, GHS/KES/ZAR/others off
   - **Feature flags** — safelock enabled, installments enabled, Money-Back Guarantee enabled, chatbot enabled, maintenance mode
   - **Operations** — booking hold time, SLA target, cancellation windows

**Part B: Team Management (Week 18–19 overlap)**

7. Team lifecycle
   - `team_profiles` table with full fields (see engineering conventions: Team Lifecycle)
   - Team roster UI with add / edit / deactivate
   - Add team member flow (profile, photo, bio, role, booking, signatures)
   - Edit with draft/preview/publish
   - Deactivation flow with pre-checks (bookings, assignments, drafts, scheduled changes)
   - Bulk reassignment tool for departing team members
   - Role promotion flow (adviser → admin → super_admin) with approval gate

**Part C: Revenue Dashboard (Week 19)**

8. Revenue dashboard (`/dashboard`)
   - Total revenue (MTD, QTD, YTD)
   - Revenue by product (consultations, retainers, safelocks)
   - Revenue by provider (Stripe, Paystack, NOWPayments)
   - Revenue by currency (USD, NGN, stablecoin)
   - Revenue by adviser
   - Chart: monthly revenue trend (last 12 months)
   - Chart: applications funnel (applied → approved → booked → engaged)

9. Key metrics cards
   - Active clients count
   - Pending applications count
   - Active safelocks (count + total held)
   - Upcoming consultations (next 7 days)
   - Conversion rate (applications → engagement)
   - Scheduled changes pending
   - Approval requests pending (Chris's queue)

10. Approval queue (Super Admin interface)
    - All pending approval requests
    - Risk level indicators
    - Approve / reject with reason
    - 7-day expiry on unused approvals

11. CSV / data export
    - Payments to CSV (with date range + currency filters)
    - Client list to CSV
    - Audit log to CSV (Chris only)
    - Config history to CSV

**Tables touched:** `app_config`, `config_history`, `scheduled_changes`, `config_approvals`, `content_drafts`, `team_profiles`, `profiles` (is_founder flag)

**Dependencies flagged:** Sprint 10 Part A blocks the ability to change any price without a developer. Parts B and C are standalone.

---

### Sprint 11 — Notifications + Email System (Week 20)

**Goal:** Comprehensive notification system across email and in-app.

**Tasks:**

1. Email templates (Resend)
   - Application status changes
   - Booking confirmation + reminder (24 hours before)
   - Payment receipt
   - Safelock deposit confirmation
   - Safelock completion notification
   - Safelock inactivity warning (30-day notice)
   - Engagement letter ready for signing
   - Milestone payment due reminder
   - New message from team
   - Referral conversion notification
   - Document review complete

2. In-app notifications
   - Notification bell in portal + admin nav
   - Dropdown with recent notifications
   - Mark as read
   - Notification preferences in settings (email on/off per type)

3. Admin notifications
   - New application submitted
   - Payment received
   - Safelock deposit received
   - Client message received
   - Chatbot escalation
   - Safelock approaching inactivity

---

### Sprint 12 — Security Hardening + Polish (Week 21)

**Goal:** Production-ready security, audit trail, and final polish.

**Tasks:**

1. Two-factor authentication
   - TOTP (Google Authenticator / Authy)
   - Required for admin and super admin roles
   - Optional for clients
   - Backup codes

2. Session management
   - Session timeout (portal: 24 hours, admin: 8 hours)
   - Active sessions list in settings
   - "Sign out all devices" option
   - Rate limiting on auth endpoints

3. Audit log (admin)
   - All admin actions logged with actor, action, target, timestamp
   - Filterable by action type, actor, date range
   - Super Admin only access
   - Non-deletable

4. Row-Level Security audit
   - Review all RLS policies
   - Verify: clients can only see own data
   - Verify: advisers see only assigned clients
   - Verify: admins see own + assigned clients
   - Verify: super admins see everything

5. Input sanitization
   - XSS prevention on all user inputs
   - SQL injection prevention (Supabase handles via parameterized queries, but audit)
   - File upload validation (MIME type check, size limits)

6. Penetration testing
   - Run automated security scan (OWASP ZAP or similar)
   - Fix critical and high findings
   - Document remaining low/medium items

7. Performance
   - Lighthouse audit on all portal pages
   - Image optimization
   - Bundle size review
   - Loading states on all async operations

8. Marketing site CTA updates
   - Update all "Book a Consultation" buttons → app.burlingtonconsult.com/book
   - Update all "Start Assessment" buttons → app.burlingtonconsult.com/assess
   - Update book.html → informational page with link to app
   - Update assess.html → informational page with link to app
   - Update services.html pricing to reflect new tiers

---

## Post-Launch Sprints (Backlog)

These are scoped but not scheduled. Build when demand or business need justifies.

| Sprint | Feature | Trigger |
|---|---|---|
| 13 | Razorpay (India) + UPI | Indian client volume justifies native rail |
| 14 | Pix (Brazil) | Brazilian client volume justifies native rail |
| 15 | Installment plans (Model D) | Legal compliance cleared |
| 16 | Knowledge Access subscription (Model A) | Knowledge Center content exists |
| 17 | Advisory Retainer Light (Model B) | Enough async advisory capacity |
| 18 | React Native mobile app | Client request / usage data justifies |
| 19 | Receipt / invoice PDF generation | Volume requires automated invoicing |
| 20 | Stripe → Checkout Session migration (marketing site) | UX gap on `cancel_url` becomes a priority |

---

## Dependencies Map

```
Sprint 0 ─── Sprint 1 ─── Sprint 2 ─── Sprint 3 ─── Sprint 4
  (scaffold)   (apply+NDA)   (onboard)   (book+Stripe)  (Paystack+Flutterwave)
                                              │
                                              ├── Sprint 5 (safelock) ← BLOCKED: legal
                                              │       │
                                              │       └── Sprint 6 (engagement) ← BLOCKED: legal
                                              │
                                              ├── Sprint 7 (documents) — independent
                                              │
                                              ├── Sprint 8 (messaging+AI) — independent
                                              │
                                              └── Sprint 9 (referrals) — independent

Sprint 10 (dashboard) ← needs Sprint 3, 4, 5 data
Sprint 11 (notifications) ← needs all features defined
Sprint 12 (security) ← final sprint, always
```

**Parallel tracks after Sprint 4:**  
Sprints 7, 8, and 9 are independent of each other and independent of Sprints 5–6. If safelock legal clearance is delayed, build documents, messaging, and referrals first.

---

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Paystack
PAYSTACK_SECRET_KEY=
PAYSTACK_WEBHOOK_SECRET=
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=

# Resend
RESEND_API_KEY=

# Chatbot service
ANTHROPIC_API_KEY=

# App
NEXT_PUBLIC_APP_URL=https://app.burlingtonconsult.com
NEXT_PUBLIC_ADMIN_URL=https://admin.burlingtonconsult.com
NEXT_PUBLIC_MARKETING_URL=https://www.burlingtonconsult.com
```

---

## Risk Register

| Risk | Impact | Mitigation |
|---|---|---|
| Legal clearance delayed (safelock, installments) | Sprints 5–6 blocked | Build independent features first (documents, messaging, referrals). Safelock can launch separately later. |
| Designer delivers late | All UI work slowed | Build with component library + Tailwind. Pixel-polish after designs arrive. |
| Paystack/Flutterwave API differences | Payment bugs | Build payment abstraction layer in Sprint 3. Provider-specific adapters. |
| Chris changes pricing structure | Rework required | Use constants file for all pricing. Single source of truth. |
| Supabase RLS misconfiguration | Data leak | Dedicated RLS audit in Sprint 12. Automated tests for access control. |
| High chatbot API costs | Budget overrun | Chatbot service costs ~$0.003/conversation at baseline. Cap at 50 messages per conversation. Monitor usage dashboard. |

---

## Testing Strategy

| Layer | Tool | When |
|---|---|---|
| Unit tests | Vitest | Every sprint — utility functions, validators, formatters |
| Component tests | React Testing Library | Sprints 1–4 — critical form components |
| Integration tests | Playwright | Sprint 3 onwards — booking + payment flows |
| RLS tests | Supabase test helpers | Sprint 12 — verify row-level security |
| E2E smoke tests | Playwright | Pre-launch — full client journey |

---

## Estimated Timeline

| Sprint | Duration | Calendar |
|---|---|---|
| **Phase -1: Marketing Site Prep** (cleanup + Tailwind migration + content refresh) | **3 weeks** | **Weeks -3 to -1** |
| Pre-build setup (accounts, keys, DNS) | 3–5 days | Week 0 |
| Sprint 0: Scaffold | 1 week | Week 1 |
| Sprint 1: Application + NDA | 2 weeks | Weeks 2–3 |
| Sprint 2: Onboarding + Dashboard | 2 weeks | Weeks 4–5 |
| Sprint 3: Booking + Stripe | 2 weeks | Weeks 6–7 |
| Sprint 4: Paystack | 1 week | Week 8 |
| Sprint 5: Safelock | 2 weeks | Weeks 9–10 |
| Sprint 6: Engagement Letters | 2 weeks | Weeks 11–12 |
| Sprint 7: Documents | 2 weeks | Weeks 13–14 |
| Sprint 8: Messaging + AI | 2 weeks | Weeks 15–16 |
| Sprint 9: Referrals | 1 week | Week 17 |
| Sprint 10: Admin Dashboard + Config System | 2 weeks | Weeks 18–19 |
| Sprint 11: Notifications | 1 week | Week 20 |
| Sprint 12: Security | 1 week | Week 21 |

**Total: 24 weeks** (~5.5 months) at full-time engineering pace. Phase -1 adds 3 weeks up front that pay for themselves in shared design tokens and faster future iteration.

With legal delays on safelock/engagement (Sprints 5–6), the independent features (Sprints 7–9) can be pulled forward, keeping the total timeline at 24 weeks regardless.

**MVP (Phase -1 + Sprints 0–4): 11 weeks.** At that point, the marketing site is clean and consistent, Burlington can accept applications, approve clients, book consultations, and collect payments. Everything else is additive. Note that at MVP, pricing is still hardcoded in config files — Sprint 10's configuration system unlocks admin-editable pricing in Week 19.

**Compression options:** Phase -1 can overlap with Pre-build setup (cleanup workstream runs while Adonai provisions accounts). Tailwind migration can compress to 2 weeks if content refresh starts in parallel. Absolute minimum: Phase -1 in 2 weeks + Sprints 0–12 in 20 weeks = 22 weeks total.

---

*This document is the single source of truth for the build. Update it as decisions change. Reference specific sprint numbers when planning work.*
