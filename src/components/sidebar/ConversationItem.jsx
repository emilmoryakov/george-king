export default function ConversationItem({ conversation, active, onSelect }) {
  return (
    <button
      onClick={() => onSelect(conversation.id)}
      className={`block w-full rounded-lg px-3 py-2 text-left ${
        active ? 'bg-zinc-800' : 'text-zinc-400 hover:bg-zinc-800/50'
      }`}
    >
      {conversation.title}
    </button>
  );
}
