// Small shared primitives for the Supplier flow (fields, searchable select, collapse, button, cards).
// If your project already has shared Button / Input / Select components, you can swap them in here
// in one place — every Supplier component imports its primitives from this file.
import { createContext, useContext, useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { Check, ChevronDown, CircleAlert, HardHat, Search, ShoppingCart, Wrench, Zap } from "lucide-react";

export const AttemptContext = createContext(0); // bumps every failed "Continue" → re-triggers the shake
export const cx = (...c) => c.filter(Boolean).join(" ");
export const EASE = [0.22, 1, 0.36, 1];
export const SPECIALTY_ICONS = { electrical: Zap, mechanical: Wrench, general: HardHat, procurement: ShoppingCart };

const inputBase =
  "w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-[#3C3C3B] placeholder:text-[#3C3C3B]/40 outline-none transition-colors focus-visible:border-[#2A317A] focus-visible:ring-2 focus-visible:ring-[#2A317A]/25 disabled:cursor-not-allowed disabled:bg-[#3C3C3B]/5 disabled:text-[#3C3C3B]/50";
const borderFor = (error) => (error ? "border-red-600" : "border-[#3C3C3B]/20 hover:border-[#3C3C3B]/40");

export function Spinner({ className }) {
  return <span aria-hidden="true" className={cx("inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent", className)} />;
}

export function ErrorText({ id, message }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id} role="alert"
          initial={{ opacity: 0, y: -4, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-start gap-1.5 overflow-hidden pt-1.5 text-xs font-medium text-red-700"
        >
          <CircleAlert size={14} className="mt-px shrink-0" aria-hidden="true" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export function FieldShell({ id, label, required, optional, hint, error, children, className }) {
  const attempt = useContext(AttemptContext);
  const controls = useAnimationControls();
  const hasError = !!error;
  useEffect(() => {
    if (hasError) controls.start({ x: [0, -6, 6, -4, 4, 0], transition: { duration: 0.35 } });
  }, [attempt, hasError, controls]);

  return (
    <motion.div animate={controls} className={className}>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between gap-2 text-sm font-medium text-[#3C3C3B]">
        <span>
          {label}
          {required && <span aria-hidden="true" className="text-[#2A317A]"> *</span>}
          {required && <span className="sr-only"> (required)</span>}
        </span>
        {optional && <span className="text-xs font-normal text-[#3C3C3B]/50">Optional</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-xs text-[#3C3C3B]/55">{hint}</p>}
      <ErrorText id={`${id}-err`} message={error} />
    </motion.div>
  );
}

export function TextField({ label, required, optional, hint, error, className, ...props }) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} required={required} optional={optional} hint={hint} error={error} className={className}>
      <input
        id={id} dir="auto" aria-required={required || undefined} aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
        className={cx(inputBase, borderFor(error))} {...props}
      />
    </FieldShell>
  );
}

export function TextArea({ label, required, optional, hint, error, className, ...props }) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} required={required} optional={optional} hint={hint} error={error} className={className}>
      <textarea
        id={id} dir="auto" rows={3} aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
        className={cx(inputBase, "resize-y", borderFor(error))} {...props}
      />
    </FieldShell>
  );
}

