// // import { useMemo, useRef, useState } from "react";
// // import { AnimatePresence, motion } from "framer-motion";
// // import {
// //   AlertCircle,
// //   CalendarClock,
// //   CheckCircle2,
// //   ChevronDown,
// //   FileText,
// //   GraduationCap,
// //   Loader2,
// //   Mail,
// //   Phone,
// //   Plus,
// //   Send,
// //   Sparkles,
// //   Trash2,
// //   UploadCloud,
// //   User,
// //   Wallet,
// //   X,
// // } from "lucide-react";

// // const NOTICE_PERIODS = ["Immediate", "30 days", "2 months", "3 months", "Notice Required"];
// // const CURRENCIES = [
// //   { value: "EGP", label: "EGP (Egyptian Pound)" },
// //   { value: "USD", label: "USD (US Dollar)" },
// //   { value: "EUR", label: "EUR (Euro)" },
// //   { value: "SAR", label: "SAR (Saudi Riyal)" },
// //   { value: "AED", label: "AED (UAE Dirham)" },
// // ];
// // const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
// // const ALLOWED_EXT = ["pdf", "doc", "docx"];

// // const inputBase =
// //   "w-full border bg-white py-3 pr-3 text-[14px] text-[#14212E] outline-none transition-all placeholder:text-slate-400 focus:border-[#2A317A] focus:ring-4 focus:ring-[#2A317A]/10";

// // const formatSize = (bytes) =>
// //   bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(0)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

// // /* ---------- Field wrapper ---------- */
// // function Field({ label, required, icon: Icon, error, children, className = "" }) {
// //   return (
// //     <div className={className}>
// //       <label className="mb-1.5 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#3C3C3B]">
// //         {label}
// //         {required && <span className="text-[#2A317A]">*</span>}
// //       </label>
// //       <div className="relative">
// //         {Icon && (
// //           <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2A317A]/70" />
// //         )}
// //         {children}
// //       </div>
// //       <AnimatePresence>
// //         {error && (
// //           <motion.p
// //             initial={{ opacity: 0, height: 0 }}
// //             animate={{ opacity: 1, height: "auto" }}
// //             exit={{ opacity: 0, height: 0 }}
// //             className="mt-1.5 flex items-center gap-1 text-[12px] font-medium text-red-600"
// //           >
// //             <AlertCircle className="h-3.5 w-3.5" /> {error}
// //           </motion.p>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // }

// // function SectionTitle({ index, title }) {
// //   return (
// //     <div className="mb-5 flex items-center gap-3">
// //       <span className="flex h-7 w-7 items-center justify-center bg-[#2A317A] font-mono text-[11px] font-semibold text-white">
// //         {String(index).padStart(2, "0")}
// //       </span>
// //       <h4 className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#14212E]">{title}</h4>
// //       <span className="h-px flex-1 bg-[repeating-linear-gradient(90deg,#CBD5E1_0,#CBD5E1_4px,transparent_4px,transparent_8px)]" />
// //     </div>
// //   );
// // }

// // /* ============================================================
// //    ApplyForm
// //    props:
// //      job             → { title, ... }
// //      suggestedSkills → array of strings (لو مش متبعتة بنستخدم الـ default)
// //      onSubmit        → async (FormData) => void   (هنا تربطي الـ API)
// // ============================================================ */
// // export default function ApplyForm({
// //   job = { title: "Senior Data Analyst" },
// //   suggestedSkills = [
// //     "Experience with ERP systems (SAP, Oracle, or similar)",
// //     "Strong understanding of statistical analysis, forecasting, and data visualization",
// //     "Advanced Excel and SQL",
// //     "Power BI / Tableau",
// //   ],
// //   onSubmit,
// //   isWaiting = false,
// //   onDone,
// // }) {
// //   const [values, setValues] = useState({
// //     fullName: "",
// //     email: "",
// //     phone: "",
// //     education: "",
// //     noticePeriod: "",
// //     currentSalary: "",
// //     expectedSalary: "",
// //     currency: "EGP",
// //     coverLetter: "",
// //   });
// //   const [skills, setSkills] = useState([]);
// //   const [skillInput, setSkillInput] = useState("");
// //   const [cv, setCv] = useState(null);
// //   const [errors, setErrors] = useState({});
// //   const [dragging, setDragging] = useState(false);
// //   const [status, setStatus] = useState("idle"); // idle | submitting | success
// //   const fileRef = useRef(null);

// //   const set = (key) => (e) => {
// //     setValues((v) => ({ ...v, [key]: e.target.value }));
// //     if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
// //   };

// //   /* ---------- Skills ---------- */
// //   const addSkill = (raw) => {
// //     const skill = raw.trim();
// //     if (!skill) return;
// //     if (skills.some((s) => s.toLowerCase() === skill.toLowerCase())) {
// //       setSkillInput("");
// //       return;
// //     }
// //     setSkills((s) => [...s, skill]);
// //     setSkillInput("");
// //     setErrors((er) => ({ ...er, skills: undefined }));
// //   };
// //   const removeSkill = (skill) => setSkills((s) => s.filter((x) => x !== skill));
// //   const availableSuggestions = suggestedSkills.filter(
// //     (s) => !skills.some((x) => x.toLowerCase() === s.toLowerCase())
// //   );

// //   /* ---------- CV ---------- */
// //   const handleFile = (file) => {
// //     if (!file) return;
// //     const ext = file.name.split(".").pop().toLowerCase();
// //     if (!ALLOWED_EXT.includes(ext)) {
// //       setErrors((er) => ({ ...er, cv: "Please upload a PDF, DOC or DOCX file." }));
// //       return;
// //     }
// //     if (file.size > MAX_FILE_SIZE) {
// //       setErrors((er) => ({ ...er, cv: "File is too large — max 10MB." }));
// //       return;
// //     }
// //     setCv(file);
// //     setErrors((er) => ({ ...er, cv: undefined }));
// //   };

// //   /* ---------- Validation ---------- */
// //   const validate = () => {
// //     const er = {};
// //     if (!values.fullName.trim()) er.fullName = "Full name is required.";
// //     if (!values.email.trim()) er.email = "Email is required.";
// //     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) er.email = "Enter a valid email address.";
// //     if (!values.phone.trim()) er.phone = "Phone number is required.";
// //     else if (!/^\+?[\d\s-]{8,}$/.test(values.phone.trim())) er.phone = "Enter a valid phone number.";
// //     if (!cv) er.cv = "Please upload your CV.";
// //     if (skills.length === 0) er.skills = "Add at least one skill.";
// //     return er;
// //   };

// //   /* ---------- Progress (الحقول المطلوبة) ---------- */
// //   const progress = useMemo(() => {
// //     const done = [
// //       values.fullName.trim(),
// //       /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email),
// //       /^\+?[\d\s-]{8,}$/.test(values.phone.trim()),
// //       cv,
// //       skills.length > 0,
// //     ].filter(Boolean).length;
// //     return Math.round((done / 5) * 100);
// //   }, [values, cv, skills]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const er = validate();
// //     setErrors(er);
// //     if (Object.keys(er).length) return;

// //     const formData = new FormData();
// //     Object.entries(values).forEach(([k, v]) => formData.append(k, v));
// //     formData.append("skills", JSON.stringify(skills));
// //     formData.append("cv", cv);
// //     if (job?.id) formData.append("jobId", job.id);

