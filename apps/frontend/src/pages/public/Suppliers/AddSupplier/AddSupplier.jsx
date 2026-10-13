// // import { useEffect, useMemo, useRef, useState } from "react";
// // import { AnimatePresence, MotionConfig, motion } from "framer-motion";
// // import { Check } from "lucide-react";

// // import SupplierTypeSelector from "../../../../components/Suppliers/SupplierTypeSelector";
// // import SupplierStepper from "../../../../components/Suppliers/SupplierStepper";
// // import PersonalInformation from "../../../../components/Suppliers/PersonalInformation";
// // import CompanyInformation from "../../../../components/Suppliers/CompanyInformation";
// // import ContactInformation from "../../../../components/Suppliers/ContactInformation";
// // import BusinessActivity from "../../../../components/Suppliers/BusinessActivity";
// // import SupplierReview from "../../../../components/Suppliers/SupplierReview";
// // import SupplierFormActions from "../../../../components/Suppliers/SupplierFormActions";
// // import { AttemptContext, Button, EASE } from "../../../../components/Suppliers/SupplierUI";
// // import { FLOWS, initialForm, toPayload, validateAll } from "../../../../schemas/supplierSchema";

// // // TODO: replace with your real API call (e.g. POST to the ASP.NET backend) and throw on failure.
// // async function submitSupplier(payload) {
// //   console.log("Supplier payload", payload);
// //   await new Promise((r) => setTimeout(r, 1200));
// // }

// // const slide = {
// //   enter: (d) => ({ opacity: 0, x: d * 28 }),
// //   center: { opacity: 1, x: 0 },
// //   exit: (d) => ({ opacity: 0, x: d * -28 }),
// // };

// // export default function AddSupplier() {
// //   const [form, setForm] = useState(initialForm);
// //   const [stepIndex, setStepIndex] = useState(-1); // -1 = supplier type screen
// //   const [dir, setDir] = useState(1);
// //   const [attempt, setAttempt] = useState(0);
// //   const [attempted, setAttempted] = useState({});
// //   const [status, setStatus] = useState("idle"); // idle | saving | saved
// //   const [done, setDone] = useState(false);
// //   const [saveError, setSaveError] = useState("");
// //   const timer = useRef(null);
// //   useEffect(() => () => clearTimeout(timer.current), []);

// //   const steps = form.supplierType ? FLOWS[form.supplierType] : [];
// //   const step = steps[stepIndex];
// //   const allErrors = useMemo(() => validateAll(form), [form]);
// //   const errors = step && attempted[step.id] ? allErrors[step.id] || {} : {};
// //   const hasErrors = (id) => Object.keys(allErrors[id] || {}).length > 0;
// //   const patch = (p) => setForm((f) => ({ ...f, ...p }));

// //   const focusFirstError = () => setTimeout(() => document.querySelector('[aria-invalid="true"]')?.focus(), 80);
// //   const go = (i, d) => { setDir(d); setStepIndex(i); window.scrollTo({ top: 0, behavior: "smooth" }); };

// //   const chooseType = (type) => {
// //     patch({ supplierType: type });
// //     clearTimeout(timer.current);
// //     timer.current = setTimeout(() => go(0, 1), 550); // let the selected-card animation play first
// //   };

// //   const submit = async () => {
// //     const firstBad = steps.findIndex((s) => hasErrors(s.id));
// //     if (firstBad !== -1) {
// //       setAttempted(Object.fromEntries(steps.map((s) => [s.id, true])));
// //       setAttempt((n) => n + 1);
// //       go(firstBad, firstBad > stepIndex ? 1 : -1);
// //       focusFirstError();
// //       return;
// //     }
// //     setSaveError("");
// //     setStatus("saving");
// //     try {
// //       await submitSupplier(toPayload(form));
// //       setStatus("saved");
// //       timer.current = setTimeout(() => setDone(true), 700);
// //     } catch {
// //       setStatus("idle");
// //       setSaveError("We couldn't save this supplier. Check your connection and try again.");
// //     }
// //   };

// //   const next = () => {
// //     if (step.id === "review") return submit();
// //     setAttempted((a) => ({ ...a, [step.id]: true }));
// //     if (hasErrors(step.id)) {
// //       setAttempt((n) => n + 1);
// //       focusFirstError();
// //       return;
// //     }
// //     go(stepIndex + 1, 1);
// //   };
// //   const back = () => go(stepIndex - 1, -1); // from step 0 this returns to the type screen; data is kept
// //   const editStep = (id) => go(steps.findIndex((s) => s.id === id), -1);

