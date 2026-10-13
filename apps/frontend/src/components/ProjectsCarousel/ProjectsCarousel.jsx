
// // import {
// //   useRef,
// //   useState,
// //   useCallback,
// //   useEffect,
// //   useLayoutEffect,
// // } from "react";
// // import {
// //   ChevronLeft,
// //   ChevronRight,
// // } from "lucide-react";

// // function cx(...classes) {
// //   return classes.filter(Boolean).join(" ");
// // }

// // // =========================================================
// // // STATUS HELPERS
// // // =========================================================

// // function getStatusLabel(status) {
// //   return String(status).toLowerCase() === "finished"
// //     ? "Delivered"
// //     : "Ongoing";
// // }

// // function getStatusClass(status) {
// //   return getStatusLabel(status) === "Delivered"
// //     ? "bg-[#22C55E] text-black"
// //     : "bg-[#FACC15] text-black";
// // }

// // // =========================================================
// // // PROJECTS CAROUSEL
// // // =========================================================

// // export function ProjectsCarousel({
// //   slides,
// //   rotate = 44,
// //   depth = 0.9,
// //   perspective = 5,
// //   falloff = 0.56,
// //   fade = 0.1,
// //   cardWidth = "clamp(220px, 30vw, 380px)",
// //   gap = 0,
// //   backSpread = -0.2,
// //   backStart = 1,
// //   backRamp = 2,
// //   loop = true,
// //   showNavigation = true,
// //   autoplay = true,
// //   autoplayInterval = 2000,
// //   label = "معرض المشاريع",
// //   className,
// // }) {
// //   const count = slides.length;

// //   const frameRef = useRef(null);
// //   const cardRefs = useRef([]);
// //   const posRef = useRef(0);
// //   const targetRef = useRef(0);
// //   const widthRef = useRef(0);
// //   const rafRef = useRef(null);
// //   const dragRef = useRef(null);
// //   const autoplayRef = useRef(null);

// //   const [selected, setSelected] = useState(0);

// //   // =========================================================
// //   // INDEX
// //   // =========================================================

// //   const indexAt = useCallback(
// //     (pos) =>
// //       ((Math.round(pos) % count) + count) %
// //       count,
// //     [count]
// //   );

// //   // =========================================================
// //   // PAINT
// //   // =========================================================

// //   const paint = useCallback(() => {
// //     const width = widthRef.current;

// //     if (!width) return;

// //     const pitch = width * (1 + gap);
// //     const pos = posRef.current;

// //     cardRefs.current.forEach((card, index) => {
// //       if (!card) return;

// //       let offset = index - pos;

// //       if (loop) {
// //         offset =
// //           ((offset % count) + count) %
// //           count;

// //         if (offset > count / 2) {
// //           offset -= count;
// //         }
// //       }

// //       const distance = Math.abs(offset);

// //       const ramp = Math.pow(
// //         distance,
// //         falloff
// //       );

// //       const tilt =
// //         Math.min(rotate * ramp, 82) *
// //         Math.sign(offset);

// //       const backProgress = Math.min(
// //         1,
// //         Math.max(
// //           0,
// //           (distance - backStart) /
// //             Math.max(0.0001, backRamp)
// //         )
// //       );

// //       const extraSpread =
// //         backSpread *
// //         width *
// //         backProgress *
// //         Math.sign(offset);

// //       card.style.transform =
// //         `translateX(calc(-50% + ${
// //           offset * pitch + extraSpread
// //         }px)) ` +
// //         `translateZ(${
// //           -depth * width * ramp
// //         }px) rotateY(${-tilt}deg)`;

// //       const edge = loop
// //         ? Math.min(
// //             1,
// //             Math.max(
// //               0,
// //               count / 2 - distance
// //             )
// //           )
// //         : 1;

// //       card.style.opacity = String(
// //         Math.max(
// //           0,
// //           1 - fade * distance
// //         ) * edge
// //       );

// //       card.style.zIndex = String(
// //         100 - Math.round(distance)
// //       );
// //     });
// //   }, [
// //     backRamp,
// //     backSpread,
// //     backStart,
// //     count,
// //     depth,
// //     fade,
// //     falloff,
// //     gap,
// //     loop,
// //     rotate,
// //   ]);

// //   // =========================================================
// //   // SETTLE
// //   // =========================================================

