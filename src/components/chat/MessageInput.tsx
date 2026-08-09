'use client';

import { useState } from 'react';

export default function MessageInput({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void;
  disabled: boolean;
}) {
  const [text, setText] = useState('');

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || disabled) {
      return;
    }
    setText('');
    onSend(trimmed);
  }

  return (
    <form onSubmit={submit} className="flex gap-3 border-t border-zinc-800 p-4">
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={2}
        placeholder="Address the king…"
        aria-label="Message"
        className="flex-1 resize-none rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 outline-none placeholder:text-zinc-500 focus:border-violet-500"
      />
      <button
        type="submit"
        disabled={disabled}
        className="self-end rounded-lg bg-violet-600 px-5 py-2 font-medium hover:bg-violet-500 disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
}
