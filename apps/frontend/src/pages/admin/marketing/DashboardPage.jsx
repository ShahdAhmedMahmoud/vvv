// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { ArrowUpLeft } from "lucide-react";
// import { useMarketing } from "../../../features/marketing/MarketingProvider";
// import { PageHeading, panelClass, quietButton } from "./MarketingLayout";

// function Count({ value }) {
//   const [shown, setShown] = useState(0);

//   useEffect(() => {
//     const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
//     if (reduce) {
//       setShown(value);
//       return undefined;
//     }
//     const start = performance.now();
//     let frame = 0;
//     const tick = (now) => {
//       const progress = Math.min(1, (now - start) / 700);
//       const eased = 1 - (1 - progress) ** 3;
//       setShown(Math.round(value * eased));
//       if (progress < 1) frame = requestAnimationFrame(tick);
//     };
//     frame = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(frame);
//   }, [value]);

//   return shown;
// }

// function greeting(date) {
//   const hour = date.getHours();
//   if (hour < 12) return "\u0635\u0628\u0627\u062D \u0627\u0644\u062E\u064A\u0631";
//   if (hour < 18) return "\u064A\u0648\u0645\u0643 \u0633\u0639\u064A\u062F";
//   return "\u0645\u0633\u0627\u0621 \u0627\u0644\u062E\u064A\u0631";
// }

// function SlidePreview({ slide }) {
//   if (slide.type === "image" || slide.type === "panorama") {
//     return <img src={slide.src} alt="" className="h-full w-full object-cover" />;
//   }
//   return (
//     <div className="grid h-full w-full place-items-center bg-[#f5f5f5] text-xs font-medium text-[#737373]">
//       {"\u0641\u064A\u062F\u064A\u0648"}
//     </div>
//   );
// }

// export default function DashboardPage() {
//   const { news, projects, hero, inquiries, resetContent } = useMarketing();
//   const unread = inquiries.filter((item) => !item.read).length;
//   const slides = hero.filter((item) => item.active !== false && item.src);

//   const cards = [
//     { label: "\u0623\u062E\u0628\u0627\u0631 \u0645\u0646\u0634\u0648\u0631\u0629", value: news.filter((item) => item.published !== false).length, to: "/admin/marketing/news" },
//     { label: "\u0645\u0634\u0627\u0631\u064A\u0639 \u0638\u0627\u0647\u0631\u0629", value: projects.filter((item) => item.published !== false).length, to: "/admin/marketing/projects" },
//     { label: "\u0634\u0631\u0627\u0626\u062D \u0638\u0627\u0647\u0631\u0629", value: slides.length, to: "/admin/marketing/hero" },
//     { label: "\u0631\u0633\u0627\u0626\u0644 \u063A\u064A\u0631 \u0645\u0642\u0631\u0648\u0621\u0629", value: unread, to: "/admin/marketing/inquiries" },
//   ];

//   return (
//     <div>
//       <PageHeading
//         kicker="STUDIO"
//         title={greeting(new Date())}
//         text={"\u0645\u0646 \u0647\u0646\u0627 \u0628\u062A\u062A\u062D\u0643\u0645 \u0641\u064A \u0627\u0644\u0644\u064A \u0627\u0644\u0632\u0627\u0626\u0631 \u0628\u064A\u0634\u0648\u0641\u0647: \u0627\u0644\u0623\u062E\u0628\u0627\u0631\u060C \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639\u060C \u0623\u0648\u0644 \u0627\u0644\u0634\u0627\u0634\u0629\u060C \u0648\u0627\u0644\u0631\u0633\u0627\u0626\u0644. \u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u064A\u0638\u0647\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0648\u0642\u0639 \u0645\u0646 \u0647\u0630\u0627 \u0627\u0644\u0645\u062A\u0635\u0641\u062D."}
//       >
//         <button
//           type="button"
//           className={quietButton}
//           onClick={() => {
//             if (window.confirm("\u0625\u0631\u062C\u0627\u0639 \u0627\u0644\u0623\u062E\u0628\u0627\u0631 \u0648\u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0648\u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629 \u0644\u0644\u0646\u0633\u062E\u0629 \u0627\u0644\u0623\u0635\u0644\u064A\u0629\u061F")) resetContent();
//           }}
//         >
//           {"\u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0623\u0635\u0644\u064A"}
//         </button>
//       </PageHeading>

