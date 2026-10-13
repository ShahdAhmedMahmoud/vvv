// // import { useState } from "react";
// // import { motion } from "framer-motion";
// // import { CheckCircle2 } from "lucide-react";

// // export default function ApplicationForm({ job, isWaiting }) {
// //   const [submitted, setSubmitted] = useState(false);
// //   const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

// //   const handleChange = (e) =>
// //     setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     // هنا هتحطي الاتصال الفعلي بالـ backend/API لتسجيل الطلب
// //     setSubmitted(true);
// //   };

// //   if (submitted) {
// //     return (
// //       <motion.div
// //         initial={{ opacity: 0, y: 10 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-10 text-center"
// //       >
// //         <CheckCircle2 className="h-8 w-8 text-emerald-400" />
// //         <p className="text-[15px] font-semibold text-white">
// //           {isWaiting
// //             ? "You've been added to the waiting list."
// //             : "Your application has been submitted."}
// //         </p>
// //         <p className="text-[13px] text-slate-300">
// //           {isWaiting
// //             ? "We'll email you as soon as this position reopens."
// //             : "Our team will review it and get back to you soon."}
// //         </p>
// //       </motion.div>
// //     );
// //   }

// //   return (
// //     <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
// //       <p className="text-[13px] text-slate-300">
// //         {isWaiting ? (
// //           <>
// //             You're joining the waiting list for <strong>{job.title}</strong>. This role
// //             isn't actively hiring right now — we'll contact you if that changes.
// //           </>
// //         ) : (
// //           <>
// //             You're applying for the currently open position of <strong>{job.title}</strong>.
// //           </>
// //         )}
// //       </p>

// //       <div className="grid gap-4 sm:grid-cols-2">
// //         <div className="flex flex-col gap-1.5">
// //           <label className="text-[12.5px] font-medium text-slate-300">Full name</label>
// //           <input
// //             required
// //             name="name"
// //             value={form.name}
// //             onChange={handleChange}
// //             className="rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-[14px] text-white outline-none focus:border-amber-400"
// //           />
// //         </div>
// //         <div className="flex flex-col gap-1.5">
// //           <label className="text-[12.5px] font-medium text-slate-300">Email</label>
// //           <input
// //             required
// //             type="email"
// //             name="email"
// //             value={form.email}
// //             onChange={handleChange}
// //             className="rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-[14px] text-white outline-none focus:border-amber-400"
// //           />
// //         </div>
// //       </div>

// //       <div className="flex flex-col gap-1.5">
// //         <label className="text-[12.5px] font-medium text-slate-300">Phone</label>
// //         <input
// //           required
// //           type="tel"
// //           name="phone"
// //           value={form.phone}
// //           onChange={handleChange}
// //           className="rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-[14px] text-white outline-none focus:border-amber-400"
// //         />
// //       </div>

// //       <div className="flex flex-col gap-1.5">
// //         <label className="text-[12.5px] font-medium text-slate-300">
// //           {isWaiting ? "Why are you interested in this role?" : "Cover letter"}
// //         </label>
// //         <textarea
// //           name="message"
// //           rows={4}
// //           value={form.message}
// //           onChange={handleChange}
// //           className="rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-[14px] text-white outline-none focus:border-amber-400"
// //         />
// //       </div>

// //       <button
// //         type="submit"
// //         className="mt-2 rounded-xl bg-amber-500 py-3 text-[14px] font-semibold text-[#1E2432] transition-opacity hover:opacity-90"
// //       >
// //         {isWaiting ? "Join Waiting List" : "Submit Application"}
// //       </button>
// //     </form>
// //   );
// // }

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Paperclip, X, CheckCircle2, Loader2 } from "lucide-react";

// function Field({ label, required, children }) {
//   return (
//     <div>
//       <label className="mb-1.5 block text-[13.5px] font-semibold text-[#14212E]">
//         {label}
//         {required && <span className="ml-0.5 text-amber-600">*</span>}
//       </label>
//       {children}
//     </div>
//   );
// }

// const inputClass =
//   "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-[14.5px] text-[#14212E] placeholder-slate-400 outline-none transition-colors focus:border-[#1F3888] focus:ring-4 focus:ring-[#1F3888]/10";

// export default function ApplicationForm({ job, isWaiting }) {
//   const [status, setStatus] = useState("idle"); // idle | submitting | success
//   const [file, setFile] = useState(null);
//   const [form, setForm] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     linkedin: "",
//     message: "",
//   });

//   const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

