import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import contactVideo from "../assets/Contact.mp4";
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import backgroundImage from "../assets/contactbackgroud.jpg";

const THEME_KEY = "theme";
const LANGUAGE_KEY = "language";

// Translations for all texts
const translations = {
  en: {
    heroTitle: "Contact Us",
    heroDesc: "Have questions? Ready to start your wellness journey? Our team is here to guide and support you.",
    formTitle: "Send Us a Message",
    namePlaceholder: "Your Name",
    emailPlaceholder: "Your Email",
    subjectPlaceholder: "Subject",
    messagePlaceholder: "Your Message",
    submit: "Submit",
    location: "Location",
    locationInfo: "123 Wellness St, Healthy City",
    callUs: "Call Us",
    callInfo: "+123 456 7890",
    email: "Email",
    emailInfo: "contact@wellness.com",
    connect: "Connect With Us",
    newsletterTitle: "Subscribe to Our Newsletter",
    newsletterDesc: "Stay updated with the latest wellness tips, events, and workshops delivered straight to your inbox.",
    subscribe: "Subscribe",
  },
  ar: {
    heroTitle: "تواصل معنا",
    heroDesc: "هل لديك أسئلة؟ جاهز لبدء رحلتك الصحية؟ فريقنا هنا لإرشادك ودعمك.",
    formTitle: "أرسل لنا رسالة",
    namePlaceholder: "اسمك",
    emailPlaceholder: "بريدك الإلكتروني",
    subjectPlaceholder: "الموضوع",
    messagePlaceholder: "رسالتك",
    submit: "إرسال",
    location: "الموقع",
    locationInfo: "123 شارع الصحة، مدينة العافية",
    callUs: "اتصل بنا",
    callInfo: "+123 456 7890",
    email: "البريد الإلكتروني",
    emailInfo: "contact@wellness.com",
    connect: "تواصل معنا",
    newsletterTitle: "اشترك في النشرة البريدية",
    newsletterDesc: "ابقَ على اطلاع بأحدث النصائح الصحية والفعاليات والورش مباشرة إلى بريدك.",
    subscribe: "اشترك",
  },
  he: {
    heroTitle: "צור קשר איתנו",
    heroDesc: "יש לך שאלות? מוכן להתחיל את מסע הבריאות שלך? הצוות שלנו כאן להדריך ולתמוך בך.",
    formTitle: "שלח לנו הודעה",
    namePlaceholder: "השם שלך",
    emailPlaceholder: "האימייל שלך",
    subjectPlaceholder: "נושא",
    messagePlaceholder: "ההודעה שלך",
    submit: "שלח",
    location: "מיקום",
    locationInfo: "123 רחוב הבריאות, עיר הבריאות",
    callUs: "התקשר אלינו",
    callInfo: "+123 456 7890",
    email: "אימייל",
    emailInfo: "contact@wellness.com",
    connect: "התחבר איתנו",
    newsletterTitle: "הירשם לניוזלטר שלנו",
    newsletterDesc: "קבל עדכונים עם טיפים, אירועים וסדנאות ישירות לתיבת הדואר שלך.",
    subscribe: "הירשם",
  },
};

const t = (key, lang) => translations[lang]?.[key] || translations.en[key];
const rtlLangs = ["ar", "he"];

