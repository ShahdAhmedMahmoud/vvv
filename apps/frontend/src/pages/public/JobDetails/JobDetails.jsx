
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ArrowLeft,
  Hourglass,
  BadgeCheck,
  Briefcase,
  Wallet,
  Clock3,
  CheckCircle2,
  Bookmark,
  Share2,
  Check,
} from "lucide-react";
import { jobs } from "../../../features/careers/Jobsdata";
import ApplicationModal from "../../../components/ApplicationModal/ApplicationModal";

export default function JobDetails() {
  const { jobId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const job = jobs.find((j) => String(j.id) === jobId);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard blocked (e.g. insecure context) — fail silently, no crash
    }
  };

  if (!job) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white text-[#3C3C3B]">
        <p className="text-lg font-semibold">Job not found</p>
        <Link
          to="/careers"
          className="text-[#2A317A] underline underline-offset-4"
        >
          Back to available jobs
        </Link>
      </div>
    );
  }

  const isWaiting = job.type === "Waiting List";

  return (
    <div className="min-h-screen bg-white">
      {/* back bar */}
      <div className="border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6 py-4 sm:px-10 lg:px-16">
          <Link
            to="/careers"
            className="inline-flex items-center gap-1.5 text-[13.5px] text-slate-500 transition-colors hover:text-[#3C3C3B]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to available jobs
          </Link>
        </div>
      </div>

      {/* header */}
      <header className="border-b border-slate-200 bg-[#F8F9FD]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-6xl px-6 py-14 sm:px-10 lg:px-16"
        >
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-2xl">
              <p className="font-mono text-[12px] uppercase tracking-wide text-[#2A317A]">
                {job.department}
              </p>

              <h1 className="mt-2 text-[32px] font-bold leading-tight tracking-tight text-[#3C3C3B] sm:text-[44px]">
                {job.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14.5px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {job.locationLabel}
                </span>

                <span className="flex items-center gap-1.5">
                  <Wallet className="h-4 w-4" />
                  {job.salaryMin.toLocaleString()} –{" "}
                  {job.salaryMax.toLocaleString()} {job.currency}
                </span>
              </div>
            </div>

            <span
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wide ${
                isWaiting
                  ? "border border-slate-300 bg-slate-100 text-slate-600"
                  : "border border-emerald-200 bg-emerald-50 text-emerald-700"
              }`}
            >
              {isWaiting ? (
                <Hourglass className="h-3.5 w-3.5" />
              ) : (
                <BadgeCheck className="h-3.5 w-3.5" />
              )}
              {job.type}
            </span>
          </div>
        </motion.div>
      </header>

      {/* body */}
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-14">
          {/* apply sidebar — shows first on mobile so it's not buried under a scroll */}
          <aside className="order-1 lg:order-2 lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-slate-200 p-6 shadow-[0_1px_2px_rgba(60,60,59,0.06)] lg:sticky lg:top-8"
            >
              <button
                onClick={() => setShowForm(true)}
                className="relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-[#2A317A] py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#232a68]"
              >
                {isWaiting ? "Join Waiting List" : "Apply Now"}
              </button>

              <div className="mt-3 flex items-center justify-center gap-4">
                <button
                  onClick={() => setSaved((s) => !s)}
                  className="flex items-center gap-1.5 text-[13px] font-medium text-slate-500 hover:text-[#3C3C3B]"
                >
                  <motion.span
                    animate={saved ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Bookmark
                      className="h-4 w-4"
                      fill={saved ? "#2A317A" : "none"}
                      stroke={saved ? "#2A317A" : "currentColor"}
                    />
                  </motion.span>
                  {saved ? "Saved" : "Save"}
                </button>

                <span className="h-4 w-px bg-slate-200" />

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-[13px] font-medium text-slate-500 hover:text-[#3C3C3B]"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="copied"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-1.5 text-emerald-600"
                      >
                        <Check className="h-4 w-4" /> Copied
                      </motion.span>
                    ) : (
                      <motion.span
                        key="share"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-1.5"
                      >
                        <Share2 className="h-4 w-4" /> Share
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              <div className="mt-6 space-y-4 border-t border-slate-200 pt-6">
                <dl className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-[#2A317A]" />
                    <div>
                      <dt className="text-[12px] text-slate-400">Department</dt>
                      <dd className="text-[14px] font-medium text-[#3C3C3B]">
                        {job.department}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#2A317A]" />
                    <div>
                      <dt className="text-[12px] text-slate-400">Location</dt>
                      <dd className="text-[14px] font-medium text-[#3C3C3B]">
                        {job.locationLabel}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[#2A317A]" />
                    <div>
                      <dt className="text-[12px] text-slate-400">Job Type</dt>
                      <dd className="text-[14px] font-medium text-[#3C3C3B]">
                        {job.type}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-[#2A317A]" />
                    <div>
                      <dt className="text-[12px] text-slate-400">
                        Salary Range
                      </dt>
                      <dd className="text-[14px] font-medium text-[#3C3C3B]">
                        {job.salaryMin.toLocaleString()} –{" "}
                        {job.salaryMax.toLocaleString()} {job.currency}
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </motion.div>
          </aside>

          {/* main content */}
          <div className="order-2 space-y-10 lg:order-1 lg:col-span-2">
            <div
              className={`rounded-xl border px-5 py-4 text-[14px] ${
                isWaiting
                  ? "border-slate-200 bg-slate-50 text-slate-600"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700"
              }`}
            >
              {isWaiting ? (
                <>
                  <strong className="font-semibold">
                    This position is currently closed.
                  </strong>{" "}
                  There is no active hiring for this position at the moment.
                  You can join the waiting list, and we will contact you if the
                  position becomes available again.
                </>
              ) : (
                <>
                  <strong className="font-semibold">
                    This position is currently available.
                  </strong>{" "}
                  We are actively reviewing applications for this position.
                </>
              )}
            </div>

            <section>
              <h2 className="text-[20px] font-bold text-[#3C3C3B]">
                About the Role
              </h2>

              <p className="mt-3 text-[15.5px] leading-relaxed text-slate-600">
                {job.overview}
              </p>
            </section>

            {job.responsibilities?.length > 0 && (
              <section>
                <h2 className="text-[20px] font-bold text-[#3C3C3B]">
                  Key Responsibilities
                </h2>

                <ul className="mt-4 space-y-3">
                  {job.responsibilities.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[15px] text-slate-600"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2A317A]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {job.requirements?.length > 0 && (
              <section>
                <h2 className="text-[20px] font-bold text-[#3C3C3B]">
                  Requirements
                </h2>

                <ul className="mt-4 space-y-3">
                  {job.requirements.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[15px] text-slate-600"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2A317A]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <button
              onClick={() => setShowForm(true)}
              className="relative flex w-full items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-[#2A317A] py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#232a68] sm:w-auto sm:px-10"
            >
              {isWaiting ? "Join Waiting List" : "Apply"}
            </button>
          </div>
        </div>
      </div>

      <ApplicationModal
        job={job}
        isWaiting={isWaiting}
        isOpen={showForm}
        onClose={() => setShowForm(false)}
      />
    </div>
  );
}


