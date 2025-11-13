import { Zap, Globe, Wrench, Headphones } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Solutions = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Zap,
      title: t('solutions.feature1Title'),
      description: t('solutions.feature1Desc')
    },
    {
      icon: Globe,
      title: t('solutions.feature2Title'),
      description: t('solutions.feature2Desc')
    },
    {
      icon: Wrench,
      title: t('solutions.feature3Title'),
      description: t('solutions.feature3Desc')
    },
    {
      icon: Headphones,
      title: t('solutions.feature4Title'),
      description: t('solutions.feature4Desc')
    },
  ];

  return (
    <section id="solutions" className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-gradient-to-br from-green-500/20 to-transparent rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-2xl animate-pulse animation-delay-2s"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content section */}
          <div>
            <div className="inline-flex items-center justify-center mb-6">
              <span className="px-6 py-3 bg-gradient-to-r from-green-600 to-cyan-600 text-white text-sm font-bold uppercase tracking-wider rounded-full shadow-lg shadow-green-500/30">
                {t('solutions.badge')}
              </span>
            </div>

            <h2 className="text-h1 md:text-h2 font-extrabold text-gray-900 leading-tight">
              {t('solutions.title1')}
              <span className="block mt-2 bg-gradient-to-r from-green-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                {t('solutions.title2')}
              </span>
            </h2>

            <div className="mt-6 flex items-center gap-2">
              <div className="h-1.5 w-24 bg-gradient-to-r from-green-600 to-cyan-600 rounded-full"></div>
              <div className="h-1.5 w-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full"></div>
            </div>

            <p className="mt-8 text-h4 text-gray-700 leading-relaxed">
              {t('solutions.description')}
            </p>

            <div className="mt-10 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-cyan-600 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-green-50 to-cyan-50 rounded-xl p-6 border border-green-200 hover:border-green-400 transition-all duration-500 hover:shadow-lg hover:shadow-green-500/10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-600 to-cyan-600 rounded-lg flex items-center justify-center shadow">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-h3 font-bold text-gray-900 mb-3">{t('solutions.boxTitle')}</h3>
                    <p className="text-gray-700 text-body-lg leading-relaxed">
                      {t('solutions.boxDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right features grid */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white border border-gray-100 rounded-xl p-5 hover:border-transparent transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Gradient border on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-cyan-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                {/* White background */}
                <div className="absolute inset-0.5 bg-white rounded-xl"></div>

                <div className="relative z-10 flex items-start gap-4">
                  {/* Icon with glow effect */}
                  <div className="flex-shrink-0 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-cyan-600 rounded-lg blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                    <div className="relative inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-600 to-cyan-600 rounded-lg shadow group-hover:scale-105 group-hover:rotate-2 transition-all duration-500">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-h4 font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-body-lg">
                      {feature.description}
                    </p>

                    {/* Animated underline */}
                    <div className="mt-3 h-0.5 w-0 bg-gradient-to-r from-green-600 to-cyan-600 rounded-full group-hover:w-full transition-all duration-700"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .animation-delay-2s {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default Solutions;
