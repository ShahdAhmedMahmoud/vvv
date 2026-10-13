
// import { useEffect, useId, useMemo, useState } from "react";
// import {
//   AlertCircle,
//   ArrowDown,
//   ArrowUp,
//   CheckCircle2,
//   Eye,
//   EyeOff,
//   Film,
//   Image as ImageIcon,
//   ImagePlus,
//   Layers,
//   Play,
//   Plus,
//   Rotate3d,
//   Save,
//   Trash2,
//   Upload,
// } from "lucide-react";
// import { useMarketing } from "../../../features/marketing/MarketingProvider";
// import { useAdminLocale } from "./MarketingLayout";
// import Pagination, { paginateItems } from "./Pagination";
// import {
//   AdminPage,
//   Count,
//   PageHead,
//   Toggle,
//   UnsavedBar,
//   btnDanger,
//   btnPrimary,
//   btnQuiet,
//   cardCls,
//   fieldCls,
//   labelCls,
//   readImageFile,
//   stagger,
// } from "../../../ui/adminUi";

// const PER_PAGE = 10;
// const MAX_VIDEO_MB = 25; // videos are stored inline, so keep them small
// const IMAGE_MAX_SIDE = 2400;
// const PANORAMA_MAX_SIDE = 4096;

// const types = [
//   { value: "panorama", label: "بانوراما 360", icon: Rotate3d },
//   { value: "video", label: "فيديو", icon: Film },
//   { value: "image", label: "صورة", icon: ImageIcon },
// ];

// const iconBtn =
//   "grid h-11 w-11 place-items-center rounded-lg border border-[#3C3C3B]/25 bg-white text-[#3C3C3B] transition-all duration-300 hover:bg-[#2A317A] hover:text-white hover:border-[#2A317A] active:scale-95 disabled:pointer-events-none disabled:opacity-35 motion-reduce:transition-none";

// function readFileAsDataUrl(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => resolve(String(reader.result || ""));
//     reader.onerror = () => reject(new Error("تعذر قراءة الملف."));
//     reader.readAsDataURL(file);
//   });
// }

// function normalizeSlideState(slide) {
//   const titleAr =
//     typeof slide?.titleAr === "string"
//       ? slide.titleAr
//       : typeof slide?.title === "object"
//         ? slide.title?.ar || ""
//         : slide?.title || "";
//   const titleEn =
//     typeof slide?.titleEn === "string"
//       ? slide.titleEn
//       : typeof slide?.title === "object"
//         ? slide.title?.en || ""
//         : "";
//   return {
//     ...slide,
//     titleAr,
//     titleEn,
//     title: slide?.title && typeof slide.title === "string" ? slide.title : titleAr || titleEn,
//   };
// }

// /* ------------------------------------------------------------------ */

// function MediaFrame({ slide, number, onFile, onClear }) {
//   const inputId = useId();
//   const [over, setOver] = useState(false);
//   const meta = types.find((type) => type.value === slide.type) || types[2];
//   const TypeIcon = meta.icon;
//   const hidden = slide.active === false;
//   const hasMedia = Boolean(slide.src);

//   const playVideo = (event) => {
//     const video = event.currentTarget.querySelector("video");
//     if (video) video.play().catch(() => {});
//   };
//   const stopVideo = (event) => {
//     const video = event.currentTarget.querySelector("video");
//     if (video) {
//       video.pause();
//       video.currentTime = 0;
//     }
//   };

//   return (
//     <div
//       className={`group/frame relative aspect-video overflow-hidden rounded-lg bg-[#3C3C3B] ring-2 ring-offset-2 transition-all duration-300 motion-reduce:transition-none xl:aspect-auto xl:h-full xl:min-h-56 ${
//         over ? "ring-[#2A317A]" : "ring-transparent"
//       }`}
//       onMouseEnter={playVideo}
//       onMouseLeave={stopVideo}
//       onDragOver={(event) => {
//         event.preventDefault();
//         setOver(true);
//       }}
//       onDragLeave={() => setOver(false)}
//       onDrop={(event) => {
//         event.preventDefault();
//         setOver(false);
//         onFile(event.dataTransfer.files?.[0]);
//       }}
//     >
//       {hasMedia && slide.type === "video" ? (
//         <video
//           src={slide.src}
//           muted
//           loop
//           playsInline
//           className="h-full w-full object-cover transition-transform duration-700 group-hover/frame:scale-105 motion-reduce:transition-none"
//         />
//       ) : hasMedia ? (
//         <img
//           src={slide.src}
//           alt=""
//           className="h-full w-full object-cover transition-transform duration-700 group-hover/frame:scale-105 motion-reduce:transition-none"
//         />
//       ) : (
//         <label htmlFor={inputId} className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 p-4 text-center">
//           <span className="grid h-14 w-14 place-items-center rounded-xl bg-white/10 text-white transition-transform duration-300 group-hover/frame:-translate-y-1 group-hover/frame:scale-110 motion-reduce:transition-none">
//             <ImagePlus className="h-7 w-7" />
//           </span>
//           <span className="text-base font-semibold text-white">اسحبي صورة أو فيديو هنا أو اضغطي للرفع</span>
//           <span className="text-sm text-white/60">{meta.label}</span>
//         </label>
//       )}

