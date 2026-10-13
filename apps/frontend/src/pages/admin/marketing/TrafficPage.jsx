// // import { useEffect, useMemo, useState } from "react";
// // import { loadTrafficSummary } from "../../../services/track";
// // import { useMarketing } from "../../../features/marketing/MarketingProvider";
// // import { fieldClass, PageHeading, panelClass, primaryButton, quietButton } from "./MarketingLayout";
// // import Pagination, { paginateItems } from "./Pagination";

// // const ranges = [
// //   { id: "1d", label: "\u0627\u0644\u064a\u0648\u0645" },
// //   { id: "7d", label: "7 \u0623\u064a\u0627\u0645" },
// //   { id: "30d", label: "30 \u064a\u0648\u0645" },
// //   { id: "all", label: "\u0643\u0644 \u0627\u0644\u0645\u062f\u0629" },
// // ];

// // const regionNames = new Intl.DisplayNames(["ar"], { type: "region" });

// // function countryLabel(country) {
// //   if (country.code === "LAN") return "\u0634\u0628\u0643\u0629 \u062f\u0627\u062e\u0644\u064a\u0629";
// //   if (!country.code || country.code === "ZZ") return "\u063a\u064a\u0631 \u0645\u0639\u0631\u0648\u0641";
// //   try {
// //     return regionNames.of(country.code) || country.country;
// //   } catch {
// //     return country.country;
// //   }
// // }

// // function flag(code) {
// //   if (!code || code === "LAN" || code === "ZZ") return "";
// //   const points = [...code.toUpperCase()].map((char) => 127397 + char.charCodeAt(0));
// //   return String.fromCodePoint(...points);
// // }

// // function projectTitle(project) {
// //   if (!project) return "";
// //   if (typeof project.title === "string") return project.title;
// //   if (project.title && typeof project.title === "object") return project.title.ar || project.title.en || "";
// //   return project.titleAr || project.titleEn || "";
// // }

// // function pageName(path, projects, news) {
// //   if (path === "/") return "\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629";
// //   if (path === "/projects") return "\u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639";
// //   if (path === "/news") return "\u0627\u0644\u0623\u062e\u0628\u0627\u0631";
// //   if (path === "/careers") return "\u0627\u0644\u0648\u0638\u0627\u0626\u0641";
// //   if (path === "/contact") return "\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627";
// //   if (path === "/bim") return "BIM";
// //   if (path === "/suppliers/add") return "\u062a\u0633\u062c\u064a\u0644 \u0645\u0648\u0631\u062f";
// //   const project = path.match(/^\/projects\/([^/]+)$/);
// //   if (project) {
// //     const id = decodeURIComponent(project[1]);
// //     const found = projects.find((item) => String(item.id) === id);
// //     return projectTitle(found) || `\u0645\u0634\u0631\u0648\u0639 ${id}`;
// //   }
// //   const story = path.match(/^\/news\/([^/]+)$/);
// //   if (story) {
// //     const found = news.find((item) => item.id === decodeURIComponent(story[1]));
// //     return found?.title?.ar || found?.title?.en || "\u062e\u0628\u0631";
// //   }
// //   const job = path.match(/^\/careers\/([^/]+)$/);
// //   if (job) return "\u0648\u0638\u064a\u0641\u0629";
// //   return path;
// // }

// // function CountryLine({ country }) {
// //   return (
// //     <span className="inline-flex items-center gap-1 rounded-full bg-[#f5f5f5] px-2.5 py-1 text-[11px] font-medium text-[#404040]">
// //       <span aria-hidden>{flag(country.code)}</span>
// //       {countryLabel(country)}
// //       <span className="text-[#a3a3a3]">{country.visitors}</span>
// //     </span>
// //   );
// // }

// // export default function TrafficPage() {
// //   const { projects, news } = useMarketing();
// //   const [range, setRange] = useState("all");
// //   const [summary, setSummary] = useState(null);
// //   const [error, setError] = useState("");
// //   const [query, setQuery] = useState("");
// //   const [pagesPage, setPagesPage] = useState(1);
// //   const [projectsPage, setProjectsPage] = useState(1);
// //   const [countriesPage, setCountriesPage] = useState(1);

// //   useEffect(() => {
// //     let alive = true;
// //     setError("");
// //     loadTrafficSummary(range)
// //       .then((data) => {
// //         if (alive) setSummary(data);
// //       })
// //       .catch(() => {
// //         if (alive) {
// //           setError(
// //             "\u062a\u0639\u0630\u0631 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u0632\u064a\u0627\u0631\u0627\u062a. \u062a\u0623\u0643\u062f \u0623\u0646 \u0627\u0644\u0633\u064a\u0631\u0641\u0631 \u064a\u0639\u0645\u0644."
// //           );
// //         }
// //       });
// //     return () => {
// //       alive = false;
// //     };
// //   }, [range]);

// //   const name = (path) => pageName(path, projects, news);