//       <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
//         {cards.map((card) => (
//           <Link
//             key={card.to}
//             to={card.to}
//             className="group rounded-lg border border-[#e5e5ea] bg-white p-4 transition hover:border-[#d4d4d8] hover:shadow-sm"
//           >
//             <span className="flex items-center justify-between text-[13px] text-[#737373]">
//               {card.label}
//               <ArrowUpLeft className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
//             </span>
//             <p className="mt-3 text-3xl font-semibold tracking-tight text-[#171717]">
//               <Count value={card.value} />
//             </p>
//           </Link>
//         ))}
//       </div>

//       <section className="mt-6">
//         <div className="mb-3 flex items-end justify-between">
//           <h3 className="text-sm font-semibold text-[#171717]">{"\u0634\u0631\u0627\u0626\u062D \u0623\u0648\u0644 \u0627\u0644\u0634\u0627\u0634\u0629"}</h3>
//           <Link to="/admin/marketing/hero" className="text-[13px] font-medium text-[#2A317A] hover:underline">{"\u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u0634\u0631\u0627\u0626\u062D"}</Link>
//         </div>
//         <div className="grid gap-3 md:grid-cols-3">
//           {slides.slice(0, 3).map((slide, index) => (
//             <Link key={slide.id} to="/admin/marketing/hero" className="group relative h-36 overflow-hidden rounded-lg border border-[#e5e5ea] bg-[#f5f5f5]">
//               <SlidePreview slide={slide} />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
//               <div className="absolute bottom-0 right-0 left-0 p-3">
//                 <p className="text-[10px] tracking-[0.16em] text-[#c9a227]">0{index + 1}</p>
//                 <p className="mt-0.5 truncate text-[13px] font-medium text-white">{slide.title}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </section>

//       <section className={`${panelClass} mt-6 p-4`}>
//         <div className="flex items-center justify-between gap-3">
//           <h3 className="text-sm font-semibold text-[#171717]">{"\u0622\u062E\u0631 \u0627\u0644\u0631\u0633\u0627\u0626\u0644"}</h3>
//           <Link to="/admin/marketing/inquiries" className="text-[13px] font-medium text-[#2A317A] hover:underline">{"\u0643\u0644 \u0627\u0644\u0631\u0633\u0627\u0626\u0644"}</Link>
//         </div>
//         {inquiries.length === 0 ? (
//           <p className="py-8 text-center text-sm leading-6 text-[#737373]">
//             {"\u0635\u0646\u062F\u0648\u0642 \u0627\u0644\u0631\u0633\u0627\u0626\u0644 \u0641\u0627\u0636\u064A. \u0623\u064A \u0631\u0633\u0627\u0644\u0629 \u0645\u0646 \u0635\u0641\u062D\u0629 \u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627 \u0647\u062A\u0648\u0635\u0644 \u0647\u0646\u0627."}
//           </p>
//         ) : (
//           <ul className="mt-3 divide-y divide-[#ececf0]">
//             {inquiries.slice(0, 5).map((item) => (
//               <li key={item.id} className="flex items-start justify-between gap-3 py-2.5">
//                 <div className="min-w-0">
//                   <p className="text-sm font-medium text-[#171717]">{item.fullName || "\u0628\u062F\u0648\u0646 \u0627\u0633\u0645"}</p>
//                   <p className="truncate text-[13px] text-[#737373]">{item.subject || item.message}</p>
//                 </div>
//                 {!item.read && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a227]" />}
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpLeft,
  ExternalLink,
  FolderKanban,
  Newspaper,
  ImagePlay,
  Inbox,
  LineChart,
  LayoutTemplate,
  MessageSquareText,
  Plus,
  RotateCcw,
  Activity,
} from "lucide-react";
import { useMarketing } from "../../../features/marketing/MarketingProvider";
import { loadTrafficSummary } from "../../../services/track";
import { countryLabel, flag, pageName, trafficRanges } from "../../../helpers/trafficHelpers";
/* Palette (only these): #3C3C3B  #2A317A  white  black.
   Lighter shades = the same colors with transparency. */

