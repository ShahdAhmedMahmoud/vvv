// // import { SPECIALTIES } from "../components/Suppliers/supplierData";

// // // The stepper is driven entirely by this map — only relevant steps are ever rendered.
// // export const FLOWS = {
// //   individual: [
// //     { id: "personal", label: "Personal information" },
// //     { id: "activity", label: "Business activity" },
// //     { id: "review", label: "Review" },
// //   ],
// //   company: [
// //     { id: "company", label: "Company information" },
// //     { id: "contacts", label: "Contact information" },
// //     { id: "activity", label: "Business activity" },
// //     { id: "review", label: "Review" },
// //   ],
// // };

// // export const WORK_TYPES = [
// //   { id: "supply", label: "توريد" },
// //   { id: "labor", label: "مصنعيات" },
// //   { id: "both", label: "توريد + مصنعيات" },
// // ];
// // export const workTypeLabel = (id) => WORK_TYPES.find((w) => w.id === id)?.label || "";

// // export const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
// // export const blankContact = () => ({ id: null, name: "", phone: "", email: "" });
// // export const blankAddress = () => ({ governorate: "", area: "", street: "", landmark: "" });

// // export const initialForm = () => ({
// //   supplierType: null, // "individual" | "company"
// //   personal: { fullName: "", nationalId: "", phone: "", email: "", address: blankAddress() },
// //   company: {
// //     name: "", commercialRegistrationNumber: "", taxNumber: "",
// //     bank: "", bankRegistrationNumber: "", responsiblePerson: "", address: blankAddress(),
// //   },
// //   contacts: [],
// //   contactDraft: blankContact(), // the open contact editor lives in form state so nothing is lost on Back/Next
// //   specialties: [], // selected specialty ids
// //   // activities[specialtyId][workItemName] = { workType, description }
// //   activities: {},
// // });

// // export const hasDraftContent = (d) => !!d && [d.name, d.phone, d.email].some((v) => v.trim());
// // export const countItems = (activities, specialties) =>
// //   specialties.reduce((n, id) => n + Object.keys(activities[id] || {}).length, 0);

// // const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// // const PHONE = /^\+?[0-9\s-]{8,15}$/;
// // const NUMERIC = /^[0-9-]+$/;

// // export function validateContact(c) {
// //   const e = {};
// //   if (!c.name.trim()) e.name = "Enter the contact name.";
// //   if (!c.phone.trim()) e.phone = "Enter a phone number.";
// //   else if (!PHONE.test(c.phone.trim())) e.phone = "Use 8–15 digits, optionally starting with +.";
// //   if (c.email.trim() && !EMAIL.test(c.email.trim())) e.email = "Enter a valid email address.";
// //   return e;
// // }

// // function validatePersonal(p) {
// //   const e = {};
// //   if (!p.fullName.trim()) e.fullName = "Enter the supplier's full name.";
// //   if (!p.phone.trim()) e.phone = "Enter a phone number.";
// //   else if (!PHONE.test(p.phone.trim())) e.phone = "Use 8–15 digits, optionally starting with +.";
// //   if (p.nationalId.trim() && !/^[0-9]{14}$/.test(p.nationalId.trim())) e.nationalId = "National ID must be 14 digits.";
// //   if (p.email.trim() && !EMAIL.test(p.email.trim())) e.email = "Enter a valid email address.";
// //   return e;
// // }

// // function validateCompany(c) {
// //   const e = {};
// //   if (!c.name.trim()) e.name = "Enter the company name.";
// //   if (!c.commercialRegistrationNumber.trim()) e.commercialRegistrationNumber = "Enter the commercial registration number.";
// //   else if (!NUMERIC.test(c.commercialRegistrationNumber.trim())) e.commercialRegistrationNumber = "Use digits only.";
// //   if (!c.taxNumber.trim()) e.taxNumber = "Enter the tax registration number.";
// //   else if (!NUMERIC.test(c.taxNumber.trim())) e.taxNumber = "Use digits only.";
// //   return e;
// // }

