
// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { Menu, X } from "lucide-react";

// import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
// import { useLanguage } from "../../locales/LanguageContext/LanguageContext";

// // كل عنصر بقى ليه "key" بدل نص ثابت، عشان نقدر نترجمه بـ t(item.key)
// const navItems = [
//   { key: "navHome", href: "/" },
//   { key: "navAbout", href: "#about" },
//   { key: "navServices", href: "#services" },
//   { key: "navProjects", href: "/projects" },
//   { key: "navCareer", href: "/careers" },
//   { key: "navBim", href: "/bim" },
//   { key: "navSuppliers", href: "/suppliers/add" },
//   { key: "navContact", href: "/contact" },
//   { key: "navNews", href: "/news" },
// ];

// // Shared by the real links and the hidden measuring copy,
// // so the measured width is exactly the real width.
// const linkListClass = "flex items-center gap-5 whitespace-nowrap";
// const linkTextClass = "inline-block text-[15px] xl:text-[16px] font-medium tracking-wide uppercase";

// // Space the pill needs besides the links: logo + language switcher + paddings.
// // Deliberately generous so the links never get squeezed or overflow.
// const CHROME_WIDTH = 420;

// function usePrefersReducedMotion() {
//   const [reduced, setReduced] = useState(false);

//   useEffect(() => {
//     const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
//     setReduced(mq.matches);

//     const handler = (e) => setReduced(e.matches);

//     mq.addEventListener("change", handler);

//     return () => mq.removeEventListener("change", handler);
//   }, []);

//   return reduced;
// }

// // Decides by REAL measurement (not a fixed breakpoint) whether the inline
// // links fit. Re-checks on resize, language change and when fonts finish loading.
// function useLinksFit(measureRef, language) {
//   const [fits, setFits] = useState(false);

//   useEffect(() => {
//     let alive = true;
//     const check = () => {
//       if (!alive) return;
//       const needed = measureRef.current?.offsetWidth ?? Infinity;
//       setFits(needed + CHROME_WIDTH <= window.innerWidth - 32);
//     };

//     check();
//     window.addEventListener("resize", check);
//     document.fonts?.ready?.then(check);

//     return () => {
//       alive = false;
//       window.removeEventListener("resize", check);
//     };
//   }, [measureRef, language]);

//   return fits;
// }

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const reduceMotion = usePrefersReducedMotion();
//   const { t, language } = useLanguage();

//   const measureRef = useRef(null);
//   const linksFit = useLinksFit(measureRef, language);
//   const showLinks = !scrolled && linksFit;

//   useEffect(() => {
//     let ticking = false;

//     const handleScroll = () => {
//       if (!ticking) {
//         window.requestAnimationFrame(() => {
//           setScrolled(window.scrollY > 40);
//           ticking = false;
//         });

//         ticking = true;
//       }
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     handleScroll();

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? "hidden" : "";

//     const handleEsc = (e) => {
//       if (e.key === "Escape") {
//         setMenuOpen(false);
//       }
//     };

//     window.addEventListener("keydown", handleEsc);

//     return () => {
//       document.body.style.overflow = "";
//       window.removeEventListener("keydown", handleEsc);
//     };
//   }, [menuOpen]);

//   return (
//     <>
//       {/* ================= NAVBAR ================= */}
//       {/* inset-x-0 + flex centering instead of left-1/2 + translate:
//           a "left:50%" element can only be 50% of the screen wide, which
//           squeezed the links on tablets/laptops. */}
//       <header
//         className="
//           pointer-events-none
//           fixed
//           inset-x-0
//           z-50
//           flex
//           justify-center
//           px-3
//           sm:px-4
//           top-[calc(env(safe-area-inset-top,0px)+0.75rem)]
//           sm:top-[calc(env(safe-area-inset-top,0px)+1rem)]
//           md:top-[calc(env(safe-area-inset-top,0px)+1.5rem)]
//         "
//       >
//         {/* Hidden copy of the links, only used to measure their width */}
//         <ul
//           ref={measureRef}
//           aria-hidden="true"
//           className={`${linkListClass} invisible absolute top-0 start-0 -z-10 w-max`}
//         >
//           {navItems.map((item) => (
//             <li key={item.key}>
//               <span className={linkTextClass}>{t(item.key)}</span>
//             </li>
//           ))}
//         </ul>

