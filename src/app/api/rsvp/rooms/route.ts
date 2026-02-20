import { NextResponse } from 'next/server';
import { getAllRSVPs } from '@/lib/db';

export async function GET() {
  try {
    const rsvps = await getAllRSVPs();
    const bookedRooms = rsvps
      .filter(r => r.roomBooking)
      .map(r => r.roomBooking as string);
    return NextResponse.json({ bookedRooms });
  } catch (error) {
    console.error('Error fetching booked rooms:', error);
    return NextResponse.json({ bookedRooms: [] });
  }
}
