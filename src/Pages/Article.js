import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import video from "../assets/Services4.mp4";
import morningImage from "../assets/5.jpg";
import foodImage from "../assets/N.jpg";

const THEME_KEY = "theme";
const LANGUAGE_KEY = "language";

// Translations for all texts
const translations = {
  en: {
    heroTitle: "Latest Articles",
    heroDesc: "Explore tips for better mornings, mindful eating, and a healthier lifestyle.",
    article1Title: "5 Steps to a Healthier Morning Routine",
    article1Desc: "Start your day with energy, focus, and positivity. Build habits like early hydration, mindful breathing, and light exercise to set the tone for success. A well-structured morning routine not only enhances productivity but also reduces stress and anxiety throughout the day. Incorporating small, intentional actions in the morning can boost mental clarity and physical well-being. Remember, consistency is the key to creating a lifestyle that supports long-term health and happiness.",
    article1List: [
      "Drink a glass of water immediately after waking up",
      "Spend 5 minutes on deep breathing or meditation",
      "Do light stretching or yoga",
      "Eat a nutrient-rich breakfast",
      "Plan your top 3 priorities for the day",
      "Limit your screen time during the first 30 minutes of the day",
      "Write down one thing you’re grateful for to start with positivity",
      "Step outside for fresh air and a few minutes of sunlight"
    ],
    article2Title: "Transform Your Relationship with Food",
    article2Desc: "Eating mindfully can help you build a healthier relationship with food. Focus on portion control, savoring flavors, and balancing nutrition without guilt. Mindful eating allows you to enjoy every bite while preventing overeating and emotional stress related to food choices. It encourages awareness of your body's signals, so you can eat when hungry and stop when satisfied. By slowing down and appreciating your meals, you can turn eating into a nourishing experience rather than a rushed habit.",
    article2List: [
      "Eat slowly and chew thoroughly",
      "Listen to your body's hunger and fullness cues",
      "Choose whole, unprocessed foods",
      "Avoid distractions while eating",
      "Practice gratitude for every meal",
      "Stay hydrated before and during meals",
      "Plan balanced meals ahead of time to avoid impulsive choices",
      "Limit emotional eating by identifying triggers"
    ],
    tipsTitle: "Quick Healthy Lifestyle Tips",
    tips: [
      {
        icon: "🥗",
        title: "Balanced Meals",
        desc: "Include protein, carbs, and healthy fats in every meal for sustained energy and better health.",
      },
      {
        icon: "💧",
        title: "Stay Hydrated",
        desc: "Drink at least 2–3 liters of water daily to maintain hydration and support your body's functions.",
      },
      {
        icon: "🏃",
        title: "Move Daily",
        desc: "Even a simple 20-minute walk can improve your mood, boost energy, and keep you active.",
      },
      {
        icon: "🧘",
        title: "Mindful Moments",
        desc: "Spend 5–10 minutes daily on mindfulness or meditation to reduce stress and improve focus.",
      },
      {
        icon: "😴",
        title: "Rest Well",
        desc: "Get 7–8 hours of quality sleep every night to recharge your body and mind.",
      },
    ],
  },
  ar: {
    heroTitle: "أحدث المقالات",
    heroDesc: "استكشف نصائح لصباح أفضل، وتناول الطعام بوعي، ونمط حياة أكثر صحة.",
    article1Title: "5 خطوات لروتين صباحي أكثر صحة",
    article1Desc: "ابدأ يومك بالطاقة والتركيز والإيجابية. ابنِ عادات مثل الترطيب المبكر، والتنفس الواعي، والتمارين الخفيفة لتهيئة يومك للنجاح. الروتين الصباحي المنظم لا يعزز الإنتاجية فقط، بل يقلل أيضًا من التوتر والقلق طوال اليوم. دمج إجراءات صغيرة ومقصودة في الصباح يمكن أن يعزز الوضوح الذهني والصحة الجسدية. تذكر أن الاستمرارية هي المفتاح لخلق نمط حياة يدعم الصحة والسعادة على المدى الطويل.",
    article1List: [
      "اشرب كوب ماء فور الاستيقاظ",
      "اقضِ 5 دقائق في التنفس العميق أو التأمل",
      "قم بتمارين التمدد أو اليوغا الخفيفة",
      "تناول إفطار غني بالعناصر الغذائية",
      "خطط لأهم 3 أولويات في يومك",
      "قلل وقت الشاشة في أول 30 دقيقة من اليوم",
      "اكتب شيئًا واحدًا تشعر بالامتنان له لبدء يومك بإيجابية",
      "اخرج لاستنشاق الهواء النقي وبعض أشعة الشمس"
    ],
    article2Title: "حوّل علاقتك مع الطعام",
    article2Desc: "تناول الطعام بوعي يمكن أن يساعدك في بناء علاقة صحية مع الطعام. ركز على التحكم في الكميات، وتذوق النكهات، وتحقيق التوازن الغذائي دون الشعور بالذنب. الأكل الواعي يسمح لك بالاستمتاع بكل لقمة ويمنع الإفراط في تناول الطعام والتوتر العاطفي المرتبط بالاختيارات الغذائية. يشجعك على الانتباه لإشارات جسمك، فتأكل عند الجوع وتتوقف عند الشبع. من خلال التباطؤ وتقدير وجباتك، يمكنك تحويل الأكل إلى تجربة مغذية بدلاً من عادة متسرعة.",
    article2List: [
      "تناول الطعام ببطء وامضغ جيدًا",
      "استمع لإشارات الجوع والشبع في جسمك",
      "اختر الأطعمة الكاملة وغير المصنعة",
      "تجنب المشتتات أثناء تناول الطعام",
      "مارس الامتنان لكل وجبة",
      "حافظ على الترطيب قبل وأثناء الوجبات",
      "خطط لوجبات متوازنة مسبقًا لتجنب الخيارات العشوائية",
      "قلل الأكل العاطفي من خلال تحديد المحفزات"
    ],
    tipsTitle: "نصائح سريعة لنمط حياة صحي",
    tips: [
      {
        icon: "🥗",
        title: "وجبات متوازنة",
        desc: "أضف البروتين والكربوهيدرات والدهون الصحية لكل وجبة لطاقة وصحة أفضل.",
      },
      {
        icon: "💧",
        title: "حافظ على الترطيب",
        desc: "اشرب 2-3 لترات ماء يوميًا للحفاظ على الترطيب ودعم وظائف الجسم.",
      },
      {
        icon: "🏃",
        title: "تحرك يوميًا",
        desc: "حتى المشي البسيط لمدة 20 دقيقة يمكن أن يحسن المزاج ويزيد النشاط.",
      },
      {
        icon: "🧘",
        title: "لحظات تأمل",
        desc: "خصص 5-10 دقائق يوميًا للتأمل أو اليقظة لتقليل التوتر وتحسين التركيز.",
      },
      {
        icon: "😴",
        title: "نم جيدًا",
        desc: "احصل على 7-8 ساعات نوم جيد كل ليلة لإعادة شحن الجسم والعقل.",
      },
    ],
  },
  he: {
    heroTitle: "מאמרים אחרונים",
    heroDesc: "גלה טיפים לבוקר טוב יותר, אכילה מודעת ואורח חיים בריא יותר.",
    article1Title: "5 צעדים לשגרת בוקר בריאה יותר",
    article1Desc: "התחל את היום באנרגיה, מיקוד וחיוביות. בנה הרגלים כמו שתייה מוקדמת, נשימה מודעת ופעילות גופנית קלה כדי להתחיל את היום בהצלחה. שגרת בוקר מסודרת לא רק משפרת את הפרודוקטיביות אלא גם מפחיתה לחץ וחרדה לאורך היום. שילוב פעולות קטנות ומכוונות בבוקר יכול לשפר את הבהירות המנטלית והבריאות הגופנית. זכור, התמדה היא המפתח ליצירת אורח חיים בריא ומאושר לטווח ארוך.",
    article1List: [
      "שתה כוס מים מיד לאחר ההתעוררות",
      "השקע 5 דקות בנשימה עמוקה או מדיטציה",
      "בצע מתיחות קלות או יוגה",
      "אכול ארוחת בוקר עשירה בערכים תזונתיים",
      "תכנן את 3 המשימות החשובות שלך ליום",
      "הגבל זמן מסך ב-30 הדקות הראשונות של היום",
      "כתוב דבר אחד שאתה מודה עליו כדי להתחיל בחיוביות",
      "צא החוצה לאוויר צח וכמה דקות של שמש"
    ],
    article2Title: "שנה את היחס שלך לאוכל",
    article2Desc: "אכילה מודעת יכולה לעזור לך לבנות יחס בריא לאוכל. התמקד בשליטה בכמויות, ליהנות מהטעמים ולשמור על איזון תזונתי ללא רגשות אשמה. אכילה מודעת מאפשרת ליהנות מכל ביס ומונעת אכילת יתר ולחץ רגשי הקשור לבחירות מזון. היא מעודדת מודעות לאותות הגוף, כך שתאכל כשתהיה רעב ותפסיק כשתהיה שבע. על ידי האטה והערכה של הארוחות, תוכל להפוך את האכילה לחוויה מזינה ולא להרגל ממהר.",
    article2List: [
      "אכול לאט ולעס היטב",
      "הקש לאותות רעב ושובע של הגוף",
      "בחר מזון מלא ולא מעובד",
      "הימנע מהסחות דעת בזמן האכילה",
      "תרגל תודה על כל ארוחה",
      "שמור על שתייה מספקת לפני ובמהלך הארוחות",
      "תכנן ארוחות מאוזנות מראש כדי להימנע מבחירות אימפולסיביות",
      "הגבל אכילה רגשית על ידי זיהוי טריגרים"
    ],
    tipsTitle: "טיפים מהירים לאורח חיים בריא",
    tips: [
      {
        icon: "🥗",
        title: "ארוחות מאוזנות",
        desc: "שלב חלבון, פחמימות ושומנים בריאים בכל ארוחה לאנרגיה ובריאות טובה.",
      },
      {
        icon: "💧",
        title: "הישאר רווי",
        desc: "שתה לפחות 2–3 ליטר מים ביום לשמירה על רוויה ותפקוד הגוף.",
      },
      {
        icon: "🏃",
        title: "תנוע כל יום",
        desc: "אפילו הליכה פשוטה של 20 דקות יכולה לשפר מצב רוח, להעלות אנרגיה ולשמור על פעילות.",
      },
      {
        icon: "🧘",
        title: "רגעי מודעות",
        desc: "הקדש 5–10 דקות ביום למיינדפולנס או מדיטציה להפחתת לחץ ושיפור ריכוז.",
      },
      {
        icon: "😴",
        title: "שינה טובה",
        desc: "קבל 7–8 שעות שינה איכותית בכל לילה כדי להטעין את הגוף והנפש.",
      },
    ],
  },
};