//   const handleFile = (e) => {
//     const f = e.target.files?.[0];
//     if (f) setFile(f);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setStatus("submitting");
//     // no backend wired up yet — simulate the round trip so the button's
//     // loading/success states are real to test against once one exists
//     setTimeout(() => setStatus("success"), 1100);
//   };

//   if (status === "success") {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 8 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex flex-col items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-12 text-center"
//       >
//         <motion.div
//           initial={{ scale: 0.6, rotate: -10 }}
//           animate={{ scale: 1, rotate: 0 }}
//           transition={{ type: "spring", stiffness: 260, damping: 16 }}
//         >
//           <CheckCircle2 className="h-10 w-10 text-emerald-600" />
//         </motion.div>
//         <p className="text-[16px] font-semibold text-[#14212E]">
//           {isWaiting ? "You're on the list" : "Application sent"}
//         </p>
//         <p className="max-w-sm text-[14px] text-slate-500">
//           {isWaiting
//             ? `We'll reach out to ${form.fullName || "you"} by email if the ${job.title} role reopens.`
//             : `Thanks ${form.fullName || "for applying"} — we'll review your application for ${job.title} and get back to you by email.`}
//         </p>
//       </motion.div>
//     );
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
//     >
//       <h3 className="text-[18px] font-bold text-[#14212E]">
//         {isWaiting ? "Join the waiting list" : "Apply for this role"}
//       </h3>
//       <p className="mt-1 text-[13.5px] text-slate-500">
//         {isWaiting
//           ? `We'll contact you if the ${job.title} position reopens.`
//           : `Applying for ${job.title} · ${job.department}`}
//       </p>

//       <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
//         <Field label="Full name" required>
//           <input
//             type="text"
//             required
//             value={form.fullName}
//             onChange={update("fullName")}
//             placeholder="e.g. Sara Ahmed"
//             className={inputClass}
//           />
//         </Field>
//         <Field label="Email" required>
//           <input
//             type="email"
//             required
//             value={form.email}
//             onChange={update("email")}
//             placeholder="you@example.com"
//             className={inputClass}
//           />
//         </Field>
//         <Field label="Phone" required>
//           <input
//             type="tel"
//             required
//             value={form.phone}
//             onChange={update("phone")}
//             placeholder="+20 1xx xxx xxxx"
//             className={inputClass}
//           />
//         </Field>
//         <Field label="LinkedIn / Portfolio">
//           <input
//             type="url"
//             value={form.linkedin}
//             onChange={update("linkedin")}
//             placeholder="https://"
//             className={inputClass}
//           />
//         </Field>
//       </div>

//       <div className="mt-5">
//         <Field label="Resume / CV" required>
//           {!file ? (
//             <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-[13.5px] text-slate-500 transition-colors hover:border-[#1F3888] hover:bg-slate-50/80">
//               <Paperclip className="h-4 w-4" />
//               <span>Click to upload PDF or Word — max 5MB</span>
//               <input
//                 type="file"
//                 accept=".pdf,.doc,.docx"
//                 required
//                 onChange={handleFile}
//                 className="hidden"
//               />
//             </label>
//           ) : (
//             <div className="flex items-center justify-between rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5">
//               <span className="flex items-center gap-2 truncate text-[13.5px] text-[#14212E]">
//                 <Paperclip className="h-4 w-4 shrink-0 text-amber-600" />
//                 <span className="truncate">{file.name}</span>
//               </span>
//               <button
//                 type="button"
//                 onClick={() => setFile(null)}
//                 className="ml-2 shrink-0 rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-[#14212E]"
//               >
//                 <X className="h-3.5 w-3.5" />
//               </button>
//             </div>
//           )}
//         </Field>
//       </div>

//       <div className="mt-5">
//         <Field label="Cover letter">
//           <textarea
//             rows={4}
//             value={form.message}
//             onChange={update("message")}
//             placeholder="Tell us why you're a good fit for this role (optional)"
//             className={`${inputClass} resize-none`}
//           />
//         </Field>
//       </div>

//       <motion.button
//         whileTap={{ scale: 0.98 }}
//         type="submit"
//         disabled={status === "submitting"}
//         className="relative mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#14212E] py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#1F3888] disabled:opacity-70 sm:w-auto sm:px-10"
//       >
//         <AnimatePresence mode="wait">
//           {status === "submitting" ? (
//             <motion.span
//               key="submitting"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="flex items-center gap-2"
//             >
//               <Loader2 className="h-4 w-4 animate-spin" /> Sending...
//             </motion.span>
//           ) : (
//             <motion.span
//               key="idle"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             >
//               {isWaiting ? "Join Waiting List" : "Submit Application"}
//             </motion.span>
//           )}
//         </AnimatePresence>
//       </motion.button>
//     </form>
//   );
// }


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Paperclip, X, CheckCircle2, Loader2 } from "lucide-react";

