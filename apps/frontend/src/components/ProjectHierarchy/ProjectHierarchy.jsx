
// // // // // import { useEffect, useMemo, useState } from "react";
// // // // // import { AnimatePresence, motion } from "motion/react";
// // // // // import {
// // // // //   ClipboardList,
// // // // //   HardHat,
// // // // //   Layers,
// // // // //   Building2,
// // // // //   Cable,
// // // // //   Paintbrush,
// // // // //   Sparkles,
// // // // //   CheckCircle2,
// // // // //   Plus,
// // // // //   ArrowRight,
// // // // // } from "lucide-react";
// // // // // import KineticGrid from "../KineticGrid/KineticGrid";

// // // // // const PHASES = [
// // // // //   {
// // // // //     title: "Project Start",
// // // // //     tag: "START",
// // // // //     icon: ClipboardList,
// // // // //   },
// // // // //   {
// // // // //     title: "Site Preparation",
// // // // //     tag: "PREP",
// // // // //     icon: HardHat,
// // // // //   },
// // // // //   {
// // // // //     title: "Foundation",
// // // // //     tag: "FOUND",
// // // // //     icon: Layers,
// // // // //   },
// // // // //   {
// // // // //     title: "Structural Work",
// // // // //     tag: "STRUCT",
// // // // //     icon: Building2,
// // // // //   },
// // // // //   {
// // // // //     title: "MEP Installation",
// // // // //     tag: "MEP",
// // // // //     icon: Cable,
// // // // //   },
// // // // //   {
// // // // //     title: "Interior & Exterior",
// // // // //     tag: "FINISH",
// // // // //     icon: Paintbrush,
// // // // //   },
// // // // //   {
// // // // //     title: "Final Finishing",
// // // // //     tag: "DETAIL",
// // // // //     icon: Sparkles,
// // // // //   },
// // // // //   {
// // // // //     title: "Project Completed",
// // // // //     tag: "DONE",
// // // // //     icon: CheckCircle2,
// // // // //   },
// // // // // ];

// // // // // const GROUPS = [
// // // // //   {
// // // // //     title: "Pre-Construction",
// // // // //     phases: [0, 1],
// // // // //   },
// // // // //   {
// // // // //     title: "Core Construction",
// // // // //     phases: [2, 3, 4],
// // // // //   },
// // // // //   {
// // // // //     title: "Finishing & Delivery",
// // // // //     phases: [5, 6, 7],
// // // // //   },
// // // // // ];


// // // // // const CARD_HOLD = 1900;
// // // // // const RESET_DELAY = 900;



// // // // // const ACCENT = "#FFFFFF";
// // // // // const NAVY = "#2A317A";
// // // // // const BG = "#3C3C3B";

// // // // // const LINE_IDLE = "rgba(255,255,255,0.12)";
// // // // // const LINE_ACTIVE = "rgba(255,255,255,0.55)";



// // // // // const GROUP_POSITIONS_DESKTOP = [
// // // // //   { x: 30, y: 22 },
// // // // //   { x: 48, y: 50 },
// // // // //   { x: 66, y: 78 },
// // // // // ];

// // // // // const ROOT_POSITION_DESKTOP = {
// // // // //   x: 7,
// // // // //   y: 50,
// // // // // };

// // // // // const CARD_POSITION_DESKTOP = {
// // // // //   x: 78,
// // // // // };

// // // // // function getGroupIndex(phaseIndex) {
// // // // //   return GROUPS.findIndex((group) =>
// // // // //     group.phases.includes(phaseIndex)
// // // // //   );
// // // // // }

// // // // // function PhaseCard({
// // // // //   phase,
// // // // //   index,
// // // // //   image,
// // // // //   progress,
// // // // //   status,
// // // // //   groupIndex,
// // // // // }) {
// // // // //   const Icon = phase.icon;

// // // // //   return (
// // // // //     <motion.div
// // // // //       initial={{
// // // // //         opacity: 0,
// // // // //         scale: 0.9,
// // // // //       }}
// // // // //       animate={{
// // // // //         opacity: 1,
// // // // //         scale: 1,
// // // // //       }}
// // // // //       exit={{
// // // // //         opacity: 0,
// // // // //         scale: 0.92,
// // // // //       }}
// // // // //       transition={{
// // // // //         duration: 0.65,
// // // // //         ease: [0.22, 1, 0.36, 1],
// // // // //       }}
// // // // //       className="
// // // // //         w-[280px]
// // // // //         sm:w-[310px]
// // // // //         lg:w-[340px]
// // // // //         overflow-hidden
// // // // //         rounded-2xl
// // // // //         border border-white/10
        
// // // // //         bg-[#3C3C3B]
// // // // //         shadow-[0_25px_80px_rgba(0,0,0,0.35)]
// // // // //       "
// // // // //     >
// // // // //       {/* IMAGE */}

// // // // //       <div className="relative h-40 sm:h-44 lg:h-48 w-full overflow-hidden">
// // // // //         <motion.img
// // // // //           src={image}
// // // // //           alt={phase.title}
// // // // //           initial={{ scale: 1.1 }}
// // // // //           animate={{ scale: 1 }}
// // // // //           transition={{
// // // // //             duration: 1.4,
// // // // //             ease: "easeOut",
// // // // //           }}
// // // // //           className="h-full w-full object-cover"
// // // // //         />

// // // // //         {/* dark cinematic overlay */}
// // // // //         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

// // // // //         {/* phase number */}

// // // // //         <div className="absolute left-3 top-3">
// // // // //           <span className="
// // // // //             rounded-full
// // // // //             bg-black/60
// // // // //             px-2.5
// // // // //             py-1
// // // // //             text-[9px]
// // // // //             font-semibold
// // // // //             tracking-[0.12em]
// // // // //             text-white
// // // // //             backdrop-blur-md
// // // // //           ">
// // // // //             PHASE {String(index + 1).padStart(2, "0")}
// // // // //           </span>
// // // // //         </div>

// // // // //         {/* icon */}

// // // // //         <div className="
// // // // //           absolute
// // // // //           right-3
// // // // //           top-3
// // // // //           flex
// // // // //           h-8
// // // // //           w-8
// // // // //           items-center
// // // // //           justify-center
// // // // //           rounded-full
// // // // //           bg-white
// // // // //           shadow-lg
// // // // //         ">
// // // // //           <Icon className="h-4 w-4 text-black" />
// // // // //         </div>

// // // // //         {/* cinematic phase label */}

// // // // //         <div className="absolute bottom-3 left-4 right-4">
// // // // //           <div className="mb-1 text-[9px] uppercase tracking-[0.25em] text-white/45">
// // // // //             Construction Sequence
// // // // //           </div>

// // // // //           <h3 className="
// // // // //             text-base
// // // // //             sm:text-lg
// // // // //             lg:text-xl
// // // // //             font-bold
// // // // //             leading-tight
// // // // //             text-white
// // // // //           ">
// // // // //             {phase.title}
// // // // //           </h3>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* CONTENT */}

// // // // //       <div className="p-4 sm:p-5">
// // // // //         <div className="mb-3 flex items-center justify-between">
// // // // //           <div>
// // // // //             <p className="text-[9px] uppercase tracking-[0.18em] text-white/35">
// // // // //               Current Stage
// // // // //             </p>

// // // // //             <p className="mt-1 text-xs font-semibold text-white/85">
// // // // //               {GROUPS[groupIndex].title}
// // // // //             </p>
// // // // //           </div>

// // // // //           <div className="flex items-center gap-2">
// // // // //             <span
// // // // //               className={`
// // // // //                 rounded-full
// // // // //                 px-2.5
// // // // //                 py-1
// // // // //                 text-[9px]
// // // // //                 font-semibold
// // // // //                 ${
// // // // //                   status === "Completed"
// // // // //                     ? "bg-white/15 text-white"
// // // // //                     : status === "In Progress"
// // // // //                     ? "bg-[#2A317A]/50 text-white"
// // // // //                     : "bg-white/5 text-white/25"
// // // // //                 }
// // // // //               `}
// // // // //             >
// // // // //               {status}
// // // // //             </span>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* progress */}

// // // // //         <div className="mb-2 flex items-center justify-between">
// // // // //           <span className="text-[9px] uppercase tracking-[0.12em] text-white/35">
// // // // //             Progress
// // // // //           </span>

// // // // //           <span className="text-[10px] font-semibold text-white">
// // // // //             {progress}%
// // // // //           </span>
// // // // //         </div>

// // // // //         <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/5">
// // // // //           <motion.div
// // // // //             initial={{ width: 0 }}
// // // // //             animate={{ width: `${progress}%` }}
// // // // //             transition={{
// // // // //               duration: 1.2,
// // // // //               ease: "easeOut",
// // // // //             }}
// // // // //             className="h-full rounded-full bg-white"
// // // // //           />
// // // // //         </div>

// // // // //         {/* footer */}

// // // // //         <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
// // // // //           <span className="text-[9px] tracking-[0.16em] text-white/25">
// // // // //             HANDOFF {String(index + 1).padStart(2, "0")}
// // // // //           </span>

// // // // //           <ArrowRight className="h-3.5 w-3.5 text-white" />
// // // // //         </div>
// // // // //       </div>
// // // // //     </motion.div>
// // // // //   );
// // // // // }

// // // // // function DesktopGroupNode({
// // // // //   group,
// // // // //   index,
// // // // //   active,
// // // // //   revealed,
// // // // // }) {
// // // // //   return (
// // // // //     <motion.div
// // // // //       initial={{
// // // // //         opacity: 0,
// // // // //         scale: 0.7,
// // // // //       }}
// // // // //       animate={{
// // // // //         opacity: revealed ? 1 : 0,
// // // // //         scale: revealed ? 1 : 0.7,
// // // // //       }}
// // // // //       transition={{
// // // // //         duration: 0.55,
// // // // //         ease: [0.22, 1, 0.36, 1],
// // // // //       }}
// // // // //       className="
// // // // //         absolute
// // // // //         z-20
// // // // //         flex
// // // // //         -translate-x-1/2
// // // // //         -translate-y-1/2
// // // // //         flex-col
// // // // //         items-center
// // // // //         gap-2
// // // // //       "
// // // // //       style={{
// // // // //         left: `${GROUP_POSITIONS_DESKTOP[index].x}%`,
// // // // //         top: `${GROUP_POSITIONS_DESKTOP[index].y}%`,
// // // // //       }}
// // // // //     >
// // // // //       {/* pulse ring */}

// // // // //       <AnimatePresence>
// // // // //         {active && (
// // // // //           <motion.div
// // // // //             initial={{
// // // // //               opacity: 0,
// // // // //               scale: 0.6,
// // // // //             }}
// // // // //             animate={{
// // // // //               opacity: [0.15, 0.4, 0.15],
// // // // //               scale: [0.9, 1.25, 0.9],
// // // // //             }}
// // // // //             exit={{
// // // // //               opacity: 0,
// // // // //             }}
// // // // //             transition={{
// // // // //               duration: 1.8,
// // // // //               repeat: Infinity,
// // // // //               ease: "easeInOut",
// // // // //             }}
// // // // //             className="
// // // // //               absolute
// // // // //               h-16
// // // // //               w-16
// // // // //               rounded-full
// // // // //               border
// // // // //               border-white/30
// // // // //             "
// // // // //           />
// // // // //         )}
// // // // //       </AnimatePresence>

// // // // //       {/* node */}

// // // // //       <motion.div
// // // // //         animate={{
// // // // //           borderColor: active
// // // // //             ? ACCENT
// // // // //             : "rgba(255,255,255,0.35)",
// // // // //           backgroundColor: active
// // // // //             ? "rgba(255,255,255,0.08)"
// // // // //             : BG,
// // // // //           scale: active ? 1.08 : 1,
// // // // //         }}
// // // // //         transition={{
// // // // //           duration: 0.4,
// // // // //         }}
// // // // //         className="
// // // // //           flex
// // // // //           h-12
// // // // //           w-12
// // // // //           items-center
// // // // //           justify-center
// // // // //           rounded-full
// // // // //           border
// // // // //           text-white
// // // // //         "
// // // // //       >
// // // // //         <Plus className="h-4 w-4" />
// // // // //       </motion.div>

// // // // //       {/* label */}

// // // // //       <span
// // // // //         className={`
// // // // //           rounded-full
// // // // //           border
// // // // //           px-3
// // // // //           py-1
// // // // //           text-[9px]
// // // // //           font-semibold
// // // // //           uppercase
// // // // //           tracking-[0.08em]
// // // // //           whitespace-nowrap
// // // // //           backdrop-blur-md
// // // // //           ${
// // // // //             active
// // // // //               ? "border-white/30 bg-white/10 text-white"
// // // // //               : "border-white/5 bg-white/5 text-white/45"
// // // // //           }
// // // // //         `}
// // // // //       >
// // // // //         {group.title}
// // // // //       </span>
// // // // //     </motion.div>
// // // // //   );
// // // // // }

// // // // // export default function ProjectHierarchy({ project }) {
// // // // //   const [isInView, setIsInView] = useState(false);
// // // // //   const [activePhase, setActivePhase] = useState(null);
// // // // //   const [revealedGroups, setRevealedGroups] = useState(new Set());

// // // // //   /* =========================
// // // // //      TARGET PHASE
// // // // //   ========================= */

// // // // //   const targetIndex = useMemo(() => {
// // // // //     if (typeof project.currentPhase === "number") {
// // // // //       return project.currentPhase;
// // // // //     }

// // // // //     if (project.status?.toLowerCase() === "finished") {
// // // // //       return PHASES.length - 1;
// // // // //     }

// // // // //     return Math.floor(PHASES.length / 2);
// // // // //   }, [project]);

// // // // //   /* =========================
// // // // //      VALID PHASES
// // // // //   ========================= */

// // // // //   const playablePhases = useMemo(() => {
// // // // //     return PHASES.slice(0, targetIndex + 1).map((_, index) => index);
// // // // //   }, [targetIndex]);

// // // // //   /* =========================
// // // // //      IMAGE
// // // // //   ========================= */

// // // // //   const getImage = (phaseIndex) => {
// // // // //     return (
// // // // //       project.phaseGallery?.[phaseIndex] ||
// // // // //       (project.gallery?.length
// // // // //         ? project.gallery[
// // // // //             phaseIndex % project.gallery.length
// // // // //           ]
// // // // //         : project.src)
// // // // //     );
// // // // //   };

// // // // //   /* =========================
// // // // //      CURRENT GROUP
// // // // //   ========================= */

// // // // //   const activeGroup =
// // // // //     activePhase !== null
// // // // //       ? getGroupIndex(activePhase)
// // // // //       : null;

// // // // //   /* =========================
// // // // //      INTERSECTION OBSERVER
// // // // //   ========================= */

// // // // //   useEffect(() => {
// // // // //     const section = document.getElementById(
// // // // //       `project-hierarchy-${project.title}`
// // // // //     );

// // // // //     if (!section) return;

// // // // //     const observer = new IntersectionObserver(
// // // // //       ([entry]) => {
// // // // //         setIsInView(entry.isIntersecting);
// // // // //       },
// // // // //       {
// // // // //         threshold: 0.3,
// // // // //       }
// // // // //     );

// // // // //     observer.observe(section);

// // // // //     return () => observer.disconnect();
// // // // //   }, [project.title]);

// // // // //   /* =========================
// // // // //      AUTOMATIC CINEMATIC LOOP
// // // // //   ========================= */

// // // // //   useEffect(() => {
// // // // //     if (!isInView || !playablePhases.length) {
// // // // //       setActivePhase(null);
// // // // //       setRevealedGroups(new Set());
// // // // //       return;
// // // // //     }

// // // // //     let timer;

// // // // //     // start from beginning
// // // // //     setActivePhase(0);
// // // // //     setRevealedGroups(new Set([getGroupIndex(0)]));

// // // // //     return () => {
// // // // //       clearTimeout(timer);
// // // // //     };
// // // // //   }, [isInView, playablePhases]);

// // // // //   /* =========================
// // // // //      PHASE TO PHASE LOOP
// // // // //   ========================= */

// // // // //   useEffect(() => {
// // // // //     if (!isInView || activePhase === null) return;

// // // // //     const currentPosition =
// // // // //       playablePhases.indexOf(activePhase);

// // // // //     if (currentPosition === -1) return;

// // // // //     const timer = setTimeout(() => {
// // // // //       const nextPosition = currentPosition + 1;

// // // // //       // finished → restart cinematic sequence
// // // // //       if (nextPosition >= playablePhases.length) {
// // // // //         setActivePhase(null);

// // // // //         setTimeout(() => {
// // // // //           if (!isInView) return;

// // // // //           setRevealedGroups(new Set());

// // // // //           setTimeout(() => {
// // // // //             if (!isInView) return;

// // // // //             setActivePhase(playablePhases[0]);

// // // // //             setRevealedGroups(
// // // // //               new Set([getGroupIndex(playablePhases[0])])
// // // // //             );
// // // // //           }, RESET_DELAY);
// // // // //         }, 700);

// // // // //         return;
// // // // //       }

// // // // //       const nextPhase = playablePhases[nextPosition];
// // // // //       const nextGroup = getGroupIndex(nextPhase);

// // // // //       setRevealedGroups((previous) => {
// // // // //         const updated = new Set(previous);
// // // // //         updated.add(nextGroup);
// // // // //         return updated;
// // // // //       });

// // // // //       setActivePhase(nextPhase);
// // // // //     }, CARD_HOLD);

// // // // //     return () => clearTimeout(timer);
// // // // //   }, [
// // // // //     activePhase,
// // // // //     isInView,
// // // // //     playablePhases,
// // // // //   ]);

// // // // //   /* =========================
// // // // //      STATUS
// // // // //   ========================= */

// // // // //   const getStatus = (index) => {
// // // // //     if (index < targetIndex) {
// // // // //       return "Completed";
// // // // //     }

// // // // //     if (index === targetIndex) {
// // // // //       return "In Progress";
// // // // //     }

// // // // //     return "Pending";
// // // // //   };

// // // // //   /* =========================
// // // // //      DESKTOP TREE
// // // // //   ========================= */

// // // // //   return (
// // // // //     <section
// // // // //       id={`project-hierarchy-${project.title}`}
// // // // //       className="
// // // // //         relative
// // // // //         w-full
// // // // //         overflow-hidden
// // // // //         bg-[#3C3C3B]
// // // // //         px-4
// // // // //         py-14
// // // // //         sm:px-6
// // // // //         sm:py-20
// // // // //       "
// // // // //     >
// // // // //       <KineticGrid className="!h-auto rounded-2xl">
// // // // //         <div
// // // // //           className="
// // // // //             relative
// // // // //             mx-auto
// // // // //             max-w-7xl
// // // // //             px-4
// // // // //             py-10
// // // // //             sm:px-8
// // // // //             sm:py-14
// // // // //           "
// // // // //         >
// // // // //           {/* =========================
// // // // //               HEADER
// // // // //           ========================= */}

// // // // //           <motion.div
// // // // //             initial={{
// // // // //               opacity: 0,
// // // // //               y: 20,
// // // // //             }}
// // // // //             whileInView={{
// // // // //               opacity: 1,
// // // // //               y: 0,
// // // // //             }}
// // // // //             viewport={{
// // // // //               once: true,
// // // // //             }}
// // // // //             transition={{
// // // // //               duration: 0.7,
// // // // //             }}
// // // // //             className="mb-8 text-center sm:mb-10"
// // // // //           >
// // // // //             <span className="
// // // // //               text-[10px]
// // // // //               font-semibold
// // // // //               uppercase
// // // // //               tracking-[0.28em]
// // // // //               text-white
// // // // //               sm:text-xs
// // // // //             ">
// // // // //               The Construction Journey
// // // // //             </span>

// // // // //             <h2 className="
// // // // //               mt-3
// // // // //               text-3xl
// // // // //               font-bold
// // // // //               leading-tight
// // // // //               text-white
// // // // //               sm:text-4xl
// // // // //               md:text-5xl
// // // // //             ">
// // // // //               From Ground To Completion
// // // // //             </h2>

// // // // //             <p className="
// // // // //               mx-auto
// // // // //               mt-3
// // // // //               max-w-xl
// // // // //               text-[11px]
// // // // //               leading-relaxed
// // // // //               text-white/35
// // // // //               sm:text-xs
// // // // //             ">
// // // // //               Every phase hands the project to the next.
// // // // //               One continuous construction sequence.
// // // // //             </p>
// // // // //           </motion.div>

// // // // //           {/* ==================================================
// // // // //               DESKTOP CINEMATIC TREE
// // // // //           ================================================== */}

// // // // //           <div
// // // // //             className="
// // // // //               relative
// // // // //               hidden
// // // // //               h-[430px]
// // // // //               overflow-hidden
// // // // //               md:block
// // // // //               lg:h-[470px]
// // // // //             "
// // // // //           >
// // // // //             {/* =========================
// // // // //                 SVG TREE
// // // // //             ========================= */}

// // // // //             <svg
// // // // //               viewBox="0 0 100 100"
// // // // //               preserveAspectRatio="none"
// // // // //               className="
// // // // //                 pointer-events-none
// // // // //                 absolute
// // // // //                 inset-0
// // // // //                 h-full
// // // // //                 w-full
// // // // //               "
// // // // //             >
// // // // //               {/* ROOT → GROUPS */}

// // // // //               {GROUPS.map((group, index) => {
// // // // //                 const point =
// // // // //                   GROUP_POSITIONS_DESKTOP[index];

// // // // //                 const revealed =
// // // // //                   revealedGroups.has(index);

// // // // //                 return (
// // // // //                   <motion.path
// // // // //                     key={`root-group-${index}`}
// // // // //                     d={`
// // // // //                       M ${ROOT_POSITION_DESKTOP.x}
// // // // //                         ${ROOT_POSITION_DESKTOP.y}

// // // // //                       Q
// // // // //                         ${(ROOT_POSITION_DESKTOP.x + point.x) / 2}
// // // // //                         ${point.y}

// // // // //                         ${point.x}
// // // // //                         ${point.y}
// // // // //                     `}
// // // // //                     fill="none"
// // // // //                     stroke={
// // // // //                       revealed
// // // // //                         ? ACCENT
// // // // //                         : LINE_IDLE
// // // // //                     }
// // // // //                     strokeWidth="0.35"
// // // // //                     strokeLinecap="round"
// // // // //                     initial={{
// // // // //                       pathLength: 0,
// // // // //                       opacity: 0,
// // // // //                     }}
// // // // //                     animate={{
// // // // //                       pathLength: revealed ? 1 : 0,
// // // // //                       opacity: revealed ? 1 : 0,
// // // // //                     }}
// // // // //                     transition={{
// // // // //                       duration: 0.8,
// // // // //                       ease: "easeInOut",
// // // // //                     }}
// // // // //                   />
// // // // //                 );
// // // // //               })}

// // // // //               {/* ACTIVE GROUP → ACTIVE PHASE */}

// // // // //               <AnimatePresence mode="wait">
// // // // //                 {activePhase !== null &&
// // // // //                   activeGroup !== null && (
// // // // //                     <motion.path
// // // // //                       key={`active-line-${activePhase}`}
// // // // //                       d={`
// // // // //                         M
// // // // //                           ${GROUP_POSITIONS_DESKTOP[
// // // // //                             activeGroup
// // // // //                           ].x}
// // // // //                           ${GROUP_POSITIONS_DESKTOP[
// // // // //                             activeGroup
// // // // //                           ].y}

// // // // //                         C
// // // // //                           ${GROUP_POSITIONS_DESKTOP[
// // // // //                             activeGroup
// // // // //                           ].x + 8}
// // // // //                           ${GROUP_POSITIONS_DESKTOP[
// // // // //                             activeGroup
// // // // //                           ].y}

// // // // //                           70
// // // // //                           ${GROUP_POSITIONS_DESKTOP[
// // // // //                             activeGroup
// // // // //                           ].y}

// // // // //                           ${CARD_POSITION_DESKTOP.x}
// // // // //                           ${GROUP_POSITIONS_DESKTOP[
// // // // //                             activeGroup
// // // // //                           ].y}
// // // // //                       `}
// // // // //                       fill="none"
// // // // //                       stroke={LINE_ACTIVE}
// // // // //                       strokeWidth="0.4"
// // // // //                       strokeLinecap="round"
// // // // //                       initial={{
// // // // //                         pathLength: 0,
// // // // //                         opacity: 0,
// // // // //                       }}
// // // // //                       animate={{
// // // // //                         pathLength: 1,
// // // // //                         opacity: 1,
// // // // //                       }}
// // // // //                       exit={{
// // // // //                         pathLength: 0,
// // // // //                         opacity: 0,
// // // // //                       }}
// // // // //                       transition={{
// // // // //                         duration: 0.75,
// // // // //                         ease: [0.22, 1, 0.36, 1],
// // // // //                       }}
// // // // //                     />
// // // // //                   )}
// // // // //               </AnimatePresence>
// // // // //             </svg>

