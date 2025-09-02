import React, { useEffect, useState } from "react";
import video from '../assets/Services6.mp4';
import { useNavigate } from "react-router-dom";
import detoxImage from "../assets/HD.jpg";

const THEME_KEY = "theme";
const LANGUAGE_KEY = "language";

// Translations for all texts
const translations = {
  en: {
    hero: "Holistic Detox",
    cleanse: "Cleanse, Rejuvenate & Restore",
    info: "Natural and holistic methods to detoxify your body, support digestion, and promote overall wellness. Learn cleansing routines and habits for a healthier lifestyle.",
    tips: [
      "🍋 Detox Nutrition Tips",
      "🌿 Herbal & Natural Cleansing",
      "💧 Hydration & Elimination Support"
    ],
    start: "Start Your Detox",
    servicesTitle: "Our Holistic Detox Services",
    servicesDesc: "Natural methods and routines to cleanse your body, improve energy, and enhance overall wellbeing.",
    services: [
      { icon: "🍋", title: "Detox Nutrition", desc: "Cleansing meal plans for vitality." },
      { icon: "🌿", title: "Herbal Cleansing", desc: "Support body detox naturally." },
      { icon: "💧", title: "Hydration Support", desc: "Boost detoxification and elimination." },
      { icon: "📊", title: "Progress Tracking", desc: "Monitor your wellness improvements." }
    ],
    whyTitle: "Why Holistic Detox?",
    why: [
      { icon: "🍋", title: "Purified Body", desc: "Eliminate toxins and support overall physical health." },
      { icon: "🌿", title: "Renewed Energy", desc: "Experience revitalized energy, clarity, and vitality." },
      { icon: "💧", title: "Enhanced Wellbeing", desc: "Promote long-term wellness and holistic balance." }
    ],
    plansTitle: "Holistic Detox Plans",
    plansDesc: "Choose a program to cleanse, rejuvenate, and restore your mind and body.",
    plans: [
      {
        title: "Basic Plan",
        price: "$29/month",
        features: ["Detox Nutrition Tips", "Weekly Guidance", "Email Support"]
      },
      {
        title: "Standard Plan",
        price: "$59/month",
        features: ["All Basic Features", "Herbal Cleansing", "Progress Tracking"]
      },
      {
        title: "Premium Plan",
        price: "$99/month",
        features: ["Full Holistic Detox Coaching", "Progress Reports", "Priority Support"]
      }
    ],
    ready: "Ready for a Holistic Detox?",
    readyDesc: "Begin your journey to cleanse, rejuvenate, and restore your body and mind today.",
    contact: "Contact Us →"
  },
  ar: {
    hero: "التخلص الشامل من السموم",
    cleanse: "نظف، جدد، واستعد النشاط",
    info: "طرق طبيعية وشاملة لإزالة السموم من الجسم، دعم الهضم، وتعزيز الصحة العامة. تعلم روتينات التنظيف والعادات لنمط حياة أكثر صحة.",
    tips: [
      "🍋 نصائح تغذية التخلص من السموم",
      "🌿 التنظيف بالأعشاب والطرق الطبيعية",
      "💧 دعم الترطيب والإخراج"
    ],
    start: "ابدأ برنامج التخلص من السموم",
    servicesTitle: "خدمات التخلص الشامل من السموم",
    servicesDesc: "طرق وروتينات طبيعية لتنظيف الجسم، تحسين الطاقة، وتعزيز الصحة العامة.",
    services: [
      { icon: "🍋", title: "تغذية التخلص من السموم", desc: "خطط وجبات تنظيف للحيوية." },
      { icon: "🌿", title: "تنظيف بالأعشاب", desc: "دعم إزالة السموم بشكل طبيعي." },
      { icon: "💧", title: "دعم الترطيب", desc: "تعزيز إزالة السموم والإخراج." },
      { icon: "📊", title: "متابعة التقدم", desc: "راقب تحسن صحتك." }
    ],
    whyTitle: "لماذا التخلص الشامل من السموم؟",
    why: [
      { icon: "🍋", title: "جسم نقي", desc: "إزالة السموم ودعم الصحة الجسدية." },
      { icon: "🌿", title: "طاقة متجددة", desc: "اختبر طاقة وحيوية ووضوح متجدد." },
      { icon: "💧", title: "رفاهية محسنة", desc: "تعزيز الصحة الشاملة والتوازن." }
    ],
    plansTitle: "خطط التخلص الشامل من السموم",
    plansDesc: "اختر برنامجًا لتنظيف وتجديد واستعادة العقل والجسم.",
    plans: [
      {
        title: "الخطة الأساسية",
        price: "$29/شهريًا",
        features: ["نصائح تغذية التخلص من السموم", "إرشاد أسبوعي", "دعم عبر البريد الإلكتروني"]
      },
      {
        title: "الخطة القياسية",
        price: "$59/شهريًا",
        features: ["جميع ميزات الأساسية", "تنظيف بالأعشاب", "متابعة التقدم"]
      },
      {
        title: "الخطة المميزة",
        price: "$99/شهريًا",
        features: ["تدريب التخلص الشامل من السموم", "تقارير التقدم", "دعم أولوية"]
      }
    ],
    ready: "جاهز للتخلص الشامل من السموم؟",
    readyDesc: "ابدأ رحلتك لتنظيف وتجديد واستعادة الجسم والعقل اليوم.",
    contact: "تواصل معنا →"
  },
  he: {
    hero: "ניקוי רעלים הוליסטי",
    cleanse: "נקה, חדש ושקם",
    info: "שיטות טבעיות והוליסטיות לניקוי הגוף, תמיכה בעיכול וקידום בריאות כללית. למד רוטינות ניקוי והרגלים לאורח חיים בריא יותר.",
    tips: [
      "🍋 טיפים לתזונת ניקוי רעלים",
      "🌿 ניקוי טבעי וצמחי",
      "💧 תמיכה בהידרציה והפרשה"
    ],
    start: "התחל ניקוי רעלים",
    servicesTitle: "שירותי ניקוי רעלים הוליסטי",
    servicesDesc: "שיטות ורוטינות טבעיות לניקוי הגוף, שיפור אנרגיה והגברת רווחה כללית.",
    services: [
      { icon: "🍋", title: "תזונת ניקוי רעלים", desc: "תפריטי ניקוי לחיוניות." },
      { icon: "🌿", title: "ניקוי צמחי", desc: "תמיכה בניקוי הגוף באופן טבעי." },
      { icon: "💧", title: "תמיכה בהידרציה", desc: "הגבר ניקוי והפרשה." },
      { icon: "📊", title: "מעקב התקדמות", desc: "עקוב אחרי שיפור הבריאות שלך." }
    ],
    whyTitle: "למה ניקוי רעלים הוליסטי?",
    why: [
      { icon: "🍋", title: "גוף מטוהר", desc: "הסר רעלים ותמוך בבריאות גופנית." },
      { icon: "🌿", title: "אנרגיה מחודשת", desc: "חווה אנרגיה, בהירות וחיוניות מחודשת." },
      { icon: "💧", title: "רווחה מוגברת", desc: "קדם בריאות ארוכת טווח ואיזון הוליסטי." }
    ],
    plansTitle: "תוכניות ניקוי רעלים הוליסטי",
    plansDesc: "בחר תוכנית לניקוי, חידוש ושיקום הגוף והנפש.",
    plans: [
      {
        title: "תוכנית בסיסית",
        price: "$29/חודש",
        features: ["טיפים לתזונת ניקוי רעלים", "הכוונה שבועית", "תמיכה במייל"]
      },
      {
        title: "תוכנית סטנדרטית",
        price: "$59/חודש",
        features: ["כל התכונות הבסיסיות", "ניקוי צמחי", "מעקב התקדמות"]
      },
      {
        title: "תוכנית פרימיום",
        price: "$99/חודש",
        features: ["אימון ניקוי רעלים מלא", "דוחות התקדמות", "תמיכה מועדפת"]
      }
    ],
    ready: "מוכן לניקוי רעלים הוליסטי?",
    readyDesc: "התחל את המסע שלך לניקוי, חידוש ושיקום הגוף והנפש היום.",
    contact: "צור קשר →"
  }
};

const rtlLangs = ["ar", "he"];
const t = (key, lang) => translations[lang]?.[key] || translations.en[key];

export default function HolisticDetox() {
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
            {t("cleanse", language)}
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
            src={detoxImage}
            alt="Holistic Detox"
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
        style={{ backgroundImage: `url(${detoxImage})` }}
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