//       {hasMedia && <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />}

//       {/* big slide number */}
//       <span className="pointer-events-none absolute bottom-2 start-4 text-5xl font-bold leading-none text-white/95" dir="ltr">
//         {String(number).padStart(2, "0")}
//       </span>

//       {/* type chip */}
//       <span className="pointer-events-none absolute end-3 top-3 inline-flex items-center gap-2 rounded-md bg-white px-3 py-1 text-sm font-bold text-black shadow-sm">
//         <TypeIcon className="h-4 w-4 text-[#2A317A]" />
//         {meta.label}
//       </span>

//       {/* video hint */}
//       {hasMedia && slide.type === "video" && (
//         <span className="pointer-events-none absolute start-1/2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-black transition-opacity duration-300 rtl:translate-x-1/2 ltr:-translate-x-1/2 group-hover/frame:opacity-0">
//           <Play className="h-5 w-5" />
//         </span>
//       )}

//       {/* hidden veil (doesn't block the buttons) */}
//       {hidden && (
//         <div className="adm-pop pointer-events-none absolute inset-0 grid place-items-center bg-black/65">
//           <span className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-base font-bold text-black">
//             <EyeOff className="h-5 w-5" />
//             مخفية
//           </span>
//         </div>
//       )}

//       {/* actions: always visible so touch screens work */}
//       {hasMedia && (
//         <div className="absolute bottom-3 end-3 z-10 flex gap-2">
//           <label
//             htmlFor={inputId}
//             className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-white px-3 text-sm font-bold text-black shadow-sm transition-colors hover:bg-[#2A317A] hover:text-white"
//           >
//             <Upload className="h-4 w-4" />
//             استبدال
//           </label>
//           <button
//             type="button"
//             aria-label="حذف الملف"
//             onClick={onClear}
//             className="grid h-10 w-10 place-items-center rounded-lg bg-black text-white shadow-sm transition-colors hover:bg-[#2A317A]"
//           >
//             <Trash2 className="h-4 w-4" />
//           </button>
//         </div>
//       )}

//       {over && (
//         <div className="adm-pop absolute inset-0 z-20 grid place-items-center bg-[#2A317A]/85 text-lg font-bold text-white">أفلتي الملف هنا</div>
//       )}

//       <input
//         id={inputId}
//         type="file"
//         accept="image/*,video/*"
//         className="sr-only"
//         onChange={(event) => {
//           onFile(event.target.files?.[0]);
//           event.target.value = "";
//         }}
//       />
//     </div>
//   );
// }

// function TypePicker({ value, onChange }) {
//   return (
//     <div className="grid grid-cols-3 gap-1 rounded-lg border border-[#3C3C3B]/15 bg-white p-1" role="group" aria-label="النوع">
//       {types.map((type) => {
//         const Icon = type.icon;
//         const on = value === type.value;
//         return (
//           <button
//             key={type.value}
//             type="button"
//             aria-pressed={on}
//             onClick={() => onChange(type.value)}
//             className={`flex flex-col items-center justify-center gap-1 rounded-md px-2 py-2.5 text-sm font-semibold transition-all duration-300 motion-reduce:transition-none sm:flex-row sm:gap-2 sm:text-base ${
//               on ? "bg-[#2A317A] text-white shadow-sm" : "text-[#3C3C3B] hover:bg-[#2A317A]/10 hover:text-black"
//             }`}
//           >
//             <Icon className="h-4 w-4 shrink-0" />
//             <span className="max-w-full truncate">{type.label}</span>
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// function StatTile({ icon: Icon, label, value, index }) {
//   return (
//     <div
//       className={`${cardCls} adm-rise flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5`}
//       style={stagger(index, 80)}
//     >
//       <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#2A317A]/10 text-[#2A317A] sm:h-12 sm:w-12">
//         <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.8} />
//       </span>
//       <div className="min-w-0">
//         <p className="text-sm font-medium leading-tight text-[#3C3C3B] sm:text-base">{label}</p>
//         <p className="mt-1 text-3xl font-bold leading-none text-black sm:text-4xl">
//           <Count value={value} />
//         </p>
//       </div>
//     </div>
//   );
// }