// //   const settle = useCallback(
// //     (target) => {
// //       if (rafRef.current !== null) {
// //         cancelAnimationFrame(
// //           rafRef.current
// //         );
// //       }

// //       targetRef.current = target;
// //       setSelected(indexAt(target));

// //       const step = () => {
// //         const remaining =
// //           target - posRef.current;

// //         if (Math.abs(remaining) < 0.0004) {
// //           posRef.current = target;
// //           paint();
// //           rafRef.current = null;
// //           return;
// //         }

// //         posRef.current +=
// //           remaining * 0.16;

// //         paint();

// //         rafRef.current =
// //           requestAnimationFrame(step);
// //       };

// //       rafRef.current =
// //         requestAnimationFrame(step);
// //     },
// //     [indexAt, paint]
// //   );

// //   // =========================================================
// //   // CLAMP
// //   // =========================================================

// //   const clamp = useCallback(
// //     (pos) =>
// //       loop
// //         ? pos
// //         : Math.max(
// //             0,
// //             Math.min(count - 1, pos)
// //           ),
// //     [count, loop]
// //   );

// //   // =========================================================
// //   // NUDGE
// //   // =========================================================

// //   const nudge = useCallback(
// //     (by) =>
// //       settle(
// //         clamp(
// //           Math.round(
// //             targetRef.current
// //           ) + by
// //         )
// //       ),
// //     [clamp, settle]
// //   );

// //   // =========================================================
// //   // AUTOPLAY
// //   // =========================================================

// //   const stopAutoplay = useCallback(() => {
// //     if (autoplayRef.current !== null) {
// //       clearInterval(
// //         autoplayRef.current
// //       );

// //       autoplayRef.current = null;
// //     }
// //   }, []);

// //   const startAutoplay = useCallback(() => {
// //     if (!autoplay) return;

// //     stopAutoplay();

// //     autoplayRef.current =
// //       setInterval(() => {
// //         nudge(1);
// //       }, autoplayInterval);
// //   }, [
// //     autoplay,
// //     autoplayInterval,
// //     nudge,
// //     stopAutoplay,
// //   ]);

// //   useEffect(() => {
// //     startAutoplay();

// //     return () => stopAutoplay();
// //   }, [
// //     startAutoplay,
// //     stopAutoplay,
// //   ]);

// //   // =========================================================
// //   // POINTER DOWN
// //   // =========================================================

// //   const onPointerDown = (event) => {
// //     stopAutoplay();

// //     if (rafRef.current !== null) {
// //       cancelAnimationFrame(
// //         rafRef.current
// //       );

// //       rafRef.current = null;
// //     }

// //     event.currentTarget.setPointerCapture(
// //       event.pointerId
// //     );

// //     targetRef.current =
// //       posRef.current;

// //     dragRef.current = {
// //       id: event.pointerId,
// //       x: event.clientX,
// //       pos: posRef.current,
// //       v: 0,
// //       t: performance.now(),
// //     };
// //   };

// //   // =========================================================
// //   // POINTER MOVE
// //   // =========================================================

// //   const onPointerMove = (event) => {
// //     const drag = dragRef.current;

// //     if (
// //       !drag ||
// //       drag.id !== event.pointerId
// //     ) {
// //       return;
// //     }

// //     const pitch =
// //       widthRef.current *
// //       (1 + gap);

// //     if (!pitch) return;

// //     const now = performance.now();

// //     const previous =
// //       posRef.current;

// //     posRef.current = clamp(
// //       drag.pos -
// //         (event.clientX - drag.x) /
// //           pitch
// //     );

// //     drag.v =
// //       ((posRef.current -
// //         previous) /
// //         Math.max(
// //           now - drag.t,
// //           1
// //         )) *
// //       1000;

// //     drag.t = now;

// //     const index = indexAt(
// //       posRef.current
// //     );

// //     if (index !== selected) {
// //       setSelected(index);
// //     }

// //     paint();
// //   };

// //   // =========================================================
// //   // END DRAG
// //   // =========================================================

// //   const endDrag = (event) => {
// //     const drag = dragRef.current;

// //     if (
// //       !drag ||
// //       drag.id !== event.pointerId
// //     ) {
// //       return;
// //     }

// //     dragRef.current = null;

// //     const carried = Math.max(
// //       -2,
// //       Math.min(2, drag.v * 0.18)
// //     );

