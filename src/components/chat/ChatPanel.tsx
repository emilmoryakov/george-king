'use client';

import { useEffect, useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { listMessages, createMessage } from '@/lib/api/messages';
import { requestReply } from '@/lib/api/chat';
import type { Message } from '@/lib/types';

export default function ChatPanel({ conversationId }: { conversationId: number }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    listMessages(conversationId).then(setMessages);
  }, [conversationId]);

  async function sendMessage(text: string) {
    setLoading(true);
    try {
      const userMessage = await createMessage(conversationId, text);
      setMessages((current) => [...current, userMessage]);
      const reply = await requestReply(conversationId);
      setMessages((current) => [...current, reply]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: -1,
          conversationId,
          role: 'assistant',
          content: `The king is unavailable: ${(error as Error).message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-w-0 flex-1 flex-col">
      <header className="border-b border-zinc-800 px-6 py-4">
        <h1 className="text-lg font-semibold tracking-wide">George King</h1>
        <p className="text-sm text-zinc-500">his majesty is listening</p>
      </header>
      <MessageList messages={messages} loading={loading} />
      <MessageInput onSend={sendMessage} disabled={loading} />
    </main>
  );
}