// /* ------------------------------------------------------------------ */

// export default function HeroPage() {
//   const { t } = useAdminLocale();
//   const { hero, saveHero } = useMarketing();
//   const [slides, setSlides] = useState(() => hero.map(normalizeSlideState));
//   const [saved, setSaved] = useState(false);
//   const [dirty, setDirty] = useState(false);
//   const [error, setError] = useState("");
//   const [page, setPage] = useState(1);
//   const [newId, setNewId] = useState(null);
//   const paged = useMemo(() => paginateItems(slides, page, PER_PAGE), [slides, page]);

//   const activeCount = slides.filter((slide) => slide.active !== false).length;
//   const globalIndex = (index) => (paged.page - 1) * PER_PAGE + index;

//   useEffect(() => {
//     setSlides(hero.map(normalizeSlideState));
//     setSaved(false);
//     setDirty(false);
//   }, [hero]);

//   useEffect(() => {
//     if (!saved) return undefined;
//     const timer = setTimeout(() => setSaved(false), 3000);
//     return () => clearTimeout(timer);
//   }, [saved]);

//   // scroll to the freshly added slide and highlight it for a moment
//   useEffect(() => {
//     if (!newId) return undefined;
//     document.getElementById(`slide-card-${newId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
//     const timer = setTimeout(() => setNewId(null), 2500);
//     return () => clearTimeout(timer);
//   }, [newId]);

//   const touch = () => {
//     setSaved(false);
//     setDirty(true);
//   };

//   const update = (index, patch) => {
//     touch();
//     setSlides((current) => current.map((slide, i) => (i === index ? { ...slide, ...patch } : slide)));
//   };

//   const move = (index, direction) => {
//     const target = index + direction;
//     if (target < 0 || target >= slides.length) return;
//     const next = [...slides];
//     const [item] = next.splice(index, 1);
//     next.splice(target, 0, item);
//     setSlides(next);
//     touch();
//   };

//   const addSlide = () => {
//     const id = `slide-${Date.now()}`;
//     setSlides((current) => [
//       { id, type: "image", title: "", titleAr: "", titleEn: "", src: "", active: true },
//       ...current, // new slide goes first, so it is always in front of you
//     ]);
//     setPage(1);
//     setNewId(id);
//     touch();
//   };

//   const removeSlide = (slide) => {
//     if (!window.confirm("حذف الشريحة دي؟")) return;
//     setSlides((current) => current.filter((item) => item.id !== slide.id));
//     touch();
//   };

//   const discard = () => {
//     setSlides(hero.map(normalizeSlideState));
//     setDirty(false);
//     setSaved(false);
//     setError("");
//     setPage(1);
//   };

//   const onError = (message) => {
//     setError(message);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleMedia = async (file, index) => {
//     if (!file) return;
//     const isVideo = file.type.startsWith("video/");
//     if (!isVideo && !file.type.startsWith("image/")) {
//       onError("الملف لازم يكون صورة أو فيديو.");
//       return;
//     }
//     if (isVideo && file.size > MAX_VIDEO_MB * 1024 * 1024) {
//       onError(`الفيديو أكبر من ${MAX_VIDEO_MB}MB. جرّبي فيديو أقصر أو أخف.`);
//       return;
//     }
//     const current = slides[index];
//     try {
//       const isPanorama = current?.type === "panorama";
//       const src = isVideo
//         ? await readFileAsDataUrl(file)
//         : await readImageFile(file, isPanorama ? PANORAMA_MAX_SIDE : IMAGE_MAX_SIDE);
//       update(index, { src, type: isVideo ? "video" : isPanorama ? "panorama" : "image" });
//       setError("");
//     } catch (err) {
//       onError(err.message || "تعذر قراءة الملف.");
//     }
//   };

//   const onSubmit = (event) => {
//     event.preventDefault();
//     const nextSlides = slides
//       .map((slide) => ({
//         ...slide,
//         titleAr: String(slide.titleAr || "").trim(),
//         titleEn: String(slide.titleEn || "").trim(),
//         title: String(slide.titleAr || slide.titleEn || slide.title || "").trim(),
//       }))
//       .filter((slide) => (slide.titleAr || slide.titleEn || slide.title).trim() && String(slide.src || "").trim());
//     saveHero(nextSlides);
//     setDirty(false);
//     setSaved(true);
//   };

