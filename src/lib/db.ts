import { Redis } from '@upstash/redis';

// Initialize Redis client
// Uses Vercel KV environment variables
const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

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
  await redis.set(key, JSON.stringify(rsvp));
  
  // Also add to the list of all RSVPs
  const rsvpList = await redis.get<string[]>('rsvp:list') || [];
  if (!rsvpList.includes(rsvp.id)) {
    rsvpList.push(rsvp.id);
    await redis.set('rsvp:list', JSON.stringify(rsvpList));
  }
}

export async function getAllRSVPs(): Promise<RSVPEntry[]> {
  const rsvpListRaw = await redis.get<string | string[]>('rsvp:list');
  const rsvpList: string[] = typeof rsvpListRaw === 'string' 
    ? JSON.parse(rsvpListRaw) 
    : (rsvpListRaw || []);
  
  const rsvps: RSVPEntry[] = [];
  
  for (const id of rsvpList) {
    const rsvpRaw = await redis.get<string | RSVPEntry>(`rsvp:${id}`);
    if (rsvpRaw) {
      const rsvp: RSVPEntry = typeof rsvpRaw === 'string' ? JSON.parse(rsvpRaw) : rsvpRaw;
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
  const existingRaw = await redis.get<string | GiftClaim>(key);
  
  if (existingRaw) {
    return false; // Already claimed
  }
  
  const claim: GiftClaim = {
    giftId,
    claimedBy,
    claimedAt: new Date().toISOString(),
  };
  
  await redis.set(key, JSON.stringify(claim));
  
  // Add to claimed list
  const claimedListRaw = await redis.get<string | string[]>('gifts:claimed');
  const claimedList: string[] = typeof claimedListRaw === 'string' 
    ? JSON.parse(claimedListRaw) 
    : (claimedListRaw || []);
  
  if (!claimedList.includes(giftId)) {
    claimedList.push(giftId);
    await redis.set('gifts:claimed', JSON.stringify(claimedList));
  }
  
  return true;
}

export async function getClaimedGifts(): Promise<string[]> {
  const claimedListRaw = await redis.get<string | string[]>('gifts:claimed');
  return typeof claimedListRaw === 'string' 
    ? JSON.parse(claimedListRaw) 
    : (claimedListRaw || []);
}

export async function getAllGiftClaims(): Promise<Record<string, GiftClaim>> {
  const claimedList = await getClaimedGifts();
  const claims: Record<string, GiftClaim> = {};
  
  for (const giftId of claimedList) {
    const claimRaw = await redis.get<string | GiftClaim>(`gift:${giftId}`);
    if (claimRaw) {
      const claim: GiftClaim = typeof claimRaw === 'string' ? JSON.parse(claimRaw) : claimRaw;
      claims[giftId] = claim;
    }
  }
  
  return claims;
}
