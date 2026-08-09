import type { UIMessage } from 'ai';

export default function Message({ message }: { message: UIMessage }) {
  const mine = message.role === 'user';
  const text = message.parts
    .map((part) => (part.type === 'text' ? part.text : ''))
    .join('');

  return (
    <p
      className={`max-w-[75%] rounded-2xl px-4 py-2 whitespace-pre-wrap ${
        mine
          ? 'self-end rounded-br-sm bg-violet-600 text-white'
          : 'self-start rounded-bl-sm bg-zinc-800'
      }`}
    >
      {text}
    </p>
  );
}
