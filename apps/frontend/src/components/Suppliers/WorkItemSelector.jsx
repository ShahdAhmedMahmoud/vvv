// import { useState } from "react";
// import { Check, Search } from "lucide-react";
// import { WORK_ITEMS_BY_SPECIALTY } from "./supplierData";
// import { Button, cx } from "./SupplierUI";

// // items = activities[specialtyId] → { [workItemName]: { workType, description } }
// export default function WorkItemSelector({ specialtyId, items, onChange }) {
//   const [q, setQ] = useState("");
//   const [confirmClear, setConfirmClear] = useState(false);
//   const all = WORK_ITEMS_BY_SPECIALTY[specialtyId] || [];
//   const visible = all.filter((n) => n.includes(q.trim()));
//   const selectedCount = Object.keys(items).length;
//   const allVisibleSelected = visible.length > 0 && visible.every((n) => items[n]);
//   const hasDescriptions = Object.values(items).some((v) => v.description.trim());

//   const blank = () => ({ workType: "supply", description: "" });
//   const toggle = (name) => {
//     if (items[name]) { const { [name]: _removed, ...rest } = items; onChange(rest); }
//     else onChange({ ...items, [name]: blank() });
//   };
//   const selectVisible = () => {
//     const next = { ...items };
//     visible.forEach((n) => { if (!next[n]) next[n] = blank(); });
//     onChange(next);
//   };
//   const clear = () => {
//     if (hasDescriptions && !confirmClear) return setConfirmClear(true);
//     onChange({});
//     setConfirmClear(false);
//   };

//   return (
//     <div>
//       <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//         <div className="relative w-full sm:max-w-xs">
//           <Search size={15} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#3C3C3B]/45" />
//           <input
//             dir="auto" aria-label="Search work items" placeholder="Search work items" value={q} onChange={(e) => setQ(e.target.value)}
//             className="w-full rounded-lg border border-[#3C3C3B]/20 py-2 pl-9 pr-3 text-sm outline-none hover:border-[#3C3C3B]/40 focus-visible:border-[#2A317A] focus-visible:ring-2 focus-visible:ring-[#2A317A]/25"
//           />
//         </div>
//         <div className="flex flex-wrap items-center gap-1">
//           <span aria-live="polite" className="mr-2 text-sm font-medium text-[#2A317A]">Selected: {selectedCount} of {all.length}</span>
//           <Button variant="ghost" className="px-3 py-1.5 text-xs" onClick={selectVisible} disabled={allVisibleSelected}>Select all visible</Button>
//           {confirmClear ? (
//             <>
//               <Button variant="danger" className="px-3 py-1.5 text-xs" onClick={clear}>Remove {selectedCount} and their descriptions</Button>
//               <Button variant="ghost" className="px-3 py-1.5 text-xs" onClick={() => setConfirmClear(false)}>Keep</Button>
//             </>
//           ) : (
//             <Button variant="ghost" className="px-3 py-1.5 text-xs" onClick={clear} disabled={selectedCount === 0}>Clear selection</Button>
//           )}
//         </div>
//       </div>

//       <div role="group" aria-label="Work items" className="mt-4 grid max-h-80 gap-2 overflow-y-auto p-1 sm:grid-cols-2">
//         {visible.map((name) => {
//           const checked = !!items[name];
//           return (
//             <label key={name} className="relative block cursor-pointer">
//               <input type="checkbox" className="peer sr-only" checked={checked} onChange={() => toggle(name)} />
//               <div className={cx(
//                 "flex items-center gap-3 rounded-lg border px-3.5 py-2.5 text-sm transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#2A317A]/40",
//                 checked ? "border-[#2A317A] bg-[#2A317A]/[0.05] font-medium text-[#2A317A]" : "border-[#3C3C3B]/15 bg-white text-[#3C3C3B] hover:border-[#2A317A]/40"
//               )}>
//                 <span aria-hidden="true" className={cx("flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors", checked ? "border-[#2A317A] bg-[#2A317A] text-white" : "border-[#3C3C3B]/25 text-transparent")}>
//                   <Check size={12} strokeWidth={3} />
//                 </span>
//                 <span dir="auto">{name}</span>
//               </div>
//             </label>
//           );
//         })}
//       </div>
//       {visible.length === 0 && <p className="mt-4 rounded-lg border border-dashed border-[#3C3C3B]/20 p-6 text-center text-sm text-[#3C3C3B]/55">No work items match “{q}”.</p>}
//     </div>
//   );
// }


