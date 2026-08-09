import Link from 'next/link';
import type { Conversation } from '@/lib/types';

export default function ConversationItem({
  conversation,
  active,
}: {
  conversation: Conversation;
  active: boolean;
}) {
  return (
    <Link
      href={`/conversations/${conversation.id}`}
      className={`block rounded-lg px-3 py-2 ${
        active ? 'bg-zinc-800' : 'text-zinc-400 hover:bg-zinc-800/50'
      }`}
    >
      {conversation.title}
    </Link>
  );
}
