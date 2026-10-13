// import { Pencil } from "lucide-react";
// import { SPECIALTIES } from "./supplierData";
// import { workTypeLabel } from "../../schemas/supplierSchema";
// import { Button, IconBox, SPECIALTY_ICONS } from "./SupplierUI";

// export default function SelectedActivityCard({ specialtyId, items, onEdit }) {
//   const name = SPECIALTIES.find((s) => s.id === specialtyId)?.name;
//   const entries = Object.entries(items);
//   return (
//     <div className="flex flex-col rounded-xl border border-[#3C3C3B]/15 bg-white p-4">
//       <div className="flex items-start gap-3">
//         <IconBox icon={SPECIALTY_ICONS[specialtyId]} />
//         <div className="min-w-0 flex-1">
//           <p dir="auto" className="text-sm font-semibold text-[#3C3C3B]">{name}</p>
//           <p className="text-xs text-[#3C3C3B]/55">{entries.length} work item{entries.length === 1 ? "" : "s"}</p>
//         </div>
//         <Button variant="ghost" className="px-2.5 py-1.5 text-xs" onClick={onEdit} aria-label={`Edit ${name} work items`}>
//           <Pencil size={13} aria-hidden="true" />
//           Edit
//         </Button>
//       </div>
//       <ul className="mt-3 space-y-1.5 border-t border-[#3C3C3B]/10 pt-3 text-sm text-[#3C3C3B]">
//         {entries.map(([item, v]) => (
//           <li key={item} className="flex flex-wrap items-baseline gap-x-2">
//             <span dir="auto">• {item}</span>
//             <span dir="auto" className="text-xs text-[#3C3C3B]/60">— {workTypeLabel(v.workType)}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


import { Pencil } from "lucide-react";
import { SPECIALTIES } from "./supplierData";
import { workTypeLabel } from "../../schemas/supplierSchema";
import { Button, IconBox, SPECIALTY_ICONS } from "./SupplierUI";

export default function SelectedActivityCard({ specialtyId, items, onEdit }) {
  const name = SPECIALTIES.find((s) => s.id === specialtyId)?.name;
  const entries = Object.entries(items);
  return (
    <div className="flex flex-col rounded-xl border border-[#3C3C3B]/15 bg-white p-4">
      <div className="flex items-start gap-3">
        <IconBox icon={SPECIALTY_ICONS[specialtyId]} />
        <div className="min-w-0 flex-1">
          <p dir="auto" className="text-sm font-semibold text-[#3C3C3B]">{name}</p>
          <p className="text-xs text-[#3C3C3B]/55">{entries.length} work item{entries.length === 1 ? "" : "s"}</p>
        </div>
        <Button variant="ghost" className="px-2.5 py-1.5 text-xs" onClick={onEdit} aria-label={`Edit ${name} work items`}>
          <Pencil size={13} aria-hidden="true" />
          Edit
        </Button>
      </div>
      <ul className="mt-3 max-h-40 space-y-1.5 overflow-y-auto border-t border-[#3C3C3B]/10 pt-3 text-sm text-[#3C3C3B]">
        {entries.map(([item, v]) => (
          <li key={item} className="flex flex-wrap items-baseline gap-x-2">
            <span dir="auto">• {item}</span>
            <span dir="auto" className="text-xs text-[#3C3C3B]/60">— {workTypeLabel(v.workType)}</span>
            {v.descriptions.length > 0 && <span className="text-xs text-[#3C3C3B]/50">· {v.descriptions.length} description{v.descriptions.length === 1 ? "" : "s"}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}