// // // // //             {/* =========================
// // // // //                 ROOT NODE
// // // // //             ========================= */}

// // // // //             <motion.div
// // // // //               initial={{
// // // // //                 opacity: 0,
// // // // //                 scale: 0.7,
// // // // //               }}
// // // // //               animate={{
// // // // //                 opacity: 1,
// // // // //                 scale: 1,
// // // // //               }}
// // // // //               transition={{
// // // // //                 duration: 0.7,
// // // // //               }}
// // // // //               className="
// // // // //                 absolute
// // // // //                 z-30
// // // // //                 flex
// // // // //                 -translate-x-1/2
// // // // //                 -translate-y-1/2
// // // // //                 flex-col
// // // // //                 items-center
// // // // //                 gap-2
// // // // //               "
// // // // //               style={{
// // // // //                 left: `${ROOT_POSITION_DESKTOP.x}%`,
// // // // //                 top: `${ROOT_POSITION_DESKTOP.y}%`,
// // // // //               }}
// // // // //             >
// // // // //               <div className="
// // // // //                 relative
// // // // //                 h-24
// // // // //                 w-24
// // // // //                 overflow-hidden
// // // // //                 rounded-full
// // // // //                 border-2
// // // // //                 border-white
// // // // //                 bg-[#3C3C3B]
// // // // //                 shadow-[0_0_45px_rgba(255,255,255,0.15)]
// // // // //                 lg:h-28
// // // // //                 lg:w-28
// // // // //               ">
// // // // //                 <img
// // // // //                   src={project.src}
// // // // //                   alt={project.title}
// // // // //                   className="h-full w-full object-cover"
// // // // //                 />

// // // // //                 <div className="
// // // // //                   absolute
// // // // //                   inset-0
// // // // //                   bg-gradient-to-t
// // // // //                   from-black/35
// // // // //                   to-transparent
// // // // //                 " />
// // // // //               </div>

// // // // //               <span className="
// // // // //                 rounded-full
// // // // //                 bg-[#2A317A]
// // // // //                 px-3
// // // // //                 py-1
// // // // //                 text-[9px]
// // // // //                 font-semibold
// // // // //                 uppercase
// // // // //                 tracking-[0.1em]
// // // // //                 text-white
// // // // //               ">
// // // // //                 Project Start
// // // // //               </span>
// // // // //             </motion.div>

// // // // //             {/* =========================
// // // // //                 GROUP NODES
// // // // //             ========================= */}

// // // // //             {GROUPS.map((group, index) => (
// // // // //               <DesktopGroupNode
// // // // //                 key={group.title}
// // // // //                 group={group}
// // // // //                 index={index}
// // // // //                 active={activeGroup === index}
// // // // //                 revealed={revealedGroups.has(index)}
// // // // //               />
// // // // //             ))}

// // // // //             {/* =========================
// // // // //                 MOVING PHASE CARD
// // // // //             ========================= */}

// // // // //             <AnimatePresence mode="wait">
// // // // //               {activePhase !== null &&
// // // // //                 activeGroup !== null && (
// // // // //                   <motion.div
// // // // //                     key={activePhase}
// // // // //                     initial={{
// // // // //                       left: `${GROUP_POSITIONS_DESKTOP[
// // // // //                         activeGroup
// // // // //                       ].x}%`,
// // // // //                       top: `${GROUP_POSITIONS_DESKTOP[
// // // // //                         activeGroup
// // // // //                       ].y}%`,
// // // // //                       opacity: 0,
// // // // //                       scale: 0.85,
// // // // //                     }}
// // // // //                     animate={{
// // // // //                       left: `${CARD_POSITION_DESKTOP.x}%`,
// // // // //                       top: `${GROUP_POSITIONS_DESKTOP[
// // // // //                         activeGroup
// // // // //                       ].y}%`,
// // // // //                       opacity: 1,
// // // // //                       scale: 1,
// // // // //                     }}
// // // // //                     exit={{
// // // // //                       left: "108%",
// // // // //                       opacity: 0,
// // // // //                       scale: 0.96,
// // // // //                     }}
// // // // //                     transition={{
// // // // //                       left: {
// // // // //                         duration: 1.05,
// // // // //                         ease: [0.22, 1, 0.36, 1],
// // // // //                       },
// // // // //                       top: {
// // // // //                         duration: 0.5,
// // // // //                         ease: "easeInOut",
// // // // //                       },
// // // // //                       opacity: {
// // // // //                         duration: 0.45,
// // // // //                       },
// // // // //                       scale: {
// // // // //                         duration: 0.8,
// // // // //                         ease: [0.22, 1, 0.36, 1],
// // // // //                       },
// // // // //                     }}
// // // // //                     className="
// // // // //                       absolute
// // // // //                       z-40
// // // // //                       -translate-x-1/2
// // // // //                       -translate-y-1/2
// // // // //                     "
// // // // //                   >
// // // // //                     <PhaseCard
// // // // //                       phase={PHASES[activePhase]}
// // // // //                       index={activePhase}
// // // // //                       image={getImage(activePhase)}
// // // // //                       progress={Math.round(
// // // // //                         ((activePhase + 1) /
// // // // //                           PHASES.length) *
// // // // //                           100
// // // // //                       )}
// // // // //                       status={getStatus(activePhase)}
// // // // //                       groupIndex={activeGroup}
// // // // //                     />
// // // // //                   </motion.div>
// // // // //                 )}
// // // // //             </AnimatePresence>

// // // // //             {/* =========================
// // // // //                 LIVE INDICATOR
// // // // //             ========================= */}

// // // // //             {activePhase !== null && (
// // // // //               <motion.div
// // // // //                 initial={{
// // // // //                   opacity: 0,
// // // // //                   y: 10,
// // // // //                 }}
// // // // //                 animate={{
// // // // //                   opacity: 1,
// // // // //                   y: 0,
// // // // //                 }}
// // // // //                 className="
// // // // //                   absolute
// // // // //                   bottom-2
// // // // //                   left-[78%]
// // // // //                   z-30
// // // // //                   -translate-x-1/2
// // // // //                 "
// // // // //               >
// // // // //                 <div className="
// // // // //                   flex
// // // // //                   items-center
// // // // //                   gap-2
// // // // //                   rounded-full
// // // // //                   border
// // // // //                   border-white/15
// // // // //                   bg-black/20
// // // // //                   px-3
// // // // //                   py-1.5
// // // // //                   backdrop-blur-md
// // // // //                 ">
// // // // //                   <motion.span
// // // // //                     animate={{
// // // // //                       opacity: [0.35, 1, 0.35],
// // // // //                     }}
// // // // //                     transition={{
// // // // //                       duration: 1.4,
// // // // //                       repeat: Infinity,
// // // // //                     }}
// // // // //                     className="
// // // // //                       h-1.5
// // // // //                       w-1.5
// // // // //                       rounded-full
// // // // //                       bg-white
// // // // //                     "
// // // // //                   />

// // // // //                   <span className="
// // // // //                     text-[8px]
// // // // //                     uppercase
// // // // //                     tracking-[0.2em]
// // // // //                     text-white/45
// // // // //                   ">
// // // // //                     Live Construction Sequence
// // // // //                   </span>
// // // // //                 </div>
// // // // //               </motion.div>
// // // // //             )}
// // // // //           </div>

// // // // //           {/* ==================================================
// // // // //               MOBILE
// // // // //           ================================================== */}

// // // // //           <div className="relative md:hidden">
// // // // //             <div
// // // // //               className="
// // // // //                 relative
// // // // //                 h-[560px]
// // // // //                 overflow-hidden
// // // // //               "
// // // // //             >
// // // // //               {/* =========================
// // // // //                   MOBILE SVG TREE
// // // // //               ========================= */}

// // // // //               <svg
// // // // //                 viewBox="0 0 100 100"
// // // // //                 preserveAspectRatio="none"
// // // // //                 className="
// // // // //                   pointer-events-none
// // // // //                   absolute
// // // // //                   inset-0
// // // // //                   h-full
// // // // //                   w-full
// // // // //                 "
// // // // //               >
// // // // //                 {/* ROOT → GROUPS */}

// // // // //                 {GROUPS.map((group, index) => {
// // // // //                   const x = [18, 50, 82][index];
// // // // //                   const y = 31;

// // // // //                   return (
// // // // //                     <motion.path
// // // // //                       key={`mobile-root-${index}`}
// // // // //                       d={`
// // // // //                         M 50 11

// // // // //                         Q
// // // // //                           50 ${20}
// // // // //                           ${x} ${y}
// // // // //                       `}
// // // // //                       fill="none"
// // // // //                       stroke={
// // // // //                         revealedGroups.has(index)
// // // // //                           ? ACCENT
// // // // //                           : LINE_IDLE
// // // // //                       }
// // // // //                       strokeWidth="0.55"
// // // // //                       strokeLinecap="round"
// // // // //                       initial={{
// // // // //                         pathLength: 0,
// // // // //                       }}
// // // // //                       animate={{
// // // // //                         pathLength:
// // // // //                           revealedGroups.has(index)
// // // // //                             ? 1
// // // // //                             : 0,
// // // // //                       }}
// // // // //                       transition={{
// // // // //                         duration: 0.65,
// // // // //                       }}
// // // // //                     />
// // // // //                   );
// // // // //                 })}

// // // // //                 {/* GROUP → ACTIVE PHASE */}

// // // // //                 {activePhase !== null &&
// // // // //                   activeGroup !== null && (
// // // // //                     <motion.path
// // // // //                       key={`mobile-line-${activePhase}`}
// // // // //                       d={`
// // // // //                         M
// // // // //                           ${[18, 50, 82][
// // // // //                             activeGroup
// // // // //                           ]}
// // // // //                           31

// // // // //                         C
// // // // //                           ${[18, 50, 82][
// // // // //                             activeGroup
// // // // //                           ]}
// // // // //                           46

// // // // //                           50
// // // // //                           50

// // // // //                           50
// // // // //                           61
// // // // //                       `}
// // // // //                       fill="none"
// // // // //                       stroke={LINE_ACTIVE}
// // // // //                       strokeWidth="0.55"
// // // // //                       strokeLinecap="round"
// // // // //                       initial={{
// // // // //                         pathLength: 0,
// // // // //                         opacity: 0,
// // // // //                       }}
// // // // //                       animate={{
// // // // //                         pathLength: 1,
// // // // //                         opacity: 1,
// // // // //                       }}
// // // // //                       transition={{
// // // // //                         duration: 0.7,
// // // // //                         ease: "easeInOut",
// // // // //                       }}
// // // // //                     />
// // // // //                   )}
// // // // //               </svg>

// // // // //               {/* =========================
// // // // //                   ROOT
// // // // //               ========================= */}

// // // // //               <div className="
// // // // //                 absolute
// // // // //                 left-1/2
// // // // //                 top-[11%]
// // // // //                 z-20
// // // // //                 -translate-x-1/2
// // // // //                 -translate-y-1/2
// // // // //               ">
// // // // //                 <motion.div
// // // // //                   initial={{
// // // // //                     opacity: 0,
// // // // //                     scale: 0.7,
// // // // //                   }}
// // // // //                   animate={{
// // // // //                     opacity: 1,
// // // // //                     scale: 1,
// // // // //                   }}
// // // // //                   className="flex flex-col items-center gap-2"
// // // // //                 >
// // // // //                   <div className="
// // // // //                     h-16
// // // // //                     w-16
// // // // //                     overflow-hidden
// // // // //                     rounded-full
// // // // //                     border-2
// // // // //                     border-white
// // // // //                     shadow-lg
// // // // //                   ">
// // // // //                     <img
// // // // //                       src={project.src}
// // // // //                       alt={project.title}
// // // // //                       className="h-full w-full object-cover"
// // // // //                     />
// // // // //                   </div>

// // // // //                   <span className="
// // // // //                     rounded-full
// // // // //                     bg-[#2A317A]
// // // // //                     px-2.5
// // // // //                     py-1
// // // // //                     text-[8px]
// // // // //                     font-semibold
// // // // //                     uppercase
// // // // //                     tracking-[0.08em]
// // // // //                     text-white
// // // // //                   ">
// // // // //                     Project Start
// // // // //                   </span>
// // // // //                 </motion.div>
// // // // //               </div>

// // // // //               {/* =========================
// // // // //                   GROUP NODES
// // // // //               ========================= */}

// // // // //               {GROUPS.map((group, index) => {
// // // // //                 const active = activeGroup === index;
// // // // //                 const revealed =
// // // // //                   revealedGroups.has(index);

// // // // //                 return (
// // // // //                   <motion.div
// // // // //                     key={group.title}
// // // // //                     initial={{
// // // // //                       opacity: 0,
// // // // //                       scale: 0.7,
// // // // //                     }}
// // // // //                     animate={{
// // // // //                       opacity: revealed ? 1 : 0,
// // // // //                       scale: revealed ? 1 : 0.7,
// // // // //                     }}
// // // // //                     className="
// // // // //                       absolute
// // // // //                       top-[31%]
// // // // //                       z-20
// // // // //                       -translate-x-1/2
// // // // //                     "
// // // // //                     style={{
// // // // //                       left: `${[18, 50, 82][index]}%`,
// // // // //                     }}
// // // // //                   >
// // // // //                     <motion.div
// // // // //                       animate={{
// // // // //                         borderColor: active
// // // // //                           ? ACCENT
// // // // //                           : "rgba(255,255,255,0.35)",
// // // // //                         scale: active ? 1.08 : 1,
// // // // //                       }}
// // // // //                       className="
// // // // //                         mx-auto
// // // // //                         flex
// // // // //                         h-10
// // // // //                         w-10
// // // // //                         items-center
// // // // //                         justify-center
// // // // //                         rounded-full
// // // // //                         border
// // // // //                         bg-[#3C3C3B]
// // // // //                         text-white
// // // // //                       "
// // // // //                     >
// // // // //                       <Plus className="h-3.5 w-3.5" />
// // // // //                     </motion.div>

// // // // //                     <span className={`
// // // // //                       mt-2
// // // // //                       block
// // // // //                       max-w-[90px]
// // // // //                       text-center
// // // // //                       text-[7px]
// // // // //                       font-semibold
// // // // //                       uppercase
// // // // //                       leading-tight
// // // // //                       ${
// // // // //                         active
// // // // //                           ? "text-white"
// // // // //                           : "text-white/40"
// // // // //                       }
// // // // //                     `}>
// // // // //                       {group.title}
// // // // //                     </span>
// // // // //                   </motion.div>
// // // // //                 );
// // // // //               })}

// // // // //               {/* =========================
// // // // //                   MOBILE PHASE
// // // // //               ========================= */}

// // // // //               <div className="
// // // // //                 absolute
// // // // //                 left-1/2
// // // // //                 top-[71%]
// // // // //                 z-40
// // // // //                 w-full
// // // // //                 -translate-x-1/2
// // // // //                 -translate-y-1/2
// // // // //                 px-2
// // // // //               ">
// // // // //                 <AnimatePresence mode="wait">
// // // // //                   {activePhase !== null &&
// // // // //                     activeGroup !== null && (
// // // // //                       <motion.div
// // // // //                         key={activePhase}
// // // // //                         initial={{
// // // // //                           opacity: 0,
// // // // //                           x:
// // // // //                             activeGroup === 0
// // // // //                               ? -70
// // // // //                               : activeGroup === 2
// // // // //                               ? 70
// // // // //                               : 0,
// // // // //                           scale: 0.92,
// // // // //                         }}
// // // // //                         animate={{
// // // // //                           opacity: 1,
// // // // //                           x: 0,
// // // // //                           scale: 1,
// // // // //                         }}
// // // // //                         exit={{
// // // // //                           opacity: 0,
// // // // //                           x: 90,
// // // // //                           scale: 0.94,
// // // // //                         }}
// // // // //                         transition={{
// // // // //                           duration: 0.8,
// // // // //                           ease: [0.22, 1, 0.36, 1],
// // // // //                         }}
// // // // //                         className="flex justify-center"
// // // // //                       >
// // // // //                         <PhaseCard
// // // // //                           phase={PHASES[activePhase]}
// // // // //                           index={activePhase}
// // // // //                           image={getImage(activePhase)}
// // // // //                           progress={Math.round(
// // // // //                             ((activePhase + 1) /
// // // // //                               PHASES.length) *
// // // // //                               100
// // // // //                           )}
// // // // //                           status={getStatus(activePhase)}
// // // // //                           groupIndex={activeGroup}
// // // // //                         />
// // // // //                       </motion.div>
// // // // //                     )}
// // // // //                 </AnimatePresence>
// // // // //               </div>

// // // // //               {/* =========================
// // // // //                   MOBILE LIVE LABEL
// // // // //               ========================= */}

// // // // //               <div className="
// // // // //                 absolute
// // // // //                 bottom-2
// // // // //                 left-1/2
// // // // //                 z-20
// // // // //                 -translate-x-1/2
// // // // //               ">
// // // // //                 <div className="
// // // // //                   flex
// // // // //                   items-center
// // // // //                   gap-2
// // // // //                   whitespace-nowrap
// // // // //                   rounded-full
// // // // //                   border
// // // // //                   border-white/15
// // // // //                   bg-black/20
// // // // //                   px-3
// // // // //                   py-1.5
// // // // //                   backdrop-blur-md
// // // // //                 ">
// // // // //                   <motion.span
// // // // //                     animate={{
// // // // //                       opacity: [0.3, 1, 0.3],
// // // // //                     }}
// // // // //                     transition={{
// // // // //                       duration: 1.4,
// // // // //                       repeat: Infinity,
// // // // //                     }}
// // // // //                     className="
// // // // //                       h-1.5
// // // // //                       w-1.5
// // // // //                       rounded-full
// // // // //                       bg-white
// // // // //                     "
// // // // //                   />

// // // // //                   <span className="
// // // // //                     text-[7px]
// // // // //                     uppercase
// // // // //                     tracking-[0.18em]
// // // // //                     text-white/40
// // // // //                   ">
// // // // //                     Live Construction Sequence
// // // // //                   </span>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </KineticGrid>
// // // // //     </section>
// // // // //   );
// // // // // }


// // // // import { useEffect, useMemo, useRef, useState } from "react";
// // // // import { AnimatePresence, motion } from "motion/react";
// // // // import {
// // // //   ClipboardList,
// // // //   HardHat,
// // // //   Layers,
// // // //   Building2,
// // // //   Cable,
// // // //   Paintbrush,
// // // //   Sparkles,
// // // //   CheckCircle2,
// // // //   Plus,
// // // //   ArrowRight,
// // // // } from "lucide-react";
// // // // import KineticGrid from "../KineticGrid/KineticGrid";

// // // // const PHASES = [
// // // //   { title: "Project Start", tag: "START", icon: ClipboardList },
// // // //   { title: "Site Preparation", tag: "PREP", icon: HardHat },
// // // //   { title: "Foundation", tag: "FOUND", icon: Layers },
// // // //   { title: "Structural Work", tag: "STRUCT", icon: Building2 },
// // // //   { title: "MEP Installation", tag: "MEP", icon: Cable },
// // // //   { title: "Interior & Exterior", tag: "FINISH", icon: Paintbrush },
// // // //   { title: "Final Finishing", tag: "DETAIL", icon: Sparkles },
// // // //   { title: "Project Completed", tag: "DONE", icon: CheckCircle2 },
// // // // ];

// // // // const GROUPS = [
// // // //   { title: "Pre-Construction", phases: [0, 1] },
// // // //   { title: "Core Construction", phases: [2, 3, 4] },
// // // //   { title: "Finishing & Delivery", phases: [5, 6, 7] },
// // // // ];

// // // // /* true = يعرض كل الـ phases من الأول للآخر، false = يقف عند currentPhase بتاع المشروع */
// // // // const PLAY_ALL = true;

// // // // /* الوقت اللي كل phase بتاخده قبل ما الـ scroll اللي بعده يتحسب (ms) */
// // // // const STEP_MS = 1500;

// // // // /* أقل حركة wheel تتحسب (عشان الـ trackpad inertia) */
// // // // const MIN_WHEEL_DELTA = 15;

// // // // /* لو عندك navbar fixed، حطي ارتفاعه هنا */
// // // // const NAV_OFFSET = 0;

// // // // const ACCENT = "#FFFFFF";
// // // // const BG = "#3C3C3B";

// // // // const LINE_IDLE = "rgba(255,255,255,0.12)";

// // // // const GROUP_POSITIONS_DESKTOP = [
// // // //   { x: 30, y: 22 },
// // // //   { x: 48, y: 50 },
// // // //   { x: 66, y: 78 },
// // // // ];

// // // // const ROOT_POSITION_DESKTOP = { x: 7, y: 50 };

// // // // const CARD_POSITION_DESKTOP = { x: 78 };

// // // // function getGroupIndex(phaseIndex) {
// // // //   return GROUPS.findIndex((group) => group.phases.includes(phaseIndex));
// // // // }

// // // // function PhaseCard({ phase, index, image, progress, status, groupIndex }) {
// // // //   const Icon = phase.icon;

// // // //   return (
// // // //     <motion.div
// // // //       initial={{ opacity: 0, scale: 0.9 }}
// // // //       animate={{ opacity: 1, scale: 1 }}
// // // //       exit={{ opacity: 0, scale: 0.92 }}
// // // //       transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
// // // //       className="
// // // //         w-[280px]
// // // //         sm:w-[310px]
// // // //         lg:w-[340px]
// // // //         overflow-hidden
// // // //         rounded-2xl
// // // //         border border-white/10
// // // //         bg-[#3C3C3B]
// // // //         shadow-[0_25px_80px_rgba(0,0,0,0.35)]
// // // //       "
// // // //     >
// // // //       {/* IMAGE */}

// // // //       <div className="relative h-40 sm:h-44 lg:h-48 w-full overflow-hidden">
// // // //         <motion.img
// // // //           src={image}
// // // //           alt={phase.title}
// // // //           initial={{ scale: 1.1 }}
// // // //           animate={{ scale: 1 }}
// // // //           transition={{ duration: 1.4, ease: "easeOut" }}
// // // //           className="h-full w-full object-cover"
// // // //         />

// // // //         {/* dark cinematic overlay */}
// // // //         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

// // // //         {/* phase number */}

// // // //         <div className="absolute left-3 top-3">
// // // //           <span
// // // //             className="
// // // //               rounded-full
// // // //               bg-black/60
// // // //               px-2.5
// // // //               py-1
// // // //               text-[9px]
// // // //               font-semibold
// // // //               tracking-[0.12em]
// // // //               text-white
// // // //               backdrop-blur-md
// // // //             "
// // // //           >
// // // //             PHASE {String(index + 1).padStart(2, "0")}
// // // //           </span>
// // // //         </div>

// // // //         {/* icon */}

// // // //         <div
// // // //           className="
// // // //             absolute
// // // //             right-3
// // // //             top-3
// // // //             flex
// // // //             h-8
// // // //             w-8
// // // //             items-center
// // // //             justify-center
// // // //             rounded-full
// // // //             bg-white
// // // //             shadow-lg
// // // //           "
// // // //         >
// // // //           <Icon className="h-4 w-4 text-black" />
// // // //         </div>

// // // //         {/* cinematic phase label */}

// // // //         <div className="absolute bottom-3 left-4 right-4">
// // // //           <div className="mb-1 text-[9px] uppercase tracking-[0.25em] text-white/45">
// // // //             Construction Sequence
// // // //           </div>

// // // //           <h3
// // // //             className="
// // // //               text-base
// // // //               sm:text-lg
// // // //               lg:text-xl
// // // //               font-bold
// // // //               leading-tight
// // // //               text-white
// // // //             "
// // // //           >
// // // //             {phase.title}
// // // //           </h3>
// // // //         </div>
// // // //       </div>

// // // //       {/* CONTENT */}

// // // //       <div className="p-4 sm:p-5">
// // // //         <div className="mb-3 flex items-center justify-between">
// // // //           <div>
// // // //             <p className="text-[9px] uppercase tracking-[0.18em] text-white/35">
// // // //               Current Stage
// // // //             </p>

