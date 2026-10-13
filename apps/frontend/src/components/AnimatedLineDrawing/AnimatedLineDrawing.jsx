import { useLayoutEffect, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedLineDrawing({ svgUrl, className = "", containerRef }) {
  const wrapperRef = useRef(null);
  const [svgMarkup, setSvgMarkup] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(svgUrl)
      .then((res) => res.text())
      .then((text) => {
        if (!cancelled) setSvgMarkup(text);
      })
      .catch((err) => console.error("Failed to load SVG:", err));
    return () => {
      cancelled = true;
    };
  }, [svgUrl]);

  useLayoutEffect(() => {
    const section = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !wrapper || !svgMarkup) return undefined;

    const svgEl = wrapper.querySelector("svg");
    if (!svgEl) return undefined;

    const drawable = Array.from(
      svgEl.querySelectorAll("path, line, polyline, polygon, circle, ellipse, rect")
    );
    if (drawable.length === 0) return undefined;

    drawable.forEach((el) => {
      el.setAttribute("fill", "none");
      el.setAttribute("stroke", "#000000");
      if (!el.getAttribute("stroke-width")) el.setAttribute("stroke-width", "6");
      el.setAttribute("stroke-linecap", "round");
      el.setAttribute("stroke-linejoin", "round");
    });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lengths = drawable.map((el) => {
      if (typeof el.getTotalLength === "function") {
        try {
          return el.getTotalLength();
        } catch {
          return 200;
        }
      }
      return 200;
    });

    drawable.forEach((el, i) => {
      const len = lengths[i];
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
    });

    if (reduceMotion) {
      drawable.forEach((el) => (el.style.strokeDashoffset = "0"));
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
          drawable.forEach((el, i) => {
            const len = lengths[i];
            const duration = (len / totalLen) * totalDuration;
            el.style.transition = `stroke-dashoffset ${duration}ms ease-in-out ${elapsed}ms`;
            el.style.strokeDashoffset = "0";
            elapsed += duration;
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, [containerRef, svgMarkup]);

  return (
    <div
      ref={wrapperRef}
      className={`pointer-events-none [&_svg]:h-full [&_svg]:w-full ${className}`}
      aria-hidden="true"
      dangerouslySetInnerHTML={svgMarkup ? { __html: svgMarkup } : undefined}
    />
  );
}