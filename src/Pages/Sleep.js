import React, { useEffect, useState } from "react";
import video from '../assets/Services4.mp4';
import { useNavigate } from "react-router-dom";
import sleepImage from "../assets/SO.jpg";

const THEME_KEY = "theme";
const LANGUAGE_KEY = "language";

// Translations for all texts
const translations = {
  en: {
    hero: "Sleep Optimization",
    enhance: "Enhance Sleep Quality & Recovery",
    info: "Evidence-based techniques to improve sleep duration, quality, and restorative rest. Learn habits that help regulate your sleep cycle and support overall wellbeing.",
    tips: [
      "🛌 Sleep hygiene tips",
      "🌙 Relaxation routines",
      "💤 Circadian rhythm optimization"
    ],
    start: "Start Improving Sleep",
    servicesTitle: "Our Sleep Services",
    servicesDesc: "Techniques and routines to help you fall asleep faster, stay asleep longer, and wake up refreshed.",
    services: [
      { icon: "🛌", title: "Sleep Hygiene", desc: "Optimize bedroom environment and habits." },
      { icon: "🌙", title: "Relaxation Techniques", desc: "Guided breathing and meditation." },
      { icon: "💤", title: "Circadian Support", desc: "Align your internal clock naturally." },
      { icon: "📊", title: "Progress Tracking", desc: "Monitor sleep quality improvements." }
    ],
    whyTitle: "Why Sleep Optimization?",
    why: [
      { icon: "🛌", title: "Better Sleep Quality", desc: "Fall asleep faster and enjoy deeper, more restorative rest." },
      { icon: "💤", title: "Enhanced Recovery", desc: "Support muscle repair, mental clarity, and overall recovery overnight." },
      { icon: "🌙", title: "Improved Wellbeing", desc: "Wake up refreshed, energized, and ready for the day." }
    ],
    plansTitle: "Sleep Optimization Plans",
    plansDesc: "Choose a program to enhance sleep, recovery, and overall health.",
    plans: [
      {
        title: "Basic Plan",
        price: "$29/month",
        features: ["Sleep Hygiene Tips", "Weekly Guidance", "Email Support"],
      },
      {
        title: "Standard Plan",
        price: "$59/month",
        features: ["All Basic Features", "Relaxation Coaching", "Sleep Tracking"],
      },
      {
        title: "Premium Plan",
        price: "$99/month",
        features: ["Full Sleep Optimization Coaching", "Progress Reports", "Priority Support"],
      },
    ],
    ready: "Ready to Improve Your Sleep?",
    readyDesc: "Start your journey to better rest, recovery, and overall wellbeing today.",
    contact: "Contact Us →"
  },
  ar: {
    hero: "تحسين النوم",
    enhance: "عزز جودة النوم والتعافي",
    info: "تقنيات مثبتة لتحسين مدة النوم وجودته والراحة التصالحية. تعلم عادات تساعد على تنظيم دورة النوم ودعم الصحة العامة.",
    tips: [
      "🛌 نصائح لنظافة النوم",
      "🌙 روتينات الاسترخاء",
      "💤 تحسين إيقاع الساعة البيولوجية"
    ],
    start: "ابدأ تحسين النوم",
    servicesTitle: "خدمات النوم",
    servicesDesc: "تقنيات وروتينات تساعدك على النوم بسرعة، والبقاء نائمًا لفترة أطول، والاستيقاظ منتعشًا.",
    services: [
      { icon: "🛌", title: "نظافة النوم", desc: "تحسين بيئة غرفة النوم والعادات." },
      { icon: "🌙", title: "تقنيات الاسترخاء", desc: "تمارين التنفس والتأمل الموجهة." },
      { icon: "💤", title: "دعم الساعة البيولوجية", desc: "مزامنة الساعة الداخلية بشكل طبيعي." },
      { icon: "📊", title: "متابعة التقدم", desc: "راقب تحسن جودة النوم." }
    ],
    whyTitle: "لماذا تحسين النوم؟",
    why: [
      { icon: "🛌", title: "جودة نوم أفضل", desc: "نم بسرعة واستمتع براحة أعمق وأكثر تصالحًا." },
      { icon: "💤", title: "تعافي محسّن", desc: "دعم إصلاح العضلات والوضوح الذهني والتعافي العام أثناء النوم." },
      { icon: "🌙", title: "رفاهية محسنة", desc: "استيقظ منتعشًا ونشيطًا وجاهزًا ليومك." }
    ],
    plansTitle: "خطط تحسين النوم",
    plansDesc: "اختر برنامجًا لتعزيز النوم والتعافي والصحة العامة.",
    plans: [
      {
        title: "الخطة الأساسية",
        price: "$29/شهريًا",
        features: ["نصائح لنظافة النوم", "إرشاد أسبوعي", "دعم عبر البريد الإلكتروني"],
      },
      {
        title: "الخطة القياسية",
        price: "$59/شهريًا",
        features: ["جميع ميزات الأساسية", "تدريب الاسترخاء", "متابعة النوم"],
      },
      {
        title: "الخطة المميزة",
        price: "$99/شهريًا",
        features: ["تدريب كامل لتحسين النوم", "تقارير التقدم", "دعم أولوية"],
      },
    ],
    ready: "جاهز لتحسين نومك؟",
    readyDesc: "ابدأ رحلتك نحو راحة وتعافي ورفاهية أفضل اليوم.",
    contact: "تواصل معنا →"
  },
  he: {
    hero: "אופטימיזציית שינה",
    enhance: "שפר את איכות השינה וההתאוששות",
    info: "טכניקות מבוססות מחקר לשיפור משך השינה, איכותה ומנוחה משקמת. למד הרגלים שמסייעים לווסת את מחזור השינה ולתמוך ברווחה כללית.",
    tips: [
      "🛌 טיפים להיגיינת שינה",
      "🌙 רוטינות הרפיה",
      "💤 אופטימיזציה של קצב צירקדי"
    ],
    start: "התחל לשפר את השינה",
    servicesTitle: "שירותי שינה",
    servicesDesc: "טכניקות ורוטינות שיעזרו לך להירדם מהר יותר, לישון עמוק יותר ולהתעורר רענן.",
    services: [
      { icon: "🛌", title: "היגיינת שינה", desc: "שפר את סביבת החדר והרגלי השינה." },
      { icon: "🌙", title: "טכניקות הרפיה", desc: "תרגילי נשימה ומדיטציה מודרכת." },
      { icon: "💤", title: "תמיכה בקצב צירקדי", desc: "סנכרן את השעון הפנימי באופן טבעי." },
      { icon: "📊", title: "מעקב התקדמות", desc: "עקוב אחרי שיפור איכות השינה." }
    ],
    whyTitle: "למה אופטימיזציית שינה?",
    why: [
      { icon: "🛌", title: "איכות שינה טובה יותר", desc: "הירדם מהר יותר ותהנה ממנוחה עמוקה ומשקמת." },
      { icon: "💤", title: "התאוששות מוגברת", desc: "תמוך בתיקון שרירים, בהירות מנטלית והתאוששות כללית במהלך הלילה." },
      { icon: "🌙", title: "רווחה משופרת", desc: "התעורר רענן, מלא אנרגיה ומוכן ליום." }
    ],
    plansTitle: "תוכניות אופטימיזציית שינה",
    plansDesc: "בחר תוכנית לשיפור השינה, ההתאוששות והבריאות הכללית.",
    plans: [
      {
        title: "תוכנית בסיסית",
        price: "$29/חודש",
        features: ["טיפים להיגיינת שינה", "הכוונה שבועית", "תמיכה במייל"],
      },
      {
        title: "תוכנית סטנדרטית",
        price: "$59/חודש",
        features: ["כל תכונות הבסיס", "אימון הרפיה", "מעקב שינה"],
      },
      {
        title: "תוכנית פרימיום",
        price: "$99/חודש",
        features: ["אימון מלא לאופטימיזציית שינה", "דוחות התקדמות", "תמיכה מועדפת"],
      },
    ],
    ready: "מוכן לשפר את השינה שלך?",
    readyDesc: "התחל את המסע שלך למנוחה, התאוששות ורווחה טובה יותר היום.",
    contact: "צור קשר →"
  }
};

const rtlLangs = ["ar", "he"];
const t = (key, lang) => translations[lang]?.[key] || translations.en[key];

export default function SleepOptimization() {
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
            {t("enhance", language)}
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
            src={sleepImage}
            alt={t("hero", language)}
            className="rounded-xl shadow-lg max-h-[500px] w-full object-cover"
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
        style={{ backgroundImage: `url(${sleepImage})` }}
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