//   return (
//     <AdminPage as="form" onSubmit={onSubmit}>
//       <PageHead kicker="OPENING" title="الصفحة الرئيسية" text="ترتيب الشرائح هنا هو ترتيب أول الشاشة على الموقع.">
//         <button type="button" className={`${btnQuiet} group !px-5 !py-3 !text-lg`} onClick={addSlide}>
//           <Plus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90 motion-reduce:transition-none" />
//           {t("add")}
//         </button>
//         <button type="submit" className={btnPrimary}>
//           <Save className="h-5 w-5" />
//           {t("save")}
//         </button>
//       </PageHead>

//       <UnsavedBar show={dirty} onDiscard={discard} />

//       <div className="grid grid-cols-3 gap-3 sm:gap-4">
//         <StatTile icon={Layers} label="كل الشرائح" value={slides.length} index={0} />
//         <StatTile icon={Eye} label="ظاهرة" value={activeCount} index={1} />
//         <StatTile icon={EyeOff} label="مخفية" value={slides.length - activeCount} index={2} />
//       </div>

//       {saved && (
//         <p
//           className="adm-pop flex items-center gap-3 rounded-xl border border-[#2A317A]/40 bg-[#2A317A]/10 px-5 py-4 text-lg font-semibold text-[#2A317A]"
//           role="status"
//         >
//           <CheckCircle2 className="h-6 w-6 shrink-0" />
//           {t("saved")}
//         </p>
//       )}

//       {error && (
//         <p
//           className="adm-pop flex items-center gap-3 rounded-xl border border-black/30 bg-black/5 px-5 py-4 text-lg font-semibold text-black"
//           role="alert"
//         >
//           <AlertCircle className="h-6 w-6 shrink-0" />
//           {error}
//         </p>
//       )}

//       {slides.length === 0 ? (
//         <div className={`${cardCls} adm-pop grid place-items-center px-6 py-16 text-center sm:py-20`}>
//           <span className="grid h-16 w-16 place-items-center rounded-xl bg-[#2A317A]/10 text-[#2A317A]">
//             <Layers className="h-8 w-8" strokeWidth={1.6} />
//           </span>
//           <p className="mt-5 text-xl font-bold text-black">لا توجد شرائح</p>
//           <p className="mt-2 text-lg text-[#3C3C3B]">أضف شريحة جديدة للبدء.</p>
//           <button type="button" className={`${btnPrimary} mt-6`} onClick={addSlide}>
//             <Plus className="h-5 w-5" />
//             {t("add")}
//           </button>
//         </div>
//       ) : (
//         <>
//           <div key={paged.page} className="space-y-5">
//             {paged.items.map((slide, i) => {
//               const gi = globalIndex(i);
//               const shown = slide.active !== false;
//               return (
//                 <article
//                   key={slide.id}
//                   id={`slide-card-${slide.id}`}
//                   className={`${cardCls} adm-pop grid gap-5 p-4 transition-shadow duration-500 sm:p-5 xl:grid-cols-[300px_1fr] ${
//                     shown ? "" : "bg-[#3C3C3B]/[0.04]"
//                   } ${newId === slide.id ? "ring-2 ring-[#2A317A] ring-offset-2" : ""}`}
//                   style={stagger(i)}
//                 >
//                   <MediaFrame
//                     slide={slide}
//                     number={gi + 1}
//                     onFile={(file) => handleMedia(file, gi)}
//                     onClear={() => update(gi, { src: "" })}
//                   />

//                   <div className="grid min-w-0 content-start gap-4">
//                     <div className="grid gap-4 sm:grid-cols-2">
//                       <label className={labelCls}>
//                         {`${t("labelTitle")} — ${t("fieldAr")}`}
//                         <input
//                           className={fieldCls}
//                           value={slide.titleAr || ""}
//                           onChange={(event) =>
//                             update(gi, { titleAr: event.target.value, title: event.target.value || slide.titleEn || "" })
//                           }
//                         />
//                       </label>
//                       <label className={labelCls}>
//                         {`${t("labelTitle")} — ${t("fieldEn")}`}
//                         <input
//                           className={fieldCls}
//                           dir="ltr"
//                           value={slide.titleEn || ""}
//                           onChange={(event) =>
//                             update(gi, { titleEn: event.target.value, title: slide.titleAr || event.target.value || "" })
//                           }
//                         />
//                       </label>
//                     </div>

//                     <TypePicker value={slide.type} onChange={(value) => update(gi, { type: value })} />

