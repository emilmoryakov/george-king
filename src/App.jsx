import { useEffect, useState } from 'react';
import Sidebar from './components/sidebar/Sidebar.jsx';
import ChatPanel from './components/chat/ChatPanel.jsx';
import { listMessages, createMessage } from './api/messages.js';
import { complete } from './api/llm.js';

export default function App() {
  const [activeId, setActiveId] = useState(1);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    listMessages(activeId).then(setMessages);
  }, [activeId]);

  async function sendMessage(text) {
    const userMessage = await createMessage(activeId, 'user', text);
    setMessages((current) => [...current, userMessage]);

    setLoading(true);
    try {
      const reply = await complete([...messages, userMessage]);
      const assistantMessage = await createMessage(activeId, 'assistant', reply);
      setMessages((current) => [...current, assistantMessage]);
    } catch (error) {
      const excuse = await createMessage(
        activeId,
        'assistant',
        `The king is unavailable: ${error.message}`,
      );
      setMessages((current) => [...current, excuse]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-dvh bg-zinc-900 font-sans text-zinc-100">
      <Sidebar activeId={activeId} onSelect={setActiveId} />
      <ChatPanel messages={messages} loading={loading} onSend={sendMessage} />
    </div>
  );
}
