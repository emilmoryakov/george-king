import type { UIMessage } from 'ai';
import ChatPanel from '@/components/chat/ChatPanel';
import { listMessages } from '@/lib/data';

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const messages = await listMessages(id);

  const initialMessages: UIMessage[] = messages.map((m) => ({
    id: m.id,
    role: m.role as 'user' | 'assistant',
    parts: [{ type: 'text', text: m.content }],
  }));

  return <ChatPanel conversationId={id} initialMessages={initialMessages} />;
}
