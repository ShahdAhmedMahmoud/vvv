// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { flushSync } from "react-dom";
// import gsap from "gsap";
// import { CustomEase } from "gsap/CustomEase";
// import { ArrowLeft, ArrowRight } from "lucide-react";

// gsap.registerPlugin(CustomEase);
// const prefersReducedMotion = () =>
//   typeof window !== "undefined" &&
//   window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;
// //1
// // type SlideItem = { image: string; text: string };

// type SlideItem = {
//   type: "image" | "video";
//   src: string;
//   text: string;
// };
// type CSSLength = string | number;
// //2
// // صور مشاريع (استبدليها بصور حقيقية من مشاريعكم لو متاحة)
// // const ITEMS: SlideItem[] = [
// //   {
// //     image:
// //       "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop",
// //     text: "مشاريعنا",
// //   },
// //   {
// //     image:
// //       "https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1200&auto=format&fit=crop",
// //     text: "جودة التنفيذ",
// //   },
// //   {
// //     image:
// //       "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
// //     text: "خبرة الشروق",
// //   },
// //   {
// //     image:
// //       "https://images.unsplash.com/photo-1590496793929-36417d3117de?q=80&w=1200&auto=format&fit=crop",
// //     text: "رؤية معمارية",
// //   },
// //   {
// //     image:
// //       "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1200&auto=format&fit=crop",
// //     text: "التسليم في الموعد",
// //   },
// // ];

// const ITEMS: SlideItem[] = [
//   {
//     type: "video",
//     src: "/videos/hero.mp4",
//     text: "AL SHOROUK",
//   },
//   {
//     type: "image",
//     src: "src/assets/images/garden/1.png",
//     text: "مشاريعنا",
//   },
//   {
//     type: "image",
//     src: "src/assets/images/galala/2.png",
//     text: "جودة التنفيذ",
//   },
//   {
//     type: "image",
//     src: "src/assets/images/galala/3.png",
//     text: "خبرة الشروق",
//   },
// ];

// const DEFAULT_EASE = "cubic-bezier(1, -0.001, 0.159, 0.838)";
// const CUBIC_BEZIER_RE = /^cubic-bezier\(\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^)]+)\)$/;
// function resolveEase(ease: string): string {
//   const match = ease.match(CUBIC_BEZIER_RE);
//   if (!match) return ease;
//   const id = `ease-${match.slice(1, 5).join("_").replace(/[^\d.-]/g, "n")}`;
//   if (!CustomEase.get(id)) {
//     CustomEase.create(id, match.slice(1, 5).join(","));
//   }
//   return id;
// }

// function toCssLength(value: CSSLength) {
//   return typeof value === "number" ? `${value}px` : value;
// }

// const EASE = "power4.inOut";
// const DURATION = 0.9;
// const TEXT_TRANSLATE_PERCENT = 40;
// const TEXT_ROTATE_DEG = 45;
// const OUTGOING_DURATION = DURATION * 0.45;
// const VERTICAL_TEXT_TRANSLATE_PERCENT = 40;
// const VERTICAL_TEXT_ROTATE_DEG = 45;
// const VERTICAL_TEXT_ROTATE_REVERSED = true;
// const VERTICAL_TEXT_TRANSLATE_REVERSED = true;
// const VERTICAL_OUTGOING_DURATION = DURATION * 0.45;
// const TEXT_Z = 60;

// export interface DimensionalSwitchSliderProps {
//   infinite?: boolean;
//   ease?: string;
//   textColor?: string;
//   cardClassName?: string;
//   cardWidth?: CSSLength;
//   cardHeight?: CSSLength;
//   direction?: "horizontal" | "vertical";
//   textSize?: CSSLength;
//   cardBorderRadius?: CSSLength;
//   autoplay?: boolean;
//   autoplayDelay?: number;
// }

