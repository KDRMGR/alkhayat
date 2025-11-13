import { Building2, Shield, Award, CheckCircle2, Users, TrendingUp, Zap, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { t, formatNumber } = useLanguage();
  const highlights = [
    t('about.highlight1'),
    t('about.highlight2'),
    t('about.highlight3'),
    t('about.highlight4'),
    t('about.highlight5'),
    t('about.highlight6'),
  ];

  const achievements = [
    { icon: Building2, value: t('about.achievement1Value'), label: t('about.achievement1Label'), color: 'green' },
    { icon: Users, value: t('about.achievement2Value'), label: t('about.achievement2Label'), color: 'cyan' },
    { icon: TrendingUp, value: t('about.achievement3Value'), label: t('about.achievement3Label'), color: 'blue' },
    { icon: Globe, value: t('about.achievement4Value'), label: t('about.achievement4Label'), color: 'green' },
  ];

  return (
    <section id="about" className="relative py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-500/3 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/3 rounded-full blur-2xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full mb-4">
            <Zap className="h-4 w-4 text-green-600" />
            <span className="text-body-sm font-bold text-green-700 uppercase tracking-widest">{t('about.badge')}</span>
          </div>
          <h2 className="text-h1 md:text-display font-bold text-gray-900 mb-4">
            {t('about.title')}
            <span className="block mt-2 bg-gradient-to-r from-green-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              {t('about.titleHighlight')}
            </span>
          </h2>
          <p className="text-body-lg md:text-h4 text-gray-600 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-body-lg text-gray-700">
                <span className="font-bold text-gray-900 text-h4">{t('about.intro1')}</span>{t('about.intro2')}
              </p>

              <p className="text-body-lg text-gray-700">
                {t('about.intro3')}<span className="font-semibold text-green-600">{t('about.intro3Highlight')}</span>{t('about.intro3End')}
              </p>
            </div>

            {/* Service Highlights */}
            <div className="bg-gradient-to-br from-green-50 to-cyan-50 rounded-xl p-6 border border-green-100">
              <h3 className="text-h4 font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                {t('about.expertiseTitle')}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-body text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision 2030 Badge */}
            <div className="flex items-center gap-4 p-5 bg-white rounded-xl shadow border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-h5">{t('about.visionTitle')}</h4>
                <p className="text-body text-gray-600">{t('about.visionDesc')}</p>
              </div>
            </div>
          </div>

          {/* Right Visual - Achievement Cards */}
          <div className="grid grid-cols-2 gap-6">
            {achievements.map((item, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-xl p-6 shadow border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                  index === 0 ? 'col-span-2' : ''
                }`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/5 to-cyan-500/5 rounded-full blur-2xl group-hover:scale-125 transition-transform"></div>

                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${
                    item.color === 'green' ? 'from-green-600 to-green-500' :
                    item.color === 'cyan' ? 'from-cyan-600 to-cyan-500' :
                    'from-blue-600 to-blue-500'
                  } rounded-lg mb-4 shadow group-hover:scale-105 transition-transform`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>

                  <div className="text-h1 font-bold bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                    {formatNumber(item.value)}
                  </div>

                  <div className="text-body text-gray-600 font-semibold">
                    {item.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Features */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Building2,
              title: t('about.feature1Title'),
              description: t('about.feature1Desc'),
              gradient: 'from-green-600 to-green-500',
            },
            {
              icon: Shield,
              title: t('about.feature2Title'),
              description: t('about.feature2Desc'),
              gradient: 'from-cyan-600 to-cyan-500',
            },
            {
              icon: Award,
              title: t('about.feature3Title'),
              description: t('about.feature3Desc'),
              gradient: 'from-blue-600 to-blue-500',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl p-6 shadow border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/3 to-cyan-500/3 rounded-full blur-2xl group-hover:scale-125 transition-transform"></div>

              <div className="relative">
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-lg mb-4 shadow group-hover:scale-105 group-hover:rotate-2 transition-all`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="text-h4 font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                <p className="text-body text-gray-600">
                  {feature.description}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 to-cyan-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
