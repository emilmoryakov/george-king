import type { Message } from '../types';

export async function listMessages(conversationId: string): Promise<Message[]> {
  const response = await fetch(`/api/messages?conversationId=${conversationId}`);
  return response.json();
}

export async function createMessage(
  conversationId: string,
  content: string,
): Promise<Message> {
  const response = await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ conversationId, content }),
  });
  return response.json();
}