// //     settle(
// //       clamp(
// //         Math.round(
// //           posRef.current + carried
// //         )
// //       )
// //     );

// //     startAutoplay();
// //   };

// //   // =========================================================
// //   // MEASURE CARD
// //   // =========================================================

// //   useLayoutEffect(() => {
// //     const frame = frameRef.current;

// //     if (!frame) return;

// //     const measure = () => {
// //       const card =
// //         cardRefs.current[0];

// //       if (!card) return;

// //       widthRef.current =
// //         card.offsetWidth;

// //       paint();
// //     };

// //     measure();

// //     const observer =
// //       new ResizeObserver(measure);

// //     observer.observe(frame);

// //     return () =>
// //       observer.disconnect();
// //   }, [paint]);

// //   // =========================================================
// //   // CLEANUP
// //   // =========================================================

// //   useEffect(
// //     () => () => {
// //       if (rafRef.current !== null) {
// //         cancelAnimationFrame(
// //           rafRef.current
// //         );
// //       }
// //     },
// //     []
// //   );

// //   // =========================================================
// //   // RENDER
// //   // =========================================================

// //   return (
// //     <div
// //       className={cx(
// //         "w-full",
// //         className
// //       )}
// //       style={{
// //         "--cf-card": cardWidth,
// //       }}
// //       role="region"
// //       aria-roledescription="carousel"
// //       aria-label={label}
// //     >
// //       <div className="relative">
// //         {/* =================================================
// //             CAROUSEL FRAME
// //         ================================================= */}

// //         <div
// //           ref={frameRef}
// //           tabIndex={0}
// //           onPointerDown={
// //             onPointerDown
// //           }
// //           onPointerMove={
// //             onPointerMove
// //           }
// //           onPointerUp={endDrag}
// //           onPointerCancel={endDrag}
// //           onKeyDown={(event) => {
// //             if (
// //               event.key ===
// //               "ArrowLeft"
// //             ) {
// //               event.preventDefault();
// //               nudge(-1);
// //             } else if (
// //               event.key ===
// //               "ArrowRight"
// //             ) {
// //               event.preventDefault();
// //               nudge(1);
// //             }
// //           }}
// //           className="cursor-grab overflow-hidden py-10 outline-none active:cursor-grabbing"
// //           style={{
// //             perspective: `calc(var(--cf-card) * ${perspective})`,
// //             touchAction: "pan-y",
// //           }}
// //         >
// //           <div
// //             className="relative select-none"
// //             style={{
// //               height:
// //                 "var(--cf-card)",
// //               transformStyle:
// //                 "preserve-3d",
// //             }}
// //           >
// //             {slides.map(
// //               (slide, index) => (
// //                 <div
// //                   key={index}
// //                   ref={(node) => {
// //                     cardRefs.current[
// //                       index
// //                     ] = node;
// //                   }}
// //                   role="group"
// //                   aria-roledescription="slide"
// //                   aria-label={`${index + 1} من ${count}`}
// //                   className="group absolute left-1/2 top-0 aspect-[4/5] overflow-hidden rounded-2xl bg-white shadow-xl will-change-transform"
// //                   style={{
// //                     width:
// //                       "var(--cf-card)",
// //                   }}
// //                 >
// //                   {/* =================================================
// //                       PROJECT IMAGE
// //                   ================================================= */}

// //                   <img
// //                     src={slide.src}
// //                     alt={slide.alt}
// //                     draggable={false}
// //                     className="h-full w-full select-none object-cover"
// //                   />

// //                   {/* =================================================
// //                       HOVER OVERLAY
// //                   ================================================= */}

// //                   <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-5 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
// //                     {/* Project title */}
// //                     <h3 className="mb-3 scale-90 text-2xl font-bold text-white transition-transform duration-300 group-hover:scale-100">
// //                       {slide.title}
// //                     </h3>

// //                     {/* =================================================
// //                         STATUS
// //                     ================================================= */}

// //                     <span
// //                       className={cx(
// //                         "mb-4 rounded-full px-3 py-1 text-xs font-semibold",
// //                         getStatusClass(
// //                           slide.status
// //                         )
// //                       )}
// //                     >
// //                       {getStatusLabel(
// //                         slide.status
// //                       )}
// //                     </span>

// //                     {/* =================================================
// //                         LEARN MORE
// //                     ================================================= */}

