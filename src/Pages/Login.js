import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const THEME_KEY = "theme";
const LANGUAGE_KEY = "language";

const translations = {
  en: {
    login: "Login",
    signup: "Sign Up",
    email: "Email",
    password: "Password",
    loginBtn: "Login",
    signupBtn: "Sign Up",
    noAccount: "Don't have an account? Sign up",
    haveAccount: "Already have an account? Login",
    firstName: "First Name",
    lastName: "Last Name",
    invalid: "Invalid email or password.",
    exists: "User already exists.",
    success: "Sign up successful! Please login.",
    english: "English",
    arabic: "Arabic",
    hebrew: "Hebrew",
    features: [
      {
        title: "Personalized Experience",
        desc: "Your dashboard and recommendations adapt to your goals."
      },
      {
        title: "Multi-language Support",
        desc: "Switch between English, Arabic, and Hebrew instantly."
      },
      {
        title: "Light & Dark Mode",
        desc: "Enjoy a beautiful interface in any lighting."
      }
    ]
  },
  ar: {
    login: "تسجيل الدخول",
    signup: "إنشاء حساب",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    loginBtn: "تسجيل الدخول",
    signupBtn: "إنشاء حساب",
    noAccount: "ليس لديك حساب؟ أنشئ حسابًا",
    haveAccount: "لديك حساب بالفعل؟ تسجيل الدخول",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    invalid: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    exists: "المستخدم موجود بالفعل.",
    success: "تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول.",
    english: "الإنجليزية",
    arabic: "العربية",
    hebrew: "العبرية",
    features: [
      {
        title: "تجربة مخصصة",
        desc: "لوحتك وتوصياتك تتكيف مع أهدافك."
      },
      {
        title: "دعم متعدد اللغات",
        desc: "بدّل بين الإنجليزية والعربية والعبرية فورًا."
      },
      {
        title: "الوضع الليلي والنهاري",
        desc: "واجهة جميلة في جميع الأوقات."
      }
    ]
  },
  he: {
    login: "התחברות",
    signup: "הרשמה",
    email: "אימייל",
    password: "סיסמה",
    loginBtn: "התחבר",
    signupBtn: "הרשם",
    noAccount: "אין לך חשבון? הירשם",
    haveAccount: "כבר יש לך חשבון? התחבר",
    firstName: "שם פרטי",
    lastName: "שם משפחה",
    invalid: "אימייל או סיסמה שגויים.",
    exists: "המשתמש כבר קיים.",
    success: "נרשמת בהצלחה! אנא התחבר.",
    english: "אנגלית",
    arabic: "ערבית",
    hebrew: "עברית",
    features: [
      {
        title: "חוויה מותאמת אישית",
        desc: "הדשבורד וההמלצות מותאמים למטרות שלך."
      },
      {
        title: "תמיכה רב-לשונית",
        desc: "החלף בין אנגלית, ערבית ועברית מיד."
      },
      {
        title: "מצב כהה ובהיר",
        desc: "ממשק יפהפה בכל תאורה."
      }
    ]
  }
};

const t = (key, lang) => translations[lang]?.[key] || translations.en[key];

const rtlLangs = ["ar", "he"];