// // function validateContacts(form) {
// //   if (form.contacts.length > 0 && !hasDraftContent(form.contactDraft)) return {};
// //   if (hasDraftContent(form.contactDraft)) return { contacts: "Save or cancel the contact you're editing to continue." };
// //   return { contacts: "Add at least one contact." };
// // }

// // function validateActivity(form) {
// //   const e = {};
// //   if (form.specialties.length === 0) {
// //     e.specialties = "Select at least one specialty.";
// //     return e;
// //   }
// //   const empty = form.specialties.filter((id) => !Object.keys(form.activities[id] || {}).length);
// //   if (empty.length) {
// //     const names = empty.map((id) => SPECIALTIES.find((s) => s.id === id)?.name).join("، ");
// //     e.items = `Choose at least one work item for: ${names}.`;
// //   }
// //   return e;
// // }

// // export function validateAll(form) {
// //   return {
// //     personal: validatePersonal(form.personal),
// //     company: validateCompany(form.company),
// //     contacts: validateContacts(form),
// //     activity: validateActivity(form),
// //     review: {},
// //   };
// // }

// // // Shape sent to the backend.
// // export function toPayload(form) {
// //   const isCompany = form.supplierType === "company";
// //   return {
// //     supplierType: form.supplierType,
// //     ...(isCompany ? { company: form.company, contacts: form.contacts } : { personal: form.personal }),
// //     businessActivities: form.specialties.map((id) => ({
// //       specialty: SPECIALTIES.find((s) => s.id === id)?.name,
// //       workItems: Object.entries(form.activities[id] || {}).map(([name, v]) => ({
// //         name, workType: v.workType, description: v.description.trim(),
// //       })),
// //     })),
// //   };
// // }


// import { SPECIALTIES } from "../components/Suppliers/supplierData";

// // The stepper is driven entirely by this map — only relevant steps are ever rendered.
// export const FLOWS = {
//   individual: [
//     { id: "personal", label: "Personal information" },
//     { id: "activity", label: "Business activity" },
//     { id: "review", label: "Review" },
//   ],
//   company: [
//     { id: "company", label: "Company information" },
//     { id: "contacts", label: "Contact information" },
//     { id: "activity", label: "Business activity" },
//     { id: "review", label: "Review" },
//   ],
// };

// export const WORK_TYPES = [
//   { id: "supply", label: "توريد" },
//   { id: "labor", label: "مصنعيات" },
//   { id: "both", label: "توريد + مصنعيات" },
// ];
// export const workTypeLabel = (id) => WORK_TYPES.find((w) => w.id === id)?.label || "";

// export const ACCEPTED_FILE_TYPES = ".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg";
// export const MAX_FILE_MB = 10;
// export function checkFile(file) {
//   const ext = file.name.split(".").pop().toLowerCase();
//   if (!["pdf", "png", "jpg", "jpeg"].includes(ext)) return `${file.name}: only PDF, PNG or JPG files are allowed.`;
//   if (file.size > MAX_FILE_MB * 1024 * 1024) return `${file.name}: file is larger than ${MAX_FILE_MB} MB.`;
//   return null;
// }

// export const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
// export const blankContact = () => ({ id: null, name: "", phone: "", email: "" });
// export const blankAddress = () => ({ governorate: "", area: "", street: "", landmark: "" });

// export const initialForm = () => ({
//   supplierType: null, // "individual" | "company"
//   personal: { fullName: "", nationalId: "", phone: "", email: "", address: blankAddress(), previousWork: [] },
//   company: {
//     name: "", commercialRegistrationNumber: "", taxNumber: "",
//     bank: "", bankRegistrationNumber: "", responsiblePerson: "", address: blankAddress(),
//     commercialRegistrationFile: null, taxFile: null, previousWork: [], // File objects
//   },
//   contacts: [],
//   contactDraft: blankContact(), // the open contact editor lives in form state so nothing is lost on Back/Next
//   specialties: [], // selected specialty ids
//   // activities[specialtyId][workItemName] = { workType, description }
//   activities: {},
// });