// //     try {
// //       setStatus("submitting");
// //       if (onSubmit) await onSubmit(formData); // ← اربطي الـ API هنا
// //       else await new Promise((r) => setTimeout(r, 1200)); // محاكاة
// //       setStatus("success");
// //     } catch {
// //       setStatus("idle");
// //       setErrors({ form: "Something went wrong. Please try again." });
// //     }
// //   };

// //   /* ---------- Success ---------- */
// //   if (status === "success") {
// //     return (
// //       <motion.div
// //         initial={{ opacity: 0, scale: 0.96 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         className="border border-[#3C3C3B]/15 bg-white p-10 text-center shadow-[0_18px_40px_-14px_rgba(20,33,46,0.25)]"
// //       >
// //         <motion.div
// //           initial={{ scale: 0, rotate: -30 }}
// //           animate={{ scale: 1, rotate: 0 }}
// //           transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
// //           className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#2A317A]"
// //         >
// //           <CheckCircle2 className="h-8 w-8 text-white" />
// //         </motion.div>
// //         <h3 className="text-[22px] font-bold text-[#14212E]">Application sent!</h3>
// //         <p className="mx-auto mt-2 max-w-sm text-[14px] text-slate-500">
// //           Thanks {values.fullName.split(" ")[0]}, we received your application for{" "}
// //           <span className="font-semibold text-[#14212E]">{job.title}</span>. Our team will get back to you soon.
// //         </p>
// //         {onDone && (
// //           <button
// //             type="button"
// //             onClick={onDone}
// //             className="mt-6 bg-[#3C3C3B] px-8 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#2A317A]"
// //           >
// //             Close
// //           </button>
// //         )}
// //       </motion.div>
// //     );
// //   }

// //   return (
// //     <motion.form
// //       onSubmit={handleSubmit}
// //       noValidate
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.45 }}
// //       className="overflow-hidden border border-[#3C3C3B]/15 bg-white shadow-[0_18px_40px_-14px_rgba(20,33,46,0.25)]"
// //     >
// //       {/* ---------- Header ---------- */}
// //       <div className="relative bg-[#3C3C3B] px-6 py-7 sm:px-10">
// //         <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/70">
// //           {isWaiting ? "Join Waiting List" : "Apply Now"}
// //         </p>
// //         <h3 className="mt-1 text-[26px] font-bold tracking-tight text-white sm:text-[30px]">{job.title}</h3>

// //         <div className="mt-5">
// //           <div className="mb-1.5 flex justify-between text-[11px] font-medium uppercase tracking-wide text-white/70">
// //             <span>Required fields</span>
// //             <span className="font-mono">{progress}%</span>
// //           </div>
// //           <div className="h-[3px] w-full bg-white/15">
// //             <motion.div
// //               className="h-full bg-white"
// //               animate={{ width: `${progress}%` }}
// //               transition={{ type: "spring", stiffness: 120, damping: 20 }}
// //             />
// //           </div>
// //         </div>
// //         <span className="absolute inset-x-0 bottom-0 h-[3px] bg-[#2A317A]" />
// //       </div>

// //       <div className="space-y-10 px-6 py-8 sm:px-10">
// //         {/* ---------- 01 Personal ---------- */}
// //         <section>
// //           <SectionTitle index={1} title="Personal details" />
// //           <div className="grid gap-5 sm:grid-cols-2">
// //             <Field label="Full Name" required icon={User} error={errors.fullName} className="sm:col-span-2">
// //               <input
// //                 value={values.fullName}
// //                 onChange={set("fullName")}
// //                 placeholder="e.g. Sara Ahmed"
// //                 className={`${inputBase} pl-10 ${errors.fullName ? "border-red-400" : "border-slate-200"}`}
// //               />
// //             </Field>
// //             <Field label="Email" required icon={Mail} error={errors.email}>
// //               <input
// //                 type="email"
// //                 value={values.email}
// //                 onChange={set("email")}
// //                 placeholder="you@example.com"
// //                 className={`${inputBase} pl-10 ${errors.email ? "border-red-400" : "border-slate-200"}`}
// //               />
// //             </Field>
// //             <Field label="Phone" required icon={Phone} error={errors.phone}>
// //               <input
// //                 type="tel"
// //                 value={values.phone}
// //                 onChange={set("phone")}
// //                 placeholder="+20 100 000 0000"
// //                 className={`${inputBase} pl-10 ${errors.phone ? "border-red-400" : "border-slate-200"}`}
// //               />
// //             </Field>
// //           </div>
// //         </section>

// //         {/* ---------- 02 Professional ---------- */}
// //         <section>
// //           <SectionTitle index={2} title="Professional background" />
// //           <div className="grid gap-5 sm:grid-cols-2">
// //             <Field label="Education" icon={GraduationCap}>
// //               <input
// //                 value={values.education}
// //                 onChange={set("education")}
// //                 placeholder="e.g. B.Sc. in Statistics — Cairo University"
// //                 className={`${inputBase} border-slate-200 pl-10`}
// //               />
// //             </Field>
// //             <Field label="Notice Period" icon={CalendarClock}>
// //               <select
// //                 value={values.noticePeriod}
// //                 onChange={set("noticePeriod")}
// //                 className={`${inputBase} appearance-none border-slate-200 pl-10 pr-10 ${
// //                   values.noticePeriod ? "" : "text-slate-400"
// //                 }`}
// //               >
// //                 <option value="">Select notice period...</option>
// //                 {NOTICE_PERIODS.map((p) => (
// //                   <option key={p} value={p}>
// //                     {p}
// //                   </option>
// //                 ))}
// //               </select>
// //               <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
// //             </Field>
// //           </div>
// //         </section>

// //         {/* ---------- 03 Compensation ---------- */}
// //         <section>
// //           <SectionTitle index={3} title="Compensation" />
// //           <div className="grid gap-5 sm:grid-cols-3">
// //             <Field label="Current Salary" icon={Wallet}>
// //               <input
// //                 type="number"
// //                 min="0"
// //                 value={values.currentSalary}
// //                 onChange={set("currentSalary")}
// //                 placeholder="0"
// //                 className={`${inputBase} border-slate-200 pl-10`}
// //               />
// //             </Field>
// //             <Field label="Expected Salary" icon={Wallet}>
// //               <input
// //                 type="number"
// //                 min="0"
// //                 value={values.expectedSalary}
// //                 onChange={set("expectedSalary")}
// //                 placeholder="0"
// //                 className={`${inputBase} border-slate-200 pl-10`}
// //               />
// //             </Field>
// //             <Field label="Salary Currency">
// //               <select
// //                 value={values.currency}
// //                 onChange={set("currency")}
// //                 className={`${inputBase} appearance-none border-slate-200 pl-3 pr-10`}
// //               >
// //                 {CURRENCIES.map((c) => (
// //                   <option key={c.value} value={c.value}>
// //                     {c.label}
// //                   </option>
// //                 ))}
// //               </select>
// //               <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
// //             </Field>
// //           </div>
// //         </section>

// //         {/* ---------- 04 CV + Skills ---------- */}
// //         <section>
// //           <SectionTitle index={4} title="Resume & skills" />

