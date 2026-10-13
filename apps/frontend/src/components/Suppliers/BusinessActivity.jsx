// import { useEffect, useRef, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import SelectedActivityCard from "./SelectedActivityCard";
// import SpecialtySelector from "./SpecialtySelector";
// import WorkItemConfiguration from "./WorkItemConfiguration";
// import WorkItemSelector from "./WorkItemSelector";
// import { SPECIALTIES } from "./supplierData";
// import { countItems } from "../../schemas/supplierSchema";
// import { Button, cx, EASE, ErrorText, SPECIALTY_ICONS, StepHeading } from "./SupplierUI";

// const nameOf = (id) => SPECIALTIES.find((s) => s.id === id)?.name;

// function SubHeading({ n, title, description }) {
//   return (
//     <div className="mb-4 flex items-start gap-3">
//       <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2A317A] text-xs font-semibold text-white">{n}</span>
//       <div>
//         <h3 className="text-sm font-semibold text-[#3C3C3B]">{title}</h3>
//         {description && <p className="text-xs text-[#3C3C3B]/55">{description}</p>}
//       </div>
//     </div>
//   );
// }

// const reveal = {
//   initial: { opacity: 0, y: 8, height: 0 }, animate: { opacity: 1, y: 0, height: "auto" }, exit: { opacity: 0, y: 8, height: 0 },
//   transition: { duration: 0.3, ease: EASE },
// };

// // One coherent flow on one page: specialties → work items → configure → selected summary.
// export default function BusinessActivity({ specialties, activities, onChange, errors }) {
//   const [active, setActive] = useState(specialties[0] || null);
//   const [pendingRemove, setPendingRemove] = useState(null);
//   const itemsRef = useRef(null);

//   useEffect(() => {
//     if (!specialties.includes(active)) setActive(specialties[0] || null);
//   }, [specialties, active]);

//   const counts = Object.fromEntries(specialties.map((id) => [id, Object.keys(activities[id] || {}).length]));
//   const total = countItems(activities, specialties);

//   const removeSpecialty = (id) => {
//     const { [id]: _gone, ...rest } = activities;
//     onChange({ specialties: specialties.filter((s) => s !== id), activities: rest });
//     setPendingRemove(null);
//   };
//   const toggleSpecialty = (id) => {
//     if (specialties.includes(id)) {
//       if (counts[id] > 0) setPendingRemove(id); // never drop configured work silently
//       else removeSpecialty(id);
//     } else {
//       onChange({ specialties: [...specialties, id], activities });
//       setActive(id);
//       setPendingRemove(null);
//     }
//   };
//   const setItems = (id, items) => onChange({ specialties, activities: { ...activities, [id]: items } });
//   const editSpecialty = (id) => {
//     setActive(id);
//     itemsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   return (
//     <div className="space-y-5">
//       <StepHeading title="Business activity" description="Choose what this supplier does. We'll show only the work items that match your specialties." />

//       <section className="rounded-xl border border-[#3C3C3B]/12 bg-white p-5 sm:p-6">
//         <SubHeading n={1} title="Select specialties" description="Pick one or more" />
//         <SpecialtySelector selected={specialties} counts={counts} onToggle={toggleSpecialty} />
//         <ErrorText id="specialties-err" message={errors.specialties} />
//         <AnimatePresence initial={false}>
//           {pendingRemove && (
//             <motion.div key="confirm" {...reveal} className="overflow-hidden">
//               <div role="alert" className="mt-4 flex flex-col gap-3 rounded-lg border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
//                 <p className="text-sm text-[#3C3C3B]">
//                   Remove <strong dir="auto">{nameOf(pendingRemove)}</strong>? Its {counts[pendingRemove]} configured work item{counts[pendingRemove] === 1 ? "" : "s"} will be removed too.
//                 </p>
//                 <div className="flex shrink-0 gap-2">
//                   <Button variant="secondary" className="px-3 py-1.5 text-xs" onClick={() => setPendingRemove(null)}>Keep specialty</Button>
//                   <Button variant="danger" className="px-3 py-1.5 text-xs" onClick={() => removeSpecialty(pendingRemove)}>Remove</Button>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </section>

