// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Check, Search } from "lucide-react";
// import { SPECIALTIES } from "./supplierData";
// import { cx, SPECIALTY_ICONS } from "./SupplierUI";

// export default function SpecialtySelector({ selected, counts, onToggle }) {
//   const [q, setQ] = useState("");
//   const list = SPECIALTIES.filter((s) => s.name.includes(q.trim()));

//   return (
//     <div>
//       <div className="flex flex-wrap items-center justify-between gap-3">
//         <div className="relative w-full sm:max-w-xs">
//           <Search size={15} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#3C3C3B]/45" />
//           <input
//             dir="auto" aria-label="Search specialties" placeholder="Search specialties" value={q} onChange={(e) => setQ(e.target.value)}
//             className="w-full rounded-lg border border-[#3C3C3B]/20 py-2 pl-9 pr-3 text-sm outline-none hover:border-[#3C3C3B]/40 focus-visible:border-[#2A317A] focus-visible:ring-2 focus-visible:ring-[#2A317A]/25"
//           />
//         </div>
//         <p aria-live="polite" className="text-sm font-medium text-[#2A317A]">Selected: {selected.length}</p>
//       </div>

//       <div role="group" aria-label="Specialties" className="mt-4 grid gap-3 sm:grid-cols-2">
//         {list.map((s) => {
//           const checked = selected.includes(s.id);
//           const Icon = SPECIALTY_ICONS[s.id];
//           const n = counts[s.id] || 0;
//           return (
//             <label key={s.id} className="relative block cursor-pointer">
//               <input type="checkbox" className="peer sr-only" checked={checked} onChange={() => onToggle(s.id)} />
//               <motion.div
//                 animate={{ scale: checked ? 1.01 : 1 }} transition={{ duration: 0.2 }}
//                 className={cx(
//                   "flex items-center gap-3 rounded-xl border-2 p-4 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#2A317A]/40 peer-focus-visible:ring-offset-2",
//                   checked ? "border-[#2A317A] bg-[#2A317A]/[0.05]" : "border-[#3C3C3B]/15 bg-white hover:border-[#2A317A]/40"
//                 )}
//               >
//                 <span className={cx("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors", checked ? "bg-[#2A317A] text-white" : "bg-[#2A317A]/8 text-[#2A317A]")}>
//                   <Icon size={18} aria-hidden="true" />
//                 </span>
//                 <span className="min-w-0 flex-1">
//                   <span dir="auto" className="block text-sm font-semibold text-[#3C3C3B]">{s.name}</span>
//                   <span className="block text-xs text-[#3C3C3B]/55">{checked ? `${n} work item${n === 1 ? "" : "s"}` : "Not selected"}</span>
//                 </span>
//                 <span aria-hidden="true" className={cx("flex h-6 w-6 items-center justify-center rounded-md border-2 transition-colors", checked ? "border-[#2A317A] bg-[#2A317A] text-white" : "border-[#3C3C3B]/25 text-transparent")}>
//                   <Check size={14} strokeWidth={3} />
//                 </span>
//               </motion.div>
//             </label>
//           );
//         })}
//       </div>
//       {list.length === 0 && <p className="mt-4 text-sm text-[#3C3C3B]/55">No specialty matches “{q}”.</p>}
//     </div>
//   );
// }


import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Search } from "lucide-react";
import { SPECIALTIES } from "./supplierData";
import { cx, SPECIALTY_ICONS } from "./SupplierUI";

export default function SpecialtySelector({ selected, counts, onToggle }) {
  const [q, setQ] = useState("");
  const list = SPECIALTIES.filter((s) => s.name.includes(q.trim()));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search size={15} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#3C3C3B]/45" />
          <input
            dir="auto" aria-label="Search specialties" placeholder="Search specialties" value={q} onChange={(e) => setQ(e.target.value)}
            className="w-full rounded-lg border border-[#3C3C3B]/20 py-2 pl-9 pr-3 text-sm outline-none hover:border-[#3C3C3B]/40 focus-visible:border-[#2A317A] focus-visible:ring-2 focus-visible:ring-[#2A317A]/25"
          />
        </div>
        <p aria-live="polite" className="text-sm font-medium text-[#2A317A]">Selected: {selected.length}</p>
      </div>

      <div role="group" aria-label="Specialties" className="mt-4 grid max-h-80 gap-3 overflow-y-auto p-1.5 sm:grid-cols-2">
        {list.map((s) => {
          const checked = selected.includes(s.id);
          const Icon = SPECIALTY_ICONS[s.id];
          const n = counts[s.id] || 0;
          return (
            <label key={s.id} className="relative block cursor-pointer">
              <input type="checkbox" className="peer sr-only" checked={checked} onChange={() => onToggle(s.id)} />
              <motion.div
                animate={{ scale: checked ? 1.01 : 1 }} transition={{ duration: 0.2 }}
                className={cx(
                  "flex items-center gap-3 rounded-xl border-2 p-4 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#2A317A]/40 peer-focus-visible:ring-offset-2",
                  checked ? "border-[#2A317A] bg-[#2A317A]/[0.05]" : "border-[#3C3C3B]/15 bg-white hover:border-[#2A317A]/40"
                )}
              >
                <span className={cx("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors", checked ? "bg-[#2A317A] text-white" : "bg-[#2A317A]/8 text-[#2A317A]")}>
                  <Icon size={18} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span dir="auto" className="block text-sm font-semibold text-[#3C3C3B]">{s.name}</span>
                  <span className="block text-xs text-[#3C3C3B]/55">{checked ? `${n} work item${n === 1 ? "" : "s"}` : "Not selected"}</span>
                </span>
                <span aria-hidden="true" className={cx("flex h-6 w-6 items-center justify-center rounded-md border-2 transition-colors", checked ? "border-[#2A317A] bg-[#2A317A] text-white" : "border-[#3C3C3B]/25 text-transparent")}>
                  <Check size={14} strokeWidth={3} />
                </span>
              </motion.div>
            </label>
          );
        })}
      </div>
      {list.length === 0 && <p className="mt-4 text-sm text-[#3C3C3B]/55">No specialty matches “{q}”.</p>}
    </div>
  );
}