import { HardHat, ClipboardCheck, TrendingUp, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CivilWorks = () => {
  const { t, formatNumber } = useLanguage();

  return (
    <section id="civil-works" className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-green-500/3 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/3 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Stats grid - Left side */}
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: HardHat, title: t('civilWorks.stat1Title'), value: formatNumber('50+'), color: 'from-green-600 to-green-500' },
                { icon: ClipboardCheck, title: t('civilWorks.stat2Title'), value: formatNumber('100%'), color: 'from-cyan-600 to-cyan-500' },
                { icon: TrendingUp, title: t('civilWorks.stat3Title'), value: formatNumber('95%'), color: 'from-blue-600 to-blue-500' },
                { icon: Award, title: t('civilWorks.stat4Title'), value: formatNumber('100%'), color: 'from-green-600 to-cyan-500' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:border-green-300 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 to-cyan-50/0 group-hover:from-green-50 group-hover:to-cyan-50 transition-all duration-500 rounded-xl"></div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="relative inline-flex mb-4">
                      <div className={`relative inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg shadow group-hover:scale-105 group-hover:rotate-3 transition-all duration-500`}>
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>

                    <div className="text-h2 font-extrabold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 font-medium text-h4">{stat.title}</div>

                    {/* Animated bottom line */}
                    <div className="mt-3 h-0.5 w-0 bg-gradient-to-r from-green-600 to-cyan-600 rounded-full group-hover:w-full transition-all duration-700"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content - Right side */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center justify-center mb-6">
              <span className="px-6 py-3 bg-gradient-to-r from-green-50 to-cyan-50 border border-green-100 text-green-700 text-sm font-bold uppercase tracking-wider rounded-full">
                {t('civilWorks.badge')}
              </span>
            </div>

            <h2 className="text-h1 md:text-h2 font-extrabold text-gray-900 leading-tight">
              {t('civilWorks.title1')}
              <span className="block mt-2 bg-gradient-to-r from-green-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                {t('civilWorks.title2')}
              </span>
            </h2>

            <div className="mt-6 flex items-center gap-2">
              <div className="h-1.5 w-20 bg-gradient-to-r from-green-600 to-cyan-600 rounded-full"></div>
              <div className="h-1.5 w-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full"></div>
            </div>

            <p className="mt-8 text-h4 text-gray-600 leading-relaxed">
              {t('civilWorks.description')}
            </p>

            <div className="mt-8 space-y-4">
              {[
                t('civilWorks.feature1'),
                t('civilWorks.feature2'),
                t('civilWorks.feature3'),
                t('civilWorks.feature4'),
              ].map((item, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-200 hover:bg-green-50 hover:border-green-300 transition-all duration-500 hover:translate-x-1"
                >
                  <div className="flex-shrink-0 relative">
                    <div className="relative w-8 h-8 bg-gradient-to-br from-green-600 to-cyan-600 rounded-lg flex items-center justify-center shadow group-hover:scale-105 group-hover:rotate-2 transition-all duration-500">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <span className="text-gray-900 text-body-lg font-semibold group-hover:text-green-600 transition-colors duration-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CivilWorks;
