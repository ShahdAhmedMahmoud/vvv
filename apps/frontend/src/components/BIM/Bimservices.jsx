// import { motion } from "framer-motion";

// const bimServices = [
//   ["BIM Modeling", "Discipline models built to project standards and coordinated in a shared environment."],
//   ["Clash Detection", "Systematic review of model conflicts between disciplines before they reach the site."],
//   ["4D BIM", "Linking the model to the programme to visualise and review construction sequencing."],
//   ["5D BIM", "Model-based quantities that support estimating and cost tracking."],
//   ["Shop Drawings", "Coordinated construction drawings generated from the approved model."],
//   ["As-Built BIM", "Updating the model to reflect what was actually built for handover."],
// ];

// export default function BIMServices() {
//   return (
//     <section className="bg-white px-6 py-24 sm:px-10 lg:px-16">
//       <div className="mx-auto max-w-7xl">
//         <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#2A317A]">05 / Services</p>
//         <h2 className="mt-3 text-[32px] font-bold uppercase tracking-tight text-[#3C3C3B] sm:text-[48px]">What we do</h2>

//         <ul className="mt-12 border-t border-[#3C3C3B]/20">
//           {bimServices.map(([title, desc], i) => (
//             <li
//               key={title}
//               tabIndex={0}
//               className="group relative overflow-hidden border-b border-[#3C3C3B]/20 py-6 outline-none transition-colors duration-300 hover:bg-[#EDF1F5] focus-visible:bg-[#EDF1F5]"
//             >
//               <div className="flex items-baseline gap-5 px-2 transition-transform duration-300 group-hover:translate-x-3 group-focus-visible:translate-x-3">
//                 <span className="font-mono text-[13px] text-[#2A317A]">{String(i + 1).padStart(2, "0")}</span>
//                 <h3 className="text-[22px] font-bold uppercase tracking-tight text-[#3C3C3B] sm:text-[34px]">{title}</h3>
//               </div>
//               <p className="max-w-xl px-2 pl-[52px] text-[14.5px] text-[#3C3C3B]/80 transition-all duration-300 md:max-h-0 md:opacity-0 md:group-hover:mt-2 md:group-hover:max-h-24 md:group-hover:opacity-100 md:group-focus-visible:mt-2 md:group-focus-visible:max-h-24 md:group-focus-visible:opacity-100">
//                 {desc}
//               </p>
//               <motion.span
//                 className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#2A317A] transition-all duration-500 group-hover:w-full group-focus-visible:w-full"
//               />
//             </li>
//           ))}
//         </ul>
//       </div>
//     </section>
//   );
// }


const bimServices = [
  ["BIM 3D Modeling", "Creating detailed digital 3D representations of building elements and systems."],
  ["3D Coordination", "Bringing project elements together to improve visual coordination."],
  ["Clash Detection", "Identifying potential conflicts between modeled elements."],
  ["3D Visualization", "Creating clear visual representations that help teams understand the project."],
  ["As-Built 3D Modeling", "Creating a digital representation of the built project based on available project information."],
];

export default function BIMServices() {
  return (
    <section className="bg-white px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#2A317A]">07 / Services</p>
        <h2 className="mt-3 text-[32px] font-bold uppercase tracking-tight text-[#3C3C3B] sm:text-[48px]">What we do</h2>

        <ul className="mt-12 border-t border-[#3C3C3B]/20">
          {bimServices.map(([title, desc], i) => (
            <li
              key={title}
              tabIndex={0}
              className="group relative overflow-hidden border-b border-[#3C3C3B]/20 py-6 outline-none"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-6 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                style={{
                  backgroundImage: "linear-gradient(#2A317A14 1px,transparent 1px),linear-gradient(90deg,#2A317A14 1px,transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="relative flex items-baseline gap-5 px-2 transition-transform duration-300 group-hover:translate-x-4 group-focus-visible:translate-x-4">
                <span className="font-mono text-[13px] text-[#3C3C3B]/40 transition-colors group-hover:text-[#2A317A] group-focus-visible:text-[#2A317A]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[22px] font-bold uppercase tracking-tight text-[#3C3C3B] transition-colors group-hover:text-[#2A317A] sm:text-[34px]">{title}</h3>
              </div>
              <p className="relative max-w-xl px-2 pl-[52px] text-[14.5px] text-[#3C3C3B]/80 transition-all duration-300 md:max-h-0 md:translate-y-2 md:opacity-0 md:group-hover:mt-2 md:group-hover:max-h-24 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:mt-2 md:group-focus-visible:max-h-24 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100">
                {desc}
              </p>
              <span aria-hidden className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#2A317A] transition-all duration-500 group-hover:w-full group-focus-visible:w-full" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}