


import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  BarChart3,
  ChevronsRight,
  ExternalLink,
  Image,
  LayoutDashboard,
  LayoutTemplate,
  Mail,
  Menu,
  Newspaper,
  PanelsTopLeft,
  X,
} from "lucide-react";
import {
  ADMIN_LANG_KEY,
  adminChrome,
  adminT,
} from "../../../features/marketing/adminI18n";
import { useMarketing } from "../../../features/marketing/MarketingProvider";
import { FONT, PageHead, btnPrimary, btnQuiet, cardCls, fieldCls } from "../../../ui/adminUi";

const LOGO_SRC = "/images/AL%20Shorouk/Al-Shorouk%20Logo.png";
const LOGO_FALLBACK = "/src/assets/images/AL Shorouk/Al-Shorouk Logo.png";
const COLLAPSE_KEY = "admin-sidebar-collapsed";

const AdminLocaleContext = createContext(null);

export function useAdminLocale() {
  const ctx = useContext(AdminLocaleContext);
  if (!ctx) throw new Error("useAdminLocale must be used inside MarketingLayout");
  return ctx;
}

const linkDefs = [
  { to: "/admin/marketing", labelKey: "navDashboard", icon: LayoutDashboard, end: true, section: "main" },
  { to: "/admin/marketing/news", labelKey: "navNews", icon: Newspaper, section: "content" },
  { to: "/admin/marketing/projects", labelKey: "navProjects", icon: PanelsTopLeft, section: "content" },
  { to: "/admin/marketing/hero", labelKey: "navHero", icon: Image, section: "content" },
  { to: "/admin/marketing/homepage", labelKey: "navHomepage", icon: LayoutTemplate, section: "content" },
  { to: "/admin/marketing/inquiries", labelKey: "navInquiries", icon: Mail, section: "engage", badgeKey: "inquiries" },
  { to: "/admin/marketing/traffic", labelKey: "navTraffic", icon: BarChart3, section: "engage" },
];

const sectionDefs = [
  { id: "main", labelKey: null },
  { id: "content", labelKey: "sectionContent" },
  { id: "engage", labelKey: "sectionEngage" },
];

/* Legacy aliases: pages not yet migrated to adminUi keep working.
   Delete these once every page imports from ui/adminUi directly. */
export const fieldClass = fieldCls;
export const primaryButton = btnPrimary;
export const quietButton = btnQuiet;
export const panelClass = cardCls;
export function PageHeading(props) {
  return <PageHead {...props} />;
}

/* ------------------------------------------------------------------ */

function BrandMark({ className }) {
  const [src, setSrc] = useState(LOGO_SRC);
  return (
    <img
      src={src}
      alt="Al Shorouk"
      onError={() => {
        if (src !== LOGO_FALLBACK) setSrc(LOGO_FALLBACK);
      }}
      className={className}
    />
  );
}

function currentLink(pathname, links) {
  const exact = links.find((link) => link.end && pathname === link.to);
  if (exact) return exact;
  return (
    links
      .filter((link) => !link.end)
      .sort((a, b) => b.to.length - a.to.length)
      .find((link) => pathname === link.to || pathname.startsWith(`${link.to}/`)) || links[0]
  );
}

function NavItem({ link, collapsed, onNavigate, idPrefix, index, reduce }) {
  const Icon = link.icon;
  const badge = link.badge || 0;
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.04, duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <NavLink
        to={link.to}
        end={link.end}
        onClick={onNavigate}
        title={collapsed ? link.label : undefined}
        className="group relative flex h-12 items-center rounded-lg text-base font-semibold outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        {({ isActive }) => (
          <>
            <span className="absolute inset-0 rounded-lg bg-white/0 transition-colors duration-300 group-hover:bg-white/10 motion-reduce:transition-none" />
            {isActive && (
              <motion.span
                layoutId={`${idPrefix}-pill`}
                className="absolute inset-0 rounded-lg bg-[#2A317A] shadow-md"
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span
              className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center transition-all duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${
                isActive ? "text-white" : "text-white/60 group-hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.2 : 1.8} />
              {collapsed && badge > 0 && (
                <span className="absolute end-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-white ring-2 ring-black" />
              )}
            </span>
            <span
              className={`relative z-10 min-w-0 flex-1 truncate whitespace-nowrap transition-opacity duration-300 motion-reduce:transition-none ${
                collapsed ? "opacity-0" : "opacity-100"
              } ${isActive ? "text-white" : "text-white/70 group-hover:text-white"}`}
            >
              {link.label}
            </span>
            {badge > 0 && (
              <span
                className={`relative z-10 me-3 grid h-6 min-w-6 place-items-center rounded-md bg-white px-1.5 text-sm font-bold text-black transition-opacity duration-300 motion-reduce:transition-none ${
                  collapsed ? "opacity-0" : "opacity-100"
                }`}
                dir="ltr"
              >
                {badge}
              </span>
            )}
          </>
        )}
      </NavLink>
    </motion.div>
  );
}

