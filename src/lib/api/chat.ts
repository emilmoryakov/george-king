import type { Message } from '../types';

export async function requestReply(conversationId: string): Promise<Message> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ conversationId }),
  });
  if (!response.ok) {
    throw new Error(`The court did not respond (${response.status})`);
  }
  return response.json();
}
