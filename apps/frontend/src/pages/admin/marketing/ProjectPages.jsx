import HomeShowcasePanel, { MAX_HOME } from "../../../components/Admin/HomeShowcasePanel/HomeShowcasePanel";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowDown,
  ArrowLeftRight,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Flag,
  Hammer,
  ImagePlus,
  Images,
  Layers,
  MapPin,
  Mountain,
  PanelsTopLeft,
  Pencil,
  Plus,
  Route,
  Save,
  Search,
  Trash2,
  Upload,
  X,
  Star,
  Home
} from "lucide-react";
import { projectCategories, useMarketing, selectHomeProjects} from "../../../features/marketing/MarketingProvider";
import { pair, readPair } from "../../../features/marketing/adminI18n";
import Pagination, { paginateItems } from "./Pagination";
import {
  AdminPage,
  Bar,
  Count,
  PageHead,
  Toggle,
  UnsavedBar,
  btnDanger,
  btnPrimary,
  btnQuiet,
  btnSolid,
  cardCls,
  fieldCls,
  labelCls,
  stagger,
} from "../../../ui/adminUi";

const PER_PAGE = 12; // divisible by 1, 2 and 3 columns -> no orphan cards
const ADMIN_PROJECTS = "/admin/marketing/projects";

const FILTERS = [
  { id: "all", label: "الكل" },
  { id: "shown", label: "ظاهر" },
  { id: "hidden", label: "مخفي" },
];

function projectDisplayTitle(project) {
  if (!project) return "";
  if (typeof project.title === "string") return project.title;
  if (project.title && typeof project.title === "object") return project.title.ar || project.title.en || "";
  return project.titleAr || project.titleEn || "";
}

function finished(status) {
  return String(status).toLowerCase() === "finished";
}

/* ------------------------------------------------------------------ */
/* Slug: the project name in the URL instead of its number            */
/* ------------------------------------------------------------------ */

function slugify(text) {
  return String(text || "")
    .trim()
    .toLowerCase()
    .replace(/[ً-ٰٟـ]/g, "") // arabic diacritics + tatweel
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

function baseSlug(project) {
  const s = slugify(project.titleEn || project.titleAr || projectDisplayTitle(project));
  return !s || s === "new" ? `project-${project.id}` : s;
}

/* Stored slug wins. Otherwise derive one from the name; add the id only if two projects clash. */
export function projectSlug(project, all = []) {
  if (project.slug) return project.slug;
  const base = baseSlug(project);
  const clash = all.some((other) => String(other.id) !== String(project.id) && (other.slug || baseSlug(other)) === base);
  return clash ? `${base}-${project.id}` : base;
}

/* Finds a project by slug, and still understands old numeric links (/projects/1). */
function findProject(projects, key) {
  return projects.find((p) => projectSlug(p, projects) === key) || projects.find((p) => String(p.id) === key) || null;
}

const editHref = (project, projects) => `${ADMIN_PROJECTS}/${encodeURIComponent(projectSlug(project, projects))}`;

/* ------------------------------------------------------------------ */
/* Location helpers                                                   */
/* ------------------------------------------------------------------ */

function parseCoord(value, limit) {
  const raw = String(value ?? "").trim().replace(",", ".");
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) && Math.abs(n) <= limit ? n : null;
}

function hasText(value) {
  return String(value ?? "").trim() !== "";
}

/* Pulls lat/lng out of a pasted Google Maps link when the link contains them. */
function extractCoords(text) {
  const s = String(text || "");
  const num = "(-?\\d+(?:\\.\\d+)?)";
  const patterns = [
    new RegExp(`@${num},\\s*${num}`),
    new RegExp(`!3d${num}!4d${num}`),
    new RegExp(`[?&](?:q|ll|query|center|destination)=${num}(?:,|%2C)\\s*${num}`, "i"),
  ];
  for (const pattern of patterns) {
    const m = s.match(pattern);
    if (m && parseCoord(m[1], 90) !== null && parseCoord(m[2], 180) !== null) return { lat: m[1], lng: m[2] };
  }
  return null;
}

const isHttp = (value) => /^https?:\/\//i.test(String(value || "").trim());

function projectHasLocation(project) {
  return hasText(project.mapUrl) || (hasText(project.lat) && hasText(project.lng));
}

/* ------------------------------------------------------------------ */