function SidebarNav({ links, sections, collapsed, onNavigate, idPrefix, reduce }) {
  let counter = 0;
  return (
    <nav className="flex flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden px-3 py-3">
      {sections.map((section) => {
        const items = links.filter((l) => l.section === section.id);
        if (!items.length) return null;
        return (
          <div key={section.id} className="flex flex-col gap-1">
            {section.label &&
              (collapsed ? (
                <div className="mx-2 mb-1 h-px bg-white/15" />
              ) : (
                <p className="mb-1 px-3 text-sm font-bold tracking-wide text-white/40">{section.label}</p>
              ))}
            {items.map((link) => (
              <NavItem
                key={link.to}
                link={link}
                collapsed={collapsed}
                onNavigate={onNavigate}
                idPrefix={idPrefix}
                index={counter++}
                reduce={reduce}
              />
            ))}
          </div>
        );
      })}
    </nav>
  );
}

function LangToggle({ lang, setLang, t, block = false }) {
  const next = lang === "ar" ? "en" : "ar";
  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      className={`inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-white/20 px-3 text-sm font-bold text-white transition-colors duration-300 hover:bg-white/10 motion-reduce:transition-none ${
        block ? "w-full" : ""
      }`}
      aria-label={next === "en" ? t("langToggleToEn") : t("langToggleToAr")}
    >
      <span className={lang === "ar" ? "" : "opacity-50"}>ع</span>
      <span className="text-white/40">/</span>
      <span className={lang === "en" ? "" : "opacity-50"}>EN</span>
    </button>
  );
}

