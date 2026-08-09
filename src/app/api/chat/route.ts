import { NextRequest, NextResponse } from 'next/server';
import { messages, addMessage } from '@/lib/db';

const MODEL = 'meta-llama/llama-3.3-70b-instruct:free';

const SYSTEM =
  'You are George, a courteous king. Answer helpfully and concisely, with an occasional royal flourish.';

export async function POST(request: NextRequest) {
  const { conversationId } = await request.json();

  const history = messages
    .filter((m) => m.conversationId === conversationId)
    .map(({ role, content }) => ({ role, content }));

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      // The key lives in .env.local and never reaches the browser.
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'system', content: SYSTEM }, ...history],
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: `OpenRouter answered ${response.status}` },
      { status: 502 },
    );
  }

  const data = await response.json();
  const reply = addMessage(conversationId, 'assistant', data.choices[0].message.content);
  return NextResponse.json(reply, { status: 201 });
}
