import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { FaLeaf, FaHeartbeat, FaUsers, FaAward, FaHandsHelping } from 'react-icons/fa';
import { GiMeditation, GiFruitBowl, GiRunningShoe } from 'react-icons/gi';
import image from  '../assets/team1.jpg';
import image2 from  '../assets/team2.jpg';
import image3 from  '../assets/team3.jpg';
import vedio from '../assets/about.mp4';
import backgroundImage from '../assets/B2.jpg';
import image4 from '../assets/test1.jpg';
import image5 from '../assets/test2.jpg';
import image6 from '../assets/test3.jpg';

const THEME_KEY = 'theme';

// Translations and language helpers
const TRANSLATIONS = {
  en: {
    heroTitle: 'About Our Wellness Journey',
    heroSubtitle: 'Where science meets compassion to create transformative health experiences',
    heroServices: 'Our Services',
    heroContact: 'Contact Us',
    storyHeading: 'Our Story',
    storyParagraph: 'Founded in 2008, Vitality Wellness began as a small clinic with a big vision: to redefine holistic health by blending ancient wisdom with modern science. What started as a passion project between three health practitioners has grown into a thriving wellness center serving thousands each year, yet we\'ve never lost our personal touch. Over the years, we have expanded our team, built specialized programs, and created a nurturing environment where every individual feels valued. From personalized wellness plans to community workshops, our journey has always been about inspiring transformation. Today, we stand as a trusted hub for those seeking balance, healing, and empowerment — proving that true wellness is not a destination but a lifelong journey.',
    storyCta1: 'View Our Services',
    storyCta2: 'Contact Us',
    philosophyHeading: 'Our Philosophy',
    philosophyParagraph: 'We believe true wellness comes from addressing the whole person – body, mind, and spirit – with personalized, evidence-based care. Our philosophy is rooted in prevention, empowerment, and holistic healing practices that honor your individuality',
    philosophyCard1Title: 'Whole-Person Care',
    philosophyCard1Desc: 'We look beyond symptoms to address root causes and create sustainable health.',
    philosophyCard2Title: 'Prevention First',
    philosophyCard2Desc: 'Our focus is on building health rather than just fighting disease.',
    philosophyCard3Title: 'Empowerment',
    philosophyCard3Desc: 'We equip you with knowledge and tools for lifelong wellbeing.',
    numbersHeading: 'By The Numbers',
    numbersSubtitle: 'Our impact in the wellness community speaks for itself',
    stat1: 'Happy Clients',
    stat2: 'Years Experience',
    stat3: 'Expert Practitioners',
    stat4: 'Natural Methods',
    teamHeading: 'Meet The Team',
    teamSubtitle: 'Our diverse team of experts brings together decades of experience across multiple healing disciplines.',
    team1Name: 'Dr. Deepak Chopra',
    team1Role: 'Integrative Physician',
    team1Hover: 'Specializes in functional medicine and nutrition-based healing',
    team2Name: 'Dr. Andrew Weil',
    team2Role: 'Lead Physical Therapist',
    team2Hover: 'Expert in movement therapy and pain management',
    team3Name: 'Dr. Mark Hyman',
    team3Role: 'Mindfulness Director',
    team3Hover: 'Developed our acclaimed stress reduction programs',
    testimonialsHeading: 'In Their Words',
    testimonialsSubtitle: 'Hear from those who\'ve experienced the Vitality difference. Our clients share their transformative journeys, improved health, and holistic wellness stories that reflect our commitment to mind-body harmony.',
    testimonial1Name: 'Sarah Johnson',
    testimonial1Role: 'Yoga Practitioner',
    testimonial1Quote: 'Vitality Wellness transformed my approach to health. Their holistic methods helped me find balance in both body and mind.',
    testimonial2Name: 'Michael Chen',
    testimonial2Role: 'Fitness Enthusiast',
    testimonial2Quote: 'The personalized nutrition plan was a game-changer for my energy levels and overall performance.',
    testimonial3Name: 'Dr. Emily Rodriguez',
    testimonial3Role: 'Medical Professional',
    testimonial3Quote: 'As a physician, I appreciate their evidence-based yet compassionate approach to wellness.',
    ctaHeading: 'Begin Your Wellness Journey',
    ctaParagraph: 'Ready to experience the Vitality difference? We\'re here to guide you every step of the way.',
    ctaBtn1: 'Book a Consultation',
    ctaBtn2: 'Explore Programs'
  },
  ar: {
    heroTitle: 'رحلتنا نحو العافية',
    heroSubtitle: 'حيث يلتقي العلم بالتعاطف لخلق تجارب صحية مُحوِّلة',
    heroServices: 'خدماتنا',
    heroContact: 'اتصل بنا',
    storyHeading: 'قصتنا',
    storyParagraph: 'تأسست Vitality Wellness في عام 2008 كعيادة صغيرة برؤية كبيرة: إعادة تعريف الصحة الشاملة من خلال مزج الحكمة القديمة بالعلم الحديث. ما بدأ كمشروع شغوف بين ثلاثة ممارسين للصحة أصبح مركز عافية مزدهرًا يخدم الآلاف سنويًا، دون أن نفقد لمستنا الشخصية. على مر السنين، قمنا بتوسيع فريقنا وبناء برامج متخصصة وخلق بيئة داعمة يشعر فيها كل فرد بالتقدير. من خطط العافية الشخصية إلى ورش العمل المجتمعية، كانت رحلتنا دائمًا حول إلهام التحول. اليوم، نقف كمركز موثوق به للباحثين عن التوازن والشفاء والتمكين — مما يثبت أن العافية الحقيقية ليست وجهة بل رحلة حياة.',
    storyCta1: 'عرض خدماتنا',
    storyCta2: 'اتصل بنا',
    philosophyHeading: 'فلسفتنا',
    philosophyParagraph: 'نؤمن بأن العافية الحقيقية تأتي من الاهتمام بالشخص ككل — الجسد والعقل والروح — برعاية مخصصة قائمة على الأدلة. ترتكز فلسفتنا على الوقاية والتمكين والممارسات العلاجية الشاملة التي تحترم تفرّدك.',
    philosophyCard1Title: 'رعاية شاملة للفرد',
    philosophyCard1Desc: 'نتجاوز الأعراض لمعالجة الأسباب الجذرية وبناء صحة مستدامة.',
    philosophyCard2Title: 'الوقاية أولاً',
    philosophyCard2Desc: 'تركيزنا على بناء الصحة بدلاً من مجرد محاربة المرض.',
    philosophyCard3Title: 'التمكين',
    philosophyCard3Desc: 'نزودك بالمعرفة والأدوات من أجل رفاهية دائمة.',
    numbersHeading: 'بالأرقام',
    numbersSubtitle: 'أثرنا في مجتمع العافية يتحدث عن نفسه',
    stat1: 'عملاء سعداء',
    stat2: 'سنوات خبرة',
    stat3: 'ممارسون خبراء',
    stat4: 'طرق طبيعية',
    teamHeading: 'تعرف على الفريق',
    teamSubtitle: 'يجمع فريقنا المتنوع بين عقود من الخبرة عبر عدة تخصصات علاجية.',
    team1Name: 'الدكتور ديباك شوبرا',
    team1Role: 'طبيب تكاملي',
    team1Hover: 'متخصص في الطب الوظيفي والعلاج بالتغذية',
    team2Name: 'الدكتور أندرو ويل',
    team2Role: 'رئيس العلاج الطبيعي',
    team2Hover: 'خبير في علاج الحركة وإدارة الألم',
    team3Name: 'الدكتور مارك هايمان',
    team3Role: 'مدير اليقظة الذهنية',
    team3Hover: 'طوّر برامجنا المرموقة لتقليل التوتر',
    testimonialsHeading: 'على لسانهم',
    testimonialsSubtitle: 'اسمع من أولئك الذين اختبروا اختلاف Vitality. يشارك عملاؤنا رحلاتهم التحولية وصحتهم المُحسنة وقصص العافية الشاملة التي تعكس التزامنا بتناغم العقل والجسد.',
    testimonial1Name: 'سارة جونسون',
    testimonial1Role: 'ممارسة يوجا',
    testimonial1Quote: 'غيرت Vitality Wellness نهجي للصحة. ساعدتني أساليبهم الشاملة على إيجاد التوازن بين الجسد والعقل.',
    testimonial2Name: 'مايكل تشين',
    testimonial2Role: 'مهتم باللياقة',
    testimonial2Quote: 'كانت خطة التغذية المخصصة نقطة تحول في مستويات طاقتي وأدائي العام.',
    testimonial3Name: 'الدكتورة إميلي رودريغيز',
    testimonial3Role: 'طبيبة',
    testimonial3Quote: 'بصفتي طبيبة، أقدّر نهجهم القائم على الأدلة والرحيم في آن واحد.',
    ctaHeading: 'ابدأ رحلتك نحو العافية',
    ctaParagraph: 'هل أنت مستعد لتجربة اختلاف Vitality؟ نحن هنا لإرشادك في كل خطوة.',
    ctaBtn1: 'احجز استشارة',
    ctaBtn2: 'استكشف البرامج'
  },
  he: {
    heroTitle: 'מסע הרווחה שלנו',
    heroSubtitle: 'המקום שבו המדע פוגש חמלה ליצירת חוויות בריאות משנות חיים',
    heroServices: 'השירותים שלנו',
    heroContact: 'צור קשר',
    storyHeading: 'הסיפור שלנו',
    storyParagraph: 'Vitality Wellness הוקמה ב-2008 כמרפאה קטנה עם חזון גדול: להגדיר מחדש בריאות הוליסטית באמצעות שילוב חכמה עתיקה עם מדע מודרני. מה שהתחיל כפרויקט תשוקה בין שלושה מטפלים הפך למרכז רווחה משגשג המשרת אלפים מדי שנה, מבלי לאבד את המגע האישי. במהלך השנים הרחבנו את הצוות, בנינו תוכניות ייחודיות ויצרנו סביבה תומכת שבה כל אדם מרגיש מוערך. מתוכניות רווחה מותאמות ועד סדנאות קהילתיות, המסע שלנו תמיד עסק בהשראת שינוי. כיום אנו מרכז אמין למי שמחפש איזון, ריפוי והעצמה — והוכחה שרווחה אמיתית אינה יעד אלא מסע חיים.',
    storyCta1: 'צפה בשירותים שלנו',
    storyCta2: 'צור קשר',
    philosophyHeading: 'הפילוסופיה שלנו',
    philosophyParagraph: 'אנו מאמינים שרווחה אמיתית נובעת מטיפול באדם בשלמותו – גוף, נפש ורוח – באמצעות טיפול מותאם אישית המבוסס ראיות. הפילוסופיה שלנו מושתתת על מניעה, העצמה ושיטות ריפוי הוליסטיות המכבדות את הייחודיות שלך.',
    philosophyCard1Title: 'טיפול באדם השלם',
    philosophyCard1Desc: 'אנו מביטים מעבר לתסמינים כדי לטפל בשורשים וליצור בריאות בת-קיימא.',
    philosophyCard2Title: 'מניעה תחילה',
    philosophyCard2Desc: 'המיקוד שלנו הוא בבניית בריאות ולא רק במלחמה במחלה.',
    philosophyCard3Title: 'העצמה',
    philosophyCard3Desc: 'אנו מציידים אותך בידע וכלים לרווחה מתמשכת.',
    numbersHeading: 'במספרים',
    numbersSubtitle: 'ההשפעה שלנו בקהילת הרווחה מדברת בעד עצמה',
    stat1: 'לקוחות מרוצים',
    stat2: 'שנות ניסיון',
    stat3: 'מטפלים מומחים',
    stat4: 'שיטות טבעיות',
    teamHeading: 'הכירו את הצוות',
    teamSubtitle: 'צוות המומחים המגוון שלנו מביא יחד עשרות שנות ניסיון בתחומים טיפוליים שונים.',
    team1Name: 'ד"ר דיפאק צ׳ופרה',
    team1Role: 'רופא אינטגרטיבי',
    team1Hover: 'מומחה לרפואה פונקציונלית וריפוי מבוסס תזונה',
    team2Name: 'ד"ר אנדרו ווייל',
    team2Role: 'ראש הפיזיותרפיה',
    team2Hover: 'מומחה לטיפול בתנועה וניהול כאב',
    team3Name: 'ד"ר מארק היימן',
    team3Role: 'מנהל המיינדפולנס',
    team3Hover: 'פיתח את תוכניות הפחתת הסטרס המובילות שלנו',
    testimonialsHeading: 'במילותיהם',
    testimonialsSubtitle: 'הקשיבו למי שחוו את ההבדל של Vitality. לקוחותינו משתפים במסעות שינוי, בריאות משופרת וסיפורי רווחה הוליסטית המשקפים את מחויבותנו להרמוניית גוף-נפש.',
    testimonial1Name: 'שרה ג\'ונסון',
    testimonial1Role: 'מתרגלת יוגה',
    testimonial1Quote: 'Vitality Wellness שינתה את הגישה שלי לבריאות. השיטות ההוליסטיות שלהם עזרו לי למצוא איזון בין הגוף לנפש.',
    testimonial2Name: 'מייקל צ\'ן',
    testimonial2Role: 'חובב כושר',
    testimonial2Quote: 'תוכנית התזונה המותאמת אישית חוללה שינוי ברמות האנרגיה והביצועים שלי.',
    testimonial3Name: 'ד"ר אמילי רודריגז',
    testimonial3Role: 'רופאה',
    testimonial3Quote: 'כמומחית רפואה, אני מעריכה את הגישה מבוססת הראיות והאנושית שלהם לרווחה.',
    ctaHeading: 'התחילו את מסע הרווחה שלכם',
    ctaParagraph: 'מוכנים לחוות את ההבדל של Vitality? אנחנו כאן כדי להדריך אתכם בכל צעד.',
    ctaBtn1: 'קבעו ייעוץ',
    ctaBtn2: 'גלו תוכניות'
  }
};

