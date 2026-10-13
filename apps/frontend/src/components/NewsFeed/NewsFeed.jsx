import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarDays, Clock3, Search, X } from "lucide-react";
import { useLanguage } from "../../locales/LanguageContext/LanguageContext";
import { newsCategories } from "../../features/news/newsData";
import { usePublishedNews } from "../../features/marketing/MarketingProvider";

function formatDate(date, language) {
  return new Intl.DateTimeFormat(language === "ar" ? "ar-EG" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function StoryMeta({ story, language, isArabic }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-medium text-[#3C3C3B]">
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="h-3.5 w-3.5 text-[#2A317A]" />
        {formatDate(story.date, language)}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock3 className="h-3.5 w-3.5 text-[#2A317A]" />
        {isArabic ? `${story.readTime} دقائق للقراءة` : `${story.readTime} min read`}
      </span>
    </div>
  );
}

function StoryCard({ story, category, language, isArabic, featured = false }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 14 }}
      transition={{ duration: 0.28 }}
      className={`group flex h-full flex-col border border-[#3C3C3B]/10 bg-white ${featured ? "lg:grid lg:grid-cols-[1.08fr_.92fr]" : ""}`}
    >
      <Link
        to={`/news/${story.id}`}
        aria-label={`${isArabic ? "اقرأ" : "Read"}: ${story.title[language]}`}
        className={`relative block w-full shrink-0 overflow-hidden bg-[#3C3C3B] text-start ${featured ? "aspect-4/3 lg:aspect-auto lg:min-h-97.5" : "aspect-4/3"}`}
      >
        <img
          src={story.image}
          alt={story.imageAlt[language]}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
        />
        <span className="absolute left-4 top-4 bg-[#2A317A] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white">
          {category[language]}
        </span>
        <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center bg-white text-black transition-colors group-hover:bg-[#2A317A] group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </Link>

      <div className={`flex flex-1 flex-col p-5 sm:p-7 ${featured ? "lg:justify-center lg:p-10" : ""}`}>
        <StoryMeta story={story} language={language} isArabic={isArabic} />
        <h3 className={`mt-4 font-semibold leading-snug text-black ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>
          {story.title[language]}
        </h3>
        <p className={`mt-3 flex-1 text-sm leading-7 text-[#3C3C3B] ${featured ? "max-w-xl" : ""}`}>
          {story.excerpt[language]}
        </p>
        <Link
          to={`/news/${story.id}`}
          className="mt-6 inline-flex w-fit items-center gap-2 border-b border-[#3C3C3B]/30 pb-1 text-xs font-semibold text-black transition-colors hover:border-[#2A317A] hover:text-[#2A317A]"
        >
          {isArabic ? "اقرأ الخبر" : "Read story"}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.article>
  );
}

export default function NewsFeed() {
  const { language } = useLanguage();
  const newsStories = usePublishedNews();
  const isArabic = language === "ar";
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const filteredStories = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(language === "ar" ? "ar" : "en");
    return newsStories.filter((story) => {
      const matchesCategory = activeCategory === "all" || story.category === activeCategory;
      const searchableText = [
        story.title[language],
        story.excerpt[language],
        story.body[language],
        newsCategories.find((category) => category.id === story.category)?.[language],
      ]
        .join(" ")
        .toLocaleLowerCase(language === "ar" ? "ar" : "en");
      return matchesCategory && searchableText.includes(normalizedQuery);
    });
  }, [activeCategory, language, newsStories, query]);

  const featuredStory = filteredStories[0];
  const remainingStories = filteredStories.slice(1);

  return (
    <section id="news-feed" className="bg-white px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-360">
        <div className="mb-10 flex flex-col gap-6 border-b border-[#3C3C3B]/20 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2A317A]">
              {isArabic ? "من الميدان" : "From the field"}
            </p>
            <h2 className="text-3xl font-semibold text-black sm:text-4xl">
              {isArabic ? "أحدث الأخبار والرؤى" : "News & perspectives"}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-[#3C3C3B]">
            {isArabic
              ? "تابع آخر مستجدات المشروعات والأفكار العملية في قطاع البناء والتطوير العقاري."
              : "Follow project milestones and practical thinking from across construction and real estate."}
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label={isArabic ? "تصفية الأخبار" : "Filter stories"}>
            {newsCategories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(category.id)}
                  className={`shrink-0 border px-4 py-2.5 text-xs font-semibold transition-colors ${
                    isActive
                      ? "border-[#2A317A] bg-[#2A317A] text-white"
                        : "border-[#3C3C3B]/30 bg-transparent text-[#3C3C3B] hover:border-[#2A317A] hover:text-[#2A317A]"
                  }`}
                >
                  {category[language]}
                </button>
              );
            })}
          </div>

          <label className="flex h-12 w-full items-center gap-3 border border-[#3C3C3B]/20 bg-white px-4 lg:max-w-sm">
            <Search className="h-4 w-4 shrink-0 text-[#3C3C3B]" />
            <span className="sr-only">{isArabic ? "ابحث في الأخبار" : "Search stories"}</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={isArabic ? "ابحث في الأخبار..." : "Search stories..."}
              className="min-w-0 flex-1 bg-transparent text-sm text-black outline-none placeholder:text-[#3C3C3B]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={isArabic ? "مسح البحث" : "Clear search"}
                className="flex h-7 w-7 items-center justify-center text-[#3C3C3B] hover:text-black"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </label>
        </div>

        <div className="mb-5 flex items-center justify-between text-xs text-[#3C3C3B]" aria-live="polite">
          <span>
            {isArabic
              ? `${filteredStories.length} ${filteredStories.length === 1 ? "خبر" : "أخبار"}`
              : `${filteredStories.length} ${filteredStories.length === 1 ? "story" : "stories"}`}
          </span>
          {(query || activeCategory !== "all") && (
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setQuery("");
              }}
              className="inline-flex items-center gap-1.5 font-semibold text-[#2A317A] hover:text-black"
            >
              {isArabic ? "مسح الفلاتر" : "Clear filters"}
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {featuredStory ? (
          <div className="space-y-5">
            <AnimatePresence mode="popLayout">
              <StoryCard
                key={featuredStory.id}
                story={featuredStory}
                category={newsCategories.find((category) => category.id === featuredStory.category)}
                language={language}
                isArabic={isArabic}
                featured
              />
            </AnimatePresence>
            {remainingStories.length > 0 && (
              <motion.div layout className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {remainingStories.map((story) => (
                    <StoryCard
                      key={story.id}
                      story={story}
                      category={newsCategories.find((category) => category.id === story.category)}
                      language={language}
                      isArabic={isArabic}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="border-y border-[#3C3C3B]/20 py-16 text-center">
            <p className="text-lg font-semibold text-black">
              {isArabic ? "مفيش أخبار مطابقة للبحث" : "No stories match your search"}
            </p>
            <p className="mt-2 text-sm text-[#3C3C3B]">
              {isArabic ? "جرّب كلمة تانية أو امسح الفلاتر." : "Try another term or clear the filters."}
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setQuery("");
              }}
              className="mt-5 border-b border-[#2A317A] pb-1 text-sm font-semibold text-[#2A317A]"
            >
              {isArabic ? "عرض كل الأخبار" : "Show all stories"}
            </button>
          </div>
        )}
      </div>

    </section>
  );
}