// const DimensionalSwitchSlider = ({
//   infinite = true,
//   ease = DEFAULT_EASE,
//   textColor = "#ffffff",
//   cardClassName = "max-md:w-[85vw]! max-md:h-[75vw]! max-[1024px]:w-[85vw]! max-[1024px]:h-[55vw]!",
//   cardWidth = 680,
//   cardHeight = 460,
//   direction = "horizontal",
//   textSize = 84,
//   cardBorderRadius = 16,
//   autoplay = true,
//   autoplayDelay = 2600,
// }: DimensionalSwitchSliderProps = {}) => {
//   const isVertical = direction === "vertical";
//   const flipAxis = isVertical ? "rotateX" : "rotateY";
//   const flipperRef = useRef<HTMLDivElement>(null);
//   const prevTextRef = useRef<HTMLDivElement>(null);
//   const nextTextRef = useRef<HTMLDivElement>(null);
//   const showingNextRef = useRef(false);
//   const isAnimatingRef = useRef(false);
//   const rotationRef = useRef(0);
//   const resolvedEase = useMemo(() => resolveEase(ease), [ease]);
//   const resolvedCardWidth = toCssLength(cardWidth);
//   const resolvedCardHeight = toCssLength(cardHeight);
//   const resolvedTextSize = toCssLength(textSize);
//   const resolvedCardBorderRadius = toCssLength(cardBorderRadius);
//   const [frontIndex, setFrontIndex] = useState(0);
//   const [backIndex, setBackIndex] = useState(1 % ITEMS.length);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     gsap.set([prevTextRef.current, nextTextRef.current], { z: TEXT_Z });
//   }, []);

//   useEffect(() => {
//     gsap.killTweensOf([flipperRef.current, prevTextRef.current, nextTextRef.current]);

//     const wasShowingNext = showingNextRef.current;
//     rotationRef.current = wasShowingNext ? 180 : 0;
//     gsap.set(flipperRef.current, { rotateX: 0, rotateY: 0, [flipAxis]: rotationRef.current });

//     const visibleRef = wasShowingNext ? nextTextRef : prevTextRef;
//     const hiddenRef = wasShowingNext ? prevTextRef : nextTextRef;
//     gsap.set(visibleRef.current, { xPercent: 0, yPercent: 0, rotateX: 0, rotateY: 0, opacity: 1 });
//     gsap.set(hiddenRef.current, { xPercent: 0, yPercent: 0, rotateX: 0, rotateY: 0, opacity: 0 });

//     isAnimatingRef.current = false;
//   }, [direction, flipAxis]);

//   const flipTo = useCallback(
//     (dir: "prev" | "next", newIndex: number) => {
//       const goingNext = dir === "next";
//       if (isAnimatingRef.current) return;
//       const wasShowingNext = showingNextRef.current;
//       flushSync(() => {
//         setCurrentIndex(newIndex);
//         if (wasShowingNext) setFrontIndex(newIndex);
//         else setBackIndex(newIndex);
//       });

//       showingNextRef.current = !wasShowingNext;

//       const outgoingRef = wasShowingNext ? nextTextRef : prevTextRef;
//       const incomingRef = wasShowingNext ? prevTextRef : nextTextRef;
//       const flipGoingNext = isVertical ? !goingNext : goingNext;
//       rotationRef.current += flipGoingNext ? 180 : -180;
//       const rotateValue = rotationRef.current;

//       if (prefersReducedMotion()) {
//         gsap.set(flipperRef.current, { [flipAxis]: rotateValue });
//         gsap.set(outgoingRef.current, { xPercent: 0, yPercent: 0, rotateX: 0, rotateY: 0, opacity: 0 });
//         gsap.set(incomingRef.current, { xPercent: 0, yPercent: 0, rotateX: 0, rotateY: 0, opacity: 1 });
//         isAnimatingRef.current = false;
//         return;
//       }

//       isAnimatingRef.current = true;

//       const tl = gsap.timeline({
//         defaults: { duration: DURATION, ease: EASE },
//         onComplete: () => {
//           isAnimatingRef.current = false;
//         },
//       });

//       tl.to(flipperRef.current, { [flipAxis]: rotateValue, ease: resolvedEase, duration: 0.7 }, 0);

//       const textTl = gsap.timeline();

//       if (isVertical) {
//         const rotateGoingNext = VERTICAL_TEXT_ROTATE_REVERSED ? !goingNext : goingNext;
//         const translateGoingNext = VERTICAL_TEXT_TRANSLATE_REVERSED ? !goingNext : goingNext;