// //                     <a
// //                       href={
// //                         slide.href ||
// //                         "#"
// //                       }
// //                       className="inline-flex items-center gap-1 text-sm font-semibold text-[#FFFFFF] transition-opacity hover:opacity-80"
// //                     >
// //                       Learn More

// //                       <ChevronRight className="h-4 w-4" />
// //                     </a>
// //                   </div>
// //                 </div>
// //               )
// //             )}
// //           </div>
// //         </div>

// //         {/* =================================================
// //             NAVIGATION
// //         ================================================= */}

// //         {showNavigation && (
// //           <>
// //             <button
// //               type="button"
// //               aria-label="المشروع السابق"
// //               onClick={() =>
// //                 nudge(-1)
// //               }
// //               className="absolute left-3 top-1/2 z-[200] -translate-y-1/2 rounded-full bg-white/90 p-2 text-black shadow-md backdrop-blur transition-colors hover:bg-[#2A317A] hover:text-white"
// //             >
// //               <ChevronLeft className="h-5 w-5" />
// //             </button>

// //             <button
// //               type="button"
// //               aria-label="المشروع التالي"
// //               onClick={() =>
// //                 nudge(1)
// //               }
// //               className="absolute right-3 top-1/2 z-[200] -translate-y-1/2 rounded-full bg-white/90 p-2 text-black shadow-md backdrop-blur transition-colors hover:bg-[#2A317A] hover:text-white"
// //             >
// //               <ChevronRight className="h-5 w-5" />
// //             </button>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default ProjectsCarousel;



// import {
//   useRef,
//   useState,
//   useCallback,
//   useEffect,
//   useLayoutEffect,
// } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// function cx(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// // =========================================================
// // STATUS HELPERS
// // =========================================================

// function getStatusLabel(status) {
//   return String(status).toLowerCase() === "finished" ||
//     String(status).toLowerCase() === "delivered"
//     ? "Delivered"
//     : "Ongoing";
// }

// function getStatusClass(status) {
//   return getStatusLabel(status) === "Delivered"
//     ? "bg-[#22C55E] text-black"
//     : "bg-[#FACC15] text-black";
// }

// // =========================================================
// // PROJECTS CAROUSEL
// // =========================================================

// export function ProjectsCarousel({
//   slides,
//   rotate = 44,
//   depth = 0.9,
//   perspective = 5,
//   falloff = 0.56,
//   fade = 0.1,
//   // نفس مقاس الديسكتوب في CircularGallery (~340×220 ، نسبة 3:2)
//   cardWidth = "clamp(200px, 28vw, 340px)",
//   gap = 0,
//   backSpread = -0.2,
//   backStart = 1,
//   backRamp = 2,
//   loop = true,
//   showNavigation = true,
//   autoplay = true,
//   autoplayInterval = 2000,
//   label = "معرض المشاريع",
//   className,
// }) {
//   const count = slides.length;

//   const frameRef = useRef(null);
//   const cardRefs = useRef([]);
//   const posRef = useRef(0);
//   const targetRef = useRef(0);
//   const widthRef = useRef(0);
//   const rafRef = useRef(null);
//   const dragRef = useRef(null);
//   const autoplayRef = useRef(null);

//   const [selected, setSelected] = useState(0);

//   // =========================================================
//   // INDEX
//   // =========================================================

//   const indexAt = useCallback(
//     (pos) => ((Math.round(pos) % count) + count) % count,
//     [count]
//   );

//   // =========================================================
//   // PAINT
//   // =========================================================

//   const paint = useCallback(() => {
//     const width = widthRef.current;
//     if (!width) return;

//     const pitch = width * (1 + gap);
//     const pos = posRef.current;

//     cardRefs.current.forEach((card, index) => {
//       if (!card) return;

//       let offset = index - pos;

//       if (loop) {
//         offset = ((offset % count) + count) % count;
//         if (offset > count / 2) {
//           offset -= count;
//         }
//       }

//       const distance = Math.abs(offset);
//       const ramp = Math.pow(distance, falloff);

//       const tilt =
//         Math.min(rotate * ramp, 82) * Math.sign(offset);

//       const backProgress = Math.min(
//         1,
//         Math.max(
//           0,
//           (distance - backStart) / Math.max(0.0001, backRamp)
//         )
//       );