// //   const reset = () => {
// //     setForm(initialForm());
// //     setStepIndex(-1); setAttempted({}); setStatus("idle"); setDone(false); setDir(1);
// //   };

// //   const content = () => {
// //     if (stepIndex === -1) return <SupplierTypeSelector value={form.supplierType} onSelect={chooseType} />;
// //     switch (step.id) {
// //       case "personal": return <PersonalInformation value={form.personal} onChange={(personal) => patch({ personal })} errors={errors} />;
// //       case "company": return <CompanyInformation value={form.company} onChange={(company) => patch({ company })} errors={errors} />;
// //       case "contacts": return <ContactInformation contacts={form.contacts} draft={form.contactDraft} onChange={patch} error={errors.contacts} />;
// //       case "activity": return <BusinessActivity specialties={form.specialties} activities={form.activities} onChange={patch} errors={errors} />;
// //       case "review": return <SupplierReview form={form} errors={allErrors} onEdit={editStep} />;
// //       default: return null;
// //     }
// //   };

// //   return (
// //     <MotionConfig reducedMotion="user">
// //       <AttemptContext.Provider value={attempt}>
// //         <div className="min-h-screen overflow-x-clip bg-[#2A317A]/[0.03]">
// //           <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
// //             {done ? (
// //               <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }} className="rounded-2xl border border-[#3C3C3B]/12 bg-white p-8 text-center sm:p-12">
// //                 <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }} className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#2A317A] text-white">
// //                   <Check size={28} strokeWidth={3} aria-hidden="true" />
// //                 </motion.span>
// //                 <h2 className="mt-5 text-2xl font-semibold text-[#2A317A]">Supplier saved</h2>
// //                 <p dir="auto" className="mt-2 text-sm text-[#3C3C3B]/65">
// //                   {form.supplierType === "company" ? form.company.name : form.personal.fullName} has been added.
// //                 </p>
// //                 <Button className="mt-6" onClick={reset}>Add another supplier</Button>
// //               </motion.div>
// //             ) : (
// //               <>
// //                 <header className="mb-8">
// //                   <h1 className="text-sm font-semibold text-[#3C3C3B]/60">Add supplier</h1>
// //                 </header>

// //                 {stepIndex >= 0 && (
// //                   <div className="mb-8">
// //                     <SupplierStepper steps={steps} current={stepIndex} onJump={(i) => go(i, -1)} />
// //                   </div>
// //                 )}

// //                 <AnimatePresence mode="wait" custom={dir} initial={false}>
// //                   <motion.div
// //                     key={stepIndex === -1 ? "type" : step.id}
// //                     custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
// //                     transition={{ duration: 0.25, ease: EASE }}
// //                   >
// //                     {content()}
// //                   </motion.div>
// //                 </AnimatePresence>

// //                 {stepIndex >= 0 && (
// //                   <>
// //                     {saveError && <p role="alert" className="mt-4 text-sm font-medium text-red-700">{saveError}</p>}
// //                     <SupplierFormActions onBack={back} onNext={next} isReview={step.id === "review"} status={status} />
// //                   </>
// //                 )}
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </AttemptContext.Provider>
// //     </MotionConfig>
// //   );
// // }


// import { useEffect, useMemo, useRef, useState } from "react";
// import { AnimatePresence, MotionConfig, motion } from "framer-motion";
// import { Check } from "lucide-react";

// import SupplierTypeSelector from "../../../../components/Suppliers/SupplierTypeSelector";
// import SupplierStepper from "../../../../components/Suppliers/SupplierStepper";
// import PersonalInformation from "../../../../components/Suppliers/PersonalInformation";
// import CompanyInformation from "../../../../components/Suppliers/CompanyInformation";
// import ContactInformation from "../../../../components/Suppliers/ContactInformation";
// import BusinessActivity from "../../../../components/Suppliers/BusinessActivity";
// import SupplierReview from "../../../../components/Suppliers/SupplierReview";
// import SupplierFormActions from "../../../../components/Suppliers/SupplierFormActions";
// import { AttemptContext, Button, EASE } from "../../../../components/Suppliers/SupplierUI";
// import { FLOWS, initialForm, toPayload, validateAll } from "../../../../schemas/supplierSchema";

