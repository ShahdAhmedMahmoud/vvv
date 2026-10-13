
// // // import { motion } from "motion/react";
// // // import {
// // //   Building2,
// // //   Award,
// // //   Users,
// // //   Calendar,
// // //   Wrench,
// // //   ShieldCheck,
// // //   ArrowRight,
// // // } from "lucide-react";
// // // import Counter from "../Counter/Counter";
// // // import AnimatedTowerCrane from "../AnimatedTowerCrane/AnimatedTowerCrane.jsx";

// // // const containerVariants = {
// // //   hidden: {},
// // //   visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
// // // };
// // // const itemVariants = {
// // //   hidden: { opacity: 0, y: 20 },
// // //   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
// // // };

// // // const features = [
// // //   {
// // //     icon: <Building2 className="w-6 h-6" />,
// // //     title: "Quality Craftsmanship",
// // //     description:
// // //       "We use premium materials and precise techniques to ensure every structure stands the test of time.",
// // //     position: "left",
// // //   },
// // //   {
// // //     icon: <Award className="w-6 h-6" />,
// // //     title: "Certified Engineers",
// // //     description:
// // //       "Our projects are led by certified engineers who bring technical expertise and strict quality control to every phase.",
// // //     position: "left",
// // //   },
// // //   {
// // //     icon: <Users className="w-6 h-6" />,
// // //     title: "Expert Team",
// // //     description:
// // //       "A skilled workforce of over 5000 professionals dedicated to bringing your vision to life.",
// // //     position: "left",
// // //   },
// // //   {
// // //     icon: <Calendar className="w-6 h-6" />,
// // //     title: "On-Time Delivery",
// // //     description:
// // //       "We plan meticulously to deliver every project on schedule, without compromising quality.",
// // //     position: "right",
// // //   },
// // //   {
// // //     icon: <Wrench className="w-6 h-6" />,
// // //     title: "Modern Equipment",
// // //     description:
// // //       "Equipped with the latest heavy machinery to handle projects of any scale efficiently.",
// // //     position: "right",
// // //   },
// // //   {
// // //     icon: <ShieldCheck className="w-6 h-6" />,
// // //     title: "Safety First",
// // //     description:
// // //       "Strict safety standards protect our team and ensure smooth, secure project execution.",
// // //     position: "right",
// // //   },
// // // ];

// // // const stats = [
// // //   { target: 5000, suffix: "+", label: "MANPOWER" },
// // //   { target: 500, suffix: "+", label: "HEAVY EQUIPMENT" },
// // //   { target: 1, suffix: "M", label: "CONCRETE" },
// // //   { target: 63, suffix: "+", label: "ACTIVE PROJECTS" },
// // //   { target: 42, suffix: "", label: "DELIVERED PROJECTS" },
// // // ];

// // // export default function AboutSection() {
// // //   return (
// // //     <section
// // //       className="w-full py-24 px-4 overflow-hidden relative min-h-[900px] md:min-h-screen"
// // //       id="about"
// // //     >
// // //       {/* عناصر ديكور خلفية */}
// // //       <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#D3D6E2]/5 blur-3xl pointer-events-none" />
// // //       <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#D3D6E2]/10 blur-3xl pointer-events-none" />

// // //       {/* الأوناش المرسومة بخطوط - بطول السكشن كله */}
// // //       <AnimatedTowerCrane className="absolute top-0 left-0 h-full w-40 sm:w-56 md:w-72 lg:w-96 opacity-70 z-0 hidden sm:block" />
// // //       <AnimatedTowerCrane className="absolute top-0 right-0 h-full w-40 sm:w-56 md:w-72 lg:w-96 opacity-70 z-0 hidden sm:block scale-x-[-1]" />

// // //       <motion.div
// // //         className="container mx-auto max-w-6xl relative z-10"
// // //         initial="hidden"
// // //         whileInView="visible"
// // //         viewport={{ once: true, amount: 0.2 }}
// // //         variants={containerVariants}
// // //       >
// // //         {/* العنوان */}
// // //         <motion.div className="flex flex-col items-center mb-6" variants={itemVariants}>
// // //           <span className="text-[#D98A2B] font-semibold mb-2 tracking-wide text-sm">
// // //             DISCOVER OUR STORY
// // //           </span>
// // //           <h2 className="text-4xl md:text-5xl font-bold text-[#1E2432] text-center">
// // //             About Us
// // //           </h2>
// // //           <motion.div
// // //             className="w-24 h-1 bg-[#2A317A] mt-4"
// // //             initial={{ width: 0 }}
// // //             whileInView={{ width: 96 }}
// // //             viewport={{ once: true }}
// // //             transition={{ duration: 0.8, delay: 0.3 }}
// // //           />
// // //         </motion.div>

// // //         <motion.p
// // //           variants={itemVariants}
// // //           className="text-center max-w-2xl mx-auto mb-4 text-[#6C757D]"
// // //         >
// // //           We are a leading construction company committed to excellence and
// // //           innovation, delivering high-quality projects that shape Egypt's
// // //           skyline.
// // //         </motion.p>

// // //         <motion.div variants={itemVariants} className="text-center mb-16">
// // //           <a
// // //             href="/about"
// // //             className="text-[#2A317A] font-semibold hover:underline"
// // //           >
// // //             Learn more about us →
// // //           </a>
// // //         </motion.div>

// // //         {/* الجدول: مميزات - صورة - مميزات */}
// // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative items-center">
// // //           <div className="space-y-12 order-2 md:order-1">
// // //             {features
// // //               .filter((f) => f.position === "left")
// // //               .map((f, i) => (
// // //                 <FeatureItem key={i} {...f} delay={i * 0.15} direction="left" />
// // //               ))}
// // //           </div>

// // //           <div className="order-1 md:order-2 flex justify-center mb-8 md:mb-0">
// // //             <motion.div className="relative w-full max-w-xs" variants={itemVariants}>
// // //               <motion.div
// // //                 className="rounded-2xl overflow-hidden shadow-xl"
// // //                 whileHover={{ scale: 1.03 }}
// // //                 transition={{ duration: 0.3 }}
// // //               >
// // //                 <img
// // //                   src="/src/assets/images/DSC_3583.JPG"
// // //                   alt="alshorouk project"
// // //                   className="w-full h-80 object-cover"
// // //                 />
// // //               </motion.div>
// // //               <div className="absolute inset-0 border-4 border-[#D98A2B] rounded-2xl -m-3 -z-10" />
// // //               <motion.div
// // //                 className="absolute -top-4 -right-6 w-16 h-16 rounded-full bg-[#2A317A]/10"
// // //                 animate={{ y: [0, -10, 0] }}
// // //                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
// // //               />
// // //               <motion.div
// // //                 className="absolute -bottom-6 -left-8 w-20 h-20 rounded-full bg-[#D98A2B]/20"
// // //                 animate={{ y: [0, 10, 0] }}
// // //                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
// // //               />
// // //             </motion.div>
// // //           </div>

// // //           <div className="space-y-12 order-3">
// // //             {features
// // //               .filter((f) => f.position === "right")
// // //               .map((f, i) => (
// // //                 <FeatureItem key={i} {...f} delay={i * 0.15} direction="right" />
// // //               ))}
// // //           </div>
// // //         </div>

// // //         {/* الأرقام */}
// // //         <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mt-24">
// // //           {stats.map((s, i) => (
// // //             <motion.div
// // //               key={i}
// // //               className="bg-white rounded-xl shadow-md py-6 px-3 text-center"
// // //               initial={{ opacity: 0, y: 30 }}
// // //               whileInView={{ opacity: 1, y: 0 }}
// // //               viewport={{ once: true, amount: 0.4 }}
// // //               transition={{ duration: 0.5, delay: i * 0.1 }}
// // //             >
// // //               <Counter target={s.target} suffix={s.suffix} />
// // //               <p className="text-sm md:text-base text-[#6C757D] mt-2">
// // //                 {s.label}
// // //               </p>
// // //             </motion.div>
// // //           ))}
// // //         </div>

// // //         {/* CTA */}
// // //         <motion.div
// // //           className="mt-20 bg-[#2A317A] text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
// // //           initial={{ opacity: 0, y: 30 }}
// // //           whileInView={{ opacity: 1, y: 0 }}
// // //           viewport={{ once: true, amount: 0.3 }}
// // //           transition={{ duration: 0.8 }}
// // //         >
// // //           <div>
// // //             <h3 className="text-2xl font-bold mb-2">
// // //               Ready to build your next project?
// // //             </h3>
// // //             <p className="text-white/80">Let's create something great together.</p>
// // //           </div>
// // //           <a
// // //             href="/contact"
// // //             className="bg-[#D98A2B] text-[#1E2432] px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
// // //           >
// // //             Get In Touch <ArrowRight className="w-4 h-4" />
// // //           </a>
// // //         </motion.div>
// // //       </motion.div>
// // //     </section>
// // //   );
// // // }

// // // function FeatureItem({ icon, title, description, delay, direction }) {
// // //   return (
// // //     <motion.div
// // //       className="flex flex-col group"
// // //       initial={{ opacity: 0, x: direction === "left" ? -30 : 30 }}
// // //       whileInView={{ opacity: 1, x: 0 }}
// // //       viewport={{ once: true, amount: 0.4 }}
// // //       transition={{ duration: 0.6, delay }}
// // //       whileHover={{ y: -5 }}
// // //     >
// // //       <div className="flex items-center gap-3 mb-2">
// // //         <div className="text-[#1F3888] bg-[#1F3888]/10 p-3 rounded-lg group-hover:bg-[#D98A2B]/20 group-hover:text-[#1E2432] transition-colors duration-300">
// // //           {icon}
// // //         </div>
// // //         <h4 className="text-lg font-bold text-[#1E2432]">{title}</h4>
// // //       </div>
// // //       <p className="text-sm text-[#6C757D] leading-relaxed pl-[52px]">
// // //         {description}
// // //       </p>
// // //     </motion.div>
// // //   );
// // // }



// // import { motion } from "motion/react";
// // import {
// //   Building2,
// //   Award,
// //   Users,
// //   Calendar,
// //   Wrench,
// //   ShieldCheck,
// //   ArrowRight,
// // } from "lucide-react";

// // import Counter from "../Counter/Counter";
// // import AnimatedTowerCrane from "../AnimatedTowerCrane/AnimatedTowerCrane.jsx";

// // // =========================================================
// // // ANIMATION VARIANTS
// // // =========================================================

// // const containerVariants = {
// //   hidden: {},
// //   visible: {
// //     transition: {
// //       staggerChildren: 0.15,
// //       delayChildren: 0.2,
// //     },
// //   },
// // };

// // const itemVariants = {
// //   hidden: {
// //     opacity: 0,
// //     y: 20,
// //   },
// //   visible: {
// //     opacity: 1,
// //     y: 0,
// //     transition: {
// //       duration: 0.6,
// //       ease: "easeOut",
// //     },
// //   },
// // };

// // // =========================================================
// // // FEATURES
// // // =========================================================

// // const features = [
// //   {
// //     icon: <Building2 className="h-6 w-6" />,
// //     title: "Quality Craftsmanship",
// //     description:
// //       "We use premium materials and precise techniques to ensure every structure stands the test of time.",
// //     position: "left",
// //   },
// //   {
// //     icon: <Award className="h-6 w-6" />,
// //     title: "Certified Engineers",
// //     description:
// //       "Our projects are led by certified engineers who bring technical expertise and strict quality control to every phase.",
// //     position: "left",
// //   },
// //   {
// //     icon: <Users className="h-6 w-6" />,
// //     title: "Expert Team",
// //     description:
// //       "A skilled workforce of over 5000 professionals dedicated to bringing your vision to life.",
// //     position: "left",
// //   },
// //   {
// //     icon: <Calendar className="h-6 w-6" />,
// //     title: "On-Time Delivery",
// //     description:
// //       "We plan meticulously to deliver every project on schedule, without compromising quality.",
// //     position: "right",
// //   },
// //   {
// //     icon: <Wrench className="h-6 w-6" />,
// //     title: "Modern Equipment",
// //     description:
// //       "Equipped with the latest heavy machinery to handle projects of any scale efficiently.",
// //     position: "right",
// //   },
// //   {
// //     icon: <ShieldCheck className="h-6 w-6" />,
// //     title: "Safety First",
// //     description:
// //       "Strict safety standards protect our team and ensure smooth, secure project execution.",
// //     position: "right",
// //   },
// // ];

// // // =========================================================
// // // STATS
// // // =========================================================

// // const stats = [
// //   {
// //     target: 5000,
// //     suffix: "+",
// //     label: "MANPOWER",
// //   },
// //   {
// //     target: 500,
// //     suffix: "+",
// //     label: "HEAVY EQUIPMENT",
// //   },
// //   {
// //     target: 1,
// //     suffix: "M",
// //     label: "CONCRETE",
// //   },
// //   {
// //     target: 63,
// //     suffix: "+",
// //     label: "ACTIVE PROJECTS",
// //   },
// //   {
// //     target: 42,
// //     suffix: "",
// //     label: "DELIVERED PROJECTS",
// //   },
// // ];

// // // =========================================================
// // // ABOUT SECTION
// // // =========================================================

// // export default function AboutSection() {
// //   return (
// //     <section
// //       className="relative min-h-[900px] w-full overflow-hidden bg-white px-4 py-24 md:min-h-screen"
// //       id="about"
// //     >
// //       {/* =====================================================
// //           BACKGROUND DECORATION
// //       ===================================================== */}

