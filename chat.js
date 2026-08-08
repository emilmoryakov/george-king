class ChatMessage extends HTMLElement {
  connectedCallback() {
    const mine = this.getAttribute('sender') === 'me';
    this.className = mine
      ? 'block max-w-[75%] self-end rounded-2xl rounded-br-sm bg-violet-600 px-4 py-2 text-white'
      : 'block max-w-[75%] self-start rounded-2xl rounded-bl-sm bg-zinc-800 px-4 py-2';
  }
}

customElements.define('chat-message', ChatMessage);

const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) {
    return;
  }

  const message = document.createElement('chat-message');
  message.setAttribute('sender', 'me');
  message.textContent = text;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;

  input.value = '';
  input.focus();
});
