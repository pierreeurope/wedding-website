import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

interface GiftClaim {
  giftId: string;
  claimedBy: string;
  claimedAt: string;
}

export async function GET() {
  try {
    const claimedList = await kv.get<string[]>('gifts:claimed') || [];
    const claims: Record<string, GiftClaim> = {};
    
    for (const giftId of claimedList) {
      const claim = await kv.get<GiftClaim>(`gift:${giftId}`);
      if (claim) {
        claims[giftId] = claim;
      }
    }
    
    return NextResponse.json({ claims });
  } catch (error) {
    console.error('Error fetching gift claims:', error);
    return NextResponse.json({ claims: {} });
  }
}
