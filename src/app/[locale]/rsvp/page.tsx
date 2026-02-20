'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

// Room definitions with availability dates
// Castle building rooms: only available Sat Oct 3 - Mon Oct 5
// Parkresidenz & Guest House: available Fri Oct 2 - Mon Oct 5
const CASTLE_ROOMS = [
  // Parkresidenz (Fri Oct 2 - Mon Oct 5)
  { id: 'junior-suite', nameKey: 'rooms.juniorSuite', price: 340, category: 'parkresidenz', earliestArrival: '2026-10-02' },
  { id: 'deluxe', nameKey: 'rooms.deluxe', price: 270, category: 'parkresidenz', earliestArrival: '2026-10-02' },
  { id: 'classic-1', nameKey: 'rooms.classic', price: 250, category: 'parkresidenz', earliestArrival: '2026-10-02', suffix: ' 1' },
  { id: 'classic-2', nameKey: 'rooms.classic', price: 250, category: 'parkresidenz', earliestArrival: '2026-10-02', suffix: ' 2' },
  { id: 'classic-3', nameKey: 'rooms.classic', price: 250, category: 'parkresidenz', earliestArrival: '2026-10-02', suffix: ' 3' },
  // Castle Building (Sat Oct 3 - Mon Oct 5)
  { id: 'turm-suite', nameKey: 'rooms.towerSuite', price: 340, category: 'castle', earliestArrival: '2026-10-03' },
  { id: 'turmzimmer', nameKey: 'rooms.towerRoom', price: 260, category: 'castle', earliestArrival: '2026-10-03' },
  { id: 'superior-1', nameKey: 'rooms.superior', price: 240, category: 'castle', earliestArrival: '2026-10-03', suffix: ' 1' },
  { id: 'superior-2', nameKey: 'rooms.superior', price: 240, category: 'castle', earliestArrival: '2026-10-03', suffix: ' 2' },
  { id: 'komfort-1', nameKey: 'rooms.comfort', price: 220, category: 'castle', earliestArrival: '2026-10-03' , suffix: ' 1' },
  { id: 'komfort-2', nameKey: 'rooms.comfort', price: 220, category: 'castle', earliestArrival: '2026-10-03', suffix: ' 2' },
  { id: 'komfort-3', nameKey: 'rooms.comfort', price: 220, category: 'castle', earliestArrival: '2026-10-03', suffix: ' 3' },
  // Guest House (Fri Oct 2 - Mon Oct 5)
  { id: 'gaestehaus-160', nameKey: 'rooms.guestRoom160', price: 160, category: 'guesthouse', earliestArrival: '2026-10-02' },
  { id: 'gaestehaus-140-1', nameKey: 'rooms.guestRoom140', price: 160, category: 'guesthouse', earliestArrival: '2026-10-02', suffix: ' 1' },
  { id: 'gaestehaus-140-2', nameKey: 'rooms.guestRoom140', price: 160, category: 'guesthouse', earliestArrival: '2026-10-02', suffix: ' 2' },
];

interface RSVPFormData {
  name: string;
  phone: string;
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
    phone: '',
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
  const [bookedRooms, setBookedRooms] = useState<string[]>([]);

  // Fetch booked rooms on mount
  useEffect(() => {
    const fetchBookedRooms = async () => {
      try {
        const res = await fetch('/api/rsvp/rooms');
        const data = await res.json();
        setBookedRooms(data.bookedRooms || []);
      } catch (error) {
        console.error('Error fetching booked rooms:', error);
      }
    };
    fetchBookedRooms();
  }, []);

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
          phone: '',
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
            <p className="text-primary-600 mt-2">{t('weddingDate')}</p>
          </div>

