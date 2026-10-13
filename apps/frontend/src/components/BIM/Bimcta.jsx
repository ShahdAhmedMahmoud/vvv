// import { Link } from "react-router-dom";
// import { ArrowUpRight } from "lucide-react";

// export default function BIMCTA() {
//   return (
//     <section className="bg-black px-6 py-28 text-white sm:px-10 lg:px-16">
//       <div className="mx-auto max-w-7xl">
//         <h2 className="text-[clamp(30px,5.4vw,72px)] font-bold uppercase leading-[1.02] tracking-tight">
//           The model isn&apos;t the final product.
//           <span className="mt-2 block text-white/50">It&apos;s the starting point for better decisions.</span>
//         </h2>
//         <Link
//           to="/contact"
//           className="group mt-10 inline-flex items-center gap-2 bg-[#2A317A] px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors hover:bg-white hover:text-[#2A317A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
//         >
//           Discuss a project
//           <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
//         </Link>
//       </div>
//     </section>
//   );
// }

import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function BIMCTA() {
  const reduce = useReducedMotion();
  return (
    <section
      className="relative overflow-hidden bg-black px-6 py-28 text-white sm:px-10 lg:px-16"
      style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)",
        backgroundSize: "64px 64px",
      }}
    >
      {!reduce &&
        [18, 50, 82].map((top, i) => (
          <motion.span
            key={top}
            aria-hidden
            style={{ top: `${top}%` }}
            className="absolute left-0 h-px w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 9 + i * 2, repeat: Infinity, ease: "linear" }}
          />
        ))}

      <div className="relative mx-auto max-w-7xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/60">08 / Build</p>
        <h2 className="mt-3 overflow-hidden text-[clamp(34px,6vw,84px)] font-bold uppercase leading-[1] tracking-tight">
          <motion.span
            initial={reduce ? false : { y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            See more before you build.
          </motion.span>
        </h2>
        <p className="mt-6 max-w-lg text-[15.5px] text-white/75">
          Bring greater visual clarity and coordination to your next project with BIM 3D.
        </p>
        <Link
          to="/contact"
          className="group mt-10 inline-flex items-center gap-2 bg-[#2A317A] px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] transition-all hover:gap-4 hover:bg-white hover:text-[#2A317A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Discuss a project
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}