// import { Building2, Landmark, UserRound } from "lucide-react";
// import CompanyAddress from "./CompanyAddress";
// import { BANKS } from "./supplierData";
// import { OptionalGroup, SearchSelect, Section, StepHeading, TextField } from "./SupplierUI";

// export default function CompanyInformation({ value, onChange, errors }) {
//   const set = (k) => (e) => onChange({ ...value, [k]: e.target.value });
//   return (
//     <div className="space-y-5">
//       <StepHeading title="Company information" description="Start with the company's legal identity. Banking, responsible person and address are optional." />

//       <Section icon={Building2} title="Company identity" description="Required">
//         <div className="grid gap-4 sm:grid-cols-2">
//           <TextField className="sm:col-span-2" label="Company name" required value={value.name} onChange={set("name")} error={errors.name} autoComplete="organization" />
//           <TextField label="Commercial registration number" required inputMode="numeric" value={value.commercialRegistrationNumber} onChange={set("commercialRegistrationNumber")} error={errors.commercialRegistrationNumber} />
//           <TextField label="Tax registration number" required inputMode="numeric" value={value.taxNumber} onChange={set("taxNumber")} error={errors.taxNumber} />
//         </div>
//       </Section>

//       <OptionalGroup icon={Landmark} title="Banking information" description="Bank and bank registration number" filled={!!(value.bank || value.bankRegistrationNumber.trim())}>
//         <div className="grid gap-4 sm:grid-cols-2">
//           <SearchSelect label="Bank" optional clearable options={BANKS} value={value.bank} placeholder="Search for a bank" searchPlaceholder="Type a bank name…" onChange={(bank) => onChange({ ...value, bank })} />
//           <TextField label="Bank registration number" optional value={value.bankRegistrationNumber} onChange={set("bankRegistrationNumber")} />
//         </div>
//       </OptionalGroup>

//       <OptionalGroup icon={UserRound} title="Responsible person" description="Who is accountable for this company" filled={!!value.responsiblePerson.trim()}>
//         <TextField label="Responsible person" optional value={value.responsiblePerson} onChange={set("responsiblePerson")} />
//       </OptionalGroup>

//       <CompanyAddress title="Company address" value={value.address} onChange={(address) => onChange({ ...value, address })} />
//     </div>
//   );
// }


import { Building2, Landmark, UserRound } from "lucide-react";
import CompanyAddress from "./CompanyAddress";
import FileAttachment from "./FileAttachment";
import PreviousWork from "./PreviousWork";
import { BANKS } from "./supplierData";
import { OptionalGroup, SearchSelect, Section, StepHeading, TextField } from "./SupplierUI";

export default function CompanyInformation({ value, onChange, errors }) {
  const set = (k) => (e) => onChange({ ...value, [k]: e.target.value });
  const setVal = (k) => (v) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-5">
      <StepHeading title="Company information" description="Only the company name is required. Registration numbers, banking, address and previous work are optional." />

      <Section icon={Building2} title="Company identity" description="Name is required">
        <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
          <TextField className="sm:col-span-2" label="Company name" required value={value.name} onChange={set("name")} error={errors.name} autoComplete="organization" />
          <div className="space-y-3">
            <TextField label="Commercial registration number" optional inputMode="numeric" value={value.commercialRegistrationNumber} onChange={set("commercialRegistrationNumber")} error={errors.commercialRegistrationNumber} />
            <FileAttachment label="Commercial registration attachment" value={value.commercialRegistrationFile} onChange={setVal("commercialRegistrationFile")} />
          </div>
          <div className="space-y-3">
            <TextField label="Tax registration number" optional inputMode="numeric" value={value.taxNumber} onChange={set("taxNumber")} error={errors.taxNumber} />
            <FileAttachment label="Tax card attachment" value={value.taxFile} onChange={setVal("taxFile")} />
          </div>
        </div>
      </Section>

      <OptionalGroup icon={Landmark} title="Banking information" description="Bank and bank registration number" filled={!!(value.bank || value.bankRegistrationNumber.trim())}>
        <div className="grid gap-4 sm:grid-cols-2">
          <SearchSelect label="Bank" optional clearable options={BANKS} value={value.bank} placeholder="Search for a bank" searchPlaceholder="Type a bank name…" onChange={(bank) => onChange({ ...value, bank })} />
          <TextField label="Bank registration number" optional value={value.bankRegistrationNumber} onChange={set("bankRegistrationNumber")} />
        </div>
      </OptionalGroup>

      <OptionalGroup icon={UserRound} title="Responsible person" description="Who is accountable for this company" filled={!!value.responsiblePerson.trim()}>
        <TextField label="Responsible person" optional value={value.responsiblePerson} onChange={set("responsiblePerson")} />
      </OptionalGroup>

      <CompanyAddress title="Company address" value={value.address} onChange={(address) => onChange({ ...value, address })} />
      <PreviousWork value={value.previousWork} onChange={setVal("previousWork")} />
    </div>
  );
}