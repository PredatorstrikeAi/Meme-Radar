# Meme Radar — STATUS
_Last updated: 2026-03-25 17:30 EDT_

## Snapshot
- **Codebase**: Watcher + Publisher services compile and stream via Redis → Telegram, Guardian sweep ready (missing real secrets). Access webhook server receives LemonSqueezy events & membership lookups. Landing site (Next.js) loads recent alerts from Supabase (needs env keys).
- **Infra**: Fly app manifests exist for watcher/publisher/access; Redis host + secrets not yet wired. Supabase migrations cover `memberships` + `alerts` tables with RLS policies.
- **Gaps**: No `.env` files or secrets committed. Redis/Supabase/Telegram/LemonSqueezy credentials + Fly deploys pending. Landing visuals waiting on banana radar logo.

## Backlog (priority, owner, timestamped)
| Priority | Task | Owner | Notes / Blockers | Updated |
| --- | --- | --- | --- | --- |
| P0 | Provide production secrets (`TELEGRAM_*`, `SUPABASE_*`, `LEMONSQUEEZY_*`, `REDIS_URL`) + target Redis host | Broland | Required before Fly deploys, Guardian sweeps, and landing feed hydration | 2026-03-25 |
| P0 | Stand up LemonSqueezy product + webhook, confirm `telegram_id` custom field + shared secret | Broland | Access server logic ready; needs actual store + secret to test | 2026-03-25 |
| P1 | Deploy watcher + publisher + access apps to Fly with healthchecks + secrets, verify Redis stream wiring | Subagent | Blocked on secrets + Fly tokens; prep scripts ready | 2026-03-25 |
| P1 | Connect landing page to Supabase anon key + add real sample feed links | Subagent | Needs `NEXT_PUBLIC_SUPABASE_*`; once provided, wire env + preview | 2026-03-25 |
| P1 | Add unit tests for watcher filter/score logic (`apps/watcher`, `packages/core`) | Subagent | Improves safety before paid alerts | 2026-03-25 |
| P2 | Produce banana+radar logo + favicon kit | Broland | Pending Gemini API key or designer | 2026-03-25 |
| P2 | Write subscriber onboarding/runbook (setup checklist, support workflow) | Subagent | Outline once billing + Telegram pieces confirmed | 2026-03-25 |

## Completed Today
- Expanded landing page with conversion-focused sections (social proof stats, signal criteria, pricing CTA, FAQ) to make $20/mo offer clearer and prep for traffic (2026-03-25).
