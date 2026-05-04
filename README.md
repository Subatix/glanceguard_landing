# glanceguard_landing

Next.js (App Router) site for glanceguard.app: marketing pages, Stripe Checkout + Neon-backed licensing APIs, updater feed, transactional email.

Use `npx shadcn@latest add …` whenever you extend UI primitives; theme tokens live in `app/globals.css`.

## Prerequisites

- Node.js 20+
- Stripe CLI for webhook forwarding
- Neon project connection string (`NEON_DATABASE_URL`)
- Stripe test keys + webhook secret
- Resend API key & verified sender

## Bootstrap

Copy `.env.example` to `.env.local` and populate secrets (never commit).

### Database schema

Either apply SQL:

```bash
psql "$NEON_DATABASE_URL" -f drizzle/0000_init_licenses.sql
```

Or Drizzle Push (destructive-ish in CI — review prompt):

```bash
export NEON_DATABASE_URL="postgresql://…"
npm run db:push
```

### Stripe Checkout + webhook (local)

```bash
npm run dev
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Create the one-time SKU:

```bash
stripe products create --name="GlanceGuard" \
  --description="Lifetime license for one Mac"

stripe prices create --product=<id> \
  --unit-amount=2000 --currency=usd
```

Paste the price id into `STRIPE_PRICE_ID`.

### Ed25519 keypair

Issue a PKCS8 PEM (`ED25519_PRIVATE_KEY`), expose the pairing public PEM/base64 (`LICENSE_PUBKEY`) for desktop verification in Phase 11.

## Scripts

| command | purpose |
|---------|---------|
| `npm run dev` | Next dev server |
| `npm run build` | Production build |
| `npm run lint` | `next lint` |
| `npm run db:push` | Drizzle ⇄ Postgres sync |
| `npm run db:generate` | SQL migration snapshots |

Deploy on Vercel with Subatix workspace; DNS for `glanceguard.app`, `updates.glanceguard.app`, optional `api.*` subdomain per milestone.