//       const extraSpread =
//         backSpread * width * backProgress * Math.sign(offset);

//       card.style.transform =
//         `translateX(calc(-50% + ${offset * pitch + extraSpread}px)) ` +
//         `translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`;

//       const edge = loop
//         ? Math.min(1, Math.max(0, count / 2 - distance))
//         : 1;

//       card.style.opacity = String(
//         Math.max(0, 1 - fade * distance) * edge
//       );

//       card.style.zIndex = String(100 - Math.round(distance));
//     });
//   }, [
//     backRamp,
//     backSpread,
//     backStart,
//     count,
//     depth,
//     fade,
//     falloff,
//     gap,
//     loop,
//     rotate,
//   ]);

//   // =========================================================
//   // SETTLE
//   // =========================================================

//   const settle = useCallback(
//     (target) => {
//       if (rafRef.current !== null) {
//         cancelAnimationFrame(rafRef.current);
//       }

//       targetRef.current = target;
//       setSelected(indexAt(target));

//       const step = () => {
//         const remaining = target - posRef.current;

//         if (Math.abs(remaining) < 0.0004) {
//           posRef.current = target;
//           paint();
//           rafRef.current = null;
//           return;
//         }

//         posRef.current += remaining * 0.16;
//         paint();
//         rafRef.current = requestAnimationFrame(step);
//       };

//       rafRef.current = requestAnimationFrame(step);
//     },
//     [indexAt, paint]
//   );

//   // =========================================================
//   // CLAMP
//   // =========================================================

//   const clamp = useCallback(
//     (pos) =>
//       loop ? pos : Math.max(0, Math.min(count - 1, pos)),
//     [count, loop]
//   );

//   // =========================================================
//   // NUDGE
//   // =========================================================

//   const nudge = useCallback(
//     (by) => settle(clamp(Math.round(targetRef.current) + by)),
//     [clamp, settle]
//   );

//   // =========================================================
//   // AUTOPLAY
//   // =========================================================

//   const stopAutoplay = useCallback(() => {
//     if (autoplayRef.current !== null) {
//       clearInterval(autoplayRef.current);
//       autoplayRef.current = null;
//     }
//   }, []);

//   const startAutoplay = useCallback(() => {
//     if (!autoplay) return;

//     stopAutoplay();

//     autoplayRef.current = setInterval(() => {
//       nudge(1);
//     }, autoplayInterval);
//   }, [autoplay, autoplayInterval, nudge, stopAutoplay]);

//   useEffect(() => {
//     startAutoplay();
//     return () => stopAutoplay();
//   }, [startAutoplay, stopAutoplay]);

//   // =========================================================
//   // POINTER DOWN
//   // =========================================================

//   const onPointerDown = (event) => {
//     stopAutoplay();

//     if (rafRef.current !== null) {
//       cancelAnimationFrame(rafRef.current);
//       rafRef.current = null;
//     }

//     event.currentTarget.setPointerCapture(event.pointerId);

//     targetRef.current = posRef.current;

//     dragRef.current = {
//       id: event.pointerId,
//       x: event.clientX,
//       pos: posRef.current,
//       v: 0,
//       t: performance.now(),
//     };
//   };

//   // =========================================================
//   // POINTER MOVE
//   // =========================================================

//   const onPointerMove = (event) => {
//     const drag = dragRef.current;

//     if (!drag || drag.id !== event.pointerId) {
//       return;
//     }

//     const pitch = widthRef.current * (1 + gap);
//     if (!pitch) return;

//     const now = performance.now();
//     const previous = posRef.current;

//     posRef.current = clamp(
//       drag.pos - (event.clientX - drag.x) / pitch
//     );

//     drag.v =
//       ((posRef.current - previous) / Math.max(now - drag.t, 1)) *
//       1000;

//     drag.t = now;

//     const index = indexAt(posRef.current);
//     if (index !== selected) {
//       setSelected(index);
//     }

//     paint();
//   };

//   // =========================================================
//   // END DRAG
//   // =========================================================

//   const endDrag = (event) => {
//     const drag = dragRef.current;

//     if (!drag || drag.id !== event.pointerId) {
//       return;
//     }

//     dragRef.current = null;

//     const carried = Math.max(-2, Math.min(2, drag.v * 0.18));

//     settle(clamp(Math.round(posRef.current + carried)));
//     startAutoplay();
//   };