// // TODO: replace with your real API call (e.g. POST to the ASP.NET backend) and throw on failure.
// async function submitSupplier(payload) {
//   console.log("Supplier payload", payload);
//   await new Promise((r) => setTimeout(r, 1200));
// }

// const slide = {
//   enter: (d) => ({ opacity: 0, x: d * 28 }),
//   center: { opacity: 1, x: 0 },
//   exit: (d) => ({ opacity: 0, x: d * -28 }),
// };

// export default function AddSupplier() {
//   const [form, setForm] = useState(initialForm);
//   const [stepIndex, setStepIndex] = useState(-1); // -1 = supplier type screen
//   const [dir, setDir] = useState(1);
//   const [attempt, setAttempt] = useState(0);
//   const [attempted, setAttempted] = useState({});
//   const [status, setStatus] = useState("idle"); // idle | saving | saved
//   const [done, setDone] = useState(false);
//   const [saveError, setSaveError] = useState("");
//   const timer = useRef(null);
//   useEffect(() => () => clearTimeout(timer.current), []);

//   const steps = form.supplierType ? FLOWS[form.supplierType] : [];
//   const step = steps[stepIndex];
//   const allErrors = useMemo(() => validateAll(form), [form]);
//   const errors = step && attempted[step.id] ? allErrors[step.id] || {} : {};
//   const hasErrors = (id) => Object.keys(allErrors[id] || {}).length > 0;
//   const patch = (p) => setForm((f) => ({ ...f, ...p }));

//   const focusFirstError = () => setTimeout(() => document.querySelector('[aria-invalid="true"]')?.focus(), 80);
//   const go = (i, d) => { setDir(d); setStepIndex(i); window.scrollTo({ top: 0, behavior: "smooth" }); };

//   const chooseType = (type) => {
//     patch({ supplierType: type });
//     clearTimeout(timer.current);
//     timer.current = setTimeout(() => go(0, 1), 550); // let the selected-card animation play first
//   };

//   const submit = async () => {
//     const firstBad = steps.findIndex((s) => hasErrors(s.id));
//     if (firstBad !== -1) {
//       setAttempted(Object.fromEntries(steps.map((s) => [s.id, true])));
//       setAttempt((n) => n + 1);
//       go(firstBad, firstBad > stepIndex ? 1 : -1);
//       focusFirstError();
//       return;
//     }
//     setSaveError("");
//     setStatus("saving");
//     try {
//       await submitSupplier(toPayload(form));
//       setStatus("saved");
//       timer.current = setTimeout(() => setDone(true), 700);
//     } catch {
//       setStatus("idle");
//       setSaveError("We couldn't save this supplier. Check your connection and try again.");
//     }
//   };

//   const next = () => {
//     if (step.id === "review") return submit();
//     setAttempted((a) => ({ ...a, [step.id]: true }));
//     if (hasErrors(step.id)) {
//       setAttempt((n) => n + 1);
//       focusFirstError();
//       return;
//     }
//     go(stepIndex + 1, 1);
//   };
//   const back = () => go(stepIndex - 1, -1); // from step 0 this returns to the type screen; data is kept
//   const editStep = (id) => go(steps.findIndex((s) => s.id === id), -1);

//   const reset = () => {
//     setForm(initialForm());
//     setStepIndex(-1); setAttempted({}); setStatus("idle"); setDone(false); setDir(1);
//   };

//   const content = () => {
//     if (stepIndex === -1) return <SupplierTypeSelector value={form.supplierType} onSelect={chooseType} />;
//     switch (step.id) {
//       case "personal": return <PersonalInformation value={form.personal} onChange={(personal) => patch({ personal })} errors={errors} />;
//       case "company": return <CompanyInformation value={form.company} onChange={(company) => patch({ company })} errors={errors} />;
//       case "contacts": return <ContactInformation contacts={form.contacts} draft={form.contactDraft} onChange={patch} error={errors.contacts} />;
//       case "activity": return <BusinessActivity specialties={form.specialties} activities={form.activities} onChange={patch} errors={errors} />;
//       case "review": return <SupplierReview form={form} errors={allErrors} onEdit={editStep} />;
//       default: return null;
//     }
//   };