//                     <div className="flex flex-wrap items-center gap-3 border-t border-[#3C3C3B]/15 pt-4">
//                       <div className="w-full sm:w-72">
//                         <Toggle checked={shown} onChange={(checked) => update(gi, { active: checked })}>
//                           <span className="flex items-center gap-3">
//                             {shown ? <Eye className="h-6 w-6 text-[#2A317A]" /> : <EyeOff className="h-6 w-6 text-[#3C3C3B]" />}
//                             {shown ? "ظاهرة" : "مخفية"}
//                           </span>
//                         </Toggle>
//                       </div>

//                       <div className="flex w-full items-center gap-2 sm:ms-auto sm:w-auto">
//                         <button
//                           type="button"
//                           className={iconBtn}
//                           disabled={gi === 0}
//                           onClick={() => move(gi, -1)}
//                           aria-label={t("moveUp")}
//                           title={t("moveUp")}
//                         >
//                           <ArrowUp className="h-5 w-5" />
//                         </button>
//                         <button
//                           type="button"
//                           className={iconBtn}
//                           disabled={gi === slides.length - 1}
//                           onClick={() => move(gi, 1)}
//                           aria-label={t("moveDown")}
//                           title={t("moveDown")}
//                         >
//                           <ArrowDown className="h-5 w-5" />
//                         </button>
//                         <button type="button" className={`${btnDanger} ms-auto sm:ms-0`} onClick={() => removeSlide(slide)}>
//                           <Trash2 className="h-4 w-4" />
//                           {t("remove")}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </article>
//               );
//             })}
//           </div>

//           <Pagination page={paged.page} pageSize={PER_PAGE} total={slides.length} onChange={setPage} />
//         </>
//       )}
//     </AdminPage>
//   );
// }


import { useEffect, useId, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Eye,
  EyeOff,
  Film,
  Image as ImageIcon,
  ImagePlus,
  Layers,
  Play,
  Plus,
  Rotate3d,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import { useMarketing } from "../../../features/marketing/MarketingProvider";
import { useAdminLocale } from "./MarketingLayout";
import Pagination, { paginateItems } from "./Pagination";
import {
  AdminPage,
  Count,
  PageHead,
  Toggle,
  UnsavedBar,
  btnDanger,
  btnPrimary,
  btnQuiet,
  cardCls,
  fieldCls,
  labelCls,
  readImageFile,
  stagger,
} from "../../../ui/adminUi";

const PER_PAGE = 10;
const MAX_VIDEO_MB = 25; // videos are stored inline, so keep them small
const IMAGE_MAX_SIDE = 2400;
const PANORAMA_MAX_SIDE = 4096;

const types = [
  { value: "panorama", label: "بانوراما 360", icon: Rotate3d },
  { value: "video", label: "فيديو", icon: Film },
  { value: "image", label: "صورة", icon: ImageIcon },
];

const iconBtn =
  "grid h-11 w-11 place-items-center rounded-lg border border-[#3C3C3B]/25 bg-white text-[#3C3C3B] transition-all duration-300 hover:bg-[#2A317A] hover:text-white hover:border-[#2A317A] active:scale-95 disabled:pointer-events-none disabled:opacity-35 motion-reduce:transition-none";

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("تعذر قراءة الملف."));
    reader.readAsDataURL(file);
  });
}

function normalizeSlideState(slide) {
  const titleAr =
    typeof slide?.titleAr === "string"
      ? slide.titleAr
      : typeof slide?.title === "object"
        ? slide.title?.ar || ""
        : slide?.title || "";
  const titleEn =
    typeof slide?.titleEn === "string"
      ? slide.titleEn
      : typeof slide?.title === "object"
        ? slide.title?.en || ""
        : "";
  return {
    ...slide,
    titleAr,
    titleEn,
    title: slide?.title && typeof slide.title === "string" ? slide.title : titleAr || titleEn,
  };
}

/* ------------------------------------------------------------------ */

