

// import { useMemo, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { SlidersHorizontal } from "lucide-react";

// import FilterSidebar from "../Filtersidebar/Filtersidebar";
// import JobCard from "../Jobcard/Jobcard";
// import KineticGrid from "../KineticGrid/KineticGrid";

// import {
//   jobs as allJobs,
//   departments,
//   jobTypes,
//   locations,
// } from "../../features/careers/Jobsdata";

// const CARD_HEIGHT = 350; // لازم يتطابق مع BLOCK_HEIGHT في FilterSidebar.jsx

// const containerVariants = {
//   hidden: {},
//   visible: {
//     transition: { staggerChildren: 0.08, delayChildren: 0.1 },
//   },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 24, scale: 0.97 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: { type: "spring", stiffness: 260, damping: 24 },
//   },
// };

// function toggle(list, value) {
//   return list.includes(value)
//     ? list.filter((v) => v !== value)
//     : [...list, value];
// }

// export default function OpenPositions() {
//   const [selectedDepartments, setSelectedDepartments] = useState([]);
//   const [selectedJobTypes, setSelectedJobTypes] = useState([]);
//   const [selectedLocations, setSelectedLocations] = useState([]);

//   const matches = (job, skip) => {
//     const departmentOk =
//       skip === "department" ||
//       selectedDepartments.length === 0 ||
//       selectedDepartments.includes(job.department);

//     const typeOk =
//       skip === "type" ||
//       selectedJobTypes.length === 0 ||
//       selectedJobTypes.includes(job.type);

//     const locationOk =
//       skip === "location" ||
//       selectedLocations.length === 0 ||
//       job.locations.some((location) => selectedLocations.includes(location));

//     return departmentOk && typeOk && locationOk;
//   };

//   const filteredJobs = useMemo(
//     () => allJobs.filter((job) => matches(job, null)),
//     [selectedDepartments, selectedJobTypes, selectedLocations]
//   );

//   const counts = useMemo(() => {
//     const result = { department: {}, type: {}, location: {} };

//     departments.forEach((department) => {
//       result.department[department] = allJobs.filter(
//         (job) => job.department === department && matches(job, "department")
//       ).length;
//     });

//     jobTypes.forEach((type) => {
//       result.type[type] = allJobs.filter(
//         (job) => job.type === type && matches(job, "type")
//       ).length;
//     });

//     locations.forEach((location) => {
//       result.location[location] = allJobs.filter(
//         (job) => job.locations.includes(location) && matches(job, "location")
//       ).length;
//     });

//     return result;
//   }, [selectedDepartments, selectedJobTypes, selectedLocations]);

//   const activeCount =
//     selectedDepartments.length + selectedJobTypes.length + selectedLocations.length;

//   const clearAll = () => {
//     setSelectedDepartments([]);
//     setSelectedJobTypes([]);
//     setSelectedLocations([]);
//   };

//   return (
//     <section className="relative overflow-hidden bg-[#3C3C3B]">
//       <KineticGrid>
//         <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-40 sm:px-10 sm:pt-44 lg:px-16 lg:pt-48">
//           {/* ============================================================
//               HEADER
//               الـ "Showing X jobs" اتنقلت هنا جوه الهيدر العام،
//               عشان الـ sidebar وعمود الـ job cards يبدأوا من نفس الـ y بالظبط
//           ============================================================ */}
//           <div className="mb-10 flex flex-col gap-4 sm:mb-12">
//             <motion.p
//               initial={{ opacity: 0, y: 8 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.45 }}
//               className="text-[11px] font-medium uppercase tracking-[0.28em] text-white"
//             >
//               Careers / Opportunities
//             </motion.p>

//             <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
//               <motion.h2
//                 initial={{ opacity: 0, y: 14 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.05 }}
//                 className="text-[38px] font-bold uppercase tracking-tight text-white sm:text-[46px] lg:text-[52px]"
//               >
//                 Open Positions
//               </motion.h2>

//               <div className="flex items-center gap-2 pb-1 text-[13px] text-white">
//                 <SlidersHorizontal className="h-3.5 w-3.5" />
//                 <span>
//                   Showing{" "}
//                   <AnimatePresence mode="wait">
//                     <motion.span
//                       key={filteredJobs.length}
//                       initial={{ opacity: 0, y: -6 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: 6 }}
//                       transition={{ duration: 0.15 }}
//                       className="inline-block font-semibold text-white"
//                     >
//                       {filteredJobs.length}
//                     </motion.span>
//                   </AnimatePresence>{" "}
//                   job{filteredJobs.length !== 1 ? "s" : ""}
//                 </span>
//               </div>
//             </div>

