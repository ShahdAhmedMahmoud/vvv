// نصوص فورم التقديم بالعربي والإنجليزي
// الـ value بتاعة الـ notice period والـ currency بتفضل إنجليزي (اللي بيتبعت للـ API)،
// والمتغير بس هو الـ label اللي بيظهر للمستخدم.

export const applyFormText = {
  en: {
    applyNow: "Apply Now",
    joinWaitingList: "Join Waiting List",
    requiredFields: "Required fields",

    personalDetails: "Personal details",
    professionalBackground: "Professional background",
    compensation: "Compensation",
    resumeSkills: "Resume & skills",
    coverLetterOptional: "Cover letter (optional)",

    fullName: "Full Name",
    fullNamePh: "e.g. Sara Ahmed",
    email: "Email",
    emailPh: "you@example.com",
    phone: "Phone",
    phonePh: "+20 100 000 0000",
    education: "Education",
    educationPh: "e.g. B.Sc. in Statistics — Cairo University",
    noticePeriod: "Notice Period",
    noticePh: "Select notice period...",
    notice: {
      Immediate: "Immediate",
      "30 days": "30 days",
      "2 months": "2 months",
      "3 months": "3 months",
      "Notice Required": "Notice Required",
    },
    currentSalary: "Current Salary",
    expectedSalary: "Expected Salary",
    egp: "EGP",

    uploadCv: "Upload CV",
    clickUpload: "Click to upload your CV",
    dragDrop: "or drag & drop it here",
    cvHint: "PDF, DOC, DOCX — Max 10MB",
    removeCv: "Remove CV",

    skills: "Skills",
    skillPh: "Type a skill and press Enter",
    add: "Add",
    suggestedSkills: "Suggested skills",
    removeSkill: "Remove",

    coverPh: "Tell us why you'd be a great fit for this role...",

    submit: "Submit Application",
    sending: "Sending...",

    nameRequired: "Full name is required.",
    emailRequired: "Email is required.",
    emailInvalid: "Enter a valid email address.",
    phoneRequired: "Phone number is required.",
    phoneInvalid: "Enter a valid phone number.",
    cvRequired: "Please upload your CV.",
    skillsRequired: "Add at least one skill.",
    cvType: "Please upload a PDF, DOC or DOCX file.",
    cvSize: "File is too large — max 10MB.",
    formError: "Something went wrong. Please try again.",

    sentTitle: "Application sent!",
    sentBody: (name) => [
      `Thanks ${name}, we received your application for `,
      ". Our team will get back to you soon.",
    ],
    close: "Close",
    applyFor: "Apply for",
  },

  ar: {
    applyNow: "قدّم الآن",
    joinWaitingList: "انضم لقائمة الانتظار",
    requiredFields: "الحقول المطلوبة",

    personalDetails: "البيانات الشخصية",
    professionalBackground: "الخلفية المهنية",
    compensation: "الراتب",
    resumeSkills: "السيرة الذاتية والمهارات",
    coverLetterOptional: "خطاب التقديم (اختياري)",

    fullName: "الاسم بالكامل",
    fullNamePh: "مثال: سارة أحمد",
    email: "البريد الإلكتروني",
    emailPh: "you@example.com",
    phone: "رقم الهاتف",
    phonePh: "+20 100 000 0000",
    education: "المؤهل الدراسي",
    educationPh: "مثال: بكالوريوس إحصاء — جامعة القاهرة",
    noticePeriod: "فترة الإشعار",
    noticePh: "اختر فترة الإشعار...",
    notice: {
      Immediate: "فوري",
      "30 days": "30 يوم",
      "2 months": "شهرين",
      "3 months": "3 شهور",
      "Notice Required": "يلزم إشعار",
    },
    currentSalary: "الراتب الحالي",
    expectedSalary: "الراتب المتوقع",
    egp: "جنيه",

    uploadCv: "ارفع السيرة الذاتية",
    clickUpload: "اضغط لرفع السيرة الذاتية",
    dragDrop: "أو اسحب الملف وأفلته هنا",
    cvHint: "PDF, DOC, DOCX — بحد أقصى 10MB",
    removeCv: "حذف الملف",

    skills: "المهارات",
    skillPh: "اكتب مهارة واضغط Enter",
    add: "إضافة",
    suggestedSkills: "مهارات مقترحة",
    removeSkill: "حذف",

    coverPh: "احكي لنا لماذا أنت مناسب لهذه الوظيفة...",

    submit: "إرسال الطلب",
    sending: "جارٍ الإرسال...",

    nameRequired: "الاسم بالكامل مطلوب.",
    emailRequired: "البريد الإلكتروني مطلوب.",
    emailInvalid: "أدخل بريدًا إلكترونيًا صحيحًا.",
    phoneRequired: "رقم الهاتف مطلوب.",
    phoneInvalid: "أدخل رقم هاتف صحيح.",
    cvRequired: "من فضلك ارفع السيرة الذاتية.",
    skillsRequired: "أضف مهارة واحدة على الأقل.",
    cvType: "من فضلك ارفع ملف PDF أو DOC أو DOCX.",
    cvSize: "حجم الملف كبير — الحد الأقصى 10MB.",
    formError: "حدث خطأ ما. حاول مرة أخرى.",

    sentTitle: "تم إرسال طلبك!",
    sentBody: (name) => [
      `شكرًا ${name}، استلمنا طلبك لوظيفة `,
      ". سيتواصل معك فريقنا قريبًا.",
    ],
    close: "إغلاق",
    applyFor: "التقديم على",
  },
};