//         const outgoingEndRotate = rotateGoingNext ? VERTICAL_TEXT_ROTATE_DEG : -VERTICAL_TEXT_ROTATE_DEG;
//         const outgoingEndY = translateGoingNext
//           ? -VERTICAL_TEXT_TRANSLATE_PERCENT * 2
//           : VERTICAL_TEXT_TRANSLATE_PERCENT * 2;
//         const incomingStartRotate = rotateGoingNext ? -VERTICAL_TEXT_ROTATE_DEG : VERTICAL_TEXT_ROTATE_DEG;
//         const incomingStartY = translateGoingNext
//           ? VERTICAL_TEXT_TRANSLATE_PERCENT * 2
//           : -VERTICAL_TEXT_TRANSLATE_PERCENT * 2;

//         textTl.to(
//           outgoingRef.current,
//           { yPercent: outgoingEndY, rotateX: outgoingEndRotate, duration: VERTICAL_OUTGOING_DURATION * 1.5, ease: resolvedEase },
//           0,
//         );
//         textTl.to(outgoingRef.current, { opacity: 0, delay: -0.3, duration: 0 });
//         textTl.fromTo(
//           incomingRef.current,
//           { yPercent: incomingStartY, rotateX: incomingStartRotate, opacity: 0 },
//           { yPercent: 0, rotateX: 0, opacity: 1, duration: VERTICAL_OUTGOING_DURATION * 1.5, ease: resolvedEase },
//           0.15,
//         );
//       } else {
//         const outgoingEndRotate = goingNext ? TEXT_ROTATE_DEG : -TEXT_ROTATE_DEG;
//         const outgoingEndX = goingNext ? TEXT_TRANSLATE_PERCENT : -TEXT_TRANSLATE_PERCENT;
//         const incomingStartRotate = goingNext ? -TEXT_ROTATE_DEG : TEXT_ROTATE_DEG;
//         const incomingStartX = goingNext ? -TEXT_TRANSLATE_PERCENT : TEXT_TRANSLATE_PERCENT;

//         textTl.to(
//           outgoingRef.current,
//           { xPercent: outgoingEndX, rotateY: outgoingEndRotate, duration: OUTGOING_DURATION * 1.5, ease: resolvedEase },
//           0,
//         );
//         textTl.to(outgoingRef.current, { opacity: 0, delay: -0.3, duration: 0 });
//         textTl.fromTo(
//           incomingRef.current,
//           { xPercent: incomingStartX, rotateY: incomingStartRotate, opacity: 0 },
//           { xPercent: 0, rotateY: 0, opacity: 1, duration: OUTGOING_DURATION * 1.5, ease: resolvedEase },
//           0.15,
//         );
//       }

//       tl.add(textTl, 0);
//     },
//     [flipAxis, isVertical, resolvedEase],
//   );

//   const switchTo = useCallback(
//     (dir: "prev" | "next") => {
//       const goingNext = dir === "next";
//       const wasShowingNext = showingNextRef.current;
//       const currentVisibleIndex = wasShowingNext ? backIndex : frontIndex;
//       const rawIndex = currentVisibleIndex + (goingNext ? 1 : -1);
//       const newIndex = infinite
//         ? ((rawIndex % ITEMS.length) + ITEMS.length) % ITEMS.length
//         : rawIndex;

//       if (!infinite && (newIndex < 0 || newIndex >= ITEMS.length)) return;
//       flipTo(dir, newIndex);
//     },
//     [backIndex, flipTo, frontIndex, infinite],
//   );

//   useEffect(() => {
//     if (!autoplay || autoplayDelay <= 0 || prefersReducedMotion()) return;
//     const intervalId = window.setInterval(() => switchTo("next"), autoplayDelay);
//     return () => window.clearInterval(intervalId);
//   }, [autoplay, autoplayDelay, switchTo]);

//   const goToIndex = useCallback(
//     (targetIndex: number) => {
//       if (targetIndex === currentIndex) return;
//       let dir: "prev" | "next";
//       if (infinite) {
//         const forwardDistance = ((targetIndex - currentIndex) % ITEMS.length + ITEMS.length) % ITEMS.length;
//         dir = forwardDistance <= ITEMS.length - forwardDistance ? "next" : "prev";
//       } else {
//         dir = targetIndex > currentIndex ? "next" : "prev";
//       }
//       flipTo(dir, targetIndex);
//     },
//     [currentIndex, flipTo, infinite],
//   );

