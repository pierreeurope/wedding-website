'use client';

import { useTranslations } from 'next-intl';

export default function AddToCalendar() {
  const t = useTranslations('schedule');

  const handleDownload = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Amalie & Pierre Wedding//EN',
      'BEGIN:VEVENT',
      'DTSTART:20261003T100000Z',
      'DTEND:20261004T000000Z',
      'SUMMARY:Wedding: Amalie & Pierre',
      'LOCATION:Burg Schwarzenstein\\, Rosengasse 32\\, 65366 Geisenheim\\, Germany',
      'DESCRIPTION:Church ceremony at 12:00 at Lutheran Church Geisenheim\\, followed by reception at Burg Schwarzenstein',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'amalie-pierre-wedding.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleDownload} className="btn-secondary inline-flex items-center gap-2">
      📅 {t('addToCalendar')}
    </button>
  );
}
