import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Upload, X } from "lucide-react";
import { ACCEPTED_FILE_TYPES, checkFile, MAX_FILE_MB } from "../../schemas/supplierSchema";
import { cx, EASE, FieldShell } from "./SupplierUI";

const formatSize = (b) => (b < 1024 * 1024 ? `${Math.max(1, Math.round(b / 1024))} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`);
const extOf = (f) => f.name.split(".").pop().toUpperCase();

// Attach PDF / PNG / JPG. `multiple` → value is File[], otherwise File | null.
// Invalid files (wrong type or too large) are rejected with an inline message; valid ones are kept.
export default function FileAttachment({ label, value, onChange, multiple = false, className }) {
  const id = useId();
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const files = multiple ? value : value ? [value] : [];

  const addFiles = (list) => {
    const ok = [];
    const errs = [];
    Array.from(list).forEach((f) => {
      const e = checkFile(f);
      if (e) errs.push(e); else ok.push(f);
    });
    setError(errs.join(" "));
    if (!ok.length) return;
    if (multiple) {
      const key = (f) => `${f.name}:${f.size}`;
      const have = new Set(value.map(key));
      onChange([...value, ...ok.filter((f) => !have.has(key(f)))]);
    } else onChange(ok[0]);
  };
  const removeAt = (i) => { setError(""); onChange(multiple ? value.filter((_, idx) => idx !== i) : null); };

  return (
    <FieldShell id={id} label={label} optional error={error} className={className}>
      <input
        id={id} type="file" accept={ACCEPTED_FILE_TYPES} multiple={multiple} className="peer sr-only"
        onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }}
      />
      <label
        htmlFor={id}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
        className={cx(
          "flex cursor-pointer items-center gap-3 rounded-lg border border-dashed px-3.5 py-3 text-sm transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#2A317A]/40 peer-focus-visible:ring-offset-2",
          dragging ? "border-[#2A317A] bg-[#2A317A]/[0.06]" : "border-[#3C3C3B]/30 bg-white hover:border-[#2A317A]/60 hover:bg-[#2A317A]/[0.03]"
        )}
      >
        <Upload size={16} aria-hidden="true" className="shrink-0 text-[#2A317A]" />
        <span className="min-w-0">
          <span className="font-medium text-[#2A317A]">{multiple ? "Attach files" : files.length ? "Replace file" : "Attach file"}</span>
          <span className="block text-xs text-[#3C3C3B]/55">or drop here · PDF, PNG, JPG · up to {MAX_FILE_MB} MB</span>
        </span>
      </label>

      <ul className={cx("space-y-2 empty:hidden", files.length > 0 && "mt-2", multiple && "max-h-48 overflow-y-auto p-0.5")} aria-label={`${label} — attached files`}>
        <AnimatePresence initial={false}>
          {files.map((f, i) => (
            <motion.li
              key={`${f.name}-${f.size}`} layout
              initial={{ opacity: 0, y: 6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, x: 16, height: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="flex items-center gap-3 overflow-hidden rounded-lg border border-[#3C3C3B]/15 bg-white px-3 py-2"
            >
              <FileText size={16} aria-hidden="true" className="shrink-0 text-[#2A317A]" />
              <span className="min-w-0 flex-1">
                <span dir="auto" className="block truncate text-sm text-[#3C3C3B]">{f.name}</span>
                <span className="text-xs text-[#3C3C3B]/55">{extOf(f)} · {formatSize(f.size)}</span>
              </span>
              <button type="button" onClick={() => removeAt(i)} aria-label={`Remove ${f.name}`} className="rounded-md p-1.5 text-[#3C3C3B]/55 hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600/40">
                <X size={15} aria-hidden="true" />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </FieldShell>
  );
}