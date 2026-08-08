# George King

A chat web app I'm building for my Web Application Development course. Styled with
Tailwind (CDN): a sidebar with conversations and a chat panel. Messages are rendered
with a small `<chat-message>` custom element, and replies come from OpenRouter,
streamed into the page word by word.

The JavaScript is split into three ES modules: `main.js` (entry point and event
listeners), `api.js` (fetch + streaming), `chat.js` (DOM).

## API key

The first time you send a message, the page asks for an OpenRouter API key
(create one at openrouter.ai). It is stored in your browser's localStorage and
never committed to the repo. The app uses a free model, so no credit is needed.

## Running it

Open `index.html` in a browser. That's it, there is no build step yet.

For development:

```sh
npm install    # dev tools + git hook
npm run lint
npm run format
```

Commits are checked by a pre-commit hook — if ESLint or Prettier complain, the
commit is rejected. Fix with `npm run format` and try again.
