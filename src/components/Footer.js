import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-dark.png';

const THEME_KEY = "theme";
const LANGUAGE_KEY = "language";

// Translations for all texts
const translations = {
  en: {
    company: "Online Training Platform",
    description: "Empowering learners worldwide with interactive online courses, expert instructors, and real-world skill development for every career stage.",
    quickLinks: "Quick Links",
    home: "Home",
    about: "About Us",
    services: "Services",
    blog: "Blog",
    contact: "Contact us",
    ourServices: "Our Services",
    nutrition: "Personalized Nutrition",
    mindful: "Mindful Movement",
    sleep: "Sleep Optimization",
    stress: "Stress Resilience",
    holistic: "Holistic Detox",
    wellness: "Wellness Coaching",
    getInTouch: "Get In Touch",
    phone: "+919390594407",
    email: "training@stackly.in",
    location: "India",
    hours: "Mon - Fri: 9am - 6pm",
    startJourney: "Start Your Journey",
    copyright: "© 2025 Health & Wellness Company. All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    cookie: "Cookie Policy"
  },
  ar: {
    company: "منصة التدريب عبر الإنترنت",
    description: "تمكين المتعلمين حول العالم بدورات تفاعلية عبر الإنترنت، ومدربين خبراء، وتطوير المهارات العملية لكل مرحلة مهنية.",
    quickLinks: "روابط سريعة",
    home: "الرئيسية",
    about: "من نحن",
    services: "الخدمات",
    blog: "مدونة",
    contact: "اتصل بنا",
    ourServices: "خدماتنا",
    nutrition: "التغذية الشخصية",
    mindful: "الحركة الواعية",
    sleep: "تحسين النوم",
    stress: "المرونة في مواجهة الضغط",
    holistic: "التخلص الشامل من السموم",
    wellness: "تدريب العافية",
    getInTouch: "تواصل معنا",
    phone: "+919390594407",
    email: "training@stackly.in",
    location: "الهند",
    hours: "الاثنين - الجمعة: 9ص - 6م",
    startJourney: "ابدأ رحلتك",
    copyright: "© 2025 شركة الصحة والعافية. جميع الحقوق محفوظة.",
    privacy: "سياسة الخصوصية",
    terms: "شروط الخدمة",
    cookie: "سياسة الكوكيز"
  },
  he: {
    company: "פלטפורמת הדרכה אונליין",
    description: "העצמת לומדים ברחבי העולם עם קורסים אינטראקטיביים, מדריכים מומחים ופיתוח מיומנויות לכל שלב בקריירה.",
    quickLinks: "קישורים מהירים",
    home: "בית",
    about: "אודות",
    services: "שירותים",
    blog: "בלוג",
    contact: "צור קשר",
    ourServices: "השירותים שלנו",
    nutrition: "תזונה מותאמת אישית",
    mindful: "תנועה מודעת",
    sleep: "אופטימיזציית שינה",
    stress: "חוסן נפשי מול לחץ",
    holistic: "ניקוי רעלים הוליסטי",
    wellness: "אימון בריאות הוליסטי",
    getInTouch: "צור קשר",
    phone: "+919390594407",
    email: "training@stackly.in",
    location: "הודו",
    hours: "ב'-ו': 9:00 - 18:00",
    startJourney: "התחל את המסע שלך",
    copyright: "© 2025 חברת בריאות ורווחה. כל הזכויות שמורות.",
    privacy: "מדיניות פרטיות",
    terms: "תנאי שימוש",
    cookie: "מדיניות עוגיות"
  }
};

const rtlLangs = ["ar", "he"];
const t = (key, lang) => translations[lang]?.[key] || translations.en[key];

