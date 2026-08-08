class ChatMessage extends HTMLElement {
  connectedCallback() {
    const mine = this.getAttribute('sender') === 'me';
    this.className = mine
      ? 'block max-w-[75%] self-end rounded-2xl rounded-br-sm bg-violet-600 px-4 py-2 text-white'
      : 'block max-w-[75%] self-start rounded-2xl rounded-bl-sm bg-zinc-800 px-4 py-2';
  }
}

customElements.define('chat-message', ChatMessage);

const list = document.getElementById('messages');

export function addMessage(text, sender) {
  const message = document.createElement('chat-message');
  message.setAttribute('sender', sender);
  message.textContent = text;
  list.appendChild(message);
  scrollDown();
  return message;
}

export function appendText(message, text) {
  message.textContent += text;
  scrollDown();
}

function scrollDown() {
  list.scrollTop = list.scrollHeight;
}
