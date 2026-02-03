'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-primary-800 text-primary-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Decorative element */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-12 bg-primary-400"></div>
            <span className="mx-4 text-gold-400 text-2xl">♥</span>
            <div className="h-px w-12 bg-primary-400"></div>
          </div>

          <p className="font-serif text-2xl mb-2">Amalie & Pierre</p>
          <p className="text-primary-300 text-sm">October 3rd, 2026</p>
          
          <div className="mt-8 pt-8 border-t border-primary-700">
            <p className="text-primary-400 text-sm">
              {t('madeWith')} ♥ | {t('copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