function MediaFrame({ slide, number, onFile, onClear }) {
  const inputId = useId();
  const [over, setOver] = useState(false);
  const meta = types.find((type) => type.value === slide.type) || types[2];
  const TypeIcon = meta.icon;
  const hidden = slide.active === false;
  const hasMedia = Boolean(slide.src);

  const playVideo = (event) => {
    const video = event.currentTarget.querySelector("video");
    if (video) video.play().catch(() => {});
  };
  const stopVideo = (event) => {
    const video = event.currentTarget.querySelector("video");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <div
      className={`group/frame relative aspect-video overflow-hidden rounded-lg bg-[#3C3C3B] ring-2 ring-offset-2 transition-all duration-300 motion-reduce:transition-none xl:aspect-auto xl:h-full xl:min-h-56 ${
        over ? "ring-[#2A317A]" : "ring-transparent"
      }`}
      onMouseEnter={playVideo}
      onMouseLeave={stopVideo}
      onDragOver={(event) => {
        event.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(event) => {
        event.preventDefault();
        setOver(false);
        onFile(event.dataTransfer.files?.[0]);
      }}
    >
      {hasMedia && slide.type === "video" ? (
        <video
          src={slide.src}
          muted
          loop
          playsInline
          className="h-full w-full object-cover transition-transform duration-700 group-hover/frame:scale-105 motion-reduce:transition-none"
        />
      ) : hasMedia ? (
        <img
          src={slide.src}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 group-hover/frame:scale-105 motion-reduce:transition-none"
        />
      ) : (
        <label htmlFor={inputId} className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 p-4 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-xl bg-white/10 text-white transition-transform duration-300 group-hover/frame:-translate-y-1 group-hover/frame:scale-110 motion-reduce:transition-none">
            <ImagePlus className="h-7 w-7" />
          </span>
          <span className="text-base font-semibold text-white">اسحبي صورة أو فيديو هنا أو اضغطي للرفع</span>
          <span className="text-sm text-white/60">{meta.label}</span>
        </label>
      )}

      {hasMedia && <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />}

      {/* big slide number */}
      {/* no dir="ltr" on this element: logical start/end must follow the page direction, or the
          number lands under the replace button in Arabic. The digits are wrapped instead. */}
      <span className="pointer-events-none absolute bottom-2 start-4 text-5xl font-bold leading-none text-white/95">
        <bdi dir="ltr">{String(number).padStart(2, "0")}</bdi>
      </span>

      {/* type chip */}
      <span className="pointer-events-none absolute end-3 top-3 inline-flex items-center gap-2 rounded-md bg-white px-3 py-1 text-sm font-bold text-black shadow-sm">
        <TypeIcon className="h-4 w-4 text-[#2A317A]" />
        {meta.label}
      </span>

      {/* video hint */}
      {hasMedia && slide.type === "video" && (
        <span className="pointer-events-none absolute start-1/2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-black transition-opacity duration-300 rtl:translate-x-1/2 ltr:-translate-x-1/2 group-hover/frame:opacity-0">
          <Play className="h-5 w-5" />
        </span>
      )}

      {/* hidden veil (doesn't block the buttons) */}
      {hidden && (
        <div className="adm-pop pointer-events-none absolute inset-0 grid place-items-center bg-black/65">
          <span className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-base font-bold text-black">
            <EyeOff className="h-5 w-5" />
            مخفية
          </span>
        </div>
      )}

      {/* actions: always visible so touch screens work */}
      {hasMedia && (
        <div className="absolute bottom-3 end-3 z-10 flex gap-2">
          <label
            htmlFor={inputId}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-white px-3 text-sm font-bold text-black shadow-sm transition-colors hover:bg-[#2A317A] hover:text-white"
          >
            <Upload className="h-4 w-4" />
            استبدال
          </label>
          <button
            type="button"
            aria-label="حذف الملف"
            onClick={onClear}
            className="grid h-10 w-10 place-items-center rounded-lg bg-black text-white shadow-sm transition-colors hover:bg-[#2A317A]"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}

      {over && (
        <div className="adm-pop absolute inset-0 z-20 grid place-items-center bg-[#2A317A]/85 text-lg font-bold text-white">أفلتي الملف هنا</div>
      )}

      <input
        id={inputId}
        type="file"
        accept="image/*,video/*"
        className="sr-only"
        onChange={(event) => {
          onFile(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
    </div>
  );
}

function TypePicker({ value, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-1 rounded-lg border border-[#3C3C3B]/15 bg-white p-1" role="group" aria-label="النوع">
      {types.map((type) => {
        const Icon = type.icon;
        const on = value === type.value;
        return (
          <button
            key={type.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(type.value)}
            className={`flex flex-col items-center justify-center gap-1 rounded-md px-2 py-2.5 text-sm font-semibold transition-all duration-300 motion-reduce:transition-none sm:flex-row sm:gap-2 sm:text-base ${
              on ? "bg-[#2A317A] text-white shadow-sm" : "text-[#3C3C3B] hover:bg-[#2A317A]/10 hover:text-black"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="max-w-full truncate">{type.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function StatTile({ icon: Icon, label, value, index }) {
  return (
    <div
      className={`${cardCls} adm-rise flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5`}
      style={stagger(index, 80)}
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#2A317A]/10 text-[#2A317A] sm:h-12 sm:w-12">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.8} />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium leading-tight text-[#3C3C3B] sm:text-base">{label}</p>
        <p className="mt-1 text-3xl font-bold leading-none text-black sm:text-4xl">
          <Count value={value} />
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function HeroPage() {
  const { t } = useAdminLocale();
  const { hero, saveHero } = useMarketing();
  const [slides, setSlides] = useState(() => hero.map(normalizeSlideState));
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [newId, setNewId] = useState(null);
  const paged = useMemo(() => paginateItems(slides, page, PER_PAGE), [slides, page]);

  const activeCount = slides.filter((slide) => slide.active !== false).length;
  const globalIndex = (index) => (paged.page - 1) * PER_PAGE + index;

  useEffect(() => {
    setSlides(hero.map(normalizeSlideState));
    setSaved(false);
    setDirty(false);
  }, [hero]);

  useEffect(() => {
    if (!saved) return undefined;
    const timer = setTimeout(() => setSaved(false), 3000);
    return () => clearTimeout(timer);
  }, [saved]);

  // scroll to the freshly added slide and highlight it for a moment
  useEffect(() => {
    if (!newId) return undefined;
    document.getElementById(`slide-card-${newId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    const timer = setTimeout(() => setNewId(null), 2500);
    return () => clearTimeout(timer);
  }, [newId]);

  const touch = () => {
    setSaved(false);
    setDirty(true);
  };

  const update = (index, patch) => {
    touch();
    setSlides((current) => current.map((slide, i) => (i === index ? { ...slide, ...patch } : slide)));
  };

  const move = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= slides.length) return;
    const next = [...slides];
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
    setSlides(next);
    touch();
  };

  const addSlide = () => {
    const id = `slide-${Date.now()}`;
    setSlides((current) => [
      { id, type: "image", title: "", titleAr: "", titleEn: "", src: "", active: true },
      ...current, // new slide goes first, so it is always in front of you
    ]);
    setPage(1);
    setNewId(id);
    touch();
  };

  const removeSlide = (slide) => {
    if (!window.confirm("حذف الشريحة دي؟")) return;
    setSlides((current) => current.filter((item) => item.id !== slide.id));
    touch();
  };

  const discard = () => {
    setSlides(hero.map(normalizeSlideState));
    setDirty(false);
    setSaved(false);
    setError("");
    setPage(1);
  };

  const onError = (message) => {
    setError(message);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMedia = async (file, index) => {
    if (!file) return;
    const isVideo = file.type.startsWith("video/");
    if (!isVideo && !file.type.startsWith("image/")) {
      onError("الملف لازم يكون صورة أو فيديو.");
      return;
    }
    if (isVideo && file.size > MAX_VIDEO_MB * 1024 * 1024) {
      onError(`الفيديو أكبر من ${MAX_VIDEO_MB}MB. جرّبي فيديو أقصر أو أخف.`);
      return;
    }
    const current = slides[index];
    try {
      const isPanorama = current?.type === "panorama";
      const src = isVideo
        ? await readFileAsDataUrl(file)
        : await readImageFile(file, isPanorama ? PANORAMA_MAX_SIDE : IMAGE_MAX_SIDE);
      update(index, { src, type: isVideo ? "video" : isPanorama ? "panorama" : "image" });
      setError("");
    } catch (err) {
      onError(err.message || "تعذر قراءة الملف.");
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const nextSlides = slides
      .map((slide) => ({
        ...slide,
        titleAr: String(slide.titleAr || "").trim(),
        titleEn: String(slide.titleEn || "").trim(),
        title: String(slide.titleAr || slide.titleEn || slide.title || "").trim(),
      }))
      .filter((slide) => (slide.titleAr || slide.titleEn || slide.title).trim() && String(slide.src || "").trim());
    saveHero(nextSlides);
    setDirty(false);
    setSaved(true);
  };

  return (
    <AdminPage as="form" onSubmit={onSubmit}>
      <PageHead kicker="OPENING" title="الصفحة الرئيسية" text="ترتيب الشرائح هنا هو ترتيب أول الشاشة على الموقع.">
        <button type="button" className={`${btnQuiet} group !px-5 !py-3 !text-lg`} onClick={addSlide}>
          <Plus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90 motion-reduce:transition-none" />
          {t("add")}
        </button>
        <button type="submit" className={btnPrimary}>
          <Save className="h-5 w-5" />
          {t("save")}
        </button>
      </PageHead>

      <UnsavedBar show={dirty} onDiscard={discard} />

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <StatTile icon={Layers} label="كل الشرائح" value={slides.length} index={0} />
        <StatTile icon={Eye} label="ظاهرة" value={activeCount} index={1} />
        <StatTile icon={EyeOff} label="مخفية" value={slides.length - activeCount} index={2} />
      </div>

      {saved && (
        <p
          className="adm-pop flex items-center gap-3 rounded-xl border border-[#2A317A]/40 bg-[#2A317A]/10 px-5 py-4 text-lg font-semibold text-[#2A317A]"
          role="status"
        >
          <CheckCircle2 className="h-6 w-6 shrink-0" />
          {t("saved")}
        </p>
      )}

      {error && (
        <p
          className="adm-pop flex items-center gap-3 rounded-xl border border-black/30 bg-black/5 px-5 py-4 text-lg font-semibold text-black"
          role="alert"
        >
          <AlertCircle className="h-6 w-6 shrink-0" />
          {error}
        </p>
      )}

      {slides.length === 0 ? (
        <div className={`${cardCls} adm-pop grid place-items-center px-6 py-16 text-center sm:py-20`}>
          <span className="grid h-16 w-16 place-items-center rounded-xl bg-[#2A317A]/10 text-[#2A317A]">
            <Layers className="h-8 w-8" strokeWidth={1.6} />
          </span>
          <p className="mt-5 text-xl font-bold text-black">لا توجد شرائح</p>
          <p className="mt-2 text-lg text-[#3C3C3B]">أضف شريحة جديدة للبدء.</p>
          <button type="button" className={`${btnPrimary} mt-6`} onClick={addSlide}>
            <Plus className="h-5 w-5" />
            {t("add")}
          </button>
        </div>
      ) : (
        <>
          <div key={paged.page} className="space-y-5">
            {paged.items.map((slide, i) => {
              const gi = globalIndex(i);
              const shown = slide.active !== false;
              return (
                <article
                  key={slide.id}
                  id={`slide-card-${slide.id}`}
                  className={`${cardCls} adm-pop grid gap-5 p-4 transition-shadow duration-500 sm:p-5 xl:grid-cols-[300px_1fr] ${
                    shown ? "" : "bg-[#3C3C3B]/[0.04]"
                  } ${newId === slide.id ? "ring-2 ring-[#2A317A] ring-offset-2" : ""}`}
                  style={stagger(i)}
                >
                  <MediaFrame
                    slide={slide}
                    number={gi + 1}
                    onFile={(file) => handleMedia(file, gi)}
                    onClear={() => update(gi, { src: "" })}
                  />

                  <div className="grid min-w-0 content-start gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className={labelCls}>
                        {`${t("labelTitle")} — ${t("fieldAr")}`}
                        <input
                          className={fieldCls}
                          value={slide.titleAr || ""}
                          onChange={(event) =>
                            update(gi, { titleAr: event.target.value, title: event.target.value || slide.titleEn || "" })
                          }
                        />
                      </label>
                      <label className={labelCls}>
                        {`${t("labelTitle")} — ${t("fieldEn")}`}
                        <input
                          className={fieldCls}
                          dir="ltr"
                          value={slide.titleEn || ""}
                          onChange={(event) =>
                            update(gi, { titleEn: event.target.value, title: slide.titleAr || event.target.value || "" })
                          }
                        />
                      </label>
                    </div>

                    <TypePicker value={slide.type} onChange={(value) => update(gi, { type: value })} />

                    <div className="flex flex-wrap items-center gap-3 border-t border-[#3C3C3B]/15 pt-4">
                      <div className="w-full sm:w-72">
                        <Toggle checked={shown} onChange={(checked) => update(gi, { active: checked })}>
                          <span className="flex items-center gap-3">
                            {shown ? <Eye className="h-6 w-6 text-[#2A317A]" /> : <EyeOff className="h-6 w-6 text-[#3C3C3B]" />}
                            {shown ? "ظاهرة" : "مخفية"}
                          </span>
                        </Toggle>
                      </div>

                      <div className="flex w-full items-center gap-2 sm:ms-auto sm:w-auto">
                        <button
                          type="button"
                          className={iconBtn}
                          disabled={gi === 0}
                          onClick={() => move(gi, -1)}
                          aria-label={t("moveUp")}
                          title={t("moveUp")}
                        >
                          <ArrowUp className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          className={iconBtn}
                          disabled={gi === slides.length - 1}
                          onClick={() => move(gi, 1)}
                          aria-label={t("moveDown")}
                          title={t("moveDown")}
                        >
                          <ArrowDown className="h-5 w-5" />
                        </button>
                        <button type="button" className={`${btnDanger} ms-auto sm:ms-0`} onClick={() => removeSlide(slide)}>
                          <Trash2 className="h-4 w-4" />
                          {t("remove")}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <Pagination page={paged.page} pageSize={PER_PAGE} total={slides.length} onChange={setPage} />
        </>
      )}
    </AdminPage>
  );
}