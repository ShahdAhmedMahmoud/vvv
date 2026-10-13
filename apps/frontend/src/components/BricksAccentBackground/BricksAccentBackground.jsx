





// import { useEffect, useRef } from "react";


// const BRICK_SHADES = [
//   "#E8C1B3",
//   "#E5B9AA",
//   "#DDB0A0",
//   "#EAC6B9",
//   "#E2B7A7",
//   "#E6BDAF",
// ];


// const MORTAR_COLOR = "#C9C2B4";

// function hashToIndex(x, y, mod) {
//   const h = Math.abs(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453);
//   return Math.floor((h - Math.floor(h)) * mod);
// }

// function hash01(x, y) {
//   const h = Math.abs(Math.sin(x * 45.233 + y * 19.71) * 12543.111);
//   return h - Math.floor(h);
// }


// const BRICK_TEXTURE_URL = `url("data:image/svg+xml,${encodeURIComponent(`
// <svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'>
//   <filter id='b'>
//     <feTurbulence type='fractalNoise' baseFrequency='0.012 0.15' numOctaves='3' seed='7' stitchTiles='stitch' result='n'/>
//     <feColorMatrix in='n' type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0'/>
//   </filter>
//   <rect width='100%' height='100%' filter='url(#b)'/>
// </svg>`)}")`;

// function buildBricks({ width, height, brickWidth, brickHeight, gap, rows, taperStep = 1 }) {

//   const baseCols = Math.max(1, Math.round(width / (brickWidth + gap)));
//   const totalH = rows * (brickHeight + gap);
//   const offsetY = height - totalH; 

//   const bricks = [];
//   for (let r = 0; r < rows; r++) {
//     // كل ما طلعنا صف لفوق (r بيكبر) بينقص عدد الطوب — عشان يبان الشكل مايل/مثلث
//     const colsInRow = Math.max(1, baseCols - r * taperStep);
//     const y = offsetY + (rows - 1 - r) * (brickHeight + gap);
//     for (let c = 0; c < colsInRow; c++) {
//       const x = c * (brickWidth + gap); // كله بيبدأ من نفس الحافة (x=0) عشان الخط الخارجي يفضل مستقيم
//       bricks.push({ x, y, row: r });
//     }
//   }
//   return { bricks, maxRow: rows - 1 };
// }

// export function BricksAccentBackground({
//   className,
//   backgroundColor = "#FFFFFF",
//   brickWidth = 64,
//   brickHeight = 28,
//   gap = 4,
//   rows = 3, // عدد صفوف الطوب في آخر السكشن بس
//   edgeWidth = 180,
//   opacity = 0.1,
//   fallDuration = 2.5, // نزول أبطأ من قبل
//   rowStagger = 0.4, // فرق التوقيت بين كل صف والتاني — كل ما زاد، الحركة تبان أهدأ وأتدرّج
//   taperStep = 1, // عدد الطوبات اللي بتقل كل ما طلعنا صف لفوق (1 = زي المثال: 5 ثم 4 ثم 3)
//   showMortar = true, // إظهار لون الملاط بين الطوب
//   children,
// }) {
//   const containerRef = useRef(null);
//   const wallRef = useRef(null);

//   useEffect(() => {
//     const reduceMotion =
//       typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

//     const container = containerRef.current;
//     const wall = wallRef.current;
//     if (!container || !wall) return;

//     // بيتحط true أول مرة الطوب يترسم (سواء بالأنيميشن أو ثابت لو reduceMotion) —
//     // وبعد كده مبيتمسحش تاني ولا بيتصفّر لما السكشن يخرج من الشاشة
//     const hasAnimatedRef = { current: false };

//     const paint = (animate) => {
//       const { width, height } = container.getBoundingClientRect();
//       if (!width || !height) return;

//       const scale = width < 480 ? 0.6 : width < 768 ? 0.8 : 1;
//       const rBW = Math.round(brickWidth * scale);
//       const rBH = Math.round(brickHeight * scale);
//       const rGap = Math.max(2, Math.round(gap * scale));
//       const rEdgeWidth = Math.min(Math.max(width * 0.18, rBW + rGap), edgeWidth);

//       wall.innerHTML = "";

//       if (showMortar) {
//         wall.style.background = MORTAR_COLOR;
//         wall.style.opacity = String(opacity);
//       } else {
//         wall.style.background = "transparent";
//         wall.style.opacity = "1";
//       }