// //   const projectRows = useMemo(() => {
// //     const stats = new Map((summary?.projects || []).map((item) => [String(item.projectId), item]));
// //     const rows = projects.map((project) => ({
// //       id: String(project.id),
// //       title: projectTitle(project),
// //       stat: stats.get(String(project.id)) || { visitors: 0, views: 0, countries: [] },
// //     }));
// //     for (const item of summary?.projects || []) {
// //       if (!projects.some((project) => String(project.id) === String(item.projectId))) {
// //         rows.push({
// //           id: String(item.projectId),
// //           title: `\u0645\u0634\u0631\u0648\u0639 ${item.projectId}`,
// //           stat: item,
// //         });
// //       }
// //     }
// //     const needle = query.trim().toLowerCase();
// //     return rows
// //       .filter((row) => !needle || row.title.toLowerCase().includes(needle))
// //       .sort((a, b) => b.stat.visitors - a.stat.visitors || a.title.localeCompare(b.title));
// //   }, [projects, summary, query]);

// //   useEffect(() => { setPagesPage(1); setCountriesPage(1); }, [range, summary]);
// //   useEffect(() => { setProjectsPage(1); }, [query, range, summary]);

// //   const pagedPages = useMemo(() => paginateItems(summary?.pages || [], pagesPage, 10), [summary, pagesPage]);
// //   const pagedProjects = useMemo(() => paginateItems(projectRows, projectsPage, 10), [projectRows, projectsPage]);
// //   const pagedCountries = useMemo(() => paginateItems(summary?.countries || [], countriesPage, 10), [summary, countriesPage]);

// //   return (
// //     <div>
// //       <PageHeading
// //         kicker="TRAFFIC"
// //         title={"\u0627\u0644\u0632\u064a\u0627\u0631\u0627\u062a"}
// //         text={
// //           "\u0639\u062f\u062f \u0627\u0644\u0623\u0634\u062e\u0627\u0635 \u0627\u0644\u0630\u064a\u0646 \u0641\u062a\u062d\u0648\u0627 \u0643\u0644 \u0635\u0641\u062d\u0629 \u0648\u0643\u0644 \u0645\u0634\u0631\u0648\u0639\u060c \u0648\u0627\u0644\u062f\u0648\u0644\u0629 \u0627\u0644\u0644\u064a \u062f\u062e\u0644\u0648\u0627 \u0645\u0646\u0647\u0627. \u0627\u0644\u0632\u064a\u0627\u0631\u0629 \u0645\u0646 \u0634\u0628\u0643\u0629 \u0627\u0644\u0634\u0631\u0643\u0629 \u0628\u062a\u0638\u0647\u0631 \u0643\u0634\u0628\u0643\u0629 \u062f\u0627\u062e\u0644\u064a\u0629."
// //         }
// //       >
// //         {ranges.map((item) => (
// //           <button
// //             key={item.id}
// //             type="button"
// //             className={item.id === range ? primaryButton : quietButton}
// //             onClick={() => setRange(item.id)}
// //           >
// //             {item.label}
// //           </button>
// //         ))}
// //       </PageHeading>

// //       {error && <p className={`${panelClass} px-5 py-8 text-sm text-[#737373]`}>{error}</p>}

// //       {summary && (
// //         <div className="space-y-6">
// //           <div className="grid gap-3 md:grid-cols-3">
// //             <article className={`${panelClass} p-5`}>
// //               <p className="text-[13px] text-[#737373]">{"\u0627\u0644\u0632\u0648\u0627\u0631"}</p>
// //               <p className="mt-2 text-3xl font-semibold tracking-tight text-[#171717]">{summary.totals.visitors}</p>
// //             </article>
// //             <article className={`${panelClass} p-5`}>
// //               <p className="text-[13px] text-[#737373]">{"\u0627\u0644\u0632\u064a\u0627\u0631\u0627\u062a"}</p>
// //               <p className="mt-2 text-3xl font-semibold tracking-tight text-[#171717]">{summary.totals.views}</p>
// //             </article>
// //             <article className={`${panelClass} p-5`}>
// //               <p className="text-[13px] text-[#737373]">{"\u0623\u0639\u0644\u0649 \u0635\u0641\u062d\u0629"}</p>
// //               <p className="mt-2 text-lg font-semibold text-[#171717]">
// //                 {summary.topPage ? name(summary.topPage.path) : "\u0644\u0627 \u0632\u064a\u0627\u0631\u0627\u062a \u0628\u0639\u062f"}
// //               </p>
// //               {summary.topPage && (
// //                 <p className="mt-1 text-[13px] text-[#737373]">
// //                   {summary.topPage.visitors} {"\u0632\u0627\u0626\u0631"} {"\u00b7"} {summary.topPage.views}{" "}
// //                   {"\u0632\u064a\u0627\u0631\u0629"}
// //                 </p>
// //               )}
// //             </article>
// //           </div>

