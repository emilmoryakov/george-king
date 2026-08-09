// All database access goes through here — API routes and server components
// import these instead of writing queries inline.
import { prisma } from './prisma';

export function listConversations() {
  return prisma.conversation.findMany({ orderBy: { createdAt: 'desc' } });
}

export function createConversation(title: string) {
  return prisma.conversation.create({ data: { title } });
}

export function deleteConversation(id: string) {
  return prisma.conversation.delete({ where: { id } });
}

export function listMessages(conversationId: string) {
  return prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: 'asc' },
  });
}

export function saveMessage(
  conversationId: string,
  role: 'user' | 'assistant',
  content: string,
) {
  return prisma.message.create({ data: { conversationId, role, content } });
}