//       const { bricks: edgeBricks, maxRow } = buildBricks({
//         width: rEdgeWidth,
//         height,
//         brickWidth: rBW,
//         brickHeight: rBH,
//         gap: rGap,
//         rows,
//         taperStep,
//       });
//       const bricks = [
//         ...edgeBricks,
//         // انعكاس حقيقي (reflection) حوالين خط النص، مش مجرد نقل للنسخة —
//         // عشان جهة اليمين تطلع بالظبط عكس شكل جهة الشمال
//         ...edgeBricks.map((brick) => ({ ...brick, x: width - brick.x - rBW })),
//       ];

//       bricks
//         .slice()
//         .sort((a, b) => b.row - a.row)
//         .forEach((b) => {
//           const el = document.createElement("div");
//           el.style.position = "absolute";
//           el.style.width = `${rBW}px`;
//           el.style.height = `${rBH}px`;
//           el.style.left = `${b.x}px`;
//           el.style.top = `${b.y}px`;
//           el.style.borderRadius = "1px";

//           // لون الطوبة نفسها بيختلف شوية عن جارتها زي الطوب الحقيقي
//           const shade = BRICK_SHADES[hashToIndex(b.x, b.row, BRICK_SHADES.length)];
//           const nx = Math.round(hash01(b.x, b.row) * 120);
//           const ny = Math.round(hash01(b.row, b.x) * 120);
//           const grooveGap = Math.max(4, Math.round(rBH / 6));

//           el.style.backgroundColor = shade;
//           el.style.backgroundImage = `
//             linear-gradient(160deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 30%, rgba(0,0,0,0.25) 100%),
//             repeating-linear-gradient(0deg, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 1px, transparent 1px, transparent ${grooveGap}px),
//             repeating-linear-gradient(90deg, rgba(0,0,0,0.12) 0px, transparent 1px, transparent 5px),
//             ${BRICK_TEXTURE_URL}
//           `;
//           el.style.backgroundBlendMode = "soft-light, multiply, multiply, overlay";
//           el.style.backgroundPosition = `0 0, 0 0, 0 0, ${nx}px ${ny}px`;
//           el.style.backgroundSize = "100% 100%, 100% 100%, 100% 100%, 120px 120px";
//           el.style.boxShadow =
//             "inset 0 1.5px 0 rgba(255,255,255,0.25), inset 0 -1.5px 2px rgba(0,0,0,0.35), inset 1px 0 0 rgba(0,0,0,0.15), inset -1px 0 0 rgba(255,255,255,0.08)";

//           if (animate && !reduceMotion) {
//             const delay = ((maxRow - b.row) * rowStagger + Math.random() * 0.12).toFixed(2);
//             el.style.opacity = "0";
//             el.style.setProperty("--target-opacity", showMortar ? "1" : opacity);
//             el.style.setProperty("--fall-distance", `${-(height + rBH)}px`);
//             // إيزنج ناعم من غير أي ارتداد (bounce) — نزول متدرّج وهادي
//             el.style.animation = `bricks-accent-fall-in ${fallDuration}s ${delay}s cubic-bezier(0.33,1,0.68,1) both`;
//           } else {
//             el.style.opacity = showMortar ? "1" : String(opacity);
//           }

//           wall.appendChild(el);
//         });
//     };

//     // لو السكشن اتغير ارتفاعه بعد ما الطوب اترسم (مثلاً الصور جوه AboutSection
//     // خلصت تحميل وزودت الارتفاع) — بنعيد رسم الطوب في مكانه الصح "بهدوء" من
//     // غير ما نشغل أنيميشن النزول تاني، عشان آخر صف يفضل ملاصق للحافة الحقيقية
//     const handleResize = () => {
//       if (hasAnimatedRef.current) paint(false);
//     };
//     const resizeObserver = new ResizeObserver(handleResize);
//     resizeObserver.observe(container);

//     let io;
//     if (reduceMotion) {
//       paint(false);
//       hasAnimatedRef.current = true;
//     } else {
//       io = new IntersectionObserver(
//         (entries) => {
//           entries.forEach((entry) => {
//             // بيترسم مرة واحدة بس أول ما السكشن يدخل الشاشة، وبعدها بنوقف
//             // المراقبة خالص — فمفيش أي مسح أو إعادة رسم لما السكشن يخرج
//             // من الشاشة تاني، والطوب بيفضل موجود لحد ما تكملي سكرول عادي
//             if (entry.isIntersecting && !hasAnimatedRef.current) {
//               hasAnimatedRef.current = true;
//               paint(true);
//               io.unobserve(container);
//             }
//           });
//         },
//         { threshold: 0.15 }
//       );
//       io.observe(container);
//     }

