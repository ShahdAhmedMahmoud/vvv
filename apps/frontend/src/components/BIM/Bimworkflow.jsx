// import { useRef } from "react";
// import { motion, useScroll, useReducedMotion } from "framer-motion";

// const steps = ["3D Model", "Visualization", "Coordination", "Detection", "Understanding"];

// export default function BIMWorkflow() {
//   const ref = useRef(null);
//   const reduce = useReducedMotion();
//   const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });

//   return (
//     <section className="bg-white px-6 py-24 sm:px-10 lg:px-16">
//       <div className="mx-auto max-w-7xl">
//         <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#2A317A]">05 / Coordinate</p>
//         <h2 className="mt-3 text-[32px] font-bold uppercase leading-tight tracking-tight text-[#3C3C3B] sm:text-[48px]">
//           One model. Clearer decisions.
//         </h2>

//         <div ref={ref} className="relative mt-16">
//           <span aria-hidden className="absolute left-[15px] top-0 h-full w-px bg-[#3C3C3B]/15 md:hidden" />
//           <span aria-hidden className="absolute left-0 top-[15px] hidden h-px w-full bg-[#3C3C3B]/15 md:block" />
//           <motion.span aria-hidden style={reduce ? undefined : { scaleY: scrollYProgress }} className="absolute left-[15px] top-0 h-full w-px origin-top bg-[#2A317A] md:hidden" />
//           <motion.span aria-hidden style={reduce ? undefined : { scaleX: scrollYProgress }} className="absolute left-0 top-[15px] hidden h-px w-full origin-left bg-[#2A317A] md:block" />

//           <ol className="relative grid gap-10 md:grid-cols-5 md:gap-4">
//             {steps.map((s, i) => (
//               <motion.li
//                 key={s}
//                 initial={reduce ? false : { opacity: 0, y: 24 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: "-60px" }}
//                 transition={{ delay: i * 0.1 }}
//                 className="flex items-center gap-5 md:block"
//               >
//                 <span className="flex h-[31px] w-[31px] shrink-0 items-center justify-center border border-[#2A317A] bg-white font-mono text-[11px] text-[#2A317A]">
//                   {i + 1}
//                 </span>
//                 <span className="block text-[18px] font-bold uppercase tracking-tight text-[#3C3C3B] md:mt-5 md:text-[20px]">{s}</span>
//               </motion.li>
//             ))}
//           </ol>
//         </div>
//       </div>
//     </section>
//   );
// }


import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const steps = ["3D Model", "Visualization", "Coordination", "Detection", "Understanding"];

// نقاط المثلث (لأعلى) — لو اللوجو بتاعك شكله مختلف عدّلي النقاط هنا بس
const TRI_UP = "22,3 41,37 3,37";

function StepTriangle({ index, total, progress, reduce }) {
  const flip = index % 2 === 1; // الفردي بيبقى مقلوب
  const at = index / total; // النقطة اللي الخط بيوصل عندها للمثلث ده

  const fill = useTransform(progress, [at - 0.06, at + 0.04], [0, 1]);
  const scale = useTransform(progress, [at - 0.06, at, at + 0.08], [1, 1.18, 1]);

  return (
    <motion.span
      style={reduce ? undefined : { scale }}
      className="relative flex h-[40px] w-[44px] shrink-0 items-center justify-center"
    >
      <svg
        viewBox="0 0 44 40"
        className="absolute inset-0 h-full w-full overflow-visible"
        style={{ transform: flip ? "rotate(180deg)" : undefined }}
        aria-hidden
      >
        {/* الخلفية البيضا عشان الخط ميبانش من ورا المثلث */}
        <polygon points={TRI_UP} fill="#fff" />
        {/* التعبئة الزرقا اللي بتظهر مع الـ scroll */}
        <motion.polygon
          points={TRI_UP}
          fill="#2A317A"
          style={{ opacity: reduce ? 1 : fill }}
        />
        {/* الإطار */}
        <polygon
          points={TRI_UP}
          fill="none"
          stroke="#2A317A"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* الرقم: بيتحرك لمركز المثلث حسب الاتجاه، وبيتحول أبيض لما يتملي */}
      <motion.span
        style={{
          color: reduce
            ? "#fff"
            : useTransform(fill, [0.4, 0.8], ["#2A317A", "#ffffff"]),
        }}
        className={`relative font-mono text-[11px] font-semibold ${flip ? "-mt-2" : "mt-3"}`}
      >
        {index + 1}
      </motion.span>
    </motion.span>
  );
}

export default function BIMWorkflow() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });

  return (
    <section className="bg-white px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#2A317A]">05 / Coordinate</p>
        <h2 className="mt-3 text-[32px] font-bold uppercase leading-tight tracking-tight text-[#3C3C3B] sm:text-[48px]">
          One model. Clearer decisions.
        </h2>

        <div ref={ref} className="relative mt-16">
          {/* الخط الرمادي (الخلفية) */}
          <span aria-hidden className="absolute left-[22px] top-0 h-full w-px bg-[#3C3C3B]/15 md:hidden" />
          <span aria-hidden className="absolute left-0 top-[20px] hidden h-px w-full bg-[#3C3C3B]/15 md:block" />

          {/* الخط الأزرق (التقدم) */}
          <motion.span
            aria-hidden
            style={reduce ? undefined : { scaleY: scrollYProgress }}
            className="absolute left-[22px] top-0 h-full w-px origin-top bg-[#2A317A] md:hidden"
          />
          <motion.span
            aria-hidden
            style={reduce ? undefined : { scaleX: scrollYProgress }}
            className="absolute left-0 top-[20px] hidden h-px w-full origin-left bg-[#2A317A] md:block"
          />

          <ol className="relative grid gap-10 md:grid-cols-5 md:gap-4">
            {steps.map((s, i) => (
              <motion.li
                key={s}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1 }}
                className="group flex items-center gap-5 md:block"
              >
                <StepTriangle
                  index={i}
                  total={steps.length}
                  progress={scrollYProgress}
                  reduce={reduce}
                />
                <span className="block text-[18px] font-bold uppercase tracking-tight text-[#3C3C3B] transition-colors group-hover:text-[#2A317A] md:mt-5 md:text-[20px]">
                  {s}
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}