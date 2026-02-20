import { NextRequest, NextResponse } from 'next/server';
import { saveRSVP, getAllRSVPs, getRSVPStats, RSVPEntry } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields (name, phone, attending; email is optional)
    if (!data.name || !data.phone || !data.attending) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const rsvp: RSVPEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: data.name,
      phone: data.phone,
      email: data.email || '',
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
    // Check authentication via cookie or header
    const cookie = request.cookies.get('site-auth');
    const adminPasswordHeader = request.headers.get('x-admin-password');
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    const isAuthenticatedViaCookie = cookie?.value === 'authenticated';
    const isAuthenticatedViaHeader = adminPasswordHeader && adminPassword && adminPasswordHeader === adminPassword;
    
    if (!isAuthenticatedViaCookie && !isAuthenticatedViaHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
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
