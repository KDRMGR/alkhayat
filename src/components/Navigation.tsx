import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: t('nav.about') },
    { href: '#objectives', label: t('nav.objectives') },
    { href: '#commitments', label: t('nav.commitments') },
    { href: '#values', label: t('nav.values') },
    { href: '#solutions', label: t('nav.solutions') },
    { href: '#services', label: t('nav.services') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#contact', label: t('nav.contact') },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled
        ? 'bg-white/90 backdrop-blur-xl shadow-md border-b border-gray-100'
        : 'bg-gradient-to-b from-black/40 to-transparent backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <img src="/WhatsApp Image 2025-10-24 at 3.06.52 AM.jpeg" alt="Khat Alriyadah" className="relative h-12 w-auto transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="hidden sm:block">
              <h1 className={`text-h5 font-bold transition-colors duration-300 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                {t('nav.companyName')}
              </h1>
              <p className={`text-body-sm transition-colors duration-300 ${isScrolled ? 'text-gray-600' : 'text-gray-200'}`}>
                {t('nav.companySubtitle')}
              </p>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative px-4 py-2 text-body-sm font-medium rounded-lg transition-all duration-300 group ${
                  isScrolled
                    ? 'text-gray-700 hover:text-green-600'
                    : 'text-white hover:text-green-400'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <span className="relative z-10">{link.label}</span>
                <div className={`absolute inset-0 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                  isScrolled
                    ? 'bg-green-50'
                    : 'bg-white/10 backdrop-blur-sm'
                }`}></div>
              </a>
            ))}
            <LanguageSwitcher isScrolled={isScrolled} />
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transform hover:scale-105 transition-all duration-300"
            >
              {t('nav.getQuote')}
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2.5 rounded-lg transition-all duration-300 ${
              isScrolled
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/10 backdrop-blur-sm'
            }`}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="px-4 py-4 space-y-2 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="block px-4 py-3 text-body font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-300 transform hover:translate-x-2"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-gray-200">
              <LanguageSwitcher isScrolled={true} />
            </div>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="block px-4 py-3 text-center bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
            >
              {t('nav.getQuote')}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
