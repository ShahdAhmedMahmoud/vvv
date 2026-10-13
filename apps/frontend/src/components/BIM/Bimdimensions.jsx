import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const bimDimensions = [
  { id: "3D", label: "Geometry", text: "A coordinated 3D model of every discipline — the single source everyone works from.", points: ["Architecture + structure + MEP", "Visual coordination", "Consistent drawings from one model"] },
  { id: "4D", label: "Time", text: "Link model elements to the construction schedule to plan sequence and logistics.", points: ["Phasing simulation", "Site logistics planning", "Schedule review"] },
  { id: "5D", label: "Cost", text: "Extract quantities directly from the model to support estimating and cost control.", points: ["Quantity take-off", "Estimate support", "Change impact"] },
  { id: "6D", label: "Performance", text: "Use model data to study energy, sustainability and building performance.", points: ["Performance analysis", "Material information", "Sustainability review"] },
  { id: "7D", label: "Operations", text: "Hand over structured asset data to support facility management after completion.", points: ["Asset information", "Maintenance planning", "As-built handover"] },
];

export default function BIMDimensions() {
  const [active, setActive] = useState(0);
  const d = bimDimensions[active];

  return (
    <section className="bg-white px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#2A317A]">03 / Dimensions</p>
        <h2 className="mt-3 text-[32px] font-bold uppercase leading-tight tracking-tight text-[#3C3C3B] sm:text-[48px]">
          3D · 4D · 5D · 6D · 7D
        </h2>

        <div role="tablist" aria-label="BIM dimensions" className="mt-10 flex overflow-x-auto border-y border-[#3C3C3B]/20">
          {bimDimensions.map((x, i) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`relative shrink-0 px-6 py-5 text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#2A317A] ${
                i === active ? "flex-[2] bg-[#2A317A] text-white" : "flex-1 text-[#3C3C3B] hover:bg-[#EDF1F5]"
              }`}
            >
              <span className="block text-[26px] font-bold leading-none">{x.id}</span>
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] opacity-70">{x.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-10 min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={d.id}
              role="tabpanel"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid gap-8 md:grid-cols-[1fr_1fr]"
            >
              <p className="text-[20px] leading-snug text-[#3C3C3B] sm:text-[26px]">{d.text}</p>
              <ul className="border-t-2 border-[#2A317A]">
                {d.points.map((p, i) => (
                  <li key={p} className="flex gap-4 border-b border-[#3C3C3B]/15 py-3 text-[15px] text-[#3C3C3B]">
                    <span className="font-mono text-[12px] text-[#2A317A]">{d.id}.{i + 1}</span>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}