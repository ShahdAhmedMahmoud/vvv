// import { useRef } from "react";
// import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

// const without = ["Drawing", "Revision", "Coordination", "Site", "Problem", "Change"];
// const withBim = ["Model", "Coordination", "Detection", "Decision", "Construction"];
// const offsets = [0, 34, -22, 40, -30, 18];

// function Step({ label, i, progress, scattered, reduce }) {
//   // في "With BIM" الخطوات بتتنظم مع السكرول؛ في "Without" بتفضل مبعثرة
//   const x = useTransform(progress, [0.15, 0.6], [offsets[i] ?? 0, 0]);
//   return (
//     <motion.li
//       style={{ x: reduce ? 0 : scattered ? offsets[i] : x }}
//       className="flex items-center gap-4 border-b border-[#3C3C3B]/15 py-4"
//     >
//       <span className="font-mono text-[12px] text-[#2A317A]">{String(i + 1).padStart(2, "0")}</span>
//       <span className="text-[18px] font-bold uppercase tracking-tight text-[#3C3C3B] sm:text-[22px]">{label}</span>
//     </motion.li>
//   );
// }

// export default function BIMIntro() {
//   const ref = useRef(null);
//   const reduce = useReducedMotion();
//   const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });

//   return (
//     <section id="bim-intro" ref={ref} className="bg-white px-6 py-24 sm:px-10 lg:px-16">
//       <div className="mx-auto max-w-7xl">
//         <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#2A317A]">01 / BIM</p>
//         <h2 className="mt-3 max-w-3xl text-[32px] font-bold uppercase leading-tight tracking-tight text-[#3C3C3B] sm:text-[48px]">
//           What BIM actually changes.
//         </h2>
//         <div className="mt-14 grid gap-14 md:grid-cols-2">
//           <div>
//             <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#3C3C3B]/50">Without BIM — fragmented</p>
//             <ul className="mt-4 border-t border-dashed border-[#3C3C3B]/40">
//               {without.map((s, i) => (
//                 <Step key={s} label={s} i={i} progress={scrollYProgress} scattered reduce={reduce} />
//               ))}
//             </ul>
//           </div>
//           <div>
//             <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#2A317A]">With BIM — organised</p>
//             <ul className="mt-4 border-t-2 border-[#2A317A]">
//               {withBim.map((s, i) => (
//                 <Step key={s} label={s} i={i} progress={scrollYProgress} reduce={reduce} />
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const words = ["Visualize", "Understand", "Coordinate"];

export default function BIMIntro() {
  const [active, setActive] = useState(null);
  const reduce = useReducedMotion();

  return (
    <section id="bim-intro" className="bg-white px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#2A317A]">01 / See</p>
        <h2 className="mt-3 text-[32px] font-bold uppercase leading-tight tracking-tight text-[#3C3C3B] sm:text-[48px]">
          More than a 3D model.
        </h2>
        <p className="mt-4 max-w-xl text-[15.5px] text-[#3C3C3B]/80">
          A BIM 3D model gives the project team a clearer visual understanding of the building and its elements before construction begins.
        </p>

        <ul className="mt-14 border-t border-[#3C3C3B]/20" onMouseLeave={() => setActive(null)}>
          {words.map((w, i) => (
            <motion.li
              key={w}
              tabIndex={0}
              initial={reduce ? false : { opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(active === i ? null : i)}
              className="relative cursor-pointer overflow-hidden border-b border-[#3C3C3B]/20 py-4 outline-none"
            >
              <motion.span
                animate={{ opacity: active === null || active === i ? 1 : 0.2, x: active === i && !reduce ? 24 : 0 }}
                transition={{ duration: 0.35 }}
                className="relative z-10 block text-[clamp(40px,9vw,130px)] font-bold uppercase leading-none tracking-tight text-[#3C3C3B]"
              >
                {w}
              </motion.span>
              <motion.span
                aria-hidden
                animate={{ x: active === i && !reduce ? -30 : 0, opacity: active === i ? 0.14 : 0.05 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[clamp(60px,12vw,150px)] font-bold text-[#2A317A]"
              >
                0{i + 1}
              </motion.span>
              <motion.span
                aria-hidden
                animate={{ scaleX: active === i ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-[#2A317A]"
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}