// //       <div className="pointer-events-none absolute left-10 top-20 h-64 w-64 rounded-full bg-[#3C3C3B]/5 blur-3xl" />

// //       <div className="pointer-events-none absolute bottom-20 right-10 h-80 w-80 rounded-full bg-[#3C3C3B]/10 blur-3xl" />

// //       {/* =====================================================
// //           TOWER CRANES
// //       ===================================================== */}

// //       <AnimatedTowerCrane
// //         className="absolute left-0 top-0 z-0 hidden h-full w-40 opacity-70 sm:block sm:w-56 md:w-72 lg:w-96"
// //       />

// //       <AnimatedTowerCrane
// //         className="absolute right-0 top-0 z-0 hidden h-full w-40 scale-x-[-1] opacity-70 sm:block sm:w-56 md:w-72 lg:w-96"
// //       />

// //       {/* =====================================================
// //           MAIN CONTENT
// //       ===================================================== */}

// //       <motion.div
// //         className="container relative z-10 mx-auto max-w-6xl"
// //         initial="hidden"
// //         whileInView="visible"
// //         viewport={{
// //           once: true,
// //           amount: 0.2,
// //         }}
// //         variants={containerVariants}
// //       >
// //         {/* ===================================================
// //             HEADER
// //         =================================================== */}

// //         <motion.div
// //           className="mb-6 flex flex-col items-center"
// //           variants={itemVariants}
// //         >
// //           <span className="mb-2 text-sm font-semibold tracking-wide text-[#2A317A]">
// //             DISCOVER OUR STORY
// //           </span>

// //           <h2 className="text-center text-4xl font-bold text-black md:text-5xl">
// //             About Us
// //           </h2>

// //           <motion.div
// //             className="mt-4 h-1 bg-[#2A317A]"
// //             initial={{
// //               width: 0,
// //             }}
// //             whileInView={{
// //               width: 96,
// //             }}
// //             viewport={{
// //               once: true,
// //             }}
// //             transition={{
// //               duration: 0.8,
// //               delay: 0.3,
// //             }}
// //           />
// //         </motion.div>

// //         {/* ===================================================
// //             DESCRIPTION
// //         =================================================== */}

// //         <motion.p
// //           variants={itemVariants}
// //           className="mx-auto mb-4 max-w-2xl text-center text-[#3C3C3B]"
// //         >
// //           We are a leading construction company committed
// //           to excellence and innovation, delivering
// //           high-quality projects that shape Egypt's skyline.
// //         </motion.p>

// //         {/* ===================================================
// //             LEARN MORE
// //         =================================================== */}

// //         <motion.div
// //           variants={itemVariants}
// //           className="mb-16 text-center"
// //         >
// //           <a
// //             href="/about"
// //             className="font-semibold text-[#2A317A] transition-opacity hover:opacity-70"
// //           >
// //             Learn more about us →
// //           </a>
// //         </motion.div>

// //         {/* ===================================================
// //             FEATURES + IMAGE
// //         =================================================== */}

// //         <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-3">
// //           {/* =================================================
// //               LEFT FEATURES
// //           ================================================= */}

// //           <div className="order-2 space-y-12 md:order-1">
// //             {features
// //               .filter(
// //                 (feature) =>
// //                   feature.position === "left"
// //               )
// //               .map((feature, index) => (
// //                 <FeatureItem
// //                   key={index}
// //                   {...feature}
// //                   delay={index * 0.15}
// //                   direction="left"
// //                 />
// //               ))}
// //           </div>

// //           {/* =================================================
// //               CENTER IMAGE
// //           ================================================= */}

// //           <div className="order-1 mb-8 flex justify-center md:order-2 md:mb-0">
// //             <motion.div
// //               className="relative w-full max-w-xs"
// //               variants={itemVariants}
// //             >
// //               {/* Image */}
// //               <motion.div
// //                 className="overflow-hidden rounded-2xl shadow-xl"
// //                 whileHover={{
// //                   scale: 1.03,
// //                 }}
// //                 transition={{
// //                   duration: 0.3,
// //                 }}
// //               >
// //                 <img
// //                   src="/src/assets/images/DSC_3583.JPG"
// //                   alt="alshorouk project"
// //                   className="h-80 w-full object-cover"
// //                 />
// //               </motion.div>

// //               {/* Blue frame */}
// //               <div className="absolute inset-0 -z-10 -m-3 rounded-2xl border-4 border-[#2A317A]" />

// //               {/* Decorative circle */}
// //               <motion.div
// //                 className="absolute -right-6 -top-4 h-16 w-16 rounded-full bg-[#2A317A]/10"
// //                 animate={{
// //                   y: [0, -10, 0],
// //                 }}
// //                 transition={{
// //                   duration: 3,
// //                   repeat: Infinity,
// //                   ease: "easeInOut",
// //                 }}
// //               />

// //               {/* Decorative circle */}
// //               <motion.div
// //                 className="absolute -bottom-6 -left-8 h-20 w-20 rounded-full bg-[#3C3C3B]/10"
// //                 animate={{
// //                   y: [0, 10, 0],
// //                 }}
// //                 transition={{
// //                   duration: 3,
// //                   repeat: Infinity,
// //                   ease: "easeInOut",
// //                   delay: 0.5,
// //                 }}
// //               />
// //             </motion.div>
// //           </div>

// //           {/* =================================================
// //               RIGHT FEATURES
// //           ================================================= */}

// //           <div className="order-3 space-y-12">
// //             {features
// //               .filter(
// //                 (feature) =>
// //                   feature.position === "right"
// //               )
// //               .map((feature, index) => (
// //                 <FeatureItem
// //                   key={index}
// //                   {...feature}
// //                   delay={index * 0.15}
// //                   direction="right"
// //                 />
// //               ))}
// //           </div>
// //         </div>

// //         {/* ===================================================
// //             STATS
// //         =================================================== */}

// //         <div className="mt-24 grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
// //           {stats.map((stat, index) => (
// //             <motion.div
// //               key={index}
// //               className="rounded-xl border border-[#3C3C3B]/15 bg-white px-3 py-6 text-center shadow-md shadow-black/5"
// //               initial={{
// //                 opacity: 0,
// //                 y: 30,
// //               }}
// //               whileInView={{
// //                 opacity: 1,
// //                 y: 0,
// //               }}
// //               viewport={{
// //                 once: true,
// //                 amount: 0.4,
// //               }}
// //               transition={{
// //                 duration: 0.5,
// //                 delay: index * 0.1,
// //               }}
// //             >
// //               <Counter
// //                 target={stat.target}
// //                 suffix={stat.suffix}
// //               />

// //               <p className="mt-2 text-sm text-[#3C3C3B] md:text-base">
// //                 {stat.label}
// //               </p>
// //             </motion.div>
// //           ))}
// //         </div>

// //         {/* ===================================================
// //             CTA
// //         =================================================== */}

// //         <motion.div
// //           className="mt-20 flex flex-col items-center justify-between gap-6 rounded-2xl bg-[#2A317A] p-8 text-center text-white md:flex-row md:text-left"
// //           initial={{
// //             opacity: 0,
// //             y: 30,
// //           }}
// //           whileInView={{
// //             opacity: 1,
// //             y: 0,
// //           }}
// //           viewport={{
// //             once: true,
// //             amount: 0.3,
// //           }}
// //           transition={{
// //             duration: 0.8,
// //           }}
// //         >
// //           <div>
// //             <h3 className="mb-2 text-2xl font-bold">
// //               Ready to build your next project?
// //             </h3>

// //             <p className="text-white/80">
// //               Let's create something great together.
// //             </p>
// //           </div>

// //           <a
// //             href="/contact"
// //             className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-[#2A317A] transition-opacity hover:opacity-90"
// //           >
// //             Get In Touch

// //             <ArrowRight className="h-4 w-4" />
// //           </a>
// //         </motion.div>
// //       </motion.div>
// //     </section>
// //   );
// // }

// // // =========================================================
// // // FEATURE ITEM
// // // =========================================================

// // function FeatureItem({
// //   icon,
// //   title,
// //   description,
// //   delay,
// //   direction,
// // }) {
// //   return (
// //     <motion.div
// //       className="group flex flex-col"
// //       initial={{
// //         opacity: 0,
// //         x:
// //           direction === "left"
// //             ? -30
// //             : 30,
// //       }}
// //       whileInView={{
// //         opacity: 1,
// //         x: 0,
// //       }}
// //       viewport={{
// //         once: true,
// //         amount: 0.4,
// //       }}
// //       transition={{
// //         duration: 0.6,
// //         delay,
// //       }}
// //       whileHover={{
// //         y: -5,
// //       }}
// //     >
// //       {/* Feature heading */}
// //       <div className="mb-2 flex items-center gap-3">
// //         <div className="rounded-lg bg-[#2A317A]/10 p-3 text-[#2A317A] transition-colors duration-300 group-hover:bg-[#2A317A] group-hover:text-white">
// //           {icon}
// //         </div>

// //         <h4 className="text-lg font-bold text-black">
// //           {title}
// //         </h4>
// //       </div>

// //       {/* Description */}
// //       <p className="pl-[52px] text-sm leading-relaxed text-[#3C3C3B]">
// //         {description}
// //       </p>
// //     </motion.div>
// //   );
// // }


// import { useEffect, useRef, useState } from "react";
// import { motion } from "motion/react";
// import {
//   Building2, Award, Users, Calendar, Wrench, ShieldCheck,
//   ArrowRight, Forklift, Blocks, HardHat, BadgeCheck,
// } from "lucide-react";

// // =========================================================
// // DATA
// // =========================================================

// const features = [
//   {
//     icon: Building2,
//     title: "Quality Craftsmanship",
//     description:
//       "We use premium materials and precise techniques to ensure every structure stands the test of time.",
//     position: "left",
//   },
//   {
//     icon: Award,
//     title: "Certified Engineers",
//     description:
//       "Our projects are led by certified engineers who bring technical expertise and strict quality control to every phase.",
//     position: "left",
//   },
//   {
//     icon: Users,
//     title: "Expert Team",
//     description:
//       "A skilled workforce of over 5000 professionals dedicated to bringing your vision to life.",
//     position: "left",
//   },
//   {
//     icon: Calendar,
//     title: "On-Time Delivery",
//     description:
//       "We plan meticulously to deliver every project on schedule, without compromising quality.",
//     position: "right",
//   },
//   {
//     icon: Wrench,
//     title: "Modern Equipment",
//     description:
//       "Equipped with the latest heavy machinery to handle projects of any scale efficiently.",
//     position: "right",
//   },
//   {
//     icon: ShieldCheck,
//     title: "Safety First",
//     description:
//       "Strict safety standards protect our team and ensure smooth, secure project execution.",
//     position: "right",
//   },
// ];

// const stats = [
//   { icon: Users,      target: 5000, suffix: "+", label: "MANPOWER" },
//   { icon: Forklift,   target: 500,  suffix: "+", label: "HEAVY EQUIPMENT" },
//   { icon: Blocks,     target: 1,    suffix: "M", label: "CONCRETE" },
//   { icon: HardHat,    target: 63,   suffix: "+", label: "ACTIVE PROJECTS" },
//   { icon: BadgeCheck, target: 42,   suffix: "",  label: "DELIVERED PROJECTS" },
// ];

// const REDUCED =
//   typeof window !== "undefined" &&
//   window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// // =========================================================
// // 3D TOWER CRANES CANVAS
// // =========================================================

// function TowerCraneScene({ canvasRef, stageRef }) {
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const stage = stageRef.current;
//     if (!canvas || !stage) return;

//     const ctx = canvas.getContext("2d");

//     let W = 0, H = 0, DPR = 1, KS = 1;
//     let rafId = null;

//     function degToRad(d) { return d * Math.PI / 180; }

//     /* أبعاد الصورة المرجعية */
//     const REF = { w: 1711, h: 919, ground: 872, edge: 100, hook: 365, beamY: 288 };
//     const S0 = 1.22;
//     const YAW = degToRad(15);

//     const WORLD = {
//       jibLength: 414, trolleyX: 331, trolleyRatio: 0.8,
//       hookX: 300, hookZ: 0, beamY: 470, hookY: 540,
//       towerHeight: 585, towerHalfWidth: 20, towerHalfDepth: 20,
//       leftYaw: YAW, rightYaw: Math.PI - YAW,
//     };

//     const leftBase = { x: -650, y: 0, z: 0 };
//     const rightBase = { x: 650, y: 0, z: 0 };

//     const camera = {
//       pitch: degToRad(7), focal: 1750, cx: 0, cy: 0, scale: 1,
//     };

//     const C = {
//       towerFront: "#c9ced6", towerLight: "#e4e8ee", towerDark: "#939aa6",
//       towerSide: "#8f97a4", towerBack: "#a2a8b3",
//       steel: "#c9ced6", steelLight: "#e4e8ee", steelSide: "#b3b9c3", steelDark: "#858c99",
//       jibFront: "#cfd3da", jibLight: "#e9ecf1", jibDark: "#8d94a1", jibSide: "#b3b9c3",
//       cabinFront: "#7faab9", cabinSide: "#445963", cabinTop: "#c0d7df",
//       concreteFront: "#aab4c2", concreteTop: "#d3dae4",
//       concreteSide: "#7c8797", concreteBottom: "#5f6a7a",
//       cable: "#3f484e", cableLight: "#9ba3a7",
//       hook: "#343d42", hookLight: "#a7afb3",
//     };