//   return (
//     //4
//     // <div className="flex flex-col items-center justify-center w-full h-full gap-4">

//     <div className="relative w-full h-full">


//         //3
//       {/* <div
//         className={`dimensional-card relative ${cardClassName}`}
//         style={{ perspective: "1000px", width: resolvedCardWidth, height: resolvedCardHeight }}
//       > */}
//       <div
//   className={`dimensional-card relative ${cardClassName}`}
//   style={{
//     perspective: "1000px",
//     width: "100vw",
//     height: "100vh",
//   }}
// >
//         <div ref={flipperRef} className="relative h-full w-full transform-3d">
//           <div
//             className="absolute inset-0 h-full w-full overflow-hidden backface-hidden prev-card-face"
//             style={{ borderRadius: resolvedCardBorderRadius }}
//           >

//             //5
//             {/* <img src={ITEMS[frontIndex].image} className="w-full h-full object-cover" alt={ITEMS[frontIndex].text} /> */}
//             {ITEMS[frontIndex].type === "video" ? (
//   <video
//     src={ITEMS[frontIndex].src}
//     className="w-full h-full object-cover"
//     autoPlay
//     muted
//     loop
//     playsInline
//   />
// ) : (
//   <img
//     src={ITEMS[frontIndex].src}
//     className="w-full h-full object-cover"
//     alt={ITEMS[frontIndex].text}
//   />
// )}
//           </div>
//           <div
//             className={`absolute inset-0 h-full w-full overflow-hidden backface-hidden next-card-face ${
//               isVertical ? "rotate-x-180" : "rotate-y-180"
//             }`}
//             style={{ borderRadius: resolvedCardBorderRadius }}
//           >
//             //6
//             {/* <img src={ITEMS[backIndex].image} className="w-full h-full object-cover" alt={ITEMS[backIndex].text} /> */}

//             {ITEMS[backIndex].type === "video" ? (
//   <video
//     src={ITEMS[backIndex].src}
//     className="w-full h-full object-cover"
//     autoPlay
//     muted
//     loop
//     playsInline
//   />
// ) : (
//   <img
//     src={ITEMS[backIndex].src}
//     className="w-full h-full object-cover"
//     alt={ITEMS[backIndex].text}
//   />
// )}
//           </div>
//         </div>
//       </div>

//       <div
//         className="relative z-10 flex items-center justify-center w-full"
//         style={{ perspective: "1000px", fontSize: resolvedTextSize }}
//       >
//         <div ref={prevTextRef} className="absolute w-fit text-center font-semibold prev-text" style={{ color: textColor }}>
//           {ITEMS[frontIndex].text}
//         </div>
//         <div ref={nextTextRef} className="absolute w-fit text-center font-semibold next-text opacity-0" style={{ color: textColor }}>
//           {ITEMS[backIndex].text}
//         </div>
//       </div>

//       <div className="flex gap-4 z-10">
//         <button
//           type="button"
//           onClick={() => switchTo("prev")}
//           aria-label="Previous"
//           disabled={!infinite && currentIndex === 0}
//           className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-transparent text-white backdrop-blur-[10px] transition-colors duration-300 ease-in-out hover:bg-[#ff5f00] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
//         >
//           <ArrowLeft size={18} />
//         </button>
//         <button
//           type="button"
//           onClick={() => switchTo("next")}
//           aria-label="Next"
//           disabled={!infinite && currentIndex === ITEMS.length - 1}
//           className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-transparent text-white backdrop-blur-[10px] transition-colors duration-300 ease-in-out hover:bg-[#ff5f00] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
//         >
//           <ArrowRight size={18} />
//         </button>
//       </div>

//       <div className="flex gap-2 z-10">
//         {ITEMS.map((item, idx) => (
//           <button
//             key={item.text}
//             type="button"
//             onClick={() => goToIndex(idx)}
//             aria-label={`Go to ${item.text}`}
//             aria-current={idx === currentIndex}
//             className={`h-2 rounded-full transition-all duration-300 ease-in-out ${
//               idx === currentIndex ? "w-6 bg-[#ff5f00]" : "w-2 bg-white/30 hover:bg-white/50"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DimensionalSwitchSlider;