const ContactUs = () => {
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
        "w-full overflow-x-hidden min-h-screen transition-colors duration-500",
        "bg-green-950 text-green-100",
        "bg-green-50 text-green-900"
      )}
    >
      {/* ===== HERO SECTION ===== */}
      <section className="relative h-screen w-full">
        <video
          src={contactVideo}
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className={themedClass(
            "absolute inset-0",
            "bg-green-950 bg-opacity-70",
            "bg-green-900 bg-opacity-50"
          )}
        ></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {t("heroTitle", language)}
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl text-white max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {t("heroDesc", language)}
          </motion.p>
        </div>
      </section>

      {/* ===== CONTACT FORM SECTION ===== */}
      <motion.section
        className={themedClass(
          "w-full py-20 px-4 flex justify-center",
          "bg-green-900",
          "bg-green-100"
        )}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div
          className={themedClass(
            "max-w-4xl w-full shadow-lg rounded-xl p-8",
            "bg-green-950",
            "bg-white"
          )}
        >
          <motion.h2
            className={themedClass(
              "text-3xl font-bold mb-6",
              "text-green-200",
              "text-green-700"
            )}
            whileHover={{ scale: 1.05 }}
          >
            {t("formTitle", language)}
          </motion.h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder={t("namePlaceholder", language)}
              className={themedClass(
                "p-4 border rounded-lg w-full focus:ring-2 transition",
                "border-green-700 focus:ring-green-400 bg-green-900 text-white",
                "border-green-300 focus:ring-green-400 bg-white text-gray-800"
              )}
            />
            <input
              type="email"
              placeholder={t("emailPlaceholder", language)}
              className={themedClass(
                "p-4 border rounded-lg w-full focus:ring-2 transition",
                "border-green-700 focus:ring-green-400 bg-green-900 text-white",
                "border-green-300 focus:ring-green-400 bg-white text-gray-800"
              )}
            />
            <input
              type="text"
              placeholder={t("subjectPlaceholder", language)}
              className={themedClass(
                "p-4 border rounded-lg w-full md:col-span-2 focus:ring-2 transition",
                "border-green-700 focus:ring-green-400 bg-green-900 text-white",
                "border-green-300 focus:ring-green-400 bg-white text-gray-800"
              )}
            />
            <textarea
              placeholder={t("messagePlaceholder", language)}
              rows={5}
              className={themedClass(
                "p-4 border rounded-lg w-full md:col-span-2 focus:ring-2 transition",
                "border-green-700 focus:ring-green-400 bg-green-900 text-white",
                "border-green-300 focus:ring-green-400 bg-white text-gray-800"
              )}
            />
            <motion.button
              type="submit"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              className={themedClass(
                "px-8 py-4 rounded-full font-semibold md:col-span-2 transition-colors",
                "bg-green-700 text-white",
                "bg-green-600 text-white"
              )}
            >
              {t("submit", language)}
            </motion.button>
          </form>
        </div>
      </motion.section>

      {/* ===== CONTACT INFO CARDS ===== */}
      <motion.section
        className={themedClass(
          "w-full py-20 px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center",
          "bg-green-950",
          "bg-green-100"
        )}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {[
          {
            icon: "📍",
            title: t("location", language),
            info: t("locationInfo", language),
          },
          {
            icon: "📞",
            title: t("callUs", language),
            info: t("callInfo", language),
          },
          {
            icon: "✉️",
            title: t("email", language),
            info: t("emailInfo", language),
          },
        ].map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05, y: -5 }}
            className={themedClass(
              "rounded-xl shadow-lg p-8 flex flex-col items-center justify-center transition-all",
              "bg-green-900",
              "bg-white"
            )}
          >
            <div className="text-6xl mb-4">{card.icon}</div>
            <h3
              className={themedClass(
                "text-xl font-bold mb-2",
                "text-green-200",
                "text-green-700"
              )}
            >
              {card.title}
            </h3>
            <p
              className={themedClass(
                "text-lg",
                "text-green-100",
                "text-gray-700"
              )}
            >
              {card.info}
            </p>
          </motion.div>
        ))}
      </motion.section>

      {/* ===== MAP SECTION ===== */}
      <motion.section
        className="w-full h-96 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0193792224686!2d-122.41941548468198!3d37.77492927975995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5e6b8057%3A0xe4eafcdfb6c8cf0b!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1689288888888!5m2!1sen!2sus"
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        ></iframe>
        <div
          className={themedClass(
            "absolute inset-0",
            "bg-green-950 bg-opacity-40",
            "bg-green-900 bg-opacity-30"
          )}
        ></div>
      </motion.section>

      {/* ===== SOCIAL MEDIA SECTION ===== */}
      <motion.section
        className={themedClass(
          "relative w-full py-28 px-4 flex flex-col items-center justify-center overflow-hidden",
          "bg-green-900",
          "bg-green-100"
        )}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div
          className={themedClass(
            "absolute inset-0 opacity-30",
            "bg-green-950",
            "bg-green-100"
          )}
        ></div>
        <h2
          className={themedClass(
            "text-4xl md:text-5xl font-bold mb-16 z-10 relative",
            "text-green-200",
            "text-green-700"
          )}
        >
          {t("connect", language)}
        </h2>
        <div className="relative z-10 flex flex-wrap justify-center gap-12">
          {[
            {
              icon: <FaInstagram />,
              href: "https://instagram.com",
              color: "#27ae60",
            },
            {
              icon: <FaFacebookF />,
              href: "https://facebook.com",
              color: "#27ae60",
            },
            {
              icon: <FaTwitter />,
              href: "https://twitter.com",
              color: "#27ae60",
            },
            {
              icon: <FaLinkedinIn />,
              href: "https://linkedin.com",
              color: "#27ae60",
            },
          ].map((item, idx) => (
            <motion.a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: item.color }}
              whileTap={{ scale: 0.95 }}
              className={themedClass(
                "text-5xl md:text-6xl transition-colors duration-300",
                "text-green-200 hover:text-white",
                "text-green-700 hover:text-green-900"
              )}
            >
              {item.icon}
            </motion.a>
          ))}
        </div>
      </motion.section>

      {/* ===== NEWSLETTER SECTION ===== */}
      <motion.section
        className={themedClass(
          "w-full py-20 px-4 text-center relative",
          "text-white",
          "text-green-900"
        )}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className={themedClass(
            "absolute inset-0",
            "bg-green-950 bg-opacity-60",
            "bg-green-900 bg-opacity-50"
          )}
        ></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2
            className={themedClass(
              "text-3xl md:text-4xl font-bold mb-6",
              "text-white",
              "text-green-900"
            )}
          >
            {t("newsletterTitle", language)}
          </h2>
          <p
            className={themedClass(
              "max-w-2xl mx-auto mb-6",
              "text-green-100",
              "text-green-900"
            )}
          >
            {t("newsletterDesc", language)}
          </p>
          <div className="flex justify-center gap-4 flex-col sm:flex-row max-w-xl mx-auto">
            <input
              type="email"
              placeholder={t("emailPlaceholder", language)}
              className={themedClass(
                "p-4 rounded-full w-full sm:flex-1 focus:outline-none",
                "text-gray-800",
                "text-gray-800"
              )}
            />
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              className={themedClass(
                "px-6 py-4 rounded-full font-semibold mt-4 sm:mt-0",
                "bg-white text-green-600",
                "bg-green-700 text-white"
              )}
            >
              {t("subscribe", language)}
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ContactUs;