//       {specialties.length === 0 ? (
//         <p className="rounded-xl border border-dashed border-[#3C3C3B]/20 p-6 text-center text-sm text-[#3C3C3B]/55">
//           Select a specialty above to see its work items.
//         </p>
//       ) : (
//         <>
//           <section ref={itemsRef} className="scroll-mt-4 rounded-xl border border-[#3C3C3B]/12 bg-white p-5 sm:p-6">
//             <SubHeading n={2} title="Select work items" description="Switch between your specialties to pick items for each" />
//             <div role="tablist" aria-label="Specialties" className="mb-5 flex flex-wrap gap-2">
//               {specialties.map((id) => {
//                 const Icon = SPECIALTY_ICONS[id];
//                 const on = id === active;
//                 return (
//                   <button
//                     key={id} type="button" role="tab" id={`tab-${id}`} aria-selected={on} aria-controls="work-items-panel" onClick={() => setActive(id)}
//                     className={cx("flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A317A]/40",
//                       on ? "border-[#2A317A] bg-[#2A317A] text-white" : "border-[#3C3C3B]/20 bg-white text-[#3C3C3B] hover:border-[#2A317A]/50")}
//                   >
//                     <Icon size={14} aria-hidden="true" />
//                     <span dir="auto">{nameOf(id)}</span>
//                     <span className={cx("rounded-full px-1.5 text-xs", on ? "bg-white/20" : "bg-[#2A317A]/10 text-[#2A317A]")}>{counts[id]}</span>
//                   </button>
//                 );
//               })}
//             </div>
//             {active && (
//               <div id="work-items-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
//                 <WorkItemSelector key={active} specialtyId={active} items={activities[active] || {}} onChange={(items) => setItems(active, items)} />
//               </div>
//             )}
//             <ErrorText id="items-err" message={errors.items} />
//           </section>

//           <AnimatePresence initial={false}>
//             {active && counts[active] > 0 && (
//               <motion.section key="config" {...reveal} className="overflow-hidden">
//                 <div className="rounded-xl border border-[#3C3C3B]/12 bg-white p-5 sm:p-6">
//                   <SubHeading n={3} title={`Configure ${nameOf(active)} work items`} description="Set the work type and describe each item" />
//                   <WorkItemConfiguration items={activities[active]} onChange={(items) => setItems(active, items)} />
//                 </div>
//               </motion.section>
//             )}
//           </AnimatePresence>

//           <AnimatePresence initial={false}>
//             {total > 0 && (
//               <motion.section key="summary" {...reveal} className="overflow-hidden">
//                 <div className="rounded-xl border border-[#3C3C3B]/12 bg-white p-5 sm:p-6">
//                   <SubHeading n={4} title="Selected activities" description={`${specialties.length} specialt${specialties.length === 1 ? "y" : "ies"} · ${total} work item${total === 1 ? "" : "s"}`} />
//                   <div className="grid gap-3 sm:grid-cols-2">
//                     {specialties.filter((id) => counts[id] > 0).map((id) => (
//                       <SelectedActivityCard key={id} specialtyId={id} items={activities[id]} onEdit={() => editSpecialty(id)} />
//                     ))}
//                   </div>
//                 </div>
//               </motion.section>
//             )}
//           </AnimatePresence>
//         </>
//       )}
//     </div>
//   );
// }


import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SelectedActivityCard from "./SelectedActivityCard";
import SpecialtySelector from "./SpecialtySelector";
import WorkItemConfiguration from "./WorkItemConfiguration";
import WorkItemSelector from "./WorkItemSelector";
import { SPECIALTIES } from "./supplierData";
import { countItems } from "../../schemas/supplierSchema";
import { Button, cx, EASE, ErrorText, SPECIALTY_ICONS, StepHeading } from "./SupplierUI";

const nameOf = (id) => SPECIALTIES.find((s) => s.id === id)?.name;

function SubHeading({ n, title, description }) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2A317A] text-xs font-semibold text-white">{n}</span>
      <div>
        <h3 className="text-sm font-semibold text-[#3C3C3B]">{title}</h3>
        {description && <p className="text-xs text-[#3C3C3B]/55">{description}</p>}
      </div>
    </div>
  );
}

const reveal = {
  initial: { opacity: 0, y: 8, height: 0 }, animate: { opacity: 1, y: 0, height: "auto" }, exit: { opacity: 0, y: 8, height: 0 },
  transition: { duration: 0.3, ease: EASE },
};

