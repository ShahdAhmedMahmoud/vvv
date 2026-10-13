


// // import { AnimatePresence, motion } from "framer-motion";
// // import { Briefcase, Clock, MapPin, X } from "lucide-react";
// // import FilterCheckbox from "../Filtercheckbox/Filtercheckbox";

// // export const BLOCK_HEIGHT = 350; // لازم يتطابق مع CARD_HEIGHT في OpenPositions.jsx

// // function FilterGroup({ icon: Icon, title, items, selected, onToggle, getCount, columns = 1, className = "" }) {
// //   return (
// //     <div
// //       className={`flex min-h-0 flex-1 flex-col border border-[#3C3C3B]/15 bg-white p-4 ${className}`}
// //     >
// //       <div className="mb-2 flex shrink-0 items-center gap-2 border-b border-[#3C3C3B]/10 pb-2 text-[#3C3C3B]">
// //         <Icon className="h-4 w-4 text-[#2A317A]" strokeWidth={2} />
// //         <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em]">{title}</h3>
// //       </div>

// //       <div
// //         className={
// //           columns === 2
// //             ? "grid flex-1 grid-cols-2 content-start gap-x-3 gap-y-1.5"
// //             : "flex flex-1 flex-col content-start gap-1.5"
// //         }
// //       >
// //         {items.map((item) => (
// //           <FilterCheckbox
// //             key={item}
// //             id={`${title}-${item}`}
// //             label={item}
// //             count={getCount ? getCount(item) : undefined}
// //             checked={selected.includes(item)}
// //             onChange={() => onToggle(item)}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default function FilterSidebar({
// //   departments,
// //   jobTypes,
// //   locations,
// //   selectedDepartments,
// //   selectedJobTypes,
// //   selectedLocations,
// //   onToggleDepartment,
// //   onToggleJobType,
// //   onToggleLocation,
// //   counts,
// //   activeCount,
// //   onClear,
// // }) {
// //   return (
// //     <aside className="flex w-full flex-col gap-6 lg:w-[290px] lg:shrink-0">
// //       {/*
// //         Department + Job Type
// //         ارتفاعهم الكلي = ارتفاع الـ Job Card بالظبط (BLOCK_HEIGHT)
// //         كل واحد فيهم flex-1 عشان يتقسموا بالتساوي بينهم
// //       */}
// //       <div
// //         className="relative flex flex-col gap-6"
// //         style={{ height: `${BLOCK_HEIGHT}px` }}
// //       >
// //         <AnimatePresence initial={false}>
// //           {activeCount > 0 && (
// //             <motion.button
// //               key="clear"
// //               initial={{ opacity: 0, y: -8 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               exit={{ opacity: 0, y: -8 }}
// //               transition={{ duration: 0.2 }}
// //               onClick={onClear}
// //               className="absolute right-3 top-3 z-10 flex items-center gap-2 border border-[#2A317A] bg-white px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-[#3C3C3B] shadow-sm transition-colors hover:bg-[#2A317A] hover:text-white"
// //             >
// //               <span>
// //                 {activeCount} filter{activeCount > 1 ? "s" : ""}
// //               </span>
// //               <X className="h-3.5 w-3.5" />
// //             </motion.button>
// //           )}
// //         </AnimatePresence>

// //         <FilterGroup
// //           icon={Briefcase}
// //           title="Department"
// //           items={departments}
// //           selected={selectedDepartments}
// //           onToggle={onToggleDepartment}
// //           getCount={(d) => counts.department[d] || 0}
// //           columns={2}
// //         />

// //         <FilterGroup
// //           icon={Clock}
// //           title="Job Type"
// //           items={jobTypes}
// //           selected={selectedJobTypes}
// //           onToggle={onToggleJobType}
// //           getCount={(t) => counts.type[t] || 0}
// //           columns={2}
// //         />
// //       </div>

// //       {/*
// //         Location
// //         ارتفاعها = ارتفاع الـ Job Card بالظبط (BLOCK_HEIGHT) برضو
// //         عمود واحد لأنها لوحدها وعندها مساحة كافية
// //       */}
// //       <div style={{ height: `${BLOCK_HEIGHT}px` }}>
// //         <FilterGroup
// //           icon={MapPin}
// //           title="Location"
// //           items={locations}
// //           selected={selectedLocations}
// //           onToggle={onToggleLocation}
// //           getCount={(l) => counts.location[l] || 0}
// //           columns={1}
// //           className="h-full"
// //         />
// //       </div>
// //     </aside>
// //   );
// // }


// import { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { Briefcase, ChevronDown, Clock, MapPin, SlidersHorizontal, X } from "lucide-react";
// import FilterCheckbox from "../Filtercheckbox/Filtercheckbox";

// export const BLOCK_HEIGHT = 350; // لازم يتطابق مع CARD_HEIGHT في OpenPositions.jsx (بيتطبق على الديسكتوب بس)

