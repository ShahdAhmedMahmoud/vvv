
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  AlignLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock,
  Eye,
  EyeOff,
  FileText,
  ImagePlus,
  Newspaper,
  Pencil,
  Plus,
  Save,
  Search,
  Trash2,
} from "lucide-react";
import { newsCategories } from "../../../features/news/newsData";
import { useMarketing } from "../../../features/marketing/MarketingProvider";
import Pagination, { paginateItems } from "./Pagination";
import {
  AdminPage,
  Count,
  ImageDrop,
  PageHead,
  Toggle,
  btnDanger,
  btnPrimary,
  btnQuiet,
  btnSolid,
  cardCls,
  fieldCls,
  labelCls,
  stagger,
} from "../../../ui/adminUi";

const categories = newsCategories.filter((item) => item.id !== "all");
const PER_PAGE = 12; // divisible by 1, 2 and 3 columns -> no orphan cards

const FILTERS = [
  { id: "all", label: "الكل" },
  { id: "published", label: "منشور" },
  { id: "hidden", label: "مخفي" },
];

function emptyStory() {
  return {
    id: "",
    category: categories[0]?.id || "projects",
    date: new Date().toISOString().slice(0, 10),
    readTime: 3,
    image: "",
    imageAlt: { en: "", ar: "" },
    title: { en: "", ar: "" },
    excerpt: { en: "", ar: "" },
    body: { en: "", ar: "" },
    published: true,
  };
}

function normalizeStory(story) {
  if (!story) return emptyStory();
  return {
    ...emptyStory(),
    ...story,
    imageAlt: { en: story.imageAlt?.en || "", ar: story.imageAlt?.ar || "" },
    title: { en: story.title?.en || "", ar: story.title?.ar || "" },
    excerpt: { en: story.excerpt?.en || "", ar: story.excerpt?.ar || "" },
    body: { en: story.body?.en || "", ar: story.body?.ar || "" },
    published: story.published !== false,
  };
}

