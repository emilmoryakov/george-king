# George King

A chat web app I'm building for my Web Application Development course, now as a
React app (Vite). A sidebar lists conversations from a mock in-memory API,
switching one loads its messages, and replies come from OpenRouter. Tailwind via
CDN handles the styling.

The previous plain-JavaScript version lives untouched in `legacy/`.

## Running it

```sh
npm install
npm run dev
```

## API key

The first time you send a message, the page asks for an OpenRouter API key
(create one at openrouter.ai). It is stored in your browser's localStorage and
never committed to the repo. The app uses a free model, so no credit is needed.

## Structure

- `src/components/sidebar/` — conversation list
- `src/components/chat/` — message list, input, typing indicator
- `src/api/` — mock conversations/messages modules (in-memory, promise-based) and
  the real OpenRouter call

Commits are checked by a pre-commit hook — if ESLint or Prettier complain, the
commit is rejected. Fix with `npm run format` and try again.