// function FilterGroup({ icon: Icon, title, items, selected, onToggle, getCount, columns = 1, className = "" }) {
//   return (
//     <div
//       className={`flex min-h-0 flex-1 flex-col border border-[#3C3C3B]/15 bg-white p-4 ${className}`}
//     >
//       <div className="mb-2 flex shrink-0 items-center gap-2 border-b border-[#3C3C3B]/10 pb-2 text-[#3C3C3B]">
//         <Icon className="h-4 w-4 text-[#2A317A]" strokeWidth={2} />
//         <h3 className="text-[11px] font-semibold uppercase tracking-[0.1em]">{title}</h3>
//       </div>

//       <div
//         className={
//           columns === 2
//             ? "grid flex-1 grid-cols-2 content-start gap-x-3 gap-y-1.5"
//             : "flex flex-1 flex-col content-start gap-1.5"
//         }
//       >
//         {items.map((item) => (
//           <FilterCheckbox
//             key={item}
//             id={`${title}-${item}`}
//             label={item}
//             count={getCount ? getCount(item) : undefined}
//             checked={selected.includes(item)}
//             onChange={() => onToggle(item)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function FilterSidebar({
//   departments,
//   jobTypes,
//   locations,
//   selectedDepartments,
//   selectedJobTypes,
//   selectedLocations,
//   onToggleDepartment,
//   onToggleJobType,
//   onToggleLocation,
//   counts,
//   activeCount,
//   onClear,
// }) {
//   // بيتحكم في فتح/قفل الفلاتر على الموبايل والتابلت فقط
//   const [open, setOpen] = useState(false);

//   return (
//     <aside className="flex w-full flex-col lg:w-[290px] lg:shrink-0">
//       {/* ========= HEADER (موبايل/تابلت فقط): اسم الفلتر + سهم ========= */}
//       <button
//         type="button"
//         onClick={() => setOpen((v) => !v)}
//         aria-expanded={open}
//         aria-controls="filters-panel"
//         className="flex w-full items-center justify-between border border-[#3C3C3B]/15 bg-white px-4 py-3.5 text-[#3C3C3B] shadow-sm lg:hidden"
//       >
//         <span className="flex items-center gap-2.5">
//           <SlidersHorizontal className="h-4 w-4 text-[#2A317A]" />
//           <span className="text-[12px] font-semibold uppercase tracking-[0.12em]">
//             Filters
//           </span>
//           <AnimatePresence initial={false}>
//             {activeCount > 0 && (
//               <motion.span
//                 key="badge"
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 exit={{ scale: 0 }}
//                 className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2A317A] px-1.5 text-[11px] font-semibold text-white"
//               >
//                 {activeCount}
//               </motion.span>
//             )}
//           </AnimatePresence>
//         </span>

//         <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
//           <ChevronDown className="h-5 w-5 text-[#2A317A]" />
//         </motion.span>
//       </button>

//       {/* ========= PANEL =========
//           موبايل: بيتفتح ويتقفل بانيميشن (grid-rows 0fr ↔ 1fr)
//           ديسكتوب: ظاهر دايمًا (lg:grid-rows-[1fr])
//       */}
//       <div
//         id="filters-panel"
//         className={`grid transition-[grid-template-rows] duration-300 ease-out lg:grid-rows-[1fr] ${
//           open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
//         }`}
//       >
//         <div className="min-h-0 overflow-hidden lg:overflow-visible">
//           <div className="flex flex-col gap-6 pt-3 lg:pt-0">
//             {/* Department + Job Type */}
//             <div className="relative flex flex-col gap-6 lg:h-[350px]">
//               <AnimatePresence initial={false}>
//                 {activeCount > 0 && (
//                   <motion.button
//                     key="clear"
//                     initial={{ opacity: 0, y: -8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -8 }}
//                     transition={{ duration: 0.2 }}
//                     onClick={onClear}
//                     className="absolute right-3 top-3 z-10 flex items-center gap-2 border border-[#2A317A] bg-white px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-[#3C3C3B] shadow-sm transition-colors hover:bg-[#2A317A] hover:text-white"
//                   >
//                     <span>
//                       {activeCount} filter{activeCount > 1 ? "s" : ""}
//                     </span>
//                     <X className="h-3.5 w-3.5" />
//                   </motion.button>
//                 )}
//               </AnimatePresence>

//               <FilterGroup
//                 icon={Briefcase}
//                 title="Department"
//                 items={departments}
//                 selected={selectedDepartments}
//                 onToggle={onToggleDepartment}
//                 getCount={(d) => counts.department[d] || 0}
//                 columns={2}
//               />

//               <FilterGroup
//                 icon={Clock}
//                 title="Job Type"
//                 items={jobTypes}
//                 selected={selectedJobTypes}
//                 onToggle={onToggleJobType}
//                 getCount={(t) => counts.type[t] || 0}
//                 columns={2}
//               />
//             </div>

