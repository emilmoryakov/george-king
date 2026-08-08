const db = [
  { id: 1, title: 'Weekend trip ideas' },
  { id: 2, title: 'CSS grid vs flexbox' },
];

export function listConversations() {
  return Promise.resolve([...db]);
}
