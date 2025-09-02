import React, { useEffect, useState } from "react";
import video from '../assets/Services7.mp4';
import { useNavigate } from "react-router-dom";
import wellnessImage from "../assets/FC.jpg";

const THEME_KEY = "theme";
const LANGUAGE_KEY = "language";

// Translations for all texts
const translations = {
  en: {
    hero: "Wellness Coaching",
    achieve: "Achieve Balance & Vitality",
    info: "Personalized coaching to enhance physical health, mental clarity, and emotional well-being. Learn habits and routines to maintain a balanced lifestyle.",
    tips: [
      "🏃 Fitness & Nutrition Guidance",
      "🧘 Mindfulness & Stress Management",
      "💡 Lifestyle & Habit Coaching"
    ],
    start: "Start Your Wellness Journey",
    servicesTitle: "Our Wellness Coaching Services",
    servicesDesc: "Holistic guidance and routines to improve your health, energy, and lifestyle habits.",
    services: [
      { icon: "🏃", title: "Fitness & Nutrition", desc: "Tailored plans for healthy living." },
      { icon: "🧘", title: "Mindfulness Coaching", desc: "Manage stress and enhance clarity." },
      { icon: "💡", title: "Lifestyle Coaching", desc: "Build sustainable healthy habits." },
      { icon: "📊", title: "Progress Tracking", desc: "Monitor improvements and results." }
    ],
    whyTitle: "Why Choose Wellness Coaching?",
    why: [
      { icon: "🏃", title: "Healthy Body", desc: "Improve physical fitness and adopt nutritious habits." },
      { icon: "🧘", title: "Mind & Clarity", desc: "Reduce stress, increase mindfulness, and enhance focus." },
      { icon: "💡", title: "Sustainable Lifestyle", desc: "Build habits for long-term wellness and balance." }
    ],
    plansTitle: "Wellness Coaching Plans",
    plansDesc: "Select a coaching program to enhance your health, mindset, and overall wellbeing.",
    plans: [
      {
        title: "Basic Plan",
        price: "$39/month",
        features: ["Fitness & Nutrition Tips", "Weekly Guidance", "Email Support"],
      },
      {
        title: "Standard Plan",
        price: "$69/month",
        features: ["All Basic Features", "Mindfulness Coaching", "Progress Tracking"],
      },
      {
        title: "Premium Plan",
        price: "$109/month",
        features: ["Full Wellness Coaching", "Progress Reports", "Priority Support"],
      },
    ],
    ready: "Ready to Start Wellness Coaching?",
    readyDesc: "Begin your journey to improved health, clarity, and balanced lifestyle today.",
    contact: "Contact Us →"
  },
  ar: {
    hero: "تدريب العافية",
    achieve: "حقق التوازن والحيوية",
    info: "تدريب شخصي لتعزيز الصحة الجسدية، والوضوح الذهني، والرفاهية العاطفية. تعلم عادات وروتينات للحفاظ على نمط حياة متوازن.",
    tips: [
      "🏃 إرشادات اللياقة والتغذية",
      "🧘 اليقظة الذهنية وإدارة الضغط",
      "💡 تدريب نمط الحياة والعادات"
    ],
    start: "ابدأ رحلة العافية",
    servicesTitle: "خدمات تدريب العافية",
    servicesDesc: "إرشاد شامل وروتينات لتحسين صحتك وطاقة جسمك وعادات نمط حياتك.",
    services: [
      { icon: "🏃", title: "اللياقة والتغذية", desc: "خطط مخصصة لحياة صحية." },
      { icon: "🧘", title: "تدريب اليقظة الذهنية", desc: "إدارة الضغط وتعزيز الوضوح." },
      { icon: "💡", title: "تدريب نمط الحياة", desc: "بناء عادات صحية مستدامة." },
      { icon: "📊", title: "متابعة التقدم", desc: "راقب التحسينات والنتائج." }
    ],
    whyTitle: "لماذا تختار تدريب العافية؟",
    why: [
      { icon: "🏃", title: "جسم صحي", desc: "حسّن اللياقة البدنية وتبني عادات غذائية صحية." },
      { icon: "🧘", title: "صفاء الذهن", desc: "قلل الضغط وزد اليقظة الذهنية وحسّن التركيز." },
      { icon: "💡", title: "نمط حياة مستدام", desc: "بناء عادات للعافية والتوازن طويل الأمد." }
    ],
    plansTitle: "خطط تدريب العافية",
    plansDesc: "اختر برنامج تدريب لتحسين صحتك وعقلك ورفاهيتك العامة.",
    plans: [
      {
        title: "الخطة الأساسية",
        price: "$39/شهريًا",
        features: ["نصائح اللياقة والتغذية", "إرشاد أسبوعي", "دعم عبر البريد الإلكتروني"],
      },
      {
        title: "الخطة القياسية",
        price: "$69/شهريًا",
        features: ["جميع ميزات الأساسية", "تدريب اليقظة الذهنية", "متابعة التقدم"],
      },
      {
        title: "الخطة المميزة",
        price: "$109/شهريًا",
        features: ["تدريب عافية كامل", "تقارير التقدم", "دعم أولوية"],
      },
    ],
    ready: "جاهز لبدء تدريب العافية؟",
    readyDesc: "ابدأ رحلتك نحو صحة أفضل ووضوح وتوازن اليوم.",
    contact: "تواصل معنا →"
  },
  he: {
    hero: "אימון בריאות הוליסטי",
    achieve: "השג איזון וחיוניות",
    info: "אימון אישי לשיפור הבריאות הגופנית, בהירות מנטלית ורווחה רגשית. למד הרגלים ורוטינות לשמירה על אורח חיים מאוזן.",
    tips: [
      "🏃 הדרכת כושר ותזונה",
      "🧘 מיינדפולנס וניהול לחץ",
      "💡 אימון אורח חיים והרגלים"
    ],
    start: "התחל את מסע הבריאות שלך",
    servicesTitle: "שירותי אימון בריאות",
    servicesDesc: "הכוונה הוליסטית ורוטינות לשיפור הבריאות, האנרגיה והרגלי החיים שלך.",
    services: [
      { icon: "🏃", title: "כושר ותזונה", desc: "תוכניות מותאמות לחיים בריאים." },
      { icon: "🧘", title: "אימון מיינדפולנס", desc: "ניהול לחץ והגברת בהירות." },
      { icon: "💡", title: "אימון אורח חיים", desc: "בניית הרגלים בריאים לטווח ארוך." },
      { icon: "📊", title: "מעקב התקדמות", desc: "עקוב אחרי שיפורים ותוצאות." }
    ],
    whyTitle: "למה לבחור אימון בריאות?",
    why: [
      { icon: "🏃", title: "גוף בריא", desc: "שפר כושר גופני ואמץ הרגלי תזונה בריאים." },
      { icon: "🧘", title: "מיינד & בהירות", desc: "הפחת לחץ, הגבר מיינדפולנס ושפר ריכוז." },
      { icon: "💡", title: "אורח חיים בר-קיימא", desc: "בנה הרגלים לבריאות ואיזון לטווח ארוך." }
    ],
    plansTitle: "תוכניות אימון בריאות",
    plansDesc: "בחר תוכנית אימון לשיפור הבריאות, החשיבה והרווחה שלך.",
    plans: [
      {
        title: "תוכנית בסיסית",
        price: "$39/חודש",
        features: ["טיפים לכושר ותזונה", "הכוונה שבועית", "תמיכה במייל"],
      },
      {
        title: "תוכנית סטנדרטית",
        price: "$69/חודש",
        features: ["כל תכונות הבסיס", "אימון מיינדפולנס", "מעקב התקדמות"],
      },
      {
        title: "תוכנית פרימיום",
        price: "$109/חודש",
        features: ["אימון בריאות מלא", "דוחות התקדמות", "תמיכה מועדפת"],
      },
    ],
    ready: "מוכן להתחיל אימון בריאות?",
    readyDesc: "התחל את המסע שלך לבריאות טובה יותר, בהירות ואיזון היום.",
    contact: "צור קשר →"
  }
};

