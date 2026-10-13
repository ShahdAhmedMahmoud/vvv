// import { createContext, useContext, useState, useEffect } from "react";

// const LanguageContext = createContext(null);

// // حط هنا كل الترجمات بتاعة الموقع، كل مفتاح بيرجع { ar, en }
// export const translations = {
//   navHome: { ar: "الرئيسية", en: "Home" },
//   navAbout: { ar: "من نحن", en: "About" },
//   navServices: { ar: "خدماتنا", en: "Services" },
//   navProjects: { ar: "مشاريعنا", en: "Projects" },
//   navCareer: { ar: "وظائف", en: "Career" },
//   navBim: { ar: "BIM", en: "BIM" },
//   navSuppliers: { ar: "الموردين", en: "Suppliers" },
//   navContact: { ar: "تواصل معنا", en: "Contact" },
//   menuOpenLabel: { ar: "فتح القائمة", en: "Open menu" },
//   menuCloseLabel: { ar: "قفل القائمة", en: "Close menu" },
//   // ضيفي أي مفتاح جديد هنا وهيبقى متاح في كل الموقع
// };

// const LanguageProvider = ({ children }) => {
//   const [language, setLanguage] = useState(() => {
//     return localStorage.getItem("site-lang") || "ar";
//   });

//   useEffect(() => {
//     localStorage.setItem("site-lang", language);
//     document.documentElement.lang = language;
//     document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
//   }, [language]);

//   const toggleLanguage = () => {
//     setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
//   };

//   // t("navHome") بترجع النص حسب اللغة الحالية
//   const t = (key) => {
//     const entry = translations[key];
//     if (!entry) return key;
//     return entry[language];
//   };

//   return (
//     <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };

// export const useLanguage = () => {
//   const context = useContext(LanguageContext);
//   if (!context) {
//     throw new Error("useLanguage لازم يتستخدم جوه LanguageProvider");
//   }
//   return context;
// };

// export default LanguageProvider;



import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext(null);

// حط هنا كل الترجمات بتاعة الموقع، كل مفتاح بيرجع { ar, en }
export const translations = {
  navHome: { ar: "الرئيسية", en: "Home" },
  navAbout: { ar: "من نحن", en: "About" },
  navServices: { ar: "خدماتنا", en: "Services" },
  navProjects: { ar: "مشاريعنا", en: "Projects" },
  navCareer: { ar: "وظائف", en: "Career" },
  navBim: { ar: "BIM", en: "BIM" },
  navSuppliers: { ar: "الموردين", en: "Suppliers" },
  navContact: { ar: "تواصل معنا", en: "Contact" },
  navNews: { ar: "اخبارنا", en: "News" },
  menuOpenLabel: { ar: "فتح القائمة", en: "Open menu" },
  menuCloseLabel: { ar: "قفل القائمة", en: "Close menu" },
  // ضيفي أي مفتاح جديد هنا وهيبقى متاح في كل الموقع
};

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("site-lang") || "ar";
  });

  // على أول تحميل بس، بنظبط lang/dir بتوع <html> عشان تتوافق مع
  // القيمة المخزّنة (الـ index.html بيعمل الحاجة دي بدري أوي فعليًا،
  // بس السطرين دول بيأكدوا نفس القيمة لو تغيرت الترجمات بعدين)
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  // مفيش animation ولا cross-fade خالص هنا — القرار إن التبديل يبقى
  // full page reload، بالظبط زي ما شوفتيه في مواقع تانية:
  // 1) نحفظ اللغة الجديدة في localStorage
  // 2) نعمل reload كامل للصفحة
  // 3) لما الصفحة ترجع تفتح، الـ useState فوق بيقرا القيمة الجديدة
  //    من localStorage من أول لحظة، فالموقع بيطلع بلغته الجديدة
  //    من غير ما تشوفي أي "تحويلة" — بالظبط زي المواقع اللي شوفتيها
  const toggleLanguage = () => {
    const nextLang = language === "ar" ? "en" : "ar";
    localStorage.setItem("site-lang", nextLang);
    window.location.reload();
  };

  // t("navHome") بترجع النص حسب اللغة الحالية
  const t = (key) => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language];
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage لازم يتستخدم جوه LanguageProvider");
  }
  return context;
};

export default LanguageProvider;