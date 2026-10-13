
import { motion } from "motion/react";
import CircularGallery from "../CircularGallery/CircularGallery";
import KineticGrid from "../KineticGrid/KineticGrid";
import hospitalImage from "../../../public/projects/s.jpg";

const projects = [
  {
    title: "THE GENERAL LOCATION OF THE FINANCIAL DISTRICT SQUARE",
    status: "Ongoing",
    alt: "برج تجاري في الحي المالي",
    src: "src/assets/images/THE_GENERAL_LOCATION_OF_THE FINANCIAL_DISTRICT_SQUARE.png",
  },
  {
    title: "SALLUM LAND PORT",
    status: "Ongoing",
    alt: "منفذ السلوم البري",
    src: "src/assets/images/SALLUM_LAND_PORT.png",
  },
  {
    title: "THE GENERAL SITE OF BIN ZAYED AXIS",
    status: "Delivered",
    alt: "موقع محور بن زايد",
    src: "src/assets/images/THE_GENERAL_SITE_OF_BIN_ZAYED_AXIS.png",
  },
  {
    title: "MIDTOWN CONDO",
    status: "Ongoing",
    alt: "مبنى سكني ميدتاون",
    src: "src/assets/images/MIDTOWN_CONDO.png",
  },
  {
    title: "MIDTOWN SOLO",
    status: "Ongoing",
    alt: "مبنى سكني ميدتاون",
    src: "src/assets/images/MIDTOWN_SOLO.png",
  },
  {
    title: "FUSTAT PARK",
    status: "Delivered",
    alt: "حديقة الفسطاط",
    src: "src/assets/images/Fustat_Park.png",
  },
  {
    title: "GALALA TOURIST RESORT",
    status: "Delivered",
    alt: "GALALA TOURIST RESORT",
    src: "src/assets/images/galala/1.png",
  },
  {
    title: "R3 RESIDENTIAL COMPOUND",
    status: "Ongoing",
    alt: "R3 RESIDENTIAL COMPOUND",
    src: "src/assets/images/r3/1.png",
  },
  {
    title: "Shebin El-Qanater Hospital",
    status: "Delivered",
    alt: "Shebin El-Qanater Hospital",
    src: hospitalImage,
  },
  {
    title: "AGA KHAN GARDEN",
    status: "Delivered",
    alt: "AGA KHAN GARDEN",
    src: "src/assets/images/garden/1.png",
  },
  {
    title: "ADMINISTRATIVE BUILDING",
    status: "Delivered",
    alt: "ADMINISTRATIVE BUILDING",
    src: "src/assets/images/admin/1.png",
  },
  // {
  //   title: "",
  //   status: "Ongoing",
  //   alt: "THE CULTURAL CENTER IN THE MOSQUE OF EGYPT",
  //   src: "src/assets/images/mosque/1.png",
  // },
];

const fadeUp = {
  hidden: { opacity: 0, y: -16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.2, 0.8, 0.2, 1] },
  }),
};

export default function ProjectsHero() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#3C3C3B]"
      style={{ height: "90svh", minHeight: 560 }}
    >
      <KineticGrid className="h-full w-full" contentClassName="flex flex-col">
        {/* pt = ارتفاع الـ navbar + مسافة صغيرة. لو الـ navbar عندك أطول أو أقصر عدّلي الأرقام دي */}
        <header className="relative z-20 shrink-0 px-4 pb-3 pt-24 text-center sm:pb-4 sm:pt-28 md:pb-5 md:pt-32">
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            {/* Eyebrow بخطين على الجنبين */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="flex items-center gap-3 sm:gap-4"
            >
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-white/70 sm:w-14" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white sm:text-xs sm:tracking-[0.3em] md:text-sm">
                Landmark Developments
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-white/70 sm:w-14" />
            </motion.div>

            {/* العنوان */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="mt-2 text-3xl font-bold leading-tight text-white sm:mt-3 sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Our Projects
            </motion.h1>

            {/* خط بيتفتح من النص */}
            <motion.span
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              className="mt-3 block h-1 w-16 origin-center rounded-full bg-white sm:mt-4 sm:w-24"
            />

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="mt-3 text-xs text-white/60 sm:mt-4 sm:text-sm"
            >
              <span className="sm:hidden">Swipe or scroll to explore</span>
              <span className="hidden sm:inline">Scroll to explore</span>
            </motion.p>
          </div>
        </header>

        {/* الجاليري ياخد باقي المساحة تحت العنوان */}
        <div className="relative min-h-0 w-full flex-1">
          <div className="absolute inset-0">
            <CircularGallery
              items={projects}
              radius={550}
              autoRotateSpeed={0.02}
            />
          </div>
        </div>
      </KineticGrid>
    </section>
  );
}