//     return () => {
//       resizeObserver.disconnect();
//       if (io) io.disconnect();
//     };
//   }, [brickWidth, brickHeight, gap, rows, edgeWidth, opacity, fallDuration, rowStagger, taperStep, showMortar]);




//   return (
//     <div
//       ref={containerRef}
//       className={className}
//       style={{ position: "relative", overflow: "hidden", width: "100%", background: backgroundColor }}
//     >
//       <style>{`
//         @keyframes bricks-accent-fall-in {
//           0%   { transform: translateY(var(--fall-distance)); opacity: 0; }
//           45%  { opacity: var(--target-opacity); }
//           100% { transform: translateY(0); opacity: var(--target-opacity); }
//         }
//       `}</style>

//       <div
//         ref={wallRef}
//         aria-hidden="true"
//         style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
//       />

//       <div style={{ position: "relative", zIndex: 10 }}>{children}</div>
//     </div>
//   );
// }

// export default BricksAccentBackground;



import { useEffect, useRef } from "react";

const BRICK_SHADES = [
  "#E8C1B3",
  "#E5B9AA",
  "#DDB0A0",
  "#EAC6B9",
  "#E2B7A7",
  "#E6BDAF",
];

const MORTAR_COLOR = "#C9C2B4";

function hashToIndex(x, y, mod) {
  const h = Math.abs(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453);
  return Math.floor((h - Math.floor(h)) * mod);
}

function hash01(x, y) {
  const h = Math.abs(Math.sin(x * 45.233 + y * 19.71) * 12543.111);
  return h - Math.floor(h);
}

const BRICK_TEXTURE_URL = `url("data:image/svg+xml,${encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'>
  <filter id='b'>
    <feTurbulence type='fractalNoise' baseFrequency='0.012 0.15' numOctaves='3' seed='7' stitchTiles='stitch' result='n'/>
    <feColorMatrix in='n' type='matrix' values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0'/>
  </filter>
  <rect width='100%' height='100%' filter='url(#b)'/>
</svg>`)}")`;

function buildBricks({ width, height, brickWidth, brickHeight, gap, rows, taperStep = 1 }) {
  const baseCols = Math.max(1, Math.round(width / (brickWidth + gap)));
  const totalH = rows * (brickHeight + gap);
  const offsetY = height - totalH;

  const bricks = [];
  for (let r = 0; r < rows; r++) {
    const colsInRow = Math.max(1, baseCols - r * taperStep);
    const y = offsetY + (rows - 1 - r) * (brickHeight + gap);
    for (let c = 0; c < colsInRow; c++) {
      const x = c * (brickWidth + gap);
      bricks.push({ x, y, row: r });
    }
  }
  return { bricks, maxRow: rows - 1 };
}