// export const hasDraftContent = (d) => !!d && [d.name, d.phone, d.email].some((v) => v.trim());
// export const countItems = (activities, specialties) =>
//   specialties.reduce((n, id) => n + Object.keys(activities[id] || {}).length, 0);

// const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const PHONE = /^\+?[0-9\s-]{8,15}$/;
// const NUMERIC = /^[0-9-]+$/;

// export function validateContact(c) {
//   const e = {};
//   if (!c.name.trim()) e.name = "Enter the contact name.";
//   if (!c.phone.trim()) e.phone = "Enter a phone number.";
//   else if (!PHONE.test(c.phone.trim())) e.phone = "Use 8–15 digits, optionally starting with +.";
//   if (c.email.trim() && !EMAIL.test(c.email.trim())) e.email = "Enter a valid email address.";
//   return e;
// }

// function validatePersonal(p) {
//   const e = {};
//   if (!p.fullName.trim()) e.fullName = "Enter the supplier's full name.";
//   if (!p.phone.trim()) e.phone = "Enter a phone number.";
//   else if (!PHONE.test(p.phone.trim())) e.phone = "Use 8–15 digits, optionally starting with +.";
//   if (p.nationalId.trim() && !/^[0-9]{14}$/.test(p.nationalId.trim())) e.nationalId = "National ID must be 14 digits.";
//   if (p.email.trim() && !EMAIL.test(p.email.trim())) e.email = "Enter a valid email address.";
//   return e;
// }

// function validateCompany(c) {
//   const e = {};
//   if (!c.name.trim()) e.name = "Enter the company name.";
//   // Commercial registration and tax numbers are optional, but must be digits when provided.
//   if (c.commercialRegistrationNumber.trim() && !NUMERIC.test(c.commercialRegistrationNumber.trim())) e.commercialRegistrationNumber = "Use digits only.";
//   if (c.taxNumber.trim() && !NUMERIC.test(c.taxNumber.trim())) e.taxNumber = "Use digits only.";
//   return e;
// }

// function validateContacts(form) {
//   if (form.contacts.length > 0 && !hasDraftContent(form.contactDraft)) return {};
//   if (hasDraftContent(form.contactDraft)) return { contacts: "Save or cancel the contact you're editing to continue." };
//   return { contacts: "Add at least one contact." };
// }

// function validateActivity(form) {
//   const e = {};
//   if (form.specialties.length === 0) {
//     e.specialties = "Select at least one specialty.";
//     return e;
//   }
//   const empty = form.specialties.filter((id) => !Object.keys(form.activities[id] || {}).length);
//   if (empty.length) {
//     const names = empty.map((id) => SPECIALTIES.find((s) => s.id === id)?.name).join("، ");
//     e.items = `Choose at least one work item for: ${names}.`;
//   }
//   return e;
// }

// export function validateAll(form) {
//   return {
//     personal: validatePersonal(form.personal),
//     company: validateCompany(form.company),
//     contacts: validateContacts(form),
//     activity: validateActivity(form),
//     review: {},
//   };
// }

// const fileMeta = (f) => (f ? { name: f.name, size: f.size, type: f.type } : null);

// // JSON part of the request (files are described by metadata only).
// export function toPayload(form) {
//   const isCompany = form.supplierType === "company";
//   let party;
//   if (isCompany) {
//     const { commercialRegistrationFile, taxFile, previousWork, ...rest } = form.company;
//     party = { company: { ...rest, commercialRegistrationFile: fileMeta(commercialRegistrationFile), taxFile: fileMeta(taxFile), previousWork: previousWork.map(fileMeta) }, contacts: form.contacts };
//   } else {
//     const { previousWork, ...rest } = form.personal;
//     party = { personal: { ...rest, previousWork: previousWork.map(fileMeta) } };
//   }
//   return {
//     supplierType: form.supplierType,
//     ...party,
//     businessActivities: form.specialties.map((id) => ({
//       specialty: SPECIALTIES.find((s) => s.id === id)?.name,
//       workItems: Object.entries(form.activities[id] || {}).map(([name, v]) => ({
//         name, workType: v.workType, descriptions: v.descriptions,
//       })),
//     })),
//   };
// }

