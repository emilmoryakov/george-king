'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

export default function ChatPanel({
  conversationId,
  initialMessages,
}: {
  conversationId: string;
  initialMessages: UIMessage[];
}) {
  const { messages, sendMessage, status, error } = useChat({
    id: conversationId,
    messages: initialMessages,
    transport: new DefaultChatTransport({ api: '/api/chat', body: { conversationId } }),
  });

  return (
    <main className="flex min-w-0 flex-1 flex-col">
      <header className="border-b border-zinc-800 px-6 py-4">
        <h1 className="text-lg font-semibold tracking-wide">George King</h1>
        <p className="text-sm text-zinc-500">his majesty is listening</p>
      </header>
      <MessageList
        messages={messages}
        loading={status === 'submitted'}
        error={error?.message}
      />
      <MessageInput
        onSend={(text) => sendMessage({ text })}
        disabled={status !== 'ready'}
      />
    </main>
  );
}
