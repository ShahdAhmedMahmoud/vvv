import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Plus, Users } from "lucide-react";
import ContactCard from "./ContactCard";
import { blankContact, hasDraftContent, uid, validateContact } from "../../schemas/supplierSchema";
import { AttemptContext, Button, Collapse, ErrorText, Section, StepHeading, TextField } from "./SupplierUI";

// Contact list builder. The open editor ("draft") lives in the form state, so nothing is lost on Back/Next.
export default function ContactInformation({ contacts, draft, onChange, error }) {
  const [draftErrors, setDraftErrors] = useState({});
  const [tick, setTick] = useState(0);
  const [notice, setNotice] = useState("");

  const setDraft = (d) => onChange({ contacts, contactDraft: d });
  const field = (k) => (e) => setDraft({ ...draft, [k]: e.target.value });

  const save = () => {
    const errs = validateContact(draft);
    setDraftErrors(errs);
    if (Object.keys(errs).length) return setTick((t) => t + 1);
    const c = { id: draft.id || uid(), name: draft.name.trim(), phone: draft.phone.trim(), email: draft.email.trim() };
    onChange({ contacts: draft.id ? contacts.map((x) => (x.id === c.id ? c : x)) : [...contacts, c], contactDraft: null });
    setDraftErrors({});
    setNotice("");
  };

  const cancel = () => {
    onChange({ contacts, contactDraft: contacts.length ? null : blankContact() });
    setDraftErrors({});
    setNotice("");
  };

  const startEdit = (c) => {
    if (hasDraftContent(draft) && draft.id !== c.id) return setNotice("Save or cancel the contact you're editing first.");
    setNotice("");
    setDraftErrors({});
    setDraft({ ...c });
  };

  const remove = (id) => {
    const next = contacts.filter((c) => c.id !== id);
    onChange({ contacts: next, contactDraft: next.length === 0 ? blankContact() : draft?.id === id ? null : draft });
  };

  return (
    <div className="space-y-5">
      <StepHeading title="Contact information" description="Add everyone we should be able to reach. You can add more than one contact." />

      <Section icon={Users} title="Contacts" description={contacts.length ? `${contacts.length} added` : "No contacts yet"}>
        <ErrorText id="contacts-err" message={error} />

        <ul className="space-y-3 pt-1 empty:hidden" aria-label="Contacts">
          <AnimatePresence initial={false}>
            {contacts.map((c) => (
              <ContactCard key={c.id} contact={c} editing={draft?.id === c.id} onEdit={() => startEdit(c)} onRemove={() => remove(c.id)} />
            ))}
          </AnimatePresence>
        </ul>

        <Collapse open={!!draft}>
          {draft && (
            <AttemptContext.Provider value={tick}>
              <div className="mt-4 rounded-xl border border-dashed border-[#2A317A]/40 bg-[#2A317A]/[0.03] p-4 sm:p-5">
                <p className="mb-4 text-sm font-semibold text-[#2A317A]">{draft.id ? "Edit contact" : contacts.length ? "New contact" : "First contact"}</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField label="Contact name" required value={draft.name} onChange={field("name")} error={draftErrors.name} autoComplete="off" />
                  <TextField label="Phone number" required type="tel" inputMode="tel" value={draft.phone} onChange={field("phone")} error={draftErrors.phone} autoComplete="off" />
                  <TextField className="sm:col-span-2" label="Email" optional type="email" value={draft.email} onChange={field("email")} error={draftErrors.email} autoComplete="off" />
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button onClick={save}>{draft.id ? "Update contact" : "Save contact"}</Button>
                  {(contacts.length > 0 || hasDraftContent(draft)) && <Button variant="ghost" onClick={cancel}>Cancel</Button>}
                </div>
              </div>
            </AttemptContext.Provider>
          )}
        </Collapse>

        {notice && <p role="status" className="mt-3 text-xs font-medium text-red-700">{notice}</p>}

        {!draft && (
          <Button variant="secondary" className="mt-4" onClick={() => { setNotice(""); setDraft(blankContact()); }}>
            <Plus size={16} aria-hidden="true" />
            Add another contact
          </Button>
        )}
      </Section>
    </div>
  );
}