// // // //             <p className="mt-1 text-xs font-semibold text-white/85">
// // // //               {GROUPS[groupIndex].title}
// // // //             </p>
// // // //           </div>

// // // //           <div className="flex items-center gap-2">
// // // //             <span
// // // //               className={`
// // // //                 rounded-full
// // // //                 px-2.5
// // // //                 py-1
// // // //                 text-[9px]
// // // //                 font-semibold
// // // //                 ${
// // // //                   status === "Completed"
// // // //                     ? "bg-white/15 text-white"
// // // //                     : status === "In Progress"
// // // //                     ? "bg-[#2A317A]/50 text-white"
// // // //                     : "bg-white/5 text-white/25"
// // // //                 }
// // // //               `}
// // // //             >
// // // //               {status}
// // // //             </span>
// // // //           </div>
// // // //         </div>

// // // //         {/* progress */}

// // // //         <div className="mb-2 flex items-center justify-between">
// // // //           <span className="text-[9px] uppercase tracking-[0.12em] text-white/35">
// // // //             Progress
// // // //           </span>

// // // //           <span className="text-[10px] font-semibold text-white">
// // // //             {progress}%
// // // //           </span>
// // // //         </div>

// // // //         <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/5">
// // // //           <motion.div
// // // //             initial={{ width: 0 }}
// // // //             animate={{ width: `${progress}%` }}
// // // //             transition={{ duration: 1.2, ease: "easeOut" }}
// // // //             className="h-full rounded-full bg-white"
// // // //           />
// // // //         </div>

// // // //         {/* footer */}

// // // //         <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
// // // //           <span className="text-[9px] tracking-[0.16em] text-white/25">
// // // //             HANDOFF {String(index + 1).padStart(2, "0")}
// // // //           </span>

// // // //           <ArrowRight className="h-3.5 w-3.5 text-white" />
// // // //         </div>
// // // //       </div>
// // // //     </motion.div>
// // // //   );
// // // // }

// // // // function DesktopGroupNode({ group, index, active, revealed }) {
// // // //   return (
// // // //     <motion.div
// // // //       initial={{ opacity: 0, scale: 0.7 }}
// // // //       animate={{
// // // //         opacity: revealed ? 1 : 0,
// // // //         scale: revealed ? 1 : 0.7,
// // // //       }}
// // // //       transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
// // // //       className="
// // // //         absolute
// // // //         z-20
// // // //         flex
// // // //         -translate-x-1/2
// // // //         -translate-y-1/2
// // // //         flex-col
// // // //         items-center
// // // //         gap-2
// // // //       "
// // // //       style={{
// // // //         left: `${GROUP_POSITIONS_DESKTOP[index].x}%`,
// // // //         top: `${GROUP_POSITIONS_DESKTOP[index].y}%`,
// // // //       }}
// // // //     >
// // // //       {/* pulse ring */}

// // // //       <AnimatePresence>
// // // //         {active && (
// // // //           <motion.div
// // // //             initial={{ opacity: 0, scale: 0.6 }}
// // // //             animate={{
// // // //               opacity: [0.15, 0.4, 0.15],
// // // //               scale: [0.9, 1.25, 0.9],
// // // //             }}
// // // //             exit={{ opacity: 0 }}
// // // //             transition={{
// // // //               duration: 1.8,
// // // //               repeat: Infinity,
// // // //               ease: "easeInOut",
// // // //             }}
// // // //             className="
// // // //               absolute
// // // //               h-16
// // // //               w-16
// // // //               rounded-full
// // // //               border
// // // //               border-white/30
// // // //             "
// // // //           />
// // // //         )}
// // // //       </AnimatePresence>

// // // //       {/* node */}

// // // //       <motion.div
// // // //         animate={{
// // // //           borderColor: active ? ACCENT : "rgba(255,255,255,0.35)",
// // // //           backgroundColor: active ? "rgba(255,255,255,0.08)" : BG,
// // // //           scale: active ? 1.08 : 1,
// // // //         }}
// // // //         transition={{ duration: 0.4 }}
// // // //         className="
// // // //           flex
// // // //           h-12
// // // //           w-12
// // // //           items-center
// // // //           justify-center
// // // //           rounded-full
// // // //           border
// // // //           text-white
// // // //         "
// // // //       >
// // // //         <Plus className="h-4 w-4" />
// // // //       </motion.div>

// // // //       {/* label */}

// // // //       <span
// // // //         className={`
// // // //           rounded-full
// // // //           border
// // // //           px-3
// // // //           py-1
// // // //           text-[9px]
// // // //           font-semibold
// // // //           uppercase
// // // //           tracking-[0.08em]
// // // //           whitespace-nowrap
// // // //           backdrop-blur-md
// // // //           ${
// // // //             active
// // // //               ? "border-white/30 bg-white/10 text-white"
// // // //               : "border-white/5 bg-white/5 text-white/45"
// // // //           }
// // // //         `}
// // // //       >
// // // //         {group.title}
// // // //       </span>
// // // //     </motion.div>
// // // //   );
// // // // }

// // // // export default function ProjectHierarchy({ project }) {
// // // //   const sectionRef = useRef(null);
// // // //   const phaseRef = useRef(0);
// // // //   const [activePhase, setActivePhase] = useState(0);

// // // //   /* =========================
// // // //      TARGET PHASE
// // // //   ========================= */

// // // //   const targetIndex = useMemo(() => {
// // // //     if (typeof project.currentPhase === "number") {
// // // //       return project.currentPhase;
// // // //     }

// // // //     if (project.status?.toLowerCase() === "finished") {
// // // //       return PHASES.length - 1;
// // // //     }

// // // //     return Math.floor(PHASES.length / 2);
// // // //   }, [project]);

// // // //   /* =========================
// // // //      VALID PHASES
// // // //   ========================= */

// // // //   const playablePhases = useMemo(
// // // //     () => PHASES.slice(0, targetIndex + 1).map((_, index) => index),
// // // //     [targetIndex]
// // // //   );

// // // //   const total = PLAY_ALL ? PHASES.length : playablePhases.length;

// // // //   /* =========================
// // // //      IMAGE
// // // //   ========================= */

// // // //   const getImage = (phaseIndex) =>
// // // //     project.phaseGallery?.[phaseIndex] ||
// // // //     (project.gallery?.length
// // // //       ? project.gallery[phaseIndex % project.gallery.length]
// // // //       : project.src);

// // // //   /* =========================
// // // //      CURRENT GROUP
// // // //   ========================= */

// // // //   const activeGroup = getGroupIndex(activePhase);

// // // //   /* الجروبات المكشوفة = كل جروب وصلنا له لحد الـ phase الحالية
// // // //      (بترجع تختفي لو عملتي scroll لفوق) */
// // // //   const revealedGroups = useMemo(() => {
// // // //     const set = new Set();
// // // //     for (let i = 0; i <= activePhase; i++) set.add(getGroupIndex(i));
// // // //     return set;
// // // //   }, [activePhase]);

// // // //   /* =========================
// // // //      SCROLL LOCK SEQUENCER
// // // //      أول ما أعلى السيكشن يوصل أعلى الشاشة، الصفحة بتتثبت.
// // // //      كل scroll بيقدّم phase واحدة بالترتيب (وبيرجّع لو لفوق).
// // // //      لما تخلص كل الـ phases الصفحة بتكمل للسيكشن اللي بعده.
// // // //   ========================= */

// // // //   useEffect(() => {
// // // //     const section = sectionRef.current;
// // // //     if (!section) return;

// // // //     const last = total - 1;

// // // //     let locked = false;
// // // //     let busy = false;
// // // //     let lockY = 0;
// // // //     let releasedAt = 0;
// // // //     let prevY = window.scrollY;
// // // //     let touchY = null;
// // // //     let timer;

// // // //     const sectionTop = () =>
// // // //       section.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;

// // // //     const release = () => {
// // // //       locked = false;
// // // //       releasedAt = performance.now();
// // // //     };

// // // //     /* بترجع true لو الحركة اتستهلكت جوه السيكشن */
// // // //     const go = (dir) => {
// // // //       if (busy) return true;

// // // //       const next = phaseRef.current + dir;

// // // //       if (next < 0 || next > last) {
// // // //         release();
// // // //         return false;
// // // //       }

// // // //       phaseRef.current = next;
// // // //       setActivePhase(next);

// // // //       busy = true;
// // // //       timer = setTimeout(() => {
// // // //         busy = false;
// // // //       }, STEP_MS);

// // // //       return true;
// // // //     };

// // // //     const onScroll = () => {
// // // //       const y = window.scrollY;

// // // //       if (locked) {
// // // //         if (Math.abs(y - lockY) > 1) {
// // // //           window.scrollTo({ top: lockY, left: 0, behavior: "instant" });
// // // //         }
// // // //         prevY = lockY;
// // // //         return;
// // // //       }

// // // //       const top = sectionTop();
// // // //       const dir = y > prevY ? 1 : y < prevY ? -1 : 0;

// // // //       const crossed =
// // // //         (dir > 0 && prevY < top - 1 && y >= top - 1) ||
// // // //         (dir < 0 && prevY > top + 1 && y <= top + 1);

// // // //       const canEnter =
// // // //         (dir > 0 && phaseRef.current < last) ||
// // // //         (dir < 0 && phaseRef.current > 0);

// // // //       if (crossed && canEnter && performance.now() - releasedAt > 500) {
// // // //         locked = true;
// // // //         lockY = top;
// // // //         window.scrollTo({ top, left: 0, behavior: "instant" });
// // // //         prevY = top;
// // // //         return;
// // // //       }

// // // //       prevY = y;
// // // //     };

// // // //     const onWheel = (e) => {
// // // //       if (!locked || e.ctrlKey) return;

// // // //       if (Math.abs(e.deltaY) < MIN_WHEEL_DELTA) {
// // // //         e.preventDefault();
// // // //         return;
// // // //       }

// // // //       const consumed = go(e.deltaY > 0 ? 1 : -1);
// // // //       if (consumed) e.preventDefault();
// // // //     };

// // // //     const onTouchStart = (e) => {
// // // //       touchY = e.touches[0].clientY;
// // // //     };

// // // //     const onTouchMove = (e) => {
// // // //       if (!locked || touchY === null) return;

// // // //       const dy = touchY - e.touches[0].clientY;

// // // //       if (Math.abs(dy) < 30) {
// // // //         e.preventDefault();
// // // //         return;
// // // //       }

// // // //       touchY = e.touches[0].clientY;

// // // //       const consumed = go(dy > 0 ? 1 : -1);
// // // //       if (consumed) e.preventDefault();
// // // //     };

// // // //     const onKeyDown = (e) => {
// // // //       if (!locked) return;

// // // //       const tag = e.target?.tagName;
// // // //       if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

// // // //       let dir = 0;
// // // //       if (e.key === "ArrowDown" || e.key === "PageDown") dir = 1;
// // // //       else if (e.key === "ArrowUp" || e.key === "PageUp") dir = -1;
// // // //       else if (e.key === " ") dir = e.shiftKey ? -1 : 1;

// // // //       if (!dir) return;

// // // //       const consumed = go(dir);
// // // //       if (consumed) e.preventDefault();
// // // //     };

// // // //     window.addEventListener("scroll", onScroll, { passive: true });
// // // //     window.addEventListener("wheel", onWheel, { passive: false });
// // // //     window.addEventListener("touchstart", onTouchStart, { passive: true });
// // // //     window.addEventListener("touchmove", onTouchMove, { passive: false });
// // // //     window.addEventListener("keydown", onKeyDown);

// // // //     return () => {
// // // //       clearTimeout(timer);
// // // //       window.removeEventListener("scroll", onScroll);
// // // //       window.removeEventListener("wheel", onWheel);
// // // //       window.removeEventListener("touchstart", onTouchStart);
// // // //       window.removeEventListener("touchmove", onTouchMove);
// // // //       window.removeEventListener("keydown", onKeyDown);
// // // //     };
// // // //   }, [total]);

// // // //   /* =========================
// // // //      STATUS
// // // //   ========================= */

// // // //   const getStatus = (index) => {
// // // //     if (index < targetIndex) return "Completed";
// // // //     if (index === targetIndex) return "In Progress";
// // // //     return "Pending";
// // // //   };

// // // //   return (
// // // //     <section
// // // //       ref={sectionRef}
// // // //       className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#3C3C3B] px-4 sm:px-6"
// // // //     >
// // // //       <div className="w-full">
// // // //         <KineticGrid className="!h-auto w-full rounded-2xl">
// // // //           <div
// // // //             className="
// // // //               relative
// // // //               mx-auto
// // // //               max-w-7xl
// // // //               px-4
// // // //               py-6
// // // //               sm:px-8
// // // //               sm:py-10
// // // //             "
// // // //           >
// // // //             {/* =========================
// // // //                 HEADER
// // // //             ========================= */}

// // // //             <motion.div
// // // //               initial={{ opacity: 0, y: 20 }}
// // // //               whileInView={{ opacity: 1, y: 0 }}
// // // //               viewport={{ once: true }}
// // // //               transition={{ duration: 0.7 }}
// // // //               className="mb-5 text-center sm:mb-10"
// // // //             >
// // // //               <span
// // // //                 className="
// // // //                   text-[10px]
// // // //                   font-semibold
// // // //                   uppercase
// // // //                   tracking-[0.28em]
// // // //                   text-white
// // // //                   sm:text-xs
// // // //                 "
// // // //               >
// // // //                 The Construction Journey
// // // //               </span>

// // // //               <h2
// // // //                 className="
// // // //                   mt-3
// // // //                   text-3xl
// // // //                   font-bold
// // // //                   leading-tight
// // // //                   text-white
// // // //                   sm:text-4xl
// // // //                   md:text-5xl
// // // //                 "
// // // //               >
// // // //                 From Ground To Completion
// // // //               </h2>

// // // //               <p
// // // //                 className="
// // // //                   mx-auto
// // // //                   mt-3
// // // //                   hidden
// // // //                   max-w-xl
// // // //                   sm:block
// // // //                   text-[11px]
// // // //                   leading-relaxed
// // // //                   text-white/35
// // // //                   sm:text-xs
// // // //                 "
// // // //               >
// // // //                 Every phase hands the project to the next. One continuous
// // // //                 construction sequence.
// // // //               </p>
// // // //             </motion.div>

// // // //             {/* ==================================================
// // // //                 DESKTOP CINEMATIC TREE
// // // //             ================================================== */}

// // // //             <div
// // // //               className="
// // // //                 relative
// // // //                 hidden
// // // //                 h-[430px]
// // // //                 overflow-hidden
// // // //                 md:block
// // // //                 lg:h-[470px]
// // // //               "
// // // //             >
// // // //               {/* SVG TREE (root → groups فقط) */}

// // // //               <svg
// // // //                 viewBox="0 0 100 100"
// // // //                 preserveAspectRatio="none"
// // // //                 className="
// // // //                   pointer-events-none
// // // //                   absolute
// // // //                   inset-0
// // // //                   h-full
// // // //                   w-full
// // // //                 "
// // // //               >
// // // //                 {GROUPS.map((group, index) => {
// // // //                   const point = GROUP_POSITIONS_DESKTOP[index];
// // // //                   const revealed = revealedGroups.has(index);

// // // //                   return (
// // // //                     <motion.path
// // // //                       key={`root-group-${index}`}
// // // //                       d={`
// // // //                         M ${ROOT_POSITION_DESKTOP.x}
// // // //                           ${ROOT_POSITION_DESKTOP.y}

// // // //                         Q
// // // //                           ${(ROOT_POSITION_DESKTOP.x + point.x) / 2}
// // // //                           ${point.y}

// // // //                           ${point.x}
// // // //                           ${point.y}
// // // //                       `}
// // // //                       fill="none"
// // // //                       stroke={revealed ? ACCENT : LINE_IDLE}
// // // //                       strokeWidth="0.35"
// // // //                       strokeLinecap="round"
// // // //                       initial={{ pathLength: 0, opacity: 0 }}
// // // //                       animate={{
// // // //                         pathLength: revealed ? 1 : 0,
// // // //                         opacity: revealed ? 1 : 0,
// // // //                       }}
// // // //                       transition={{ duration: 0.8, ease: "easeInOut" }}
// // // //                     />
// // // //                   );
// // // //                 })}
// // // //               </svg>

// // // //               {/* ROOT NODE */}

// // // //               <motion.div
// // // //                 initial={{ opacity: 0, scale: 0.7 }}
// // // //                 animate={{ opacity: 1, scale: 1 }}
// // // //                 transition={{ duration: 0.7 }}
// // // //                 className="
// // // //                   absolute
// // // //                   z-30
// // // //                   flex
// // // //                   -translate-x-1/2
// // // //                   -translate-y-1/2
// // // //                   flex-col
// // // //                   items-center
// // // //                   gap-2
// // // //                 "
// // // //                 style={{
// // // //                   left: `${ROOT_POSITION_DESKTOP.x}%`,
// // // //                   top: `${ROOT_POSITION_DESKTOP.y}%`,
// // // //                 }}
// // // //               >
// // // //                 <div
// // // //                   className="
// // // //                     relative
// // // //                     h-24
// // // //                     w-24
// // // //                     overflow-hidden
// // // //                     rounded-full
// // // //                     border-2
// // // //                     border-white
// // // //                     bg-[#3C3C3B]
// // // //                     shadow-[0_0_45px_rgba(255,255,255,0.15)]
// // // //                     lg:h-28
// // // //                     lg:w-28
// // // //                   "
// // // //                 >
// // // //                   <img
// // // //                     src={project.src}
// // // //                     alt={project.title}
// // // //                     className="h-full w-full object-cover"
// // // //                   />

// // // //                   <div
// // // //                     className="
// // // //                       absolute
// // // //                       inset-0
// // // //                       bg-gradient-to-t
// // // //                       from-black/35
// // // //                       to-transparent
// // // //                     "
// // // //                   />
// // // //                 </div>

// // // //                 <span
// // // //                   className="
// // // //                     rounded-full
// // // //                     bg-[#2A317A]
// // // //                     px-3
// // // //                     py-1
// // // //                     text-[9px]
// // // //                     font-semibold
// // // //                     uppercase
// // // //                     tracking-[0.1em]
// // // //                     text-white
// // // //                   "
// // // //                 >
// // // //                   Project Start
// // // //                 </span>
// // // //               </motion.div>

// // // //               {/* GROUP NODES */}

// // // //               {GROUPS.map((group, index) => (
// // // //                 <DesktopGroupNode
// // // //                   key={group.title}
// // // //                   group={group}
// // // //                   index={index}
// // // //                   active={activeGroup === index}
// // // //                   revealed={revealedGroups.has(index)}
// // // //                 />
// // // //               ))}

// // // //               {/* MOVING PHASE CARD */}

// // // //               <AnimatePresence mode="wait">
// // // //                 <motion.div
// // // //                   key={activePhase}
// // // //                   initial={{
// // // //                     left: `${GROUP_POSITIONS_DESKTOP[activeGroup].x}%`,
// // // //                     top: `${GROUP_POSITIONS_DESKTOP[activeGroup].y}%`,
// // // //                     opacity: 0,
// // // //                     scale: 0.85,
// // // //                   }}
// // // //                   animate={{
// // // //                     left: `${CARD_POSITION_DESKTOP.x}%`,
// // // //                     top: `${GROUP_POSITIONS_DESKTOP[activeGroup].y}%`,
// // // //                     opacity: 1,
// // // //                     scale: 1,
// // // //                   }}
// // // //                   exit={{
// // // //                     left: "108%",
// // // //                     opacity: 0,
// // // //                     scale: 0.96,
// // // //                   }}
// // // //                   transition={{
// // // //                     left: { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
// // // //                     top: { duration: 0.5, ease: "easeInOut" },
// // // //                     opacity: { duration: 0.45 },
// // // //                     scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
// // // //                   }}
// // // //                   className="
// // // //                     absolute
// // // //                     z-40
// // // //                     -translate-x-1/2
// // // //                     -translate-y-1/2
// // // //                   "
// // // //                 >
// // // //                   <PhaseCard
// // // //                     phase={PHASES[activePhase]}
// // // //                     index={activePhase}
// // // //                     image={getImage(activePhase)}
// // // //                     progress={Math.round(
// // // //                       ((activePhase + 1) / PHASES.length) * 100
// // // //                     )}
// // // //                     status={getStatus(activePhase)}
// // // //                     groupIndex={activeGroup}
// // // //                   />
// // // //                 </motion.div>
// // // //               </AnimatePresence>

// // // //               {/* LIVE INDICATOR */}

// // // //               <motion.div
// // // //                 initial={{ opacity: 0, y: 10 }}
// // // //                 animate={{ opacity: 1, y: 0 }}
// // // //                 className="
// // // //                   absolute
// // // //                   bottom-2
// // // //                   left-[78%]
// // // //                   z-30
// // // //                   -translate-x-1/2
// // // //                 "
// // // //               >
// // // //                 <div
// // // //                   className="
// // // //                     flex
// // // //                     items-center
// // // //                     gap-2
// // // //                     rounded-full
// // // //                     border
// // // //                     border-white/15
// // // //                     bg-black/20
// // // //                     px-3
// // // //                     py-1.5
// // // //                     backdrop-blur-md
// // // //                   "
// // // //                 >
// // // //                   <motion.span
// // // //                     animate={{ opacity: [0.35, 1, 0.35] }}
// // // //                     transition={{ duration: 1.4, repeat: Infinity }}
// // // //                     className="
// // // //                       h-1.5
// // // //                       w-1.5
// // // //                       rounded-full
// // // //                       bg-white
// // // //                     "
// // // //                   />

// // // //                   <span
// // // //                     className="
// // // //                       text-[8px]
// // // //                       uppercase
// // // //                       tracking-[0.2em]
// // // //                       text-white/45
// // // //                     "
// // // //                   >
// // // //                     Live Construction Sequence
// // // //                   </span>
// // // //                 </div>
// // // //               </motion.div>
// // // //             </div>

// // // //             {/* ==================================================
// // // //                 MOBILE
// // // //             ================================================== */}

// // // //             <div className="relative md:hidden">
// // // //               <div className="relative h-[560px] overflow-hidden">
// // // //                 {/* MOBILE SVG TREE (root → groups فقط) */}

// // // //                 <svg
// // // //                   viewBox="0 0 100 100"
// // // //                   preserveAspectRatio="none"
// // // //                   className="
// // // //                     pointer-events-none
// // // //                     absolute
// // // //                     inset-0
// // // //                     h-full
// // // //                     w-full
// // // //                   "
// // // //                 >
// // // //                   {GROUPS.map((group, index) => {
// // // //                     const x = [18, 50, 82][index];
// // // //                     const y = 31;

// // // //                     return (
// // // //                       <motion.path
// // // //                         key={`mobile-root-${index}`}
// // // //                         d={`
// // // //                           M 50 11

// // // //                           Q
// // // //                             50 20
// // // //                             ${x} ${y}
// // // //                         `}
// // // //                         fill="none"
// // // //                         stroke={revealedGroups.has(index) ? ACCENT : LINE_IDLE}
// // // //                         strokeWidth="0.55"
// // // //                         strokeLinecap="round"
// // // //                         initial={{ pathLength: 0 }}
// // // //                         animate={{
// // // //                           pathLength: revealedGroups.has(index) ? 1 : 0,
// // // //                         }}
// // // //                         transition={{ duration: 0.65 }}
// // // //                       />
// // // //                     );
// // // //                   })}
// // // //                 </svg>

// // // //                 {/* ROOT */}

// // // //                 <div
// // // //                   className="
// // // //                     absolute
// // // //                     left-1/2
// // // //                     top-[11%]
// // // //                     z-20
// // // //                     -translate-x-1/2
// // // //                     -translate-y-1/2
// // // //                   "
// // // //                 >
// // // //                   <motion.div
// // // //                     initial={{ opacity: 0, scale: 0.7 }}
// // // //                     animate={{ opacity: 1, scale: 1 }}
// // // //                     className="flex flex-col items-center gap-2"
// // // //                   >
// // // //                     <div
// // // //                       className="
// // // //                         h-16
// // // //                         w-16
// // // //                         overflow-hidden
// // // //                         rounded-full
// // // //                         border-2
// // // //                         border-white
// // // //                         shadow-lg
// // // //                       "
// // // //                     >
// // // //                       <img
// // // //                         src={project.src}
// // // //                         alt={project.title}
// // // //                         className="h-full w-full object-cover"
// // // //                       />
// // // //                     </div>