const t = (key, lang) => translations[lang]?.[key] || translations.en[key];
const rtlLangs = ["ar", "he"];

export default function ArticlesPage() {
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

  return (
    <div
      dir={dir}
      className={themedClass(
        "transition-colors duration-500",
        "bg-gray-900 text-gray-100",
        "bg-white text-gray-800"
      )}
    >
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative z-10 text-center text-white px-6 max-w-3xl animate-fadeIn">
          <h2 className="text-5xl font-bold mb-6 animate-slideUp">
            {t("heroTitle", language)}
          </h2>
          <p className="text-xl mb-8 animate-fadeIn delay-200">
            {t("heroDesc", language)}
          </p>
        </div>
      </section>

      {/* Article 1: Morning Routine */}
      <section
        id="articles"
        className="flex flex-col md:flex-row items-center gap-10 px-6 py-16 max-w-6xl mx-auto"
      >
        <div className="flex-1">
          <img
            src={morningImage}
            alt="Morning Routine"
            className="rounded-xl shadow-lg w-full h-[550px] object-cover"
          />
        </div>
        <div className="flex-1">
          <h3
            className={themedClass(
              "text-3xl font-bold mb-4",
              "text-green-300",
              "text-green-700"
            )}
          >
            {t("article1Title", language)}
          </h3>
          <p className="mb-6 leading-relaxed text-justify">
            {t("article1Desc", language)}
          </p>
          <ul className="list-disc ml-6 mb-6 space-y-2">
            {t("article1List", language).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Article 2: Mindful Eating */}
      <section className="flex flex-col md:flex-row-reverse items-center gap-10 px-6 py-16 max-w-6xl mx-auto">
        <div className="flex-1">
          <img
            src={foodImage}
            alt="Mindful Eating"
            className="rounded-xl shadow-lg w-full h-auto object-cover"
          />
        </div>
        <div className="flex-1">
          <h3
            className={themedClass(
              "text-3xl font-bold mb-4",
              "text-green-300",
              "text-green-700"
            )}
          >
            {t("article2Title", language)}
          </h3>
          <p className="mb-6 leading-relaxed text-justify">
            {t("article2Desc", language)}
          </p>
          <ul className="list-disc ml-6 mb-6 space-y-2">
            {t("article2List", language).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Healthy Lifestyle Tips */}
      <section
        className={themedClass(
          "py-16 px-4 text-center w-full",
          "bg-[#1E2A38]",
          "bg-green-50"
        )}
      >
        <h2
          className={themedClass(
            "text-4xl font-bold mb-12",
            "text-green-300",
            "text-green-700"
          )}
        >
          {t("tipsTitle", language)}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
          {t("tips", language).map((tip, i) => (
            <div key={i} className="group flip-card">
              <div className="flip-card-inner group-hover:rotate-y-180">
                {/* Front Side */}
                <div
                  className={themedClass(
                    "flip-card-front flex flex-col items-center justify-center p-6",
                    "bg-[#22304a] text-green-300",
                    "bg-white text-green-700"
                  )}
                >
                  <span className="text-6xl mb-4">{tip.icon}</span>
                  <h3 className="text-xl font-bold">{tip.title}</h3>
                </div>
                {/* Back Side */}
                <div
                  className={themedClass(
                    "flip-card-back flex items-center justify-center p-6",
                    "bg-green-700 text-white",
                    "bg-green-100 text-gray-800"
                  )}
                >
                  <p className="text-lg leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
