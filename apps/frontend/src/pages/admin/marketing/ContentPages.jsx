
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  CheckCircle2,
  Clock,
  Handshake,
  Info,
  LayoutGrid,
  Layers,
  Link2,
  Megaphone,
  PanelBottom,
  Plus,
  Quote,
  Save,
  Share2,
  Sparkles,
  Trash2,
  Wrench,
} from "lucide-react";

import { useMarketing } from "../../../features/marketing/MarketingProvider";
import {
  ABOUT_FEATURE_ICON_OPTIONS,
  ABOUT_STAT_ICON_OPTIONS,
  SERVICE_ICON_OPTIONS,
} from "../../../features/marketing/marketingIcons";
import { pair, readPair } from "../../../features/marketing/adminI18n";
import { useAdminLocale } from "./MarketingLayout";
import {
  AdminPage,
  PageHead,
  ImageDrop,
  UnsavedBar,
  btnDanger,
  btnPrimary,
  btnQuiet,
  cardCls,
  fieldCls,
  labelCls,
  stagger,
} from "../../../ui/adminUi";

const tabs = [
  { id: "about", labelKey: "tabAbout", icon: Info },
  { id: "services", labelKey: "tabServices", icon: Wrench },
  { id: "projects", labelKey: "tabProjects", icon: LayoutGrid },
  { id: "testimonials", labelKey: "tabTestimonials", icon: Quote },
  { id: "partners", labelKey: "tabPartners", icon: Handshake },
  { id: "footer", labelKey: "tabFooter", icon: PanelBottom },
];

const iconBtn =
  "grid h-11 w-11 place-items-center rounded-lg border border-[#3C3C3B]/25 bg-white text-[#3C3C3B] transition-all duration-300 hover:border-[#2A317A] hover:bg-[#2A317A] hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-35 motion-reduce:transition-none";

