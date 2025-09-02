import React, { useEffect, useState } from "react";
import video from '../assets/Services3.mp4';
import { useNavigate } from "react-router-dom";
import movementImage from "../assets/MM.jpg";

const THEME_KEY = "theme";
const LANGUAGE_KEY = "language";

// Translations for all texts
const translations = {
  en: {
    hero: "Mindful Movement",
    move: "Move with Awareness & Balance",
    info: "Mindful movement practices to enhance strength, flexibility, and mental clarity. Learn gentle techniques that connect body and mind for optimal wellbeing.",
    tips: [
      "🧘‍♀️ Guided stretching routines",
      "🏃 Gentle mobility exercises",
      "🌿 Mind-body coordination tips"
    ],
    start: "Start Moving Mindfully",
    servicesTitle: "Our Movement Services",
    servicesDesc: "Structured routines and mindful exercises for your body and mind.",
    services: [
      { icon: "🧘", title: "Yoga Flow", desc: "Gentle sequences to improve flexibility." },
      { icon: "🤸", title: "Mobility Training", desc: "Increase range of motion safely." },
      { icon: "🏃‍♂️", title: "Breath & Movement", desc: "Synchronize breathing with motion." },
      { icon: "📊", title: "Progress Tracking", desc: "Monitor improvements & milestones." }
    ],
    whyTitle: "Why Mindful Movement?",
    why: [
      { icon: "💪", title: "Strength & Flexibility", desc: "Improve posture, core strength, and joint mobility." },
      { icon: "🧘‍♂️", title: "Mind-Body Awareness", desc: "Connect with your body and reduce stress through mindful movement." },
      { icon: "🌿", title: "Overall Wellbeing", desc: "Support energy, balance, and mental clarity daily." }
    ],
    plansTitle: "Mindful Movement Plans",
    plansDesc: "Choose a program to enhance strength, flexibility, and mindfulness.",
    plans: [
      {
        title: "Beginner Plan",
        price: "$39/month",
        features: ["Basic Mobility Routines", "Weekly Tips", "Email Support"],
      },
      {
        title: "Intermediate Plan",
        price: "$69/month",
        features: ["All Beginner Features", "1-on-1 Guidance", "Mindful Practices"],
      },
      {
        title: "Advanced Plan",
        price: "$119/month",
        features: ["Daily Movement Coaching", "Progress Tracking", "Priority Support"],
      },
    ],
    ready: "Ready to Move Mindfully?",
    readyDesc: "Start your journey to better strength, flexibility, and mental clarity today.",
    contact: "Contact Us →"
  },
  ar: {
    hero: "الحركة الواعية",
    move: "تحرك بوعي وتوازن",
    info: "ممارسات الحركة الواعية لتعزيز القوة والمرونة والوضوح الذهني. تعلم تقنيات لطيفة تربط الجسم والعقل لتحقيق الرفاهية المثلى.",
    tips: [
      "🧘‍♀️ تمارين التمدد الموجهة",
      "🏃 تمارين الحركة اللطيفة",
      "🌿 نصائح تنسيق العقل والجسم"
    ],
    start: "ابدأ الحركة الواعية",
    servicesTitle: "خدمات الحركة الواعية",
    servicesDesc: "روتينات منظمة وتمارين واعية لجسمك وعقلك.",
    services: [
      { icon: "🧘", title: "تدفق اليوغا", desc: "تسلسلات لطيفة لتحسين المرونة." },
      { icon: "🤸", title: "تدريب الحركة", desc: "زيادة نطاق الحركة بأمان." },
      { icon: "🏃‍♂️", title: "التنفس والحركة", desc: "مزامنة التنفس مع الحركة." },
      { icon: "📊", title: "متابعة التقدم", desc: "راقب التحسينات والإنجازات." }
    ],
    whyTitle: "لماذا الحركة الواعية؟",
    why: [
      { icon: "💪", title: "القوة والمرونة", desc: "تحسين الوقفة وقوة الجسم ومرونة المفاصل." },
      { icon: "🧘‍♂️", title: "وعي العقل والجسم", desc: "اتصل بجسمك وقلل التوتر من خلال الحركة الواعية." },
      { icon: "🌿", title: "الرفاهية العامة", desc: "ادعم الطاقة والتوازن والوضوح الذهني يوميًا." }
    ],
    plansTitle: "خطط الحركة الواعية",
    plansDesc: "اختر برنامجًا لتعزيز القوة والمرونة والوعي.",
    plans: [
      {
        title: "الخطة المبتدئة",
        price: "$39/شهريًا",
        features: ["روتينات الحركة الأساسية", "نصائح أسبوعية", "دعم عبر البريد الإلكتروني"],
      },
      {
        title: "الخطة المتوسطة",
        price: "$69/شهريًا",
        features: ["جميع ميزات المبتدئ", "إرشاد فردي", "ممارسات واعية"],
      },
      {
        title: "الخطة المتقدمة",
        price: "$119/شهريًا",
        features: ["تدريب يومي على الحركة", "متابعة التقدم", "دعم أولوية"],
      },
    ],
    ready: "جاهز للحركة الواعية؟",
    readyDesc: "ابدأ رحلتك نحو قوة ومرونة ووضوح ذهني أفضل اليوم.",
    contact: "تواصل معنا →"
  },
  he: {
    hero: "תנועה מודעת",
    move: "הזז את הגוף במודעות ובאיזון",
    info: "תרגולי תנועה מודעת לשיפור כוח, גמישות ובהירות מנטלית. למד טכניקות עדינות שמחברות גוף ונפש לרווחה מיטבית.",
    tips: [
      "🧘‍♀️ מתיחות מודרכות",
      "🏃 תרגילי מוביליות עדינים",
      "🌿 טיפים לתיאום גוף-נפש"
    ],
    start: "התחל תנועה מודעת",
    servicesTitle: "שירותי תנועה מודעת",
    servicesDesc: "רוטינות מובנות ותרגילים מודעים לגוף ולנפש.",
    services: [
      { icon: "🧘", title: "יוגה פלואו", desc: "רצפים עדינים לשיפור הגמישות." },
      { icon: "🤸", title: "אימון מוביליות", desc: "הגדל טווח תנועה בבטחה." },
      { icon: "🏃‍♂️", title: "נשימה ותנועה", desc: "סנכרן נשימה עם תנועה." },
      { icon: "📊", title: "מעקב התקדמות", desc: "עקוב אחרי שיפורים והישגים." }
    ],
    whyTitle: "למה תנועה מודעת?",
    why: [
      { icon: "💪", title: "כוח וגמישות", desc: "שפר יציבה, כוח ליבה וגמישות מפרקים." },
      { icon: "🧘‍♂️", title: "מודעות גוף-נפש", desc: "התחבר לגוף והפחת לחץ דרך תנועה מודעת." },
      { icon: "🌿", title: "רווחה כללית", desc: "תמוך באנרגיה, איזון ובהירות מנטלית יום-יום." }
    ],
    plansTitle: "תוכניות תנועה מודעת",
    plansDesc: "בחר תוכנית לשיפור כוח, גמישות ומודעות.",
    plans: [
      {
        title: "תוכנית מתחילים",
        price: "$39/חודש",
        features: ["רוטינות מוביליות בסיסיות", "טיפים שבועיים", "תמיכה במייל"],
      },
      {
        title: "תוכנית בינונית",
        price: "$69/חודש",
        features: ["כל תכונות המתחילים", "הכוונה אישית", "תרגולים מודעים"],
      },
      {
        title: "תוכנית מתקדמת",
        price: "$119/חודש",
        features: ["אימון תנועה יומי", "מעקב התקדמות", "תמיכה מועדפת"],
      },
    ],
    ready: "מוכן לתנועה מודעת?",
    readyDesc: "התחל את המסע שלך לכוח, גמישות ובהירות מנטלית טובה יותר היום.",
    contact: "צור קשר →"
  }
};

const rtlLangs = ["ar", "he"];
const t = (key, lang) => translations[lang]?.[key] || translations.en[key];

export default function MindfulMovement() {
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
            {t("move", language)}
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
            src={movementImage}
            alt="Mindful Movement"
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
        style={{ backgroundImage: `url(${movementImage})` }}
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
