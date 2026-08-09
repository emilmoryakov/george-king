'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ConversationItem from './ConversationItem';
import {
  listConversations,
  createConversation,
  deleteConversation,
} from '@/lib/api/conversations';

export default function Sidebar() {
  const params = useParams();
  const activeId = typeof params.id === 'string' ? params.id : null;
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: conversations = [] } = useQuery({
    queryKey: ['conversations'],
    queryFn: listConversations,
  });

  const create = useMutation({
    mutationFn: () => createConversation('New conversation'),
    onSuccess: (conversation) => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      router.push(`/conversations/${conversation.id}`);
    },
  });

  const remove = useMutation({
    mutationFn: deleteConversation,
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      if (id === activeId) {
        router.push('/');
      }
    },
  });

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-zinc-800 bg-zinc-950">
      <div className="p-4">
        <button
          onClick={() => create.mutate()}
          disabled={create.isPending}
          className="w-full rounded-lg bg-violet-600 py-2 font-medium hover:bg-violet-500 disabled:opacity-50"
        >
          New chat
        </button>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-2">
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            active={conversation.id === activeId}
            onDelete={() => remove.mutate(conversation.id)}
          />
        ))}
      </nav>
      <p className="p-4 text-xs text-zinc-600">george king · v0.4</p>
    </aside>
  );
}
