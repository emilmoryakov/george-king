'use client';

import { useOptimistic, useTransition } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ConversationItem from './ConversationItem';
import { createConversation, deleteConversation } from '@/lib/api/conversations';
import type { Conversation } from '@/lib/types';

type Change =
  { type: 'add'; conversation: Conversation } | { type: 'remove'; id: string };

export default function ConversationList({
  conversations,
}: {
  conversations: Conversation[];
}) {
  const router = useRouter();
  const params = useParams();
  const activeId = typeof params.id === 'string' ? params.id : null;
  const [, startTransition] = useTransition();

  // The optimistic list shows changes instantly and falls back to the
  // server-rendered list if a request fails.
  const [optimistic, apply] = useOptimistic(
    conversations,
    (current: Conversation[], change: Change) =>
      change.type === 'add'
        ? [change.conversation, ...current]
        : current.filter((c) => c.id !== change.id),
  );

  function handleCreate() {
    startTransition(async () => {
      apply({ type: 'add', conversation: { id: 'pending', title: 'New conversation' } });
      try {
        const conversation = await createConversation('New conversation');
        router.push(`/conversations/${conversation.id}`);
        router.refresh();
      } catch {
        // the optimistic entry rolls back on its own
      }
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      apply({ type: 'remove', id });
      try {
        await deleteConversation(id);
        if (id === activeId) {
          router.push('/');
        }
        router.refresh();
      } catch {
        // the row comes back if the delete failed
      }
    });
  }

  return (
    <>
      <div className="p-4">
        <button
          onClick={handleCreate}
          className="w-full rounded-lg bg-violet-600 py-2 font-medium hover:bg-violet-500"
        >
          New chat
        </button>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-2">
        {optimistic.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            active={conversation.id === activeId}
            onDelete={() => handleDelete(conversation.id)}
          />
        ))}
      </nav>
    </>
  );
}
