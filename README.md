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
npm run dev                  # http://localhost:3000
```

The key comes from openrouter.ai/settings/keys — the app uses a free model, so
no credit is needed. `.env.local` is gitignored.

## Structure

- `src/app/` — pages (`/`, `/conversations/[id]`) and API routes
  (`/api/conversations`, `/api/messages`, `/api/chat`)
- `src/lib/db.ts` — the in-memory mock database (server-side, resets on restart)
- `src/lib/api/` — small client-side fetch wrappers around the API routes
- `src/components/` — sidebar and chat components

Commits are checked by a pre-commit hook — if ESLint or Prettier complain, the
commit is rejected. Fix with `npm run format` and try again.