//   return (
//     <MotionConfig reducedMotion="user">
//       <AttemptContext.Provider value={attempt}>
//         <div className="min-h-screen overflow-x-clip bg-[#2A317A]/[0.03]">
//           {/* pt-24 / sm:pt-28 leave room for the fixed navbar. Increase them if your navbar is taller. */}
//           <div className="mx-auto w-full max-w-3xl px-4 pb-8 pt-24 sm:px-6 sm:pt-28 lg:pb-12">
//             {done ? (
//               <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }} className="rounded-2xl border border-[#3C3C3B]/12 bg-white p-8 text-center sm:p-12">
//                 <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }} className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#2A317A] text-white">
//                   <Check size={28} strokeWidth={3} aria-hidden="true" />
//                 </motion.span>
//                 <h2 className="mt-5 text-2xl font-semibold text-[#2A317A]">Supplier saved</h2>
//                 <p dir="auto" className="mt-2 text-sm text-[#3C3C3B]/65">
//                   {form.supplierType === "company" ? form.company.name : form.personal.fullName} has been added.
//                 </p>
//                 <Button className="mt-6" onClick={reset}>Add another supplier</Button>
//               </motion.div>
//             ) : (
//               <>
//                 <header className="mb-8">
//                   <h1 className="text-sm font-semibold text-[#3C3C3B]/60">Add supplier</h1>
//                 </header>

//                 {stepIndex >= 0 && (
//                   <div className="mb-8">
//                     <SupplierStepper steps={steps} current={stepIndex} onJump={(i) => go(i, -1)} />
//                   </div>
//                 )}

//                 <AnimatePresence mode="wait" custom={dir} initial={false}>
//                   <motion.div
//                     key={stepIndex === -1 ? "type" : step.id}
//                     custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
//                     transition={{ duration: 0.25, ease: EASE }}
//                   >
//                     {content()}
//                   </motion.div>
//                 </AnimatePresence>

//                 {stepIndex >= 0 && (
//                   <>
//                     {saveError && <p role="alert" className="mt-4 text-sm font-medium text-red-700">{saveError}</p>}
//                     <SupplierFormActions onBack={back} onNext={next} isReview={step.id === "review"} status={status} />
//                   </>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </AttemptContext.Provider>
//     </MotionConfig>
//   );
// }

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Check } from "lucide-react";

import SupplierTypeSelector from "../../../../components/Suppliers/SupplierTypeSelector";
import SupplierStepper from "../../../../components/Suppliers/SupplierStepper";
import PersonalInformation from "../../../../components/Suppliers/PersonalInformation";
import CompanyInformation from "../../../../components/Suppliers/CompanyInformation";
import ContactInformation from "../../../../components/Suppliers/ContactInformation";
import BusinessActivity from "../../../../components/Suppliers/BusinessActivity";
import SupplierReview from "../../../../components/Suppliers/SupplierReview";
import SupplierFormActions from "../../../../components/Suppliers/SupplierFormActions";
import { AttemptContext, Button, EASE } from "../../../../components/Suppliers/SupplierUI";
import { FLOWS, initialForm, toFormData, toPayload, validateAll } from "../../../../schemas/supplierSchema";

// TODO: replace with your real API call (e.g. POST to the ASP.NET backend) and throw on failure.
// `payload` = JSON (files as metadata). `formData` = same JSON + the real files, for multipart upload.
async function submitSupplier(payload, formData) {
  console.log("Supplier payload", payload, [...formData.keys()]);
  await new Promise((r) => setTimeout(r, 1200));
}

const slide = {
  enter: (d) => ({ opacity: 0, x: d * 28 }),
  center: { opacity: 1, x: 0 },
  exit: (d) => ({ opacity: 0, x: d * -28 }),
};

