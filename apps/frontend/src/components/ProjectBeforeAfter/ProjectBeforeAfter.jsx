// // import { useCallback, useEffect, useRef, useState } from "react";
// // import { motion, useAnimation } from "motion/react";
// // import {
// //   GripVertical,
// //   HardHat,
// //   Building2,
// //   CheckCircle2,
// // } from "lucide-react";

// // const ICONS = [HardHat, Building2, CheckCircle2];

// // export default function ProjectBeforeAfter({ project }) {

// //   if (!project.beforeImage || !project.afterImage) return null;

// //   const highlights = project.transformationHighlights || [];

// //   const [position, setPosition] = useState(50);
// //   const [isDragging, setIsDragging] = useState(false);
// //   const [hasInteracted, setHasInteracted] = useState(false);
// //   const containerRef = useRef(null);
// //   const controls = useAnimation();

// //   const handleMove = useCallback((clientX) => {
// //     if (!containerRef.current) return;
// //     const rect = containerRef.current.getBoundingClientRect();
// //     const x = clientX - rect.left;
// //     const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
// //     setPosition(percentage);
// //   }, []);

// //   const startDrag = (clientX) => {
// //     setIsDragging(true);
// //     setHasInteracted(true);
// //     handleMove(clientX);
// //   };

// //   useEffect(() => {
// //     const onMouseMove = (e) => isDragging && handleMove(e.clientX);
// //     const onTouchMove = (e) => isDragging && handleMove(e.touches[0].clientX);
// //     const onEnd = () => setIsDragging(false);

// //     if (isDragging) {
// //       document.addEventListener("mousemove", onMouseMove);
// //       document.addEventListener("touchmove", onTouchMove);
// //       document.addEventListener("mouseup", onEnd);
// //       document.addEventListener("touchend", onEnd);
// //     }
// //     return () => {
// //       document.removeEventListener("mousemove", onMouseMove);
// //       document.removeEventListener("touchmove", onTouchMove);
// //       document.removeEventListener("mouseup", onEnd);
// //       document.removeEventListener("touchend", onEnd);
// //     };
// //   }, [isDragging, handleMove]);

// //   // حركة تعريفية تلقائية أول ما السكشن يدخل الشاشة
// //   const handleViewportEnter = () => {
// //     if (hasInteracted) return;
// //     controls.start({
// //       transition: { duration: 2.2, ease: "easeInOut" },
// //       // بنحرك position مش controls مباشرة، فبنستخدم setTimeout بسيط بدالها
// //     });
// //     setPosition(30);
// //     setTimeout(() => setPosition(70), 500);
// //     setTimeout(() => setPosition(50), 1400);
// //   };

// //   return (
// //     <section className="relative w-full bg-[#F8F9FD] py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
// //       {/* =====================================================================
// //           شريط الـ measuring tape فوق السكشن
// //           بيترسم بإحساس شريط تحذير حقيقي بيتلصق من الشمال لليمين، مش scaleX
// //           عشان الخطوط القطرية متتمططش أو تتشوه
// //       ===================================================================== */}
// //       <div className="absolute top-0 inset-x-0 h-2 z-10 overflow-hidden">
// //         {/* جسم الشريط - بيتكشف تدريجيًا عن طريق width من 0% لـ 100% */}
// //         <motion.div
// //           className="h-full"
// //           style={{
// //             backgroundImage:
// //               "repeating-linear-gradient(-45deg, #3C3C3B  0 10px, #2A317A 10px 20px)",
// //             transformOrigin: "left center",
// //           }}
// //           initial={{ width: "0%", y: 0 }}
// //           whileInView={{
// //             width: "100%",
// //             // اهتزازة عضوية خفيفة جدًا أثناء اللصق، وبتستقر تمامًا في الآخر
// //             y: [0, -1, 1, -0.4, 0],
// //           }}
// //           viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
// //           transition={{
// //             width: {
// //               duration: 5,
// //               ease: [0.65, 0, 0.35, 1], // custom easeInOut قوي واحترافي
// //             },
// //             y: {
// //               duration: 3,
// //               ease: [0.65, 0, 0.35, 1],
// //               times: [0, 0.3, 0.6, 0.85, 1],
// //             },
// //           }}
// //         />

