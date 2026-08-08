import { streamReply } from './api.js';
import { addMessage, appendText } from './chat.js';

const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');

const messages = [
  {
    role: 'system',
    content:
      'You are George, a courteous king. Answer helpfully and concisely, with an occasional royal flourish.',
  },
];

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) {
    return;
  }

  input.value = '';
  input.focus();
  addMessage(text, 'me');
  messages.push({ role: 'user', content: text });

  const bubble = addMessage('', 'bot');
  try {
    const reply = await streamReply(messages, (delta) => appendText(bubble, delta));
    messages.push({ role: 'assistant', content: reply });
  } catch (error) {
    appendText(bubble, `The king is unavailable: ${error.message}`);
  }
});
