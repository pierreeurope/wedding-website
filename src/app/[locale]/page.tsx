import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  return <HomePageContent params={params} />;
}

async function HomePageContent({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  return <HomePageClient />;
}

function HomePageClient() {
  const t = useTranslations('home');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/castle pic1.png"
            alt="Burg Schwarzenstein"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/40 via-primary-900/30 to-primary-900/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in">
          <p className="hero-text-shadow text-lg md:text-xl tracking-[0.3em] uppercase mb-4 text-white font-medium">
            {t('saveTheDate')}
          </p>
          <h1 className="hero-text-shadow font-serif text-5xl md:text-7xl lg:text-8xl font-semibold mb-6 leading-tight text-white">
            {t('names')}
          </h1>
          <p className="hero-text-shadow text-lg md:text-xl mb-2 text-white font-medium">
            {t('dateAnnouncement')}
          </p>
          <p className="hero-text-shadow-strong font-serif text-2xl md:text-3xl mb-4 text-gold-200 font-semibold">
            {t('date')}
          </p>
          <p className="hero-text-shadow text-lg text-white font-medium mb-12">
            {t('location')}
          </p>
          <Link href="/rsvp" className="btn-primary bg-white/20 border-white hover:bg-white hover:text-primary-800 font-semibold shadow-lg">
            RSVP
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-primary-500 text-lg mb-8">{t('welcome')}</p>
          
          {/* Decorative divider */}
          <div className="flex items-center justify-center mb-12">
            <div className="h-px w-24 bg-primary-200"></div>
            <span className="mx-6 text-gold-500 text-3xl">♥</span>
            <div className="h-px w-24 bg-primary-200"></div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-primary-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden shadow-xl">
              <Image
                src="/images/Proposal.JPG"
                alt="Our proposal under the Northern Lights"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Text */}
            <div className="text-center md:text-left">
              <h2 className="section-title">{t('ourStory')}</h2>
              <div className="h-px w-16 bg-gold-500 my-6 mx-auto md:mx-0"></div>
              <p className="text-primary-600 text-lg leading-relaxed">
                {t('ourStoryText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Venue Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Burg Schwarzenstein</h2>
            <p className="section-subtitle">{t('venueSubtitle')}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative aspect-square overflow-hidden shadow-lg">
              <Image
                src="/images/castle pic2.png"
                alt="Burg Schwarzenstein"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative aspect-square overflow-hidden shadow-lg">
              <Image
                src="/images/castle pic3.png"
                alt="Terrace with vineyard view"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative aspect-square overflow-hidden shadow-lg">
              <Image
                src="/images/castle pic4.png"
                alt="Castle at night"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/venue" className="btn-secondary">
              {t('learnMore')}
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-24 bg-primary-800 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/schedule" className="card bg-primary-700/50 border-primary-600 text-center group hover:bg-primary-700/70">
              <div className="text-gold-400 text-4xl mb-4">📅</div>
              <h3 className="font-serif text-2xl mb-2 text-white group-hover:text-gold-300 transition-colors">{t('scheduleTitle')}</h3>
              <p className="text-primary-200 text-sm">{t('scheduleDesc')}</p>
            </Link>
            
            <Link href="/travel" className="card bg-primary-700/50 border-primary-600 text-center group hover:bg-primary-700/70">
              <div className="text-gold-400 text-4xl mb-4">✈️</div>
              <h3 className="font-serif text-2xl mb-2 text-white group-hover:text-gold-300 transition-colors">{t('travelTitle')}</h3>
              <p className="text-primary-200 text-sm">{t('travelDesc')}</p>
            </Link>
            
            <Link href="/accommodation" className="card bg-primary-700/50 border-primary-600 text-center group hover:bg-primary-700/70">
              <div className="text-gold-400 text-4xl mb-4">🏰</div>
              <h3 className="font-serif text-2xl mb-2 text-white group-hover:text-gold-300 transition-colors">{t('accommodationTitle')}</h3>
              <p className="text-primary-200 text-sm">{t('accommodationDesc')}</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