//   // =========================================================
//   // MEASURE CARD
//   // =========================================================

//   useLayoutEffect(() => {
//     const frame = frameRef.current;
//     if (!frame) return;

//     const measure = () => {
//       const card = cardRefs.current[0];
//       if (!card) return;
//       widthRef.current = card.offsetWidth;
//       paint();
//     };

//     measure();

//     const observer = new ResizeObserver(measure);
//     observer.observe(frame);

//     return () => observer.disconnect();
//   }, [paint]);

//   // =========================================================
//   // CLEANUP
//   // =========================================================

//   useEffect(
//     () => () => {
//       if (rafRef.current !== null) {
//         cancelAnimationFrame(rafRef.current);
//       }
//     },
//     []
//   );

//   // =========================================================
//   // RENDER
//   // =========================================================

//   return (
//     <div
//       className={cx("w-full", className)}
//       style={{
//         "--cf-card": cardWidth,
//       }}
//       role="region"
//       aria-roledescription="carousel"
//       aria-label={label}
//     >
//       <div className="relative">
//         {/* CAROUSEL FRAME */}
//         <div
//           ref={frameRef}
//           tabIndex={0}
//           onPointerDown={onPointerDown}
//           onPointerMove={onPointerMove}
//           onPointerUp={endDrag}
//           onPointerCancel={endDrag}
//           onKeyDown={(event) => {
//             if (event.key === "ArrowLeft") {
//               event.preventDefault();
//               nudge(-1);
//             } else if (event.key === "ArrowRight") {
//               event.preventDefault();
//               nudge(1);
//             }
//           }}
//           className="cursor-grab overflow-hidden py-10 outline-none active:cursor-grabbing"
//           style={{
//             perspective: `calc(var(--cf-card) * ${perspective})`,
//             touchAction: "pan-y",
//           }}
//         >
//           <div
//             className="relative select-none"
//             style={{
//               // ارتفاع = عرض × (2/3) عشان aspect 3:2
//               height: "calc(var(--cf-card) * 2 / 3)",
//               transformStyle: "preserve-3d",
//             }}
//           >
//             {slides.map((slide, index) => (
//               <div
//                 key={index}
//                 ref={(node) => {
//                   cardRefs.current[index] = node;
//                 }}
//                 role="group"
//                 aria-roledescription="slide"
//                 aria-label={`${index + 1} من ${count}`}
//                 className="group absolute left-1/2 top-0 aspect-[3/2] overflow-hidden rounded-2xl bg-white shadow-xl will-change-transform"
//                 style={{
//                   width: "var(--cf-card)",
//                 }}
//               >
//                 {/* PROJECT IMAGE */}
//                 <img
//                   src={slide.src}
//                   alt={slide.alt}
//                   draggable={false}
//                   className="h-full w-full select-none object-cover"
//                 />

//                 {/* HOVER OVERLAY */}
//                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-5 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
//                   <h3 className="mb-3 scale-90 text-lg font-bold text-white transition-transform duration-300 group-hover:scale-100 sm:text-xl md:text-2xl">
//                     {slide.title}
//                   </h3>

//                   <span
//                     className={cx(
//                       "mb-4 rounded-full px-3 py-1 text-xs font-semibold",
//                       getStatusClass(slide.status)
//                     )}
//                   >
//                     {getStatusLabel(slide.status)}
//                   </span>

//                   <a
//                     href={slide.href || "#"}
//                     className="inline-flex items-center gap-1 text-sm font-semibold text-white transition-opacity hover:opacity-80"
//                   >
//                     Learn More
//                     <ChevronRight className="h-4 w-4" />
//                   </a>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* NAVIGATION */}
//         {showNavigation && (
//           <>
//             <button
//               type="button"
//               aria-label="المشروع السابق"
//               onClick={() => nudge(-1)}
//               className="absolute left-3 top-1/2 z-[200] -translate-y-1/2 rounded-full bg-white/90 p-2 text-black shadow-md backdrop-blur transition-colors hover:bg-[#2A317A] hover:text-white"
//             >
//               <ChevronLeft className="h-5 w-5" />
//             </button>

//             <button
//               type="button"
//               aria-label="المشروع التالي"
//               onClick={() => nudge(1)}
//               className="absolute right-3 top-1/2 z-[200] -translate-y-1/2 rounded-full bg-white/90 p-2 text-black shadow-md backdrop-blur transition-colors hover:bg-[#2A317A] hover:text-white"
//             >
//               <ChevronRight className="h-5 w-5" />
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProjectsCarousel;

