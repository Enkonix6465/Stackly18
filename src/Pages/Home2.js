import React, { useEffect, useState } from "react";
import backgroundImage from "../assets/YM.jpg"; 
import backgroundImage2 from "../assets/1.jpg";
import backgroundImage3 from "../assets/health.jpg";
import backgroundImage4 from "../assets/FC.jpg";
import backgroundImage5 from "../assets/HD.jpg";
import backgroundImage6 from "../assets/SL.jpg";
import vedio from "../assets/Home22.mp4";
import { Link } from "react-router-dom";

import image7 from "../assets/wa.jpg";

// Translations and language helpers
const TRANSLATIONS = {
  en: {
    heroTitle: "Welcome to Health & Wellness",
    heroSubtitle: "Your journey to a healthier lifestyle starts here",
    heroCta: "Know More",
    servicesHeading: "Our Wellness Services",
    serviceTitle1: "Yoga & Meditation",
    serviceDesc1: "Find inner peace and flexibility with guided yoga sessions.",
    serviceTitle2: "Nutrition Plans",
    serviceDesc2: "Personalized diets designed by expert nutritionists.",
    serviceTitle3: "Mental Health Support",
    serviceDesc3: "Support and tools to improve mindfulness and emotional well-being.",
    serviceTitle4: "Fitness Coaching",
    serviceDesc4: "Custom workouts to strengthen your body and mind.",
    serviceTitle5: "Detox Programs",
    serviceDesc5: "Cleanse your body and boost energy levels.",
    serviceTitle6: "Stress Relief",
    serviceDesc6: "Relaxation techniques and mindfulness practices.",
    aboutHeading: "Who We Are",
    aboutParagraph:
      "We are a passionate wellness team dedicated to helping you achieve balance in body, mind, and spirit. Our holistic approach combines science, nutrition, fitness, and mindfulness to empower you to live a healthier, more vibrant life. Each program is personalized to guide you toward sustainable habits and lasting well-being. With expert guidance and ongoing support, we ensure you stay motivated at every step. Together, let’s create a lifestyle that nurtures your health and happiness for years to come.",
    testimonialsHeading: "What Our Clients Say About Us",
    blogHeading: "Latest from Our Blog",
    blogCard1: "Mindful Living",
    blogCard2: "Healthy Recipes",
    blogCard3: "Workout Tips",
    blogCardDesc: "Helpful insights to keep you inspired and motivated every day.",
    contactHeading: "Ready to Start Your Journey?",
    contactDesc:
      "Have questions or need guidance on your wellness journey? Reach out to us today.",
    contactCta: "Contact Us",
    ach1: "Happy Clients",
    ach2: "Wellness Programs",
    ach3: "Expert Trainers",
    ach4: "Years of Experience",
    name1: "Sarah Johnson",
    name2: "Michael Lee",
    name3: "Emma Davis",
    position1: "Fitness Enthusiast",
    position2: "Entrepreneur",
    position3: "Teacher",
    testimonial1: "The wellness programs transformed my lifestyle. I feel more energetic, focused, and happy than ever!",
    testimonial2: "The team is amazing! Their personalized guidance helped me manage stress and improve my health holistically.",
    testimonial3: "I highly recommend their services. The mindfulness and nutrition plans made a huge difference in my daily life.",
  },
  ar: {
    heroTitle: "مرحبًا بكم في الصحة والعافية",
    heroSubtitle: "رحلتك نحو نمط حياة أكثر صحة تبدأ من هنا",
    heroCta: "اعرف المزيد",
    servicesHeading: "خدمات العافية لدينا",
    serviceTitle1: "يوجا وتأمل",
    serviceDesc1: "ابحث عن السلام الداخلي ومرونة أفضل مع جلسات يوجا موجهة.",
    serviceTitle2: "خطط تغذية",
    serviceDesc2: "أنظمة غذائية شخصية يصممها خبراء تغذية.",
    serviceTitle3: "دعم الصحة النفسية",
    serviceDesc3: "دعم وأدوات لتحسين اليقظة والرفاه العاطفي.",
    serviceTitle4: "تدريب لياقة",
    serviceDesc4: "تمارين مخصصة لتقوية الجسم والعقل.",
    serviceTitle5: "برامج إزالة السموم",
    serviceDesc5: "نقِّ جسمك وعزِّز مستويات الطاقة.",
    serviceTitle6: "تخفيف التوتر",
    serviceDesc6: "تقنيات استرخاء وممارسات يقظة ذهنية.",
    aboutHeading: "من نحن",
    aboutParagraph:
      "نحن فريق عافية شغوف مكرس لمساعدتك على تحقيق التوازن في الجسد والعقل والروح. نهجنا الشامل يجمع بين العلم والتغذية واللياقة واليقظة لتمكينك من عيش حياة أكثر صحة وحيوية. كل برنامج شخصي يوجّهك نحو عادات مستدامة ورفاه دائم. مع إرشاد الخبراء والدعم المستمر، نضمن لك البقاء متحمسًا في كل خطوة. معًا، لنصنع أسلوب حياة يغذي صحتك وسعادتك لسنوات.",
    testimonialsHeading: "ماذا يقول عملاؤنا عنا",
    blogHeading: "آخر المستجدات في مدونتنا",
    blogCard1: "حياة يقِظة",
    blogCard2: "وصفات صحية",
    blogCard3: "نصائح للتمارين",
    blogCardDesc: "رؤى مفيدة تُبقيك مُلهَمًا ومتحمسًا كل يوم.",
    contactHeading: "هل أنت مستعد لبدء رحلتك؟",
    contactDesc:
      "هل لديك أسئلة أو تحتاج إلى توجيه في رحلتك نحو العافية؟ تواصل معنا اليوم.",
    contactCta: "اتصل بنا",
    ach1: "عملاء سعداء",
    ach2: "برامج عافية",
    ach3: "مدربون خبراء",
    ach4: "سنوات خبرة",
    name1: "سارة جونسون",
    name2: "مايكل لي",
    name3: "إيما ديفيس",
    position1: "محبة للياقة",
    position2: "رائد أعمال",
    position3: "معلمة",
    testimonial1: "برامج العافية غيرت أسلوبي في الحياة. أشعر بطاقة وتركيز وسعادة أكبر من أي وقت مضى!",
    testimonial2: "الفريق رائع! إرشادهم المخصص ساعدني على إدارة التوتر وتحسين صحتي بشكل شامل.",
    testimonial3: "أنصح بخدماتهم بشدة. اليقظة الذهنية وخطط التغذية أحدثت فرقًا كبيرًا في حياتي اليومية.",
  },
  he: {
    heroTitle: "ברוכים הבאים לבריאות ואיכות חיים",
    heroSubtitle: "המסע לאורח חיים בריא יותר מתחיל כאן",
    heroCta: "למד עוד",
    servicesHeading: "שירותי הרווחה שלנו",
    serviceTitle1: "יוגה ומדיטציה",
    serviceDesc1: "מצא שקט פנימי וגמישות עם מפגשי יוגה מודרכים.",
    serviceTitle2: "תוכניות תזונה",
    serviceDesc2: "דיאטות מותאמות אישית שנבנו על ידי מומחים.",
    serviceTitle3: "תמיכה בבריאות הנפש",
    serviceDesc3: "תמיכה וכלים לשיפור מיינדפולנס ורווחה רגשית.",
    serviceTitle4: "אימון כושר",
    serviceDesc4: "אימונים מותאמים אישית לחיזוק הגוף והנפש.",
    serviceTitle5: "תוכניות ניקוי רעלים",
    serviceDesc5: "נקה את הגוף והגבר את רמות האנרגיה.",
    serviceTitle6: "הפחתת סטרס",
    serviceDesc6: "טכניקות הרפיה ומיינדפולנס.",
    aboutHeading: "מי אנחנו",
    aboutParagraph:
      "אנחנו צוות רווחה נלהב המסור לסייע לך להגיע לאיזון גוף, נפש ורוח. הגישה ההוליסטית שלנו משלבת מדע, תזונה, כושר ומיינדפולנס כדי לאפשר לך לחיות חיים בריאים ותוססים יותר. כל תוכנית מותאמת אישית ומובילה אותך להרגלים בני קיימא ורווחה מתמשכת. עם הנחיית מומחים ותמיכה שוטפת, נוודא שתישאר/י עם מוטיבציה בכל צעד. יחד ניצור אורח חיים המטפח את בריאותך ואושרך לשנים.",
    testimonialsHeading: "מה הלקוחות שלנו אומרים עלינו",
    blogHeading: "החדש בבלוג שלנו",
    blogCard1: "חיים מודעים",
    blogCard2: "מתכונים בריאים",
    blogCard3: "טיפים לאימון",
    blogCardDesc: "תובנות מועילות שיעזרו לך להישאר מעורר השראה ומוטיבציה מדי יום.",
    contactHeading: "מוכנים להתחיל את המסע שלכם?",
    contactDesc:
      "יש לך שאלות או זקוק/ה להכוונה במסע הרווחה שלך? פנה/י אלינו היום.",
    contactCta: "צור קשר",
    ach1: "לקוחות מרוצים",
    ach2: "תוכניות רווחה",
    ach3: "מאמנים מומחים",
    ach4: "שנות ניסיון",
    name1: "שרה ג'ונסון",
    name2: "מייקל לי",
    name3: "אמה דייוויס",
    position1: "חובבת כושר",
    position2: "יזם",
    position3: "מורה",
    testimonial1: "תוכניות הרווחה שינו את אורח חיי. אני מרגישה יותר אנרגטית, ממוקדת ושמחה מאי פעם!",
    testimonial2: "הצוות מדהים! ההכוונה האישית שלהם עזרה לי לנהל סטרס ולשפר את הבריאות בצורה הוליסטית.",
    testimonial3: "ממליצה בחום על השירותים שלהם. המיינדפולנס ותוכניות התזונה עשו שינוי גדול בחיי היומיום שלי.",
  },
};