//     const ANIMATION = {
//       towerDuration: 3200, jibStartDelay: 3200, jibRevealDuration: 800,
//       loadStartDelay: 4900, loadDuration: 4500, loadDrop: 24,
//     };

//     const anim = { start: performance.now(), now: performance.now() };

//     let faces = [];
//     let lines = [];
//     let currentOpacity = 1;

//     function resetRender() { faces = []; lines = []; currentOpacity = 1; }
//     function v(x = 0, y = 0, z = 0) { return { x, y, z }; }
//     function add(a, b) { return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z }; }

//     function rotateY(p, angle) {
//       const c = Math.cos(angle), s = Math.sin(angle);
//       return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c };
//     }

//     function cranePoint(base, yaw, local) {
//       const r = rotateY(local, yaw);
//       return { x: r.x + base.x, y: r.y + base.y, z: r.z + base.z };
//     }

//     function project(p) {
//       const cp = Math.cos(camera.pitch), sp = Math.sin(camera.pitch);
//       const cameraY = p.y * cp - p.z * sp;
//       const cameraZ = p.y * sp + p.z * cp;
//       const perspective = camera.focal / (camera.focal + cameraZ);
//       return {
//         x: camera.cx + p.x * camera.scale * perspective,
//         y: camera.cy - cameraY * camera.scale * perspective,
//         depth: cameraZ,
//       };
//     }

//     function solveY(z, targetPx) {
//       let lo = 0, hi = 1500;
//       for (let i = 0; i < 40; i++) {
//         const mid = (lo + hi) / 2;
//         const py = project(v(0, mid, z)).y;
//         if (py > targetPx) lo = mid; else hi = mid;
//       }
//       return (lo + hi) / 2;
//     }

//     function resize() {
//       DPR = Math.min(window.devicePixelRatio || 1, 2);
//       W = window.innerWidth;
//       const isDesk = W >= 1180;
//       const banner = Math.max(300, Math.min(430, W * 0.6));
//       H = isDesk ? window.innerHeight : banner;

//       canvas.width = W * DPR;
//       canvas.height = H * DPR;
//       canvas.style.width = W + "px";
//       canvas.style.height = H + "px";
//       ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

//       const desktop = W >= 1180;
//       KS = desktop ? Math.min(W / REF.w, H / REF.h) : H / REF.h;

//       camera.scale = S0 * KS;
//       camera.cx = W * 0.5;
//       camera.cy = H - (REF.h - REF.ground) * KS;

//       const refW = W / KS;
//       const spacing = (refW / 2 - REF.edge) / S0;
//       leftBase.x = -spacing;
//       rightBase.x = spacing;

//       const hookRef = Math.min(REF.hook, refW * (REF.hook / REF.w));
//       WORLD.hookX = hookRef / S0;
//       WORLD.trolleyX = (spacing - WORLD.hookX) / Math.cos(YAW);
//       WORLD.jibLength = WORLD.trolleyX / WORLD.trolleyRatio;
//       WORLD.hookZ = -WORLD.trolleyX * Math.sin(YAW);

//       WORLD.beamY = solveY(WORLD.hookZ, camera.cy - (REF.ground - REF.beamY) * KS);
//       WORLD.hookY = WORLD.beamY + 71;

//       if (desktop) {
//         stage.style.position = "fixed";
//         stage.style.left = camera.cx - (REF.w / 2) * KS + "px";
//         stage.style.top = camera.cy - REF.ground * KS + "px";
//         stage.style.transform = "scale(" + KS + ")";
//         stage.style.transformOrigin = "0 0";
//         stage.style.width = "1711px";
//         stage.style.height = "919px";
//         stage.style.paddingTop = "";
//         stage.style.margin = "0";
//       } else {
//         stage.style.position = "relative";
//         stage.style.width = "auto";
//         stage.style.height = "auto";
//         stage.style.transform = "none";
//         stage.style.left = "auto";
//         stage.style.top = "auto";
//         stage.style.maxWidth = "820px";
//         stage.style.margin = "0 auto";
//         stage.style.paddingTop = H + 24 + "px";
//       }
//     }

//     function addFace(points, fill, stroke = null, width = 1) {
//       const projected = points.map(project);
//       let depth = 0;
//       for (const point of projected) depth += point.depth;
//       depth /= projected.length;
//       faces.push({ points: projected, fill, stroke, width, depth, opacity: currentOpacity });
//     }

//     function addLine(a, b, color, width = 2) {
//       const pa = project(a), pb = project(b);
//       lines.push({
//         a: pa, b: pb, color, width,
//         depth: (pa.depth + pb.depth) / 2,
//         opacity: currentOpacity,
//       });
//     }

//     function addBox(center, size, transform, colors) {
//       const sx = size.x / 2, sy = size.y / 2, sz = size.z / 2;
//       const local = [
//         v(-sx,-sy,-sz), v(sx,-sy,-sz), v(sx,sy,-sz), v(-sx,sy,-sz),
//         v(-sx,-sy,sz),  v(sx,-sy,sz),  v(sx,sy,sz),  v(-sx,sy,sz),
//       ];
//       const p = local.map(transform);
//       addFace([p[0], p[1], p[2], p[3]], colors.front  || C.towerFront);
//       addFace([p[4], p[7], p[6], p[5]], colors.back   || C.towerBack);
//       addFace([p[0], p[4], p[5], p[1]], colors.left   || C.towerSide);
//       addFace([p[1], p[5], p[6], p[2]], colors.right  || C.towerDark);
//       addFace([p[3], p[2], p[6], p[7]], colors.top    || C.towerLight);
//       addFace([p[0], p[1], p[5], p[4]], colors.bottom || C.towerDark);
//     }

//     function addLocalBox(base, yaw, localCenter, size, colors) {
//       addBox(
//         localCenter, size,
//         localPoint => cranePoint(base, yaw, add(localCenter, localPoint)),
//         colors
//       );
//     }

//     function worldBox(center, size, colors) {
//       addBox(center, size, l => add(center, l), colors);
//     }

//     function drawTower(base, yaw, towerProgress) {
//       const transform = local => cranePoint(base, yaw, local);
//       const ln = (a, b, color, width) => addLine(transform(a), transform(b), color, width);

//       const zs = yaw > Math.PI / 2 ? -1 : 1;
//       const halfW = WORLD.towerHalfWidth, halfD = WORLD.towerHalfDepth;
//       const bottomY = 51;
//       const fullTopY = WORLD.towerHeight;
//       const currentTopY = bottomY + (fullTopY - bottomY) * towerProgress;
//       const towerCenterY = (bottomY + currentTopY) / 2;
//       const legHeight = Math.max(1, currentTopY - bottomY);

//       /* FOUNDATION */
//       addLocalBox(base, yaw, v(0, 5, 0), v(92, 10, 84), {
//         front: "#aab4c2", back: "#8b96a6", left: "#b6bfcc",
//         right: "#7c8797", top: "#d3dae4", bottom: "#5f6a7a",
//       });

//       /* ANCHOR BOLTS */
//       const boltPositions = [
//         v(-36, 12, -32), v(36, 12, -32),
//         v(-36, 12, 32),  v(36, 12, 32),
//       ];
//       for (const bolt of boltPositions) {
//         addLocalBox(base, yaw, bolt, v(8, 5, 8), {
//           front: "#4a4a4a", back: "#3a3a3a", left: "#555555",
//           right: "#333333", top: "#8f8f8f", bottom: "#2e2e2e",
//         });
//       }

//       /* MAIN PEDESTAL */
//       addLocalBox(base, yaw, v(0, 24, 0), v(60, 38, 54), {
//         front: "#c2cad6", back: "#96a1b0", left: "#b4bdca",
//         right: "#7f8a99", top: "#e6ebf2", bottom: "#697485",
//       });

//       /* UPPER MOUNTING BLOCK */
//       addLocalBox(base, yaw, v(0, 45, 0), v(52, 12, 46), {
//         front: "#c3c8d1", back: "#8b929e", left: "#a9afba",
//         right: "#79808d", top: "#e2e6ec", bottom: "#6d7480",
//       });

//       /* FOUR VERTICAL LEGS */
//       const legCenters = [
//         v(-halfW, towerCenterY, -halfD), v(halfW, towerCenterY, -halfD),
//         v(-halfW, towerCenterY, halfD),  v(halfW, towerCenterY, halfD),
//       ];
//       for (const center of legCenters) {
//         addLocalBox(base, yaw, center, v(8, legHeight, 8), {
//           front: C.towerFront, back: C.towerBack, left: C.towerSide,
//           right: C.towerDark, top: C.towerLight, bottom: C.towerDark,
//         });
//       }

//       /* TOWER LEVELS */
//       const levels = [];
//       for (let y = 85; y <= currentTopY - 10; y += 40) levels.push(y);

//       for (const y of levels) {
//         ln(v(-halfW, y, -halfD), v(halfW, y, -halfD), "#b9bfc9", 3);
//         ln(v(-halfW, y, halfD),  v(halfW, y, halfD),  "#8f97a4", 2.5);
//         ln(v(-halfW, y, -halfD), v(-halfW, y, halfD), "#a3aab6", 2.5);
//         ln(v(halfW, y, -halfD),  v(halfW, y, halfD),  "#7c8593", 2.5);
//       }

//       /* X BRACING */
//       for (let i = 0; i < levels.length - 1; i++) {
//         const y1 = levels[i], y2 = levels[i + 1];
//         ln(v(-halfW, y1, -halfD), v(halfW, y2, -halfD), "#b9bfc9", 2.2);
//         ln(v(halfW, y1, -halfD),  v(-halfW, y2, -halfD), "#b0b7c2", 2.2);
//         ln(v(-halfW, y1, halfD),  v(halfW, y2, halfD), "#8f97a4", 2);
//         ln(v(halfW, y1, halfD),   v(-halfW, y2, halfD), "#88909d", 2);
//         ln(v(-halfW, y1, -halfD), v(-halfW, y2, halfD), "#818a97", 2);
//         ln(v(-halfW, y1, halfD),  v(-halfW, y2, -halfD), "#a9b0bb", 2);
//         ln(v(halfW, y1, -halfD),  v(halfW, y2, halfD), "#818a97", 2);
//         ln(v(halfW, y1, halfD),   v(halfW, y2, -halfD), "#a9b0bb", 2);
//       }

//       /* LADDER */
//       const ladderX1 = -6, ladderX2 = 6;
//       const ladderZ = -halfD - 4;
//       const ladderTop = Math.min(565, currentTopY - 8);
//       if (ladderTop > 90) {
//         ln(v(ladderX1, 90, ladderZ), v(ladderX1, ladderTop, ladderZ), "#555555", 2);
//         ln(v(ladderX2, 90, ladderZ), v(ladderX2, ladderTop, ladderZ), "#555555", 2);
//         for (let y = 105; y <= ladderTop; y += 24) {
//           ln(v(ladderX1, y, ladderZ), v(ladderX2, y, ladderZ), "#a8a8a8", 1.5);
//         }
//       }

//       /* CRANE HEAD ONLY AFTER TOWER COMPLETE */
//       if (towerProgress < 1) return null;

//       const jibElapsed = anim.now - anim.start - ANIMATION.jibStartDelay;
//       let jibProgress = jibElapsed / ANIMATION.jibRevealDuration;
//       jibProgress = Math.min(1, Math.max(0, jibProgress));
//       currentOpacity = jibProgress;

//       /* SLEWING PLATFORM */
//       addLocalBox(base, yaw, v(0, 605, 0), v(84, 28, 66), {
//         front: C.steel, back: C.towerBack, left: C.steelSide,
//         right: C.steelDark, top: C.steelLight, bottom: C.steelDark,
//       });

//       /* HEAD */
//       addLocalBox(base, yaw, v(0, 638, 0), v(40, 55, 40), {
//         front: C.steel, back: C.towerBack, left: C.steelSide,
//         right: C.steelDark, top: C.steelLight, bottom: C.steelDark,
//       });

//       /* CABIN */
//       addLocalBox(base, yaw, v(26, 616, zs * -30), v(56, 60, 40), {
//         front: "#8fb9c7", back: "#49616c", left: C.cabinSide,
//         right: "#314750", top: C.cabinTop, bottom: "#30434d",
//       });

//       /* CABIN GLASS */
//       addLocalBox(base, yaw, v(26, 620, zs * -51.5), v(44, 34, 3), {
//         front: "#d5eef6", back: "#7fa8b5", left: "#5f8895",
//         right: "#46626d", top: "#eaf7fa", bottom: "#3d5964",
//       });

//       /* WINDOW FRAMES */
//       ln(v(4, 620, zs * -53.5), v(48, 620, zs * -53.5), "#3b545e", 2);
//       ln(v(4, 636, zs * -53.5), v(48, 636, zs * -53.5), "#3b545e", 2);
//       ln(v(26, 603, zs * -53.5), v(26, 637, zs * -53.5), "#3b545e", 2);

//       /* MAIN 3D JIB */
//       const jibLength = WORLD.jibLength;
//       const jibCenter = jibLength / 2;
//       const jibBottomY = 648, jibTopY = 671;
//       const zF = -18, zB = 18;