import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ArrowLeft, ArrowRight } from "lucide-react";

gsap.registerPlugin(CustomEase);
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;

type SlideItem = {
  type: "image" | "video";
  src: string;
  text: string;
};
type CSSLength = string | number;

const ITEMS: SlideItem[] = [
  {
    type: "video",
    src: "/videos/hero.mp4",
    text: "AL SHOROUK",
  },
  {
    type: "image",
    src: "src/assets/images/hospital/1.png",
    text: "OUR PROJECTS",
  },
  {
    type: "image",
    src: "src/assets/images/galala/2.png",
    text: "Quality of Execution",
  },
  {
    type: "image",
    src: "src/assets/images/galala/3.png",
    text: "Experience of Al Shorouk",
  },
];

const DEFAULT_EASE = "cubic-bezier(1, -0.001, 0.159, 0.838)";
const CUBIC_BEZIER_RE = /^cubic-bezier\(\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^)]+)\)$/;
function resolveEase(ease: string): string {
  const match = ease.match(CUBIC_BEZIER_RE);
  if (!match) return ease;
  const id = `ease-${match.slice(1, 5).join("_").replace(/[^\d.-]/g, "n")}`;
  if (!CustomEase.get(id)) {
    CustomEase.create(id, match.slice(1, 5).join(","));
  }
  return id;
}

function toCssLength(value: CSSLength) {
  return typeof value === "number" ? `${value}px` : value;
}

// ---- Animation timing ----------------------------------------------------
// كانت الحركة سريعة وخشنة شوية (power4 + مدة قصيرة). دلوقتي خليتها أبطأ
// وأنعم (power2.inOut) وضفت طبقتين حركة إضافيتين (scale + brightness/blur)
// عشان يحس المستخدم إن فيه "depth" وقت القلب مش بس دوران مسطح.
const EASE = "power2.inOut";
const DURATION = 1.6; // كانت 0.9
const TEXT_TRANSLATE_PERCENT = 40;
const TEXT_ROTATE_DEG = 45;
const OUTGOING_DURATION = DURATION * 0.45;
const VERTICAL_TEXT_TRANSLATE_PERCENT = 40;
const VERTICAL_TEXT_ROTATE_DEG = 45;
const VERTICAL_TEXT_ROTATE_REVERSED = true;
const VERTICAL_TEXT_TRANSLATE_REVERSED = true;
const VERTICAL_OUTGOING_DURATION = DURATION * 0.45;
const TEXT_Z = 60;
const ROTATE_DURATION = DURATION * 0.85; // كانت ثابتة على 0.7

export interface DimensionalSwitchSliderProps {
  infinite?: boolean;
  ease?: string;
  textColor?: string;
  cardClassName?: string;
  direction?: "horizontal" | "vertical";
  textSize?: CSSLength;
  cardBorderRadius?: CSSLength;
  autoplay?: boolean;
  autoplayDelay?: number;
}

