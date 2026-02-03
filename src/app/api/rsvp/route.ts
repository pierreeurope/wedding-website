import { NextRequest, NextResponse } from 'next/server';

// This is a placeholder API route.
// When you deploy to AWS Amplify, you can:
// 1. Use AWS Amplify's built-in data storage (DynamoDB via Amplify DataStore)
// 2. Or connect to your own DynamoDB table via API Gateway
// 
// For now, this returns a success response.
// In production, implement actual database storage.

interface RSVPData {
  name: string;
  email: string;
  attending: 'yes' | 'no';
  guestCount: number;
  dietary: string;
  message: string;
  submittedAt: string;
}

// In-memory storage for development (resets on server restart)
const rsvpStore: RSVPData[] = [];

export async function POST(request: NextRequest) {
  try {
    const data: RSVPData = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.attending) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Store the RSVP (in production, save to DynamoDB)
    rsvpStore.push({
      ...data,
      submittedAt: new Date().toISOString(),
    });

    console.log('New RSVP received:', data);
    console.log('Total RSVPs:', rsvpStore.length);

    return NextResponse.json(
      { success: true, message: 'RSVP received successfully' },
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

export async function GET() {
  // This endpoint could be protected and used to view all RSVPs
  // For now, return the count
  return NextResponse.json({
    count: rsvpStore.length,
    // Uncomment below to return all data (should be protected in production)
    // data: rsvpStore,
  });
}
