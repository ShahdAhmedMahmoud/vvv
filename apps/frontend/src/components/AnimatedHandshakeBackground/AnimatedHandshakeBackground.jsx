import { useLayoutEffect, useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedHandshakeBackground({ className = "", containerRef }) {
  const pathRefs = useRef([]);
  const dotRefs = useRef([]);
  const [lengths, setLengths] = useState([]);

  const segments = [
    { id: "left-cuff", d: "M60,55 L185,15 L300,90 L288,148 L232,260 L188,270 L108,192 L60,55 Z" },
    { id: "left-cuff-fold", d: "M112,95 L215,50 L282,118" },
    { id: "left-arm", d: "M232,260 C248,268 262,278 278,290 C300,306 322,318 348,326" },
    { id: "right-cuff", d: "M890,55 L765,15 L650,90 L662,148 L718,260 L762,270 L842,192 L890,55 Z" },
    { id: "right-cuff-fold", d: "M838,95 L735,50 L668,118" },
    { id: "right-arm", d: "M718,260 C702,268 688,278 672,290 C650,306 628,318 602,326" },
    {
      id: "thumb",
      d: "M355,255 C345,225 352,192 378,172 C398,157 424,153 448,160 C468,166 480,182 478,200",
    },
    {
      id: "top-ridge",
      d: "M348,326 C368,300 390,282 415,275 C432,270 448,276 458,290 C468,304 484,308 500,300 C518,291 534,296 545,310 C556,324 574,328 590,318 L602,326",
    },
    {
      id: "fingers",
      d: `
        M355,330
        C345,355 344,380 356,400
        C362,410 374,414 384,408
        C394,402 396,388 390,376
        C398,396 414,410 432,408
        C448,406 456,392 450,378
        C460,396 478,406 496,400
        C512,394 516,378 506,366
        C518,380 536,384 550,376
        C562,369 564,354 555,344
      `,
    },
  ];

  useEffect(() => {
    const measured = pathRefs.current.map((el) => (el ? el.getTotalLength() : 0));
    setLengths(measured);
  }, []);

  useLayoutEffect(() => {
    const section = containerRef.current;
    const paths = pathRefs.current.filter(Boolean);
    const dots = dotRefs.current.filter(Boolean);
    if (!section || paths.length === 0 || lengths.length === 0) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    paths.forEach((p, i) => {
      const len = lengths[i] || p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });
    dots.forEach((d) => (d.style.opacity = "0"));

    if (reduceMotion) {
      paths.forEach((p) => (p.style.strokeDashoffset = "0"));
      dots.forEach((d) => (d.style.opacity = "1"));
      return undefined;
    }

    const totalLen = lengths.reduce((a, b) => a + b, 0) || 1;
    const totalDuration = 10000;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 78%",
        once: true,
        onEnter: () => {
          let elapsed = 0;
          paths.forEach((p, i) => {
            const len = lengths[i] || 0;
            const duration = (len / totalLen) * totalDuration;
            p.style.transition = `stroke-dashoffset ${duration}ms ease-in-out ${elapsed}ms`;
            p.style.strokeDashoffset = "0";
            elapsed += duration;
          });
          dots.forEach((d, i) => {
            d.style.transition = `opacity 400ms ease-out ${800 + i * 150}ms`;
            d.style.opacity = "1";
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, [containerRef, lengths]);

  return (
    <svg
      className={`pointer-events-none ${className}`}
      viewBox="30 0 890 430"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden="true"
    >
      {segments.map((seg, i) => (
        <path
          key={seg.id}
          ref={(el) => (pathRefs.current[i] = el)}
          d={seg.d}
          stroke="#000000"
          strokeWidth={8}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      <circle ref={(el) => (dotRefs.current[0] = el)} cx="145" cy="195" r="6" fill="#000000" />
      <circle ref={(el) => (dotRefs.current[1] = el)} cx="170" cy="205" r="6" fill="#000000" />
      <circle ref={(el) => (dotRefs.current[2] = el)} cx="805" cy="195" r="6" fill="#000000" />
      <circle ref={(el) => (dotRefs.current[3] = el)} cx="780" cy="205" r="6" fill="#000000" />
    </svg>
  );
}