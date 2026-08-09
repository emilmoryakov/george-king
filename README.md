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
npm run db:migrate           # creates the local SQLite database
npm run dev                  # http://localhost:3000
```

The key comes from openrouter.ai/settings/keys — the app uses a free model, so
no credit is needed. `.env.local` is gitignored, and so is the database file.

## Structure

- `src/app/` — pages (`/`, `/conversations/[id]`) and API routes; `/api/chat`
  streams replies with the Vercel AI SDK and persists both sides of the exchange
- `prisma/schema.prisma` — Conversation and Message models (SQLite)
- `src/lib/data.ts` — the data access layer; every query lives here, API routes
  and server components just call it
- `src/components/` — the sidebar renders on the server straight from the
  database; conversation create/delete update it optimistically and roll back
  on failure. The chat panel uses the AI SDK's `useChat`.

Commits are checked by a pre-commit hook — if ESLint or Prettier complain, the
commit is rejected. Fix with `npm run format` and try again.
