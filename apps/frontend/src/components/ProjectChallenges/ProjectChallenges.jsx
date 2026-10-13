


import { useId, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Palette
 * #293A82  -> accent (numbers, headline, glow)
 * #373A49  -> main text / outline
 * #D2D5E2  -> soft section background
 */

// tiny replacement for shadcn's cn()
const cn = (...classes) => classes.filter(Boolean).join(" ");

// TODO: replace the image URLs with your own project photos
// clip options: "strata" | "bento" | "steps" | "grid"
export const defaultChallenges = [
  {
    num: "01",
    title: ["Site", "Conditions"],
    headline: "Every site has a story of its own.",
    description:
      "Before construction could begin, the site had to be carefully assessed — its conditions, surroundings, access, and existing constraints. The execution strategy had to be built around the reality of the site.",
    clip: "strata",
    image: "/2/challenges/1.jfif",
  },
  {
    num: "02",
    title: ["Scale &", "Complexity"],
    headline: "The bigger the project, the more pieces must move together.",
    description:
      "Large-scale construction requires continuous coordination between teams, materials, equipment, and technical activities. Every operation had to fit into the bigger picture.",
    clip: "bento",
    image: "/2/challenges/2.jfif",
  },
  {
    num: "03",
    title: ["Time &", "Coordination"],
    headline: "Progress depends on what happens next.",
    description:
      "Each construction phase depended on the previous one. Keeping the work moving required precise scheduling and coordination between teams without compromising the quality of execution.",
    clip: "steps",
    image: "/2/challenges/3.jfif",
  },
  {
    num: "04",
    title: ["Quality &", "Precision"],
    headline: "The final result is built into every detail.",
    description:
      "From structural execution to finishing, every stage required attention to detail and continuous quality control. The goal was not simply to complete the project, but to deliver it to the required standard.",
    clip: "grid",
    image: "/2/challenges/4.jfif",
  },
];

/** The four animated masks. Every shape needs className="path". */
const ClipDefs = ({ prefix }) => (
  <defs>
    {/* Horizontal layers — like soil / site strata */}
    <clipPath id={`${prefix}-strata`}>
      {Array.from({ length: 6 }).map((_, i) => (
        <rect
          key={i}
          className="path"
          x="20"
          y={20 + i * 66}
          width="460"
          height="60"
          rx="6"
        />
      ))}
    </clipPath>

    {/* Irregular blocks that fit together — scale & complexity */}
    <clipPath id={`${prefix}-bento`}>
      <rect className="path" x="20" y="20" width="200" height="280" rx="12" />
      <rect className="path" x="20" y="306" width="200" height="174" rx="12" />

      <rect className="path" x="226" y="20" width="254" height="140" rx="12" />

      <rect
        className="path"
        x="226"
        y="166"
        width="127"
        height="174"
        rx="12"
      />
      <rect
        className="path"
        x="359"
        y="166"
        width="121"
        height="174"
        rx="12"
      />

      <rect className="path" x="226" y="346" width="254" height="134" rx="12" />
    </clipPath>

    {/* Ascending steps — each phase builds on the last */}
    <clipPath id={`${prefix}-steps`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <rect
          key={i}
          className="path"
          x={20 + i * 88}
          y="20"
          width="84"
          height="560"
          rx="6"
        />
      ))}
    </clipPath>

    {/* Exact, even grid — precision */}
    <clipPath id={`${prefix}-grid`}>
      {Array.from({ length: 9 }).map((_, i) => (
        <rect
          key={i}
          className="path"
          x={(i % 3) * 146 + 20}
          y={Math.floor(i / 3) * 146 + 20}
          width="140"
          height="140"
          rx="4"
        />
      ))}
    </clipPath>
  </defs>
);

