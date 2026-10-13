import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import FlowScroll, { FlowSection } from "../../../components/FlowScroll/FlowScroll";
import { useLanguage } from "../../../locales/LanguageContext/LanguageContext";
import { newsCategories } from "../../../features/news/newsData";
import { usePublishedNews } from "../../../features/marketing/MarketingProvider";

function formatDate(date, language) {
  return new Intl.DateTimeFormat(language === "ar" ? "ar-EG" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function ArticleHero({ story, category, language, isArabic, reduceMotion }) {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 720], [0, reduceMotion ? 0 : 100]);
  const arrow = isArabic ? ArrowRight : ArrowLeft;

  return (
    <header className="relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden bg-black text-white sm:min-h-screen">
      <motion.img
        src={story.image}
        alt={story.imageAlt[language]}
        style={{ y: imageY }}
        initial={{ scale: reduceMotion ? 1 : 1.14, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 0.62 }}
        transition={{ duration: reduceMotion ? 0 : 1.4, ease: [0.2, 0.75, 0.25, 1] }}
        className="absolute inset-0 -z-20 h-[115%] w-full object-cover grayscale"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-black via-black/75 to-black/20" />
      <div className="absolute inset-0 -z-10 opacity-25 bg-[linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] bg-size-[64px_64px] mask-[linear-gradient(to_top,black,transparent_90%)]" />

      <div className="mx-auto w-full max-w-360 px-5 pb-12 pt-36 sm:px-10 sm:pb-16 lg:px-16 lg:pb-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } } }}
          className="max-w-5xl"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, x: isArabic ? 18 : -18 }, visible: { opacity: 1, x: 0 } }}
            transition={{ duration: reduceMotion ? 0 : 0.55 }}
            className="mb-8 flex flex-wrap items-center gap-3 text-xs"
          >
            <Link to="/news" className="inline-flex items-center gap-2 text-white/75 transition-colors hover:text-white">
              {(() => {
                const BackArrow = arrow;
                return <BackArrow className="h-4 w-4" />;
              })()}
              {isArabic ? "كل الأخبار" : "All stories"}
            </Link>
            <span className="h-px w-7 bg-white/45" />
            <span className="bg-[#2A317A] px-3 py-1.5 font-semibold text-white">{category[language]}</span>
          </motion.div>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: reduceMotion ? 0 : 0.55 }}
            className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-white/75"
          >
            {isArabic ? "تقرير من موقع العمل" : "A report from the site"}
          </motion.p>
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 24, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }}
            transition={{ duration: reduceMotion ? 0 : 0.75, ease: [0.2, 0.75, 0.25, 1] }}
            className="max-w-5xl text-4xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl"
          >
            {story.title[language]}
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: reduceMotion ? 0 : 0.6 }}
            className="mt-6 max-w-2xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8"
          >
            {story.excerpt[language]}
          </motion.p>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: reduceMotion ? 0 : 0.6 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/75"
          >
            <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" />{formatDate(story.date, language)}</span>
            <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" />{isArabic ? `${story.readTime} دقائق للقراءة` : `${story.readTime} min read`}</span>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: reduceMotion ? 0 : 1.1, delay: reduceMotion ? 0 : 0.4 }}
        className="absolute bottom-0 left-5 right-5 h-1 origin-left bg-[#2A317A] sm:left-10 sm:right-10 lg:left-16 lg:right-16"
      />
    </header>
  );
}

