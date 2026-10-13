// // // import { useRef, useState } from "react";
// // // import { Mail, Phone, MapPin, Send } from "lucide-react";
// // // import AnimatedHandshakeBackground from "../AnimatedHandshakeBackground/AnimatedHandshakeBackground";
// // // import LocationInfoCard from "../LocationInfoCard/LocationInfoCard";

// // // const ADDRESS = "35A, First Settlement Services Center, New Cairo, Cairo, Egypt";

// // // const CONTACT_LINKS = [
// // //   { icon: Mail, label: "contact@alshorouk-cs.com", href: "mailto:contact@alshorouk-cs.com" },
// // //   { icon: Phone, label: "+20 100 000 0000", href: "tel:+201000000000" },
// // // ];

// // // function ContactForm() {
// // //   const [form, setForm] = useState({
// // //     fullName: "",
// // //     email: "",
// // //     phone: "",
// // //     subject: "",
// // //     message: "",
// // //   });

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setForm((prev) => ({ ...prev, [name]: value }));
// // //   };

// // //   const handleSubmit = (e) => {
// // //     e.preventDefault();
// // //     // هنا هتحطي نداء الـ API بتاعك أو خدمة زي EmailJS
// // //     console.log("Contact form submitted:", form);
// // //   };

// // //   return (
// // //     <form
// // //       onSubmit={handleSubmit}
// // //       className="flex flex-col gap-5 rounded-2xl border border-black/10 bg-white p-6 shadow-[0_20px_50px_-20px_rgba(58,58,60,0.15)] sm:p-8"
// // //     >
// // //       <div>
// // //         <h3 className="mb-1 text-lg font-semibold text-black">Send a message</h3>
// // //         <p className="text-sm text-[#3A3A3C]/70">
// // //           Fill out the form and we'll get back to you promptly.
// // //         </p>
// // //       </div>

// // //       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
// // //         <div className="flex flex-col gap-2">
// // //           <label className="text-xs font-semibold uppercase tracking-widest text-[#3A3A3C]/60">
// // //             Full Name *
// // //           </label>
// // //           <input
// // //             type="text"
// // //             name="fullName"
// // //             required
// // //             value={form.fullName}
// // //             onChange={handleChange}
// // //             placeholder="Your full name"
// // //             className="w-full rounded-xl border border-black/10 bg-[#F5F5F7] px-4 py-2.5 text-sm text-black outline-none transition focus:border-[#283A85] focus:ring-2 focus:ring-[#283A85]/10"
// // //           />
// // //         </div>
// // //         <div className="flex flex-col gap-2">
// // //           <label className="text-xs font-semibold uppercase tracking-widest text-[#3A3A3C]/60">
// // //             Email Address *
// // //           </label>
// // //           <input
// // //             type="email"
// // //             name="email"
// // //             required
// // //             value={form.email}
// // //             onChange={handleChange}
// // //             placeholder="you@example.com"
// // //             className="w-full rounded-xl border border-black/10 bg-[#F5F5F7] px-4 py-2.5 text-sm text-black outline-none transition focus:border-[#283A85] focus:ring-2 focus:ring-[#283A85]/10"
// // //           />
// // //         </div>
// // //       </div>

// // //       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
// // //         <div className="flex flex-col gap-2">
// // //           <label className="text-xs font-semibold uppercase tracking-widest text-[#3A3A3C]/60">
// // //             Phone
// // //           </label>
// // //           <input
// // //             type="tel"
// // //             name="phone"
// // //             value={form.phone}
// // //             onChange={handleChange}
// // //             placeholder="+20 1xx xxx xxxx"
// // //             className="w-full rounded-xl border border-black/10 bg-[#F5F5F7] px-4 py-2.5 text-sm text-black outline-none transition focus:border-[#283A85] focus:ring-2 focus:ring-[#283A85]/10"
// // //           />
// // //         </div>
// // //         <div className="flex flex-col gap-2">
// // //           <label className="text-xs font-semibold uppercase tracking-widest text-[#3A3A3C]/60">
// // //             Subject
// // //           </label>
// // //           <input
// // //             type="text"
// // //             name="subject"
// // //             value={form.subject}
// // //             onChange={handleChange}
// // //             placeholder="What is this about?"
// // //             className="w-full rounded-xl border border-black/10 bg-[#F5F5F7] px-4 py-2.5 text-sm text-black outline-none transition focus:border-[#283A85] focus:ring-2 focus:ring-[#283A85]/10"
// // //           />
// // //         </div>
// // //       </div>

