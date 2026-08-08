const MODEL = 'meta-llama/llama-3.3-70b-instruct:free';

function apiKey() {
  let key = localStorage.getItem('openrouter-key');
  if (!key) {
    key = window.prompt('Paste your OpenRouter API key (kept in this browser only):');
    if (key) {
      localStorage.setItem('openrouter-key', key.trim());
    }
  }
  return key;
}

export async function streamReply(messages, onDelta) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: MODEL, messages, stream: true }),
  });

  if (!response.ok) {
    localStorage.removeItem('openrouter-key');
    throw new Error(`OpenRouter answered ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let reply = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop();

    for (const line of lines) {
      if (!line.startsWith('data: ') || line.includes('[DONE]')) {
        continue;
      }
      const delta = JSON.parse(line.slice(6)).choices[0].delta.content;
      if (delta) {
        reply += delta;
        onDelta(delta);
      }
    }
  }

  return reply;
}