function Field({ label, required, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-[13.5px] font-semibold text-[#3C3C3B]">
        {label}
        {required && <span className="ml-0.5 text-[#2A317A]">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-[14.5px] text-[#3C3C3B] placeholder-slate-400 outline-none transition-colors focus:border-[#2A317A] focus:ring-4 focus:ring-[#2A317A]/10";

export default function ApplicationForm({ job, isWaiting, embedded = false, onSuccessClose }) {
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    message: "",
  });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");
    // لسه مفيش backend متوصل — بنعمل simulate عشان نختبر حالة اللودينج والنجاح
    setTimeout(() => setStatus("success"), 1100);
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-12 text-center"
      >
        <motion.div
          initial={{ scale: 0.6, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
        >
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </motion.div>
        <p className="text-[16px] font-semibold text-[#3C3C3B]">
          {isWaiting ? "تم تسجيلك في القائمة" : "تم إرسال طلبك"}
        </p>
        <p className="max-w-sm text-[14px] text-slate-500">
          {isWaiting
            ? `هنتواصل مع ${form.fullName || "حضرتك"} بالإيميل لو وظيفة ${job.title} اتفتحت تاني.`
            : `شكراً ${form.fullName || "على التقديم"} — هنراجع طلبك لوظيفة ${job.title} ونرد عليك بالإيميل.`}
        </p>
        {embedded && (
          <button
            onClick={onSuccessClose}
            className="mt-2 rounded-lg bg-[#2A317A] px-5 py-2 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#232a68]"
          >
            تمام
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={embedded ? "" : "rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"}
    >
      {!embedded && (
        <>
          <h3 className="text-[18px] font-bold text-[#3C3C3B]">
            {isWaiting ? "انضم لقائمة الانتظار" : "تقديم على الوظيفة"}
          </h3>
          <p className="mt-1 text-[13.5px] text-slate-500">
            {isWaiting
              ? `هنتواصل معاك لو وظيفة ${job.title} اتفتحت تاني.`
              : `تقديم على ${job.title} · ${job.department}`}
          </p>
        </>
      )}

      <div className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${embedded ? "" : "mt-6"}`}>
        <Field label="الاسم بالكامل" required>
          <input
            type="text"
            required
            value={form.fullName}
            onChange={update("fullName")}
            placeholder="مثال: سارة أحمد"
            className={inputClass}
          />
        </Field>
        <Field label="البريد الإلكتروني" required>
          <input
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            placeholder="you@example.com"
            className={inputClass}
          />
        </Field>
        <Field label="رقم الموبايل" required>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={update("phone")}
            placeholder="+20 1xx xxx xxxx"
            className={inputClass}
          />
        </Field>
        <Field label="لينكدإن / بورتفوليو">
          <input
            type="url"
            value={form.linkedin}
            onChange={update("linkedin")}
            placeholder="https://"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="السيرة الذاتية (CV)" required>
          {!file ? (
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-[13.5px] text-slate-500 transition-colors hover:border-[#2A317A] hover:bg-slate-50/80">
              <Paperclip className="h-4 w-4" />
              <span>اضغط لرفع PDF أو Word — أقصى حجم 5MB</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                required
                onChange={handleFile}
                className="hidden"
              />
            </label>
          ) : (
            <div className="flex items-center justify-between rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2.5">
              <span className="flex items-center gap-2 truncate text-[13.5px] text-[#3C3C3B]">
                <Paperclip className="h-4 w-4 shrink-0 text-[#2A317A]" />
                <span className="truncate">{file.name}</span>
              </span>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="ml-2 shrink-0 rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-[#3C3C3B]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </Field>
      </div>

      <div className="mt-5">
        <Field label="خطاب التقديم">
          <textarea
            rows={4}
            value={form.message}
            onChange={update("message")}
            placeholder="قولنا ليه انت مناسب للوظيفة دي (اختياري)"
            className={`${inputClass} resize-none`}
          />
        </Field>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={status === "submitting"}
        className="relative mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2A317A] py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#232a68] disabled:opacity-70 sm:w-auto sm:px-10"
      >
        <AnimatePresence mode="wait">
          {status === "submitting" ? (
            <motion.span
              key="submitting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="h-4 w-4 animate-spin" /> جاري الإرسال...
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {isWaiting ? "انضمام لقائمة الانتظار" : "إرسال الطلب"}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </form>
  );
}