export default function ProjectChallenges({
  items = defaultChallenges,
  className = "",
}) {
  const prefix = `ch-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const groupRef = useRef(null);
  const tlRef = useRef(null);

  const runLoop = (index) => {
    const item = items[index];
    const clipId = `${prefix}-${item.clip}`;
    const selector = `#${clipId} .path`;

    tlRef.current?.kill();

    imageRef.current?.setAttribute("href", item.image);
    groupRef.current?.setAttribute("clip-path", `url(#${clipId})`);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      gsap.set(selector, { scale: 1, transformOrigin: "50% 50%" });
      return;
    }

    gsap.set(selector, { scale: 0, transformOrigin: "50% 50%" });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    tl.to(selector, {
      scale: 1,
      duration: 0.8,
      stagger: { amount: 0.4, from: "random" },
      ease: "expo.out",
    })
      .to(selector, {
        scale: 1.05,
        duration: 1.5,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
        stagger: { amount: 0.2, from: "center" },
      })
      .to(selector, {
        scale: 0,
        duration: 0.6,
        stagger: { amount: 0.3, from: "edges" },
        ease: "expo.in",
      });

    tlRef.current = tl;
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => runLoop(0), sectionRef);

    return () => {
      tlRef.current?.kill();
      ctx.revert();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // hover on desktop, tap / focus on touch + keyboard
  const activate = (index) => {
    if (index === activeIndex) return;

    setActiveIndex(index);
    runLoop(index);
  };

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative w-full overflow-hidden bg-[#FFFFFF]",
        "px-5 py-14 sm:px-8 md:px-14 md:py-24 lg:px-24",
        className
      )}
    >



     
{/* STORYTELLING INTRO */}
<div className="relative z-20 mx-auto mb-14 w-full max-w-7xl text-center md:mb-20">
  <div className="mx-auto flex max-w-5xl flex-col items-center">

    {/* Small section number */}
    <p
      className="mb-5 text-xs font-bold uppercase tracking-[0.4em] text-[#293A82] sm:text-sm"
    >
      02 / Project Story
    </p>

    {/* Main Header */}
    <h2 className=" text-xl font-black  leading-[0.8] tracking-[-0.06em] text-[#373A49] sm:text-4xl md:text-8xl lg:text-[50px]">
      <span
        className="inline-block animate-[challengeTitle_1s_cubic-bezier(0.16,1,0.3,1)_both]"
      >
        The Challenges
      </span>
    </h2>

    {/* Storytelling statement */}
    <div className="mt-8 overflow-hidden sm:mt-10">
      <p
        className="
          mx-auto
          max-w-3xl
          text-xl
          font-semibold
          uppercase
          leading-[1.8]
          tracking-[0.22em]
          text-[#373A49]/75
          opacity-0
          animate-[challengeStatement_1.1s_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards]
          sm:text-base
          md:text-lg
          md:tracking-[0.28em]
        "
      >
        EVERY PROJECT STARTS WITH A CHALLENGE.
      </p>
    </div>

    {/* Supporting paragraph */}
    <p
      className="
        mt-6
        max-w-2xl
        text-sm
        leading-relaxed
        text-[#373A49]/65
        opacity-0
        animate-[challengeParagraph_1s_0.45s_cubic-bezier(0.16,1,0.3,1)_forwards]
        sm:text-base
        md:text-lg
      "
    >
      Before the vision could take shape, the project had to overcome
      the reality of the site.
    </p>

  </div>
</div>



      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-12 md:flex-row md:gap-10">
        {/* LEFT: numbered list (below the image on mobile) */}
        <div className="z-20 order-2 w-full md:order-1 md:w-1/2">
          <ul className="flex flex-col gap-8 sm:gap-10 md:gap-12">
            {items.map((item, index) => {
              const active = activeIndex === index;

              return (
                <li key={item.num}>
                  <button
                    type="button"
                    onMouseEnter={() => activate(index)}
                    onFocus={() => activate(index)}
                    onClick={() => activate(index)}
                    aria-current={active}
                    className="group flex w-full cursor-pointer items-start gap-4 rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-[#293A82] focus-visible:ring-offset-4 focus-visible:ring-offset-transparent sm:gap-6"
                  >
                    <span
                      className={cn(
                        "mt-1 origin-left text-xl font-bold tabular-nums transition-all duration-500 sm:text-3xl md:mt-2",
                        active
                          ? "scale-110 text-[#293A82]"
                          : "text-[#373A49]/40"
                      )}
                    >
                      {item.num}
                    </span>

                    <div className="min-w-0">
{/* <h3
  className={cn(
    "text-xl  leading-[0.95] tracking-tight transition-all duration-700 min-[400px]:text-4xl md:text-5xl xl:text-6xl",
    active
      ? "text-[#373A49] opacity-100 md:translate-x-4"
      : "text-transparent opacity-50 [-webkit-text-stroke:1.5px_#373A49] md:translate-x-0"
  )}
>
                        {item.title[0]}
                        <br />
                        {item.title[1]}
                      </h3> */}

                      {/* <h3
  className={cn(
    "leading-[0.95] tracking-tight transition-all duration-700",
    active
      ? "text-2xl min-[400px]:text-4xl md:text-5xl xl:text-6xl text-[#373A49] opacity-100 md:translate-x-4"
      : "text-lg min-[400px]:text-2xl md:text-3xl xl:text-4xl text-transparent opacity-50 [-webkit-text-stroke:1.5px_#373A49] md:translate-x-0"
  )}
>
  {item.title[0]}
  <br />
  {item.title[1]}
</h3> */}

<h3
  className={cn(
    "leading-[0.95] tracking-tight transition-all duration-700",
    active
      ? "text-2xl min-[400px]:text-4xl md:text-5xl xl:text-6xl text-[#373A49] opacity-100 md:translate-x-4"
      : "text-lg min-[400px]:text-2xl md:text-3xl xl:text-4xl text-[#373A49] opacity-50 md:translate-x-0"
  )}
>
  {item.title[0]}
  <br />
  {item.title[1]}
</h3>

                      {/* Description opens under the active title */}
                      <div
                        className={cn(
                          "grid transition-all duration-500 ease-out md:pl-4",
                          active
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        )}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <div className="pt-4 sm:pt-5">
                            <p className="text-base font-semibold text-[#293A82] sm:text-lg">
                              {item.headline}
                            </p>

                            <p className="mt-2 max-w-md text-sm leading-relaxed text-[#373A49]/75 sm:text-base">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* RIGHT: masked image */}
        <div className="relative order-1 flex w-full items-center justify-center md:order-2 md:w-1/2">
          <div
            aria-hidden
            className="absolute h-[110%] w-[110%] rounded-full bg-[#293A82]/10 blur-[100px]"
          />

          <svg
            viewBox="0 0 500 500"
            role="img"
            aria-label={items[activeIndex].headline}
            className="relative z-10 h-auto w-full max-w-[300px] drop-shadow-xl sm:max-w-[400px] md:max-w-[500px]"
          >
            <ClipDefs prefix={prefix} />

            <g ref={groupRef}>
              <image
                ref={imageRef}
                href={items[0].image}
                width="500"
                height="500"
                preserveAspectRatio="xMidYMid slice"
              />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}

