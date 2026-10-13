import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const g = "rgba(255,255,255,.14)";
const patterns = [
  [`linear-gradient(${g} 1px,transparent 1px),linear-gradient(90deg,${g} 1px,transparent 1px)`, "24px 24px"],
  [`repeating-linear-gradient(45deg,${g} 0 1px,transparent 1px 14px)`, "auto"],
  [`radial-gradient(${g} 1.5px,transparent 1.5px)`, "16px 16px"],
];
const benefits = [
  ["01", "Visualize", "See the project as a complete 3D environment before construction."],
  ["02", "Understand", "Understand building elements and their relationships through a coordinated model."],
  ["03", "Detect", "Identify potential conflicts visually before they become site problems."],
];
const corners = ["left-2 top-2 border-l border-t", "right-2 top-2 border-r border-t", "bottom-2 left-2 border-b border-l", "bottom-2 right-2 border-b border-r"];

function Card({ n, title, text, i, reduce }) {
  const [on, setOn] = useState(false);
  return (
    <motion.article
      tabIndex={0}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
      onFocus={() => setOn(true)}
      onBlur={() => setOn(false)}
      onClick={() => setOn((v) => !v)}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.12 }}
      whileHover={reduce ? undefined : { y: -8, scale: 1.02 }}
      className="relative flex min-h-[320px] cursor-pointer flex-col justify-between overflow-hidden border border-white/15 bg-[#2A317A] p-7 text-white outline-none"
    >
      <motion.div
        aria-hidden
        animate={{ opacity: on ? 1 : 0, backgroundPosition: on ? "24px 24px" : "0px 0px" }}
        transition={{ duration: 0.8 }}
        style={{ backgroundImage: patterns[i][0], backgroundSize: patterns[i][1] }}
        className="absolute inset-0"
      />
      <motion.span aria-hidden animate={{ width: on ? "100%" : "0%" }} className="absolute left-0 top-0 h-[2px] bg-[#2A317A]" />
      <motion.span aria-hidden animate={{ width: on ? "100%" : "0%" }} className="absolute bottom-0 right-0 h-[2px] bg-white" />
      {corners.map((c) => (
        <motion.span key={c} aria-hidden animate={{ opacity: on ? 1 : 0 }} className={`absolute h-3 w-3 border-white ${c}`} />
      ))}
      <motion.p animate={{ x: on && !reduce ? 14 : 0 }} className="relative font-mono text-[12px] uppercase tracking-[0.2em] text-white/70">
        {n} / {title}
      </motion.p>
      <div className="relative">
        <h3 className="text-[32px] font-bold uppercase tracking-tight">{title}</h3>
        <AnimatePresence>
          {on && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 overflow-hidden text-[14.5px] leading-relaxed text-white/80"
            >
              {text}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export default function BIMBenefits() {
  const reduce = useReducedMotion();
  return (
    <section className="bg-White px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/60">02 / Understand</p>
        <h2 className="mt-3 text-[32px] font-bold uppercase tracking-tight text-black sm:text-[48px]">Why BIM 3D?</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {benefits.map(([n, t, d], i) => (
            <Card key={t} n={n} title={t} text={d} i={i} reduce={reduce} />
          ))}
        </div>
      </div>
    </section>
  );
}