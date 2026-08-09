import { useEffect, useState } from 'react';
import ConversationItem from './ConversationItem.jsx';
import { listConversations } from '../../api/conversations.js';

export default function Sidebar({ activeId, onSelect }) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    listConversations().then(setConversations);
  }, []);

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-zinc-800 bg-zinc-950">
      <div className="p-4">
        <button className="w-full rounded-lg bg-violet-600 py-2 font-medium hover:bg-violet-500">
          New chat
        </button>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-2">
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            active={conversation.id === activeId}
            onSelect={onSelect}
          />
        ))}
      </nav>
      <p className="p-4 text-xs text-zinc-600">george king · v0.2</p>
    </aside>
  );
}
