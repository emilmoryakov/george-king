import { NextRequest, NextResponse } from 'next/server';
import { createConversation } from '@/lib/data';

export async function POST(request: NextRequest) {
  const { title } = await request.json();
  return NextResponse.json(await createConversation(title), { status: 201 });
}