//         <motion.nav
//           layout
//           transition={{
//             duration: reduceMotion ? 0 : 0.6,
//             ease: [0.65, 0.05, 0, 1],
//           }}
//           className={`
//             pointer-events-auto
//             flex
//             items-center
//             justify-center
//             bg-[#FFFFFF]
//             rounded-full
//             shadow-lg
//             shadow-[#000000]/10
//             border
//             border-[#2A317A]/10
//             w-fit
//             min-w-0
//             max-w-full

//             ${
//               scrolled
//                 ? "gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5"
//                 : "gap-2 sm:gap-5 lg:gap-7 px-3 sm:px-5 md:px-6 py-2.5 sm:py-3"
//             }
//           `}
//         >
//           {/* ================= LOGO / MENU BUTTON ================= */}
//           <motion.button
//             type="button"
//             onClick={() => setMenuOpen((p) => !p)}
//             aria-label={menuOpen ? t("menuCloseLabel") : t("menuOpenLabel")}
//             aria-expanded={menuOpen}
//             aria-controls="site-menu"
//             className="
//               group
//               relative
//               min-w-0
//               shrink

//               h-11
//               sm:h-12
//               md:h-14

//               px-2
//               sm:px-3
//               md:px-4

//               flex
//               items-center
//               justify-center
//               gap-2

//               focus:outline-none
//               focus-visible:ring-2
//               focus-visible:ring-[#2A317A]
//               rounded-full

//               overflow-hidden
//             "
//             whileTap={{ scale: 0.96 }}
//           >
//             {/* ================= BLUE OPEN STATE ================= */}
//             <motion.span
//               className="
//                 absolute
//                 inset-0
//                 rounded-full
//                 border-2
//                 border-[#2A317A]
//               "
//               initial={false}
//               animate={{
//                 scale: menuOpen ? 1 : 0.5,
//                 opacity: menuOpen ? 1 : 0,
//               }}
//               transition={{
//                 type: "spring",
//                 stiffness: 260,
//                 damping: 18,
//               }}
//             />

//             {/* ================= HOVER PULSE ================= */}
//             <motion.span
//               className="
//                 absolute
//                 inset-0
//                 rounded-full
//                 bg-[#2A317A]/10
//               "
//               initial={{
//                 scale: 0.6,
//                 opacity: 0,
//               }}
//               whileHover={{
//                 scale: 1,
//                 opacity: 1,
//               }}
//               transition={{
//                 duration: 0.3,
//               }}
//             />

//             {/* ================= LOGO ================= */}
//             <motion.div
//               animate={{
//                 rotate: menuOpen ? 90 : 0,
//                 scale: menuOpen ? 0.9 : 1,
//               }}
//               transition={{
//                 type: "spring",
//                 stiffness: 200,
//                 damping: 15,
//               }}
//               className="
//                 relative
//                 z-10
//                 flex
//                 min-w-0
//                 items-center
//                 justify-center
//                 max-w-full
//                 max-h-full
//               "
//             >
//               <AnimatePresence mode="wait" initial={false}>
//                 {scrolled ? (
//                   /* ================= SMALL ICON AFTER SCROLL ================= */
//                   <motion.img
//                     key="icon"
//                     src="/src/assets/images/logo-icon.webp"
//                     alt="Alshorouk"
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.8 }}
//                     transition={{ duration: 0.25 }}
//                     className="
//                       h-6
//                       sm:h-7
//                       md:h-8
//                       w-auto
//                       max-w-full
//                       max-h-full
//                       object-contain
//                     "
//                   />
//                 ) : (
//                   /* ================= FULL COMPANY LOGO ================= */
//                   <motion.img
//                     key="full"
//                     src="/src/assets/images/AL Shorouk/Al-Shorouk Logo.png"
//                     alt="Alshorouk Construction Company"
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.9 }}
//                     transition={{ duration: 0.25 }}
//                     className="
//                       h-8
//                       sm:h-10
//                       md:h-11

