import { Briefcase } from "lucide-react";
import FileAttachment from "./FileAttachment";
import { OptionalGroup } from "./SupplierUI";

// سابقة أعمال — optional, used by both the Company and Individual flows.
export default function PreviousWork({ value, onChange }) {
  return (
    <OptionalGroup icon={Briefcase} title="Previous work · سابقة أعمال" description="Attach documents that show past projects" filled={value.length > 0}>
      <FileAttachment label="Previous work files" multiple value={value} onChange={onChange} />
    </OptionalGroup>
  );
}