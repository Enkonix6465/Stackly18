import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const THEME_KEY = "theme";
const LANGUAGE_KEY = "language";

// Translations for all texts
const translations = {
  en: {
    userTable: "User Data Table",
    name: "Name",
    email: "Email",
    loginDate: "Login Date/Time",
    loginGraph: "Login Activity Graph",
    loginGraphTitle: "User Logins Per Day",
    signupTrends: "User Signup Trends",
    signupGraphTitle: "User Signup Trends",
    activeUsers: "Active Users",
    activeUsersDesc: "Logged in last 30 days",
    inactiveUsers: "Inactive Users",
    inactiveUsersDesc: "Not logged in last 30 days",
    recentLogin: "Recent Login Activity",
    signupGrowth: "Signup Growth This Week",
    compared: "compared to previous week",
    noUsers: "No users found.",
  },
  ar: {
    userTable: "جدول بيانات المستخدمين",
    name: "الاسم",
    email: "البريد الإلكتروني",
    loginDate: "تاريخ/وقت تسجيل الدخول",
    loginGraph: "رسم بياني لنشاط تسجيل الدخول",
    loginGraphTitle: "تسجيلات الدخول اليومية",
    signupTrends: "اتجاهات تسجيل المستخدمين",
    signupGraphTitle: "اتجاهات تسجيل المستخدمين",
    activeUsers: "المستخدمون النشطون",
    activeUsersDesc: "سجلوا الدخول خلال آخر 30 يومًا",
    inactiveUsers: "المستخدمون غير النشطين",
    inactiveUsersDesc: "لم يسجلوا الدخول خلال آخر 30 يومًا",
    recentLogin: "نشاط تسجيل الدخول الأخير",
    signupGrowth: "نمو التسجيل هذا الأسبوع",
    compared: "مقارنة بالأسبوع السابق",
    noUsers: "لا يوجد مستخدمون.",
  },
  he: {
    userTable: "טבלת נתוני משתמשים",
    name: "שם",
    email: "אימייל",
    loginDate: "תאריך/שעת כניסה",
    loginGraph: "גרף פעילות כניסה",
    loginGraphTitle: "כניסות משתמשים ביום",
    signupTrends: "מגמות הרשמת משתמשים",
    signupGraphTitle: "מגמות הרשמת משתמשים",
    activeUsers: "משתמשים פעילים",
    activeUsersDesc: "התחברו ב-30 הימים האחרונים",
    inactiveUsers: "משתמשים לא פעילים",
    inactiveUsersDesc: "לא התחברו ב-30 הימים האחרונים",
    recentLogin: "פעילות כניסה אחרונה",
    signupGrowth: "צמיחת הרשמות השבוע",
    compared: "בהשוואה לשבוע הקודם",
    noUsers: "לא נמצאו משתמשים.",
  },
};

const t = (key, lang) => translations[lang]?.[key] || translations.en[key];
const rtlLangs = ["ar", "he"];

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const fadeInUp = {
  animation: "fadeInUp 0.8s ease forwards",
  opacity: 0,
  transform: "translateY(20px)",
};

const styles = {
  keyframes: `
    @keyframes fadeInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    tr:hover {
      background-color: #004d00 !important;
      color: white !important;
      transition: background-color 0.3s, color 0.3s;
      cursor: pointer;
    }
    .card-hover:hover {
      transform: translateY(-6px);
      box-shadow: 0 10px 20px rgba(0,77,0,0.6);
      transition: transform 0.3s, box-shadow 0.3s;
      cursor: pointer;
    }
    .activity-item:hover {
      background-color: #e6ffe6;
      transition: background-color 0.3s;
      cursor: default;
    }
  `,
};

