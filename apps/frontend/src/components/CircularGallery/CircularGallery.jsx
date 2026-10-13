
import { forwardRef, useState, useEffect, useRef } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function getLayout(width) {
  // Landscape cards — صور المشاريع بالعرض
  if (width < 480) return { cardW: 168, cardH: 112, perspective: 800 };
  if (width < 640) return { cardW: 190, cardH: 126, perspective: 950 };
  if (width < 1024) return { cardW: 260, cardH: 172, perspective: 1300 };
  return { cardW: 340, cardH: 220, perspective: 1800 };
}

const CircularGallery = forwardRef(
  (
    {
      items,
      className,
      radius: baseRadius = 550,
      autoRotateSpeed = 0.02,
      ...props
    },
    ref
  ) => {
    const [layout, setLayout] = useState(() =>
      getLayout(typeof window === "undefined" ? 1280 : window.innerWidth)
    );

    const ringRef = useRef(null);
    const itemRefs = useRef([]);
    const overlayRefs = useRef([]);
    const rotationRef = useRef(0);
    const targetRef = useRef(0);
    const dragOffsetRef = useRef(0);
    const isScrollingRef = useRef(false);
    const scrollTimeoutRef = useRef(null);
    const rafRef = useRef(0);

    const dragRef = useRef({
      active: false,
      startX: 0,
      startOffset: 0,
      moved: false,
    });

    const count = Math.max(items.length, 1);

    // الـ radius بيتحسب من عرض الكارت × العدد → مع landscape هيكبر شوية لوحده
    const derivedRadius = ((layout.cardW * count) / (2 * Math.PI)) * 1.08;

    const radius =
      layout.cardW >= 260
        ? Math.max(derivedRadius, baseRadius * 0.9)
        : derivedRadius;

    useEffect(() => {
      const onResize = () => {
        setLayout(getLayout(window.innerWidth));
      };

      onResize();

      window.addEventListener("resize", onResize);
      window.addEventListener("orientationchange", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("orientationchange", onResize);
      };
    }, []);

    useEffect(() => {
      const handleScroll = () => {
        isScrollingRef.current = true;

        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        const scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;

        const scrollProgress =
          scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

        targetRef.current = scrollProgress * 720 + dragOffsetRef.current;

        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;
        }, 150);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, []);

    useEffect(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const tick = () => {
        if (
          !isScrollingRef.current &&
          !dragRef.current.active &&
          !reduceMotion
        ) {
          targetRef.current += autoRotateSpeed;
        }

        rotationRef.current += (targetRef.current - rotationRef.current) * 0.12;

        const rotation = rotationRef.current;

        if (ringRef.current) {
          ringRef.current.style.transform = `
            translateZ(${-radius * 0.15}px)
            rotateY(${rotation}deg)
          `;
        }

        const anglePerItem = 360 / count;

        for (let i = 0; i < count; i++) {
          const el = itemRefs.current[i];
          const overlayEl = overlayRefs.current[i];
          if (!el) continue;

          const relativeAngle =
            (i * anglePerItem + (rotation % 360) + 360) % 360;

          const normalized =
            relativeAngle > 180 ? 360 - relativeAngle : relativeAngle;

          el.style.opacity = "1";

          if (overlayEl) {
            const dim = Math.min(0.7, normalized / 180) * 0.75;
            overlayEl.style.opacity = String(dim);
          }
        }

        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);

      return () => cancelAnimationFrame(rafRef.current);
    }, [autoRotateSpeed, count, radius]);

    const onPointerDown = (e) => {
      dragRef.current = {
        active: true,
        startX: e.clientX,
        startOffset: dragOffsetRef.current,
        moved: false,
      };
      e.currentTarget.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!dragRef.current.active) return;

      const dx = e.clientX - dragRef.current.startX;

      if (Math.abs(dx) > 4) {
        dragRef.current.moved = true;
      }

      const delta = dx * 0.35;
      dragOffsetRef.current = dragRef.current.startOffset + delta;
      targetRef.current += delta * 0.08;
    };

    const endDrag = (e) => {
      if (!dragRef.current.active) return;
      dragRef.current.active = false;
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    };

    const anglePerItem = 360 / count;

    return (
      <div
        ref={ref}
        role="region"
        aria-label="معرض المشاريع الدائري"
        className={cn(
          "relative w-full h-full flex items-center justify-center touch-pan-y select-none",
          className
        )}
        style={{
          perspective: `${layout.perspective}px`,
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        {...props}
      >
        <div
          ref={ringRef}
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            // willChange: "transform",
          }}
        >
          {items.map((item, i) => (
            <div
              key={`${item.src}-${i}`}
              ref={(el) => (itemRefs.current[i] = el)}
              role="group"
              aria-label={item.title}
              className="absolute left-1/2 top-1/2"
              style={{
                width: `${layout.cardW}px`,
                height: `${layout.cardH}px`,
                transform: `
                  translate(-50%, -50%)
                  rotateY(${i * anglePerItem}deg)
                  translateZ(${radius}px)
                `,
                transition: "none",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="relative w-full h-full rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border border-white/10 bg-[#3C3C3B]">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                <div
                  ref={(el) => (overlayRefs.current[i] = el)}
                  className="absolute inset-0 bg-black pointer-events-none transition-opacity"
                  style={{ opacity: 0, willChange: "opacity" }}
                />

                <span
                  className={cn(
                    "absolute top-2 right-2 sm:top-3 sm:right-3",
                    "text-[9px] sm:text-[10px]",
                    "font-semibold uppercase tracking-wide",
                    "px-2 py-0.5 sm:px-2.5 sm:py-1",
                    "rounded-full",
                    "backdrop-blur-sm",
                    item.status === "Delivered"
                      ? "bg-[#3fc177] text-white"
                      : "bg-[#e5bc29] text-black"
                  )}
                > 
                  {item.status}
                </span>

                <div className="absolute bottom-0 left-0 w-full p-2.5 sm:p-4">
                  <h3 className="text-[11px] sm:text-sm md:text-base font-bold text-white uppercase leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = "CircularGallery";

export default CircularGallery;