// //           <section>
// //             <h3 className="mb-3 text-sm font-semibold text-[#171717]">
// //               {"\u0623\u0639\u0644\u0649 \u0635\u0641\u062d\u0629 \u0641\u064a \u0643\u0644 \u062f\u0648\u0644\u0629"}
// //             </h3>
// //             {summary.countries.length === 0 ? (
// //               <p className={`${panelClass} px-5 py-8 text-sm text-[#737373]`}>
// //                 {"\u0644\u064a\u0633 \u0647\u0646\u0627\u0643 \u0632\u064a\u0627\u0631\u0627\u062a \u0641\u064a \u0627\u0644\u0641\u062a\u0631\u0629 \u062f\u064a."}
// //               </p>
// //             ) : (
// //               <>
// //               <div className="grid gap-3 md:grid-cols-2">
// //                 {pagedCountries.items.map((country) => (
// //                   <article key={country.code + country.country} className={`${panelClass} p-5`}>
// //                     <p className="text-[13px] text-[#737373]">
// //                       <span className="me-1" aria-hidden>
// //                         {flag(country.code)}
// //                       </span>
// //                       {countryLabel(country)}
// //                     </p>
// //                     <p className="mt-2 text-base font-semibold text-[#171717]">
// //                       {country.topPage ? name(country.topPage.path) : "-"}
// //                     </p>
// //                     <p className="mt-1 text-[13px] text-[#737373]">
// //                       {country.visitors} {"\u0632\u0627\u0626\u0631 \u0641\u064a \u0627\u0644\u062f\u0648\u0644\u0629"}
// //                       {country.topPage
// //                         ? ` \u00b7 ${country.topPage.visitors} \u0639\u0644\u0649 \u0627\u0644\u0635\u0641\u062d\u0629 \u062f\u064a`
// //                         : ""}
// //                     </p>
// //                   </article>
// //                 ))}
// //               </div>
// //               {(summary.countries.length > 0) && (
// //                 <Pagination page={pagedCountries.page} pageSize={10} total={summary.countries.length} onChange={setCountriesPage} />
// //               )}
// //               </>
// //             )}
// //           </section>

// //           <section>
// //             <h3 className="mb-3 text-sm font-semibold text-[#171717]">{"\u0627\u0644\u0635\u0641\u062d\u0627\u062a"}</h3>
// //             <div className="space-y-3">
// //               {summary.pages.length === 0 && (
// //                 <p className={`${panelClass} px-5 py-8 text-sm text-[#737373]`}>{"\u0644\u0627 \u0635\u0641\u062d\u0627\u062a \u0645\u0633\u062c\u0644\u0629."}</p>
// //               )}
// //               {pagedPages.items.map((page) => (
// //                 <article key={page.path} className={`${panelClass} p-4`}>
// //                   <div className="flex flex-wrap items-start justify-between gap-3">
// //                     <div>
// //                       <p className="text-base font-semibold text-[#171717]">{name(page.path)}</p>
// //                       <p className="text-xs text-[#a3a3a3]" dir="ltr">
// //                         {page.path}
// //                       </p>
// //                     </div>
// //                     <p className="text-[13px] font-medium text-[#2A317A]">
// //                       {page.visitors} {"\u0632\u0627\u0626\u0631"} {"\u00b7"} {page.views} {"\u0632\u064a\u0627\u0631\u0629"}
// //                     </p>
// //                   </div>
// //                   <div className="mt-3 flex flex-wrap gap-2">
// //                     {page.countries.map((country) => (
// //                       <CountryLine key={country.code + country.country} country={country} />
// //                     ))}
// //                   </div>
// //                 </article>
// //               ))}
// //             </div>
// //             {(summary.pages.length > 0) && (
// //               <Pagination page={pagedPages.page} pageSize={10} total={summary.pages.length} onChange={setPagesPage} />
// //             )}
// //           </section>

// //           <section>
// //             <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
// //               <h3 className="text-sm font-semibold text-[#171717]">
// //                 {"\u0627\u0644\u0639\u0645\u0644\u0627\u0621 \u0639\u0644\u0649 \u0643\u0644 \u0645\u0634\u0631\u0648\u0639"}
// //               </h3>
// //               <input
// //                 className={`${fieldClass} w-full max-w-xs`}
// //                 placeholder={"\u0628\u062d\u062b \u0628\u0627\u0644\u0645\u0634\u0631\u0648\u0639"}
// //                 value={query}
// //                 onChange={(event) => { setQuery(event.target.value); setProjectsPage(1); }}
// //               />
// //             </div>
// //             <div className="space-y-3">
// //               {pagedProjects.items.map((row) => (
// //                 <article key={row.id} className={`${panelClass} p-4`}>
// //                   <div className="flex flex-wrap items-start justify-between gap-3">
// //                     <p className="font-semibold text-[#171717]">{row.title || "\u0628\u062f\u0648\u0646 \u0627\u0633\u0645"}</p>
// //                     <p className="text-[13px] font-medium text-[#2A317A]">
// //                       {row.stat.visitors} {"\u0632\u0627\u0626\u0631"} {"\u00b7"} {row.stat.views} {"\u0632\u064a\u0627\u0631\u0629"}
// //                     </p>
// //                   </div>
// //                   <div className="mt-3 flex flex-wrap gap-2">
// //                     {row.stat.countries.length === 0 ? (
// //                       <span className="text-xs text-[#a3a3a3]">{"\u0644\u0627 \u0632\u064a\u0627\u0631\u0627\u062a \u0628\u0639\u062f"}</span>
// //                     ) : (
// //                       row.stat.countries.map((country) => (
// //                         <CountryLine key={country.code + country.country} country={country} />
// //                       ))
// //                     )}
// //                   </div>
// //                 </article>
// //               ))}
// //             </div>
// //             {projectRows.length > 0 && (
// //               <Pagination page={pagedProjects.page} pageSize={10} total={projectRows.length} onChange={setProjectsPage} />
// //             )}
// //           </section>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }



