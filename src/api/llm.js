const MODEL = 'meta-llama/llama-3.3-70b-instruct:free';

const SYSTEM =
  'You are George, a courteous king. Answer helpfully and concisely, with an occasional royal flourish.';

// The key is asked for once and kept in localStorage — never in the repo.
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

export async function complete(messages) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM },
        ...messages.map(({ role, content }) => ({ role, content })),
      ],
    }),
  });

  if (!response.ok) {
    localStorage.removeItem('openrouter-key');
    throw new Error(`OpenRouter answered ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
