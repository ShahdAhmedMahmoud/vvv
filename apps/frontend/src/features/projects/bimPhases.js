// Keep project assignments explicit. Add a project ID only after its BIM
// phase participation has been verified by the BIM team.
export const bimPhases = [
  { id: "model-creation", label: "Model Creation", detail: "LOD 300", projectIds: [] },
  { id: "construction-model", label: "Develop Construction Model", detail: "LOD 400", projectIds: [] },
  { id: "quantification", label: "Quantification (BOQ)", detail: "", projectIds: [] },
  { id: "constructability", label: "Assess Constructability", detail: "LOD 350", projectIds: [] },
  { id: "shop-drawings", label: "Shop Drawing Extraction", detail: "", projectIds: [] },
  { id: "as-built-model", label: "As-Built Model", detail: "LOD 500", projectIds: [] },
  { id: "as-built-drawings", label: "As-built Drawing Extraction", detail: "", projectIds: [] },
];
