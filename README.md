# glanceguard_landing

Next.js (App Router) site for glanceguard.app: marketing pages, Stripe Checkout + Neon-backed licensing APIs, updater feed, transactional email.

Use `npx shadcn@latest add …` whenever you extend UI primitives; theme tokens live in `app/globals.css`. The `@import "shadcn/tailwind.css"` hook comes from the `shadcn` **devDependency**.

## Prerequisites

- Node.js 20+
- Stripe CLI for webhook forwarding
- Neon project connection string (`NEON_DATABASE_URL`), or run the Neon bootstrap script below (uses `neonctl`)
- Stripe test keys + webhook secret
- Resend API key & verified sender

## Bootstrap

Copy `.env.example` to `.env.local` and populate secrets (never commit).

### Neon: one-command local bootstrap (CLI)

Committed metadata: `.neon-project.json` (`orgId`, `projectId`, GlanceGuard DB name).

If you recreated the Neon project, update that JSON.

```bash
npm run db:bootstrap
```

This will:

1. Call `neonctl connection-string …` using `.neon-project.json`
2. Generate a matching **`ED25519_PRIVATE_KEY`** (PKCS#8 PEM) + **`LICENSE_PUBKEY`** (SPKI PEM) with Node crypto
3. Merge those into `.env.local` (`chmod 0600`)
4. Run `scripts/apply-init-sql.mjs` (Neon HTTP; **no psql needed**)

Re-run safe: SQL uses `IF NOT EXISTS`. Re-running rotates only the managed key lines when you rerun `db:bootstrap` (it strips prior managed keys).

Manual apply after `.env.local` exists:

```bash
npm run db:apply-sql
```

### Database schema without bootstrap

Either `psql` / Neon SQL editor:

```bash
psql "$NEON_DATABASE_URL" -f drizzle/0000_init_licenses.sql
```

Or Drizzle Push (review prompts):

```bash
export NEON_DATABASE_URL="postgresql://…"
npm run db:push
```

### Stripe Checkout + webhook (local)

Fix **expired test keys** in Stripe Dashboard if `stripe trigger` returns `api_key_expired`.

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

Sanity check (requires valid `sk_test_…`):

```bash
stripe trigger checkout.session.completed
```

### Ed25519 keypair (manual)

If not using `db:bootstrap`, issue PKCS#8 PEM (`ED25519_PRIVATE_KEY`) and SPKI public (`LICENSE_PUBKEY`). `jose` load check:

```bash
node --env-file=.env.local --input-type=module -e \
  "import { importPKCS8, importSPKI } from 'jose'; \
   await importPKCS8(process.env.ED25519_PRIVATE_KEY, 'EdDSA'); \
   await importSPKI(process.env.LICENSE_PUBKEY, 'EdDSA'); \
   console.log('ok');"
```

## Scripts

| command | purpose |
|---------|---------|
| `npm run dev` | Next dev server |
| `npm run build` | Production build |
| `npm run lint` | `next lint` |
| `npm run db:bootstrap` | Neon URL + Ed25519 + apply `drizzle/0000_init_licenses.sql` |
| `npm run db:apply-sql` | Apply SQL only (needs `.env.local`) |
| `npm run db:push` | Drizzle ⇄ Postgres sync |
| `npm run db:generate` | SQL migration snapshots |

Deploy on Vercel with Subatix workspace; DNS for `glanceguard.app`, `updates.glanceguard.app`, optional `api.*` subdomain per milestone.
