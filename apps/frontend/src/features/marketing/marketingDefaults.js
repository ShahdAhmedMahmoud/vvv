/** Seed content for homepage marketing sections (bilingual AR/EN). */
export const aboutDefaults = {
  eyebrow: {"ar":"اكتشف قصتنا","en":"Discover Our Story"},
  title: {"ar":"من","en":"About"},
  titleHighlight: {"ar":"نحن","en":"Us"},
  description: {"ar":"نحن شركة مقاولات رائدة، ملتزمون بالتميز والابتكار، ونقدم مشاريع عالية الجودة تشكل أفق مصر.","en":"We are a leading construction company, committed to excellence and innovation, delivering high-quality projects that shape Egypt's skyline."},
  ctaLabel: {"ar":"اعرف المزيد عنا →","en":"Learn more about us →"},
  ctaHref: "/about",
  image: "/src/assets/images/DSC_3583.JPG",
  imageAlt: {"ar":"مشروع الشروق","en":"alshorouk project"},
  features: [
    { id: "feat-craft", icon: "Building2", title: {"ar":"حرفية عالية","en":"Quality Craftsmanship"}, description: {"ar":"نستخدم مواد فائقة وتقنيات دقيقة لضمان بقاء كل منشأة عبر الزمن.","en":"We use premium materials and precise techniques to ensure every structure stands the test of time."}, position: "left" },
    { id: "feat-engineers", icon: "Award", title: {"ar":"مهندسون معتمدون","en":"Certified Engineers"}, description: {"ar":"تقود مشاريعنا مهندسون معتمدون يقدمون الخبرة والرقابة الصارمة في كل مرحلة.","en":"Our projects are led by certified engineers who bring technical expertise and strict quality control to every phase."}, position: "left" },
    { id: "feat-team", icon: "Users", title: {"ar":"فريق محترف","en":"Expert Team"}, description: {"ar":"قوة عاملة تتجاوز 5000 محترف متفانون لتحويل رؤيتك إلى واقع.","en":"A skilled workforce of over 5000 professionals dedicated to bringing your vision to life."}, position: "left" },
    { id: "feat-delivery", icon: "Calendar", title: {"ar":"تسليم في الموعد","en":"On-Time Delivery"}, description: {"ar":"نخطط بدقة لتسليم كل مشروع في موعده دون المساس بالجودة.","en":"We plan meticulously to deliver every project on schedule, without compromising quality."}, position: "right" },
    { id: "feat-equipment", icon: "Wrench", title: {"ar":"معدات حديثة","en":"Modern Equipment"}, description: {"ar":"نمتلك أحدث المعدات الثقيلة لإنجاز المشاريع بكفاءة.","en":"Equipped with the latest heavy machinery to handle projects of any scale efficiently."}, position: "right" },
    { id: "feat-safety", icon: "ShieldCheck", title: {"ar":"السلامة أولًا","en":"Safety First"}, description: {"ar":"معايير سلامة صارمة تحمي فريقنا وتضمن تنفيذًا آمنًا.","en":"Strict safety standards protect our team and ensure smooth, secure project execution."}, position: "right" },
  ],
  stats: [
    { id: "stat-manpower", icon: "Users", target: 5000, suffix: "+", label: {"ar":"القوة العاملة","en":"MANPOWER"} },
    { id: "stat-equipment", icon: "Forklift", target: 500, suffix: "+", label: {"ar":"معدات ثقيلة","en":"HEAVY EQUIPMENT"} },
    { id: "stat-concrete", icon: "Blocks", target: 1, suffix: "M", label: {"ar":"خرسانة","en":"CONCRETE"} },
    { id: "stat-active", icon: "HardHat", target: 63, suffix: "+", label: {"ar":"مشاريع نشطة","en":"ACTIVE PROJECTS"} },
    { id: "stat-delivered", icon: "BadgeCheck", target: 42, suffix: "", label: {"ar":"مشاريع مسلمة","en":"DELIVERED PROJECTS"} },
  ],
  banner: {
    title: {"ar":"هل أنت مستعد لبناء مشروعك القادم؟","en":"Ready to build your next project?"},
    subtitle: {"ar":"لنبني شيئًا عظيمًا معًا.","en":"Let's create something great together."},
    buttonLabel: {"ar":"تواصل معنا","en":"Get In Touch"},
    buttonHref: "/contact",
  },
};

