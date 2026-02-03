import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

export default function VenuePage({ params }: { params: Promise<{ locale: string }> }) {
  return <VenuePageContent params={params} />;
}

async function VenuePageContent({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  return <VenuePageClient />;
}

function VenuePageClient() {
  const t = useTranslations('venue');

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/castle pic1.png"
            alt="Burg Schwarzenstein"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-primary-900/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-5xl md:text-7xl font-light mb-4">{t('title')}</h1>
          <p className="text-xl text-primary-200">{t('subtitle')}</p>
        </div>
      </section>

      {/* About the Venue */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg text-primary-600 leading-relaxed">
            {t('description')}
          </p>
          
          {/* Venue Images Grid */}
          <div className="grid md:grid-cols-2 gap-6 mt-16">
            <div className="relative aspect-[4/3] overflow-hidden shadow-lg">
              <Image
                src="/images/castle pic2.png"
                alt="Burg Schwarzenstein grounds"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden shadow-lg">
              <Image
                src="/images/castle pic4.png"
                alt="Burg Schwarzenstein at dusk"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Region Section */}
      <section className="py-24 bg-primary-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] overflow-hidden shadow-lg">
              <Image
                src="/images/castle pic3.png"
                alt="Terrace overlooking vineyards"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="section-title text-3xl md:text-4xl">{t('region.title')}</h2>
              <div className="h-px w-16 bg-gold-500 my-6"></div>
              <p className="text-primary-600 leading-relaxed mb-8">
                {t('region.description')}
              </p>
              
              <h3 className="font-serif text-xl text-primary-800 mb-4">{t('region.highlights.title')}</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-primary-600">
                  <span className="text-gold-500 mr-3">🍷</span>
                  {t('region.highlights.wine')}
                </li>
                <li className="flex items-center text-primary-600">
                  <span className="text-gold-500 mr-3">🏞️</span>
                  {t('region.highlights.scenery')}
                </li>
                <li className="flex items-center text-primary-600">
                  <span className="text-gold-500 mr-3">🏰</span>
                  {t('region.highlights.history')}
                </li>
                <li className="flex items-center text-primary-600">
                  <span className="text-gold-500 mr-3">🍽️</span>
                  {t('region.highlights.cuisine')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="font-serif text-2xl text-primary-800 mb-8">Location</h3>
          <div className="bg-primary-100 p-8 mb-6">
            <p className="text-primary-700 font-medium">Relais & Châteaux Hotel Burg Schwarzenstein</p>
            <p className="text-primary-600">Rosengasse 32, 65366 Geisenheim, Germany</p>
          </div>
          <a 
            href="https://maps.google.com/?q=Burg+Schwarzenstein+Geisenheim"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Open in Google Maps
          </a>
        </div>
      </section>
    </div>
  );
}
