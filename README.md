# George King

A chat web app I'm building for my Web Application Development course. Right now
it's a static page styled with Tailwind (CDN): a sidebar with conversations and a
chat panel. Sending a message appends it to the chat — the AI part comes later.
Messages are rendered with a small `<chat-message>` custom element.

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