//       addLocalBox(base, yaw, v(jibCenter, jibBottomY, zF), v(jibLength, 9, 8), {
//         front: C.jibFront, back: C.jibDark, left: C.jibSide,
//         right: C.jibDark, top: C.jibLight, bottom: C.jibDark,
//       });
//       addLocalBox(base, yaw, v(jibCenter, jibBottomY, zB), v(jibLength, 9, 8), {
//         front: C.jibDark, back: C.jibSide, left: C.jibDark,
//         right: C.jibFront, top: C.jibLight, bottom: C.jibDark,
//       });
//       addLocalBox(base, yaw, v(jibCenter, jibTopY, zF), v(jibLength, 7, 7), {
//         front: C.jibFront, back: C.jibDark, left: C.jibSide,
//         right: C.jibDark, top: C.jibLight, bottom: C.jibDark,
//       });
//       addLocalBox(base, yaw, v(jibCenter, jibTopY, zB), v(jibLength, 7, 7), {
//         front: C.jibDark, back: C.jibSide, left: C.jibDark,
//         right: C.jibFront, top: C.jibLight, bottom: C.jibDark,
//       });

//       /* JIB CROSS MEMBERS + DIAGONALS */
//       const step = 28;
//       for (let x = 15; x <= jibLength; x += step) {
//         ln(v(x, jibBottomY, zF), v(x, jibTopY, zF), "#7c7c7c", 1.8);
//         ln(v(x, jibBottomY, zB), v(x, jibTopY, zB), "#5b666d", 1.8);
//         ln(v(x, jibBottomY, zF), v(x, jibBottomY, zB), "#69747b", 1.8);
//         ln(v(x, jibTopY, zF),    v(x, jibTopY, zB), "#7c878d", 1.8);
//       }
//       for (let x = 15; x < jibLength - step; x += step) {
//         ln(v(x, jibBottomY, zF),        v(x + step, jibTopY, zF), "#7c7c7c", 1.8);
//         ln(v(x + step, jibBottomY, zF), v(x, jibTopY, zF), "#778288", 1.8);
//         ln(v(x, jibBottomY, zB),        v(x + step, jibTopY, zB), "#5c676d", 1.8);
//         ln(v(x + step, jibBottomY, zB), v(x, jibTopY, zB), "#4c4c4c", 1.8);
//       }

//       /* COUNTER JIB */
//       const counterLength = 135;
//       const counterCenter = -counterLength / 2;
//       addLocalBox(base, yaw, v(counterCenter, 646, -16), v(counterLength, 10, 8), {
//         front: C.jibFront, back: C.jibDark, left: C.jibSide,
//         right: C.jibDark, top: C.jibLight, bottom: C.jibDark,
//       });
//       addLocalBox(base, yaw, v(counterCenter, 646, 16), v(counterLength, 10, 8), {
//         front: C.jibDark, back: C.jibSide, left: C.jibDark,
//         right: C.jibFront, top: C.jibLight, bottom: C.jibDark,
//       });
//       for (let x = -125; x <= -10; x += 22) {
//         ln(v(x, 646, -16), v(x, 646, 16), "#69747b", 1.8);
//       }

//       /* COUNTERWEIGHT */
//       addLocalBox(base, yaw, v(-108, 668, 0), v(48, 44, 40), {
//         front: "#8794a6", back: "#6c7889", left: "#7a879a",
//         right: "#59657a", top: "#b3bfcf", bottom: "#4a5568",
//       });

//       /* TROLLEY */
//       addLocalBox(base, yaw, v(WORLD.trolleyX, 636, 0), v(22, 18, 22), {
//         front: C.steelDark, back: C.towerBack, left: C.steelSide,
//         right: C.steelDark, top: C.steelLight, bottom: C.steelDark,
//       });

//       currentOpacity = 1;
//       return cranePoint(base, yaw, v(WORLD.trolleyX, 626, 0));
//     }

//     function drawHookBlock(p) {
//       worldBox(
//         v(p.x, p.y - 13, p.z), v(22, 26, 22),
//         {
//           front: C.hook, back: "#252e33", left: "#465158",
//           right: "#30383d", top: "#7a858b", bottom: "#252d31",
//         }
//       );
//       addLine(v(p.x - 7, p.y - 5, p.z - 11), v(p.x + 7, p.y - 5, p.z - 11), C.cableLight, 2.5);
//       const h1 = v(p.x, p.y - 26, p.z), h2 = v(p.x, p.y - 38, p.z);
//       const h3 = v(p.x + 6, p.y - 45, p.z), h4 = v(p.x + 3, p.y - 52, p.z);
//       const h5 = v(p.x - 3, p.y - 55, p.z);
//       addLine(h1, h2, C.hook, 5); addLine(h2, h3, C.hook, 5);
//       addLine(h3, h4, C.hook, 5); addLine(h4, h5, C.hook, 5);
//       addLine(h1, h2, C.hookLight, 1.5);
//     }

//     function drawBeam(c, len) {
//       const colors = {
//         front: C.concreteFront, back: "#767a7a", left: C.concreteSide,
//         right: C.concreteSide, top: C.concreteTop, bottom: C.concreteBottom,
//       };
//       worldBox(v(c.x, c.y, c.z), v(len, 14, 10), colors);
//       worldBox(v(c.x, c.y + 9, c.z), v(len, 4, 30), colors);
//       worldBox(v(c.x, c.y - 9, c.z), v(len, 4, 30), colors);
//     }

//     function drawShadow(base) {
//       const p = project(v(base.x, 0, base.z));
//       ctx.save();
//       const gradient = ctx.createRadialGradient(p.x, p.y, 5 * KS, p.x, p.y, 145 * KS);
//       gradient.addColorStop(0, "rgba(0,0,0,.20)");
//       gradient.addColorStop(.45, "rgba(0,0,0,.09)");
//       gradient.addColorStop(1, "rgba(0,0,0,0)");
//       ctx.fillStyle = gradient;
//       ctx.beginPath();
//       ctx.ellipse(p.x, p.y + 3, 100 * KS, 18 * KS, 0, 0, Math.PI * 2);
//       ctx.fill();
//       ctx.fillStyle = "rgba(0,0,0,.14)";
//       ctx.beginPath();
//       ctx.ellipse(p.x, p.y + 1, 52 * KS, 8 * KS, 0, 0, Math.PI * 2);
//       ctx.fill();
//       ctx.restore();
//     }

//     function render(now) {
//       anim.now = now;
//       ctx.clearRect(0, 0, W, H);
//       resetRender();

//       drawShadow(leftBase);
//       drawShadow(rightBase);

//       const groundPoint = project(v(0, 0, 0));
//       ctx.save();
//       ctx.strokeStyle = "rgba(70,80,86,.22)";
//       ctx.lineWidth = 2;
//       ctx.beginPath();
//       ctx.moveTo(0, groundPoint.y);
//       ctx.lineTo(W, groundPoint.y);
//       ctx.stroke();
//       ctx.restore();

//       const elapsed = now - anim.start;
//       let towerProgress = Math.min(1, Math.max(0, elapsed / ANIMATION.towerDuration));
//       const towerEase = 1 - Math.pow(1 - towerProgress, 3);

//       const leftTip = drawTower(leftBase, WORLD.leftYaw, towerEase);
//       const rightTip = drawTower(rightBase, WORLD.rightYaw, towerEase);

//       if (towerProgress >= 1) {
//         const jibElapsed = elapsed - ANIMATION.jibStartDelay;
//         const jibProgress = Math.min(1, Math.max(0, jibElapsed / ANIMATION.jibRevealDuration));
//         if (jibProgress >= 1) {
//           let loadProgress = Math.min(1, Math.max(0, (elapsed - ANIMATION.loadStartDelay) / ANIMATION.loadDuration));
//           const loadEase = 1 - Math.pow(1 - loadProgress, 3);
//           const bob = (loadProgress >= 1 && !REDUCED) ? Math.sin(elapsed / 1100) * 2.2 : 0;
//           const hy = WORLD.hookY + ANIMATION.loadDrop * (1 - loadEase) + bob;

//           const leftHook = cranePoint(leftBase, WORLD.leftYaw, v(WORLD.trolleyX, hy, 0));
//           const rightHook = cranePoint(rightBase, WORLD.rightYaw, v(WORLD.trolleyX, hy, 0));

//           for (const dx of [-4, 4]) {
//             addLine(v(leftTip.x + dx, leftTip.y, leftTip.z), v(leftHook.x + dx, leftHook.y, leftHook.z), C.cable, 2.2);
//             addLine(v(rightTip.x + dx, rightTip.y, rightTip.z), v(rightHook.x + dx, rightHook.y, rightHook.z), C.cable, 2.2);
//           }

//           drawHookBlock(leftHook);
//           drawHookBlock(rightHook);

//           const beamC = v((leftHook.x + rightHook.x) / 2, hy - 71, leftHook.z);
//           const beamTop = beamC.y + 11;

//           for (const h of [leftHook, rightHook]) {
//             addLine(v(h.x, h.y - 40, h.z), v(h.x - 22, beamTop, h.z), C.cable, 2.2);
//             addLine(v(h.x, h.y - 40, h.z), v(h.x + 22, beamTop, h.z), C.cable, 2.2);
//           }

//           drawBeam(beamC, Math.abs(rightHook.x - leftHook.x) + 40);
//         }
//       }

//       faces.sort((a, b) => b.depth - a.depth);
//       for (const face of faces) {
//         ctx.save();
//         ctx.globalAlpha = face.opacity;
//         ctx.beginPath();
//         ctx.moveTo(face.points[0].x, face.points[0].y);
//         for (let i = 1; i < face.points.length; i++) ctx.lineTo(face.points[i].x, face.points[i].y);
//         ctx.closePath();
//         ctx.fillStyle = face.fill;
//         ctx.fill();
//         if (face.stroke) {
//           ctx.strokeStyle = face.stroke;
//           ctx.lineWidth = face.width;
//           ctx.stroke();
//         }
//         ctx.restore();
//       }

//       lines.sort((a, b) => b.depth - a.depth);
//       for (const line of lines) {
//         ctx.save();
//         ctx.globalAlpha = line.opacity;
//         ctx.beginPath();
//         ctx.moveTo(line.a.x, line.a.y);
//         ctx.lineTo(line.b.x, line.b.y);
//         const averageDepth = (line.a.depth + line.b.depth) / 2;
//         const scale = camera.focal / (camera.focal + averageDepth);
//         ctx.lineWidth = line.width * scale * KS / 0.9;
//         ctx.strokeStyle = line.color;
//         ctx.lineCap = "round";
//         ctx.stroke();
//         ctx.restore();
//       }

//       rafId = requestAnimationFrame(render);
//     }

//     window.addEventListener("resize", resize);
//     resize();
//     rafId = requestAnimationFrame(render);

//     return () => {
//       window.removeEventListener("resize", resize);
//       if (rafId) cancelAnimationFrame(rafId);
//     };
//   }, [canvasRef, stageRef]);

//   return null;
// }

// // =========================================================
// // STAT NUMBER (COUNT UP)
// // =========================================================

// function StatNumber({ value, suffix, active }) {
//   const [display, setDisplay] = useState("0");

//   useEffect(() => {
//     if (!active) return;
//     if (REDUCED) { setDisplay(value + suffix); return; }
//     const t0 = performance.now();
//     const dur = 1600;
//     let raf;
//     const tick = (t) => {
//       const p = Math.min((t - t0) / dur, 1);
//       const e = 1 - Math.pow(1 - p, 3);
//       setDisplay(Math.round(value * e) + (p >= 1 ? suffix : ""));
//       if (p < 1) raf = requestAnimationFrame(tick);
//     };
//     raf = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(raf);
//   }, [active, value, suffix]);

//   return <>{display}</>;
// }

// // =========================================================
// // ABOUT SECTION
// // =========================================================

// export default function AboutSection() {
//   const canvasRef = useRef(null);
//   const stageRef = useRef(null);
//   const statsRef = useRef(null);
//   const [statsActive, setStatsActive] = useState(false);

//   // تفعيل العدّادات: الديسكتوب بعد 4.5 ثانية / الموبايل عند الوصول بالسكرول
//   useEffect(() => {
//     if (window.innerWidth >= 1180) {
//       const id = setTimeout(() => setStatsActive(true), 4500);
//       return () => clearTimeout(id);
//     }
//     const observer = new IntersectionObserver(
//       (entries, obs) => {
//         if (entries[0].isIntersecting) {
//           setStatsActive(true);
//           obs.disconnect();
//         }
//       },
//       { threshold: 0.4 }
//     );
//     if (statsRef.current) observer.observe(statsRef.current);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section
//       id="about"
//       className="about-section relative w-full overflow-hidden"
//       style={{
//         background:
//           "radial-gradient(circle at 1px 1px, rgba(42,49,122,.06) 1px, transparent 1.3px) 0 0/26px 26px, linear-gradient(180deg, #ffffff 0%, #f4f5fa 60%, #eceef5 100%)",
//       }}
//     >
//       {/* سكاي لاين المدينة في الخلفية */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute bottom-0 left-0 right-0 h-[48vh] z-0"
//         style={{
//           background:
//             "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 300' preserveAspectRatio='none'><g fill='%23a9b7cc' opacity='.38'><rect x='10' y='110' width='58' height='190'/><rect x='78' y='170' width='46' height='130'/><rect x='134' y='80' width='52' height='220'/><rect x='196' y='150' width='60' height='150'/><rect x='930' y='140' width='56' height='160'/><rect x='996' y='90' width='50' height='210'/><rect x='1056' y='160' width='60' height='140'/><rect x='1126' y='120' width='64' height='180'/></g></svg>\") bottom/100% 100% no-repeat",
//           WebkitMaskImage: "linear-gradient(to top, #000 0%, transparent 100%)",
//           maskImage: "linear-gradient(to top, #000 0%, transparent 100%)",
//         }}
//       />

