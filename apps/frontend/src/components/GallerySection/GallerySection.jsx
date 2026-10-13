// // "use client";

// // import { useCallback, useEffect, useRef, useState } from "react";
// // import gsap from "gsap";

// // /* ============================================================
// //    COLOR PALETTE
// //    ============================================================ */
// // const COLORS = {
// //   navy: "#293A82",
// //   white: "#FFFFFF",
// //   charcoal: "#1E2432",
// // };


// // const galleryImages = [
// //   { id: 1, src: "/2/Projects_25-5-2023-96.png", title: "Foundation Works", tag: "Foundation" },
// //   { id: 2, src: "/2/Projects_25-5-2023-97.png", title: "Structural Frame", tag: "Structure" },
// //   { id: 3, src: "/2/Projects_25-5-2023-98.png", title: "Glass Facade", tag: "Facade" },
// //   { id: 4, src: "/2/4.jfif", title: "Exterior View", tag: "Exterior" },
// //   { id: 5, src: "/2/5.jfif", title: "Architectural Design", tag: "Design" },

// // ];


// // const SCROLL_SPEED = 1;
// // const LERP_IDLE = 0.09;
// // const LERP_DRAG = 0.22;
// // const MOMENTUM_FRICTION = 0.92;
// // const MIN_MOMENTUM = 0.15;

// // const lerp = (a, b, n) => a + (b - a) * n;

// // export default function GallerySection() {
// // const sectionRef = useRef(null);
// // const sliderRef = useRef(null);
// // const stripRef = useRef(null);
// // const cardRefs = useRef([]);
// // const wrapRefs = useRef([]);

// //   const [viewport, setViewport] = useState({ w: 1440, h: 900 });
// //   const [activeIndex, setActiveIndex] = useState(0);
// //   const [lightbox, setLightbox] = useState({ open: false, index: 0 });

// //   const total = galleryImages.length;
// //   const isMobile = viewport.w < 640;
// //   const isTablet = viewport.w >= 640 && viewport.w < 1024;

// //   // كروت أكبر على الديسكتوب، بتصغر تدريجيًا على الشاشات الأصغر
// //   const cardMinW = isMobile ? 70 : 170;
// //   const cardMaxW = isMobile ? 230 : isTablet ? 420 : 560;
// //   const cardMaxH = Math.round(viewport.h * (isMobile ? 0.5 : 0.72));
// //   const cardMinH = isMobile ? 90 : 140;
// //   const step = cardMaxW;

// //   const stateRef = useRef({
// //     current: 0,
// //     target: 0,
// //     velocity: 0,
// //     dragging: false,
// //     lastX: 0,
// //     raf: null,
// //   });

// //   useEffect(() => {
// //     const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
// //     onResize();
// //     window.addEventListener("resize", onResize);
// //     return () => window.removeEventListener("resize", onResize);
// //   }, []);

// //   /* ============================================================
// //      نفس منطق الـ "easing distance" بتاع الريفرنس: كل كارت بيتحسب
// //      عرضه حسب بعده عن أول نقطة في الشاشة، فبيدي إحساس إن الكارت
// //      "بيتكبر" وهو جاي، مش بيقفز فجأة بحجمه الكامل
// //      ============================================================ */
// //   const positionCards = useCallback(
// //     (offset) => {
// //       if (!stripRef.current) return;
// //       const loopWidth = total * step;
// //       const easingDistance = viewport.w * 0.9;

// //       const mapToX = (v) => {
// //         if (v <= 0) return 0;
// //         if (v >= easingDistance) return v - easingDistance / 2;
// //         return (v * v) / (2 * easingDistance);
// //       };

// //       const normalized = ((offset % loopWidth) + loopWidth) % loopWidth;
// //       const startIndex = Math.floor(normalized / step);
// //       const frac = (normalized % step) / step;

// //       for (let i = 0; i < total; i++) {
// //         const idx = (startIndex + i) % total;
// //         const virtualOffset = (i - frac) * step;
// //         const x0 = mapToX(virtualOffset);
// //         const x1 = mapToX(virtualOffset + step);
// //         const width = Math.max(cardMinW, Math.min(cardMaxW, x1 - x0));
// //         const scale = gsap.utils.clamp(0, 1, width / cardMaxW);
// //         const height = cardMinH + scale * (cardMaxH - cardMinH);

// //         const card = cardRefs.current[idx];
// //         const wrap = wrapRefs.current[idx];
// //         if (!card || !wrap) continue;

// //         card.style.transform = `translateX(${x0}px)`;
// //         card.style.zIndex = String(Math.round(scale * 50));
// //         wrap.style.width = `${width}px`;
// //         wrap.style.height = `${height}px`;
// //         wrap.style.opacity = String(gsap.utils.interpolate(0.35, 1, scale));
// //       }
// //     },
// //     [cardMaxH, cardMaxW, cardMinH, cardMinW, step, total, viewport.w]
// //   );

// // const jumpToIndex = useCallback(
// //   (index) => {
// //     const s = stateRef.current;
// //     const loopWidth = total * step;

// //     if (!loopWidth) return;

// //     /*
// //       الـ card الكبيرة في الـ current layout
// //       بتكون بعد 2 positions من startIndex.

// //       لذلك لو عايزين index تكون هي الكبيرة:
// //       لازم نبدأ الـ loop من index - 2.
// //     */
// //     const targetStartIndex =
// //       (index - 2 + total) % total;

// //     const desired = targetStartIndex * step;

// //     const currentNormalized =
// //       ((s.current % loopWidth) + loopWidth) % loopWidth;

// //     let delta = desired - currentNormalized;

// //     // أقصر طريق داخل الـ infinite loop
// //     if (delta > loopWidth / 2) {
// //       delta -= loopWidth;
// //     }

