/** Marketing admin chrome strings (AR/EN). Content fields stay bilingual separately. */
export const ADMIN_LANG_KEY = "alshorouk.marketing.adminLang";

export const adminChrome = {
  brandSubtitle: { ar: "لوحة التسويق", en: "Marketing console" },
  viewSite: { ar: "عرض الموقع", en: "View site" },
  openMenu: { ar: "القائمة", en: "Menu" },
  closeMenu: { ar: "إغلاق", en: "Close" },
  closeDrawer: { ar: "إغلاق القائمة", en: "Close menu" },
  langToggleToEn: { ar: "English", en: "English" },
  langToggleToAr: { ar: "العربية", en: "العربية" },
  sectionMain: { ar: null, en: null },
  sectionContent: { ar: "المحتوى", en: "Content" },
  sectionEngage: { ar: "التفاعل", en: "Engage" },
  navDashboard: { ar: "نظرة عامة", en: "Overview" },
  navNews: { ar: "الأخبار", en: "News" },
  navProjects: { ar: "المشاريع", en: "Projects" },
  navHero: { ar: "الشريحة الرئيسية", en: "Hero" },
  navHomepage: { ar: "أقسام الصفحة الرئيسية", en: "Homepage sections" },
  navInquiries: { ar: "رسائل التواصل", en: "Inquiries" },
  navTraffic: { ar: "الزيارات", en: "Traffic" },
  save: { ar: "حفظ", en: "Save" },
  saved: { ar: "تم الحفظ.", en: "Saved." },
  add: { ar: "إضافة", en: "Add" },
  remove: { ar: "حذف", en: "Delete" },
  moveUp: { ar: "أعلى", en: "Up" },
  moveDown: { ar: "أسفل", en: "Down" },
  fieldAr: { ar: "بالعربية", en: "Arabic" },
  fieldEn: { ar: "بالإنجليزية", en: "English" },
  empty: { ar: "لا يوجد محتوى بعد.", en: "No content yet." },
  tabAbout: { ar: "من نحن", en: "About" },
  tabServices: { ar: "الخدمات", en: "Services" },
  tabProjects: { ar: "قسم المشاريع", en: "Projects block" },
  tabTestimonials: { ar: "آراء العملاء", en: "Testimonials" },
  tabPartners: { ar: "الشركاء", en: "Partners" },
  tabFooter: { ar: "التواصل", en: "Footer & contact" },
  homepageTitle: { ar: "أقسام الصفحة الرئيسية", en: "Homepage sections" },
  homepageText: {
    ar: "عدّل نصوص وبيانات أقسام الصفحة الرئيسية. المشاريع المعروضة تُدار من صفحة المشاريع المنشورة.",
    en: "Edit homepage section copy and lists. Carousel projects come from published marketing projects.",
  },
  aboutKicker: { ar: "هوية", en: "IDENTITY" },
  servicesKicker: { ar: "خدمات", en: "SERVICES" },
  projectsKicker: { ar: "عرض", en: "SHOWCASE" },
  testimonialsKicker: { ar: "ثقة", en: "TRUST" },
  partnersKicker: { ar: "شركاء", en: "PARTNERS" },
  footerKicker: { ar: "تواصل", en: "CONTACT" },
  labelEyebrow: { ar: "العنوان الفرعي", en: "Eyebrow" },
  labelTitle: { ar: "العنوان", en: "Title" },
  labelTitleHighlight: { ar: "تمييز العنوان", en: "Title highlight" },
  labelTitleBefore: { ar: "بداية العنوان", en: "Title before" },
  labelSubtitle: { ar: "الوصف", en: "Subtitle" },
  labelDescription: { ar: "الوصف", en: "Description" },
  labelCta: { ar: "نص الرابط", en: "CTA label" },
  labelHref: { ar: "الرابط", en: "Link" },
  labelImage: { ar: "الصورة", en: "Image" },
  labelImageAlt: { ar: "وصف الصورة", en: "Image alt" },
  labelIcon: { ar: "الأيقونة", en: "Icon" },
  labelPosition: { ar: "الموضع", en: "Position" },
  labelTarget: { ar: "الرقم", en: "Target" },
  labelSuffix: { ar: "اللاحقة", en: "Suffix" },
  labelBadge: { ar: "الشارة", en: "Badge" },
  labelName: { ar: "الاسم", en: "Name" },
  labelRole: { ar: "الدور", en: "Role" },
  labelText: { ar: "النص", en: "Text" },
  labelLogo: { ar: "الشعار", en: "Logo" },
  labelPhone: { ar: "الهاتف", en: "Phone" },
  labelEmail: { ar: "البريد", en: "Email" },
  labelAddress: { ar: "العنوان", en: "Address" },
  labelDays: { ar: "الأيام", en: "Days" },
  labelTime: { ar: "الوقت", en: "Hours" },
  labelNetwork: { ar: "الشبكة", en: "Network" },
  labelCompany: { ar: "اسم الشركة", en: "Company name" },
  labelBlurb: { ar: "نبذة الشركة", en: "Company blurb" },
  labelCopyright: { ar: "اسم حقوق النشر", en: "Copyright name" },
  featuresHeading: { ar: "المميزات", en: "Features" },
  statsHeading: { ar: "الإحصائيات", en: "Stats" },
  bannerHeading: { ar: "شريط الدعوة", en: "CTA banner" },
  itemsHeading: { ar: "العناصر", en: "Items" },
  quickLinksHeading: { ar: "روابط سريعة", en: "Quick links" },
  socialHeading: { ar: "وسائل التواصل", en: "Social links" },
  hoursHeading: { ar: "ساعات العمل", en: "Working hours" },
  posLeft: { ar: "يسار", en: "Left" },
  posRight: { ar: "يمين", en: "Right" },
  uploadFile: { ar: "رفع ملف", en: "Upload file" },
  projectsHint: {
    ar: "قائمة المشاريع في الصفحة الرئيسية تأتي من المشاريع المنشورة. عدّل العناوين هنا فقط.",
    en: "Homepage project cards come from published projects. Edit section titles here only.",
  },
};

export function adminT(dict, lang, key) {
  const entry = dict[key];
  if (!entry) return key;
  if (typeof entry === "string") return entry;
  return entry[lang] || entry.en || entry.ar || key;
}

export function pair(ar, en) {
  return { ar: ar || "", en: en || "" };
}

export function readPair(value) {
  if (!value) return { ar: "", en: "" };
  if (typeof value === "string") return { ar: value, en: value };
  return {
    ar: typeof value.ar === "string" ? value.ar : "",
    en: typeof value.en === "string" ? value.en : "",
  };
}

export function pickPair(value, lang = "ar") {
  const p = readPair(value);
  if (lang === "en") return p.en || p.ar;
  return p.ar || p.en;
}
