// import { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";

// const items = [
//   { id: "Architecture", text: "Spaces, walls, doors, windows, finishes and architectural elements." },
//   { id: "Structure", text: "Columns, beams, slabs and structural elements." },
//   { id: "MEP", text: "Mechanical, electrical and plumbing systems." },
// ];

// const draw = (i = 0) => ({
//   initial: { pathLength: 0 },
//   animate: { pathLength: 1 },
//   transition: { duration: 1.1, delay: i * 0.15, ease: "easeInOut" },
// });
// const P = ({ d, i, dash }) => (
//   <motion.path d={d} fill="none" stroke="#fff" strokeWidth="2" strokeDasharray={dash} {...draw(i)} />
// );

// const visuals = {
//   Architecture: (
//     <>
//       <P d="M40 40 H360 V220 H40 Z" />
//       <P d="M200 40 V130 M200 180 V220 M40 130 H200" i={1} />
//       <P d="M200 130 A50 50 0 0 1 250 180" i={2} dash="4 4" />
//       <P d="M120 40 H160 M280 40 H320" i={3} />
//     </>
//   ),
//   Structure: (
//     <>
//       <P d="M66 66 H326 M66 176 H326 M66 66 V176 M196 66 V176 M326 66 V176" />
//       {[60, 190, 320].flatMap((x) => [60, 170].map((y) => (
//         <motion.rect key={x + "-" + y} x={x} y={y} width="12" height="12" fill="#fff" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} />
//       )))}
//     </>
//   ),
//   MEP: (
//     <>
//       <P d="M40 80 H200 V180 H360" />
//       <P d="M40 130 H150 V60 H360" i={1} />
//       <P d="M40 205 H360" i={2} dash="6 6" />
//     </>
//   ),
// };

// export default function BIMDisciplines() {
//   const [active, setActive] = useState(items[0].id);
//   const cur = items.find((x) => x.id === active);

//   return (
//     <section className="bg-white px-6 py-24 sm:px-10 lg:px-16">
//       <div className="mx-auto max-w-7xl">
//         <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#2A317A]">03 / Explore</p>
//         <h2 className="mt-3 text-[32px] font-bold uppercase leading-tight tracking-tight text-[#3C3C3B] sm:text-[48px]">
//           One building. Many systems.
//         </h2>
//         <p className="mt-4 max-w-xl text-[15.5px] text-[#3C3C3B]/80">
//           A building brings together different disciplines. BIM 3D helps represent these elements within one coordinated digital environment.
//         </p>

//         <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
//           <div role="tablist" aria-label="Disciplines" className="border-t border-[#3C3C3B]/20">
//             {items.map((x, i) => (
//               <button
//                 key={x.id}
//                 role="tab"
//                 aria-selected={active === x.id}
//                 onClick={() => setActive(x.id)}
//                 className={`flex w-full items-center gap-4 border-b border-[#3C3C3B]/20 px-3 py-5 text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#2A317A] ${
//                   active === x.id ? "bg-[#2A317A] pl-6 text-white" : "text-[#3C3C3B] hover:pl-5"
//                 }`}
//               >
//                 <span className="font-mono text-[12px]">0{i + 1}</span>
//                 <span className="text-[22px] font-bold uppercase tracking-tight sm:text-[28px]">{x.id}</span>
//               </button>
//             ))}
//             <p className="mt-5 min-h-[48px] text-[14.5px] text-[#3C3C3B]/80">{cur.text}</p>
//           </div>

//           <div className="relative bg-[#3C3C3B] p-4">
//             <span className="absolute right-4 top-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">Illustrative diagram</span>
//             <AnimatePresence mode="wait">
//               <motion.svg
//                 key={active}
//                 viewBox="0 0 400 260"
//                 role="img"
//                 aria-label={`Illustrative ${active} diagram`}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.25 }}
//                 className="w-full"
//               >
//                 {visuals[active]}
//               </motion.svg>
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// لما تجهزي الصور الحقيقية حطي المسار في image
// مثلا: image: "/images/bim/architecture.jpg" (من فولدر public)
const items = [
  {
    id: "Architecture",
    text: "Spaces, walls, doors, windows, finishes and architectural elements.",
    image:"/images/galala/1.png",
    tone: "from-[#2A317A] via-[#3C3C3B] to-[#1f2350]",
  },
  {
    id: "Structure",
    text: "Columns, beams, slabs and structural elements.",
    image:"/images/galala/2.png",
    tone: "from-[#3C3C3B] via-[#2A317A] to-[#3C3C3B]",
  },
  {
    id: "MEP",
    text: "Mechanical, electrical and plumbing systems.",
    image:"/images/galala/3.png",
    tone: "from-[#1f2350] via-[#3C3C3B] to-[#2A317A]",
  },
];

// صورة مؤقتة لحد ما الصور الحقيقية تجهز
function Placeholder({ label, tone }) {
  return (
    <div className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${tone}`}>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-1/4 -right-1/4 h-3/4 w-3/4 rotate-45 border border-white/20"
      />
      <div
        aria-hidden
        className="absolute -bottom-1/3 -right-1/3 h-3/4 w-3/4 rotate-45 border border-white/10"
      />
      <span className="absolute bottom-5 left-5 font-mono text-[11px] uppercase tracking-[0.28em] text-white/70">
        {label} / Image placeholder
      </span>
    </div>
  );
}

export default function BIMDisciplines() {
  const [active, setActive] = useState(items[0].id);
  const cur = items.find((x) => x.id === active);

  return (
    <section className="flex min-h-[80vh] items-center bg-white px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#2A317A]">03 / Explore</p>
        <h2 className="mt-3 text-[32px] font-bold uppercase leading-tight tracking-tight text-[#3C3C3B] sm:text-[48px]">
          One building. Many systems.
        </h2>
        <p className="mt-4 max-w-xl text-[15.5px] text-[#3C3C3B]/80">
          A building brings together different disciplines. BIM 3D helps represent these elements within one coordinated digital environment.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div role="tablist" aria-label="Disciplines" className="self-start border-t border-[#3C3C3B]/20">
            {items.map((x, i) => (
              <button
                key={x.id}
                role="tab"
                aria-selected={active === x.id}
                onClick={() => setActive(x.id)}
                className={`flex w-full items-center gap-4 border-b border-[#3C3C3B]/20 px-3 py-5 text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#2A317A] ${
                  active === x.id ? "bg-[#2A317A] pl-6 text-white" : "text-[#3C3C3B] hover:pl-5"
                }`}
              >
                <span className="font-mono text-[12px]">0{i + 1}</span>
                <span className="text-[22px] font-bold uppercase tracking-tight sm:text-[28px]">{x.id}</span>
              </button>
            ))}
            <p className="mt-5 min-h-[48px] text-[14.5px] text-[#3C3C3B]/80">{cur.text}</p>
          </div>

          <div className="relative h-[320px] overflow-hidden bg-[#3C3C3B] sm:h-[400px] lg:h-[440px]">
            <span className="absolute right-4 top-3 z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
              {cur.id}
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                {cur.image ? (
                  <img
                    src={cur.image}
                    alt={`${cur.id} discipline`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Placeholder label={cur.id} tone={cur.tone} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}