//                       w-auto

//                       max-w-[100px]
//                       min-[400px]:max-w-[140px]
//                       sm:max-w-[180px]
//                       md:max-w-[210px]

//                       max-h-full

//                       object-contain
//                     "
//                   />
//                 )}
//               </AnimatePresence>
//             </motion.div>

//             {/* ================= MENU ICON =================
//                 When the inline links are hidden (small screens / scrolled),
//                 the logo is the only way into the menu, so we show it. */}
//             {!showLinks && (
//               <span className="relative z-10 shrink-0 text-[#2A317A]" aria-hidden="true">
//                 {menuOpen ? (
//                   <X className="h-5 w-5 sm:h-6 sm:w-6" />
//                 ) : (
//                   <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
//                 )}
//               </span>
//             )}

//             {/* ================= MENU TOOLTIP ================= */}
//             {/* <motion.span
//               initial={{ opacity: 0, y: -4 }}
//               animate={{ opacity: 0, y: -4 }}
//               whileHover={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.25 }}
//               className="
//                 hidden
//                 md:block
//                 absolute
//                 -bottom-4
//                 left-1/2
//                 -translate-x-1/2
//                 text-[16px]
//                 tracking-[0.2em]
//                 uppercase
//                 text-[#3C3C3B]
//                 whitespace-nowrap
//               "
//             >
//               {menuOpen ? "Close" : "Menu"}
//             </motion.span> */}
//           </motion.button>

//           {/* ================= DESKTOP LINKS ================= */}
//           <AnimatePresence>
//             {showLinks && (
//               <motion.ul
//                 key={language}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0, transition: { duration: 0.2 } }}
//                 transition={{ duration: 0.3 }}
//                 className={linkListClass}
//               >
//                 {navItems.map((item) => (
//                   <li key={item.key} className="relative group">
//                     <a
//                       href={item.href}
//                       className={`
//                         ${linkTextClass}
//                         text-[#3C3C3B]
//                         group-hover:text-[#2A317A]
//                         transition-colors
//                         duration-300
//                         group-hover:-translate-y-0.5
//                       `}
//                     >
//                       {t(item.key)}
//                     </a>

//                     <span
//                       className="
//                         absolute
//                         left-1/2
//                         -bottom-1.5
//                         h-[1.5px]
//                         w-0
//                         bg-[#2A317A]
//                         -translate-x-1/2
//                         transition-all
//                         duration-300
//                         ease-out
//                         group-hover:w-full
//                       "
//                     />
//                   </li>
//                 ))}
//               </motion.ul>
//             )}
//           </AnimatePresence>

//           {/* ================= LANGUAGE SWITCHER ================= */}
//           <div
//             className="
//               shrink-0
//               ps-1
//               sm:ps-2
//               border-s
//               border-[#2A317A]/10
//             "
//           >
//             <LanguageSwitcher />
//           </div>
//         </motion.nav>
//       </header>

//       {/* ================= FULL SCREEN MENU ================= */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             id="site-menu"
//             role="dialog"
//             aria-modal="true"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.4 }}
//             className="
//               fixed
//               inset-0
//               z-40
//               overflow-y-auto
//               overscroll-contain
//               bg-[#FFFFFF]
//             "
//           >
//             {/* ================= BACKGROUND LINES (fixed, don't scroll) ================= */}
//             <svg
//               className="
//                 fixed
//                 inset-0
//                 w-full
//                 h-full
//                 pointer-events-none
//                 opacity-50
//               "
//               viewBox="0 0 100 100"
//               preserveAspectRatio="none"
//             >
//               <motion.line
//                 x1="0"
//                 y1="18"
//                 x2="100"
//                 y2="18"
//                 stroke="#2A317A"
//                 strokeWidth="0.1"
//                 strokeDasharray="1 2"
//                 initial={{ pathLength: 0 }}
//                 animate={{ pathLength: 1 }}
//                 transition={{ duration: 1.2, ease: "easeInOut" }}
//               />

