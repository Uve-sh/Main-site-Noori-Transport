# Admin CMS — Phased Build Plan

The CMS is a substantial build (auth + ~15 tables + storage + admin UI for every section + refactoring every public page to read from the database). I'll deliver it in **5 phases**, each phase shippable and verifiable on its own.

**Decisions locked in:** email + admin role only (no profiles table), Save = publish live (with confirmation), first admin seeded by email via migration.

**One thing I need from you before Phase 0:** *the admin email address* to seed (e.g. `ibrahim@nooritransport.in`). Anyone who signs up with that email becomes admin automatically on first login.

---

## Phase 0 — Foundation (auth + admin shell)

- Enable Lovable Cloud
- Schema: `app_role` enum (`admin`), `user_roles` table, `has_role()` security-definer function, RLS policies, grants
- Trigger on `auth.users` insert: if email matches the seeded admin email, grant `admin` role
- `/auth` public route (email + password, no signup form — admin can be invited later)
- `/admin/*` lives under the integration-managed `_authenticated` gate, plus an additional `has_role('admin')` server check; non-admins redirect to `/`
- Admin layout: shadcn `Sidebar` + topbar with logout + breadcrumbs
- `/admin` dashboard placeholder (counts wired in Phase 4)

## Phase 1 — Database schema + storage (one migration)

**Singletons** (one row each): `site_settings`, `hero_content`, `about_content`, `contact_info`, `footer_content`.

**Collections** (sortable, with `sort_order` + `visible`):
`nav_items`, `stats`, `timeline_items`, `why_features` (truck cards), `services`, `fleet_vehicles`, `gallery_images`, `leadership`, `testimonials`.

**Public submissions:** `contact_requests` (inbox).

Every public-facing table gets a narrow `TO anon SELECT` policy filtered to `visible = true` (or equivalent). Writes are gated to `has_role('admin')`.

**Storage:** one public `site-media` bucket. Admin-only `INSERT`/`UPDATE`/`DELETE`; public `SELECT`.

**Seed:** migration ports every value currently in `src/data/site.ts` into the new tables so the public site looks identical after the cutover.

## Phase 2 — Public site goes dynamic

Refactor each public page to fetch from the database:

- Pattern: `*.functions.ts` public server fns (publishable key, no auth middleware) → `queryOptions` → `ensureQueryData` in loaders → `useSuspenseQuery` in components.
- Components touched: `Navbar`, `Hero`, `AboutPreview`, `WhyChooseUs`, `Services`, `Fleet`, `Gallery`, `Clients`, `Testimonials`, `Footer`, plus `/about`, `/services`, `/fleet`, `/gallery`, `/contact`.
- `WhyChooseUs` renders N cards from `why_features` and intelligently re-balances left/right placement (split in half, fall back to single column if >8 items). All animations stay intact.
- Leadership grid re-flows from 1 to N members automatically (1/2/3/4-col responsive grid).
- Contact form posts to a server fn that inserts into `contact_requests`.

`src/data/site.ts` is deleted at the end of this phase.

## Phase 3 — Admin module: foundations + first 4 sections

Reusable building blocks I'll build once and reuse:

- `<AdminPageHeader />`, `<SaveBar />` (Cancel / Save with confirm dialog)
- `<ImageUploader />` — drag/drop, preview, upload to `site-media`, returns URL
- `<SortableList />` — `@dnd-kit/sortable` wrapper with persisted `sort_order`
- `<ConfirmDialog />`, toast wiring, optimistic mutations

First 4 admin sections to validate the patterns:
1. **Settings** (singleton: company name, logo, favicon, SEO, OG image)
2. **Navigation** (collection, sortable, label + path + visible)
3. **Hero** (singleton: heading/sub/description/CTAs/bg image)
4. **Why Choose Us features** (collection, sortable, Lucide icon picker, max-card warning)

## Phase 4 — Admin module: remaining sections + dashboard

Now-templated UIs for:
- Stats, About content + Timeline, Services, Fleet, Gallery (bulk upload + categories), Leadership, Testimonials, Contact info, Footer, Contact-request inbox

Plus the real dashboard home: total counts per section, "last updated" per area, quick-action buttons linking to each module.

## Phase 5 — Polish + verification

- Image optimization on upload (compress to webp, max-width 2400)
- Empty states, loading skeletons, validation messages with zod
- Mobile-responsive admin (sidebar collapses to drawer)
- Playwright smoke run: log in → edit hero → publish → verify on homepage
- Security memory entry + ignore-rules for intentional public reads

---

## Technical notes

- **Auth model:** Supabase email/password via Lovable Cloud. `user_roles` (separate from `auth.users`). `has_role()` security-definer used in every RLS policy for admin writes. No profile table.
- **Read shape:** TanStack Query everywhere. Public reads via a publishable-key server fn (no bearer); admin writes via `requireSupabaseAuth` + in-handler `has_role` check.
- **No edge functions.** All server logic uses `createServerFn`.
- **Animations preserved:** the `WhyChooseUs` component keeps the exact same animation code; only the `features` array source changes from a constant to query data.
- **Layout intelligence:** sections with variable counts use container queries + `auto-fit` grids so 3 services or 30 services both look correct.

---

## Effort + flow

Each phase is one of my turns. I'll stop after each phase, summarize what shipped, and you confirm before I start the next. Expect:

- Phase 0: 1 turn
- Phase 1: 1 turn (big migration)
- Phase 2: 1–2 turns (lots of files)
- Phase 3: 1 turn
- Phase 4: 2 turns
- Phase 5: 1 turn

**To start, reply with the admin email** and I'll kick off Phase 0.