// import { useEffect, useMemo, useState } from "react";
// import { loadTrafficSummary } from "../../../services/track";
// import { useMarketing } from "../../../features/marketing/MarketingProvider";
// import Pagination, { paginateItems } from "./Pagination";
// import { countryLabel, flag, pageName, projectTitle, trafficRanges } from  "../../../helpers/trafficHelpers";

// /* Palette (only these): #3C3C3B  #2A317A  white  black */

// const FONT = "'IBM Plex Sans Arabic', 'Cairo', system-ui, sans-serif";
// const card =
//   "flex h-full flex-col rounded-xl border border-[#3C3C3B]/15 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md motion-reduce:transition-none";

// function CardHeader({ children }) {
//   return <h3 className="mb-5 text-xl font-bold text-black sm:text-2xl">{children}</h3>;
// }

// function ProgressBar({ value, max }) {
//   return (
//     <div className="h-2.5 w-full rounded-full bg-[#3C3C3B]/15" aria-hidden="true">
//       <div
//         className="h-full rounded-full bg-[#2A317A] transition-all duration-700 motion-reduce:transition-none"
//         style={{ width: `${value > 0 ? Math.max(4, (value / max) * 100) : 0}%` }}
//       />
//     </div>
//   );
// }

// function CountryChip({ country }) {
//   return (
//     <span className="inline-flex items-center gap-2 rounded-lg bg-[#3C3C3B]/[0.07] px-3 py-1.5 text-base font-medium text-black">
//       <span aria-hidden>{flag(country.code)}</span>
//       {countryLabel(country)}
//       <span className="font-bold text-[#2A317A]">{country.visitors}</span>
//     </span>
//   );
// }

// function EmptyBox({ children }) {
//   return (
//     <div className="grid flex-1 min-h-[10rem] place-items-center rounded-lg border border-dashed border-[#3C3C3B]/40 px-6 py-8 text-center text-lg text-[#3C3C3B]">
//       {children}
//     </div>
//   );
// }

// export default function TrafficPage() {
//   const { projects, news } = useMarketing();
//   const [range, setRange] = useState("all");
//   const [summary, setSummary] = useState(null);
//   const [error, setError] = useState("");
//   const [query, setQuery] = useState("");
//   const [pagesPage, setPagesPage] = useState(1);
//   const [projectsPage, setProjectsPage] = useState(1);
//   const [countriesPage, setCountriesPage] = useState(1);

//   useEffect(() => {
//     let alive = true;
//     setError("");
//     loadTrafficSummary(range)
//       .then((data) => {
//         if (alive) setSummary(data);
//       })
//       .catch(() => {
//         if (alive) setError("تعذر قراءة الزيارات. تأكد أن السيرفر يعمل.");
//       });
//     return () => {
//       alive = false;
//     };
//   }, [range]);

//   const name = (path) => pageName(path, projects, news);

//   const projectRows = useMemo(() => {
//     const stats = new Map((summary?.projects || []).map((item) => [String(item.projectId), item]));
//     const rows = projects.map((project) => ({
//       id: String(project.id),
//       title: projectTitle(project),
//       stat: stats.get(String(project.id)) || { visitors: 0, views: 0, countries: [] },
//     }));
//     for (const item of summary?.projects || []) {
//       if (!projects.some((project) => String(project.id) === String(item.projectId))) {
//         rows.push({
//           id: String(item.projectId),
//           title: `مشروع ${item.projectId}`,
//           stat: item,
//         });
//       }
//     }
//     const needle = query.trim().toLowerCase();
//     return rows
//       .filter((row) => !needle || row.title.toLowerCase().includes(needle))
//       .sort((a, b) => b.stat.visitors - a.stat.visitors || a.title.localeCompare(b.title));
//   }, [projects, summary, query]);

//   useEffect(() => { setPagesPage(1); setCountriesPage(1); }, [range, summary]);
//   useEffect(() => { setProjectsPage(1); }, [query, range, summary]);

//   const pagedPages = useMemo(() => paginateItems(summary?.pages || [], pagesPage, 10), [summary, pagesPage]);
//   const pagedProjects = useMemo(() => paginateItems(projectRows, projectsPage, 10), [projectRows, projectsPage]);
//   const pagedCountries = useMemo(() => paginateItems(summary?.countries || [], countriesPage, 10), [summary, countriesPage]);

//   const maxPage = Math.max(...(summary?.pages || []).map((p) => p.visitors), 1);
//   const maxCountry = Math.max(...(summary?.countries || []).map((c) => c.visitors), 1);
//   const maxProject = Math.max(...projectRows.map((r) => r.stat.visitors), 1);

//   return (
//     <div
//       className="min-w-0 space-y-6 overflow-x-hidden rounded-2xl bg-[#3C3C3B]/[0.05] p-4 text-black sm:p-6 lg:p-8"
//       style={{ fontFamily: FONT }}
//     >
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap');
//       `}</style>

