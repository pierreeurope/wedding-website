'use client';

import { useTranslations } from 'next-intl';

export default function GiftsPage() {
  const t = useTranslations('gifts');

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-24 bg-primary-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-title">{t('title')}</h1>
        </div>
      </section>

      {/* Honeymoon Fund */}
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

            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-gold-50 p-6 border border-gold-200">
                <h3 className="text-primary-700 font-serif text-2xl md:text-3xl font-medium mb-6 text-center">
                  {t('monetary.europeanTitle')}
                </h3>
                <dl className="text-left space-y-3 text-primary-800">
                  <div>
                    <dt className="text-primary-500 text-sm">{t('monetary.beneficiary')}</dt>
                    <dd className="font-medium">Pierre Blanchet</dd>
                  </div>
                  <div>
                    <dt className="text-primary-500 text-sm">{t('monetary.bankName')}</dt>
                    <dd>Revolut</dd>
                  </div>
                  <div>
                    <dt className="text-primary-500 text-sm">{t('monetary.iban')}</dt>
                    <dd className="font-mono tracking-wide">NL39 REVO 9166 3296 52</dd>
                  </div>
                  <div>
                    <dt className="text-primary-500 text-sm">{t('monetary.bic')}</dt>
                    <dd className="font-mono">REVONL22</dd>
                  </div>
                </dl>
              </div>

              <div className="bg-gold-50 p-6 border border-gold-200">
                <h3 className="text-primary-700 font-serif text-2xl md:text-3xl font-medium mb-6 text-center">
                  {t('monetary.internationalTitle')}
                </h3>
                <dl className="text-left space-y-3 text-primary-800">
                  <div>
                    <dt className="text-primary-500 text-sm">{t('monetary.beneficiary')}</dt>
                    <dd className="font-medium">Amalie-Margarete Wilke</dd>
                  </div>
                  <div>
                    <dt className="text-primary-500 text-sm">{t('monetary.iban')}</dt>
                    <dd className="font-mono tracking-wide">NL31 REVO 6383 6631 51</dd>
                  </div>
                  <div>
                    <dt className="text-primary-500 text-sm">{t('monetary.bic')}</dt>
                    <dd className="font-mono">REVONL22</dd>
                  </div>
                  <div>
                    <dt className="text-primary-500 text-sm">{t('monetary.bankNameAddress')}</dt>
                    <dd>Revolut Bank UAB<br />Barbara Strozzilaan 201, 1083 HN, Amsterdam, Netherlands</dd>
                  </div>
                  <div>
                    <dt className="text-primary-500 text-sm">{t('monetary.correspondentBankBic')}</dt>
                    <dd className="font-mono">CHASGB2L</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-primary-800 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-primary-200 mb-6">
            {t('contact')}
          </p>
          <div className="space-y-2">
            <p>
              <a href="mailto:pierre.blanchet.engineer@gmail.com" className="text-gold-300 hover:text-gold-200">
                pierre.blanchet.engineer@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
