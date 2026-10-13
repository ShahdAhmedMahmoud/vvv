
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

export const FullScreenScrollFX = forwardRef((props, ref) => {
  const {
    sections,
    className,
    style,

    fontFamily = '"Rubik Wide", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
    header,
    footer,
    gap = 1,
    gridPaddingX = 2,

    // ✅ جديد: ارتفاع النافبار بالبكسل، عشان المحتوى يظهر تحتها مش وراها
    navbarHeight = 80,
    // ✅ جديد: تحكم في وضوح الصورة (كانت مظلمة أوي 0.8)
    imageBrightness = 0.95,

    showProgress = true,
    debug = false,

    durations = { change: 0.7, snap: 800 },
    reduceMotion,

    bgTransition = "fade",
    parallaxAmount = 4,

    currentIndex,
    onIndexChange,
    initialIndex = 0,

    colors = {
      text: "rgba(245,245,245,0.92)",
      overlay: "rgba(0,0,0,0.35)",
      pageBg: "#ffffff",
      stageBg: "#000000",
    },

    apiRef,
    ariaLabel = "Full screen scroll slideshow",
  } = props;

  const total = sections.length;
  const [localIndex, setLocalIndex] = useState(clamp(initialIndex, 0, Math.max(0, total - 1)));
  const isControlled = typeof currentIndex === "number";
  const index = isControlled ? clamp(currentIndex, 0, Math.max(0, total - 1)) : localIndex;

  const rootRef = useRef(null);
  const fixedRef = useRef(null);
  const fixedSectionRef = useRef(null);

  const bgRefs = useRef([]);
  const wordRefs = useRef([]);

  const leftTrackRef = useRef(null);
  const rightTrackRef = useRef(null);
  const leftItemRefs = useRef([]);
  const rightItemRefs = useRef([]);

  const progressFillRef = useRef(null);
  const currentNumberRef = useRef(null);

  const stRef = useRef(null);
  const lastIndexRef = useRef(index);
  const isAnimatingRef = useRef(false);
  const isSnappingRef = useRef(false);
  const sectionTopRef = useRef([]);

  const prefersReduced = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  const motionOff = reduceMotion ?? prefersReduced;

  const tempWordBucket = useRef([]);
  const splitWords = (text) => {
    const words = text.split(/\s+/).filter(Boolean);
    return words.map((w, i) => (
      <span className="inline-block overflow-hidden align-middle" key={i}>
        <span
          className="inline-block align-middle"
          ref={(el) => el && tempWordBucket.current.push(el)}
        >
          {w}
        </span>
        {i < words.length - 1 ? " " : null}
      </span>
    ));
  };
  const WordsCollector = ({ onReady }) => {
    useEffect(() => onReady(), []); // eslint-disable-line
    return null;
  };

  const computePositions = () => {
    const el = fixedSectionRef.current;
    if (!el) return;
    const top = el.offsetTop;
    const h = el.offsetHeight;
    const arr = [];
    for (let i = 0; i < total; i++) arr.push(top + (h * i) / total);
    sectionTopRef.current = arr;
  };

  const measureAndCenterLists = (toIndex = index, animate = true) => {
    const centerTrack = (container, items, isRight) => {
      if (!container || items.length === 0) return;
      const first = items[0];
      const second = items[1];
      const contRect = container.getBoundingClientRect();
      let rowH = first.getBoundingClientRect().height;
      if (second) {
        rowH = second.getBoundingClientRect().top - first.getBoundingClientRect().top;
      }
      const targetY = contRect.height / 2 - rowH / 2 - toIndex * rowH;
      const prop = isRight ? rightTrackRef : leftTrackRef;
      if (!prop.current) return;
      if (animate) {
        gsap.to(prop.current, {
          y: targetY,
          duration: (durations.change ?? 0.7) * 0.9,
          ease: "power3.out",
        });
      } else {
        gsap.set(prop.current, { y: targetY });
      }
    };

    measureRAF(() => {
      measureRAF(() => {
        centerTrack(leftTrackRef.current, leftItemRefs.current, false);
        centerTrack(rightTrackRef.current, rightItemRefs.current, true);
      });
    });
  };

  const measureRAF = (fn) => {
    if (typeof window === "undefined") return;
    requestAnimationFrame(() => requestAnimationFrame(fn));
  };

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const fixed = fixedRef.current;
    const fs = fixedSectionRef.current;
    if (!fixed || !fs || total === 0) return;

    gsap.set(bgRefs.current, { opacity: 0, scale: 1.04, yPercent: 0 });
    if (bgRefs.current[0]) gsap.set(bgRefs.current[0], { opacity: 1, scale: 1 });

    wordRefs.current.forEach((words, sIdx) => {
      words.forEach((w) => {
        gsap.set(w, {
          yPercent: sIdx === index ? 0 : 100,
          opacity: sIdx === index ? 1 : 0,
        });
      });
    });

    computePositions();
    measureAndCenterLists(index, false);

    const st = ScrollTrigger.create({
      trigger: fs,
      start: "top top",
      end: "bottom bottom",
      pin: fixed,
      pinSpacing: true,
      onUpdate: (self) => {
        if (motionOff || isSnappingRef.current) return;
        const prog = self.progress;
        const target = Math.min(total - 1, Math.floor(prog * total));
        if (target !== lastIndexRef.current && !isAnimatingRef.current) {
          const next = lastIndexRef.current + (target > lastIndexRef.current ? 1 : -1);
          goTo(next, false);
        }
        if (progressFillRef.current) {
          const p = (lastIndexRef.current / (total - 1 || 1)) * 100;
          progressFillRef.current.style.width = `${p}%`;
        }
      },
    });

    stRef.current = st;

    if (initialIndex && initialIndex > 0 && initialIndex < total) {
      requestAnimationFrame(() => goTo(initialIndex, false));
    }

    const ro = new ResizeObserver(() => {
      computePositions();
      measureAndCenterLists(lastIndexRef.current, false);
      ScrollTrigger.refresh();
    });
    ro.observe(fs);

    return () => {
      ro.disconnect();
      st.kill();
      stRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, initialIndex, motionOff, bgTransition, parallaxAmount, navbarHeight]);

  const changeSection = (to) => {
    if (to === lastIndexRef.current || isAnimatingRef.current) return;
    const from = lastIndexRef.current;
    const down = to > from;
    isAnimatingRef.current = true;

    if (!isControlled) setLocalIndex(to);
    onIndexChange?.(to);

    if (currentNumberRef.current) {
      currentNumberRef.current.textContent = String(to + 1).padStart(2, "0");
    }
    if (progressFillRef.current) {
      const p = (to / (total - 1 || 1)) * 100;
      progressFillRef.current.style.width = `${p}%`;
    }

    const D = durations.change ?? 0.7;

    const outWords = wordRefs.current[from] || [];
    const inWords = wordRefs.current[to] || [];
    if (outWords.length) {
      gsap.to(outWords, {
        yPercent: down ? -100 : 100,
        opacity: 0,
        duration: D * 0.6,
        stagger: down ? 0.03 : -0.03,
        ease: "power3.out",
      });
    }
    if (inWords.length) {
      gsap.set(inWords, { yPercent: down ? 100 : -100, opacity: 0 });
      gsap.to(inWords, {
        yPercent: 0,
        opacity: 1,
        duration: D,
        stagger: down ? 0.05 : -0.05,
        ease: "power3.out",
      });
    }

    const prevBg = bgRefs.current[from];
    const newBg = bgRefs.current[to];
    if (bgTransition === "fade") {
      if (newBg) {
        gsap.set(newBg, { opacity: 0, scale: 1.04, yPercent: down ? 1 : -1 });
        gsap.to(newBg, { opacity: 1, scale: 1, yPercent: 0, duration: D, ease: "power2.out" });
      }
      if (prevBg) {
        gsap.to(prevBg, {
          opacity: 0,
          yPercent: down ? -parallaxAmount : parallaxAmount,
          duration: D,
          ease: "power2.out",
        });
      }
    } else {
      if (newBg) {
        gsap.set(newBg, {
          opacity: 1,
          clipPath: down ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)",
          scale: 1,
          yPercent: 0,
        });
        gsap.to(newBg, { clipPath: "inset(0 0 0 0)", duration: D, ease: "power3.out" });
      }
      if (prevBg) {
        gsap.to(prevBg, { opacity: 0, duration: D * 0.8, ease: "power2.out" });
      }
    }

    measureAndCenterLists(to, true);

    leftItemRefs.current.forEach((el, i) => {
      if (!el) return;
      el.classList.toggle("fx-active-left", i === to);
      gsap.to(el, {
        opacity: i === to ? 1 : 0.35,
        x: i === to ? 10 : 0,
        duration: D * 0.6,
        ease: "power3.out",
      });
    });
    rightItemRefs.current.forEach((el, i) => {
      if (!el) return;
      el.classList.toggle("fx-active-right", i === to);
      gsap.to(el, {
        opacity: i === to ? 1 : 0.35,
        x: i === to ? -10 : 0,
        duration: D * 0.6,
        ease: "power3.out",
      });
    });

    gsap.delayedCall(D, () => {
      lastIndexRef.current = to;
      isAnimatingRef.current = false;
    });
  };

  const goTo = (to, withScroll = true) => {
    const clamped = clamp(to, 0, total - 1);
    isSnappingRef.current = true;
    changeSection(clamped);

    const pos = sectionTopRef.current[clamped];
    const snapMs = durations.snap ?? 800;

    if (withScroll && typeof window !== "undefined") {
      window.scrollTo({ top: pos, behavior: "smooth" });
      setTimeout(() => (isSnappingRef.current = false), snapMs);
    } else {
      setTimeout(() => (isSnappingRef.current = false), 10);
    }
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useImperativeHandle(apiRef, () => ({
    next,
    prev,
    goTo,
    getIndex: () => index,
    refresh: () => ScrollTrigger.refresh(),
  }));

  const handleJump = (i) => goTo(i);
  const handleLoadedStagger = () => {
    leftItemRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        { opacity: i === index ? 1 : 0.35, y: 0, duration: 0.5, delay: i * 0.06, ease: "power3.out" }
      );
    });
    rightItemRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        { opacity: i === index ? 1 : 0.35, y: 0, duration: 0.5, delay: 0.2 + i * 0.06, ease: "power3.out" }
      );
    });
  };

  useEffect(() => {
    handleLoadedStagger();
    measureAndCenterLists(index, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  const cssVars = {
    "--fx-font": fontFamily,
    "--fx-text": colors.text ?? "rgba(245,245,245,0.92)",
    "--fx-overlay": colors.overlay ?? "rgba(0,0,0,0.35)",
    "--fx-page-bg": colors.pageBg ?? "#fff",
    "--fx-stage-bg": colors.stageBg ?? "#000",
    "--fx-gap": `${gap}rem`,
    "--fx-grid-px": `${gridPaddingX}rem`,
  };

  const fixedSectionHeight = `${Math.max(1, total + 1)}00vh`;

  return (
    <div
      ref={(node) => {
        rootRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      className={["w-full overflow-hidden uppercase tracking-tight text-black", className]
        .filter(Boolean)
        .join(" ")}
      style={{
        ...cssVars,
        ...style,
        backgroundColor: "var(--fx-page-bg)",
        fontFamily: "var(--fx-font)",
      }}
      aria-label={ariaLabel}
    >
      {debug && (
        <div className="fixed bottom-2.5 right-2.5 z-[9999] rounded bg-white/80 px-2 py-1.5 text-xs font-mono text-black">
          Section: {index}
        </div>
      )}

      <div className="relative">
        {/* fx-fixed-section: هنا بيتحدد طول الـ pin كله حسب عدد المشاريع */}
        <div ref={fixedSectionRef} className="relative" style={{ height: fixedSectionHeight }}>
          {/* fx-fixed: ✅ بقت sticky تحت النافبار مش من أول الصفحة */}
          <div
            ref={fixedRef}
            className="sticky w-full overflow-hidden"
            style={{
              top: `${navbarHeight}px`,
              height: `calc(100vh - ${navbarHeight}px)`,
              backgroundColor: "var(--fx-page-bg)",
            }}
          >
            {/* الخلفيات / الصور */}
            <div className="absolute inset-0 z-[1]" style={{ backgroundColor: "var(--fx-stage-bg)" }} aria-hidden="true">
              {sections.map((s, i) => (
                <div className="absolute inset-0" key={s.id ?? i}>
                  {s.renderBackground ? (
                    s.renderBackground(index === i, lastIndexRef.current === i)
                  ) : (
                    <>
                      <img
                        ref={(el) => el && (bgRefs.current[i] = el)}
                        src={s.background}
                        alt=""
                        className={`absolute inset-x-0 -inset-y-[10%] h-[120%] w-full object-cover will-change-transform ${
                          i === 0 ? "opacity-100" : "opacity-0"
                        }`}
                        style={{ filter: `brightness(${imageBrightness})` }}
                      />
                      {/* ✅ overlay أخف بكتير، متحكم فيه بالكامل من colors.overlay */}
                      <div className="absolute inset-0" style={{ backgroundColor: "var(--fx-overlay)" }} />
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* الجريد الأساسي */}
            <div
              className="relative z-[2] grid h-full grid-cols-12 gap-[var(--fx-gap)] px-[var(--fx-grid-px)]"
            >
              {header && (
                <div
                  className="col-span-12 self-start break-words text-center leading-[1.15] text-[clamp(1rem,2.4vw,1.9rem)]"
                  style={{ paddingTop: "6vh", color: "var(--fx-text)" }}
                >
                  {header}
                </div>
              )}

              <div className="absolute inset-0 col-span-12 grid h-full grid-cols-1 items-center px-[var(--fx-grid-px)] md:grid-cols-[1fr_1.3fr_1fr]">
                {/* يسار */}
                <div className="hidden h-[60vh] items-center justify-items-start overflow-hidden md:grid" role="list">
                  <div ref={leftTrackRef} className="will-change-transform">
                    {sections.map((s, i) => {
                      const active = i === index;
                      return (
                        <div
                          key={`L-${s.id ?? i}`}
                          ref={(el) => el && (leftItemRefs.current[i] = el)}
                          onClick={() => handleJump(i)}
                          role="button"
                          tabIndex={0}
                          aria-pressed={active}
                          className={[
                            "relative my-[5px] cursor-pointer select-none font-extrabold leading-none",
                            "text-[clamp(0.8rem,1.1vw,1rem)] transition-[opacity,transform] duration-300",
                            active ? "pl-4 opacity-100" : "opacity-35",
                            active &&
                              "before:absolute before:left-0 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:content-['']",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          style={{ color: "var(--fx-text)" }}
                        >
                          {s.leftLabel}
                          {active && (
                            <span
                              className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full"
                              style={{ backgroundColor: "var(--fx-text)" }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* النص الرئيسي في النص */}
                <div className="grid h-[46vh] place-items-center overflow-hidden px-4 text-center md:h-[60vh]">
                  {sections.map((s, sIdx) => {
                    tempWordBucket.current = [];
                    const isString = typeof s.title === "string";
                    const active = sIdx === index;
                    return (
                      <div
                        key={`C-${s.id ?? sIdx}`}
                        className={`absolute flex max-w-full flex-col items-center ${
                          active ? "visible opacity-100" : "invisible opacity-0"
                        }`}
                      >
                        {s.leftLabel && (
                          <span
                            className="mb-2 inline-block text-[clamp(0.7rem,2.6vw,0.9rem)] font-semibold tracking-wider opacity-80 md:hidden"
                            style={{ color: "var(--fx-text)" }}
                          >
                            {s.leftLabel}
                          </span>
                        )}
                        <h3
                          className="m-0 max-w-[90vw] break-words text-[clamp(1.2rem,3vw,2.5rem)] font-black tracking-tight"
                          style={{ color: "var(--fx-text)" }}
                        >
                          {isString ? splitWords(s.title) : s.title}
                        </h3>
                        <WordsCollector
                          onReady={() => {
                            if (tempWordBucket.current.length) {
                              wordRefs.current[sIdx] = [...tempWordBucket.current];
                            }
                            tempWordBucket.current = [];
                          }}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* يمين */}
                <div className="hidden h-[60vh] items-center justify-items-end overflow-hidden md:grid" role="list">
                  <div ref={rightTrackRef} className="will-change-transform">
                    {sections.map((s, i) => {
                      const active = i === index;
                      return (
                        <div
                          key={`R-${s.id ?? i}`}
                          ref={(el) => el && (rightItemRefs.current[i] = el)}
                          onClick={() => handleJump(i)}
                          role="button"
                          tabIndex={0}
                          aria-pressed={active}
                          className={[
                            "relative my-[5px] cursor-pointer select-none text-right font-extrabold leading-none",
                            "text-[clamp(0.8rem,1.1vw,1rem)] transition-[opacity,transform] duration-300",
                            active ? "pr-4 opacity-100" : "opacity-35",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          style={{ color: "var(--fx-text)" }}
                        >
                          {s.rightLabel}
                          {active && (
                            <span
                              className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full"
                              style={{ backgroundColor: "var(--fx-text)" }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="col-span-12 self-end pb-[5vh] text-center">
                {footer && (
                  <div
                    className="break-words text-[clamp(0.9rem,2vw,1.5rem)] font-black leading-none tracking-tight"
                    style={{ color: "var(--fx-text)" }}
                  >
                    {footer}
                  </div>
                )}
                {showProgress && (
                  <div className="relative mx-auto mt-4 h-0.5 w-[min(200px,60vw)] bg-white/[0.28]">
                    <div className="absolute inset-x-0 bottom-full flex justify-between text-xs" style={{ color: "var(--fx-text)" }}>
                      <span ref={currentNumberRef}>{String(index + 1).padStart(2, "0")}</span>
                      <span>{String(total).padStart(2, "0")}</span>
                    </div>
                    <div
                      ref={progressFillRef}
                      className="absolute inset-y-0 left-0 h-full w-0 transition-[width] duration-300"
                      style={{ backgroundColor: "var(--fx-text)" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* نهاية السكشن - أول جزء طبيعي في الصفحة بعد ما الـ pin يخلص
        <div className="grid h-screen place-items-center">
          <p className="rotate-90 text-[#111]">fin</p>
        </div> */}
      </div>
    </div>
  );
});

FullScreenScrollFX.displayName = "FullScreenScrollFX";

export default FullScreenScrollFX;