function SidebarShell({ onClose, showClose, collapsed, onToggleCollapse, links, sections, t, lang, setLang, idPrefix, reduce }) {
  const collapseLabel = lang === "ar" ? "طي القائمة" : "Collapse";
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#2A317A]/50 to-transparent" />

      {/* brand */}
      <div className="relative flex h-20 shrink-0 items-center gap-3 px-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-white shadow-md">
          <BrandMark className="h-8 w-auto max-w-[2.25rem] object-contain" />
        </div>
        <div
          className={`min-w-0 flex-1 transition-opacity duration-300 motion-reduce:transition-none ${
            collapsed ? "opacity-0" : "opacity-100"
          }`}
        >
          <p className="truncate text-lg font-bold leading-tight">Al Shorouk</p>
          <p className="truncate text-sm leading-tight text-white/50">{t("brandSubtitle")}</p>
        </div>
        {showClose && (
          <button
            type="button"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label={t("closeMenu")}
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col">
        <SidebarNav
          links={links}
          sections={sections}
          collapsed={collapsed}
          onNavigate={onClose}
          idPrefix={idPrefix}
          reduce={reduce}
        />
      </div>

      {/* footer */}
      <div className="relative shrink-0 space-y-1 border-t border-white/10 p-3">
        <LangToggle lang={lang} setLang={setLang} t={t} block />
        <a
          href="/"
          title={collapsed ? t("viewSite") : undefined}
          className="group flex h-11 items-center rounded-lg text-base font-semibold text-white/70 transition-colors duration-300 hover:bg-white/10 hover:text-white motion-reduce:transition-none"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center">
            <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 motion-reduce:transition-none" />
          </span>
          <span
            className={`truncate whitespace-nowrap transition-opacity duration-300 motion-reduce:transition-none ${
              collapsed ? "opacity-0" : "opacity-100"
            }`}
          >
            {t("viewSite")}
          </span>
        </a>
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            title={collapsed ? undefined : collapseLabel}
            aria-label={collapseLabel}
            aria-expanded={!collapsed}
            className="flex h-11 w-full items-center rounded-lg text-base font-semibold text-white/70 transition-colors duration-300 hover:bg-white/10 hover:text-white motion-reduce:transition-none"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center">
              <ChevronsRight
                className={`h-4 w-4 transition-transform duration-300 motion-reduce:transition-none ${
                  collapsed ? "rtl:rotate-180" : "ltr:rotate-180"
                }`}
              />
            </span>
            <span
              className={`truncate whitespace-nowrap transition-opacity duration-300 motion-reduce:transition-none ${
                collapsed ? "opacity-0" : "opacity-100"
              }`}
            >
              {collapseLabel}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function MarketingLayout() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(COLLAPSE_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem(ADMIN_LANG_KEY) === "en" ? "en" : "ar";
    } catch {
      return "ar";
    }
  });
  const reduce = useReducedMotion();
  const location = useLocation();
  const { inquiries } = useMarketing(); // remove these 2 lines + `badges` below if the layout sits outside MarketingProvider
  const unread = (inquiries || []).filter((item) => !item.read).length;

  const setLang = (next) => {
    setLangState(next);
    try {
      localStorage.setItem(ADMIN_LANG_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const toggleCollapsed = () =>
    setCollapsed((current) => {
      const next = !current;
      try {
        localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });

  const t = useMemo(() => (key) => adminT(adminChrome, lang, key), [lang]);

  const badges = useMemo(() => ({ inquiries: unread }), [unread]);

  const links = useMemo(
    () =>
      linkDefs.map((link) => ({
        ...link,
        label: t(link.labelKey),
        badge: link.badgeKey ? badges[link.badgeKey] : 0,
      })),
    [t, badges]
  );

  const sections = useMemo(
    () =>
      sectionDefs.map((section) => ({
        ...section,
        label: section.labelKey ? t(section.labelKey) : null,
      })),
    [t]
  );

  const active = useMemo(() => currentLink(location.pathname, links), [location.pathname, links]);
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);
  const localeValue = useMemo(() => ({ lang, setLang, t, dir }), [lang, t, dir]);
  const offscreen = dir === "rtl" ? "100%" : "-100%";

  return (
    <AdminLocaleContext.Provider value={localeValue}>
      <div
        dir={dir}
        lang={lang}
        className="relative min-h-screen overflow-x-hidden bg-[#3C3C3B]/[0.04] text-black"
        style={{ fontFamily: FONT }}
      >
        {/* mobile top bar */}
        <div className="sticky top-0 z-30 flex h-14 items-center gap-2 bg-black px-3 text-white md:hidden">
          <button
            type="button"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            aria-label={t("openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-lg font-bold">{active.label}</h2>
          </div>
          <LangToggle lang={lang} setLang={setLang} t={t} />
          <a
            href="/"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            aria-label={t("viewSite")}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* desktop sidebar */}
        <aside
          className={`fixed inset-y-0 start-0 z-40 hidden overflow-hidden transition-[width] duration-300 ease-out motion-reduce:transition-none md:block ${
            collapsed ? "w-[4.5rem]" : "w-[15rem]"
          }`}
        >
          <SidebarShell
            onClose={close}
            showClose={false}
            collapsed={collapsed}
            onToggleCollapse={toggleCollapsed}
            links={links}
            sections={sections}
            t={t}
            lang={lang}
            setLang={setLang}
            idPrefix="desktop"
            reduce={reduce}
          />
        </aside>

        {/* mobile drawer */}
        <AnimatePresence>
          {open && (
            <>
              <motion.button
                type="button"
                key="overlay"
                aria-label={t("closeDrawer")}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={close}
              />
              <motion.aside
                key="drawer"
                className="fixed inset-y-0 start-0 z-50 w-[16rem] md:hidden"
                initial={reduce ? false : { x: offscreen }}
                animate={{ x: 0 }}
                exit={{ x: offscreen }}
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 38 }}
              >
                <SidebarShell
                  onClose={close}
                  showClose
                  collapsed={false}
                  links={links}
                  sections={sections}
                  t={t}
                  lang={lang}
                  setLang={setLang}
                  idPrefix="mobile"
                  reduce={reduce}
                />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <main
          className={`min-h-screen px-4 py-5 transition-[padding] duration-300 ease-out motion-reduce:transition-none sm:px-6 md:py-6 md:pe-6 ${
            collapsed ? "md:ps-[6rem]" : "md:ps-[16.5rem]"
          }`}
        >
          <motion.div
            key={location.pathname}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </AdminLocaleContext.Provider>
  );
}