//             <motion.div
//               initial={{ scaleX: 0 }}
//               animate={{ scaleX: 1 }}
//               transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
//               className="h-[3px] w-16 origin-left rounded-full bg-[#2A317A]"
//             />
//           </div>

//           {/* ============================================================
//               MAIN GRID: SIDEBAR | JOBS
//               نفس الـ gap-6 (24px) في كل مكان
//           ============================================================ */}
//           <div className="grid grid-cols-1 gap-6 lg:grid-cols-[290px_minmax(0,1fr)] lg:gap-6">
//             <FilterSidebar
//               departments={departments}
//               jobTypes={jobTypes}
//               locations={locations}
//               selectedDepartments={selectedDepartments}
//               selectedJobTypes={selectedJobTypes}
//               selectedLocations={selectedLocations}
//               onToggleDepartment={(department) =>
//                 setSelectedDepartments((previous) => toggle(previous, department))
//               }
//               onToggleJobType={(type) =>
//                 setSelectedJobTypes((previous) => toggle(previous, type))
//               }
//               onToggleLocation={(location) =>
//                 setSelectedLocations((previous) => toggle(previous, location))
//               }
//               counts={counts}
//               activeCount={activeCount}
//               onClear={clearAll}
//             />

//             {/* عمود الـ jobs بيبدأ فورًا من غير أي شريط فوقه، فيبقى متطابق مع بداية الـ sidebar */}
//             <div className="min-w-0">
//               <motion.div
//                 layout
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate="visible"
//                 className="grid auto-rows-[350px] grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
//               >
//                 <AnimatePresence mode="popLayout">
//                   {filteredJobs.map((job) => (
//                     <motion.div
//                       key={job.id}
//                       layout
//                       variants={cardVariants}
//                       className="min-h-0 min-w-0 [&>*]:h-full"
//                       style={{ height: `${CARD_HEIGHT}px` }}
//                     >
//                       <JobCard job={job} variants={cardVariants} />
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               </motion.div>

//               {filteredJobs.length === 0 && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   style={{ height: `${CARD_HEIGHT}px` }}
//                   className="flex flex-col items-center justify-center border border-dashed border-white/30 bg-white/[0.04] text-center"
//                 >
//                   <div className="mb-4 flex h-12 w-12 items-center justify-center border border-white/20">
//                     <SlidersHorizontal className="h-5 w-5 text-white" />
//                   </div>
//                   <p className="text-[15px] font-medium text-white">
//                     No roles match these filters
//                   </p>
//                   <button
//                     onClick={clearAll}
//                     className="mt-3 text-[13px] font-medium text-white underline underline-offset-4 transition-opacity hover:opacity-60"
//                   >
//                     Clear filters
//                   </button>
//                 </motion.div>
//               )}
//             </div>
//           </div>
//         </div>
//       </KineticGrid>

//       <div className="h-[100px] w-full bg-white" />
//     </section>
//   );
// }


import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";

import FilterSidebar from "../Filtersidebar/Filtersidebar";
import JobCard from "../Jobcard/Jobcard";
import KineticGrid from "../KineticGrid/KineticGrid";
import Pagination from "../Pagination/Pagination"; // ← جديد

import {
  jobs as allJobs,
  departments,
  jobTypes,
  locations,
} from "../../features/careers/Jobsdata";

const CARD_HEIGHT = 350; // لازم يتطابق مع BLOCK_HEIGHT في FilterSidebar.jsx
const PAGE_SIZE = 30; // ← عدد الكروت في الصفحة الواحدة

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
};