//       {/* Header */}
//       <header className="flex flex-wrap items-start justify-between gap-5">
//         <div className="min-w-0 max-w-3xl">
//           <p className="text-sm font-semibold tracking-[0.2em] text-[#2A317A]">Al Shorouk/ TRAFFIC</p>
//           <h1 className="mt-3 text-3xl font-bold leading-[1.3] text-black sm:text-4xl lg:text-5xl">الزيارات</h1>
//           <p className="mt-3 text-lg leading-8 text-[#3C3C3B] sm:text-xl sm:leading-9">
//             عدد الأشخاص الذين فتحوا كل صفحة وكل مشروع، والدولة اللي دخلوا منها. الزيارة من شبكة الشركة بتظهر كشبكة داخلية.
//           </p>
//         </div>
//         <div className="inline-flex flex-wrap gap-1 rounded-lg border border-[#3C3C3B]/15 bg-white p-1 shadow-sm" role="group" aria-label="الفترة الزمنية">
//           {trafficRanges.map((item) => (
//             <button
//               key={item.id}
//               type="button"
//               aria-pressed={item.id === range}
//               onClick={() => setRange(item.id)}
//               className={`rounded-md px-4 py-2.5 text-base font-semibold transition motion-reduce:transition-none ${
//                 item.id === range ? "bg-[#2A317A] text-white shadow-sm" : "text-[#3C3C3B] hover:text-black"
//               }`}
//             >
//               {item.label}
//             </button>
//           ))}
//         </div>
//       </header>

//       {error && (
//         <p className="rounded-xl border border-[#3C3C3B]/15 bg-white px-6 py-10 text-center text-lg text-[#3C3C3B] shadow-sm">{error}</p>
//       )}

//       {!error && !summary && (
//         <p className="rounded-xl border border-[#3C3C3B]/15 bg-white px-6 py-10 text-center text-lg text-[#3C3C3B] shadow-sm">
//           جاري تحميل الزيارات...
//         </p>
//       )}

//       {summary && (
//         <>
//           {/* KPIs */}
//           <div className="grid gap-6 md:grid-cols-3">
//             <article className="rounded-xl bg-[#2A317A] p-6 text-white shadow-sm">
//               <p className="text-lg font-medium text-white/85">الزوار</p>
//               <p className="mt-3 text-5xl font-bold leading-none sm:text-6xl">{summary.totals.visitors}</p>
//             </article>
//             <article className="rounded-xl border border-[#3C3C3B]/15 bg-white p-6 shadow-sm">
//               <p className="text-lg font-medium text-[#3C3C3B]">الزيارات</p>
//               <p className="mt-3 text-5xl font-bold leading-none text-black sm:text-6xl">{summary.totals.views}</p>
//             </article>
//             <article className="rounded-xl border border-[#3C3C3B]/15 bg-white p-6 shadow-sm">
//               <p className="text-lg font-medium text-[#3C3C3B]">أعلى صفحة</p>
//               <p className="mt-3 text-3xl font-bold leading-tight text-black">
//                 {summary.topPage ? name(summary.topPage.path) : "لا زيارات بعد"}
//               </p>
//               {summary.topPage && (
//                 <p className="mt-2 text-lg font-medium text-[#2A317A]">
//                   {summary.topPage.visitors} زائر · {summary.topPage.views} زيارة
//                 </p>
//               )}
//             </article>
//           </div>

//           {/* Pages + Countries */}
//           <div className="grid gap-6 lg:grid-cols-5">
//             <section className={`${card} lg:col-span-3`}>
//               <CardHeader>الصفحات</CardHeader>
//               {summary.pages.length === 0 ? (
//                 <EmptyBox>لا صفحات مسجلة.</EmptyBox>
//               ) : (
//                 <ul className="flex-1 space-y-5">
//                   {pagedPages.items.map((page) => (
//                     <li key={page.path} className="rounded-lg p-2 hover:bg-[#2A317A]/5">
//                       <div className="flex flex-wrap items-start justify-between gap-2">
//                         <div className="min-w-0">
//                           <p className="text-lg font-bold text-black">{name(page.path)}</p>
//                           <p className="text-sm text-[#3C3C3B]" dir="ltr">
//                             {page.path}
//                           </p>
//                         </div>
//                         <p className="text-base font-semibold text-[#2A317A]">
//                           {page.visitors} زائر · {page.views} زيارة
//                         </p>
//                       </div>
//                       <div className="mt-3">
//                         <ProgressBar value={page.visitors} max={maxPage} />
//                       </div>
//                       {page.countries.length > 0 && (
//                         <div className="mt-3 flex flex-wrap gap-2">
//                           {page.countries.map((country) => (
//                             <CountryChip key={country.code + country.country} country={country} />
//                           ))}
//                         </div>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//               {summary.pages.length > 0 && (
//                 <div className="mt-auto pt-4">
//                   <Pagination page={pagedPages.page} pageSize={10} total={summary.pages.length} onChange={setPagesPage} />
//                 </div>
//               )}
//             </section>

//             <section className={`${card} lg:col-span-2`}>
//               <CardHeader>أعلى صفحة في كل دولة</CardHeader>
//               {summary.countries.length === 0 ? (
//                 <EmptyBox>ليس هناك زيارات في الفترة دي.</EmptyBox>
//               ) : (
//                 <ul className="flex-1 space-y-5">
//                   {pagedCountries.items.map((country) => (
//                     <li key={country.code + country.country} className="rounded-lg p-2 hover:bg-[#2A317A]/5">
//                       <div className="flex items-center justify-between gap-3">
//                         <p className="flex items-center gap-3 text-lg font-bold text-black">
//                           <span className="text-2xl" aria-hidden>
//                             {flag(country.code)}
//                           </span>
//                           {countryLabel(country)}
//                         </p>
//                         <p className="text-3xl font-bold leading-none text-[#2A317A]">{country.visitors}</p>
//                       </div>
//                       <p className="mt-2 text-base text-[#3C3C3B]">
//                         {country.topPage ? name(country.topPage.path) : "-"}
//                         {country.topPage ? ` · ${country.topPage.visitors} على الصفحة دي` : ""}
//                       </p>
//                       <div className="mt-3">
//                         <ProgressBar value={country.visitors} max={maxCountry} />
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//               {summary.countries.length > 0 && (
//                 <div className="mt-auto pt-4">
//                   <Pagination
//                     page={pagedCountries.page}
//                     pageSize={10}
//                     total={summary.countries.length}
//                     onChange={setCountriesPage}
//                   />
//                 </div>
//               )}
//             </section>
//           </div>

