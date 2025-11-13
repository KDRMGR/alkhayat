import { Building, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Projects = () => {
  const { t, formatNumber } = useLanguage();

  const projects = [
    {
      title: t('projects.project1Title'),
      location: t('projects.project1Location'),
      description: t('projects.project1Desc'),
      category: t('projects.project1Category')
    },
    {
      title: t('projects.project2Title'),
      location: t('projects.project2Location'),
      description: t('projects.project2Desc'),
      category: t('projects.project2Category')
    },
    {
      title: t('projects.project3Title'),
      location: t('projects.project3Location'),
      description: t('projects.project3Desc'),
      category: t('projects.project3Category')
    },
    {
      title: t('projects.project4Title'),
      location: t('projects.project4Location'),
      description: t('projects.project4Desc'),
      category: t('projects.project4Category')
    },
    {
      title: t('projects.project5Title'),
      location: t('projects.project5Location'),
      description: t('projects.project5Desc'),
      category: t('projects.project5Category')
    },
    {
      title: t('projects.project6Title'),
      location: t('projects.project6Location'),
      description: t('projects.project6Desc'),
      category: t('projects.project6Category')
    },
    {
      title: t('projects.project7Title'),
      location: t('projects.project7Location'),
      description: t('projects.project7Desc'),
      category: t('projects.project7Category')
    },
    {
      title: t('projects.project8Title'),
      location: t('projects.project8Location'),
      description: t('projects.project8Desc'),
      category: t('projects.project8Category')
    },
    {
      title: t('projects.project9Title'),
      location: t('projects.project9Location'),
      description: t('projects.project9Desc'),
      category: t('projects.project9Category')
    },
  ];

  return (
    <section id="projects" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-green-700 uppercase tracking-wide bg-white px-4 py-2 rounded-full shadow-sm">
            {t('projects.badge')}
          </span>
          <h2 className="mt-5 text-h2 md:text-h3 font-bold text-gray-900">
            {t('projects.title1')}
            <span className="bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent"> {t('projects.title2')}</span>
          </h2>
          <p className="mt-3 text-body-lg text-gray-600 max-w-3xl mx-auto">
            {t('projects.subtitle')}
          </p>
          <div className="mt-4 h-1 w-20 bg-gradient-to-r from-green-600 to-cyan-500 rounded-full mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const gradients = [
              'from-green-600 to-green-500',
              'from-blue-600 to-cyan-500',
              'from-cyan-500 to-blue-500',
              'from-green-500 to-cyan-500'
            ];
            return (
              <div
                key={index}
                className="group bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 hover:border-green-300"
              >
                <div className={`relative h-40 bg-gradient-to-br ${gradients[index % 4]} overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/15"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Building className="h-16 w-16 text-white/50" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/85 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-xs font-medium text-gray-900">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-body font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 mb-3 line-clamp-2 text-body-xs">
                    {project.description}
                  </p>

                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-green-600" />
                    <span>{project.location}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <div className="inline-block bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-center space-x-8">
              <div>
                <div className="text-h3 font-bold text-green-600">{formatNumber('500+')} </div>
                <div className="text-body-xs text-gray-600 mt-1">{t('projects.stat1Label')}</div>
              </div>
              <div className="h-12 w-px bg-gray-200"></div>
              <div>
                <div className="text-h3 font-bold text-cyan-600">{formatNumber('50+')}</div>
                <div className="text-body-xs text-gray-600 mt-1">{t('projects.stat2Label')}</div>
              </div>
              <div className="h-12 w-px bg-gray-200"></div>
              <div>
                <div className="text-h3 font-bold text-green-600">{formatNumber('100%')}</div>
                <div className="text-body-xs text-gray-600 mt-1">{t('projects.stat3Label')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
