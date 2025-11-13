import { CheckCircle, Users, Award, TrendingDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Commitments = () => {
  const { t } = useLanguage();

  const commitments = [
    {
      icon: CheckCircle,
      title: t('commitments.item1Title'),
      description: t('commitments.item1Desc')
    },
    {
      icon: Users,
      title: t('commitments.item2Title'),
      description: t('commitments.item2Desc')
    },
    {
      icon: Award,
      title: t('commitments.item3Title'),
      description: t('commitments.item3Desc')
    },
    {
      icon: TrendingDown,
      title: t('commitments.item4Title'),
      description: t('commitments.item4Desc')
    },
  ];

  return (
    <section id="commitments" className="py-24 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-green-500/3 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-500/3 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <span className="px-6 py-3 bg-gradient-to-r from-green-50 to-cyan-50 border border-green-100 text-green-700 text-sm font-bold uppercase tracking-wider rounded-full">
              {t('commitments.badge')}
            </span>
          </div>

          <h2 className="text-h1 md:text-h2 font-extrabold text-gray-900 leading-tight">
            {t('commitments.title1')}
            <span className="block mt-2 bg-gradient-to-r from-green-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              {t('commitments.title2')}
            </span>
          </h2>

          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="h-1.5 w-16 bg-gradient-to-r from-green-600 to-cyan-600 rounded-full"></div>
            <div className="h-1.5 w-8 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {commitments.map((commitment, index) => (
            <div
              key={index}
              className="group relative bg-white border border-gray-200 rounded-xl p-6 overflow-hidden hover:border-green-300 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 to-cyan-50/0 group-hover:from-green-50 group-hover:to-cyan-50 transition-all duration-500 rounded-xl"></div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100/0 to-transparent rounded-bl-full group-hover:from-green-100 transition-all duration-500"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-600 to-cyan-600 rounded-lg mb-4 shadow group-hover:scale-105 group-hover:rotate-2 transition-all duration-500">
                  <commitment.icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="text-h3 font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">
                  {commitment.title}
                </h3>

                <p className="text-gray-600 text-body-lg leading-relaxed">
                  {commitment.description}
                </p>

                {/* Bottom accent line */}
                <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-green-600 to-cyan-600 rounded-full group-hover:w-full transition-all duration-700"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Commitments;
