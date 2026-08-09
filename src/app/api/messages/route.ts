import { NextRequest, NextResponse } from 'next/server';
import { messages, addMessage } from '@/lib/db';

export function GET(request: NextRequest) {
  const conversationId = Number(request.nextUrl.searchParams.get('conversationId'));
  return NextResponse.json(messages.filter((m) => m.conversationId === conversationId));
}

export async function POST(request: NextRequest) {
  const { conversationId, content } = await request.json();
  return NextResponse.json(addMessage(conversationId, 'user', content), { status: 201 });
}
