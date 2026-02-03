import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

interface GiftClaim {
  giftId: string;
  claimedBy: string;
  claimedAt: string;
}

export async function GET() {
  try {
    // Get all claimed gifts
    const claimedList = await kv.get<string[]>('gifts:claimed') || [];
    
    // Return just the IDs of claimed gifts (not who claimed them for privacy)
    return NextResponse.json({ claimedGifts: claimedList });
  } catch (error) {
    console.error('Error fetching gifts:', error);
    return NextResponse.json({ claimedGifts: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { giftId, claimedBy } = await request.json();
    
    if (!giftId || !claimedBy) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if already claimed
    const existingClaim = await kv.get<GiftClaim>(`gift:${giftId}`);
    if (existingClaim) {
      return NextResponse.json(
        { error: 'Gift already claimed', claimed: true },
        { status: 409 }
      );
    }

    // Claim the gift
    const claim: GiftClaim = {
      giftId,
      claimedBy,
      claimedAt: new Date().toISOString(),
    };
    
    await kv.set(`gift:${giftId}`, claim);
    
    // Add to claimed list
    const claimedList = await kv.get<string[]>('gifts:claimed') || [];
    if (!claimedList.includes(giftId)) {
      claimedList.push(giftId);
      await kv.set('gifts:claimed', claimedList);
    }

    return NextResponse.json({ success: true, message: 'Gift claimed successfully' });
  } catch (error) {
    console.error('Error claiming gift:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
