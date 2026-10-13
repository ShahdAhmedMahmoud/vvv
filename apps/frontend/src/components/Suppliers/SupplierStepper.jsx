import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { cx, EASE } from "./SupplierUI";

// Desktop: circles + animated progress line. Mobile: compact "Step x of y" + thin bar.
export default function SupplierStepper({ steps, current, onJump }) {
  const last = steps.length - 1;
  const pct = last ? (current / last) * 100 : 0;

  return (
    <nav aria-label="Supplier registration progress">
      <div className="sm:hidden">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-semibold text-[#2A317A]">{steps[current].label}</span>
          <span className="text-xs text-[#3C3C3B]/60">Step {current + 1} of {steps.length}</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#3C3C3B]/12">
          <motion.div className="h-full rounded-full bg-[#2A317A]" initial={false} animate={{ width: `${((current + 1) / steps.length) * 100}%` }} transition={{ duration: 0.5, ease: EASE }} />
        </div>
      </div>

      <div className="relative hidden sm:block">
        <div aria-hidden="true" className="absolute left-14 right-14 top-4 h-0.5 bg-[#3C3C3B]/12">
          <motion.div className="h-full bg-[#2A317A]" initial={false} animate={{ width: `${pct}%` }} transition={{ duration: 0.5, ease: EASE }} />
        </div>
        <ol className="relative flex justify-between">
          {steps.map((s, i) => {
            const done = i < current;
            const active = i === current;
            return (
              <li key={s.id} className="flex w-28 flex-col items-center gap-2 text-center">
                <button
                  type="button" disabled={!done} onClick={() => onJump(i)}
                  aria-current={active ? "step" : undefined}
                  aria-label={`${s.label}${done ? " (completed, go back to edit)" : active ? " (current step)" : ""}`}
                  className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A317A]/40 focus-visible:ring-offset-2 disabled:cursor-default"
                >
                  <motion.span
                    initial={false}
                    animate={{ backgroundColor: done ? "#2A317A" : "#FFFFFF", borderColor: done || active ? "#2A317A" : "rgba(60,60,59,0.25)", scale: active ? 1.08 : 1 }}
                    transition={{ duration: 0.3 }}
                    className={cx("relative flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold", done ? "text-white" : active ? "text-[#2A317A]" : "text-[#3C3C3B]/50")}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {done ? (
                        <motion.span key="check" initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} transition={{ duration: 0.2 }}>
                          <Check size={16} strokeWidth={3} aria-hidden="true" />
                        </motion.span>
                      ) : (
                        <motion.span key="num" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.15 }}>
                          {i + 1}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.span>
                </button>
                <span className={cx("text-xs leading-tight", active ? "font-semibold text-[#2A317A]" : done ? "text-[#3C3C3B]" : "text-[#3C3C3B]/50")}>{s.label}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}