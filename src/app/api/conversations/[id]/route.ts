import { NextRequest, NextResponse } from 'next/server';
import { deleteConversation } from '@/lib/data';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await deleteConversation(id);
  return new NextResponse(null, { status: 204 });
}
