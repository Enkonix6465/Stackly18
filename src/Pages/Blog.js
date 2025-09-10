import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaHandsHelping, FaMedal, FaRunning } from "react-icons/fa";
import blogVideo from "../assets/blogVideo.mp4";
import image from "../assets/B2.jpg";
import image2 from "../assets/BG1.jpg";
import image3 from "../assets/YM.jpg";
import { Link } from "react-router-dom";

const THEME_KEY = "theme";
const LANGUAGE_KEY = "language";

// Translations for all texts
const translations = {
  en: {
    blogTitle: "Health & Wellness Blog",
    blogDesc: "Explore articles, tips, and guides to improve your health and lifestyle.",
    contactNow: "Contact Now",
    routineTitle: "3-Step Daily Routine for a Balanced Life",
    routineDesc: "Achieve balance with gratitude, mindfulness, and energizing movement in just three simple steps.",
    gratitude: "Gratitude Challenge",
    gratitudeDesc: "Write down three things you’re grateful for every morning.",
    mindfulness: "Mindfulness Moment",
    mindfulnessDesc: "5-10 minutes in quiet meditation or focused breathing.",
    movement: "Energizing Movement",
    movementDesc: "Incorporate 10 minutes of light stretching or yoga.",
    latestArticles: "Latest Articles",
    article1Title: "5 Steps to a Healthier Morning Routine",
    article1Desc: "Learn how to start your day with energy, focus, and positivity using simple daily habits.",
    article2Title: "Transform Your Relationship with Food",
    article2Desc: "Discover techniques to enjoy your meals more consciously and improve digestion and wellness.",
    readMore: "Read More",
    expertAdvice: "Expert Advice",
    tip1Title: "Nutrition Tips",
    tip1Desc: "Learn from certified dietitians about balanced meals.",
    tip2Title: "Mental Health",
    tip2Desc: "Advice from therapists to manage stress and anxiety.",
    tip3Title: "Fitness Guidance",
    tip3Desc: "Workout routines and tips from professional trainers.",
    newsletterTitle: "Subscribe to Our Newsletter",
    newsletterDesc: "Stay updated with wellness articles, tips, and events delivered straight to your inbox.",
    subscribe: "Subscribe",
    emailPlaceholder: "Your email",
  },
  ar: {
    blogTitle: "مدونة الصحة والعافية",
    blogDesc: "استكشف المقالات والنصائح والإرشادات لتحسين صحتك ونمط حياتك.",
    contactNow: "اتصل الآن",
    routineTitle: "روتين يومي من 3 خطوات لحياة متوازنة",
    routineDesc: "حقق التوازن بالامتنان واليقظة والحركة النشطة في ثلاث خطوات بسيطة فقط.",
    gratitude: "تحدي الامتنان",
    gratitudeDesc: "اكتب ثلاثة أشياء تشعر بالامتنان لها كل صباح.",
    mindfulness: "لحظة يقظة",
    mindfulnessDesc: "5-10 دقائق في التأمل الهادئ أو التنفس المركز.",
    movement: "حركة نشطة",
    movementDesc: "أضف 10 دقائق من التمدد أو اليوغا الخفيفة.",
    latestArticles: "أحدث المقالات",
    article1Title: "5 خطوات لروتين صباحي أكثر صحة",
    article1Desc: "تعلم كيف تبدأ يومك بالطاقة والتركيز والإيجابية باستخدام عادات يومية بسيطة.",
    article2Title: "حوّل علاقتك مع الطعام",
    article2Desc: "اكتشف تقنيات للاستمتاع بوجباتك بوعي وتحسين الهضم والصحة.",
    readMore: "اقرأ المزيد",
    expertAdvice: "نصائح الخبراء",
    tip1Title: "نصائح التغذية",
    tip1Desc: "تعلم من اختصاصيي التغذية المعتمدين حول الوجبات المتوازنة.",
    tip2Title: "الصحة النفسية",
    tip2Desc: "نصائح من المعالجين لإدارة التوتر والقلق.",
    tip3Title: "إرشادات اللياقة",
    tip3Desc: "روتينات التمارين ونصائح من مدربين محترفين.",
    newsletterTitle: "اشترك في النشرة البريدية",
    newsletterDesc: "ابقَ على اطلاع بالمقالات والنصائح والفعاليات الصحية مباشرة إلى بريدك.",
    subscribe: "اشترك",
    emailPlaceholder: "بريدك الإلكتروني",
  },
  he: {
    blogTitle: "בלוג בריאות ואיכות חיים",
    blogDesc: "גלה מאמרים, טיפים ומדריכים לשיפור הבריאות ואורח החיים שלך.",
    contactNow: "צור קשר עכשיו",
    routineTitle: "שגרת יום בשלושה שלבים לאיזון מושלם",
    routineDesc: "השג איזון עם תודה, מיינדפולנס ותנועה אנרגטית בשלושה צעדים פשוטים.",
    gratitude: "אתגר התודה",
    gratitudeDesc: "כתוב שלושה דברים שאתה מודה עליהם בכל בוקר.",
    mindfulness: "רגע של מיינדפולנס",
    mindfulnessDesc: "5-10 דקות של מדיטציה שקטה או נשימה ממוקדת.",
    movement: "תנועה אנרגטית",
    movementDesc: "שלב 10 דקות של מתיחות או יוגה קלה.",
    latestArticles: "מאמרים אחרונים",
    article1Title: "5 צעדים לשגרת בוקר בריאה יותר",
    article1Desc: "למד כיצד להתחיל את היום באנרגיה, מיקוד וחיוביות עם הרגלים יומיים פשוטים.",
    article2Title: "שנה את היחס שלך לאוכל",
    article2Desc: "גלה טכניקות ליהנות מהארוחות במודעות ולשפר עיכול ובריאות.",
    readMore: "קרא עוד",
    expertAdvice: "עצות מומחים",
    tip1Title: "טיפים לתזונה",
    tip1Desc: "למד מדיאטנים מוסמכים על ארוחות מאוזנות.",
    tip2Title: "בריאות נפשית",
    tip2Desc: "עצות ממטפלים לניהול לחץ וחרדה.",
    tip3Title: "הכוונה לכושר",
    tip3Desc: "שגרות אימון וטיפים ממאמנים מקצועיים.",
    newsletterTitle: "הירשם לניוזלטר שלנו",
    newsletterDesc: "קבל עדכונים על מאמרים, טיפים ואירועים ישירות לתיבת הדואר שלך.",
    subscribe: "הירשם",
    emailPlaceholder: "האימייל שלך",
  },
};

