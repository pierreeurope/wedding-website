'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

// Castle rooms available for booking (from Burg Schwarzenstein)
const CASTLE_ROOMS = [
  // Castle Building (Burggebäude)
  { id: 'turm-suite', name: 'Turm Suite', capacity: 2, price: '€340/night', description: 'Castle tower suite - the most romantic option', category: 'Castle' },
  { id: 'turmzimmer', name: 'Turmzimmer', capacity: 2, price: '€260-340/night', description: 'Tower room with castle views', category: 'Castle' },
  { id: 'superior-1', name: 'Superiorzimmer 1', capacity: 2, price: '€240-260/night', description: 'Superior room in the castle', category: 'Castle' },
  { id: 'superior-2', name: 'Superiorzimmer 2', capacity: 2, price: '€240-260/night', description: 'Superior room in the castle', category: 'Castle' },
  { id: 'komfort-1', name: 'Komfortzimmer 1', capacity: 2, price: '€220-240/night', description: 'Comfort room in the castle', category: 'Castle' },
  { id: 'komfort-2', name: 'Komfortzimmer 2', capacity: 2, price: '€220-240/night', description: 'Comfort room in the castle', category: 'Castle' },
  { id: 'komfort-3', name: 'Komfortzimmer 3', capacity: 2, price: '€220-240/night', description: 'Comfort room in the castle', category: 'Castle' },
  // Park Residence (Parkresidenz)
  { id: 'panorama-suite', name: 'Panorama Suite', capacity: 2, price: '€490/night', description: 'Luxurious suite with panoramic vineyard views', category: 'Park Residence' },
  { id: 'junior-suite', name: 'Junior Suite', capacity: 2, price: '€270-340/night', description: 'Elegant junior suite', category: 'Park Residence' },
  { id: 'deluxe', name: 'De Luxe Zimmer', capacity: 2, price: '€250-270/night', description: 'Spacious deluxe room', category: 'Park Residence' },
  // Guest House (Gästehaus)
  { id: 'gaestehaus-1', name: 'Gästehausszimmer (1.60m bed)', capacity: 2, price: '€180/night', description: 'Cozy guest house room with queen bed', category: 'Guest House' },
  { id: 'gaestehaus-2', name: 'Gästehausszimmer (1.40m bed)', capacity: 2, price: '€160-180/night', description: 'Cozy guest house room with double bed', category: 'Guest House' },
];

interface RSVPFormData {
  name: string;
  email: string;
  attending: 'yes' | 'no' | '';
  guestCount: number;
  guestNames: string;
  arrivalDate: string;
  departureDate: string;
  roomBooking: string;
  dietary: string;
  message: string;
}