export const servicesDefaults = {
  title: {"ar":"خدماتنا","en":"Our"},
  titleHighlight: {"ar":"الخدمات","en":"Services"},
  subtitle: {"ar":"حلول مقاولات شاملة مصممة لكل مشروع","en":"Comprehensive construction solutions tailored to every project"},
  items: [
    { id: "svc-contracting", icon: "HardHat", title: {"ar":"المقاولات العامة","en":"General Contracting"}, description: {"ar":"إدارة متكاملة للمشاريع السكنية والتجارية والصناعية.","en":"End-to-end construction management for residential, commercial, and industrial projects."}, image: "https://images.unsplash.com/photo-1653280662710-1cac52cde6d7?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
    { id: "svc-pm", icon: "ClipboardList", title: {"ar":"إدارة المشاريع","en":"Project Management"}, description: {"ar":"إشراف احترافي يضمن التسليم في الموعد وضبط الجودة.","en":"Professional oversight ensuring on-time, on-budget delivery with rigorous quality standards."}, image: "https://images.unsplash.com/photo-1762146828422-50a8bd416d3c?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
    { id: "svc-design", icon: "Building2", title: {"ar":"التصميم والبناء","en":"Design & Build"}, description: {"ar":"حلول متكاملة من الفكرة إلى التنفيذ تحت سقف واحد.","en":"Integrated design-build solutions from concept to completion under one roof."}, image: "https://images.unsplash.com/photo-1773637779568-8bf920d848e6?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
    { id: "svc-reno", icon: "Hammer", title: {"ar":"التجديد والترميم","en":"Renovation & Restoration"}, description: {"ar":"ترميم المباني التراثية وتجديد المنشآت القائمة.","en":"Expert restoration of heritage buildings and modern renovation of existing structures."}, image: "https://images.unsplash.com/photo-1690122254245-f85d6e738705?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
    { id: "svc-infra", icon: "Route", title: {"ar":"البنية التحتية","en":"Infrastructure"}, description: {"ar":"طرق وجسور ومرافق ومشاريع مدنية كبرى عبر مصر.","en":"Roads, bridges, utilities, and large-scale civil engineering projects across Egypt."}, image: "https://images.unsplash.com/photo-1715199399795-73deba5bee63?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
    { id: "svc-mep", icon: "Wrench", title: {"ar":"أنظمة MEP","en":"MEP Systems"}, description: {"ar":"هندسة وتركيب كامل للأنظمة الميكانيكية والكهربائية والصحية.","en":"Complete mechanical, electrical, and plumbing engineering and installation."}, image: "https://images.unsplash.com/photo-1744113439895-14529bb2f6e6?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
  ],
};

export const projectsSectionDefaults = {
  title: {"ar":"مشاريعنا","en":"Our"},
  titleHighlight: {"ar":"المشاريع","en":"Projects"},
  subtitle: {"ar":"عرض لأبرز مشاريع الشروق عبر مصر","en":"A showcase of alshorouk's landmark developments across Egypt"},
};

export const testimonialsDefaults = {
  badge: {"ar":"آراء العملاء","en":"Testimonials"},
  titleBefore: {"ar":"ماذا يقول","en":"What Our"},
  titleHighlight: {"ar":"عملاؤنا","en":"Clients Say"},
  subtitle: {"ar":"موثوق به من المطورين والمستثمرين والشركات في مصر.","en":"Trusted by developers, investors, and businesses across Egypt."},
  items: [
    { id: "t1", text: {"ar":"سلمت الشروق برجنا التجاري قبل الموعد دون المساس بالجودة.","en":"alshorouk delivered our commercial tower ahead of schedule without compromising on quality. Their engineering team was responsive at every stage."}, image: "https://i.pravatar.cc/100?img=12", name: "Ahmed El-Sayed", role: {"ar":"مطور عقاري","en":"Real Estate Developer"} },
    { id: "t2", text: {"ar":"من أول زيارة للموقع حتى التسليم، كان التواصل واضحًا واحترافيًا.","en":"From the first site visit to handover, communication was clear and professional. Highly recommend for large-scale projects."}, image: "https://i.pravatar.cc/100?img=32", name: "Mona Farid", role: {"ar":"مالك مشروع، العاصمة الإدارية","en":"Project Owner, New Capital"} },
    { id: "t3", text: {"ar":"جودة أعمال الخرسانة والتشطيب تفوقت توقعاتنا.","en":"The quality of concrete work and structural finishing exceeded our expectations. A team that truly understands precision."}, image: "https://i.pravatar.cc/100?img=5", name: "Karim Abdallah", role: {"ar":"مدير منشأة","en":"Facility Manager"} },
    { id: "t4", text: {"ar":"معايير السلامة في الموقع كانت مبهرة طوال المشروع.","en":"Safety standards on site were impressive throughout. It's rare to find a contractor this disciplined about site management."}, image: "https://i.pravatar.cc/100?img=15", name: "Sara Hamdy", role: {"ar":"مستثمر","en":"Investor"} },
    { id: "t5", text: {"ar":"وثقنا بالشروق في توسعة البنية التحتية وتعاملوا التعقيد بخبرة.","en":"We trusted alshorouk with our infrastructure expansion, and they handled the complexity of the project with real expertise."}, image: "https://i.pravatar.cc/100?img=8", name: "Youssef Adel", role: {"ar":"مدير عمليات","en":"Operations Director"} },
    { id: "t6", text: {"ar":"نهجهم التصميم والبناء وفر علينا أشهرًا من التنسيق.","en":"Their design-build approach saved us months of coordination. One team, one clear plan, and a result we're proud of."}, image: "https://i.pravatar.cc/100?img=45", name: "Nourhan Tarek", role: {"ar":"عميل، Midtown Solo","en":"Client, Midtown Solo"} },
    { id: "t7", text: {"ar":"احترافيون وملتزمون بالمواعيد وشفافون بالتكاليف من اليوم الأول.","en":"Professional, punctual, and transparent about costs from day one. Exactly what you want in a construction partner."}, image: "https://i.pravatar.cc/100?img=22", name: "Tamer Fathy", role: {"ar":"صاحب أعمال","en":"Business Owner"} },
    { id: "t8", text: {"ar":"تم تجديد منشأتنا بعناية كبيرة لتقليل التعطيل على العمل.","en":"The renovation of our facility was handled with great care to minimize disruption to our daily operations."}, image: "https://i.pravatar.cc/100?img=51", name: "Rania Ezzat", role: {"ar":"مدير عقار","en":"Property Manager"} },
    { id: "t9", text: {"ar":"شريك موثوق في عقد البنية التحتية الحكومي — تسليم وفق المواصفات والميزانية.","en":"A reliable partner for our government infrastructure contract - delivered to spec and within budget."}, image: "https://i.pravatar.cc/100?img=60", name: "Hossam Nabil", role: {"ar":"منسق حكومي","en":"Government Liaison"} },
  ],
};

export const partnersDefaults = {
  badge: {"ar":"شركاؤنا","en":"Our Partners"},
  title: {"ar":"موثوق به من قادة القطاع","en":"Trusted by Industry Leaders"},
  subtitle: {"ar":"نفخر بالتعاون مع الجهات الحكومية والمطورين والمؤسسات عبر مصر.","en":"We're proud to collaborate with leading government bodies, developers, and enterprises across Egypt to deliver excellence on every project."},
  items: [
    { id: "p-tmg", name: "TMG", logo: "/src/assets/images/partners/tmg.jpg" },
    { id: "p-aib", name: "Arab International Bank", logo: "/src/assets/images/partners/aib.png" },
    { id: "p-mohp", name: {"ar":"وزارة الصحة والسكان","en":"Ministry of Health & Population"}, logo: "/src/assets/images/partners/mohp.jpg" },
    { id: "p-tolip", name: "Tolip", logo: "/src/assets/images/partners/tolip1.jpg" },
    { id: "p-defense", name: {"ar":"وزارة الدفاع والطرق","en":"Ministers of National Defense and Roads"}, logo: "/src/assets/images/partners/defense-roads.jpg" },
    { id: "p-arco", name: "ARCO", logo: "/src/assets/images/partners/arco.jpg" },
    { id: "p-emaar", name: "EMAAR", logo: "/src/assets/images/partners/emaar.png" },
    { id: "p-better", name: "Better Home", logo: "/src/assets/images/partners/betterhome.jpg" },
    { id: "p-cscec", name: "CSCEC", logo: "/src/assets/images/partners/cscec.png" },
    { id: "p-mission", name: "Mission La\u00efque Fran\u00e7aise", logo: "/src/assets/images/partners/mission.png" },
    { id: "p-army", name: {"ar":"الجيش","en":"The Army"}, logo: "/src/assets/images/partners/army.jpg" },
  ],
};

export const footerDefaults = {
  ctaTitle: {"ar":"هل لديك مشروع؟","en":"Have a project in mind?"},
  ctaHighlight: {"ar":"لنبنه معًا.","en":"Let's build it together."},
  ctaButtonLabel: {"ar":"تواصل معنا","en":"Contact Us"},
  ctaButtonHref: "/contact",
  companyName: "AL SHOROUK",
  companyBlurb: {"ar":"نبني مستقبل مصر بدقة ونزاهة وخبرة تتجاوز عقدًا من الزمن.","en":"Building Egypt's future with precision, integrity, and over a decade of construction excellence."},
  quickLinks: [
    { id: "ql-home", label: {"ar":"الرئيسية","en":"Home"}, href: "#home" },
    { id: "ql-about", label: {"ar":"من نحن","en":"About"}, href: "#about" },
    { id: "ql-services", label: {"ar":"الخدمات","en":"Services"}, href: "#services" },
    { id: "ql-projects", label: {"ar":"المشاريع","en":"Projects"}, href: "#projects" },
    { id: "ql-timeline", label: {"ar":"الجدول الزمني","en":"Timeline"}, href: "#timeline" },
  ],
  socialLinks: [
    { id: "soc-fb", name: "Facebook", network: "facebook", href: "https://www.facebook.com/alshoroukconstruction?mibextid=ZbWKw" },
    { id: "soc-ig", name: "Instagram", network: "instagram", href: "https://www.instagram.com/alshoroukconstruction" },
    { id: "soc-li", name: "LinkedIn", network: "linkedin", href: "https://www.linkedin.com/company/al-shorouk-construction-company/home/" },
    { id: "soc-tt", name: "TikTok", network: "tiktok", href: "https://www.tiktok.com/@alshoroukconstruction" },
  ],
  address: {"ar":"القاهرة، مصر","en":"Cairo, Egypt"},
  phone: "+20 100 000 0000",
  phoneHref: "tel:+201000000000",
  email: "info@alshorouk.net",
  hours: [
    { id: "h1", days: {"ar":"الأحد - الخميس","en":"Sun - Thu"}, time: {"ar":"8:00 ص - 5:00 م","en":"8:00 AM - 5:00 PM"} },
    { id: "h2", days: {"ar":"الجمعة - السبت","en":"Friday-Saturday"}, time: {"ar":"مغلق","en":"Closed"} },
  ],
  copyrightName: "alshorouk Construction & Supply",
  privacyHref: "/privacy-policy",
  termsHref: "/terms",
};