const Footer = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || 'light');
  const [language, setLanguage] = useState(() => localStorage.getItem(LANGUAGE_KEY) || 'en');

  useEffect(() => {
    const handleThemeChange = () => setTheme(localStorage.getItem(THEME_KEY) || 'light');
    window.addEventListener('theme-changed', handleThemeChange);
    window.addEventListener('storage', handleThemeChange);

    const handleLanguageChange = () => setLanguage(localStorage.getItem(LANGUAGE_KEY) || 'en');
    window.addEventListener('language-changed', handleLanguageChange);
    window.addEventListener('storage', handleLanguageChange);

    return () => {
      window.removeEventListener('theme-changed', handleThemeChange);
      window.removeEventListener('storage', handleThemeChange);
      window.removeEventListener('language-changed', handleLanguageChange);
      window.removeEventListener('storage', handleLanguageChange);
    };
  }, []);

  const bg = theme === 'dark' ? 'bg-[#000]' : 'bg-white';
  const textMain = theme === 'dark' ? 'text-white' : 'text-black';
  const textSub = theme === 'dark' ? 'text-gray-300' : 'text-black';
  const border = theme === 'dark' ? 'border-gray-700' : 'border-gray-800';
  const dir = rtlLangs.includes(language) ? "rtl" : "ltr";

  return (
    <footer className={`${bg} ${textMain}`} dir={dir}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 min-[768px]:grid-cols-4 gap-16 justify-between">
          
          {/* Column 1 - Company Information */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img src={logo} alt="STACKLY" className="h-8 w-auto" />
            </div>
            <h3 className="text-[#28a745] font-semibold text-lg">
              {t("company", language)}
            </h3>
            <p className={`${textSub} text-sm leading-relaxed`}>
              {t("description", language)}
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-3 pt-2">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-800'
                } flex items-center justify-center hover:bg-[#28a745] transition-colors duration-200`}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* Twitter */}
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-800'
                } flex items-center justify-center hover:bg-[#28a745] transition-colors duration-200`}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#28a745] transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* Pinterest */}
              <a
                href="https://pinterest.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#28a745] transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-4">
            <h3 className="text-[#28a745] font-semibold text-lg">{t("quickLinks", language)}</h3>
            <ul className="space-y-2">
              <li><Link to="/home1" className={`${textSub} hover:text-green-500 transition-colors duration-200`}>{t("home", language)}</Link></li>
              <li><Link to="/about" className={`${textSub} hover:text-green-500 transition-colors duration-200`}>{t("about", language)}</Link></li>
              <li><Link to="/services" className={`${textSub} hover:text-green-500 transition-colors duration-200`}>{t("services", language)}</Link></li>
              <li><Link to="/blog" className={`${textSub} hover:text-green-500 transition-colors duration-200`}>{t("blog", language)}</Link></li>
              <li><Link to="/contact" className={`${textSub} hover:text-green-500 transition-colors duration-200`}>{t("contact", language)}</Link></li>
            </ul>
          </div>

          {/* Column 3 - Our Services */}
          <div className="space-y-4">
            <h3 className="text-[#28a745] font-semibold text-lg">{t("ourServices", language)}</h3>
            <ul className="space-y-2">
              <li><Link to="/Nutrition" className={`${textSub} hover:text-green-500 transition-colors duration-200`}>{t("nutrition", language)}</Link></li>
              <li><Link to="/Mindful" className={`${textSub} hover:text-green-500 transition-colors duration-200`}>{t("mindful", language)}</Link></li>
              <li><Link to="/Sleep" className={`${textSub} hover:text-green-500 transition-colors duration-200`}>{t("sleep", language)}</Link></li>
              <li><Link to="/Stress" className={`${textSub} hover:text-green-500 transition-colors duration-200`}>{t("stress", language)}</Link></li>
              <li><Link to="/Holistic" className={`${textSub} hover:text-green-500 transition-colors duration-200`}>{t("holistic", language)}</Link></li>
              <li><Link to="/Wellness" className={`${textSub} hover:text-green-500 transition-colors duration-200`}>{t("wellness", language)}</Link></li>
            </ul>
          </div>

          {/* Column 4 - Get In Touch */}
          <div className="space-y-4">
            <h3 className="text-[#28a745] font-semibold text-lg">{t("getInTouch", language)}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className={`${textSub}`}>{t("phone", language)}</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className={`${textSub}`}>{t("email", language)}</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className={`${textSub}`}>{t("location", language)}</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className={`${textSub}`}>{t("hours", language)}</span>
              </div>
            </div>
            <Link 
              to="/contact" 
              className="w-full bg-[#28a745] hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mt-4 whitespace-nowrap text-center block"
            >
              {t("startJourney", language)}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar - Legal Links */}
      <div className={`border-t ${border}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className={`${textSub} text-sm`}>
              {t("copyright", language)}
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className={`${textSub} hover:text-green-500 transition-colors duration-200`}>{t("privacy", language)}</a>
              <a href="#" className={`${textSub} hover:text-green-500 transition-colors duration-200`}>{t("terms", language)}</a>
              <a href="#" className={`${textSub} hover:text-green-500 transition-colors duration-200`}>{t("cookie", language)}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