// //     if (delta < -loopWidth / 2) {
// //       delta += loopWidth;
// //     }

// //     // إلغاء أي momentum سابق
// //     s.velocity = 0;

// //     // حرك الـ slider
// //     s.target = s.current + delta;

// //     // الـ thumbnail اللي ضغطنا عليها هي الـ active
// //     setActiveIndex(index);
// //   },
// //   [step, total]
// // );

// //   useEffect(() => {
// //     if (!total) return;
// //     const s = stateRef.current;
// //     const loopWidth = total * step;

// //     const tick = () => {
// //       if (!s.dragging && Math.abs(s.velocity) > MIN_MOMENTUM) {
// //         s.target += s.velocity;
// //         s.velocity *= MOMENTUM_FRICTION;
// //       } else if (!s.dragging) {
// //         s.velocity = 0;
        
// //       }

// //       const lerpFactor = s.dragging ? LERP_DRAG : LERP_IDLE;
// //       s.current = lerp(s.current, s.target, lerpFactor);

// //       if (Math.abs(s.current - s.target) < 0.01) {
// //         const shift = Math.round(s.current / loopWidth) * loopWidth;
// //         s.current -= shift;
// //         s.target -= shift;
// //       }

// //       positionCards(s.current);

// //     //   const normalized = ((s.current % loopWidth) + loopWidth) % loopWidth;
// //     //   const idx = Math.floor(normalized / step) % total;
// //     //   setActiveIndex((prev) => (prev !== idx ? idx : prev));


// //     const normalized =
// //   ((s.current % loopWidth) + loopWidth) % loopWidth;

// // const startIndex =
// //   Math.floor(normalized / step) % total;

// // // الـ card الكبيرة هي بعد صورتين من startIndex
// // const idx = (startIndex + 2) % total;

// // setActiveIndex((prev) =>
// //   prev !== idx ? idx : prev
// // );

// //       s.raf = requestAnimationFrame(tick);
// //     };

// //     // const onWheel = (e) => {
// //     //   s.target += e.deltaY * SCROLL_SPEED;
// //     // };

// // const onWheel = (e) => {
// //   e.preventDefault();
// //   s.target += e.deltaY * SCROLL_SPEED;
// // };
// // const onMouseDown = (e) => {
// //       s.dragging = true;
// //       s.lastX = e.clientX;
// //       s.velocity = 0;
// //     };
// //     const onMouseMove = (e) => {
// //       if (!s.dragging) return;
// //       const delta = -(e.clientX - s.lastX);
// //       s.target += delta;
// //       s.velocity = lerp(s.velocity, delta, 0.5);
// //       s.lastX = e.clientX;
// //     };
// //     const endDrag = () => (s.dragging = false);
// //     const onTouchStart = (e) => {
// //       s.dragging = true;
// //       s.lastX = e.touches[0].clientX;
// //       s.velocity = 0;
// //     };
// //     const onTouchMove = (e) => {
// //       if (!s.dragging) return;
// //       const delta = -(e.touches[0].clientX - s.lastX);
// //       s.target += delta;
// //       s.velocity = lerp(s.velocity, delta, 0.5);
// //       s.lastX = e.touches[0].clientX;
// //     };

// // // const el = sectionRef.current;

// // // el?.addEventListener("wheel", onWheel, { passive: false });
// // //     el?.addEventListener("mousedown", onMouseDown);
// // //     window.addEventListener("mousemove", onMouseMove);
// // //     window.addEventListener("mouseup", endDrag);
// // //     el?.addEventListener("touchstart", onTouchStart, { passive: true });
// // //     el?.addEventListener("touchmove", onTouchMove, { passive: true });



// // const el = sectionRef.current;
// // const slider = sliderRef.current;

// // slider?.addEventListener("wheel", onWheel, { passive: false });
// // el?.addEventListener("mousedown", onMouseDown);
// // window.addEventListener("mousemove", onMouseMove);
// // window.addEventListener("mouseup", endDrag);
// // el?.addEventListener("touchstart", onTouchStart, { passive: true });
// // el?.addEventListener("touchmove", onTouchMove, { passive: true });
// //     window.addEventListener("touchend", endDrag);

// //     s.raf = requestAnimationFrame(tick);

// //     return () => {
// //       cancelAnimationFrame(s.raf);
// //     //   el?.removeEventListener("wheel", onWheel);

// //     slider?.removeEventListener("wheel", onWheel);
// //       el?.removeEventListener("mousedown", onMouseDown);
// //       window.removeEventListener("mousemove", onMouseMove);
// //       window.removeEventListener("mouseup", endDrag);
// //       el?.removeEventListener("touchstart", onTouchStart);
// //       el?.removeEventListener("touchmove", onTouchMove);
// //       window.removeEventListener("touchend", endDrag);
// //     };
// //   }, [positionCards, step, total]);

// //   // ESC يقفل الـ lightbox
// //   useEffect(() => {
// //     if (!lightbox.open) return;
// //     const onKey = (e) => {
// //       if (e.key === "Escape") setLightbox({ open: false, index: 0 });
// //       if (e.key === "ArrowRight") setLightbox((p) => ({ open: true, index: (p.index + 1) % total }));
// //       if (e.key === "ArrowLeft") setLightbox((p) => ({ open: true, index: (p.index - 1 + total) % total }));
// //     };
// //     window.addEventListener("keydown", onKey);
// //     return () => window.removeEventListener("keydown", onKey);
// //   }, [lightbox.open, total]);