export default function RSVPPage() {
  const t = useTranslations('rsvp');
  const [formData, setFormData] = useState<RSVPFormData>({
    name: '',
    email: '',
    attending: '',
    guestCount: 1,
    guestNames: '',
    arrivalDate: '2026-10-02',
    departureDate: '2026-10-04',
    roomBooking: '',
    dietary: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          attending: '',
          guestCount: 1,
          guestNames: '',
          arrivalDate: '2026-10-02',
          departureDate: '2026-10-04',
          roomBooking: '',
          dietary: '',
          message: '',
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('RSVP error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'guestCount' ? parseInt(value) || 1 : value,
    }));
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-24 bg-primary-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-title">{t('title')}</h1>
          <p className="section-subtitle">{t('subtitle')}</p>
        </div>
      </section>

      {/* Form */}
      <section className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gold-600 font-medium">{t('deadline')}</p>
            <p className="text-primary-600 mt-2">Wedding: Saturday, October 3rd, 2026</p>
          </div>

          {submitStatus === 'success' ? (
            <div className="bg-sage-50 border border-sage-300 p-8 text-center">
              <span className="text-4xl mb-4 block">🎉</span>
              <p className="text-sage-800 text-lg font-medium">{t('form.success')}</p>
              <p className="text-sage-600 mt-2">We&apos;ll be in touch with more details soon!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-primary-700 font-medium mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Full name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-primary-700 font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="your@email.com"
                />
              </div>

              {/* Attending */}
              <div>
                <label className="block text-primary-700 font-medium mb-4">
                  Will you be joining us? *
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <label className={`flex-1 p-4 border-2 cursor-pointer transition-all ${
                    formData.attending === 'yes' 
                      ? 'border-sage-500 bg-sage-50' 
                      : 'border-primary-200 hover:border-primary-300'
                  }`}>
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={formData.attending === 'yes'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="flex items-center justify-center">
                      <span className="text-2xl mr-2">🎉</span>
                      <span className={formData.attending === 'yes' ? 'text-sage-700 font-medium' : 'text-primary-600'}>
                        Yes, I&apos;ll be there!
                      </span>
                    </span>
                  </label>
                  <label className={`flex-1 p-4 border-2 cursor-pointer transition-all ${
                    formData.attending === 'no' 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-primary-200 hover:border-primary-300'
                  }`}>
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={formData.attending === 'no'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="flex items-center justify-center">
                      <span className="text-2xl mr-2">😢</span>
                      <span className={formData.attending === 'no' ? 'text-primary-700 font-medium' : 'text-primary-600'}>
                        Sorry, can&apos;t make it
                      </span>
                    </span>
                  </label>
                </div>
              </div>

              {/* Attending-specific fields */}
              {formData.attending === 'yes' && (
                <>
                  {/* Guest Count */}
                  <div>
                    <label htmlFor="guestCount" className="block text-primary-700 font-medium mb-2">
                      How many guests (including yourself)? *
                    </label>
                    <select
                      id="guestCount"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleChange}
                      className="input-field"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                      ))}
                    </select>
                  </div>

                  {/* Guest Names */}
                  {formData.guestCount > 1 && (
                    <div>
                      <label htmlFor="guestNames" className="block text-primary-700 font-medium mb-2">
                        Names of your guests
                      </label>
                      <textarea
                        id="guestNames"
                        name="guestNames"
                        rows={2}
                        value={formData.guestNames}
                        onChange={handleChange}
                        placeholder="e.g., Jane Doe, John Smith"
                        className="input-field resize-none"
                      />
                    </div>
                  )}

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="arrivalDate" className="block text-primary-700 font-medium mb-2">
                        Arrival Date
                      </label>
                      <input
                        type="date"
                        id="arrivalDate"
                        name="arrivalDate"
                        value={formData.arrivalDate}
                        onChange={handleChange}
                        min="2026-10-01"
                        max="2026-10-05"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label htmlFor="departureDate" className="block text-primary-700 font-medium mb-2">
                        Departure Date
                      </label>
                      <input
                        type="date"
                        id="departureDate"
                        name="departureDate"
                        value={formData.departureDate}
                        onChange={handleChange}
                        min="2026-10-02"
                        max="2026-10-06"
                        className="input-field"
                      />
                    </div>
                  </div>

                  {/* Room Booking */}
                  <div>
                    <label htmlFor="roomBooking" className="block text-primary-700 font-medium mb-2">
                      🏰 Book a room at the castle?
                    </label>
                    <p className="text-sm text-primary-500 mb-3">
                      Limited rooms available at Burg Schwarzenstein. Contact us for availability.
                    </p>
                    <select
                      id="roomBooking"
                      name="roomBooking"
                      value={formData.roomBooking}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">No, I&apos;ll arrange my own accommodation</option>
                      <optgroup label="🏰 Castle Building (Burggebäude)">
                        {CASTLE_ROOMS.filter(r => r.category === 'Castle').map((room) => (
                          <option key={room.id} value={room.id}>
                            {room.name} - {room.price}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="🌳 Park Residence (Parkresidenz)">
                        {CASTLE_ROOMS.filter(r => r.category === 'Park Residence').map((room) => (
                          <option key={room.id} value={room.id}>
                            {room.name} - {room.price}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="🏠 Guest House (Gästehaus)">
                        {CASTLE_ROOMS.filter(r => r.category === 'Guest House').map((room) => (
                          <option key={room.id} value={room.id}>
                            {room.name} - {room.price}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  {/* Dietary Restrictions */}
                  <div>
                    <label htmlFor="dietary" className="block text-primary-700 font-medium mb-2">
                      Dietary Requirements
                    </label>
                    <textarea
                      id="dietary"
                      name="dietary"
                      rows={2}
                      value={formData.dietary}
                      onChange={handleChange}
                      placeholder="Vegetarian, vegan, allergies, etc."
                      className="input-field resize-none"
                    />
                  </div>
                </>
              )}

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-primary-700 font-medium mb-2">
                  Message for the couple 💌
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any message you'd like to share..."
                  className="input-field resize-none"
                />
              </div>

              {/* Error message */}
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 p-4 text-red-700 text-center">
                  Something went wrong. Please try again or contact us directly.
                </div>
              )}

              {/* Submit */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.attending}
                  className={`btn-primary min-w-[200px] ${
                    isSubmitting || !formData.attending ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send RSVP'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Contact fallback */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-primary-600 mb-4">
            Having trouble? Contact us directly:
          </p>
          <p>
            <a href="mailto:pierre.blanchet.engineer@gmail.com" className="text-gold-600 hover:text-gold-700">
              pierre.blanchet.engineer@gmail.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