// Searchable single-select (combobox). Options are plain strings.
export function SearchSelect({
  label, value, onChange, options, placeholder = "Select…", searchPlaceholder = "Search…",
  required, optional, error, disabled, clearable, className,
}) {
  const id = useId();
  const listId = `${id}-list`;
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const wrapRef = useRef(null);
  const triggerRef = useRef(null);
  const searchRef = useRef(null);
  const listRef = useRef(null);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? options.filter((o) => o.toLowerCase().includes(s)) : options;
  }, [q, options]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (!wrapRef.current?.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setQ("");
    setActive(Math.max(0, options.indexOf(value)));
    requestAnimationFrame(() => searchRef.current?.focus());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (open) listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const close = () => { setOpen(false); triggerRef.current?.focus(); };
  const pick = (v) => { onChange(v); close(); };
  const onSearchKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((i) => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); if (filtered[active]) pick(filtered[active]); }
    else if (e.key === "Escape") { e.preventDefault(); close(); }
    else if (e.key === "Tab") setOpen(false);
  };

  return (
    <FieldShell id={id} label={label} required={required} optional={optional} error={error} className={className}>
      <div ref={wrapRef} className="relative">
        <button
          ref={triggerRef} id={id} type="button" disabled={disabled}
          aria-haspopup="listbox" aria-expanded={open} aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={(e) => { if (e.key === "ArrowDown" && !open) { e.preventDefault(); setOpen(true); } }}
          className={cx(inputBase, "flex items-center justify-between gap-2 text-left", borderFor(error), clearable && value && "pr-16")}
        >
          <span dir="auto" className={cx("truncate", !value && "text-[#3C3C3B]/40")}>{value || placeholder}</span>
          <ChevronDown size={16} aria-hidden="true" className={cx("shrink-0 text-[#3C3C3B]/50 transition-transform", open && "rotate-180")} />
        </button>
        {clearable && value && !disabled && (
          <button
            type="button" aria-label={`Clear ${label}`} onClick={() => onChange("")}
            className="absolute right-9 top-1/2 -translate-y-1/2 rounded px-1 text-xs text-[#3C3C3B]/55 hover:text-[#2A317A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A317A]/40"
          >
            Clear
          </button>
        )}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 top-full z-30 mt-1.5 rounded-xl border border-[#3C3C3B]/15 bg-white p-2 shadow-lg shadow-[#2A317A]/10"
            >
              <div className="relative">
                <Search size={15} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#3C3C3B]/45" />
                <input
                  ref={searchRef} dir="auto" role="combobox" aria-expanded="true" aria-controls={listId} aria-autocomplete="list"
                  aria-activedescendant={filtered[active] ? `${id}-o${active}` : undefined}
                  aria-label={`Search ${label}`} placeholder={searchPlaceholder} value={q}
                  onChange={(e) => { setQ(e.target.value); setActive(0); }} onKeyDown={onSearchKey}
                  className="w-full rounded-lg border border-[#3C3C3B]/15 py-2 pl-9 pr-3 text-sm outline-none focus-visible:border-[#2A317A] focus-visible:ring-2 focus-visible:ring-[#2A317A]/25"
                />
              </div>
              <ul id={listId} role="listbox" aria-label={label} ref={listRef} className="mt-2 max-h-56 overflow-y-auto">
                {filtered.length === 0 && <li role="presentation" className="px-3 py-6 text-center text-sm text-[#3C3C3B]/55">No results for “{q}”</li>}
                {filtered.map((o, i) => (
                  <li
                    key={o} id={`${id}-o${i}`} role="option" dir="auto" aria-selected={o === value} data-active={i === active}
                    onMouseEnter={() => setActive(i)} onClick={() => pick(o)}
                    className={cx("flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-[#3C3C3B]", i === active && "bg-[#2A317A]/8", o === value && "font-semibold text-[#2A317A]")}
                  >
                    <span>{o}</span>
                    {o === value && <Check size={15} aria-hidden="true" />}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FieldShell>
  );
}

// Height + opacity + translateY. Overflow is only clipped while animating,
// so popovers (SearchSelect) inside an open Collapse are never cut off.
export function Collapse({ open, id, children }) {
  const [settled, setSettled] = useState(open);
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id={id} key="body"
          initial={{ height: 0, opacity: 0, y: -6 }} animate={{ height: "auto", opacity: 1, y: 0 }} exit={{ height: 0, opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: EASE }}
          onAnimationStart={() => setSettled(false)}
          onAnimationComplete={(def) => setSettled(!!def && def.height === "auto")}
          style={{ overflow: settled ? "visible" : "hidden" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Button({ variant = "primary", className, children, ...props }) {
  const styles = {
    primary: "bg-[#2A317A] text-white hover:bg-[#222868] active:bg-[#1B2059] disabled:bg-[#2A317A]/40",
    secondary: "border border-[#3C3C3B]/20 bg-white text-[#3C3C3B] hover:bg-[#3C3C3B]/5 disabled:opacity-50",
    ghost: "text-[#2A317A] hover:bg-[#2A317A]/10 disabled:opacity-50",
    danger: "text-red-700 hover:bg-red-50 disabled:opacity-50",
  };
  return (
    <button
      type="button"
      className={cx("inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A317A]/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed", styles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function IconBox({ icon: Icon }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2A317A]/8 text-[#2A317A]">
      <Icon size={18} aria-hidden="true" />
    </span>
  );
}

export function StepHeading({ title, description }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold tracking-tight text-[#2A317A] sm:text-3xl">{title}</h2>
      {description && <p className="mt-2 max-w-xl text-sm text-[#3C3C3B]/65">{description}</p>}
    </div>
  );
}

export function Section({ icon, title, description, children, className }) {
  return (
    <section className={cx("rounded-xl border border-[#3C3C3B]/12 bg-white p-5 sm:p-6", className)}>
      <div className="mb-5 flex items-center gap-3">
        {icon && <IconBox icon={icon} />}
        <div>
          <h3 className="text-sm font-semibold text-[#3C3C3B]">{title}</h3>
          {description && <p className="text-xs text-[#3C3C3B]/55">{description}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

// Optional group that stays collapsed until the user needs it (progressive disclosure).
export function OptionalGroup({ icon, title, description, filled, children }) {
  const [open, setOpen] = useState(!!filled);
  const id = useId();
  return (
    <section className="rounded-xl border border-[#3C3C3B]/12 bg-white">
      <button
        type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 rounded-xl p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A317A]/40 sm:px-6"
      >
        <IconBox icon={icon} />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-[#3C3C3B]">{title}</span>
          <span className="block truncate text-xs text-[#3C3C3B]/55">{description}</span>
        </span>
        {filled && <span className="flex items-center gap-1 text-xs font-medium text-[#2A317A]"><Check size={14} aria-hidden="true" />Added</span>}
        <span className="hidden text-xs text-[#3C3C3B]/50 sm:inline">Optional</span>
        <ChevronDown size={18} aria-hidden="true" className={cx("shrink-0 text-[#3C3C3B]/50 transition-transform", open && "rotate-180")} />
      </button>
      <Collapse open={open} id={id}>
        <div className="px-5 pb-5 pt-1 sm:px-6 sm:pb-6">{children}</div>
      </Collapse>
    </section>
  );
}