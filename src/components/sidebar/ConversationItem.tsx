import Link from 'next/link';
import type { Conversation } from '@/lib/types';

export default function ConversationItem({
  conversation,
  active,
  onDelete,
}: {
  conversation: Conversation;
  active: boolean;
  onDelete: () => void;
}) {
  return (
    <div
      className={`group flex items-center rounded-lg ${
        active ? 'bg-zinc-800' : 'text-zinc-400 hover:bg-zinc-800/50'
      }`}
    >
      <Link
        href={`/conversations/${conversation.id}`}
        className="flex-1 truncate px-3 py-2"
      >
        {conversation.title}
      </Link>
      <button
        onClick={onDelete}
        aria-label={`Delete ${conversation.title}`}
        className="invisible px-2 text-zinc-500 group-hover:visible hover:text-red-400"
      >
        ×
      </button>
    </div>
  );
}
