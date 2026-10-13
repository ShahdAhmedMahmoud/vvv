// // import { motion } from "framer-motion";
// // import { Briefcase, Building2, Check, CircleAlert, MapPin, Minus, Pencil, User, Users } from "lucide-react";
// // import { SPECIALTIES } from "./supplierData";
// // import { countItems } from "../../schemas/supplierSchema";
// // import { Button, cx, EASE, IconBox, StepHeading } from "./SupplierUI";

// // const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
// // const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } } };

// // const STATUS = {
// //   complete: { icon: Check, text: "Complete", cls: "bg-[#2A317A] text-white" },
// //   incomplete: { icon: CircleAlert, text: "Needs attention", cls: "bg-red-100 text-red-700" },
// //   skipped: { icon: Minus, text: "Skipped (optional)", cls: "bg-[#3C3C3B]/10 text-[#3C3C3B]/60" },
// // };

// // function ReviewSection({ icon, title, status, lines, onEdit }) {
// //   const S = STATUS[status];
// //   return (
// //     <motion.section variants={item} className="rounded-xl border border-[#3C3C3B]/12 bg-white p-5">
// //       <div className="flex items-start gap-3">
// //         <IconBox icon={icon} />
// //         <div className="min-w-0 flex-1">
// //           <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
// //             <h3 className="text-sm font-semibold text-[#3C3C3B]">{title}</h3>
// //             <span className={cx("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", S.cls)}>
// //               <S.icon size={12} strokeWidth={3} aria-hidden="true" />
// //               {S.text}
// //             </span>
// //           </div>
// //           {lines.length > 0 && (
// //             <ul className="mt-2 space-y-0.5 text-sm text-[#3C3C3B]/80">
// //               {lines.map((l, i) => <li key={i} dir="auto">{l}</li>)}
// //             </ul>
// //           )}
// //         </div>
// //         <Button variant="ghost" className="px-2.5 py-1.5 text-xs" onClick={onEdit} aria-label={`Edit ${title}`}>
// //           <Pencil size={13} aria-hidden="true" />
// //           Edit
// //         </Button>
// //       </div>
// //     </motion.section>
// //   );
// // }

// // export default function SupplierReview({ form, errors, onEdit }) {
// //   const isCompany = form.supplierType === "company";
// //   const base = isCompany ? form.company : form.personal;
// //   const infoStep = isCompany ? "company" : "personal";
// //   const bad = (id) => Object.keys(errors[id] || {}).length > 0;
// //   const addr = [base.address.governorate, base.address.area, base.address.street, base.address.landmark].filter(Boolean);
// //   const itemCount = countItems(form.activities, form.specialties);

// //   const sections = [];
// //   if (isCompany) {
// //     const c = form.company;
// //     sections.push({
// //       key: "info", icon: Building2, title: "Company information", step: "company", status: bad("company") ? "incomplete" : "complete",
// //       lines: [c.name, c.commercialRegistrationNumber && `CR: ${c.commercialRegistrationNumber}`, c.taxNumber && `Tax ID: ${c.taxNumber}`,
// //         c.bank && `Bank: ${c.bank}`, c.bankRegistrationNumber && `Bank reg. no.: ${c.bankRegistrationNumber}`, c.responsiblePerson && `Responsible: ${c.responsiblePerson}`].filter(Boolean),
// //     });
// //     sections.push({
// //       key: "contacts", icon: Users, title: "Contacts", step: "contacts", status: bad("contacts") ? "incomplete" : "complete",
// //       lines: [`${form.contacts.length} contact${form.contacts.length === 1 ? "" : "s"}`, ...form.contacts.map((x) => `${x.name} · ${x.phone}`)],
// //     });
// //   } else {
// //     const p = form.personal;
// //     sections.push({
// //       key: "info", icon: User, title: "Personal information", step: "personal", status: bad("personal") ? "incomplete" : "complete",
// //       lines: [p.fullName, p.phone, p.email, p.nationalId && `National ID: ${p.nationalId}`].filter(Boolean),
// //     });
// //   }
// //   sections.push({ key: "address", icon: MapPin, title: "Address", step: infoStep, status: addr.length ? "complete" : "skipped", lines: addr.length ? [addr.join("، ")] : [] });
// //   sections.push({
// //     key: "activity", icon: Briefcase, title: "Business activity", step: "activity", status: bad("activity") ? "incomplete" : "complete",
// //     lines: [`${form.specialties.length} specialt${form.specialties.length === 1 ? "y" : "ies"}`, `${itemCount} work item${itemCount === 1 ? "" : "s"}`,
// //       ...form.specialties.map((id) => SPECIALTIES.find((s) => s.id === id)?.name)],
// //   });

