// import { useMemo } from "react";
// import ProjectsCarousel from "../ProjectsCarousel/ProjectsCarousel";
// import {
//   getTextValue,
//   useProjectsSectionContent,
//   useHomeProjects, // بدل usePublishedProjects
// } from "../../features/marketing/MarketingProvider";


// import { useLanguage } from "../../locales/LanguageContext/LanguageContext";

// export default function ProjectsSection() {
//   const { language } = useLanguage();
//   const copy = useProjectsSectionContent();
//   const published = useHomeProjects(); // بدل usePublishedProjects()

//   const slides = useMemo(
//     () =>
//       published.map((project) => ({
//         id: project.id,
//         title: getTextValue(project.title, language) || project.titleAr || project.titleEn || project.title || "",
//         status: project.status,
//         alt: getTextValue(project.title, language) || project.title || "",
//         src: project.src,
//         href: `/projects/${project.id}`,
//       })),
//     [published, language]
//   );

//   return (
//     <section className="relative overflow-hidden bg-[#3C3C3B] py-16" id="projects">
//       <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
//         <video
//           autoPlay
//           muted
//           loop
//           playsInline
//           preload="metadata"
//           className="absolute inset-0 h-full w-full scale-105 object-cover"
//           style={{
//             filter: "grayscale(1) brightness(1.4) contrast(1.15)",
//             mixBlendMode: "screen",
//             opacity: 0.18,
//             maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)",
//             WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)",
//           }}
//         >
//           <source src="/videos/construction.mp4" type="video/mp4" />
//         </video>
//       </div>

//       <div className="relative z-10">
//         <div className="container m-auto mb-4 px-4 text-center md:px-8 lg:px-16">
//           <h2 className="text-4xl font-bold text-white">
//             {getTextValue(copy.title, language)}{" "}
//             <span className="text-[#2A317A]">{getTextValue(copy.titleHighlight, language)}</span>
//           </h2>
//           <p className="mt-2 text-white/70">{getTextValue(copy.subtitle, language)}</p>
//         </div>

//         {slides.length > 0 ? (
//           <ProjectsCarousel slides={slides} showNavigation />
//         ) : null}
//       </div>
//     </section>
//   );
// }



import { useMemo } from "react";
import ProjectsCarousel from "../ProjectsCarousel/ProjectsCarousel";
import {
  getTextValue,
  useProjectsSectionContent,
  useHomeProjects,
} from "../../features/marketing/MarketingProvider";
import { useLanguage } from "../../locales/LanguageContext/LanguageContext";

export default function ProjectsSection() {
  // كل الـ hooks لازم تكون هنا، جوا الـ function
  const { language } = useLanguage();
  const copy = useProjectsSectionContent();
  const homeProjects = useHomeProjects();

  const slides = useMemo(
    () =>
      homeProjects.map((project) => ({
        id: project.id,
        title: getTextValue(project.title, language) || project.titleAr || project.titleEn || project.title || "",
        status: project.status,
        alt: getTextValue(project.title, language) || project.title || "",
        src: project.src,
        href: `/projects/${project.id}`,
      })),
    [homeProjects, language]
  );

  return (
    <section className="relative overflow-hidden bg-[#3C3C3B] py-16" id="projects">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full scale-105 object-cover"
          style={{
            filter: "grayscale(1) brightness(1.4) contrast(1.15)",
            mixBlendMode: "screen",
            opacity: 0.18,
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)",
          }}
        >
          <source src="/videos/construction.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10">
        <div className="container m-auto mb-4 px-4 text-center md:px-8 lg:px-16">
          <h2 className="text-4xl font-bold text-white">
            {getTextValue(copy.title, language)}{" "}
            <span className="text-[#2A317A]">{getTextValue(copy.titleHighlight, language)}</span>
          </h2>
          <p className="mt-2 text-white/70">{getTextValue(copy.subtitle, language)}</p>
        </div>

        {slides.length > 0 ? <ProjectsCarousel slides={slides} showNavigation /> : null}
      </div>
    </section>
  );
}