// //   return (
// //     <section
// //   ref={sectionRef}
// //   className="relative w-full"
// //   style={{ background: COLORS.white }}
// // >
// //       {/* Section heading */}
// //       <div className="px-6 pt-20 pb-8 text-center md:pt-28">
// //         <span
// //           className="inline-block text-xs font-semibold tracking-[0.35em] uppercase"
// //           style={{ color: COLORS.navy }}
// //         >
// //           The Result, In Frames
// //         </span>
// //         <h2
// //           className="mt-3 text-4xl font-bold tracking-tight md:text-6xl"
// //           style={{ color: COLORS.charcoal }}
// //         >
// //           Project Gallery
// //         </h2>
// //         <p className="mx-auto mt-4 max-w-md text-sm" style={{ color: COLORS.charcoal, opacity: 0.7 }}>
// //           Scroll, drag, or use the thumbnails below — click any photo to zoom in.
// //         </p>
// //         <div className="mx-auto mt-5 h-[3px] w-20 rounded-full" style={{ background: COLORS.navy }} />
// //       </div>

// //       {/* ===================== MAIN ZOOM-SCROLL STRIP ===================== */}
// //       {/* <div
// //         className="relative w-full overflow-hidden select-none"
// //         style={{ height: isMobile ? "60vh" : "78vh", background: COLORS.charcoal, cursor: "grab" }}
// //       > */}

// //       <div
// //   ref={sliderRef}
// //   className="relative w-full overflow-hidden select-none"
// //   style={{
// //     height: isMobile ? "60vh" : "78vh",
// //     background: COLORS.charcoal,
// //     cursor: "grab",
// //   }}
// // >
// //         <div ref={stripRef} className="absolute inset-0">
// //           {galleryImages.map((img, i) => (
// //             <div
// //               key={img.id}
// //               ref={(el) => (cardRefs.current[i] = el)}
// //               className="absolute bottom-0 left-0 will-change-transform"
// //             >
// //               <div
// //                 ref={(el) => (wrapRefs.current[i] = el)}
// //                 onClick={() => setLightbox({ open: true, index: i })}
// //                 className="group relative cursor-zoom-in overflow-hidden rounded-xl shadow-[0_20px_45px_rgba(0,0,0,0.45)]"
// //                 style={{ width: cardMinW, height: cardMaxH }}
// //               >
// //                 <img
// //                   src={img.src}
// //                   alt={img.title}
// //                   draggable="false"
// //                   className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
// //                 />
// //                 <div
// //                   className="absolute inset-0"
// //                   style={{ background: `linear-gradient(to top, ${COLORS.navy}E6 0%, ${COLORS.navy}00 55%)` }}
// //                 />
// //                 <div className="absolute bottom-0 left-0 right-0 p-4">
// //                   <span
// //                     className="inline-block rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide"
// //                     style={{ background: COLORS.white, color: COLORS.navy }}
// //                   >
// //                     {img.tag}
// //                   </span>
// //                   <h3 className="mt-2 text-base font-semibold text-white md:text-lg">{img.title}</h3>
// //                 </div>
// //                 {/* أيقونة zoom بتظهر بالهوفر عشان توضح إن الصورة قابلة للتكبير */}
// //                 <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
// //                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy} strokeWidth="2">
// //                     <circle cx="11" cy="11" r="7" />
// //                     <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
// //                   </svg>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* ===================== THUMBNAIL STRIP (jump to any photo) ===================== */}
// //       <div className="px-4 py-8 sm:px-8" style={{ background: COLORS.white }}>
// //         <div className="no-scrollbar mx-auto flex max-w-5xl gap-3 overflow-x-auto">
// //           {galleryImages.map((img, i) => (
// //             <button
// //               key={img.id}
// //               onClick={() => jumpToIndex(i)}
// //               className="relative flex-shrink-0 overflow-hidden rounded-lg transition-all duration-300"
// //               style={{
// //                 width: isMobile ? 56 : 84,
// //                 height: isMobile ? 56 : 64,
// //                 outline: activeIndex === i ? `2px solid ${COLORS.navy}` : "2px solid transparent",
// //                 outlineOffset: "2px",
// //                 opacity: activeIndex === i ? 1 : 0.6,
// //               }}
// //               aria-label={`Go to ${img.title}`}
// //             >
// //               <img src={img.src} alt={img.title} className="h-full w-full object-cover" draggable="false" />
// //             </button>
// //           ))}
// //         </div>
// //       </div>

// //       {/* ===================== LIGHTBOX (click to zoom) ===================== */}
// //       {lightbox.open && (
// //         <div
// //           className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10"
// //           style={{ background: `${COLORS.charcoal}F2` }}
// //           onClick={() => setLightbox({ open: false, index: 0 })}
// //         >
// //           <button
// //             onClick={() => setLightbox({ open: false, index: 0 })}
// //             className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors"
// //             style={{ background: COLORS.navy }}
// //             aria-label="Close"
// //           >
// //             ✕
// //           </button>

// //           <button
// //             onClick={(e) => {
// //               e.stopPropagation();
// //               setLightbox((p) => ({ open: true, index: (p.index - 1 + total) % total }));
// //             }}
// //             className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white sm:left-6"
// //             style={{ background: `${COLORS.navy}CC` }}
// //             aria-label="Previous"
// //           >
// //             ‹
// //           </button>

// //           <img
// //             src={galleryImages[lightbox.index].src}
// //             alt={galleryImages[lightbox.index].title}
// //             onClick={(e) => e.stopPropagation()}
// //             className="max-h-[85vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
// //           />

// //           <button
// //             onClick={(e) => {
// //               e.stopPropagation();
// //               setLightbox((p) => ({ open: true, index: (p.index + 1) % total }));
// //             }}
// //             className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white sm:right-6"
// //             style={{ background: `${COLORS.navy}CC` }}
// //             aria-label="Next"
// //           >
// //             ›
// //           </button>

