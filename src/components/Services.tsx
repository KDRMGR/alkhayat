import { Cable, Camera, Cpu, Wrench, Droplet, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      title: t('services.service1Title'),
      icon: Wrench,
      items: [t('services.service1Item1'), t('services.service1Item2'), t('services.service1Item3'), t('services.service1Item4'), t('services.service1Item5'), t('services.service1Item6'), t('services.service1Item7')],
      color: 'from-green-600 to-green-500'
    },
    {
      title: t('services.service2Title'),
      icon: Cable,
      items: [t('services.service2Item1'), t('services.service2Item2'), t('services.service2Item3'), t('services.service2Item4'), t('services.service2Item5'), t('services.service2Item6')],
      color: 'from-blue-600 to-cyan-500'
    },
    {
      title: t('services.service3Title'),
      icon: Camera,
      items: [t('services.service3Item1'), t('services.service3Item2'), t('services.service3Item3'), t('services.service3Item4')],
      color: 'from-cyan-500 to-blue-500'
    },
    {
      title: t('services.service4Title'),
      icon: Cpu,
      items: [t('services.service4Item1'), t('services.service4Item2'), t('services.service4Item3'), t('services.service4Item4')],
      color: 'from-green-500 to-cyan-500'
    },
    {
      title: t('services.service5Title'),
      icon: Droplet,
      items: [t('services.service5Item1'), t('services.service5Item2'), t('services.service5Item3'), t('services.service5Item4')],
      color: 'from-blue-600 to-blue-500'
    },
    {
      title: t('services.service6Title'),
      icon: Zap,
      items: [t('services.service6Item1'), t('services.service6Item2'), t('services.service6Item3'), t('services.service6Item4'), t('services.service6Item5'), t('services.service6Item6')],
      color: 'from-green-600 to-green-500'
    },
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-green-700 uppercase tracking-wide bg-green-50 px-4 py-2 rounded-full">
            {t('services.badge')}
          </span>
          <h2 className="mt-5 text-h2 md:text-h3 font-bold text-gray-900">
            {t('services.title1')}
            <span className="bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent"> {t('services.title2')}</span>
          </h2>
          <div className="mt-4 h-1 w-20 bg-gradient-to-r from-green-600 to-cyan-500 rounded-full mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-green-300 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${service.color} rounded-lg mb-4 shadow group-hover:scale-105 transition-transform`}>
                <service.icon className="h-6 w-6 text-white" />
              </div>

              <h3 className="text-h4 font-bold text-gray-900 mb-4">
                {service.title}
              </h3>

              <ul className="space-y-2.5">
                {service.items.map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-600 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-3 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-br from-green-700 to-green-900 rounded-xl p-8 text-white text-center shadow-md">
          <h3 className="text-h3 font-bold mb-3">{t('services.ctaTitle')}</h3>
          <p className="text-body text-green-50 mb-6 max-w-2xl mx-auto">
            {t('services.ctaDesc')}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-green-900 font-semibold rounded-lg hover:bg-green-50 transition-colors shadow-md"
          >
            {t('services.ctaButton')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