const getLanguage = () => {
  if (typeof window === 'undefined') return 'en';
  return localStorage.getItem('language') || 'en';
};

const AboutUs = () => {
  const [language, setLanguage] = useState(getLanguage());
  // Theme state and effect (robust, cross-tab sync, SSR-safe)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(THEME_KEY) || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_KEY, theme);
      document.documentElement.setAttribute('data-theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      window.dispatchEvent(new Event('theme-changed'));
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleThemeChange = () => {
        const newTheme = localStorage.getItem(THEME_KEY) || 'light';
        setTheme(newTheme);
      };
      window.addEventListener('theme-changed', handleThemeChange);
      window.addEventListener('storage', handleThemeChange);
      return () => {
        window.removeEventListener('theme-changed', handleThemeChange);
        window.removeEventListener('storage', handleThemeChange);
      };
    }
  }, []);

  // Sync language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(getLanguage());
    };
    window.addEventListener('language-changed', handleLanguageChange);
    window.addEventListener('storage', handleLanguageChange);
    return () => {
      window.removeEventListener('language-changed', handleLanguageChange);
      window.removeEventListener('storage', handleLanguageChange);
    };
  }, []);

  const t = (key) => TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Helper for theme-based class
  const themedClass = (base, dark, light) =>
    `${base} ${theme === 'dark' ? dark : light}`;

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(Array(6).fill(false));

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100 && rect.bottom >= 100) {
          const newVisibility = [...isVisible];
          newVisibility[index] = true;
          setIsVisible(newVisibility);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      img: image4,
      nameKey: 'testimonial1Name',
      roleKey: 'testimonial1Role',
      quoteKey: 'testimonial1Quote',
      extraText: ''
    },
    {
      img: image5,
      nameKey: 'testimonial2Name',
      roleKey: 'testimonial2Role',
      quoteKey: 'testimonial2Quote',
      extraText: ''
    },
    {
      img: image6,
      nameKey: 'testimonial3Name',
      roleKey: 'testimonial3Role',
      quoteKey: 'testimonial3Quote',
      extraText: ''
    }
  ];

  const stats = [
    { value: "10K+", label: "Happy Clients", icon: <FaUsers className="text-3xl" /> },
    { value: "15+", label: "Years Experience", icon: <FaAward className="text-3xl" /> },
    { value: "50+", label: "Expert Practitioners", icon: <FaHandsHelping className="text-3xl" /> },
    { value: "100%", label: "Natural Methods", icon: <FaLeaf className="text-3xl" /> }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className={themedClass(
      "font-sans min-h-screen transition-colors duration-500",
      "bg-gray-900 text-gray-100",
      "bg-white text-gray-800"
    )}>
      

      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src={vedio} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative flex flex-col justify-center items-center h-full text-center text-white px-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-5xl md:text-6xl font-serif font-bold mb-6"
          >
            {t('heroTitle')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl mb-8 max-w-2xl"
          >
            {t('heroSubtitle')}
          </motion.p>
          <div className="flex flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/services"
                className={themedClass(
                  "font-bold py-3 px-6 rounded-full shadow transition-all inline-block",
                  "bg-[#00bfff] text-white hover:bg-green-700",
                  "bg-green-600 text-white hover:bg-green-700"
                )}
              >
                {t('heroServices')}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className={themedClass(
                  "border-2 font-bold py-3 px-6 rounded-full shadow transition-all inline-block",
                  "border-[#00bfff] text-[#00bfff] hover:bg-[#00bfff] hover:text-white",
                  "border-green-600 text-green-600 hover:bg-green-50"
                )}
              >
                {t('heroContact')}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Section 1: Our Story */}
      <section className={themedClass(
        "w-full py-20 px-6",
        "bg-[#1E2A38]",
        "bg-white"
      )}>
        <div className="w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={isVisible[0] ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
              className="lg:w-1/2"
            >
              <div className="relative group">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"
                  alt="Our team"
                  className="rounded-lg shadow-xl w-full h-auto group-hover:shadow-2xl transition-all duration-500"
                />
                <div className="absolute -bottom-6 -right-6 bg-green-500 p-4 rounded-lg shadow-lg group-hover:rotate-6 transition-transform duration-500">
                  <GiMeditation className="text-5xl text-white" />
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={isVisible[0] ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{ duration: 1 }}
              className="lg:w-1/2"
            >
              <h2 className={themedClass(
                "text-3xl md:text-4xl font-serif font-bold mb-6",
                "text-green-300",
                "text-green-600"
              )}>
                {t('storyHeading')}
              </h2>
              <p className={themedClass(
                "text-lg mb-8 text-justify leading-relaxed",
                "text-gray-300",
                "text-gray-800"
              )}>
                {t('storyParagraph')}
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/services"
                    className={themedClass(
                      "font-bold py-3 px-6 rounded-full shadow transition-all inline-block",
                      "bg-[#00bfff] text-white hover:bg-green-700",
                      "bg-green-600 text-white hover:bg-green-700"
                    )}
                  >
                    {t('storyCta1')}
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/contact"
                    className={themedClass(
                      "border-2 font-bold py-3 px-6 rounded-full transition-all inline-block",
                      "border-[#00bfff] text-[#00bfff] hover:bg-[#00bfff] hover:text-white",
                      "border-green-600 text-green-600 hover:bg-green-50"
                    )}
                  >
                    {t('storyCta2')}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Our Philosophy */}
      <section className={themedClass(
        "w-full py-20 px-6",
        "bg-[#22304a]",
        "bg-green-50"
      )}>
        <div className="w-full text-center">
          <motion.div
            initial="hidden"
            animate={isVisible[1] ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <h2 className={themedClass(
              "text-3xl md:text-4xl font-serif font-bold mb-6",
              "text-green-300",
              "text-green-600"
            )}>
              {t('philosophyHeading')}
            </h2>
            <p className={themedClass(
              "max-w-4xl mx-auto text-lg mb-16 text-justify leading-relaxed",
              "text-gray-300",
              "text-gray-800"
            )}>
              {t('philosophyParagraph')}
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <FaHeartbeat className="text-5xl mb-4 text-green-500" />,
                  title: t('philosophyCard1Title'),
                  desc: t('philosophyCard1Desc'),
                  animation: { hidden: { opacity: 0, x: -100 }, visible: { opacity: 1, x: 0 } },
                },
                {
                  icon: <GiFruitBowl className="text-5xl mb-4 text-green-400" />,
                  title: t('philosophyCard2Title'),
                  desc: t('philosophyCard2Desc'),
                  animation: { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } },
                },
                {
                  icon: <GiRunningShoe className="text-5xl mb-4 text-green-600" />,
                  title: t('philosophyCard3Title'),
                  desc: t('philosophyCard3Desc'),
                  animation: { hidden: { opacity: 0, x: 100 }, visible: { opacity: 1, x: 0 } },
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={item.animation}
                  initial="hidden"
                  animate={isVisible[1] ? "visible" : "hidden"}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                  className={themedClass(
                    "p-8 rounded-xl shadow-md hover:shadow-xl transition-all",
                    "bg-[#1E2A38]",
                    "bg-white"
                  )}
                >
                  <div className="flex justify-center">{item.icon}</div>
                  <h3 className={themedClass(
                    "text-xl font-bold mb-3",
                    "text-green-200",
                    "text-green-600"
                  )}>{item.title}</h3>
                  <p className={themedClass(
                    "text-justify",
                    "text-gray-300",
                    "text-gray-800"
                  )}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: By The Numbers */}
      <section className={themedClass(
        "w-full py-20 px-4",
        "bg-[#1E2A38] text-green-200",
        "bg-green-100 text-green-900"
      )}>
        <div className="w-full">
          <motion.div
            initial="hidden"
            animate={isVisible[2] ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              {t('numbersHeading')}
            </h2>
            <p className="max-w-3xl mx-auto text-lg opacity-90">
              {t('numbersSubtitle')}
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible[2] ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.3 }}
                className={themedClass(
                  "text-center p-8 rounded-xl backdrop-blur-sm hover:bg-opacity-90 transition-all shadow-md",
                  "bg-[#22304a] bg-opacity-70",
                  "bg-white bg-opacity-70"
                )}
              >
                <div className={themedClass(
                  "flex justify-center mb-4",
                  "text-green-300",
                  "text-green-600"
                )}>
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg opacity-90">{t(stat.label.includes('Happy') ? 'stat1' : stat.label.includes('Years Experience') ? 'stat2' : stat.label.includes('Expert') ? 'stat3' : 'stat4')}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Meet The Team */}
      <section className={themedClass(
        "py-20 px-4 w-full",
        "bg-[#22304a]",
        "bg-white"
      )}>
        <motion.div
          initial="hidden"
          animate={isVisible[3] ? "visible" : "hidden"}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className={themedClass(
            "text-3xl md:text-4xl font-serif font-bold mb-6",
            "text-green-200",
            "text-green-600"
          )}>{t('teamHeading')}</h2>
          <p className={themedClass(
            "max-w-4xl mx-auto text-lg",
            "text-gray-300",
            "text-gray-800"
          )}>
            {t('teamSubtitle')}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8 px-4 md:px-12">
          {[
            {
              nameKey: 'team1Name',
              roleKey: 'team1Role',
              hoverKey: 'team1Hover',
              img: image3,
            },
            {
              nameKey: 'team2Name',
              roleKey: 'team2Role',
              hoverKey: 'team2Hover',
              img: image2,
            },
            {
              nameKey: 'team3Name',
              roleKey: 'team3Role',
              hoverKey: 'team3Hover',
              img: image,
            }
          ].map((member, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden rounded-xl shadow-lg"
            >
              <img
                src={member.img}
                alt={t(member.nameKey)}
                className="w-full h-85 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-bold">{t(member.nameKey)}</h3>
                <p className="text-green-300">{t(member.roleKey)}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center p-6 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                <p>{t(member.hoverKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 5: Testimonials */}
      <section className={themedClass(
        "py-20 px-4 w-full font-poppins",
        "bg-[#1E2A38]",
        "bg-green-50"
      )}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate={isVisible[4] ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className={themedClass(
              "text-3xl md:text-4xl font-bold mb-6",
              "text-green-200",
              "text-green-600"
            )}>{t('testimonialsHeading')}</h2>
            <p className={themedClass(
              "max-w-3xl mx-auto text-lg",
              "text-gray-300",
              "text-gray-800"
            )}>
              {t('testimonialsSubtitle')}
            </p>
          </motion.div>
          <div className="relative flex overflow-hidden h-96">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeTestimonial === index ? 1 : 0,
                  x: activeTestimonial === index ? 0 : (index < activeTestimonial ? -50 : 50)
                }}
                transition={{ duration: 0.6 }}
                className={themedClass(
                  `absolute inset-0 p-8 rounded-xl shadow-md flex flex-col items-center text-center ${activeTestimonial === index ? 'z-10' : 'z-0'}`,
                  "bg-[#22304a]",
                  "bg-white"
                )}
              >
                <img
                  src={testimonial.img}
                  alt={t(testimonial.nameKey)}
                  className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-green-200"
                />
                <p className={themedClass(
                  "text-lg mb-6",
                  "text-gray-300",
                  "text-gray-800"
                )}>
                  {t(testimonial.quoteKey)} {testimonial.extraText}
                </p>
                <div>
                  <p className="font-bold">{t(testimonial.nameKey)}</p>
                  <p className={themedClass(
                    "",
                    "text-green-200",
                    "text-green-600"
                  )}>{t(testimonial.roleKey)}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full ${activeTestimonial === index ? 'bg-green-600' : 'bg-gray-300'}`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Join Us */}
      <section
  className={themedClass(
    "relative py-20 px-4 bg-fixed bg-cover bg-center w-full",
    "",
    ""
  )}
  style={{ backgroundImage: `url(${backgroundImage})` }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>

  {/* Content */}
  <div className="relative text-center max-w-6xl mx-auto z-10">
    <motion.div
      initial="hidden"
      animate={isVisible[5] ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1 }
        }
      }}
    >
      {/* Heading */}
      <motion.h2
        variants={fadeIn}
        className="text-3xl md:text-4xl font-serif font-bold mb-6 !text-white"
      >
        {t('ctaHeading')}
      </motion.h2>

      {/* Paragraph */}
      <motion.p
        variants={fadeIn}
        className="text-xl mb-10 max-w-2xl mx-auto !text-white"
      >
        {t('ctaParagraph')}
      </motion.p>

      {/* Buttons */}
      <motion.div
        variants={fadeIn}
        className="flex flex-wrap justify-center gap-4"
      >
        {/* Button 1 */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/contact"
            className={themedClass(
              "font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all inline-block",
              "bg-[#00bfff] text-white hover:bg-green-700",
              "bg-white text-white-600"
            )}
          >
            {t('ctaBtn1')}
          </Link>
        </motion.div>

        {/* Button 2 */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/services"
            className={themedClass(
              "bg-transparent border-2 font-bold py-3 px-8 rounded-full transition-all inline-block",
              "border-[#00bfff] text-white hover:bg-[#00bfff] hover:text-white",
              "border-green-600 text-white hover:bg-green-50 hover:text-green-600"
            )}
          >
            {t('ctaBtn2')}
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  </div>
</section>


    </div>
  );
};

export default AboutUs;