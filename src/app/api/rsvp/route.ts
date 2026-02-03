import { NextRequest, NextResponse } from 'next/server';
import { saveRSVP, getAllRSVPs, getRSVPStats, RSVPEntry } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.attending) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const rsvp: RSVPEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: data.name,
      email: data.email,
      attending: data.attending,
      guestCount: data.guestCount || 1,
      guestNames: data.guestNames || '',
      arrivalDate: data.arrivalDate || '',
      departureDate: data.departureDate || '',
      roomBooking: data.roomBooking || null,
      dietary: data.dietary || '',
      message: data.message || '',
      submittedAt: new Date().toISOString(),
    };

    await saveRSVP(rsvp);

    return NextResponse.json(
      { success: true, message: 'RSVP received successfully', id: rsvp.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('RSVP submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const statsOnly = searchParams.get('stats') === 'true';
    
    if (statsOnly) {
      const stats = await getRSVPStats();
      return NextResponse.json(stats);
    }
    
    const rsvps = await getAllRSVPs();
    return NextResponse.json({ count: rsvps.length, data: rsvps });
  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
