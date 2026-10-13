import { ArrowRight, MapPin } from "lucide-react";
import { GOVERNORATES } from "./supplierData";
import { OptionalGroup, SearchSelect, TextField } from "./SupplierUI";

// Optional address block, reused by Company and Individual flows.
// Governorate → Area: Area stays disabled until a governorate is chosen, and resets if it changes.
export default function CompanyAddress({ title = "Address", value, onChange }) {
  const filled = Object.values(value).some((v) => v.trim());
  const areas = GOVERNORATES[value.governorate] || [];
  const set = (k) => (e) => onChange({ ...value, [k]: e.target.value });

  return (
    <OptionalGroup icon={MapPin} title={title} description="Governorate, area, street and landmark" filled={filled}>
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <SearchSelect
          label="Governorate" optional clearable options={Object.keys(GOVERNORATES)} value={value.governorate}
          placeholder="Choose governorate"
          onChange={(g) => onChange({ ...value, governorate: g, area: g === value.governorate ? value.area : "" })}
        />
        <ArrowRight size={18} aria-hidden="true" className="mb-3 hidden text-[#2A317A]/60 sm:block" />
        <SearchSelect
          label="Area" optional clearable options={areas} value={value.area} disabled={!value.governorate}
          placeholder={value.governorate ? "Choose area" : "Choose a governorate first"}
          onChange={(a) => onChange({ ...value, area: a })}
        />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <TextField label="Street" optional value={value.street} onChange={set("street")} />
        <TextField label="Landmark" optional value={value.landmark} onChange={set("landmark")} />
      </div>
    </OptionalGroup>
  );
}