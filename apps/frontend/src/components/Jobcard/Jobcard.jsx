



import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, ArrowUpRight, Hourglass, BadgeCheck } from "lucide-react";

const badgeVariants = {
  hidden: { opacity: 0, scale: 1.6, rotate: -14 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: -6,
    transition: { type: "spring", stiffness: 260, damping: 14, delay: 0.15 },
  },
};

export default function JobCard({ job, variants }) {
  const isWaiting = job.type === "Waiting List";

  return (
    <motion.article
      layout
      variants={variants}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.18 } }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(20,33,46,0.04)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-14px_rgba(20,33,46,0.25)]"
    >
      <span className="absolute left-5 top-5 h-2 w-2 rounded-full border border-slate-300 bg-[#EDF1F5]" />
      <span className="absolute left-0 top-0 h-full w-px bg-[repeating-linear-gradient(180deg,#CBD5E1_0,#CBD5E1_4px,transparent_4px,transparent_9px)]" />

      <div className="flex items-start justify-between p-6 pb-4 pl-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2A317A]">
          <span className="font-mono text-[11px] font-semibold text-[#FFFFFF]">
            {String(job.id).padStart(2, "0")}
          </span>
        </div>
        <motion.span
          variants={badgeVariants}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm ${
            isWaiting ? "bg-slate-500" : "bg-amber-500"
          }`}
        >
          {isWaiting ? <Hourglass className="h-3 w-3" /> : <BadgeCheck className="h-3 w-3" />}
          {job.type}
        </motion.span>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pl-8">
        <h3 className="text-[19px] font-bold leading-snug text-[#14212E]">
          {job.title}
        </h3>
        <p className="mt-1 font-mono text-[12px] uppercase tracking-wide text-[#2A317A]">
          {job.department}
        </p>

        <div className="mt-3 flex items-start gap-1.5 text-[13px] text-slate-500">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>{job.locationLabel}</span>
        </div>

        <div className="mt-5 border-t border-dashed border-slate-200 pt-4">
          <p className="text-[15px] font-semibold text-[#14212E]">
            {job.salaryMin.toLocaleString()} – {job.salaryMax.toLocaleString()}{" "}
            <span className="text-[13px] font-medium text-slate-400">
              {job.currency}
            </span>
          </p>
        </div>

        <Link
          to={`/careers/${job.id}`}
          className="relative mt-5 flex items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-[#3C3C3B] py-3 text-[14px] font-semibold text-white"
        >
          <span className="absolute inset-0 -translate-x-full bg-[#2A317A] transition-transform duration-300 ease-out group-hover:translate-x-0" />
          <span className="relative z-10">Job Details</span>
          <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.article>
  );
}