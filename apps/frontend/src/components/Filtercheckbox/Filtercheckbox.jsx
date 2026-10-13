import { motion } from "framer-motion";

export default function FilterCheckbox({ id, label, checked, onChange, count }) {
  return (
    <label
      htmlFor={id}
      className="group flex cursor-pointer select-none items-center justify-between gap-3 py-1.5"
    >
      <span className="flex items-center gap-2.5">
        <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
          <span
            className={`pointer-events-none flex h-4 w-4 items-center justify-center rounded-[3px] border transition-colors duration-200 ${
              checked
                ? "border-[#2A317A] bg-[#2A317A]"
                : "border-slate-300 bg-white peer-hover:border-slate-400"
            }`}
          >
            <motion.svg viewBox="0 0 12 10" className="h-2.5 w-2.5">
              <motion.path
                d="M1 5L4.5 8.5L11 1"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={
                  checked
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            </motion.svg>
          </span>
        </span>
        <span
          className={`text-[13.5px] transition-colors duration-200 ${
            checked ? "font-medium text-[#14212E]" : "text-slate-600"
          }`}
        >
          {label}
        </span>
      </span>
      {typeof count === "number" && (
        <span className="font-mono text-[11px] text-slate-400">{count}</span>
      )}
    </label>
  );
}