//       {/* كانفس الكرينات */}
//       <canvas ref={canvasRef} className="absolute inset-0 z-[1] pointer-events-none" />

//       {/* STAGE — المحتوى اللي بيتعمله scale بنفس معامل الكرينات */}
//       <div ref={stageRef} className="about-stage z-[2]" dir="ltr">
//         {/* HEADER */}
//         <motion.div
//           className="about-blk about-header"
//           initial={{ opacity: 0, y: 14 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 3.2, duration: 0.8, ease: "easeOut" }}
//         >
//           <div className="text-[11px] font-bold tracking-[0.18em] text-[#2A317A] uppercase">
//             Discover Our Story
//           </div>
//           <h1 className="m-0 mt-[13px] text-[52px] leading-[1.05] font-extrabold text-[#1E2432]">
//             About <span className="text-[#2A317A]">Us</span>
//           </h1>
//           <div className="w-14 h-[3px] mx-auto mt-[7px] mb-2 bg-[#2A317A] rounded-sm" />
//           <p className="w-[500px] max-w-full mx-auto m-0 text-[12.5px] leading-[21px] text-[#3C3C3B]">
//             We are a leading construction company, committed to excellence and
//             innovation, delivering high-quality projects that shape Egypt&apos;s skyline.
//           </p>
//           <a
//             href="/about"
//             className="inline-block mt-[18px] text-[12.5px] font-bold text-[#1E2432] no-underline transition-all hover:text-[#2A317A]"
//           >
//             Learn more about us &rarr;
//           </a>
//         </motion.div>

//         {/* CARDS */}
//         <motion.div
//           className="about-blk about-cards"
//           initial={{ opacity: 0, y: 14 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 3.7, duration: 0.8, ease: "easeOut" }}
//         >
//           {/* LEFT COLUMN */}
//           <div className="flex flex-col gap-[14px]">
//             {features
//               .filter((f) => f.position === "left")
//               .map((f, i) => (
//                 <motion.div
//                   key={f.title}
//                   className="group flex items-start gap-[18px] bg-white rounded-xl p-3 shadow-[0_4px_14px_rgba(60,60,59,0.10)] border-l-[3px] border-l-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(60,60,59,0.18)] hover:border-l-[#2A317A]"
//                   initial={{ opacity: 0, y: 14 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 3.8 + i * 0.12, duration: 0.6, ease: "easeOut" }}
//                 >
//                   <div className="shrink-0 w-[60px] h-[60px] rounded-xl grid place-items-center bg-[rgba(42,49,122,0.08)] text-[#2A317A] transition-all duration-300 group-hover:bg-[#2A317A] group-hover:text-white group-hover:rotate-[-6deg] group-hover:scale-[1.06]">
//                     <f.Icon className="w-[30px] h-[30px]" strokeWidth={1.7} />
//                   </div>
//                   <div>
//                     <h3 className="m-0 pt-1 text-[14.5px] leading-[17px] font-bold text-[#1E2432]">
//                       {f.title}
//                     </h3>
//                     <p className="m-0 text-[12px] leading-[19px] text-[#3C3C3B]">
//                       {f.description}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
//           </div>

//           {/* CENTER PHOTO */}
//           <motion.div
//             className="relative self-center h-[310px] p-[13px]"
//             initial={{ opacity: 0, y: 14 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 3.8, duration: 0.6, ease: "easeOut" }}
//           >
//             {/* الزوايا المضيئة */}
//             <div className="about-photo-corner top-0 left-0 border-t-2 border-l-2 border-[#2A317A] rounded-tl-[14px]" />
//             <div className="about-photo-corner bottom-0 right-0 border-b-2 border-r-2 border-[#2A317A] rounded-br-[14px]" />
//             <div className="relative w-full h-full bg-white rounded-[14px] p-1.5 shadow-[0_8px_24px_rgba(60,60,59,0.20)] overflow-hidden">
//               <img
//                 src="/src/assets/images/DSC_3583.JPG"
//                 alt="alshorouk project"
//                 className="w-full h-full block rounded-[9px] object-cover"
//               />
//               {/* لمعة الصورة */}
//               <div className="about-sheen" aria-hidden />
//             </div>
//           </motion.div>

//           {/* RIGHT COLUMN */}
//           <div className="flex flex-col gap-[14px]">
//             {features
//               .filter((f) => f.position === "right")
//               .map((f, i) => (
//                 <motion.div
//                   key={f.title}
//                   className="group flex items-start gap-[18px] bg-white rounded-xl p-3 shadow-[0_4px_14px_rgba(60,60,59,0.10)] border-l-[3px] border-l-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(60,60,59,0.18)] hover:border-l-[#2A317A]"
//                   initial={{ opacity: 0, y: 14 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 3.8 + i * 0.12, duration: 0.6, ease: "easeOut" }}
//                 >
//                   <div className="shrink-0 w-[60px] h-[60px] rounded-xl grid place-items-center bg-[rgba(42,49,122,0.08)] text-[#2A317A] transition-all duration-300 group-hover:bg-[#2A317A] group-hover:text-white group-hover:rotate-[-6deg] group-hover:scale-[1.06]">
//                     <f.Icon className="w-[30px] h-[30px]" strokeWidth={1.7} />
//                   </div>
//                   <div>
//                     <h3 className="m-0 pt-1 text-[14.5px] leading-[17px] font-bold text-[#1E2432]">
//                       {f.title}
//                     </h3>
//                     <p className="m-0 text-[12px] leading-[19px] text-[#3C3C3B]">
//                       {f.description}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
//           </div>
//         </motion.div>

//         {/* STATS */}
//         <div ref={statsRef} className="about-blk about-stats">
//           {stats.map((s, i) => (
//             <motion.div
//               key={s.label}
//               className="about-stat flex items-center gap-4 pl-[30px] pr-4 bg-white rounded-xl shadow-[0_4px_14px_rgba(60,60,59,0.10)] text-[#2A317A] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(60,60,59,0.18)]"
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, amount: 0.4 }}
//               transition={{ delay: 4.3 + i * 0.1, duration: 0.5 }}
//             >
//               <s.Icon className="shrink-0 w-9 h-9" strokeWidth={1.5} />
//               <div>
//                 <b className="block text-[26px] leading-none font-extrabold text-[#1E2432]">
//                   <StatNumber value={s.target} suffix={s.suffix} active={statsActive} />
//                 </b>
//                 <small className="block mt-1.5 text-[9.5px] tracking-[0.05em] uppercase text-[#3C3C3B] whitespace-nowrap">
//                   {s.label}
//                 </small>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* CTA */}
//         <motion.div
//           className="about-blk about-cta overflow-hidden rounded-[11px] text-white shadow-[0_8px_20px_rgba(42,49,122,0.32)]"
//           style={{ background: "linear-gradient(90deg, #2A317A, #1E2254)" }}
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.3 }}
//           transition={{ delay: 4.7, duration: 0.8 }}
//         >
//           {/* الخط المخطط السفلي */}
//           <div className="about-cta-stripes" aria-hidden />
//           <Users className="shrink-0 w-11 h-11" strokeWidth={1.4} />
//           <span className="w-px h-[46px] mx-[18px] bg-white/35" />
//           <div className="flex-1">
//             <h4 className="m-0 text-[17px] font-bold">Ready to build your next project?</h4>
//             <p className="m-0 mt-[5px] text-[12px] text-white/75">
//               Let&apos;s create something great together.
//             </p>
//           </div>
//           <a
//             href="/contact"
//             className="inline-flex items-center gap-2 h-[45px] px-6 rounded-[23px] bg-white text-[#2A317A] text-[13px] font-bold no-underline transition-all hover:-translate-y-[2px] hover:shadow-[0_8px_18px_rgba(42,49,122,0.35)]"
//           >
//             Get In Touch <ArrowRight className="w-4 h-4" />
//           </a>
//         </motion.div>
//       </div>

//       <TowerCraneScene canvasRef={canvasRef} stageRef={stageRef} />

//       <style>{aboutSectionCss}</style>
//     </section>
//   );
// }

// // =========================================================
// // CSS خاص بالسكشن (الـ stage المُقاس + الريسبونسيف)
// // =========================================================

// const aboutSectionCss = `
// @media (min-width: 1180px){
//   .about-section{ height: 100vh; }
// }

// .about-stage{
//   position: fixed;
//   width: 1711px;
//   height: 919px;
//   transform-origin: 0 0;
//   direction: ltr;
//   text-align: left;
//   color: #1E2432;
// }

// /* ---------- HEADER ---------- */
// .about-header{
//   position: absolute;
//   top: 60px; left: 0;
//   width: 1711px;
//   text-align: center;
// }

// /* ---------- CARDS ---------- */
// .about-cards{
//   position: absolute;
//   top: 315px; left: 233px;
//   width: 1244px; height: 358px;
//   display: grid;
//   grid-template-columns: 352px 416px 352px;
//   column-gap: 62px;
// }

// /* ---------- STATS ---------- */
// .about-stats{
//   position: absolute;
//   top: 689px; left: 328px;
//   width: 1067px; height: 80px;
//   display: grid;
//   grid-template-columns: repeat(5, 1fr);
//   column-gap: 14px;
// }

// .about-stat{ padding-top: 14px; padding-bottom: 14px; }

// /* ---------- CTA ---------- */
// .about-cta{
//   position: absolute;
//   top: 789px; left: 332px;
//   width: 1049px; height: 83px;
//   display: flex;
//   align-items: center;
//   padding: 0 28px 0 40px;
// }

// .about-cta-stripes{
//   position: absolute;
//   left: 0; right: 0; bottom: 0;
//   height: 5px;
//   background: repeating-linear-gradient(135deg, rgba(255,255,255,.20) 0 10px, #1E2254 10px 20px);
//   pointer-events: none;
// }

// /* ---------- PHOTO DECOR ---------- */
// .about-photo-corner{
//   position: absolute;
//   width: 70px; height: 70px;
//   pointer-events: none;
//   animation: about-photo-pulse 2.6s ease-in-out infinite;
// }

// @keyframes about-photo-pulse{
//   50% { width: 88px; height: 88px; }
// }

// .about-sheen{
//   position: absolute;
//   top: 0; bottom: 0;
//   width: 40%;
//   left: -60%;
//   background: linear-gradient(100deg, transparent, rgba(255,255,255,.35), transparent);
//   transform: skewX(-18deg);
//   animation: about-sheen 6s ease-in-out 5s infinite;
//   pointer-events: none;
// }

// @keyframes about-sheen{
//   0%, 60% { left: -60%; }
//   100% { left: 140%; }
// }

// /* =========================================================
//    TABLET + MOBILE
// ========================================================= */
// @media (max-width: 1179px){
//   .about-stage{
//     position: relative;
//     width: auto; height: auto;
//     max-width: 820px;
//     margin: 0 auto;
//     transform: none !important;
//     left: auto !important; top: auto !important;
//     padding: 24px 20px 60px;
//   }

//   .about-header, .about-cards, .about-stats, .about-cta{
//     position: static;
//     width: auto !important;
//     margin-bottom: 18px;
//   }

//   .about-header h1{ font-size: 44px; }
//   .about-header p{ width: auto; max-width: 460px; }

//   .about-cards{
//     height: auto;
//     grid-template-columns: 1fr 1fr;
//     column-gap: 14px; row-gap: 14px;
//   }

//   .about-cards > div:nth-child(2){
//     grid-column: 1 / -1;
//     order: -1;
//     height: 340px;
//     width: 100%; max-width: 560px;
//     justify-self: center;
//   }

//   .about-stats{
//     height: auto;
//     grid-template-columns: repeat(6, 1fr);
//     row-gap: 12px;
//   }
//   .about-stat{ grid-column: span 2; }
//   .about-stat:nth-child(n+4){ grid-column: span 3; }
//   .about-stat{ padding: 14px 16px; }

//   .about-cta{
//     height: auto;
//     flex-wrap: wrap;
//     gap: 12px;
//     padding: 20px 22px 24px;
//   }
// }

// @media (max-width: 640px){
//   .about-stage{ padding: 24px 14px 48px; }
//   .about-header h1{ font-size: 38px; }
//   .about-cards{ grid-template-columns: 1fr; }
//   .about-cards > div:nth-child(2){ height: 240px; }
//   .about-cards svg{ width: 26px; height: 26px; }
//   .about-cards .group > div:first-child{ width: 48px; height: 48px; }
//   .about-stats{ grid-template-columns: repeat(2, 1fr); row-gap: 10px; }
//   .about-stat, .about-stat:nth-child(n+4){ grid-column: span 1; padding: 12px 14px; gap: 10px; }
//   .about-stat:last-child{ grid-column: 1 / -1; }
//   .about-stat svg{ width: 30px; height: 30px; }
//   .about-stat b{ font-size: 22px; }
//   .about-cta{ justify-content: center; text-align: center; }
//   .about-cta > span{ display: none; }
//   .about-cta > svg{ width: 36px; height: 36px; }
//   .about-cta > div{ flex: 1 1 100%; }
// }

// @media (prefers-reduced-motion: reduce){
//   .about-photo-corner, .about-sheen{ animation: none; }
// }
// `;