// // //       <div className="flex flex-col gap-2">
// // //         <label className="text-xs font-semibold uppercase tracking-widest text-[#3A3A3C]/60">
// // //           Message
// // //         </label>
// // //         <textarea
// // //           name="message"
// // //           rows={4}
// // //           value={form.message}
// // //           onChange={handleChange}
// // //           placeholder="Type your message here"
// // //           className="w-full resize-none rounded-xl border border-black/10 bg-[#F5F5F7] px-4 py-3 text-sm text-black outline-none transition focus:border-[#283A85] focus:ring-2 focus:ring-[#283A85]/10"
// // //         />
// // //       </div>

// // //       <button
// // //         type="submit"
// // //         className="group inline-flex w-fit items-center gap-2 rounded-lg bg-[#283A85] px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(40,58,133,0.3)]"
// // //       >
// // //         Submit
// // //         <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
// // //       </button>
// // //     </form>
// // //   );
// // // }

// // // function LocationMap() {
// // //   const [showCard, setShowCard] = useState(false);
// // //   const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`;

// // //   return (
// // //     <div className="flex flex-col gap-4">
// // //       <div className="flex items-start gap-2 text-sm text-[#3A3A3C]/80">
// // //         <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#283A85]" />
// // //         <span>{ADDRESS}</span>
// // //       </div>

// // //       {/* الـ container ده بخلفية solid عشان الـ handshake متظهرش من وراه */}
// // //       <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_-20px_rgba(58,58,60,0.15)] sm:h-72">
// // //         <iframe
// // //           title="alshorouk Construction location"
// // //           src={mapUrl}
// // //           width="100%"
// // //           height="100%"
// // //           style={{ border: 0 }}
// // //           loading="lazy"
// // //           referrerPolicy="no-referrer-when-downgrade"
// // //           className="h-full w-full"
// // //         />

// // //         {/* Pin مخصص - بيقع بالظبط في نص الخريطة لأن q= بيخلي جوجل يمركز الخريطة على العنوان */}
// // //         <button
// // //           onClick={() => setShowCard(true)}
// // //           aria-label="View building details"
// // //           className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-full items-center justify-center transition-transform hover:-translate-y-[110%]"
// // //         >
// // //           <span className="flex h-9 w-9 animate-bounce items-center justify-center rounded-full bg-[#283A85] shadow-lg ring-4 ring-[#283A85]/25">
// // //             <MapPin className="h-5 w-5 text-white" fill="white" />
// // //           </span>
// // //         </button>

// // //         {showCard && <LocationInfoCard onClose={() => setShowCard(false)} />}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default function ContactSection() {
// // //   const sectionRef = useRef(null);

// // //   return (
// // //     <div className="relative w-full bg-white px-3 pb-8 pt-10 sm:px-6 sm:pb-12 sm:pt-14">
// // //       <div className="relative mx-auto w-full max-w-7xl">
// // //         <section
// // //           ref={sectionRef}
// // //           className="relative w-full overflow-hidden rounded-[1.75rem] bg-white py-16 text-black shadow-[0_25px_60px_-20px_rgba(58,58,60,0.15)] sm:rounded-[2.5rem] sm:px-8 sm:py-24"
// // //         >
// // //           {/* الـ background بتاع الـ handshake - z-0، تحت كل حاجة */}
// // //           <AnimatedHandshakeBackground
// // //             containerRef={sectionRef}
// // //             className="absolute inset-0 z-0 flex h-full w-full scale-100 items-center justify-center opacity-[0.14] sm:scale-110 sm:opacity-[0.16] md:scale-125 lg:scale-[1.4]"
// // //           />

// // //           <div className="relative z-10 mx-auto max-w-7xl">
// // //             <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
// // //               <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#283A85]/25 bg-[#283A85]/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#283A85]">
// // //                 Contact
// // //               </div>
// // //               <h2 className="mb-4 text-[clamp(1.9rem,5vw,3.2rem)] font-bold leading-tight text-black">
// // //                 Let's Talk About <span className="text-[#283A85]">Your Project</span>
// // //               </h2>
// // //               <p className="text-sm leading-relaxed text-[#3A3A3C]/80 sm:text-base">
// // //                 Reach out via the form below, or visit us at our office in New Cairo.
// // //               </p>
// // //             </div>

// // //             <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
// // //               <div className="flex flex-col gap-8">
// // //                 <div className="flex flex-col gap-3">
// // //                   {CONTACT_LINKS.map(({ icon: Icon, label, href }) => (
// // //                     <a
// // //                       key={label}
// // //                       href={href}
// // //                       className="group flex w-fit items-center gap-3 text-sm text-[#3A3A3C]/80 transition-colors duration-200 hover:text-[#283A85]"
// // //                     >
// // //                       <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-black/10 bg-[#F5F5F7] transition-all duration-200 group-hover:border-[#283A85]/30 group-hover:bg-[#283A85]/5">
// // //                         <Icon className="h-4 w-4 text-[#283A85]" />
// // //                       </div>
// // //                       {label}
// // //                     </a>
// // //                   ))}
// // //                 </div>

