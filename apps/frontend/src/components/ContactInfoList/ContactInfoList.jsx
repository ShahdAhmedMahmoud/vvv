import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";

const INFO_ITEMS = [
  {
    icon: MapPin,
    title: "Head Office",
    lines: ["35A, First Settlement Services Center,", "New Cairo, Cairo, Egypt"],
    showMapAction: true,
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+20 2 1234 5678"],
    href: "tel:+20212345678",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["info@alshorouk.net"],
    href: "mailto:info@alshorouk.net",
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Sun–Thu: 8AM–5PM"],
  },
];

function InfoCard({ icon: Icon, title, lines, href, showMapAction, onViewMap }) {
  const content = (
    <>
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-black/10 text-[#283A85] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#283A85]/40 group-hover:shadow-[0_8px_20px_-8px_rgba(40,58,133,0.35)]">
        <span className="absolute inset-0 rounded-xl bg-[#283A85]/10 opacity-0 transition-opacity duration-300 group-hover:animate-ping group-hover:opacity-70" />
        <Icon className="relative h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
      </span>

      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-bold text-black">{title}</h4>
        <div className="text-sm leading-relaxed text-[#3A3A3C]/70">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        {showMapAction && (
          <button
            onClick={onViewMap}
            className="mt-1 inline-flex w-fit items-center gap-1 text-xs font-semibold text-[#283A85] transition-colors hover:text-[#1c2c66]"
          >
            View in Map
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        )}
      </div>
    </>
  );

  const baseClass =
    "group flex flex-1 items-start gap-4 rounded-2xl border border-black/10 p-5 transition-all duration-300 hover:border-[#283A85]/30";

  if (href) {
    return (
      <a href={href} className={baseClass}>
        {content}
      </a>
    );
  }

  return <div className={baseClass}>{content}</div>;
}

export default function ContactInfoList({ onViewMap }) {
  return (
    <div className="flex h-full flex-col justify-between gap-4">
      {INFO_ITEMS.map((item) => (
        <InfoCard key={item.title} {...item} onViewMap={onViewMap} />
      ))}
    </div>
  );
}