function Thumb({ src }) {
  const [ok, setOk] = useState(Boolean(src));
  useEffect(() => {
    setOk(Boolean(src));
  }, [src]);
  if (!src || !ok) {
    return (
      <div className="grid h-full w-full place-items-center bg-[#3C3C3B]">
        <Newspaper className="h-10 w-10 text-white/50" strokeWidth={1.5} />
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

function categoryLabel(id) {
  return categories.find((item) => item.id === id)?.ar || id;
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
/* List                                                                */
/* ------------------------------------------------------------------ */

export function NewsListPage() {
  const { news, saveNews, deleteNews } = useMarketing();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const publishedCount = news.filter((story) => story.published !== false).length;

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return news.filter((story) => {
      const published = story.published !== false;
      if (status === "published" && !published) return false;
      if (status === "hidden" && published) return false;
      if (!needle) return true;
      const title = `${story.title?.ar || ""} ${story.title?.en || ""}`.toLowerCase();
      const category = categoryLabel(story.category).toLowerCase();
      return title.includes(needle) || category.includes(needle) || String(story.date || "").includes(needle);
    });
  }, [news, query, status]);

  useEffect(() => {
    setPage(1);
  }, [query, status]);

  const paged = useMemo(() => paginateItems(visible, page, PER_PAGE), [visible, page]);

  return (
    <AdminPage>
      <PageHead kicker="Al Shorouk/ STORIES" title="الأخبار" text="اللي منشور هنا هو اللي ظاهر في صفحة الأخبار.">
        <Link to="/admin/marketing/news/new" className={`${btnPrimary} group`}>
          <Plus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90 motion-reduce:transition-none" />
          خبر جديد
        </Link>
      </PageHead>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <StatTile icon={Newspaper} label="كل الأخبار" value={news.length} index={0} />
        <StatTile icon={Eye} label="منشور" value={publishedCount} index={1} />
        <StatTile icon={EyeOff} label="مخفي" value={news.length - publishedCount} index={2} />
      </div>

      <div className="adm-rise flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" style={stagger(3, 80)}>
        <div className="relative w-full sm:max-w-md">
          <Search className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#3C3C3B]/60" />
          <input
            className={`${fieldCls} !mt-0 ps-12`}
            placeholder="بحث في الأخبار"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="flex w-full gap-1 rounded-lg border border-[#3C3C3B]/15 bg-white p-1 shadow-sm sm:inline-flex sm:w-auto" role="group" aria-label="الحالة">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={status === f.id}
              onClick={() => setStatus(f.id)}
              className={`flex-1 rounded-md px-4 py-2.5 text-base font-semibold transition-all duration-300 motion-reduce:transition-none sm:flex-none ${
                status === f.id ? "bg-[#2A317A] text-white shadow-sm" : "text-[#3C3C3B] hover:bg-[#2A317A]/10 hover:text-black"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className={`${cardCls} adm-pop grid place-items-center px-6 py-16 text-center sm:py-20`}>
          <span className="grid h-16 w-16 place-items-center rounded-xl bg-[#2A317A]/10 text-[#2A317A]">
            <Newspaper className="h-8 w-8" strokeWidth={1.6} />
          </span>
          <p className="mt-5 text-xl font-bold text-black">{news.length === 0 ? "لا توجد أخبار بعد" : "لا نتائج لهذا البحث"}</p>
          <p className="mt-2 text-lg text-[#3C3C3B]">
            {news.length === 0 ? "أضف خبرًا جديدًا ليظهر في الموقع." : "جرّب كلمة تانية أو غيّر الفلتر."}
          </p>
        </div>
      ) : (
        <div key={`${status}-${paged.page}-${query}`} className="grid gap-5 sm:gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {paged.items.map((story, i) => {
            const published = story.published !== false;
            return (
              <article
                key={story.id}
                className="adm-pop group flex flex-col overflow-hidden rounded-xl border border-[#3C3C3B]/15 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg motion-reduce:transition-none"
                style={stagger(i)}
              >
                <div className="relative aspect-[16/9] overflow-hidden sm:h-48 sm:aspect-auto">
                  <Thumb src={story.image} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute start-3 top-3 rounded-md bg-white px-3 py-1 text-sm font-bold text-black shadow-sm">
                    {categoryLabel(story.category)}
                  </span>
                  <span
                    className={`absolute end-3 top-3 inline-flex items-center gap-2 rounded-md px-3 py-1 text-sm font-bold shadow-sm ${
                      published ? "bg-[#2A317A] text-white" : "bg-white text-[#3C3C3B]"
                    }`}
                  >
                    <span className={`h-2 w-2 rounded-full ${published ? "bg-white" : "border-2 border-[#3C3C3B]"}`} />
                    {published ? "منشور" : "مخفي"}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h3 className="line-clamp-2 text-lg font-bold leading-8 text-black sm:text-xl">
                    {story.title?.ar || story.title?.en || "بدون عنوان"}
                  </h3>
                  <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-base text-[#3C3C3B]">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4" />
                      <span dir="ltr">{story.date}</span>
                    </span>
                    {story.readTime ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {story.readTime} د
                      </span>
                    ) : null}
                  </p>
                  {(story.excerpt?.ar || story.excerpt?.en) && (
                    <p className="mt-3 line-clamp-3 text-base leading-7 text-[#3C3C3B]">{story.excerpt?.ar || story.excerpt?.en}</p>
                  )}

                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    <Link to={`/admin/marketing/news/${story.id}`} className={`${btnSolid} grow sm:grow-0`}>
                      <Pencil className="h-4 w-4" />
                      تعديل
                    </Link>
                    <button type="button" className={`${btnQuiet} grow sm:grow-0`} onClick={() => saveNews({ ...story, published: !published })}>
                      {published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      {published ? "إخفاء" : "نشر"}
                    </button>
                    <button
                      type="button"
                      className={`${btnDanger} grow sm:grow-0`}
                      onClick={() => {
                        if (window.confirm("حذف هذا الخبر؟")) deleteNews(story.id);
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

function Section({ icon: Icon, title, children, index = 0 }) {
  return (
    <section className={`${cardCls} adm-rise space-y-5 p-5 sm:p-7`} style={stagger(index, 60)}>
      <div className="flex items-center gap-3">
        {Icon && (
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#2A317A]/10 text-[#2A317A]">
            <Icon className="h-5 w-5" strokeWidth={1.8} />
          </span>
        )}
        <h3 className="text-xl font-bold text-black sm:text-2xl">{title}</h3>
      </div>
      {children}
    </section>
  );
}

export function NewsEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { news, saveNews } = useMarketing();
  const existing = id === "new" ? null : news.find((item) => item.id === id);
  const [story, setStory] = useState(() => normalizeStory(existing));
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const found = id === "new" ? null : news.find((item) => item.id === id);
    setStory(normalizeStory(found));
    setDirty(false);
    setError("");
  }, [id, news]);

  if (id !== "new" && !existing) {
    return (
      <AdminPage>
        <div className={`${cardCls} adm-pop px-6 py-16 text-center`}>
          <p className="text-2xl font-bold text-black">الخبر غير موجود.</p>
          <Link to="/admin/marketing/news" className="mt-4 inline-flex items-center gap-2 text-lg font-semibold text-[#2A317A] hover:underline">
            <ArrowRight className="h-5 w-5" />
            رجوع للأخبار
          </Link>
        </div>
      </AdminPage>
    );
  }

  const patch = (changes) => {
    setDirty(true);
    setStory((current) => ({ ...current, ...changes }));
  };
  const setText = (group, key, value) => {
    setDirty(true);
    setStory((current) => ({ ...current, [group]: { ...current[group], [key]: value } }));
  };
  const onError = (message) => {
    setError(message);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!String(story.title.ar || "").trim() && !String(story.title.en || "").trim()) {
      onError("اكتب عنوانًا بالعربي أو بالإنجليزي.");
      return;
    }
    const nextId = existing?.id || `story-${Date.now()}`;
    saveNews({
      ...story,
      id: nextId,
      readTime: Number(story.readTime) || 1,
      image: String(story.image || "").trim(),
      title: { ar: String(story.title.ar || "").trim(), en: String(story.title.en || "").trim() },
      excerpt: { ar: String(story.excerpt.ar || "").trim(), en: String(story.excerpt.en || "").trim() },
      body: { ar: String(story.body.ar || "").trim(), en: String(story.body.en || "").trim() },
      imageAlt: { ar: String(story.imageAlt.ar || "").trim(), en: String(story.imageAlt.en || "").trim() },
      published: story.published !== false,
    });
    navigate("/admin/marketing/news");
  };

  const isPublished = story.published !== false;

  return (
    <AdminPage as="form" onSubmit={onSubmit}>
      <PageHead kicker="Al Shorouk/ EDITOR" title={existing ? "تعديل خبر" : "خبر جديد"}>
        <Link to="/admin/marketing/news" className={`${btnQuiet} !px-5 !py-3 !text-lg`}>
          <ArrowRight className="h-5 w-5" />
          رجوع
        </Link>
        <button type="submit" className={btnPrimary}>
          <Save className="h-5 w-5" />
          حفظ
        </button>
      </PageHead>

      {error && (
        <p className="adm-pop rounded-xl border border-[#2A317A]/40 bg-[#2A317A]/10 px-5 py-4 text-lg font-semibold text-[#2A317A]" role="alert">
          {error}
        </p>
      )}

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Content */}
        <div className="min-w-0 space-y-6 xl:col-span-2">
          <Section icon={Newspaper} title="العنوان" index={0}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelCls}>
                العنوان بالعربي
                <input className={fieldCls} value={story.title.ar} onChange={(e) => setText("title", "ar", e.target.value)} />
              </label>
              <label className={labelCls}>
                العنوان بالإنجليزي
                <input className={fieldCls} dir="ltr" value={story.title.en} onChange={(e) => setText("title", "en", e.target.value)} />
              </label>
            </div>
          </Section>

          <Section icon={AlignLeft} title="المقدمة" index={1}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelCls}>
                المقدمة بالعربي
                <textarea className={`${fieldCls} min-h-28`} value={story.excerpt.ar} onChange={(e) => setText("excerpt", "ar", e.target.value)} />
              </label>
              <label className={labelCls}>
                المقدمة بالإنجليزي
                <textarea className={`${fieldCls} min-h-28`} dir="ltr" value={story.excerpt.en} onChange={(e) => setText("excerpt", "en", e.target.value)} />
              </label>
            </div>
          </Section>

          <Section icon={FileText} title="النص" index={2}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelCls}>
                النص بالعربي
                <textarea className={`${fieldCls} min-h-56`} value={story.body.ar} onChange={(e) => setText("body", "ar", e.target.value)} />
              </label>
              <label className={labelCls}>
                النص بالإنجليزي
                <textarea className={`${fieldCls} min-h-56`} dir="ltr" value={story.body.en} onChange={(e) => setText("body", "en", e.target.value)} />
              </label>
            </div>
          </Section>
        </div>

        {/* Sidebar (stacks under the content below xl) */}
        <div className="min-w-0 space-y-6">
          <Section icon={Eye} title="النشر" index={1}>
            <Toggle checked={isPublished} onChange={(checked) => patch({ published: checked })}>
              <span className="flex items-center gap-3">
                {isPublished ? <CheckCircle2 className="h-6 w-6 text-[#2A317A]" /> : <EyeOff className="h-6 w-6 text-[#3C3C3B]" />}
                {isPublished ? "منشور على الموقع" : "مخفي عن الموقع"}
              </span>
            </Toggle>
          </Section>

          <Section icon={ImagePlus} title="الصورة" index={2}>
            <ImageDrop
              value={story.image}
              onChange={(image) => patch({ image })}
              onError={onError}
              aspect="aspect-video"
              hint="بتظهر في قائمة الأخبار وفي أول الخبر"
            />
            <details className="group/alt rounded-lg border border-[#3C3C3B]/15 bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-base font-semibold text-black [&::-webkit-details-marker]:hidden">
                نص بديل للصورة (اختياري)
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-300 group-open/alt:rotate-180 motion-reduce:transition-none" />
              </summary>
              <div className="space-y-4 border-t border-[#3C3C3B]/15 p-4">
                <label className={labelCls}>
                  بالعربي
                  <input className={fieldCls} value={story.imageAlt.ar} onChange={(e) => setText("imageAlt", "ar", e.target.value)} />
                </label>
                <label className={labelCls}>
                  بالإنجليزي
                  <input className={fieldCls} dir="ltr" value={story.imageAlt.en} onChange={(e) => setText("imageAlt", "en", e.target.value)} />
                </label>
              </div>
            </details>
          </Section>

          <Section icon={CalendarDays} title="التفاصيل" index={3}>
            <label className={labelCls}>
              التصنيف
              <select className={fieldCls} value={story.category} onChange={(e) => patch({ category: e.target.value })}>
                {categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.ar}
                  </option>
                ))}
              </select>
            </label>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              <label className={labelCls}>
                التاريخ
                <input type="date" className={fieldCls} value={story.date} onChange={(e) => patch({ date: e.target.value })} />
              </label>
              <label className={labelCls}>
                دقائق القراءة
                <input type="number" min="1" className={fieldCls} value={story.readTime} onChange={(e) => patch({ readTime: e.target.value })} />
              </label>
            </div>
          </Section>
        </div>
      </div>

      {dirty && (
        <div className="adm-pop sticky bottom-[max(1rem,env(safe-area-inset-bottom))] z-10 flex items-center justify-between gap-3 rounded-xl bg-black px-4 py-3 text-white shadow-lg sm:px-5">
          <span className="flex min-w-0 items-center gap-3 text-base font-semibold sm:text-lg">
            <span className="h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-white motion-reduce:animate-none" />
            <span className="truncate">تعديلات غير محفوظة</span>
          </span>
          <button
            type="submit"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#2A317A] px-5 py-2.5 text-base font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-black motion-reduce:transition-none"
          >
            <Save className="h-4 w-4" />
            حفظ
          </button>
        </div>
      )}
    </AdminPage>
  );
}