// // //                 <LocationMap />
// // //               </div>

// // //               <ContactForm />
// // //             </div>
// // //           </div>
// // //         </section>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // import { useRef } from "react";
// // import AnimatedHandshakeBackground from "../AnimatedHandshakeBackground/AnimatedHandshakeBackground";
// // import ContactLocationMap from "../ContactLocationMap/ContactLocationMap";
// // import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
// // import { useState } from "react";

// // const ADDRESS = "35A, First Settlement Services Center, New Cairo, Cairo, Egypt";

// // const CONTACT_LINKS = [
// //   { icon: Mail, label: "contact@alshorouk-cs.com", href: "mailto:contact@alshorouk-cs.com" },
// //   { icon: Phone, label: "+20 100 000 0000", href: "tel:+201000000000" },
// // ];

// // /* ContactForm و ContactInfo زي ما كتبتهملك قبل كده من غير تغيير */

// // export default function ContactSection() {
// //   const sectionRef = useRef(null);

// //   return (
// //     <div className="relative w-full bg-white px-3 pb-8 pt-10 sm:px-6 sm:pb-12 sm:pt-14">
// //       <div className="relative mx-auto w-full max-w-7xl">
// //         <section
// //           ref={sectionRef}
// //           className="relative w-full overflow-hidden rounded-[1.75rem] bg-white py-16 text-black shadow-[0_25px_60px_-20px_rgba(58,58,60,0.15)] sm:rounded-[2.5rem] sm:px-8 sm:py-24"
// //         >
// //           <AnimatedHandshakeBackground
// //             containerRef={sectionRef}
// //             className="absolute inset-0 z-0 flex h-full w-full scale-100 items-center justify-center opacity-[0.14] sm:scale-110 sm:opacity-[0.16] md:scale-125 lg:scale-[1.4]"
// //           />

// //           <div className="relative z-10 mx-auto max-w-7xl">
// //             <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
// //               <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#283A85]/25 bg-[#283A85]/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#283A85]">
// //                 Contact
// //               </div>
// //               <h2 className="mb-4 text-[clamp(1.9rem,5vw,3.2rem)] font-bold leading-tight text-black">
// //                 Let's Talk About <span className="text-[#283A85]">Your Project</span>
// //               </h2>
// //               <p className="text-sm leading-relaxed text-[#3A3A3C]/80 sm:text-base">
// //                 Reach out via the form below, or visit us at our office in New Cairo.
// //               </p>
// //             </div>

// //             <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
// //               <ContactInfo />
// //               <ContactForm />
// //             </div>
// //           </div>
// //         </section>
// //       </div>

// //       {/* الخريطة تحت السيكشن، بنفس عرض max-w-7xl */}
// //       <div className="relative mx-auto mt-8 w-full max-w-7xl sm:mt-10">
// //         <ContactLocationMap />
// //       </div>
// //     </div>
// //   );
// // }



// import { useRef } from "react";
// import AnimatedHandshakeBackground from "../AnimatedHandshakeBackground/AnimatedHandshakeBackground";
// import ContactLocationMap from "../ContactLocationMap/ContactLocationMap";
// import ContactInfoList from "../ContactInfoList/ContactInfoList";
// import ContactForm from "../ContactForm/ContactForm";

// export default function ContactSection() {
//   const sectionRef = useRef(null);
//   const mapRef = useRef(null);

//   return (
//     <div className="relative w-full bg-white px-3 pb-8 pt-10 sm:px-6 sm:pb-12 sm:pt-14">
//       <div className="relative mx-auto w-full max-w-7xl">
//         <section
//           ref={sectionRef}
//           className="relative w-full overflow-hidden rounded-[1.75rem] bg-white py-16 text-black shadow-[0_25px_60px_-20px_rgba(58,58,60,0.15)] sm:rounded-[2.5rem] sm:px-8 sm:py-24"
//         >
//           <AnimatedHandshakeBackground
//             containerRef={sectionRef}
//             className="absolute inset-0 z-0 flex h-full w-full scale-100 items-center justify-center opacity-[0.16] sm:scale-110 sm:opacity-[0.18] md:scale-125 lg:scale-[1.4]"
//           />

//           <div className="relative z-10 mx-auto max-w-7xl">
//             <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
//               <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#283A85]/25 bg-[#283A85]/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#283A85]">
//                 Contact
//               </div>
//               <h2 className="mb-4 text-[clamp(1.9rem,5vw,3.2rem)] font-bold leading-tight text-black">
//                 Let's Talk About <span className="text-[#283A85]">Your Project</span>
//               </h2>
//               <p className="text-sm leading-relaxed text-[#3A3A3C]/80 sm:text-base">
//                 Reach out via the form below, or visit us at our office in New Cairo.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
//               <ContactInfoList onViewMap={() => mapRef.current?.openLocation()} />
//               <ContactForm />
//             </div>
//           </div>
//         </section>
//       </div>