import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function getStatusLabel(status) {
  const s = String(status).toLowerCase();
  return s === "finished" || s === "delivered" ? "Delivered" : "Ongoing";
}

function getStatusClass(status) {
  return getStatusLabel(status) === "Delivered"
    ? "bg-emerald-500 text-white"
    : "bg-amber-400 text-black";
}

export function ProjectsCarousel({
  slides,
  rotate = 38,
  depth = 0.75,
  perspective = 4.5,
  falloff = 0.55,
  fade = 0.12,
  // أكبر وأوضح — landscape احترافي
  cardWidth = "clamp(280px, 42vw, 520px)",
  gap = 0.08,
  backSpread = -0.15,
  backStart = 1,
  backRamp = 2,
  loop = true,
  showNavigation = true,
  autoplay = true,
  autoplayInterval = 3200,
  label = "معرض المشاريع",
  className,
}) {
  const count = slides.length;

  const frameRef = useRef(null);
  const cardRefs = useRef([]);
  const posRef = useRef(0);
  const targetRef = useRef(0);
  const widthRef = useRef(0);
  const rafRef = useRef(null);
  const dragRef = useRef(null);
  const autoplayRef = useRef(null);

  const [selected, setSelected] = useState(0);

  const indexAt = useCallback(
    (pos) => ((Math.round(pos) % count) + count) % count,
    [count]
  );

  const paint = useCallback(() => {
    const width = widthRef.current;
    if (!width) return;

    const pitch = width * (1 + gap);
    const pos = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      let offset = index - pos;

      if (loop) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }

      const distance = Math.abs(offset);
      const ramp = Math.pow(distance, falloff);
      const tilt = Math.min(rotate * ramp, 72) * Math.sign(offset);

      const backProgress = Math.min(
        1,
        Math.max(0, (distance - backStart) / Math.max(0.0001, backRamp))
      );
      const extraSpread =
        backSpread * width * backProgress * Math.sign(offset);

      card.style.transform =
        `translateX(calc(-50% + ${offset * pitch + extraSpread}px)) ` +
        `translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`;

      const edge = loop
        ? Math.min(1, Math.max(0, count / 2 - distance))
        : 1;

      card.style.opacity = String(Math.max(0, 1 - fade * distance) * edge);
      card.style.zIndex = String(100 - Math.round(distance * 10));

      // تمييز الكارت في النص
      if (distance < 0.35) {
        card.style.filter = "brightness(1)";
        card.style.boxShadow =
          "0 25px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08)";
      } else {
        card.style.filter = "brightness(0.72)";
        card.style.boxShadow = "0 12px 30px rgba(0,0,0,0.35)";
      }
    });
  }, [
    backRamp,
    backSpread,
    backStart,
    count,
    depth,
    fade,
    falloff,
    gap,
    loop,
    rotate,
  ]);

  const settle = useCallback(
    (target) => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);

      targetRef.current = target;
      setSelected(indexAt(target));

      const step = () => {
        const remaining = target - posRef.current;
        if (Math.abs(remaining) < 0.0004) {
          posRef.current = target;
          paint();
          rafRef.current = null;
          return;
        }
        posRef.current += remaining * 0.14;
        paint();
        rafRef.current = requestAnimationFrame(step);
      };

      rafRef.current = requestAnimationFrame(step);
    },
    [indexAt, paint]
  );

  const clamp = useCallback(
    (pos) => (loop ? pos : Math.max(0, Math.min(count - 1, pos))),
    [count, loop]
  );

  const nudge = useCallback(
    (by) => settle(clamp(Math.round(targetRef.current) + by)),
    [clamp, settle]
  );

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current !== null) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    if (!autoplay) return;
    stopAutoplay();
    autoplayRef.current = setInterval(() => nudge(1), autoplayInterval);
  }, [autoplay, autoplayInterval, nudge, stopAutoplay]);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  const onPointerDown = (event) => {
    stopAutoplay();
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    targetRef.current = posRef.current;
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      pos: posRef.current,
      v: 0,
      t: performance.now(),
    };
  };

  const onPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;

    const pitch = widthRef.current * (1 + gap);
    if (!pitch) return;

    const now = performance.now();
    const previous = posRef.current;

    posRef.current = clamp(drag.pos - (event.clientX - drag.x) / pitch);
    drag.v =
      ((posRef.current - previous) / Math.max(now - drag.t, 1)) * 1000;
    drag.t = now;

    const index = indexAt(posRef.current);
    if (index !== selected) setSelected(index);
    paint();
  };

  const endDrag = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;
    const carried = Math.max(-2, Math.min(2, drag.v * 0.18));
    settle(clamp(Math.round(posRef.current + carried)));
    startAutoplay();
  };

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const card = cardRefs.current[0];
      if (!card) return;
      widthRef.current = card.offsetWidth;
      paint();
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint]);

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  return (
    <div
      className={cx("w-full", className)}
      style={{ "--cf-card": cardWidth }}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className="relative">
        <div
          ref={frameRef}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              nudge(-1);
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              nudge(1);
            }
          }}
          className="cursor-grab overflow-hidden py-12 outline-none active:cursor-grabbing sm:py-14"
          style={{
            perspective: `calc(var(--cf-card) * ${perspective})`,
            touchAction: "pan-y",
          }}
        >
          {/* stage: نسبة 16/10 احترافية للمشاريع */}
          <div
            className="relative select-none"
            style={{
              height: "calc(var(--cf-card) * 10 / 16)",
              transformStyle: "preserve-3d",
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} من ${count}`}
                className="
                  group absolute left-1/2 top-0
                  aspect-[16/10] overflow-hidden
                  rounded-2xl bg-[#2a2a29]
                  ring-1 ring-white/10
                  will-change-transform
                  transition-[filter,box-shadow] duration-300
                "
                style={{ width: "var(--cf-card)" }}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  draggable={false}
                  className="h-full w-full select-none object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                {/* تدرج سفلي دائم لقراءة أفضل */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* بادج الحالة — ظاهر دايماً */}
                <span
                  className={cx(
                    "absolute right-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm sm:right-4 sm:top-4 sm:text-[11px]",
                    getStatusClass(slide.status)
                  )}
                >
                  {getStatusLabel(slide.status)}
                </span>

                {/* عنوان ظاهر في الأسفل */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                    Project
                  </p>
                  <h3 className="line-clamp-2 text-sm font-bold leading-snug text-white sm:text-base md:text-lg">
                    {slide.title}
                  </h3>
                </div>

                {/* Hover: CTA */}
                {/* <div className="absolute inset-0 flex items-end justify-center bg-black/50 p-5 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                  <a
                    href={slide.href || "#"}
                    className="
                      mb-12 inline-flex items-center gap-2
                      rounded-full bg-white px-5 py-2.5
                      text-sm font-semibold text-[#1a1a1a]
                      shadow-lg transition-transform duration-300
                      hover:scale-105
                      sm:mb-14
                    "
                    onClick={(e) => e.stopPropagation()}
                  >
                    Learn More
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </div> */}
              </div>
            ))}
          </div>
        </div>

        {showNavigation && (
          <>
            <button
              type="button"
              aria-label="المشروع السابق"
              onClick={() => nudge(-1)}
              className="
                absolute left-2 top-1/2 z-[200] -translate-y-1/2
                flex h-11 w-11 items-center justify-center
                rounded-full border border-white/15
                bg-[#3C3C3B]/90 text-white shadow-lg backdrop-blur-md
                transition-colors hover:border-white/30 hover:bg-[#2A317A]
                sm:left-4 sm:h-12 sm:w-12
              "
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="المشروع التالي"
              onClick={() => nudge(1)}
              className="
                absolute right-2 top-1/2 z-[200] -translate-y-1/2
                flex h-11 w-11 items-center justify-center
                rounded-full border border-white/15
                bg-[#3C3C3B]/90 text-white shadow-lg backdrop-blur-md
                transition-colors hover:border-white/30 hover:bg-[#2A317A]
                sm:right-4 sm:h-12 sm:w-12
              "
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Dots */}
        <div className="mt-2 flex items-center justify-center gap-2 pb-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`الذهاب للمشروع ${i + 1}`}
              onClick={() => settle(clamp(i))}
              className={cx(
                "h-1.5 rounded-full transition-all duration-300",
                i === selected
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/30 hover:bg-white/50"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectsCarousel;