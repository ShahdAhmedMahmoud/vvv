import { Mail, Pencil, Phone, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { cx, EASE } from "./SupplierUI";

export default function ContactCard({ contact, editing, onEdit, onRemove }) {
  const initial = contact.name.trim().charAt(0).toUpperCase();
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 24, height: 0, marginTop: 0 }} transition={{ duration: 0.25, ease: EASE }}
      className={cx("overflow-hidden rounded-xl border bg-white", editing ? "border-[#2A317A]" : "border-[#3C3C3B]/12")}
    >
      <div className="flex items-center gap-4 p-4">
        <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2A317A]/10 text-sm font-semibold text-[#2A317A]">{initial}</span>
        <div className="min-w-0 flex-1">
          <p dir="auto" className="truncate text-sm font-semibold text-[#3C3C3B]">
            {contact.name}
            {editing && <span className="ml-2 text-xs font-medium text-[#2A317A]">Editing</span>}
          </p>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-4 gap-y-0.5 text-xs text-[#3C3C3B]/65">
            <span className="flex items-center gap-1.5"><Phone size={12} aria-hidden="true" />{contact.phone}</span>
            {contact.email && <span className="flex items-center gap-1.5"><Mail size={12} aria-hidden="true" />{contact.email}</span>}
          </p>
        </div>
        <div className="flex shrink-0 gap-1">
          <button type="button" onClick={onEdit} aria-label={`Edit ${contact.name}`} className="rounded-lg p-2 text-[#3C3C3B]/60 hover:bg-[#2A317A]/10 hover:text-[#2A317A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A317A]/40">
            <Pencil size={16} aria-hidden="true" />
          </button>
          <button type="button" onClick={onRemove} aria-label={`Remove ${contact.name}`} className="rounded-lg p-2 text-[#3C3C3B]/60 hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600/40">
            <Trash2 size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.li>
  );
}