const FONT = "'IBM Plex Sans Arabic', 'Cairo', system-ui, sans-serif";
const TRAFFIC_ROUTE = "/admin/marketing/traffic";

const card =
  "flex h-full flex-col rounded-xl border border-[#3C3C3B]/15 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md motion-reduce:transition-none";
const chip = "grid shrink-0 place-items-center rounded-lg bg-[#2A317A]/10 text-[#2A317A]";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function Count({ value }) {
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
      const progress = Math.min(1, (now - start) / 700);
      const eased = 1 - (1 - progress) ** 3;
      setShown(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return shown;
}

function greeting(date) {
  const hour = date.getHours();
  if (hour < 12) return "صباح الخير";
  if (hour < 18) return "يومك سعيد";
  return "مساء الخير";
}

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("ar-EG", { day: "numeric", month: "short" });
}

function SlidePreview({ slide }) {
  if (slide.type === "image" || slide.type === "panorama") {
    return (
      <img
        src={slide.src}
        alt=""
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
    );
  }
  return (
    <div className="grid h-full w-full place-items-center bg-[#3C3C3B] text-base font-medium text-white/80">
      فيديو
    </div>
  );
}

function CardHeader({ title, to, linkText }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <h3 className="text-xl font-bold text-black sm:text-2xl">{title}</h3>
      {to && (
        <Link to={to} className="shrink-0 text-base font-semibold text-[#2A317A] hover:underline">
          {linkText}
        </Link>
      )}
    </div>
  );
}