import { useState } from "react";
import { Check, Search } from "lucide-react";
import { WORK_ITEMS_BY_SPECIALTY } from "./supplierData";
import { Button, cx } from "./SupplierUI";

// items = activities[specialtyId] → { [workItemName]: { workType, description } }
export default function WorkItemSelector({ specialtyId, items, onChange }) {
  const [q, setQ] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);
  const all = WORK_ITEMS_BY_SPECIALTY[specialtyId] || [];
  const visible = all.filter((n) => n.includes(q.trim()));
  const selectedCount = Object.keys(items).length;
  const allVisibleSelected = visible.length > 0 && visible.every((n) => items[n]);
  const hasDescriptions = Object.values(items).some((v) => v.descriptions.length > 0);

  const blank = () => ({ workType: "supply", descriptions: [] });
  const toggle = (name) => {
    if (items[name]) { const { [name]: _removed, ...rest } = items; onChange(rest); }
    else onChange({ ...items, [name]: blank() });
  };
  const selectVisible = () => {
    const next = { ...items };
    visible.forEach((n) => { if (!next[n]) next[n] = blank(); });
    onChange(next);
  };
  const clear = () => {
    if (hasDescriptions && !confirmClear) return setConfirmClear(true);
    onChange({});
    setConfirmClear(false);
  };

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search size={15} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#3C3C3B]/45" />
          <input
            dir="auto" aria-label="Search work items" placeholder="Search work items" value={q} onChange={(e) => setQ(e.target.value)}
            className="w-full rounded-lg border border-[#3C3C3B]/20 py-2 pl-9 pr-3 text-sm outline-none hover:border-[#3C3C3B]/40 focus-visible:border-[#2A317A] focus-visible:ring-2 focus-visible:ring-[#2A317A]/25"
          />
        </div>
        <div className="flex flex-wrap items-center gap-1">
          <span aria-live="polite" className="mr-2 text-sm font-medium text-[#2A317A]">Selected: {selectedCount} of {all.length}</span>
          <Button variant="ghost" className="px-3 py-1.5 text-xs" onClick={selectVisible} disabled={allVisibleSelected}>Select all visible</Button>
          {confirmClear ? (
            <>
              <Button variant="danger" className="px-3 py-1.5 text-xs" onClick={clear}>Remove {selectedCount} and their descriptions</Button>
              <Button variant="ghost" className="px-3 py-1.5 text-xs" onClick={() => setConfirmClear(false)}>Keep</Button>
            </>
          ) : (
            <Button variant="ghost" className="px-3 py-1.5 text-xs" onClick={clear} disabled={selectedCount === 0}>Clear selection</Button>
          )}
        </div>
      </div>

      <div role="group" aria-label="Work items" className="mt-4 grid max-h-80 gap-2 overflow-y-auto p-1 sm:grid-cols-2">
        {visible.map((name) => {
          const checked = !!items[name];
          return (
            <label key={name} className="relative block cursor-pointer">
              <input type="checkbox" className="peer sr-only" checked={checked} onChange={() => toggle(name)} />
              <div className={cx(
                "flex items-center gap-3 rounded-lg border px-3.5 py-2.5 text-sm transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#2A317A]/40",
                checked ? "border-[#2A317A] bg-[#2A317A]/[0.05] font-medium text-[#2A317A]" : "border-[#3C3C3B]/15 bg-white text-[#3C3C3B] hover:border-[#2A317A]/40"
              )}>
                <span aria-hidden="true" className={cx("flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors", checked ? "border-[#2A317A] bg-[#2A317A] text-white" : "border-[#3C3C3B]/25 text-transparent")}>
                  <Check size={12} strokeWidth={3} />
                </span>
                <span dir="auto">{name}</span>
              </div>
            </label>
          );
        })}
      </div>
      {visible.length === 0 && <p className="mt-4 rounded-lg border border-dashed border-[#3C3C3B]/20 p-6 text-center text-sm text-[#3C3C3B]/55">No work items match “{q}”.</p>}
    </div>
  );
}