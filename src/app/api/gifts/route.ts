import { NextRequest, NextResponse } from 'next/server';
import { getClaimedGifts, claimGift } from '@/lib/db';

export async function GET() {
  try {
    const claimedGifts = await getClaimedGifts();
    return NextResponse.json({ claimedGifts });
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

    const success = await claimGift(giftId, claimedBy);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Gift already claimed', claimed: true },
        { status: 409 }
      );
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