// //   return (
// //     <div>
// //       <StepHeading title="Review and save" description="Check everything below. Use Edit to jump back to any section — your answers are kept." />
// //       <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
// //         {sections.map((s) => (
// //           <ReviewSection key={s.key} icon={s.icon} title={s.title} status={s.status} lines={s.lines} onEdit={() => onEdit(s.step)} />
// //         ))}
// //       </motion.div>
// //     </div>
// //   );
// // }


// import { motion } from "framer-motion";
// import { Briefcase, Building2, Check, CircleAlert, FileText, MapPin, Minus, Pencil, User, Users } from "lucide-react";
// import { SPECIALTIES } from "./supplierData";
// import { countItems } from "../../schemas/supplierSchema";
// import { Button, cx, EASE, IconBox, StepHeading } from "./SupplierUI";

// const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
// const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } } };

// const STATUS = {
//   complete: { icon: Check, text: "Complete", cls: "bg-[#2A317A] text-white" },
//   incomplete: { icon: CircleAlert, text: "Needs attention", cls: "bg-red-100 text-red-700" },
//   skipped: { icon: Minus, text: "Skipped (optional)", cls: "bg-[#3C3C3B]/10 text-[#3C3C3B]/60" },
// };

// function ReviewSection({ icon, title, status, lines, onEdit }) {
//   const S = STATUS[status];
//   return (
//     <motion.section variants={item} className="rounded-xl border border-[#3C3C3B]/12 bg-white p-5">
//       <div className="flex items-start gap-3">
//         <IconBox icon={icon} />
//         <div className="min-w-0 flex-1">
//           <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
//             <h3 className="text-sm font-semibold text-[#3C3C3B]">{title}</h3>
//             <span className={cx("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", S.cls)}>
//               <S.icon size={12} strokeWidth={3} aria-hidden="true" />
//               {S.text}
//             </span>
//           </div>
//           {lines.length > 0 && (
//             <ul className="mt-2 space-y-0.5 text-sm text-[#3C3C3B]/80">
//               {lines.map((l, i) => <li key={i} dir="auto">{l}</li>)}
//             </ul>
//           )}
//         </div>
//         <Button variant="ghost" className="px-2.5 py-1.5 text-xs" onClick={onEdit} aria-label={`Edit ${title}`}>
//           <Pencil size={13} aria-hidden="true" />
//           Edit
//         </Button>
//       </div>
//     </motion.section>
//   );
// }

// export default function SupplierReview({ form, errors, onEdit }) {
//   const isCompany = form.supplierType === "company";
//   const base = isCompany ? form.company : form.personal;
//   const infoStep = isCompany ? "company" : "personal";
//   const bad = (id) => Object.keys(errors[id] || {}).length > 0;
//   const addr = [base.address.governorate, base.address.area, base.address.street, base.address.landmark].filter(Boolean);
//   const itemCount = countItems(form.activities, form.specialties);

