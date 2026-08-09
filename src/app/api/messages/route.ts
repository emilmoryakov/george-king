import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const conversationId = request.nextUrl.searchParams.get('conversationId') ?? '';
  const messages = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: 'asc' },
  });
  return NextResponse.json(messages);
}

export async function POST(request: NextRequest) {
  const { conversationId, content } = await request.json();
  const message = await prisma.message.create({
    data: { conversationId, role: 'user', content },
  });
  return NextResponse.json(message, { status: 201 });
}
