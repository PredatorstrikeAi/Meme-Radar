# Meme Radar Build Plan

## Overview
A Telegram alert system that watches DexScreener for fresh Solana/Ethereum meme pairs, filters for safety/liquidity signals, and pushes instant alerts to a subscriber-only channel gated via LemonSqueezy webhooks.

## Architecture
- **Watcher Service (Node.js / TypeScript)**
  - Connect to DexScreener websockets + REST backfill
  - Apply filters (age < 10 min, LP ≥ $30k, locked ≥ 30d, renounced, 24h vol ≥ $1m)
  - Score tokens (liquidity, holder distribution, social mentions)
  - Publish alerts to Redis stream for downstream consumers
- **Alert Publisher**
  - Consumes Redis stream; formats Markdown message + chart thumbnails
  - Sends to Telegram private channel via bot token
  - Optionally mirrors top picks to public teaser channel
- **Access Control**
  - LemonSqueezy checkout page → webhook → Lambda/Fly job updates Supabase table of active subscribers
  - Telegram bot verifies membership every 6 hours, automatically removes expired users
- **Landing Page**
  - Static Next.js page hosted on Vercel (or Fly static) describing service + checkout link + live sample feed widget
- **Monitoring**
  - Healthchecks ping watchers every 5 min
  - Sentry (or simple Discord webhook) for runtime errors

## Tasks
1. **Brand kit**
   - Logo/avatar with banana + radar motif ✅ (pending Gemini API key)
   - Color palette + typography tokens
2. **Repo + Infra**
   - Initialize monorepo (`apps/watcher`, `apps/publisher`, `apps/landing`)
   - Configure Fly.io apps (watcher + publisher) with secrets for DexScreener + Telegram + Supabase
3. **Watcher Implementation**
   - DexScreener websocket client with reconnect + REST fallback
   - Filter + scoring pipeline
   - Unit tests for filter logic
4. **Telegram Bot + Channel Setup** ✅
   - Publisher + guardian services implemented with photo alerts, teaser mirror, Supabase logging, and membership sweeps
   - TODO: create the actual Telegram channels, add the bot as admin, and drop the real tokens/IDs into `.env`
5. **Payments & Gating**
   - LemonSqueezy product + checkout link
   - Webhook handler that adds/removes Telegram users via Supabase
6. **Landing Page**
   - Copywriting, pricing table, live feed embed
   - Link to checkout + Discord/Telegram support contact
7. **Monitoring & Docs**
   - Healthchecks, alerts, runbooks, README

## Decisions (locked in)
- Filters: default set (Sol + ETH, safety-first)
- Avatar: banana-themed (waiting on Gemini API key)
- Monetization: $20/mo on LemonSqueezy, no trial
- Hosting: Fly.io, instant per-pair alerts