// // // //                     <span
// // // //                       className="
// // // //                         rounded-full
// // // //                         bg-[#2A317A]
// // // //                         px-2.5
// // // //                         py-1
// // // //                         text-[8px]
// // // //                         font-semibold
// // // //                         uppercase
// // // //                         tracking-[0.08em]
// // // //                         text-white
// // // //                       "
// // // //                     >
// // // //                       Project Start
// // // //                     </span>
// // // //                   </motion.div>
// // // //                 </div>

// // // //                 {/* GROUP NODES */}

// // // //                 {GROUPS.map((group, index) => {
// // // //                   const active = activeGroup === index;
// // // //                   const revealed = revealedGroups.has(index);

// // // //                   return (
// // // //                     <motion.div
// // // //                       key={group.title}
// // // //                       initial={{ opacity: 0, scale: 0.7 }}
// // // //                       animate={{
// // // //                         opacity: revealed ? 1 : 0,
// // // //                         scale: revealed ? 1 : 0.7,
// // // //                       }}
// // // //                       className="
// // // //                         absolute
// // // //                         top-[31%]
// // // //                         z-20
// // // //                         -translate-x-1/2
// // // //                       "
// // // //                       style={{ left: `${[18, 50, 82][index]}%` }}
// // // //                     >
// // // //                       <motion.div
// // // //                         animate={{
// // // //                           borderColor: active
// // // //                             ? ACCENT
// // // //                             : "rgba(255,255,255,0.35)",
// // // //                           scale: active ? 1.08 : 1,
// // // //                         }}
// // // //                         className="
// // // //                           mx-auto
// // // //                           flex
// // // //                           h-10
// // // //                           w-10
// // // //                           items-center
// // // //                           justify-center
// // // //                           rounded-full
// // // //                           border
// // // //                           bg-[#3C3C3B]
// // // //                           text-white
// // // //                         "
// // // //                       >
// // // //                         <Plus className="h-3.5 w-3.5" />
// // // //                       </motion.div>

// // // //                       <span
// // // //                         className={`
// // // //                           mt-2
// // // //                           block
// // // //                           max-w-[90px]
// // // //                           text-center
// // // //                           text-[7px]
// // // //                           font-semibold
// // // //                           uppercase
// // // //                           leading-tight
// // // //                           ${active ? "text-white" : "text-white/40"}
// // // //                         `}
// // // //                       >
// // // //                         {group.title}
// // // //                       </span>
// // // //                     </motion.div>
// // // //                   );
// // // //                 })}

// // // //                 {/* MOBILE PHASE */}

// // // //                 <div
// // // //                   className="
// // // //                     absolute
// // // //                     left-1/2
// // // //                     top-[71%]
// // // //                     z-40
// // // //                     w-full
// // // //                     -translate-x-1/2
// // // //                     -translate-y-1/2
// // // //                     px-2
// // // //                   "
// // // //                 >
// // // //                   <AnimatePresence mode="wait">
// // // //                     <motion.div
// // // //                       key={activePhase}
// // // //                       initial={{
// // // //                         opacity: 0,
// // // //                         x: activeGroup === 0 ? -70 : activeGroup === 2 ? 70 : 0,
// // // //                         scale: 0.92,
// // // //                       }}
// // // //                       animate={{ opacity: 1, x: 0, scale: 1 }}
// // // //                       exit={{ opacity: 0, x: 90, scale: 0.94 }}
// // // //                       transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
// // // //                       className="flex justify-center"
// // // //                     >
// // // //                       <PhaseCard
// // // //                         phase={PHASES[activePhase]}
// // // //                         index={activePhase}
// // // //                         image={getImage(activePhase)}
// // // //                         progress={Math.round(
// // // //                           ((activePhase + 1) / PHASES.length) * 100
// // // //                         )}
// // // //                         status={getStatus(activePhase)}
// // // //                         groupIndex={activeGroup}
// // // //                       />
// // // //                     </motion.div>
// // // //                   </AnimatePresence>
// // // //                 </div>

// // // //                 {/* MOBILE LIVE LABEL */}

// // // //                 <div
// // // //                   className="
// // // //                     absolute
// // // //                     bottom-2
// // // //                     left-1/2
// // // //                     z-20
// // // //                     -translate-x-1/2
// // // //                   "
// // // //                 >
// // // //                   <div
// // // //                     className="
// // // //                       flex
// // // //                       items-center
// // // //                       gap-2
// // // //                       whitespace-nowrap
// // // //                       rounded-full
// // // //                       border
// // // //                       border-white/15
// // // //                       bg-black/20
// // // //                       px-3
// // // //                       py-1.5
// // // //                       backdrop-blur-md
// // // //                     "
// // // //                   >
// // // //                     <motion.span
// // // //                       animate={{ opacity: [0.3, 1, 0.3] }}
// // // //                       transition={{ duration: 1.4, repeat: Infinity }}
// // // //                       className="
// // // //                         h-1.5
// // // //                         w-1.5
// // // //                         rounded-full
// // // //                         bg-white
// // // //                       "
// // // //                     />

// // // //                     <span
// // // //                       className="
// // // //                         text-[7px]
// // // //                         uppercase
// // // //                         tracking-[0.18em]
// // // //                         text-white/40
// // // //                       "
// // // //                     >
// // // //                       Live Construction Sequence
// // // //                     </span>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </KineticGrid>
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // }



// // // import { useEffect, useMemo, useRef, useState } from "react";
// // // import { AnimatePresence, motion } from "motion/react";
// // // import {
// // //   ClipboardList,
// // //   HardHat,
// // //   Layers,
// // //   Building2,
// // //   Cable,
// // //   Paintbrush,
// // //   Sparkles,
// // //   CheckCircle2,
// // //   Plus,
// // //   ArrowRight,
// // // } from "lucide-react";
// // // import KineticGrid from "../KineticGrid/KineticGrid";

// // // const PHASES = [
// // //   { title: "Project Start", tag: "START", icon: ClipboardList },
// // //   { title: "Site Preparation", tag: "PREP", icon: HardHat },
// // //   { title: "Foundation", tag: "FOUND", icon: Layers },
// // //   { title: "Structural Work", tag: "STRUCT", icon: Building2 },
// // //   { title: "MEP Installation", tag: "MEP", icon: Cable },
// // //   { title: "Interior & Exterior", tag: "FINISH", icon: Paintbrush },
// // //   { title: "Final Finishing", tag: "DETAIL", icon: Sparkles },
// // //   { title: "Project Completed", tag: "DONE", icon: CheckCircle2 },
// // // ];

// // // const GROUPS = [
// // //   { title: "Pre-Construction", phases: [0, 1] },
// // //   { title: "Core Construction", phases: [2, 3, 4] },
// // //   { title: "Finishing & Delivery", phases: [5, 6, 7] },
// // // ];

// // // /* true = يعرض كل الـ phases من الأول للآخر، false = يقف عند currentPhase بتاع المشروع */
// // // const PLAY_ALL = true;

// // // /* الوقت اللي كل phase بتاخده قبل ما الـ scroll اللي بعده يتحسب (ms) */
// // // const STEP_MS = 1500;

// // // /* أقل حركة wheel تتحسب (عشان الـ trackpad inertia) */
// // // const MIN_WHEEL_DELTA = 15;

// // // /* بعد ما الصفحة تتثبت على السيكشن، بنتجاهل الـ inertia للمدة دي (ms) */
// // // const ENGAGE_MS = 700;

// // // /* لو عندك navbar fixed، حطي ارتفاعه هنا */
// // // const NAV_OFFSET = 0;

// // // const ACCENT = "#FFFFFF";
// // // const BG = "#3C3C3B";

// // // const LINE_IDLE = "rgba(255,255,255,0.12)";
// // // const LINE_ACTIVE = "rgba(255,255,255,0.6)";

// // // const GROUP_POSITIONS_DESKTOP = [
// // //   { x: 30, y: 22 },
// // //   { x: 48, y: 50 },
// // //   { x: 66, y: 78 },
// // // ];

// // // const ROOT_POSITION_DESKTOP = { x: 7, y: 50 };

// // // const CARD_POSITION_DESKTOP = { x: 78 };

// // // function getGroupIndex(phaseIndex) {
// // //   return GROUPS.findIndex((group) => group.phases.includes(phaseIndex));
// // // }

// // // function PhaseCard({ phase, index, image, progress, status, groupIndex }) {
// // //   const Icon = phase.icon;

// // //   return (
// // //     <motion.div
// // //       initial={{ opacity: 0, scale: 0.9 }}
// // //       animate={{ opacity: 1, scale: 1 }}
// // //       exit={{ opacity: 0, scale: 0.92 }}
// // //       transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
// // //       className="
// // //         w-[280px]
// // //         sm:w-[310px]
// // //         lg:w-[340px]
// // //         overflow-hidden
// // //         rounded-2xl
// // //         border border-white/10
// // //         bg-[#3C3C3B]
// // //         shadow-[0_25px_80px_rgba(0,0,0,0.35)]
// // //       "
// // //     >
// // //       {/* IMAGE */}

// // //       <div className="relative h-40 sm:h-44 lg:h-48 w-full overflow-hidden">
// // //         <motion.img
// // //           src={image}
// // //           alt={phase.title}
// // //           initial={{ scale: 1.1 }}
// // //           animate={{ scale: 1 }}
// // //           transition={{ duration: 1.4, ease: "easeOut" }}
// // //           className="h-full w-full object-cover"
// // //         />

// // //         {/* dark cinematic overlay */}
// // //         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

// // //         {/* phase number */}

// // //         <div className="absolute left-3 top-3">
// // //           <span
// // //             className="
// // //               rounded-full
// // //               bg-black/60
// // //               px-2.5
// // //               py-1
// // //               text-[9px]
// // //               font-semibold
// // //               tracking-[0.12em]
// // //               text-white
// // //               backdrop-blur-md
// // //             "
// // //           >
// // //             PHASE {String(index + 1).padStart(2, "0")}
// // //           </span>
// // //         </div>

// // //         {/* icon */}

// // //         <div
// // //           className="
// // //             absolute
// // //             right-3
// // //             top-3
// // //             flex
// // //             h-8
// // //             w-8
// // //             items-center
// // //             justify-center
// // //             rounded-full
// // //             bg-white
// // //             shadow-lg
// // //           "
// // //         >
// // //           <Icon className="h-4 w-4 text-black" />
// // //         </div>

// // //         {/* cinematic phase label */}

// // //         <div className="absolute bottom-3 left-4 right-4">
// // //           <div className="mb-1 text-[9px] uppercase tracking-[0.25em] text-white/45">
// // //             Construction Sequence
// // //           </div>

// // //           <h3
// // //             className="
// // //               text-base
// // //               sm:text-lg
// // //               lg:text-xl
// // //               font-bold
// // //               leading-tight
// // //               text-white
// // //             "
// // //           >
// // //             {phase.title}
// // //           </h3>
// // //         </div>
// // //       </div>

// // //       {/* CONTENT */}

// // //       <div className="p-4 sm:p-5">
// // //         <div className="mb-3 flex items-center justify-between">
// // //           <div>
// // //             <p className="text-[9px] uppercase tracking-[0.18em] text-white/35">
// // //               Current Stage
// // //             </p>

// // //             <p className="mt-1 text-xs font-semibold text-white/85">
// // //               {GROUPS[groupIndex].title}
// // //             </p>
// // //           </div>

// // //           <div className="flex items-center gap-2">
// // //             <span
// // //               className={`
// // //                 rounded-full
// // //                 px-2.5
// // //                 py-1
// // //                 text-[9px]
// // //                 font-semibold
// // //                 ${
// // //                   status === "Completed"
// // //                     ? "bg-white/15 text-white"
// // //                     : status === "In Progress"
// // //                     ? "bg-[#2A317A]/50 text-white"
// // //                     : "bg-white/5 text-white/25"
// // //                 }
// // //               `}
// // //             >
// // //               {status}
// // //             </span>
// // //           </div>
// // //         </div>

// // //         {/* progress */}

// // //         <div className="mb-2 flex items-center justify-between">
// // //           <span className="text-[9px] uppercase tracking-[0.12em] text-white/35">
// // //             Progress
// // //           </span>

// // //           <span className="text-[10px] font-semibold text-white">
// // //             {progress}%
// // //           </span>
// // //         </div>

// // //         <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/5">
// // //           <motion.div
// // //             initial={{ width: 0 }}
// // //             animate={{ width: `${progress}%` }}
// // //             transition={{ duration: 1.2, ease: "easeOut" }}
// // //             className="h-full rounded-full bg-white"
// // //           />
// // //         </div>

// // //         {/* footer */}

// // //         <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
// // //           <span className="text-[9px] tracking-[0.16em] text-white/25">
// // //             HANDOFF {String(index + 1).padStart(2, "0")}
// // //           </span>

// // //           <ArrowRight className="h-3.5 w-3.5 text-white" />
// // //         </div>
// // //       </div>
// // //     </motion.div>
// // //   );
// // // }

// // // function DesktopGroupNode({ group, index, active, revealed }) {
// // //   return (
// // //     <motion.div
// // //       initial={{ opacity: 0, scale: 0.7 }}
// // //       animate={{
// // //         opacity: revealed ? 1 : 0,
// // //         scale: revealed ? 1 : 0.7,
// // //       }}
// // //       transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
// // //       className="
// // //         absolute
// // //         z-20
// // //         flex
// // //         -translate-x-1/2
// // //         -translate-y-1/2
// // //         flex-col
// // //         items-center
// // //         gap-2
// // //       "
// // //       style={{
// // //         left: `${GROUP_POSITIONS_DESKTOP[index].x}%`,
// // //         top: `${GROUP_POSITIONS_DESKTOP[index].y}%`,
// // //       }}
// // //     >
// // //       {/* pulse ring */}

// // //       <AnimatePresence>
// // //         {active && (
// // //           <motion.div
// // //             initial={{ opacity: 0, scale: 0.6 }}
// // //             animate={{
// // //               opacity: [0.15, 0.4, 0.15],
// // //               scale: [0.9, 1.25, 0.9],
// // //             }}
// // //             exit={{ opacity: 0 }}
// // //             transition={{
// // //               duration: 1.8,
// // //               repeat: Infinity,
// // //               ease: "easeInOut",
// // //             }}
// // //             className="
// // //               absolute
// // //               h-16
// // //               w-16
// // //               rounded-full
// // //               border
// // //               border-white/30
// // //             "
// // //           />
// // //         )}
// // //       </AnimatePresence>

// // //       {/* node */}

// // //       <motion.div
// // //         animate={{
// // //           borderColor: active ? ACCENT : "rgba(255,255,255,0.35)",
// // //           backgroundColor: active ? "#474746" : BG,
// // //           scale: active ? 1.08 : 1,
// // //         }}
// // //         transition={{ duration: 0.4 }}
// // //         className="
// // //           flex
// // //           h-12
// // //           w-12
// // //           items-center
// // //           justify-center
// // //           rounded-full
// // //           border
// // //           text-white
// // //         "
// // //       >
// // //         <Plus className="h-4 w-4" />
// // //       </motion.div>

// // //       {/* label */}

// // //       <span
// // //         className={`
// // //           rounded-full
// // //           border
// // //           px-3
// // //           py-1
// // //           text-[9px]
// // //           font-semibold
// // //           uppercase
// // //           tracking-[0.08em]
// // //           whitespace-nowrap
// // //           backdrop-blur-md
// // //           ${
// // //             active
// // //               ? "border-white/30 bg-white/10 text-white"
// // //               : "border-white/5 bg-white/5 text-white/45"
// // //           }
// // //         `}
// // //       >
// // //         {group.title}
// // //       </span>
// // //     </motion.div>
// // //   );
// // // }

// // // export default function ProjectHierarchy({ project }) {
// // //   const sectionRef = useRef(null);
// // //   const phaseRef = useRef(0);
// // //   const [activePhase, setActivePhase] = useState(0);

// // //   /* =========================
// // //      TARGET PHASE
// // //   ========================= */

// // //   const targetIndex = useMemo(() => {
// // //     if (typeof project.currentPhase === "number") {
// // //       return project.currentPhase;
// // //     }

// // //     if (project.status?.toLowerCase() === "finished") {
// // //       return PHASES.length - 1;
// // //     }

// // //     return Math.floor(PHASES.length / 2);
// // //   }, [project]);

// // //   /* =========================
// // //      VALID PHASES
// // //   ========================= */

// // //   const playablePhases = useMemo(
// // //     () => PHASES.slice(0, targetIndex + 1).map((_, index) => index),
// // //     [targetIndex]
// // //   );

// // //   const total = PLAY_ALL ? PHASES.length : playablePhases.length;

// // //   /* =========================
// // //      IMAGE
// // //   ========================= */

// // //   const getImage = (phaseIndex) =>
// // //     project.phaseGallery?.[phaseIndex] ||
// // //     (project.gallery?.length
// // //       ? project.gallery[phaseIndex % project.gallery.length]
// // //       : project.src);

// // //   /* =========================
// // //      CURRENT GROUP
// // //   ========================= */

// // //   const activeGroup = getGroupIndex(activePhase);
// // //   const activePoint = GROUP_POSITIONS_DESKTOP[activeGroup];

// // //   /* الجروبات المكشوفة = كل جروب وصلنا له لحد الـ phase الحالية
// // //      (بترجع تختفي لو عملتي scroll لفوق) */
// // //   const revealedGroups = useMemo(() => {
// // //     const set = new Set();
// // //     for (let i = 0; i <= activePhase; i++) set.add(getGroupIndex(i));
// // //     return set;
// // //   }, [activePhase]);

// // //   /* =========================
// // //      SCROLL SEQUENCER
// // //      - لما أعلى السيكشن يلمس أعلى الشاشة الصفحة بتتثبت عليه.
// // //      - كل scroll بيقدّم phase واحدة بالترتيب (ولفوق بيرجّع).
// // //      - لما الـ phases تخلص الصفحة بتكمل عادي.
// // //      مفيش "حالة قفل" متخزنة: القرار بيتاخد من مكان السيكشن الفعلي
// // //      في كل حركة، فمستحيل الصفحة تعلق.
// // //   ========================= */

// // //   useEffect(() => {
// // //     const section = sectionRef.current;
// // //     if (!section) return;

// // //     const last = total - 1;

// // //     let busy = false;
// // //     let timer;
// // //     let prevY = window.scrollY;
// // //     let touchY = null;

// // //     const holdFor = (ms) => {
// // //       busy = true;
// // //       clearTimeout(timer);
// // //       timer = setTimeout(() => {
// // //         busy = false;
// // //       }, ms);
// // //     };

// // //     const isAligned = () =>
// // //       Math.abs(section.getBoundingClientRect().top - NAV_OFFSET) <= 2;

// // //     const setPhase = (n) => {
// // //       phaseRef.current = n;
// // //       setActivePhase(n);
// // //     };

// // //     /* هل الحركة دي تتستهلك جوه السيكشن؟ */
// // //     const consumes = (dir) => {
// // //       if (!isAligned()) return false;
// // //       if (busy) return true;
// // //       const next = phaseRef.current + dir;
// // //       return next >= 0 && next <= last;
// // //     };

// // //     const advance = (dir) => {
// // //       setPhase(phaseRef.current + dir);
// // //       holdFor(STEP_MS);
// // //     };

// // //     const onScroll = () => {
// // //       const y = window.scrollY;
// // //       const rect = section.getBoundingClientRect();
// // //       const top = rect.top - NAV_OFFSET;
// // //       const pageTop = y + top;
// // //       const aligned = Math.abs(top) <= 2;

// // //       /* لو الصفحة اتنقلت بطريقة تانية (لينك، scrollbar، refresh)
// // //          بنظبط الـ phase حسب مكان السيكشن */
// // //       if (!aligned) {
// // //         if (rect.bottom <= 0 && phaseRef.current !== last) {
// // //           setPhase(last);
// // //         } else if (
// // //           rect.top >= window.innerHeight &&
// // //           phaseRef.current !== 0
// // //         ) {
// // //           setPhase(0);
// // //         }
// // //       }

// // //       const dir = y > prevY ? 1 : y < prevY ? -1 : 0;

// // //       const crossed =
// // //         (dir > 0 && prevY < pageTop - 1 && y >= pageTop - 1) ||
// // //         (dir < 0 && prevY > pageTop + 1 && y <= pageTop + 1);

// // //       const canEnter =
// // //         (dir > 0 && phaseRef.current < last) ||
// // //         (dir < 0 && phaseRef.current > 0);

// // //       /* دخلنا السيكشن من فوق أو من تحت → ثبّت الصفحة على أعلاه */
// // //       if (crossed && canEnter && !aligned) {
// // //         window.scrollTo({ top: pageTop, left: 0, behavior: "instant" });
// // //         prevY = pageTop;
// // //         holdFor(ENGAGE_MS);
// // //         return;
// // //       }

// // //       prevY = y;
// // //     };

// // //     const onWheel = (e) => {
// // //       if (e.ctrlKey) return;

// // //       const dir = e.deltaY > 0 ? 1 : -1;
// // //       if (!consumes(dir)) return;

// // //       e.preventDefault();

// // //       if (busy || Math.abs(e.deltaY) < MIN_WHEEL_DELTA) return;
// // //       advance(dir);
// // //     };

// // //     const onTouchStart = (e) => {
// // //       touchY = e.touches[0].clientY;
// // //     };

// // //     const onTouchMove = (e) => {
// // //       if (touchY === null) return;

// // //       const dy = touchY - e.touches[0].clientY;
// // //       if (dy === 0) return;

// // //       const dir = dy > 0 ? 1 : -1;
// // //       if (!consumes(dir)) return;

// // //       e.preventDefault();

// // //       if (busy || Math.abs(dy) < 30) return;

// // //       touchY = e.touches[0].clientY;
// // //       advance(dir);
// // //     };

// // //     const onTouchEnd = () => {
// // //       touchY = null;
// // //     };

// // //     const onKeyDown = (e) => {
// // //       const tag = e.target?.tagName;
// // //       if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

// // //       let dir = 0;
// // //       if (e.key === "ArrowDown" || e.key === "PageDown") dir = 1;
// // //       else if (e.key === "ArrowUp" || e.key === "PageUp") dir = -1;
// // //       else if (e.key === " ") dir = e.shiftKey ? -1 : 1;

// // //       if (!dir || !consumes(dir)) return;

// // //       e.preventDefault();

// // //       if (busy) return;
// // //       advance(dir);
// // //     };

// // //     window.addEventListener("scroll", onScroll, { passive: true });
// // //     window.addEventListener("wheel", onWheel, { passive: false });
// // //     window.addEventListener("touchstart", onTouchStart, { passive: true });
// // //     window.addEventListener("touchmove", onTouchMove, { passive: false });
// // //     window.addEventListener("touchend", onTouchEnd, { passive: true });
// // //     window.addEventListener("keydown", onKeyDown);

// // //     return () => {
// // //       clearTimeout(timer);
// // //       window.removeEventListener("scroll", onScroll);
// // //       window.removeEventListener("wheel", onWheel);
// // //       window.removeEventListener("touchstart", onTouchStart);
// // //       window.removeEventListener("touchmove", onTouchMove);
// // //       window.removeEventListener("touchend", onTouchEnd);
// // //       window.removeEventListener("keydown", onKeyDown);
// // //     };
// // //   }, [total]);

// // //   /* =========================
// // //      STATUS
// // //   ========================= */

// // //   const getStatus = (index) => {
// // //     if (index < targetIndex) return "Completed";
// // //     if (index === targetIndex) return "In Progress";
// // //     return "Pending";
// // //   };

// // //   return (
// // //     <section
// // //       ref={sectionRef}
// // //       className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#3C3C3B] px-4 sm:px-6"
// // //     >
// // //       <div className="w-full">
// // //         <KineticGrid className="!h-auto w-full rounded-2xl">
// // //           <div
// // //             className="
// // //               relative
// // //               mx-auto
// // //               max-w-7xl
// // //               px-4
// // //               py-6
// // //               sm:px-8
// // //               sm:py-10
// // //             "
// // //           >
// // //             {/* =========================
// // //                 HEADER
// // //             ========================= */}

