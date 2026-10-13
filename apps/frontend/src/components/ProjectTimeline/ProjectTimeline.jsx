import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  ClipboardList,
  HardHat,
  Layers,
  Building2,
  Cable,
  Paintbrush,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const PHASES = [
  { title: "PROJECT START", description: "Site survey, permits, and project planning finalized.", icon: ClipboardList },
  { title: "SITE PREPARATION", description: "Land clearing, leveling, and access roads prepared.", icon: HardHat },
  { title: "FOUNDATION", description: "Excavation and foundation works completed to design spec.", icon: Layers },
  { title: "STRUCTURAL WORK", description: "Concrete frame, columns, and structural steel erected.", icon: Building2 },
  { title: "MEP INSTALLATION", description: "Mechanical, electrical, and plumbing systems installed.", icon: Cable },
  { title: "INTERIOR & EXTERIOR", description: "Facade, cladding, and interior partitioning underway.", icon: Paintbrush },
  { title: "FINAL FINISHING", description: "Paint, fixtures, and finishing touches applied.", icon: Sparkles },
  { title: "PROJECT COMPLETED", description: "Final inspection passed and site handed over.", icon: CheckCircle2 },
];

// إحداثيات الشكل الزجزاجي - Desktop (viewBox 1200x320)
const DESKTOP_NODES = PHASES.map((_, i) => ({
  x: 60 + i * ((1200 - 120) / (PHASES.length - 1)),
  y: i % 2 === 0 ? 110 : 210,
}));

// إحداثيات - Mobile (viewBox 320x420) عمودي متعرج
const MOBILE_NODES = PHASES.map((_, i) => ({
  x: i % 2 === 0 ? 110 : 210,
  y: 30 + i * ((420 - 60) / (PHASES.length - 1)),
}));

function buildSegments(nodes) {
  const segments = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i];
    const b = nodes[i + 1];
    segments.push(`M ${a.x} ${a.y} Q ${(a.x + b.x) / 2} ${a.y} ${b.x} ${b.y}`);
  }
  return segments;
}

const DESKTOP_SEGMENTS = buildSegments(DESKTOP_NODES);
const MOBILE_SEGMENTS = buildSegments(MOBILE_NODES);

const STEP_DELAY = 1500; // ms بين كل مرحلة والتانية
const COMPLETE_PAUSE = 2200; // وقفة عند آخر مرحلة حقيقية قبل ما يعيد

