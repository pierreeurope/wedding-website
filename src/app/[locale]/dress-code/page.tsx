import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default function DressCodePage({ params }: { params: Promise<{ locale: string }> }) {
  return <DressCodePageContent params={params} />;
}

async function DressCodePageContent({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DressCodePageView />;
}

function DressCodePageView() {
  const t = useTranslations('dressCode');

  return (
    <div className="min-h-screen pt-20">
      <section className="bg-primary-100 py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="section-title">{t('title')}</h1>
          <div className="h-px w-16 bg-gold-500 my-6 mx-auto" />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-6 text-lg text-primary-600 leading-relaxed">
            <p>{t('introduction.one')}</p>
            <p>{t('introduction.two')}</p>
            <p>{t('introduction.three')}</p>
          </div>

          <div className="mt-16 space-y-12">
            <section>
              <h2 className="section-title text-3xl md:text-4xl">{t('practicalTips.title')}</h2>
              <div className="h-px w-16 bg-gold-500 my-6" />
              <div className="space-y-6 text-primary-600 leading-relaxed">
                <p>{t('practicalTips.one')}</p>
                <p>{t('practicalTips.two')}</p>
                <p>{t('practicalTips.three')}</p>
              </div>
            </section>

            <section>
              <h2 className="section-title text-3xl md:text-4xl">{t('styleSuggestions.title')}</h2>
              <div className="h-px w-16 bg-gold-500 my-6" />
              <div className="space-y-6 text-primary-600 leading-relaxed">
                <p>{t('styleSuggestions.one')}</p>
                <p>{t('styleSuggestions.two')}</p>
                <p>{t('styleSuggestions.three')}</p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