// // //             <motion.div
// // //               initial={{ opacity: 0, y: 20 }}
// // //               whileInView={{ opacity: 1, y: 0 }}
// // //               viewport={{ once: true }}
// // //               transition={{ duration: 0.7 }}
// // //               className="mb-5 text-center sm:mb-10"
// // //             >
// // //               <span
// // //                 className="
// // //                   text-[10px]
// // //                   font-semibold
// // //                   uppercase
// // //                   tracking-[0.28em]
// // //                   text-white
// // //                   sm:text-xs
// // //                 "
// // //               >
// // //                 The Construction Journey
// // //               </span>

// // //               <h2
// // //                 className="
// // //                   mt-3
// // //                   text-3xl
// // //                   font-bold
// // //                   leading-tight
// // //                   text-white
// // //                   sm:text-4xl
// // //                   md:text-5xl
// // //                 "
// // //               >
// // //                 From Ground To Completion
// // //               </h2>

// // //               <p
// // //                 className="
// // //                   mx-auto
// // //                   mt-3
// // //                   hidden
// // //                   max-w-xl
// // //                   sm:block
// // //                   text-[11px]
// // //                   leading-relaxed
// // //                   text-white/35
// // //                   sm:text-xs
// // //                 "
// // //               >
// // //                 Every phase hands the project to the next. One continuous
// // //                 construction sequence.
// // //               </p>
// // //             </motion.div>

// // //             {/* ==================================================
// // //                 DESKTOP CINEMATIC TREE
// // //             ================================================== */}

// // //             <div
// // //               className="
// // //                 relative
// // //                 hidden
// // //                 h-[430px]
// // //                 overflow-hidden
// // //                 md:block
// // //                 lg:h-[470px]
// // //               "
// // //             >
// // //               {/* SVG TREE (root → groups فقط) */}

// // //               <svg
// // //                 viewBox="0 0 100 100"
// // //                 preserveAspectRatio="none"
// // //                 className="
// // //                   pointer-events-none
// // //                   absolute
// // //                   inset-0
// // //                   h-full
// // //                   w-full
// // //                 "
// // //               >
// // //                 {GROUPS.map((group, index) => {
// // //                   const point = GROUP_POSITIONS_DESKTOP[index];
// // //                   const revealed = revealedGroups.has(index);

// // //                   return (
// // //                     <motion.path
// // //                       key={`root-group-${index}`}
// // //                       d={`
// // //                         M ${ROOT_POSITION_DESKTOP.x}
// // //                           ${ROOT_POSITION_DESKTOP.y}

// // //                         Q
// // //                           ${(ROOT_POSITION_DESKTOP.x + point.x) / 2}
// // //                           ${point.y}

// // //                           ${point.x}
// // //                           ${point.y}
// // //                       `}
// // //                       fill="none"
// // //                       stroke={revealed ? ACCENT : LINE_IDLE}
// // //                       strokeWidth="0.35"
// // //                       strokeLinecap="round"
// // //                       initial={{ pathLength: 0, opacity: 0 }}
// // //                       animate={{
// // //                         pathLength: revealed ? 1 : 0,
// // //                         opacity: revealed ? 1 : 0,
// // //                       }}
// // //                       transition={{ duration: 0.8, ease: "easeInOut" }}
// // //                     />
// // //                   );
// // //                 })}

// // //                 {/* الخط اللي بيوصل الـ + بالكارت */}
// // //                 <AnimatePresence mode="wait">
// // //                   <motion.path
// // //                     key={`active-line-${activePhase}`}
// // //                     d={`M ${activePoint.x} ${activePoint.y} L ${CARD_POSITION_DESKTOP.x} ${activePoint.y}`}
// // //                     fill="none"
// // //                     stroke={LINE_ACTIVE}
// // //                     strokeWidth="0.4"
// // //                     strokeLinecap="round"
// // //                     initial={{ pathLength: 0, opacity: 0 }}
// // //                     animate={{ pathLength: 1, opacity: 1 }}
// // //                     exit={{ pathLength: 0, opacity: 0 }}
// // //                     transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
// // //                   />
// // //                 </AnimatePresence>
// // //               </svg>

// // //               {/* ROOT NODE */}

// // //               <motion.div
// // //                 initial={{ opacity: 0, scale: 0.7 }}
// // //                 animate={{ opacity: 1, scale: 1 }}
// // //                 transition={{ duration: 0.7 }}
// // //                 className="
// // //                   absolute
// // //                   z-30
// // //                   flex
// // //                   -translate-x-1/2
// // //                   -translate-y-1/2
// // //                   flex-col
// // //                   items-center
// // //                   gap-2
// // //                 "
// // //                 style={{
// // //                   left: `${ROOT_POSITION_DESKTOP.x}%`,
// // //                   top: `${ROOT_POSITION_DESKTOP.y}%`,
// // //                 }}
// // //               >
// // //                 <div
// // //                   className="
// // //                     relative
// // //                     h-24
// // //                     w-24
// // //                     overflow-hidden
// // //                     rounded-full
// // //                     border-2
// // //                     border-white
// // //                     bg-[#3C3C3B]
// // //                     shadow-[0_0_45px_rgba(255,255,255,0.15)]
// // //                     lg:h-28
// // //                     lg:w-28
// // //                   "
// // //                 >
// // //                   <img
// // //                     src={project.src}
// // //                     alt={project.title}
// // //                     className="h-full w-full object-cover"
// // //                   />

// // //                   <div
// // //                     className="
// // //                       absolute
// // //                       inset-0
// // //                       bg-gradient-to-t
// // //                       from-black/35
// // //                       to-transparent
// // //                     "
// // //                   />
// // //                 </div>

// // //                 <span
// // //                   className="
// // //                     rounded-full
// // //                     bg-[#2A317A]
// // //                     px-3
// // //                     py-1
// // //                     text-[9px]
// // //                     font-semibold
// // //                     uppercase
// // //                     tracking-[0.1em]
// // //                     text-white
// // //                   "
// // //                 >
// // //                   Project Start
// // //                 </span>
// // //               </motion.div>

// // //               {/* GROUP NODES */}

// // //               {GROUPS.map((group, index) => (
// // //                 <DesktopGroupNode
// // //                   key={group.title}
// // //                   group={group}
// // //                   index={index}
// // //                   active={activeGroup === index}
// // //                   revealed={revealedGroups.has(index)}
// // //                 />
// // //               ))}

// // //               {/* MOVING PHASE CARD */}

// // //               <AnimatePresence mode="wait">
// // //                 <motion.div
// // //                   key={activePhase}
// // //                   initial={{
// // //                     left: `${GROUP_POSITIONS_DESKTOP[activeGroup].x}%`,
// // //                     top: `${GROUP_POSITIONS_DESKTOP[activeGroup].y}%`,
// // //                     opacity: 0,
// // //                     scale: 0.85,
// // //                   }}
// // //                   animate={{
// // //                     left: `${CARD_POSITION_DESKTOP.x}%`,
// // //                     top: `${GROUP_POSITIONS_DESKTOP[activeGroup].y}%`,
// // //                     opacity: 1,
// // //                     scale: 1,
// // //                   }}
// // //                   exit={{
// // //                     left: "108%",
// // //                     opacity: 0,
// // //                     scale: 0.96,
// // //                   }}
// // //                   transition={{
// // //                     left: { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
// // //                     top: { duration: 0.5, ease: "easeInOut" },
// // //                     opacity: { duration: 0.45 },
// // //                     scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
// // //                   }}
// // //                   className="
// // //                     absolute
// // //                     z-40
// // //                     -translate-x-1/2
// // //                     -translate-y-1/2
// // //                   "
// // //                 >
// // //                   <PhaseCard
// // //                     phase={PHASES[activePhase]}
// // //                     index={activePhase}
// // //                     image={getImage(activePhase)}
// // //                     progress={Math.round(
// // //                       ((activePhase + 1) / PHASES.length) * 100
// // //                     )}
// // //                     status={getStatus(activePhase)}
// // //                     groupIndex={activeGroup}
// // //                   />
// // //                 </motion.div>
// // //               </AnimatePresence>
// // //             </div>

// // //             {/* ==================================================
// // //                 MOBILE
// // //             ================================================== */}

// // //             <div className="relative md:hidden">
// // //               <div className="relative h-[560px] overflow-hidden">
// // //                 {/* MOBILE SVG TREE (root → groups فقط) */}

// // //                 <svg
// // //                   viewBox="0 0 100 100"
// // //                   preserveAspectRatio="none"
// // //                   className="
// // //                     pointer-events-none
// // //                     absolute
// // //                     inset-0
// // //                     h-full
// // //                     w-full
// // //                   "
// // //                 >
// // //                   {GROUPS.map((group, index) => {
// // //                     const x = [18, 50, 82][index];
// // //                     const y = 31;

// // //                     return (
// // //                       <motion.path
// // //                         key={`mobile-root-${index}`}
// // //                         d={`
// // //                           M 50 11

// // //                           Q
// // //                             50 20
// // //                             ${x} ${y}
// // //                         `}
// // //                         fill="none"
// // //                         stroke={revealedGroups.has(index) ? ACCENT : LINE_IDLE}
// // //                         strokeWidth="0.55"
// // //                         strokeLinecap="round"
// // //                         initial={{ pathLength: 0 }}
// // //                         animate={{
// // //                           pathLength: revealedGroups.has(index) ? 1 : 0,
// // //                         }}
// // //                         transition={{ duration: 0.65 }}
// // //                       />
// // //                     );
// // //                   })}

// // //                   {/* الخط اللي بيوصل الـ + بالكارت */}
// // //                   <AnimatePresence mode="wait">
// // //                     <motion.path
// // //                       key={`mobile-line-${activePhase}`}
// // //                       d={`M ${[18, 50, 82][activeGroup]} 31 C ${
// // //                         [18, 50, 82][activeGroup]
// // //                       } 46 50 50 50 61`}
// // //                       fill="none"
// // //                       stroke={LINE_ACTIVE}
// // //                       strokeWidth="0.55"
// // //                       strokeLinecap="round"
// // //                       initial={{ pathLength: 0, opacity: 0 }}
// // //                       animate={{ pathLength: 1, opacity: 1 }}
// // //                       exit={{ pathLength: 0, opacity: 0 }}
// // //                       transition={{ duration: 0.7, ease: "easeInOut" }}
// // //                     />
// // //                   </AnimatePresence>
// // //                 </svg>

// // //                 {/* ROOT */}

// // //                 <div
// // //                   className="
// // //                     absolute
// // //                     left-1/2
// // //                     top-[11%]
// // //                     z-20
// // //                     -translate-x-1/2
// // //                     -translate-y-1/2
// // //                   "
// // //                 >
// // //                   <motion.div
// // //                     initial={{ opacity: 0, scale: 0.7 }}
// // //                     animate={{ opacity: 1, scale: 1 }}
// // //                     className="flex flex-col items-center gap-2"
// // //                   >
// // //                     <div
// // //                       className="
// // //                         h-16
// // //                         w-16
// // //                         overflow-hidden
// // //                         rounded-full
// // //                         border-2
// // //                         border-white
// // //                         shadow-lg
// // //                       "
// // //                     >
// // //                       <img
// // //                         src={project.src}
// // //                         alt={project.title}
// // //                         className="h-full w-full object-cover"
// // //                       />
// // //                     </div>

// // //                     <span
// // //                       className="
// // //                         rounded-full
// // //                         bg-[#2A317A]
// // //                         px-2.5
// // //                         py-1
// // //                         text-[8px]
// // //                         font-semibold
// // //                         uppercase
// // //                         tracking-[0.08em]
// // //                         text-white
// // //                       "
// // //                     >
// // //                       Project Start
// // //                     </span>
// // //                   </motion.div>
// // //                 </div>

// // //                 {/* GROUP NODES */}

// // //                 {GROUPS.map((group, index) => {
// // //                   const active = activeGroup === index;
// // //                   const revealed = revealedGroups.has(index);

// // //                   return (
// // //                     <motion.div
// // //                       key={group.title}
// // //                       initial={{ opacity: 0, scale: 0.7 }}
// // //                       animate={{
// // //                         opacity: revealed ? 1 : 0,
// // //                         scale: revealed ? 1 : 0.7,
// // //                       }}
// // //                       className="
// // //                         absolute
// // //                         top-[31%]
// // //                         z-20
// // //                         -translate-x-1/2
// // //                       "
// // //                       style={{ left: `${[18, 50, 82][index]}%` }}
// // //                     >
// // //                       <motion.div
// // //                         animate={{
// // //                           borderColor: active
// // //                             ? ACCENT
// // //                             : "rgba(255,255,255,0.35)",
// // //                           scale: active ? 1.08 : 1,
// // //                         }}
// // //                         className="
// // //                           mx-auto
// // //                           flex
// // //                           h-10
// // //                           w-10
// // //                           items-center
// // //                           justify-center
// // //                           rounded-full
// // //                           border
// // //                           bg-[#3C3C3B]
// // //                           text-white
// // //                         "
// // //                       >
// // //                         <Plus className="h-3.5 w-3.5" />
// // //                       </motion.div>

// // //                       <span
// // //                         className={`
// // //                           mt-2
// // //                           block
// // //                           max-w-[90px]
// // //                           text-center
// // //                           text-[7px]
// // //                           font-semibold
// // //                           uppercase
// // //                           leading-tight
// // //                           ${active ? "text-white" : "text-white/40"}
// // //                         `}
// // //                       >
// // //                         {group.title}
// // //                       </span>
// // //                     </motion.div>
// // //                   );
// // //                 })}

// // //                 {/* MOBILE PHASE */}

// // //                 <div
// // //                   className="
// // //                     absolute
// // //                     left-1/2
// // //                     top-[71%]
// // //                     z-40
// // //                     w-full
// // //                     -translate-x-1/2
// // //                     -translate-y-1/2
// // //                     px-2
// // //                   "
// // //                 >
// // //                   <AnimatePresence mode="wait">
// // //                     <motion.div
// // //                       key={activePhase}
// // //                       initial={{
// // //                         opacity: 0,
// // //                         x: activeGroup === 0 ? -70 : activeGroup === 2 ? 70 : 0,
// // //                         scale: 0.92,
// // //                       }}
// // //                       animate={{ opacity: 1, x: 0, scale: 1 }}
// // //                       exit={{ opacity: 0, x: 90, scale: 0.94 }}
// // //                       transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
// // //                       className="flex justify-center"
// // //                     >
// // //                       <PhaseCard
// // //                         phase={PHASES[activePhase]}
// // //                         index={activePhase}
// // //                         image={getImage(activePhase)}
// // //                         progress={Math.round(
// // //                           ((activePhase + 1) / PHASES.length) * 100
// // //                         )}
// // //                         status={getStatus(activePhase)}
// // //                         groupIndex={activeGroup}
// // //                       />
// // //                     </motion.div>
// // //                   </AnimatePresence>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </KineticGrid>
// // //       </div>
// // //     </section>
// // //   );
// // // }


// // import { useEffect, useMemo, useRef, useState } from "react";
// // import { AnimatePresence, motion } from "motion/react";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // import {
// //   ClipboardList,
// //   HardHat,
// //   Layers,
// //   Building2,
// //   Cable,
// //   Paintbrush,
// //   Sparkles,
// //   CheckCircle2,
// //   Plus,
// //   ArrowRight,
// // } from "lucide-react";
// // import KineticGrid from "../KineticGrid/KineticGrid";

// // const PHASES = [
// //   { title: "Project Start", tag: "START", icon: ClipboardList },
// //   { title: "Site Preparation", tag: "PREP", icon: HardHat },
// //   { title: "Foundation", tag: "FOUND", icon: Layers },
// //   { title: "Structural Work", tag: "STRUCT", icon: Building2 },
// //   { title: "MEP Installation", tag: "MEP", icon: Cable },
// //   { title: "Interior & Exterior", tag: "FINISH", icon: Paintbrush },
// //   { title: "Final Finishing", tag: "DETAIL", icon: Sparkles },
// //   { title: "Project Completed", tag: "DONE", icon: CheckCircle2 },
// // ];

// // const GROUPS = [
// //   { title: "Pre-Construction", phases: [0, 1] },
// //   { title: "Core Construction", phases: [2, 3, 4] },
// //   { title: "Finishing & Delivery", phases: [5, 6, 7] },
// // ];

// // /* true = يعرض كل الـ phases من الأول للآخر، false = يقف عند currentPhase بتاع المشروع */
// // const PLAY_ALL = true;

// // /* الوقت اللي كل phase بتاخده قبل ما الـ scroll اللي بعده يتحسب (ms) */
// // const STEP_MS = 1500;

// // /* أقل حركة wheel تتحسب (عشان الـ trackpad inertia) */
// // const MIN_WHEEL_DELTA = 15;

// // /* بعد ما الصفحة تتثبت على السيكشن، بنتجاهل الـ inertia للمدة دي (ms) */
// // const ENGAGE_MS = 700;

// // /* هامش الخطأ (px) لاعتبار السيكشن "ملزوق" في أعلى الشاشة */
// // const ALIGN_TOL = 14;

// // /* لو عندك navbar fixed، حطي ارتفاعه هنا */
// // const NAV_OFFSET = 0;

// // const ACCENT = "#FFFFFF";
// // const BG = "#3C3C3B";

// // const LINE_IDLE = "rgba(255,255,255,0.12)";
// // const LINE_ACTIVE = "rgba(255,255,255,0.6)";

// // const GROUP_POSITIONS_DESKTOP = [
// //   { x: 30, y: 22 },
// //   { x: 48, y: 50 },
// //   { x: 66, y: 78 },
// // ];

// // const ROOT_POSITION_DESKTOP = { x: 7, y: 50 };

// // const CARD_POSITION_DESKTOP = { x: 78 };

// // function getGroupIndex(phaseIndex) {
// //   return GROUPS.findIndex((group) => group.phases.includes(phaseIndex));
// // }

// // function PhaseCard({ phase, index, image, progress, status, groupIndex }) {
// //   const Icon = phase.icon;

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, scale: 0.9 }}
// //       animate={{ opacity: 1, scale: 1 }}
// //       exit={{ opacity: 0, scale: 0.92 }}
// //       transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
// //       className="
// //         w-[280px]
// //         sm:w-[310px]
// //         lg:w-[340px]
// //         overflow-hidden
// //         rounded-2xl
// //         border border-white/10
// //         bg-[#3C3C3B]
// //         shadow-[0_25px_80px_rgba(0,0,0,0.35)]
// //       "
// //     >
// //       {/* IMAGE */}

// //       <div className="relative h-40 sm:h-44 lg:h-48 w-full overflow-hidden">
// //         <motion.img
// //           src={image}
// //           alt={phase.title}
// //           initial={{ scale: 1.1 }}
// //           animate={{ scale: 1 }}
// //           transition={{ duration: 1.4, ease: "easeOut" }}
// //           className="h-full w-full object-cover"
// //         />

// //         {/* dark cinematic overlay */}
// //         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

// //         {/* phase number */}

// //         <div className="absolute left-3 top-3">
// //           <span
// //             className="
// //               rounded-full
// //               bg-black/60
// //               px-2.5
// //               py-1
// //               text-[9px]
// //               font-semibold
// //               tracking-[0.12em]
// //               text-white
// //               backdrop-blur-md
// //             "
// //           >
// //             PHASE {String(index + 1).padStart(2, "0")}
// //           </span>
// //         </div>

// //         {/* icon */}

// //         <div
// //           className="
// //             absolute
// //             right-3
// //             top-3
// //             flex
// //             h-8
// //             w-8
// //             items-center
// //             justify-center
// //             rounded-full
// //             bg-white
// //             shadow-lg
// //           "
// //         >
// //           <Icon className="h-4 w-4 text-black" />
// //         </div>

// //         {/* cinematic phase label */}

// //         <div className="absolute bottom-3 left-4 right-4">
// //           <div className="mb-1 text-[9px] uppercase tracking-[0.25em] text-white/45">
// //             Construction Sequence
// //           </div>

// //           <h3
// //             className="
// //               text-base
// //               sm:text-lg
// //               lg:text-xl
// //               font-bold
// //               leading-tight
// //               text-white
// //             "
// //           >
// //             {phase.title}
// //           </h3>
// //         </div>
// //       </div>

// //       {/* CONTENT */}

// //       <div className="p-4 sm:p-5">
// //         <div className="mb-3 flex items-center justify-between">
// //           <div>
// //             <p className="text-[9px] uppercase tracking-[0.18em] text-white/35">
// //               Current Stage
// //             </p>

// //             <p className="mt-1 text-xs font-semibold text-white/85">
// //               {GROUPS[groupIndex].title}
// //             </p>
// //           </div>

// //           <div className="flex items-center gap-2">
// //             <span
// //               className={`
// //                 rounded-full
// //                 px-2.5
// //                 py-1
// //                 text-[9px]
// //                 font-semibold
// //                 ${
// //                   status === "Completed"
// //                     ? "bg-white/15 text-white"
// //                     : status === "In Progress"
// //                     ? "bg-[#2A317A]/50 text-white"
// //                     : "bg-white/5 text-white/25"
// //                 }
// //               `}
// //             >
// //               {status}
// //             </span>
// //           </div>
// //         </div>

// //         {/* progress */}

// //         <div className="mb-2 flex items-center justify-between">
// //           <span className="text-[9px] uppercase tracking-[0.12em] text-white/35">
// //             Progress
// //           </span>

// //           <span className="text-[10px] font-semibold text-white">
// //             {progress}%
// //           </span>
// //         </div>

// //         <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/5">
// //           <motion.div
// //             initial={{ width: 0 }}
// //             animate={{ width: `${progress}%` }}
// //             transition={{ duration: 1.2, ease: "easeOut" }}
// //             className="h-full rounded-full bg-white"
// //           />
// //         </div>

// //         {/* footer */}

// //         <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
// //           <span className="text-[9px] tracking-[0.16em] text-white/25">
// //             HANDOFF {String(index + 1).padStart(2, "0")}
// //           </span>

// //           <ArrowRight className="h-3.5 w-3.5 text-white" />
// //         </div>
// //       </div>
// //     </motion.div>
// //   );
// // }

// // function DesktopGroupNode({ group, index, active, revealed }) {
// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, scale: 0.7 }}
// //       animate={{
// //         opacity: revealed ? 1 : 0,
// //         scale: revealed ? 1 : 0.7,
// //       }}
// //       transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
// //       className="
// //         absolute
// //         z-20
// //         flex
// //         -translate-x-1/2
// //         -translate-y-1/2
// //         flex-col
// //         items-center
// //         gap-2
// //       "
// //       style={{
// //         left: `${GROUP_POSITIONS_DESKTOP[index].x}%`,
// //         top: `${GROUP_POSITIONS_DESKTOP[index].y}%`,
// //       }}
// //     >
// //       {/* pulse ring */}

// //       <AnimatePresence>
// //         {active && (
// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.6 }}
// //             animate={{
// //               opacity: [0.15, 0.4, 0.15],
// //               scale: [0.9, 1.25, 0.9],
// //             }}
// //             exit={{ opacity: 0 }}
// //             transition={{
// //               duration: 1.8,
// //               repeat: Infinity,
// //               ease: "easeInOut",
// //             }}
// //             className="
// //               absolute
// //               h-16
// //               w-16
// //               rounded-full
// //               border
// //               border-white/30
// //             "
// //           />
// //         )}
// //       </AnimatePresence>

// //       {/* node */}

// //       <motion.div
// //         animate={{
// //           borderColor: active ? ACCENT : "rgba(255,255,255,0.35)",
// //           backgroundColor: active ? "#474746" : BG,
// //           scale: active ? 1.08 : 1,
// //         }}
// //         transition={{ duration: 0.4 }}
// //         className="
// //           flex
// //           h-12
// //           w-12
// //           items-center
// //           justify-center
// //           rounded-full
// //           border
// //           text-white
// //         "
// //       >
// //         <Plus className="h-4 w-4" />
// //       </motion.div>

// //       {/* label */}

// //       <span
// //         className={`
// //           rounded-full
// //           border
// //           px-3
// //           py-1
// //           text-[9px]
// //           font-semibold
// //           uppercase
// //           tracking-[0.08em]
// //           whitespace-nowrap
// //           backdrop-blur-md
// //           ${
// //             active
// //               ? "border-white/30 bg-white/10 text-white"
// //               : "border-white/5 bg-white/5 text-white/45"
// //           }
// //         `}
// //       >
// //         {group.title}
// //       </span>
// //     </motion.div>
// //   );
// // }

