import type { Conversation } from '../types';

export async function listConversations(): Promise<Conversation[]> {
  const response = await fetch('/api/conversations');
  return response.json();
}

export async function createConversation(title: string): Promise<Conversation> {
  const response = await fetch('/api/conversations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  return response.json();
}

export async function deleteConversation(id: string): Promise<void> {
  await fetch(`/api/conversations/${id}`, { method: 'DELETE' });
}
