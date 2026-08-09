import MessageList from './MessageList.jsx';
import MessageInput from './MessageInput.jsx';

export default function ChatPanel({ messages, loading, onSend }) {
  return (
    <main className="flex min-w-0 flex-1 flex-col">
      <header className="border-b border-zinc-800 px-6 py-4">
        <h1 className="text-lg font-semibold tracking-wide">George King</h1>
        <p className="text-sm text-zinc-500">his majesty is listening</p>
      </header>
      <MessageList messages={messages} loading={loading} />
      <MessageInput onSend={onSend} disabled={loading} />
    </main>
  );
}