const getLanguage = () => {
  if (typeof window === 'undefined') return 'en';
  return localStorage.getItem('language') || 'en';
};

const services = [
  { title: "Yoga & Meditation", desc: "Find inner peace and flexibility with guided yoga sessions.", img: backgroundImage },
  { title: "Nutrition Plans", desc: "Personalized diets designed by expert nutritionists.", img: backgroundImage2 },
  { title: "Mental Health Support", desc: "Support and tools to improve mindfulness and emotional well-being.", img: backgroundImage3 },
  { title: "Fitness Coaching", desc: "Custom workouts to strengthen your body and mind.", img: backgroundImage4 },
  { title: "Detox Programs", desc: "Cleanse your body and boost energy levels.", img: backgroundImage5 },
  { title: "Stress Relief", desc: "Relaxation techniques and mindfulness practices.", img: backgroundImage6 },
];

const achievements = [
  { number: 500, label: "Happy Clients" },
  { number: 120, label: "Wellness Programs" },
  { number: 50, label: "Expert Trainers" },
  { number: 10, label: "Years of Experience" },
];

const THEME_KEY = 'theme';

const Home2 = () => {
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

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Helper for theme-based class
  const themedClass = (base, dark, light) =>
    `${base} ${theme === 'dark' ? dark : light}`;

  const [counts, setCounts] = useState(achievements.map(() => 0));

  useEffect(() => {
    const intervals = achievements.map((item, index) => {
      const increment = Math.ceil(item.number / 100);
      return setInterval(() => {
        setCounts((prev) => {
          const newCounts = [...prev];
          if (newCounts[index] < item.number) {
            newCounts[index] += increment;
            if (newCounts[index] > item.number) newCounts[index] = item.number;
          }
          return newCounts;
        });
      }, 20);
    });

    return () => intervals.forEach((i) => clearInterval(i));
  }, []);

  return (
    <div className={themedClass(
      "font-sans min-h-screen transition-colors duration-500",
      "bg-gray-900 text-gray-100",
      "bg-white text-gray-800"
    )}>
      

      {/* Section 1: Hero Banner */}
      <section className={themedClass(
              "relative h-screen flex items-center justify-center",
              "bg-black",
              "bg-black"
            )}>
              <video
                src={vedio}
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
                style={{ color: theme === 'dark' ? '#fff' : '#fff' }}>
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

      {/* Section 2: Our Services */}
      <section className={themedClass(
        "py-24 px-6",
        "bg-[#1E2A38]",
        "bg-green-50"
      )}>
        <h2 className={themedClass(
          "text-4xl font-extrabold text-center mb-16 animate-fadeInDown",
          "text-white",
          "text-green-800"
        )}>
          {t('servicesHeading')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-full mx-auto">
          {services.map((service, i) => {
            let animationClass = i % 3 === 0 ? "animate-fadeInLeft" : i % 3 === 1 ? "animate-fadeInRight" : "animate-fadeInUp";
            return (
              <div
                key={i}
                className={themedClass(
                  `relative w-full h-72 overflow-hidden rounded-[100px_0_100px_0] cursor-pointer group ${animationClass}`,
                  "",
                  ""
                )}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <img
                  src={service.img}
                  alt={t(`serviceTitle${i+1}`)}
                  className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
                />
                <div className={themedClass(
                  "absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 px-4 text-center",
                  "bg-black bg-opacity-60",
                  "bg-black bg-opacity-50"
                )}>
                  <h3 className="text-white text-2xl font-bold mb-2">{t(`serviceTitle${i+1}`)}</h3>
                  <p className="text-white text-sm md:text-base">{t(`serviceDesc${i+1}`)}</p>
                </div>
              </div>
            );
          })}
        </div>
        {/* Animations */}
        <style>{`
          @keyframes fadeInDown {
            0% { opacity: 0; transform: translateY(-30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInLeft {
            0% { opacity: 0; transform: translateX(-50px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          @keyframes fadeInRight {
            0% { opacity: 0; transform: translateX(50px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          .animate-fadeInDown { animation: fadeInDown 1s ease forwards; }
          .animate-fadeInUp { animation: fadeInUp 1s ease forwards; }
          .animate-fadeInLeft { animation: fadeInLeft 1s ease forwards; }
          .animate-fadeInRight { animation: fadeInRight 1s ease forwards; }
        `}</style>
      </section>

      {/* Section 3: About Us */}
      <section className={themedClass(
        "relative w-full py-28 px-6 overflow-hidden",
        "bg-[#22304a]",
        "bg-green-50"
      )}>
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-green-200 rounded-full opacity-40 animate-blob"></div>
        <div className="absolute -bottom-32 -right-20 w-96 h-96 bg-green-300 rounded-full opacity-30 animate-blob animation-delay-2000"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 relative z-10 items-center">
          <div className="md:w-1/2 animate-fadeInLeft">
            <img
              src={image7}
              alt="wellness"
              className="rounded-3xl shadow-2xl transform transition duration-700 hover:scale-105 w-full max-h-96 object-cover"
            />
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-green-400 rounded-full opacity-50 blur-3xl animate-blob animation-delay-1000"></div>
          </div>
          <div className="md:w-1/2 animate-fadeInRight">
            <h2 className={themedClass(
              "text-5xl font-extrabold mb-6 animate-slideInDown",
              "text-white",
              "text-green-800"
            )}>
              {t('aboutHeading')}
            </h2>
            <p className={themedClass(
              "text-lg mb-6 text-justify animate-slideInUp",
              "text-gray-300",
              "text-gray-700"
            )}>
              {t('aboutParagraph')}
            </p>
           
          </div>
        </div>
        <style jsx>{`
          @keyframes fadeInLeft { 0% { opacity: 0; transform: translateX(-50px); } 100% { opacity: 1; transform: translateX(0); } }
          @keyframes fadeInRight { 0% { opacity: 0; transform: translateX(50px); } 100% { opacity: 1; transform: translateX(0); } }
          @keyframes slideInDown { 0% { opacity: 0; transform: translateY(-40px); } 100% { opacity: 1; transform: translateY(0); } }
          @keyframes slideInUp { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }
          .animate-fadeInLeft { animation: fadeInLeft 1s ease forwards; }
          .animate-fadeInRight { animation: fadeInRight 1s ease forwards; }
          .animate-slideInDown { animation: slideInDown 0.8s ease forwards; }
          .animate-slideInUp { animation: slideInUp 0.8s ease forwards; }
          .animate-fadeInUp { animation: slideInUp 1s ease forwards; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-400 { animation-delay: 0.4s; }
          .delay-600 { animation-delay: 0.6s; }
          @keyframes blob { 0%, 100% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } }
          .animate-blob { animation: blob 6s infinite; }
          .animation-delay-1000 { animation-delay: 1s; }
          .animation-delay-2000 { animation-delay: 2s; }
        `}</style>
      </section>

      {/* Section 4: Why Choose Us */}
      <section className={themedClass(
        "w-full py-28 px-6 relative overflow-hidden",
        "bg-[#1E2A38]",
        "bg-white"
      )}>
        <h2 className={themedClass(
          "text-4xl font-extrabold text-center mb-16 animate-zoomIn",
          "text-white",
          "text-green-800"
        )}>
          {t('testimonialsHeading')}
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              nameKey: "name1",
              positionKey: "position1",
              testimonialKey: "testimonial1",
              img: "https://randomuser.me/api/portraits/women/44.jpg"
            },
            {
              nameKey: "name2",
              positionKey: "position2",
              testimonialKey: "testimonial2",
              img: "https://randomuser.me/api/portraits/men/32.jpg"
            },
            {
              nameKey: "name3",
              positionKey: "position3",
              testimonialKey: "testimonial3",
              img: "https://randomuser.me/api/portraits/women/68.jpg"
            }
          ].map((client, i) => (
            <div
              key={i}
              className={themedClass(
                "relative rounded-3xl shadow-lg p-8 flex flex-col items-center text-center transform transition duration-500 hover:scale-105 hover:rotate-2 hover:shadow-2xl animate-zoomIn",
                "bg-[#22304a]",
                "bg-green-50"
              )}
              style={{ animationDelay: `${i * 300}ms` }}
            >
              <img
                src={client.img}
                alt={client.name}
                className="w-24 h-24 rounded-full mb-4 border-4 border-green-600 object-cover transform transition duration-500 hover:rotate-6 hover:scale-110"
              />
              <p className={themedClass(
                "mb-4",
                "text-gray-300",
                "text-gray-700"
              )}>{t(client.testimonialKey)}</p>
              <h4 className={themedClass(
                "text-lg font-semibold",
                "text-white",
                "text-green-800"
              )}>{t(client.nameKey)}</h4>
              <span className={themedClass(
                "text-sm",
                "text-gray-400",
                "text-gray-500"
              )}>{t(client.positionKey)}</span>
            </div>
          ))}
        </div>
        <style jsx>{`
          @keyframes zoomIn {
            0% { opacity: 0; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-zoomIn { animation: zoomIn 0.8s ease forwards; }
          .delay-300 { animation-delay: 0.3s; }
          .delay-600 { animation-delay: 0.6s; }
          .delay-900 { animation-delay: 0.9s; }
        `}</style>
      </section>

      {/* Section 5: Blog Highlights */}
      <section className={themedClass(
        "py-20 px-6 text-center",
        "bg-[#22304a]",
        "bg-white"
      )}>
        <h2 className={themedClass(
          "text-4xl font-semibold mb-12 animate-fadeInUp",
          "text-white",
          ""
        )}>{t('blogHeading')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[t('blogCard1'), t('blogCard2'), t('blogCard3')].map((blog, i) => (
            <div key={i} className={themedClass(
              "rounded-2xl p-6 shadow hover:scale-105 transform transition animate-fadeInUp",
              "bg-[#1E2A38] text-white",
              "bg-green-50 text-gray-700"
            )} style={{ animationDelay: `${i * 0.2}s` }}>
              <h3 className={themedClass(
                "text-2xl font-semibold mb-2",
                "text-white",
                "text-green-800"
              )}>{blog}</h3>
              <p className={themedClass(
                "",
                "text-gray-300",
                "text-gray-700"
              )}>{t('blogCardDesc')}</p>
            </div>
          ))}
        </div>
      </section>

    
      

      {/* Section 7cd: Contact CTA */}
      <section
      className="relative w-full py-24 px-6 text-center overflow-hidden transition-colors duration-500"
      style={{
        backgroundImage: `url(${backgroundImage6})`,
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

export default Home2;
