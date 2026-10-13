import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function paginateItems(items, page, pageSize = 10) {
  const total = Array.isArray(items) ? items.length : 0;
  const size = Math.max(1, Number(pageSize) || 10);
  const pageCount = Math.max(1, Math.ceil(total / size) || 1);
  const current = Math.min(Math.max(1, Number(page) || 1), pageCount);
  const start = (current - 1) * size;
  return {
    items: (items || []).slice(start, start + size),
    page: current,
    pageSize: size,
    pageCount,
    total,
    start: total === 0 ? 0 : start + 1,
    end: Math.min(start + size, total),
  };
}

function buildPages(page, pageCount) {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
  const pages = new Set([1, pageCount, page, page - 1, page + 1, page - 2, page + 2]);
  const sorted = [...pages].filter((n) => n >= 1 && n <= pageCount).sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < sorted.length; i += 1) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push("\u2026");
    result.push(sorted[i]);
  }
  return result;
}

export default function Pagination({ page = 1, pageSize = 10, total = 0, onChange, className = "" }) {
  const meta = useMemo(
    () => paginateItems(Array.from({ length: total }), page, pageSize),
    [page, pageSize, total]
  );
  if (total <= pageSize && total > 0) {
    return (
      <div className={`mt-4 flex flex-wrap items-center justify-between gap-2 text-[13px] text-[#737373] ${className}`}>
        <p>{"\u0625\u062c\u0645\u0627\u0644\u064a"} {total}</p>
      </div>
    );
  }
  if (total === 0) return null;

  const pages = buildPages(meta.page, meta.pageCount);
  const go = (next) => {
    if (!onChange) return;
    const clamped = Math.min(Math.max(1, next), meta.pageCount);
    if (clamped !== meta.page) onChange(clamped);
  };

  const navBtn =
    "inline-flex h-8 items-center gap-1 rounded-md border border-[#e5e5ea] bg-white px-2.5 text-[13px] font-medium text-[#404040] transition hover:border-[#d4d4d8] hover:bg-[#f5f5f5] disabled:cursor-not-allowed disabled:opacity-40";
  const pageBtn =
    "inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-[13px] font-medium transition tabular-nums";

  return (
    <nav
      className={`mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${className}`}
      aria-label={"\u062a\u0635\u0641\u062d"}
    >
      <p className="text-[13px] text-[#737373]">
        {"\u0639\u0631\u0636"} {meta.start}-{meta.end} {"\u0645\u0646"} {meta.total}
        <span className="mx-1.5 text-[#d4d4d8]">{"\u00b7"}</span>
        {"\u0635\u0641\u062d\u0629"} {meta.page} {"\u0645\u0646"} {meta.pageCount}
      </p>
      <div className="flex flex-wrap items-center gap-1">
        <button type="button" className={navBtn} disabled={meta.page <= 1} onClick={() => go(meta.page - 1)} aria-label={"\u0627\u0644\u0633\u0627\u0628\u0642"}>
          <ChevronRight className="h-3.5 w-3.5" />
          {"\u0627\u0644\u0633\u0627\u0628\u0642"}
        </button>
        {pages.map((item, index) =>
          item === "\u2026" ? (
            <span key={`e-${index}`} className="px-1 text-[#a3a3a3]">{"\u2026"}</span>
          ) : (
            <button
              key={item}
              type="button"
              className={`${pageBtn} ${item === meta.page ? "bg-[#2A317A] text-white" : "border border-[#e5e5ea] bg-white text-[#404040] hover:bg-[#f5f5f5]"}`}
              aria-current={item === meta.page ? "page" : undefined}
              onClick={() => go(item)}
            >
              {item}
            </button>
          )
        )}
        <button type="button" className={navBtn} disabled={meta.page >= meta.pageCount} onClick={() => go(meta.page + 1)} aria-label={"\u0627\u0644\u062a\u0627\u0644\u064a"}>
          {"\u0627\u0644\u062a\u0627\u0644\u064a"}
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
      </div>
    </nav>
  );
}