//       {/* الخريطة full-width تحت السيكشن */}
//       <div className="relative mx-auto mt-8 w-full max-w-7xl sm:mt-10">
//         <ContactLocationMap ref={mapRef} />
//       </div>
//     </div>
//   );
// }


import { useRef } from "react";
import AnimatedLineDrawing from "../AnimatedLineDrawing/AnimatedLineDrawing";
import ContactLocationMap from "../ContactLocationMap/ContactLocationMap";
import ContactInfoList from "../ContactInfoList/ContactInfoList";
import ContactForm from "../ContactForm/ContactForm";

// export default function ContactSection() {
//   const sectionRef = useRef(null);
//   const mapRef = useRef(null);

//   return (
//     <div className="relative w-full bg-white px-3 pb-8 pt-10 sm:px-6 sm:pb-12 sm:pt-14">
//       <div className="relative mx-auto w-full max-w-7xl">
//         <section
//           ref={sectionRef}
//           className="relative w-full overflow-hidden rounded-[1.75rem] bg-white py-16 text-black shadow-[0_25px_60px_-20px_rgba(58,58,60,0.15)] sm:rounded-[2.5rem] sm:px-8 sm:py-24"
//         >
//           {/* نفس ملف الـ SVG المستخدم في الـ CTA بالظبط */}
//           <AnimatedLineDrawing
//             svgUrl="/images/construction-line.svg"
//             containerRef={sectionRef}
//             className="absolute inset-0 z-0 flex h-full w-full scale-100 items-center justify-center opacity-[0.16] sm:scale-110 sm:opacity-[0.18] md:scale-125 lg:scale-[1.4]"
//           />

//           <div className="relative z-10 mx-auto max-w-7xl">
//             <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
//               <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#283A85]/25 bg-[#283A85]/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#283A85]">
//                 Contact
//               </div>
//               <h2 className="mb-4 text-[clamp(1.9rem,5vw,3.2rem)] font-bold leading-tight text-black">
//                 Let's Talk About <span className="text-[#283A85]">Your Project</span>
//               </h2>
//               <p className="text-sm leading-relaxed text-[#3A3A3C]/80 sm:text-base">
//                 Reach out via the form below, or visit us at our office in New Cairo.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
//               <ContactInfoList onViewMap={() => mapRef.current?.openLocation()} />
//               <ContactForm />
//             </div>
//           </div>
//         </section>
//       </div>

//       <div className="relative mx-auto mt-8 w-full max-w-7xl sm:mt-10">
//         <ContactLocationMap ref={mapRef} />
//       </div>
//     </div>
//   );
// }

export default function ContactSection() {
  const sectionRef = useRef(null);
  const mapRef = useRef(null);

  return (
    <div className="relative w-full bg-white px-3 pb-8 pt-10 sm:px-6 sm:pb-12 sm:pt-14">
      <div className="relative mx-auto w-full max-w-7xl">
        <section
          ref={sectionRef}
          className="relative flex w-full flex-col justify-center overflow-hidden rounded-[1.75rem] bg-white py-16 text-black shadow-[0_25px_60px_-20px_rgba(58,58,60,0.15)] sm:rounded-[2.5rem] sm:px-8 sm:py-24 min-h-[760px] sm:min-h-[820px] lg:min-h-[900px]"
        >
          {/* الـ scale رجع 100% ثابت — اليد بكامل شكلها هتترسم جوه المساحة الأكبر من غير قص */}
          <AnimatedLineDrawing
            svgUrl="/images/construction-line.svg"
            containerRef={sectionRef}
            className="absolute inset-0 z-0 flex h-full w-full scale-100 items-center justify-center opacity-[0.16] sm:opacity-[0.18]"
          />

          <div className="relative z-10 mx-auto w-full max-w-7xl">
            <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#283A85]/25 bg-[#283A85]/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#283A85]">
                Contact
              </div>
              <h2 className="mb-4 text-[clamp(1.9rem,5vw,3.2rem)] font-bold leading-tight text-black">
                Let's Talk About <span className="text-[#283A85]">Your Project</span>
              </h2>
              <p className="text-sm leading-relaxed text-[#3A3A3C]/80 sm:text-base">
                Reach out via the form below, or visit us at our office in New Cairo.
              </p>
            </div>

            <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
              <ContactInfoList onViewMap={() => mapRef.current?.openLocation()} />
              <ContactForm />
            </div>
          </div>
        </section>
      </div>

      <div className="relative mx-auto mt-8 w-full max-w-7xl sm:mt-10">
        <ContactLocationMap ref={mapRef} />
      </div>
    </div>
  );
}