const Login = () => {
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

  // Sync theme and language with localStorage and document
  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.setAttribute("data-theme", theme);
    window.dispatchEvent(new Event("theme-changed"));
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language);
    document.documentElement.setAttribute("dir", rtlLangs.includes(language) ? "rtl" : "ltr");
    window.dispatchEvent(new Event("language-changed"));
  }, [language]);

  const themedClass = (base, dark, light) =>
    `${base} ${theme === "dark" ? dark : light}`;

  const dir = rtlLangs.includes(language) ? "rtl" : "ltr";

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  // Feature carousel state
  const [featureIdx, setFeatureIdx] = useState(0);
  const features = t("features", language);

  useEffect(() => {
    const timer = setInterval(() => {
      setFeatureIdx((prev) => (prev + 1) % features.length);
    }, 3500);
    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, [features, language]);

  const handleLoginChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleSignUpChange = (e) =>
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (
      loginData.email === "admin@enkonix.in" &&
      loginData.password === "admin123"
    ) {
      setError("");
      localStorage.setItem("loggedInUserEmail", loginData.email);
      navigate("/Admindashboard");
      return;
    }

    const user = users.find(
      (user) =>
        user.email === loginData.email &&
        user.password === loginData.password
    );

    if (user) {
      setError("");
      localStorage.setItem("loggedInUserEmail", JSON.stringify(user));
      if (user.firstName) localStorage.setItem("firstname", user.firstName);
      if (user.lastName) localStorage.setItem("lastname", user.lastName);
      navigate("/home1");
    } else {
      setError(t("invalid", language));
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((user) => user.email === signUpData.email)) {
      setError(t("exists", language));
      return;
    }

    users.push(signUpData);
    localStorage.setItem("users", JSON.stringify(users));
    setError("");
    alert(t("success", language));
    setSignUpData({ firstName: "", lastName: "", email: "", password: "" });
    setIsLogin(true);
  };

  // --- THEME & LANGUAGE TOGGLE BUTTONS ---
  const themeToggleBtn = (
    <button
      className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors duration-200 absolute top-4 right-4 z-10 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-green-100 border-green-300 hover:bg-green-200'}`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      type="button"
    >
      {theme === "dark" ? (
        <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-8.66h-1M4.34 12H3m15.07 4.93l-.71-.71M6.34 6.34l-.71-.71m12.02 12.02l-.71-.71M6.34 17.66l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );

  const languageToggleBtn = (
    <div className="absolute top-4 left-4 z-10 flex items-center">
      <label htmlFor="language-select" className={`mr-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>🌐</label>
      <select
        id="language-select"
        value={language}
        onChange={e => setLanguage(e.target.value)}
        className={`text-sm rounded-md border px-2 py-1 focus:outline-none ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
      >
        <option value="en">{t("english", language)}</option>
        <option value="ar">{t("arabic", language)}</option>
        <option value="he">{t("hebrew", language)}</option>
      </select>
    </div>
  );

  // Animated background style (light: animated gradient, dark: solid black)
  const animatedBgLight =
    "fixed inset-0 z-0 animate-gradient bg-gradient-to-br from-green-200 via-blue-200 to-purple-200";
  const animatedBgDark =
    "fixed inset-0 z-0 bg-black";

  // Add keyframes for gradient animation (for light mode)
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes gradientMove {
        0% { background-position: 0% 50% }
        50% { background-position: 100% 50% }
        100% { background-position: 0% 50% }
      }
      .animate-gradient {
        background-size: 200% 200%;
        animation: gradientMove 8s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  // Fade-in animation for login box
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div dir={dir} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ fontFamily: "Arial, sans-serif" }}>
      <div className={theme === "dark" ? animatedBgDark : animatedBgLight} />
      {themeToggleBtn}
      {languageToggleBtn}
      <div
        className={`
          w-full max-w-md p-8 rounded-xl shadow-lg relative z-10
          ${theme === "dark" ? "bg-[#1a1a1a] text-green-100" : "bg-white text-green-900"}
          ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          transition-all duration-700
        `}
        style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)" }}
      >
        <h2
          className={themedClass(
            "text-3xl font-bold mb-6 text-center",
            "text-green-200",
            "text-green-700"
          )}
        >
          {isLogin ? t("login", language) : t("signup", language)}
        </h2>

        {isLogin ? (
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <input
              className={themedClass(
                "p-3 rounded border focus:outline-none transition",
                "bg-[#222] border-green-700 text-green-100 focus:ring-2 focus:ring-green-400",
                "bg-green-50 border-green-400 text-green-900 focus:ring-2 focus:ring-green-700"
              )}
              type="email"
              name="email"
              placeholder={t("email", language)}
              value={loginData.email}
              onChange={handleLoginChange}
              required
              autoFocus
            />
            <input
              className={themedClass(
                "p-3 rounded border focus:outline-none transition",
                "bg-[#222] border-green-700 text-green-100 focus:ring-2 focus:ring-green-400",
                "bg-green-50 border-green-400 text-green-900 focus:ring-2 focus:ring-green-700"
              )}
              type="password"
              name="password"
              placeholder={t("password", language)}
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
            <button
              type="submit"
              className={themedClass(
                "p-3 rounded font-semibold mt-2 transition",
                "bg-green-700 text-white hover:bg-green-600",
                "bg-green-600 text-white hover:bg-green-700"
              )}
            >
              {t("loginBtn", language)}
            </button>
            <p
              className={themedClass(
                "mt-2 cursor-pointer text-center underline",
                "text-green-200 hover:text-green-400",
                "text-green-700 hover:text-green-900"
              )}
              onClick={() => {
                setError("");
                setIsLogin(false);
              }}
            >
              {t("noAccount", language)}
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignUpSubmit} className="flex flex-col gap-4">
            <input
              className={themedClass(
                "p-3 rounded border focus:outline-none transition",
                "bg-[#222] border-green-700 text-green-100 focus:ring-2 focus:ring-green-400",
                "bg-green-50 border-green-400 text-green-900 focus:ring-2 focus:ring-green-700"
              )}
              type="text"
              name="firstName"
              placeholder={t("firstName", language)}
              value={signUpData.firstName}
              onChange={handleSignUpChange}
              required
            />
            <input
              className={themedClass(
                "p-3 rounded border focus:outline-none transition",
                "bg-[#222] border-green-700 text-green-100 focus:ring-2 focus:ring-green-400",
                "bg-green-50 border-green-400 text-green-900 focus:ring-2 focus:ring-green-700"
              )}
              type="text"
              name="lastName"
              placeholder={t("lastName", language)}
              value={signUpData.lastName}
              onChange={handleSignUpChange}
              required
            />
            <input
              className={themedClass(
                "p-3 rounded border focus:outline-none transition",
                "bg-[#222] border-green-700 text-green-100 focus:ring-2 focus:ring-green-400",
                "bg-green-50 border-green-400 text-green-900 focus:ring-2 focus:ring-green-700"
              )}
              type="email"
              name="email"
              placeholder={t("email", language)}
              value={signUpData.email}
              onChange={handleSignUpChange}
              required
            />
            <input
              className={themedClass(
                "p-3 rounded border focus:outline-none transition",
                "bg-[#222] border-green-700 text-green-100 focus:ring-2 focus:ring-green-400",
                "bg-green-50 border-green-400 text-green-900 focus:ring-2 focus:ring-green-700"
              )}
              type="password"
              name="password"
              placeholder={t("password", language)}
              value={signUpData.password}
              onChange={handleSignUpChange}
              required
            />
            <button
              type="submit"
              className={themedClass(
                "p-3 rounded font-semibold mt-2 transition",
                "bg-green-700 text-white hover:bg-green-600",
                "bg-green-600 text-white hover:bg-green-700"
              )}
            >
              {t("signupBtn", language)}
            </button>
            <p
              className={themedClass(
                "mt-2 cursor-pointer text-center underline",
                "text-green-200 hover:text-green-400",
                "text-green-700 hover:text-green-900"
              )}
              onClick={() => {
                setError("");
                setIsLogin(true);
              }}
            >
              {t("haveAccount", language)}
            </p>
          </form>
        )}

        {error && (
          <p
            className={themedClass(
              "mt-4 text-center font-semibold",
              "text-red-400",
              "text-red-600"
            )}
          >
            {error}
          </p>
        )}
      </div>

      {/* Animated Feature Carousel */}
      <div className="relative z-10 mt-10 w-full flex justify-center">
        <div
          className={`
            max-w-md w-full px-6 py-4 rounded-lg shadow-md
            bg-white/80 dark:bg-gray-900/80
            flex flex-col items-center
            transition-all duration-700
            animate-fadeIn
          `}
          style={{
            minHeight: 90,
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        >
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-green-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l2 2 4-4" />
            </svg>
            <div>
              <div className="font-bold text-lg text-green-700 dark:text-green-200 transition-all duration-500">
                {features[featureIdx].title}
              </div>
              <div className="text-gray-700 dark:text-gray-200 text-sm mt-1 transition-all duration-500">
                {features[featureIdx].desc}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;