// // multipart/form-data: the JSON above + the actual files. Send this if your API accepts uploads.
// export function toFormData(form) {
//   const fd = new FormData();
//   fd.append("payload", JSON.stringify(toPayload(form)));
//   if (form.supplierType === "company") {
//     const c = form.company;
//     if (c.commercialRegistrationFile) fd.append("commercialRegistrationFile", c.commercialRegistrationFile);
//     if (c.taxFile) fd.append("taxFile", c.taxFile);
//     c.previousWork.forEach((f) => fd.append("previousWorkFiles", f));
//   } else {
//     form.personal.previousWork.forEach((f) => fd.append("previousWorkFiles", f));
//   }
//   return fd;
// }

import { SPECIALTIES } from "../components/Suppliers/supplierData";

// The stepper is driven entirely by this map — only relevant steps are ever rendered.
export const FLOWS = {
  individual: [
    { id: "personal", label: "Personal information" },
    { id: "activity", label: "Business activity" },
    { id: "review", label: "Review" },
  ],
  company: [
    { id: "company", label: "Company information" },
    { id: "contacts", label: "Contact information" },
    { id: "activity", label: "Business activity" },
    { id: "review", label: "Review" },
  ],
};

export const WORK_TYPES = [
  { id: "supply", label: "توريد" },
  { id: "labor", label: "مصنعيات" },
  { id: "both", label: "توريد + مصنعيات" },
];
export const workTypeLabel = (id) => WORK_TYPES.find((w) => w.id === id)?.label || "";

export const ACCEPTED_FILE_TYPES = ".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg";
export const MAX_FILE_MB = 10;
export function checkFile(file) {
  const ext = file.name.split(".").pop().toLowerCase();
  if (!["pdf", "png", "jpg", "jpeg"].includes(ext)) return `${file.name}: only PDF, PNG or JPG files are allowed.`;
  if (file.size > MAX_FILE_MB * 1024 * 1024) return `${file.name}: file is larger than ${MAX_FILE_MB} MB.`;
  return null;
}

export const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
export const blankContact = () => ({ id: null, name: "", phone: "", email: "" });
export const blankAddress = () => ({ governorate: "", area: "", street: "", landmark: "" });

export const initialForm = () => ({
  supplierType: null, // "individual" | "company"
  personal: { fullName: "", nationalId: "", phone: "", email: "", address: blankAddress(), nationalIdFile: null, previousWork: [] },
  company: {
    name: "", commercialRegistrationNumber: "", taxNumber: "",
    bank: "", bankRegistrationNumber: "", responsiblePerson: "", address: blankAddress(),
    commercialRegistrationFile: null, taxFile: null, previousWork: [], // File objects
  },
  contacts: [],
  contactDraft: blankContact(), // the open contact editor lives in form state so nothing is lost on Back/Next
  specialties: [], // selected specialty ids
  // activities[specialtyId][workItemName] = { workType, description }
  activities: {},
});

export const hasDraftContent = (d) => !!d && [d.name, d.phone, d.email].some((v) => v.trim());
export const countItems = (activities, specialties) =>
  specialties.reduce((n, id) => n + Object.keys(activities[id] || {}).length, 0);

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^\+?[0-9\s-]{8,15}$/;
const NUMERIC = /^[0-9-]+$/;

export function validateContact(c) {
  const e = {};
  if (!c.name.trim()) e.name = "Enter the contact name.";
  if (!c.phone.trim()) e.phone = "Enter a phone number.";
  else if (!PHONE.test(c.phone.trim())) e.phone = "Use 8–15 digits, optionally starting with +.";
  if (c.email.trim() && !EMAIL.test(c.email.trim())) e.email = "Enter a valid email address.";
  return e;
}

