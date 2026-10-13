import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../../locales/LanguageContext/LanguageContext";

export default function NewsHero() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <section className="relative isolate flex min-h-screen items-end overflow-hidden bg-black text-white">
      <img
        src="/images/r3/1.png"
        alt={isArabic ? "مشهد عمراني من مشروع سكني" : "A residential development in Egypt"}
        fetchPriority="high"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/65 to-black/20" />
      <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_top,black,transparent_85%)]" />

      <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-5 pb-14 pt-36 sm:px-10 sm:pb-20 lg:grid-cols-[1fr_auto] lg:items-end lg:px-16 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white sm:text-xs">
            <span className="h-px w-9 bg-white" />
            <span>{isArabic ? "دفتر البناء" : "The construction journal"}</span>
            <span className="text-white/60">/ 2026</span>
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-8xl">
            {isArabic ? "أخبار من قلب" : "Stories from"}
            <span className="block text-[#2A317A]">
              {isArabic ? "مواقع البناء" : "the ground up."}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
            {isArabic
              ? "رؤى وتحديثات عن المشروعات العقارية، وأعمال التشييد، والأفكار التي تشكل المدن من حولنا."
              : "Project updates, construction insight and the ideas shaping the places where we live and work."}
          </p>
        </motion.div>

        <motion.a
          href="#news-feed"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="group inline-flex w-fit items-center gap-4 border-b border-white/40 pb-3 text-xs font-semibold uppercase tracking-[0.13em] transition-colors hover:border-[#2A317A] hover:text-white"
        >
          <span>{isArabic ? "استكشف الأخبار" : "Explore the latest"}</span>
          {isArabic ? (
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          ) : (
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
          )}
        </motion.a>
      </div>

      <div className="absolute bottom-0 left-5 right-5 h-px bg-white/30 sm:left-10 sm:right-10 lg:left-16 lg:right-16" />
    </section>
  );
}