//   const sections = [];
//   if (isCompany) {
//     const c = form.company;
//     sections.push({
//       key: "info", icon: Building2, title: "Company information", step: "company", status: bad("company") ? "incomplete" : "complete",
//       lines: [c.name, c.commercialRegistrationNumber && `CR: ${c.commercialRegistrationNumber}`, c.taxNumber && `Tax ID: ${c.taxNumber}`,
//         c.commercialRegistrationFile && `CR attachment: ${c.commercialRegistrationFile.name}`, c.taxFile && `Tax attachment: ${c.taxFile.name}`,
//         c.bank && `Bank: ${c.bank}`, c.bankRegistrationNumber && `Bank reg. no.: ${c.bankRegistrationNumber}`, c.responsiblePerson && `Responsible: ${c.responsiblePerson}`].filter(Boolean),
//     });
//     sections.push({
//       key: "contacts", icon: Users, title: "Contacts", step: "contacts", status: bad("contacts") ? "incomplete" : "complete",
//       lines: [`${form.contacts.length} contact${form.contacts.length === 1 ? "" : "s"}`, ...form.contacts.map((x) => `${x.name} · ${x.phone}`)],
//     });
//   } else {
//     const p = form.personal;
//     sections.push({
//       key: "info", icon: User, title: "Personal information", step: "personal", status: bad("personal") ? "incomplete" : "complete",
//       lines: [p.fullName, p.phone, p.email, p.nationalId && `National ID: ${p.nationalId}`].filter(Boolean),
//     });
//   }
//   sections.push({ key: "address", icon: MapPin, title: "Address", step: infoStep, status: addr.length ? "complete" : "skipped", lines: addr.length ? [addr.join("، ")] : [] });
//   const prev = isCompany ? form.company.previousWork : form.personal.previousWork;
//   sections.push({
//     key: "previous", icon: FileText, title: "Previous work", step: infoStep, status: prev.length ? "complete" : "skipped",
//     lines: prev.length ? [`${prev.length} file${prev.length === 1 ? "" : "s"}`, ...prev.map((f) => f.name)] : [],
//   });
//   sections.push({
//     key: "activity", icon: Briefcase, title: "Business activity", step: "activity", status: bad("activity") ? "incomplete" : "complete",
//     lines: [`${form.specialties.length} specialt${form.specialties.length === 1 ? "y" : "ies"}`, `${itemCount} work item${itemCount === 1 ? "" : "s"}`,
//       ...form.specialties.map((id) => SPECIALTIES.find((s) => s.id === id)?.name)],
//   });

//   return (
//     <div>
//       <StepHeading title="Review and save" description="Check everything below. Use Edit to jump back to any section — your answers are kept." />
//       <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
//         {sections.map((s) => (
//           <ReviewSection key={s.key} icon={s.icon} title={s.title} status={s.status} lines={s.lines} onEdit={() => onEdit(s.step)} />
//         ))}
//       </motion.div>
//     </div>
//   );
// }

import { motion } from "framer-motion";
import { Briefcase, Building2, Check, CircleAlert, FileText, MapPin, Minus, Pencil, User, Users } from "lucide-react";
import { SPECIALTIES } from "./supplierData";
import { countItems } from "../../schemas/supplierSchema";
import { Button, cx, EASE, IconBox, StepHeading } from "./SupplierUI";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } } };

const STATUS = {
  complete: { icon: Check, text: "Complete", cls: "bg-[#2A317A] text-white" },
  incomplete: { icon: CircleAlert, text: "Needs attention", cls: "bg-red-100 text-red-700" },
  skipped: { icon: Minus, text: "Skipped (optional)", cls: "bg-[#3C3C3B]/10 text-[#3C3C3B]/60" },
};