//               <motion.line
//                 x1="0"
//                 y1="82"
//                 x2="100"
//                 y2="82"
//                 stroke="#2A317A"
//                 strokeWidth="0.1"
//                 strokeDasharray="1 2"
//                 initial={{ pathLength: 0 }}
//                 animate={{ pathLength: 1 }}
//                 transition={{ duration: 1.2, delay: 0.15, ease: "easeInOut" }}
//               />
//             </svg>

//             {/* ================= CORNER BRACKETS ================= */}
//             <span className="pointer-events-none fixed top-5 left-5 sm:top-8 sm:left-8 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-[#2A317A]" />
//             <span className="pointer-events-none fixed top-5 right-5 sm:top-8 sm:right-8 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-[#2A317A]" />
//             <span className="pointer-events-none fixed bottom-5 left-5 sm:bottom-8 sm:left-8 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-[#2A317A]" />
//             <span className="pointer-events-none fixed bottom-5 right-5 sm:bottom-8 sm:right-8 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-[#2A317A]" />

//             {/* ================= CONTENT (scrolls when the screen is short) ================= */}
//             <div
//               className="
//                 relative
//                 z-10
//                 flex
//                 flex-col
//                 items-center
//                 justify-center
//                 px-6
//                 pt-24
//                 pb-16
//                 sm:pt-28
//               "
//               style={{ minHeight: "100dvh" }}
//             >
//               {/* ================= MENU LINKS ================= */}
//               <motion.ul
//                 key={language}
//                 className="flex flex-col items-center"
//                 style={{ gap: "clamp(0.35rem, 1.8vh, 1rem)" }}
//               >
//                 {navItems.map((item, i) => (
//                   <motion.li
//                     key={item.key}
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 20 }}
//                     transition={{
//                       duration: 0.5,
//                       delay: reduceMotion ? 0 : i * 0.08,
//                       ease: "easeOut",
//                     }}
//                   >
//                     <a
//                       href={item.href}
//                       onClick={() => setMenuOpen(false)}
//                       className="
//                         block
//                         font-bold
//                         uppercase
//                         tracking-tight
//                         text-[#3C3C3B]
//                         hover:text-[#2A317A]
//                         transition-colors
//                         duration-300
//                         text-center
//                         leading-tight
//                       "
//                       // scales with BOTH width and height, so 9 links fit
//                       // phones in portrait and landscape
//                       style={{ fontSize:30 }}
//                     >
//                       {t(item.key)}
//                     </a>
//                   </motion.li>
//                 ))}
//               </motion.ul>

//               {/* ================= FOOTER TEXT ================= */}
//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.5, duration: 0.6 }}
//                 className="
//                   relative
//                   z-10
//                   mt-
//                   sm:mt-10
//                   text-xs
//                   sm:text-sm
//                   text-[#3C3C3B]
//                   text-center
//                 "
//               >
//                 alshorouk Construction & Supply — Cairo, Egypt
//               </motion.p>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }


import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useLanguage } from "../../locales/LanguageContext/LanguageContext";

const navItems = [
  { key: "navHome", href: "/" },
  { key: "navAbout", href: "#about" },
  { key: "navServices", href: "#services" },
  { key: "navProjects", href: "/projects" },
  { key: "navCareer", href: "/careers" },
  { key: "navBim", href: "/bim" },
  { key: "navSuppliers", href: "/suppliers/add" },
  { key: "navContact", href: "/contact" },
  { key: "navNews", href: "/news" },
];

const linkListClass = "flex items-center gap-5 whitespace-nowrap";
const linkTextClass = "inline-block text-[15px] xl:text-[16px] font-medium tracking-wide uppercase";

const CHROME_WIDTH = 420;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

