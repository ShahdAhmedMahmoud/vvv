import { motion } from "framer-motion";

const doorData = [
  ["Type", "D-90"], ["Width", "900 mm"], ["Height", "2100 mm"],
  ["Material", "Fire Rated"], ["Level", "L02"], ["Status", "Approved"],
];

export default function BIMDataInspector() {
  return (
    <section className="bg-[#EDF1F5] px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#2A317A]">04 / Data</p>
          <h2 className="mt-3 text-[32px] font-bold uppercase leading-tight tracking-tight text-[#3C3C3B] sm:text-[48px]">
            BIM = Geometry <span className="text-[#2A317A]">+ Information</span>
          </h2>
          <p className="mt-5 max-w-md text-[15px] text-[#3C3C3B]/80">
            Every element carries data. The values shown here are conceptual demo data, not from the 3D model above.
          </p>
        </div>

        <div className="border border-[#3C3C3B]/20 bg-white p-6">
          <div className="flex items-center justify-between border-b border-[#3C3C3B]/15 pb-3">
            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-[#3C3C3B]">Door D-102</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#2A317A]">Demo data</span>
          </div>
          <div className="mt-5 flex gap-6">
            <svg viewBox="0 0 80 120" className="h-32 shrink-0" aria-hidden="true">
              <rect x="10" y="6" width="60" height="108" fill="none" stroke="#3C3C3B" strokeWidth="2" />
              <rect x="18" y="14" width="44" height="100" fill="#2A317A" fillOpacity=".12" stroke="#2A317A" />
              <circle cx="56" cy="64" r="3" fill="#2A317A" />
            </svg>
            <dl className="flex-1">
              {doorData.map(([k, v], i) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex justify-between border-b border-dashed border-[#3C3C3B]/20 py-2 text-[13px]"
                >
                  <dt className="font-mono uppercase tracking-wide text-[#3C3C3B]/60">{k}</dt>
                  <dd className="font-semibold text-[#3C3C3B]">{v}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}