function ProgressBar({ value, max }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="h-2.5 w-full rounded-full bg-[#3C3C3B]/15" aria-hidden="true">
      <div
        className="h-full rounded-full bg-[#2A317A] transition-all duration-700 motion-reduce:transition-none"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

const STATUS = {
  live: { label: "ظاهر", dot: "bg-[#2A317A]", text: "text-[#2A317A]" },
  draft: { label: "مسودة", dot: "border-2 border-[#3C3C3B] bg-white", text: "text-[#3C3C3B]" },
  empty: { label: "فاضي", dot: "border-2 border-black bg-white", text: "text-black" },
  managed: { label: "مُدار", dot: "bg-[#3C3C3B]", text: "text-[#3C3C3B]" },
};

function StatusPill({ kind, children }) {
  const s = STATUS[kind];
  return (
    <span className={`inline-flex items-center gap-2 text-base font-semibold ${s.text}`}>
      <span className={`h-2.5 w-2.5 rounded-full ${s.dot}`} />
      {children || s.label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

function Header({ onReset }) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-5">
      <div className="min-w-0 max-w-3xl">
        <p className="text-sm font-semibold tracking-[0.2em] text-[#2A317A]">Al Shorouk/ MARKETING STUDIO</p>
        <h1 className="mt-3 text-3xl font-bold leading-[1.3] text-black sm:text-4xl lg:text-5xl">
          {greeting(new Date())}، تحكمي في كل ما يراه زوار الشروق
        </h1>
        <p className="mt-3 text-lg leading-8 text-[#3C3C3B] sm:text-xl sm:leading-9">
          من هنا تقدروا تديروا المحتوى، المشاريع، الأخبار، الواجهة الرئيسية، والرسائل الواردة.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-lg bg-[#2A317A] px-5 py-3 text-lg font-bold text-white shadow-sm transition hover:bg-black motion-reduce:transition-none"
        >
          View Website
          <ExternalLink className="h-5 w-5" />
        </a>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2.5 rounded-lg border border-[#3C3C3B]/25 bg-white px-4 py-3 text-base font-medium text-[#3C3C3B] transition hover:border-[#3C3C3B] hover:text-black motion-reduce:transition-none"
        >
          <RotateCcw className="h-4 w-4" />
          استعادة المحتوى الأصلي
        </button>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* MetricCard                                                          */
/* ------------------------------------------------------------------ */

function MetricCard({ label, value, note, to, icon: Icon }) {
  const numeric = typeof value === "number";
  const body = (
    <>
      <div className="mb-5 flex items-center justify-between">
        <span className={`${chip} h-12 w-12`}>
          <Icon className="h-6 w-6" strokeWidth={1.8} />
        </span>
        {to && (
          <ArrowUpLeft className="h-5 w-5 -translate-x-1 text-[#2A317A] opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none" />
        )}
      </div>
      <h3 className="text-lg font-medium text-[#3C3C3B]">{label}</h3>
      <p className="mt-1 text-5xl font-bold leading-tight text-black">{numeric ? <Count value={value} /> : value}</p>
      <p className="mt-2 text-base font-medium text-[#2A317A]">{note}</p>
    </>
  );

  const cls = `${card} group`;
  return to ? (
    <Link to={to} className={cls}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

/* ------------------------------------------------------------------ */
/* TrafficOverview – REAL data from loadTrafficSummary                 */
/* ------------------------------------------------------------------ */

function TrafficOverview({ range, onRange, summary, error, loading, name }) {
  const pages = (summary?.pages || []).slice(0, 5);
  const countries = (summary?.countries || []).slice(0, 5);
  const maxVisitors = Math.max(...pages.map((p) => p.visitors), 1);
  const hasData = summary && summary.totals.views > 0;

  return (
    <section className={`${card} ${loading ? "opacity-70" : ""}`}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-black sm:text-2xl">نظرة على الزيارات</h3>
        <div className="inline-flex flex-wrap gap-1 rounded-lg bg-[#3C3C3B]/[0.07] p-1" role="group" aria-label="الفترة الزمنية">
          {trafficRanges.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => onRange(r.id)}
              aria-pressed={range === r.id}
              className={`rounded-md px-3.5 py-2 text-base font-semibold transition motion-reduce:transition-none ${
                range === r.id ? "bg-[#2A317A] text-white shadow-sm" : "text-[#3C3C3B] hover:text-black"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <div className="grid flex-1 min-h-[16rem] place-items-center rounded-lg border border-dashed border-[#3C3C3B]/40 px-6 text-center">
          <div>
            <LineChart className="mx-auto h-10 w-10 text-[#2A317A]" strokeWidth={1.5} />
            <p className="mt-4 text-xl font-bold text-black">تعذر قراءة الزيارات</p>
            <p className="mt-2 text-lg text-[#3C3C3B]">تأكد إن السيرفر شغال وجرب تاني.</p>
          </div>
        </div>
      ) : !summary ? (
        <div className="grid flex-1 min-h-[16rem] place-items-center text-lg text-[#3C3C3B]">جاري تحميل الزيارات...</div>
      ) : !hasData ? (
        <div className="grid flex-1 min-h-[16rem] place-items-center rounded-lg border border-dashed border-[#3C3C3B]/40 px-6 text-center">
          <div>
            <LineChart className="mx-auto h-10 w-10 text-[#2A317A]" strokeWidth={1.5} />
            <p className="mt-4 text-xl font-bold text-black">مفيش زيارات في الفترة دي</p>
            <p className="mt-2 text-lg text-[#3C3C3B]">جرب فترة أطول أو استنى أول زيارة للموقع.</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-[#2A317A]/[0.07] p-5">
              <p className="text-lg text-[#3C3C3B]">الزوار</p>
              <p className="mt-1 text-5xl font-bold leading-none text-[#2A317A]">{summary.totals.visitors}</p>
            </div>
            <div className="rounded-lg bg-[#3C3C3B]/[0.07] p-5">
              <p className="text-lg text-[#3C3C3B]">الزيارات</p>
              <p className="mt-1 text-5xl font-bold leading-none text-black">{summary.totals.views}</p>
            </div>
          </div>

          <div className="flex-1">
            <p className="mb-4 text-lg font-bold text-black">أعلى الصفحات</p>
            <ul className="space-y-4">
              {pages.map((page) => (
                <li key={page.path}>
                  <div className="mb-2 flex items-baseline justify-between gap-3 text-base sm:text-lg">
                    <span className="min-w-0 truncate font-semibold text-black">{name(page.path)}</span>
                    <span className="shrink-0 font-medium text-[#3C3C3B]">{page.visitors} زائر</span>
                  </div>
                  <ProgressBar value={page.visitors} max={maxVisitors} />
                </li>
              ))}
            </ul>
          </div>

          {countries.length > 0 && (
            <div className="flex flex-wrap gap-2 border-t border-[#3C3C3B]/15 pt-5">
              {countries.map((c) => (
                <span
                  key={c.code + c.country}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#3C3C3B]/[0.07] px-3 py-1.5 text-base font-medium text-black"
                >
                  <span aria-hidden>{flag(c.code)}</span>
                  {countryLabel(c)}
                  <span className="font-bold text-[#2A317A]">{c.visitors}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <Link to={TRAFFIC_ROUTE} className="mt-5 inline-flex items-center gap-2 self-start text-lg font-semibold text-[#2A317A] hover:underline">
        التفاصيل الكاملة
        <ArrowUpLeft className="h-5 w-5" />
      </Link>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ContentStatus (progress-bar style, real ratios only)                */
/* ------------------------------------------------------------------ */

function ContentStatus({ heroActive, heroTotal, projectsLive, projectsTotal, newsLive, newsTotal }) {
  const rows = [
    {
      icon: ImagePlay,
      label: "الـHero",
      to: "/admin/marketing/hero",
      status: heroActive > 0 ? "live" : "empty",
      value: heroActive,
      total: heroTotal,
      detail: `${heroActive} شريحة نشطة من ${heroTotal}`,
    },
    {
      icon: FolderKanban,
      label: "المشاريع",
      to: "/admin/marketing/projects",
      status: projectsLive > 0 ? "live" : "empty",
      value: projectsLive,
      total: projectsTotal,
      detail: `${projectsLive} منشور${projectsTotal - projectsLive > 0 ? ` · ${projectsTotal - projectsLive} مسودة` : ""}`,
    },
    {
      icon: Newspaper,
      label: "الأخبار",
      to: "/admin/marketing/news",
      status: newsLive > 0 ? "live" : "empty",
      value: newsLive,
      total: newsTotal,
      detail: `${newsLive} منشور${newsTotal - newsLive > 0 ? ` · ${newsTotal - newsLive} مسودة` : ""}`,
    },
    {
      icon: LayoutTemplate,
      label: "أقسام الصفحة الرئيسية",
      status: "managed",
      detail: "بتتدار من Home Sections",
    },
  ];

  return (
    <section className={card}>
      <CardHeader title="حالة المحتوى" />
      <ul className="flex flex-1 flex-col justify-between gap-5">
        {rows.map((row) => {
          const Icon = row.icon;
          const inner = (
            <>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-3 text-lg font-bold text-black">
                  <span className={`${chip} h-10 w-10`}>
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  {row.label}
                </span>
                <StatusPill kind={row.status} />
              </div>
              {row.total !== undefined && (
                <div className="mt-3">
                  <ProgressBar value={row.value} max={row.total} />
                </div>
              )}
              <p className="mt-2 text-base text-[#3C3C3B]">{row.detail}</p>
            </>
          );
          return (
            <li key={row.label}>
              {row.to ? (
                <Link to={row.to} className="block rounded-lg p-2 transition hover:bg-[#2A317A]/5 motion-reduce:transition-none">
                  {inner}
                </Link>
              ) : (
                <div className="p-2">{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* HeroPreview                                                         */
/* ------------------------------------------------------------------ */

function HeroPreview({ slides }) {
  const shown = slides.slice(0, 3);
  const extra = slides.length - shown.length;

  return (
    <section className={card}>
      <CardHeader title="واجهة الموقع الحالية" to="/admin/marketing/hero" linkText="إدارة الـHero" />

      {shown.length === 0 ? (
        <div className="grid flex-1 min-h-[14rem] place-items-center rounded-lg border border-dashed border-[#3C3C3B]/40 px-6 text-center">
          <div>
            <p className="text-xl font-bold text-black">مفيش شرائح ظاهرة</p>
            <Link to="/admin/marketing/hero" className="mt-3 inline-block text-lg font-semibold text-[#2A317A] hover:underline">
              + إضافة Hero
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid flex-1 grid-cols-2 gap-3">
          {shown.map((slide, index) => {
            const big = index === 0;
            return (
              <Link
                key={slide.id}
                to="/admin/marketing/hero"
                className={`group relative block overflow-hidden rounded-lg bg-[#3C3C3B] ${
                  big ? "col-span-2 h-56 sm:h-72" : shown.length === 2 ? "col-span-2 h-40" : "h-36 sm:h-44"
                }`}
              >
                <SlidePreview slide={slide} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <span className="absolute end-3 top-3 inline-flex items-center gap-2 rounded-md bg-[#2A317A] px-3 py-1 text-sm font-bold text-white">
                  <span className="h-2 w-2 rounded-full bg-white" />
                  LIVE
                </span>
                <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-4">
                  <span className="text-3xl font-bold leading-none text-white/90 sm:text-4xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="min-w-0 truncate text-lg font-semibold text-white sm:text-xl">{slide.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {extra > 0 && (
        <Link to="/admin/marketing/hero" className="mt-4 inline-block text-lg font-semibold text-[#2A317A] hover:underline">
          {`+ ${extra} شرائح أخرى`}
        </Link>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* QuickActions                                                        */
/* ------------------------------------------------------------------ */

function QuickActions() {
  const actions = [
    { label: "إضافة مشروع", to: "/admin/marketing/projects", icon: FolderKanban, primary: true },
    { label: "إضافة خبر", to: "/admin/marketing/news", icon: Newspaper },
    { label: "إضافة Hero", to: "/admin/marketing/hero", icon: ImagePlay },
    { label: "عرض الرسائل", to: "/admin/marketing/inquiries", icon: MessageSquareText, noPlus: true },
  ];

  return (
    <section className={card}>
      <CardHeader title="إجراءات سريعة" />
      <div className="grid flex-1 auto-rows-fr grid-cols-2 gap-3">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <Link
              key={a.to}
              to={a.to}
              className={`group flex min-h-[8.5rem] flex-col justify-between rounded-lg p-4 transition duration-300 motion-reduce:transition-none ${
                a.primary
                  ? "bg-[#2A317A] text-white shadow-sm hover:bg-black"
                  : "border border-[#3C3C3B]/20 bg-white text-black hover:border-[#2A317A] hover:bg-[#2A317A]/5"
              }`}
            >
              <span className="flex items-start justify-between">
                <span
                  className={`grid h-11 w-11 place-items-center rounded-lg ${
                    a.primary ? "bg-white/15 text-white" : "bg-[#2A317A]/10 text-[#2A317A]"
                  }`}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.7} />
                </span>
                {!a.noPlus && <Plus className="h-5 w-5 opacity-70" />}
              </span>
              <span className="flex items-center justify-between gap-2 text-lg font-bold">
                {a.label}
                <ArrowUpLeft className="h-5 w-5 -translate-x-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none" />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* RecentInquiries                                                     */
/* ------------------------------------------------------------------ */

function RecentInquiries({ inquiries }) {
  return (
    <section className={card}>
      <CardHeader title="آخر الرسائل" to="/admin/marketing/inquiries" linkText="عرض كل الرسائل" />

      {inquiries.length === 0 ? (
        <div className="grid flex-1 min-h-[14rem] place-items-center rounded-lg border border-dashed border-[#3C3C3B]/40 px-6 text-center">
          <div>
            <Inbox className="mx-auto h-10 w-10 text-[#2A317A]" strokeWidth={1.5} />
            <p className="mt-4 text-xl font-bold text-black">صندوق الرسائل فاضي</p>
            <p className="mt-2 text-lg leading-8 text-[#3C3C3B]">أي رسالة من صفحة تواصل معنا هتوصل هنا.</p>
          </div>
        </div>
      ) : (
        <ul className="flex flex-1 flex-col justify-between gap-2">
          {inquiries.slice(0, 5).map((item) => {
            const type = item.type || item.inquiryType;
            const date = formatDate(item.createdAt || item.date);
            const initial = (item.fullName || "؟").trim().charAt(0);
            return (
              <li key={item.id}>
                <Link
                  to="/admin/marketing/inquiries"
                  className={`flex items-center gap-4 rounded-lg p-3 transition hover:bg-[#2A317A]/5 motion-reduce:transition-none ${
                    item.read ? "" : "bg-[#2A317A]/[0.06]"
                  }`}
                >
                  <span className={`${chip} h-12 w-12 text-xl font-bold`}>{initial}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <p className={`text-lg text-black ${item.read ? "font-semibold" : "font-bold"}`}>
                        {item.fullName || "بدون اسم"}
                      </p>
                      {type && (
                        <span className="rounded-md bg-[#2A317A] px-2 py-0.5 text-sm font-semibold text-white">{type}</span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-base text-[#3C3C3B]">{item.subject || item.message}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    {date && <span className="text-base font-medium text-[#3C3C3B]">{date}</span>}
                    {!item.read && <span className="h-3 w-3 rounded-full bg-[#2A317A]" aria-label="غير مقروءة" />}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* RecentActivity – real derived facts only (no fake timestamps)       */
/* ------------------------------------------------------------------ */

function RecentActivity({ events, summary }) {
  return (
    <section className={card}>
      <CardHeader title="النشاط الأخير" />

      {events && events.length > 0 ? (
        <ul className="flex flex-1 flex-col justify-between gap-2">
          {events.map((e) => (
            <li key={e.id} className="flex items-center gap-4 rounded-lg p-3 text-lg text-black hover:bg-[#2A317A]/5">
              <span className={`${chip} h-11 w-11`}>
                <Activity className="h-5 w-5" />
              </span>
              <span className="flex-1">{e.text}</span>
              <span className="shrink-0 text-base text-[#3C3C3B]">{formatDate(e.at)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <ul className="flex flex-1 flex-col justify-between gap-2">
            {summary.map((row) => {
              const Icon = row.icon;
              return (
                <li key={row.text} className="flex items-center gap-4 rounded-lg p-3 hover:bg-[#2A317A]/5">
                  <span className={`${chip} h-12 w-12`}>
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <span className="flex-1 text-lg font-semibold text-black">{row.text}</span>
                  <span className="text-4xl font-bold leading-none text-[#2A317A]">{row.value}</span>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 border-t border-[#3C3C3B]/15 pt-4 text-base leading-7 text-[#3C3C3B]">
            سجل التعديلات مش متاح حالياً، هيظهر هنا لما يتربط.
          </p>
        </>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function DashboardPage() {
  const { news, projects, hero, inquiries, resetContent } = useMarketing();

  const [range, setRange] = useState("30d");
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(false);
    loadTrafficSummary(range)
      .then((data) => {
        if (!alive) return;
        setSummary(data);
        setLoading(false);
      })
      .catch(() => {
        if (!alive) return;
        setError(true);
        setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [range]);

  const unread = inquiries.filter((item) => !item.read).length;
  const slides = hero.filter((item) => item.active !== false && item.src);

  const projectsLive = projects.filter((item) => item.published !== false).length;
  const projectsDraft = projects.length - projectsLive;
  const newsLive = news.filter((item) => item.published !== false).length;
  const newsDraft = news.length - newsLive;

  const rangeLabel = trafficRanges.find((r) => r.id === range)?.label || "";
  const name = (path) => pageName(path, projects, news);

  const handleReset = () => {
    if (window.confirm("إرجاع الأخبار والمشاريع والصفحة الرئيسية للنسخة الأصلية؟")) resetContent();
  };

  const kpis = [
    {
      label: "زوار الموقع",
      value: error ? "—" : summary ? summary.totals.visitors : "—",
      note: error ? "تعذر قراءة الزيارات" : summary ? `${summary.totals.views} زيارة · ${rangeLabel}` : "جاري التحميل...",
      to: TRAFFIC_ROUTE,
      icon: LineChart,
    },
    {
      label: "إجمالي الرسائل",
      value: inquiries.length,
      note: unread > 0 ? `${unread} غير مقروءة` : "كل الرسائل مقروءة",
      to: "/admin/marketing/inquiries",
      icon: MessageSquareText,
    },
    {
      label: "مشاريع منشورة",
      value: projectsLive,
      note: projectsDraft > 0 ? `${projectsDraft} مسودة` : "كلها ظاهرة على الموقع",
      to: "/admin/marketing/projects",
      icon: FolderKanban,
    },
    {
      label: "أخبار منشورة",
      value: newsLive,
      note: newsDraft > 0 ? `${newsDraft} مسودة` : "كلها ظاهرة على الموقع",
      to: "/admin/marketing/news",
      icon: Newspaper,
    },
  ];

  const activitySummary = [
    { value: projectsLive, text: "مشروع منشور حالياً", icon: FolderKanban },
    { value: newsLive, text: "خبر منشور حالياً", icon: Newspaper },
    { value: slides.length, text: "شريحة Hero نشطة", icon: ImagePlay },
  ];

  return (
    <div
      className="mkt-dash min-w-0 space-y-6 overflow-x-hidden rounded-2xl bg-[#3C3C3B]/[0.05] p-4 text-black sm:p-6 lg:p-8"
      style={{ fontFamily: FONT }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap');
        @keyframes mktRise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        .mkt-dash .mkt-in { animation: mktRise .55s cubic-bezier(.2,.7,.2,1) both; }
        @media (prefers-reduced-motion: reduce) { .mkt-dash .mkt-in { animation: none; } }
      `}</style>

      <div className="mkt-in">
        <Header onReset={handleReset} />
      </div>

      <div className="mkt-in grid gap-6 sm:grid-cols-2 xl:grid-cols-4" style={{ animationDelay: "60ms" }}>
        {kpis.map((k) => (
          <MetricCard key={k.label} {...k} />
        ))}
      </div>

      <div className="mkt-in grid gap-6 lg:grid-cols-5" style={{ animationDelay: "120ms" }}>
        <div className="min-w-0 lg:col-span-3">
          <TrafficOverview range={range} onRange={setRange} summary={summary} error={error} loading={loading} name={name} />
        </div>
        <div className="min-w-0 lg:col-span-2">
          <ContentStatus
            heroActive={slides.length}
            heroTotal={hero.length}
            projectsLive={projectsLive}
            projectsTotal={projects.length}
            newsLive={newsLive}
            newsTotal={news.length}
          />
        </div>
      </div>

      <div className="mkt-in grid gap-6 lg:grid-cols-5" style={{ animationDelay: "180ms" }}>
        <div className="min-w-0 lg:col-span-3">
          <HeroPreview slides={slides} />
        </div>
        <div className="min-w-0 lg:col-span-2">
          <QuickActions />
        </div>
      </div>

      <div className="mkt-in grid gap-6 lg:grid-cols-5" style={{ animationDelay: "240ms" }}>
        <div className="min-w-0 lg:col-span-3">
          <RecentInquiries inquiries={inquiries} />
        </div>
        <div className="min-w-0 lg:col-span-2">
          <RecentActivity events={null} summary={activitySummary} />
        </div>
      </div>
    </div>
  );
}