const AdminDashboard = () => {
  // Theme state and effect (no toggle button here)
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

  const themedClass = (base, dark, light) =>
    `${base} ${theme === "dark" ? dark : light}`;

  const dir = rtlLangs.includes(language) ? "rtl" : "ltr";

  const [allUserData, setAllUserData] = useState([]);
  const [loginStats, setLoginStats] = useState({ labels: [], data: [] });
  const [signupStats, setSignupStats] = useState({ labels: [], data: [] });
  const [userStatus, setUserStatus] = useState({ activeUsers: 0, inactiveUsers: 0 });
  const [recentLogins, setRecentLogins] = useState([]);
  const [signupGrowth, setSignupGrowth] = useState({ percent: 0, isGrowth: true });

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const logins = JSON.parse(localStorage.getItem("userLogins")) || {};

    const usersWithLogin = users.map((u) => ({
      name: `${u.firstName} ${u.lastName}`,
      email: u.email,
      loginTime: logins[u.email] || "N/A",
      signupDate: u.signupDate || "N/A",
    }));
    setAllUserData(usersWithLogin);

    const counts = {};
    const timestamps = [];
    Object.entries(logins).forEach(([email, ts]) => {
      if (ts && ts !== "N/A") {
        const dt = new Date(ts).toLocaleDateString();
        counts[dt] = (counts[dt] || 0) + 1;
        timestamps.push({ email, dateTime: ts });
      }
    });
    const sortedDates = Object.keys(counts).sort((a, b) => new Date(a) - new Date(b));
    setLoginStats({ labels: sortedDates, data: sortedDates.map((d) => counts[d]) });

    const latest = timestamps.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)).slice(0, 5);
    setRecentLogins(latest);

    const sCounts = {};
    users.forEach((u) => {
      if (u.signupDate) {
        const ds = new Date(u.signupDate).toLocaleDateString();
        sCounts[ds] = (sCounts[ds] || 0) + 1;
      }
    });
    const sDates = Object.keys(sCounts).sort((a, b) => new Date(a) - new Date(b));
    const sData = sDates.map((d) => sCounts[d]);
    setSignupStats({ labels: sDates, data: sData });

    const totalRecentWeek = sData.slice(-7).reduce((a, b) => a + b, 0);
    const totalPrevWeek = sData.slice(-14, -7).reduce((a, b) => a + b, 0);
    const growth = totalPrevWeek ? ((totalRecentWeek - totalPrevWeek) / totalPrevWeek) * 100 : totalRecentWeek > 0 ? 100 : 0;
    setSignupGrowth({ percent: Math.abs(growth.toFixed(1)), isGrowth: growth >= 0 });

    const now = Date.now();
    const activeTh = 30 * 24 * 60 * 60 * 1000;
    let act = 0, inact = 0;
    usersWithLogin.forEach((u) => {
      if (u.loginTime !== "N/A") {
        const diff = now - new Date(u.loginTime).getTime();
        diff <= activeTh ? act++ : inact++;
      } else inact++;
    });
    setUserStatus({ activeUsers: act, inactiveUsers: inact });
  }, []);

  if (!allUserData.length) {
    return (
      <div dir={dir} className={themedClass(
        "min-h-screen flex items-center justify-center",
        "bg-gray-900 text-green-100",
        "bg-green-50 text-green-900"
      )}>
        <p style={{ fontSize: 18, textAlign: "center" }}>{t("noUsers", language)}</p>
      </div>
    );
  }

  const loginData = {
    labels: loginStats.labels,
    datasets: [{ label: t("loginGraphTitle", language), data: loginStats.data, backgroundColor: "rgba(0,77,0,0.8)", borderRadius: 4 }],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: theme === "dark" ? "#e6ffe6" : "#004d00" }, position: "top" },
      title: { display: true, font: { size: 22, weight: "bold" }, color: theme === "dark" ? "#e6ffe6" : "#004d00" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { ticks: { color: theme === "dark" ? "#e6ffe6" : "#004d00", maxRotation: 90, minRotation: 45 }, grid: { color: theme === "dark" ? "#22304a" : "#d0f0d0" } },
      y: { ticks: { color: theme === "dark" ? "#e6ffe6" : "#004d00" }, grid: { color: theme === "dark" ? "#22304a" : "#d0f0d0" }, beginAtZero: true },
    },
  };
  const signupData = {
    labels: signupStats.labels,
    datasets: [{ label: t("signupGraphTitle", language), data: signupStats.data, fill: false, borderColor: "rgba(0,77,0,0.9)", backgroundColor: "rgba(0,77,0,0.5)", tension: 0.3, pointRadius: 6 }],
  };

  return (
    <>
      <style>{styles.keyframes}</style>
      <div dir={dir} className={themedClass(
        "min-h-screen py-10 px-2",
        "bg-gray-900 text-green-100",
        "bg-green-50 text-green-900"
      )}>
        <div className={themedClass(
          "max-w-4xl md:max-w-5xl mx-auto p-4 md:p-8 rounded-xl shadow-lg",
          "bg-[#1a1a1a]",
          "bg-white"
        )}>

          {/* User Data Table */}
          <section className={themedClass(
            "mb-12 p-4 md:p-8 rounded-xl shadow",
            "bg-[#22304a]",
            "bg-green-100"
          )} style={fadeInUp}>
            <h2 className={themedClass(
              "mb-6 font-bold text-2xl",
              "text-green-200",
              "text-green-700"
            )}>{t("userTable", language)}</h2>
            <div style={{ overflowX: "auto" }}>
              <table className={themedClass(
                "w-full border-collapse min-w-[600px] text-base",
                "text-green-100",
                "text-green-900"
              )}>
                <thead>
                  <tr className={themedClass(
                    "",
                    "bg-green-800 text-white",
                    "bg-green-600 text-white"
                  )}>
                    <th className="p-3 text-left">{t("name", language)}</th>
                    <th className="p-3 text-left">{t("email", language)}</th>
                    <th className="p-3 text-left">{t("loginDate", language)}</th>
                  </tr>
                </thead>
                <tbody>
                  {allUserData.map((u, idx) => (
                    <tr key={idx} className="table-row-hover" style={{ borderBottom: "1px solid #cbd5e1", backgroundColor: idx % 2 === 0 ? (theme === "dark" ? "#22304a" : "#f5fff5") : (theme === "dark" ? "#1E2A38" : "#e6ffe6") }}>
                      <td className="p-3">{u.name}</td>
                      <td className="p-3">{u.email}</td>
                      <td className="p-3">{u.loginTime !== "N/A" ? new Date(u.loginTime).toLocaleString() : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Login Chart */}
          <section className={themedClass(
            "mb-12 p-4 md:p-8 rounded-xl shadow",
            "bg-[#1E2A38]",
            "bg-green-50"
          )} style={fadeInUp}>
            <h2 className={themedClass(
              "mb-6 font-bold text-2xl",
              "text-green-200",
              "text-green-700"
            )}>{t("loginGraph", language)}</h2>
            <Bar data={loginData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: t("loginGraphTitle", language) } } }} />
          </section>

          {/* Signup Chart */}
          <section className={themedClass(
            "mb-12 p-4 md:p-8 rounded-xl shadow",
            "bg-[#22304a]",
            "bg-green-100"
          )} style={fadeInUp}>
            <h2 className={themedClass(
              "mb-6 font-bold text-2xl",
              "text-green-200",
              "text-green-700"
            )}>{t("signupTrends", language)}</h2>
            <Line data={signupData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { ...chartOptions.plugins.title, text: t("signupGraphTitle", language) } } }} />
          </section>

          {/* Active / Inactive Users */}
          <section className={themedClass(
            "flex flex-col md:flex-row gap-6 mb-10 p-4 md:p-8 rounded-xl shadow",
            "bg-[#1E2A38]",
            "bg-green-50"
          )} style={fadeInUp}>
            <div className={themedClass(
              "flex-1 card-hover p-6 rounded-xl text-center shadow",
              "bg-green-800 text-white",
              "bg-green-600 text-white"
            )}>
              <h3 className="mb-2 font-bold">{t("activeUsers", language)}</h3>
              <p className="text-3xl font-bold">{userStatus.activeUsers}</p>
              <small>{t("activeUsersDesc", language)}</small>
            </div>
            <div className={themedClass(
              "flex-1 card-hover p-6 rounded-xl text-center shadow",
              "bg-green-900 text-green-100",
              "bg-green-200 text-green-900"
            )}>
              <h3 className="mb-2 font-bold">{t("inactiveUsers", language)}</h3>
              <p className="text-3xl font-bold">{userStatus.inactiveUsers}</p>
              <small>{t("inactiveUsersDesc", language)}</small>
            </div>
          </section>

          {/* Recent Login Activity */}
          <section className={themedClass(
            "mb-12 p-4 md:p-8 rounded-xl shadow",
            "bg-[#22304a]",
            "bg-green-100"
          )} style={fadeInUp}>
            <h2 className={themedClass(
              "mb-4 font-bold text-2xl",
              "text-green-200",
              "text-green-700"
            )}>{t("recentLogin", language)}</h2>
            <div style={{ maxHeight: 200, overflowY: "auto" }}>
              {recentLogins.map((entry, idx) => (
                <div key={idx} className="activity-item flex justify-between p-3 border-b border-green-200">
                  <span>{entry.email}</span>
                  <span>{new Date(entry.dateTime).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Signup Growth */}
          <section className={themedClass(
            "card-hover p-6 rounded-xl text-center shadow mb-12",
            signupGrowth.isGrowth
              ? "bg-green-100 text-green-900"
              : "bg-red-100 text-red-700",
            signupGrowth.isGrowth
              ? "bg-green-50 text-green-900"
              : "bg-red-50 text-red-700"
          )} style={fadeInUp}>
            <h3 className="mb-2 font-bold">{t("signupGrowth", language)}</h3>
            <p className="text-3xl font-bold">
              {signupGrowth.isGrowth ? "▲" : "▼"} {signupGrowth.percent}%
            </p>
            <small>{t("compared", language)}</small>
          </section>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
