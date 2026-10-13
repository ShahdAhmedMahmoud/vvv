import { useEffect, useId, useState } from "react";
import { ImagePlus, Trash2, Upload } from "lucide-react";
import { PencilLine, Save, Undo2 } from "lucide-react";


export const FONT = "'IBM Plex Sans Arabic', 'Cairo', system-ui, sans-serif";

export const fieldCls =
  "mt-2 w-full rounded-lg border border-[#3C3C3B]/25 bg-white px-4 py-3 text-lg text-black outline-none transition placeholder:text-[#3C3C3B]/50 focus:border-[#2A317A] focus:ring-2 focus:ring-[#2A317A]/20";

export const cardCls =
  "rounded-xl border border-[#3C3C3B]/15 bg-white shadow-sm transition-all duration-300 hover:shadow-md motion-reduce:transition-none";

export function MotionStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap');
      @keyframes admRise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
      @keyframes admPop  { from { opacity: 0; transform: scale(.96); } to { opacity: 1; transform: none; } }
      @keyframes admBar  { from { width: 0; } }
      .adm .adm-rise { animation: admRise .55s cubic-bezier(.2,.7,.2,1) both; }
      .adm .adm-pop  { animation: admPop .4s cubic-bezier(.2,.7,.2,1) both; }
      .adm .adm-bar  { animation: admBar 1s cubic-bezier(.2,.7,.2,1) both; }
      @media (prefers-reduced-motion: reduce) {
        .adm .adm-rise, .adm .adm-pop, .adm .adm-bar { animation: none; }
      }
    `}</style>
  );
}

/* Stagger helper: <div className="adm-rise" style={stagger(index)} /> */
export function stagger(index, base = 0) {
  return { animationDelay: `${base + Math.min(index, 14) * 50}ms` };
}

export function Count({ value }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(value);
      return undefined;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / 800);
      const eased = 1 - (1 - progress) ** 3;
      setShown(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return shown;
}

export function Bar({ value, max }) {
  const pct = value > 0 && max > 0 ? Math.max(4, Math.round((value / max) * 100)) : 0;
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#3C3C3B]/15" aria-hidden="true">
      <div className="adm-bar h-full rounded-full bg-[#2A317A]" style={{ width: `${pct}%` }} />
    </div>
  );
}


/* ---------- Layout ---------- */

export function AdminPage({ as: Tag = "div", children, className = "", ...rest }) {
  return (
    <Tag
      className={`adm mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8 ${className}`}
      style={{ fontFamily: FONT }}
      {...rest}
    >
      <MotionStyles />
      {children}
    </Tag>
  );
}

export function PageHead({ kicker, title, text, children }) {
  return (
    <header className="adm-rise flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {kicker && (
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#2A317A]" dir="ltr">
            {kicker}
          </p>
        )}
        <h1 className="mt-1 text-3xl font-bold text-black sm:text-4xl">{title}</h1>
        {text && <p className="mt-2 max-w-2xl text-lg leading-8 text-[#3C3C3B]">{text}</p>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-3">{children}</div>}
    </header>
  );
}

/* ---------- Forms ---------- */

export const labelCls = "block text-base font-semibold text-[#3C3C3B]";

export function Toggle({ checked, onChange, children }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`flex w-full items-center justify-between gap-4 rounded-lg border p-4 text-start text-lg font-semibold text-black transition-colors duration-300 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2A317A]/40 ${
        checked ? "border-[#2A317A]/40 bg-[#2A317A]/5" : "border-[#3C3C3B]/25 bg-white"
      }`}
    >
      <span className="min-w-0">{children}</span>
      <span
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 motion-reduce:transition-none ${
          checked ? "bg-[#2A317A]" : "bg-[#3C3C3B]/30"
        }`}
      >
        <span
          className={`absolute start-1 top-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 motion-reduce:transition-none ${
            checked ? "ltr:translate-x-5 rtl:-translate-x-5" : ""
          }`}
        />
      </span>
    </button>
  );
}

/* ---------- Buttons ---------- */

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2A317A]/40 active:scale-[.98]";

// big call-to-action (new / save)
export const btnPrimary = `${btnBase} bg-[#2A317A] px-6 py-3 text-lg text-white shadow-sm hover:bg-black hover:shadow-md`;
// card actions
export const btnSolid = `${btnBase} bg-black px-4 py-2.5 text-base text-white hover:bg-[#2A317A]`;
export const btnQuiet = `${btnBase} border border-[#3C3C3B]/25 bg-white px-4 py-2.5 text-base text-[#3C3C3B] hover:bg-[#3C3C3B]/10 hover:text-black`;
export const btnDanger = `${btnBase} border border-black bg-white px-4 py-2.5 text-base text-black hover:bg-black hover:text-white`;



