
// import React, { useRef, useState, useEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";

// gsap.registerPlugin(ScrollTrigger);

// function cx(...parts) {
//   return parts.filter(Boolean).join(" ");
// }

// /**
//  * غلاف الـ section الواحد.
//  * كل section بيتحط جواه بتاخد فيه العرض والطول الكامل للشاشة،
//  * ويتلف بزاوية وهو بيدخل، ويتثبت (pin) لحد ما اللي بعده يغطيه.
//  */
// export const FlowSection = ({ className, style = {}, children, "aria-label": ariaLabel }) => (
//   <section
//     data-flow-section
//     aria-label={ariaLabel}
//     className={cx("relative min-h-screen w-full overflow-hidden", className)}
//   >
//     <div
//       data-flow-inner
//       className="flow-art-container relative min-h-screen w-full will-change-transform"
//       style={{ transformOrigin: "bottom left", ...style }}
//     >
//       {children}
//     </div>
//   </section>
// );

// const childCount = (children) => React.Children.count(children);

// export default function FlowScroll({ children, className, "aria-label": ariaLabel = "Section flow" }) {
//   const containerRef = useRef(null);
//   const [reducedMotion, setReducedMotion] = useState(false);

//   useEffect(() => {
//     const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
//     const update = () => setReducedMotion(mq.matches);
//     update();
//     mq.addEventListener("change", update);
//     return () => mq.removeEventListener("change", update);
//   }, []);

//   useGSAP(
//     () => {
//       if (!containerRef.current || reducedMotion) return;

//       const sections = Array.from(
//         containerRef.current.querySelectorAll("[data-flow-section]")
//       );
//       if (sections.length === 0) return;

//       const triggers = [];

//       sections.forEach((section, i) => {
//         gsap.set(section, { zIndex: i + 1 });

//         const inner = section.querySelector(".flow-art-container");
//         if (!inner) return;

//         // كل section (ما عدا الأول) بيدخل ملفوف بزاوية وبيترد لصفر وهو داخل الشاشة
//         // if (i > 0) {
//         //   gsap.set(inner, { rotation: 26, transformOrigin: "bottom left" });
//         //   const tween = gsap.to(inner, {
//         //     rotation: 0,
//         //     ease: "none",
//         //     scrollTrigger: {
//         //       trigger: section,
//         //       start: "top bottom",
//         //       end: "top 20%",
//         //       scrub: 0.6, // رقم بسيط بيدّي smoothing إضافي بدل true الجامدة
//         //     },
//         //   });
//         //   if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
//         // }

//         // كل section (ما عدا الأخير) بيتثبت لحد ما اللي بعده يغطيه بالكامل
//         if (i < sections.length - 1) {
//           const holdDistance = Number(
//             section.querySelector("[data-flow-hold]")?.dataset.flowHold || 0
//           );
//           const pinTrigger = ScrollTrigger.create({
//             trigger: section,
//             start: "bottom bottom",
//             end: holdDistance ? `bottom top-=${holdDistance}` : "bottom top",
//             pin: true,
//             pinSpacing: false,
//             onEnter: () => {
//               if (holdDistance) gsap.set(section, { zIndex: sections.length + 1 });
//             },
//             onLeave: () => {
//               if (holdDistance) gsap.set(section, { zIndex: i + 1 });
//             },
//             onEnterBack: () => {
//               if (holdDistance) gsap.set(section, { zIndex: sections.length + 1 });
//             },
//             onLeaveBack: () => {
//               if (holdDistance) gsap.set(section, { zIndex: i + 1 });
//             },
//           });
//           triggers.push(pinTrigger);
//         }
//       });

//       ScrollTrigger.refresh();

//       return () => triggers.forEach((t) => t.kill());
//     },
//     { scope: containerRef, dependencies: [childCount(children), reducedMotion] }
//   );

//   return (
//     <main ref={containerRef} aria-label={ariaLabel} className={cx("w-full overflow-x-hidden", className)}>
//       {children}
//     </main>
//   );
// }


import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

// export const FlowSection = ({
//   className,
//   style = {},
//   children,
//   "aria-label": ariaLabel,
//   skipPin = false,
// }) => (
//   <section
//     data-flow-section
//     data-flow-skip-pin={skipPin ? "true" : undefined}
//     aria-label={ariaLabel}
//     className={cx("relative min-h-screen w-full overflow-hidden", className)}
//   >
//     <div
//       data-flow-inner
//       className="flow-art-container relative min-h-screen w-full will-change-transform"
//       style={{ transformOrigin: "bottom left", ...style }}
//     >
//       {children}
//     </div>
//   </section>
// );


export const FlowSection = ({
  className,
  style = {},
  children,
  "aria-label": ariaLabel,
  skipPin = false,
  fit = false,
  flat = false,
}) => (
  <section
    data-flow-section
    data-flow-skip-pin={skipPin ? "true" : undefined}
    aria-label={ariaLabel}
    className={cx("relative w-full overflow-hidden", !fit && "min-h-screen", className)}
  >
    <div
      data-flow-inner
      className={cx(
        "flow-art-container relative w-full",
        !flat && "will-change-transform",
        !fit && "min-h-screen"
      )}
      style={flat ? style : { transformOrigin: "bottom left", ...style }}
    >
      {children}
    </div>
  </section>
);
const childCount = (children) => React.Children.count(children);

export default function FlowScroll({
  children,
  className,
  "aria-label": ariaLabel = "Section flow",
}) {
  const containerRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || reducedMotion) return;

      const sections = Array.from(
        containerRef.current.querySelectorAll("[data-flow-section]")
      );
      if (sections.length === 0) return;

      const triggers = [];

      sections.forEach((section, i) => {
        gsap.set(section, { zIndex: i + 1 });

        const inner = section.querySelector(".flow-art-container");
        if (!inner) return;

        // سيكشن الـ Hierarchy بيدير الـ pin بنفسه
        if (section.dataset.flowSkipPin === "true") return;

        if (i < sections.length - 1) {
          const holdDistance = Number(
            section.querySelector("[data-flow-hold]")?.dataset.flowHold || 0
          );
          const pinTrigger = ScrollTrigger.create({
            trigger: section,
            start: "bottom bottom",
            end: holdDistance ? `bottom top-=${holdDistance}` : "bottom top",
            pin: true,
            pinSpacing: false,
            onEnter: () => {
              if (holdDistance) gsap.set(section, { zIndex: sections.length + 1 });
            },
            onLeave: () => {
              if (holdDistance) gsap.set(section, { zIndex: i + 1 });
            },
            onEnterBack: () => {
              if (holdDistance) gsap.set(section, { zIndex: sections.length + 1 });
            },
            onLeaveBack: () => {
              if (holdDistance) gsap.set(section, { zIndex: i + 1 });
            },
          });
          triggers.push(pinTrigger);
        }
      });

      ScrollTrigger.refresh();

      return () => triggers.forEach((t) => t.kill());
    },
    { scope: containerRef, dependencies: [childCount(children), reducedMotion] }
  );

  return (
    <main
      ref={containerRef}
      aria-label={ariaLabel}
      className={cx("w-full overflow-x-hidden", className)}
    >
      {children}
    </main>
  );
}