          {submitStatus === 'success' ? (
            <div className="bg-sage-50 border border-sage-300 p-8 text-center">
              <span className="text-4xl mb-4 block">🎉</span>
              <p className="text-sage-800 text-lg font-medium">{t('form.success')}</p>
              <p className="text-sage-600 mt-2">{t('form.successDetail')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-primary-700 font-medium mb-2">
                  {t('form.name')} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder={t('form.namePlaceholder')}
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-primary-700 font-medium mb-2">
                  {t('form.phone')} *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder={t('form.phonePlaceholder')}
                />
              </div>

              {/* Email (optional) */}
              <div>
                <label htmlFor="email" className="block text-primary-700 font-medium mb-2">
                  {t('form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder={t('form.emailPlaceholder')}
                />
              </div>

              {/* Attending */}
              <div>
                <label className="block text-primary-700 font-medium mb-4">
                  {t('form.attending')} *
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
                        {t('form.yes')}
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
                        {t('form.no')}
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
                      {t('form.guests')} *
                    </label>
                    <select
                      id="guestCount"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleChange}
                      className="input-field"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>{num} {num === 1 ? t('form.person') : t('form.people')}</option>
                      ))}
                    </select>
                  </div>

                  {/* Guest Names */}
                  {formData.guestCount > 1 && (
                    <div>
                      <label htmlFor="guestNames" className="block text-primary-700 font-medium mb-2">
                        {t('form.guestNames')}
                      </label>
                      <textarea
                        id="guestNames"
                        name="guestNames"
                        rows={2}
                        value={formData.guestNames}
                        onChange={handleChange}
                        placeholder={t('form.guestNamesPlaceholder')}
                        className="input-field resize-none"
                      />
                    </div>
                  )}

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="arrivalDate" className="block text-primary-700 font-medium mb-2">
                        {t('form.arrivalDate')}
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
                        {t('form.departureDate')}
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
                      🏰 {t('form.roomBooking')}
                    </label>
                    <p className="text-sm text-primary-500 mb-3">
                      {t('form.roomBookingNote')}
                    </p>
                    <select
                      id="roomBooking"
                      name="roomBooking"
                      value={formData.roomBooking}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">{t('form.noRoom')}</option>
                      <optgroup label={`🌳 ${t('form.roomCategories.parkresidenz')}`}>
                        {CASTLE_ROOMS.filter(r => r.category === 'parkresidenz').map((room) => {
                          const isBooked = bookedRooms.includes(room.id);
                          return (
                            <option key={room.id} value={room.id} disabled={isBooked}>
                              {t(room.nameKey)}{room.suffix || ''} - €{room.price}{t('form.perNight')}
                              {isBooked ? ` ${t('form.roomBooked')}` : ''}
                            </option>
                          );
                        })}
                      </optgroup>
                      <optgroup label={`🏰 ${t('form.roomCategories.castle')}`}>
                        {CASTLE_ROOMS.filter(r => r.category === 'castle').map((room) => {
                          const isBooked = bookedRooms.includes(room.id);
                          return (
                            <option key={room.id} value={room.id} disabled={isBooked}>
                              {t(room.nameKey)}{room.suffix || ''} - €{room.price}{t('form.perNight')}
                              {isBooked ? ` ${t('form.roomBooked')}` : ''}
                            </option>
                          );
                        })}
                      </optgroup>
                      <optgroup label={`🏠 ${t('form.roomCategories.guesthouse')}`}>
                        {CASTLE_ROOMS.filter(r => r.category === 'guesthouse').map((room) => {
                          const isBooked = bookedRooms.includes(room.id);
                          return (
                            <option key={room.id} value={room.id} disabled={isBooked}>
                              {t(room.nameKey)}{room.suffix || ''} - €{room.price}{t('form.perNight')}
                              {isBooked ? ` ${t('form.roomBooked')}` : ''}
                            </option>
                          );
                        })}
                      </optgroup>
                    </select>
                  </div>

                  {/* Dietary Restrictions */}
                  <div>
                    <label htmlFor="dietary" className="block text-primary-700 font-medium mb-2">
                      {t('form.dietary')}
                    </label>
                    <textarea
                      id="dietary"
                      name="dietary"
                      rows={2}
                      value={formData.dietary}
                      onChange={handleChange}
                      placeholder={t('form.dietaryPlaceholder')}
                      className="input-field resize-none"
                    />
                  </div>
                </>
              )}

              {/* Message (optional but encouraged) */}
              <div>
                <label htmlFor="message" className="block text-primary-700 font-medium mb-2">
                  {t('form.message')} 💌
                </label>
                <p className="text-sm text-primary-500 mb-2">{t('form.messageHint')}</p>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('form.messagePlaceholder')}
                  className="input-field resize-none"
                />
              </div>

              {/* Error message */}
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 p-4 text-red-700 text-center">
                  {t('form.error')}
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
                  {isSubmitting ? t('form.submitting') : t('form.submit')}
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
            {t('form.contactTrouble')}
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
