'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface RSVPFormData {
  name: string;
  email: string;
  attending: 'yes' | 'no' | '';
  guestCount: number;
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
      // For now, we'll store in localStorage and show success
      // When Amplify is configured, this will POST to the API
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          attending: '',
          guestCount: 1,
          dietary: '',
          message: '',
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      // Fallback: save to localStorage for demo purposes
      const existingRSVPs = JSON.parse(localStorage.getItem('wedding-rsvps') || '[]');
      existingRSVPs.push({
        ...formData,
        submittedAt: new Date().toISOString(),
        id: Date.now().toString(),
      });
      localStorage.setItem('wedding-rsvps', JSON.stringify(existingRSVPs));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        attending: '',
        guestCount: 1,
        dietary: '',
        message: '',
      });
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
          </div>

          {submitStatus === 'success' ? (
            <div className="bg-sage-50 border border-sage-300 p-8 text-center">
              <span className="text-4xl mb-4 block">🎉</span>
              <p className="text-sage-800 text-lg font-medium">{t('form.success')}</p>
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
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-primary-700 font-medium mb-2">
                  {t('form.email')} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
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

              {/* Guest Count - only show if attending */}
              {formData.attending === 'yes' && (
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
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Dietary Restrictions - only show if attending */}
              {formData.attending === 'yes' && (
                <div>
                  <label htmlFor="dietary" className="block text-primary-700 font-medium mb-2">
                    {t('form.dietary')}
                  </label>
                  <textarea
                    id="dietary"
                    name="dietary"
                    rows={3}
                    value={formData.dietary}
                    onChange={handleChange}
                    placeholder={t('form.dietaryPlaceholder')}
                    className="input-field resize-none"
                  />
                </div>
              )}

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-primary-700 font-medium mb-2">
                  {t('form.message')}
                </label>
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
                  {isSubmitting ? 'Sending...' : t('form.submit')}
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
            Having trouble with the form? Contact us directly:
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