function Cover({ src }) {
  const [ok, setOk] = useState(Boolean(src));
  useEffect(() => {
    setOk(Boolean(src));
  }, [src]);
  if (!src || !ok) {
    return (
      <div className="grid h-full w-full place-items-center bg-[#3C3C3B]">
        <PanelsTopLeft className="h-10 w-10 text-white/50" strokeWidth={1.5} />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt=""
      onError={() => setOk(false)}
      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
    />
  );
}

function StatTile({ icon: Icon, label, value, index }) {
  return (
    <div className={`${cardCls} adm-rise flex items-center gap-4 p-5 hover:-translate-y-1`} style={stagger(index, 80)}>
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-[#2A317A]/10 text-[#2A317A]">
        <Icon className="h-6 w-6" strokeWidth={1.8} />
      </span>
      <div>
        <p className="text-base font-medium text-[#3C3C3B]">{label}</p>
        <p className="text-4xl font-bold leading-none text-black">
          <Count value={value} />
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* List                                                                */
/* ------------------------------------------------------------------ */

export function ProjectListPage() {
  const { projects, saveProject, deleteProject , setHomeProjects} = useMarketing();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  const shownCount = projects.filter((project) => project.published !== false).length;
  const homeList = useMemo(() => selectHomeProjects(projects), [projects]);
const homeIds = homeList.map((p) => String(p.id));

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return projects.filter((project) => {
      const shown = project.published !== false;
      if (filter === "shown" && !shown) return false;
      if (filter === "hidden" && shown) return false;
      if (!needle) return true;
      const title = projectDisplayTitle(project).toLowerCase();
      const category = String(project.category || "").toLowerCase();
      return title.includes(needle) || category.includes(needle);
    });
  }, [projects, query, filter]);

  useEffect(() => {
    setPage(1);
  }, [query, filter]);

  const paged = useMemo(() => paginateItems(visible, page, PER_PAGE), [visible, page]);

  return (
    <AdminPage>
      <PageHead
        kicker="WORKS"
        title="المشاريع"
        text="دي قائمة صفحة المشاريع. شريط المشاريع في أول الصفحة الرئيسية قائم لوحده."
      >
        <Link to={`${ADMIN_PROJECTS}/new`} className={`${btnPrimary} group`}>
          <Plus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90 motion-reduce:transition-none" />
          مشروع جديد
        </Link>
      </PageHead>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile icon={PanelsTopLeft} label="كل المشاريع" value={projects.length} index={0} />
        <StatTile icon={Eye} label="ظاهر" value={shownCount} index={1} />
        <StatTile icon={EyeOff} label="مخفي" value={projects.length - shownCount} index={2} />
      </div>
      <HomeShowcasePanel projects={projects} onChange={setHomeProjects} />

      <div className="adm-rise flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" style={stagger(3, 80)}>
        <div className="relative w-full sm:max-w-md">
          <Search className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#3C3C3B]/60" />
          <input
            className={`${fieldCls} !mt-0 ps-12`}
            placeholder="بحث بالاسم"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="inline-flex gap-1 self-start rounded-lg border border-[#3C3C3B]/15 bg-white p-1 shadow-sm" role="group" aria-label="الحالة">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-md px-4 py-2.5 text-base font-semibold transition-all duration-300 motion-reduce:transition-none ${
                filter === f.id ? "bg-[#2A317A] text-white shadow-sm" : "text-[#3C3C3B] hover:bg-[#2A317A]/10 hover:text-black"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className={`${cardCls} adm-pop grid place-items-center px-6 py-20 text-center`}>
          <span className="grid h-16 w-16 place-items-center rounded-xl bg-[#2A317A]/10 text-[#2A317A]">
            <PanelsTopLeft className="h-8 w-8" strokeWidth={1.6} />
          </span>
          <p className="mt-5 text-xl font-bold text-black">
            {projects.length === 0 ? "لا توجد مشاريع بعد" : "لا يوجد مشروع بهذا الاسم"}
          </p>
          <p className="mt-2 text-lg text-[#3C3C3B]">
            {projects.length === 0 ? "أضف مشروعًا جديدًا ليظهر في الموقع." : "جرّب كلمة تانية أو غيّر الفلتر."}
          </p>
        </div>
      ) : (
        <div key={`${filter}-${paged.page}-${query}`} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {paged.items.map((project, i) => {
            const done = finished(project.status);
            const shown = project.published !== false;
            const displayTitle = projectDisplayTitle(project);
            const homeIndex = homeIds.indexOf(String(project.id));
const onHome = homeIndex !== -1;
const toggleHome = () =>
  setHomeProjects(
    onHome
      ? homeList.filter((p) => String(p.id) !== String(project.id)).map((p) => p.id)
      : [...homeList.map((p) => p.id), project.id]
  );
            return (
              <article
                key={project.id}
                className="adm-pop group flex flex-col overflow-hidden rounded-xl border border-[#3C3C3B]/15 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                style={stagger(i)}
              >
                <div className="relative h-48 overflow-hidden">
                  <Cover src={project.src} />
                  {onHome && (
  <span className="adm-pop absolute bottom-3 start-3 inline-flex items-center gap-2 rounded-md bg-[#2A317A] px-3 py-1 text-sm font-bold text-white shadow-sm">
    <Star className="h-4 w-4 fill-white" />
    في الرئيسية
    <bdi dir="ltr">#{homeIndex + 1}</bdi>
  </span>
)}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute start-3 top-3 rounded-md bg-white px-3 py-1 text-sm font-bold text-black shadow-sm">
                    {project.category}
                  </span>
                  <span
                    className={`absolute end-3 top-3 inline-flex items-center gap-2 rounded-md px-3 py-1 text-sm font-bold shadow-sm ${
                      shown ? "bg-[#2A317A] text-white" : "bg-white text-[#3C3C3B]"
                    }`}
                  >
                    <span className={`h-2 w-2 rounded-full ${shown ? "bg-white" : "border-2 border-[#3C3C3B]"}`} />
                    {shown ? "ظاهر" : "مخفي"}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="line-clamp-2 text-xl font-bold leading-8 text-black">{displayTitle || "بدون اسم"}</h3>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <p
                      className={`inline-flex w-fit items-center gap-2 rounded-md px-3 py-1 text-base font-semibold ${
                        done ? "bg-black text-white" : "bg-[#2A317A]/10 text-[#2A317A]"
                      }`}
                    >
                      {done ? <CheckCircle2 className="h-4 w-4" /> : <Hammer className="h-4 w-4" />}
                      {done ? "منتهي" : "جارٍ"}
                    </p>
                    {projectHasLocation(project) && (
                      <p className="inline-flex w-fit items-center gap-2 rounded-md border border-[#3C3C3B]/20 px-3 py-1 text-base font-semibold text-[#3C3C3B]">
                        <MapPin className="h-4 w-4 text-[#2A317A]" />
                        الموقع محدد
                      </p>
                    )}
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    <Link to={editHref(project, projects)} className={btnSolid}>
                      <Pencil className="h-4 w-4" />
                      تعديل
                    </Link>
                    <button type="button" className={btnQuiet} onClick={() => saveProject({ ...project, published: !shown })}>
                      {shown ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      {shown ? "إخفاء" : "إظهار"}
                    </button>
                    <button
  type="button"
  className={btnQuiet}
  onClick={toggleHome}
  disabled={!onHome && (!shown || homeList.length >= MAX_HOME)}
  title={!shown && !onHome ? "أظهري المشروع الأول" : undefined}
>
  <Home className="h-4 w-4" />
  {onHome ? "إزالة من الرئيسية" : "للرئيسية"}
</button>


                    <button
                      type="button"
                      className={btnDanger}
                      onClick={() => {
                        if (window.confirm("إخفاء المشروع من الموقع بحذفه من قائمة الماركتنج؟")) {
                          deleteProject(project.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      حذف
                    </button>
                  </div>
                </div>
              </article>
            );

          })}
        </div>
      )}

      {visible.length > 0 && <Pagination page={paged.page} pageSize={PER_PAGE} total={visible.length} onChange={setPage} />}
    </AdminPage>
  );
}

/* ------------------------------------------------------------------ */
/* Editor                                                              */
/* ------------------------------------------------------------------ */

const MAX_SIDE = 1600;

/* Reads an image, shrinks it (max 1600px, JPEG) so many photos don't blow up storage. */
function readImageFile(file) {
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
        const scale = Math.min(1, MAX_SIDE / Math.max(img.width, img.height));
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
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.src = raw;
    };
    reader.readAsDataURL(file);
  });
}

/* ---------- story defaults ---------- */

const blankPair = () => pair("", "");
let seq = 0;
const nid = (prefix) => `${prefix}-${Date.now()}-${seq++}`;
const times = (n, make) => Array.from({ length: n }, make);

/* ids contain a 13-digit timestamp; used to know if an item was added a moment ago */
function idTime(id) {
  const part = String(id || "")
    .split("-")
    .find((s) => /^\d{13}$/.test(s));
  return part ? Number(part) : 0;
}

const newPoint = () => ({ id: nid("pt"), tag: blankPair(), title: blankPair(), text: blankPair() });
const newChallenge = () => ({ id: nid("ch"), title: blankPair(), subtitle: blankPair(), text: blankPair(), before: "", after: "" });
const newMilestone = () => ({ id: nid("ms"), title: blankPair(), text: blankPair() });
const newPhase = () => ({ id: nid("ph"), name: blankPair(), image: "" });

function emptyStory() {
  const head = () => ({ eyebrow: blankPair(), title: blankPair(), text: blankPair() });
  return {
    beginning: {
      eyebrow: blankPair(),
      title: blankPair(),
      stepTitle: blankPair(),
      pagerFrom: blankPair(),
      pagerTo: blankPair(),
      stateLabel: blankPair(),
      kicker: blankPair(),
      headline: blankPair(),
      text: blankPair(),
      listLabel: blankPair(),
      points: times(3, newPoint),
    },
    challenges: { ...head(), kicker: blankPair(), items: times(4, newChallenge) },
    transformation: { ...head(), before: "", after: "", milestones: times(3, newMilestone) },
    journey: {
      ...head(),
      sequenceLabel: blankPair(),
      completedLabel: blankPair(),
      stageLabel: blankPair(),
      stage: blankPair(),
      status: blankPair(),
      progress: 100,
      phases: times(4, newPhase),
    },
    gallery: head(),
  };
}

function withDefaults(base, saved) {
  const out = {};
  Object.keys(base).forEach((key) => {
    out[key] = { ...base[key], ...(saved && typeof saved === "object" ? saved[key] || {} : {}) };
  });
  return out;
}

function emptyProject(nextId) {
  return {
    id: nextId,
    title: "",
    titleAr: "",
    titleEn: "",
    status: "ongoing",
    category: projectCategories[0] || "Infrastructure",
    src: "",
    gallery: [],
    published: true,
    mapUrl: "",
    lat: "",
    lng: "",
  };
}

function prepareProject(source) {
  return {
    ...source,
    titleAr: source.titleAr || (typeof source.title === "object" ? source.title?.ar || "" : source.title || ""),
    titleEn: source.titleEn || (typeof source.title === "object" ? source.title?.en || "" : ""),
    title: typeof source.title === "string" ? source.title : source.titleAr || source.titleEn || "",
    gallery: Array.isArray(source.gallery) ? source.gallery : [],
    mapUrl: source.mapUrl || "",
    lat: source.lat ?? "",
    lng: source.lng ?? "",
    story: withDefaults(emptyStory(), source.story),
  };
}

function moveItem(list, index, direction) {
  const target = index + direction;
  if (target < 0 || target >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(index, 1);
  next.splice(target, 0, item);
  return next;
}

/* new items are added FIRST so they are right in front of the admin */
const listOps = (data, key, set) => ({
  update: (i, patch) => set({ [key]: data[key].map((x, idx) => (idx === i ? { ...x, ...patch } : x)) }),
  move: (i, d) => set({ [key]: moveItem(data[key], i, d) }),
  remove: (id) => set({ [key]: data[key].filter((x) => x.id !== id) }),
  add: (item) => set({ [key]: [item, ...data[key]] }),
});

const fieldsFor = (data, set) => (key, label, multiline = false, ph) => (
  <Bi key={key} label={label} value={data[key]} onChange={(v) => set({ [key]: v })} multiline={multiline} ph={ph} />
);

const iconBtn =
  "grid h-11 w-11 place-items-center rounded-lg border border-[#3C3C3B]/25 bg-white text-[#3C3C3B] transition-all duration-300 hover:border-[#2A317A] hover:bg-[#2A317A] hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-35 motion-reduce:transition-none";

/* ---------- building blocks ---------- */

function Bi({ label, value, onChange, multiline = false, ph }) {
  const cur = readPair(value);
  const Input = multiline ? "textarea" : "input";
  const extra = multiline ? " min-h-28" : "";
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <label className={labelCls}>
        {label} — عربي
        <Input className={`${fieldCls}${extra}`} value={cur.ar} onChange={(e) => onChange(pair(e.target.value, cur.en))} />
      </label>
      <label className={labelCls}>
        {label} — English
        <Input
          className={`${fieldCls}${extra}`}
          dir="ltr"
          placeholder={ph}
          value={cur.en}
          onChange={(e) => onChange(pair(cur.ar, e.target.value))}
        />
      </label>
    </div>
  );
}

function Section({ icon: Icon, title, index = 0, children }) {
  return (
    <section className={`${cardCls} adm-rise space-y-5 p-5 sm:p-7`} style={stagger(index, 40)}>
      {title && (
        <div className="flex items-center gap-3">
          {Icon && (
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#2A317A]/10 text-[#2A317A]">
              <Icon className="h-5 w-5" strokeWidth={1.8} />
            </span>
          )}
          <h3 className="text-xl font-bold text-black sm:text-2xl">{title}</h3>
        </div>
      )}
      {children}
    </section>
  );
}

function ListBlock({ icon: Icon = Layers, title, count, onAdd, index = 0, children }) {
  return (
    <div className="adm-rise space-y-4" style={stagger(index, 40)}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#2A317A]/10 text-[#2A317A]">
            <Icon className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <h3 className="text-xl font-bold text-black sm:text-2xl">{title}</h3>
          <span className="rounded-md bg-black px-2.5 py-0.5 text-sm font-bold text-white" dir="ltr">
            {count}
          </span>
        </div>
        <button type="button" className={`${btnQuiet} group`} onClick={onAdd}>
          <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90 motion-reduce:transition-none" />
          إضافة
        </button>
      </div>
      {count === 0 ? (
        <div className="adm-pop grid place-items-center rounded-xl border border-dashed border-[#3C3C3B]/40 bg-[#3C3C3B]/[0.04] px-6 py-10 text-center text-lg text-[#3C3C3B]">
          لا توجد عناصر بعد
        </div>
      ) : (
        <div className="space-y-4">{children}</div>
      )}
    </div>
  );
}

/* A card whose id was created in the last 2 seconds scrolls into view and glows for a moment. */
function ItemCard({ children, itemId, index, count, onMove, onRemove }) {
  const ref = useRef(null);
  const [fresh] = useState(() => {
    const ts = idTime(itemId);
    return ts > 0 && Date.now() - ts < 2000;
  });
  const [glow, setGlow] = useState(fresh);

  useEffect(() => {
    if (!fresh) return undefined;
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    const timer = setTimeout(() => setGlow(false), 2500);
    return () => clearTimeout(timer);
  }, [fresh]);

  return (
    <article
      ref={ref}
      className={`${cardCls} adm-pop group relative overflow-hidden p-5 transition-shadow duration-500 sm:p-6 ${
        glow ? "ring-2 ring-[#2A317A] ring-offset-2" : ""
      }`}
      style={stagger(index)}
    >
      <span className="absolute inset-y-0 start-0 w-1 origin-top scale-y-0 bg-[#2A317A] transition-transform duration-300 group-focus-within:scale-y-100 group-hover:scale-y-100 motion-reduce:transition-none" />
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="grid h-9 min-w-9 place-items-center rounded-md bg-[#2A317A]/10 px-2 text-base font-bold text-[#2A317A]" dir="ltr">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2">
          <button type="button" className={iconBtn} disabled={index === 0} onClick={() => onMove(-1)} aria-label="لفوق" title="لفوق">
            <ArrowUp className="h-5 w-5" />
          </button>
          <button type="button" className={iconBtn} disabled={index === count - 1} onClick={() => onMove(1)} aria-label="لتحت" title="لتحت">
            <ArrowDown className="h-5 w-5" />
          </button>
          <button
            type="button"
            className={btnDanger}
            onClick={() => {
              if (window.confirm("حذف العنصر ده؟")) onRemove();
            }}
          >
            <Trash2 className="h-4 w-4" />
            حذف
          </button>
        </div>
      </div>
      <div className="space-y-5">{children}</div>
    </article>
  );
}

/* ---------- image upload (no paths, ever) ---------- */

function ImageDrop({ value, onChange, onError, label, hint, aspect = "aspect-[4/3]" }) {
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
            <div className="absolute inset-0 flex items-end justify-end gap-2 bg-gradient-to-t from-black/60 via-transparent to-transparent p-3 opacity-100 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100 sm:opacity-0 motion-reduce:transition-none">
              <label
                htmlFor={inputId}
                title="استبدال الصورة"
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-lg bg-white text-black transition-colors hover:bg-[#2A317A] hover:text-white"
              >
                <Upload className="h-5 w-5" />
              </label>
              <button
                type="button"
                title="حذف الصورة"
                onClick={() => onChange("")}
                className="grid h-10 w-10 place-items-center rounded-lg bg-black text-white transition-colors hover:bg-[#2A317A]"
              >
                <Trash2 className="h-5 w-5" />
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

function ComparePreview({ before, after }) {
  const [pos, setPos] = useState(50);
  if (!before || !after) return null;
  return (
    <div className="adm-pop space-y-2">
      <p className="text-base font-semibold text-[#3C3C3B]">معاينة المقارنة — حرّكي الفاصل</p>
      <div dir="ltr" className="relative aspect-video select-none overflow-hidden rounded-xl bg-[#3C3C3B]">
        <img src={after} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <img src={before} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
        <span className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow" style={{ left: `${pos}%` }} />
        <span
          className="absolute top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-lg"
          style={{ left: `${pos}%` }}
        >
          <ArrowLeftRight className="h-5 w-5" />
        </span>
        <span className="absolute left-3 top-3 rounded-md bg-black/70 px-3 py-1 text-sm font-bold text-white">قبل</span>
        <span className="absolute right-3 top-3 rounded-md bg-[#2A317A] px-3 py-1 text-sm font-bold text-white">بعد</span>
        <input
          type="range"
          min="0"
          max="100"
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="مقارنة قبل وبعد"
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </div>
  );
}

function BeforeAfter({ before, after, onBefore, onAfter, onError }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <ImageDrop label="قبل" value={before} onChange={onBefore} onError={onError} aspect="aspect-video" />
        <ImageDrop label="بعد" value={after} onChange={onAfter} onError={onError} aspect="aspect-video" />
      </div>
      <ComparePreview before={before} after={after} />
    </div>
  );
}

function GalleryManager({ items, onChange, onError }) {
  const inputId = useId();
  const [over, setOver] = useState(false);
  const [busy, setBusy] = useState(false);

  const add = async (fileList) => {
    const files = Array.from(fileList || []).filter((file) => file.type.startsWith("image/"));
    if (!files.length) return;
    setBusy(true);
    try {
      const urls = await Promise.all(files.map(readImageFile));
      onChange([...urls, ...items]); // newest photos first
    } catch (err) {
      onError?.(err.message || "تعذر قراءة الملف.");
    }
    setBusy(false);
  };

  return (
    <div className="space-y-5">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          add(e.dataTransfer.files);
        }}
        className={`group relative rounded-xl border-2 transition-all duration-300 focus-within:border-[#2A317A] motion-reduce:transition-none ${
          over ? "border-solid border-[#2A317A] bg-[#2A317A]/10" : "border-dashed border-[#3C3C3B]/40 bg-[#3C3C3B]/[0.04] hover:border-[#2A317A]"
        }`}
      >
        <label htmlFor={inputId} className="flex cursor-pointer flex-col items-center justify-center gap-2 px-4 py-10 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-xl bg-[#2A317A]/10 text-[#2A317A] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 motion-reduce:transition-none">
            <ImagePlus className="h-7 w-7" />
          </span>
          <span className="text-lg font-bold text-black">{busy ? "جارٍ تجهيز الصور..." : "اسحبي صور المعرض هنا أو اضغطي للرفع"}</span>
          <span className="text-base text-[#3C3C3B]">تقدري تختاري أكتر من صورة مرة واحدة</span>
        </label>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(e) => {
            add(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {items.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {items.map((src, index) => (
            <figure
              key={`${index}-${src.slice(-32)}`}
              className="adm-pop group relative aspect-[4/3] overflow-hidden rounded-lg bg-[#3C3C3B]"
              style={stagger(index)}
            >
              <img src={src} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none" />
              <span className="absolute start-2 top-2 grid h-8 min-w-8 place-items-center rounded-md bg-black/75 px-2 text-sm font-bold text-white">
                <bdi dir="ltr">{String(index + 1).padStart(2, "0")}</bdi>
              </span>
              <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1.5 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-100 transition-opacity duration-300 group-hover:opacity-100 sm:opacity-0 motion-reduce:transition-none">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => onChange(moveItem(items, index, -1))}
                  title="تقديم"
                  className="grid h-9 w-9 place-items-center rounded-md bg-white text-black transition-colors hover:bg-[#2A317A] hover:text-white disabled:pointer-events-none disabled:opacity-35"
                >
                  <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
                </button>
                <button
                  type="button"
                  disabled={index === items.length - 1}
                  onClick={() => onChange(moveItem(items, index, 1))}
                  title="تأخير"
                  className="grid h-9 w-9 place-items-center rounded-md bg-white text-black transition-colors hover:bg-[#2A317A] hover:text-white disabled:pointer-events-none disabled:opacity-35"
                >
                  <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => onChange(items.filter((_, i) => i !== index))}
                  title="حذف"
                  className="grid h-9 w-9 place-items-center rounded-md bg-black text-white transition-colors hover:bg-[#2A317A]"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- location ---------- */

function LocationSection({ project, onChange, index = 0 }) {
  const latText = String(project.lat ?? "");
  const lngText = String(project.lng ?? "");
  const lat = parseCoord(latText, 90);
  const lng = parseCoord(lngText, 180);
  const latBad = hasText(latText) && lat === null;
  const lngBad = hasText(lngText) && lng === null;
  const hasPoint = lat !== null && lng !== null;
  const urlBad = hasText(project.mapUrl) && !isHttp(project.mapUrl);
  const openHref = hasText(project.mapUrl) && !urlBad ? project.mapUrl.trim() : hasPoint ? `https://www.google.com/maps?q=${lat},${lng}` : "";
  const filled = hasText(project.mapUrl) || hasText(latText) || hasText(lngText);

  const onUrl = (value) => {
    const found = extractCoords(value);
    onChange(found ? { mapUrl: value, lat: found.lat, lng: found.lng } : { mapUrl: value });
  };

  // pasting "30.0444, 31.2357" into the latitude box fills both boxes
  const onLatPaste = (event) => {
    const text = event.clipboardData?.getData("text") || "";
    const m = text.match(/^\s*(-?\d+(?:\.\d+)?)\s*[,،;]\s*(-?\d+(?:\.\d+)?)\s*$/);
    if (m) {
      event.preventDefault();
      onChange({ lat: m[1], lng: m[2] });
    }
  };

  const errCls = "border-black ring-1 ring-black";

  return (
    <Section icon={MapPin} title="موقع المشروع" index={index}>
      <p className="-mt-2 text-base leading-7 text-[#3C3C3B]">
        الصقي رابط الموقع من Google Maps، أو اكتبي الإحداثيات. لو الرابط فيه إحداثيات هتتملى لوحدها.
      </p>

      <label className={labelCls}>
        رابط الموقع (Google Maps)
        <input
          type="url"
          dir="ltr"
          inputMode="url"
          placeholder="https://www.google.com/maps/..."
          className={`${fieldCls} ${urlBad ? errCls : ""}`}
          value={project.mapUrl || ""}
          onChange={(e) => onUrl(e.target.value)}
        />
        {urlBad && <span className="mt-1 block text-sm font-semibold text-black">الرابط لازم يبدأ بـ https://</span>}
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelCls}>
          خط العرض (Latitude)
          <input
            dir="ltr"
            inputMode="decimal"
            placeholder="30.0444"
            className={`${fieldCls} ${latBad ? errCls : ""}`}
            value={latText}
            onPaste={onLatPaste}
            onChange={(e) => onChange({ lat: e.target.value })}
          />
          {latBad && <span className="mt-1 block text-sm font-semibold text-black">رقم بين -90 و 90</span>}
        </label>
        <label className={labelCls}>
          خط الطول (Longitude)
          <input
            dir="ltr"
            inputMode="decimal"
            placeholder="31.2357"
            className={`${fieldCls} ${lngBad ? errCls : ""}`}
            value={lngText}
            onChange={(e) => onChange({ lng: e.target.value })}
          />
          {lngBad && <span className="mt-1 block text-sm font-semibold text-black">رقم بين -180 و 180</span>}
        </label>
      </div>

      {hasText(project.mapUrl) && !hasPoint && !urlBad && (
        <p className="text-sm leading-6 text-[#3C3C3B]">
          الرابط ده مفيهوش إحداثيات ظاهرة (زي الروابط المختصرة). هيشتغل كرابط، ولو عايزة معاينة الخريطة اكتبي الإحداثيات.
        </p>
      )}

      {hasPoint && (
        <div className="adm-pop overflow-hidden rounded-xl border border-[#3C3C3B]/15 bg-[#3C3C3B]">
          <iframe
            key={`${lat},${lng}`}
            title="معاينة موقع المشروع"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="aspect-video w-full border-0"
            src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
          />
        </div>
      )}

      {filled && (
        <div className="flex flex-wrap gap-2">
          {openHref && (
            <a href={openHref} target="_blank" rel="noopener noreferrer" className={btnQuiet}>
              <ExternalLink className="h-4 w-4" />
              فتح في الخريطة
            </a>
          )}
          <button type="button" className={btnDanger} onClick={() => onChange({ mapUrl: "", lat: "", lng: "" })}>
            <X className="h-4 w-4" />
            مسح الموقع
          </button>
        </div>
      )}
    </Section>
  );
}

/* ---------- story tabs ---------- */

function BeginningTab({ data, set }) {
  const field = fieldsFor(data, set);
  const ops = listOps(data, "points", set);
  return (
    <div className="space-y-6">
      <Section icon={Flag} title="عنوان القسم" index={0}>
        {field("eyebrow", "العنوان الصغير", false, "THE BEGINNING")}
        {field("title", "العنوان الرئيسي", false, "Where The Journey Began")}
        {field("stepTitle", "اسم الخطوة", false, "Starting Point")}
        {field("pagerFrom", "زر التنقل (من)", false, "Starting Point")}
        {field("pagerTo", "زر التنقل (إلى)", false, "The Vision")}
      </Section>

      <Section icon={Mountain} title="الحالة الحالية" index={1}>
        {field("stateLabel", "الوسم", false, "CURRENT STATE")}
        {field("kicker", "العنوان الفرعي", false, "WHERE WE START")}
        {field("headline", "العنوان", false, "A Site With Potential")}
        {field("text", "الوصف", true)}
        {field("listLabel", "عنوان النقاط", false, "THE STARTING POINT")}
      </Section>

      <ListBlock title="نقاط البداية" count={data.points.length} index={2} onAdd={() => ops.add(newPoint())}>
        {data.points.map((p, i) => (
          <ItemCard key={p.id} itemId={p.id} index={i} count={data.points.length} onMove={(d) => ops.move(i, d)} onRemove={() => ops.remove(p.id)}>
            <Bi label="الوسم" ph="TODAY" value={p.tag} onChange={(tag) => ops.update(i, { tag })} />
            <Bi label="العنوان" ph="Disconnected" value={p.title} onChange={(title) => ops.update(i, { title })} />
            <Bi label="الوصف" multiline value={p.text} onChange={(text) => ops.update(i, { text })} />
          </ItemCard>
        ))}
      </ListBlock>
    </div>
  );
}

function ChallengesTab({ data, set, onError }) {
  const field = fieldsFor(data, set);
  const ops = listOps(data, "items", set);
  return (
    <div className="space-y-6">
      <Section icon={Mountain} title="عنوان القسم" index={0}>
        {field("eyebrow", "العنوان الصغير", false, "02 / Project Story")}
        {field("title", "العنوان الرئيسي", false, "The Challenges")}
        {field("kicker", "الجملة التمهيدية", false, "EVERY PROJECT STARTS WITH A CHALLENGE.")}
        {field("text", "الوصف", true)}
      </Section>

      <ListBlock icon={Mountain} title="التحديات" count={data.items.length} index={1} onAdd={() => ops.add(newChallenge())}>
        {data.items.map((c, i) => (
          <ItemCard key={c.id} itemId={c.id} index={i} count={data.items.length} onMove={(d) => ops.move(i, d)} onRemove={() => ops.remove(c.id)}>
            <Bi label="اسم التحدي" ph="Site Conditions" value={c.title} onChange={(title) => ops.update(i, { title })} />
            <Bi label="جملة قصيرة" ph="Every site has a story of its own." value={c.subtitle} onChange={(subtitle) => ops.update(i, { subtitle })} />
            <Bi label="الشرح" multiline value={c.text} onChange={(text) => ops.update(i, { text })} />
            <BeforeAfter
              before={c.before}
              after={c.after}
              onBefore={(before) => ops.update(i, { before })}
              onAfter={(after) => ops.update(i, { after })}
              onError={onError}
            />
          </ItemCard>
        ))}
      </ListBlock>
    </div>
  );
}

function TransformationTab({ data, set, onError }) {
  const field = fieldsFor(data, set);
  const ops = listOps(data, "milestones", set);
  return (
    <div className="space-y-6">
      <Section icon={ArrowLeftRight} title="قبل وبعد" index={0}>
        {field("eyebrow", "العنوان الصغير", false, "Transformation")}
        {field("title", "العنوان الرئيسي", false, "See The Difference")}
        {field("text", "الوصف", true, "Drag the divider to compare the site before and after construction.")}
        <BeforeAfter
          before={data.before}
          after={data.after}
          onBefore={(before) => set({ before })}
          onAfter={(after) => set({ after })}
          onError={onError}
        />
      </Section>

      <ListBlock title="محطات الإنجاز" count={data.milestones.length} index={1} onAdd={() => ops.add(newMilestone())}>
        {data.milestones.map((m, i) => (
          <ItemCard key={m.id} itemId={m.id} index={i} count={data.milestones.length} onMove={(d) => ops.move(i, d)} onRemove={() => ops.remove(m.id)}>
            <Bi label="العنوان" ph="Structural completion" value={m.title} onChange={(title) => ops.update(i, { title })} />
            <Bi label="الوصف" multiline value={m.text} onChange={(text) => ops.update(i, { text })} />
          </ItemCard>
        ))}
      </ListBlock>
    </div>
  );
}

function JourneyTab({ data, set, onError }) {
  const field = fieldsFor(data, set);
  const ops = listOps(data, "phases", set);
  const progress = Math.min(100, Math.max(0, Number(data.progress) || 0));
  return (
    <div className="space-y-6">
      <Section icon={Route} title="عنوان القسم" index={0}>
        {field("eyebrow", "العنوان الصغير", false, "The Construction Journey")}
        {field("title", "العنوان الرئيسي", false, "From Ground To Completion")}
        {field("text", "الوصف", true)}
      </Section>

      <Section icon={CheckCircle2} title="لوحة الحالة" index={1}>
        {field("sequenceLabel", "عنوان اللوحة", false, "Construction Sequence")}
        {field("completedLabel", "نص الاكتمال", false, "Project Completed")}
        {field("stageLabel", "عنوان المرحلة", false, "Current Stage")}
        {field("stage", "المرحلة الحالية", false, "Finishing & Delivery")}
        {field("status", "الحالة", false, "In Progress")}
        <div>
          <div className="flex items-end justify-between">
            <p className="text-base font-semibold text-[#3C3C3B]">نسبة الإنجاز</p>
            <p className="text-4xl font-bold leading-none text-black" dir="ltr">
              {progress}%
            </p>
          </div>
          <div className="mt-3">
            <Bar value={progress} max={100} />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => set({ progress: Number(e.target.value) })}
            aria-label="نسبة الإنجاز"
            className="mt-3 w-full cursor-pointer accent-[#2A317A]"
          />
        </div>
      </Section>

      <ListBlock icon={Route} title="مراحل التنفيذ" count={data.phases.length} index={2} onAdd={() => ops.add(newPhase())}>
        {data.phases.map((p, i) => (
          <ItemCard key={p.id} itemId={p.id} index={i} count={data.phases.length} onMove={(d) => ops.move(i, d)} onRemove={() => ops.remove(p.id)}>
            <Bi label="اسم المرحلة" ph="Pre-Construction" value={p.name} onChange={(name) => ops.update(i, { name })} />
            <ImageDrop label="صورة المرحلة" value={p.image} onChange={(image) => ops.update(i, { image })} onError={onError} aspect="aspect-video" />
          </ItemCard>
        ))}
      </ListBlock>
    </div>
  );
}

function GalleryTab({ data, set, gallery, onGallery, onError }) {
  const field = fieldsFor(data, set);
  return (
    <div className="space-y-6">
      <Section icon={Images} title="عنوان القسم" index={0}>
        {field("eyebrow", "العنوان الصغير", false, "The Result, In Frames")}
        {field("title", "العنوان الرئيسي", false, "Project Gallery")}
        {field("text", "الوصف", true)}
      </Section>
      <Section icon={Images} title={`صور المعرض (${gallery.length})`} index={1}>
        <GalleryManager items={gallery} onChange={onGallery} onError={onError} />
      </Section>
    </div>
  );
}

/* ---------- page ---------- */

const TABS = [
  { id: "basics", label: "الأساسيات", icon: FileText },
  { id: "beginning", label: "البداية", icon: Flag },
  { id: "challenges", label: "التحديات", icon: Mountain },
  { id: "transformation", label: "قبل وبعد", icon: ArrowLeftRight },
  { id: "journey", label: "رحلة التنفيذ", icon: Route },
  { id: "gallery", label: "المعرض", icon: Images },
];

export function ProjectEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, saveProject } = useMarketing();
  const existing = id === "new" ? null : findProject(projects, id);
  const slug = existing ? projectSlug(existing, projects) : null;
  const nextId = projects.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
  const [project, setProject] = useState(() => prepareProject(existing || emptyProject(nextId)));
  const [tab, setTab] = useState("basics");
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const found = id === "new" ? null : findProject(projects, id);
    const freshId = projects.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
    setProject(prepareProject(found || emptyProject(freshId)));
    setDirty(false);
    setError("");
  }, [id, projects]);

  // old links like /projects/1 are rewritten to /projects/<project-name>
  useEffect(() => {
    if (slug && id !== slug) navigate(`${ADMIN_PROJECTS}/${encodeURIComponent(slug)}`, { replace: true });
  }, [slug, id, navigate]);

  if (id !== "new" && !existing) {
    return (
      <AdminPage>
        <div className={`${cardCls} adm-pop px-6 py-16 text-center`}>
          <p className="text-2xl font-bold text-black">المشروع غير موجود.</p>
          <Link to={ADMIN_PROJECTS} className="mt-4 inline-flex items-center gap-2 text-lg font-semibold text-[#2A317A] hover:underline">
            <ArrowRight className="h-5 w-5" />
            رجوع للمشاريع
          </Link>
        </div>
      </AdminPage>
    );
  }

  const touch = (updater) => {
    setDirty(true);
    setProject(updater);
  };
  const patchProject = (patch) => touch((cur) => ({ ...cur, ...patch }));
  const sectionSetter = (name) => (patch) =>
    touch((cur) => ({ ...cur, story: { ...cur.story, [name]: { ...cur.story[name], ...patch } } }));
  const onError = (message) => {
    setError(message);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const discard = () => {
    setProject(prepareProject(existing || emptyProject(nextId)));
    setDirty(false);
    setError("");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const titleAr = String(project.titleAr || "").trim();
    const titleEn = String(project.titleEn || "").trim();
    const fallback = titleAr || titleEn;
    if (!fallback) {
      setTab("basics");
      onError("اكتب اسم المشروع بالعربي أو الإنجليزي.");
      return;
    }

    const mapUrl = String(project.mapUrl || "").trim();
    const lat = parseCoord(project.lat, 90);
    const lng = parseCoord(project.lng, 180);
    if (mapUrl && !isHttp(mapUrl)) {
      setTab("basics");
      onError("رابط الموقع لازم يبدأ بـ https://");
      return;
    }
    if ((hasText(project.lat) && lat === null) || (hasText(project.lng) && lng === null)) {
      setTab("basics");
      onError("الإحداثيات غير صحيحة: خط العرض بين -90 و 90، وخط الطول بين -180 و 180.");
      return;
    }
    if (hasText(project.lat) !== hasText(project.lng)) {
      setTab("basics");
      onError("اكتبي خط العرض وخط الطول مع بعض.");
      return;
    }

    // the slug is fixed the first time the project is saved, so its link never breaks when it is renamed
    const finalSlug = existing
      ? projectSlug(existing, projects)
      : projectSlug({ ...project, titleAr, titleEn, slug: "" }, projects);

    saveProject({
      ...project,
      slug: finalSlug,
      title: fallback,
      titleAr,
      titleEn,
      gallery: (project.gallery || []).filter(Boolean),
      src: String(project.src || "").trim(),
      published: project.published !== false,
      mapUrl,
      lat: lat ?? "",
      lng: lng ?? "",
    });
    navigate(ADMIN_PROJECTS);
  };

  const isShown = project.published !== false;
  const story = project.story;

  let content;
  if (tab === "basics") {
    content = (
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="min-w-0 space-y-6 lg:col-span-2">
          <Section icon={FileText} title="اسم المشروع" index={0}>
            <div className="grid gap-4 md:grid-cols-2">
              <label className={labelCls}>
                اسم المشروع بالعربي
                <input
                  className={fieldCls}
                  value={project.titleAr || ""}
                  onChange={(e) => patchProject({ titleAr: e.target.value, title: e.target.value || project.titleEn || "" })}
                />
              </label>
              <label className={labelCls}>
                اسم المشروع بالإنجليزي
                <input
                  className={fieldCls}
                  dir="ltr"
                  value={project.titleEn || ""}
                  onChange={(e) => patchProject({ titleEn: e.target.value, title: project.titleAr || e.target.value || "" })}
                />
              </label>
            </div>
          </Section>
          <Section icon={ImagePlus} title="صورة الغلاف" index={1}>
            <ImageDrop value={project.src} onChange={(src) => patchProject({ src })} onError={onError} aspect="aspect-video" hint="بتظهر في قائمة المشاريع وفي أول الصفحة" />
          </Section>
          <LocationSection project={project} onChange={patchProject} index={2} />
        </div>
        <div className="min-w-0 space-y-6">
          <Section icon={Eye} title="النشر" index={1}>
            <Toggle checked={isShown} onChange={(checked) => patchProject({ published: checked })}>
              <span className="flex items-center gap-3">
                {isShown ? <CheckCircle2 className="h-6 w-6 text-[#2A317A]" /> : <EyeOff className="h-6 w-6 text-[#3C3C3B]" />}
                {isShown ? "ظاهر في صفحة المشاريع" : "مخفي عن الموقع"}
              </span>
            </Toggle>
          </Section>
          <Section icon={Hammer} title="التفاصيل" index={2}>
            <label className={labelCls}>
              التصنيف
              <select className={fieldCls} value={project.category} onChange={(e) => patchProject({ category: e.target.value })}>
                {projectCategories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label className={labelCls}>
              حالة التنفيذ
              <select className={fieldCls} value={project.status} onChange={(e) => patchProject({ status: e.target.value })}>
                <option value="ongoing">جارٍ</option>
                <option value="Finished">منتهي</option>
              </select>
            </label>
          </Section>
        </div>
      </div>
    );
  } else if (tab === "beginning") {
    content = <BeginningTab data={story.beginning} set={sectionSetter("beginning")} />;
  } else if (tab === "challenges") {
    content = <ChallengesTab data={story.challenges} set={sectionSetter("challenges")} onError={onError} />;
  } else if (tab === "transformation") {
    content = <TransformationTab data={story.transformation} set={sectionSetter("transformation")} onError={onError} />;
  } else if (tab === "journey") {
    content = <JourneyTab data={story.journey} set={sectionSetter("journey")} onError={onError} />;
  } else {
    content = (
      <GalleryTab
        data={story.gallery}
        set={sectionSetter("gallery")}
        gallery={project.gallery}
        onGallery={(gallery) => patchProject({ gallery })}
        onError={onError}
      />
    );
  }

  return (
    <AdminPage as="form" onSubmit={onSubmit}>
      <PageHead
        kicker="PROJECT"
        title={existing ? "تعديل مشروع" : "مشروع جديد"}
        text={existing ? projectDisplayTitle(existing) || undefined : undefined}
      >
        <Link to={ADMIN_PROJECTS} className={`${btnQuiet} !px-5 !py-3 !text-lg`}>
          <ArrowRight className="h-5 w-5" />
          رجوع
        </Link>
        <button type="submit" className={btnPrimary}>
          <Save className="h-5 w-5" />
          حفظ
        </button>
      </PageHead>

      <UnsavedBar show={dirty} onDiscard={discard} />

      {error && (
        <p className="adm-pop rounded-xl border border-[#2A317A]/40 bg-[#2A317A]/10 px-5 py-4 text-lg font-semibold text-[#2A317A]" role="alert">
          {error}
        </p>
      )}

      <div className="adm-rise flex gap-1 overflow-x-auto rounded-xl border border-[#3C3C3B]/15 bg-white p-1.5 shadow-sm" role="tablist">
        {TABS.map((item) => {
          const Icon = item.icon;
          const on = tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setTab(item.id)}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-3 text-base font-semibold transition-all duration-300 motion-reduce:transition-none ${
                on ? "bg-[#2A317A] text-white shadow-sm" : "text-[#3C3C3B] hover:bg-[#2A317A]/10 hover:text-black"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </div>

      <div key={tab}>{content}</div>
    </AdminPage>
  );
}