function toggle(list, value) {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

export default function OpenPositions() {
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsTopRef = useRef(null);

  const matches = (job, skip) => {
    const departmentOk =
      skip === "department" ||
      selectedDepartments.length === 0 ||
      selectedDepartments.includes(job.department);

    const typeOk =
      skip === "type" ||
      selectedJobTypes.length === 0 ||
      selectedJobTypes.includes(job.type);

    const locationOk =
      skip === "location" ||
      selectedLocations.length === 0 ||
      job.locations.some((location) => selectedLocations.includes(location));

    return departmentOk && typeOk && locationOk;
  };

  const filteredJobs = useMemo(
    () => allJobs.filter((job) => matches(job, null)),
    [selectedDepartments, selectedJobTypes, selectedLocations]
  );

  /* ---------- Pagination ---------- */
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));

  // أي تغيير في الفلاتر يرجّعنا لأول صفحة
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDepartments, selectedJobTypes, selectedLocations]);

  // حماية: لو الصفحة الحالية بقت أكبر من عدد الصفحات
  const safePage = Math.min(currentPage, totalPages);

  const paginatedJobs = useMemo(
    () => filteredJobs.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [filteredJobs, safePage]
  );

  const goToPage = (page) => {
    setCurrentPage(page);
    jobsTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const counts = useMemo(() => {
    const result = { department: {}, type: {}, location: {} };

    departments.forEach((department) => {
      result.department[department] = allJobs.filter(
        (job) => job.department === department && matches(job, "department")
      ).length;
    });

    jobTypes.forEach((type) => {
      result.type[type] = allJobs.filter(
        (job) => job.type === type && matches(job, "type")
      ).length;
    });

    locations.forEach((location) => {
      result.location[location] = allJobs.filter(
        (job) => job.locations.includes(location) && matches(job, "location")
      ).length;
    });

    return result;
  }, [selectedDepartments, selectedJobTypes, selectedLocations]);

  const activeCount =
    selectedDepartments.length + selectedJobTypes.length + selectedLocations.length;

  const clearAll = () => {
    setSelectedDepartments([]);
    setSelectedJobTypes([]);
    setSelectedLocations([]);
  };

  return (
    <section className="relative overflow-hidden bg-[#3C3C3B]">
      <KineticGrid>
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-40 sm:px-10 sm:pt-44 lg:px-16 lg:pt-48">
          {/* HEADER */}
          <div className="mb-10 flex flex-col gap-4 sm:mb-12">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-[11px] font-medium uppercase tracking-[0.28em] text-white"
            >
              Careers / Opportunities
            </motion.p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="text-[38px] font-bold uppercase tracking-tight text-white sm:text-[46px] lg:text-[52px]"
              >
                Open Positions
              </motion.h2>

              <div className="flex items-center gap-2 pb-1 text-[13px] text-white">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>
                  Showing{" "}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={filteredJobs.length}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="inline-block font-semibold text-white"
                    >
                      {filteredJobs.length}
                    </motion.span>
                  </AnimatePresence>{" "}
                  job{filteredJobs.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="h-[3px] w-16 origin-left rounded-full bg-[#2A317A]"
            />
          </div>

          {/* MAIN GRID: SIDEBAR | JOBS */}
          <div
            ref={jobsTopRef}
            className="grid scroll-mt-28 grid-cols-1 gap-6 lg:grid-cols-[290px_minmax(0,1fr)] lg:gap-6"
          >
            <FilterSidebar
              departments={departments}
              jobTypes={jobTypes}
              locations={locations}
              selectedDepartments={selectedDepartments}
              selectedJobTypes={selectedJobTypes}
              selectedLocations={selectedLocations}
              onToggleDepartment={(department) =>
                setSelectedDepartments((previous) => toggle(previous, department))
              }
              onToggleJobType={(type) =>
                setSelectedJobTypes((previous) => toggle(previous, type))
              }
              onToggleLocation={(location) =>
                setSelectedLocations((previous) => toggle(previous, location))
              }
              counts={counts}
              activeCount={activeCount}
              onClear={clearAll}
            />

            <div className="min-w-0">
              <motion.div
                layout
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid auto-rows-[350px] grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {paginatedJobs.map((job) => (
                    <motion.div
                      key={job.id}
                      layout
                      variants={cardVariants}
                      className="min-h-0 min-w-0 [&>*]:h-full"
                      style={{ height: `${CARD_HEIGHT}px` }}
                    >
                      <JobCard job={job} variants={cardVariants} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {filteredJobs.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ height: `${CARD_HEIGHT}px` }}
                  className="flex flex-col items-center justify-center border border-dashed border-white/30 bg-white/[0.04] text-center"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center border border-white/20">
                    <SlidersHorizontal className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-[15px] font-medium text-white">
                    No roles match these filters
                  </p>
                  <button
                    onClick={clearAll}
                    className="mt-3 text-[13px] font-medium text-white underline underline-offset-4 transition-opacity hover:opacity-60"
                  >
                    Clear filters
                  </button>
                </motion.div>
              )}

              {/* PAGINATION: بيظهر بس لما الوظائف أكتر من 30 */}
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                totalItems={filteredJobs.length}
                pageSize={PAGE_SIZE}
                onChange={goToPage}
              />
            </div>
          </div>
        </div>
      </KineticGrid>

      <div className="h-[100px] w-full bg-white" />
    </section>
  );
}