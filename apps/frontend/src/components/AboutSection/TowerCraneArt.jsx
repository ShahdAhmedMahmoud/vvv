// src/Components/AboutSection/TowerCraneArt.jsx
import { motion } from "motion/react";

const lineDraw = (delay = 0) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 3.5, delay, ease: "easeInOut" },
      opacity: { duration: 0.4, delay },
    },
  },
});

export default function TowerCraneArt({ className = "", color = "#000000", flip = false }) {
  return (
    <motion.svg
      viewBox="0 0 220 260"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      style={{ transform: flip ? "scaleX(-1)" : "none" }}
    >
      {/* القاعدة */}
      <motion.line x1="60" y1="250" x2="100" y2="250" variants={lineDraw(0)} />
      {/* الصاري الرأسي */}
      <motion.line x1="80" y1="250" x2="80" y2="30" variants={lineDraw(0.2)} />
      {/* دعامات الصاري (شكل شبكي) */}
      <motion.line x1="80" y1="230" x2="70" y2="215" variants={lineDraw(0.6)} />
      <motion.line x1="70" y1="215" x2="80" y2="200" variants={lineDraw(0.75)} />
      <motion.line x1="80" y1="200" x2="70" y2="185" variants={lineDraw(0.9)} />
      <motion.line x1="70" y1="185" x2="80" y2="170" variants={lineDraw(1.05)} />
      <motion.line x1="80" y1="170" x2="70" y2="155" variants={lineDraw(1.2)} />
      <motion.line x1="70" y1="155" x2="80" y2="140" variants={lineDraw(1.35)} />

      {/* رأس البرج - الذراع الطويلة (jib) */}
      <motion.line x1="80" y1="30" x2="200" y2="30" variants={lineDraw(1.6)} />
      {/* الذراع القصيرة (counter-jib) */}
      <motion.line x1="80" y1="30" x2="30" y2="30" variants={lineDraw(1.6)} />
      {/* الثقل المضاد */}
      <motion.line x1="30" y1="30" x2="30" y2="42" variants={lineDraw(2)} />
      <motion.line x1="24" y1="42" x2="36" y2="42" variants={lineDraw(2.1)} />

      {/* حبال الشد للذراع الطويلة */}
      <motion.line x1="80" y1="8" x2="180" y2="30" variants={lineDraw(1.9)} />
      <motion.line x1="80" y1="8" x2="80" y2="30" variants={lineDraw(1.9)} />
      {/* حبل الشد للذراع القصيرة */}
      <motion.line x1="80" y1="8" x2="30" y2="30" variants={lineDraw(2)} />

      {/* حبل الرفع النازل */}
      <motion.line x1="180" y1="30" x2="180" y2="90" variants={lineDraw(2.4)} />
      {/* الخطاف */}
      <motion.line x1="176" y1="90" x2="184" y2="90" variants={lineDraw(2.7)} />
    </motion.svg>
  );
}

// // src/Components/AboutSection/TowerCraneArt.jsx
// import { useRef } from "react";
// import { motion, useScroll, useSpring, useTransform } from "motion/react";

// export default function TowerCraneArt({ className = "", flip = false }) {
//   const ref = useRef(null);

//   // نتابع مكان الـ section بالنسبة للشاشة أثناء السكرول
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"],
//   });

//   // سبرينج بسيط بيدي smoothing إضافي فوق قيمة السكرول الخام
//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 45,
//     damping: 20,
//     mass: 0.6,
//   });

//   // الرسم بيبدأ لما الجزء الأول من السكشن يدخل، وبيخلص قبل ما السكشن يخلص
//   const pathLength = useTransform(smoothProgress, [0.05, 0.85], [0, 1]);
//   const opacity = useTransform(smoothProgress, [0.03, 0.12], [0, 1]);

//   return (
//     <div
//       ref={ref}
//       className={className}
//       style={{ transform: flip ? "scaleX(-1)" : "none" }}
//     >
//       <svg
//         viewBox="0 0 200 520"
//         preserveAspectRatio="xMidYMid meet"
//         className="w-full h-full"
//         fill="none"
//       >
//         <motion.path
//           d="M100,15 L100,50
//              M15,50 L185,50
//              M100,15 L185,50
//              M100,15 L15,50
//              M15,50 L15,68 L42,68 L42,50
//              M150,50 L150,115
//              M143,115 L157,115
//              M100,50 L100,480
//              M100,130 L82,150 L100,170 L118,190 L100,210 L82,230 L100,250 L118,270 L100,290 L82,310 L100,330 L118,350 L100,370 L82,390 L100,410 L118,430 L100,450
//              M65,480 L135,480
//              M100,480 L70,505
//              M100,480 L130,505"
//           stroke="#000000"
//           strokeWidth={2.25}
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           style={{ pathLength, opacity }}
//         />
//       </svg>
//     </div>
//   );
// }