// //         {/* لمعة خفيفة بتتحرك مع حافة الشريط أثناء اللصق وتختفي عند الاستقرار */}
// //         <motion.div
// //           className="pointer-events-none absolute top-0 h-full w-8"
// //           style={{
// //             background:
// //               "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.4), rgba(255,255,255,0))",
// //           }}
// //           initial={{ left: "0%", opacity: 0 }}
// //           whileInView={{
// //             left: ["0%", "100%"],
// //             opacity: [0, 0.9, 0.9, 0],
// //           }}
// //           viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
// //           transition={{
// //             duration: 3,
// //             ease: [0.65, 0, 0.35, 1],
// //             times: [0, 0.06, 0.94, 1],
// //           }}
// //         />
// //       </div>

// //       <div className="mx-auto max-w-6xl">
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           viewport={{ once: true }}
// //           transition={{ duration: 0.6 }}
// //           className="text-center mb-10 sm:mb-14"
// //         >
// //           <span className="text-[#293A82] font-semibold tracking-[0.2em] text-xs uppercase">
// //             Transformation
// //           </span>
// //           <h2 className="text-3xl sm:text-4xl font-bold text-[#1E2432] mt-2">
// //             See The Difference
// //           </h2>
// //           <p className="text-[#6C757D] mt-2 max-w-lg mx-auto">
// //             Drag the divider to compare the site before and after construction.
// //           </p>
// //         </motion.div>

// //         <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
// //           {/* السلايدر */}
// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.97 }}
// //             whileInView={{ opacity: 1, scale: 1 }}
// //             viewport={{ once: true, margin: "-80px" }}
// //             onViewportEnter={handleViewportEnter}
// //             transition={{ duration: 0.7 }}
// //             className="lg:col-span-7"
// //           >
// //             <div
// //               ref={containerRef}
// //               role="slider"
// //               aria-label="Before/After comparison slider"
// //               aria-valuemin={0}
// //               aria-valuemax={100}
// //               aria-valuenow={Math.round(position)}
// //               tabIndex={0}
// //               className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#1F3888]/10 shadow-xl cursor-ew-resize select-none"
// //               onMouseDown={(e) => startDrag(e.clientX)}
// //               onTouchStart={(e) => startDrag(e.touches[0].clientX)}
// //             >
// //               {/* صورة "بعد" - الطبقة الكاملة تحت */}
// //               <img
// //                 src={project.afterImage}
// //                 alt={`${project.title} after`}
// //                 className="absolute inset-0 h-full w-full object-cover"
// //               />

// //               {/* صورة "قبل" - مقصوصة فوق */}
// //               <div
// //                 className="absolute inset-0"
// //                 style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
// //               >
// //                 <img
// //                   src={project.beforeImage}
// //                   alt={`${project.title} before`}
// //                   className="absolute inset-0 h-full w-full object-cover"
// //                 />
// //               </div>

// //               {/* خط الفاصل المضيء */}
// //               <div
// //                 className="absolute top-0 bottom-0 z-20 w-1 -translate-x-1/2 bg-white"
// //                 style={{
// //                   left: `${position}%`,
// //                   boxShadow: isDragging
// //                     ? "0 0 24px rgba(255,191,0,0.8)"
// //                     : "0 0 12px rgba(255,255,255,0.6)",
// //                 }}
// //               >
// //                 {/* حلقة نابضة حوالين الـ handle قبل أول تفاعل */}
// //                 {!hasInteracted && (
// //                   <motion.span
// //                     animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
// //                     transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
// //                     className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFBF00]"
// //                   />
// //                 )}

// //                 <div
// //                   className={`absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#293A82] bg-white shadow-xl transition-transform ${
// //                     isDragging ? "scale-110" : ""
// //                   }`}
// //                 >
// //                   <GripVertical className="h-5 w-5 text-[#293A82]" />
// //                 </div>
// //               </div>

// //               {/* Ribbon badges */}
// //               <motion.span
// //                 initial={{ x: -30, opacity: 0 }}
// //                 whileInView={{ x: 0, opacity: 1 }}
// //                 viewport={{ once: true }}
// //                 transition={{ delay: 0.3, duration: 0.5 }}
// //                 className="absolute top-4 left-4 z-20 rounded-full bg-[#373A48]/85 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm"
// //               >
// //                 Before
// //               </motion.span>

// //               <motion.span
// //                 initial={{ x: 30, opacity: 0 }}
// //                 whileInView={{ x: 0, opacity: 1 }}
// //                 viewport={{ once: true }}
// //                 transition={{ delay: 0.3, duration: 0.5 }}
// //                 className="absolute top-4 right-4 z-20 rounded-full bg-[#FFBF00] px-3 py-1.5 text-xs font-semibold text-[#1E2432] backdrop-blur-sm"
// //               >
// //                 After
// //               </motion.span>
// //             </div>
// //           </motion.div>