//             {/* Location */}
//             <div className="lg:h-[350px]">
//               <FilterGroup
//                 icon={MapPin}
//                 title="Location"
//                 items={locations}
//                 selected={selectedLocations}
//                 onToggle={onToggleLocation}
//                 getCount={(l) => counts.location[l] || 0}
//                 columns={1}
//                 className="h-full"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// }

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, ChevronDown, Clock, MapPin, X } from "lucide-react";
import FilterCheckbox from "../Filtercheckbox/Filtercheckbox";

export const BLOCK_HEIGHT = 350; // لازم يتطابق مع CARD_HEIGHT في OpenPositions.jsx (بيتطبق على الديسكتوب بس)

/*
  كل FilterGroup ليه state خاص بيه (open):
  - موبايل/تابلت (أقل من lg): الهيدر زرار بسهم، والمحتوى بيتفتح ويتقفل لوحده
  - ديسكتوب (lg وفوق): المحتوى ظاهر دايمًا والسهم مخفي
*/
function FilterGroup({
  icon: Icon,
  title,
  items,
  selected,
  onToggle,
  getCount,
  columns = 1,
  className = "",
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`flex min-h-0 flex-col border border-[#3C3C3B]/15 bg-white lg:flex-1 ${className}`}
    >
      {/* ===== HEADER ===== */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full shrink-0 items-center justify-between gap-2 px-4 py-3.5 text-[#3C3C3B] lg:pointer-events-none lg:cursor-default lg:pb-2 lg:pt-4"
      >
        <span className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-[#2A317A]" strokeWidth={2} />
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em]">
            {title}
          </span>

          <AnimatePresence initial={false}>
            {selected.length > 0 && (
              <motion.span
                key="badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2A317A] px-1.5 text-[11px] font-semibold text-white lg:hidden"
              >
                {selected.length}
              </motion.span>
            )}
          </AnimatePresence>
        </span>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="lg:hidden"
        >
          <ChevronDown className="h-5 w-5 text-[#2A317A]" />
        </motion.span>
      </button>

      {/* ===== BODY (grid-rows 0fr ↔ 1fr = أنيميشن فتح/قفل بدون ما نحسب الارتفاع) ===== */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out lg:min-h-0 lg:flex-1 lg:grid-rows-[1fr] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden lg:overflow-visible">
          <div className="mx-4 border-t border-[#3C3C3B]/10" />

          <div
            className={`px-4 pb-4 pt-3 ${
              columns === 2
                ? "grid grid-cols-2 content-start gap-x-3 gap-y-1.5"
                : "flex flex-col gap-1.5"
            }`}
          >
            {items.map((item) => (
              <FilterCheckbox
                key={item}
                id={`${title}-${item}`}
                label={item}
                count={getCount ? getCount(item) : undefined}
                checked={selected.includes(item)}
                onChange={() => onToggle(item)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FilterSidebar({
  departments,
  jobTypes,
  locations,
  selectedDepartments,
  selectedJobTypes,
  selectedLocations,
  onToggleDepartment,
  onToggleJobType,
  onToggleLocation,
  counts,
  activeCount,
  onClear,
}) {
  return (
    <aside className="flex w-full flex-col gap-3 lg:w-[290px] lg:shrink-0 lg:gap-6">
      {/* Department + Job Type
          ديسكتوب: ارتفاعهم الكلي = ارتفاع الـ Job Card بالظبط
          موبايل: ارتفاع تلقائي، وكل واحد accordion لوحده */}
      <div className="relative flex flex-col gap-3 lg:h-[350px] lg:gap-6">
        <AnimatePresence initial={false}>
          {activeCount > 0 && (
            <motion.button
              key="clear"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              onClick={onClear}
              className="z-10 flex items-center gap-2 self-end border border-[#2A317A] bg-white px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-[#3C3C3B] shadow-sm transition-colors hover:bg-[#2A317A] hover:text-white lg:absolute lg:right-3 lg:top-3 lg:self-auto"
            >
              <span>
                {activeCount} filter{activeCount > 1 ? "s" : ""}
              </span>
              <X className="h-3.5 w-3.5" />
            </motion.button>
          )}
        </AnimatePresence>

        <FilterGroup
          icon={Briefcase}
          title="Department"
          items={departments}
          selected={selectedDepartments}
          onToggle={onToggleDepartment}
          getCount={(d) => counts.department[d] || 0}
          columns={2}
        />

        <FilterGroup
          icon={Clock}
          title="Job Type"
          items={jobTypes}
          selected={selectedJobTypes}
          onToggle={onToggleJobType}
          getCount={(t) => counts.type[t] || 0}
          columns={2}
        />
      </div>

      {/* Location */}
      <div className="lg:h-[350px]">
        <FilterGroup
          icon={MapPin}
          title="Location"
          items={locations}
          selected={selectedLocations}
          onToggle={onToggleLocation}
          getCount={(l) => counts.location[l] || 0}
          columns={1}
          className="lg:h-full"
        />
      </div>
    </aside>
  );
}