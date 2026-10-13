// // import { User } from "lucide-react";
// // import CompanyAddress from "./CompanyAddress";
// // import { Section, StepHeading, TextField } from "./SupplierUI";

// // export default function PersonalInformation({ value, onChange, errors }) {
// //   const set = (k) => (e) => onChange({ ...value, [k]: e.target.value });
// //   return (
// //     <div className="space-y-5">
// //       <StepHeading title="Personal information" description="Who is the supplier? Only a name and phone number are required." />
// //       <Section icon={User} title="Personal details">
// //         <div className="grid gap-4 sm:grid-cols-2">
// //           <TextField className="sm:col-span-2" label="Full name" required value={value.fullName} onChange={set("fullName")} error={errors.fullName} autoComplete="name" />
// //           <TextField label="Phone number" required type="tel" inputMode="tel" value={value.phone} onChange={set("phone")} error={errors.phone} autoComplete="tel" />
// //           <TextField label="Email" optional type="email" value={value.email} onChange={set("email")} error={errors.email} autoComplete="email" />
// //           <TextField className="sm:col-span-2" label="National ID" optional inputMode="numeric" maxLength={14} hint="14 digits" value={value.nationalId} onChange={set("nationalId")} error={errors.nationalId} />
// //         </div>
// //       </Section>
// //       <CompanyAddress title="Address" value={value.address} onChange={(address) => onChange({ ...value, address })} />
// //     </div>
// //   );
// // }

// import { User } from "lucide-react";
// import CompanyAddress from "./CompanyAddress";
// import PreviousWork from "./PreviousWork";
// import { Section, StepHeading, TextField } from "./SupplierUI";

// export default function PersonalInformation({ value, onChange, errors }) {
//   const set = (k) => (e) => onChange({ ...value, [k]: e.target.value });
//   return (
//     <div className="space-y-5">
//       <StepHeading title="Personal information" description="Who is the supplier? Only a name and phone number are required." />
//       <Section icon={User} title="Personal details">
//         <div className="grid gap-4 sm:grid-cols-2">
//           <TextField className="sm:col-span-2" label="Full name" required value={value.fullName} onChange={set("fullName")} error={errors.fullName} autoComplete="name" />
//           <TextField label="Phone number" required type="tel" inputMode="tel" value={value.phone} onChange={set("phone")} error={errors.phone} autoComplete="tel" />
//           <TextField label="Email" optional type="email" value={value.email} onChange={set("email")} error={errors.email} autoComplete="email" />
//           <TextField className="sm:col-span-2" label="National ID" optional inputMode="numeric" maxLength={14} hint="14 digits" value={value.nationalId} onChange={set("nationalId")} error={errors.nationalId} />
//         </div>
//       </Section>
//       <CompanyAddress title="Address" value={value.address} onChange={(address) => onChange({ ...value, address })} />
//       <PreviousWork value={value.previousWork} onChange={(previousWork) => onChange({ ...value, previousWork })} />
//     </div>
//   );
// }


import { User } from "lucide-react";
import CompanyAddress from "./CompanyAddress";
import FileAttachment from "./FileAttachment";
import PreviousWork from "./PreviousWork";
import { Section, StepHeading, TextField } from "./SupplierUI";

export default function PersonalInformation({ value, onChange, errors }) {
  const set = (k) => (e) => onChange({ ...value, [k]: e.target.value });
  return (
    <div className="space-y-5">
      <StepHeading title="Personal information" description="Who is the supplier? Only a name and phone number are required." />
      <Section icon={User} title="Personal details">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField className="sm:col-span-2" label="Full name" required value={value.fullName} onChange={set("fullName")} error={errors.fullName} autoComplete="name" />
          <TextField label="Phone number" required type="tel" inputMode="tel" value={value.phone} onChange={set("phone")} error={errors.phone} autoComplete="tel" />
          <TextField label="Email" optional type="email" value={value.email} onChange={set("email")} error={errors.email} autoComplete="email" />
          <div className="space-y-3 sm:col-span-2">
            <TextField label="National ID" optional inputMode="numeric" maxLength={14} hint="14 digits" value={value.nationalId} onChange={set("nationalId")} error={errors.nationalId} />
            <FileAttachment label="National ID attachment" value={value.nationalIdFile} onChange={(nationalIdFile) => onChange({ ...value, nationalIdFile })} />
          </div>
        </div>
      </Section>
      <CompanyAddress title="Address" value={value.address} onChange={(address) => onChange({ ...value, address })} />
      <PreviousWork value={value.previousWork} onChange={(previousWork) => onChange({ ...value, previousWork })} />
    </div>
  );
}