function validatePersonal(p) {
  const e = {};
  if (!p.fullName.trim()) e.fullName = "Enter the supplier's full name.";
  if (!p.phone.trim()) e.phone = "Enter a phone number.";
  else if (!PHONE.test(p.phone.trim())) e.phone = "Use 8–15 digits, optionally starting with +.";
  if (p.nationalId.trim() && !/^[0-9]{14}$/.test(p.nationalId.trim())) e.nationalId = "National ID must be 14 digits.";
  if (p.email.trim() && !EMAIL.test(p.email.trim())) e.email = "Enter a valid email address.";
  return e;
}

function validateCompany(c) {
  const e = {};
  if (!c.name.trim()) e.name = "Enter the company name.";
  // Commercial registration and tax numbers are optional, but must be digits when provided.
  if (c.commercialRegistrationNumber.trim() && !NUMERIC.test(c.commercialRegistrationNumber.trim())) e.commercialRegistrationNumber = "Use digits only.";
  if (c.taxNumber.trim() && !NUMERIC.test(c.taxNumber.trim())) e.taxNumber = "Use digits only.";
  return e;
}

function validateContacts(form) {
  if (form.contacts.length > 0 && !hasDraftContent(form.contactDraft)) return {};
  if (hasDraftContent(form.contactDraft)) return { contacts: "Save or cancel the contact you're editing to continue." };
  return { contacts: "Add at least one contact." };
}

function validateActivity(form) {
  const e = {};
  if (form.specialties.length === 0) {
    e.specialties = "Select at least one specialty.";
    return e;
  }
  const empty = form.specialties.filter((id) => !Object.keys(form.activities[id] || {}).length);
  if (empty.length) {
    const names = empty.map((id) => SPECIALTIES.find((s) => s.id === id)?.name).join("، ");
    e.items = `Choose at least one work item for: ${names}.`;
  }
  return e;
}

export function validateAll(form) {
  return {
    personal: validatePersonal(form.personal),
    company: validateCompany(form.company),
    contacts: validateContacts(form),
    activity: validateActivity(form),
    review: {},
  };
}

const fileMeta = (f) => (f ? { name: f.name, size: f.size, type: f.type } : null);

// JSON part of the request (files are described by metadata only).
export function toPayload(form) {
  const isCompany = form.supplierType === "company";
  let party;
  if (isCompany) {
    const { commercialRegistrationFile, taxFile, previousWork, ...rest } = form.company;
    party = { company: { ...rest, commercialRegistrationFile: fileMeta(commercialRegistrationFile), taxFile: fileMeta(taxFile), previousWork: previousWork.map(fileMeta) }, contacts: form.contacts };
  } else {
    const { previousWork, nationalIdFile, ...rest } = form.personal;
    party = { personal: { ...rest, nationalIdFile: fileMeta(nationalIdFile), previousWork: previousWork.map(fileMeta) } };
  }
  return {
    supplierType: form.supplierType,
    ...party,
    businessActivities: form.specialties.map((id) => ({
      specialty: SPECIALTIES.find((s) => s.id === id)?.name,
      workItems: Object.entries(form.activities[id] || {}).map(([name, v]) => ({
        name, workType: v.workType, descriptions: v.descriptions,
      })),
    })),
  };
}

// multipart/form-data: the JSON above + the actual files. Send this if your API accepts uploads.
export function toFormData(form) {
  const fd = new FormData();
  fd.append("payload", JSON.stringify(toPayload(form)));
  if (form.supplierType === "company") {
    const c = form.company;
    if (c.commercialRegistrationFile) fd.append("commercialRegistrationFile", c.commercialRegistrationFile);
    if (c.taxFile) fd.append("taxFile", c.taxFile);
    c.previousWork.forEach((f) => fd.append("previousWorkFiles", f));
  } else {
    if (form.personal.nationalIdFile) fd.append("nationalIdFile", form.personal.nationalIdFile);
    form.personal.previousWork.forEach((f) => fd.append("previousWorkFiles", f));
  }
  return fd;
}