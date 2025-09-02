import React, { useEffect, useState } from "react";
import video from '../assets/Services5.mp4';
import { useNavigate } from "react-router-dom";
import stressImage from "../assets/SR.jpg";

const THEME_KEY = "theme";
const LANGUAGE_KEY = "language";

// Translations for all texts
const translations = {
  en: {
    hero: "Stress Resilience",
    build: "Build Calm & Resilience",
    info: "Proven techniques to manage stress, enhance emotional resilience, and maintain mental clarity. Learn mindful practices to stay calm under pressure.",
    tips: [
      "🧘 Mindfulness exercises",
      "🌿 Relaxation techniques",
      "💡 Cognitive coping strategies"
    ],
    start: "Start Building Resilience",
    servicesTitle: "Our Stress Resilience Services",
    servicesDesc: "Techniques and routines to help you reduce stress, stay calm, and strengthen mental resilience.",
    services: [
      { icon: "🧘", title: "Mindfulness", desc: "Guided meditation to calm the mind." },
      { icon: "🌿", title: "Relaxation", desc: "Breathing and body relaxation exercises." },
      { icon: "💡", title: "Coping Skills", desc: "Practical strategies for stressful situations." },
      { icon: "📊", title: "Progress Tracking", desc: "Monitor stress levels and improvements." }
    ],
    whyTitle: "Why Stress Resilience?",
    why: [
      { icon: "🧘", title: "Calm Mind", desc: "Reduce anxiety and maintain mental clarity throughout the day." },
      { icon: "💪", title: "Emotional Resilience", desc: "Strengthen your ability to cope with stress and challenges." },
      { icon: "🌿", title: "Overall Wellbeing", desc: "Support mental, emotional, and physical health daily." }
    ],
    plansTitle: "Stress Resilience Plans",
    plansDesc: "Choose a program to manage stress, strengthen resilience, and improve overall wellbeing.",
    plans: [
      {
        title: "Basic Plan",
        price: "$29/month",
        features: ["Mindfulness Exercises", "Weekly Guidance", "Email Support"],
      },
      {
        title: "Standard Plan",
        price: "$59/month",
        features: ["All Basic Features", "Relaxation Coaching", "Progress Tracking"],
      },
      {
        title: "Premium Plan",
        price: "$99/month",
        features: ["Full Resilience Coaching", "Progress Reports", "Priority Support"],
      },
    ],
    ready: "Ready to Build Stress Resilience?",
    readyDesc: "Start your journey to calm, clarity, and stronger emotional resilience today.",
    contact: "Contact Us →"
  },
  ar: {
    hero: "المرونة في مواجهة الضغط",
    build: "ابنِ الهدوء والمرونة",
    info: "تقنيات مثبتة لإدارة الضغط، وتعزيز المرونة العاطفية، والحفاظ على صفاء الذهن. تعلم ممارسات واعية للبقاء هادئًا تحت الضغط.",
    tips: [
      "🧘 تمارين اليقظة الذهنية",
      "🌿 تقنيات الاسترخاء",
      "💡 استراتيجيات المواجهة المعرفية"
    ],
    start: "ابدأ بناء المرونة",
    servicesTitle: "خدمات المرونة في مواجهة الضغط",
    servicesDesc: "تقنيات وروتينات تساعدك على تقليل الضغط، والبقاء هادئًا، وتقوية المرونة الذهنية.",
    services: [
      { icon: "🧘", title: "اليقظة الذهنية", desc: "تأمل موجه لتهدئة العقل." },
      { icon: "🌿", title: "الاسترخاء", desc: "تمارين التنفس واسترخاء الجسم." },
      { icon: "💡", title: "مهارات المواجهة", desc: "استراتيجيات عملية للمواقف المجهدة." },
      { icon: "📊", title: "متابعة التقدم", desc: "راقب مستويات الضغط والتحسن." }
    ],
    whyTitle: "لماذا المرونة في مواجهة الضغط؟",
    why: [
      { icon: "🧘", title: "عقل هادئ", desc: "قلل القلق وحافظ على صفاء الذهن طوال اليوم." },
      { icon: "💪", title: "مرونة عاطفية", desc: "عزز قدرتك على مواجهة الضغط والتحديات." },
      { icon: "🌿", title: "رفاهية شاملة", desc: "ادعم الصحة الذهنية والعاطفية والجسدية يوميًا." }
    ],
    plansTitle: "خطط المرونة في مواجهة الضغط",
    plansDesc: "اختر برنامجًا لإدارة الضغط، وتقوية المرونة، وتحسين الرفاهية العامة.",
    plans: [
      {
        title: "الخطة الأساسية",
        price: "$29/شهريًا",
        features: ["تمارين اليقظة الذهنية", "إرشاد أسبوعي", "دعم عبر البريد الإلكتروني"],
      },
      {
        title: "الخطة القياسية",
        price: "$59/شهريًا",
        features: ["جميع ميزات الأساسية", "تدريب الاسترخاء", "متابعة التقدم"],
      },
      {
        title: "الخطة المميزة",
        price: "$99/شهريًا",
        features: ["تدريب كامل للمرونة", "تقارير التقدم", "دعم أولوية"],
      },
    ],
    ready: "جاهز لبناء المرونة في مواجهة الضغط؟",
    readyDesc: "ابدأ رحلتك نحو الهدوء والوضوح والمرونة العاطفية الأقوى اليوم.",
    contact: "تواصل معنا →"
  },
  he: {
    hero: "חוסן נפשי מול לחץ",
    build: "בנה רוגע וחוסן",
    info: "טכניקות מוכחות לניהול לחץ, חיזוק חוסן רגשי ושמירה על בהירות מנטלית. למד תרגולים מודעים לשמירה על רוגע תחת לחץ.",
    tips: [
      "🧘 תרגילי מיינדפולנס",
      "🌿 טכניקות הרפיה",
      "💡 אסטרטגיות התמודדות קוגניטיביות"
    ],
    start: "התחל לבנות חוסן",
    servicesTitle: "שירותי חוסן נפשי מול לחץ",
    servicesDesc: "טכניקות ורוטינות שיעזרו לך להפחית לחץ, להישאר רגוע ולחזק חוסן מנטלי.",
    services: [
      { icon: "🧘", title: "מיינדפולנס", desc: "מדיטציה מודרכת להרגעת המחשבות." },
      { icon: "🌿", title: "הרפיה", desc: "תרגילי נשימה והרפיית הגוף." },
      { icon: "💡", title: "מיומנויות התמודדות", desc: "אסטרטגיות מעשיות למצבים מלחיצים." },
      { icon: "📊", title: "מעקב התקדמות", desc: "עקוב אחרי רמות הלחץ והשיפור." }
    ],
    whyTitle: "למה חוסן נפשי מול לחץ?",
    why: [
      { icon: "🧘", title: "מחשבה רגועה", desc: "הפחת חרדה ושמור על בהירות מנטלית לאורך היום." },
      { icon: "💪", title: "חוסן רגשי", desc: "חזק את היכולת להתמודד עם לחץ ואתגרים." },
      { icon: "🌿", title: "רווחה כללית", desc: "תמוך בבריאות נפשית, רגשית וגופנית יום-יום." }
    ],
    plansTitle: "תוכניות חוסן נפשי מול לחץ",
    plansDesc: "בחר תוכנית לניהול לחץ, חיזוק חוסן ושיפור רווחה כללית.",
    plans: [
      {
        title: "תוכנית בסיסית",
        price: "$29/חודש",
        features: ["תרגילי מיינדפולנס", "הכוונה שבועית", "תמיכה במייל"],
      },
      {
        title: "תוכנית סטנדרטית",
        price: "$59/חודש",
        features: ["כל תכונות הבסיס", "אימון הרפיה", "מעקב התקדמות"],
      },
      {
        title: "תוכנית פרימיום",
        price: "$99/חודש",
        features: ["אימון חוסן מלא", "דוחות התקדמות", "תמיכה מועדפת"],
      },
    ],
    ready: "מוכן לבנות חוסן מול לחץ?",
    readyDesc: "התחל את המסע שלך לרוגע, בהירות וחוסן רגשי חזק יותר היום.",
    contact: "צור קשר →"
  }
};

const rtlLangs = ["ar", "he"];
const t = (key, lang) => translations[lang]?.[key] || translations.en[key];

export default function StressResilience() {
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
            {t("build", language)}
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
            src={stressImage}
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
        style={{ backgroundImage: `url(${stressImage})` }}
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