//           {/* Projects */}
//           <section className="rounded-xl border border-[#3C3C3B]/15 bg-white p-6 shadow-sm">
//             <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//               <h3 className="text-xl font-bold text-black sm:text-2xl">العملاء على كل مشروع</h3>
//               <input
//                 className="w-full rounded-lg border border-[#3C3C3B]/25 bg-white px-4 py-3 text-lg text-black outline-none placeholder:text-[#3C3C3B]/60 focus:border-[#2A317A] focus:ring-2 focus:ring-[#2A317A]/20 sm:max-w-sm"
//                 placeholder="بحث بالمشروع"
//                 value={query}
//                 onChange={(event) => {
//                   setQuery(event.target.value);
//                   setProjectsPage(1);
//                 }}
//               />
//             </div>

//             {pagedProjects.items.length === 0 ? (
//               <EmptyBox>مفيش مشاريع مطابقة للبحث.</EmptyBox>
//             ) : (
//               <div className="grid gap-4 md:grid-cols-2">
//                 {pagedProjects.items.map((row) => (
//                   <article key={row.id} className="flex flex-col rounded-lg border border-[#3C3C3B]/15 p-5 transition-shadow hover:shadow-md">
//                     <div className="flex flex-wrap items-start justify-between gap-2">
//                       <p className="text-lg font-bold text-black">{row.title || "بدون اسم"}</p>
//                       <p className="text-base font-semibold text-[#2A317A]">
//                         {row.stat.visitors} زائر · {row.stat.views} زيارة
//                       </p>
//                     </div>
//                     <div className="mt-3">
//                       <ProgressBar value={row.stat.visitors} max={maxProject} />
//                     </div>
//                     <div className="mt-3 flex flex-wrap gap-2">
//                       {row.stat.countries.length === 0 ? (
//                         <span className="text-base text-[#3C3C3B]">لا زيارات بعد</span>
//                       ) : (
//                         row.stat.countries.map((country) => (
//                           <CountryChip key={country.code + country.country} country={country} />
//                         ))
//                       )}
//                     </div>
//                   </article>
//                 ))}
//               </div>
//             )}

//             {projectRows.length > 0 && (
//               <div className="pt-5">
//                 <Pagination page={pagedProjects.page} pageSize={10} total={projectRows.length} onChange={setProjectsPage} />
//               </div>
//             )}
//           </section>
//         </>
//       )}
//     </div>
//   );
// }


import { useEffect, useMemo, useState } from "react";
import { Globe2, FileText, FolderKanban, Search } from "lucide-react";
import { loadTrafficSummary } from "../../../services/track";
import { useMarketing } from "../../../features/marketing/MarketingProvider";
import Pagination, { paginateItems } from "./Pagination";
import { countryLabel, flag, pageName, projectTitle, trafficRanges } from  "../../../helpers/trafficHelpers";
import { Bar, Count, FONT, MotionStyles, cardCls, fieldCls, stagger } from "../../../ui/adminUi";

const COUNTRIES_PER_PAGE = 8; // 8 tiles = clean rows at 1, 2 and 4 columns
const PAGES_PER_PAGE = 10;

function SectionHead({ icon: Icon, title, count }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-[#2A317A]/10 text-[#2A317A]">
        <Icon className="h-6 w-6" strokeWidth={1.8} />
      </span>
      <h3 className="text-xl font-bold text-black sm:text-2xl">{title}</h3>
      {typeof count === "number" && (
        <span className="rounded-md bg-[#3C3C3B]/[0.08] px-2.5 py-0.5 text-base font-bold text-[#3C3C3B]">{count}</span>
      )}
    </div>
  );
}

function CountryChip({ country }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg bg-[#3C3C3B]/[0.07] px-3 py-1.5 text-base font-medium text-black">
      <span aria-hidden>{flag(country.code)}</span>
      {countryLabel(country)}
      <span className="font-bold text-[#2A317A]">{country.visitors}</span>
    </span>
  );
}

function EmptyBox({ children }) {
  return (
    <div className="grid min-h-[10rem] place-items-center rounded-lg border border-dashed border-[#3C3C3B]/40 px-6 py-8 text-center text-lg text-[#3C3C3B]">
      {children}
    </div>
  );
}

