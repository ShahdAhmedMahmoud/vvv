// import { useId, useMemo, useState } from "react";
// import { Check, Plus, Search } from "lucide-react";
// import { descriptionOptionsFor } from "./supplierData";
// import { Button, cx } from "./SupplierUI";

// // Multi-select replacement for the old free-text description.
// // The list scrolls when long, and custom descriptions can be added so the user is never blocked.
// export default function WorkItemDescriptions({ itemName, value, onChange }) {
//   const id = useId();
//   const [q, setQ] = useState("");
//   const [custom, setCustom] = useState("");
//   const catalog = descriptionOptionsFor(itemName);
//   const options = useMemo(() => [...catalog, ...value.filter((v) => !catalog.includes(v))], [catalog, value]);
//   const visible = options.filter((o) => o.includes(q.trim()));

//   const toggle = (o) => onChange(value.includes(o) ? value.filter((v) => v !== o) : [...value, o]);
//   const addCustom = () => {
//     const t = custom.trim();
//     if (!t) return;
//     if (!value.includes(t)) onChange([...value, t]);
//     setCustom("");
//   };

//   return (
//     <div role="group" aria-labelledby={`${id}-label`}>
//       <div className="mb-2 flex items-baseline justify-between gap-2">
//         <p id={`${id}-label`} className="text-sm font-medium text-[#3C3C3B]">
//           Work item description <span dir="rtl" className="ml-1 text-xs font-normal text-[#3C3C3B]/55">وصف بند الأعمال</span>
//         </p>
//         <span aria-live="polite" className={cx("shrink-0 text-xs", value.length ? "font-medium text-[#2A317A]" : "text-[#3C3C3B]/50")}>
//           {value.length ? `Selected: ${value.length}` : "Optional"}
//         </span>
//       </div>

//       {options.length > 6 && (
//         <div className="relative mb-2">
//           <Search size={15} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#3C3C3B]/45" />
//           <input
//             dir="auto" aria-label={`Search descriptions for ${itemName}`} placeholder="Search descriptions" value={q} onChange={(e) => setQ(e.target.value)}
//             className="w-full rounded-lg border border-[#3C3C3B]/20 py-2 pl-9 pr-3 text-sm outline-none hover:border-[#3C3C3B]/40 focus-visible:border-[#2A317A] focus-visible:ring-2 focus-visible:ring-[#2A317A]/25"
//           />
//         </div>
//       )}

//       <div className="max-h-48 space-y-1 overflow-y-auto rounded-lg border border-[#3C3C3B]/15 p-1.5">
//         {visible.map((o) => {
//           const checked = value.includes(o);
//           return (
//             <label key={o} className="relative block cursor-pointer">
//               <input type="checkbox" className="peer sr-only" checked={checked} onChange={() => toggle(o)} />
//               <div className={cx(
//                 "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#2A317A]/40",
//                 checked ? "bg-[#2A317A]/[0.07] font-medium text-[#2A317A]" : "text-[#3C3C3B] hover:bg-[#3C3C3B]/5"
//               )}>
//                 <span aria-hidden="true" className={cx("flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors", checked ? "border-[#2A317A] bg-[#2A317A] text-white" : "border-[#3C3C3B]/25 text-transparent")}>
//                   <Check size={12} strokeWidth={3} />
//                 </span>
//                 <span dir="auto">{o}</span>
//               </div>
//             </label>
//           );
//         })}
//         {visible.length === 0 && <p className="px-3 py-4 text-center text-sm text-[#3C3C3B]/55">No descriptions match “{q}”.</p>}
//       </div>

//       <div className="mt-2 flex gap-2">
//         <input
//           dir="auto" aria-label="Add a custom description" placeholder="Add a custom description" value={custom}
//           onChange={(e) => setCustom(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustom(); } }}
//           className="min-w-0 flex-1 rounded-lg border border-[#3C3C3B]/20 px-3 py-2 text-sm outline-none hover:border-[#3C3C3B]/40 focus-visible:border-[#2A317A] focus-visible:ring-2 focus-visible:ring-[#2A317A]/25"
//         />
//         <Button variant="secondary" onClick={addCustom} disabled={!custom.trim()}>
//           <Plus size={16} aria-hidden="true" />
//           Add
//         </Button>
//         {value.length > 0 && <Button variant="ghost" onClick={() => onChange([])}>Clear</Button>}
//       </div>
//     </div>
//   );
// }


import { useId, useState } from "react";
import { Check, Search } from "lucide-react";
import { descriptionOptionsFor } from "./supplierData";
import { Button, cx } from "./SupplierUI";

// Multi-select only: the user picks from the predefined descriptions of the work item (no free text).
// The list scrolls when it is long.
export default function WorkItemDescriptions({ itemName, value, onChange }) {
  const id = useId();
  const [q, setQ] = useState("");
  const options = descriptionOptionsFor(itemName);
  const visible = options.filter((o) => o.includes(q.trim()));

  const toggle = (o) => onChange(value.includes(o) ? value.filter((v) => v !== o) : [...value, o]);

  return (
    <div role="group" aria-labelledby={`${id}-label`}>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <p id={`${id}-label`} className="text-sm font-medium text-[#3C3C3B]">
          Work item description <span dir="rtl" className="ml-1 text-xs font-normal text-[#3C3C3B]/55">وصف بند الأعمال</span>
        </p>
        <span aria-live="polite" className={cx("shrink-0 text-xs", value.length ? "font-medium text-[#2A317A]" : "text-[#3C3C3B]/50")}>
          {value.length ? `Selected: ${value.length}` : "Optional"}
        </span>
      </div>

      {options.length > 6 && (
        <div className="relative mb-2">
          <Search size={15} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#3C3C3B]/45" />
          <input
            dir="auto" aria-label={`Search descriptions for ${itemName}`} placeholder="Search descriptions" value={q} onChange={(e) => setQ(e.target.value)}
            className="w-full rounded-lg border border-[#3C3C3B]/20 py-2 pl-9 pr-3 text-sm outline-none hover:border-[#3C3C3B]/40 focus-visible:border-[#2A317A] focus-visible:ring-2 focus-visible:ring-[#2A317A]/25"
          />
        </div>
      )}

      <div className="max-h-48 space-y-1 overflow-y-auto rounded-lg border border-[#3C3C3B]/15 p-1.5">
        {visible.map((o) => {
          const checked = value.includes(o);
          return (
            <label key={o} className="relative block cursor-pointer">
              <input type="checkbox" className="peer sr-only" checked={checked} onChange={() => toggle(o)} />
              <div className={cx(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#2A317A]/40",
                checked ? "bg-[#2A317A]/[0.07] font-medium text-[#2A317A]" : "text-[#3C3C3B] hover:bg-[#3C3C3B]/5"
              )}>
                <span aria-hidden="true" className={cx("flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors", checked ? "border-[#2A317A] bg-[#2A317A] text-white" : "border-[#3C3C3B]/25 text-transparent")}>
                  <Check size={12} strokeWidth={3} />
                </span>
                <span dir="auto">{o}</span>
              </div>
            </label>
          );
        })}
        {visible.length === 0 && <p className="px-3 py-4 text-center text-sm text-[#3C3C3B]/55">No descriptions match “{q}”.</p>}
      </div>

      {value.length > 0 && (
        <Button variant="ghost" className="mt-2 px-3 py-1.5 text-xs" onClick={() => onChange([])}>Clear selection</Button>
      )}
    </div>
  );
}