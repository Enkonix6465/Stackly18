import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

import vedio from "../assets/home1.mp4";
import image from "../assets/1.jpg";
import image2 from "../assets/5.jpg";
import image6 from "../assets/health.jpg";
import image7 from "../assets/Mindful.jpg";
import image8 from "../assets/walk.jpg";
import image9 from "../assets/B2.jpg";

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
  { count: 500, label: "Happy Clients" },
  { count: 120, label: "Wellness Programs" },
  { count: 45, label: "Expert Coaches" },
  { count: 10, label: "Years of Service" },
];
const counts = [500, 120, 45, 10]; 
const THEME_KEY = 'theme';

const Home1 = () => {
  const [language, setLanguage] = useState(getLanguage());
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(THEME_KEY) || 'light';
    }
    return 'light';
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.6 });

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
  const themedClass = (base, dark, light) =>
    `${base} ${theme === 'dark' ? dark : light}`;

  return (
    <div className={themedClass(
      "min-h-screen flex flex-col items-center justify-center transition-colors duration-500",
      "bg-gray-900 text-gray-100",
      "bg-white text-gray-900"
    )}>
      {/* Hero Section */}
      <section ref={ref} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
        <video
          src={vedio}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute w-72 h-72 bg-green-400/20 rounded-full blur-3xl top-10 left-20 animate-pulse-slow"></div>
        <div className="absolute w-60 h-60 bg-emerald-400/20 rounded-full blur-3xl bottom-20 right-28 animate-float"></div>
        <div className="absolute w-44 h-44 bg-lime-400/20 rounded-full blur-2xl top-1/3 right-1/4 animate-float-delayed"></div>
        <div className="absolute inset-0 overflow-hidden z-0">
          {[...Array(15)].map((_, i) => (
            <span
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></span>
          ))}
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 text-white">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-green-400 via-emerald-500 to-lime-400 bg-clip-text text-transparent animate-shimmer"
          >
            {t("heroTitle")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg md:text-2xl mb-6 text-gray-200"
          >
            {t("heroSubtitle")}
          </motion.p>
          <motion.a
            href="/about"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="px-8 py-3 font-semibold rounded-full shadow-lg transition duration-300 transform bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-110 hover:shadow-[0_0_20px_rgba(34,197,94,0.7)]"
          >
            {t("heroCta")}
          </motion.a>
        </div>
      </section>

      {/* About Us Section */}

    <section className={themedClass(
        "py-20 transition-colors duration-500",
        "bg-gray-900 text-gray-100",
        "bg-gray-50 text-gray-900"
      )}>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">{t("aboutHeading")}</h2>
            <p className="mb-6">{t("aboutP1")}</p>
            <ul className="list-decimal list-inside mb-8 space-y-2">
              <li>{t("aboutL1")}</li>
              <li>{t("aboutL2")}</li>
              <li>{t("aboutL3")}</li>
            </ul>
            <Link to="/about" className="px-6 py-3 bg-green-600 text-white rounded shadow">
              {t("aboutCta")}
            </Link>
          </div>
          <div className="flex gap-4">
            <img src={image} className="rounded shadow-lg w-1/2 object-cover h-96" />
            <img src={image2} className="rounded shadow-lg w-1/2 object-cover h-96" />
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
  {/* Section Heading with entrance animation */}
  <motion.h2
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true }}
    className={themedClass(
      "text-4xl font-bold text-center mb-14",
      "text-white",
      "text-gray-900"
    )}
  >
    {t('servicesHeading')}
  </motion.h2>

  {/* Services Grid */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full px-4 md:px-12">
    {[`🧘 ${t('serviceTitle1')}`, `🥗 ${t('serviceTitle2')}`, `🏋️ ${t('serviceTitle3')}`].map(
      (service, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.2 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
          className={themedClass(
            "relative z-10 rounded-2xl shadow-lg p-8 transform transition duration-500",
            "bg-[#1E2A38] hover:shadow-2xl",
            "bg-white hover:shadow-2xl"
          )}
        >
          {/* Icon with hover bounce */}
          <motion.div
            className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-3xl"
            whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {service.split(" ")[0]}
          </motion.div>

          {/* Title */}
          <motion.h3
            className={themedClass(
              "text-2xl font-semibold mb-3 text-center",
              "text-white",
              "text-gray-800"
            )}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 250 }}
          >
            {service.slice(2)}
          </motion.h3>

          {/* Description */}
          <motion.p
            className={themedClass(
              "text-center",
              "text-gray-300",
              "text-gray-600"
            )}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: idx * 0.3 }}
          >
            {idx === 0 && t('serviceDesc1')}
            {idx === 1 && t('serviceDesc2')}
            {idx === 2 && t('serviceDesc3')}
          </motion.p>
        </motion.div>
      )
    )}
  </div>
</section>

      {/* Blog Section */}
      <section className="py-20 transition-colors duration-500">
  {/* Section Heading */}
  <div className="text-center mb-14">
    <motion.h2
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className={themedClass(
        "text-4xl font-extrabold",
        "text-green-400",
        "text-green-700"
      )}
    >
      {t('latestArticles')}
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className={themedClass(
        "mt-3 max-w-2xl mx-auto",
        "text-gray-300",
        "text-gray-600"
      )}
    >
      {t('latestArticlesDesc')}
    </motion.p>
  </div>

  {/* Blog Grid */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
    {blogs.map((blog, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        whileHover={{ scale: 1.05, rotate: [0, 1, -1, 0], boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
        className={themedClass(
          "group rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500",
          "bg-[#1E2A38]",
          "bg-white"
        )}
      >
        {/* Image */}
        <div className="overflow-hidden">
          <motion.img
            src={blog.img}
            alt={t(`${blogKeys[index]}Title`)}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
            whileHover={{ scale: 1.1 }}
          />
        </div>

        {/* Content */}
        <div className="p-6 text-left">
          <motion.h3
            className={themedClass(
              "text-xl font-bold group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300",
              "text-white",
              "text-gray-800"
            )}
            whileHover={{ scale: 1.03 }}
          >
            {t(`${blogKeys[index]}Title`)}
          </motion.h3>
          <motion.p
            className={themedClass(
              "mt-3",
              "text-gray-300",
              "text-gray-600"
            )}
          >
            {t(`${blogKeys[index]}Desc`)}
          </motion.p>
        </div>
      </motion.div>
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
  <motion.h2
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true }}
    className={themedClass(
      "text-4xl font-extrabold text-center mb-16",
      "text-white",
      "text-green-800"
    )}
  >
    {t('achievementsHeading')}
  </motion.h2>

  {/* Cards Grid */}
  <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-5 text-center">
    {achievements.map((item, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 30, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: i * 0.2 }}
        whileHover={{
          scale: 1.1,
          rotate: [0, 2, -2, 0],
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        }}
        className={themedClass(
          "w-48 h-48 rounded-full shadow-lg p-12 flex flex-col items-center justify-center transition-all duration-500 transform",
          "bg-[#1E2A38] hover:bg-[#2a3b54]",
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
          <CountUp end={counts[i]} duration={2} suffix="+" />
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
      </motion.div>
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
