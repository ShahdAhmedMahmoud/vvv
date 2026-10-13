// import { motion, AnimatePresence } from "framer-motion";
// import { useLanguage } from "../../locales/LanguageContext/LanguageContext";


// const LanguageSwitcher = () => {
//   const { language, toggleLanguage } = useLanguage();
//   const isArabic = language === "ar";

//   return (
//     <motion.button
//       onClick={toggleLanguage}
//       whileTap={{ scale: 0.92 }}
//       whileHover={{ scale: 1.04 }}
//       className="
//         relative flex items-center
//         w-[76px] h-[36px] sm:w-[84px] sm:h-[40px]
//         rounded-full px-1
//         cursor-pointer select-none
//         overflow-hidden
//         shadow-md
//       "
//       style={{
//         backgroundColor: "#283A85",
//         border: "1px solid #3A3A3C",
//       }}
//       aria-label="Toggle language"
//     >
//       {/* الدايرة المتحركة (الـ thumb) */}
//       <motion.div
//         className="absolute top-[2px] w-[32px] h-[30px] sm:w-[36px] sm:h-[34px] rounded-full flex items-center justify-center z-10"
//         style={{ backgroundColor: "#FFFFFF" }}
//         animate={{
//           x: isArabic ? 2 : 40,
//         }}
//         transition={{
//           type: "spring",
//           stiffness: 350,
//           damping: 28,
//         }}
//       >
//         <AnimatePresence mode="wait">
//           <motion.span
//             key={language}
//             initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
//             animate={{ opacity: 1, rotate: 0, scale: 1 }}
//             exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
//             transition={{ duration: 0.25 }}
//             className="text-[11px] sm:text-xs font-bold"
//             style={{ color: "#283A85" }}
//           >
//             {isArabic ? "ع" : "EN"}
//           </motion.span>
//         </AnimatePresence>
//       </motion.div>

//       {/* الليبل التاني (اللي مش متفعّل) شفاف خلف الدايرة */}
//       <div className="w-full flex justify-between items-center px-[10px] text-[10px] sm:text-[11px] font-semibold">
//         <span
//           style={{
//             color: isArabic ? "#FFFFFF" : "rgba(255,255,255,0.35)",
//             transition: "color 0.3s ease",
//           }}
//         >
//           ع
//         </span>
//         <span
//           style={{
//             color: !isArabic ? "#FFFFFF" : "rgba(255,255,255,0.35)",
//             transition: "color 0.3s ease",
//           }}
//         >
//           EN
//         </span>
//       </div>
//     </motion.button>
//   );
// };

// export default LanguageSwitcher;



import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../locales/LanguageContext/LanguageContext";


const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();
  const isArabic = language === "ar";

  return (
    <motion.button
      onClick={toggleLanguage}
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.04 }}
      className="
        relative flex items-center
        select-none
        w-[76px] h-[36px] sm:w-[84px] sm:h-[40px]
        rounded-full px-1
        cursor-pointer
        overflow-hidden
        shadow-md
      "
      style={{
        backgroundColor: "#283A85",
        border: "1px solid #3A3A3C",
      }}
      aria-label="Toggle language"
    >
      {/* الدايرة المتحركة (الـ thumb) */}
      <motion.div
        className="absolute top-[2px] w-[32px] h-[30px] sm:w-[36px] sm:h-[34px] rounded-full flex items-center justify-center z-10"
        style={{ backgroundColor: "#FFFFFF" }}
        animate={{
          x: isArabic ? 2 : 40,
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 28,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={language}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.25 }}
            className="text-[11px] sm:text-xs font-bold"
            style={{ color: "#283A85" }}
          >
            {isArabic ? "ع" : "EN"}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      {/* الليبل التاني (اللي مش متفعّل) شفاف خلف الدايرة */}
      <div className="w-full flex justify-between items-center px-[10px] text-[10px] sm:text-[11px] font-semibold">
        <span
          style={{
            color: isArabic ? "#FFFFFF" : "rgba(255,255,255,0.35)",
            transition: "color 0.3s ease",
          }}
        >
          ع
        </span>
        <span
          style={{
            color: !isArabic ? "#FFFFFF" : "rgba(255,255,255,0.35)",
            transition: "color 0.3s ease",
          }}
        >
          EN
        </span>
      </div>
    </motion.button>
  );
};

export default LanguageSwitcher;