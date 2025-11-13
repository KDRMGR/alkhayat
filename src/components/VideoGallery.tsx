import { useState } from 'react';
import { Play, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const VideoGallery = () => {
  const { t } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [isMuted] = useState(false);

  const videos = [
    {
      id: 1,
      title: t('videoGallery.video1Title'),
      thumbnail: 'from-green-600 to-green-500',
      description: t('videoGallery.video1Desc'),
      youtubeId: 'dQw4w9WgXcQ', // Replace with actual video IDs
      category: t('videoGallery.video1Category'),
    },
    {
      id: 2,
      title: t('videoGallery.video2Title'),
      thumbnail: 'from-blue-600 to-cyan-500',
      description: t('videoGallery.video2Desc'),
      youtubeId: 'dQw4w9WgXcQ',
      category: t('videoGallery.video2Category'),
    },
    {
      id: 3,
      title: t('videoGallery.video3Title'),
      thumbnail: 'from-cyan-500 to-blue-500',
      description: t('videoGallery.video3Desc'),
      youtubeId: 'dQw4w9WgXcQ',
      category: t('videoGallery.video3Category'),
    },
    {
      id: 4,
      title: t('videoGallery.video4Title'),
      thumbnail: 'from-green-500 to-cyan-500',
      description: t('videoGallery.video4Desc'),
      youtubeId: 'dQw4w9WgXcQ',
      category: t('videoGallery.video4Category'),
    },
  ];

  return (
    <section id="videos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-body-sm font-semibold text-green-700 uppercase tracking-wider bg-green-50 px-4 py-2 rounded-full">
            {t('videoGallery.badge')}
          </span>
          <h2 className="mt-6 text-h2 font-bold text-gray-900">
            {t('videoGallery.title1')}
            <span className="bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent"> {t('videoGallery.title2')}</span>
          </h2>
          <p className="mt-4 text-body text-gray-600 max-w-2xl mx-auto">
            {t('videoGallery.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="group cursor-pointer"
              onClick={() => setSelectedVideo(index)}
            >
              <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-300">
                <div className={`relative h-40 bg-gradient-to-br ${video.thumbnail} overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-all"></div>

                  {/* Category Badge */}
                  <div className="absolute top-2 left-2 z-10">
                    <span className="text-body-xs font-medium text-white bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                      {video.category}
                    </span>
                  </div>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/85 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-green-600 transition-all transform group-hover:scale-105">
                      <Play className="h-5 w-5 text-green-600 group-hover:text-white fill-current transition-colors ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-3">
                  <h3 className="text-body-sm font-semibold text-gray-900 mb-1 line-clamp-2">{video.title}</h3>
                  <p className="text-body-xs text-gray-600 line-clamp-2">{video.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Video Player */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videos[selectedVideo].youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}`}
                title={videos[selectedVideo].title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video Info */}
            <div className="mt-4 bg-white/95 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <span className="inline-block text-body-xs font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full mb-2">
                    {videos[selectedVideo].category}
                  </span>
                  <h3 className="text-h5 font-bold text-gray-900 mb-1">{videos[selectedVideo].title}</h3>
                  <p className="text-body-sm text-gray-600">{videos[selectedVideo].description}</p>
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 w-9 h-9 bg-white/85 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-105 shadow-md"
            >
              <X className="h-5 w-5 text-black" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoGallery;
