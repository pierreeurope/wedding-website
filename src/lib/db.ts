import { kv } from '@vercel/kv';

// Types
export interface RSVPEntry {
  id: string;
  name: string;
  email: string;
  attending: 'yes' | 'no';
  guestCount: number;
  guestNames: string;
  arrivalDate: string;
  departureDate: string;
  roomBooking: string | null;
  dietary: string;
  message: string;
  submittedAt: string;
}

export interface GiftClaim {
  giftId: string;
  claimedBy: string;
  claimedAt: string;
}

// RSVP Functions
export async function saveRSVP(rsvp: RSVPEntry): Promise<void> {
  const key = `rsvp:${rsvp.id}`;
  await kv.set(key, rsvp);
  
  // Also add to the list of all RSVPs
  const rsvpList = await kv.get<string[]>('rsvp:list') || [];
  if (!rsvpList.includes(rsvp.id)) {
    rsvpList.push(rsvp.id);
    await kv.set('rsvp:list', rsvpList);
  }
}

export async function getAllRSVPs(): Promise<RSVPEntry[]> {
  const rsvpList = await kv.get<string[]>('rsvp:list') || [];
  const rsvps: RSVPEntry[] = [];
  
  for (const id of rsvpList) {
    const rsvp = await kv.get<RSVPEntry>(`rsvp:${id}`);
    if (rsvp) {
      rsvps.push(rsvp);
    }
  }
  
  return rsvps.sort((a, b) => 
    new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );
}

export async function getRSVPStats(): Promise<{
  total: number;
  attending: number;
  notAttending: number;
  totalGuests: number;
}> {
  const rsvps = await getAllRSVPs();
  
  return {
    total: rsvps.length,
    attending: rsvps.filter(r => r.attending === 'yes').length,
    notAttending: rsvps.filter(r => r.attending === 'no').length,
    totalGuests: rsvps
      .filter(r => r.attending === 'yes')
      .reduce((sum, r) => sum + r.guestCount, 0),
  };
}

// Gift Functions
export async function claimGift(giftId: string, claimedBy: string): Promise<boolean> {
  const key = `gift:${giftId}`;
  const existing = await kv.get<GiftClaim>(key);
  
  if (existing) {
    return false; // Already claimed
  }
  
  await kv.set(key, {
    giftId,
    claimedBy,
    claimedAt: new Date().toISOString(),
  });
  
  return true;
}

export async function getClaimedGifts(): Promise<Record<string, GiftClaim>> {
  // Get all gift claims
  const claims: Record<string, GiftClaim> = {};
  
  // We'll store a list of claimed gift IDs
  const claimedList = await kv.get<string[]>('gifts:claimed') || [];
  
  for (const giftId of claimedList) {
    const claim = await kv.get<GiftClaim>(`gift:${giftId}`);
    if (claim) {
      claims[giftId] = claim;
    }
  }
  
  return claims;
}

export async function isGiftClaimed(giftId: string): Promise<boolean> {
  const claim = await kv.get<GiftClaim>(`gift:${giftId}`);
  return !!claim;
}

// Room Booking Functions
export async function getRoomBookings(): Promise<Record<string, string[]>> {
  // Returns roomId -> list of dates booked
  const bookings = await kv.get<Record<string, string[]>>('rooms:bookings') || {};
  return bookings;
}

export async function bookRoom(roomId: string, dates: string[], guestName: string): Promise<boolean> {
  const bookings = await getRoomBookings();
  
  // Check if any dates are already booked
  const roomBookings = bookings[roomId] || [];
  for (const date of dates) {
    if (roomBookings.includes(date)) {
      return false; // Date already booked
    }
  }
  
  // Add the new dates
  bookings[roomId] = [...roomBookings, ...dates];
  await kv.set('rooms:bookings', bookings);
  
  // Store booking details
  const bookingId = `${roomId}:${Date.now()}`;
  await kv.set(`room:booking:${bookingId}`, {
    roomId,
    dates,
    guestName,
    bookedAt: new Date().toISOString(),
  });
  
  return true;
}
