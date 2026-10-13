import { useEffect, useRef, useState } from "react";

/**
 * AnimatedTowerCrane
 * A single-line, hand-drawn-style SVG tower crane that draws itself
 * top-to-bottom when scrolled into view. No animation libraries required.
 *
 * Usage:
 *   <AnimatedTowerCrane className="absolute top-0 left-4 h-full w-40" />
 */
export default function AnimatedTowerCrane({
  className = "",
  strokeColor = "#000000",
  strokeWidth = 1.75,
  durationMs = 10000, // total draw duration (8-12s recommended)
  once = true,
}) {
  const containerRef = useRef(null);
  const pathRefs = useRef([]);
  const [inView, setInView] = useState(false);
  const [lengths, setLengths] = useState([]);

  // Ordered so the crane draws in a logical sequence:
  // 1) mast (top -> bottom), 2) mast lattice bracing, 3) apex/cab,
  // 4) jib (long arm), 5) counter-jib (short arm), 6) ties, 7) hook line.
  const segments = [
    {
      id: "mast",
      d: "M100,40 L100,470",
    },
    {
      id: "lattice-1",
      d: "M100,90 L86,105 L100,120 L114,135 L100,150",
    },
    {
      id: "lattice-2",
      d: "M100,150 L86,165 L100,180 L114,195 L100,210",
    },
    {
      id: "lattice-3",
      d: "M100,210 L86,225 L100,240 L114,255 L100,270",
    },
    {
      id: "lattice-4",
      d: "M100,270 L86,285 L100,300 L114,315 L100,330",
    },
    {
      id: "apex",
      d: "M100,40 L100,20 M84,40 L116,40",
    },
    {
      id: "jib",
      d: "M100,40 L230,40",
    },
    {
      id: "counter-jib",
      d: "M100,40 L40,40",
    },
    {
      id: "jib-tie",
      d: "M100,20 L215,40",
    },
    {
      id: "counter-jib-tie",
      d: "M100,20 L40,40",
    },
    {
      id: "counterweight",
      d: "M32,40 L32,54 L48,54 L48,40",
    },
    {
      id: "trolley",
      d: "M180,40 L180,50",
    },
    {
      id: "hook-line",
      d: "M180,50 L180,90",
    },
    {
      id: "hook",
      d: "M175,90 Q180,98 185,90",
    },
    {
      id: "base",
      d: "M80,470 L120,470 M100,470 L100,485 M85,485 L115,485",
    },
  ];

  // Measure each path's real length so dasharray/dashoffset are exact.
  useEffect(() => {
    const measured = pathRefs.current.map((el) =>
      el ? el.getTotalLength() : 0
    );
    setLengths(measured);
  }, []);

  // Trigger the draw once the component scrolls into the viewport.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

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
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  // Stagger each segment's start so the crane draws in sequence rather
  // than every line animating at once.
  const perSegmentDelay = durationMs / segments.length / 1.4;
  const perSegmentDuration = durationMs / segments.length + 400;

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      <svg
        viewBox="0 0 260 520"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        fill="none"
      >
        {segments.map((seg, i) => {
          const len = lengths[i] || 1000;
          return (
            <path
              key={seg.id}
              ref={(el) => (pathRefs.current[i] = el)}
              d={seg.d}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: len,
                strokeDashoffset: inView ? 0 : len,
                transition: inView
                  ? `stroke-dashoffset ${perSegmentDuration}ms ease-in-out ${
                      i * perSegmentDelay
                    }ms`
                  : "none",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}