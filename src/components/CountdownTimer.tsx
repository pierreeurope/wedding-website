'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

const WEDDING_DATE = new Date('2026-10-03T10:00:00Z'); // 12:00 CEST

export default function CountdownTimer() {
  const t = useTranslations('home.countdown');
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date();
    const diff = WEDDING_DATE.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center gap-6 md:gap-10 mb-12">
      {(['days', 'hours', 'minutes', 'seconds'] as const).map((unit) => (
        <div key={unit} className="text-center">
          <div className="font-serif text-4xl md:text-5xl lg:text-6xl text-gold-200 font-semibold tabular-nums">
            {String(timeLeft[unit]).padStart(2, '0')}
          </div>
          <div className="text-xs md:text-sm tracking-widest uppercase text-white/80 mt-2">
            {t(unit)}
          </div>
        </div>
      ))}
    </div>
  );
}
