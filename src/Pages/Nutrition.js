import React, { useEffect, useState } from "react";
import vedio from '../assets/Nutrition.mp4';
import { useNavigate } from "react-router-dom";
import nutritionImage from "../assets/BG1.jpg";

const THEME_KEY = "theme";
const LANGUAGE_KEY = "language";

// Translations for all texts
const translations = {
  en: {
    hero: "Personalized Nutrition",
    fuel: "Fuel Your Body & Mind",
    info: "Personalized nutrition plans designed to optimize your health, energy, and wellbeing. Learn how to eat smarter, balance your meals, and improve performance with tailored guidance.",
    tips: [
      "🥗 Customized meal plans",
      "🍎 Nutrient optimization",
      "💧 Hydration & lifestyle strategies"
    ],
    start: "Start Your Nutrition Plan",
    servicesTitle: "Our Nutrition Services",
    servicesDesc: "Personalized strategies for balanced diets and optimal health.",
    services: [
      { icon: "🥦", title: "Meal Planning", desc: "Tailored meals for your body and goals." },
      { icon: "🍓", title: "Nutrient Guidance", desc: "Optimizing vitamins, minerals & macros." },
      { icon: "🏃‍♂️", title: "Lifestyle Support", desc: "Healthy habits for long-term results." },
      { icon: "📊", title: "Progress Tracking", desc: "Monitor improvements & adapt plans." }
    ],
    whyTitle: "Why Personalized Nutrition?",
    why: [
      { icon: "🥗", title: "Better Energy", desc: "Fuel your body efficiently for daily performance." },
      { icon: "🧠", title: "Mental Focus", desc: "Support cognitive clarity and focus with balanced nutrition." },
      { icon: "💪", title: "Stronger Immunity", desc: "Enhance resilience with nutrient-rich eating habits." }
    ],
    plansTitle: "Nutrition Plans",
    plansDesc: "Select a plan to optimize your health and lifestyle.",
    plans: [
      {
        title: "Starter Plan",
        price: "$49/month",
        features: ["Custom Meal Plan", "Weekly Guidance", "Email Support"],
      },
      {
        title: "Balanced Plan",
        price: "$79/month",
        features: ["All Starter Features", "1-on-1 Coaching", "Lifestyle Tips"],
      },
      {
        title: "Premium Plan",
        price: "$129/month",
        features: ["Full Nutrition Coaching", "Daily Meal Tracking", "Priority Support"],
      },
    ],
    ready: "Ready to Transform Your Nutrition?",
    readyDesc: "Start your journey to better health with personalized guidance and support.",
    contact: "Contact Us →"
  },
  ar: {
    hero: "التغذية الشخصية",
    fuel: "غذِ جسمك وعقلك",
    info: "خطط تغذية شخصية مصممة لتحسين صحتك وطاقة جسمك ورفاهيتك. تعلم كيف تتناول الطعام بذكاء، وتوازن وجباتك، وتحسن الأداء بإرشاد مخصص.",
    tips: [
      "🥗 خطط وجبات مخصصة",
      "🍎 تحسين العناصر الغذائية",
      "💧 استراتيجيات الترطيب ونمط الحياة"
    ],
    start: "ابدأ خطة التغذية",
    servicesTitle: "خدمات التغذية",
    servicesDesc: "استراتيجيات شخصية لحمية متوازنة وصحة مثالية.",
    services: [
      { icon: "🥦", title: "تخطيط الوجبات", desc: "وجبات مخصصة لجسمك وأهدافك." },
      { icon: "🍓", title: "إرشاد العناصر الغذائية", desc: "تحسين الفيتامينات والمعادن والمغذيات." },
      { icon: "🏃‍♂️", title: "دعم نمط الحياة", desc: "عادات صحية لنتائج طويلة الأمد." },
      { icon: "📊", title: "متابعة التقدم", desc: "راقب التحسينات وعدل الخطط." }
    ],
    whyTitle: "لماذا التغذية الشخصية؟",
    why: [
      { icon: "🥗", title: "طاقة أفضل", desc: "غذِ جسمك بكفاءة لأداء يومي." },
      { icon: "🧠", title: "تركيز ذهني", desc: "ادعم الوضوح والتركيز الذهني بتغذية متوازنة." },
      { icon: "💪", title: "مناعة أقوى", desc: "عزز المناعة بعادات غذائية غنية بالمغذيات." }
    ],
    plansTitle: "خطط التغذية",
    plansDesc: "اختر خطة لتحسين صحتك ونمط حياتك.",
    plans: [
      {
        title: "الخطة المبتدئة",
        price: "$49/شهريًا",
        features: ["خطة وجبات مخصصة", "إرشاد أسبوعي", "دعم عبر البريد الإلكتروني"],
      },
      {
        title: "الخطة المتوازنة",
        price: "$79/شهريًا",
        features: ["جميع ميزات المبتدئة", "تدريب فردي", "نصائح نمط الحياة"],
      },
      {
        title: "الخطة المميزة",
        price: "$129/شهريًا",
        features: ["تدريب تغذية كامل", "متابعة يومية للوجبات", "دعم أولوية"],
      },
    ],
    ready: "جاهز لتحويل تغذيتك؟",
    readyDesc: "ابدأ رحلتك نحو صحة أفضل بإرشاد ودعم شخصي.",
    contact: "تواصل معنا →"
  },
  he: {
    hero: "תזונה מותאמת אישית",
    fuel: "הזן את הגוף והנפש",
    info: "תוכניות תזונה מותאמות אישית לשיפור הבריאות, האנרגיה והרווחה שלך. למד לאכול חכם, לאזן ארוחות ולשפר ביצועים עם ליווי אישי.",
    tips: [
      "🥗 תוכניות ארוחות מותאמות",
      "🍎 אופטימיזציה של רכיבים תזונתיים",
      "💧 אסטרטגיות הידרציה ואורח חיים"
    ],
    start: "התחל תוכנית תזונה",
    servicesTitle: "שירותי תזונה",
    servicesDesc: "אסטרטגיות מותאמות לתזונה מאוזנת ובריאות מיטבית.",
    services: [
      { icon: "🥦", title: "תכנון ארוחות", desc: "ארוחות מותאמות לגוף ולמטרות שלך." },
      { icon: "🍓", title: "הכוונה תזונתית", desc: "אופטימיזציה של ויטמינים, מינרלים ומקרו-נוטריינטים." },
      { icon: "🏃‍♂️", title: "תמיכה באורח חיים", desc: "הרגלים בריאים לתוצאות ארוכות טווח." },
      { icon: "📊", title: "מעקב התקדמות", desc: "עקוב אחרי שיפורים והתאם תוכניות." }
    ],
    whyTitle: "למה תזונה מותאמת אישית?",
    why: [
      { icon: "🥗", title: "אנרגיה טובה יותר", desc: "הזן את הגוף ביעילות לביצועים יומיים." },
      { icon: "🧠", title: "מיקוד מנטלי", desc: "תמוך בבהירות ומיקוד מנטלי עם תזונה מאוזנת." },
      { icon: "💪", title: "חסינות חזקה יותר", desc: "חזק את החסינות עם הרגלי אכילה עשירים." }
    ],
    plansTitle: "תוכניות תזונה",
    plansDesc: "בחר תוכנית לשיפור הבריאות ואורח החיים שלך.",
    plans: [
      {
        title: "תוכנית מתחילים",
        price: "$49/חודש",
        features: ["תוכנית ארוחות מותאמת", "הכוונה שבועית", "תמיכה במייל"],
      },
      {
        title: "תוכנית מאוזנת",
        price: "$79/חודש",
        features: ["כל תכונות המתחילים", "אימון אישי", "טיפים לאורח חיים"],
      },
      {
        title: "תוכנית פרימיום",
        price: "$129/חודש",
        features: ["אימון תזונה מלא", "מעקב יומי לארוחות", "תמיכה מועדפת"],
      },
    ],
    ready: "מוכן לשנות את התזונה שלך?",
    readyDesc: "התחל את המסע שלך לבריאות טובה יותר עם ליווי ותמיכה אישית.",
    contact: "צור קשר →"
  }
};

const rtlLangs = ["ar", "he"];
const t = (key, lang) => translations[lang]?.[key] || translations.en[key];

export default function PersonalizedNutrition() {
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
          <source src={vedio} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 flex items-center justify-center w-full h-full bg-black/60">
          <h1 className="text-white text-5xl md:text-6xl font-bold animate-fadeIn">
            {t("hero", language)}
          </h1>
        </div>
      </section>

      {/* ===== Info Section ===== */}
      <section className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">
        {/* Content */}
        <div className="flex-1">
          <h2 className={themedClass(
            "text-3xl font-bold mb-4",
            "text-green-200",
            "text-green-700"
          )}>
            {t("fuel", language)}
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

        {/* Image */}
        <div className="flex-1">
          <img
            src={nutritionImage}
            alt={t("hero", language)}
            className="rounded-xl shadow-lg"
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
      <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden">
        <img
          src={nutritionImage}
          alt={t("hero", language)}
          className="absolute top-0 left-0 w-full h-full object-cover brightness-50"
        />
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
