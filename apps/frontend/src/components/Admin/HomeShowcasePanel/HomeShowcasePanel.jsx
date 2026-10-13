import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  EyeOff,
  Home,
  ImageOff,
  Plus,
  Sparkles,
  X,
} from "lucide-react";
import { selectHomeProjects } from "../../../features/marketing/MarketingProvider";
import { Bar, cardCls, stagger } from "../../../ui/adminUi";

export const MAX_HOME = 10; // أقصى عدد مشاريع في سيكشن الهوم

function projectTitle(project) {
  if (typeof project.title === "string") return project.title;
  if (project.title && typeof project.title === "object") return project.title.ar || project.title.en || "";
  return project.titleAr || project.titleEn || "";
}

function moveItem(list, index, direction) {
  const target = index + direction;
  if (target < 0 || target >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(index, 1);
  next.splice(target, 0, item);
  return next;
}

/* ------------------------------------------------------------------ */
/* FLIP: لما الترتيب يتغير الكروت بتنزلق لمكانها الجديد بدل ما تنط     */
/* ------------------------------------------------------------------ */
function useFlip() {
  const nodes = useRef(new Map());
  const last = useRef(new Map());

  useLayoutEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const nextPositions = new Map();
    nodes.current.forEach((el, key) => {
      const pos = { x: el.offsetLeft, y: el.offsetTop };
      nextPositions.set(key, pos);
      const prev = last.current.get(key);
      if (prev && !reduce) {
        const dx = prev.x - pos.x;
        const dy = prev.y - pos.y;
        if (dx || dy) {
          el.animate(
            [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "translate(0, 0)" }],
            { duration: 420, easing: "cubic-bezier(.2,.8,.2,1)" }
          );
        }
      }
    });
    last.current = nextPositions;
  });

  return (key) => (el) => {
    if (el) nodes.current.set(key, el);
    else nodes.current.delete(key);
  };
}

function Thumb({ src, className = "" }) {
  const [ok, setOk] = useState(Boolean(src));
  useEffect(() => setOk(Boolean(src)), [src]);
  if (!src || !ok) {
    return (
      <div className={`grid place-items-center bg-[#3C3C3B] ${className}`}>
        <ImageOff className="h-6 w-6 text-white/50" strokeWidth={1.5} />
      </div>
    );
  }
  return <img src={src} alt="" onError={() => setOk(false)} className={`object-cover ${className}`} />;
}

/* ------------------------------------------------------------------ */

