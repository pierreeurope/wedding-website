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

function RoomCard({ name, description, price, available }: { name: string; description: string; price: string; available: string }) {
  return (
    <div className="bg-white p-4 border border-primary-100">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-primary-800">{name}</h4>
          <p className="text-primary-500 text-sm">{description}</p>
        </div>
        <span className="text-gold-600 font-medium whitespace-nowrap ml-4">{price}</span>
      </div>
      <p className="text-xs text-primary-400 mt-2">{available}</p>
    </div>
  );
}

function HotelCard({ name, address, rooms, price, parking, website, note }: { 
  name: string; 
  address: string; 
  rooms: string;
  price: string;
  parking: string;
  website?: string;
  note?: string;
}) {
  return (
    <div className="bg-white p-6 border border-primary-200 hover:border-gold-300 transition-colors">
      <h4 className="font-serif text-lg text-primary-800 mb-2">{name}</h4>
      <div className="space-y-1 text-sm text-primary-600 mb-3">
        <p><span className="font-medium">Address:</span> {address}</p>
        <p><span className="font-medium">Rooms:</span> {rooms}</p>
        <p><span className="font-medium">Price:</span> {price}</p>
        <p><span className="font-medium">Parking:</span> {parking}</p>
        {note && <p className="text-primary-500 italic text-xs mt-2">{note}</p>}
      </div>
      {website ? (
        <a 
          href={`https://${website}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gold-600 hover:text-gold-700 text-sm font-medium"
        >
          {website} →
        </a>
      ) : (
        <p className="text-primary-500 text-sm">Call: +49 6723 602500</p>
      )}
    </div>
  );
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

      {/* Introduction - 3 Options */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-primary-600 text-lg leading-relaxed mb-8">
            {t('intro')}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-primary-50 border border-primary-200">
              <span className="text-3xl">🏨</span>
              <p className="text-primary-700 font-medium mt-3">{t('introOption1')}</p>
            </div>
            <div className="p-6 bg-primary-50 border border-primary-200">
              <span className="text-3xl">🏡</span>
              <p className="text-primary-700 font-medium mt-3">{t('introOption2')}</p>
            </div>
            <div className="p-6 bg-primary-50 border border-primary-200">
              <span className="text-3xl">🏰</span>
              <p className="text-primary-700 font-medium mt-3">{t('introOption3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Hotels */}
      <section className="py-24 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-4xl">🏨</span>
            <h2 className="font-serif text-3xl text-primary-800 mt-4 mb-2">{t('alternatives.title')}</h2>
            <div className="h-px w-16 bg-gold-500 mx-auto my-4"></div>
          </div>
          
          <p className="text-primary-600 text-center mb-8 text-lg">
            {t('alternatives.description')}
          </p>
          
          <p className="text-primary-700 font-medium text-center mb-8">
            {t('alternatives.ourSuggestions')}
          </p>
          
          {/* Rüdesheim am Rhein */}
          <div className="mb-12">
            <h3 className="font-serif text-2xl text-primary-800 mb-2 flex items-center gap-2">
              Rüdesheim am Rhein
              <span className="text-sm font-sans text-primary-500">({t('alternatives.min10')})</span>
            </h3>
            <div className="h-px bg-primary-200 mb-6"></div>
            <div className="grid md:grid-cols-2 gap-4">
              <HotelCard 
                name="Hotel Rose" 
                address="Wilhelmstr. 27"
                rooms="18 rooms"
                price="from €80-90"
                parking="Free parking"
                website="www.hotelrose-online.de"
              />
              <HotelCard 
                name="Hotel Trapp" 
                address="Kirchstrasse 7"
                rooms="35 rooms"
                price="Double from €90"
                parking="Parking €13/night"
                website="www.hotel-trapp.de"
              />
              <HotelCard 
                name="Hotel Rüdesheimer Hof" 
                address="Geisenheimerstrasse 1"
                rooms="36 rooms"
                price="Double from €120"
                parking="Parking on-site"
                website="www.ruedesheimer-hof.de"
              />
            </div>
          </div>
          
          {/* Geisenheim-Marienthal */}
          <div className="mb-12">
            <h3 className="font-serif text-2xl text-primary-800 mb-2 flex items-center gap-2">
              Geisenheim-Marienthal
              <span className="text-sm font-sans text-primary-500">({t('alternatives.min5')})</span>
            </h3>
            <div className="h-px bg-primary-200 mb-6"></div>
            <div className="grid md:grid-cols-2 gap-4">
              <HotelCard 
                name="Akzent Waldhotel Rheingau" 
                address="Marienthaler Strasse 20"
                rooms="55 rooms"
                price="Double from €130"
                parking="Parking available"
                website="waldhotel-rheingau.de"
              />
            </div>
          </div>
          
          {/* Oestrich-Winkel */}
          <div className="mb-12">
            <h3 className="font-serif text-2xl text-primary-800 mb-2 flex items-center gap-2">
              Oestrich-Winkel
              <span className="text-sm font-sans text-primary-500">({t('alternatives.min15')})</span>
            </h3>
            <div className="h-px bg-primary-200 mb-6"></div>
            <div className="grid md:grid-cols-2 gap-4">
              <HotelCard 
                name="Gästehaus Grüner Baum" 
                address="Rheingaustrasse 45"
                rooms="12 rooms"
                price="Double €130-170"
                parking="Parking available"
                note="No website, call +49 6723 602500"
              />
              <HotelCard 
                name="Nagler's Fine Lounge Hotel" 
                address="Hauptstr. 1"
                rooms="40 rooms"
                price="Double from €160"
                parking="Free parking, wellness/spa"
                website="naeglers-hotel.de"
              />
              <HotelCard 
                name="Hotel Zum Rebhang" 
                address="Rebhangstr. 53"
                rooms="14 rooms"
                price="Double from €99"
                parking="Panoramic view, free parking"
                website="hotel-zum-rebhang.de"
                note="March-October: 2-night minimum"
              />
              <HotelCard 
                name="Hotel Ruthmann" 
                address="Rheinstr. 109"
                rooms="19 rooms"
                price="Double from €99"
                parking="Free parking, non-smoking"
                website="hotel-ruthmann.de"
              />
              <HotelCard 
                name="Wein- & Sekthaus F.B. Schönleber" 
                address="Hauptstr. 1b"
                rooms="13 rooms"
                price="Double from €126"
                parking="Rhine view, wine estate restaurant"
                website="fb-schoenleber.de"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Airbnb & Vacation Rentals */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-4xl">🏡</span>
            <h2 className="font-serif text-3xl text-primary-800 mt-4 mb-2">{t('airbnb.title')}</h2>
            <div className="h-px w-16 bg-gold-500 mx-auto my-4"></div>
          </div>
          
          <p className="text-primary-600 text-center mb-8 text-lg">
            {t('airbnb.description')}
          </p>
          
          <div className="text-center">
            <a 
              href="https://www.airbnb.com/s/Geisenheim--Germany"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Airbnb
            </a>
          </div>
        </div>
      </section>

      {/* On-Site: Burg Schwarzenstein */}
      <section className="py-24 bg-primary-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-4xl">🏰</span>
            <h2 className="font-serif text-3xl text-primary-800 mt-4 mb-2">{t('castle.title')}</h2>
            <div className="h-px w-16 bg-gold-500 mx-auto my-4"></div>
          </div>
          
          <div className="bg-primary-50 p-8 md:p-12 border border-primary-200">
            <p className="text-primary-600 text-center mb-6">
              {t('castle.description')}
            </p>
            <p className="text-primary-600 text-center mb-4 text-sm italic">
              {t('castle.extendStay')}
            </p>
            <p className="text-primary-600 text-center mb-10 text-sm">
              {t('castle.checkInOut')}
            </p>
            <p className="text-primary-600 text-center mb-10 text-sm">
              {t('castle.breakfast')}
            </p>

            {/* Parkresidenz */}
            <div className="mb-10">
              <h3 className="font-serif text-xl text-primary-800 mb-2 border-b border-primary-200 pb-2">
                {t('castle.sections.parkresidenz')}
                <span className="text-sm font-sans text-primary-500 ml-2">({t('castle.dates.friMon')})</span>
              </h3>
              <p className="text-primary-500 text-sm mt-2 mb-4 italic">{t('castle.sections.parkresidenzDesc')}</p>
              <div className="grid md:grid-cols-2 gap-4">
                <RoomCard name={t('castle.rooms.juniorSuite.name')} description={t('castle.rooms.juniorSuite.description')} price={`€340${t('castle.perNight')}`} available={t('castle.availableOne')} />
                <RoomCard name={t('castle.rooms.deluxeZimmer.name')} description={t('castle.rooms.deluxeZimmer.description')} price={`€270${t('castle.perNight')}`} available={t('castle.availableOne')} />
                <RoomCard name={t('castle.rooms.klassikzimmer.name')} description={t('castle.rooms.klassikzimmer.description')} price={`€250${t('castle.perNight')}`} available={t('castle.availableThree')} />
              </div>
            </div>

            {/* Castle Building */}
            <div className="mb-10">
              <h3 className="font-serif text-xl text-primary-800 mb-2 border-b border-primary-200 pb-2">
                {t('castle.sections.burggebauede')}
                <span className="text-sm font-sans text-primary-500 ml-2">({t('castle.dates.satMon')})</span>
              </h3>
              <p className="text-primary-500 text-sm mt-2 mb-4 italic">{t('castle.sections.burggebauedeDesc')}</p>
              <div className="grid md:grid-cols-2 gap-4">
                <RoomCard name={t('castle.rooms.turmSuite.name')} description={t('castle.rooms.turmSuite.description')} price={`€340${t('castle.perNight')}`} available={t('castle.availableOne')} />
                <RoomCard name={t('castle.rooms.turmzimmer.name')} description={t('castle.rooms.turmzimmer.description')} price={`€260${t('castle.perNight')}`} available={t('castle.availableOne')} />
                <RoomCard name={t('castle.rooms.superiorzimmer.name')} description={t('castle.rooms.superiorzimmer.description')} price={`€240${t('castle.perNight')}`} available={t('castle.availableTwo')} />
                <RoomCard name={t('castle.rooms.komfortzimmer.name')} description={t('castle.rooms.komfortzimmer.description')} price={`€220${t('castle.perNight')}`} available={t('castle.availableThree')} />
              </div>
            </div>

            {/* Guest House */}
            <div className="mb-10">
              <h3 className="font-serif text-xl text-primary-800 mb-2 border-b border-primary-200 pb-2">
                {t('castle.sections.gaestehaus')}
                <span className="text-sm font-sans text-primary-500 ml-2">({t('castle.dates.friMon')})</span>
              </h3>
              <p className="text-primary-500 text-sm mt-2 mb-4 italic">{t('castle.sections.gaestehausDesc')}</p>
              <div className="grid md:grid-cols-2 gap-4">
                <RoomCard name={t('castle.rooms.gaestezimmer160.name')} description={t('castle.rooms.gaestezimmer160.description')} price={`€160${t('castle.perNight')}`} available={t('castle.availableOne')} />
                <RoomCard name={t('castle.rooms.gaestezimmer140.name')} description={t('castle.rooms.gaestezimmer140.description')} price={`€160${t('castle.perNight')}`} available={t('castle.availableTwo')} />
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

      {/* Contact Section */}
      <section className="py-16 bg-primary-800 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h3 className="font-serif text-2xl mb-4">{t('contact.title')}</h3>
          <p className="text-primary-200 mb-6">{t('contact.description')}</p>
          <div className="space-y-2">
            <p>
              <span className="font-medium">{t('contact.phone')}:</span>{' '}
              <a href="tel:+33649362491" className="text-gold-300 hover:text-gold-200">
                +33 6 49 36 24 91
              </a>
            </p>
            <p className="text-primary-300 text-sm">{t('contact.or')}</p>
            <p>
              <span className="font-medium">{t('contact.email')}:</span>{' '}
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
