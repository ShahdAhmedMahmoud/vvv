import { useEffect, useRef, useState } from "react";

/**
 * AnimatedCheckBackground
 * A large, hand-drawn-style black check mark that draws itself once
 * the parent section scrolls into view. Pure SVG + stroke-dasharray/
 * stroke-dashoffset — no animation library required.
 *
 * Usage:
 *   <AnimatedCheckBackground className="absolute inset-0 flex items-center justify-center" />
 */
export default function AnimatedCheckBackground({
  className = "",
  strokeColor = "#000000",
  durationMs = 6500, // total draw duration (5–8s recommended)
  once = true,
}) {
  const containerRef = useRef(null);
  const pathRefs = useRef([]);
  const [inView, setInView] = useState(false);
  const [lengths, setLengths] = useState([]);

  /**
   * The check mark is built from three short overlapping strokes instead
   * of one perfectly smooth path — this is what gives it the natural,
   * slightly-imperfect "drawn by hand" feel instead of a vector-perfect
   * icon look. Coordinates are on a 400x300 canvas.
   *
   * seg 1: the short downward stroke (start of the check)
   * seg 2: the long upward sweeping stroke (main body of the check)
   * seg 3: a tiny natural "overshoot" flick at the tip, like a pen
   *        lifting off — subtle, adds realism without looking messy.
   */
  const segments = [
    {
      id: "stroke-down",
      d: "M62,158 C70,166 78,175 87,185 C97,196 106,207 116,219",
    },
    {
      id: "stroke-up",
      d: "M116,219 C142,190 168,159 196,127 C230,89 265,52 302,17 C314,6 322,-1 332,-8",
    },
    {
      id: "flick",
      d: "M328,-9 C332,-11 335,-11 338,-9",
    },
  ];

  // Measure real path lengths so dasharray/dashoffset are pixel-accurate.
  useEffect(() => {
    const measured = pathRefs.current.map((el) => (el ? el.getTotalLength() : 0));
    setLengths(measured);
  }, []);

  // Start the draw once the component scrolls into the viewport.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.unobserve(node);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  // Split total duration across segments proportional to their length,
  // so the pen moves at a consistent, natural speed the whole way
  // through rather than segments finishing at mismatched paces.
  const totalLen = lengths.reduce((a, b) => a + b, 0) || 1;
  let elapsed = 0;
  const segmentTimings = segments.map((seg, i) => {
    const len = lengths[i] || 0;
    const duration = (len / totalLen) * durationMs;
    const delay = elapsed;
    elapsed += duration;
    return { duration, delay };
  });

  return (
    <div ref={containerRef} className={className} aria-hidden="true">
      <svg
        viewBox="-20 -40 400 300"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        fill="none"
      >
        {segments.map((seg, i) => {
          const len = lengths[i] || 1000;
          const { duration, delay } = segmentTimings[i];
          return (
            <path
              key={seg.id}
              ref={(el) => (pathRefs.current[i] = el)}
              d={seg.d}
              stroke={strokeColor}
              strokeWidth={7}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: len,
                strokeDashoffset: inView ? 0 : len,
                transition: inView
                  ? `stroke-dashoffset ${duration}ms ease-in-out ${delay}ms`
                  : "none",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}