// //           {/* CV */}
// //           <Field label="Upload CV" required error={errors.cv}>
// //             <input
// //               ref={fileRef}
// //               type="file"
// //               accept=".pdf,.doc,.docx"
// //               className="hidden"
// //               onChange={(e) => handleFile(e.target.files?.[0])}
// //             />
// //             <AnimatePresence mode="wait">
// //               {cv ? (
// //                 <motion.div
// //                   key="file"
// //                   initial={{ opacity: 0, y: 6 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   exit={{ opacity: 0 }}
// //                   className="flex items-center gap-3 border border-[#2A317A]/30 bg-[#EDF1F5] p-4"
// //                 >
// //                   <span className="flex h-10 w-10 items-center justify-center bg-[#2A317A]">
// //                     <FileText className="h-5 w-5 text-white" />
// //                   </span>
// //                   <div className="min-w-0 flex-1">
// //                     <p className="truncate text-[14px] font-semibold text-[#14212E]">{cv.name}</p>
// //                     <p className="text-[12px] text-slate-500">{formatSize(cv.size)}</p>
// //                   </div>
// //                   <button
// //                     type="button"
// //                     onClick={() => {
// //                       setCv(null);
// //                       if (fileRef.current) fileRef.current.value = "";
// //                     }}
// //                     className="p-2 text-slate-500 transition-colors hover:text-red-600"
// //                     aria-label="Remove CV"
// //                   >
// //                     <Trash2 className="h-4 w-4" />
// //                   </button>
// //                 </motion.div>
// //               ) : (
// //                 <motion.button
// //                   key="drop"
// //                   type="button"
// //                   onClick={() => fileRef.current?.click()}
// //                   onDragOver={(e) => {
// //                     e.preventDefault();
// //                     setDragging(true);
// //                   }}
// //                   onDragLeave={() => setDragging(false)}
// //                   onDrop={(e) => {
// //                     e.preventDefault();
// //                     setDragging(false);
// //                     handleFile(e.dataTransfer.files?.[0]);
// //                   }}
// //                   whileHover={{ y: -2 }}
// //                   className={`flex w-full flex-col items-center justify-center border-2 border-dashed px-6 py-8 text-center transition-colors ${
// //                     dragging
// //                       ? "border-[#2A317A] bg-[#2A317A]/5"
// //                       : errors.cv
// //                       ? "border-red-300 bg-red-50/40"
// //                       : "border-slate-300 bg-[#EDF1F5]/50 hover:border-[#2A317A]"
// //                   }`}
// //                 >
// //                   <motion.span
// //                     animate={dragging ? { y: -4 } : { y: 0 }}
// //                     className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#2A317A]"
// //                   >
// //                     <UploadCloud className="h-5 w-5 text-white" />
// //                   </motion.span>
// //                   <span className="text-[14px] font-semibold text-[#14212E]">
// //                     Click to upload your CV
// //                   </span>
// //                   <span className="mt-1 text-[12px] text-slate-500">or drag & drop it here</span>
// //                   <span className="mt-2 font-mono text-[11px] uppercase tracking-wide text-slate-400">
// //                     PDF, DOC, DOCX — Max 10MB
// //                   </span>
// //                 </motion.button>
// //               )}
// //             </AnimatePresence>
// //           </Field>

// //           {/* Skills */}
// //           <div className="mt-6">
// //             <Field label="Skills" required error={errors.skills}>
// //               <div className="flex gap-2">
// //                 <input
// //                   value={skillInput}
// //                   onChange={(e) => setSkillInput(e.target.value)}
// //                   onKeyDown={(e) => {
// //                     if (e.key === "Enter") {
// //                       e.preventDefault();
// //                       addSkill(skillInput);
// //                     }
// //                   }}
// //                   placeholder="Type a skill and press Enter"
// //                   className={`${inputBase} pl-3 ${errors.skills ? "border-red-400" : "border-slate-200"}`}
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => addSkill(skillInput)}
// //                   className="flex shrink-0 items-center gap-1.5 bg-[#3C3C3B] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#2A317A]"
// //                 >
// //                   <Plus className="h-4 w-4" /> Add
// //                 </button>
// //               </div>
// //             </Field>

// //             {/* Added skills */}
// //             <div className="mt-3 flex flex-wrap gap-2">
// //               <AnimatePresence>
// //                 {skills.map((skill) => (
// //                   <motion.span
// //                     key={skill}
// //                     layout
// //                     initial={{ opacity: 0, scale: 0.8 }}
// //                     animate={{ opacity: 1, scale: 1 }}
// //                     exit={{ opacity: 0, scale: 0.8 }}
// //                     className="flex max-w-full items-center gap-2 bg-[#2A317A] py-1.5 pl-3 pr-1.5 text-[13px] font-medium text-white"
// //                   >
// //                     <span className="break-words">{skill}</span>
// //                     <button
// //                       type="button"
// //                       onClick={() => removeSkill(skill)}
// //                       className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/30"
// //                       aria-label={`Remove ${skill}`}
// //                     >
// //                       <X className="h-3 w-3" />
// //                     </button>
// //                   </motion.span>
// //                 ))}
// //               </AnimatePresence>
// //             </div>

// //             {/* Suggested */}
// //             {availableSuggestions.length > 0 && (
// //               <div className="mt-5 border border-dashed border-slate-300 bg-[#EDF1F5]/50 p-4">
// //                 <p className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#3C3C3B]">
// //                   <Sparkles className="h-3.5 w-3.5 text-[#2A317A]" /> Suggested skills
// //                 </p>
// //                 <div className="flex flex-wrap gap-2">
// //                   {availableSuggestions.map((s) => (
// //                     <motion.button
// //                       key={s}
// //                       type="button"
// //                       layout
// //                       whileHover={{ y: -2 }}
// //                       whileTap={{ scale: 0.96 }}
// //                       onClick={() => addSkill(s)}
// //                       className="flex items-center gap-1.5 border border-[#2A317A]/30 bg-white px-3 py-1.5 text-left text-[12.5px] font-medium text-[#2A317A] transition-colors hover:bg-[#2A317A] hover:text-white"
// //                     >
// //                       <Plus className="h-3.5 w-3.5 shrink-0" />
// //                       {s}
// //                     </motion.button>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </section>

// //         {/* ---------- 05 Cover letter ---------- */}
// //         <section>
// //           <SectionTitle index={5} title="Cover letter (optional)" />
// //           <textarea
// //             rows={5}
// //             maxLength={1500}
// //             value={values.coverLetter}
// //             onChange={set("coverLetter")}
// //             placeholder="Tell us why you'd be a great fit for this role..."
// //             className={`${inputBase} resize-y border-slate-200 pl-3`}
// //           />
// //           <p className="mt-1 text-right font-mono text-[11px] text-slate-400">
// //             {values.coverLetter.length}/1500
// //           </p>
// //         </section>

// //         {errors.form && (
// //           <p className="flex items-center gap-1.5 text-[13px] font-medium text-red-600">
// //             <AlertCircle className="h-4 w-4" /> {errors.form}
// //           </p>
// //         )}

// //         {/* ---------- Submit ---------- */}
// //         <button
// //           type="submit"
// //           disabled={status === "submitting"}
// //           className="group relative flex w-full items-center justify-center gap-2 overflow-hidden bg-[#3C3C3B] py-4 text-[14px] font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-70"
// //         >
// //           <span className="absolute inset-0 -translate-x-full bg-[#2A317A] transition-transform duration-300 ease-out group-hover:translate-x-0" />
// //           <span className="relative z-10 flex items-center gap-2">
// //             {status === "submitting" ? (
// //               <>
// //                 <Loader2 className="h-4 w-4 animate-spin" /> Sending...
// //               </>
// //             ) : (
// //               <>
// //                 {isWaiting ? "Join Waiting List" : "Submit Application"}
// //                 <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
// //               </>
// //             )}
// //           </span>
// //         </button>
// //       </div>
// //     </motion.form>
// //   );
// // }