// Helper to get translation
const t = (key, lang) => translations[lang]?.[key] || translations.en[key];

// RTL languages
const rtlLangs = ["ar", "he"];

const Blog = () => {
  // Theme state and effect
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(THEME_KEY) || "light";
    }
    return "light";
  });

  // Language state and effect
  const [language, setLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(LANGUAGE_KEY) || "en";
    }
    return "en";
  });

  // Consistent CTA button classes
  const ctaButtonClass = "px-8 py-3 md:py-4 md:px-10 font-semibold rounded-full shadow-lg transition duration-300 transform bg-green-500 text-white hover:bg-green-600 hover:scale-110 inline-block text-center";
  const ctaButtonOutlineClass = "px-8 py-3 md:py-4 md:px-10 font-semibold rounded-full shadow-lg transition duration-300 transform border-2 border-green-500 text-green-500 bg-transparent hover:bg-green-50 hover:text-green-700 hover:scale-110 inline-block text-center";

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(THEME_KEY, theme);
      document.documentElement.setAttribute("data-theme", theme);
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      window.dispatchEvent(new Event("theme-changed"));
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleThemeChange = () => {
        const newTheme = localStorage.getItem(THEME_KEY) || "light";
        setTheme(newTheme);
      };
      window.addEventListener("theme-changed", handleThemeChange);
      window.addEventListener("storage", handleThemeChange);

      // Listen for language changes from header
      const handleLanguageChange = () => {
        const newLang = localStorage.getItem(LANGUAGE_KEY) || "en";
        setLanguage(newLang);
      };
      window.addEventListener("language-changed", handleLanguageChange);
      window.addEventListener("storage", handleLanguageChange);

      return () => {
        window.removeEventListener("theme-changed", handleThemeChange);
        window.removeEventListener("storage", handleThemeChange);
        window.removeEventListener("language-changed", handleLanguageChange);
        window.removeEventListener("storage", handleLanguageChange);
      };
    }
  }, []);

  // Helper for theme-based class
  const themedClass = (base, dark, light) =>
    `${base} ${theme === "dark" ? dark : light}`;

  // Direction for RTL languages
  const dir = rtlLangs.includes(language) ? "rtl" : "ltr";

  // Steps for daily routine (translated)
  const steps = [
    {
      title: t("gratitude", language),
      description: t("gratitudeDesc", language),
      icon: <FaHandsHelping size={40} />,
    },
    {
      title: t("mindfulness", language),
      description: t("mindfulnessDesc", language),
      icon: <FaMedal size={40} />,
    },
    {
      title: t("movement", language),
      description: t("movementDesc", language),
      icon: <FaRunning size={40} />,
    },
  ];

  // Wellness tips (translated)
  const tips = [
    {
      title: t("tip1Title", language),
      desc: t("tip1Desc", language),
      icon: "🥗",
    },
    {
      title: t("tip2Title", language),
      desc: t("tip2Desc", language),
      icon: "🧘‍♀️",
    },
    {
      title: t("tip3Title", language),
      desc: t("tip3Desc", language),
      icon: "🏋️‍♂️",
    },
  ];

  return (
    <div
      dir={dir}
      className={themedClass(
        "w-full overflow-x-hidden min-h-screen transition-colors duration-500",
        "bg-gray-900 text-gray-100",
        "bg-white text-gray-800"
      )}
    >
      {/* ===== 1. HERO SECTION ===== */}
      <section className="relative h-screen w-full">
        <video
          src={blogVideo}
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {t("blogTitle", language)}
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl text-white max-w-2xl mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {t("blogDesc", language)}
          </motion.p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/contact"
              className={ctaButtonClass}
            >
              {t("contactNow", language)}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== 2. FEATURED DAILY ROUTINE ===== */}
      <motion.section
        className={themedClass(
          "w-full py-24 px-4 text-center",
          "bg-[#1E2A38]",
          "bg-gray-50"
        )}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.h2
          className={themedClass(
            "text-4xl font-bold mb-4",
            "text-green-200",
            "text-gray-800"
          )}
        >
          {t("routineTitle", language)}
        </motion.h2>
        <motion.p
          className={themedClass(
            "",
            "text-green-100 mb-12",
            "text-gray-600 mb-12"
          )}
        >
          {t("routineDesc", language)}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-full mx-auto px-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={themedClass(
                "flex flex-col items-center p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform border",
                "bg-[#22304a] border-gray-700",
                "bg-white border"
              )}
            >
              {step.icon}
              <h3 className={themedClass(
                "text-xl font-semibold mb-2",
                "text-green-200",
                "text-gray-800"
              )}>
                {step.title}
              </h3>
              <p className={themedClass(
                "",
                "text-green-100",
                "text-gray-600"
              )}>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== 3. LATEST ARTICLES ===== */}
      <motion.section
        className={themedClass(
          "w-full py-24 px-4",
          "bg-[#22304a]",
          "bg-white"
        )}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2
          className={themedClass(
            "text-3xl md:text-4xl font-bold text-center mb-12",
            "text-green-200",
            "text-green-700"
          )}
        >
          {t("latestArticles", language)}
        </h2>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 gap-10">
          {/* Article 1 */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={themedClass(
              "relative rounded-xl overflow-hidden shadow-lg",
              "bg-[#1E2A38]",
              "bg-white"
            )}
          >
            <img src={image} alt="article 1" className="w-full h-64 object-cover" />
            <div
              className={themedClass(
                "p-6",
                "bg-[#22304a]",
                "bg-white"
              )}
            >
              <h3
                className={themedClass(
                  "text-xl font-bold mb-2",
                  "text-green-200",
                  "text-gray-800"
                )}
              >
                {t("article1Title", language)}
              </h3>
              <p
                className={themedClass(
                  "mb-4",
                  "text-green-100",
                  "text-gray-700"
                )}
              >
                {t("article1Desc", language)}
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/article"
                  className={ctaButtonClass}
                >
                  {t("readMore", language)}
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Article 2 */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={themedClass(
              "relative rounded-xl overflow-hidden shadow-lg",
              "bg-[#1E2A38]",
              "bg-white"
            )}
          >
            <img src={image2} alt="article 2" className="w-full h-64 object-cover" />
            <div
              className={themedClass(
                "p-6",
                "bg-[#22304a]",
                "bg-white"
              )}
            >
              <h3
                className={themedClass(
                  "text-xl font-bold mb-2",
                  "text-green-200",
                  "text-gray-800"
                )}
              >
                {t("article2Title", language)}
              </h3>
              <p
                className={themedClass(
                  "mb-4",
                  "text-green-100",
                  "text-gray-700"
                )}
              >
                {t("article2Desc", language)}
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/article"
                  className={ctaButtonClass}
                >
                  {t("readMore", language)}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== 4. WELLNESS TIPS ===== */}
      <motion.section
        className={themedClass(
          "w-full py-24 px-6 text-center",
          "bg-[#1E2A38]",
          "bg-green-50"
        )}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className={themedClass(
          "text-3xl md:text-4xl font-bold mb-16",
          "text-green-200",
          "text-green-700"
        )}>
          {t("expertAdvice", language)}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tips.map((tip, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className={themedClass(
                "rounded-2xl shadow-lg p-10 transition-all duration-300 cursor-pointer",
                "bg-[#22304a] hover:bg-[#1E2A38] hover:shadow-2xl",
                "bg-white hover:bg-green-100 hover:shadow-2xl"
              )}
            >
              <div className="text-5xl mb-4">{tip.icon}</div>
              <h3 className={themedClass(
                "text-2xl font-bold mb-3",
                "text-green-200",
                "text-green-800"
              )}>{tip.title}</h3>
              <p className={themedClass(
                "italic",
                "text-green-100",
                "text-gray-700"
              )}>{tip.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== 6. NEWSLETTER ===== */}
      <motion.section
        className={themedClass(
          "w-full py-24 px-4 text-center relative",
          "text-white",
          "text-black"
        )}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        style={{
          backgroundImage: `url(${image3})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Heading */}
          <h2
            className={themedClass(
              "text-3xl md:text-4xl font-bold mb-6",
              "text-white",
              "text-white"
            )}
          >
            {t("newsletterTitle", language)}
          </h2>

          {/* Paragraph */}
          <p
            className={themedClass(
              "max-w-2xl mx-auto mb-6",
              "text-gray-200",
              "text-white"
            )}
          >
            {t("newsletterDesc", language)}
          </p>

          {/* Email + Subscribe Button */}
          <div className="flex justify-center gap-4 flex-col sm:flex-row max-w-xl mx-auto">
            <input
              type="email"
              placeholder={t("emailPlaceholder", language)}
              className="p-4 rounded-full w-full sm:flex-1 text-white-800 focus:outline-none"
            />
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                to="/contact"
                className={ctaButtonClass}
              >
                {t("subscribe", language)}
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

    </div>
  );
};

export default Blog;
