import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const elements = ["Walls", "Doors", "Windows", "Columns", "Beams", "Slabs", "Spaces", "MEP Elements"];

export default function BIMElements() {
  const [active, setActive] = useState(null);
  const reduce = useReducedMotion();

  return (
    <section className="bg-black px-6 py-24 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/60">06 / Details</p>
        <h2 className="mt-3 text-[32px] font-bold uppercase tracking-tight sm:text-[48px]">See every detail.</h2>

        <ul onMouseLeave={() => setActive(null)} className="mt-12 grid grid-cols-2 border-l border-t border-white/15 lg:grid-cols-4">
          {elements.map((e, i) => (
            <motion.li
              key={e}
              tabIndex={0}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(active === i ? null : i)}
              animate={{ opacity: active === null || active === i ? 1 : 0.3, scale: active === i && !reduce ? 1.04 : 1 }}
              transition={{ duration: 0.3 }}
              className={`relative cursor-pointer border-b border-r border-white/15 p-5 outline-none sm:p-7 ${active === i ? "z-10 bg-[#2A317A]" : ""}`}
            >
              <span className="font-mono text-[11px] text-white/60">{String(i + 1).padStart(2, "0")}</span>
              <span className="mt-16 block text-[18px] font-bold uppercase tracking-tight sm:mt-24 sm:text-[22px]">{e}</span>
              <motion.span animate={{ opacity: active === i ? 1 : 0, y: active === i ? 0 : 6 }} className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">
                Element / {e}
              </motion.span>
              <motion.span
                aria-hidden
                animate={{ x: active === i ? 0 : -8, y: active === i ? 0 : 8, opacity: active === i ? 1 : 0 }}
                className="absolute right-4 top-4"
              >
                <ArrowUpRight className="h-4 w-4" />
              </motion.span>
              <span aria-hidden className={`pointer-events-none absolute inset-2 border border-white/60 transition-opacity ${active === i ? "opacity-100" : "opacity-0"}`} />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}