import { Heart, MessageCircle, TrendingUp, Shield, Target } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CoreValues = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Heart,
      title: t('coreValues.item1Title'),
      description: t('coreValues.item1Desc')
    },
    {
      icon: MessageCircle,
      title: t('coreValues.item2Title'),
      description: t('coreValues.item2Desc')
    },
    {
      icon: TrendingUp,
      title: t('coreValues.item3Title'),
      description: t('coreValues.item3Desc')
    },
    {
      icon: Shield,
      title: t('coreValues.item4Title'),
      description: t('coreValues.item4Desc')
    },
    {
      icon: Target,
      title: t('coreValues.item5Title'),
      description: t('coreValues.item5Desc')
    },
  ];

  return (
    <section id="values" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #0066CC 1px, transparent 0)`,
          backgroundSize: '48px 48px',
        }}></div>
      </div>

      {/* Floating gradient orbs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-2xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <span className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-bold uppercase tracking-wider rounded-full shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
              {t('coreValues.badge')}
            </span>
          </div>

          <h2 className="text-h1 md:text-h2 font-extrabold text-gray-900 leading-tight">
            {t('coreValues.title1')}
            <span className="block mt-2 bg-gradient-to-r from-blue-600 via-cyan-600 to-green-600 bg-clip-text text-transparent">
              {t('coreValues.title2')}
            </span>
          </h2>

          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="h-1.5 w-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full"></div>
            <div className="h-1.5 w-12 bg-gradient-to-r from-cyan-600 to-green-600 rounded-full"></div>
            <div className="h-1.5 w-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-full"></div>
          </div>

          <p className="mt-8 text-h4 text-gray-600 max-w-3xl mx-auto">
            {t('coreValues.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative bg-white border border-gray-100 rounded-xl p-6 hover:border-transparent hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
            >
              {/* Animated gradient border on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-600 to-green-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xs"></div>

              {/* Card background */}
              <div className="absolute inset-0 bg-white rounded-xl transition-all duration-500"></div>

              <div className="relative z-10">
                {/* Icon container with glow */}
                <div className="relative inline-flex mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                  <div className="relative inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 via-cyan-600 to-green-600 rounded-lg shadow group-hover:scale-105 group-hover:rotate-3 transition-all duration-500">
                    <value.icon className="h-7 w-7 text-white" />
                  </div>
                </div>

                <h3 className="text-h4 font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {value.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-body">
                  {value.description}
                </p>

                {/* Bottom gradient accent */}
                <div className="mt-4 h-0.5 w-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full group-hover:w-full transition-all duration-700"></div>
              </div>

              {/* Corner decoration */}
              <div className="absolute top-3 right-3 w-16 h-16 bg-gradient-to-br from-cyan-600/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-600 to-green-600 animate-pulse animation-delay-200"></div>
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-600 to-blue-600 animate-pulse animation-delay-400"></div>
          </div>
        </div>
      </div>

      <style>{`
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </section>
  );
};

export default CoreValues;