function ReviewSection({ icon, title, status, lines, onEdit }) {
  const S = STATUS[status];
  return (
    <motion.section variants={item} className="rounded-xl border border-[#3C3C3B]/12 bg-white p-5">
      <div className="flex items-start gap-3">
        <IconBox icon={icon} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="text-sm font-semibold text-[#3C3C3B]">{title}</h3>
            <span className={cx("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", S.cls)}>
              <S.icon size={12} strokeWidth={3} aria-hidden="true" />
              {S.text}
            </span>
          </div>
          {lines.length > 0 && (
            <ul className="mt-2 space-y-0.5 text-sm text-[#3C3C3B]/80">
              {lines.map((l, i) => <li key={i} dir="auto">{l}</li>)}
            </ul>
          )}
        </div>
        <Button variant="ghost" className="px-2.5 py-1.5 text-xs" onClick={onEdit} aria-label={`Edit ${title}`}>
          <Pencil size={13} aria-hidden="true" />
          Edit
        </Button>
      </div>
    </motion.section>
  );
}

export default function SupplierReview({ form, errors, onEdit }) {
  const isCompany = form.supplierType === "company";
  const base = isCompany ? form.company : form.personal;
  const infoStep = isCompany ? "company" : "personal";
  const bad = (id) => Object.keys(errors[id] || {}).length > 0;
  const addr = [base.address.governorate, base.address.area, base.address.street, base.address.landmark].filter(Boolean);
  const itemCount = countItems(form.activities, form.specialties);

  const sections = [];
  if (isCompany) {
    const c = form.company;
    sections.push({
      key: "info", icon: Building2, title: "Company information", step: "company", status: bad("company") ? "incomplete" : "complete",
      lines: [c.name, c.commercialRegistrationNumber && `CR: ${c.commercialRegistrationNumber}`, c.taxNumber && `Tax ID: ${c.taxNumber}`,
        c.commercialRegistrationFile && `CR attachment: ${c.commercialRegistrationFile.name}`, c.taxFile && `Tax attachment: ${c.taxFile.name}`,
        c.bank && `Bank: ${c.bank}`, c.bankRegistrationNumber && `Bank reg. no.: ${c.bankRegistrationNumber}`, c.responsiblePerson && `Responsible: ${c.responsiblePerson}`].filter(Boolean),
    });
    sections.push({
      key: "contacts", icon: Users, title: "Contacts", step: "contacts", status: bad("contacts") ? "incomplete" : "complete",
      lines: [`${form.contacts.length} contact${form.contacts.length === 1 ? "" : "s"}`, ...form.contacts.map((x) => `${x.name} · ${x.phone}`)],
    });
  } else {
    const p = form.personal;
    sections.push({
      key: "info", icon: User, title: "Personal information", step: "personal", status: bad("personal") ? "incomplete" : "complete",
      lines: [p.fullName, p.phone, p.email, p.nationalId && `National ID: ${p.nationalId}`, p.nationalIdFile && `National ID attachment: ${p.nationalIdFile.name}`].filter(Boolean),
    });
  }
  sections.push({ key: "address", icon: MapPin, title: "Address", step: infoStep, status: addr.length ? "complete" : "skipped", lines: addr.length ? [addr.join("، ")] : [] });
  const prev = isCompany ? form.company.previousWork : form.personal.previousWork;
  sections.push({
    key: "previous", icon: FileText, title: "Previous work", step: infoStep, status: prev.length ? "complete" : "skipped",
    lines: prev.length ? [`${prev.length} file${prev.length === 1 ? "" : "s"}`, ...prev.map((f) => f.name)] : [],
  });
  sections.push({
    key: "activity", icon: Briefcase, title: "Business activity", step: "activity", status: bad("activity") ? "incomplete" : "complete",
    lines: [`${form.specialties.length} specialt${form.specialties.length === 1 ? "y" : "ies"}`, `${itemCount} work item${itemCount === 1 ? "" : "s"}`,
      ...form.specialties.map((id) => SPECIALTIES.find((s) => s.id === id)?.name)],
  });

  return (
    <div>
      <StepHeading title="Review and save" description="Check everything below. Use Edit to jump back to any section — your answers are kept." />
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
        {sections.map((s) => (
          <ReviewSection key={s.key} icon={s.icon} title={s.title} status={s.status} lines={s.lines} onEdit={() => onEdit(s.step)} />
        ))}
      </motion.div>
    </div>
  );
}