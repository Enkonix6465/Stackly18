import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import backgroudvedio from '../assets/Services.mp4';
import image from '../assets/PN.jpg';
import image2 from '../assets/MM.jpg';
import image3 from '../assets/SO.jpg';
import image4 from '../assets/SR.jpg';
import image5 from '../assets/HD.jpg';
import image6 from '../assets/WC.jpg';
import backgroundImage from '../assets/Mindful.jpg';

const THEME_KEY = 'theme';

// Translations and language helpers
const TRANSLATIONS = {
  en: {
    heroTitle: 'Our services',
    heroSubtitle: 'Discover our holistic approach to health and wellness',
    heroCta: 'Explore Blogs',
    Title:'Our services',
    service1Title: 'Personalized Nutrition',
    service1Desc: 'Tailored meal plans designed by certified nutritionists to meet your unique dietary needs.',
    service1Detail: 'Our nutrition plans are customized for your lifestyle, helping you achieve balanced energy, improved digestion, and overall vitality.',
    service1Btn: 'Learn More',
    service2Title: 'Mindful Movement',
    service2Desc: 'Gentle yoga and meditation classes to connect mind and body for holistic wellbeing.',
    service2Detail: 'Mindful movement sessions enhance flexibility, reduce stress, and strengthen the mind-body connection for holistic wellness.',
    service2Btn: 'View Schedule',
    service3Title: 'Sleep Optimization',
    service3Desc: 'Science-backed techniques to improve sleep quality and establish healthy circadian rhythms.',
    service3Detail: 'Sleep optimization programs guide you to establish restorative nightly routines, improving energy, focus, and overall health.',
    service3Btn: 'Rest Better',
    service4Title: 'Stress Resilience',
    service4Desc: 'Evidence-based programs to build emotional resilience and manage stress effectively.',
    service4Detail: 'Stress resilience programs teach techniques to manage daily pressures and maintain emotional balance, supporting mental wellbeing.',
    service4Btn: 'Find Balance',
    service5Title: 'Holistic Detox',
    service5Desc: 'Gentle, comprehensive detox programs to cleanse your body and renew your energy.',
    service5Detail: 'Holistic detox gently cleanses your body, supports liver function, boosts immunity, and increases energy levels naturally.',
    service5Btn: 'Cleanse Now',
    service6Title: 'Wellness Coaching',
    service6Desc: 'One-on-one guidance to help you achieve sustainable lifestyle changes and personal growth.',
    service6Detail: 'Wellness coaching provides personalized guidance for sustainable lifestyle changes, goal setting, and personal growth.',
    service6Btn: 'Get Started',
    ctaHeading: 'Ready to Transform Your Health?',
    ctaBody: 'Your journey towards a healthier, happier life begins here. Our wellness programs are tailored to your lifestyle, combining nutrition guidance, fitness coaching, and mindfulness practices to create a holistic path to wellbeing. With our team of experienced professionals, every step you take is supported, motivated, and guided so you can achieve sustainable results. Embrace a balanced approach to your health, unlock your potential, and experience the transformation that comes with taking care of your body, mind, and soul.',
    ctaBtn1: 'View Blogs',
    ctaBtn2: 'Book Consultation',
    successHeading: 'Success Stories',
    successBody: 'Our clients have achieved amazing results and transformed their lives. These stories reflect their commitment, determination, and the guidance of our wellness programs.',
    success1Title: 'Improved Fitness',
    success1Desc: 'Clients have gained strength, stamina, and confidence through personalized training programs.',
    success2Title: 'Mindful Lifestyle',
    success2Desc: 'Individuals have incorporated mindfulness and stress management techniques into their daily routine.',
    success3Title: 'Better Nutrition',
    success3Desc: 'Clients report healthier eating habits and improved energy levels thanks to tailored nutrition plans.',
    tipsHeading: 'Wellness Tips for a Healthier You',
    tip1Title: 'Eat Balanced',
    tip1Desc: 'Focus on whole foods, fruits, and vegetables for optimal energy and vitality throughout your day. Avoid processed foods and sugary drinks for better health.',
    tip2Title: 'Sleep Well',
    tip2Desc: 'Maintain a regular sleep schedule, reduce screen time before bed, and create a calming nighttime routine. Quality sleep helps your body recover and rejuvenate.',
    tip3Title: 'Stay Active',
    tip3Desc: 'Incorporate movement into your daily routine—walk, stretch, or exercise regularly to keep your body agile and strong. Even 30 minutes a day makes a difference.',
    workshopHeading: 'Join Our Interactive Workshops',
    workshopBody: 'Participate in our engaging wellness workshops designed to provide practical skills and strategies for a healthier, happier lifestyle. Each session is crafted to empower you with knowledge and hands-on techniques you can apply every day.',
    workshopBtn: 'Register Now',
  },
  ar: {
    heroTitle: 'أعد تنشيط عافيتك',
    heroSubtitle: 'اكتشف نهجنا الشامل للصحة والعافية',
    heroCta: 'استكشف المدونات',
     Title:'خدماتنا',
    service1Title: 'تغذية شخصية',
    service1Desc: 'خطط وجبات مصممة خصيصًا من قبل أخصائيي تغذية لتلبية احتياجاتك.',
    service1Detail: 'خطط التغذية لدينا مخصصة لأسلوب حياتك، وتساعدك على تحقيق طاقة متوازنة وتحسين الهضم والحيوية.',
    service1Btn: 'اعرف المزيد',
    service2Title: 'حركة واعية',
    service2Desc: 'يوجا وتأمل لطيفان لربط العقل بالجسم من أجل عافية شاملة.',
    service2Detail: 'جلسات الحركة الواعية تعزز المرونة وتقلل التوتر وتقوي اتصال العقل بالجسم.',
    service2Btn: 'عرض الجداول',
    service3Title: 'تحسين النوم',
    service3Desc: 'تقنيات مدعومة علميًا لتحسين جودة النوم وضبط الإيقاع اليومي.',
    service3Detail: 'برامج تحسين النوم ترشدك إلى روتين ليلي مرمم، مما يحسن الطاقة والتركيز والصحة العامة.',
    service3Btn: 'نم أفضل',
    service4Title: 'المرونة أمام التوتر',
    service4Desc: 'برامج قائمة على الأدلة لبناء المرونة العاطفية وإدارة التوتر بفعالية.',
    service4Detail: 'تعلّم برامج المرونة أمام التوتر تقنيات لإدارة ضغوط الحياة اليومية والحفاظ على التوازن العاطفي.',
    service4Btn: 'اعثر على توازن',
    service5Title: 'إزالة سموم شاملة',
    service5Desc: 'برامج تنظيف لطيفة وشاملة لتطهير الجسم وتجديد الطاقة.',
    service5Detail: 'يزيل التنظيف الشامل السموم بلطف، ويدعم الكبد، ويعزز المناعة، ويرفع مستويات الطاقة طبيعيًا.',
    service5Btn: 'ابدأ التنقية',
    service6Title: 'تدريب على العافية',
    service6Desc: 'إرشاد فردي لمساعدتك على تحقيق تغييرات نمط حياة مستدامة ونمو شخصي.',
    service6Detail: 'يوفر تدريب العافية إرشادًا شخصيًا لتغييرات نمط حياة مستدامة وتحديد الأهداف والنمو الشخصي.',
    service6Btn: 'ابدأ الآن',
    ctaHeading: 'هل أنت مستعد لتحويل صحتك؟',
    ctaBody: 'تبدأ رحلتك نحو حياة أكثر صحة وسعادة من هنا...',
    ctaBtn1: 'عرض المدونات',
    ctaBtn2: 'احجز استشارة',
    successHeading: 'قصص نجاح',
    successBody: 'حقق عملاؤنا نتائج مذهلة وغيروا حياتهم...',
    success1Title: 'لياقة محسّنة',
    success1Desc: 'اكتسب العملاء قوة وقدرة وثقة عبر برامج مخصصة.',
    success2Title: 'أسلوب حياة يقظ',
    success2Desc: 'أدمج الأفراد اليقظة وإدارة التوتر في روتينهم اليومي.',
    success3Title: 'تغذية أفضل',
    success3Desc: 'يبلغ العملاء عن عادات أكل صحية وطاقة محسنة.',
    tipsHeading: 'نصائح للعافية من أجلك',
    tip1Title: 'تناول بتوازن',
    tip1Desc: 'ركز على الأطعمة الكاملة والفواكه والخضروات للحصول على طاقة...',
    tip2Title: 'نم جيدًا',
    tip2Desc: 'حافظ على جدول نوم منتظم وقلل الشاشات قبل النوم...',
    tip3Title: 'ابق نشطًا',
    tip3Desc: 'ادمج الحركة في روتينك اليومي — حتى 30 دقيقة تحدث فرقًا.',
    workshopHeading: 'انضم إلى ورش العمل التفاعلية لدينا',
    workshopBody: 'شارك في ورش عافية شيّقة تمنحك مهارات واستراتيجيات عملية...',
    workshopBtn: 'سجّل الآن',
  },
  he: {
    heroTitle: 'רענן את איכות החיים שלך',
    heroSubtitle: 'גלה את הגישה ההוליסטית שלנו לבריאות ורווחה',
    heroCta: 'גלה בלוגים',
     Title:'השירותים שלנו',
    service1Title: 'תזונה מותאמת אישית',
    service1Desc: 'תוכניות ארוחות מותאמות אישית על ידי תזונאים מוסמכים.',
    service1Detail: 'התוכניות שלנו מותאמות לאורח חייך, מאזנות אנרגיה ומשפרות עיכול וחיוניות.',
    service1Btn: 'למד עוד',
    service2Title: 'תנועה מודעת',
    service2Desc: 'יוגה ומדיטציה עדינות לחיבור גוף-נפש.',
    service2Detail: 'מפגשי תנועה מודעת משפרים גמישות, מפחיתים סטרס ומחזקים חיבור גוף-נפש.',
    service2Btn: 'צפה בלוח זמנים',
    service3Title: 'אופטימיזציית שינה',
    service3Desc: 'טכניקות מבוססות-מדע לשיפור איכות השינה והקצבים הצירקדיים.',
    service3Detail: 'תוכניות שינה מדריכות לשגרות לילה משקמות...',
    service3Btn: 'לישון טוב יותר',
    service4Title: 'חוסן מול סטרס',
    service4Desc: 'תוכניות מבוססות ראיות לבניית חוסן רגשי וניהול סטרס.',
    service4Detail: 'התוכניות מלמדות טכניקות לניהול לחצים ושמירה על איזון רגשי.',
    service4Btn: 'מצא איזון',
    service5Title: 'ניקוי רעלים הוליסטי',
    service5Desc: 'תוכניות ניקוי עדינות ומקיפות לטיהור הגוף וחידוש אנרגיה.',
    service5Detail: 'ניקוי הוליסטי מטהר בעדינות, תומך בכבד ומגביר אנרגיה באופן טבעי.',
    service5Btn: 'התחל ניקוי',
    service6Title: 'אימון לרווחה',
    service6Desc: 'ליווי אישי לשינויים בני-קיימא באורח החיים וצמיחה אישית.',
    service6Detail: 'אימון רווחה מספק ליווי מותאם לשינויים מתמשכים, יעדים וצמיחה.',
    service6Btn: 'התחל',
    ctaHeading: 'מוכנים לשנות את הבריאות שלכם?',
    ctaBody: 'המסע לחיים בריאים ומאושרים מתחיל כאן...',
    ctaBtn1: 'צפה בבלוגים',
    ctaBtn2: 'קבע ייעוץ',
    successHeading: 'סיפורי הצלחה',
    successBody: 'לקוחותינו השיגו תוצאות מדהימות ושינו את חייהם...',
    success1Title: 'כושר משופר',
    success1Desc: 'לקוחות צברו כוח, סבולת וביטחון באמצעות אימונים מותאמים.',
    success2Title: 'אורח חיים מודע',
    success2Desc: 'אנשים שילבו מיינדפולנס וניהול סטרס בשגרה היומית.',
    success3Title: 'תזונה טובה יותר',
    success3Desc: 'לקוחות מדווחים על הרגלי אכילה בריאים ועלייה באנרגיה.',
    tipsHeading: 'טיפים לרווחה לחיים בריאים יותר',
    tip1Title: 'לאכול מאוזן',
    tip1Desc: 'התמקדו במזון מלא, פירות וירקות לאנרגיה וחיוניות...',
    tip2Title: 'לישון טוב',
    tip2Desc: 'שמרו על שגרה קבועה והפחיתו זמן מסך לפני השינה...',
    tip3Title: 'להישאר פעילים',
    tip3Desc: 'שלבו תנועה ביומיום — אפילו 30 דק׳ עושות הבדל.',
    workshopHeading: 'הצטרפו לסדנאות האינטראקטיביות שלנו',
    workshopBody: 'השתתפו בסדנאות מעניינות שמעניקות מיומנויות ואסטרטגיות מעשיות...',
    workshopBtn: 'הירשם עכשיו',
  },
};

