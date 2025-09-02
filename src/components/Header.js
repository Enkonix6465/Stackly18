import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo-dark.png';

const Header = () => {
  const navigate = useNavigate();
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const homeDropdownTimeout = useRef();
  const servicesDropdownTimeout = useRef();
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [mobileHomeOpen, setMobileHomeOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  // Simple translations map
  const translations = {
    en: {
      home: 'Home',
      home1: 'Home 1',
      home2: 'Home 2',
      about: 'About Us',
      services: 'Services',
      allServices: 'All Services',
      nutrition: 'Personalized Nutrition',
      mindful: 'Mindful Movement',
      sleep: 'Sleep Optimization',
      stress: 'Stress Resilience',
      holistic: 'Holistic Detox',
      wellness: 'Wellness Coaching',
      blog: 'Blog',
      contact: 'Contact Us',
      languageLabel: 'Language',
      english: 'English',
      arabic: 'Arabic',
      hebrew: 'Hebrew',
      backToAdmin: 'Back to Admin Dashboard',
      userDashboard: 'User Dashboard',
      logout: 'Logout'
    },
    ar: {
      home: 'الرئيسية',
      home1: 'الصفحة الرئيسية 1',
      home2: 'الصفحة الرئيسية 2',
      about: 'معلومات عنا',
      services: 'الخدمات',
      allServices: 'كل الخدمات',
      nutrition: 'التغذية الشخصية',
      mindful: 'الحركة الواعية',
      sleep: 'تحسين النوم',
      stress: 'القدرة على التحمّل',
      holistic: 'إزالة السموم الشاملة',
      wellness: 'التدريب على العافية',
      blog: 'المدونة',
      contact: 'اتصل بنا',
      languageLabel: 'اللغة',
      english: 'الإنجليزية',
      arabic: 'العربية',
      hebrew: 'العبرية',
      backToAdmin: 'العودة إلى لوحة تحكم المشرف',
      userDashboard: 'لوحة تحكم المستخدم',
      logout: 'تسجيل الخروج'
    },
    he: {
      home: 'דף הבית',
      home1: 'בית 1',
      home2: 'בית 2',
      about: 'עלינו',
      services: 'שירותים',
      allServices: 'כל השירותים',
      nutrition: 'תזונה מותאמת אישית',
      mindful: 'תנועה מודעת',
      sleep: 'אופטימיזציית שינה',
      stress: 'חוסן מול סטרס',
      holistic: 'ניקוי רעלים הוליסטי',
      wellness: 'אימון לאורח חיים בריא',
      blog: 'בלוג',
      contact: 'צור קשר',
      languageLabel: 'שפה',
      english: 'אנגלית',
      arabic: 'ערבית',
      hebrew: 'עברית',
      backToAdmin: 'חזרה ללוח ניהול',
      userDashboard: 'לוח משתמש',
      logout: 'התנתקות'
    }
  };

  const t = (key) => translations[language]?.[key] || key;

  // Initial theme setup
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    const storedLang = localStorage.getItem('language') || 'en';
    setLanguage(storedLang);
  }, []);

  // Sync theme with localStorage and document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    window.dispatchEvent(new Event('theme-changed'));
  }, [theme]);

  // Sync language with localStorage and document direction (RTL/LTR)
  useEffect(() => {
    localStorage.setItem('language', language);
    const isRtl = language === 'ar' || language === 'he';
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    window.dispatchEvent(new Event('language-changed'));
  }, [language]);

  // Listen for theme changes from other tabs/pages
  useEffect(() => {
    const handleThemeChange = () => {
      const newTheme = localStorage.getItem('theme') || 'light';
      setTheme(newTheme);
    };
    window.addEventListener('theme-changed', handleThemeChange);
    window.addEventListener('storage', handleThemeChange);
    return () => {
      window.removeEventListener('theme-changed', handleThemeChange);
      window.removeEventListener('storage', handleThemeChange);
    };
  }, []);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  // Get user initials
  const getInitials = () => {
    const firstname = (localStorage.getItem('firstname') || '').trim();
    const lastname = (localStorage.getItem('lastname') || '').trim();
    let initials = '';
    if (firstname) initials += firstname[0].toUpperCase();
    if (lastname) initials += lastname[0].toUpperCase();
    return initials || '?';
  };

  const email = (localStorage.getItem('email') || '').trim();
  const initials = getInitials();

  // Mobile menu links
  const mobileLinks = (
    <nav className="flex flex-col space-y-2 mt-6">
      {/* Home Dropdown */}
      <button
        className="flex justify-between items-center py-2 px-4 hover:bg-green-100 rounded font-semibold"
        onClick={() => setMobileHomeOpen((prev) => !prev)}
      >
        {t('home')}
        <svg className={`w-4 h-4 ml-2 transition-transform ${mobileHomeOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {mobileHomeOpen && (
        <div className="pl-6 flex flex-col space-y-1">
          <Link to="/home1" className="py-2 px-4 hover:bg-green-50 rounded" onClick={toggleMobileMenu}>{t('home1')}</Link>
          <Link to="/home2" className="py-2 px-4 hover:bg-green-50 rounded" onClick={toggleMobileMenu}>{t('home2')}</Link>
        </div>
      )}

      <Link to="/about" className="py-2 px-4 hover:bg-green-100 rounded" onClick={toggleMobileMenu}>{t('about')}</Link>

      {/* Services Dropdown */}
      <button
        className="flex justify-between items-center py-2 px-4 hover:bg-green-100 rounded font-semibold"
        onClick={() => setMobileServicesOpen((prev) => !prev)}
      >
        {t('services')}
        <svg className={`w-4 h-4 ml-2 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {mobileServicesOpen && (
        <div className="pl-6 flex flex-col space-y-1">
          <Link to="/services" className="py-2 px-4 hover:bg-green-50 rounded" onClick={toggleMobileMenu}>{t('allServices')}</Link>
          <Link to="/Nutrition" className="py-2 px-4 hover:bg-green-50 rounded" onClick={toggleMobileMenu}>{t('nutrition')}</Link>
          <Link to="/Mindful" className="py-2 px-4 hover:bg-green-50 rounded" onClick={toggleMobileMenu}>{t('mindful')}</Link>
          <Link to="/Sleep" className="py-2 px-4 hover:bg-green-50 rounded" onClick={toggleMobileMenu}>{t('sleep')}</Link>
          <Link to="/Stress" className="py-2 px-4 hover:bg-green-50 rounded" onClick={toggleMobileMenu}>{t('stress')}</Link>
          <Link to="/Holistic" className="py-2 px-4 hover:bg-green-50 rounded" onClick={toggleMobileMenu}>{t('holistic')}</Link>
          <Link to="/Wellness" className="py-2 px-4 hover:bg-green-50 rounded" onClick={toggleMobileMenu}>{t('wellness')}</Link>
        </div>
      )}

      <Link to="/blog" className="py-2 px-4 hover:bg-green-100 rounded" onClick={toggleMobileMenu}>{t('blog')}</Link>
      <Link to="/contact" className="py-2 px-4 hover:bg-green-100 rounded" onClick={toggleMobileMenu}>{t('contact')}</Link>
    </nav>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300
        ${theme === 'dark' ? 'bg-[#000] border-b border-[#141B25]' : 'bg-white border-b border-gray-200'}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex pl-4 sm:pl-6 lg:pl-14 items-center">
            <button onClick={() => navigate('/home1')} className="focus:outline-none">
              <img src={logo} alt="STACKLY" className="h-6 sm:h-8 w-auto" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden min-[480px]:flex items-center space-x-8">
            {/* Home Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => { if (homeDropdownTimeout.current) clearTimeout(homeDropdownTimeout.current); setIsHomeDropdownOpen(true); }}
              onMouseLeave={() => { homeDropdownTimeout.current = setTimeout(() => setIsHomeDropdownOpen(false), 200); }}
            >
              <button
                onClick={() => navigate('/home1')}
                className={`flex items-center ${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-green-500 transition-colors duration-200`}
                aria-haspopup="true"
                aria-expanded={isHomeDropdownOpen}
              >
                {t('home')}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isHomeDropdownOpen && (
                <div className={`absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg border py-2 ${theme === 'dark' ? 'bg-[#1E2A38] border-[#141B25]' : 'bg-white border-gray-200'}`}>
                  <Link to="/home1" className={`block px-4 py-2 ${theme === 'dark' ? 'text-white hover:bg-[#22304a]' : 'text-gray-800 hover:bg-green-100'}`} onClick={() => setIsHomeDropdownOpen(false)}>{t('home1')}</Link>
                  <Link to="/home2" className={`block px-4 py-2 ${theme === 'dark' ? 'text-white hover:bg-[#22304a]' : 'text-gray-800 hover:bg-green-100'}`} onClick={() => setIsHomeDropdownOpen(false)}>{t('home2')}</Link>
                </div>
              )}
            </div>

            <Link to="/about" className={`${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-green-500 transition-colors duration-200`}>{t('about')}</Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => { if (servicesDropdownTimeout.current) clearTimeout(servicesDropdownTimeout.current); setIsServicesDropdownOpen(true); }}
              onMouseLeave={() => { servicesDropdownTimeout.current = setTimeout(() => setIsServicesDropdownOpen(false), 200); }}
            >
              <button
                onClick={() => navigate('/services')}
                className={`flex items-center ${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-green-500 transition-colors duration-200`}
                aria-haspopup="true"
                aria-expanded={isServicesDropdownOpen}
              >
                {t('services')}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isServicesDropdownOpen && (
                <div className={`absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg border py-2 ${theme === 'dark' ? 'bg-[#1E2A38] border-[#141B25]' : 'bg-white border-gray-200'}`}>
                  <Link to="/services" className={`block px-4 py-2 ${theme === 'dark' ? 'text-white hover:bg-[#22304a]' : 'text-gray-800 hover:bg-green-100'}`} onClick={() => setIsServicesDropdownOpen(false)}>{t('allServices')}</Link>
                  <Link to="/Nutrition" className={`block px-4 py-2 ${theme === 'dark' ? 'text-white hover:bg-[#22304a]' : 'text-gray-800 hover:bg-green-100'}`} onClick={() => setIsServicesDropdownOpen(false)}>{t('nutrition')}</Link>
                  <Link to="/Mindful" className={`block px-4 py-2 ${theme === 'dark' ? 'text-white hover:bg-[#22304a]' : 'text-gray-800 hover:bg-green-100'}`} onClick={() => setIsServicesDropdownOpen(false)}>{t('mindful')}</Link>
                  <Link to="/Sleep" className={`block px-4 py-2 ${theme === 'dark' ? 'text-white hover:bg-[#22304a]' : 'text-gray-800 hover:bg-green-100'}`} onClick={() => setIsServicesDropdownOpen(false)}>{t('sleep')}</Link>
                  <Link to="/Stress" className={`block px-4 py-2 ${theme === 'dark' ? 'text-white hover:bg-[#22304a]' : 'text-gray-800 hover:bg-green-100'}`} onClick={() => setIsServicesDropdownOpen(false)}>{t('stress')}</Link>
                  <Link to="/Holistic" className={`block px-4 py-2 ${theme === 'dark' ? 'text-white hover:bg-[#22304a]' : 'text-gray-800 hover:bg-green-100'}`} onClick={() => setIsServicesDropdownOpen(false)}>{t('holistic')}</Link>
                  <Link to="/Wellness" className={`block px-4 py-2 ${theme === 'dark' ? 'text-white hover:bg-[#22304a]' : 'text-gray-800 hover:bg-green-100'}`} onClick={() => setIsServicesDropdownOpen(false)}>{t('wellness')}</Link>
                </div>
              )}
            </div>

            <Link to="/blog" className={`${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-green-500 transition-colors duration-200`}>{t('blog')}</Link>
            <Link to="/contact" className={`${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-green-500 transition-colors duration-200`}>{t('contact')}</Link>

            {/* Dark Mode Toggle */}
            <button
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-green-100 border-green-300 hover:bg-green-200'}`}
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-8.66h-1M4.34 12H3m15.07 4.93l-.71-.71M6.34 6.34l-.71-.71m12.02 12.02l-.71-.71M6.34 17.66l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Language Selector */}
            <div className="flex items-center">
              <label htmlFor="language-select" className={`mr-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{t('languageLabel')}:</label>
              <select
                id="language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`text-sm rounded-md border px-2 py-1 focus:outline-none ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
              >
                <option value="en">{t('english')}</option>
                <option value="ar">{t('arabic')}</option>
                <option value="he">{t('hebrew')}</option>
              </select>
            </div>

            {/* Avatar Dropdown */}
            <div className="relative">
              <button
                className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold focus:outline-none"
                onClick={() => setIsAvatarDropdownOpen(prev => !prev)}
              >
                {initials}
              </button>
              {isAvatarDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg border py-2 z-50 ${theme === 'dark' ? 'bg-[#1E2A38] border-[#141B25]' : 'bg-white border-gray-200'}`}>
                  {email === 'admin@enkonix.in' && (
                    <button
                      className={`block w-full text-left px-4 py-2 ${theme === 'dark' ? 'text-white hover:bg-green-500' : 'text-gray-800 hover:bg-green-100'}`}
                      onClick={() => { setIsAvatarDropdownOpen(false); navigate('/admindashboard'); }}
                    >
                      {t('backToAdmin')}
                    </button>
                  )}
                  {email && email !== 'admin@enkonix.in' && (
                    <button
                      className={`block w-full text-left px-4 py-2 ${theme === 'dark' ? 'text-white hover:bg-green-500' : 'text-gray-800 hover:bg-green-100'}`}
                      onClick={() => { setIsAvatarDropdownOpen(false); navigate('/userdashboard'); }}
                    >
                      {t('userDashboard')}
                    </button>
                  )}
                  <button
                    className={`block w-full text-left px-4 py-2 ${theme === 'dark' ? 'text-white hover:bg-green-500' : 'text-gray-800 hover:bg-green-100'}`}
                    onClick={() => { setIsAvatarDropdownOpen(false); window.location.href = '/'; }}
                  >
                    {t('logout')}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="min-[480px]:hidden flex items-center">
            <button
              className={`p-2 rounded-md focus:outline-none ${theme === 'dark' ? 'text-white' : 'text-black'}`}
              onClick={toggleMobileMenu}
              aria-label="Open menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className={`fixed top-20 left-0 right-0 bg-white z-40 shadow-lg border-t border-gray-200 min-[480px]:hidden`}>
          {mobileLinks}
          <div className="flex items-center justify-between px-4 py-4 border-t">
            {/* Theme Toggle */}
            <button
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors duration-200 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-green-100 border-green-300 hover:bg-green-200'}`}
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-8.66h-1M4.34 12H3m15.07 4.93l-.71-.71M6.34 6.34l-.71-.71m12.02 12.02l-.71-.71M6.34 17.66l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            {/* Language Selector */}
            <div className="flex items-center">
              <label htmlFor="mobile-language-select" className="mr-2 text-sm text-gray-700">{t('languageLabel')}:</label>
              <select
                id="mobile-language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-sm rounded-md border px-2 py-1 focus:outline-none bg-white border-gray-300 text-gray-800"
              >
                <option value="en">{t('english')}</option>
                <option value="ar">{t('arabic')}</option>
                <option value="he">{t('hebrew')}</option>
              </select>
            </div>
            {/* Avatar */}
            <div className="relative">
              <button
                className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold focus:outline-none"
                onClick={() => setIsAvatarDropdownOpen(prev => !prev)}
              >
                {initials}
              </button>
              {isAvatarDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg border py-2 z-50 bg-white border-gray-200">
                  {email === 'admin@enkonix.in' && (
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-green-100"
                      onClick={() => { setIsAvatarDropdownOpen(false); navigate('/admindashboard'); toggleMobileMenu(); }}
                    >
                      {t('backToAdmin')}
                    </button>
                  )}
                  {email && email !== 'admin@enkonix.in' && (
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-green-100"
                      onClick={() => { setIsAvatarDropdownOpen(false); navigate('/userdashboard'); toggleMobileMenu(); }}
                    >
                      {t('userDashboard')}
                    </button>
                  )}
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-green-100"
                    onClick={() => { setIsAvatarDropdownOpen(false); window.location.href = '/'; toggleMobileMenu(); }}
                  >
                    {t('logout')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
