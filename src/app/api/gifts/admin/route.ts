import { NextResponse } from 'next/server';
import { getAllGiftClaims } from '@/lib/db';

export async function GET() {
  try {
    const claims = await getAllGiftClaims();
    return NextResponse.json({ claims });
  } catch (error) {
    console.error('Error fetching gift claims:', error);
    return NextResponse.json({ claims: {} });
  }
}
