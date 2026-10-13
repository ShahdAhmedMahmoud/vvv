import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function SiteHoardingDivider() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // الحاجز بيترفع لفوق (y سالب) وبيختفي تدريجيًا مع تقدّم السكرول
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);

  return (
    <div ref={ref} className="relative h-40 md:h-56 overflow-hidden bg-[#1E2432]">
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* الحاجز نفسه - خطوط تحذير مائلة */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, #FFBF00 0 24px, #1E2432 24px 48px)",
          }}
        />
        <div className="absolute inset-0 bg-[#1E2432]/55" />

        <span className="relative z-10 text-white/90 font-bold uppercase tracking-[0.3em] text-xs md:text-sm border-y-2 border-white/70 py-3 px-6 backdrop-blur-sm">
          Under Construction — Scroll to Reveal
        </span>
      </motion.div>
    </div>
  );
}