import { useState } from "react";
import { ArrowUpRight, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../locales/LanguageContext/LanguageContext";
import { projectsWithDetails } from "../../features/projects/projectsData";
import { bimPhases } from "../../features/projects/bimPhases";
import "./Bimhero.css";

const copy = {
  en: {
    eyebrow: "SHOROUK · BIM UNIT",
    title: <>Every project<br /><em>has its own journey.</em></>,
    intro: "Explore the BIM phases behind our work and discover how each project follows its own technical workflow.",
    timeline: "BIM delivery sequence",
    explore: "Select a phase to explore",
    hint: "Hover, focus or tap any point on the timeline",
    selected: "Selected phase",
    empty: "Project assignments for this phase are being verified.",
    emptyHint: "Confirmed project work will appear here.",
    view: "View project",
  },
  ar: {
    eyebrow: "الشروق · وحدة نمذجة معلومات البناء",
    title: <>لكل مشروع<br /><em>رحلته الخاصة.</em></>,
    intro: "اكتشف مراحل نمذجة معلومات البناء في مشروعاتنا، وتعرّف على مسار العمل الفني لكل مشروع.",
    timeline: "تسلسل مراحل العمل بنمذجة المعلومات",
    explore: "اختر مرحلة لاستكشافها",
    hint: "مرّر أو انتقل بلوحة المفاتيح أو اضغط على أي نقطة",
    selected: "المرحلة المختارة",
    empty: "يجري التحقق من المشروعات المرتبطة بهذه المرحلة.",
    emptyHint: "ستظهر هنا المشروعات المعتمدة لهذه المرحلة.",
    view: "عرض المشروع",
  },
};

export default function BIMHero() {
  const { language } = useLanguage();
  const t = copy[language] || copy.en;
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const activeIndex = hovered ?? selected;
  const activePhase = activeIndex === null ? null : bimPhases[activeIndex];
  const activeProjects = activePhase
    ? activePhase.projectIds.map((id) => projectsWithDetails.find((project) => project.id === id)).filter(Boolean)
    : [];

  return (
    <section className="bim-hero" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="bim-hero__inner">
        <div className="bim-hero__intro">
          <p className="bim-hero__eyebrow"><span />{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p className="bim-hero__lede">{t.intro}</p>
        </div>

        <div className="bim-timeline-wrap">
          <div className="bim-timeline-heading">
            <span>{t.timeline}</span>
            <span className="bim-timeline-heading__count">07 <i>/ 07</i></span>
          </div>
          <div className="bim-timeline-scroll" tabIndex={0} aria-label={t.timeline}>
            <ol className="bim-timeline">
              {bimPhases.map((phase, index) => {
                const isActive = activeIndex === index;
                return (
                  <li className={`bim-timeline__item${isActive ? " is-active" : ""}`} key={phase.id}>
                    <button
                      type="button"
                      className="bim-phase"
                      aria-pressed={selected === index}
                      aria-label={`${String(index + 1).padStart(2, "0")}: ${phase.label}${phase.detail ? `, ${phase.detail}` : ""}`}
                      onMouseEnter={() => setHovered(index)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(index)}
                      onBlur={() => setHovered(null)}
                      onClick={() => setSelected(index)}
                    >
                      <span className="bim-phase__top"><span className="bim-phase__number">{String(index + 1).padStart(2, "0")}</span><span className="bim-phase__node" aria-hidden="true" /></span>
                      <span className="bim-phase__label" dir="auto">{phase.label}</span>
                      {phase.detail && <span className="bim-phase__detail">{phase.detail}</span>}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
          <p className="bim-timeline-hint"><span aria-hidden="true">↔</span>{t.hint}</p>
        </div>

        <section className={`bim-results${activePhase ? " is-revealed" : ""}`} aria-live="polite" aria-label={activePhase ? activePhase.label : t.explore}>
          <div className="bim-results__label">
            <span className="bim-results__index">{activePhase ? String(activeIndex + 1).padStart(2, "0") : "BIM"}</span>
            <div>
              <p>{activePhase ? t.selected : t.explore}</p>
              <h2>{activePhase ? activePhase.label : t.hint}</h2>
            </div>
          </div>
          {activePhase && activeProjects.length > 0 ? (
            <div className="bim-projects">
              {activeProjects.map((project) => (
                <Link className="bim-project" to={`/projects/${project.id}`} key={project.id}>
                  <img src={project.src} alt={project.title.trim()} />
                  <span className="bim-project__copy"><strong>{project.title.trim()}</strong><small>{project.location || project.category}</small></span>
                  <span className="bim-project__arrow" aria-label={t.view}><ArrowUpRight size={18} /></span>
                </Link>
              ))}
            </div>
          ) : activePhase ? (
            <div className="bim-empty"><strong>{t.empty}</strong><span>{t.emptyHint}</span></div>
          ) : (
            <div className="bim-results__prompt"><span className="bim-results__rule" /><span>{t.explore}</span><MoveRight size={17} aria-hidden="true" /></div>
          )}
        </section>
      </div>
    </section>
  );
}