import { Fragment, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  Building2, Award, Users, Calendar, Wrench, ShieldCheck,
  ArrowRight, Forklift, Blocks, HardHat, BadgeCheck,
} from "lucide-react";
import {
  getTextValue,
  useAboutContent,
} from "../../features/marketing/MarketingProvider";
import { resolveMarketingIcon } from "../../features/marketing/marketingIcons";
import { useLanguage } from "../../locales/LanguageContext/LanguageContext";

// =========================================================
// DATA
// =========================================================

// features/stats from MarketingProvider
const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// =========================================================
// 3D TOWER CRANES CANVAS
// run     : بيزيد كل مرة نبدأ الأنيميشن من الأول
// playing : true لما السيكشن ظاهر في الشاشة
// =========================================================

function TowerCraneScene({ canvasRef, stageRef, run, playing }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    const ctx = canvas.getContext("2d");

    let W = 0, H = 0, DPR = 1, KS = 1;
    let rafId = null;

    function degToRad(d) { return d * Math.PI / 180; }

    /* أبعاد الصورة المرجعية */
    const REF = { w: 1711, h: 919, ground: 872, edge: 100, hook: 365, beamY: 288 };
    const S0 = 1.22;
    const YAW = degToRad(15);

    const WORLD = {
      jibLength: 414, trolleyX: 331, trolleyRatio: 0.8,
      hookX: 300, hookZ: 0, beamY: 470, hookY: 540,
      towerHeight: 585, towerHalfWidth: 20, towerHalfDepth: 20,
      leftYaw: YAW, rightYaw: Math.PI - YAW,
    };

    const leftBase = { x: -650, y: 0, z: 0 };
    const rightBase = { x: 650, y: 0, z: 0 };

    const camera = {
      pitch: degToRad(7), focal: 1750, cx: 0, cy: 0, scale: 1,
    };

    const C = {
      towerFront: "#c9ced6", towerLight: "#e4e8ee", towerDark: "#939aa6",
      towerSide: "#8f97a4", towerBack: "#a2a8b3",
      steel: "#c9ced6", steelLight: "#e4e8ee", steelSide: "#b3b9c3", steelDark: "#858c99",
      jibFront: "#cfd3da", jibLight: "#e9ecf1", jibDark: "#8d94a1", jibSide: "#b3b9c3",
      cabinFront: "#7faab9", cabinSide: "#445963", cabinTop: "#c0d7df",
      concreteFront: "#aab4c2", concreteTop: "#d3dae4",
      concreteSide: "#7c8797", concreteBottom: "#5f6a7a",
      cable: "#3f484e", cableLight: "#9ba3a7",
      hook: "#343d42", hookLight: "#a7afb3",
    };

    const ANIMATION = {
      towerDuration: 3200, jibStartDelay: 3200, jibRevealDuration: 800,
      loadStartDelay: 4900, loadDuration: 4500, loadDrop: 24,
    };

    // بيتصفّر مع كل تشغيل جديد (لأن الـ effect بيتعاد مع تغيّر run)
    const anim = { start: performance.now(), now: performance.now() };

    let faces = [];
    let lines = [];
    let currentOpacity = 1;

    function resetRender() { faces = []; lines = []; currentOpacity = 1; }
    function v(x = 0, y = 0, z = 0) { return { x, y, z }; }
    function add(a, b) { return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z }; }

    function rotateY(p, angle) {
      const c = Math.cos(angle), s = Math.sin(angle);
      return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c };
    }

    function cranePoint(base, yaw, local) {
      const r = rotateY(local, yaw);
      return { x: r.x + base.x, y: r.y + base.y, z: r.z + base.z };
    }

    function project(p) {
      const cp = Math.cos(camera.pitch), sp = Math.sin(camera.pitch);
      const cameraY = p.y * cp - p.z * sp;
      const cameraZ = p.y * sp + p.z * cp;
      const perspective = camera.focal / (camera.focal + cameraZ);
      return {
        x: camera.cx + p.x * camera.scale * perspective,
        y: camera.cy - cameraY * camera.scale * perspective,
        depth: cameraZ,
      };
    }

    function solveY(z, targetPx) {
      let lo = 0, hi = 1500;
      for (let i = 0; i < 40; i++) {
        const mid = (lo + hi) / 2;
        const py = project(v(0, mid, z)).y;
        if (py > targetPx) lo = mid; else hi = mid;
      }
      return (lo + hi) / 2;
    }

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      const isDesk = W >= 1180;
      const banner = Math.max(300, Math.min(430, W * 0.6));
      H = isDesk ? window.innerHeight : banner;

      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const desktop = W >= 1180;
      KS = desktop ? Math.min(W / REF.w, H / REF.h) : H / REF.h;

      camera.scale = S0 * KS;
      camera.cx = W * 0.5;
      camera.cy = H - (REF.h - REF.ground) * KS;

      const refW = W / KS;
      const spacing = (refW / 2 - REF.edge) / S0;
      leftBase.x = -spacing;
      rightBase.x = spacing;

      const hookRef = Math.min(REF.hook, refW * (REF.hook / REF.w));
      WORLD.hookX = hookRef / S0;
      WORLD.trolleyX = (spacing - WORLD.hookX) / Math.cos(YAW);
      WORLD.jibLength = WORLD.trolleyX / WORLD.trolleyRatio;
      WORLD.hookZ = -WORLD.trolleyX * Math.sin(YAW);

      WORLD.beamY = solveY(WORLD.hookZ, camera.cy - (REF.ground - REF.beamY) * KS);
      WORLD.hookY = WORLD.beamY + 71;

      if (desktop) {
        stage.style.position = "fixed";
        stage.style.left = camera.cx - (REF.w / 2) * KS + "px";
        stage.style.top = camera.cy - REF.ground * KS + "px";
        stage.style.transform = "scale(" + KS + ")";
        stage.style.transformOrigin = "0 0";
        stage.style.width = "1711px";
        stage.style.height = "919px";
        stage.style.paddingTop = "";
        stage.style.margin = "0";
      } else {
        stage.style.position = "relative";
        stage.style.width = "auto";
        stage.style.height = "auto";
        stage.style.transform = "none";
        stage.style.left = "auto";
        stage.style.top = "auto";
        stage.style.maxWidth = "820px";
        stage.style.margin = "0 auto";
        stage.style.paddingTop = H + 24 + "px";
      }
    }

    function addFace(points, fill, stroke = null, width = 1) {
      const projected = points.map(project);
      let depth = 0;
      for (const point of projected) depth += point.depth;
      depth /= projected.length;
      faces.push({ points: projected, fill, stroke, width, depth, opacity: currentOpacity });
    }

    function addLine(a, b, color, width = 2) {
      const pa = project(a), pb = project(b);
      lines.push({
        a: pa, b: pb, color, width,
        depth: (pa.depth + pb.depth) / 2,
        opacity: currentOpacity,
      });
    }

    function addBox(center, size, transform, colors) {
      const sx = size.x / 2, sy = size.y / 2, sz = size.z / 2;
      const local = [
        v(-sx,-sy,-sz), v(sx,-sy,-sz), v(sx,sy,-sz), v(-sx,sy,-sz),
        v(-sx,-sy,sz),  v(sx,-sy,sz),  v(sx,sy,sz),  v(-sx,sy,sz),
      ];
      const p = local.map(transform);
      addFace([p[0], p[1], p[2], p[3]], colors.front  || C.towerFront);
      addFace([p[4], p[7], p[6], p[5]], colors.back   || C.towerBack);
      addFace([p[0], p[4], p[5], p[1]], colors.left   || C.towerSide);
      addFace([p[1], p[5], p[6], p[2]], colors.right  || C.towerDark);
      addFace([p[3], p[2], p[6], p[7]], colors.top    || C.towerLight);
      addFace([p[0], p[1], p[5], p[4]], colors.bottom || C.towerDark);
    }

    function addLocalBox(base, yaw, localCenter, size, colors) {
      addBox(
        localCenter, size,
        localPoint => cranePoint(base, yaw, add(localCenter, localPoint)),
        colors
      );
    }

    function worldBox(center, size, colors) {
      addBox(center, size, l => add(center, l), colors);
    }

    function drawTower(base, yaw, towerProgress) {
      const transform = local => cranePoint(base, yaw, local);
      const ln = (a, b, color, width) => addLine(transform(a), transform(b), color, width);

      const zs = yaw > Math.PI / 2 ? -1 : 1;
      const halfW = WORLD.towerHalfWidth, halfD = WORLD.towerHalfDepth;
      const bottomY = 51;
      const fullTopY = WORLD.towerHeight;
      const currentTopY = bottomY + (fullTopY - bottomY) * towerProgress;
      const towerCenterY = (bottomY + currentTopY) / 2;
      const legHeight = Math.max(1, currentTopY - bottomY);

      /* FOUNDATION */
      addLocalBox(base, yaw, v(0, 5, 0), v(92, 10, 84), {
        front: "#aab4c2", back: "#8b96a6", left: "#b6bfcc",
        right: "#7c8797", top: "#d3dae4", bottom: "#5f6a7a",
      });

      /* ANCHOR BOLTS */
      const boltPositions = [
        v(-36, 12, -32), v(36, 12, -32),
        v(-36, 12, 32),  v(36, 12, 32),
      ];
      for (const bolt of boltPositions) {
        addLocalBox(base, yaw, bolt, v(8, 5, 8), {
          front: "#4a4a4a", back: "#3a3a3a", left: "#555555",
          right: "#333333", top: "#8f8f8f", bottom: "#2e2e2e",
        });
      }

      /* MAIN PEDESTAL */
      addLocalBox(base, yaw, v(0, 24, 0), v(60, 38, 54), {
        front: "#c2cad6", back: "#96a1b0", left: "#b4bdca",
        right: "#7f8a99", top: "#e6ebf2", bottom: "#697485",
      });

      /* UPPER MOUNTING BLOCK */
      addLocalBox(base, yaw, v(0, 45, 0), v(52, 12, 46), {
        front: "#c3c8d1", back: "#8b929e", left: "#a9afba",
        right: "#79808d", top: "#e2e6ec", bottom: "#6d7480",
      });

      /* FOUR VERTICAL LEGS */
      const legCenters = [
        v(-halfW, towerCenterY, -halfD), v(halfW, towerCenterY, -halfD),
        v(-halfW, towerCenterY, halfD),  v(halfW, towerCenterY, halfD),
      ];
      for (const center of legCenters) {
        addLocalBox(base, yaw, center, v(8, legHeight, 8), {
          front: C.towerFront, back: C.towerBack, left: C.towerSide,
          right: C.towerDark, top: C.towerLight, bottom: C.towerDark,
        });
      }

      /* TOWER LEVELS */
      const levels = [];
      for (let y = 85; y <= currentTopY - 10; y += 40) levels.push(y);

      for (const y of levels) {
        ln(v(-halfW, y, -halfD), v(halfW, y, -halfD), "#b9bfc9", 3);
        ln(v(-halfW, y, halfD),  v(halfW, y, halfD),  "#8f97a4", 2.5);
        ln(v(-halfW, y, -halfD), v(-halfW, y, halfD), "#a3aab6", 2.5);
        ln(v(halfW, y, -halfD),  v(halfW, y, halfD),  "#7c8593", 2.5);
      }

      /* X BRACING */
      for (let i = 0; i < levels.length - 1; i++) {
        const y1 = levels[i], y2 = levels[i + 1];
        ln(v(-halfW, y1, -halfD), v(halfW, y2, -halfD), "#b9bfc9", 2.2);
        ln(v(halfW, y1, -halfD),  v(-halfW, y2, -halfD), "#b0b7c2", 2.2);
        ln(v(-halfW, y1, halfD),  v(halfW, y2, halfD), "#8f97a4", 2);
        ln(v(halfW, y1, halfD),   v(-halfW, y2, halfD), "#88909d", 2);
        ln(v(-halfW, y1, -halfD), v(-halfW, y2, halfD), "#818a97", 2);
        ln(v(-halfW, y1, halfD),  v(-halfW, y2, -halfD), "#a9b0bb", 2);
        ln(v(halfW, y1, -halfD),  v(halfW, y2, halfD), "#818a97", 2);
        ln(v(halfW, y1, halfD),   v(halfW, y2, -halfD), "#a9b0bb", 2);
      }

      /* LADDER */
      const ladderX1 = -6, ladderX2 = 6;
      const ladderZ = -halfD - 4;
      const ladderTop = Math.min(565, currentTopY - 8);
      if (ladderTop > 90) {
        ln(v(ladderX1, 90, ladderZ), v(ladderX1, ladderTop, ladderZ), "#555555", 2);
        ln(v(ladderX2, 90, ladderZ), v(ladderX2, ladderTop, ladderZ), "#555555", 2);
        for (let y = 105; y <= ladderTop; y += 24) {
          ln(v(ladderX1, y, ladderZ), v(ladderX2, y, ladderZ), "#a8a8a8", 1.5);
        }
      }

      /* CRANE HEAD ONLY AFTER TOWER COMPLETE */
      if (towerProgress < 1) return null;

      const jibElapsed = anim.now - anim.start - ANIMATION.jibStartDelay;
      let jibProgress = jibElapsed / ANIMATION.jibRevealDuration;
      jibProgress = Math.min(1, Math.max(0, jibProgress));
      currentOpacity = jibProgress;

      /* SLEWING PLATFORM */
      addLocalBox(base, yaw, v(0, 605, 0), v(84, 28, 66), {
        front: C.steel, back: C.towerBack, left: C.steelSide,
        right: C.steelDark, top: C.steelLight, bottom: C.steelDark,
      });

      /* HEAD */
      addLocalBox(base, yaw, v(0, 638, 0), v(40, 55, 40), {
        front: C.steel, back: C.towerBack, left: C.steelSide,
        right: C.steelDark, top: C.steelLight, bottom: C.steelDark,
      });

      /* CABIN */
      addLocalBox(base, yaw, v(26, 616, zs * -30), v(56, 60, 40), {
        front: "#8fb9c7", back: "#49616c", left: C.cabinSide,
        right: "#314750", top: C.cabinTop, bottom: "#30434d",
      });

      /* CABIN GLASS */
      addLocalBox(base, yaw, v(26, 620, zs * -51.5), v(44, 34, 3), {
        front: "#d5eef6", back: "#7fa8b5", left: "#5f8895",
        right: "#46626d", top: "#eaf7fa", bottom: "#3d5964",
      });

      /* WINDOW FRAMES */
      ln(v(4, 620, zs * -53.5), v(48, 620, zs * -53.5), "#3b545e", 2);
      ln(v(4, 636, zs * -53.5), v(48, 636, zs * -53.5), "#3b545e", 2);
      ln(v(26, 603, zs * -53.5), v(26, 637, zs * -53.5), "#3b545e", 2);

      /* MAIN 3D JIB */
      const jibLength = WORLD.jibLength;
      const jibCenter = jibLength / 2;
      const jibBottomY = 648, jibTopY = 671;
      const zF = -18, zB = 18;

      addLocalBox(base, yaw, v(jibCenter, jibBottomY, zF), v(jibLength, 9, 8), {
        front: C.jibFront, back: C.jibDark, left: C.jibSide,
        right: C.jibDark, top: C.jibLight, bottom: C.jibDark,
      });
      addLocalBox(base, yaw, v(jibCenter, jibBottomY, zB), v(jibLength, 9, 8), {
        front: C.jibDark, back: C.jibSide, left: C.jibDark,
        right: C.jibFront, top: C.jibLight, bottom: C.jibDark,
      });
      addLocalBox(base, yaw, v(jibCenter, jibTopY, zF), v(jibLength, 7, 7), {
        front: C.jibFront, back: C.jibDark, left: C.jibSide,
        right: C.jibDark, top: C.jibLight, bottom: C.jibDark,
      });
      addLocalBox(base, yaw, v(jibCenter, jibTopY, zB), v(jibLength, 7, 7), {
        front: C.jibDark, back: C.jibSide, left: C.jibDark,
        right: C.jibFront, top: C.jibLight, bottom: C.jibDark,
      });

      /* JIB CROSS MEMBERS + DIAGONALS */
      const step = 28;
      for (let x = 15; x <= jibLength; x += step) {
        ln(v(x, jibBottomY, zF), v(x, jibTopY, zF), "#7c7c7c", 1.8);
        ln(v(x, jibBottomY, zB), v(x, jibTopY, zB), "#5b666d", 1.8);
        ln(v(x, jibBottomY, zF), v(x, jibBottomY, zB), "#69747b", 1.8);
        ln(v(x, jibTopY, zF),    v(x, jibTopY, zB), "#7c878d", 1.8);
      }
      for (let x = 15; x < jibLength - step; x += step) {
        ln(v(x, jibBottomY, zF),        v(x + step, jibTopY, zF), "#7c7c7c", 1.8);
        ln(v(x + step, jibBottomY, zF), v(x, jibTopY, zF), "#778288", 1.8);
        ln(v(x, jibBottomY, zB),        v(x + step, jibTopY, zB), "#5c676d", 1.8);
        ln(v(x + step, jibBottomY, zB), v(x, jibTopY, zB), "#4c4c4c", 1.8);
      }

      /* COUNTER JIB */
      const counterLength = 135;
      const counterCenter = -counterLength / 2;
      addLocalBox(base, yaw, v(counterCenter, 646, -16), v(counterLength, 10, 8), {
        front: C.jibFront, back: C.jibDark, left: C.jibSide,
        right: C.jibDark, top: C.jibLight, bottom: C.jibDark,
      });
      addLocalBox(base, yaw, v(counterCenter, 646, 16), v(counterLength, 10, 8), {
        front: C.jibDark, back: C.jibSide, left: C.jibDark,
        right: C.jibFront, top: C.jibLight, bottom: C.jibDark,
      });
      for (let x = -125; x <= -10; x += 22) {
        ln(v(x, 646, -16), v(x, 646, 16), "#69747b", 1.8);
      }

      /* COUNTERWEIGHT */
      addLocalBox(base, yaw, v(-108, 668, 0), v(48, 44, 40), {
        front: "#8794a6", back: "#6c7889", left: "#7a879a",
        right: "#59657a", top: "#b3bfcf", bottom: "#4a5568",
      });

      /* TROLLEY */
      addLocalBox(base, yaw, v(WORLD.trolleyX, 636, 0), v(22, 18, 22), {
        front: C.steelDark, back: C.towerBack, left: C.steelSide,
        right: C.steelDark, top: C.steelLight, bottom: C.steelDark,
      });

      currentOpacity = 1;
      return cranePoint(base, yaw, v(WORLD.trolleyX, 626, 0));
    }

    function drawHookBlock(p) {
      worldBox(
        v(p.x, p.y - 13, p.z), v(22, 26, 22),
        {
          front: C.hook, back: "#252e33", left: "#465158",
          right: "#30383d", top: "#7a858b", bottom: "#252d31",
        }
      );
      addLine(v(p.x - 7, p.y - 5, p.z - 11), v(p.x + 7, p.y - 5, p.z - 11), C.cableLight, 2.5);
      const h1 = v(p.x, p.y - 26, p.z), h2 = v(p.x, p.y - 38, p.z);
      const h3 = v(p.x + 6, p.y - 45, p.z), h4 = v(p.x + 3, p.y - 52, p.z);
      const h5 = v(p.x - 3, p.y - 55, p.z);
      addLine(h1, h2, C.hook, 5); addLine(h2, h3, C.hook, 5);
      addLine(h3, h4, C.hook, 5); addLine(h4, h5, C.hook, 5);
      addLine(h1, h2, C.hookLight, 1.5);
    }

    function drawBeam(c, len) {
      const colors = {
        front: C.concreteFront, back: "#767a7a", left: C.concreteSide,
        right: C.concreteSide, top: C.concreteTop, bottom: C.concreteBottom,
      };
      worldBox(v(c.x, c.y, c.z), v(len, 14, 10), colors);
      worldBox(v(c.x, c.y + 9, c.z), v(len, 4, 30), colors);
      worldBox(v(c.x, c.y - 9, c.z), v(len, 4, 30), colors);
    }

    function drawShadow(base) {
      const p = project(v(base.x, 0, base.z));
      ctx.save();
      const gradient = ctx.createRadialGradient(p.x, p.y, 5 * KS, p.x, p.y, 145 * KS);
      gradient.addColorStop(0, "rgba(0,0,0,.20)");
      gradient.addColorStop(.45, "rgba(0,0,0,.09)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(p.x, p.y + 3, 100 * KS, 18 * KS, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(0,0,0,.14)";
      ctx.beginPath();
      ctx.ellipse(p.x, p.y + 1, 52 * KS, 8 * KS, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function render(now) {
      anim.now = now;
      ctx.clearRect(0, 0, W, H);
      resetRender();

      drawShadow(leftBase);
      drawShadow(rightBase);

      const groundPoint = project(v(0, 0, 0));
      ctx.save();
      ctx.strokeStyle = "rgba(70,80,86,.22)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundPoint.y);
      ctx.lineTo(W, groundPoint.y);
      ctx.stroke();
      ctx.restore();

      const elapsed = Math.max(0, now - anim.start);
      let towerProgress = Math.min(1, Math.max(0, elapsed / ANIMATION.towerDuration));
      const towerEase = 1 - Math.pow(1 - towerProgress, 3);

      const leftTip = drawTower(leftBase, WORLD.leftYaw, towerEase);
      const rightTip = drawTower(rightBase, WORLD.rightYaw, towerEase);

      if (towerProgress >= 1) {
        const jibElapsed = elapsed - ANIMATION.jibStartDelay;
        const jibProgress = Math.min(1, Math.max(0, jibElapsed / ANIMATION.jibRevealDuration));
        if (jibProgress >= 1) {
          const loadProgress = Math.min(
            1,
            Math.max(0, (elapsed - ANIMATION.loadStartDelay) / ANIMATION.loadDuration)
          );
          const loadEase = 1 - Math.pow(1 - loadProgress, 3);

          // ✅ من غير bob: بعد ما الحِمل ينزل بيثبت تمامًا (مفيش رعشة)
          const hy = WORLD.hookY + ANIMATION.loadDrop * (1 - loadEase);

          const leftHook = cranePoint(leftBase, WORLD.leftYaw, v(WORLD.trolleyX, hy, 0));
          const rightHook = cranePoint(rightBase, WORLD.rightYaw, v(WORLD.trolleyX, hy, 0));

          for (const dx of [-4, 4]) {
            addLine(v(leftTip.x + dx, leftTip.y, leftTip.z), v(leftHook.x + dx, leftHook.y, leftHook.z), C.cable, 2.2);
            addLine(v(rightTip.x + dx, rightTip.y, rightTip.z), v(rightHook.x + dx, rightHook.y, rightHook.z), C.cable, 2.2);
          }

          drawHookBlock(leftHook);
          drawHookBlock(rightHook);

          const beamC = v((leftHook.x + rightHook.x) / 2, hy - 71, leftHook.z);
          const beamTop = beamC.y + 11;

          for (const h of [leftHook, rightHook]) {
            addLine(v(h.x, h.y - 40, h.z), v(h.x - 22, beamTop, h.z), C.cable, 2.2);
            addLine(v(h.x, h.y - 40, h.z), v(h.x + 22, beamTop, h.z), C.cable, 2.2);
          }

          drawBeam(beamC, Math.abs(rightHook.x - leftHook.x) + 40);
        }
      }

      faces.sort((a, b) => b.depth - a.depth);
      for (const face of faces) {
        ctx.save();
        ctx.globalAlpha = face.opacity;
        ctx.beginPath();
        ctx.moveTo(face.points[0].x, face.points[0].y);
        for (let i = 1; i < face.points.length; i++) ctx.lineTo(face.points[i].x, face.points[i].y);
        ctx.closePath();
        ctx.fillStyle = face.fill;
        ctx.fill();
        if (face.stroke) {
          ctx.strokeStyle = face.stroke;
          ctx.lineWidth = face.width;
          ctx.stroke();
        }
        ctx.restore();
      }

      lines.sort((a, b) => b.depth - a.depth);
      for (const line of lines) {
        ctx.save();
        ctx.globalAlpha = line.opacity;
        ctx.beginPath();
        ctx.moveTo(line.a.x, line.a.y);
        ctx.lineTo(line.b.x, line.b.y);
        const averageDepth = (line.a.depth + line.b.depth) / 2;
        const scale = camera.focal / (camera.focal + averageDepth);
        ctx.lineWidth = line.width * scale * KS / 0.9;
        ctx.strokeStyle = line.color;
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.restore();
      }

      rafId = requestAnimationFrame(render);
    }

    window.addEventListener("resize", resize);
    resize();

    if (playing) {
      // تشغيل جديد: الأنيميشن بيبدأ من الصفر
      rafId = requestAnimationFrame(render);
    } else {
      // السيكشن مش ظاهر: نمسح الكانفس ونوقف اللوب (توفير CPU)
      ctx.clearRect(0, 0, W, H);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [canvasRef, stageRef, run, playing]);

  return null;
}

// =========================================================
// STAT NUMBER (COUNT UP)
// =========================================================

function StatNumber({ value, suffix, active }) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!active) { setDisplay("0"); return; }
    if (REDUCED) { setDisplay(value + suffix); return; }
    const t0 = performance.now();
    const dur = 1600;
    let raf;
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * e) + (p >= 1 ? suffix : ""));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value, suffix]);

  return <>{display}</>;
}