// One coherent flow on one page: specialties → work items → configure → selected summary.
export default function BusinessActivity({ specialties, activities, onChange, errors }) {
  const [active, setActive] = useState(specialties[0] || null);
  const [pendingRemove, setPendingRemove] = useState(null);
  const itemsRef = useRef(null);

  useEffect(() => {
    if (!specialties.includes(active)) setActive(specialties[0] || null);
  }, [specialties, active]);

  const counts = Object.fromEntries(specialties.map((id) => [id, Object.keys(activities[id] || {}).length]));
  const total = countItems(activities, specialties);

  const removeSpecialty = (id) => {
    const { [id]: _gone, ...rest } = activities;
    onChange({ specialties: specialties.filter((s) => s !== id), activities: rest });
    setPendingRemove(null);
  };
  const toggleSpecialty = (id) => {
    if (specialties.includes(id)) {
      if (counts[id] > 0) setPendingRemove(id); // never drop configured work silently
      else removeSpecialty(id);
    } else {
      onChange({ specialties: [...specialties, id], activities });
      setActive(id);
      setPendingRemove(null);
    }
  };
  const setItems = (id, items) => onChange({ specialties, activities: { ...activities, [id]: items } });
  const editSpecialty = (id) => {
    setActive(id);
    itemsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="space-y-5">
      <StepHeading title="Business activity" description="Choose what this supplier does. We'll show only the work items that match your specialties." />

      <section className="rounded-xl border border-[#3C3C3B]/12 bg-white p-5 sm:p-6">
        <SubHeading n={1} title="Select specialties" description="Pick one or more" />
        <SpecialtySelector selected={specialties} counts={counts} onToggle={toggleSpecialty} />
        <ErrorText id="specialties-err" message={errors.specialties} />
        <AnimatePresence initial={false}>
          {pendingRemove && (
            <motion.div key="confirm" {...reveal} className="overflow-hidden">
              <div role="alert" className="mt-4 flex flex-col gap-3 rounded-lg border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[#3C3C3B]">
                  Remove <strong dir="auto">{nameOf(pendingRemove)}</strong>? Its {counts[pendingRemove]} configured work item{counts[pendingRemove] === 1 ? "" : "s"} will be removed too.
                </p>
                <div className="flex shrink-0 gap-2">
                  <Button variant="secondary" className="px-3 py-1.5 text-xs" onClick={() => setPendingRemove(null)}>Keep specialty</Button>
                  <Button variant="danger" className="px-3 py-1.5 text-xs" onClick={() => removeSpecialty(pendingRemove)}>Remove</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {specialties.length === 0 ? (
        <p className="rounded-xl border border-dashed border-[#3C3C3B]/20 p-6 text-center text-sm text-[#3C3C3B]/55">
          Select a specialty above to see its work items.
        </p>
      ) : (
        <>
          <section ref={itemsRef} className="scroll-mt-28 rounded-xl border border-[#3C3C3B]/12 bg-white p-5 sm:p-6">
            <SubHeading n={2} title="Select work items" description="Switch between your specialties to pick items for each" />
            <div role="tablist" aria-label="Specialties" className="mb-5 flex flex-wrap gap-2">
              {specialties.map((id) => {
                const Icon = SPECIALTY_ICONS[id];
                const on = id === active;
                return (
                  <button
                    key={id} type="button" role="tab" id={`tab-${id}`} aria-selected={on} aria-controls="work-items-panel" onClick={() => setActive(id)}
                    className={cx("flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A317A]/40",
                      on ? "border-[#2A317A] bg-[#2A317A] text-white" : "border-[#3C3C3B]/20 bg-white text-[#3C3C3B] hover:border-[#2A317A]/50")}
                  >
                    <Icon size={14} aria-hidden="true" />
                    <span dir="auto">{nameOf(id)}</span>
                    <span className={cx("rounded-full px-1.5 text-xs", on ? "bg-white/20" : "bg-[#2A317A]/10 text-[#2A317A]")}>{counts[id]}</span>
                  </button>
                );
              })}
            </div>
            {active && (
              <div id="work-items-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
                <WorkItemSelector key={active} specialtyId={active} items={activities[active] || {}} onChange={(items) => setItems(active, items)} />
              </div>
            )}
            <ErrorText id="items-err" message={errors.items} />
          </section>

          <AnimatePresence initial={false}>
            {active && counts[active] > 0 && (
              <motion.section key="config" {...reveal} className="overflow-hidden">
                <div className="rounded-xl border border-[#3C3C3B]/12 bg-white p-5 sm:p-6">
                  <SubHeading n={3} title={`Configure ${nameOf(active)} work items`} description="Set the work type and describe each item" />
                  <WorkItemConfiguration items={activities[active]} onChange={(items) => setItems(active, items)} />
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          <AnimatePresence initial={false}>
            {total > 0 && (
              <motion.section key="summary" {...reveal} className="overflow-hidden">
                <div className="rounded-xl border border-[#3C3C3B]/12 bg-white p-5 sm:p-6">
                  <SubHeading n={4} title="Selected activities" description={`${specialties.length} specialt${specialties.length === 1 ? "y" : "ies"} · ${total} work item${total === 1 ? "" : "s"}`} />
                  <div className="grid gap-3 sm:grid-cols-2">
                    {specialties.filter((id) => counts[id] > 0).map((id) => (
                      <SelectedActivityCard key={id} specialtyId={id} items={activities[id]} onEdit={() => editSpecialty(id)} />
                    ))}
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}