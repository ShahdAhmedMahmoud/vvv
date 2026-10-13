// import { useMemo, useState } from "react";
// import { Mail } from "lucide-react";
// import { useMarketing } from "../../../features/marketing/MarketingProvider";
// import { PageHeading, panelClass, quietButton } from "./MarketingLayout";
// import Pagination, { paginateItems } from "./Pagination";

// export default function InquiriesPage() {
//   const { inquiries, setInquiryRead, deleteInquiry } = useMarketing();
//   const [page, setPage] = useState(1);
//   const paged = useMemo(() => paginateItems(inquiries, page, 10), [inquiries, page]);

//   return (
//     <div>
//       <PageHeading
//         kicker="INBOX"
//         title={"\u0631\u0633\u0627\u0626\u0644 \u0627\u0644\u062a\u0648\u0627\u0635\u0644"}
//         text={"\u0627\u0644\u0631\u0633\u0627\u0626\u0644 \u0627\u0644\u0644\u064a \u0628\u062a\u062a\u0628\u0639\u062a \u0645\u0646 \u0635\u0641\u062d\u0629 \u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627."}
//       />
//       {inquiries.length === 0 ? (
//         <div className={`${panelClass} grid place-items-center px-6 py-16 text-center`}>
//           <Mail className="h-7 w-7 text-[#2A317A]" />
//           <p className="mt-3 text-sm leading-6 text-[#737373]">{"\u0644\u0627 \u062a\u0648\u062c\u062f \u0631\u0633\u0627\u0626\u0644 \u0628\u0639\u062f."}</p>
//         </div>
//       ) : (
//         <>
//         <div className="space-y-3">
//           {paged.items.map((item) => (
//             <article
//               key={item.id}
//               className={`${panelClass} p-4 sm:p-5 ${item.read ? "" : "ring-2 ring-[#c9a227]/55"}`}
//             >
//               <div className="flex flex-wrap items-start justify-between gap-3">
//                 <div className="min-w-0">
//                   <div className="flex flex-wrap items-center gap-2">
//                     <h3 className="text-base font-semibold text-[#171717]">
//                       {item.fullName || "\u0628\u062f\u0648\u0646 \u0627\u0633\u0645"}
//                     </h3>
//                     {!item.read && (
//                       <span className="rounded-full bg-[#c9a227]/15 px-2 py-0.5 text-[11px] font-medium text-[#8a6d12]">
//                         {"\u062c\u062f\u064a\u062f"}
//                       </span>
//                     )}
//                   </div>
//                   <p className="mt-1 text-[13px] text-[#737373]" dir="ltr">
//                     {item.email}
//                     {item.phone ? ` \u00b7 ${item.phone}` : ""}
//                   </p>
//                 </div>
//                 <p className="text-xs tabular-nums text-[#a3a3a3]" dir="ltr">
//                   {new Date(item.createdAt).toLocaleString("ar-EG")}
//                 </p>
//               </div>
//               {item.subject && <p className="mt-3 text-sm font-medium text-[#171717]">{item.subject}</p>}
//               <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-[#525252]">{item.message}</p>
//               <div className="mt-4 flex flex-wrap gap-2">
//                 <button type="button" className={quietButton} onClick={() => setInquiryRead(item.id, !item.read)}>
//                   {item.read
//                     ? "\u062a\u0639\u0644\u064a\u0645 \u0643\u063a\u064a\u0631 \u0645\u0642\u0631\u0648\u0621\u0629"
//                     : "\u062a\u0639\u0644\u064a\u0645 \u0643\u0645\u0642\u0631\u0648\u0621\u0629"}
//                 </button>
//                 <button type="button" className={quietButton} onClick={() => deleteInquiry(item.id)}>
//                   {"\u062d\u0630\u0641"}
//                 </button>
//               </div>
//             </article>
//           ))}
//         </div>
//         <Pagination page={paged.page} pageSize={10} total={inquiries.length} onChange={setPage} />
//         </>
//       )}
//     </div>
//   );
// }



