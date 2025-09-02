import React, { useEffect, useState } from "react";

import vedio from "../assets/home1.mp4";
import image from "../assets/1.jpg";
import image2 from "../assets/5.jpg";
import image6 from "../assets/health.jpg";
import image7 from "../assets/Mindful.jpg";
import image8 from "../assets/walk.jpg";
import image9 from "../assets/B2.jpg";
import { Link } from "react-router-dom";

// Translations and language helpers
const TRANSLATIONS = {
  en: {
    heroTitle: "Welcome to Health & Wellness",
    heroSubtitle: "Your journey to a healthier lifestyle starts here",
    heroCta: "Know More",
    aboutHeading: "Your Wellness, Your Way",
    aboutP1:
      "Take charge of your health and well-being with personalized wellness programs designed just for you. We provide guidance that empowers your body, mind, and spirit.",
    aboutL1: "Personalized Nutrition & Meal Planning",
    aboutL2: "Holistic Fitness & Yoga Programs",
    aboutL3: "Mental Wellness & Mindfulness Practices",
    aboutCta: "About Us",
    servicesHeading: "Our Wellness Services",
    serviceTitle1: "Yoga & Meditation",
    serviceDesc1:
      "Find inner peace and improve flexibility with guided yoga and meditation sessions.",
    serviceTitle2: "Nutrition Plans",
    serviceDesc2:
      "Personalized diet plans designed by nutrition experts for a healthier lifestyle.",
    serviceTitle3: "Fitness Coaching",
    serviceDesc3:
      "Get fit with professional coaching tailored to your goals and abilities.",
    latestArticles: "Latest Articles",
    latestArticlesDesc:
      "Stay inspired with wellness tips, nutrition guides, and mindful living practices.",
    achievementsHeading: "Our Achievements",
    ach1: "Happy Clients",
    ach2: "Wellness Programs",
    ach3: "Expert Coaches",
    ach4: "Years of Service",
    contactHeading: "Get in Touch",
    contactDesc:
      "Have questions or need guidance on your wellness journey? Reach out to us today.",
    contactCta: "Contact Us",
    blog1Title: "5 Tips for Mindful Living",
    blog1Desc:
      "Practical tips to help you stay present and reduce stress daily.",
    blog2Title: "Healthy Smoothie Recipes",
    blog2Desc:
      "Try these easy and nutritious smoothie recipes for energy and vitality.",
    blog3Title: "The Power of Daily Walks",
    blog3Desc:
      "Learn how walking 30 minutes a day can transform your health.",
  },
  ar: {
    heroTitle: "مرحبًا بكم في الصحة والعافية",
    heroSubtitle: "رحلتك نحو نمط حياة أكثر صحة تبدأ من هنا",
    heroCta: "اعرف المزيد",
    aboutHeading: "عافيتك بطريقتك",
    aboutP1:
      "تولَّ زمام صحتك وعافيتك من خلال برامج عافية مخصصة لك. نحن نقدم إرشادًا يدعم جسدك وعقلك وروحك.",
    aboutL1: "تغذية شخصية وتخطيط وجبات",
    aboutL2: "لياقة شاملة وبرامج يوجا",
    aboutL3: "الصحة النفسية وممارسات اليقظة الذهنية",
    aboutCta: "معلومات عنا",
    servicesHeading: "خدمات العافية لدينا",
    serviceTitle1: "يوجا وتأمل",
    serviceDesc1:
      "ابحث عن السلام الداخلي وحسن المرونة من خلال جلسات اليوجا والتأمل الموجهة.",
    serviceTitle2: "خطط تغذية",
    serviceDesc2:
      "خطط غذائية شخصية صممها خبراء تغذية لحياة أكثر صحة.",
    serviceTitle3: "תدريب ליאקה", 
    serviceDesc3:
      "احصل على لياقة بتدريب احترافي مخصص لأهدافك وقدراتك.",
    latestArticles: "أحدث المقالات",
    latestArticlesDesc:
      "ابقَ ملهمًا بنصائح العافية وأدلة التغذية وممارسات اليقظة الذهنية.",
    achievementsHeading: "إنجازاتنا",
    ach1: "عملاء سعداء",
    ach2: "برامج عافية",
    ach3: "مدربون خبراء",
    ach4: "سنوات خدمة",
    contactHeading: "تواصل معنا",
    contactDesc:
      "هل لديك أسئلة أو تحتاج لتوجيه في رحلتك نحو العافية؟ تواصل معنا اليوم.",
    contactCta: "اتصل بنا",
    blog1Title: "5 نصائح لحياة يقِظة",
    blog1Desc: "نصائح عملية تساعدك على البقاء حاضرًا وتقليل التوتر يوميًا.",
    blog2Title: "وصفات عصائر صحية",
    blog2Desc:
      "جرّب هذه الوصفات السهلة والمغذية للحصول على طاقة وحيوية.",
    blog3Title: "قوة المشي اليومي",
    blog3Desc:
      "تعرف على كيف يمكن للمشي 30 دقيقة يوميًا أن يغير صحتك.",
  },
  he: {
    heroTitle: "ברוכים הבאים לבריאות ואיכות חיים",
    heroSubtitle: "המסע לאורח חיים בריא יותר מתחיל כאן",
    heroCta: "למד עוד",
    aboutHeading: "הרווחה שלך, בדרך שלך",
    aboutP1:
      "קח שליטה על הבריאות והרווחה שלך עם תוכניות אישיות. אנו מעניקים הדרכה המעצימה את הגוף, הנפש והרוח.",
    aboutL1: "תזונה אישית ותכנון ארוחות",
    aboutL2: "כושר הוליסטי ותוכניות יוגה",
    aboutL3: "בריאות נפשית ומיינדפולנס",
    aboutCta: "עלינו",
    servicesHeading: "שירותי הרווחה שלנו",
    serviceTitle1: "יוגה ומדיטציה",
    serviceDesc1:
      "מצא שקט פנימי ושפר גמישות עם מפגשי יוגה ומדיטציה מודרכים.",
    serviceTitle2: "תוכניות תזונה",
    serviceDesc2:
      "תוכניות תזונה מותאמות אישית על ידי מומחים לחיים בריאים יותר.",
    serviceTitle3: "אימון כושר",
    serviceDesc3:
      "השג כושר עם אימון מקצועי המותאם למטרותיך ויכולותיך.",
    latestArticles: "מאמרים אחרונים",
    latestArticlesDesc:
      "השאר מעורר השראה עם טיפים לרווחה, מדריכי תזונה ומיינדפולנס.",
    achievementsHeading: "ההישגים שלנו",
    ach1: "לקוחות מרוצים",
    ach2: "תוכניות רווחה",
    ach3: "מאמנים מומחים",
    ach4: "שנות שירות",
    contactHeading: "צרו קשר",
    contactDesc:
      "יש לך שאלות או זקוק להכוונה במסע שלך לרווחה? פנה אלינו היום.",
    contactCta: "צור קשר",
    blog1Title: "5 טיפים לחיים מודעים",
    blog1Desc: "טיפים מעשיים שיעזרו לך להישאר נוכח ולהפחית מתח יומיומי.",
    blog2Title: "מתכוני שייקים בריאים",
    blog2Desc:
      "נסה מתכוני שייקים קלים ומזינים לאנרגיה וחיוניות.",
    blog3Title: "כוחם של צעידות יומיומיות",
    blog3Desc:
      "למד כיצד הליכה של 30 דקות ביום יכולה לשנות את בריאותך.",
  },
};