// //           <div
// //             className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs font-medium text-white"
// //             style={{ background: `${COLORS.navy}CC` }}
// //           >
// //             {galleryImages[lightbox.index].title} — {lightbox.index + 1} / {total}
// //           </div>
// //         </div>
// //       )}
// //     </section>
// //   );
// // }

// "use client";

// import { useCallback, useEffect, useRef, useState } from "react";
// import gsap from "gsap";

// /* ============================================================
//    COLOR PALETTE  (أبيض / أسود / #2A317A / #3C3C3B)
//    ============================================================ */
// const COLORS = {
//   white: "#FFFFFF",
//   black: "#000000",
//   navy: "#2A317A",
//   charcoal: "#3C3C3B",
// };

// const galleryImages = [
//   { id: 1, src: "/2/Projects_25-5-2023-96.png", title: "Foundation Works", tag: "Foundation" },
//   { id: 2, src: "/2/Projects_25-5-2023-97.png", title: "Structural Frame", tag: "Structure" },
//   { id: 3, src: "/2/Projects_25-5-2023-98.png", title: "Glass Facade", tag: "Facade" },
//   { id: 4, src: "/2/4.jfif", title: "Exterior View", tag: "Exterior" },
//   { id: 5, src: "/2/5.jfif", title: "Architectural Design", tag: "Design" },
// ];

// const SCROLL_SPEED = 1;
// const LERP_IDLE = 0.09;
// const LERP_DRAG = 0.22;
// const MOMENTUM_FRICTION = 0.92;
// const MIN_MOMENTUM = 0.15;

// const lerp = (a, b, n) => a + (b - a) * n;

// export default function GallerySection() {
//   const sectionRef = useRef(null);
//   const sliderRef = useRef(null);
//   const stripRef = useRef(null);
//   const cardRefs = useRef([]);
//   const wrapRefs = useRef([]);

//   const [viewport, setViewport] = useState({ w: 1440, h: 900 });
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [lightbox, setLightbox] = useState({ open: false, index: 0 });

//   const total = galleryImages.length;
//   const isMobile = viewport.w < 640;
//   const isTablet = viewport.w >= 640 && viewport.w < 1024;

//   // نفس المقاسات الأصلية بالظبط
//   const cardMinW = isMobile ? 70 : 170;
//   const cardMaxW = isMobile ? 230 : isTablet ? 420 : 560;
//   const cardMaxH = Math.round(viewport.h * (isMobile ? 0.5 : 0.72));
//   const cardMinH = isMobile ? 90 : 140;
//   const step = cardMaxW;
//   const easingDistance = viewport.w * 0.9;

//   /* ============================================================
//      الحل للفراغ اللي على اليمين:
//      آخر كارت بينتهي عند x = (slots - 1) * step - easingDistance / 2
//      في أسوأ حالة، ولازم ده يكون >= عرض الشاشة. لو الصور (٥) مش
//      كفاية، بنكرر نفس الصور كـ "slots" إضافية (مضاعفات عدد الصور
//      عشان ترتيب الصور يفضل متسلسل صح عند اللف).
//      مقاسات الكروت نفسها ما اتغيرتش.
//      ============================================================ */
//   const neededSlots = Math.ceil((viewport.w + easingDistance / 2) / step) + 2;
//   const slotCount = total * Math.ceil(Math.max(neededSlots, total) / total);
//   const slots = Array.from({ length: slotCount }, (_, k) => galleryImages[k % total]);

//   const stateRef = useRef({
//     current: 0,
//     target: 0,
//     velocity: 0,
//     dragging: false,
//     lastX: 0,
//     raf: null,
//   });