// import { useMemo, useRef, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import {
//   AlertCircle,
//   CalendarClock,
//   CheckCircle2,
//   ChevronDown,
//   FileText,
//   GraduationCap,
//   Loader2,
//   Mail,
//   Phone,
//   Plus,
//   Send,
//   Sparkles,
//   Trash2,
//   UploadCloud,
//   User,
//   Wallet,
//   X,
// } from "lucide-react";

// const NOTICE_PERIODS = ["Immediate", "30 days", "2 months", "3 months", "Notice Required"];
// const CURRENCIES = [
//   { value: "EGP", label: "EGP (Egyptian Pound)" },
//   { value: "USD", label: "USD (US Dollar)" },
//   { value: "EUR", label: "EUR (Euro)" },
//   { value: "SAR", label: "SAR (Saudi Riyal)" },
//   { value: "AED", label: "AED (UAE Dirham)" },
// ];
// const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
// const ALLOWED_EXT = ["pdf", "doc", "docx"];

// const inputBase =
//   "w-full border bg-white py-3 pr-3 text-[14px] text-[#14212E] outline-none transition-all placeholder:text-slate-400 focus:border-[#2A317A] focus:ring-4 focus:ring-[#2A317A]/10";

// const formatSize = (bytes) =>
//   bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(0)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

// /* ---------- Field wrapper ---------- */
// function Field({ label, required, icon: Icon, error, children, className = "" }) {
//   return (
//     <div className={className}>
//       <label className="mb-1.5 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#3C3C3B]">
//         {label}
//         {required && <span className="text-[#2A317A]">*</span>}
//       </label>
//       <div className="relative">
//         {Icon && (
//           <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2A317A]/70" />
//         )}
//         {children}
//       </div>
//       <AnimatePresence>
//         {error && (
//           <motion.p
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="mt-1.5 flex items-center gap-1 text-[12px] font-medium text-red-600"
//           >
//             <AlertCircle className="h-3.5 w-3.5" /> {error}
//           </motion.p>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// function SectionTitle({ index, title }) {
//   return (
//     <div className="mb-5 flex items-center gap-3">
//       <span className="flex h-7 w-7 items-center justify-center bg-[#2A317A] font-mono text-[11px] font-semibold text-white">
//         {String(index).padStart(2, "0")}
//       </span>
//       <h4 className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#14212E]">{title}</h4>
//       <span className="h-px flex-1 bg-[repeating-linear-gradient(90deg,#CBD5E1_0,#CBD5E1_4px,transparent_4px,transparent_8px)]" />
//     </div>
//   );
// }

// /* ============================================================
//    ApplyForm
//    props:
//      job             → { title, ... }
//      suggestedSkills → array of strings (لو مش متبعتة بنستخدم الـ default)
//      onSubmit        → async (FormData) => void   (هنا تربطي الـ API)
// ============================================================ */
// export default function ApplyForm({
//   job = { title: "Senior Data Analyst" },
//   suggestedSkills = [
//     "Experience with ERP systems (SAP, Oracle, or similar)",
//     "Strong understanding of statistical analysis, forecasting, and data visualization",
//     "Advanced Excel and SQL",
//     "Power BI / Tableau",
//   ],
//   onSubmit,
//   isWaiting = false,
//   onDone,
// }) {
//   const [values, setValues] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     education: "",
//     noticePeriod: "",
//     currentSalary: "",
//     expectedSalary: "",
//     currency: "EGP",
//     coverLetter: "",
//   });
//   const [skills, setSkills] = useState([]);
//   const [skillInput, setSkillInput] = useState("");
//   const [cv, setCv] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [dragging, setDragging] = useState(false);
//   const [status, setStatus] = useState("idle"); // idle | submitting | success
//   const fileRef = useRef(null);

//   const set = (key) => (e) => {
//     setValues((v) => ({ ...v, [key]: e.target.value }));
//     if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
//   };

//   /* ---------- Skills ---------- */
//   const addSkill = (raw) => {
//     const skill = raw.trim();
//     if (!skill) return;
//     if (skills.some((s) => s.toLowerCase() === skill.toLowerCase())) {
//       setSkillInput("");
//       return;
//     }
//     setSkills((s) => [...s, skill]);
//     setSkillInput("");
//     setErrors((er) => ({ ...er, skills: undefined }));
//   };
//   const removeSkill = (skill) => setSkills((s) => s.filter((x) => x !== skill));
//   const availableSuggestions = suggestedSkills.filter(
//     (s) => !skills.some((x) => x.toLowerCase() === s.toLowerCase())
//   );

//   /* ---------- CV ---------- */
//   const handleFile = (file) => {
//     if (!file) return;
//     const ext = file.name.split(".").pop().toLowerCase();
//     if (!ALLOWED_EXT.includes(ext)) {
//       setErrors((er) => ({ ...er, cv: "Please upload a PDF, DOC or DOCX file." }));
//       return;
//     }
//     if (file.size > MAX_FILE_SIZE) {
//       setErrors((er) => ({ ...er, cv: "File is too large — max 10MB." }));
//       return;
//     }
//     setCv(file);
//     setErrors((er) => ({ ...er, cv: undefined }));
//   };

//   /* ---------- Validation ---------- */
//   const validate = () => {
//     const er = {};
//     if (!values.fullName.trim()) er.fullName = "Full name is required.";
//     if (!values.email.trim()) er.email = "Email is required.";
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) er.email = "Enter a valid email address.";
//     if (!values.phone.trim()) er.phone = "Phone number is required.";
//     else if (!/^\+?[\d\s-]{8,}$/.test(values.phone.trim())) er.phone = "Enter a valid phone number.";
//     if (!cv) er.cv = "Please upload your CV.";
//     if (skills.length === 0) er.skills = "Add at least one skill.";
//     return er;
//   };

//   /* ---------- Progress (الحقول المطلوبة) ---------- */
//   const progress = useMemo(() => {
//     const done = [
//       values.fullName.trim(),
//       /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email),
//       /^\+?[\d\s-]{8,}$/.test(values.phone.trim()),
//       cv,
//       skills.length > 0,
//     ].filter(Boolean).length;
//     return Math.round((done / 5) * 100);
//   }, [values, cv, skills]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const er = validate();
//     setErrors(er);
//     if (Object.keys(er).length) return;

//     const formData = new FormData();
//     Object.entries(values).forEach(([k, v]) => formData.append(k, v));
//     formData.append("skills", JSON.stringify(skills));
//     formData.append("cv", cv);
//     if (job?.id) formData.append("jobId", job.id);

//     try {
//       setStatus("submitting");
//       if (onSubmit) await onSubmit(formData); // ← اربطي الـ API هنا
//       else await new Promise((r) => setTimeout(r, 1200)); // محاكاة
//       setStatus("success");
//     } catch {
//       setStatus("idle");
//       setErrors({ form: "Something went wrong. Please try again." });
//     }
//   };

