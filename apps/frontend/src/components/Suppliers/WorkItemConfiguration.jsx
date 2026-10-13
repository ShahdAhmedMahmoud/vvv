// import { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { Check, ChevronDown, X } from "lucide-react";
// import { WORK_TYPES, workTypeLabel } from "../../schemas/supplierSchema";
// import { Collapse, cx, EASE, TextArea } from "./SupplierUI";

// function ConfigCard({ name, value, onChange, onRemove }) {
//   const [open, setOpen] = useState(true);
//   return (
//     <motion.li
//       layout initial={{ opacity: 0, height: 0, y: -8 }} animate={{ opacity: 1, height: "auto", y: 0 }} exit={{ opacity: 0, height: 0, y: -8 }}
//       transition={{ duration: 0.28, ease: EASE }} className="overflow-hidden rounded-xl border border-[#3C3C3B]/15 bg-white"
//     >
//       <div className="flex items-center gap-2 pr-2">
//         <button
//           type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)}
//           className="flex min-w-0 flex-1 items-center gap-3 rounded-xl p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A317A]/40"
//         >
//           <span aria-hidden="true" className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#2A317A] text-white"><Check size={12} strokeWidth={3} /></span>
//           <span dir="auto" className="truncate text-sm font-semibold text-[#3C3C3B]">{name}</span>
//           <span dir="auto" className="shrink-0 rounded-full bg-[#2A317A]/10 px-2.5 py-0.5 text-xs font-medium text-[#2A317A]">{workTypeLabel(value.workType)}</span>
//           <ChevronDown size={16} aria-hidden="true" className={cx("ml-auto shrink-0 text-[#3C3C3B]/50 transition-transform", open && "rotate-180")} />
//         </button>
//         <button type="button" onClick={onRemove} aria-label={`Remove ${name}`} className="rounded-lg p-2 text-[#3C3C3B]/50 hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600/40">
//           <X size={16} aria-hidden="true" />
//         </button>
//       </div>

//       <Collapse open={open}>
//         <div className="space-y-4 border-t border-[#3C3C3B]/10 p-4 pt-4">
//           <div>
//             <p id={`wt-${name}`} className="mb-2 text-sm font-medium text-[#3C3C3B]">Work type</p>
//             <div role="radiogroup" aria-labelledby={`wt-${name}`} className="grid grid-cols-3 gap-2">
//               {WORK_TYPES.map((w) => {
//                 const on = value.workType === w.id;
//                 return (
//                   <button
//                     key={w.id} type="button" role="radio" aria-checked={on} onClick={() => onChange({ ...value, workType: w.id })}
//                     className={cx(
//                       "flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A317A]/40 sm:text-sm",
//                       on ? "border-[#2A317A] bg-[#2A317A] text-white" : "border-[#3C3C3B]/20 bg-white text-[#3C3C3B] hover:border-[#2A317A]/50"
//                     )}
//                   >
//                     {on && <Check size={14} aria-hidden="true" />}
//                     <span dir="auto">{w.label}</span>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//           <TextArea
//             label={<>Work item description <span dir="rtl" className="ml-1 text-xs font-normal text-[#3C3C3B]/55">وصف بند الأعمال</span></>}
//             optional value={value.description} onChange={(e) => onChange({ ...value, description: e.target.value })}
//           />
//         </div>
//       </Collapse>
//     </motion.li>
//   );
// }

// export default function WorkItemConfiguration({ items, onChange }) {
//   const names = Object.keys(items);
//   const setOne = (name, v) => onChange({ ...items, [name]: v });
//   const removeOne = (name) => { const { [name]: _r, ...rest } = items; onChange(rest); };
//   return (
//     <ul className="space-y-3" aria-label="Selected work items">
//       <AnimatePresence initial={false}>
//         {names.map((name) => (
//           <ConfigCard key={name} name={name} value={items[name]} onChange={(v) => setOne(name, v)} onRemove={() => removeOne(name)} />
//         ))}
//       </AnimatePresence>
//     </ul>
//   );
// }


import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, X } from "lucide-react";
import { WORK_TYPES, workTypeLabel } from "../../schemas/supplierSchema";
import WorkItemDescriptions from "./WorkItemDescriptions";
import { Collapse, cx, EASE } from "./SupplierUI";

function ConfigCard({ name, value, onChange, onRemove }) {
  const [open, setOpen] = useState(true);
  return (
    <motion.li
      layout initial={{ opacity: 0, height: 0, y: -8 }} animate={{ opacity: 1, height: "auto", y: 0 }} exit={{ opacity: 0, height: 0, y: -8 }}
      transition={{ duration: 0.28, ease: EASE }} className="overflow-hidden rounded-xl border border-[#3C3C3B]/15 bg-white"
    >
      <div className="flex items-center gap-2 pr-2">
        <button
          type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)}
          className="flex min-w-0 flex-1 items-center gap-3 rounded-xl p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A317A]/40"
        >
          <span aria-hidden="true" className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#2A317A] text-white"><Check size={12} strokeWidth={3} /></span>
          <span dir="auto" className="truncate text-sm font-semibold text-[#3C3C3B]">{name}</span>
          <span dir="auto" className="shrink-0 rounded-full bg-[#2A317A]/10 px-2.5 py-0.5 text-xs font-medium text-[#2A317A]">{workTypeLabel(value.workType)}</span>
          {value.descriptions.length > 0 && <span className="shrink-0 text-xs text-[#3C3C3B]/55">+{value.descriptions.length}</span>}
          <ChevronDown size={16} aria-hidden="true" className={cx("ml-auto shrink-0 text-[#3C3C3B]/50 transition-transform", open && "rotate-180")} />
        </button>
        <button type="button" onClick={onRemove} aria-label={`Remove ${name}`} className="rounded-lg p-2 text-[#3C3C3B]/50 hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600/40">
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      <Collapse open={open}>
        <div className="space-y-4 border-t border-[#3C3C3B]/10 p-4 pt-4">
          <div>
            <p id={`wt-${name}`} className="mb-2 text-sm font-medium text-[#3C3C3B]">Work type</p>
            <div role="radiogroup" aria-labelledby={`wt-${name}`} className="grid grid-cols-3 gap-2">
              {WORK_TYPES.map((w) => {
                const on = value.workType === w.id;
                return (
                  <button
                    key={w.id} type="button" role="radio" aria-checked={on} onClick={() => onChange({ ...value, workType: w.id })}
                    className={cx(
                      "flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A317A]/40 sm:text-sm",
                      on ? "border-[#2A317A] bg-[#2A317A] text-white" : "border-[#3C3C3B]/20 bg-white text-[#3C3C3B] hover:border-[#2A317A]/50"
                    )}
                  >
                    {on && <Check size={14} aria-hidden="true" />}
                    <span dir="auto">{w.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <WorkItemDescriptions itemName={name} value={value.descriptions} onChange={(descriptions) => onChange({ ...value, descriptions })} />
        </div>
      </Collapse>
    </motion.li>
  );
}

export default function WorkItemConfiguration({ items, onChange }) {
  const names = Object.keys(items);
  const setOne = (name, v) => onChange({ ...items, [name]: v });
  const removeOne = (name) => { const { [name]: _r, ...rest } = items; onChange(rest); };
  return (
    <ul className="max-h-[32rem] space-y-3 overflow-y-auto p-1" aria-label="Selected work items">
      <AnimatePresence initial={false}>
        {names.map((name) => (
          <ConfigCard key={name} name={name} value={items[name]} onChange={(v) => setOne(name, v)} onRemove={() => removeOne(name)} />
        ))}
      </AnimatePresence>
    </ul>
  );
}