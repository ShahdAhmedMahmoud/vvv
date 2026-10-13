// import { useState } from "react";
// import { motion, useReducedMotion } from "framer-motion";

// export default function BIMClashDetection() {
//   const [resolved, setResolved] = useState(false);
//   const reduce = useReducedMotion();

//   return (
//     <section className="bg-black px-6 py-24 text-white sm:px-10 lg:px-16">
//       <div className="mx-auto max-w-7xl">
//         <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/60">02 / Coordination</p>
//         <h2 className="mt-3 max-w-3xl text-[32px] font-bold uppercase leading-tight tracking-tight sm:text-[48px]">
//           We find the conflict <span className="text-white/50">before the site does.</span>
//         </h2>

//         <div
//           className="relative mt-12 border border-white/15 p-4 sm:p-8"
//           style={{
//             backgroundImage:
//               "linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)",
//             backgroundSize: "32px 32px",
//           }}
//         >
//           <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
//             <span>Section A–A / Conceptual</span>
//             <span aria-live="polite" className={resolved ? "text-white" : "text-white/60"}>
//               {resolved ? "Coordinated ✓" : "Clash detected"}
//             </span>
//           </div>

//           <svg viewBox="0 0 600 220" className="mt-4 w-full" role="img" aria-label="Conceptual pipe and beam clash illustration">
//             {/* beam */}
//             <rect x="80" y="100" width="440" height="46" fill="#2A317A" stroke="#fff" strokeOpacity=".6" />
//             <text x="96" y="129" fill="#fff" fontSize="12" fontFamily="monospace" letterSpacing="3">BEAM</text>
//             {/* pipe */}
//             <motion.g animate={{ y: resolved ? -62 : 0 }} transition={{ duration: reduce ? 0 : 1, ease: "easeInOut" }}>
//               <line x1="40" y1="110" x2="560" y2="110" stroke="#fff" strokeWidth="10" strokeLinecap="round" />
//               <text x="52" y="94" fill="#fff" fontSize="12" fontFamily="monospace" letterSpacing="3">PIPE</text>
//             </motion.g>
//             {/* clash marker */}
//             <motion.g animate={{ opacity: resolved ? 0 : 1 }}>
//               <path d="M290 88 L310 108 M310 88 L290 108" stroke="#fff" strokeWidth="2.5" />
//               <circle cx="300" cy="98" r="22" fill="none" stroke="#fff" strokeDasharray="4 4" />
//             </motion.g>
//             {/* dimension mark */}
//             <motion.g animate={{ opacity: resolved ? 1 : 0 }} stroke="#fff" strokeOpacity=".7">
//               <line x1="560" y1="48" x2="560" y2="100" />
//               <line x1="552" y1="48" x2="568" y2="48" />
//               <line x1="552" y1="100" x2="568" y2="100" />
//               <text x="480" y="80" fill="#fff" fontSize="11" fontFamily="monospace" stroke="none">Δ +0.30 m</text>
//             </motion.g>
//           </svg>

//           <div className="mt-4 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
//             <span>X 12.400 / Y 08.150</span>
//             <span>Illustrative demo</span>
//           </div>
//         </div>

//         <button
//           onClick={() => setResolved((r) => !r)}
//           className="mt-6 border border-white px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
//         >
//           {resolved ? "Reset" : "Run coordination"}
//         </button>
//       </div>
//     </section>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// 0: منفصلين · 1: تصادم · 2: تنسيق · 3: منسّق
const pos = [
  { a: 0, ay: 0, b: 0 },
  { a: 160, ay: 0, b: -100 },
  { a: 160, ay: -20, b: -100 },
  { a: 160, ay: -46, b: -100 },
];
const status = ["Elements apart", "Clash detected", "Coordinate", "Coordinated"];

export default function BIMClashDetection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) return setStage(3);
    setStage(0);
    const t = [setTimeout(() => setStage(1), 1000), setTimeout(() => setStage(2), 2400), setTimeout(() => setStage(3), 3400)];
    return () => t.forEach(clearTimeout);
  }, [inView, run, reduce]);

  const clash = stage === 1;
  const p = pos[stage];

  return (
    <section ref={ref} className="bg-black px-6 py-24 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/60">04 / Detect</p>
        <h2 className="mt-3 max-w-3xl text-[32px] font-bold uppercase leading-tight tracking-tight sm:text-[48px]">
          Find the conflict <span className="text-white/50">before the site does.</span>
        </h2>
        <p className="mt-4 max-w-xl text-[15.5px] text-white/75">
          3D coordination helps teams identify potential conflicts between building elements before construction.
        </p>

        <div
          className="mt-12 border border-white/15 p-4 sm:p-8"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        >
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
            <span>{stage < 2 ? "Before" : "After"} / Illustrative</span>
            <span aria-live="polite" className="flex items-center gap-2 text-white">
              <span className={`h-2 w-2 rounded-full ${clash ? "bg-[#C0392B]" : "bg-white"}`} />
              {status[stage]}
            </span>
          </div>

          <svg viewBox="0 0 600 200" className="mt-4 w-full" role="img" aria-label="Illustrative clash between two building elements">
            <motion.g animate={{ x: p.a, y: p.ay }} transition={{ duration: reduce ? 0 : 0.9, ease: "easeInOut" }}>
              <rect x="20" y="88" width="200" height="24" fill="none" stroke="#fff" strokeWidth="2" />
              <text x="32" y="105" fill="#fff" fontSize="11" fontFamily="monospace" letterSpacing="3">ELEMENT A</text>
            </motion.g>
            <motion.g animate={{ x: p.b }} transition={{ duration: reduce ? 0 : 0.9, ease: "easeInOut" }}>
              <rect x="380" y="88" width="200" height="24" fill="#2A317A" stroke="#fff" strokeWidth="2" />
              <text x="392" y="105" fill="#fff" fontSize="11" fontFamily="monospace" letterSpacing="3">ELEMENT B</text>
            </motion.g>
            <motion.g animate={{ opacity: clash ? 1 : 0 }}>
              <rect x="280" y="80" width="100" height="40" fill="none" stroke="#C0392B" strokeWidth="2" strokeDasharray="5 4" />
              <path d="M320 92 L340 108 M340 92 L320 108" stroke="#C0392B" strokeWidth="2.5" />
            </motion.g>
          </svg>

          <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
            <span>X 12.400 / Y 08.150</span>
            <span>Illustrative</span>
          </div>
        </div>

        <button
          onClick={() => setRun((r) => r + 1)}
          className="mt-6 border border-white px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Replay
        </button>
      </div>
    </section>
  );
}