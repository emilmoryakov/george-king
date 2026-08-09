// In-memory mock database, server-side only. Resets on restart — real
// persistence is a later assignment.
import type { Conversation, Message } from './types';

export const conversations: Conversation[] = [
  { id: 1, title: 'Weekend trip ideas' },
  { id: 2, title: 'CSS grid vs flexbox' },
];

export const messages: Message[] = [
  {
    id: 1,
    conversationId: 1,
    role: 'user',
    content: 'I need a few ideas for a weekend trip, somewhere cheap.',
  },
  {
    id: 2,
    conversationId: 1,
    role: 'assistant',
    content:
      'Then I decree: a night train, a small town nobody visits, and a very long breakfast. Shall I elaborate?',
  },
  {
    id: 3,
    conversationId: 2,
    role: 'user',
    content: 'When should I use grid instead of flexbox?',
  },
  {
    id: 4,
    conversationId: 2,
    role: 'assistant',
    content:
      'Grid rules over two dimensions, rows and columns alike. Flexbox governs a single file of subjects. Choose accordingly.',
  },
];

let nextId = messages.length + 1;

export function addMessage(
  conversationId: number,
  role: Message['role'],
  content: string,
): Message {
  const message = { id: nextId++, conversationId, role, content };
  messages.push(message);
  return message;
}
