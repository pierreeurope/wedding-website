import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default function TravelPage({ params }: { params: Promise<{ locale: string }> }) {
  return <TravelPageContent params={params} />;
}

async function TravelPageContent({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  return <TravelPageClient />;
}

function TravelPageClient() {
  const t = useTranslations('travel');

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

      {/* Transportation Options */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* By Air */}
            <div className="card">
              <div className="text-4xl mb-4">✈️</div>
              <h3 className="font-serif text-2xl text-primary-800 mb-4">{t('byAir.title')}</h3>
              <p className="text-primary-600">
                {t('byAir.description')}
              </p>
              <div className="mt-6 pt-6 border-t border-primary-100">
                <p className="text-sm text-primary-500">
                  <strong>Airport Code:</strong> FRA
                </p>
                <a 
                  href="https://www.frankfurt-airport.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gold-600 hover:text-gold-700 mt-2 inline-block"
                >
                  Frankfurt Airport Website →
                </a>
              </div>
            </div>

            {/* By Train */}
            <div className="card">
              <div className="text-4xl mb-4">🚆</div>
              <h3 className="font-serif text-2xl text-primary-800 mb-4">{t('byTrain.title')}</h3>
              <p className="text-primary-600">
                {t('byTrain.description')}
              </p>
              <div className="mt-6 pt-6 border-t border-primary-100">
                <a 
                  href="https://www.bahn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gold-600 hover:text-gold-700"
                >
                  Deutsche Bahn (Book Trains) →
                </a>
              </div>
            </div>

            {/* By Car */}
            <div className="card">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="font-serif text-2xl text-primary-800 mb-4">{t('byCar.title')}</h3>
              <p className="text-primary-600">
                {t('byCar.description')}
              </p>
              <div className="mt-6 pt-6 border-t border-primary-100">
                <p className="text-sm text-primary-500">
                  <strong>Address:</strong><br />
                  {t('byCar.address')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Last Mile Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-serif text-3xl text-primary-800 mb-4 text-center">{t('lastMile.title')}</h2>
          <p className="text-primary-600 text-center mb-12">
            {t('lastMile.description')}
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start p-6 bg-primary-50 border-l-4 border-gold-500">
              <span className="text-2xl mr-4">🚙</span>
              <div>
                <h4 className="font-medium text-primary-800 mb-1">Rent a Car</h4>
                <p className="text-primary-600">{t('lastMile.options.rental')}</p>
              </div>
            </div>
            
            <div className="flex items-start p-6 bg-primary-50 border-l-4 border-gold-500">
              <span className="text-2xl mr-4">🚕</span>
              <div>
                <h4 className="font-medium text-primary-800 mb-1">Taxi / Uber</h4>
                <p className="text-primary-600">{t('lastMile.options.taxi')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 bg-primary-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="font-serif text-2xl text-primary-800 mb-8">Interactive Map</h3>
          <div className="bg-white p-4 shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2558.7!2d7.9695!3d50.0007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bdc9b7b7b7b7b7%3A0x0!2sBurg%20Schwarzenstein!5e0!3m2!1sen!2sde!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Burg Schwarzenstein Location"
            ></iframe>
          </div>
          <a 
            href="https://maps.google.com/?q=Burg+Schwarzenstein+Geisenheim+Germany"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary mt-6 inline-block"
          >
            Open in Google Maps
          </a>
        </div>
      </section>
    </div>
  );
}