const getLanguage = () => {
  if (typeof window === 'undefined') return 'en';
  return localStorage.getItem('language') || 'en';
};

const blogKeys = ['blog1', 'blog2', 'blog3'];

// Dummy blogs
const blogs = [
  {
    title: "5 Tips for Mindful Living",
    desc: "Practical tips to help you stay present and reduce stress daily.",
    img: image7,
  },
  {
    title: "Healthy Smoothie Recipes",
    desc: "Try these easy and nutritious smoothie recipes for energy and vitality.",
    img: image6,
  },
  {
    title: "The Power of Daily Walks",
    desc: "Learn how walking 30 minutes a day can transform your health.",
    img: image8,
  },
];
const achievements = [
  { label: "Happy Clients" },
  { label: "Wellness Programs" },
  { label: "Expert Coaches" },
  { label: "Years of Service" }
];

const counts = [500, 120, 45, 10]; 

const THEME_KEY = 'theme';

const Home1 = () => {
  const [language, setLanguage] = useState(getLanguage());
  // Theme state and effect (robust, cross-tab sync, SSR-safe)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(THEME_KEY) || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_KEY, theme);
      document.documentElement.setAttribute('data-theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      window.dispatchEvent(new Event('theme-changed'));
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleThemeChange = () => {
        const newTheme = localStorage.getItem(THEME_KEY) || 'light';
        setTheme(newTheme);
      };
      window.addEventListener('theme-changed', handleThemeChange);
      window.addEventListener('storage', handleThemeChange);
      return () => {
        window.removeEventListener('theme-changed', handleThemeChange);
        window.removeEventListener('storage', handleThemeChange);
      };
    }
  }, []);

  // Sync language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(getLanguage());
    };
    window.addEventListener('language-changed', handleLanguageChange);
    window.addEventListener('storage', handleLanguageChange);
    return () => {
      window.removeEventListener('language-changed', handleLanguageChange);
      window.removeEventListener('storage', handleLanguageChange);
    };
  }, []);

  const t = (key) => TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;

  const achievementLabels = [t('ach1'), t('ach2'), t('ach3'), t('ach4')];

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Helper for theme-based class
  const themedClass = (base, dark, light) =>
    `${base} ${theme === 'dark' ? dark : light}`;

  return (
    <div className={themedClass(
      "min-h-screen flex flex-col items-center justify-center transition-colors duration-500",
      "bg-gray-900 text-gray-100",
      "bg-white text-gray-900"
    )}>
      {/* Hero Section */}
      <section
  className={themedClass(
    "relative w-full h-screen flex items-center justify-center overflow-hidden",
    "bg-black",
    "bg-black"
  )}
>
  <video
    src={vedio}
    autoPlay
    loop
    muted
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
  />
  <div
    className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
    style={{ color: theme === "dark" ? "#fff" : "#fff" }}
  >
    <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fadeInDown">
      {t('heroTitle')}
    </h1>
    <p className="text-lg md:text-2xl mb-6 animate-fadeInUp">
      {t('heroSubtitle')}
    </p>
    <a
      href="/about"
      className={themedClass(
        "px-6 py-3 font-semibold rounded-lg shadow-lg transition duration-300 animate-fadeInUp",
        "bg-[#00bfff] text-white hover:bg-green-600",
        "bg-green-500 text-white hover:bg-green-600"
      )}
    >
      {t('heroCta')}
    </a>
  </div>
</section>


      {/* About Us Section */}

    <section
      className="w-full py-20 transition-colors duration-500 bg-gray-50 dark:bg-gray-900"
      id="about"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <div>
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            {t('aboutHeading')}
          </h2>

          <p className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">
            {t('aboutP1')}
          </p>

          <ul className="list-decimal list-inside mb-8 space-y-2 text-gray-700 dark:text-gray-400">
            <li>{t('aboutL1')}</li>
            <li>{t('aboutL2')}</li>
            <li>{t('aboutL3')}</li>
          </ul>

          <Link
            to="/about"
            className="px-6 py-3 rounded-lg shadow-md transition-all duration-300 bg-green-600 text-white hover:bg-green-700 inline-block"
          >
            {t('aboutCta')}
          </Link>
        </div>

        {/* Image Section */}
        <div className="flex flex-row gap-4 h-full items-center justify-center">
          <img
            src={image}
            alt="Wellness Activity 1"
            className="rounded-xl shadow-lg object-cover w-1/2 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            style={{ minWidth: 0, height: "400px" }}
          />
          <img
            src={image2}
            alt="Wellness Activity 2"
            className="rounded-xl shadow-lg object-cover w-1/2 transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            style={{ minWidth: 0, height: "400px" }}
          />
        </div>
      </div>
    </section>
  


      {/* Services Section */}
      <section
  className={themedClass(
    "w-full py-20 px-6 transition-colors duration-500",
    "bg-gradient-to-b from-gray-800 to-gray-900",
    "bg-gradient-to-b from-green-50 to-green-100"
  )}
>
  <h2
    className={themedClass(
      "text-4xl font-bold text-center mb-14",
      "text-white",
      "text-gray-900"
    )}
  >
    {t('servicesHeading')}
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full px-4 md:px-12">
    {[`🧘 ${t('serviceTitle1')}`, `🥗 ${t('serviceTitle2')}`, `🏋️ ${t('serviceTitle3')}`].map(
      (service, idx) => (
        <div
          key={idx}
          className={themedClass(
            "relative z-10 rounded-2xl shadow-lg p-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl",
            "bg-[#1E2A38]",
            "bg-white"
          )}
        >
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-3xl">
            {service.split(" ")[0]}
          </div>

          {/* Title */}
          <h3
            className={themedClass(
              "text-2xl font-semibold mb-3 text-center",
              "text-white",
              "text-gray-800"
            )}
          >
            {service.slice(2)}
          </h3>

          {/* Description */}
          <p
            className={themedClass(
              "text-center",
              "text-gray-300",
              "text-gray-600"
            )}
          >
            {idx === 0 && t('serviceDesc1')}
            {idx === 1 && t('serviceDesc2')}
            {idx === 2 && t('serviceDesc3')}
          </p>
        </div>
      )
    )}
  </div>
</section>


      {/* Blog Section */}
      <section className="py-20 transition-colors duration-500">
        <div className="text-center mb-14">
          <h2 className={themedClass(
            "text-4xl font-extrabold",
            "text-green-400",
            "text-green-700"
          )}>
            {t('latestArticles')}
          </h2>
          <p className={themedClass(
            "mt-3 max-w-2xl mx-auto",
            "text-gray-300",
            "text-gray-600"
          )}>
            {t('latestArticlesDesc')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className={themedClass(
                "group rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-3 transition-all duration-500",
                "bg-[#1E2A38]",
                "bg-white"
              )}
            >
              <div className="overflow-hidden">
                <img
                  src={blog.img}
                  alt={t(`${blogKeys[index]}Title`)}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6 text-left">
                <h3 className={themedClass(
                  "text-xl font-bold group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300",
                  "text-white",
                  "text-gray-800"
                )}>
                  {t(`${blogKeys[index]}Title`)}
                </h3>
                <p className={themedClass(
                  "mt-3",
                  "text-gray-300",
                  "text-gray-600"
                )}>
                  {t(`${blogKeys[index]}Desc`)}
                </p>
                
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements Section */}





      <section
  className={themedClass(
    "w-full py-28 px-6",
    "bg-[#22304a]",
    "bg-gradient-to-r from-green-100 to-green-50"
  )}
>
  {/* Heading */}
  <h2
    className={themedClass(
      "text-4xl font-extrabold text-center mb-16",
      "text-white",
      "text-green-800"
    )}
  >
    {t('achievementsHeading')}
  </h2>

  {/* Cards Grid */}
  <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-5 text-center">
    {achievements.map((item, i) => (
      <div
        key={i}
        className={themedClass(
          // 🔹 Card base + hover effects
          " w-48 h-48 rounded-full shadow-lg p-12 flex flex-col items-center justify-center transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:-translate-y-2",
          // Dark mode
          "bg-[#1E2A38] hover:bg-[#2a3b54]",
          // Light mode
          "bg-white hover:bg-gradient-to-b hover:from-green-50 hover:to-green-100"
        )}
      >
        {/* Count */}
        <h3
          className={themedClass(
            "text-5xl font-extrabold mb-3 tracking-wide transition-colors duration-300",
            "text-green-400 group-hover:text-green-300",
            "text-green-700 group-hover:text-green-800"
          )}
        >
          {counts[i]}+
        </h3>

        {/* Label */}
        <p
          className={themedClass(
            "text-lg font-medium transition-colors duration-300",
            "text-gray-300 group-hover:text-white",
            "text-gray-700 group-hover:text-green-900"
          )}
        >
          {achievementLabels[i]}
        </p>
      </div>
    ))}
  </div>
</section>


      {/* Contact Section */}
    <section
      className="relative w-full py-24 px-6 text-center overflow-hidden transition-colors duration-500"
      style={{
        backgroundImage: `url(${image9})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 text-left md:text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          {t('contactHeading')}
        </h2>

        <p className="mb-8 text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
          {t('contactDesc')}
        </p>

        {/* Contact Button */}
        <Link
          to="/contact"
          className="px-8 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 inline-block text-center bg-[green] hover:bg-green-600 text-white"
        >
          {t('contactCta')}
        </Link>
      </div>
    </section>
  



    </div>
  );
};

export default Home1;