export default function ProjectTimeline({ project }) {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // لحد فين المشروع فعليًا وصل
  const targetIndex =
    typeof project.currentPhase === "number"
      ? project.currentPhase
      : project.status?.toLowerCase() === "finished"
      ? PHASES.length - 1
      : Math.floor(PHASES.length / 2);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    let cancelled = false;
    let step = -1;

    function tick() {
      if (cancelled) return;
      step += 1;

      if (step > targetIndex) {
        setTimeout(() => {
          if (cancelled) return;
          step = -1;
          setActiveStep(-1);
          setTimeout(tick, 500);
        }, COMPLETE_PAUSE);
        return;
      }

      setActiveStep(step);
      setTimeout(tick, STEP_DELAY);
    }

    tick();
    return () => {
      cancelled = true;
    };
  }, [isInView, targetIndex]);

  const getStatus = (index) => {
    if (index < activeStep) return "COMPLETED";
    if (index === activeStep) return "IN PROGRESS";
    return "PENDING";
  };

  const renderGraph = (nodes, segments, viewBox, isMobile) => (
    <svg
      viewBox={viewBox}
      className={isMobile ? "block md:hidden w-full h-full" : "hidden md:block w-full h-full"}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* المسار الخافت الكامل - خلفية تقنية ثابتة */}
      {segments.map((d, i) => (
        <path key={`ghost-${i}`} d={d} fill="none" stroke="#6C757D" strokeOpacity={0.15} strokeWidth={2} />
      ))}

      {/* المسار المتحرك */}
      {segments.map((d, i) => (
        <motion.path
          key={`seg-${i}`}
          d={d}
          fill="none"
          stroke="#FFBF00"
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: activeStep > i ? 1 : 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />
      ))}

      {/* نقاط زخرفية صغيرة على طول الخط */}
      {segments.map((_, i) => {
        const a = nodes[i];
        const b = nodes[i + 1];
        return (
          <circle
            key={`dot-${i}`}
            cx={a.x + (b.x - a.x) * 0.5}
            cy={a.y + (b.y - a.y) * 0.5}
            r={2}
            fill="#6C757D"
            opacity={0.4}
          />
        );
      })}

      {/* العقد */}
      {nodes.map((n, i) => {
        const isActive = activeStep === i || hoveredIndex === i;
        const isDone = activeStep > i;
        return (
          <g key={`node-${i}`}>
            {isActive && (
              <motion.circle
                cx={n.x}
                cy={n.y}
                r={16}
                fill="none"
                stroke="#FFBF00"
                strokeWidth={1.5}
                initial={{ opacity: 0.6, scale: 0.8 }}
                animate={{ opacity: [0.6, 0, 0.6], scale: [0.8, 1.6, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={7}
              fill={isDone || isActive ? "#FFBF00" : "#373A48"}
              stroke={isDone || isActive ? "#FFBF00" : "#6C757D"}
              strokeWidth={1.5}
              animate={{ scale: isActive ? 1.25 : 1 }}
              transition={{ duration: 0.4 }}
            />
          </g>
        );
      })}
    </svg>
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#1E2432] py-16 sm:py-24 px-4 sm:px-6"
    >
      {/* خطوط تقنية خفيفة في الخلفية */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#F8F9FD 1px, transparent 1px), linear-gradient(90deg, #F8F9FD 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-[#FFBF00] font-semibold tracking-[0.25em] text-[11px] sm:text-xs uppercase">
            The Construction Journey
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
            From Ground To Completion
          </h2>
          <p className="text-white/50 mt-3 max-w-xl mx-auto text-sm sm:text-base">
            Every project moves through a sequence of carefully engineered
            stages — from the first mark on site to the final detail.
          </p>
        </motion.div>

        <div className="hidden md:block relative w-full h-[340px] mb-10">
          {renderGraph(DESKTOP_NODES, DESKTOP_SEGMENTS, "0 0 1200 320", false)}
        </div>

        <div className="md:hidden relative w-full h-[420px] mb-8">
          {renderGraph(MOBILE_NODES, MOBILE_SEGMENTS, "0 0 320 420", true)}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {PHASES.map((phase, index) => {
            const Icon = phase.icon;
            const status = getStatus(index);
            const isVisible = activeStep >= index;
            const isCurrent = activeStep === index;
            const progress = Math.round(((index + 1) / PHASES.length) * 100);

            return (
              <motion.div
                key={phase.title}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 16, scale: 0.96, filter: "blur(6px)" }}
                animate={
                  isVisible
                    ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                    : { opacity: 0.25, y: 8, scale: 0.97, filter: "blur(2px)" }
                }
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`relative rounded-xl border p-4 sm:p-5 backdrop-blur-sm transition-colors duration-300 ${
                  isCurrent ? "border-[#FFBF00]/60 bg-[#FFBF00]/[0.06]" : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-white/35">
                    PHASE {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-[9px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                      status === "COMPLETED"
                        ? "bg-[#FFBF00]/15 text-[#FFBF00]"
                        : status === "IN PROGRESS"
                        ? "bg-[#293A82]/40 text-white"
                        : "bg-white/5 text-white/30"
                    }`}
                  >
                    {status}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 mb-2">
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${isCurrent ? "bg-[#FFBF00]" : "bg-white/10"}`}>
                    <Icon className={`h-4 w-4 ${isCurrent ? "text-[#1E2432]" : "text-white/60"}`} />
                  </span>
                  <h3 className="text-sm font-bold text-white uppercase leading-tight">{phase.title}</h3>
                </div>

                <p className="text-xs text-white/45 leading-relaxed mb-3">{phase.description}</p>

                <div className="flex items-center justify-between text-[10px] font-mono text-white/30">
                  <span>{project.year || "—"}</span>
                  <span>PROGRESS {progress}%</span>
                </div>

                <div className="mt-2 h-1 w-full rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isVisible ? `${progress}%` : 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="h-full bg-[#FFBF00]"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}