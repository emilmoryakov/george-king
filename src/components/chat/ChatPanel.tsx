'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { listMessages, createMessage } from '@/lib/api/messages';
import { requestReply } from '@/lib/api/chat';

export default function ChatPanel({ conversationId }: { conversationId: string }) {
  const queryClient = useQueryClient();

  const { data: messages = [] } = useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => listMessages(conversationId),
  });

  const send = useMutation({
    mutationFn: async (text: string) => {
      await createMessage(conversationId, text);
      // Show the user message right away, before the reply arrives.
      await queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
      return requestReply(conversationId);
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ['messages', conversationId] }),
  });

  return (
    <main className="flex min-w-0 flex-1 flex-col">
      <header className="border-b border-zinc-800 px-6 py-4">
        <h1 className="text-lg font-semibold tracking-wide">George King</h1>
        <p className="text-sm text-zinc-500">his majesty is listening</p>
      </header>
      <MessageList
        messages={messages}
        loading={send.isPending}
        error={send.error?.message}
      />
      <MessageInput onSend={send.mutate} disabled={send.isPending} />
    </main>
  );
}