function moveItem(list, index, direction) {
  const target = index + direction;
  if (target < 0 || target >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(index, 1);
  next.splice(target, 0, item);
  return next;
}

/* Ids look like "feat-1730000000000": pull the timestamp out so we know if an item was just added. */
function idTime(id) {
  const part = String(id || "")
    .split("-")
    .find((s) => /^\d{13}$/.test(s));
  return part ? Number(part) : 0;
}

/* Small helpers so every list uses the same "new item goes first" rule. */
const patchAt = (list, index, patch) => list.map((item, i) => (i === index ? { ...item, ...patch } : item));
const without = (list, id) => list.filter((row) => row.id !== id);

/* ------------------------------------------------------------------ */
/* Building blocks                                                    */
/* ------------------------------------------------------------------ */

function TextField({ label, value, onChange, ltr = false, type = "text" }) {
  return (
    <label className={labelCls}>
      {label}
      <input
        type={type}
        dir={ltr ? "ltr" : undefined}
        className={fieldCls}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function SelectField({ label, value, onChange, children }) {
  return (
    <label className={labelCls}>
      {label}
      <select className={fieldCls} value={value} onChange={(event) => onChange(event.target.value)}>
        {children}
      </select>
    </label>
  );
}

function BilingualInput({ label, value, onChange, multiline = false, t }) {
  const current = readPair(value);
  const Input = multiline ? "textarea" : "input";
  const extra = multiline ? " min-h-28" : "";

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <label className={labelCls}>
        {label} — {t("fieldAr")}
        <Input
          className={`${fieldCls}${extra}`}
          value={current.ar}
          onChange={(e) => onChange(pair(e.target.value, current.en))}
        />
      </label>
      <label className={labelCls}>
        {label} — {t("fieldEn")}
        <Input
          className={`${fieldCls}${extra}`}
          dir="ltr"
          value={current.en}
          onChange={(e) => onChange(pair(current.ar, e.target.value))}
        />
      </label>
    </div>
  );
}

/* Same ImageDrop used by NewsPage: no path input, only the preview / upload UI. */
function MediaField({ label, value, onChange, t, contain = false }) {
  return (
    <div className="space-y-3">
      <label className={labelCls}>{label}</label>
      <ImageDrop
        value={value || ""}
        onChange={onChange}
        aspect={contain ? "aspect-square" : "aspect-video"}
        hint={t("uploadFile")}
      />
    </div>
  );
}

function SectionTitle({ kicker, title, text }) {
  return (
    <div>
      {kicker && (
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#2A317A]" dir="ltr">
          {kicker}
        </p>
      )}
      <h2 className="mt-1 text-2xl font-bold text-black sm:text-3xl">{title}</h2>
      {text && <p className="mt-2 max-w-2xl text-lg leading-8 text-[#3C3C3B]">{text}</p>}
    </div>
  );
}

function Section({ icon: Icon, title, index = 0, children }) {
  return (
    <section className={`${cardCls} adm-rise space-y-5 p-5 sm:p-7`} style={stagger(index, 40)}>
      {title && (
        <div className="flex items-center gap-3">
          {Icon && (
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#2A317A]/10 text-[#2A317A]">
              <Icon className="h-5 w-5" strokeWidth={1.8} />
            </span>
          )}
          <h3 className="text-xl font-bold text-black">{title}</h3>
        </div>
      )}
      {children}
    </section>
  );
}

function ListBlock({ icon: Icon = Layers, title, count, onAdd, t, index = 0, children }) {
  return (
    <div className="adm-rise space-y-4" style={stagger(index, 40)}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#2A317A]/10 text-[#2A317A]">
            <Icon className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <h3 className="text-xl font-bold text-black">{title}</h3>
          <span className="rounded-md bg-black px-2.5 py-0.5 text-sm font-bold text-white" dir="ltr">
            {count}
          </span>
        </div>

        {onAdd && (
          <button type="button" className={`${btnQuiet} group`} onClick={onAdd}>
            <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90 motion-reduce:transition-none" />
            {t("add")}
          </button>
        )}
      </div>

      {count === 0 ? (
        <div className="adm-pop grid place-items-center rounded-xl border border-dashed border-[#3C3C3B]/40 bg-[#3C3C3B]/[0.04] px-6 py-10 text-center text-lg text-[#3C3C3B]">
          لا توجد عناصر بعد
        </div>
      ) : (
        <div className="space-y-4">{children}</div>
      )}
    </div>
  );
}

/*
  itemId: when the id was created in the last 2 seconds the card is "fresh":
  it scrolls into view and gets a brand-colored ring for a moment.
*/
function ItemCard({ children, itemId, index = 0, count = 1, onRemove, onMoveUp, onMoveDown, t }) {
  const ref = useRef(null);
  const [fresh] = useState(() => {
    const ts = idTime(itemId);
    return ts > 0 && Date.now() - ts < 2000;
  });
  const [glow, setGlow] = useState(fresh);

  useEffect(() => {
    if (!fresh) return undefined;
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    const timer = setTimeout(() => setGlow(false), 2500);
    return () => clearTimeout(timer);
  }, [fresh]);

  return (
    <article
      ref={ref}
      className={`${cardCls} adm-pop group relative overflow-hidden p-5 transition-shadow duration-500 sm:p-6 ${
        glow ? "ring-2 ring-[#2A317A] ring-offset-2" : ""
      }`}
      style={stagger(index)}
    >
      <span className="absolute inset-y-0 start-0 w-1 origin-top scale-y-0 bg-[#2A317A] transition-transform duration-300 group-focus-within:scale-y-100 group-hover:scale-y-100 motion-reduce:transition-none" />

      <div className="mb-5 flex items-center justify-between gap-3">
        <span
          className="grid h-9 min-w-9 place-items-center rounded-md bg-[#2A317A]/10 px-2 text-base font-bold text-[#2A317A]"
          dir="ltr"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex items-center gap-2">
          {onMoveUp && (
            <button
              type="button"
              className={iconBtn}
              disabled={index === 0}
              onClick={onMoveUp}
              aria-label={t("moveUp")}
              title={t("moveUp")}
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          )}
          {onMoveDown && (
            <button
              type="button"
              className={iconBtn}
              disabled={index === count - 1}
              onClick={onMoveDown}
              aria-label={t("moveDown")}
              title={t("moveDown")}
            >
              <ArrowDown className="h-5 w-5" />
            </button>
          )}
          {onRemove && (
            <button
              type="button"
              className={btnDanger}
              onClick={() => {
                if (window.confirm("حذف العنصر ده؟")) onRemove();
              }}
            >
              <Trash2 className="h-4 w-4" />
              {t("remove")}
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">{children}</div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Editors                                                            */
/* ------------------------------------------------------------------ */

function AboutEditor({ value, onChange, t }) {
  const update = (patch) => onChange({ ...value, ...patch });
  const updateFeature = (index, patch) => update({ features: patchAt(value.features, index, patch) });
  const updateStat = (index, patch) => update({ stats: patchAt(value.stats, index, patch) });
  const updateBanner = (patch) => update({ banner: { ...value.banner, ...patch } });

  return (
    <div className="space-y-6">
      <SectionTitle kicker={t("aboutKicker")} title={t("tabAbout")} />

      <Section index={0}>
        <BilingualInput label={t("labelEyebrow")} value={value.eyebrow} onChange={(eyebrow) => update({ eyebrow })} t={t} />
        <BilingualInput label={t("labelTitle")} value={value.title} onChange={(title) => update({ title })} t={t} />
        <BilingualInput
          label={t("labelTitleHighlight")}
          value={value.titleHighlight}
          onChange={(titleHighlight) => update({ titleHighlight })}
          t={t}
        />
        <BilingualInput
          label={t("labelDescription")}
          value={value.description}
          onChange={(description) => update({ description })}
          t={t}
          multiline
        />
        <BilingualInput label={t("labelCta")} value={value.ctaLabel} onChange={(ctaLabel) => update({ ctaLabel })} t={t} />
        <TextField label={t("labelHref")} value={value.ctaHref} onChange={(ctaHref) => update({ ctaHref })} ltr />
        <MediaField label={t("labelImage")} value={value.image} onChange={(image) => update({ image })} t={t} />
        <BilingualInput label={t("labelImageAlt")} value={value.imageAlt} onChange={(imageAlt) => update({ imageAlt })} t={t} />
      </Section>

      <ListBlock
        icon={Sparkles}
        title={t("featuresHeading")}
        count={value.features.length}
        t={t}
        index={1}
        onAdd={() =>
          update({
            features: [
              {
                id: `feat-${Date.now()}`,
                icon: "Building2",
                title: pair("", ""),
                description: pair("", ""),
                position: "left",
              },
              ...value.features,
            ],
          })
        }
      >
        {value.features.map((feature, index) => (
          <ItemCard
            key={feature.id}
            itemId={feature.id}
            t={t}
            index={index}
            count={value.features.length}
            onMoveUp={() => update({ features: moveItem(value.features, index, -1) })}
            onMoveDown={() => update({ features: moveItem(value.features, index, 1) })}
            onRemove={() => update({ features: without(value.features, feature.id) })}
          >
            <BilingualInput
              label={t("labelTitle")}
              value={feature.title}
              onChange={(title) => updateFeature(index, { title })}
              t={t}
            />
            <BilingualInput
              label={t("labelDescription")}
              value={feature.description}
              onChange={(description) => updateFeature(index, { description })}
              t={t}
              multiline
            />
            <div className="grid gap-4 md:grid-cols-2">
              <SelectField label={t("labelIcon")} value={feature.icon} onChange={(icon) => updateFeature(index, { icon })}>
                {ABOUT_FEATURE_ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </SelectField>
              <SelectField
                label={t("labelPosition")}
                value={feature.position}
                onChange={(position) => updateFeature(index, { position })}
              >
                <option value="left">{t("posLeft")}</option>
                <option value="right">{t("posRight")}</option>
              </SelectField>
            </div>
          </ItemCard>
        ))}
      </ListBlock>

      <ListBlock
        icon={BarChart3}
        title={t("statsHeading")}
        count={value.stats.length}
        t={t}
        index={2}
        onAdd={() =>
          update({
            stats: [
              {
                id: `stat-${Date.now()}`,
                icon: "Users",
                target: 0,
                suffix: "+",
                label: pair("", ""),
              },
              ...value.stats,
            ],
          })
        }
      >
        {value.stats.map((stat, index) => (
          <ItemCard
            key={stat.id}
            itemId={stat.id}
            t={t}
            index={index}
            count={value.stats.length}
            onMoveUp={() => update({ stats: moveItem(value.stats, index, -1) })}
            onMoveDown={() => update({ stats: moveItem(value.stats, index, 1) })}
            onRemove={() => update({ stats: without(value.stats, stat.id) })}
          >
            <BilingualInput label={t("labelTitle")} value={stat.label} onChange={(label) => updateStat(index, { label })} t={t} />
            <div className="grid gap-4 md:grid-cols-3">
              <TextField
                label={t("labelTarget")}
                type="number"
                value={stat.target}
                onChange={(v) => updateStat(index, { target: Number(v) || 0 })}
              />
              <TextField label={t("labelSuffix")} value={stat.suffix} onChange={(suffix) => updateStat(index, { suffix })} ltr />
              <SelectField label={t("labelIcon")} value={stat.icon} onChange={(icon) => updateStat(index, { icon })}>
                {ABOUT_STAT_ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </SelectField>
            </div>
          </ItemCard>
        ))}
      </ListBlock>

      <Section icon={Megaphone} title={t("bannerHeading")} index={3}>
        <BilingualInput
          label={t("labelTitle")}
          value={value.banner?.title}
          onChange={(title) => updateBanner({ title })}
          t={t}
        />
        <BilingualInput
          label={t("labelSubtitle")}
          value={value.banner?.subtitle}
          onChange={(subtitle) => updateBanner({ subtitle })}
          t={t}
        />
        <BilingualInput
          label={t("labelCta")}
          value={value.banner?.buttonLabel}
          onChange={(buttonLabel) => updateBanner({ buttonLabel })}
          t={t}
        />
        <TextField
          label={t("labelHref")}
          value={value.banner?.buttonHref}
          onChange={(buttonHref) => updateBanner({ buttonHref })}
          ltr
        />
      </Section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Services                                                           */
/* ------------------------------------------------------------------ */

function ServicesEditor({ value, onChange, t }) {
  const update = (patch) => onChange({ ...value, ...patch });
  const updateItem = (index, patch) => update({ items: patchAt(value.items, index, patch) });

  return (
    <div className="space-y-6">
      <SectionTitle kicker={t("servicesKicker")} title={t("tabServices")} />

      <Section index={0}>
        <BilingualInput label={t("labelTitle")} value={value.title} onChange={(title) => update({ title })} t={t} />
        <BilingualInput
          label={t("labelTitleHighlight")}
          value={value.titleHighlight}
          onChange={(titleHighlight) => update({ titleHighlight })}
          t={t}
        />
        <BilingualInput
          label={t("labelSubtitle")}
          value={value.subtitle}
          onChange={(subtitle) => update({ subtitle })}
          t={t}
          multiline
        />
      </Section>

      <ListBlock
        title={t("itemsHeading")}
        count={value.items.length}
        t={t}
        index={1}
        onAdd={() =>
          update({
            items: [
              {
                id: `svc-${Date.now()}`,
                icon: "HardHat",
                title: pair("", ""),
                description: pair("", ""),
                image: "",
              },
              ...value.items,
            ],
          })
        }
      >
        {value.items.map((item, index) => (
          <ItemCard
            key={item.id}
            itemId={item.id}
            t={t}
            index={index}
            count={value.items.length}
            onMoveUp={() => update({ items: moveItem(value.items, index, -1) })}
            onMoveDown={() => update({ items: moveItem(value.items, index, 1) })}
            onRemove={() => update({ items: without(value.items, item.id) })}
          >
            <BilingualInput label={t("labelTitle")} value={item.title} onChange={(title) => updateItem(index, { title })} t={t} />
            <BilingualInput
              label={t("labelDescription")}
              value={item.description}
              onChange={(description) => updateItem(index, { description })}
              t={t}
              multiline
            />
            <SelectField label={t("labelIcon")} value={item.icon} onChange={(icon) => updateItem(index, { icon })}>
              {SERVICE_ICON_OPTIONS.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </SelectField>
            <MediaField label={t("labelImage")} value={item.image} onChange={(image) => updateItem(index, { image })} t={t} />
          </ItemCard>
        ))}
      </ListBlock>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Projects                                                           */
/* ------------------------------------------------------------------ */

function ProjectsBlockEditor({ value, onChange, t }) {
  const update = (patch) => onChange({ ...value, ...patch });

  return (
    <div className="space-y-6">
      <SectionTitle kicker={t("projectsKicker")} title={t("tabProjects")} text={t("projectsHint")} />

      <Section index={0}>
        <BilingualInput label={t("labelTitle")} value={value.title} onChange={(title) => update({ title })} t={t} />
        <BilingualInput
          label={t("labelTitleHighlight")}
          value={value.titleHighlight}
          onChange={(titleHighlight) => update({ titleHighlight })}
          t={t}
        />
        <BilingualInput
          label={t("labelSubtitle")}
          value={value.subtitle}
          onChange={(subtitle) => update({ subtitle })}
          t={t}
          multiline
        />
      </Section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                       */
/* ------------------------------------------------------------------ */

function TestimonialsEditor({ value, onChange, t }) {
  const update = (patch) => onChange({ ...value, ...patch });
  const updateItem = (index, patch) => update({ items: patchAt(value.items, index, patch) });

  return (
    <div className="space-y-6">
      <SectionTitle kicker={t("testimonialsKicker")} title={t("tabTestimonials")} />

      <Section index={0}>
        <BilingualInput label={t("labelBadge")} value={value.badge} onChange={(badge) => update({ badge })} t={t} />
        <BilingualInput
          label={t("labelTitleBefore")}
          value={value.titleBefore}
          onChange={(titleBefore) => update({ titleBefore })}
          t={t}
        />
        <BilingualInput
          label={t("labelTitleHighlight")}
          value={value.titleHighlight}
          onChange={(titleHighlight) => update({ titleHighlight })}
          t={t}
        />
        <BilingualInput
          label={t("labelSubtitle")}
          value={value.subtitle}
          onChange={(subtitle) => update({ subtitle })}
          t={t}
          multiline
        />
      </Section>

      <ListBlock
        icon={Quote}
        title={t("itemsHeading")}
        count={value.items.length}
        t={t}
        index={1}
        onAdd={() =>
          update({
            items: [
              {
                id: `t-${Date.now()}`,
                text: pair("", ""),
                image: "",
                name: "",
                role: pair("", ""),
              },
              ...value.items,
            ],
          })
        }
      >
        {value.items.map((item, index) => (
          <ItemCard
            key={item.id}
            itemId={item.id}
            t={t}
            index={index}
            count={value.items.length}
            onMoveUp={() => update({ items: moveItem(value.items, index, -1) })}
            onMoveDown={() => update({ items: moveItem(value.items, index, 1) })}
            onRemove={() => update({ items: without(value.items, item.id) })}
          >
            <BilingualInput
              label={t("labelText")}
              value={item.text}
              onChange={(text) => updateItem(index, { text })}
              t={t}
              multiline
            />
            <TextField label={t("labelName")} value={item.name} onChange={(name) => updateItem(index, { name })} ltr />
            <BilingualInput label={t("labelRole")} value={item.role} onChange={(role) => updateItem(index, { role })} t={t} />
            <MediaField label={t("labelImage")} value={item.image} onChange={(image) => updateItem(index, { image })} t={t} />
          </ItemCard>
        ))}
      </ListBlock>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Partners                                                           */
/* ------------------------------------------------------------------ */

function PartnersEditor({ value, onChange, t }) {
  const update = (patch) => onChange({ ...value, ...patch });
  const updateItem = (index, patch) => update({ items: patchAt(value.items, index, patch) });

  return (
    <div className="space-y-6">
      <SectionTitle kicker={t("partnersKicker")} title={t("tabPartners")} />

      <Section index={0}>
        <BilingualInput label={t("labelBadge")} value={value.badge} onChange={(badge) => update({ badge })} t={t} />
        <BilingualInput label={t("labelTitle")} value={value.title} onChange={(title) => update({ title })} t={t} />
        <BilingualInput
          label={t("labelSubtitle")}
          value={value.subtitle}
          onChange={(subtitle) => update({ subtitle })}
          t={t}
          multiline
        />
      </Section>

      <ListBlock
        icon={Handshake}
        title={t("itemsHeading")}
        count={value.items.length}
        t={t}
        index={1}
        onAdd={() =>
          update({
            items: [
              {
                id: `p-${Date.now()}`,
                name: pair("", ""),
                logo: "",
              },
              ...value.items,
            ],
          })
        }
      >
        {value.items.map((item, index) => (
          <ItemCard
            key={item.id}
            itemId={item.id}
            t={t}
            index={index}
            count={value.items.length}
            onMoveUp={() => update({ items: moveItem(value.items, index, -1) })}
            onMoveDown={() => update({ items: moveItem(value.items, index, 1) })}
            onRemove={() => update({ items: without(value.items, item.id) })}
          >
            <BilingualInput
              label={t("labelName")}
              value={typeof item.name === "string" ? pair(item.name, item.name) : item.name}
              onChange={(name) => updateItem(index, { name })}
              t={t}
            />
            <MediaField label={t("labelLogo")} value={item.logo} onChange={(logo) => updateItem(index, { logo })} t={t} contain />
          </ItemCard>
        ))}
      </ListBlock>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                             */
/* ------------------------------------------------------------------ */

function FooterEditor({ value, onChange, t }) {
  const update = (patch) => onChange({ ...value, ...patch });
  const updateIn = (key) => (index, patch) => update({ [key]: patchAt(value[key], index, patch) });
  const updateQuick = updateIn("quickLinks");
  const updateSocial = updateIn("socialLinks");
  const updateHours = updateIn("hours");
  const removeFrom = (key, id) => update({ [key]: without(value[key], id) });

  return (
    <div className="space-y-6">
      <SectionTitle kicker={t("footerKicker")} title={t("tabFooter")} />

      <Section icon={Megaphone} title={t("labelCta")} index={0}>
        <BilingualInput label={t("labelTitle")} value={value.ctaTitle} onChange={(ctaTitle) => update({ ctaTitle })} t={t} />
        <BilingualInput
          label={t("labelTitleHighlight")}
          value={value.ctaHighlight}
          onChange={(ctaHighlight) => update({ ctaHighlight })}
          t={t}
        />
        <BilingualInput
          label={t("labelCta")}
          value={value.ctaButtonLabel}
          onChange={(ctaButtonLabel) => update({ ctaButtonLabel })}
          t={t}
        />
        <TextField
          label={t("labelHref")}
          value={value.ctaButtonHref}
          onChange={(ctaButtonHref) => update({ ctaButtonHref })}
          ltr
        />
      </Section>

      <Section icon={Info} title={t("labelCompany")} index={1}>
        <TextField label={t("labelCompany")} value={value.companyName} onChange={(companyName) => update({ companyName })} />
        <BilingualInput
          label={t("labelBlurb")}
          value={value.companyBlurb}
          onChange={(companyBlurb) => update({ companyBlurb })}
          t={t}
          multiline
        />
        <BilingualInput label={t("labelAddress")} value={value.address} onChange={(address) => update({ address })} t={t} />
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label={t("labelPhone")} value={value.phone} onChange={(phone) => update({ phone })} ltr />
          <TextField label={t("labelEmail")} value={value.email} onChange={(email) => update({ email })} ltr />
        </div>
        <TextField
          label={t("labelCopyright")}
          value={value.copyrightName}
          onChange={(copyrightName) => update({ copyrightName })}
          ltr
        />
      </Section>

      <ListBlock icon={Link2} title={t("quickLinksHeading")} count={value.quickLinks.length} t={t} index={2}>
        {value.quickLinks.map((item, index) => (
          <ItemCard key={item.id} t={t} index={index} onRemove={() => removeFrom("quickLinks", item.id)}>
            <BilingualInput label={t("labelTitle")} value={item.label} onChange={(label) => updateQuick(index, { label })} t={t} />
            <TextField label={t("labelHref")} value={item.href} onChange={(href) => updateQuick(index, { href })} ltr />
          </ItemCard>
        ))}
      </ListBlock>

      <ListBlock icon={Share2} title={t("socialHeading")} count={value.socialLinks.length} t={t} index={3}>
        {value.socialLinks.map((item, index) => (
          <ItemCard key={item.id} t={t} index={index} onRemove={() => removeFrom("socialLinks", item.id)}>
            <div className="grid gap-4 md:grid-cols-3">
              <TextField label={t("labelName")} value={item.name} onChange={(name) => updateSocial(index, { name })} />
              <SelectField
                label={t("labelNetwork")}
                value={item.network || "facebook"}
                onChange={(network) => updateSocial(index, { network })}
              >
                <option value="facebook">facebook</option>
                <option value="instagram">instagram</option>
                <option value="linkedin">linkedin</option>
                <option value="tiktok">tiktok</option>
              </SelectField>
              <TextField label={t("labelHref")} value={item.href} onChange={(href) => updateSocial(index, { href })} ltr />
            </div>
          </ItemCard>
        ))}
      </ListBlock>

      <ListBlock icon={Clock} title={t("hoursHeading")} count={value.hours.length} t={t} index={4}>
        {value.hours.map((item, index) => (
          <ItemCard key={item.id} t={t} index={index} onRemove={() => removeFrom("hours", item.id)}>
            <BilingualInput label={t("labelDays")} value={item.days} onChange={(days) => updateHours(index, { days })} t={t} />
            <BilingualInput label={t("labelTime")} value={item.time} onChange={(time) => updateHours(index, { time })} t={t} />
          </ItemCard>
        ))}
      </ListBlock>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default function HomepageContentPage() {
  const { t } = useAdminLocale();

  const {
    about,
    services,
    projectsSection,
    testimonials,
    partners,
    footer,
    saveAbout,
    saveServices,
    saveProjectsSection,
    saveTestimonials,
    savePartners,
    saveFooter,
  } = useMarketing();

  const [tab, setTab] = useState("about");
  const [draft, setDraft] = useState({ about, services, projectsSection, testimonials, partners, footer });
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setDraft({ about, services, projectsSection, testimonials, partners, footer });
    setSaved(false);
    setDirty(false);
  }, [about, services, projectsSection, testimonials, partners, footer]);

  useEffect(() => {
    if (!saved) return undefined;
    const timer = setTimeout(() => setSaved(false), 3000);
    return () => clearTimeout(timer);
  }, [saved]);

  const change = (key) => (next) => {
    setSaved(false);
    setDirty(true);
    setDraft((current) => ({ ...current, [key]: next }));
  };

  const discard = () => {
    setDraft({ about, services, projectsSection, testimonials, partners, footer });
    setDirty(false);
    setSaved(false);
  };

  const onSave = (event) => {
    event.preventDefault();
    saveAbout(draft.about);
    saveServices(draft.services);
    saveProjectsSection(draft.projectsSection);
    saveTestimonials(draft.testimonials);
    savePartners(draft.partners);
    saveFooter(draft.footer);
    setDirty(false);
    setSaved(true);
  };

  let editor;
  if (tab === "about") {
    editor = <AboutEditor value={draft.about} onChange={change("about")} t={t} />;
  } else if (tab === "services") {
    editor = <ServicesEditor value={draft.services} onChange={change("services")} t={t} />;
  } else if (tab === "projects") {
    editor = <ProjectsBlockEditor value={draft.projectsSection} onChange={change("projectsSection")} t={t} />;
  } else if (tab === "testimonials") {
    editor = <TestimonialsEditor value={draft.testimonials} onChange={change("testimonials")} t={t} />;
  } else if (tab === "partners") {
    editor = <PartnersEditor value={draft.partners} onChange={change("partners")} t={t} />;
  } else {
    editor = <FooterEditor value={draft.footer} onChange={change("footer")} t={t} />;
  }

  return (
    <AdminPage as="form" onSubmit={onSave}>
      <PageHead kicker="CMS" title={t("homepageTitle")} text={t("homepageText")}>
        <button type="submit" className={btnPrimary}>
          <Save className="h-5 w-5" />
          {t("save")}
        </button>
      </PageHead>

      <UnsavedBar show={dirty} onDiscard={discard} />

      {saved && (
        <p
          className="adm-pop flex items-center gap-3 rounded-xl border border-[#2A317A]/40 bg-[#2A317A]/10 px-5 py-4 text-lg font-semibold text-[#2A317A]"
          role="status"
        >
          <CheckCircle2 className="h-6 w-6 shrink-0" />
          {t("saved")}
        </p>
      )}

      <div
        className="adm-rise flex gap-1 overflow-x-auto rounded-xl border border-[#3C3C3B]/15 bg-white p-1.5 shadow-sm"
        role="tablist"
        style={stagger(0, 60)}
      >
        {tabs.map((item) => {
          const Icon = item.icon;
          const on = tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setTab(item.id)}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-3 text-base font-semibold transition-all duration-300 motion-reduce:transition-none ${
                on ? "bg-[#2A317A] text-white shadow-sm" : "text-[#3C3C3B] hover:bg-[#2A317A]/10 hover:text-black"
              }`}
            >
              <Icon className="h-4 w-4" />
              {t(item.labelKey)}
            </button>
          );
        })}
      </div>

      <div key={tab}>{editor}</div>
    </AdminPage>
  );
}