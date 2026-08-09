import { useEffect, useRef } from 'react';
import Message from './Message.jsx';
import TypingIndicator from './TypingIndicator.jsx';

export default function MessageList({ messages, loading }) {
  const bottom = useRef(null);

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