const getLanguage = () => {
  if (typeof window === 'undefined') return 'en';
  return localStorage.getItem('language') || 'en';
};

const ServicesPage = () => {
  const [language, setLanguage] = useState(getLanguage());
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(THEME_KEY) || 'light';
    }
    return 'light';
  });

  // Consistent CTA button classes
  const ctaButtonClass = "px-8 py-3 md:py-4 md:px-10 font-semibold rounded-full shadow-lg transition duration-300 transform bg-green-500 text-white hover:bg-green-600 hover:scale-110 inline-block text-center";
  const ctaButtonOutlineClass = "px-8 py-3 md:py-4 md:px-10 font-semibold rounded-full shadow-lg transition duration-300 transform border-2 border-green-500 text-green-500 bg-transparent hover:bg-green-50 hover:text-green-700 hover:scale-110 inline-block text-center";

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

  const themedClass = (base, dark, light) =>
    `${base} ${theme === 'dark' ? dark : light}`;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      title: t('service1Title'),
      description: t('service1Desc'),
      icon: image,
      bgColor: themedClass("","bg-[#1E2A38]","bg-white"),
      buttonText: t('service1Btn')
    },
    {
      title: t('service2Title'),
      description: t('service2Desc'),
      icon: image2,
      bgColor: themedClass("","bg-[#22304a]","bg-green-50"),
      buttonText: t('service2Btn')
    },
    {
      title: t('service3Title'),
      description: t('service3Desc'),
      icon:  image3,
      bgColor: themedClass("","bg-[#1E2A38]","bg-white"),
      buttonText: t('service3Btn')
    },
    {
      title: t('service4Title'),
      description: t('service4Desc'),
      icon: image4,
      bgColor: themedClass("","bg-[#22304a]","bg-green-50"),
      buttonText: t('service4Btn')
    },
    {
      title: t('service5Title'),
      description: t('service5Desc'),
      icon: image5,
      bgColor: themedClass("","bg-[#1E2A38]","bg-white"),
      buttonText: t('service5Btn')
    },
    {
      title: t('service6Title'),
      description: t('service6Desc'),
      icon: image6,
      bgColor: themedClass("","bg-[#22304a]","bg-green-50"),
      buttonText: t('service6Btn')
    }
  ];

  return (
    <div className={themedClass(
      "overflow-hidden min-h-screen transition-colors duration-500",
      "bg-gray-900 text-gray-100",
      "bg-white text-gray-800"
    )}>
      {/* Hero Section */}
      <section className="w-full h-screen relative flex items-center justify-center text-white overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={backgroudvedio} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative text-center px-4 z-10"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            {t('heroTitle')}
          </h2>
          <p className="text-xl md:text-2xl mb-8">
            {t('heroSubtitle')}
          </p>
          <motion.a
            href="/blog"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={ctaButtonClass}
          >
            {t('heroCta')}
          </motion.a>
        </motion.div>
      </section>

      {/* Services Grid */}
      <div className="w-full overflow-hidden">
        <div className="text-center my-12">
          <motion.h2
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            dir={["ar", "he"].includes(language) ? "rtl" : "ltr"}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-wide drop-shadow-lg"
          >
            <span className="relative inline-block">
              <motion.span
                className="absolute -inset-1 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 blur-lg opacity-30 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <span className="relative">{t("Title")}</span>
            </span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full mx-auto mt-4"
          />
        </div>
        {services.map((service, index) => (
          <motion.section
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`${service.bgColor} py-20 px-4 sm:px-6 lg:px-12 w-full`}
            dir={["ar", "he"].includes(language) ? "rtl" : "ltr"}
          >
            <div
              className={`max-w-7xl mx-auto flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-10 md:gap-20`}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-44 h-44 md:w-52 md:h-52 rounded-xl overflow-hidden mb-8 md:mb-0 shadow-lg"
              >
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="flex-1">
                <h2
                  className={themedClass(
                    "text-3xl md:text-4xl font-bold mb-4 text-green-700 bg-clip-text drop-shadow-lg",
                    "text-white",
                    "text-green-800"
                  )}
                >
                  {service.title}
                </h2>
                <p
                  className={themedClass(
                    "text-lg mb-6 text-justify",
                    "text-gray-200",
                    "text-gray-700"
                  )}
                >
                  {service.description}
                </p>
                <p
                  className={themedClass(
                    "mb-6 text-justify",
                    "text-gray-300",
                    "text-gray-600"
                  )}
                >
                  {index === 0 && t("service1Detail")}
                  {index === 1 && t("service2Detail")}
                  {index === 2 && t("service3Detail")}
                  {index === 3 && t("service4Detail")}
                  {index === 4 && t("service5Detail")}
                  {index === 5 && t("service6Detail")}
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/nutrition"
                    className={ctaButtonClass}
                  >
                    {service.buttonText}
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={themedClass(
          "relative py-32 px-6 lg:px-20 overflow-hidden rounded-3xl shadow-lg",
          "bg-gradient-to-b from-[#1E2A38] to-[#22304a]",
          "bg-gradient-to-b from-green-100 to-green-200"
        )}
      >
        <div className={themedClass(
          "absolute top-10 left-10 w-32 h-32 rounded-full opacity-20 animate-pulse",
          "bg-green-700",
          "bg-green-300"
        )}></div>
        <div className={themedClass(
          "absolute bottom-20 right-10 w-48 h-48 rounded-full opacity-25 animate-pulse",
          "bg-green-800",
          "bg-green-400"
        )}></div>
        <div className={themedClass(
          "absolute top-1/3 right-1/4 w-24 h-24 rounded-full opacity-15 animate-pulse",
          "bg-green-600",
          "bg-green-200"
        )}></div>
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <h2 className={themedClass(
            "text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-md",
            "text-green-200",
            "text-green-800"
          )}>
            {t('ctaHeading')}
          </h2>
          <p className={themedClass(
            "text-md md:text-lg mb-10 leading-relaxed text-justify",
            "text-green-100",
            "text-green-900"
          )}>
            {t('ctaBody')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-6">
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0,0,0,0.15)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/blog"
                className={ctaButtonClass}
              >
                {t('ctaBtn1')}
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0,0,0,0.15)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className={ctaButtonOutlineClass}
              >
                {t('ctaBtn2')}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Success Stories */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={themedClass(
          "w-full py-24 px-6 text-center",
          "bg-[#1E2A38] text-green-200",
          "bg-green-50 text-green-900"
        )}
      >
        <h2 className={themedClass(
          "text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-sm",
          "text-green-200",
          "text-green-800"
        )}>
          {t('successHeading')}
        </h2>
        <p className={themedClass(
          "max-w-4xl mx-auto text-lg md:text-xl mb-12 leading-relaxed",
          "text-green-100",
          "text-green-900"
        )}>
          {t('successBody')}
        </p>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-10 max-w-full">
          {[
            {
              icon: "💪",
              title: t('success1Title'),
              desc: t('success1Desc')
            },
            {
              icon: "🧘",
              title: t('success2Title'),
              desc: t('success2Desc')
            },
            {
              icon: "🌱",
              title: t('success3Title'),
              desc: t('success3Desc')
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
              className={themedClass(
                "relative bg-gradient-to-br rounded-2xl shadow-md overflow-hidden p-8 transition-all",
                "from-[#22304a] to-[#1E2A38]",
                "from-green-100 to-green-200"
              )}
            >
              <div className={themedClass(
                "absolute top-0 left-0 w-full h-2",
                "bg-green-400",
                "bg-green-600"
              )}></div>
              <div className={themedClass(
                "flex items-center justify-center w-20 h-20 rounded-full text-4xl mb-6 mx-auto shadow-md",
                "bg-green-700 text-white",
                "bg-green-600 text-white"
              )}>
                {item.icon}
              </div>
              <h3 className={themedClass(
                "text-2xl font-bold mb-3",
                "text-green-200",
                "text-green-800"
              )}>{item.title}</h3>
              <p className={themedClass(
                "text-base md:text-lg leading-relaxed",
                "text-green-100",
                "text-green-900"
              )}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Wellness Tips */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={themedClass(
          "w-full py-24 px-6",
          "bg-[#22304a]",
          "bg-green-50"
        )}
      >
        <h2 className={themedClass(
          "text-4xl md:text-5xl font-extrabold mb-16 drop-shadow-sm text-center",
          "text-green-200",
          "text-green-700"
        )}>
          {t('tipsHeading')}
        </h2>
        <div className="max-w-6xl mx-auto flex flex-col gap-16">
          {[
            {
              icon: "🥗",
              title: t('tip1Title'),
              desc: t('tip1Desc')
            },
            {
              icon: "💤",
              title: t('tip2Title'),
              desc: t('tip2Desc')
            },
            {
              icon: "🏃‍♂️",
              title: t('tip3Title'),
              desc: t('tip3Desc')
            }
          ].map((tip, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.3 }}
              className="flex flex-col md:flex-row items-start gap-8 md:gap-12 w-full"
            >
              <div className={themedClass(
                "flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-full text-4xl md:text-6xl flex items-center justify-center shadow-lg",
                "bg-green-700 text-white",
                "bg-green-700 text-white"
              )}>
                {tip.icon}
              </div>
              <div className="text-left flex-1">
                <h3 className={themedClass(
                  "text-2xl md:text-3xl font-bold mb-3",
                  "text-green-200",
                  "text-green-800"
                )}>{tip.title}</h3>
                <p className={themedClass(
                  "text-lg md:text-xl leading-relaxed",
                  "text-green-100",
                  "text-green-900"
                )}>
                  {tip.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Book a Workshop */}
      <motion.section
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className={themedClass(
          "relative py-32 px-4 sm:px-6 lg:px-8 text-center",
          "text-white",
          "text-white-900"
        )}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-green-900 bg-opacity-50"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2
            className={themedClass(
              "text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg",
              "text-white",
              "text-white-900"
            )}
          >
            {t("workshopHeading")}
          </h2>
          <p
            className={themedClass(
              "text-lg md:text-xl mb-8 drop-shadow-md",
              "text-green-100",
              "text-green-900"
            )}
          >
            {t("Join us for an engaging workshop experience.", language)}
          </p>
          <motion.a
            href="/contact"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(255,255,255,0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className={ctaButtonClass}
          >
            {t("workshopBtn")}
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
};

export default ServicesPage;