export function BricksAccentBackground({
  className,
  backgroundColor = "#FFFFFF",
  brickWidth = 64,
  brickHeight = 28,
  gap = 4,
  rows = 3,
  edgeWidth = 180,
  opacity = 0.1,
  fallDuration = 2.5,
  rowStagger = 0.4,
  taperStep = 1,
  showMortar = true,
  children,
}) {
  const containerRef = useRef(null);
  const wallRef = useRef(null);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const container = containerRef.current;
    const wall = wallRef.current;
    if (!container || !wall) return;

    const hasEverPaintedRef = { current: false };
    const isVisibleRef = { current: false };

    const paint = (animate) => {
      // const { width, height } = container.getBoundingClientRect();
      // if (!width || !height) return;

        const width = container.offsetWidth;
  const height = container.offsetHeight;
  if (!width || !height) return;


      const scale = width < 480 ? 0.6 : width < 768 ? 0.8 : 1;
      const rBW = Math.round(brickWidth * scale);
      const rBH = Math.round(brickHeight * scale);
      const rGap = Math.max(2, Math.round(gap * scale));
      const rEdgeWidth = Math.min(Math.max(width * 0.18, rBW + rGap), edgeWidth);

      wall.innerHTML = "";

      if (showMortar) {
        wall.style.background = MORTAR_COLOR;
        wall.style.opacity = String(opacity);
      } else {
        wall.style.background = "transparent";
        wall.style.opacity = "1";
      }

      const { bricks: edgeBricks, maxRow } = buildBricks({
        width: rEdgeWidth,
        height,
        brickWidth: rBW,
        brickHeight: rBH,
        gap: rGap,
        rows,
        taperStep,
      });
      const bricks = [
        ...edgeBricks,
        ...edgeBricks.map((brick) => ({ ...brick, x: width - brick.x - rBW })),
      ];

      bricks
        .slice()
        .sort((a, b) => b.row - a.row)
        .forEach((b) => {
          const el = document.createElement("div");
          el.style.position = "absolute";
          el.style.width = `${rBW}px`;
          el.style.height = `${rBH}px`;
          el.style.left = `${b.x}px`;
          el.style.top = `${b.y}px`;
          el.style.borderRadius = "1px";

          const shade = BRICK_SHADES[hashToIndex(b.x, b.row, BRICK_SHADES.length)];
          const nx = Math.round(hash01(b.x, b.row) * 120);
          const ny = Math.round(hash01(b.row, b.x) * 120);
          const grooveGap = Math.max(4, Math.round(rBH / 6));

          el.style.backgroundColor = shade;
          el.style.backgroundImage = `
            linear-gradient(160deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 30%, rgba(0,0,0,0.25) 100%),
            repeating-linear-gradient(0deg, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 1px, transparent 1px, transparent ${grooveGap}px),
            repeating-linear-gradient(90deg, rgba(0,0,0,0.12) 0px, transparent 1px, transparent 5px),
            ${BRICK_TEXTURE_URL}
          `;
          el.style.backgroundBlendMode = "soft-light, multiply, multiply, overlay";
          el.style.backgroundPosition = `0 0, 0 0, 0 0, ${nx}px ${ny}px`;
          el.style.backgroundSize = "100% 100%, 100% 100%, 100% 100%, 120px 120px";
          el.style.boxShadow =
            "inset 0 1.5px 0 rgba(255,255,255,0.25), inset 0 -1.5px 2px rgba(0,0,0,0.35), inset 1px 0 0 rgba(0,0,0,0.15), inset -1px 0 0 rgba(255,255,255,0.08)";

          if (animate && !reduceMotion) {
            const delay = ((maxRow - b.row) * rowStagger + Math.random() * 0.12).toFixed(2);
            el.style.opacity = "0";
            el.style.setProperty("--target-opacity", showMortar ? "1" : opacity);
            el.style.setProperty("--fall-distance", `${-(height + rBH)}px`);
            el.style.animation = `bricks-accent-fall-in ${fallDuration}s ${delay}s cubic-bezier(0.33,1,0.68,1) both`;
          } else {
            el.style.opacity = showMortar ? "1" : String(opacity);
          }

          wall.appendChild(el);
        });
    };

    const handleResize = () => {
      if (hasEverPaintedRef.current) paint(false);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    let io;
    if (reduceMotion) {
      paint(false);
      hasEverPaintedRef.current = true;
    } else {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isVisibleRef.current) {
              isVisibleRef.current = true;
              hasEverPaintedRef.current = true;
              requestAnimationFrame(() => {
                requestAnimationFrame(() => paint(true));
              });
            } else if (!entry.isIntersecting) {
              isVisibleRef.current = false;
            }
          });
        },
        { threshold: 0.15 }
      );
      io.observe(container);
    }

    return () => {
      resizeObserver.disconnect();
      if (io) io.disconnect();
    };
  }, [brickWidth, brickHeight, gap, rows, edgeWidth, opacity, fallDuration, rowStagger, taperStep, showMortar]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", overflow: "hidden", width: "100%", background: backgroundColor }}
    >
      <style>{`
        @keyframes bricks-accent-fall-in {
          0%   { transform: translateY(var(--fall-distance)); opacity: 0; }
          45%  { opacity: var(--target-opacity); }
          100% { transform: translateY(0); opacity: var(--target-opacity); }
        }
      `}</style>

      <div
        ref={wallRef}
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
      />

      <div style={{ position: "relative", zIndex: 10 }}>{children}</div>
    </div>
  );
}

export default BricksAccentBackground;