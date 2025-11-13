import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add welcome message when chatbot opens for the first time
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: language === 'en'
          ? "Hello! I'm Khat Alriyadah's virtual assistant. I can help you with information about our services, projects, and company. How can I assist you today?"
          : "مرحباً! أنا المساعد الافتراضي لخط الرياضة. يمكنني مساعدتك بمعلومات حول خدماتنا ومشاريعنا وشركتنا. كيف يمكنني مساعدتك اليوم؟",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, language]);

  // Knowledge base from website content
  const knowledgeBase = {
    en: {
      services: "We provide comprehensive construction services including: Mechanical services (valves, water solutions, meters), Cables (data cables, fiber optic, fire resistant), CCTV, Fire & Safety systems, Data Centre & Power solutions, Drainage products, and Electrical services (switches, lighting, panels).",
      projects: "We have completed over 500 projects including: Panda Distribution Center in KAEC, Industrial City Admin Building, Nova Factory & Warehouses, Corona Hospital, Dr. Sulaiman Al Habib Hospital, Time Square Riyadh Boulevard, MODON 16 Ready Built Factories, Workers Construction Village in NEOM, and King Abdel Aziz University Stadium.",
      experience: "Khat Alriyadah has been delivering excellence in construction and engineering services across Saudi Arabia since 2011. With over 12 years of experience, we have successfully completed more than 500 projects.",
      team: "We have a team of 50+ experienced professionals including civil engineers, surveyors, construction engineers, and qualified personnel with international training.",
      quality: "We maintain ISO certification and 100% quality standards. Our quality staff ensures that our products and services maintain their cutting edge with rigorous standards and best practices.",
      commitment: "We are committed to providing total solutions from design, supply of material, installation, commission and after sales services. We promise close collaboration with ready assistance by our experienced Engineers for technical support.",
      safety: "Safety is our top priority. We adhere to international safety standards and Saudi Arabian regulations, implementing comprehensive safety protocols on all projects.",
      contact: "You can reach us through our contact form on the website, call our office directly, or visit us at our location. Our team will schedule a consultation to discuss your project requirements.",
      vision: "We support Saudi Arabia's Vision 2030 and are committed to building the future infrastructure of Saudi Arabia with world-class engineering and innovation.",
      values: "Our core values are: Committed to our vision and mission, Courteous with customers and stakeholders, Competent in continuously developing our skills, Responsible for our work and actions, and Accountable with transparency.",
    },
    ar: {
      services: "نقدم خدمات إنشائية شاملة تشمل: الخدمات الميكانيكية (صمامات، حلول المياه، عدادات)، الكابلات (كابلات البيانات، الألياف البصرية، مقاومة للحريق)، كاميرات المراقبة، أنظمة الحريق والسلامة، حلول مركز البيانات والطاقة، منتجات الصرف الصحي، والخدمات الكهربائية (مفاتيح، إضاءة، لوحات).",
      projects: "أكملنا أكثر من 500 مشروع بما في ذلك: مركز توزيع باندا في مدينة الملك عبدالله الاقتصادية، مبنى إدارة المدينة الصناعية، مصنع ومستودعات نوفا، مستشفى كورونا، مستشفى د. سليمان الحبيب، تايم سكوير بوليفارد الرياض، 16 مصنع جاهز بمدن، قرية بناء العمال في نيوم، وملعب جامعة الملك عبدالعزيز.",
      experience: "خط الرياضة يقدم التميز في خدمات البناء والهندسة في جميع أنحاء المملكة العربية السعودية منذ عام 2011. بخبرة تزيد عن 12 عاماً، أكملنا بنجاح أكثر من 500 مشروع.",
      team: "لدينا فريق من أكثر من 50 محترفاً ذوي خبرة بما في ذلك مهندسين مدنيين، مساحين، مهندسي بناء، وموظفين مؤهلين بتدريب دولي.",
      quality: "نحافظ على شهادة ISO ومعايير جودة 100٪. يضمن موظفو الجودة لدينا أن منتجاتنا وخدماتنا تحافظ على ميزتها التنافسية من خلال معايير صارمة وأفضل الممارسات.",
      commitment: "نحن ملتزمون بتقديم حلول شاملة من التصميم وتوريد المواد والتركيب والتشغيل وخدمات ما بعد البيع. نعد بالتعاون الوثيق مع المساعدة الجاهزة من قبل مهندسينا ذوي الخبرة للدعم الفني.",
      safety: "السلامة هي أولويتنا القصوى. نلتزم بمعايير السلامة الدولية واللوائح السعودية، وننفذ بروتوكولات السلامة الشاملة في جميع مشاريعنا.",
      contact: "يمكنك التواصل معنا من خلال نموذج الاتصال على الموقع، أو الاتصال بمكتبنا مباشرة، أو زيارتنا في موقعنا. سيحدد فريقنا موعداً للاستشارة لمناقشة متطلبات مشروعك.",
      vision: "ندعم رؤية المملكة العربية السعودية 2030 ونلتزم ببناء البنية التحتية المستقبلية للمملكة بالهندسة العالمية والابتكار.",
      values: "قيمنا الأساسية هي: ملتزمون برؤيتنا ورسالتنا، مهذبون مع العملاء وأصحاب المصلحة، أكفاء في التطوير المستمر لمهاراتنا، مسؤولون عن عملنا وأفعالنا، ومسائلون بشفافية.",
    },
  };

  const getResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    const kb = knowledgeBase[language];

    // Keywords matching
    const keywords = {
      en: {
        services: ['service', 'services', 'what do you do', 'what services', 'mechanical', 'electrical', 'cables', 'cctv'],
        projects: ['project', 'projects', 'work', 'portfolio', 'completed', 'panda', 'hospital', 'modon'],
        experience: ['experience', 'how long', 'years', 'established', 'when', 'history'],
        team: ['team', 'staff', 'employees', 'engineers', 'professionals'],
        quality: ['quality', 'iso', 'standard', 'certification'],
        commitment: ['commitment', 'promise', 'guarantee'],
        safety: ['safety', 'safe', 'security', 'regulations'],
        contact: ['contact', 'reach', 'phone', 'email', 'address', 'location'],
        vision: ['vision', '2030', 'vision 2030', 'future', 'goals'],
        values: ['values', 'principles', 'culture', 'mission'],
      },
      ar: {
        services: ['خدمة', 'خدمات', 'ماذا تقدمون', 'ما هي خدماتكم', 'ميكانيكي', 'كهربائي', 'كابلات', 'كاميرات'],
        projects: ['مشروع', 'مشاريع', 'أعمال', 'محفظة', 'مكتمل', 'باندا', 'مستشفى', 'مدن'],
        experience: ['خبرة', 'كم سنة', 'سنوات', 'تأسست', 'متى', 'تاريخ'],
        team: ['فريق', 'موظفين', 'مهندسين', 'محترفين'],
        quality: ['جودة', 'ايزو', 'معيار', 'شهادة'],
        commitment: ['التزام', 'وعد', 'ضمان'],
        safety: ['سلامة', 'آمن', 'أمان', 'لوائح'],
        contact: ['تواصل', 'اتصال', 'هاتف', 'بريد', 'عنوان', 'موقع'],
        vision: ['رؤية', '2030', 'رؤية 2030', 'مستقبل', 'أهداف'],
        values: ['قيم', 'مبادئ', 'ثقافة', 'رسالة'],
      },
    };

    const currentKeywords = keywords[language];

    // Check for matches
    for (const [topic, words] of Object.entries(currentKeywords)) {
      if (words.some(word => msg.includes(word))) {
        return kb[topic as keyof typeof kb];
      }
    }

    // Default response for out-of-scope questions
    return language === 'en'
      ? "I apologize, but I can only provide information about Khat Alriyadah's services, projects, and company details. For specific inquiries or detailed discussions, please use the Contact section on our website to send us a message. Our team will get back to you shortly!"
      : "أعتذر، ولكن يمكنني فقط تقديم معلومات حول خدمات خط الرياضة ومشاريعها وتفاصيل الشركة. للاستفسارات المحددة أو المناقشات التفصيلية، يرجى استخدام قسم الاتصال على موقعنا لإرسال رسالة لنا. سيتواصل معك فريقنا قريباً!";
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-green-600 to-cyan-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
          aria-label="Open chat"
        >
          <MessageCircle className="h-7 w-7 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-cyan-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">
                  {language === 'en' ? 'AI Assistant' : 'المساعد الذكي'}
                </h3>
                <p className="text-xs text-green-50">
                  {language === 'en' ? 'Online' : 'متصل'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-green-600 to-cyan-600'
                    : 'bg-gray-300'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="h-5 w-5 text-white" />
                  ) : (
                    <Bot className="h-5 w-5 text-gray-700" />
                  )}
                </div>
                <div className={`max-w-[75%] ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-green-600 to-cyan-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 px-2">
                    {message.timestamp.toLocaleTimeString(language === 'en' ? 'en-US' : 'ar-SA', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-5 w-5 text-gray-700" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={language === 'en' ? 'Type your message...' : 'اكتب رسالتك...'}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-cyan-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
