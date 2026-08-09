'use client';

import { useEffect, useRef } from 'react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import type { Message as MessageType } from '@/lib/types';

export default function MessageList({
  messages,
  loading,
}: {
  messages: MessageType[];
  loading: boolean;
}) {
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottom.current?.scrollIntoView();
  }, [messages, loading]);

  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-6">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      {loading && <TypingIndicator />}
      <div ref={bottom} />
    </div>
  );
}
