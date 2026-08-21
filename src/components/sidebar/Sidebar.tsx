import { listConversations } from '@/lib/data';
import ConversationList from './ConversationList';

export default async function Sidebar() {
  const conversations = await listConversations();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-zinc-800 bg-zinc-950">
      <ConversationList conversations={conversations} />
      <p className="p-4 text-xs text-zinc-600">george king · v0.7</p>
    </aside>
  );
}
