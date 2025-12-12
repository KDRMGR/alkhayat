import { Target, TrendingUp, Users, Lightbulb, UsersRound, DollarSign, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSupabaseData } from '../hooks/useSupabaseData';
import { db } from '../lib/supabase';

const Objectives = () => {
  const { t } = useLanguage();

  // Fetch objectives from Supabase
  const { data: objectivesData } = useSupabaseData(() => db.objectives(), []);

  // Icon mapping
  const iconMap: Record<string, any> = {
    Target, TrendingUp, Users, Lightbulb, UsersRound, DollarSign
  };

  // Use Supabase data if available, otherwise fall back to translations
  const objectives = objectivesData && objectivesData.length > 0
    ? objectivesData.map((obj: any) => ({
        icon: iconMap[obj.icon_name] || Target,
        title: obj.title,
        description: obj.description,
        gradient: obj.gradient_class || 'from-green-600 to-green-500',
        size: obj.size || 'regular',
      }))
    : [
        {
          icon: Target,
          title: t('objectives.item1Title'),
          description: t('objectives.item1Desc'),
          gradient: 'from-green-600 to-green-500',
          size: 'large',
        },
        {
          icon: TrendingUp,
          title: t('objectives.item2Title'),
          description: t('objectives.item2Desc'),
          gradient: 'from-cyan-600 to-cyan-500',
          size: 'regular',
        },
        {
          icon: Users,
          title: t('objectives.item3Title'),
          description: t('objectives.item3Desc'),
          gradient: 'from-blue-600 to-blue-500',
          size: 'regular',
        },
        {
          icon: Lightbulb,
          title: t('objectives.item4Title'),
          description: t('objectives.item4Desc'),
          gradient: 'from-green-500 to-cyan-500',
          size: 'regular',
        },
        {
          icon: UsersRound,
          title: t('objectives.item5Title'),
          description: t('objectives.item5Desc'),
          gradient: 'from-cyan-500 to-blue-500',
          size: 'regular',
        },
        {
          icon: DollarSign,
          title: t('objectives.item6Title'),
          description: t('objectives.item6Desc'),
          gradient: 'from-blue-600 to-cyan-500',
          size: 'tall',
        },
      ];

  return (
    <section id="objectives" className="relative py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-cyan-500/3 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-green-500/3 rounded-full blur-2xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-cyan-50 rounded-full mb-4 border border-green-100">
            <Sparkles className="h-4 w-4 text-green-600" />
            <span className="text-sm font-bold text-green-700 uppercase tracking-wider">{t('objectives.badge')}</span>
          </div>
          <h2 className="text-h1 md:text-h2 font-bold text-gray-900 mb-4">
            {t('objectives.title1')}
            <span className="block mt-2 bg-gradient-to-r from-green-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              {t('objectives.title2')}
            </span>
          </h2>
          <p className="text-h4 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('objectives.subtitle')}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-fr">
          {objectives.map((objective, index) => {
            const gridClass =
              objective.size === 'large' ? 'md:col-span-2 md:row-span-2' :
              objective.size === 'tall' ? 'md:col-span-2 md:row-span-2' :
              'md:col-span-2';

            return (
              <div
                key={index}
                className={`group relative bg-white rounded-xl p-6 shadow hover:shadow-lg transition-all duration-500 hover:-translate-y-1 border border-gray-100 hover:border-green-200 overflow-hidden ${gridClass}`}
              >
                {/* Glow Effect */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-500/5 to-cyan-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="relative h-full flex flex-col">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${objective.gradient} rounded-lg mb-4 shadow group-hover:scale-105 group-hover:rotate-3 transition-all duration-300`}>
                    <objective.icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className={`font-bold text-gray-900 mb-4 ${objective.size === 'large' ? 'text-h3' : 'text-h4'}`}>
                    {objective.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-gray-600 leading-relaxed flex-grow ${objective.size === 'large' ? 'text-body-lg' : 'text-body'}`}>
                    {objective.description}
                  </p>

                  {/* Hover Accent Line */}
                  <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${objective.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-xl`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-gray-50 to-green-50 rounded-xl p-8 border border-green-100">
            <h3 className="text-h3 font-bold text-gray-900 mb-4">
              {t('objectives.ctaTitle')}
            </h3>
            <p className="text-body-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('objectives.ctaDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-105"
              >
                {t('objectives.ctaButton1')}
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-green-700 font-semibold rounded-lg border border-green-200 hover:border-green-300 hover:shadow-md transition-all duration-300"
              >
                {t('objectives.ctaButton2')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Objectives;