// // export default function ProjectHierarchy({ project }) {
// //   const sectionRef = useRef(null);
// //   const phaseRef = useRef(0);
// //   const [activePhase, setActivePhase] = useState(0);

// //   /* =========================
// //      TARGET PHASE
// //   ========================= */

// //   const targetIndex = useMemo(() => {
// //     if (typeof project.currentPhase === "number") {
// //       return project.currentPhase;
// //     }

// //     if (project.status?.toLowerCase() === "finished") {
// //       return PHASES.length - 1;
// //     }

// //     return Math.floor(PHASES.length / 2);
// //   }, [project]);

// //   /* =========================
// //      VALID PHASES
// //   ========================= */

// //   const playablePhases = useMemo(
// //     () => PHASES.slice(0, targetIndex + 1).map((_, index) => index),
// //     [targetIndex]
// //   );

// //   const total = PLAY_ALL ? PHASES.length : playablePhases.length;

// //   /* =========================
// //      IMAGE
// //   ========================= */

// //   const getImage = (phaseIndex) =>
// //     project.phaseGallery?.[phaseIndex] ||
// //     (project.gallery?.length
// //       ? project.gallery[phaseIndex % project.gallery.length]
// //       : project.src);

// //   /* =========================
// //      CURRENT GROUP
// //   ========================= */

// //   const activeGroup = getGroupIndex(activePhase);
// //   const activePoint = GROUP_POSITIONS_DESKTOP[activeGroup];

// //   /* الجروبات المكشوفة = كل جروب وصلنا له لحد الـ phase الحالية
// //      (بترجع تختفي لو عملتي scroll لفوق) */
// //   const revealedGroups = useMemo(() => {
// //     const set = new Set();
// //     for (let i = 0; i <= activePhase; i++) set.add(getGroupIndex(i));
// //     return set;
// //   }, [activePhase]);

// //   /* لو فيه سيكشن بعد ده بيستخدم GSAP ScrollTrigger (pin)، لازم يحسب أماكنه
// //      تاني بعد ما ارتفاع السيكشن ده يستقر، وإلا هيتداخل معاه */
// //   useEffect(() => {
// //     const refresh = () => ScrollTrigger.refresh();
// //     const t = setTimeout(refresh, 300);
// //     window.addEventListener("load", refresh);
// //     return () => {
// //       clearTimeout(t);
// //       window.removeEventListener("load", refresh);
// //     };
// //   }, []);

// //   /* =========================
// //      SCROLL SEQUENCER
// //      - لما أعلى السيكشن يلمس أعلى الشاشة الصفحة بتتثبت عليه.
// //      - كل scroll بيقدّم phase واحدة بالترتيب (ولفوق بيرجّع).
// //      - لما الـ phases تخلص الصفحة بتكمل عادي.
// //      مفيش "حالة قفل" متخزنة: القرار بيتاخد من مكان السيكشن الفعلي
// //      في كل حركة، فمستحيل الصفحة تعلق.
// //   ========================= */

// //   useEffect(() => {
// //     const section = sectionRef.current;
// //     if (!section) return;

// //     const last = total - 1;

// //     let busy = false;
// //     let timer;
// //     let prevY = window.scrollY;
// //     let touchY = null;

// //     const holdFor = (ms) => {
// //       busy = true;
// //       clearTimeout(timer);
// //       timer = setTimeout(() => {
// //         busy = false;
// //       }, ms);
// //     };

// //     const isAligned = () =>
// //       Math.abs(section.getBoundingClientRect().top - NAV_OFFSET) <= ALIGN_TOL;

// //     const snapExact = () => {
// //       const top = section.getBoundingClientRect().top - NAV_OFFSET;
// //       if (Math.abs(top) > 1) {
// //         window.scrollTo({
// //           top: window.scrollY + top,
// //           left: 0,
// //           behavior: "instant",
// //         });
// //       }
// //     };

// //     const setPhase = (n) => {
// //       phaseRef.current = n;
// //       setActivePhase(n);
// //     };

// //     /* هل الحركة دي تتستهلك جوه السيكشن؟ */
// //     const consumes = (dir) => {
// //       if (!isAligned()) return false;
// //       if (busy) return true;
// //       const next = phaseRef.current + dir;
// //       return next >= 0 && next <= last;
// //     };

// //     const advance = (dir) => {
// //       snapExact();
// //       setPhase(phaseRef.current + dir);
// //       holdFor(STEP_MS);
// //     };

// //     const onScroll = () => {
// //       const y = window.scrollY;
// //       const rect = section.getBoundingClientRect();
// //       const top = rect.top - NAV_OFFSET;
// //       const pageTop = y + top;
// //       const aligned = Math.abs(top) <= ALIGN_TOL;

// //       /* لو الصفحة اتنقلت بطريقة تانية (لينك، scrollbar، refresh)
// //          بنظبط الـ phase حسب مكان السيكشن */
// //       if (!aligned) {
// //         if (rect.bottom <= 0 && phaseRef.current !== last) {
// //           setPhase(last);
// //         } else if (
// //           rect.top >= window.innerHeight &&
// //           phaseRef.current !== 0
// //         ) {
// //           setPhase(0);
// //         }
// //       }

// //       const dir = y > prevY ? 1 : y < prevY ? -1 : 0;

// //       const crossed =
// //         (dir > 0 && prevY < pageTop - 1 && y >= pageTop - 1) ||
// //         (dir < 0 && prevY > pageTop + 1 && y <= pageTop + 1);

// //       const canEnter =
// //         (dir > 0 && phaseRef.current < last) ||
// //         (dir < 0 && phaseRef.current > 0);

// //       /* بوابة: مينفعش نعدّي أعلى السيكشن لتحت قبل ما الـ phases تخلص
// //          (حتى لو الـ scroll كان سريع أو فيه سيكشن تاني بيتداخل) */
// //       const passedTop = top < -ALIGN_TOL && rect.bottom > 0;

// //       if (dir > 0 && phaseRef.current < last && passedTop) {
// //         window.scrollTo({ top: pageTop, left: 0, behavior: "instant" });
// //         prevY = pageTop;
// //         holdFor(ENGAGE_MS);
// //         return;
// //       }

// //       /* دخلنا السيكشن من فوق أو من تحت → ثبّت الصفحة على أعلاه */
// //       if (crossed && canEnter && !aligned) {
// //         window.scrollTo({ top: pageTop, left: 0, behavior: "instant" });
// //         prevY = pageTop;
// //         holdFor(ENGAGE_MS);
// //         return;
// //       }

// //       prevY = y;
// //     };

// //     const onWheel = (e) => {
// //       if (e.ctrlKey) return;

// //       const dir = e.deltaY > 0 ? 1 : -1;
// //       if (!consumes(dir)) return;

// //       e.preventDefault();

// //       if (busy || Math.abs(e.deltaY) < MIN_WHEEL_DELTA) return;
// //       advance(dir);
// //     };

// //     const onTouchStart = (e) => {
// //       touchY = e.touches[0].clientY;
// //     };

// //     const onTouchMove = (e) => {
// //       if (touchY === null) return;

// //       const dy = touchY - e.touches[0].clientY;
// //       if (dy === 0) return;

// //       const dir = dy > 0 ? 1 : -1;
// //       if (!consumes(dir)) return;

// //       e.preventDefault();

// //       if (busy || Math.abs(dy) < 30) return;

// //       touchY = e.touches[0].clientY;
// //       advance(dir);
// //     };

// //     const onTouchEnd = () => {
// //       touchY = null;
// //     };

// //     const onKeyDown = (e) => {
// //       const tag = e.target?.tagName;
// //       if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

// //       let dir = 0;
// //       if (e.key === "ArrowDown" || e.key === "PageDown") dir = 1;
// //       else if (e.key === "ArrowUp" || e.key === "PageUp") dir = -1;
// //       else if (e.key === " ") dir = e.shiftKey ? -1 : 1;

// //       if (!dir || !consumes(dir)) return;

// //       e.preventDefault();

// //       if (busy) return;
// //       advance(dir);
// //     };

// //     window.addEventListener("scroll", onScroll, { passive: true });
// //     window.addEventListener("wheel", onWheel, { passive: false });
// //     window.addEventListener("touchstart", onTouchStart, { passive: true });
// //     window.addEventListener("touchmove", onTouchMove, { passive: false });
// //     window.addEventListener("touchend", onTouchEnd, { passive: true });
// //     window.addEventListener("keydown", onKeyDown);

// //     return () => {
// //       clearTimeout(timer);
// //       window.removeEventListener("scroll", onScroll);
// //       window.removeEventListener("wheel", onWheel);
// //       window.removeEventListener("touchstart", onTouchStart);
// //       window.removeEventListener("touchmove", onTouchMove);
// //       window.removeEventListener("touchend", onTouchEnd);
// //       window.removeEventListener("keydown", onKeyDown);
// //     };
// //   }, [total]);

// //   /* =========================
// //      STATUS
// //   ========================= */

// //   const getStatus = (index) => {
// //     if (index < targetIndex) return "Completed";
// //     if (index === targetIndex) return "In Progress";
// //     return "Pending";
// //   };

// //   return (
// //     <section
// //       ref={sectionRef}
// //       className="relative z-20 isolate flex min-h-[100svh] w-full shrink-0 items-center overflow-hidden bg-[#3C3C3B] px-4 sm:px-6"
// //     >
// //       <div className="w-full">
// //         <KineticGrid className="!h-auto w-full rounded-2xl">
// //           <div
// //             className="
// //               relative
// //               mx-auto
// //               max-w-7xl
// //               px-4
// //               py-4
// //               sm:px-8
// //               sm:py-6
// //             "
// //           >
// //             {/* =========================
// //                 HEADER
// //             ========================= */}

// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.7 }}
// //               className="mb-5 text-center sm:mb-6"
// //             >
// //               <span
// //                 className="
// //                   text-[10px]
// //                   font-semibold
// //                   uppercase
// //                   tracking-[0.28em]
// //                   text-white
// //                   sm:text-xs
// //                 "
// //               >
// //                 The Construction Journey
// //               </span>

// //               <h2
// //                 className="
// //                   mt-3
// //                   text-3xl
// //                   font-bold
// //                   leading-tight
// //                   text-white
// //                   sm:text-4xl
// //                   md:text-5xl
// //                 "
// //               >
// //                 From Ground To Completion
// //               </h2>

// //               <p
// //                 className="
// //                   mx-auto
// //                   mt-3
// //                   hidden
// //                   max-w-xl
// //                   sm:block
// //                   text-[11px]
// //                   leading-relaxed
// //                   text-white/35
// //                   sm:text-xs
// //                 "
// //               >
// //                 Every phase hands the project to the next. One continuous
// //                 construction sequence.
// //               </p>
// //             </motion.div>

// //             {/* ==================================================
// //                 DESKTOP CINEMATIC TREE
// //             ================================================== */}

// //             <div
// //               className="
// //                 relative
// //                 hidden
// //                 h-[430px]
// //                 overflow-hidden
// //                 md:block
// //                 lg:h-[470px]
// //               "
// //             >
// //               {/* SVG TREE (root → groups فقط) */}

// //               <svg
// //                 viewBox="0 0 100 100"
// //                 preserveAspectRatio="none"
// //                 className="
// //                   pointer-events-none
// //                   absolute
// //                   inset-0
// //                   h-full
// //                   w-full
// //                 "
// //               >
// //                 {GROUPS.map((group, index) => {
// //                   const point = GROUP_POSITIONS_DESKTOP[index];
// //                   const revealed = revealedGroups.has(index);

// //                   return (
// //                     <motion.path
// //                       key={`root-group-${index}`}
// //                       d={`
// //                         M ${ROOT_POSITION_DESKTOP.x}
// //                           ${ROOT_POSITION_DESKTOP.y}

// //                         Q
// //                           ${(ROOT_POSITION_DESKTOP.x + point.x) / 2}
// //                           ${point.y}

// //                           ${point.x}
// //                           ${point.y}
// //                       `}
// //                       fill="none"
// //                       stroke={revealed ? ACCENT : LINE_IDLE}
// //                       strokeWidth="0.35"
// //                       strokeLinecap="round"
// //                       initial={{ pathLength: 0, opacity: 0 }}
// //                       animate={{
// //                         pathLength: revealed ? 1 : 0,
// //                         opacity: revealed ? 1 : 0,
// //                       }}
// //                       transition={{ duration: 0.8, ease: "easeInOut" }}
// //                     />
// //                   );
// //                 })}

// //                 {/* الخط اللي بيوصل الـ + بالكارت */}
// //                 <AnimatePresence mode="wait">
// //                   <motion.path
// //                     key={`active-line-${activePhase}`}
// //                     d={`M ${activePoint.x} ${activePoint.y} L ${CARD_POSITION_DESKTOP.x} ${activePoint.y}`}
// //                     fill="none"
// //                     stroke={LINE_ACTIVE}
// //                     strokeWidth="0.4"
// //                     strokeLinecap="round"
// //                     initial={{ pathLength: 0, opacity: 0 }}
// //                     animate={{ pathLength: 1, opacity: 1 }}
// //                     exit={{ pathLength: 0, opacity: 0 }}
// //                     transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
// //                   />
// //                 </AnimatePresence>
// //               </svg>

// //               {/* ROOT NODE */}

// //               <motion.div
// //                 initial={{ opacity: 0, scale: 0.7 }}
// //                 animate={{ opacity: 1, scale: 1 }}
// //                 transition={{ duration: 0.7 }}
// //                 className="
// //                   absolute
// //                   z-30
// //                   flex
// //                   -translate-x-1/2
// //                   -translate-y-1/2
// //                   flex-col
// //                   items-center
// //                   gap-2
// //                 "
// //                 style={{
// //                   left: `${ROOT_POSITION_DESKTOP.x}%`,
// //                   top: `${ROOT_POSITION_DESKTOP.y}%`,
// //                 }}
// //               >
// //                 <div
// //                   className="
// //                     relative
// //                     h-24
// //                     w-24
// //                     overflow-hidden
// //                     rounded-full
// //                     border-2
// //                     border-white
// //                     bg-[#3C3C3B]
// //                     shadow-[0_0_45px_rgba(255,255,255,0.15)]
// //                     lg:h-28
// //                     lg:w-28
// //                   "
// //                 >
// //                   <img
// //                     src={project.src}
// //                     alt={project.title}
// //                     className="h-full w-full object-cover"
// //                   />

// //                   <div
// //                     className="
// //                       absolute
// //                       inset-0
// //                       bg-gradient-to-t
// //                       from-black/35
// //                       to-transparent
// //                     "
// //                   />
// //                 </div>

// //                 <span
// //                   className="
// //                     rounded-full
// //                     bg-[#2A317A]
// //                     px-3
// //                     py-1
// //                     text-[9px]
// //                     font-semibold
// //                     uppercase
// //                     tracking-[0.1em]
// //                     text-white
// //                   "
// //                 >
// //                   Project Start
// //                 </span>
// //               </motion.div>

// //               {/* GROUP NODES */}

// //               {GROUPS.map((group, index) => (
// //                 <DesktopGroupNode
// //                   key={group.title}
// //                   group={group}
// //                   index={index}
// //                   active={activeGroup === index}
// //                   revealed={revealedGroups.has(index)}
// //                 />
// //               ))}

// //               {/* MOVING PHASE CARD */}

// //               <AnimatePresence mode="wait">
// //                 <motion.div
// //                   key={activePhase}
// //                   initial={{
// //                     left: `${GROUP_POSITIONS_DESKTOP[activeGroup].x}%`,
// //                     top: `${GROUP_POSITIONS_DESKTOP[activeGroup].y}%`,
// //                     opacity: 0,
// //                     scale: 0.85,
// //                   }}
// //                   animate={{
// //                     left: `${CARD_POSITION_DESKTOP.x}%`,
// //                     top: `${GROUP_POSITIONS_DESKTOP[activeGroup].y}%`,
// //                     opacity: 1,
// //                     scale: 1,
// //                   }}
// //                   exit={{
// //                     left: "108%",
// //                     opacity: 0,
// //                     scale: 0.96,
// //                   }}
// //                   transition={{
// //                     left: { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
// //                     top: { duration: 0.5, ease: "easeInOut" },
// //                     opacity: { duration: 0.45 },
// //                     scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
// //                   }}
// //                   className="
// //                     absolute
// //                     z-40
// //                     -translate-x-1/2
// //                     -translate-y-1/2
// //                   "
// //                 >
// //                   <PhaseCard
// //                     phase={PHASES[activePhase]}
// //                     index={activePhase}
// //                     image={getImage(activePhase)}
// //                     progress={Math.round(
// //                       ((activePhase + 1) / PHASES.length) * 100
// //                     )}
// //                     status={getStatus(activePhase)}
// //                     groupIndex={activeGroup}
// //                   />
// //                 </motion.div>
// //               </AnimatePresence>
// //             </div>

// //             {/* ==================================================
// //                 MOBILE
// //             ================================================== */}

// //             <div className="relative md:hidden">
// //               <div className="relative h-[560px] overflow-hidden">
// //                 {/* MOBILE SVG TREE (root → groups فقط) */}

// //                 <svg
// //                   viewBox="0 0 100 100"
// //                   preserveAspectRatio="none"
// //                   className="
// //                     pointer-events-none
// //                     absolute
// //                     inset-0
// //                     h-full
// //                     w-full
// //                   "
// //                 >
// //                   {GROUPS.map((group, index) => {
// //                     const x = [18, 50, 82][index];
// //                     const y = 31;

// //                     return (
// //                       <motion.path
// //                         key={`mobile-root-${index}`}
// //                         d={`
// //                           M 50 11

// //                           Q
// //                             50 20
// //                             ${x} ${y}
// //                         `}
// //                         fill="none"
// //                         stroke={revealedGroups.has(index) ? ACCENT : LINE_IDLE}
// //                         strokeWidth="0.55"
// //                         strokeLinecap="round"
// //                         initial={{ pathLength: 0 }}
// //                         animate={{
// //                           pathLength: revealedGroups.has(index) ? 1 : 0,
// //                         }}
// //                         transition={{ duration: 0.65 }}
// //                       />
// //                     );
// //                   })}

// //                   {/* الخط اللي بيوصل الـ + بالكارت */}
// //                   <AnimatePresence mode="wait">
// //                     <motion.path
// //                       key={`mobile-line-${activePhase}`}
// //                       d={`M ${[18, 50, 82][activeGroup]} 31 C ${
// //                         [18, 50, 82][activeGroup]
// //                       } 46 50 50 50 61`}
// //                       fill="none"
// //                       stroke={LINE_ACTIVE}
// //                       strokeWidth="0.55"
// //                       strokeLinecap="round"
// //                       initial={{ pathLength: 0, opacity: 0 }}
// //                       animate={{ pathLength: 1, opacity: 1 }}
// //                       exit={{ pathLength: 0, opacity: 0 }}
// //                       transition={{ duration: 0.7, ease: "easeInOut" }}
// //                     />
// //                   </AnimatePresence>
// //                 </svg>

// //                 {/* ROOT */}

// //                 <div
// //                   className="
// //                     absolute
// //                     left-1/2
// //                     top-[11%]
// //                     z-20
// //                     -translate-x-1/2
// //                     -translate-y-1/2
// //                   "
// //                 >
// //                   <motion.div
// //                     initial={{ opacity: 0, scale: 0.7 }}
// //                     animate={{ opacity: 1, scale: 1 }}
// //                     className="flex flex-col items-center gap-2"
// //                   >
// //                     <div
// //                       className="
// //                         h-16
// //                         w-16
// //                         overflow-hidden
// //                         rounded-full
// //                         border-2
// //                         border-white
// //                         shadow-lg
// //                       "
// //                     >
// //                       <img
// //                         src={project.src}
// //                         alt={project.title}
// //                         className="h-full w-full object-cover"
// //                       />
// //                     </div>

// //                     <span
// //                       className="
// //                         rounded-full
// //                         bg-[#2A317A]
// //                         px-2.5
// //                         py-1
// //                         text-[8px]
// //                         font-semibold
// //                         uppercase
// //                         tracking-[0.08em]
// //                         text-white
// //                       "
// //                     >
// //                       Project Start
// //                     </span>
// //                   </motion.div>
// //                 </div>

// //                 {/* GROUP NODES */}

// //                 {GROUPS.map((group, index) => {
// //                   const active = activeGroup === index;
// //                   const revealed = revealedGroups.has(index);

// //                   return (
// //                     <motion.div
// //                       key={group.title}
// //                       initial={{ opacity: 0, scale: 0.7 }}
// //                       animate={{
// //                         opacity: revealed ? 1 : 0,
// //                         scale: revealed ? 1 : 0.7,
// //                       }}
// //                       className="
// //                         absolute
// //                         top-[31%]
// //                         z-20
// //                         -translate-x-1/2
// //                       "
// //                       style={{ left: `${[18, 50, 82][index]}%` }}
// //                     >
// //                       <motion.div
// //                         animate={{
// //                           borderColor: active
// //                             ? ACCENT
// //                             : "rgba(255,255,255,0.35)",
// //                           scale: active ? 1.08 : 1,
// //                         }}
// //                         className="
// //                           mx-auto
// //                           flex
// //                           h-10
// //                           w-10
// //                           items-center
// //                           justify-center
// //                           rounded-full
// //                           border
// //                           bg-[#3C3C3B]
// //                           text-white
// //                         "
// //                       >
// //                         <Plus className="h-3.5 w-3.5" />
// //                       </motion.div>

// //                       <span
// //                         className={`
// //                           mt-2
// //                           block
// //                           max-w-[90px]
// //                           text-center
// //                           text-[7px]
// //                           font-semibold
// //                           uppercase
// //                           leading-tight
// //                           ${active ? "text-white" : "text-white/40"}
// //                         `}
// //                       >
// //                         {group.title}
// //                       </span>
// //                     </motion.div>
// //                   );
// //                 })}

// //                 {/* MOBILE PHASE */}

// //                 <div
// //                   className="
// //                     absolute
// //                     left-1/2
// //                     top-[71%]
// //                     z-40
// //                     w-full
// //                     -translate-x-1/2
// //                     -translate-y-1/2
// //                     px-2
// //                   "
// //                 >
// //                   <AnimatePresence mode="wait">
// //                     <motion.div
// //                       key={activePhase}
// //                       initial={{
// //                         opacity: 0,
// //                         x: activeGroup === 0 ? -70 : activeGroup === 2 ? 70 : 0,
// //                         scale: 0.92,
// //                       }}
// //                       animate={{ opacity: 1, x: 0, scale: 1 }}
// //                       exit={{ opacity: 0, x: 90, scale: 0.94 }}
// //                       transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
// //                       className="flex justify-center"
// //                     >
// //                       <PhaseCard
// //                         phase={PHASES[activePhase]}
// //                         index={activePhase}
// //                         image={getImage(activePhase)}
// //                         progress={Math.round(
// //                           ((activePhase + 1) / PHASES.length) * 100
// //                         )}
// //                         status={getStatus(activePhase)}
// //                         groupIndex={activeGroup}
// //                       />
// //                     </motion.div>
// //                   </AnimatePresence>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </KineticGrid>
// //       </div>
// //     </section>
// //   );
// // }





// import { useEffect, useMemo, useRef, useState } from "react";
// import { AnimatePresence, motion } from "motion/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import {
//   ClipboardList,
//   HardHat,
//   Layers,
//   Building2,
//   Cable,
//   Paintbrush,
//   Sparkles,
//   CheckCircle2,
//   Plus,
//   ArrowRight,
// } from "lucide-react";
// import KineticGrid from "../KineticGrid/KineticGrid";

// const PHASES = [
//   { title: "Project Start", tag: "START", icon: ClipboardList },
//   { title: "Site Preparation", tag: "PREP", icon: HardHat },
//   { title: "Foundation", tag: "FOUND", icon: Layers },
//   { title: "Structural Work", tag: "STRUCT", icon: Building2 },
//   { title: "MEP Installation", tag: "MEP", icon: Cable },
//   { title: "Interior & Exterior", tag: "FINISH", icon: Paintbrush },
//   { title: "Final Finishing", tag: "DETAIL", icon: Sparkles },
//   { title: "Project Completed", tag: "DONE", icon: CheckCircle2 },
// ];

// const GROUPS = [
//   { title: "Pre-Construction", phases: [0, 1] },
//   { title: "Core Construction", phases: [2, 3, 4] },
//   { title: "Finishing & Delivery", phases: [5, 6, 7] },
// ];

