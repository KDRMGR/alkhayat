import { Handshake } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Partners = () => {
  const { t } = useLanguage();

  const partners = [
    t('partners.partner1'),
    t('partners.partner2'),
    t('partners.partner3'),
    t('partners.partner4'),
    t('partners.partner5'),
    t('partners.partner6'),
    t('partners.partner7'),
    t('partners.partner8'),
    t('partners.partner9'),
    t('partners.partner10'),
    t('partners.partner11'),
  ];

  return (
    <section id="partners" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-green-700 uppercase tracking-wide bg-green-50 px-4 py-2 rounded-full">
            {t('partners.badge')}
          </span>
          <h2 className="mt-5 text-h2 md:text-h3 font-bold text-gray-900">
            {t('partners.title1')}
            <span className="bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent"> {t('partners.title2')}</span>
          </h2>
          <div className="mt-4 h-1 w-20 bg-gradient-to-r from-green-600 to-cyan-500 rounded-full mx-auto"></div>
          <p className="mt-3 text-body-lg text-gray-600">
            {t('partners.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-lg p-5 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-cyan-500 rounded-lg flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <Handshake className="h-5 w-5 text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                  {partner}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-br from-green-50 to-cyan-50 rounded-xl p-8 text-center border border-green-100">
          <Handshake className="h-11 w-11 text-green-600 mx-auto mb-3" />
          <h3 className="text-h3 font-bold text-gray-900 mb-3">
            {t('partners.ctaTitle')}
          </h3>
          <p className="text-body text-gray-600 max-w-2xl mx-auto mb-6">
            {t('partners.ctaDesc')}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-md transition-all transform hover:scale-105"
          >
            {t('partners.ctaButton')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Partners;