const rtlLangs = ["ar", "he"];
const t = (key, lang) => translations[lang]?.[key] || translations.en[key];

export default function WellnessCoaching() {
  const navigate = useNavigate();

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(THEME_KEY) || "light";
    }
    return "light";
  });

  const [language, setLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(LANGUAGE_KEY) || "en";
    }
    return "en";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleThemeChange = () => {
        setTheme(localStorage.getItem(THEME_KEY) || "light");
      };
      window.addEventListener("theme-changed", handleThemeChange);
      window.addEventListener("storage", handleThemeChange);

      const handleLanguageChange = () => {
        setLanguage(localStorage.getItem(LANGUAGE_KEY) || "en");
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

  const themedClass = (base, dark, light) =>
    `${base} ${theme === "dark" ? dark : light}`;

  const dir = rtlLangs.includes(language) ? "rtl" : "ltr";

  const handleGetStarted = (path) => {
    navigate(path);
  };

  return (
    <div dir={dir} className={themedClass(
      "text-[1.15rem] md:text-[1.25rem] transition-colors duration-500 min-h-screen",
      "bg-gray-900 text-gray-100",
      "bg-white text-gray-800"
    )}>
      {/* ===== Hero Section ===== */}
      <section className="relative w-full h-screen overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 flex items-center justify-center w-full h-full bg-black/60">
          <h1 className="text-white text-5xl md:text-6xl font-bold animate-fadeIn">
            {t("hero", language)}
          </h1>
        </div>
      </section>

      {/* ===== Info Section ===== */}
      <section className="w-full px-6 py-16 flex flex-col md:flex-row items-start gap-10">
        <div className="flex-1">
          <h2 className={themedClass(
            "text-3xl font-bold mb-4",
            "text-green-200",
            "text-green-700"
          )}>
            {t("achieve", language)}
          </h2>
          <p className={themedClass(
            "mb-6 leading-relaxed",
            "text-gray-300",
            "text-gray-800"
          )}>
            {t("info", language)}
          </p>
          <ul className="space-y-3 mb-6">
            {t("tips", language).map((tip, i) => (
              <li key={i} className={themedClass(
                "p-3 border-l-4 rounded",
                "bg-green-900 border-green-400",
                "bg-green-50 border-green-600"
              )}>
                {tip}
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleGetStarted("/contact")}
            className={themedClass(
              "px-6 py-3 rounded-lg font-semibold transition",
              "bg-green-700 text-white hover:bg-green-600",
              "bg-green-600 text-white hover:bg-green-700"
            )}
          >
            {t("start", language)}
          </button>
        </div>

        <div className="flex-1 flex items-start">
          <img
            src={wellnessImage}
            alt={t("hero", language)}
            className="rounded-xl shadow-lg max-h-[400px] w-full object-cover"
          />
        </div>
      </section>

      {/* ===== Services Section ===== */}
      <section className={themedClass(
        "py-16 px-6 text-center",
        "bg-[#1E2A38]",
        "bg-green-50"
      )}>
        <h2 className={themedClass(
          "text-3xl font-bold mb-4",
          "text-green-200",
          "text-green-700"
        )}>
          {t("servicesTitle", language)}
        </h2>
        <p className={themedClass(
          "mb-10",
          "text-green-100",
          "text-gray-700"
        )}>
          {t("servicesDesc", language)}
        </p>

        <div className="grid gap-8 md:grid-cols-4">
          {t("services", language).map((service, i) => (
            <div
              key={i}
              className={themedClass(
                "p-6 rounded-xl shadow hover:shadow-lg transition",
                "bg-[#22304a]",
                "bg-white"
              )}
            >
              <span className="text-5xl">{service.icon}</span>
              <h3 className={themedClass(
                "mt-3 font-semibold text-xl",
                "text-green-200",
                "text-green-700"
              )}>{service.title}</h3>
              <p className={themedClass(
                "text-base mt-2",
                "text-green-100",
                "text-gray-700"
              )}>
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Benefits Section ===== */}
      <section className="py-16 px-6 text-center max-w-4xl mx-auto">
        <h2 className={themedClass(
          "text-3xl font-bold mb-12",
          "text-green-200",
          "text-green-700"
        )}>
          {t("whyTitle", language)}
        </h2>
        <div className={themedClass(
          "relative border-l-4 pl-8 space-y-10",
          "border-green-400",
          "border-green-600"
        )}>
          {t("why", language).map((item, i) => (
            <div key={i}>
              <h3 className={themedClass(
                "font-bold",
                "text-green-200",
                "text-green-700"
              )}>{item.icon} {item.title}</h3>
              <p className={themedClass(
                "",
                "text-green-100",
                "text-gray-700"
              )}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Plans Section ===== */}
      <section className={themedClass(
        "py-16 px-6 text-center",
        "bg-[#1E2A38]",
        "bg-green-50"
      )}>
        <h2 className={themedClass(
          "text-3xl font-bold mb-4",
          "text-green-200",
          "text-green-700"
        )}>
          {t("plansTitle", language)}
        </h2>
        <p className={themedClass(
          "mb-10",
          "text-green-100",
          "text-gray-700"
        )}>
          {t("plansDesc", language)}
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {t("plans", language).map((plan, i) => (
            <div
              key={i}
              className={themedClass(
                "relative group p-6 rounded-xl shadow-lg overflow-hidden transition transform hover:-translate-y-2",
                "bg-[#22304a]",
                "bg-white"
              )}
            >
              <div className={themedClass(
                "absolute inset-0 opacity-0 group-hover:opacity-10 transition duration-500",
                "bg-green-400",
                "bg-green-600"
              )}></div>
              <h3 className={themedClass(
                "font-semibold text-lg relative z-10",
                "text-green-200",
                "text-green-700"
              )}>{plan.title}</h3>
              <p className={themedClass(
                "text-2xl font-bold mt-2 relative z-10",
                "text-green-100",
                "text-green-700"
              )}>
                {plan.price}
              </p>
              <ul className={themedClass(
                "text-base mt-4 space-y-2 relative z-10",
                "text-green-100",
                "text-gray-700"
              )}>
                {plan.features.map((f, j) => (
                  <li key={j}>{f}</li>
                ))}
              </ul>
              <button
                onClick={() => handleGetStarted("/contact")}
                className={themedClass(
                  "mt-6 px-5 py-2 rounded-lg hover:bg-green-700 transition relative z-10 text-sm font-semibold",
                  "bg-green-700 text-white",
                  "bg-green-600 text-white"
                )}
              >
                {t("start", language)}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Contact Section ===== */}
      <section
        className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url(${wellnessImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center max-w-2xl px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("ready", language)}
          </h2>
          <p className="text-white/90 mb-6">
            {t("readyDesc", language)}
          </p>
          <button
            onClick={() => handleGetStarted("/contact")}
            className={themedClass(
              "px-6 py-3 rounded-lg font-semibold transition",
              "bg-green-700 text-white hover:bg-green-600",
              "bg-green-600 text-white hover:bg-green-700"
            )}
          >
            {t("contact", language)}
          </button>
        </div>
      </section>
    </div>
  );
}