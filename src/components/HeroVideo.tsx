import { useLanguage } from '../contexts/LanguageContext';

const HeroVideo = () => {
  const { t } = useLanguage();
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2"
          src="https://www.youtube.com/embed/DuT3njy9hWg?autoplay=1&mute=1&loop=1&playlist=DuT3njy9hWg&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
          title="Al-Khayat Background Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        {/* Subtle Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Centered Title Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        {/* Main Title */}
        <h1 className="font-sans font-bold tracking-[0.15em] uppercase mb-3 animate-fade-in"
            style={{
              fontSize: 'clamp(2.5rem, 10vw, 7rem)',
              color: 'rgba(255, 255, 255, 0.95)',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255, 255, 255, 0.1)',
              letterSpacing: '0.2em',
              lineHeight: '1.1'
            }}>
          {t('hero.title')}
        </h1>

        {/* Subtitle - Company Type */}
        <p className="font-sans font-medium tracking-[0.2em] uppercase animate-fade-in-delayed"
           style={{
             fontSize: 'clamp(1rem, 3vw, 2rem)',
             color: 'rgba(255, 255, 255, 0.85)',
             textShadow: '0 2px 15px rgba(0, 0, 0, 0.5)',
             letterSpacing: '0.25em'
           }}>
          {t('hero.subtitle2')}
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1.2s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-delayed {
          animation: fadeIn 1.2s ease-out 0.25s forwards;
          opacity: 0;
        }

        .animate-fade-in-delayed-2 {
          animation: fadeIn 1.2s ease-out 0.5s forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default HeroVideo;
