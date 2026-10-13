import  { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function CoverflowCarousel({
  slides = [],
  rotate = 38,
  depth = 0.55,
  perspective = 3,
  falloff = 0.22,
  fade = 0.85,
  cardWidth = "clamp(220px, 32vw, 420px)",
  gap = 0.08,
  loop = true,
  showCaption = true,
  showPagination = true,
  showNavigation = true,
  label = "Featured Projects",
  className,
  cardClassName,
  onSlideClick,
}) {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const rafRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const currentX = useRef(0);
  const targetX = useRef(0);

  const dragStartX = useRef(0);
  const dragLastX = useRef(0);
  const dragVelocity = useRef(0);

  const safeSlides = useMemo(() => slides || [], [slides]);

  const slideCount = safeSlides.length;

  /*
   * Convert a logical index into a wrapped index.
   */
  const wrapIndex = (index) => {
    if (slideCount === 0) return 0;

    return ((index % slideCount) + slideCount) % slideCount;
  };

  /*
   * Get the shortest distance between the current slide
   * and another slide when loop is enabled.
   */
  const getOffset = (index) => {
    if (!loop || slideCount <= 1) {
      return index - activeIndex;
    }

    let offset = index - activeIndex;

    if (offset > slideCount / 2) {
      offset -= slideCount;
    }

    if (offset < -slideCount / 2) {
      offset += slideCount;
    }

    return offset;
  };

  /*
   * Paint all cards directly using transforms.
   * This keeps the animation smooth.
   */
  const paint = () => {
    const container = containerRef.current;

    if (!container) return;

    const width = container.clientWidth;

    if (!width) return;

    const cardWidthValue =
      typeof cardWidth === "number"
        ? cardWidth
        : Math.min(
            width * 0.75,
            parseFloat(
              getComputedStyle(container).getPropertyValue("--cf-card-width")
            ) || width * 0.32
          );

    const gapValue = cardWidthValue * gap;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const offset = getOffset(index);

      const translateX =
        offset * (cardWidthValue + gapValue) +
        (currentX.current - targetX.current) * 0.15;

      const absOffset = Math.abs(offset);

      const translateZ =
        -absOffset * cardWidthValue * depth;

      const rotateY = -offset * rotate;

      const opacity =
        absOffset > 0
          ? Math.max(0, 1 - absOffset * falloff)
          : 1;

      const finalOpacity =
        absOffset > 0
          ? opacity * fade
          : 1;

      const scale =
        absOffset === 0
          ? 1
          : Math.max(0.72, 1 - absOffset * 0.08);

      const zIndex = 100 - Math.round(absOffset * 10);

      card.style.transform = `
        translate3d(
          calc(-50% + ${translateX}px),
          -50%,
          ${translateZ}px
        )
        rotateY(${rotateY}deg)
        scale(${scale})
      `;

      card.style.opacity = String(finalOpacity);
      card.style.zIndex = String(zIndex);

      card.style.pointerEvents =
        absOffset <= 1 ? "auto" : "none";
    });
  };

  /*
   * Smooth animation using requestAnimationFrame.
   */
  const animate = () => {
    const difference = targetX.current - currentX.current;

    if (Math.abs(difference) < 0.01) {
      currentX.current = targetX.current;
      paint();
      rafRef.current = null;
      return;
    }

    currentX.current += difference * 0.14;

    paint();

    rafRef.current = requestAnimationFrame(animate);
  };

  const startAnimation = () => {
    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(animate);
  };

 
  const goTo = (index) => {
    if (slideCount === 0) return;

    let nextIndex = index;

    if (loop) {
      nextIndex = wrapIndex(index);
    } else {
      nextIndex = Math.max(
        0,
        Math.min(index, slideCount - 1)
      );
    }

    setActiveIndex(nextIndex);

    currentX.current = 0;
    targetX.current = 0;

    startAnimation();
  };

  /*
   * Move one card left/right.
   */
  const nudge = (direction) => {
    goTo(activeIndex + direction);
  };

  /*
   * Pointer drag.
   */
  const handlePointerDown = (event) => {
    if (slideCount <= 1) return;

    setIsDragging(true);

    dragStartX.current = event.clientX;
    dragLastX.current = event.clientX;
    dragVelocity.current = 0;

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!isDragging) return;

    const delta = event.clientX - dragLastX.current;

    dragVelocity.current = delta;
    dragLastX.current = event.clientX;

    const container = containerRef.current;

    if (!container) return;

    const width = container.clientWidth;

    if (!width) return;

    const dragAmount = event.clientX - dragStartX.current;

    currentX.current = dragAmount;

    paint();
  };

  const handlePointerUp = () => {
    if (!isDragging) return;

    setIsDragging(false);

    const container = containerRef.current;

    if (!container) return;

    const width = container.clientWidth;

    const threshold = Math.max(40, width * 0.12);

    const totalDrag =
      dragLastX.current - dragStartX.current;

    if (
      Math.abs(totalDrag) > threshold ||
      Math.abs(dragVelocity.current) > 10
    ) {
      if (totalDrag < 0) {
        nudge(1);
      } else {
        nudge(-1);
      }
    } else {
      goTo(activeIndex);
    }

    currentX.current = 0;
    targetX.current = 0;

    startAnimation();
  };

  /*
   * Keyboard navigation.
   */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        nudge(1);
      }

      if (event.key === "ArrowLeft") {
        nudge(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [activeIndex, slideCount]);

  /*
   * Initial paint.
   */
  useEffect(() => {
    paint();
    startAnimation();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [
    activeIndex,
    slides,
    rotate,
    depth,
    perspective,
    falloff,
    fade,
    cardWidth,
    gap,
    loop,
  ]);

  /*
   * Resize observer.
   */
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const observer = new ResizeObserver(() => {
      paint();
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!safeSlides.length) {
    return null;
  }

  const activeSlide = safeSlides[activeIndex];

  return (
    <section
      className={cn(
        "relative w-full select-none",
        className
      )}
    >
      {/* Header */}
      {label && (
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">
            {label}
          </p>
        </div>
      )}

      {/* Carousel */}
      <div
        ref={containerRef}
        className={cn(
          "relative mx-auto h-[520px] w-full overflow-hidden",
          "touch-pan-y",
          isDragging
            ? "cursor-grabbing"
            : "cursor-grab"
        )}
        style={{
          perspective: `${perspective * 1000}px`,
          "--cf-card-width": cardWidth,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={() => {
          if (isDragging) {
            handlePointerUp();
          }
        }}
      >
        {/* Cards */}
        {safeSlides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <article
              key={`${slide.src}-${index}`}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className={cn(
                "absolute left-1/2 top-1/2",
                "overflow-hidden rounded-2xl",
                "bg-neutral-900",
                "shadow-2xl",
                "will-change-transform",
                "transition-[box-shadow]",
                "duration-300",
                isActive
                  ? "shadow-black/40"
                  : "shadow-black/20",
                cardClassName
              )}
              style={{
                width: cardWidth,
                aspectRatio: "16 / 10",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
              onClick={() => {
                if (isActive && onSlideClick) {
                  onSlideClick(slide, index);
                } else if (!isActive) {
                  goTo(index);
                }
              }}
            >
              {/* Image */}
              <img
                src={slide.src}
                alt={slide.alt || ""}
                draggable={false}
                className="h-full w-full object-cover"
              />

              {/* Gradient */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/70
                  via-black/10
                  to-transparent
                "
              />

              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-5 top-5 rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur-md">
                  Selected
                </div>
              )}

              {/* Card caption */}
              {(slide.title ||
                slide.subtitle ||
                slide.meta) && (
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  {slide.meta && (
                    <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-white/60">
                      {slide.meta}
                    </p>
                  )}

                  {slide.title && (
                    <h3 className="text-2xl font-medium tracking-tight md:text-3xl">
                      {slide.title}
                    </h3>
                  )}

                  {slide.subtitle && (
                    <p className="mt-1 text-sm text-white/65">
                      {slide.subtitle}
                    </p>
                  )}
                </div>
              )}
            </article>
          );
        })}

        {/* Navigation */}
        {showNavigation && slideCount > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous project"
              onClick={() => nudge(-1)}
              className="
                absolute left-4 top-1/2 z-[200]
                flex h-12 w-12 -translate-y-1/2
                items-center justify-center
                rounded-full
                border border-white/10
                bg-black/30
                text-white
                backdrop-blur-md
                transition-all
                hover:bg-white
                hover:text-black
                md:left-8
              "
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              aria-label="Next project"
              onClick={() => nudge(1)}
              className="
                absolute right-4 top-1/2 z-[200]
                flex h-12 w-12 -translate-y-1/2
                items-center justify-center
                rounded-full
                border border-white/10
                bg-black/30
                text-white
                backdrop-blur-md
                transition-all
                hover:bg-white
                hover:text-black
                md:right-8
              "
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Caption */}
      {showCaption && activeSlide && (
        <div className="mt-6 text-center">
          {activeSlide.title && (
            <h3 className="text-xl font-medium text-white md:text-2xl">
              {activeSlide.title}
            </h3>
          )}

          {activeSlide.subtitle && (
            <p className="mt-1 text-sm text-neutral-400">
              {activeSlide.subtitle}
            </p>
          )}
        </div>
      )}

      {/* Pagination */}
      {showPagination && slideCount > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {safeSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => goTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === activeIndex
                  ? "w-8 bg-white"
                  : "w-1.5 bg-white/25 hover:bg-white/50"
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}