//   useEffect(() => {
//     const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
//     onResize();
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   const positionCards = useCallback(
//     (offset) => {
//       if (!stripRef.current) return;
//       const loopWidth = slotCount * step;

//       const mapToX = (v) => {
//         if (v <= 0) return 0;
//         if (v >= easingDistance) return v - easingDistance / 2;
//         return (v * v) / (2 * easingDistance);
//       };

//       const normalized = ((offset % loopWidth) + loopWidth) % loopWidth;
//       const startIndex = Math.floor(normalized / step);
//       const frac = (normalized % step) / step;

//       for (let i = 0; i < slotCount; i++) {
//         const idx = (startIndex + i) % slotCount;
//         const virtualOffset = (i - frac) * step;
//         const x0 = mapToX(virtualOffset);
//         const x1 = mapToX(virtualOffset + step);
//         const width = Math.max(cardMinW, Math.min(cardMaxW, x1 - x0));
//         const scale = gsap.utils.clamp(0, 1, width / cardMaxW);
//         const height = cardMinH + scale * (cardMaxH - cardMinH);

//         const card = cardRefs.current[idx];
//         const wrap = wrapRefs.current[idx];
//         if (!card || !wrap) continue;

//         card.style.transform = `translateX(${x0}px)`;
//         card.style.zIndex = String(Math.round(scale * 50));
//         wrap.style.width = `${width}px`;
//         wrap.style.height = `${height}px`;
//         wrap.style.opacity = String(gsap.utils.interpolate(0.35, 1, scale));
//       }
//     },
//     [cardMaxH, cardMaxW, cardMinH, cardMinW, easingDistance, slotCount, step]
//   );

//   const jumpToIndex = useCallback(
//     (index) => {
//       const s = stateRef.current;
//       const loopWidth = slotCount * step;
//       if (!loopWidth) return;

//       // الكارت الكبيرة بتكون بعد 2 positions من startIndex
//       const targetStartIndex = (index - 2 + slotCount) % slotCount;
//       const desired = targetStartIndex * step;
//       const currentNormalized = ((s.current % loopWidth) + loopWidth) % loopWidth;

//       let delta = desired - currentNormalized;
//       // أقصر طريق داخل الـ infinite loop
//       if (delta > loopWidth / 2) delta -= loopWidth;
//       if (delta < -loopWidth / 2) delta += loopWidth;

//       s.velocity = 0;
//       s.target = s.current + delta;
//       setActiveIndex(index);
//     },
//     [slotCount, step]
//   );

//   useEffect(() => {
//     if (!total) return;
//     const s = stateRef.current;
//     const loopWidth = slotCount * step;

//     const tick = () => {
//       if (!s.dragging && Math.abs(s.velocity) > MIN_MOMENTUM) {
//         s.target += s.velocity;
//         s.velocity *= MOMENTUM_FRICTION;
//       } else if (!s.dragging) {
//         s.velocity = 0;
//       }

//       const lerpFactor = s.dragging ? LERP_DRAG : LERP_IDLE;
//       s.current = lerp(s.current, s.target, lerpFactor);

//       if (Math.abs(s.current - s.target) < 0.01) {
//         const shift = Math.round(s.current / loopWidth) * loopWidth;
//         s.current -= shift;
//         s.target -= shift;
//       }

//       positionCards(s.current);

//       const normalized = ((s.current % loopWidth) + loopWidth) % loopWidth;
//       const startIndex = Math.floor(normalized / step) % slotCount;
//       // الكارت الكبيرة هي بعد صورتين من startIndex (وبنرجّعها لرقم الصورة الأصلي)
//       const idx = ((startIndex + 2) % slotCount) % total;
//       setActiveIndex((prev) => (prev !== idx ? idx : prev));

//       s.raf = requestAnimationFrame(tick);
//     };

//     const onWheel = (e) => {
//       e.preventDefault();
//       s.target += e.deltaY * SCROLL_SPEED;
//     };
//     const onMouseDown = (e) => {
//       s.dragging = true;
//       s.lastX = e.clientX;
//       s.velocity = 0;
//     };
//     const onMouseMove = (e) => {
//       if (!s.dragging) return;
//       const delta = -(e.clientX - s.lastX);
//       s.target += delta;
//       s.velocity = lerp(s.velocity, delta, 0.5);
//       s.lastX = e.clientX;
//     };
//     const endDrag = () => (s.dragging = false);
//     const onTouchStart = (e) => {
//       s.dragging = true;
//       s.lastX = e.touches[0].clientX;
//       s.velocity = 0;
//     };
//     const onTouchMove = (e) => {
//       if (!s.dragging) return;
//       const delta = -(e.touches[0].clientX - s.lastX);
//       s.target += delta;
//       s.velocity = lerp(s.velocity, delta, 0.5);
//       s.lastX = e.touches[0].clientX;
//     };

//     const el = sectionRef.current;
//     const slider = sliderRef.current;

//     slider?.addEventListener("wheel", onWheel, { passive: false });
//     el?.addEventListener("mousedown", onMouseDown);
//     window.addEventListener("mousemove", onMouseMove);
//     window.addEventListener("mouseup", endDrag);
//     el?.addEventListener("touchstart", onTouchStart, { passive: true });
//     el?.addEventListener("touchmove", onTouchMove, { passive: true });
//     window.addEventListener("touchend", endDrag);

//     s.raf = requestAnimationFrame(tick);

//     return () => {
//       cancelAnimationFrame(s.raf);
//       slider?.removeEventListener("wheel", onWheel);
//       el?.removeEventListener("mousedown", onMouseDown);
//       window.removeEventListener("mousemove", onMouseMove);
//       window.removeEventListener("mouseup", endDrag);
//       el?.removeEventListener("touchstart", onTouchStart);
//       el?.removeEventListener("touchmove", onTouchMove);
//       window.removeEventListener("touchend", endDrag);
//     };
//   }, [positionCards, slotCount, step, total]);

//   // ESC يقفل الـ lightbox
//   useEffect(() => {
//     if (!lightbox.open) return;
//     const onKey = (e) => {
//       if (e.key === "Escape") setLightbox({ open: false, index: 0 });
//       if (e.key === "ArrowRight") setLightbox((p) => ({ open: true, index: (p.index + 1) % total }));
//       if (e.key === "ArrowLeft") setLightbox((p) => ({ open: true, index: (p.index - 1 + total) % total }));
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [lightbox.open, total]);

//   return (
//     <section ref={sectionRef} className="relative w-full" style={{ background: COLORS.white }}>
//       {/* Section heading */}
//       <div className="px-6 pt-20 pb-8 text-center md:pt-28">
//         <span
//           className="inline-block text-xs font-semibold tracking-[0.35em] uppercase"
//           style={{ color: COLORS.navy }}
//         >
//           The Result, In Frames
//         </span>
//         <h2
//           className="mt-3 text-4xl font-bold tracking-tight md:text-6xl"
//           style={{ color: COLORS.black }}
//         >
//           Project Gallery
//         </h2>
//         <p className="mx-auto mt-4 max-w-md text-sm" style={{ color: COLORS.charcoal }}>
//           Scroll, drag, or use the thumbnails below — click any photo to zoom in.
//         </p>
//         <div className="mx-auto mt-5 h-[3px] w-20 rounded-full" style={{ background: COLORS.navy }} />
//       </div>

