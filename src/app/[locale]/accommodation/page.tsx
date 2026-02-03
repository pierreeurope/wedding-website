import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default function AccommodationPage({ params }: { params: Promise<{ locale: string }> }) {
  return <AccommodationPageContent params={params} />;
}

async function AccommodationPageContent({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  return <AccommodationPageClient />;
}

function AccommodationPageClient() {
  const t = useTranslations('accommodation');

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-24 bg-primary-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-title">{t('title')}</h1>
          <p className="section-subtitle">{t('subtitle')}</p>
        </div>
      </section>

      {/* Castle Rooms - Primary Option */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-4xl">🏰</span>
            <h2 className="font-serif text-3xl text-primary-800 mt-4 mb-2">{t('castle.title')}</h2>
            <div className="h-px w-16 bg-gold-500 mx-auto my-4"></div>
          </div>
          
          <div className="bg-primary-50 p-8 md:p-12 border border-primary-200">
            <p className="text-primary-600 text-center mb-10">
              {t('castle.description')}
            </p>
            
            {/* Parkresidenz - Friday arrival */}
            <div className="mb-10">
              <h3 className="font-serif text-xl text-primary-800 mb-2 border-b border-primary-200 pb-2">
                Parkresidenz
                <span className="text-sm font-sans text-primary-500 ml-2">(Fri Oct 2 - Sun Oct 4)</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white p-4 border border-primary-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-primary-800">Panorama Suite</h4>
                      <p className="text-primary-500 text-sm">Luxurious suite with panoramic views</p>
                    </div>
                    <span className="text-gold-600 font-medium whitespace-nowrap ml-4">€490/night</span>
                  </div>
                  <p className="text-xs text-primary-400 mt-2">1 available</p>
                </div>
              </div>
            </div>

            {/* Burggebäude - Saturday arrival */}
            <div className="mb-10">
              <h3 className="font-serif text-xl text-primary-800 mb-2 border-b border-primary-200 pb-2">
                Burggebäude (Castle Building)
                <span className="text-sm font-sans text-primary-500 ml-2">(Sat Oct 3 - Sun Oct 4)</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white p-4 border border-primary-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-primary-800">Komfortzimmer</h4>
                      <p className="text-primary-500 text-sm">Comfortable rooms in the castle</p>
                    </div>
                    <span className="text-gold-600 font-medium whitespace-nowrap ml-4">€220/night</span>
                  </div>
                  <p className="text-xs text-primary-400 mt-2">3 available</p>
                </div>
                <div className="bg-white p-4 border border-primary-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-primary-800">Superiorzimmer</h4>
                      <p className="text-primary-500 text-sm">Superior rooms with upgraded amenities</p>
                    </div>
                    <span className="text-gold-600 font-medium whitespace-nowrap ml-4">€240/night</span>
                  </div>
                  <p className="text-xs text-primary-400 mt-2">2 available</p>
                </div>
                <div className="bg-white p-4 border border-primary-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-primary-800">Turmzimmer</h4>
                      <p className="text-primary-500 text-sm">Unique tower room experience</p>
                    </div>
                    <span className="text-gold-600 font-medium whitespace-nowrap ml-4">€260/night</span>
                  </div>
                  <p className="text-xs text-primary-400 mt-2">1 available</p>
                </div>
              </div>
            </div>

            {/* Gästehaus */}
            <div className="mb-10">
              <h3 className="font-serif text-xl text-primary-800 mb-2 border-b border-primary-200 pb-2">
                Gästehaus (Guest House)
                <span className="text-sm font-sans text-primary-500 ml-2">(Sat Oct 3 - Sun Oct 4)</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white p-4 border border-primary-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-primary-800">Gästezimmer (1.40m bed)</h4>
                      <p className="text-primary-500 text-sm">Cozy guest room</p>
                    </div>
                    <span className="text-gold-600 font-medium whitespace-nowrap ml-4">€160/night</span>
                  </div>
                  <p className="text-xs text-primary-400 mt-2">1 available</p>
                </div>
                <div className="bg-white p-4 border border-primary-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-primary-800">Gästezimmer (1.60m bed)</h4>
                      <p className="text-primary-500 text-sm">Cozy guest room with larger bed</p>
                    </div>
                    <span className="text-gold-600 font-medium whitespace-nowrap ml-4">€160/night</span>
                  </div>
                  <p className="text-xs text-primary-400 mt-2">1 available</p>
                </div>
              </div>
            </div>

            {/* Parkresidenz - Saturday arrival */}
            <div className="mb-10">
              <h3 className="font-serif text-xl text-primary-800 mb-2 border-b border-primary-200 pb-2">
                Parkresidenz
                <span className="text-sm font-sans text-primary-500 ml-2">(Sat Oct 3 - Sun Oct 4)</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white p-4 border border-primary-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-primary-800">Junior Suite</h4>
                      <p className="text-primary-500 text-sm">Elegant suite with separate living area</p>
                    </div>
                    <span className="text-gold-600 font-medium whitespace-nowrap ml-4">€340/night</span>
                  </div>
                  <p className="text-xs text-primary-400 mt-2">1 available</p>
                </div>
                <div className="bg-white p-4 border border-primary-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-primary-800">De Luxe Zimmer</h4>
                      <p className="text-primary-500 text-sm">Deluxe room with premium features</p>
                    </div>
                    <span className="text-gold-600 font-medium whitespace-nowrap ml-4">€270/night</span>
                  </div>
                  <p className="text-xs text-primary-400 mt-2">1 available</p>
                </div>
                <div className="bg-white p-4 border border-primary-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-primary-800">Klassikzimmer</h4>
                      <p className="text-primary-500 text-sm">Classic comfortable room</p>
                    </div>
                    <span className="text-gold-600 font-medium whitespace-nowrap ml-4">€250/night</span>
                  </div>
                  <p className="text-xs text-primary-400 mt-2">3 available</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gold-50 p-6 border border-gold-200 text-center">
              <p className="text-primary-700 font-medium mb-4">{t('castle.booking')}</p>
              <div className="space-y-2">
                <p className="text-primary-600">
                  <span className="font-medium">{t('contact.email')}:</span>{' '}
                  <a href="mailto:pierre.blanchet.engineer@gmail.com" className="text-gold-600 hover:text-gold-700">
                    pierre.blanchet.engineer@gmail.com
                  </a>
                </p>
                <p className="text-primary-600">
                  <span className="font-medium">{t('contact.phone')}:</span>{' '}
                  <a href="tel:+33649362491" className="text-gold-600 hover:text-gold-700">
                    +33 6 49 36 24 91
                  </a>
                </p>
              </div>
              <p className="text-sm text-primary-500 mt-4 italic">{t('castle.note')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Airbnb Section */}
      <section className="py-24 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-4xl">🏡</span>
            <h2 className="font-serif text-3xl text-primary-800 mt-4 mb-2">{t('airbnb.title')}</h2>
            <div className="h-px w-16 bg-gold-500 mx-auto my-4"></div>
          </div>
          
          <div className="bg-white p-8 md:p-12 border border-primary-200">
            <p className="text-primary-600 text-center mb-8">
              {t('airbnb.description')}
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4">
                <span className="text-3xl">🍇</span>
                <h4 className="font-medium text-primary-800 mt-2">Vineyard Cottages</h4>
                <p className="text-sm text-primary-500">Stay among the vines</p>
              </div>
              <div className="text-center p-4">
                <span className="text-3xl">🏘️</span>
                <h4 className="font-medium text-primary-800 mt-2">Village Apartments</h4>
                <p className="text-sm text-primary-500">Charming local living</p>
              </div>
              <div className="text-center p-4">
                <span className="text-3xl">🌄</span>
                <h4 className="font-medium text-primary-800 mt-2">Valley View Homes</h4>
                <p className="text-sm text-primary-500">Stunning panoramas</p>
              </div>
            </div>
            
            <div className="text-center">
              <a 
                href="https://www.airbnb.com/s/Geisenheim--Germany"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Browse Airbnb Options
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Hotels Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-4xl">🏨</span>
            <h2 className="font-serif text-3xl text-primary-800 mt-4 mb-2">{t('hotels.title')}</h2>
            <div className="h-px w-16 bg-gold-500 mx-auto my-4"></div>
          </div>
          
          <p className="text-primary-600 text-center mb-12">
            {t('hotels.description')}
          </p>
          
          <div className="space-y-6">
            <div className="card flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h4 className="font-serif text-xl text-primary-800">Geisenheim</h4>
                <p className="text-primary-500 text-sm">Walking distance to the church</p>
              </div>
              <span className="text-primary-400 mt-2 md:mt-0">~5 min to venue</span>
            </div>
            
            <div className="card flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h4 className="font-serif text-xl text-primary-800">Rüdesheim am Rhein</h4>
                <p className="text-primary-500 text-sm">Famous wine town with many options</p>
              </div>
              <span className="text-primary-400 mt-2 md:mt-0">~10 min to venue</span>
            </div>
            
            <div className="card flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h4 className="font-serif text-xl text-primary-800">Wiesbaden</h4>
                <p className="text-primary-500 text-sm">Larger city with luxury hotels & spa options</p>
              </div>
              <span className="text-primary-400 mt-2 md:mt-0">~25 min to venue</span>
            </div>
            
            <div className="card flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h4 className="font-serif text-xl text-primary-800">Mainz</h4>
                <p className="text-primary-500 text-sm">Historic city with many accommodation types</p>
              </div>
              <span className="text-primary-400 mt-2 md:mt-0">~30 min to venue</span>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="https://www.booking.com/searchresults.html?ss=Geisenheim"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary mr-4"
            >
              Search on Booking.com
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-primary-800 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h3 className="font-serif text-2xl mb-4">{t('contact.title')}</h3>
          <p className="text-primary-200 mb-6">{t('contact.description')}</p>
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