// //           {/* الـ highlights */}
// //           {highlights.length > 0 && (
// //             <div className="lg:col-span-5 flex flex-col gap-3">
// //               {highlights.slice(0, 6).map((h, idx) => {
// //                 const Icon = ICONS[idx % ICONS.length];
// //                 return (

// // <motion.div
// //   key={h.title}
// //   initial={{ opacity: 0, x: -24 }}
// //   whileInView={{ opacity: 1, x: 0 }}
// //   viewport={{ once: true }}
// //   transition={{
// //     delay: idx * 0.12,
// //     duration: 0.5,
// //     ease: "easeOut",
// //   }}
// //   whileHover={{
// //     scale: 1.035,
// //     y: -5,
// //     transition: {
// //       duration: 0.25,
// //       ease: "easeOut",
// //     },
// //   }}
// //   whileTap={{ scale: 0.98 }}
// //   className="group relative flex items-start gap-3 rounded-xl 
// //              bg-white border border-[#1F3888]/10 p-4 
// //              shadow-sm overflow-hidden cursor-pointer
// //              transition-colors duration-300
// //              hover:bg-[#293A82]
// //              hover:border-[#FFBF00]
// //              hover:shadow-[0_15px_35px_rgba(41,58,130,0.22)]"
// // >
// //   {/* Animated gold line */}
// //   <motion.span
// //     className="absolute left-0 top-0 h-full w-1 bg-[#FFBF00] origin-top"
// //     initial={{ scaleY: 0 }}
// //     whileInView={{ scaleY: 1 }}
// //     viewport={{ once: true }}
// //     transition={{
// //       delay: idx * 0.12 + 0.15,
// //       duration: 0.5,
// //       ease: "easeOut",
// //     }}
// //   />

// //   {/* Subtle hover glow */}
// //   <span
// //     className="pointer-events-none absolute -right-10 -top-10 
// //                h-24 w-24 rounded-full bg-[#FFBF00]/20 
// //                blur-2xl opacity-0 transition-opacity duration-500 
// //                group-hover:opacity-100"
// //   />

// //   {/* Icon */}
// //   <motion.span
// //     initial={{ rotate: -90, opacity: 0 }}
// //     whileInView={{ rotate: 0, opacity: 1 }}
// //     viewport={{ once: true }}
// //     transition={{
// //       delay: idx * 0.12 + 0.1,
// //       duration: 0.4,
// //       ease: "easeOut",
// //     }}
// //     whileHover={{
// //       rotate: 8,
// //       scale: 1.12,
// //     }}
// //     className="relative z-10 flex h-9 w-9 shrink-0 
// //                items-center justify-center rounded-full 
// //                bg-[#293A82] 
// //                transition-all duration-300
// //                group-hover:bg-[#FFBF00]
// //                group-hover:shadow-[0_0_18px_rgba(255,191,0,0.45)]"
// //   >
// //     <Icon
// //       className="h-4 w-4 text-white transition-colors duration-300 
// //                  group-hover:text-[#1E2432]"
// //     />
// //   </motion.span>

// //   {/* Text */}
// //   <div className="relative z-10">
// //     <p
// //       className="text-sm font-bold text-[#1E2432] 
// //                  transition-colors duration-300
// //                  group-hover:text-white"
// //     >
// //       {h.title}
// //     </p>

// //     {h.description && (
// //       <p
// //         className="mt-1 text-xs text-[#6C757D] leading-relaxed
// //                    transition-colors duration-300
// //                    group-hover:text-white/80"
// //       >
// //         {h.description}
// //       </p>
// //     )}
// //   </div>

// //   {/* Arrow appears on hover */}
// //   <motion.span
// //     initial={{ opacity: 0, x: -8 }}
// //     whileHover={{ opacity: 1, x: 0 }}
// //     className="absolute right-4 top-1/2 -translate-y-1/2 
// //                text-[#FFBF00] opacity-0 transition-all duration-300
// //                group-hover:opacity-100 group-hover:translate-x-0"
// //   >
// //     →
// //   </motion.span>
// // </motion.div>


// //                 );
// //               })}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }











import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "motion/react";
import {
  GripVertical,
  HardHat,
  Building2,
  CheckCircle2,
} from "lucide-react";

const ICONS = [HardHat, Building2, CheckCircle2];

