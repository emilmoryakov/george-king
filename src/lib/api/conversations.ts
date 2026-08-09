import type { Conversation } from '../types';

export async function listConversations(): Promise<Conversation[]> {
  const response = await fetch('/api/conversations');
  return response.json();
}
