# George King

A chat web app I'm building for my Web Application Development course, now on
Next.js (App Router + TypeScript). Each conversation has its own URL, the mock
database lives server-side behind API routes, and the OpenRouter key never
leaves the server.

The original plain-JavaScript version lives untouched in `legacy/`.

## Running it

```sh
npm install
cp .env.example .env.local   # then paste your OpenRouter key into it
docker compose up -d         # local Postgres
npm run db:migrate           # applies the migrations
npm run dev                  # http://localhost:3000
```

The key comes from openrouter.ai/settings/keys — the app uses a free model, so
no credit is needed. `.env.local` is gitignored.

## PWA

The app is installable (manifest + icons + iOS metadata). A service worker
(`public/sw.js`) pre-caches the app shell, cleans up old caches on activate,
never touches API calls, and serves `public/offline.html` when a page is opened
without a connection.

## Deployment

The app deploys to Vercel. The database in production is Prisma Postgres from
the Vercel Storage tab (it injects `DATABASE_URL` automatically), and the
OpenRouter key is set in the project's environment variables. The build script
runs `prisma migrate deploy`, so pending migrations are applied on every
deployment. Every pull request gets its own preview deployment.

## Structure

- `src/app/` — pages (`/`, `/conversations/[id]`) and API routes; `/api/chat`
  streams replies with the Vercel AI SDK and persists both sides of the exchange
- `prisma/schema.prisma` — Conversation and Message models (PostgreSQL)
- `src/lib/data.ts` — the data access layer; every query lives here, API routes
  and server components just call it
- `src/components/` — the sidebar renders on the server straight from the
  database; conversation create/delete update it optimistically and roll back
  on failure. The chat panel uses the AI SDK's `useChat`.

Commits are checked by a pre-commit hook — if ESLint or Prettier complain, the
commit is rejected. Fix with `npm run format` and try again.