//   /* ---------- Success ---------- */
//   if (status === "success") {
//     return (
//       <motion.div
//         initial={{ opacity: 0, scale: 0.96 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="border border-[#3C3C3B]/15 bg-white p-10 text-center shadow-[0_18px_40px_-14px_rgba(20,33,46,0.25)]"
//       >
//         <motion.div
//           initial={{ scale: 0, rotate: -30 }}
//           animate={{ scale: 1, rotate: 0 }}
//           transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
//           className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#2A317A]"
//         >
//           <CheckCircle2 className="h-8 w-8 text-white" />
//         </motion.div>
//         <h3 className="text-[22px] font-bold text-[#14212E]">Application sent!</h3>
//         <p className="mx-auto mt-2 max-w-sm text-[14px] text-slate-500">
//           Thanks {values.fullName.split(" ")[0]}, we received your application for{" "}
//           <span className="font-semibold text-[#14212E]">{job.title}</span>. Our team will get back to you soon.
//         </p>
//         {onDone && (
//           <button
//             type="button"
//             onClick={onDone}
//             className="mt-6 bg-[#3C3C3B] px-8 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#2A317A]"
//           >
//             Close
//           </button>
//         )}
//       </motion.div>
//     );
//   }

//   return (
//     <motion.form
//       onSubmit={handleSubmit}
//       noValidate
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.45 }}
//       className="overflow-hidden border border-[#3C3C3B]/15 bg-white shadow-[0_18px_40px_-14px_rgba(20,33,46,0.25)]"
//     >
//       {/* ---------- Header ---------- */}
//       <div className="relative bg-[#3C3C3B] px-6 py-7 sm:px-10">
//         <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/70">
//           {isWaiting ? "Join Waiting List" : "Apply Now"}
//         </p>
//         <h3 className="mt-1 text-[26px] font-bold tracking-tight text-white sm:text-[30px]">{job.title}</h3>

//         <div className="mt-5">
//           <div className="mb-1.5 flex justify-between text-[11px] font-medium uppercase tracking-wide text-white/70">
//             <span>Required fields</span>
//             <span className="font-mono">{progress}%</span>
//           </div>
//           <div className="h-[3px] w-full bg-white/15">
//             <motion.div
//               className="h-full bg-white"
//               animate={{ width: `${progress}%` }}
//               transition={{ type: "spring", stiffness: 120, damping: 20 }}
//             />
//           </div>
//         </div>
//         <span className="absolute inset-x-0 bottom-0 h-[3px] bg-[#2A317A]" />
//       </div>

//       <div className="space-y-10 px-6 py-8 sm:px-10">
//         {/* ---------- 01 Personal ---------- */}
//         <section>
//           <SectionTitle index={1} title="Personal details" />
//           <div className="grid gap-5 sm:grid-cols-2">
//             <Field label="Full Name" required icon={User} error={errors.fullName} className="sm:col-span-2">
//               <input
//                 value={values.fullName}
//                 onChange={set("fullName")}
//                 placeholder="e.g. Sara Ahmed"
//                 className={`${inputBase} pl-10 ${errors.fullName ? "border-red-400" : "border-slate-200"}`}
//               />
//             </Field>
//             <Field label="Email" required icon={Mail} error={errors.email}>
//               <input
//                 type="email"
//                 value={values.email}
//                 onChange={set("email")}
//                 placeholder="you@example.com"
//                 className={`${inputBase} pl-10 ${errors.email ? "border-red-400" : "border-slate-200"}`}
//               />
//             </Field>
//             <Field label="Phone" required icon={Phone} error={errors.phone}>
//               <input
//                 type="tel"
//                 value={values.phone}
//                 onChange={set("phone")}
//                 placeholder="+20 100 000 0000"
//                 className={`${inputBase} pl-10 ${errors.phone ? "border-red-400" : "border-slate-200"}`}
//               />
//             </Field>
//           </div>
//         </section>

//         {/* ---------- 02 Professional ---------- */}
//         <section>
//           <SectionTitle index={2} title="Professional background" />
//           <div className="grid gap-5 sm:grid-cols-2">
//             <Field label="Education" icon={GraduationCap}>
//               <input
//                 value={values.education}
//                 onChange={set("education")}
//                 placeholder="e.g. B.Sc. in Statistics — Cairo University"
//                 className={`${inputBase} border-slate-200 pl-10`}
//               />
//             </Field>
//             <Field label="Notice Period" icon={CalendarClock}>
//               <select
//                 value={values.noticePeriod}
//                 onChange={set("noticePeriod")}
//                 className={`${inputBase} appearance-none border-slate-200 pl-10 pr-10 ${
//                   values.noticePeriod ? "" : "text-slate-400"
//                 }`}
//               >
//                 <option value="">Select notice period...</option>
//                 {NOTICE_PERIODS.map((p) => (
//                   <option key={p} value={p}>
//                     {p}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
//             </Field>
//           </div>
//         </section>

//         {/* ---------- 03 Compensation ---------- */}
//         <section>
//           <SectionTitle index={3} title="Compensation" />
//           <div className="grid gap-5 sm:grid-cols-3">
//             <Field label="Current Salary" icon={Wallet}>
//               <input
//                 type="number"
//                 min="0"
//                 value={values.currentSalary}
//                 onChange={set("currentSalary")}
//                 placeholder="0"
//                 className={`${inputBase} border-slate-200 pl-10`}
//               />
//             </Field>
//             <Field label="Expected Salary" icon={Wallet}>
//               <input
//                 type="number"
//                 min="0"
//                 value={values.expectedSalary}
//                 onChange={set("expectedSalary")}
//                 placeholder="0"
//                 className={`${inputBase} border-slate-200 pl-10`}
//               />
//             </Field>
//             <Field label="Salary Currency">
//               <select
//                 value={values.currency}
//                 onChange={set("currency")}
//                 className={`${inputBase} appearance-none border-slate-200 pl-3 pr-10`}
//               >
//                 {CURRENCIES.map((c) => (
//                   <option key={c.value} value={c.value}>
//                     {c.label}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
//             </Field>
//           </div>
//         </section>

//         {/* ---------- 04 CV + Skills ---------- */}
//         <section>
//           <SectionTitle index={4} title="Resume & skills" />

//           {/* CV */}
//           <Field label="Upload CV" required error={errors.cv}>
//             <input
//               ref={fileRef}
//               type="file"
//               accept=".pdf,.doc,.docx"
//               className="hidden"
//               onChange={(e) => handleFile(e.target.files?.[0])}
//             />
//             <AnimatePresence mode="wait">
//               {cv ? (
//                 <motion.div
//                   key="file"
//                   initial={{ opacity: 0, y: 6 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   className="flex items-center gap-3 border border-[#2A317A]/30 bg-[#EDF1F5] p-4"
//                 >
//                   <span className="flex h-10 w-10 items-center justify-center bg-[#2A317A]">
//                     <FileText className="h-5 w-5 text-white" />
//                   </span>
//                   <div className="min-w-0 flex-1">
//                     <p className="truncate text-[14px] font-semibold text-[#14212E]">{cv.name}</p>
//                     <p className="text-[12px] text-slate-500">{formatSize(cv.size)}</p>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setCv(null);
//                       if (fileRef.current) fileRef.current.value = "";
//                     }}
//                     className="p-2 text-slate-500 transition-colors hover:text-red-600"
//                     aria-label="Remove CV"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </button>
//                 </motion.div>
//               ) : (
//                 <motion.button
//                   key="drop"
//                   type="button"
//                   onClick={() => fileRef.current?.click()}
//                   onDragOver={(e) => {
//                     e.preventDefault();
//                     setDragging(true);
//                   }}
//                   onDragLeave={() => setDragging(false)}
//                   onDrop={(e) => {
//                     e.preventDefault();
//                     setDragging(false);
//                     handleFile(e.dataTransfer.files?.[0]);
//                   }}
//                   whileHover={{ y: -2 }}
//                   className={`flex w-full flex-col items-center justify-center border-2 border-dashed px-6 py-8 text-center transition-colors ${
//                     dragging
//                       ? "border-[#2A317A] bg-[#2A317A]/5"
//                       : errors.cv
//                       ? "border-red-300 bg-red-50/40"
//                       : "border-slate-300 bg-[#EDF1F5]/50 hover:border-[#2A317A]"
//                   }`}
//                 >
//                   <motion.span
//                     animate={dragging ? { y: -4 } : { y: 0 }}
//                     className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#2A317A]"
//                   >
//                     <UploadCloud className="h-5 w-5 text-white" />
//                   </motion.span>
//                   <span className="text-[14px] font-semibold text-[#14212E]">
//                     Click to upload your CV
//                   </span>
//                   <span className="mt-1 text-[12px] text-slate-500">or drag & drop it here</span>
//                   <span className="mt-2 font-mono text-[11px] uppercase tracking-wide text-slate-400">
//                     PDF, DOC, DOCX — Max 10MB
//                   </span>
//                 </motion.button>
//               )}
//             </AnimatePresence>
//           </Field>

