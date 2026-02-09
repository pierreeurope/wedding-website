import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default function SchedulePage({ params }: { params: Promise<{ locale: string }> }) {
  return <SchedulePageContent params={params} />;
}

async function SchedulePageContent({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  return <SchedulePageClient />;
}

function SchedulePageClient() {
  const t = useTranslations('schedule');

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-24 bg-primary-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-title">{t('title')}</h1>
          <p className="section-subtitle">{t('subtitle')}</p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          {/* Saturday */}
          <div className="mb-20">
            <h2 className="font-serif text-3xl text-primary-800 mb-12 text-center">
              {t('saturday')}
            </h2>
            
            <div className="space-y-12">
              {/* Church Ceremony */}
              <div className="relative pl-8 md:pl-16 border-l-2 border-gold-400">
                <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-gold-500"></div>
                <div className="bg-primary-50 p-8 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="font-serif text-2xl text-primary-800">{t('ceremony.title')}</h3>
                    <span className="text-gold-600 font-medium text-lg">{t('ceremony.time')}</span>
                  </div>
                  <p className="text-primary-600 font-medium mb-2">{t('ceremony.location')}</p>
                  <p className="text-primary-500">{t('ceremony.description')}</p>
                  <div className="mt-4 p-4 bg-white border border-primary-100">
                    <p className="text-sm text-primary-600">
                      <span className="font-medium">{t('addressLabel')}:</span> {t('ceremony.address')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reception */}
              <div className="relative pl-8 md:pl-16 border-l-2 border-gold-400">
                <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-gold-500"></div>
                <div className="bg-primary-50 p-8 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="font-serif text-2xl text-primary-800">{t('reception.title')}</h3>
                    <span className="text-gold-600 font-medium text-lg">{t('reception.time')}</span>
                  </div>
                  <p className="text-primary-600 font-medium mb-2">{t('reception.location')}</p>
                  <p className="text-primary-500">{t('reception.description')}</p>
                  <div className="mt-4 p-4 bg-white border border-primary-100">
                    <p className="text-sm text-primary-600">
                      <span className="font-medium">{t('addressLabel')}:</span> {t('reception.address')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sunday */}
          <div>
            <h2 className="font-serif text-3xl text-primary-800 mb-12 text-center">
              {t('sunday')}
            </h2>
            
            <div className="space-y-12">
              {/* Brunch */}
              <div className="relative pl-8 md:pl-16 border-l-2 border-sage-400">
                <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-sage-500"></div>
                <div className="bg-sage-50 p-8 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="font-serif text-2xl text-primary-800">{t('brunch.title')}</h3>
                    <span className="text-sage-600 font-medium text-lg">{t('brunch.time')}</span>
                  </div>
                  <p className="text-primary-600 font-medium mb-2">{t('brunch.location')}</p>
                  <p className="text-primary-500">{t('brunch.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
