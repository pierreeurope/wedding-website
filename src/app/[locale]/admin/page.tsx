'use client';

import { useState, useEffect } from 'react';

interface RSVPEntry {
  id: string;
  name: string;
  phone?: string;
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

interface GiftClaim {
  giftId: string;
  claimedBy: string;
  claimedAt: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [rsvps, setRsvps] = useState<RSVPEntry[]>([]);
  const [giftClaims, setGiftClaims] = useState<Record<string, GiftClaim>>({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'rsvps' | 'gifts'>('rsvps');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setAdminPassword(password);
        setIsAuthenticated(true);
        loadData(password);
      } else {
        alert('Incorrect password');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  const loadData = async (pwd?: string) => {
    const authPassword = pwd || adminPassword;
    setLoading(true);
    try {
      // Load RSVPs
      const rsvpRes = await fetch('/api/rsvp', {
        headers: { 'x-admin-password': authPassword }
      });
      const rsvpData = await rsvpRes.json();
      setRsvps(rsvpData.data || []);

      // Load gift claims
      const giftRes = await fetch('/api/gifts/admin', {
        headers: { 'x-admin-password': authPassword }
      });
      const giftData = await giftRes.json();
      setGiftClaims(giftData.claims || {});
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  };

  // Stats
  const attendingCount = rsvps.filter(r => r.attending === 'yes').length;
  const notAttendingCount = rsvps.filter(r => r.attending === 'no').length;
  const totalGuests = rsvps
    .filter(r => r.attending === 'yes')
    .reduce((sum, r) => sum + r.guestCount, 0);
  const roomRequests = rsvps.filter(r => r.roomBooking).length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-primary-50">
        <div className="bg-white p-8 shadow-lg max-w-md w-full">
          <h1 className="font-serif text-2xl text-primary-800 mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="input-field mb-4"
              autoFocus
            />
            <button type="submit" className="btn-primary w-full">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif text-3xl text-primary-800">Wedding Admin</h1>
          <button 
            onClick={() => loadData()} 
            className="btn-secondary text-sm"
            disabled={loading}
          >
            {loading ? 'Loading...' : '🔄 Refresh'}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 shadow text-center">
            <div className="text-3xl font-bold text-sage-600">{attendingCount}</div>
            <div className="text-sm text-primary-600">Attending</div>
          </div>
          <div className="bg-white p-6 shadow text-center">
            <div className="text-3xl font-bold text-primary-400">{notAttendingCount}</div>
            <div className="text-sm text-primary-600">Not Attending</div>
          </div>
          <div className="bg-white p-6 shadow text-center">
            <div className="text-3xl font-bold text-gold-600">{totalGuests}</div>
            <div className="text-sm text-primary-600">Total Guests</div>
          </div>
          <div className="bg-white p-6 shadow text-center">
            <div className="text-3xl font-bold text-primary-700">{roomRequests}</div>
            <div className="text-sm text-primary-600">Room Requests</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('rsvps')}
            className={`px-6 py-2 font-medium transition-colors ${
              activeTab === 'rsvps' 
                ? 'bg-primary-800 text-white' 
                : 'bg-white text-primary-600 hover:bg-primary-100'
            }`}
          >
            RSVPs ({rsvps.length})
          </button>
          <button
            onClick={() => setActiveTab('gifts')}
            className={`px-6 py-2 font-medium transition-colors ${
              activeTab === 'gifts' 
                ? 'bg-primary-800 text-white' 
                : 'bg-white text-primary-600 hover:bg-primary-100'
            }`}
          >
            Gift Claims ({Object.keys(giftClaims).length})
          </button>
        </div>

        {/* RSVP List */}
        {activeTab === 'rsvps' && (
          <div className="bg-white shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-primary-700">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-primary-700">Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-primary-700">Email</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-primary-700">Attending</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-primary-700">Guests</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-primary-700">Dates</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-primary-700">Room</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-primary-700">Dietary</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-primary-700">Message</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-primary-700">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rsvps.map((rsvp) => (
                  <tr key={rsvp.id} className={rsvp.attending === 'yes' ? 'bg-sage-50' : 'bg-gray-50'}>
                    <td className="px-4 py-3 text-sm">
                      <div className="font-medium">{rsvp.name}</div>
                      {rsvp.guestNames && (
                        <div className="text-xs text-gray-500">+ {rsvp.guestNames}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{rsvp.phone || '—'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{rsvp.email || '—'}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 text-xs rounded ${
                        rsvp.attending === 'yes' 
                          ? 'bg-sage-200 text-sage-800' 
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {rsvp.attending === 'yes' ? '✓ Yes' : '✗ No'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-sm">{rsvp.guestCount}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {rsvp.arrivalDate && (
                        <div>{rsvp.arrivalDate} → {rsvp.departureDate}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {rsvp.roomBooking ? (
                        <span className="text-gold-600">🏰 {rsvp.roomBooking}</span>
                      ) : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-[150px] truncate">
                      {rsvp.dietary || '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-[200px] truncate">
                      {rsvp.message || '-'}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {new Date(rsvp.submittedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {rsvps.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                      No RSVPs yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Gift Claims */}
        {activeTab === 'gifts' && (
          <div className="bg-white shadow">
            <div className="divide-y divide-gray-200">
              {Object.entries(giftClaims).map(([giftId, claim]) => (
                <div key={giftId} className="px-6 py-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium text-primary-800">{giftId}</div>
                    <div className="text-sm text-gray-600">Claimed by: {claim.claimedBy}</div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(claim.claimedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
              {Object.keys(giftClaims).length === 0 && (
                <div className="px-6 py-8 text-center text-gray-500">
                  No gifts claimed yet
                </div>
              )}
            </div>
          </div>
        )}

        {/* Export Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              const csv = [
                ['Name', 'Email', 'Attending', 'Guests', 'Guest Names', 'Arrival', 'Departure', 'Room', 'Dietary', 'Message', 'Submitted'].join(','),
                ...rsvps.map(r => [
                  `"${r.name}"`,
                  r.email,
                  r.attending,
                  r.guestCount,
                  `"${r.guestNames}"`,
                  r.arrivalDate,
                  r.departureDate,
                  r.roomBooking || '',
                  `"${r.dietary}"`,
                  `"${r.message}"`,
                  r.submittedAt
                ].join(','))
              ].join('\n');
              
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `wedding-rsvps-${new Date().toISOString().split('T')[0]}.csv`;
              a.click();
            }}
            className="btn-secondary"
          >
            📥 Export RSVPs to CSV
          </button>
        </div>
      </div>
    </div>
  );
}