function ArticleBody({ story, relatedStories, language, isArabic, reduceMotion }) {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const SignalIcon = isArabic ? ArrowLeft : ArrowUpRight;
  const chapterTitles = isArabic
    ? ["رؤية الموقع", "تنسيق التنفيذ", "أثر يدوم"]
    : ["The site vision", "Coordinated delivery", "Built for the long term"];

  return (
    <>
      <motion.div style={{ width: progressWidth }} className="fixed left-0 right-0 top-0 z-60 h-1 origin-left bg-[#2A317A]" />
      <section id="article-body" className="bg-white px-5 py-16 text-black sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto grid max-w-360 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.34fr)] lg:gap-24">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: reduceMotion ? 0 : 0.65 }}
              className="mb-12 border-l-4 border-[#2A317A] pl-5 sm:pl-7"
            >
              <p className="text-xl font-medium leading-8 text-[#3C3C3B] sm:text-2xl sm:leading-10">
                {story.excerpt[language]}
              </p>
            </motion.div>

            <div className="space-y-12">
              {[story.body[language], ...(isArabic
                ? ["تبدأ جودة التنفيذ من وضوح الأدوار ومشاركة المعلومات بين فرق التصميم والموقع والموردين. كل مرحلة مبنية على التي قبلها، لذلك يصبح التخطيط الدقيق عنصرًا أساسيًا في تقليل الهدر والحفاظ على اتساق العمل.", "والنتيجة ليست مبنى فقط، بل مكان قادر على خدمة الناس والمدينة لسنوات طويلة. هذا هو المعيار الذي نضعه أمام كل قرار في الموقع."]
                : ["Quality on site starts with clear responsibilities and shared information between design, site and supply teams. Each phase builds on the one before it, making precise planning essential to reduce waste and keep work consistent.", "The result is not only a building, but a place able to serve people and the city for years to come. That is the standard we bring to every decision on site."]
              )].map((paragraph, index) => (
                <motion.div
                  key={`${story.id}-chapter-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.06 }}
                  className="grid gap-4 sm:grid-cols-[76px_1fr] sm:gap-7"
                >
                  <div className="flex items-center gap-3 sm:block">
                    <span className="font-mono text-sm font-semibold text-[#2A317A]">0{index + 1}</span>
                    <span className="h-px w-8 bg-[#3C3C3B]/40 sm:mt-3 sm:block" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-black sm:text-xl">
                      {index === 0 ? chapterTitles[0] : index === 1 ? chapterTitles[1] : chapterTitles[2]}
                    </h2>
                    <p className="mt-3 text-sm leading-8 text-[#3C3C3B] sm:text-base sm:leading-9">{paragraph}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.blockquote
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: reduceMotion ? 0 : 0.65 }}
              className="my-16 border-y border-[#3C3C3B]/20 py-8 sm:my-20 sm:py-10"
            >
              <span className="font-mono text-5xl leading-none text-[#2A317A]">“</span>
              <p className="-mt-2 max-w-3xl text-2xl font-semibold leading-snug text-black sm:text-3xl">
                {isArabic ? "الجودة الحقيقية تبدأ من التفاصيل التي لا يراها أحد." : "The work no one sees is what makes a place work for everyone."}
              </p>
            </motion.blockquote>

            <div className="mt-12 flex items-center justify-between border-t border-[#3C3C3B]/20 pt-6">
              <Link to="/news" className="group inline-flex items-center gap-2 text-sm font-semibold text-[#2A317A]">
                <SignalIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                {isArabic ? "العودة إلى الأخبار" : "Back to all stories"}
              </Link>
              <span className="font-mono text-xs text-[#3C3C3B]">SHOROUK / JOURNAL</span>
            </div>
          </div>

          <aside className="h-fit border-t-2 border-[#2A317A] pt-5 lg:sticky lg:top-28">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2A317A]">
              {isArabic ? "تابع القراءة" : "Keep reading"}
            </p>
            <div className="mt-5 divide-y divide-[#3C3C3B]/20">
              {relatedStories.map((related, index) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, x: isArabic ? -16 : 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.09 }}
                >
                  <Link to={`/news/${related.id}`} className="group grid grid-cols-[76px_1fr] gap-4 py-4">
                    <span className="relative block aspect-square overflow-hidden bg-[#3C3C3B]">
                      <img src={related.image} alt={related.imageAlt[language]} loading="lazy" className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-110 group-hover:grayscale-0" />
                    </span>
                    <span className="flex flex-col justify-between gap-2">
                      <span className="text-sm font-semibold leading-5 text-black transition-colors group-hover:text-[#2A317A]">{related.title[language]}</span>
                      <span className="flex items-center justify-between text-[10px] text-[#3C3C3B]">
                        {formatDate(related.date, language)}
                        <ArrowUpRight className="h-3.5 w-3.5 text-[#2A317A]" />
                      </span>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#3C3C3B] px-5 py-14 text-white sm:px-10 sm:py-20 lg:px-16">
        <div className="mx-auto flex max-w-360 flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">{isArabic ? "من دفتر البناء" : "From the construction journal"}</p>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
              {isArabic ? "اكتشف ما الذي نبنيه بعد ذلك" : "See what we are building next."}
            </h2>
          </div>
          <Link to="/projects" className="group inline-flex w-fit items-center gap-3 border-b border-white/50 pb-2 text-sm font-semibold text-white transition-colors hover:border-white">
            {isArabic ? "استكشف مشروعاتنا" : "Explore our projects"}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </div>
        <motion.div
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.9 }}
          className="absolute bottom-0 left-0 h-1 w-full origin-left bg-[#2A317A]"
        />
      </section>
    </>
  );
}

export default function NewsDetails() {
  const { id } = useParams();
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const newsStories = usePublishedNews();
  const story = newsStories.find((item) => item.id === id);
  const category = newsCategories.find((item) => item.id === story?.category);
  const relatedStories = newsStories.filter((item) => item.id !== id).slice(0, 3);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }, [id, language, reduceMotion]);

  if (!story) return <Navigate to="/news" replace />;

  return (
    <motion.div
      key={story.id}
      dir={language === "ar" ? "rtl" : "ltr"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.45 }}
      className="bg-white"
    >
      <FlowScroll aria-label={language === "ar" ? "تفاصيل الخبر" : "News story details"}>
        <FlowSection aria-label={story.title[language]} className="bg-black">
          <ArticleHero story={story} category={category} language={language} isArabic={language === "ar"} reduceMotion={reduceMotion} />
        </FlowSection>
        <FlowSection aria-label={language === "ar" ? "محتوى الخبر" : "Story article"} fit skipPin className="bg-white">
          <ArticleBody story={story} relatedStories={relatedStories} language={language} isArabic={language === "ar"} reduceMotion={reduceMotion} />
        </FlowSection>
      </FlowScroll>
    </motion.div>
  );
}