//       {/* ===================== MAIN ZOOM-SCROLL STRIP ===================== */}
//       <div
//         ref={sliderRef}
//         className="relative w-full overflow-hidden select-none"
//         style={{
//           height: isMobile ? "60vh" : "78vh",
//           background: COLORS.black,
//           cursor: "grab",
//         }}
//       >
//         <div ref={stripRef} className="absolute inset-0">
//           {slots.map((img, i) => (
//             <div
//               key={`${img.id}-${i}`}
//               ref={(el) => (cardRefs.current[i] = el)}
//               className="absolute bottom-0 left-0 will-change-transform"
//             >
//               <div
//                 ref={(el) => (wrapRefs.current[i] = el)}
//                 onClick={() => setLightbox({ open: true, index: i % total })}
//                 className="group relative cursor-zoom-in overflow-hidden rounded-xl shadow-[0_20px_45px_rgba(0,0,0,0.45)]"
//                 style={{ width: cardMinW, height: cardMaxH }}
//               >
//                 <img
//                   src={img.src}
//                   alt={img.title}
//                   draggable="false"
//                   className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//                 <div
//                   className="absolute inset-0"
//                   style={{ background: `linear-gradient(to top, ${COLORS.navy}E6 0%, ${COLORS.navy}00 55%)` }}
//                 />
//                 <div className="absolute bottom-0 left-0 right-0 p-4">
//                   <span
//                     className="inline-block rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide"
//                     style={{ background: COLORS.white, color: COLORS.navy }}
//                   >
//                     {img.tag}
//                   </span>
//                   <h3 className="mt-2 text-base font-semibold text-white md:text-lg">{img.title}</h3>
//                 </div>
//                 {/* أيقونة zoom بتظهر بالهوفر */}
//                 <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy} strokeWidth="2">
//                     <circle cx="11" cy="11" r="7" />
//                     <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ===================== THUMBNAIL STRIP ===================== */}
//       <div className="px-4 py-8 sm:px-8" style={{ background: COLORS.white }}>
//         <div className="no-scrollbar mx-auto flex max-w-5xl gap-3 overflow-x-auto">
//           {galleryImages.map((img, i) => (
//             <button
//               key={img.id}
//               onClick={() => jumpToIndex(i)}
//               className="relative flex-shrink-0 overflow-hidden rounded-lg transition-all duration-300"
//               style={{
//                 width: isMobile ? 56 : 84,
//                 height: isMobile ? 56 : 64,
//                 outline: activeIndex === i ? `2px solid ${COLORS.navy}` : "2px solid transparent",
//                 outlineOffset: "2px",
//                 opacity: activeIndex === i ? 1 : 0.6,
//               }}
//               aria-label={`Go to ${img.title}`}
//             >
//               <img src={img.src} alt={img.title} className="h-full w-full object-cover" draggable="false" />
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ===================== LIGHTBOX ===================== */}
//       {lightbox.open && (
//         <div
//           className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10"
//           style={{ background: `${COLORS.black}F2` }}
//           onClick={() => setLightbox({ open: false, index: 0 })}
//         >
//           <button
//             onClick={() => setLightbox({ open: false, index: 0 })}
//             className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors"
//             style={{ background: COLORS.navy }}
//             aria-label="Close"
//           >
//             ✕
//           </button>

//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setLightbox((p) => ({ open: true, index: (p.index - 1 + total) % total }));
//             }}
//             className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white sm:left-6"
//             style={{ background: COLORS.navy }}
//             aria-label="Previous"
//           >
//             ‹
//           </button>

//           <img
//             src={galleryImages[lightbox.index].src}
//             alt={galleryImages[lightbox.index].title}
//             onClick={(e) => e.stopPropagation()}
//             className="max-h-[85vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
//           />

//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setLightbox((p) => ({ open: true, index: (p.index + 1) % total }));
//             }}
//             className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white sm:right-6"
//             style={{ background: COLORS.navy }}
//             aria-label="Next"
//           >
//             ›
//           </button>

//           <div
//             className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs font-medium text-white"
//             style={{ background: COLORS.navy }}
//           >
//             {galleryImages[lightbox.index].title} — {lightbox.index + 1} / {total}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }


"use client";

import { useCallback, useEffect, useRef, useState } from "react";



import gsap from "gsap";

const COLORS = {
  white: "#FFFFFF",
  black: "#000000",
  navy: "#2A317A",
  charcoal: "#3C3C3B",
};

const galleryImages = [
  { id: 1, src: "/2/Projects_25-5-2023-96.png", title: "Foundation Works", tag: "Foundation" },
  { id: 2, src: "/2/Projects_25-5-2023-97.png", title: "Structural Frame", tag: "Structure" },
  { id: 3, src: "/2/Projects_25-5-2023-98.png", title: "Glass Facade", tag: "Facade" },
  { id: 4, src: "/2/4.jfif", title: "Exterior View", tag: "Exterior" },
  { id: 5, src: "/2/5.jfif", title: "Architectural Design", tag: "Design" },
];

const SCROLL_SPEED = 1;
const LERP_IDLE = 0.09;
const LERP_DRAG = 0.22;
const MOMENTUM_FRICTION = 0.92;
const MIN_MOMENTUM = 0.15;

const lerp = (a, b, n) => a + (b - a) * n;

