// import { useRef } from "react";
// import { motion, useScroll, useTransform } from "motion/react";

// const sectors = ["Infrastructure.", "Commercial Buildings.", "Road & Generalist."];

// function CyclingWord({ word, index, total, scrollYProgress }) {
//   const segment = 0.7 / total; // أول 70% من السكرول مخصصة لتقليب الكلمات
//   const start = index * segment;
//   const mid = start + segment / 2;
//   const end = start + segment;

//   const t = useTransform(
//     scrollYProgress,
//     [Math.max(0, start - segment * 0.3), start, mid, end, Math.min(0.7, end + segment * 0.3)],
//     [0, 0, 1, 0, 0]
//   );
//   const opacity = useTransform(t, [0, 1], [0.15, 1]);
//   const color = useTransform(t, [0, 1], ["#6C757D", "#FFBF00"]);
//   const scale = useTransform(t, [0, 1], [0.92, 1]);

//   return (
//     <motion.li
//       style={{ opacity, color, scale }}
//       className="text-2xl md:text-5xl font-bold uppercase tracking-tight"
//     >
//       {word}
//     </motion.li>
//   );
// }

// export default function ProjectsRevealTransition() {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

//   // آخر 25% من السكرول: النص بيخفت والبانل الفاتح بيكبر ويملا الشاشة
//   const textOpacity = useTransform(scrollYProgress, [0.68, 0.82], [1, 0]);
//   const panelScale = useTransform(scrollYProgress, [0.75, 1], [0.8, 1]);
//   const panelRadius = useTransform(scrollYProgress, [0.75, 1], [64, 0]);

//   return (
//     <div ref={ref} className="relative bg-[#1E2432]" style={{ height: "220vh" }}>
//       <div className="sticky top-0 h-screen overflow-hidden">
//         {/* الكلمات بتتقلّب - كل كلمة بتضيء وهي في نص الشاشة بس */}
//         <motion.div
//           style={{ opacity: textOpacity }}
//           className="relative z-10 h-full flex flex-col items-center justify-center gap-3"
//         >
//           <p className="text-white/40 text-xs md:text-sm uppercase tracking-[0.3em] mb-2">
//             Explore by
//           </p>
//           <ul className="flex flex-col items-center gap-2 list-none p-0 m-0">
//             {sectors.map((word, i) => (
//               <CyclingWord
//                 key={word}
//                 word={word}
//                 index={i}
//                 total={sectors.length}
//                 scrollYProgress={scrollYProgress}
//               />
//             ))}
//           </ul>
//         </motion.div>

//         {/* البانل الفاتح اللي بيكبر في آخر السكرول ويكشف سيكشن الفلاتر */}
//         <motion.div
//           style={{ scale: panelScale, borderRadius: panelRadius }}
//           className="absolute inset-0 z-20 bg-[#F8F9FD]"
//         />
//       </div>
//     </div>
//   );
// }



import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

const sectors = ["Infrastructure.", "Commercial Buildings.", "Road & Generalist."];

function CyclingWord({ word, index, total, progress }) {
  const segment = 0.6 / total; // بقت أقصر عشان التقليب يبقى أسرع
  const start = index * segment;
  const mid = start + segment / 2;
  const end = start + segment;

  const t = useTransform(
    progress,
    [Math.max(0, start - segment * 0.2), start, mid, end, Math.min(0.6, end + segment * 0.2)],
    [0, 0, 1, 0, 0]
  );
  const opacity = useTransform(t, [0, 1], [0.15, 1]);
  const color = useTransform(t, [0, 1], ["#6C757D", "#FFBF00"]);
  const scale = useTransform(t, [0, 1], [0.9, 1.05]);

  return (
    <motion.li
      style={{ opacity, color, scale }}
      className="text-2xl md:text-5xl font-bold uppercase tracking-tight"
    >
      {word}
    </motion.li>
  );
}

export default function ProjectsRevealTransition() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // smoothing بفيزياء springy عشان الحركة متبقاش خطية جامدة
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    mass: 0.4,
  });

  // آخر جزء من السكرول: النص بيخفت والبانل بيكبر بسرعة أعلى
  const textOpacity = useTransform(smoothProgress, [0.55, 0.68], [1, 0]);
  const panelScale = useTransform(smoothProgress, [0.62, 0.92], [0.75, 1]);
  const panelRadius = useTransform(smoothProgress, [0.62, 0.92], [80, 0]);
  const panelY = useTransform(smoothProgress, [0.62, 0.92], [60, 0]);

  return (
    <div ref={ref} className="relative bg-[#1E2432]" style={{ height: "140vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ opacity: textOpacity }}
          className="relative z-10 h-full flex flex-col items-center justify-center gap-3"
        >
          <p className="text-white/40 text-xs md:text-sm uppercase tracking-[0.3em] mb-2">
            Explore by
          </p>
          <ul className="flex flex-col items-center gap-2 list-none p-0 m-0">
            {sectors.map((word, i) => (
              <CyclingWord
                key={word}
                word={word}
                index={i}
                total={sectors.length}
                progress={smoothProgress}
              />
            ))}
          </ul>
        </motion.div>

        <motion.div
          style={{ scale: panelScale, borderRadius: panelRadius, y: panelY }}
          className="absolute inset-0 z-20 bg-[#F8F9FD]"
        />
      </div>
    </div>
  );
}