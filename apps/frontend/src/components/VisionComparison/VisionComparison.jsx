import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { X, ArrowRight, Check } from 'lucide-react';

// =========================================
// CONFIG — edit the rows here, nothing else
// =========================================
const COMPARISON_ROWS = [
  { from: 'Limited functionality', to: 'Improved functionality' },
  { from: 'Disconnected spaces', to: 'Better connectivity' },
  { from: 'Underutilized site', to: 'A purposeful destination' },
  { from: 'Outdated presence', to: 'A landmark people recognize' },
  { from: 'Static, one-way information', to: 'A living, immersive experience' },
];

const COLORS = {
  navy: '#293A82',
  charcoal: '#373A49',
  white: '#FFFFFF',
};

// =========================================
// ANIMATION VARIANTS
// =========================================
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 90, damping: 18 },
  },
};

// =========================================
// SUB-COMPONENTS
// =========================================

function ComparisonRow({ from, to, isLast }) {
  return (
    <motion.div variants={rowVariants} className="relative grid grid-cols-[1fr_auto_1fr] items-stretch gap-3 sm:gap-6 md:gap-10">
      {/* Starting point cell */}
      <div className="flex items-center justify-end gap-3 rounded-2xl bg-white px-4 py-5 text-right shadow-[0_10px_30px_rgba(41,58,130,0.06)] sm:px-6">
        <span className="text-sm font-medium leading-snug text-[#373A49]/70 sm:text-base">
          {from}
        </span>
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full sm:h-8 sm:w-8"
          style={{ backgroundColor: `${COLORS.charcoal}14` }}
        >
          <X size={14} strokeWidth={2.5} color={COLORS.charcoal} />
        </span>
      </div>

      {/* Center spine */}
      <div className="relative flex flex-col items-center">
        <span
          className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-md sm:h-10 sm:w-10"
          style={{ backgroundColor: COLORS.navy }}
        >
          <ArrowRight size={16} color={COLORS.white} strokeWidth={2.5} />
        </span>
        {!isLast && (
          <span
            className="mt-1 w-px flex-1"
            style={{ backgroundImage: `linear-gradient(${COLORS.navy}55, ${COLORS.navy}10)` }}
          />
        )}
      </div>

      {/* Vision cell */}
      <div
        className="flex items-center justify-start gap-3 rounded-2xl px-4 py-5 shadow-[0_15px_40px_rgba(41,58,130,0.18)] sm:px-6"
        style={{ backgroundColor: COLORS.navy }}
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 sm:h-8 sm:w-8">
          <Check size={14} strokeWidth={2.5} color={COLORS.white} />
        </span>
        <span className="text-sm font-medium leading-snug text-white sm:text-base">
          {to}
        </span>
      </div>
    </motion.div>
  );
}

// =========================================
// MAIN COMPONENT
// =========================================
export default function VisionComparison() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ backgroundColor: '#F5F6FA' }}
    >
      {/* Soft glow accents, kept inside the brand palette */}
      <div
        className="pointer-events-none absolute -left-32 -top-24 h-72 w-72 rounded-full blur-3xl sm:h-96 sm:w-96"
        style={{ backgroundColor: `${COLORS.navy}1A` }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl sm:h-96 sm:w-96"
        style={{ backgroundColor: `${COLORS.charcoal}14` }}
      />

      <div className="relative mx-auto max-w-4xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center sm:mb-16"
        >
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            style={{ color: COLORS.charcoal }}
          >
            From what stands today, to what we're building next
          </h2>
        </motion.div>

        {/* Column labels */}
        <div className="mb-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6 md:gap-10">
          <p className="text-right text-xs font-semibold uppercase tracking-wide text-[#373A49]/50 sm:text-sm">
            Starting Point
          </p>
          <span className="w-9 sm:w-10" />
          <p className="text-left text-xs font-semibold uppercase tracking-wide sm:text-sm" style={{ color: COLORS.navy }}>
            The Vision
          </p>
        </div>

        {/* Rows */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col gap-4 sm:gap-5"
        >
          {COMPARISON_ROWS.map((row, idx) => (
            <ComparisonRow
              key={row.from}
              from={row.from}
              to={row.to}
              isLast={idx === COMPARISON_ROWS.length - 1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}