// /* true = يعرض كل الـ phases من الأول للآخر، false = يقف عند currentPhase بتاع المشروع */
// const PLAY_ALL = true;

// /* الوقت اللي كل phase بتاخده قبل ما الـ scroll اللي بعده يتحسب (ms) */
// const STEP_MS = 1500;

// /* أقل حركة wheel تتحسب (عشان الـ trackpad inertia) */
// const MIN_WHEEL_DELTA = 15;

// /* بعد ما الصفحة تتثبت على السيكشن، بنتجاهل الـ inertia للمدة دي (ms) */
// const ENGAGE_MS = 700;

// /* هامش الخطأ (px) لاعتبار السيكشن في الفوكس */
// const ALIGN_TOL = 14;

// /* لو عندك navbar fixed، حطي ارتفاعه هنا */
// const NAV_OFFSET = 0;

// const ACCENT = "#FFFFFF";
// const BG = "#3C3C3B";

// const LINE_IDLE = "rgba(255,255,255,0.12)";
// const LINE_ACTIVE = "rgba(255,255,255,0.6)";

// const GROUP_POSITIONS_DESKTOP = [
//   { x: 30, y: 22 },
//   { x: 48, y: 50 },
//   { x: 66, y: 78 },
// ];

// const ROOT_POSITION_DESKTOP = { x: 7, y: 50 };

// const CARD_POSITION_DESKTOP = { x: 78 };

// function getGroupIndex(phaseIndex) {
//   return GROUPS.findIndex((group) => group.phases.includes(phaseIndex));
// }

// function PhaseCard({ phase, index, image, progress, status, groupIndex }) {
//   const Icon = phase.icon;

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.92 }}
//       transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
//       className="
//         w-[280px]
//         sm:w-[310px]
//         lg:w-[340px]
//         overflow-hidden
//         rounded-2xl
//         border border-white/10
//         bg-[#3C3C3B]
//         shadow-[0_25px_80px_rgba(0,0,0,0.35)]
//       "
//     >
//       {/* IMAGE */}
//       <div className="relative h-40 sm:h-44 lg:h-48 w-full overflow-hidden">
//         <motion.img
//           src={image}
//           alt={phase.title}
//           initial={{ scale: 1.1 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 1.4, ease: "easeOut" }}
//           className="h-full w-full object-cover"
//         />

//         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

//         <div className="absolute left-3 top-3">
//           <span
//             className="
//               rounded-full
//               bg-black/60
//               px-2.5
//               py-1
//               text-[9px]
//               font-semibold
//               tracking-[0.12em]
//               text-white
//               backdrop-blur-md
//             "
//           >
//             PHASE {String(index + 1).padStart(2, "0")}
//           </span>
//         </div>

//         <div
//           className="
//             absolute
//             right-3
//             top-3
//             flex
//             h-8
//             w-8
//             items-center
//             justify-center
//             rounded-full
//             bg-white
//             shadow-lg
//           "
//         >
//           <Icon className="h-4 w-4 text-black" />
//         </div>

//         <div className="absolute bottom-3 left-4 right-4">
//           <div className="mb-1 text-[9px] uppercase tracking-[0.25em] text-white/45">
//             Construction Sequence
//           </div>

//           <h3
//             className="
//               text-base
//               sm:text-lg
//               lg:text-xl
//               font-bold
//               leading-tight
//               text-white
//             "
//           >
//             {phase.title}
//           </h3>
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="p-4 sm:p-5">
//         <div className="mb-3 flex items-center justify-between">
//           <div>
//             <p className="text-[9px] uppercase tracking-[0.18em] text-white/35">
//               Current Stage
//             </p>

//             <p className="mt-1 text-xs font-semibold text-white/85">
//               {GROUPS[groupIndex].title}
//             </p>
//           </div>

//           <div className="flex items-center gap-2">
//             <span
//               className={`
//                 rounded-full
//                 px-2.5
//                 py-1
//                 text-[9px]
//                 font-semibold
//                 ${
//                   status === "Completed"
//                     ? "bg-white/15 text-white"
//                     : status === "In Progress"
//                     ? "bg-[#2A317A]/50 text-white"
//                     : "bg-white/5 text-white/25"
//                 }
//               `}
//             >
//               {status}
//             </span>
//           </div>
//         </div>

//         <div className="mb-2 flex items-center justify-between">
//           <span className="text-[9px] uppercase tracking-[0.12em] text-white/35">
//             Progress
//           </span>

//           <span className="text-[10px] font-semibold text-white">
//             {progress}%
//           </span>
//         </div>

//         <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/5">
//           <motion.div
//             initial={{ width: 0 }}
//             animate={{ width: `${progress}%` }}
//             transition={{ duration: 1.2, ease: "easeOut" }}
//             className="h-full rounded-full bg-white"
//           />
//         </div>

//         <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
//           <span className="text-[9px] tracking-[0.16em] text-white/25">
//             HANDOFF {String(index + 1).padStart(2, "0")}
//           </span>

//           <ArrowRight className="h-3.5 w-3.5 text-white" />
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// function DesktopGroupNode({ group, index, active, revealed }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.7 }}
//       animate={{
//         opacity: revealed ? 1 : 0,
//         scale: revealed ? 1 : 0.7,
//       }}
//       transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
//       className="
//         absolute
//         z-20
//         flex
//         -translate-x-1/2
//         -translate-y-1/2
//         flex-col
//         items-center
//         gap-2
//       "
//       style={{
//         left: `${GROUP_POSITIONS_DESKTOP[index].x}%`,
//         top: `${GROUP_POSITIONS_DESKTOP[index].y}%`,
//       }}
//     >
//       <AnimatePresence>
//         {active && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.6 }}
//             animate={{
//               opacity: [0.15, 0.4, 0.15],
//               scale: [0.9, 1.25, 0.9],
//             }}
//             exit={{ opacity: 0 }}
//             transition={{
//               duration: 1.8,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//             className="
//               absolute
//               h-16
//               w-16
//               rounded-full
//               border
//               border-white/30
//             "
//           />
//         )}
//       </AnimatePresence>

//       <motion.div
//         animate={{
//           borderColor: active ? ACCENT : "rgba(255,255,255,0.35)",
//           backgroundColor: active ? "#474746" : BG,
//           scale: active ? 1.08 : 1,
//         }}
//         transition={{ duration: 0.4 }}
//         className="
//           flex
//           h-12
//           w-12
//           items-center
//           justify-center
//           rounded-full
//           border
//           text-white
//         "
//       >
//         <Plus className="h-4 w-4" />
//       </motion.div>

//       <span
//         className={`
//           rounded-full
//           border
//           px-3
//           py-1
//           text-[9px]
//           font-semibold
//           uppercase
//           tracking-[0.08em]
//           whitespace-nowrap
//           backdrop-blur-md
//           ${
//             active
//               ? "border-white/30 bg-white/10 text-white"
//               : "border-white/5 bg-white/5 text-white/45"
//           }
//         `}
//       >
//         {group.title}
//       </span>
//     </motion.div>
//   );
// }

// export default function ProjectHierarchy({ project }) {
//   const sectionRef = useRef(null);
//   const phaseRef = useRef(0);
//   const [activePhase, setActivePhase] = useState(0);

//   /* =========================
//      TARGET PHASE
//   ========================= */

//   const targetIndex = useMemo(() => {
//     if (typeof project.currentPhase === "number") {
//       return project.currentPhase;
//     }

//     if (project.status?.toLowerCase() === "finished") {
//       return PHASES.length - 1;
//     }

//     return Math.floor(PHASES.length / 2);
//   }, [project]);

//   /* =========================
//      VALID PHASES
//   ========================= */

//   const playablePhases = useMemo(
//     () => PHASES.slice(0, targetIndex + 1).map((_, index) => index),
//     [targetIndex]
//   );

//   const total = PLAY_ALL ? PHASES.length : playablePhases.length;

//   /* =========================
//      IMAGE
//   ========================= */

//   const getImage = (phaseIndex) =>
//     project.phaseGallery?.[phaseIndex] ||
//     (project.gallery?.length
//       ? project.gallery[phaseIndex % project.gallery.length]
//       : project.src);

//   /* =========================
//      CURRENT GROUP
//   ========================= */

//   const activeGroup = getGroupIndex(activePhase);
//   const activePoint = GROUP_POSITIONS_DESKTOP[activeGroup];

//   const revealedGroups = useMemo(() => {
//     const set = new Set();
//     for (let i = 0; i <= activePhase; i++) set.add(getGroupIndex(i));
//     return set;
//   }, [activePhase]);

//   /* Refresh ScrollTrigger بعد ما ارتفاع السيكشن يستقر */
//   useEffect(() => {
//     const refresh = () => ScrollTrigger.refresh();
//     const t = setTimeout(refresh, 300);
//     window.addEventListener("load", refresh);
//     return () => {
//       clearTimeout(t);
//       window.removeEventListener("load", refresh);
//     };
//   }, []);

//   /* =========================
//      SCROLL SEQUENCER
//      - طول ما السيكشن في الفوكس والـ phases مش خلصت: كل scroll = phase واحدة
//      - بعد آخر phase: السكرول يعدي للـ Gallery
//      - الرجوع من الـ Gallery: يبدأ من آخر phase
//      - مفيش window.scrollTo قسري عشان ما يخربش pin بتاع FlowScroll
//   ========================= */

//   useEffect(() => {
//     const section = sectionRef.current;
//     if (!section) return;

//     const last = total - 1;

//     let busy = false;
//     let timer = null;
//     let touchY = null;
//     let prevY = window.scrollY;
//     let wasBelow = false;

//     const holdFor = (ms) => {
//       busy = true;
//       clearTimeout(timer);
//       timer = setTimeout(() => {
//         busy = false;
//       }, ms);
//     };

//     const getRect = () => section.getBoundingClientRect();

//     /** السيكشن ظاهر ومشغول معظم الشاشة (متوافق مع pin بتاع FlowScroll) */
//     const isInFocus = () => {
//       const r = getRect();
//       return (
//         Math.abs(r.top - NAV_OFFSET) <= ALIGN_TOL ||
//         (r.top <= NAV_OFFSET + 40 && r.bottom >= window.innerHeight * 0.55)
//       );
//     };

//     const setPhase = (n) => {
//       const clamped = Math.max(0, Math.min(last, n));
//       phaseRef.current = clamped;
//       setActivePhase(clamped);
//     };

//     const shouldConsume = (dir) => {
//       if (!isInFocus()) return false;
//       if (busy) return true;
//       const next = phaseRef.current + dir;
//       return next >= 0 && next <= last;
//     };

//     const advance = (dir) => {
//       setPhase(phaseRef.current + dir);
//       holdFor(STEP_MS);
//     };

//     /* ---------- wheel ---------- */
//     const onWheel = (e) => {
//       if (e.ctrlKey) return;

//       const dir = e.deltaY > 0 ? 1 : -1;

//       if (!isInFocus()) return;

//       // آخر phase + سكرول لتحت → سيبي الصفحة تنزل للـ Gallery
//       if (dir > 0 && phaseRef.current >= last) return;

//       // أول phase + سكرول لفوق → سيبي الصفحة تطلع
//       if (dir < 0 && phaseRef.current <= 0) return;

//       e.preventDefault();
//       e.stopPropagation();

//       if (busy || Math.abs(e.deltaY) < MIN_WHEEL_DELTA) return;
//       advance(dir);
//     };

//     /* ---------- touch ---------- */
//     const onTouchStart = (e) => {
//       touchY = e.touches[0].clientY;
//     };

//     const onTouchMove = (e) => {
//       if (touchY === null) return;

//       const dy = touchY - e.touches[0].clientY;
//       if (dy === 0) return;

//       const dir = dy > 0 ? 1 : -1;

//       if (!shouldConsume(dir)) return;

//       e.preventDefault();
//       e.stopPropagation();

//       if (busy || Math.abs(dy) < 30) return;

//       touchY = e.touches[0].clientY;
//       advance(dir);
//     };

//     const onTouchEnd = () => {
//       touchY = null;
//     };

//     /* ---------- keys ---------- */
//     const onKeyDown = (e) => {
//       const tag = e.target?.tagName;
//       if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

//       let dir = 0;
//       if (e.key === "ArrowDown" || e.key === "PageDown") dir = 1;
//       else if (e.key === "ArrowUp" || e.key === "PageUp") dir = -1;
//       else if (e.key === " ") dir = e.shiftKey ? -1 : 1;

//       if (!dir || !shouldConsume(dir)) return;

//       e.preventDefault();
//       if (busy) return;
//       advance(dir);
//     };

//     /* ---------- scroll: مزامنة phase + الرجوع من الـ Gallery ---------- */
//     const onScroll = () => {
//       const y = window.scrollY;
//       const r = getRect();
//       const goingUp = y < prevY;

//       // السيكشن فوق الشاشة خالص → آخر phase
//       if (r.bottom <= 0 && phaseRef.current !== last) {
//         setPhase(last);
//       }
//       // السيكشن تحت الشاشة خالص → أول phase
//       else if (r.top >= window.innerHeight && phaseRef.current !== 0) {
//         setPhase(0);
//       }

//       // داخلين من تحت (من Gallery لفوق) → ابدأ من آخر phase
//       if (
//         goingUp &&
//         wasBelow &&
//         r.top < window.innerHeight &&
//         r.bottom > window.innerHeight * 0.25
//       ) {
//         if (phaseRef.current !== last) {
//           setPhase(last);
//           holdFor(ENGAGE_MS);
//         }
//       }

//       wasBelow = r.top >= window.innerHeight * 0.85;
//       prevY = y;
//     };

//     window.addEventListener("wheel", onWheel, { passive: false, capture: true });
//     window.addEventListener("touchstart", onTouchStart, {
//       passive: true,
//       capture: true,
//     });
//     window.addEventListener("touchmove", onTouchMove, {
//       passive: false,
//       capture: true,
//     });
//     window.addEventListener("touchend", onTouchEnd, { passive: true });
//     window.addEventListener("keydown", onKeyDown);
//     window.addEventListener("scroll", onScroll, { passive: true });

//     return () => {
//       clearTimeout(timer);
//       window.removeEventListener("wheel", onWheel, { capture: true });
//       window.removeEventListener("touchstart", onTouchStart, { capture: true });
//       window.removeEventListener("touchmove", onTouchMove, { capture: true });
//       window.removeEventListener("touchend", onTouchEnd);
//       window.removeEventListener("keydown", onKeyDown);
//       window.removeEventListener("scroll", onScroll);
//     };
//   }, [total]);

//   /* =========================
//      STATUS
//   ========================= */

//   const getStatus = (index) => {
//     if (index < targetIndex) return "Completed";
//     if (index === targetIndex) return "In Progress";
//     return "Pending";
//   };

//   return (
//     <section
//       ref={sectionRef}
//       className="relative z-20 isolate flex min-h-[100svh] w-full shrink-0 items-center overflow-hidden bg-[#3C3C3B] px-4 sm:px-6"
//     >
//       <div className="w-full">
//         <KineticGrid className="!h-auto w-full rounded-2xl">
//           <div
//             className="
//               relative
//               mx-auto
//               max-w-7xl
//               px-4
//               py-4
//               sm:px-8
//               sm:py-6
//             "
//           >
//             {/* =========================
//                 HEADER
//             ========================= */}

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.7 }}
//               className="mb-5 text-center sm:mb-6"
//             >
//               <span
//                 className="
//                   text-[10px]
//                   font-semibold
//                   uppercase
//                   tracking-[0.28em]
//                   text-white
//                   sm:text-xs
//                 "
//               >
//                 The Construction Journey
//               </span>

//               <h2
//                 className="
//                   mt-3
//                   text-3xl
//                   font-bold
//                   leading-tight
//                   text-white
//                   sm:text-4xl
//                   md:text-5xl
//                 "
//               >
//                 From Ground To Completion
//               </h2>

//               <p
//                 className="
//                   mx-auto
//                   mt-3
//                   hidden
//                   max-w-xl
//                   sm:block
//                   text-[11px]
//                   leading-relaxed
//                   text-white/35
//                   sm:text-xs
//                 "
//               >
//                 Every phase hands the project to the next. One continuous
//                 construction sequence.
//               </p>
//             </motion.div>

//             {/* ==================================================
//                 DESKTOP CINEMATIC TREE
//             ================================================== */}

//             <div
//               className="
//                 relative
//                 hidden
//                 h-[430px]
//                 overflow-hidden
//                 md:block
//                 lg:h-[470px]
//               "
//             >
//               <svg
//                 viewBox="0 0 100 100"
//                 preserveAspectRatio="none"
//                 className="
//                   pointer-events-none
//                   absolute
//                   inset-0
//                   h-full
//                   w-full
//                 "
//               >
//                 {GROUPS.map((group, index) => {
//                   const point = GROUP_POSITIONS_DESKTOP[index];
//                   const revealed = revealedGroups.has(index);

//                   return (
//                     <motion.path
//                       key={`root-group-${index}`}
//                       d={`
//                         M ${ROOT_POSITION_DESKTOP.x}
//                           ${ROOT_POSITION_DESKTOP.y}

//                         Q
//                           ${(ROOT_POSITION_DESKTOP.x + point.x) / 2}
//                           ${point.y}

//                           ${point.x}
//                           ${point.y}
//                       `}
//                       fill="none"
//                       stroke={revealed ? ACCENT : LINE_IDLE}
//                       strokeWidth="0.35"
//                       strokeLinecap="round"
//                       initial={{ pathLength: 0, opacity: 0 }}
//                       animate={{
//                         pathLength: revealed ? 1 : 0,
//                         opacity: revealed ? 1 : 0,
//                       }}
//                       transition={{ duration: 0.8, ease: "easeInOut" }}
//                     />
//                   );
//                 })}

//                 <AnimatePresence mode="wait">
//                   <motion.path
//                     key={`active-line-${activePhase}`}
//                     d={`M ${activePoint.x} ${activePoint.y} L ${CARD_POSITION_DESKTOP.x} ${activePoint.y}`}
//                     fill="none"
//                     stroke={LINE_ACTIVE}
//                     strokeWidth="0.4"
//                     strokeLinecap="round"
//                     initial={{ pathLength: 0, opacity: 0 }}
//                     animate={{ pathLength: 1, opacity: 1 }}
//                     exit={{ pathLength: 0, opacity: 0 }}
//                     transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
//                   />
//                 </AnimatePresence>
//               </svg>

//               {/* ROOT NODE */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.7 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.7 }}
//                 className="
//                   absolute
//                   z-30
//                   flex
//                   -translate-x-1/2
//                   -translate-y-1/2
//                   flex-col
//                   items-center
//                   gap-2
//                 "
//                 style={{
//                   left: `${ROOT_POSITION_DESKTOP.x}%`,
//                   top: `${ROOT_POSITION_DESKTOP.y}%`,
//                 }}
//               >
//                 <div
//                   className="
//                     relative
//                     h-24
//                     w-24
//                     overflow-hidden
//                     rounded-full
//                     border-2
//                     border-white
//                     bg-[#3C3C3B]
//                     shadow-[0_0_45px_rgba(255,255,255,0.15)]
//                     lg:h-28
//                     lg:w-28
//                   "
//                 >
//                   <img
//                     src={project.src}
//                     alt={project.title}
//                     className="h-full w-full object-cover"
//                   />

//                   <div
//                     className="
//                       absolute
//                       inset-0
//                       bg-gradient-to-t
//                       from-black/35
//                       to-transparent
//                     "
//                   />
//                 </div>

//                 <span
//                   className="
//                     rounded-full
//                     bg-[#2A317A]
//                     px-3
//                     py-1
//                     text-[9px]
//                     font-semibold
//                     uppercase
//                     tracking-[0.1em]
//                     text-white
//                   "
//                 >
//                   Project Start
//                 </span>
//               </motion.div>

//               {/* GROUP NODES */}
//               {GROUPS.map((group, index) => (
//                 <DesktopGroupNode
//                   key={group.title}
//                   group={group}
//                   index={index}
//                   active={activeGroup === index}
//                   revealed={revealedGroups.has(index)}
//                 />
//               ))}

//               {/* MOVING PHASE CARD */}
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activePhase}
//                   initial={{
//                     left: `${GROUP_POSITIONS_DESKTOP[activeGroup].x}%`,
//                     top: `${GROUP_POSITIONS_DESKTOP[activeGroup].y}%`,
//                     opacity: 0,
//                     scale: 0.85,
//                   }}
//                   animate={{
//                     left: `${CARD_POSITION_DESKTOP.x}%`,
//                     top: `${GROUP_POSITIONS_DESKTOP[activeGroup].y}%`,
//                     opacity: 1,
//                     scale: 1,
//                   }}
//                   exit={{
//                     left: "108%",
//                     opacity: 0,
//                     scale: 0.96,
//                   }}
//                   transition={{
//                     left: { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
//                     top: { duration: 0.5, ease: "easeInOut" },
//                     opacity: { duration: 0.45 },
//                     scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
//                   }}
//                   className="
//                     absolute
//                     z-40
//                     -translate-x-1/2
//                     -translate-y-1/2
//                   "
//                 >
//                   <PhaseCard
//                     phase={PHASES[activePhase]}
//                     index={activePhase}
//                     image={getImage(activePhase)}
//                     progress={Math.round(
//                       ((activePhase + 1) / PHASES.length) * 100
//                     )}
//                     status={getStatus(activePhase)}
//                     groupIndex={activeGroup}
//                   />
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             {/* ==================================================
//                 MOBILE
//             ================================================== */}

//             <div className="relative md:hidden">
//               <div className="relative h-[560px] overflow-hidden">
//                 <svg
//                   viewBox="0 0 100 100"
//                   preserveAspectRatio="none"
//                   className="
//                     pointer-events-none
//                     absolute
//                     inset-0
//                     h-full
//                     w-full
//                   "
//                 >
//                   {GROUPS.map((group, index) => {
//                     const x = [18, 50, 82][index];
//                     const y = 31;

//                     return (
//                       <motion.path
//                         key={`mobile-root-${index}`}
//                         d={`
//                           M 50 11

//                           Q
//                             50 20
//                             ${x} ${y}
//                         `}
//                         fill="none"
//                         stroke={revealedGroups.has(index) ? ACCENT : LINE_IDLE}
//                         strokeWidth="0.55"
//                         strokeLinecap="round"
//                         initial={{ pathLength: 0 }}
//                         animate={{
//                           pathLength: revealedGroups.has(index) ? 1 : 0,
//                         }}
//                         transition={{ duration: 0.65 }}
//                       />
//                     );
//                   })}

//                   <AnimatePresence mode="wait">
//                     <motion.path
//                       key={`mobile-line-${activePhase}`}
//                       d={`M ${[18, 50, 82][activeGroup]} 31 C ${
//                         [18, 50, 82][activeGroup]
//                       } 46 50 50 50 61`}
//                       fill="none"
//                       stroke={LINE_ACTIVE}
//                       strokeWidth="0.55"
//                       strokeLinecap="round"
//                       initial={{ pathLength: 0, opacity: 0 }}
//                       animate={{ pathLength: 1, opacity: 1 }}
//                       exit={{ pathLength: 0, opacity: 0 }}
//                       transition={{ duration: 0.7, ease: "easeInOut" }}
//                     />
//                   </AnimatePresence>
//                 </svg>

//                 {/* ROOT */}
//                 <div
//                   className="
//                     absolute
//                     left-1/2
//                     top-[11%]
//                     z-20
//                     -translate-x-1/2
//                     -translate-y-1/2
//                   "
//                 >
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.7 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="flex flex-col items-center gap-2"
//                   >
//                     <div
//                       className="
//                         h-16
//                         w-16
//                         overflow-hidden
//                         rounded-full
//                         border-2
//                         border-white
//                         shadow-lg
//                       "
//                     >
//                       <img
//                         src={project.src}
//                         alt={project.title}
//                         className="h-full w-full object-cover"
//                       />
//                     </div>

//                     <span
//                       className="
//                         rounded-full
//                         bg-[#2A317A]
//                         px-2.5
//                         py-1
//                         text-[8px]
//                         font-semibold
//                         uppercase
//                         tracking-[0.08em]
//                         text-white
//                       "
//                     >
//                       Project Start
//                     </span>
//                   </motion.div>
//                 </div>

//                 {/* GROUP NODES */}
//                 {GROUPS.map((group, index) => {
//                   const active = activeGroup === index;
//                   const revealed = revealedGroups.has(index);