export default function HomeShowcasePanel({ projects, onChange }) {
  const [open, setOpen] = useState(true);
  const flipRef = useFlip();

  const selected = useMemo(() => selectHomeProjects(projects), [projects]);
  const selectedIds = useMemo(() => new Set(selected.map((p) => String(p.id))), [selected]);
  const pool = useMemo(() => projects.filter((p) => !selectedIds.has(String(p.id))), [projects, selectedIds]);

  const full = selected.length >= MAX_HOME;
  const ids = selected.map((p) => p.id);

  const add = (id) => !full && onChange([...ids, id]);
  const remove = (id) => onChange(ids.filter((x) => String(x) !== String(id)));
  const move = (i, d) => onChange(moveItem(ids, i, d));

  return (
    <section className={`${cardCls} adm-rise overflow-hidden`} style={stagger(3, 80)}>
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 p-5 text-start sm:p-7"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-[#2A317A] text-white">
            <Home className="h-6 w-6" strokeWidth={1.8} />
            <Sparkles className="absolute -end-1.5 -top-1.5 h-4 w-4 animate-pulse text-[#2A317A] motion-reduce:animate-none" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-xl font-bold text-black sm:text-2xl">مشاريع الصفحة الرئيسية</span>
            <span className="block text-base text-[#3C3C3B]">اختاري المشاريع اللي تظهر في الهوم ورتّبيها</span>
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-3">
          <span className="rounded-md bg-black px-3 py-1 text-base font-bold text-white" dir="ltr">
            {selected.length} / {MAX_HOME}
          </span>
          <ChevronDown
            className={`h-6 w-6 text-[#3C3C3B] transition-transform duration-500 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {/* Collapsible body */}
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-6 px-5 pb-5 sm:px-7 sm:pb-7">
            <Bar value={selected.length} max={MAX_HOME} />

            {/* Selected: ترتيب الظهور */}
            {selected.length === 0 ? (
              <div className="adm-pop grid place-items-center rounded-xl border border-dashed border-[#3C3C3B]/40 bg-[#3C3C3B]/[0.04] px-6 py-12 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-xl bg-[#2A317A]/10 text-[#2A317A]">
                  <Home className="h-7 w-7" />
                </span>
                <p className="mt-4 text-lg font-bold text-black">سيكشن المشاريع في الهوم فاضي</p>
                <p className="mt-1 text-base text-[#3C3C3B]">اختاري مشروع من تحت عشان يظهر.</p>
              </div>
            ) : (
              <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {selected.map((project, i) => (
                  <article
                    key={project.id}
                    ref={flipRef(String(project.id))}
                    className="adm-pop group relative aspect-[4/3] overflow-hidden rounded-xl border border-[#3C3C3B]/15 bg-[#3C3C3B] shadow-sm transition-shadow duration-300 hover:shadow-lg motion-reduce:transition-none"
                  >
                    <Thumb
                      src={project.src}
                      className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                    <span
                      className="absolute start-3 top-3 grid h-9 min-w-9 place-items-center rounded-md bg-[#2A317A] px-2 text-base font-bold text-white shadow"
                      dir="ltr"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <button
                      type="button"
                      onClick={() => remove(project.id)}
                      title="إزالة من الرئيسية"
                      aria-label="إزالة من الرئيسية"
                      className="absolute end-3 top-3 grid h-9 w-9 place-items-center rounded-md bg-white text-black shadow transition-all duration-300 hover:rotate-90 hover:bg-black hover:text-white active:scale-90 motion-reduce:transition-none motion-reduce:hover:rotate-0"
                    >
                      <X className="h-5 w-5" />
                    </button>

                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3">
                      <h4 className="line-clamp-2 min-w-0 text-base font-bold leading-6 text-white sm:text-lg">
                        {projectTitle(project) || "بدون اسم"}
                      </h4>
                      <div className="flex shrink-0 gap-1.5">
                        <button
                          type="button"
                          disabled={i === 0}
                          onClick={() => move(i, -1)}
                          title="تقديم"
                          aria-label="تقديم"
                          className="grid h-9 w-9 place-items-center rounded-md bg-white text-black transition-all duration-300 hover:bg-[#2A317A] hover:text-white active:scale-90 disabled:pointer-events-none disabled:opacity-35 motion-reduce:transition-none"
                        >
                          <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
                        </button>
                        <button
                          type="button"
                          disabled={i === selected.length - 1}
                          onClick={() => move(i, 1)}
                          title="تأخير"
                          aria-label="تأخير"
                          className="grid h-9 w-9 place-items-center rounded-md bg-white text-black transition-all duration-300 hover:bg-[#2A317A] hover:text-white active:scale-90 disabled:pointer-events-none disabled:opacity-35 motion-reduce:transition-none"
                        >
                          <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pool: باقي المشاريع */}
            {/* {pool.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-lg font-bold text-black">باقي المشاريع</h4>
                  {full && <span className="adm-pop text-base font-semibold text-[#2A317A]">وصلتي للحد الأقصى ({MAX_HOME})</span>}
                </div>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {pool.map((project, i) => {
                    const hidden = project.published === false;
                    const disabled = hidden || full;
                    return (
                      <button
                        key={project.id}
                        ref={flipRef(`pool-${project.id}`)}
                        type="button"
                        disabled={disabled}
                        onClick={() => add(project.id)}
                        style={stagger(i, 30)}
                        title={hidden ? "المشروع مخفي، أظهريه الأول" : "إضافة للرئيسية"}
                        className="adm-pop group flex items-center gap-3 rounded-xl border border-[#3C3C3B]/15 bg-white p-2.5 text-start transition-all duration-300 hover:-translate-y-0.5 hover:border-[#2A317A] hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:border-[#3C3C3B]/15 disabled:hover:shadow-none motion-reduce:transition-none"
                      >
                        <Thumb src={project.src} className="h-14 w-20 shrink-0 rounded-lg" />
                        <span className="min-w-0 flex-1">
                          <span className="line-clamp-1 block text-base font-bold text-black">{projectTitle(project) || "بدون اسم"}</span>
                          <span className="mt-0.5 flex items-center gap-1.5 text-sm text-[#3C3C3B]">
                            {hidden ? (
                              <>
                                <EyeOff className="h-3.5 w-3.5" /> مخفي
                              </>
                            ) : (
                              project.category
                            )}
                          </span>
                        </span>
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#2A317A]/10 text-[#2A317A] transition-all duration-300 group-enabled:group-hover:rotate-90 group-enabled:group-hover:bg-[#2A317A] group-enabled:group-hover:text-white motion-reduce:transition-none">
                          <Plus className="h-5 w-5" />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </section>
  );
}