export default function Message({ message }) {
  const mine = message.role === 'user';
  return (
    <p
      className={`max-w-[75%] rounded-2xl px-4 py-2 ${
        mine
          ? 'self-end rounded-br-sm bg-violet-600 text-white'
          : 'self-start rounded-bl-sm bg-zinc-800'
      }`}
    >
      {message.content}
    </p>
  );
}
