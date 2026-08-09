import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { saveMessage } from '@/lib/data';

const MODEL = 'openai/gpt-oss-20b:free';

const SYSTEM =
  'You are George, a courteous king. Answer helpfully and concisely, with an occasional royal flourish.';

const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });

export async function POST(request: Request) {
  const { messages, conversationId } = (await request.json()) as {
    messages: UIMessage[];
    conversationId: string;
  };

  // Persist the user message before the model sees it.
  const last = messages[messages.length - 1];
  const text = last.parts.map((part) => (part.type === 'text' ? part.text : '')).join('');
  await saveMessage(conversationId, 'user', text);

  const result = streamText({
    model: openrouter(MODEL),
    system: SYSTEM,
    messages: await convertToModelMessages(messages),
    onFinish: async ({ text: reply }) => {
      await saveMessage(conversationId, 'assistant', reply);
    },
  });

  return result.toUIMessageStreamResponse();
}
