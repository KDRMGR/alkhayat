import { MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-gray-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-green-700 uppercase tracking-wide bg-white px-4 py-2 rounded-full shadow-sm">
            {t('contact.badge')}
          </span>
          <h2 className="mt-5 text-h2 md:text-h3 font-bold text-gray-900">
            {t('contact.title')}
            <span className="bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent">{t('contact.titleHighlight')}</span>
          </h2>
          <div className="mt-4 h-1 w-20 bg-gradient-to-r from-green-600 to-cyan-500 rounded-full mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <h3 className="text-h3 font-bold text-gray-900 mb-4">{t('contact.getInTouch')}</h3>
              <p className="text-body text-gray-600 leading-relaxed">
                {t('contact.intro')}
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  title: t('contact.location'),
                  content: t('contact.locationValue'),
                },
                {
                  icon: Phone,
                  title: t('contact.phone'),
                  content: t('contact.phoneValue'),
                },
                {
                  icon: Mail,
                  title: t('contact.email'),
                  content: t('contact.emailValue'),
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-cyan-500 rounded-lg flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-h5 font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-body text-gray-600">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-4 mb-3">
                <img src="/WhatsApp Image 2025-10-24 at 3.06.52 AM.jpeg" alt="Khat Alriyadah" className="h-12 w-auto" />
                <div>
                  <h4 className="text-h4 font-bold text-gray-900">{t('nav.companyName')}</h4>
                  <p className="text-body-sm text-gray-600">{t('nav.companySubtitle')}</p>
                </div>
              </div>
              <p className="text-body-sm text-gray-700">
                {t('contact.registration')}
              </p>
              <p className="text-gray-600 text-body-sm mt-3">
                {t('contact.vision')}
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-h3 font-bold text-gray-900 mb-4">{t('contact.formTitle')}</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.nameLabel')}
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors text-gray-900 placeholder-gray-500"
                  placeholder={t('contact.namePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.emailLabel')}
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors text-gray-900 placeholder-gray-500"
                  placeholder={t('contact.emailPlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.phoneLabel')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors text-gray-900 placeholder-gray-500"
                  placeholder={t('contact.phonePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.messageLabel')}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-colors text-gray-900 placeholder-gray-500 resize-none"
                  placeholder={t('contact.messagePlaceholder')}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold py-3 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105"
              >
                {t('contact.submit')}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-10 border-t border-gray-200 text-center">
          <p className="text-body text-gray-600">
            {t('contact.copyright')}
          </p>
          <p className="text-gray-500 text-body-sm mt-2">
            {t('contact.footer')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
