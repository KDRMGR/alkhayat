import { useState, useEffect } from 'react';
import { Zap, Shield, Award, Target, TrendingUp, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const InteractiveShowcase = () => {
  const { t, formatNumber } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedFeature, setSelectedFeature] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: Zap,
      title: t('showcase.feature1Title'),
      description: t('showcase.feature1Desc'),
      color: 'from-green-600 to-cyan-600',
      shadowColor: 'shadow-green-500/30',
    },
    {
      icon: Shield,
      title: t('showcase.feature2Title'),
      description: t('showcase.feature2Desc'),
      color: 'from-cyan-600 to-blue-600',
      shadowColor: 'shadow-cyan-500/30',
    },
    {
      icon: Award,
      title: t('showcase.feature3Title'),
      description: t('showcase.feature3Desc'),
      color: 'from-blue-600 to-green-600',
      shadowColor: 'shadow-blue-500/30',
    },
    {
      icon: Target,
      title: t('showcase.feature4Title'),
      description: t('showcase.feature4Desc'),
      color: 'from-green-600 to-blue-600',
      shadowColor: 'shadow-green-500/30',
    },
    {
      icon: TrendingUp,
      title: t('showcase.feature5Title'),
      description: t('showcase.feature5Desc'),
      color: 'from-cyan-600 to-green-600',
      shadowColor: 'shadow-cyan-500/30',
    },
    {
      icon: Users,
      title: t('showcase.feature6Title'),
      description: t('showcase.feature6Desc'),
      color: 'from-blue-600 to-cyan-600',
      shadowColor: 'shadow-blue-500/30',
    },
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-white via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center mb-6">
            <span className="px-6 py-3 bg-gradient-to-r from-green-600 to-cyan-600 text-white text-sm font-bold uppercase tracking-wider rounded-full shadow-lg shadow-green-500/30">
              {t('showcase.badge')}
            </span>
          </div>

          <h2 className="text-h1 md:text-h2 font-extrabold text-gray-900 leading-tight">
            {t('showcase.title1')}
            <span className="block mt-2 bg-gradient-to-r from-green-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              {t('showcase.title2')}
            </span>
          </h2>

          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="h-1.5 w-20 bg-gradient-to-r from-green-600 to-cyan-600 rounded-full"></div>
            <div className="h-1.5 w-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full"></div>
            <div className="h-1.5 w-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-full"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Features List - Left Side */}
          <div className="space-y-5">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={() => setSelectedFeature(index)}
                className={`group cursor-pointer relative bg-white border rounded-xl p-5 transition-all duration-500 ${
                  selectedFeature === index
                    ? 'border-transparent shadow-lg shadow-green-500/10 scale-102'
                    : 'border-gray-200 hover:border-green-300 hover:shadow-md hover:scale-101'
                }`}
              >
                {/* Gradient border effect for selected */}
                {selectedFeature === index && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-xl -z-10 blur-xs`}></div>
                )}

                <div className="relative z-10 bg-white rounded-xl p-0.5">
                  <div className="flex items-center gap-4">
                    {/* Icon with glow */}
                    <div className="relative flex-shrink-0">
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-lg blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                      <div className={`relative inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg ${feature.shadowColor} shadow group-hover:scale-105 group-hover:rotate-2 transition-all duration-500`}>
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className={`text-h4 font-bold mb-2 transition-colors duration-300 ${
                        selectedFeature === index ? 'text-green-600' : 'text-gray-900 group-hover:text-green-600'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-body">
                        {feature.description}
                      </p>
                    </div>

                    {/* Selection indicator */}
                    {selectedFeature === index && (
                      <div className="flex-shrink-0 w-3 h-3 bg-gradient-to-r from-green-600 to-cyan-600 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive 3D Card - Right Side */}
          <div className="relative h-full min-h-[600px] flex items-center">
            <div
              className="w-full"
              style={{
                transform: `perspective(1200px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
                transition: 'transform 0.1s ease-out',
              }}
            >
              <div className="relative w-full">
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${features[selectedFeature].color} rounded-3xl blur-3xl opacity-30 animate-pulse`}></div>

                {/* Main card */}
                <div className="relative bg-white rounded-xl shadow-lg p-8 border border-gray-100 overflow-hidden">
                  {/* Background gradient decoration */}
                  <div className="absolute inset-0 opacity-3">
                    <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${features[selectedFeature].color} rounded-xl`}></div>
                  </div>

                  <div className="relative z-10">
                    {/* Icon display with enhanced animation */}
                    <div className="flex items-center justify-center h-64 mb-6">
                      <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${features[selectedFeature].color} rounded-xl blur-2xl opacity-20 animate-pulse`}></div>
                        <div className={`relative w-32 h-32 bg-gradient-to-br ${features[selectedFeature].color} rounded-xl flex items-center justify-center shadow-lg ${features[selectedFeature].shadowColor} hover:scale-105 hover:rotate-3 transition-all duration-500`}>
                          {features[selectedFeature] && (() => {
                            const IconComponent = features[selectedFeature].icon;
                            return <IconComponent className="h-16 w-16 text-white" />;
                          })()}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-h3 font-extrabold text-gray-900 mb-4">
                        {features[selectedFeature]?.title}
                      </h3>
                      <p className="text-gray-600 text-body-lg leading-relaxed mb-8">
                        {features[selectedFeature]?.description}
                      </p>

                      {/* Stats grid */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className={`bg-gradient-to-br from-green-50 to-cyan-50 rounded-lg p-3 border border-green-200 hover:border-green-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300`}>
                          <div className="text-h4 font-bold text-green-600">{formatNumber('98%')}</div>
                          <p className="text-body-xs text-gray-600 mt-1 font-medium">{t('showcase.stat1')}</p>
                        </div>
                        <div className={`bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-3 border border-cyan-200 hover:border-cyan-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300`}>
                          <div className="text-h4 font-bold text-cyan-600">{formatNumber('24/7')}</div>
                          <p className="text-body-xs text-gray-600 mt-1 font-medium">{t('showcase.stat2')}</p>
                        </div>
                        <div className={`bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-3 border border-blue-200 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300`}>
                          <div className="text-h4 font-bold text-blue-600">{formatNumber('100%')}</div>
                          <p className="text-body-xs text-gray-600 mt-1 font-medium">{t('showcase.stat3')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>
    </section>
  );
};

export default InteractiveShowcase;
