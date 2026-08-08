const db = [
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

let nextId = db.length + 1;

export function listMessages(conversationId) {
  return Promise.resolve(db.filter((m) => m.conversationId === conversationId));
}

export function createMessage(conversationId, role, content) {
  const message = { id: nextId++, conversationId, role, content };
  db.push(message);
  return Promise.resolve(message);
}