export default function GallerySection() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const stripRef = useRef(null);
  const cardRefs = useRef([]);
  const wrapRefs = useRef([]);

  const [viewport, setViewport] = useState({ w: 1440, h: 900 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  const total = galleryImages.length;
  const isMobile = viewport.w < 640;
  const isTablet = viewport.w >= 640 && viewport.w < 1024;

  // نفس المقاسات الأصلية بالظبط
  const cardMinW = isMobile ? 70 : 170;
  const cardMaxW = isMobile ? 230 : isTablet ? 420 : 560;
  const cardMaxH = Math.round(viewport.h * (isMobile ? 0.5 : 0.72));
  const cardMinH = isMobile ? 90 : 140;
  const step = cardMaxW;
  const easingDistance = viewport.w * 0.9;
  // ارتفاع الـ strip بالبكسل (نفس قيمة 60vh / 78vh اللي في الـ style تحت)
  const stripH = Math.round(viewport.h * (isMobile ? 0.6 : 0.78));

  /* ============================================================
     الحل للفراغ اللي على اليمين:
     آخر كارت بينتهي عند x = (slots - 1) * step - easingDistance / 2
     في أسوأ حالة، ولازم ده يكون >= عرض الشاشة. لو الصور (٥) مش
     كفاية، بنكرر نفس الصور كـ "slots" إضافية (مضاعفات عدد الصور
     عشان ترتيب الصور يفضل متسلسل صح عند اللف).
     مقاسات الكروت نفسها ما اتغيرتش.
     ============================================================ */
  const neededSlots = Math.ceil((viewport.w + easingDistance / 2) / step) + 2;
  const slotCount = total * Math.ceil(Math.max(neededSlots, total) / total);
  const slots = Array.from({ length: slotCount }, (_, k) => galleryImages[k % total]);

  const stateRef = useRef({
    current: 0,
    target: 0,
    velocity: 0,
    dragging: false,
    lastX: 0,
    raf: null,
  });

  useEffect(() => {
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const positionCards = useCallback(
    (offset) => {
      if (!stripRef.current) return;
      const loopWidth = slotCount * step;

      const mapToX = (v) => {
        if (v <= 0) return 0;
        if (v >= easingDistance) return v - easingDistance / 2;
        return (v * v) / (2 * easingDistance);
      };

      const normalized = ((offset % loopWidth) + loopWidth) % loopWidth;
      const startIndex = Math.floor(normalized / step);
      const frac = (normalized % step) / step;

      for (let i = 0; i < slotCount; i++) {
        const idx = (startIndex + i) % slotCount;
        const virtualOffset = (i - frac) * step;
        const x0 = mapToX(virtualOffset);
        const x1 = mapToX(virtualOffset + step);
        const width = Math.max(cardMinW, Math.min(cardMaxW, x1 - x0));
        const scale = gsap.utils.clamp(0, 1, width / cardMaxW);
        const baseHeight = cardMinH + scale * (cardMaxH - cardMinH);

        /*
          أول كارت من اليمين (اللي بيبدأ من w - step وبعدين) بياخد ارتفاع
          الـ strip كله، فالـ background ما يظهرش فوقه. الانتقال تدريجي:
          الكارت اللي قبله بيرجع لارتفاعه العادي بالراحة وهو بيتحرك شمال،
          فمفيش قفزة لما كارت جديد يدخل من اليمين.
        */
        const rightBoost =
          gsap.utils.clamp(0, 1, (x0 - (viewport.w - 2 * step)) / step) * scale;
        const height = gsap.utils.interpolate(baseHeight, stripH, rightBoost);

        const card = cardRefs.current[idx];
        const wrap = wrapRefs.current[idx];
        if (!card || !wrap) continue;

        card.style.transform = `translateX(${x0}px)`;
        card.style.zIndex = String(Math.round(scale * 50));
        wrap.style.width = `${width}px`;
        wrap.style.height = `${height}px`;
        wrap.style.opacity = String(gsap.utils.interpolate(0.35, 1, scale));
      }
    },
    [cardMaxH, cardMaxW, cardMinH, cardMinW, easingDistance, slotCount, step, stripH, viewport.w]
  );

  const jumpToIndex = useCallback(
    (index) => {
      const s = stateRef.current;
      const loopWidth = slotCount * step;
      if (!loopWidth) return;

      // الكارت الكبيرة بتكون بعد 2 positions من startIndex
      const targetStartIndex = (index - 2 + slotCount) % slotCount;
      const desired = targetStartIndex * step;
      const currentNormalized = ((s.current % loopWidth) + loopWidth) % loopWidth;

      let delta = desired - currentNormalized;
      // أقصر طريق داخل الـ infinite loop
      if (delta > loopWidth / 2) delta -= loopWidth;
      if (delta < -loopWidth / 2) delta += loopWidth;

      s.velocity = 0;
      s.target = s.current + delta;
      setActiveIndex(index);
    },
    [slotCount, step]
  );

  useEffect(() => {
    if (!total) return;
    const s = stateRef.current;
    const loopWidth = slotCount * step;

    const tick = () => {
      if (!s.dragging && Math.abs(s.velocity) > MIN_MOMENTUM) {
        s.target += s.velocity;
        s.velocity *= MOMENTUM_FRICTION;
      } else if (!s.dragging) {
        s.velocity = 0;
      }

      const lerpFactor = s.dragging ? LERP_DRAG : LERP_IDLE;
      s.current = lerp(s.current, s.target, lerpFactor);

      if (Math.abs(s.current - s.target) < 0.01) {
        const shift = Math.round(s.current / loopWidth) * loopWidth;
        s.current -= shift;
        s.target -= shift;
      }

      positionCards(s.current);

      const normalized = ((s.current % loopWidth) + loopWidth) % loopWidth;
      const startIndex = Math.floor(normalized / step) % slotCount;
      // الكارت الكبيرة هي بعد صورتين من startIndex (وبنرجّعها لرقم الصورة الأصلي)
      const idx = ((startIndex + 2) % slotCount) % total;
      setActiveIndex((prev) => (prev !== idx ? idx : prev));

      s.raf = requestAnimationFrame(tick);
    };

    const onWheel = (e) => {
      e.preventDefault();
      s.target += e.deltaY * SCROLL_SPEED;
    };
    const onMouseDown = (e) => {
      s.dragging = true;
      s.lastX = e.clientX;
      s.velocity = 0;
    };
    const onMouseMove = (e) => {
      if (!s.dragging) return;
      const delta = -(e.clientX - s.lastX);
      s.target += delta;
      s.velocity = lerp(s.velocity, delta, 0.5);
      s.lastX = e.clientX;
    };
    const endDrag = () => (s.dragging = false);
    const onTouchStart = (e) => {
      s.dragging = true;
      s.lastX = e.touches[0].clientX;
      s.velocity = 0;
    };
    const onTouchMove = (e) => {
      if (!s.dragging) return;
      const delta = -(e.touches[0].clientX - s.lastX);
      s.target += delta;
      s.velocity = lerp(s.velocity, delta, 0.5);
      s.lastX = e.touches[0].clientX;
    };

    const el = sectionRef.current;
    const slider = sliderRef.current;

    slider?.addEventListener("wheel", onWheel, { passive: false });
    el?.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", endDrag);
    el?.addEventListener("touchstart", onTouchStart, { passive: true });
    el?.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", endDrag);

    s.raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(s.raf);
      slider?.removeEventListener("wheel", onWheel);
      el?.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", endDrag);
      el?.removeEventListener("touchstart", onTouchStart);
      el?.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", endDrag);
    };
  }, [positionCards, slotCount, step, total]);

  // ESC يقفل الـ lightbox
  useEffect(() => {
    if (!lightbox.open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox({ open: false, index: 0 });
      if (e.key === "ArrowRight") setLightbox((p) => ({ open: true, index: (p.index + 1) % total }));
      if (e.key === "ArrowLeft") setLightbox((p) => ({ open: true, index: (p.index - 1 + total) % total }));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox.open, total]);

  return (
    <section ref={sectionRef} className="relative w-full" style={{ background: COLORS.white }}>
      {/* Section heading */}
      <div className="px-6 pt-20 pb-8 text-center md:pt-28">
        <span
          className="inline-block text-xs font-semibold tracking-[0.35em] uppercase"
          style={{ color: COLORS.navy }}
        >
          The Result, In Frames
        </span>
        <h2
          className="mt-3 text-4xl font-bold tracking-tight md:text-6xl"
          style={{ color: COLORS.black }}
        >
          Project Gallery
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm" style={{ color: COLORS.charcoal }}>
          Scroll, drag, or use the thumbnails below — click any photo to zoom in.
        </p>
        <div className="mx-auto mt-5 h-[3px] w-20 rounded-full" style={{ background: COLORS.navy }} />
      </div>

      {/* ===================== MAIN ZOOM-SCROLL STRIP ===================== */}
      <div
        ref={sliderRef}
        className="relative w-full overflow-hidden select-none"
        style={{
          height: isMobile ? "60vh" : "78vh",
          background: COLORS.charcoal,
          cursor: "grab",
        }}
      >
        <div ref={stripRef} className="absolute inset-0">
          {slots.map((img, i) => (
            <div
              key={`${img.id}-${i}`}
              ref={(el) => (cardRefs.current[i] = el)}
              className="absolute bottom-0 left-0 will-change-transform"
            >
              <div
                ref={(el) => (wrapRefs.current[i] = el)}
                onClick={() => setLightbox({ open: true, index: i % total })}
                className="group relative cursor-zoom-in overflow-hidden rounded-xl shadow-[0_20px_45px_rgba(0,0,0,0.45)]"
                style={{ width: cardMinW, height: cardMaxH }}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  draggable="false"
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, ${COLORS.navy}E6 0%, ${COLORS.navy}00 55%)` }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span
                    className="inline-block rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide"
                    style={{ background: COLORS.white, color: COLORS.navy }}
                  >
                    {img.tag}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-white md:text-lg">{img.title}</h3>
                </div>
                {/* أيقونة zoom بتظهر بالهوفر */}
                <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.navy} strokeWidth="2">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===================== THUMBNAIL STRIP ===================== */}
      <div className="px-4 py-8 sm:px-8" style={{ background: COLORS.white }}>
        <div className="no-scrollbar mx-auto flex max-w-5xl gap-3 overflow-x-auto">
          {galleryImages.map((img, i) => (
            <button
              key={img.id}
              onClick={() => jumpToIndex(i)}
              className="relative flex-shrink-0 overflow-hidden rounded-lg transition-all duration-300"
              style={{
                width: isMobile ? 56 : 84,
                height: isMobile ? 56 : 64,
                outline: activeIndex === i ? `2px solid ${COLORS.navy}` : "2px solid transparent",
                outlineOffset: "2px",
                opacity: activeIndex === i ? 1 : 0.6,
              }}
              aria-label={`Go to ${img.title}`}
            >
              <img src={img.src} alt={img.title} className="h-full w-full object-cover" draggable="false" />
            </button>
          ))}
        </div>
      </div>

      {/* ===================== LIGHTBOX ===================== */}
      {lightbox.open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10"
          style={{ background: `${COLORS.black}F2` }}
          onClick={() => setLightbox({ open: false, index: 0 })}
        >
          <button
            onClick={() => setLightbox({ open: false, index: 0 })}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors"
            style={{ background: COLORS.navy }}
            aria-label="Close"
          >
            ✕
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((p) => ({ open: true, index: (p.index - 1 + total) % total }));
            }}
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white sm:left-6"
            style={{ background: COLORS.navy }}
            aria-label="Previous"
          >
            ‹
          </button>

          <img
            src={galleryImages[lightbox.index].src}
            alt={galleryImages[lightbox.index].title}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((p) => ({ open: true, index: (p.index + 1) % total }));
            }}
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white sm:right-6"
            style={{ background: COLORS.navy }}
            aria-label="Next"
          >
            ›
          </button>

          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs font-medium text-white"
            style={{ background: COLORS.navy }}
          >
            {galleryImages[lightbox.index].title} — {lightbox.index + 1} / {total}
          </div>
        </div>
      )}
    </section>
  );
}