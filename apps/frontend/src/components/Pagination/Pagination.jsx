import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// يرجّع مصفوفة زي: [1, "…", 4, 5, 6, "…", 12]
function getPages(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set([1, total, current, current - 1, current + 1]);
  if (current <= 3) [2, 3, 4].forEach((p) => pages.add(p));
  if (current >= total - 2) [total - 1, total - 2, total - 3].forEach((p) => pages.add(p));

  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const result = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) result.push("…");
    result.push(p);
  });
  return result;
}

export default function Pagination({ currentPage, totalPages, totalItems, pageSize, onChange }) {
  if (totalPages <= 1) return null;

  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalItems);

  const navBtn =
    "flex h-10 items-center gap-1.5 border px-3 text-[12px] font-semibold uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-30";

  return (
    <motion.nav
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      aria-label="Pagination"
      className="mt-10 flex flex-col items-center gap-4"
    >
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => onChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${navBtn} border-white/30 text-white hover:bg-white hover:text-[#3C3C3B]`}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {getPages(currentPage, totalPages).map((page, i) =>
          page === "…" ? (
            <span key={`dots-${i}`} className="px-1 text-white/60">
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={`relative h-10 min-w-10 border px-3 font-mono text-[13px] font-semibold transition-colors ${
                page === currentPage
                  ? "border-[#2A317A] bg-[#2A317A] text-white"
                  : "border-white/30 text-white hover:bg-white hover:text-[#3C3C3B]"
              }`}
            >
              {page}
              {page === currentPage && (
                <motion.span
                  layoutId="page-underline"
                  className="absolute inset-x-2 -bottom-[3px] h-[3px] bg-white"
                />
              )}
            </button>
          )
        )}

        <button
          onClick={() => onChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${navBtn} border-white/30 text-white hover:bg-white hover:text-[#3C3C3B]`}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <p className="text-[12px] text-white/70">
        Showing {from}–{to} of {totalItems} jobs
      </p>
    </motion.nav>
  );
}