// =========================================================
// ABOUT SECTION
// =========================================================

export default function AboutSection() {
  const { language } = useLanguage();
  const about = useAboutContent();
  const features = (about.features || []).map((feature) => ({
    ...feature,
    title: getTextValue(feature.title, language),
    description: getTextValue(feature.description, language),
    Icon: resolveMarketingIcon(feature.icon),
  }));
  const stats = (about.stats || []).map((stat) => ({
    ...stat,
    label: getTextValue(stat.label, language),
    Icon: resolveMarketingIcon(stat.icon),
  }));
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const statsRef = useRef(null);

  const [statsActive, setStatsActive] = useState(false);
  const [playing, setPlaying] = useState(false); // السيكشن ظاهر في الشاشة؟
  const [run, setRun] = useState(0);             // عداد مرات التشغيل

  // كل ما تدخلي السيكشن: نعيد الأنيميشن من الأول
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let inside = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inside) {
          inside = true;
          setRun((r) => r + 1);
          setPlaying(true);
        } else if (!entry.isIntersecting && inside) {
          inside = false;
          setPlaying(false);
        }
      },
      { rootMargin: "-20% 0px -20% 0px", threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // تفعيل العدّادات: الديسكتوب بعد 4.5 ثانية / الموبايل عند الوصول بالسكرول
  useEffect(() => {
    setStatsActive(false);
    if (!playing) return;

    if (window.innerWidth >= 1180) {
      const id = setTimeout(() => setStatsActive(true), 4500);
      return () => clearTimeout(id);
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        if (entries[0].isIntersecting) {
          setStatsActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [run, playing]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-section relative w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 1px 1px, rgba(42,49,122,.06) 1px, transparent 1.3px) 0 0/26px 26px, linear-gradient(180deg, #ffffff 0%, #f4f5fa 60%, #eceef5 100%)",
      }}
    >
      {/* سكاي لاين المدينة في الخلفية */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[48vh] z-0"
        style={{
          background:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 300' preserveAspectRatio='none'><g fill='%23a9b7cc' opacity='.38'><rect x='10' y='110' width='58' height='190'/><rect x='78' y='170' width='46' height='130'/><rect x='134' y='80' width='52' height='220'/><rect x='196' y='150' width='60' height='150'/><rect x='930' y='140' width='56' height='160'/><rect x='996' y='90' width='50' height='210'/><rect x='1056' y='160' width='60' height='140'/><rect x='1126' y='120' width='64' height='180'/></g></svg>\") bottom/100% 100% no-repeat",
          WebkitMaskImage: "linear-gradient(to top, #000 0%, transparent 100%)",
          maskImage: "linear-gradient(to top, #000 0%, transparent 100%)",
        }}
      />

      {/* كانفس الكرينات */}
      <canvas ref={canvasRef} className="absolute inset-0 z-[1] pointer-events-none" />

      {/* STAGE — المحتوى اللي بيتعمله scale بنفس معامل الكرينات */}
      <div
        ref={stageRef}
        className={`about-stage z-[2] ${playing ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        dir="ltr"
      >
        {/* key={run} → كل تشغيل جديد بيعمل remount فأنيميشن الكروت والعدّادات بيتعاد من الأول */}
        <Fragment key={run}>
          {/* HEADER */}
          <motion.div
            className="about-blk about-header"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-[11px] font-bold tracking-[0.18em] text-[#2A317A] uppercase">
              {getTextValue(about.eyebrow, language)}
            </div>
            <h1 className="m-0 mt-[13px] text-[52px] leading-[1.05] font-extrabold text-[#1E2432]">
              {getTextValue(about.title, language)}{" "}<span className="text-[#2A317A]">{getTextValue(about.titleHighlight, language)}</span>
            </h1>
            <div className="w-14 h-[3px] mx-auto mt-[7px] mb-2 bg-[#2A317A] rounded-sm" />
            <p className="w-[500px] max-w-full mx-auto m-0 text-[12.5px] leading-[21px] text-[#3C3C3B]">
              {getTextValue(about.description, language)}
            </p>
            <a
              href={about.ctaHref || "/about"}
              className="inline-block mt-[18px] text-[12.5px] font-bold text-[#1E2432] no-underline transition-all hover:text-[#2A317A]"
            >
              {getTextValue(about.ctaLabel, language)}
            </a>
          </motion.div>

          {/* CARDS */}
          <motion.div
            className="about-blk about-cards"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.7, duration: 0.8, ease: "easeOut" }}
          >
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-[14px]">
              {features
                .filter((f) => f.position === "left")
                .map((f, i) => (
                  <motion.div
                    key={f.title}
                    className="group flex items-start gap-[18px] bg-white rounded-xl p-3 shadow-[0_4px_14px_rgba(60,60,59,0.10)] border-l-[3px] border-l-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(60,60,59,0.18)] hover:border-l-[#2A317A]"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.8 + i * 0.12, duration: 0.6, ease: "easeOut" }}
                  >
                    <div className="shrink-0 w-[60px] h-[60px] rounded-xl grid place-items-center bg-[rgba(42,49,122,0.08)] text-[#2A317A] transition-all duration-300 group-hover:bg-[#2A317A] group-hover:text-white group-hover:rotate-[-6deg] group-hover:scale-[1.06]">
                      <f.Icon className="w-[30px] h-[30px]" strokeWidth={1.7} />
                    </div>
                    <div>
                      <h3 className="m-0 pt-1 text-[14.5px] leading-[17px] font-bold text-[#1E2432]">
                        {f.title}
                      </h3>
                      <p className="m-0 text-[12px] leading-[19px] text-[#3C3C3B]">
                        {f.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
            </div>

            {/* CENTER PHOTO */}
            <motion.div
              className="relative self-center h-[310px] p-[13px]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.8, duration: 0.6, ease: "easeOut" }}
            >
              {/* الزوايا المضيئة */}
              <div className="about-photo-corner top-0 left-0 border-t-2 border-l-2 border-[#2A317A] rounded-tl-[14px]" />
              <div className="about-photo-corner bottom-0 right-0 border-b-2 border-r-2 border-[#2A317A] rounded-br-[14px]" />
              <div className="relative w-full h-full bg-white rounded-[14px] p-1.5 shadow-[0_8px_24px_rgba(60,60,59,0.20)] overflow-hidden">
                <img
                  src="/src/assets/images/DSC_3583.JPG"
                  alt={getTextValue(about.imageAlt, language) || "alshorouk project"}
                  className="w-full h-full block rounded-[9px] object-cover"
                />
                {/* لمعة الصورة */}
                <div className="about-sheen" aria-hidden />
              </div>
            </motion.div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-[14px]">
              {features
                .filter((f) => f.position === "right")
                .map((f, i) => (
                  <motion.div
                    key={f.title}
                    className="group flex items-start gap-[18px] bg-white rounded-xl p-3 shadow-[0_4px_14px_rgba(60,60,59,0.10)] border-l-[3px] border-l-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(60,60,59,0.18)] hover:border-l-[#2A317A]"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.8 + i * 0.12, duration: 0.6, ease: "easeOut" }}
                  >
                    <div className="shrink-0 w-[60px] h-[60px] rounded-xl grid place-items-center bg-[rgba(42,49,122,0.08)] text-[#2A317A] transition-all duration-300 group-hover:bg-[#2A317A] group-hover:text-white group-hover:rotate-[-6deg] group-hover:scale-[1.06]">
                      <f.Icon className="w-[30px] h-[30px]" strokeWidth={1.7} />
                    </div>
                    <div>
                      <h3 className="m-0 pt-1 text-[14.5px] leading-[17px] font-bold text-[#1E2432]">
                        {f.title}
                      </h3>
                      <p className="m-0 text-[12px] leading-[19px] text-[#3C3C3B]">
                        {f.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>

          {/* STATS */}
          <div ref={statsRef} className="about-blk about-stats">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="about-stat flex items-center gap-4 pl-[30px] pr-4 bg-white rounded-xl shadow-[0_4px_14px_rgba(60,60,59,0.10)] text-[#2A317A] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(60,60,59,0.18)]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: 4.3 + i * 0.1, duration: 0.5 }}
              >
                <s.Icon className="shrink-0 w-9 h-9" strokeWidth={1.5} />
                <div>
                  <b className="block text-[26px] leading-none font-extrabold text-[#1E2432]">
                    <StatNumber value={s.target} suffix={s.suffix} active={statsActive} />
                  </b>
                  <small className="block mt-1.5 text-[9.5px] tracking-[0.05em] uppercase text-[#3C3C3B] whitespace-nowrap">
                    {s.label}
                  </small>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="about-blk about-cta overflow-hidden rounded-[11px] text-white shadow-[0_8px_20px_rgba(42,49,122,0.32)]"
            style={{ background: "linear-gradient(90deg, #2A317A, #1E2254)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 4.7, duration: 0.8 }}
          >
            {/* الخط المخطط السفلي */}
            <div className="about-cta-stripes" aria-hidden />
            <Users className="shrink-0 w-11 h-11" strokeWidth={1.4} />
            <span className="w-px h-[46px] mx-[18px] bg-white/35" />
            <div className="flex-1">
              <h4 className="m-0 text-[17px] font-bold">{getTextValue(about.banner?.title, language)}</h4>
              <p className="m-0 mt-[5px] text-[12px] text-white/75">
                {getTextValue(about.banner?.subtitle, language)}
              </p>
            </div>
            <a
              href={about.banner?.buttonHref || "/contact"}
              className="inline-flex items-center gap-2 h-[45px] px-6 rounded-[23px] bg-white text-[#2A317A] text-[13px] font-bold no-underline transition-all hover:-translate-y-[2px] hover:shadow-[0_8px_18px_rgba(42,49,122,0.35)]"
            >
              {getTextValue(about.banner?.buttonLabel, language)} <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </Fragment>
      </div>

      <TowerCraneScene
        canvasRef={canvasRef}
        stageRef={stageRef}
        run={run}
        playing={playing}
      />

      <style>{aboutSectionCss}</style>
    </section>
  );
}

// =========================================================
// CSS خاص بالسكشن (الـ stage المُقاس + الريسبونسيف)
// =========================================================

const aboutSectionCss = `
@media (min-width: 1180px){
  .about-section{ height: 100vh; }
}

.about-stage{
  position: fixed;
  width: 1711px;
  height: 919px;
  transform-origin: 0 0;
  direction: ltr;
  text-align: left;
  color: #1E2432;
}

/* ---------- HEADER ---------- */
.about-header{
  position: absolute;
  top: 60px; left: 0;
  width: 1711px;
  text-align: center;
}

/* ---------- CARDS ---------- */
.about-cards{
  position: absolute;
  top: 315px; left: 233px;
  width: 1244px; height: 358px;
  display: grid;
  grid-template-columns: 352px 416px 352px;
  column-gap: 62px;
}

/* ---------- STATS ---------- */
.about-stats{
  position: absolute;
  top: 689px; left: 328px;
  width: 1067px; height: 80px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 14px;
}

.about-stat{ padding-top: 14px; padding-bottom: 14px; }

/* ---------- CTA ---------- */
.about-cta{
  position: absolute;
  top: 789px; left: 332px;
  width: 1049px; height: 83px;
  display: flex;
  align-items: center;
  padding: 0 28px 0 40px;
}

.about-cta-stripes{
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 5px;
  background: repeating-linear-gradient(135deg, rgba(255,255,255,.20) 0 10px, #1E2254 10px 20px);
  pointer-events: none;
}

/* ---------- PHOTO DECOR ---------- */
.about-photo-corner{
  position: absolute;
  width: 70px; height: 70px;
  pointer-events: none;
  animation: about-photo-pulse 2.6s ease-in-out infinite;
}

@keyframes about-photo-pulse{
  50% { width: 88px; height: 88px; }
}

.about-sheen{
  position: absolute;
  top: 0; bottom: 0;
  width: 40%;
  left: -60%;
  background: linear-gradient(100deg, transparent, rgba(255,255,255,.35), transparent);
  transform: skewX(-18deg);
  animation: about-sheen 6s ease-in-out 5s infinite;
  pointer-events: none;
}

@keyframes about-sheen{
  0%, 60% { left: -60%; }
  100% { left: 140%; }
}

/* =========================================================
   TABLET + MOBILE
========================================================= */
@media (max-width: 1179px){
  .about-stage{
    position: relative;
    width: auto; height: auto;
    max-width: 820px;
    margin: 0 auto;
    transform: none !important;
    left: auto !important; top: auto !important;
    padding: 24px 20px 60px;
  }

  .about-header, .about-cards, .about-stats, .about-cta{
    position: static;
    width: auto !important;
    margin-bottom: 18px;
  }

  .about-header h1{ font-size: 44px; }
  .about-header p{ width: auto; max-width: 460px; }

  .about-cards{
    height: auto;
    grid-template-columns: 1fr 1fr;
    column-gap: 14px; row-gap: 14px;
  }

  .about-cards > div:nth-child(2){
    grid-column: 1 / -1;
    order: -1;
    height: 340px;
    width: 100%; max-width: 560px;
    justify-self: center;
  }

  .about-stats{
    height: auto;
    grid-template-columns: repeat(6, 1fr);
    row-gap: 12px;
  }
  .about-stat{ grid-column: span 2; }
  .about-stat:nth-child(n+4){ grid-column: span 3; }
  .about-stat{ padding: 14px 16px; }

  .about-cta{
    height: auto;
    flex-wrap: wrap;
    gap: 12px;
    padding: 20px 22px 24px;
  }
}

@media (max-width: 640px){
  .about-stage{ padding: 24px 14px 48px; }
  .about-header h1{ font-size: 38px; }
  .about-cards{ grid-template-columns: 1fr; }
  .about-cards > div:nth-child(2){ height: 240px; }
  .about-cards svg{ width: 26px; height: 26px; }
  .about-cards .group > div:first-child{ width: 48px; height: 48px; }
  .about-stats{ grid-template-columns: repeat(2, 1fr); row-gap: 10px; }
  .about-stat, .about-stat:nth-child(n+4){ grid-column: span 1; padding: 12px 14px; gap: 10px; }
  .about-stat:last-child{ grid-column: 1 / -1; }
  .about-stat svg{ width: 30px; height: 30px; }
  .about-stat b{ font-size: 22px; }
  .about-cta{ justify-content: center; text-align: center; }
  .about-cta > span{ display: none; }
  .about-cta > svg{ width: 36px; height: 36px; }
  .about-cta > div{ flex: 1 1 100%; }
}

@media (prefers-reduced-motion: reduce){
  .about-photo-corner, .about-sheen{ animation: none; }
}
`;