//           {/* Skills */}
//           <div className="mt-6">
//             <Field label="Skills" required error={errors.skills}>
//               <div className="flex gap-2">
//                 <input
//                   value={skillInput}
//                   onChange={(e) => setSkillInput(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") {
//                       e.preventDefault();
//                       addSkill(skillInput);
//                     }
//                   }}
//                   placeholder="Type a skill and press Enter"
//                   className={`${inputBase} pl-3 ${errors.skills ? "border-red-400" : "border-slate-200"}`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => addSkill(skillInput)}
//                   className="flex shrink-0 items-center gap-1.5 bg-[#3C3C3B] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#2A317A]"
//                 >
//                   <Plus className="h-4 w-4" /> Add
//                 </button>
//               </div>
//             </Field>

//             {/* Added skills */}
//             <div className="mt-3 flex flex-wrap gap-2">
//               <AnimatePresence>
//                 {skills.map((skill) => (
//                   <motion.span
//                     key={skill}
//                     layout
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.8 }}
//                     className="flex max-w-full items-center gap-2 bg-[#2A317A] py-1.5 pl-3 pr-1.5 text-[13px] font-medium text-white"
//                   >
//                     <span className="break-words">{skill}</span>
//                     <button
//                       type="button"
//                       onClick={() => removeSkill(skill)}
//                       className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/30"
//                       aria-label={`Remove ${skill}`}
//                     >
//                       <X className="h-3 w-3" />
//                     </button>
//                   </motion.span>
//                 ))}
//               </AnimatePresence>
//             </div>

//             {/* Suggested */}
//             {availableSuggestions.length > 0 && (
//               <div className="mt-5 border border-dashed border-slate-300 bg-[#EDF1F5]/50 p-4">
//                 <p className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#3C3C3B]">
//                   <Sparkles className="h-3.5 w-3.5 text-[#2A317A]" /> Suggested skills
//                 </p>
//                 <div className="flex flex-wrap gap-2">
//                   {availableSuggestions.map((s) => (
//                     <motion.button
//                       key={s}
//                       type="button"
//                       layout
//                       whileHover={{ y: -2 }}
//                       whileTap={{ scale: 0.96 }}
//                       onClick={() => addSkill(s)}
//                       className="flex items-center gap-1.5 border border-[#2A317A]/30 bg-white px-3 py-1.5 text-left text-[12.5px] font-medium text-[#2A317A] transition-colors hover:bg-[#2A317A] hover:text-white"
//                     >
//                       <Plus className="h-3.5 w-3.5 shrink-0" />
//                       {s}
//                     </motion.button>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </section>

//         {/* ---------- 05 Cover letter ---------- */}
//         <section>
//           <SectionTitle index={5} title="Cover letter (optional)" />
//           <textarea
//             rows={5}
//             maxLength={1500}
//             value={values.coverLetter}
//             onChange={set("coverLetter")}
//             placeholder="Tell us why you'd be a great fit for this role..."
//             className={`${inputBase} resize-y border-slate-200 pl-3`}
//           />
//           <p className="mt-1 text-right font-mono text-[11px] text-slate-400">
//             {values.coverLetter.length}/1500
//           </p>
//         </section>

//         {errors.form && (
//           <p className="flex items-center gap-1.5 text-[13px] font-medium text-red-600">
//             <AlertCircle className="h-4 w-4" /> {errors.form}
//           </p>
//         )}

//         {/* ---------- Submit ---------- */}
//         <button
//           type="submit"
//           disabled={status === "submitting"}
//           className="group relative flex w-full items-center justify-center gap-2 overflow-hidden bg-[#3C3C3B] py-4 text-[14px] font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-70"
//         >
//           <span className="absolute inset-0 -translate-x-full bg-[#2A317A] transition-transform duration-300 ease-out group-hover:translate-x-0" />
//           <span className="relative z-10 flex items-center gap-2">
//             {status === "submitting" ? (
//               <>
//                 <Loader2 className="h-4 w-4 animate-spin" /> Sending...
//               </>
//             ) : (
//               <>
//                 {isWaiting ? "Join Waiting List" : "Submit Application"}
//                 <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
//               </>
//             )}
//           </span>
//         </button>
//       </div>
//     </motion.form>
//   );
// }


import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  FileText,
  GraduationCap,
  Loader2,
  Mail,
  Phone,
  Plus,
  Send,
  Sparkles,
  Trash2,
  UploadCloud,
  User,
  Wallet,
  X,
} from "lucide-react";

import { useLanguage } from "../../locales/LanguageContext/LanguageContext";
import { applyFormText } from "../../locales/LanguageContext/applyFormTranslations";


const NOTICE_PERIODS = ["Immediate", "30 days", "2 months", "3 months", "Notice Required"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_EXT = ["pdf", "doc", "docx"];

const inputBase =
  "w-full border bg-white py-3 text-[14px] text-[#14212E] outline-none transition-all placeholder:text-slate-400 focus:border-[#2A317A] focus:ring-4 focus:ring-[#2A317A]/10";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s-]{8,}$/;

const formatSize = (bytes) =>
  bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(0)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

/* ---------- Field wrapper ---------- */
function Field({ label, required, icon: Icon, error, children, className = "" }) {
  return (
    <div className={className}>
      <label className="mb-1.5 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#3C3C3B]">
        {label}
        {required && <span className="text-[#2A317A]">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2A317A]/70" />
        )}
        {children}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 flex items-center gap-1 text-[12px] font-medium text-red-600"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function SectionTitle({ index, title }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#2A317A] font-mono text-[11px] font-semibold text-white">
        {String(index).padStart(2, "0")}
      </span>
      <h4 className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#14212E]">{title}</h4>
      <span className="h-px flex-1 bg-[repeating-linear-gradient(90deg,#CBD5E1_0,#CBD5E1_4px,transparent_4px,transparent_8px)]" />
    </div>
  );
}