//                   return (
//                     <motion.div
//                       key={group.title}
//                       initial={{ opacity: 0, scale: 0.7 }}
//                       animate={{
//                         opacity: revealed ? 1 : 0,
//                         scale: revealed ? 1 : 0.7,
//                       }}
//                       className="
//                         absolute
//                         top-[31%]
//                         z-20
//                         -translate-x-1/2
//                       "
//                       style={{ left: `${[18, 50, 82][index]}%` }}
//                     >
//                       <motion.div
//                         animate={{
//                           borderColor: active
//                             ? ACCENT
//                             : "rgba(255,255,255,0.35)",
//                           scale: active ? 1.08 : 1,
//                         }}
//                         className="
//                           mx-auto
//                           flex
//                           h-10
//                           w-10
//                           items-center
//                           justify-center
//                           rounded-full
//                           border
//                           bg-[#3C3C3B]
//                           text-white
//                         "
//                       >
//                         <Plus className="h-3.5 w-3.5" />
//                       </motion.div>

//                       <span
//                         className={`
//                           mt-2
//                           block
//                           max-w-[90px]
//                           text-center
//                           text-[7px]
//                           font-semibold
//                           uppercase
//                           leading-tight
//                           ${active ? "text-white" : "text-white/40"}
//                         `}
//                       >
//                         {group.title}
//                       </span>
//                     </motion.div>
//                   );
//                 })}

//                 {/* MOBILE PHASE */}
//                 <div
//                   className="
//                     absolute
//                     left-1/2
//                     top-[71%]
//                     z-40
//                     w-full
//                     -translate-x-1/2
//                     -translate-y-1/2
//                     px-2
//                   "
//                 >
//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       key={activePhase}
//                       initial={{
//                         opacity: 0,
//                         x: activeGroup === 0 ? -70 : activeGroup === 2 ? 70 : 0,
//                         scale: 0.92,
//                       }}
//                       animate={{ opacity: 1, x: 0, scale: 1 }}
//                       exit={{ opacity: 0, x: 90, scale: 0.94 }}
//                       transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//                       className="flex justify-center"
//                     >
//                       <PhaseCard
//                         phase={PHASES[activePhase]}
//                         index={activePhase}
//                         image={getImage(activePhase)}
//                         progress={Math.round(
//                           ((activePhase + 1) / PHASES.length) * 100
//                         )}
//                         status={getStatus(activePhase)}
//                         groupIndex={activeGroup}
//                       />
//                     </motion.div>
//                   </AnimatePresence>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </KineticGrid>
//       </div>
//     </section>
//   );
// }

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ClipboardList,
  HardHat,
  Layers,
  Building2,
  Cable,
  Paintbrush,
  Sparkles,
  CheckCircle2,
  Plus,
  ArrowRight,
} from "lucide-react";
import KineticGrid from "../KineticGrid/KineticGrid";

const PHASES = [
  { title: "Project Start", tag: "START", icon: ClipboardList },
  { title: "Site Preparation", tag: "PREP", icon: HardHat },
  { title: "Foundation", tag: "FOUND", icon: Layers },
  { title: "Structural Work", tag: "STRUCT", icon: Building2 },
  { title: "MEP Installation", tag: "MEP", icon: Cable },
  { title: "Interior & Exterior", tag: "FINISH", icon: Paintbrush },
  { title: "Final Finishing", tag: "DETAIL", icon: Sparkles },
  { title: "Project Completed", tag: "DONE", icon: CheckCircle2 },
];

const GROUPS = [
  { title: "Pre-Construction", phases: [0, 1] },
  { title: "Core Construction", phases: [2, 3, 4] },
  { title: "Finishing & Delivery", phases: [5, 6, 7] },
];

/* true = يعرض كل الـ phases من الأول للآخر، false = يقف عند currentPhase بتاع المشروع */
const PLAY_ALL = true;

/* الوقت اللي كل phase بتاخده قبل ما الـ scroll اللي بعده يتحسب (ms) */
const STEP_MS = 1500;

/* أقل حركة wheel تتحسب (عشان الـ trackpad inertia) */
const MIN_WHEEL_DELTA = 15;

/* أول ما الـ grid يظهر كله، بنمتص الـ scroll (inertia) للمدة دي قبل أول phase (ms) */
const ENGAGE_MS = 700;

const ACCENT = "#FFFFFF";
const BG = "#3C3C3B";

const LINE_IDLE = "rgba(255,255,255,0.12)";
const LINE_ACTIVE = "rgba(255,255,255,0.6)";

const GROUP_POSITIONS_DESKTOP = [
  { x: 30, y: 22 },
  { x: 48, y: 50 },
  { x: 66, y: 78 },
];

const ROOT_POSITION_DESKTOP = { x: 7, y: 50 };

const CARD_POSITION_DESKTOP = { x: 78 };

function getGroupIndex(phaseIndex) {
  return GROUPS.findIndex((group) => group.phases.includes(phaseIndex));
}

function PhaseCard({ phase, index, image, progress, status, groupIndex }) {
  const Icon = phase.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="
        w-[280px]
        sm:w-[310px]
        lg:w-[340px]
        overflow-hidden
        rounded-2xl
        border border-white/10
        bg-[#3C3C3B]
        shadow-[0_25px_80px_rgba(0,0,0,0.35)]
      "
    >
      {/* IMAGE */}

      <div className="relative h-40 sm:h-44 lg:h-48 w-full overflow-hidden">
        <motion.img
          src={image}
          alt={phase.title}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="h-full w-full object-cover"
        />

        {/* dark cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

        {/* phase number */}

        <div className="absolute left-3 top-3">
          <span
            className="
              rounded-full
              bg-black/60
              px-2.5
              py-1
              text-[9px]
              font-semibold
              tracking-[0.12em]
              text-white
              backdrop-blur-md
            "
          >
            PHASE {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* icon */}

        <div
          className="
            absolute
            right-3
            top-3
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            bg-white
            shadow-lg
          "
        >
          <Icon className="h-4 w-4 text-black" />
        </div>

        {/* cinematic phase label */}

        <div className="absolute bottom-3 left-4 right-4">
          <div className="mb-1 text-[9px] uppercase tracking-[0.25em] text-white/45">
            Construction Sequence
          </div>

          <h3
            className="
              text-base
              sm:text-lg
              lg:text-xl
              font-bold
              leading-tight
              text-white
            "
          >
            {phase.title}
          </h3>
        </div>
      </div>

      {/* CONTENT */}

      <div className="p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.18em] text-white/35">
              Current Stage
            </p>

            <p className="mt-1 text-xs font-semibold text-white/85">
              {GROUPS[groupIndex].title}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`
                rounded-full
                px-2.5
                py-1
                text-[9px]
                font-semibold
                ${
                  status === "Completed"
                    ? "bg-white/15 text-white"
                    : status === "In Progress"
                    ? "bg-[#2A317A]/50 text-white"
                    : "bg-white/5 text-white/25"
                }
              `}
            >
              {status}
            </span>
          </div>
        </div>

        {/* progress */}

        <div className="mb-2 flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-[0.12em] text-white/35">
            Progress
          </span>

          <span className="text-[10px] font-semibold text-white">
            {progress}%
          </span>
        </div>

        <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full rounded-full bg-white"
          />
        </div>

        {/* footer */}

        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
          <span className="text-[9px] tracking-[0.16em] text-white/25">
            HANDOFF {String(index + 1).padStart(2, "0")}
          </span>

          <ArrowRight className="h-3.5 w-3.5 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

function DesktopGroupNode({ group, index, active, revealed }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{
        opacity: revealed ? 1 : 0,
        scale: revealed ? 1 : 0.7,
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="
        absolute
        z-20
        flex
        -translate-x-1/2
        -translate-y-1/2
        flex-col
        items-center
        gap-2
      "
      style={{
        left: `${GROUP_POSITIONS_DESKTOP[index].x}%`,
        top: `${GROUP_POSITIONS_DESKTOP[index].y}%`,
      }}
    >
      {/* pulse ring */}

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: [0.15, 0.4, 0.15],
              scale: [0.9, 1.25, 0.9],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              h-16
              w-16
              rounded-full
              border
              border-white/30
            "
          />
        )}
      </AnimatePresence>

      {/* node */}

      <motion.div
        animate={{
          borderColor: active ? ACCENT : "rgba(255,255,255,0.35)",
          backgroundColor: active ? "#474746" : BG,
          scale: active ? 1.08 : 1,
        }}
        transition={{ duration: 0.4 }}
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          border
          text-white
        "
      >
        <Plus className="h-4 w-4" />
      </motion.div>

      {/* label */}

      <span
        className={`
          rounded-full
          border
          px-3
          py-1
          text-[9px]
          font-semibold
          uppercase
          tracking-[0.08em]
          whitespace-nowrap
          backdrop-blur-md
          ${
            active
              ? "border-white/30 bg-white/10 text-white"
              : "border-white/5 bg-white/5 text-white/45"
          }
        `}
      >
        {group.title}
      </span>
    </motion.div>
  );
}

/* قيمة ثابتة عشان الـ useMemo ما يتحسبش من الأول في كل render */
const EMPTY_PROJECT = {};

export default function ProjectHierarchy({ project = EMPTY_PROJECT }) {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const phaseRef = useRef(0);
  const [activePhase, setActivePhase] = useState(0);

  /* =========================
     TARGET PHASE
  ========================= */

  const targetIndex = useMemo(() => {
    if (typeof project.currentPhase === "number") {
      return project.currentPhase;
    }

    if (project.status?.toLowerCase() === "finished") {
      return PHASES.length - 1;
    }

    return Math.floor(PHASES.length / 2);
  }, [project]);

  /* =========================
     VALID PHASES
  ========================= */

  const playablePhases = useMemo(
    () => PHASES.slice(0, targetIndex + 1).map((_, index) => index),
    [targetIndex]
  );

  const total = PLAY_ALL ? PHASES.length : playablePhases.length;

  /* =========================
     IMAGE
  ========================= */

  const getImage = (phaseIndex) =>
    project.phaseGallery?.[phaseIndex] ||
    (project.gallery?.length
      ? project.gallery[phaseIndex % project.gallery.length]
      : project.src);

  /* =========================
     CURRENT GROUP
  ========================= */

  const activeGroup = getGroupIndex(activePhase);
  const activePoint = GROUP_POSITIONS_DESKTOP[activeGroup];

  /* الجروبات المكشوفة = كل جروب وصلنا له لحد الـ phase الحالية
     (بترجع تختفي لو عملتي scroll لفوق) */
  const revealedGroups = useMemo(() => {
    const set = new Set();
    for (let i = 0; i <= activePhase; i++) set.add(getGroupIndex(i));
    return set;
  }, [activePhase]);

  /* Refresh ScrollTrigger بعد ما ارتفاع السيكشن يستقر (FlowScroll) */
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 300);
    window.addEventListener("load", refresh);
    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
    };
  }, []);

  /* =========================
     SCROLL SEQUENCER
     - الـ scroll بيتحسب بس لما المؤشر يكون فوق الـ grid والـ grid ظاهر كله.
     - كل scroll = phase واحدة بالترتيب (لفوق بترجع).
     - بعد آخر phase (أو قبل أول phase) الـ scroll بيكمل عادي.
     - أي scroll والمؤشر برة الـ grid = scroll عادي للسيكشن اللي فوق/تحت.
     - مفيش window.scrollTo قسري، عشان ما نتعارضش مع pin بتاع FlowScroll.
  ========================= */

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const last = total - 1;

    let busy = false;
    let timer = null;
    let touchY = null;
    let pointer = { x: -1, y: -1 };

    const holdFor = (ms) => {
      busy = true;
      clearTimeout(timer);
      timer = setTimeout(() => {
        busy = false;
      }, ms);
    };

    const getRect = () => grid.getBoundingClientRect();

    /* الـ grid ظاهر كله في الشاشة (أو مغطي الشاشة لو أطول منها) */
    const isEligible = () => {
      const r = getRect();
      const vh = window.innerHeight;
      if (r.height <= 0) return false;
      const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0);
      return visible >= Math.min(r.height, vh) * 0.97;
    };

    const isInside = (x, y) => {
      const r = getRect();
      return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    };

    const setPhase = (n) => {
      const clamped = Math.max(0, Math.min(last, n));
      phaseRef.current = clamped;
      setActivePhase(clamped);
    };

    /* هل الحركة دي تتستهلك جوه الـ grid؟ */
    const consumes = (dir, x, y) => {
      if (!isEligible() || !isInside(x, y)) return false;
      if (busy) return true;
      const next = phaseRef.current + dir;
      return next >= 0 && next <= last;
    };

    const advance = (dir) => {
      setPhase(phaseRef.current + dir);
      holdFor(STEP_MS);
    };

    /* ---------- wheel ---------- */
    const onWheel = (e) => {
      if (e.ctrlKey) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      if (!consumes(dir, e.clientX, e.clientY)) return;

      e.preventDefault();

      if (busy || Math.abs(e.deltaY) < MIN_WHEEL_DELTA) return;
      advance(dir);
    };

    /* ---------- touch ---------- */
    const onTouchStart = (e) => {
      const t = e.touches[0];
      touchY = t.clientY;
      pointer = { x: t.clientX, y: t.clientY };
    };

    const onTouchMove = (e) => {
      if (touchY === null) return;

      const t = e.touches[0];
      const dy = touchY - t.clientY;
      if (dy === 0) return;

      const dir = dy > 0 ? 1 : -1;
      if (!consumes(dir, t.clientX, t.clientY)) return;

      e.preventDefault();

      if (busy || Math.abs(dy) < 30) return;

      touchY = t.clientY;
      advance(dir);
    };

    const onTouchEnd = () => {
      touchY = null;
    };

    /* ---------- keyboard (لو المؤشر فوق الـ grid) ---------- */
    const onPointerMove = (e) => {
      pointer = { x: e.clientX, y: e.clientY };
    };

    const onKeyDown = (e) => {
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      let dir = 0;
      if (e.key === "ArrowDown" || e.key === "PageDown") dir = 1;
      else if (e.key === "ArrowUp" || e.key === "PageUp") dir = -1;
      else if (e.key === " ") dir = e.shiftKey ? -1 : 1;

      if (!dir || !consumes(dir, pointer.x, pointer.y)) return;

      e.preventDefault();
      if (busy) return;
      advance(dir);
    };

    /* ---------- scroll: مزامنة الـ phase حسب مكان الـ grid ---------- */
    let wasEligible = isEligible();

    const onScroll = () => {
      const r = getRect();

      /* الـ grid فوق الشاشة خالص → آخر phase (الرجوع من تحت يبدأ منها) */
      if (r.bottom <= 0) {
        if (phaseRef.current !== last) setPhase(last);
      } else if (r.top >= window.innerHeight) {
        /* الـ grid تحت الشاشة خالص → أول phase */
        if (phaseRef.current !== 0) setPhase(0);
      }

      /* أول ما الـ grid يظهر كله، امتص الـ inertia قبل أول phase */
      const eligible = isEligible();
      if (eligible && !wasEligible) holdFor(ENGAGE_MS);
      wasEligible = eligible;
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, {
      passive: true,
      capture: true,
    });
    window.addEventListener("touchmove", onTouchMove, {
      passive: false,
      capture: true,
    });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("touchstart", onTouchStart, { capture: true });
      window.removeEventListener("touchmove", onTouchMove, { capture: true });
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, [total]);

  /* =========================
     STATUS
  ========================= */

  const getStatus = (index) => {
    if (index < targetIndex) return "Completed";
    if (index === targetIndex) return "In Progress";
    return "Pending";
  };

  return (
    <section ref={sectionRef} className="relative w-full">
      {/* حدود السيكشن = حدود الـ grid، والخلفية هنا بس */}
      <div ref={gridRef} className="w-full bg-[#3C3C3B]">
        <KineticGrid className="!h-auto w-full">
          <div
            className="
              relative
              mx-auto
              max-w-7xl
              px-4
              py-10
              sm:px-8
              sm:py-14
            "
          >
            {/* =========================
                HEADER
            ========================= */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-8 text-center sm:mb-10"
            >
              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-white
                  sm:text-xs
                "
              >
                The Construction Journey
              </span>

              <h2
                className="
                  mt-3
                  text-3xl
                  font-bold
                  leading-tight
                  text-white
                  sm:text-4xl
                  md:text-5xl
                "
              >
                From Ground To Completion
              </h2>

              <p
                className="
                  mx-auto
                  mt-3
                  hidden
                  max-w-xl
                  sm:block
                  text-[11px]
                  leading-relaxed
                  text-white/35
                  sm:text-xs
                "
              >
                Every phase hands the project to the next. One continuous
                construction sequence.
              </p>
            </motion.div>

            {/* ==================================================
                DESKTOP CINEMATIC TREE
            ================================================== */}

            <div
              className="
                relative
                hidden
                h-[430px]
                overflow-hidden
                md:block
                lg:h-[470px]
              "
            >
              {/* SVG TREE (root → groups فقط) */}

              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  h-full
                  w-full
                "
              >
                {GROUPS.map((group, index) => {
                  const point = GROUP_POSITIONS_DESKTOP[index];
                  const revealed = revealedGroups.has(index);

                  return (
                    <motion.path
                      key={`root-group-${index}`}
                      d={`
                        M ${ROOT_POSITION_DESKTOP.x}
                          ${ROOT_POSITION_DESKTOP.y}

                        Q
                          ${(ROOT_POSITION_DESKTOP.x + point.x) / 2}
                          ${point.y}

                          ${point.x}
                          ${point.y}
                      `}
                      fill="none"
                      stroke={revealed ? ACCENT : LINE_IDLE}
                      strokeWidth="0.35"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: revealed ? 1 : 0,
                        opacity: revealed ? 1 : 0,
                      }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                  );
                })}

                {/* الخط اللي بيوصل الـ + بالكارت */}
                <AnimatePresence mode="wait">
                  <motion.path
                    key={`active-line-${activePhase}`}
                    d={`M ${activePoint.x} ${activePoint.y} L ${CARD_POSITION_DESKTOP.x} ${activePoint.y}`}
                    fill="none"
                    stroke={LINE_ACTIVE}
                    strokeWidth="0.4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  />
                </AnimatePresence>
              </svg>

              {/* ROOT NODE */}

              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="
                  absolute
                  z-30
                  flex
                  -translate-x-1/2
                  -translate-y-1/2
                  flex-col
                  items-center
                  gap-2
                "
                style={{
                  left: `${ROOT_POSITION_DESKTOP.x}%`,
                  top: `${ROOT_POSITION_DESKTOP.y}%`,
                }}
              >
                <div
                  className="
                    relative
                    h-24
                    w-24
                    overflow-hidden
                    rounded-full
                    border-2
                    border-white
                    bg-[#3C3C3B]
                    shadow-[0_0_45px_rgba(255,255,255,0.15)]
                    lg:h-28
                    lg:w-28
                  "
                >
                  <img
                    src={project.src}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/35
                      to-transparent
                    "
                  />
                </div>

                <span
                  className="
                    rounded-full
                    bg-[#2A317A]
                    px-3
                    py-1
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.1em]
                    text-white
                  "
                >
                  Project Start
                </span>
              </motion.div>

              {/* GROUP NODES */}

              {GROUPS.map((group, index) => (
                <DesktopGroupNode
                  key={group.title}
                  group={group}
                  index={index}
                  active={activeGroup === index}
                  revealed={revealedGroups.has(index)}
                />
              ))}

              {/* MOVING PHASE CARD */}

              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhase}
                  initial={{
                    left: `${GROUP_POSITIONS_DESKTOP[activeGroup].x}%`,
                    top: `${GROUP_POSITIONS_DESKTOP[activeGroup].y}%`,
                    opacity: 0,
                    scale: 0.85,
                  }}
                  animate={{
                    left: `${CARD_POSITION_DESKTOP.x}%`,
                    top: `${GROUP_POSITIONS_DESKTOP[activeGroup].y}%`,
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    left: "108%",
                    opacity: 0,
                    scale: 0.96,
                  }}
                  transition={{
                    left: { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
                    top: { duration: 0.5, ease: "easeInOut" },
                    opacity: { duration: 0.45 },
                    scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                  }}
                  className="
                    absolute
                    z-40
                    -translate-x-1/2
                    -translate-y-1/2
                  "
                >
                  <PhaseCard
                    phase={PHASES[activePhase]}
                    index={activePhase}
                    image={getImage(activePhase)}
                    progress={Math.round(
                      ((activePhase + 1) / PHASES.length) * 100
                    )}
                    status={getStatus(activePhase)}
                    groupIndex={activeGroup}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ==================================================
                MOBILE
            ================================================== */}

            <div className="relative md:hidden">
              <div className="relative h-[560px] overflow-hidden">
                {/* MOBILE SVG TREE (root → groups فقط) */}

                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    h-full
                    w-full
                  "
                >
                  {GROUPS.map((group, index) => {
                    const x = [18, 50, 82][index];
                    const y = 31;

                    return (
                      <motion.path
                        key={`mobile-root-${index}`}
                        d={`
                          M 50 11

                          Q
                            50 20
                            ${x} ${y}
                        `}
                        fill="none"
                        stroke={revealedGroups.has(index) ? ACCENT : LINE_IDLE}
                        strokeWidth="0.55"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{
                          pathLength: revealedGroups.has(index) ? 1 : 0,
                        }}
                        transition={{ duration: 0.65 }}
                      />
                    );
                  })}

                  {/* الخط اللي بيوصل الـ + بالكارت */}
                  <AnimatePresence mode="wait">
                    <motion.path
                      key={`mobile-line-${activePhase}`}
                      d={`M ${[18, 50, 82][activeGroup]} 31 C ${
                        [18, 50, 82][activeGroup]
                      } 46 50 50 50 61`}
                      fill="none"
                      stroke={LINE_ACTIVE}
                      strokeWidth="0.55"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      exit={{ pathLength: 0, opacity: 0 }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                    />
                  </AnimatePresence>
                </svg>

                {/* ROOT */}

                <div
                  className="
                    absolute
                    left-1/2
                    top-[11%]
                    z-20
                    -translate-x-1/2
                    -translate-y-1/2
                  "
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className="
                        h-16
                        w-16
                        overflow-hidden
                        rounded-full
                        border-2
                        border-white
                        shadow-lg
                      "
                    >
                      <img
                        src={project.src}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <span
                      className="
                        rounded-full
                        bg-[#2A317A]
                        px-2.5
                        py-1
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.08em]
                        text-white
                      "
                    >
                      Project Start
                    </span>
                  </motion.div>
                </div>

                {/* GROUP NODES */}

                {GROUPS.map((group, index) => {
                  const active = activeGroup === index;
                  const revealed = revealedGroups.has(index);

                  return (
                    <motion.div
                      key={group.title}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{
                        opacity: revealed ? 1 : 0,
                        scale: revealed ? 1 : 0.7,
                      }}
                      className="
                        absolute
                        top-[31%]
                        z-20
                        -translate-x-1/2
                      "
                      style={{ left: `${[18, 50, 82][index]}%` }}
                    >
                      <motion.div
                        animate={{
                          borderColor: active
                            ? ACCENT
                            : "rgba(255,255,255,0.35)",
                          scale: active ? 1.08 : 1,
                        }}
                        className="
                          mx-auto
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-full
                          border
                          bg-[#3C3C3B]
                          text-white
                        "
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </motion.div>

                      <span
                        className={`
                          mt-2
                          block
                          max-w-[90px]
                          text-center
                          text-[7px]
                          font-semibold
                          uppercase
                          leading-tight
                          ${active ? "text-white" : "text-white/40"}
                        `}
                      >
                        {group.title}
                      </span>
                    </motion.div>
                  );
                })}

                {/* MOBILE PHASE */}

                <div
                  className="
                    absolute
                    left-1/2
                    top-[71%]
                    z-40
                    w-full
                    -translate-x-1/2
                    -translate-y-1/2
                    px-2
                  "
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePhase}
                      initial={{
                        opacity: 0,
                        x: activeGroup === 0 ? -70 : activeGroup === 2 ? 70 : 0,
                        scale: 0.92,
                      }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 90, scale: 0.94 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="flex justify-center"
                    >
                      <PhaseCard
                        phase={PHASES[activePhase]}
                        index={activePhase}
                        image={getImage(activePhase)}
                        progress={Math.round(
                          ((activePhase + 1) / PHASES.length) * 100
                        )}
                        status={getStatus(activePhase)}
                        groupIndex={activeGroup}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </KineticGrid>
      </div>
    </section>
  );
}