export default function TrafficPage() {
  const { projects, news } = useMarketing();
  const [range, setRange] = useState("all");
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [pagesPage, setPagesPage] = useState(1);
  const [projectsPage, setProjectsPage] = useState(1);
  const [countriesPage, setCountriesPage] = useState(1);

  useEffect(() => {
    let alive = true;
    setError("");
    loadTrafficSummary(range)
      .then((data) => {
        if (alive) setSummary(data);
      })
      .catch(() => {
        if (alive) setError("تعذر قراءة الزيارات. تأكد أن السيرفر يعمل.");
      });
    return () => {
      alive = false;
    };
  }, [range]);

  const name = (path) => pageName(path, projects, news);

  const projectRows = useMemo(() => {
    const stats = new Map((summary?.projects || []).map((item) => [String(item.projectId), item]));
    const rows = projects.map((project) => ({
      id: String(project.id),
      title: projectTitle(project),
      stat: stats.get(String(project.id)) || { visitors: 0, views: 0, countries: [] },
    }));
    for (const item of summary?.projects || []) {
      if (!projects.some((project) => String(project.id) === String(item.projectId))) {
        rows.push({
          id: String(item.projectId),
          title: `مشروع ${item.projectId}`,
          stat: item,
        });
      }
    }
    const needle = query.trim().toLowerCase();
    return rows
      .filter((row) => !needle || row.title.toLowerCase().includes(needle))
      .sort((a, b) => b.stat.visitors - a.stat.visitors || a.title.localeCompare(b.title));
  }, [projects, summary, query]);

  useEffect(() => { setPagesPage(1); setCountriesPage(1); }, [range, summary]);
  useEffect(() => { setProjectsPage(1); }, [query, range, summary]);

  const pagedPages = useMemo(() => paginateItems(summary?.pages || [], pagesPage, PAGES_PER_PAGE), [summary, pagesPage]);
  const pagedProjects = useMemo(() => paginateItems(projectRows, projectsPage, 10), [projectRows, projectsPage]);
  const pagedCountries = useMemo(
    () => paginateItems(summary?.countries || [], countriesPage, COUNTRIES_PER_PAGE),
    [summary, countriesPage]
  );

  const maxPage = Math.max(...(summary?.pages || []).map((p) => p.visitors), 1);
  const maxCountry = Math.max(...(summary?.countries || []).map((c) => c.visitors), 1);
  const maxProject = Math.max(...projectRows.map((r) => r.stat.visitors), 1);

  return (
    <div
      className="adm min-w-0 space-y-6 overflow-x-hidden rounded-2xl bg-[#3C3C3B]/[0.05] p-4 text-black sm:p-6 lg:p-8"
      style={{ fontFamily: FONT }}
    >
      <MotionStyles />

      {/* Header */}
      <header className="adm-rise flex flex-wrap items-start justify-between gap-5">
        <div className="min-w-0 max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.2em] text-[#2A317A]">Al Shorouk/ TRAFFIC</p>
          <h1 className="mt-3 text-3xl font-bold leading-[1.3] text-black sm:text-4xl lg:text-5xl">الزيارات</h1>
          <p className="mt-3 text-lg leading-8 text-[#3C3C3B] sm:text-xl sm:leading-9">
            عدد الأشخاص الذين فتحوا كل صفحة وكل مشروع، والدولة اللي دخلوا منها. الزيارة من شبكة الشركة بتظهر كشبكة داخلية.
          </p>
        </div>
        <div
          className="inline-flex flex-wrap gap-1 rounded-lg border border-[#3C3C3B]/15 bg-white p-1 shadow-sm"
          role="group"
          aria-label="الفترة الزمنية"
        >
          {trafficRanges.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={item.id === range}
              onClick={() => setRange(item.id)}
              className={`rounded-md px-4 py-2.5 text-base font-semibold transition-all duration-300 motion-reduce:transition-none ${
                item.id === range ? "bg-[#2A317A] text-white shadow-sm" : "text-[#3C3C3B] hover:bg-[#2A317A]/10 hover:text-black"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {error && <p className={`${cardCls} px-6 py-10 text-center text-lg text-[#3C3C3B]`}>{error}</p>}

      {!error && !summary && (
        <p className={`${cardCls} px-6 py-10 text-center text-lg text-[#3C3C3B]`}>جاري تحميل الزيارات...</p>
      )}

      {summary && (
        <>
          {/* KPIs */}
          <div className="grid gap-6 md:grid-cols-3">
            <article
              className="adm-rise rounded-xl bg-[#2A317A] p-6 text-white shadow-sm transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none"
              style={stagger(0)}
            >
              <p className="text-lg font-medium text-white/85">الزوار</p>
              <p className="mt-3 text-5xl font-bold leading-none sm:text-6xl">
                <Count value={summary.totals.visitors} />
              </p>
            </article>
            <article className={`${cardCls} adm-rise p-6 hover:-translate-y-1`} style={stagger(1)}>
              <p className="text-lg font-medium text-[#3C3C3B]">الزيارات</p>
              <p className="mt-3 text-5xl font-bold leading-none text-black sm:text-6xl">
                <Count value={summary.totals.views} />
              </p>
            </article>
            <article className={`${cardCls} adm-rise p-6 hover:-translate-y-1`} style={stagger(2)}>
              <p className="text-lg font-medium text-[#3C3C3B]">أعلى صفحة</p>
              <p className="mt-3 text-3xl font-bold leading-tight text-black">
                {summary.topPage ? name(summary.topPage.path) : "لا زيارات بعد"}
              </p>
              {summary.topPage && (
                <p className="mt-2 text-lg font-medium text-[#2A317A]">
                  {summary.topPage.visitors} زائر · {summary.topPage.views} زيارة
                </p>
              )}
            </article>
          </div>

          {/* Countries – compact tiles instead of one tall column */}
          <section className={`${cardCls} adm-rise p-6 sm:p-7`} style={stagger(3)}>
            <SectionHead icon={Globe2} title="أعلى صفحة في كل دولة" count={summary.countries.length} />
            {summary.countries.length === 0 ? (
              <EmptyBox>ليس هناك زيارات في الفترة دي.</EmptyBox>
            ) : (
              <>
                <div key={`${range}-${pagedCountries.page}`} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {pagedCountries.items.map((country, i) => (
                    <article
                      key={country.code + country.country}
                      className="adm-pop group flex flex-col rounded-xl border border-[#3C3C3B]/15 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#2A317A] hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                      style={stagger(i)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span
                          className="text-4xl leading-none transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none"
                          aria-hidden
                        >
                          {flag(country.code) || "🌐"}
                        </span>
                        <span className="text-4xl font-bold leading-none text-[#2A317A]">{country.visitors}</span>
                      </div>
                      <p className="mt-4 text-lg font-bold text-black">{countryLabel(country)}</p>
                      <p className="mt-1 truncate text-base text-[#3C3C3B]">
                        {country.topPage ? name(country.topPage.path) : "-"}
                      </p>
                      <div className="mt-4">
                        <Bar value={country.visitors} max={maxCountry} />
                      </div>
                    </article>
                  ))}
                </div>
                <div className="pt-5">
                  <Pagination
                    page={pagedCountries.page}
                    pageSize={COUNTRIES_PER_PAGE}
                    total={summary.countries.length}
                    onChange={setCountriesPage}
                  />
                </div>
              </>
            )}
          </section>

          {/* Pages */}
          <section className={`${cardCls} adm-rise p-6 sm:p-7`} style={stagger(4)}>
            <SectionHead icon={FileText} title="الصفحات" count={summary.pages.length} />
            {summary.pages.length === 0 ? (
              <EmptyBox>لا صفحات مسجلة.</EmptyBox>
            ) : (
              <>
                <div key={`${range}-${pagedPages.page}`} className="grid gap-4 md:grid-cols-2">
                  {pagedPages.items.map((page, i) => (
                    <article
                      key={page.path}
                      className="adm-pop flex flex-col rounded-xl border border-[#3C3C3B]/15 p-5 transition-all duration-300 hover:border-[#2A317A] hover:shadow-md motion-reduce:transition-none"
                      style={stagger(i)}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-lg font-bold text-black">{name(page.path)}</p>
                          <p className="text-sm text-[#3C3C3B]" dir="ltr">
                            {page.path}
                          </p>
                        </div>
                        <p className="text-base font-semibold text-[#2A317A]">
                          {page.visitors} زائر · {page.views} زيارة
                        </p>
                      </div>
                      <div className="mt-3">
                        <Bar value={page.visitors} max={maxPage} />
                      </div>
                      {page.countries.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {page.countries.map((country) => (
                            <CountryChip key={country.code + country.country} country={country} />
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
                <div className="pt-5">
                  <Pagination
                    page={pagedPages.page}
                    pageSize={PAGES_PER_PAGE}
                    total={summary.pages.length}
                    onChange={setPagesPage}
                  />
                </div>
              </>
            )}
          </section>

          {/* Projects */}
          <section className={`${cardCls} adm-rise p-6 sm:p-7`} style={stagger(5)}>
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <SectionHead icon={FolderKanban} title="العملاء على كل مشروع" />
              <div className="relative w-full sm:max-w-sm">
                <Search className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#3C3C3B]/60" />
                <input
                  className={`${fieldCls} !mt-0 ps-12`}
                  placeholder="بحث بالمشروع"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setProjectsPage(1);
                  }}
                />
              </div>
            </div>

            {pagedProjects.items.length === 0 ? (
              <EmptyBox>مفيش مشاريع مطابقة للبحث.</EmptyBox>
            ) : (
              <div key={`${range}-${pagedProjects.page}-${query}`} className="grid gap-4 md:grid-cols-2">
                {pagedProjects.items.map((row, i) => (
                  <article
                    key={row.id}
                    className="adm-pop flex flex-col rounded-xl border border-[#3C3C3B]/15 p-5 transition-all duration-300 hover:border-[#2A317A] hover:shadow-md motion-reduce:transition-none"
                    style={stagger(i)}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <p className="text-lg font-bold text-black">{row.title || "بدون اسم"}</p>
                      <p className="text-base font-semibold text-[#2A317A]">
                        {row.stat.visitors} زائر · {row.stat.views} زيارة
                      </p>
                    </div>
                    <div className="mt-3">
                      <Bar value={row.stat.visitors} max={maxProject} />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {row.stat.countries.length === 0 ? (
                        <span className="text-base text-[#3C3C3B]">لا زيارات بعد</span>
                      ) : (
                        row.stat.countries.map((country) => (
                          <CountryChip key={country.code + country.country} country={country} />
                        ))
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}

            {projectRows.length > 0 && (
              <div className="pt-5">
                <Pagination page={pagedProjects.page} pageSize={10} total={projectRows.length} onChange={setProjectsPage} />
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
