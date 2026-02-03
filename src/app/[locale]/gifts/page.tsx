'use client';

import { useTranslations } from 'next-intl';

interface GiftItem {
  name: string;
  description: string;
  price: string;
}

export default function GiftsPage() {
  const t = useTranslations('gifts');
  
  // Get gift items from translations
  const giftItems = t.raw('giftList.items') as GiftItem[];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-24 bg-primary-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-title">{t('title')}</h1>
          <p className="section-subtitle">{t('subtitle')}</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-lg text-primary-600">
            {t('intro')}
          </p>
        </div>
      </section>

      {/* Monetary Contribution - Primary */}
      <section className="py-24 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white p-8 md:p-12 border-2 border-gold-300 shadow-lg">
            <div className="text-center mb-8">
              <span className="text-5xl">💝</span>
              <h2 className="font-serif text-3xl text-primary-800 mt-4">{t('monetary.title')}</h2>
              <div className="h-px w-24 bg-gold-500 mx-auto my-6"></div>
            </div>
            
            <p className="text-primary-600 text-center text-lg mb-8">
              {t('monetary.description')}
            </p>
            
            <div className="bg-gold-50 p-6 text-center border border-gold-200">
              <p className="text-primary-700">
                {t('monetary.details')}
              </p>
              <a 
                href="mailto:pierre.blanchet.engineer@gmail.com?subject=Wedding Gift - Bank Details Request"
                className="btn-primary mt-6 inline-block"
              >
                Request Bank Details
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gift List */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl text-primary-800 mb-2">{t('giftList.title')}</h2>
            <p className="text-primary-600">{t('giftList.description')}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {giftItems.map((gift, index) => (
              <div 
                key={index}
                className="card relative"
              >
                <h3 className="font-serif text-xl text-primary-800 mb-2">{gift.name}</h3>
                <p className="text-primary-500 text-sm mb-4">{gift.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gold-600 font-medium">{gift.price}</span>
                  <a
                    href={`mailto:pierre.blanchet.engineer@gmail.com?subject=Wedding Gift - ${gift.name}`}
                    className="text-sm text-primary-600 hover:text-primary-800 underline"
                  >
                    I'd like to gift this
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 p-6 bg-primary-50 border border-primary-200">
            <p className="text-primary-600 italic">
              {t('giftList.note')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-primary-800 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-primary-200 mb-6">{t('contact')}</p>
          <div className="space-y-2">
            <p>
              <a href="mailto:pierre.blanchet.engineer@gmail.com" className="text-gold-300 hover:text-gold-200">
                pierre.blanchet.engineer@gmail.com
              </a>
            </p>
            <p>
              <a href="tel:+33649362491" className="text-gold-300 hover:text-gold-200">
                +33 6 49 36 24 91
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