function useLinksFit(measureRef, language) {
  const [fits, setFits] = useState(false);

  useEffect(() => {
    let alive = true;
    const check = () => {
      if (!alive) return;
      const needed = measureRef.current?.offsetWidth ?? Infinity;
      setFits(needed + CHROME_WIDTH <= window.innerWidth - 32);
    };

    check();
    window.addEventListener("resize", check);
    document.fonts?.ready?.then(check);

    return () => {
      alive = false;
      window.removeEventListener("resize", check);
    };
  }, [measureRef, language]);

  return fits;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const { t, language } = useLanguage();

  const measureRef = useRef(null);
  const linksFit = useLinksFit(measureRef, language);

  // الـ navbar بتبقى مصغّرة لما نعمل scroll أو لما المنيو تتفتح
  const compact = scrolled || menuOpen;
  const showLinks = !compact && linksFit;

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    const handleEsc = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [menuOpen]);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header
        className="
          pointer-events-none
          fixed
          inset-x-0
          z-50
          flex
          justify-center
          px-3
          sm:px-4
          top-[calc(env(safe-area-inset-top,0px)+0.75rem)]
          sm:top-[calc(env(safe-area-inset-top,0px)+1rem)]
          md:top-[calc(env(safe-area-inset-top,0px)+1.5rem)]
        "
      >
        {/* Hidden copy of the links, only used to measure their width */}
        <ul
          ref={measureRef}
          aria-hidden="true"
          className={`${linkListClass} invisible absolute top-0 start-0 -z-10 w-max`}
        >
          {navItems.map((item) => (
            <li key={item.key}>
              <span className={linkTextClass}>{t(item.key)}</span>
            </li>
          ))}
        </ul>

        <motion.nav
          layout
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            ease: [0.65, 0.05, 0, 1],
          }}
          className={`
            pointer-events-auto
            flex
            items-center
            justify-center
            bg-[#FFFFFF]
            rounded-full
            shadow-lg
            shadow-[#000000]/10
            border
            border-[#2A317A]/10
            w-fit
            min-w-0
            max-w-full

            ${
              compact
                ? "gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5"
                : "gap-2 sm:gap-5 lg:gap-7 px-3 sm:px-5 md:px-6 py-2.5 sm:py-3"
            }
          `}
        >
          {/* ================= LOGO / MENU BUTTON ================= */}
          <motion.button
            type="button"
            onClick={() => setMenuOpen((p) => !p)}
            aria-label={menuOpen ? t("menuCloseLabel") : t("menuOpenLabel")}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className="
              group
              relative
              min-w-0
              shrink

              h-11
              sm:h-12
              md:h-14

              px-2
              sm:px-3
              md:px-4

              flex
              items-center
              justify-center
              gap-2

              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#2A317A]
              rounded-full

              overflow-hidden
            "
            whileTap={{ scale: 0.96 }}
          >
            {/* ================= BLUE OPEN STATE ================= */}
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-[#2A317A]"
              initial={false}
              animate={{
                scale: menuOpen ? 1 : 0.5,
                opacity: menuOpen ? 1 : 0,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            />

            {/* ================= HOVER PULSE ================= */}
            <motion.span
              className="absolute inset-0 rounded-full bg-[#2A317A]/10"
              initial={{ scale: 0.6, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* ================= LOGO (ثابت، مبيلفش) ================= */}
            <div
              className="
                relative
                z-10
                flex
                min-w-0
                items-center
                justify-center
                max-w-full
                max-h-full
              "
            >
              <AnimatePresence mode="wait" initial={false}>
                {compact ? (
                  /* الأيقونة بس: بعد الـ scroll أو لما المنيو تتفتح */
                  <motion.img
                    key="icon"
                    src="/src/assets/images/logo-icon.webp"
                    alt="Alshorouk"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.25 }}
                    className="h-6 sm:h-7 md:h-8 w-auto max-w-full max-h-full object-contain"
                  />
                ) : (
                  /* اللوجو الكامل بالكلمة */
                  <motion.img
                    key="full"
                    src="/src/assets/images/AL Shorouk/Al-Shorouk Logo.png"
                    alt="Alshorouk Construction Company"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25 }}
                    className="
                      h-8
                      sm:h-10
                      md:h-11
                      w-auto
                      max-w-[100px]
                      min-[400px]:max-w-[140px]
                      sm:max-w-[180px]
                      md:max-w-[210px]
                      max-h-full
                      object-contain
                    "
                  />
                )}
              </AnimatePresence>
            </div>

            {/* ================= MENU ICON (هي اللي بتلف) ================= */}
            {!showLinks && (
              <motion.span
                className="relative z-10 shrink-0 text-[#2A317A]"
                aria-hidden="true"
                initial={false}
                animate={{ rotate: menuOpen ? 90 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {menuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </motion.span>
            )}
          </motion.button>

          {/* ================= DESKTOP LINKS ================= */}
          <AnimatePresence>
            {showLinks && (
              <motion.ul
                key={language}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3 }}
                className={linkListClass}
              >
                {navItems.map((item) => (
                  <li key={item.key} className="relative group">
                    <a
                      href={item.href}
                      className={`
                        ${linkTextClass}
                        text-[#3C3C3B]
                        group-hover:text-[#2A317A]
                        transition-colors
                        duration-300
                        group-hover:-translate-y-0.5
                      `}
                    >
                      {t(item.key)}
                    </a>

                    <span
                      className="
                        absolute
                        left-1/2
                        -bottom-1.5
                        h-[1.5px]
                        w-0
                        bg-[#2A317A]
                        -translate-x-1/2
                        transition-all
                        duration-300
                        ease-out
                        group-hover:w-full
                      "
                    />
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* ================= LANGUAGE SWITCHER ================= */}
          <div className="shrink-0 ps-1 sm:ps-2 border-s border-[#2A317A]/10">
            <LanguageSwitcher />
          </div>
        </motion.nav>
      </header>

      {/* ================= FULL SCREEN MENU ================= */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-[#FFFFFF]"
          >
            {/* الخطين الأفقيين: بس على الشاشات الطويلة كفاية، عشان ميعدّوش على النص */}
            <svg
              className="pointer-events-none fixed inset-0 hidden h-full w-full opacity-50 min-[700px]:block"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <motion.line
                x1="0"
                y1="9"
                x2="100"
                y2="9"
                stroke="#2A317A"
                strokeWidth="0.1"
                strokeDasharray="1 2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              <motion.line
                x1="0"
                y1="93"
                x2="100"
                y2="93"
                stroke="#2A317A"
                strokeWidth="0.1"
                strokeDasharray="1 2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.15, ease: "easeInOut" }}
              />
            </svg>

            {/* ================= CORNER BRACKETS ================= */}
            <span className="pointer-events-none fixed top-5 left-5 sm:top-8 sm:left-8 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-[#2A317A]" />
            <span className="pointer-events-none fixed top-5 right-5 sm:top-8 sm:right-8 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-[#2A317A]" />
            <span className="pointer-events-none fixed bottom-5 left-5 sm:bottom-8 sm:left-8 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-[#2A317A]" />
            <span className="pointer-events-none fixed bottom-5 right-5 sm:bottom-8 sm:right-8 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-[#2A317A]" />

            {/* ================= CONTENT ================= */}
            <div
              className="
                relative
                z-10
                flex
                flex-col
                items-center
                justify-center
                px-6
                pt-28
                pb-20
                sm:pt-32
              "
              style={{ minHeight: "100dvh" }}
            >
              <motion.ul
                key={language}
                className="flex flex-col items-center"
                style={{ gap: "clamp(0.35rem, 1.8vh, 1rem)" }}
              >
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.key}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{
                      duration: 0.5,
                      delay: reduceMotion ? 0 : i * 0.08,
                      ease: "easeOut",
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="
                        block
                        font-bold
                        uppercase
                        tracking-tight
                        text-[#3C3C3B]
                        hover:text-[#2A317A]
                        transition-colors
                        duration-300
                        text-center
                        leading-tight
                        text-2xl
                        sm:text-3xl
                      "
                    >
                      {t(item.key)}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>

              {/* الكلمة دي في الـ flow العادي بعد اللينكات، فمستحيل تركب على حاجة */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="relative z-10 mt-8 px-2 text-center text-xs text-[#3C3C3B] sm:mt-10 sm:text-sm"
              >
                alshorouk Construction &amp; Supply — Cairo, Egypt
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}