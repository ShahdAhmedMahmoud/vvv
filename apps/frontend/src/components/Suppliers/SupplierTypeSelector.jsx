import { motion } from "framer-motion";
import { Building2, Check, User } from "lucide-react";
import { cx, EASE } from "./SupplierUI";

const OPTIONS = [
  { id: "individual", title: "Individual", subtitle: "Personal supplier", icon: User, steps: "3 steps: personal details, business activity, review" },
  { id: "company", title: "Company", subtitle: "Registered business / organization", icon: Building2, steps: "4 steps: company, contacts, business activity, review" },
];

export default function SupplierTypeSelector({ value, onSelect }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-[#2A317A] sm:text-3xl">What type of supplier are you adding?</h2>
      <p className="mt-2 text-sm text-[#3C3C3B]/65">We'll only ask for what applies to your choice.</p>

      <div role="radiogroup" aria-label="Supplier type" className="mt-8 grid gap-4 sm:grid-cols-2">
        {OPTIONS.map(({ id, title, subtitle, icon: Icon, steps }) => {
          const selected = value === id;
          const dimmed = !!value && !selected;
          return (
            <motion.button
              key={id} type="button" role="radio" aria-checked={selected} onClick={() => onSelect(id)}
              animate={{ scale: selected ? 1.02 : dimmed ? 0.98 : 1, opacity: dimmed ? 0.55 : 1 }}
              whileHover={value ? undefined : { y: -3 }} transition={{ duration: 0.3, ease: EASE }}
              className={cx(
                "relative flex items-start gap-4 rounded-2xl border-2 p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A317A]/40 focus-visible:ring-offset-2 sm:flex-col sm:gap-8 sm:p-7",
                selected ? "border-[#2A317A] bg-[#2A317A]/[0.04]" : "border-[#3C3C3B]/15 bg-white hover:border-[#2A317A]/50"
              )}
            >
              <span className={cx("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors sm:h-14 sm:w-14", selected ? "bg-[#2A317A] text-white" : "bg-[#2A317A]/8 text-[#2A317A]")}>
                <Icon size={24} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-lg font-semibold text-[#3C3C3B]">{title}</span>
                <span className="mt-0.5 block text-sm text-[#3C3C3B]/65">{subtitle}</span>
                <span className="mt-3 block text-xs text-[#3C3C3B]/50">{steps}</span>
              </span>
              <motion.span
                aria-hidden="true" initial={false} animate={{ scale: selected ? 1 : 0, opacity: selected ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
                className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#2A317A] text-white"
              >
                <Check size={14} />
              </motion.span>
              {selected && <span className="sr-only">Selected</span>}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}