const DimensionalSwitchSlider = ({
  infinite = true,
  ease = DEFAULT_EASE,
  textColor = "#ffffff",
  cardClassName = "",
  direction = "horizontal",
  textSize = 56,
  cardBorderRadius = 0,
  autoplay = true,
  autoplayDelay = 2600,
}: DimensionalSwitchSliderProps = {}) => {
  const isVertical = direction === "vertical";
  const flipAxis = isVertical ? "rotateX" : "rotateY";
  const flipperRef = useRef<HTMLDivElement>(null);
  const prevTextRef = useRef<HTMLDivElement>(null);
  const nextTextRef = useRef<HTMLDivElement>(null);
  const showingNextRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const rotationRef = useRef(0);
  const resolvedEase = useMemo(() => resolveEase(ease), [ease]);
  const resolvedTextSize = toCssLength(textSize);
  const resolvedCardBorderRadius = toCssLength(cardBorderRadius);
  const [frontIndex, setFrontIndex] = useState(0);
  const [backIndex, setBackIndex] = useState(1 % ITEMS.length);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    gsap.set([prevTextRef.current, nextTextRef.current], { z: TEXT_Z });
  }, []);

  useEffect(() => {
    gsap.killTweensOf([flipperRef.current, prevTextRef.current, nextTextRef.current]);

    const wasShowingNext = showingNextRef.current;
    rotationRef.current = wasShowingNext ? 180 : 0;
    gsap.set(flipperRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      filter: "brightness(1) blur(0px)",
      [flipAxis]: rotationRef.current,
    });

    const visibleRef = wasShowingNext ? nextTextRef : prevTextRef;
    const hiddenRef = wasShowingNext ? prevTextRef : nextTextRef;
    gsap.set(visibleRef.current, { xPercent: 0, yPercent: 0, rotateX: 0, rotateY: 0, opacity: 1 });
    gsap.set(hiddenRef.current, { xPercent: 0, yPercent: 0, rotateX: 0, rotateY: 0, opacity: 0 });

    isAnimatingRef.current = false;
  }, [direction, flipAxis]);

  const flipTo = useCallback(
    (dir: "prev" | "next", newIndex: number) => {
      const goingNext = dir === "next";
      if (isAnimatingRef.current) return;
      const wasShowingNext = showingNextRef.current;
      flushSync(() => {
        setCurrentIndex(newIndex);
        if (wasShowingNext) setFrontIndex(newIndex);
        else setBackIndex(newIndex);
      });

      showingNextRef.current = !wasShowingNext;

      const outgoingRef = wasShowingNext ? nextTextRef : prevTextRef;
      const incomingRef = wasShowingNext ? prevTextRef : nextTextRef;
      const flipGoingNext = isVertical ? !goingNext : goingNext;
      rotationRef.current += flipGoingNext ? 180 : -180;
      const rotateValue = rotationRef.current;

      if (prefersReducedMotion()) {
        gsap.set(flipperRef.current, { [flipAxis]: rotateValue, scale: 1, filter: "brightness(1) blur(0px)" });
        gsap.set(outgoingRef.current, { xPercent: 0, yPercent: 0, rotateX: 0, rotateY: 0, opacity: 0 });
        gsap.set(incomingRef.current, { xPercent: 0, yPercent: 0, rotateX: 0, rotateY: 0, opacity: 1 });
        isAnimatingRef.current = false;
        return;
      }

      isAnimatingRef.current = true;

      const tl = gsap.timeline({
        defaults: { duration: DURATION, ease: EASE },
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });

      // دوران الكارت نفسه - أبطأ ومدته مرتبطة بـ DURATION عشان لو حد غيّر
      // DURATION تتغير كل الحركات مع بعض بشكل متناسق
      tl.to(flipperRef.current, { [flipAxis]: rotateValue, ease: resolvedEase, duration: ROTATE_DURATION }, 0);

      // طبقة حركة إضافية: تصغير خفيف + تعتيم/بلور بسيط في منتصف القلب
      // عشان يحس المشاهد إن الكارت "بيتحرك في العمق" مش بس بيلف مكانه
      tl.to(flipperRef.current, { scale: 0.94, filter: "brightness(0.72) blur(2px)", duration: DURATION * 0.5, ease: "power2.in" }, 0);
      tl.to(flipperRef.current, { scale: 1, filter: "brightness(1) blur(0px)", duration: DURATION * 0.5, ease: "power2.out" }, DURATION * 0.5);

      const textTl = gsap.timeline();

      if (isVertical) {
        const rotateGoingNext = VERTICAL_TEXT_ROTATE_REVERSED ? !goingNext : goingNext;
        const translateGoingNext = VERTICAL_TEXT_TRANSLATE_REVERSED ? !goingNext : goingNext;

        const outgoingEndRotate = rotateGoingNext ? VERTICAL_TEXT_ROTATE_DEG : -VERTICAL_TEXT_ROTATE_DEG;
        const outgoingEndY = translateGoingNext
          ? -VERTICAL_TEXT_TRANSLATE_PERCENT * 2
          : VERTICAL_TEXT_TRANSLATE_PERCENT * 2;
        const incomingStartRotate = rotateGoingNext ? -VERTICAL_TEXT_ROTATE_DEG : VERTICAL_TEXT_ROTATE_DEG;
        const incomingStartY = translateGoingNext
          ? VERTICAL_TEXT_TRANSLATE_PERCENT * 2
          : -VERTICAL_TEXT_TRANSLATE_PERCENT * 2;

        textTl.to(
          outgoingRef.current,
          { yPercent: outgoingEndY, rotateX: outgoingEndRotate, duration: VERTICAL_OUTGOING_DURATION * 1.5, ease: resolvedEase },
          0,
        );
        textTl.to(outgoingRef.current, { opacity: 0, delay: -0.3, duration: 0 });
        textTl.fromTo(
          incomingRef.current,
          { yPercent: incomingStartY, rotateX: incomingStartRotate, opacity: 0 },
          { yPercent: 0, rotateX: 0, opacity: 1, duration: VERTICAL_OUTGOING_DURATION * 1.5, ease: resolvedEase },
          0.15,
        );
      } else {
        const outgoingEndRotate = goingNext ? TEXT_ROTATE_DEG : -TEXT_ROTATE_DEG;
        const outgoingEndX = goingNext ? TEXT_TRANSLATE_PERCENT : -TEXT_TRANSLATE_PERCENT;
        const incomingStartRotate = goingNext ? -TEXT_ROTATE_DEG : TEXT_ROTATE_DEG;
        const incomingStartX = goingNext ? -TEXT_TRANSLATE_PERCENT : TEXT_TRANSLATE_PERCENT;

        textTl.to(
          outgoingRef.current,
          { xPercent: outgoingEndX, rotateY: outgoingEndRotate, duration: OUTGOING_DURATION * 1.5, ease: resolvedEase },
          0,
        );
        textTl.to(outgoingRef.current, { opacity: 0, delay: -0.3, duration: 0 });
        textTl.fromTo(
          incomingRef.current,
          { xPercent: incomingStartX, rotateY: incomingStartRotate, opacity: 0 },
          { xPercent: 0, rotateY: 0, opacity: 1, duration: OUTGOING_DURATION * 1.5, ease: resolvedEase },
          0.15,
        );
      }

      tl.add(textTl, 0);
    },
    [flipAxis, isVertical, resolvedEase],
  );

  const switchTo = useCallback(
    (dir: "prev" | "next") => {
      const goingNext = dir === "next";
      const wasShowingNext = showingNextRef.current;
      const currentVisibleIndex = wasShowingNext ? backIndex : frontIndex;
      const rawIndex = currentVisibleIndex + (goingNext ? 1 : -1);
      const newIndex = infinite
        ? ((rawIndex % ITEMS.length) + ITEMS.length) % ITEMS.length
        : rawIndex;

      if (!infinite && (newIndex < 0 || newIndex >= ITEMS.length)) return;
      flipTo(dir, newIndex);
    },
    [backIndex, flipTo, frontIndex, infinite],
  );

  // ---- Autoplay -----------------------------------------------------------
  // الفرق عن الأول: لو الـ slide الحالي فيديو، مش بنعمل setTimeout عادي؛
  // بننتظر حدث "ended" من الفيديو نفسه عشان السلايدر ميتحركش غير لما
  // الفيديو يخلص فعلاً. لو الـ slide صورة، بنستخدم نفس فكرة الـ delay القديمة.
  useEffect(() => {
    if (!autoplay || prefersReducedMotion()) return;
    const currentItem = ITEMS[currentIndex];
    if (currentItem.type === "video") return; // هيتحرك من onEnded بتاع الفيديو
    if (autoplayDelay <= 0) return;
    const timeoutId = window.setTimeout(() => switchTo("next"), autoplayDelay);
    return () => window.clearTimeout(timeoutId);
  }, [autoplay, autoplayDelay, currentIndex, switchTo]);

  const handleVideoEnded = useCallback(
    (idx: number) => {
      if (!autoplay || prefersReducedMotion()) return;
      // بنتأكد إن الفيديو اللي خلص هو نفسه الظاهر دلوقتي (مش الوش التاني المخفي)
      if (idx === currentIndex) switchTo("next");
    },
    [autoplay, currentIndex, switchTo],
  );

  const goToIndex = useCallback(
    (targetIndex: number) => {
      if (targetIndex === currentIndex) return;
      let dir: "prev" | "next";
      if (infinite) {
        const forwardDistance = ((targetIndex - currentIndex) % ITEMS.length + ITEMS.length) % ITEMS.length;
        dir = forwardDistance <= ITEMS.length - forwardDistance ? "next" : "prev";
      } else {
        dir = targetIndex > currentIndex ? "next" : "prev";
      }
      flipTo(dir, targetIndex);
    },
    [currentIndex, flipTo, infinite],
  );

  return (
    // الحاوية الرئيسية دلوقتي h-screen بدل h-full، عشان لو الأب مالوش ارتفاع
    // محدد، السلايدر برضه هياخد الشاشة كاملة ومش هيسيب مسافة فاضية تحته.
    // overflow-hidden عشان أي عنصر متحرك زيادة عن اللزوم ميعملش سكرول بار.
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className={`dimensional-card absolute inset-0 h-full w-full ${cardClassName}`}
        style={{ perspective: "1000px" }}
      >
        <div ref={flipperRef} className="relative h-full w-full transform-3d">
          <div
            className="absolute inset-0 h-full w-full overflow-hidden backface-hidden prev-card-face"
            style={{ borderRadius: resolvedCardBorderRadius }}
          >
            {ITEMS[frontIndex].type === "video" ? (
              <video
                src={ITEMS[frontIndex].src}
                className="w-full h-full object-cover"
                autoPlay
                muted
                playsInline
                onEnded={() => handleVideoEnded(frontIndex)}
              />
            ) : (
              <img
                src={ITEMS[frontIndex].src}
                className="w-full h-full object-cover"
                alt={ITEMS[frontIndex].text}
              />
            )}
          </div>
          <div
            className={`absolute inset-0 h-full w-full overflow-hidden backface-hidden next-card-face ${
              isVertical ? "rotate-x-180" : "rotate-y-180"
            }`}
            style={{ borderRadius: resolvedCardBorderRadius }}
          >
            {ITEMS[backIndex].type === "video" ? (
              <video
                src={ITEMS[backIndex].src}
                className="w-full h-full object-cover"
                autoPlay
                muted
                playsInline
                onEnded={() => handleVideoEnded(backIndex)}
              />
            ) : (
              <img
                src={ITEMS[backIndex].src}
                className="w-full h-full object-cover"
                alt={ITEMS[backIndex].text}
              />
            )}
          </div>
        </div>
        {/* طبقة تعتيم بسيطة فوق الصورة/الفيديو عشان النص والـ dots يبانوا بوضوح
            في أي وقت مهما كانت الصورة فاتحة أو غامقة */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>

      {/* طبقة النص + الـ dots - ثابتة في آخر السلايدر على الشمال، فوق الصورة/الفيديو */}
      <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 z-20 flex max-w-[85%] flex-col items-start gap-5 md:max-w-lg">
        <div className="relative w-full" style={{ perspective: "1000px", fontSize: resolvedTextSize }}>
          <div
            ref={prevTextRef}
            className="w-fit text-left font-semibold leading-tight prev-text"
            style={{ color: textColor }}
          >
            {ITEMS[frontIndex].text}
          </div>
          <div
            ref={nextTextRef}
            className="absolute inset-0 w-fit text-left font-semibold leading-tight next-text opacity-0"
            style={{ color: textColor }}
          >
            {ITEMS[backIndex].text}
          </div>
        </div>

        <div className="flex gap-2">
          {ITEMS.map((item, idx) => (
            <button
              key={item.text}
              type="button"
              onClick={() => goToIndex(idx)}
              aria-label={`Go to ${item.text}`}
              aria-current={idx === currentIndex}
              className={`h-2 rounded-full transition-all duration-300 ease-in-out ${
                idx === currentIndex ? "w-6 bg-[#ff5f00]" : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* أسهم التنقل - ركن تاني (يمين تحت) عشان ميدخلوش على طبقة النص */}
      <div className="absolute bottom-8 right-6 md:bottom-12 md:right-12 z-20 flex gap-4">
        <button
          type="button"
          onClick={() => switchTo("prev")}
          aria-label="Previous"
          disabled={!infinite && currentIndex === 0}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-transparent text-white backdrop-blur-[10px] transition-colors duration-300 ease-in-out hover:bg-[#ff5f00] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => switchTo("next")}
          aria-label="Next"
          disabled={!infinite && currentIndex === ITEMS.length - 1}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-transparent text-white backdrop-blur-[10px] transition-colors duration-300 ease-in-out hover:bg-[#ff5f00] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default DimensionalSwitchSlider;