/* ============================================================
   ApplyForm
   props:
     job             → { title, id, ... }
     suggestedSkills → array of strings
     isWaiting       → boolean
     onDone          → بيتنادى لما تدوسي Close في شاشة النجاح
     onSubmit        → async (FormData) => void   (هنا تربطي الـ API)
============================================================ */
export default function ApplyForm({
  job = { title: "Senior Data Analyst" },
  suggestedSkills = [],
  onSubmit,
  isWaiting = false,
  onDone,
}) {
  const { language } = useLanguage();
  const isAr = language === "ar"; // ← لو كود اللغة عندك مختلف غيّري السطر ده بس
  const tx = applyFormText[isAr ? "ar" : "en"];
  const dir = isAr ? "rtl" : "ltr";

  // Padding logical للحقول العادية (بتتعكس تلقائي في RTL)
  const padIcon = "ps-10 pe-3";
  const padPlain = "px-3";
  const padSelectIcon = "ps-10 pe-10";
  const padSelect = "ps-3 pe-10";
  // حقول المحتوى بتاعها LTR دايمًا (إيميل/تليفون/أرقام) — الأيقونة بتفضل على جهة الـ RTL
  const padLtr = isAr ? "pr-10 pl-3 text-right" : "pl-10 pr-3";
  // حقول الراتب: مساحة إضافية للـ suffix (EGP / جنيه)
  const padSalary = isAr ? "pr-10 pl-16 text-right" : "pl-10 pr-16";

  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    education: "",
    noticePeriod: "",
    currentSalary: "",
    expectedSalary: "",
    currency: "EGP",
    coverLetter: "",
  });
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [cv, setCv] = useState(null);
  const [errors, setErrors] = useState({}); // بنخزن "key" الرسالة مش النص، عشان تتترجم لو اللغة اتغيرت
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const fileRef = useRef(null);

  const err = (k) => (errors[k] ? tx[errors[k]] : undefined);

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  /* ---------- Skills ---------- */
  const addSkill = (raw) => {
    const skill = raw.trim();
    if (!skill) return;
    if (skills.some((s) => s.toLowerCase() === skill.toLowerCase())) {
      setSkillInput("");
      return;
    }
    setSkills((s) => [...s, skill]);
    setSkillInput("");
    setErrors((er) => ({ ...er, skills: undefined }));
  };
  const removeSkill = (skill) => setSkills((s) => s.filter((x) => x !== skill));
  const availableSuggestions = (suggestedSkills || []).filter(
    (s) => !skills.some((x) => x.toLowerCase() === s.toLowerCase())
  );

  /* ---------- CV ---------- */
  const handleFile = (file) => {
    if (!file) return;
    const ext = file.name.split(".").pop().toLowerCase();
    if (!ALLOWED_EXT.includes(ext)) {
      setErrors((er) => ({ ...er, cv: "cvType" }));
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setErrors((er) => ({ ...er, cv: "cvSize" }));
      return;
    }
    setCv(file);
    setErrors((er) => ({ ...er, cv: undefined }));
  };

  /* ---------- Validation ---------- */
  const validate = () => {
    const er = {};
    if (!values.fullName.trim()) er.fullName = "nameRequired";
    if (!values.email.trim()) er.email = "emailRequired";
    else if (!EMAIL_RE.test(values.email)) er.email = "emailInvalid";
    if (!values.phone.trim()) er.phone = "phoneRequired";
    else if (!PHONE_RE.test(values.phone.trim())) er.phone = "phoneInvalid";
    if (!cv) er.cv = "cvRequired";
    if (skills.length === 0) er.skills = "skillsRequired";
    return er;
  };

  /* ---------- Progress ---------- */
  const progress = useMemo(() => {
    const done = [
      values.fullName.trim(),
      EMAIL_RE.test(values.email),
      PHONE_RE.test(values.phone.trim()),
      cv,
      skills.length > 0,
    ].filter(Boolean).length;
    return Math.round((done / 5) * 100);
  }, [values, cv, skills]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;

    const formData = new FormData();
    Object.entries(values).forEach(([k, v]) => formData.append(k, v));
    formData.append("skills", JSON.stringify(skills));
    formData.append("cv", cv);
    if (job?.id) formData.append("jobId", job.id);

    try {
      setStatus("submitting");
      if (onSubmit) await onSubmit(formData); // ← اربطي الـ API هنا
      else await new Promise((r) => setTimeout(r, 1200)); // محاكاة
      setStatus("success");
    } catch {
      setStatus("idle");
      setErrors({ form: "formError" });
    }
  };

  const headerLabel = isWaiting ? tx.joinWaitingList : tx.applyNow;

  /* ---------- Success ---------- */
  if (status === "success") {
    const [before, after] = tx.sentBody(values.fullName.trim().split(" ")[0]);
    return (
      <motion.div
        dir={dir}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border border-[#3C3C3B]/15 bg-white p-10 text-center shadow-[0_18px_40px_-14px_rgba(20,33,46,0.25)]"
      >
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
          className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#2A317A]"
        >
          <CheckCircle2 className="h-8 w-8 text-white" />
        </motion.div>
        <h3 className="text-[22px] font-bold text-[#14212E]">{tx.sentTitle}</h3>
        <p className="mx-auto mt-2 max-w-sm text-[14px] leading-relaxed text-slate-500">
          {before}
          <span className="font-semibold text-[#14212E]">{job.title}</span>
          {after}
        </p>
        {onDone && (
          <button
            type="button"
            onClick={onDone}
            className="mt-6 bg-[#3C3C3B] px-8 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#2A317A]"
          >
            {tx.close}
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.form
      dir={dir}
      onSubmit={handleSubmit}
      noValidate
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="overflow-hidden border border-[#3C3C3B]/15 bg-white shadow-[0_18px_40px_-14px_rgba(20,33,46,0.25)]"
    >
      {/* ---------- Header ---------- */}
      <div className="relative bg-[#3C3C3B] px-6 py-7 sm:px-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/70">
          {headerLabel}
        </p>
        <h3 className="mt-1 pe-10 text-[26px] font-bold tracking-tight text-white sm:text-[30px]">
          {job.title}
        </h3>

        <div className="mt-5">
          <div className="mb-1.5 flex justify-between text-[11px] font-medium uppercase tracking-wide text-white/70">
            <span>{tx.requiredFields}</span>
            <span className="font-mono" dir="ltr">
              {progress}%
            </span>
          </div>
          <div className="h-[3px] w-full bg-white/15">
            <motion.div
              className="h-full bg-white"
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
        </div>
        <span className="absolute inset-x-0 bottom-0 h-[3px] bg-[#2A317A]" />
      </div>

      <div className="space-y-10 px-6 py-8 sm:px-10">
        {/* ---------- 01 Personal ---------- */}
        <section>
          <SectionTitle index={1} title={tx.personalDetails} />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={tx.fullName} required icon={User} error={err("fullName")} className="sm:col-span-2">
              <input
                value={values.fullName}
                onChange={set("fullName")}
                placeholder={tx.fullNamePh}
                className={`${inputBase} ${padIcon} ${errors.fullName ? "border-red-400" : "border-slate-200"}`}
              />
            </Field>
            <Field label={tx.email} required icon={Mail} error={err("email")}>
              <input
                type="email"
                dir="ltr"
                value={values.email}
                onChange={set("email")}
                placeholder={tx.emailPh}
                className={`${inputBase} ${padLtr} ${errors.email ? "border-red-400" : "border-slate-200"}`}
              />
            </Field>
            <Field label={tx.phone} required icon={Phone} error={err("phone")}>
              <input
                type="tel"
                dir="ltr"
                value={values.phone}
                onChange={set("phone")}
                placeholder={tx.phonePh}
                className={`${inputBase} ${padLtr} ${errors.phone ? "border-red-400" : "border-slate-200"}`}
              />
            </Field>
          </div>
        </section>

        {/* ---------- 02 Professional ---------- */}
        <section>
          <SectionTitle index={2} title={tx.professionalBackground} />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={tx.education} icon={GraduationCap}>
              <input
                value={values.education}
                onChange={set("education")}
                placeholder={tx.educationPh}
                className={`${inputBase} ${padIcon} border-slate-200`}
              />
            </Field>
            <Field label={tx.noticePeriod} icon={CalendarClock}>
              <select
                value={values.noticePeriod}
                onChange={set("noticePeriod")}
                className={`${inputBase} ${padSelectIcon} appearance-none border-slate-200 ${
                  values.noticePeriod ? "" : "text-slate-400"
                }`}
              >
                <option value="">{tx.noticePh}</option>
                {NOTICE_PERIODS.map((p) => (
                  <option key={p} value={p}>
                    {tx.notice[p]}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </Field>
          </div>
        </section>

        {/* ---------- 03 Compensation ---------- */}
        <section>
          <SectionTitle index={3} title={tx.compensation} />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={tx.currentSalary} icon={Wallet}>
              <input
                type="number"
                dir="ltr"
                min="0"
                value={values.currentSalary}
                onChange={set("currentSalary")}
                placeholder="0"
                className={`${inputBase} ${padSalary} border-slate-200`}
              />
              <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-[12px] font-semibold uppercase tracking-wide text-[#2A317A]">
                {tx.egp}
              </span>
            </Field>
            <Field label={tx.expectedSalary} icon={Wallet}>
              <input
                type="number"
                dir="ltr"
                min="0"
                value={values.expectedSalary}
                onChange={set("expectedSalary")}
                placeholder="0"
                className={`${inputBase} ${padSalary} border-slate-200`}
              />
              <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-[12px] font-semibold uppercase tracking-wide text-[#2A317A]">
                {tx.egp}
              </span>
            </Field>
          </div>
        </section>

        {/* ---------- 04 CV + Skills ---------- */}
        <section>
          <SectionTitle index={4} title={tx.resumeSkills} />

          {/* CV */}
          <Field label={tx.uploadCv} required error={err("cv")}>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            <AnimatePresence mode="wait">
              {cv ? (
                <motion.div
                  key="file"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 border border-[#2A317A]/30 bg-[#EDF1F5] p-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#2A317A]">
                    <FileText className="h-5 w-5 text-white" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-semibold text-[#14212E]" dir="ltr" style={{ textAlign: isAr ? "right" : "left" }}>
                      {cv.name}
                    </p>
                    <p className="text-[12px] text-slate-500">{formatSize(cv.size)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCv(null);
                      if (fileRef.current) fileRef.current.value = "";
                    }}
                    className="p-2 text-slate-500 transition-colors hover:text-red-600"
                    aria-label={tx.removeCv}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="drop"
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    handleFile(e.dataTransfer.files?.[0]);
                  }}
                  whileHover={{ y: -2 }}
                  className={`flex w-full flex-col items-center justify-center border-2 border-dashed px-6 py-8 text-center transition-colors ${
                    dragging
                      ? "border-[#2A317A] bg-[#2A317A]/5"
                      : errors.cv
                      ? "border-red-300 bg-red-50/40"
                      : "border-slate-300 bg-[#EDF1F5]/50 hover:border-[#2A317A]"
                  }`}
                >
                  <motion.span
                    animate={dragging ? { y: -4 } : { y: 0 }}
                    className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#2A317A]"
                  >
                    <UploadCloud className="h-5 w-5 text-white" />
                  </motion.span>
                  <span className="text-[14px] font-semibold text-[#14212E]">{tx.clickUpload}</span>
                  <span className="mt-1 text-[12px] text-slate-500">{tx.dragDrop}</span>
                  <span className="mt-2 font-mono text-[11px] uppercase tracking-wide text-slate-400">
                    {tx.cvHint}
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </Field>

          {/* Skills */}
          <div className="mt-6">
            <Field label={tx.skills} required error={err("skills")}>
              <div className="flex gap-2">
                <input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill(skillInput);
                    }
                  }}
                  placeholder={tx.skillPh}
                  className={`${inputBase} ${padPlain} ${errors.skills ? "border-red-400" : "border-slate-200"}`}
                />
                <button
                  type="button"
                  onClick={() => addSkill(skillInput)}
                  className="flex shrink-0 items-center gap-1.5 bg-[#3C3C3B] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#2A317A]"
                >
                  <Plus className="h-4 w-4" /> {tx.add}
                </button>
              </div>
            </Field>

            {/* Added skills */}
            <div className="mt-3 flex flex-wrap gap-2">
              <AnimatePresence>
                {skills.map((skill) => (
                  <motion.span
                    key={skill}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex max-w-full items-center gap-2 bg-[#2A317A] py-1.5 ps-3 pe-1.5 text-[13px] font-medium text-white"
                  >
                    <span className="break-words">{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/30"
                      aria-label={`${tx.removeSkill} ${skill}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>

            {/* Suggested */}
            {availableSuggestions.length > 0 && (
              <div className="mt-5 border border-dashed border-slate-300 bg-[#EDF1F5]/50 p-4">
                <p className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#3C3C3B]">
                  <Sparkles className="h-3.5 w-3.5 text-[#2A317A]" /> {tx.suggestedSkills}
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableSuggestions.map((s) => (
                    <motion.button
                      key={s}
                      type="button"
                      layout
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => addSkill(s)}
                      className="flex items-center gap-1.5 border border-[#2A317A]/30 bg-white px-3 py-1.5 text-start text-[12.5px] font-medium text-[#2A317A] transition-colors hover:bg-[#2A317A] hover:text-white"
                    >
                      <Plus className="h-3.5 w-3.5 shrink-0" />
                      {s}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ---------- 05 Cover letter ---------- */}
        <section>
          <SectionTitle index={5} title={tx.coverLetterOptional} />
          <textarea
            rows={5}
            maxLength={1500}
            value={values.coverLetter}
            onChange={set("coverLetter")}
            placeholder={tx.coverPh}
            className={`${inputBase} ${padPlain} resize-y border-slate-200`}
          />
          <p className="mt-1 text-end font-mono text-[11px] text-slate-400" dir="ltr">
            {values.coverLetter.length}/1500
          </p>
        </section>

        {errors.form && (
          <p className="flex items-center gap-1.5 text-[13px] font-medium text-red-600">
            <AlertCircle className="h-4 w-4" /> {tx[errors.form]}
          </p>
        )}

        {/* ---------- Submit ---------- */}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden bg-[#3C3C3B] py-4 text-[14px] font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-70"
        >
          <span className="absolute inset-0 -translate-x-full bg-[#2A317A] transition-transform duration-300 ease-out group-hover:translate-x-0 rtl:translate-x-full rtl:group-hover:translate-x-0" />
          <span className="relative z-10 flex items-center gap-2">
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> {tx.sending}
              </>
            ) : (
              <>
                {isWaiting ? tx.joinWaitingList : tx.submit}
                <Send className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
              </>
            )}
          </span>
        </button>
      </div>
    </motion.form>
  );
}