import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  Clock,
  Inbox,
  Mail,
  MailOpen,
  Phone,
  Reply,
  Search,
  Trash2,
} from "lucide-react";
import { useMarketing } from "../../../features/marketing/MarketingProvider";
import Pagination, { paginateItems } from "./Pagination";
import {
  AdminPage,
  Count,
  PageHead,
  btnDanger,
  btnQuiet,
  btnSolid,
  cardCls,
  fieldCls,
  stagger,
} from "../../../ui/adminUi";

const PER_PAGE = 10;
const LONG_MESSAGE = 180;

const FILTERS = [
  { id: "all", label: "الكل" },
  { id: "unread", label: "جديدة" },
  { id: "read", label: "مقروءة" },
];

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("ar-EG");
}

function StatTile({ icon: Icon, label, value, index }) {
  return (
    <div className={`${cardCls} adm-rise flex items-center gap-4 p-5`} style={stagger(index, 80)}>
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-[#2A317A]/10 text-[#2A317A]">
        <Icon className="h-6 w-6" strokeWidth={1.8} />
      </span>
      <div>
        <p className="text-base font-medium text-[#3C3C3B]">{label}</p>
        <p className="text-4xl font-bold leading-none text-black">
          <Count value={value} />
        </p>
      </div>
    </div>
  );
}

export default function InquiriesPage() {
  const { inquiries, setInquiryRead, deleteInquiry } = useMarketing();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(() => new Set());

  const unreadCount = inquiries.filter((item) => !item.read).length;

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return inquiries.filter((item) => {
      if (filter === "unread" && item.read) return false;
      if (filter === "read" && !item.read) return false;
      if (!needle) return true;
      return [item.fullName, item.email, item.phone, item.subject, item.message].some((field) =>
        String(field || "").toLowerCase().includes(needle),
      );
    });
  }, [inquiries, query, filter]);

  useEffect(() => {
    setPage(1);
  }, [query, filter]);

  const paged = useMemo(() => paginateItems(visible, page, PER_PAGE), [visible, page]);

  const toggleExpanded = (id) =>
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <AdminPage>
      <PageHead
        kicker="INBOX"
        title="رسائل التواصل"
        text="الرسائل اللي بتتبعت من صفحة تواصل معنا."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile icon={Inbox} label="كل الرسائل" value={inquiries.length} index={0} />
        <StatTile icon={Mail} label="جديدة" value={unreadCount} index={1} />
        <StatTile icon={MailOpen} label="مقروءة" value={inquiries.length - unreadCount} index={2} />
      </div>

      <div className="adm-rise flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" style={stagger(3, 80)}>
        <div className="relative w-full sm:max-w-md">
          <Search className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#3C3C3B]/60" />
          <input
            className={`${fieldCls} !mt-0 ps-12`}
            placeholder="بحث بالاسم أو الإيميل أو الموضوع"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="inline-flex gap-1 self-start rounded-lg border border-[#3C3C3B]/15 bg-white p-1 shadow-sm" role="group" aria-label="الحالة">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-md px-4 py-2.5 text-base font-semibold transition-all duration-300 motion-reduce:transition-none ${
                filter === f.id ? "bg-[#2A317A] text-white shadow-sm" : "text-[#3C3C3B] hover:bg-[#2A317A]/10 hover:text-black"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className={`${cardCls} adm-pop grid place-items-center px-6 py-20 text-center`}>
          <span className="grid h-16 w-16 place-items-center rounded-xl bg-[#2A317A]/10 text-[#2A317A]">
            <Mail className="h-8 w-8" strokeWidth={1.6} />
          </span>
          <p className="mt-5 text-xl font-bold text-black">
            {inquiries.length === 0 ? "لا توجد رسائل بعد" : "مفيش رسائل مطابقة"}
          </p>
          <p className="mt-2 text-lg text-[#3C3C3B]">
            {inquiries.length === 0 ? "الرسائل الجديدة هتظهر هنا أول ما توصل." : "جرّبي كلمة تانية أو غيّري الفلتر."}
          </p>
        </div>
      ) : (
        <div key={`${filter}-${paged.page}-${query}`} className="space-y-4">
          {paged.items.map((item, i) => {
            const unread = !item.read;
            const message = String(item.message || "");
            const isLong = message.length > LONG_MESSAGE;
            const open = expanded.has(item.id);
            const name = item.fullName || "بدون اسم";
            const subject = item.subject ? `Re: ${item.subject}` : "";
            return (
              <article
                key={item.id}
                className={`${cardCls} adm-pop group relative overflow-hidden p-5 sm:p-6 ${
                  unread ? "bg-[#2A317A]/[0.04]" : ""
                }`}
                style={stagger(i)}
              >
                <span
                  className={`absolute inset-y-0 start-0 w-1.5 origin-top bg-[#2A317A] transition-transform duration-500 motion-reduce:transition-none ${
                    unread ? "scale-y-100" : "scale-y-0"
                  }`}
                />

                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-4">
                    <span
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-xl font-bold transition-colors duration-300 motion-reduce:transition-none ${
                        unread ? "bg-[#2A317A] text-white" : "bg-[#3C3C3B]/10 text-[#3C3C3B]"
                      }`}
                    >
                      {name.trim().charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-bold text-black">{name}</h3>
                        {unread && (
                          <span className="inline-flex items-center gap-2 rounded-md bg-[#2A317A] px-3 py-1 text-sm font-bold text-white">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-white motion-reduce:animate-none" />
                            جديدة
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-base text-[#3C3C3B]" dir="ltr">
                        {item.email && (
                          <span className="inline-flex items-center gap-1.5">
                            <Mail className="h-4 w-4" />
                            {item.email}
                          </span>
                        )}
                        {item.phone && (
                          <span className="inline-flex items-center gap-1.5">
                            <Phone className="h-4 w-4" />
                            {item.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="inline-flex items-center gap-2 text-base tabular-nums text-[#3C3C3B]">
                    <Clock className="h-4 w-4" />
                    {formatDate(item.createdAt)}
                  </p>
                </div>

                {item.subject && <p className="mt-5 text-lg font-bold text-black">{item.subject}</p>}
                <p
                  className={`mt-2 whitespace-pre-wrap text-lg leading-8 text-[#3C3C3B] ${
                    isLong && !open ? "line-clamp-3" : ""
                  }`}
                >
                  {message}
                </p>
                {isLong && (
                  <button
                    type="button"
                    onClick={() => toggleExpanded(item.id)}
                    aria-expanded={open}
                    className="mt-2 inline-flex items-center gap-1.5 text-base font-semibold text-[#2A317A] hover:underline"
                  >
                    {open ? "أقل" : "عرض المزيد"}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                )}

                <div className="mt-5 flex flex-wrap gap-2 border-t border-[#3C3C3B]/15 pt-4">
                  {/* {item.email && (
                    <a
                      href={`mailto:${item.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`}
                      className={btnSolid}
                    >
                      <Reply className="h-4 w-4" />
                      رد بالإيميل
                    </a>
                  )} */}
                  <button type="button" className={btnQuiet} onClick={() => setInquiryRead(item.id, !item.read)}>
                    {item.read ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                    {item.read ? "تعليم كغير مقروءة" : "تعليم كمقروءة"}
                  </button>
                  <button
                    type="button"
                    className={`${btnDanger} ms-auto`}
                    onClick={() => {
                      if (window.confirm("حذف الرسالة دي؟")) deleteInquiry(item.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                    حذف
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {visible.length > 0 && <Pagination page={paged.page} pageSize={PER_PAGE} total={visible.length} onChange={setPage} />}
    </AdminPage>
  );
}