import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';

interface LanguageSwitcherProps {
  isScrolled?: boolean;
}

const LanguageSwitcher = ({ isScrolled = false }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage();
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    // Show hint after 3 seconds if user hasn't switched language yet
    const hasSeenHint = localStorage.getItem('languageHintSeen');
    if (!hasSeenHint) {
      const timer = setTimeout(() => {
        setShowHint(true);
        // Auto-hide hint after 10 seconds
        setTimeout(() => {
          setShowHint(false);
          localStorage.setItem('languageHintSeen', 'true');
        }, 10000);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
    setShowHint(false);
    localStorage.setItem('languageHintSeen', 'true');
  };

  return (
    <div className="relative">
      <button
        onClick={toggleLanguage}
        className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
          isScrolled
            ? 'text-gray-700 hover:text-green-600 hover:bg-green-50'
            : 'text-white hover:text-green-400 hover:bg-white/10 backdrop-blur-sm'
        } ${showHint ? 'animate-pulse' : ''}`}
        aria-label="Switch language"
        title={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
      >
        <Globe className="h-5 w-5" />
        <span className="text-sm font-semibold uppercase">
          {language === 'en' ? 'العربية' : 'English'}
        </span>
        {showHint && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        )}
      </button>

      {/* Tooltip hint */}
      {showHint && (
        <div className={`absolute top-full mt-2 ${language === 'en' ? 'right-0' : 'left-0'} z-50 animate-fade-in-down`}>
          <div className={`px-4 py-2 rounded-lg shadow-lg border ${
            isScrolled
              ? 'bg-white border-green-200 text-gray-700'
              : 'bg-gray-900/90 border-gray-700 text-white backdrop-blur-sm'
          } text-sm font-medium whitespace-nowrap`}>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-green-500" />
              <span>{language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}</span>
            </div>
            {/* Arrow */}
            <div className={`absolute -top-1 ${language === 'en' ? 'right-4' : 'left-4'} w-2 h-2 rotate-45 ${
              isScrolled
                ? 'bg-white border-t border-l border-green-200'
                : 'bg-gray-900/90 border-t border-l border-gray-700'
            }`}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
