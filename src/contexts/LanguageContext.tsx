import React, { createContext, useContext, useState, useEffect } from 'react'
import enTranslations from '../translations/en.json'
import arTranslations from '../translations/ar.json'

export type Language = 'en' | 'ar'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  formatNumber: (num: number | string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: React.ReactNode
}

const translations = {
  en: enTranslations,
  ar: arTranslations,
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get initial language from localStorage or default to English
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language')
    return (saved === 'ar' || saved === 'en') ? saved : 'en'
  })

  // Update document direction and lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    localStorage.setItem('language', language)
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  // Translation function
  const t = (key: string): string => {
    const currentTranslations = translations[language]
    return (currentTranslations as Record<string, string>)[key] || key
  }

  // Convert numbers to Arabic-Indic numerals when in Arabic mode
  const formatNumber = (num: number | string): string => {
    const numStr = num.toString()
    if (language === 'ar') {
      // Map Western digits to Arabic-Indic digits
      const arabicNumerals: Record<string, string> = {
        '0': '٠',
        '1': '١',
        '2': '٢',
        '3': '٣',
        '4': '٤',
        '5': '٥',
        '6': '٦',
        '7': '٧',
        '8': '٨',
        '9': '٩',
      }
      return numStr.replace(/[0-9]/g, (digit) => arabicNumerals[digit] || digit)
    }
    return numStr
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, formatNumber }}>
      {children}
    </LanguageContext.Provider>
  )
}
