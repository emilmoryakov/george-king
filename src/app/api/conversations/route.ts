import { NextResponse } from 'next/server';
import { conversations } from '@/lib/db';

export function GET() {
  return NextResponse.json(conversations);
}