/* ---------- Image upload (no file paths shown to the user) ---------- */

/* Reads an image and shrinks it so many photos don't blow up storage. */
export function readImageFile(file, maxSide = 1600) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("تعذر قراءة الملف."));
    reader.onload = () => {
      const raw = String(reader.result || "");
      if (file.type === "image/svg+xml" || file.type === "image/gif") {
        resolve(raw);
        return;
      }
      const img = new window.Image();
      img.onerror = () => resolve(raw);
      img.onload = () => {
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(raw);
          return;
        }
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = raw;
    };
    reader.readAsDataURL(file);
  });
}

export function ImageDrop({ value, onChange, onError, label, hint, aspect = "aspect-[4/3]" }) {
  const inputId = useId();
  const [over, setOver] = useState(false);
  const [busy, setBusy] = useState(false);

  const take = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      onError?.("الملف لازم يكون صورة.");
      return;
    }
    setBusy(true);
    try {
      onChange(await readImageFile(file));
    } catch (err) {
      onError?.(err.message || "تعذر قراءة الملف.");
    }
    setBusy(false);
  };

  return (
    <div>
      {label && <p className="mb-2 text-base font-semibold text-[#3C3C3B]">{label}</p>}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          take(e.dataTransfer.files?.[0]);
        }}
        className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 focus-within:border-[#2A317A] motion-reduce:transition-none ${aspect} ${
          value
            ? "border-transparent bg-[#3C3C3B]"
            : over
              ? "border-solid border-[#2A317A] bg-[#2A317A]/10"
              : "border-dashed border-[#3C3C3B]/40 bg-[#3C3C3B]/[0.04] hover:border-[#2A317A]"
        }`}
      >
        {value ? (
          <>
            <img src={value} alt="" className="adm-pop h-full w-full object-cover" />
            {/* always visible: works on touch screens too */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-end gap-2 bg-gradient-to-t from-black/60 to-transparent p-3 pt-12">
              <label
                htmlFor={inputId}
                className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-white px-3 text-sm font-bold text-black shadow-sm transition-colors hover:bg-[#2A317A] hover:text-white"
              >
                <Upload className="h-4 w-4" />
                استبدال
              </label>
              <button
                type="button"
                aria-label="حذف الصورة"
                onClick={() => onChange("")}
                className="grid h-10 w-10 place-items-center rounded-lg bg-black text-white shadow-sm transition-colors hover:bg-[#2A317A]"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </>
        ) : (
          <label htmlFor={inputId} className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 p-4 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#2A317A]/10 text-[#2A317A] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 motion-reduce:transition-none">
              <ImagePlus className="h-6 w-6" />
            </span>
            <span className="text-base font-semibold text-black">{busy ? "جارٍ تجهيز الصورة..." : "اسحبي الصورة هنا أو اضغطي للرفع"}</span>
            {hint && <span className="text-sm text-[#3C3C3B]">{hint}</span>}
          </label>
        )}
        {busy && value && (
          <div className="adm-pop absolute inset-0 grid place-items-center bg-black/55 text-lg font-bold text-white">جارٍ التجهيز...</div>
        )}
        <input
          id={inputId}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => {
            take(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}




export function UnsavedBar({
  show,
  onDiscard,
  title = "تعديلات غير محفوظة",
  text = "لسه ما حفظتيش التغييرات دي على الموقع.",
  saveLabel = "حفظ التعديلات",
  discardLabel = "تجاهل",
}) {
  if (!show) return null;
  return (
    <div
      role="alert"
      className="adm-pop sticky top-3 z-30 overflow-hidden rounded-2xl bg-black text-white shadow-[0_12px_40px_-8px_rgba(42,49,122,0.6)] ring-1 ring-white/10"
    >
      <div className="h-1 w-full animate-pulse bg-gradient-to-r from-[#2A317A] via-white/80 to-[#2A317A] motion-reduce:animate-none" />
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#2A317A]">
            <span className="absolute inset-0 animate-ping rounded-xl bg-[#2A317A]/60 motion-reduce:animate-none" />
            <PencilLine className="relative h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="text-base font-bold leading-tight sm:text-lg">{title}</p>
            <p className="mt-0.5 text-sm text-white/65 sm:text-base">{text}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0">
          {onDiscard && (
            <button
              type="button"
              onClick={onDiscard}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-4 py-2.5 text-base font-semibold text-white transition-colors duration-300 hover:bg-white/10 motion-reduce:transition-none"
            >
              <Undo2 className="h-4 w-4" />
              {discardLabel}
            </button>
          )}
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-base font-bold text-black transition-colors duration-300 hover:bg-[#2A317A] hover:text-white motion-reduce:transition-none"
          >
            <Save className="h-4 w-4" />
            {saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
}