export default function AddSupplier() {
  const [form, setForm] = useState(initialForm);
  const [stepIndex, setStepIndex] = useState(-1); // -1 = supplier type screen
  const [dir, setDir] = useState(1);
  const [attempt, setAttempt] = useState(0);
  const [attempted, setAttempted] = useState({});
  const [status, setStatus] = useState("idle"); // idle | saving | saved
  const [done, setDone] = useState(false);
  const [saveError, setSaveError] = useState("");
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const steps = form.supplierType ? FLOWS[form.supplierType] : [];
  const step = steps[stepIndex];
  const allErrors = useMemo(() => validateAll(form), [form]);
  const errors = step && attempted[step.id] ? allErrors[step.id] || {} : {};
  const hasErrors = (id) => Object.keys(allErrors[id] || {}).length > 0;
  const patch = (p) => setForm((f) => ({ ...f, ...p }));

  const focusFirstError = () => setTimeout(() => document.querySelector('[aria-invalid="true"]')?.focus(), 80);
  const go = (i, d) => { setDir(d); setStepIndex(i); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const chooseType = (type) => {
    patch({ supplierType: type });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => go(0, 1), 550); // let the selected-card animation play first
  };

  const submit = async () => {
    const firstBad = steps.findIndex((s) => hasErrors(s.id));
    if (firstBad !== -1) {
      setAttempted(Object.fromEntries(steps.map((s) => [s.id, true])));
      setAttempt((n) => n + 1);
      go(firstBad, firstBad > stepIndex ? 1 : -1);
      focusFirstError();
      return;
    }
    setSaveError("");
    setStatus("saving");
    try {
      await submitSupplier(toPayload(form), toFormData(form));
      setStatus("saved");
      timer.current = setTimeout(() => setDone(true), 700);
    } catch {
      setStatus("idle");
      setSaveError("We couldn't save this supplier. Check your connection and try again.");
    }
  };

  const next = () => {
    if (step.id === "review") return submit();
    setAttempted((a) => ({ ...a, [step.id]: true }));
    if (hasErrors(step.id)) {
      setAttempt((n) => n + 1);
      focusFirstError();
      return;
    }
    go(stepIndex + 1, 1);
  };
  const back = () => go(stepIndex - 1, -1); // from step 0 this returns to the type screen; data is kept
  const editStep = (id) => go(steps.findIndex((s) => s.id === id), -1);

  const reset = () => {
    setForm(initialForm());
    setStepIndex(-1); setAttempted({}); setStatus("idle"); setDone(false); setDir(1);
  };

  const content = () => {
    if (stepIndex === -1) return <SupplierTypeSelector value={form.supplierType} onSelect={chooseType} />;
    switch (step.id) {
      case "personal": return <PersonalInformation value={form.personal} onChange={(personal) => patch({ personal })} errors={errors} />;
      case "company": return <CompanyInformation value={form.company} onChange={(company) => patch({ company })} errors={errors} />;
      case "contacts": return <ContactInformation contacts={form.contacts} draft={form.contactDraft} onChange={patch} error={errors.contacts} />;
      case "activity": return <BusinessActivity specialties={form.specialties} activities={form.activities} onChange={patch} errors={errors} />;
      case "review": return <SupplierReview form={form} errors={allErrors} onEdit={editStep} />;
      default: return null;
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <AttemptContext.Provider value={attempt}>
        <div className="min-h-screen overflow-x-clip bg-[#2A317A]/[0.03]">
          {/* pt-24 / sm:pt-28 leave room for the fixed navbar. Increase them if your navbar is taller. */}
          <div className="mx-auto w-full max-w-3xl px-4 pb-8 pt-24 sm:px-6 sm:pt-28 lg:pb-12">
            {done ? (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }} className="rounded-2xl border border-[#3C3C3B]/12 bg-white p-8 text-center sm:p-12">
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }} className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#2A317A] text-white">
                  <Check size={28} strokeWidth={3} aria-hidden="true" />
                </motion.span>
                <h2 className="mt-5 text-2xl font-semibold text-[#2A317A]">Supplier saved</h2>
                <p dir="auto" className="mt-2 text-sm text-[#3C3C3B]/65">
                  {form.supplierType === "company" ? form.company.name : form.personal.fullName} has been added.
                </p>
                <Button className="mt-6" onClick={reset}>Add another supplier</Button>
              </motion.div>
            ) : (
              <>
                <header className="mb-8">
                  <h1 className="text-sm font-semibold text-[#3C3C3B]/60">Add supplier</h1>
                </header>

                {stepIndex >= 0 && (
                  <div className="mb-8">
                    <SupplierStepper steps={steps} current={stepIndex} onJump={(i) => go(i, -1)} />
                  </div>
                )}

                <AnimatePresence mode="wait" custom={dir} initial={false}>
                  <motion.div
                    key={stepIndex === -1 ? "type" : step.id}
                    custom={dir} variants={slide} initial="enter" animate="center" exit="exit"
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    {content()}
                  </motion.div>
                </AnimatePresence>

                {stepIndex >= 0 && (
                  <>
                    {saveError && <p role="alert" className="mt-4 text-sm font-medium text-red-700">{saveError}</p>}
                    <SupplierFormActions onBack={back} onNext={next} isReview={step.id === "review"} status={status} />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </AttemptContext.Provider>
    </MotionConfig>
  );
}