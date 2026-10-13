import { motion } from "motion/react";
import { Milestone } from "lucide-react";

const headingContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const wordVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function TimelineHeader() {
  return (
    <div className="relative bg-[#F8F9FD] pt-20 pb-14 px-4 overflow-hidden">
      {/* الخط المتقطع اللي بيترسم لوحده */}
      <svg
        className="w-full max-w-3xl mx-auto h-14 mb-2"
        viewBox="0 0 1000 60"
        fill="none"
      >
        <motion.path
          d="M0 40 Q 250 5 500 35 T 1000 30"
          stroke="#1F3888"
          strokeWidth="2.5"
          strokeDasharray="8 10"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
      </svg>

      <div className="relative z-10 text-center">
        {/* الـ eyebrow label */}
        <motion.span
          className="inline-flex items-center gap-2 text-[#D98A2B] font-semibold tracking-[0.2em] text-sm mb-4"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Milestone className="w-4 h-4" />
          OUR JOURNEY
        </motion.span>

        {/* العنوان - نفس أسلوب دخول About Us كلمة كلمة */}
        <h2 className="text-4xl md:text-6xl font-bold text-[#1E2432] overflow-hidden">
          <motion.span
            className="inline-block"
            variants={headingContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span variants={wordVariant} className="inline-block mr-3">
              Our
            </motion.span>
            <motion.span variants={wordVariant} className="inline-block text-[#1F3888]">
              Timeline
            </motion.span>
          </motion.span>
        </h2>

        <motion.p
          className="text-[#6C757D] max-w-xl mx-auto mt-4"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          From humble beginnings to landmark projects — here's how far we've come.
        </motion.p>
      </div>
    </div>
  );
}