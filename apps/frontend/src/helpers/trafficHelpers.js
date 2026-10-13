// Shared helpers for DashboardPage and TrafficPage.
// Place this file next to them (same folder as TrafficPage.jsx).

export const trafficRanges = [
  { id: "1d", label: "اليوم" },
  { id: "7d", label: "7 أيام" },
  { id: "30d", label: "30 يوم" },
  { id: "all", label: "كل المدة" },
];

const regionNames = new Intl.DisplayNames(["ar"], { type: "region" });

export function countryLabel(country) {
  if (country.code === "LAN") return "شبكة داخلية";
  if (!country.code || country.code === "ZZ") return "غير معروف";
  try {
    return regionNames.of(country.code) || country.country;
  } catch {
    return country.country;
  }
}

export function flag(code) {
  if (!code || code === "LAN" || code === "ZZ") return "";
  const points = [...code.toUpperCase()].map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...points);
}

export function projectTitle(project) {
  if (!project) return "";
  if (typeof project.title === "string") return project.title;
  if (project.title && typeof project.title === "object") return project.title.ar || project.title.en || "";
  return project.titleAr || project.titleEn || "";
}

export function pageName(path, projects, news) {
  if (path === "/") return "الرئيسية";
  if (path === "/projects") return "المشاريع";
  if (path === "/news") return "الأخبار";
  if (path === "/careers") return "الوظائف";
  if (path === "/contact") return "تواصل معنا";
  if (path === "/bim") return "BIM";
  if (path === "/suppliers/add") return "تسجيل مورد";
  const project = path.match(/^\/projects\/([^/]+)$/);
  if (project) {
    const id = decodeURIComponent(project[1]);
    const found = projects.find((item) => String(item.id) === id);
    return projectTitle(found) || `مشروع ${id}`;
  }
  const story = path.match(/^\/news\/([^/]+)$/);
  if (story) {
    const found = news.find((item) => item.id === decodeURIComponent(story[1]));
    return found?.title?.ar || found?.title?.en || "خبر";
  }
  const job = path.match(/^\/careers\/([^/]+)$/);
  if (job) return "وظيفة";
  return path;
}