export default function ProjectBeforeAfter({ project }) {
  if (!project.beforeImage || !project.afterImage) return null;

  const highlights = project.transformationHighlights || [];

  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const containerRef = useRef(null);
  const controls = useAnimation();

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;

    const percentage = Math.max(
      0,
      Math.min(100, (x / rect.width) * 100)
    );

    setPosition(percentage);
  }, []);

  const startDrag = (clientX) => {
    setIsDragging(true);
    setHasInteracted(true);
    handleMove(clientX);
  };

  useEffect(() => {
    const onMouseMove = (e) =>
      isDragging && handleMove(e.clientX);

    const onTouchMove = (e) =>
      isDragging && handleMove(e.touches[0].clientX);

    const onEnd = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("touchmove", onTouchMove);
      document.addEventListener("mouseup", onEnd);
      document.addEventListener("touchend", onEnd);
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("mouseup", onEnd);
      document.removeEventListener("touchend", onEnd);
    };
  }, [isDragging, handleMove]);

  // حركة تعريفية تلقائية أول ما السكشن يدخل الشاشة
  const handleViewportEnter = () => {
    if (hasInteracted) return;

    controls.start({
      transition: {
        duration: 2.2,
        ease: "easeInOut",
      },
    });

    setPosition(30);
    setTimeout(() => setPosition(70), 500);
    setTimeout(() => setPosition(50), 1400);
  };

  return (
    <section className="relative w-full bg-white py-16 px-4 sm:px-6 sm:py-24 overflow-hidden">
      {/* =====================================================================
          شريط الـ measuring tape فوق السكشن
          الألوان هنا متسابّة زي ما هي بالظبط
      ===================================================================== */}
      <div className="absolute top-0 inset-x-0 h-2 z-10 overflow-hidden">
        {/* جسم الشريط */}
        <motion.div
          className="h-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, #FFBF00 0 10px, #293A82 10px 20px)",
            transformOrigin: "left center",
          }}
          initial={{ width: "0%", y: 0 }}
          whileInView={{
            width: "100%",
            y: [0, -1, 1, -0.4, 0],
          }}
          viewport={{
            once: true,
            margin: "-10% 0px -10% 0px",
          }}
          transition={{
            width: {
              duration: 5,
              ease: [0.65, 0, 0.35, 1],
            },
            y: {
              duration: 3,
              ease: [0.65, 0, 0.35, 1],
              times: [0, 0.3, 0.6, 0.85, 1],
            },
          }}
        />

        {/* لمعة الشريط - متسابّة زي ما هي */}
        <motion.div
          className="pointer-events-none absolute top-0 h-full w-8"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.4), rgba(255,255,255,0))",
          }}
          initial={{ left: "0%", opacity: 0 }}
          whileInView={{
            left: ["0%", "100%"],
            opacity: [0, 0.9, 0.9, 0],
          }}
          viewport={{
            once: true,
            margin: "-10% 0px -10% 0px",
          }}
          transition={{
            duration: 3,
            ease: [0.65, 0, 0.35, 1],
            times: [0, 0.06, 0.94, 1],
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center sm:mb-14"
        >
          <span className="text-[#2A317A] font-semibold tracking-[0.2em] text-xs uppercase">
            Transformation
          </span>

          <h2 className="mt-2 text-3xl font-bold text-black sm:text-4xl">
            See The Difference
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-[#3C3C3B]">
            Drag the divider to compare the site before and after construction.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Slider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            onViewportEnter={handleViewportEnter}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div
              ref={containerRef}
              role="slider"
              aria-label="Before/After comparison slider"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(position)}
              tabIndex={0}
              className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-2xl border border-[#2A317A]/10 shadow-xl"
              onMouseDown={(e) => startDrag(e.clientX)}
              onTouchStart={(e) => startDrag(e.touches[0].clientX)}
            >
              {/* After */}
              <img
                src={project.afterImage}
                alt={`${project.title} after`}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Before */}
              <div
                className="absolute inset-0"
                style={{
                  clipPath: `inset(0 ${100 - position}% 0 0)`,
                }}
              >
                <img
                  src={project.beforeImage}
                  alt={`${project.title} before`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              {/* Divider */}
              <div
                className="absolute bottom-0 top-0 z-20 w-1 -translate-x-1/2 bg-white"
                style={{
                  left: `${position}%`,
                  boxShadow: isDragging
                    ? "0 0 24px rgba(255,191,0,0.8)"
                    : "0 0 12px rgba(255,255,255,0.6)",
                }}
              >
                {/* الـ yellow pulse متساب زي ما هو */}
                {!hasInteracted && (
                  <motion.span
                    animate={{
                      scale: [1, 1.6],
                      opacity: [0.6, 0],
                    }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFBF00]"
                  />
                )}

                <div
                  className={`absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#293A82] bg-white shadow-xl transition-transform ${
                    isDragging ? "scale-110" : ""
                  }`}
                >
                  <GripVertical className="h-5 w-5 text-[#293A82]" />
                </div>
              </div>

              {/* Before badge */}
              <motion.span
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.3,
                  duration: 0.5,
                }}
                className="absolute left-4 top-4 z-20 rounded-full bg-[#3C3C3B]/85 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm"
              >
                Before
              </motion.span>

              {/* After badge - اللون الأصفر متساب زي ما هو */}
              <motion.span
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.3,
                  duration: 0.5,
                }}
                className="absolute right-4 top-4 z-20 rounded-full bg-[#2A317A] px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm"
              >
                After
              </motion.span>
            </div>
          </motion.div>

          {/* Highlights */}
          {highlights.length > 0 && (
            <div className="flex flex-col gap-3 lg:col-span-5">
              {highlights.slice(0, 6).map((h, idx) => {
                const Icon = ICONS[idx % ICONS.length];

                return (
                  <motion.div
                    key={h.title}
                    initial={{
                      opacity: 0,
                      x: -24,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      delay: idx * 0.12,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    whileHover={{
                      scale: 1.035,
                      y: -5,
                      transition: {
                        duration: 0.25,
                        ease: "easeOut",
                      },
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="
                      group relative flex items-start gap-3
                      overflow-hidden rounded-xl
                      border border-[#2A317A]/10
                      bg-white p-4
                      shadow-sm
                      cursor-pointer
                      transition-colors duration-300
                      hover:border-[#2A317A]
                      hover:bg-[#2A317A]
                      hover:shadow-[0_15px_35px_rgba(42,49,122,0.22)]
                    "
                  >
                    {/* Animated blue line */}
                    <motion.span
                      className="absolute left-0 top-0 h-full w-1 origin-top bg-[#2A317A]"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: idx * 0.12 + 0.15,
                        duration: 0.5,
                        ease: "easeOut",
                      }}
                    />

                    {/* Subtle hover glow */}
                    <span
                      className="
                        pointer-events-none absolute
                        -right-10 -top-10
                        h-24 w-24
                        rounded-full
                        bg-white/10
                        blur-2xl
                        opacity-0
                        transition-opacity duration-500
                        group-hover:opacity-100
                      "
                    />

                    {/* Icon */}
                    <motion.span
                      initial={{
                        rotate: -90,
                        opacity: 0,
                      }}
                      whileInView={{
                        rotate: 0,
                        opacity: 1,
                      }}
                      viewport={{ once: true }}
                      transition={{
                        delay: idx * 0.12 + 0.1,
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                      whileHover={{
                        rotate: 8,
                        scale: 1.12,
                      }}
                      className="
                        relative z-10 flex h-9 w-9 shrink-0
                        items-center justify-center
                        rounded-full
                        bg-[#2A317A]
                        transition-all duration-300
                        group-hover:bg-white
                      "
                    >
                      <Icon
                        className="
                          h-4 w-4
                          text-white
                          transition-colors duration-300
                          group-hover:text-[#2A317A]
                        "
                      />
                    </motion.span>

                    {/* Text */}
                    <div className="relative z-10">
                      <p
                        className="
                          text-sm font-bold text-black
                          transition-colors duration-300
                          group-hover:text-white
                        "
                      >
                        {h.title}
                      </p>

                      {h.description && (
                        <p
                          className="
                            mt-1 text-xs leading-relaxed
                            text-[#3C3C3B]
                            transition-colors duration-300
                            group-hover:text-white/80
                          "
                        >
                          {h.description}
                        </p>
                      )}
                    </div>

                    {/* Arrow */}
                    <motion.span
                      initial={{
                        opacity: 0,
                        x: -8,
                      }}
                      whileHover={{
                        opacity: 1,
                        x: 0,
                      }}
                      className="
                        absolute right-4 top-1/2
                        -translate-y-1/2
                        text-white
                        opacity-0
                        transition-all duration-300
                        group-hover:translate-x-0
                        group-hover:opacity-100
                      "
                    >
                      →
                    </motion.span>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}