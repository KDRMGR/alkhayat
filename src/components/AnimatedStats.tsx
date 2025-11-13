import { useEffect, useRef, useState } from 'react';
import { Building2, Users, CheckCircle, Award, TrendingUp, Zap, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const AnimatedStats = () => {
  const { t, formatNumber } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: Building2,
      value: 500,
      label: t('stats.projectsLabel'),
      suffix: '+',
      gradient: 'from-green-600 to-green-500',
      description: t('stats.projectsDesc'),
    },
    {
      icon: Users,
      value: 50,
      label: t('stats.teamLabel'),
      suffix: '+',
      gradient: 'from-cyan-600 to-cyan-500',
      description: t('stats.teamDesc'),
    },
    {
      icon: Award,
      value: 12,
      label: t('stats.yearsLabel'),
      suffix: '+',
      gradient: 'from-blue-600 to-blue-500',
      description: t('stats.yearsDesc'),
    },
    {
      icon: CheckCircle,
      value: 100,
      label: t('stats.qualityLabel'),
      suffix: '%',
      gradient: 'from-green-600 to-green-500',
      description: t('stats.qualityDesc'),
    },
    {
      icon: TrendingUp,
      value: 99,
      label: t('stats.satisfactionLabel'),
      suffix: '%',
      gradient: 'from-cyan-600 to-cyan-500',
      description: t('stats.satisfactionDesc'),
    },
    {
      icon: Zap,
      value: 24,
      label: t('stats.supportLabel'),
      suffix: '/7',
      gradient: 'from-blue-600 to-blue-500',
      description: t('stats.supportDesc'),
    },
  ];

  const CountUp = ({ end, isVisible }: { end: number; isVisible: boolean }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let start = 0;
      const increment = end / 40;
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 40);

      return () => clearInterval(timer);
    }, [isVisible, end]);

    return <span>{formatNumber(count)}</span>;
  };

  return (
    <section ref={sectionRef} className="relative py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-500/2 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-cyan-500/2 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/2 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-cyan-50 rounded-full mb-4 border border-green-100">
            <Sparkles className="h-4 w-4 text-green-600" />
            <span className="text-sm font-bold text-green-700 uppercase tracking-wider">{t('stats.badge')}</span>
          </div>
          <h2 className="text-h1 md:text-h2 font-bold text-gray-900 mb-4">
            {t('stats.title1')}
            <span className="block mt-2 bg-gradient-to-r from-green-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              {t('stats.title2')}
            </span>
          </h2>
          <p className="text-h4 text-gray-600 max-w-2xl mx-auto">
            {t('stats.subtitle')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-xl p-6 shadow border border-gray-100 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Glow Effect */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-500/5 to-cyan-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

              {/* Content */}
              <div className="relative">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-lg mb-4 shadow group-hover:scale-105 group-hover:rotate-2 transition-all duration-300`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>

                {/* Number */}
                <div className="mb-4">
                  <div className={`text-6xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {isVisible ? (
                      <>
                        <CountUp end={stat.value} isVisible={isVisible} />
                        {formatNumber(stat.suffix)}
                      </>
                    ) : (
                      formatNumber('0')
                    )}
                  </div>
                </div>

                {/* Label */}
                <h3 className="text-h4 font-bold text-gray-900 mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-body-sm">
                  {stat.description}
                </p>
              </div>

              {/* Bottom Border */}
              <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${stat.gradient} rounded-b-xl transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-green-600 to-cyan-600 rounded-xl p-6 md:p-8 shadow-md text-white">
            <div className="flex-1 text-left">
              <h3 className="text-h3 font-bold mb-2">{t('stats.ctaTitle')}</h3>
              <p className="text-green-50 text-body">{t('stats.ctaDesc')}</p>
            </div>
            <a
              href="#contact"
              className="px-8 py-3 bg-white text-green-700 font-bold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap"
            >
              {t('stats.ctaButton')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedStats;
