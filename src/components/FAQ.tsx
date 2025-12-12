import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSupabaseData } from '../hooks/useSupabaseData';
import { db } from '../lib/supabase';

const FAQ = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Fetch FAQs from Supabase
  const { data: faqsData } = useSupabaseData(() => db.faqs(), []);

  // Use Supabase data if available, otherwise fall back to translations
  const faqs = faqsData && faqsData.length > 0
    ? faqsData.map((faq: any) => ({
        question: faq.question,
        answer: faq.answer,
      }))
    : [
        {
          question: t('faq.question1'),
          answer: t('faq.answer1'),
        },
        {
          question: t('faq.question2'),
          answer: t('faq.answer2'),
        },
        {
          question: t('faq.question3'),
          answer: t('faq.answer3'),
        },
        {
          question: t('faq.question4'),
          answer: t('faq.answer4'),
        },
        {
          question: t('faq.question5'),
          answer: t('faq.answer5'),
        },
        {
          question: t('faq.question6'),
          answer: t('faq.answer6'),
        },
      ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-green-700 uppercase tracking-wide bg-green-50 px-4 py-2 rounded-full">
            {t('faq.badge')}
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900">
            {t('faq.title1')}
            <span className="bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent"> {t('faq.title2')}</span>
          </h2>
          <div className="mt-4 h-1 w-20 bg-gradient-to-r from-green-600 to-cyan-500 rounded-full mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-green-300 transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900 pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-green-600 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">{t('faq.stillHaveQuestions')}</p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105"
          >
            {t('faq.contactButton')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
