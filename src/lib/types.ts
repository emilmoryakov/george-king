export type Conversation = {
  id: number;
  title: string;
};

export type Message = {
  id: number;
  conversationId: number;
  role: 'user' | 'assistant';
  content: string;
};
